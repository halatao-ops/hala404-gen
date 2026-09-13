"""Pluggable inference backends: a coder that writes Three.js, a judge that scores it.

Both speak the OpenAI-compatible chat/completions API, so the same code points at a
local vLLM instance, a rented endpoint, or any hosted gateway by changing base_url.

IMPORTANT — competition rule: during generation your pipeline may only call
open-source, commercially-licensed models. No closed-source APIs (OpenAI, Anthropic).
The OpenAI *wire format* is fine; the model behind it must be compliant.
"""
from __future__ import annotations

import base64
import json
import os
import time
import urllib.error
import urllib.request
from dataclasses import dataclass
from pathlib import Path

# Resolved via env so the same code works in the dev tree and inside the image,
# where the bundle is copied to /app/miner-reference.
MINER_REF = Path(os.environ.get("MINER_REF_DIR", "/workspace/404gen/miner-reference"))
AGENTS_MD = MINER_REF / "AGENTS.md"
FALLBACK_JS = MINER_REF / "examples" / "car.js"

# Targets the exact rejections measured on real hardware 2026-09-10 (83% first-pass
# validity): THREE_ALIAS_FORBIDDEN, THREE_AT_TOP_LEVEL, IDENTIFIER_NOT_ALLOWED,
# EXECUTION_THREW. All four were rule comprehension, not capability — the model does
# not reliably internalise AGENTS.md from a single read, so the most-violated rules are
# restated concretely with the canonical helper inlined to copy verbatim.
REJECTION_GUARDS = """
## Required module structure — this eliminates most rejections

Define **everything inside `generate(THREE)`**. The only top-level code is the export
itself. Nested helpers close over `THREE` and over your local variables, so they can
never trigger `THREE_AT_TOP_LEVEL` or `IDENTIFIER_NOT_ALLOWED` (verified against the
validator). Top-level helpers are where nearly every rejection comes from: they cannot
see `THREE`, and they cannot see materials or geometry declared inside `generate`.

```js
export default function generate(THREE) {
  const root = new THREE.Group();

  const bodyMat = new THREE.MeshStandardMaterial({ color: 0xcc8844, roughness: 0.6 });

  // helpers go HERE — inside generate, closing over THREE and over bodyMat/root
  function addBox(w, h, d, x, y, z) {
    const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), bodyMat);
    m.position.set(x, y, z);
    root.add(m);
    return m;
  }

  addBox(1, 0.2, 0.6, 0, 0, 0);

  const box = new THREE.Box3().setFromObject(root);
  const size = new THREE.Vector3();
  const center = new THREE.Vector3();
  box.getSize(size);
  box.getCenter(center);
  const scale = 0.95 / Math.max(size.x, size.y, size.z);
  root.scale.setScalar(scale);
  root.position.set(-center.x * scale, -center.y * scale, -center.z * scale);
  return root;
}
```

If you do write a top-level helper, its THREE parameter must be spelled exactly `THREE`
(`function f(object, root)` is rejected even when the call site passes THREE), and it
may reference nothing from `generate`'s scope. Prefer nesting.

## Two more rejections seen in practice

**`PARSE_ERROR` — duplicate declarations.** In a long module it is easy to `const`
the same name twice. Give every part a unique, prefixed name (`seatMat`, `seatGeo`,
`legMat`) and never redeclare.

**`EXECUTION_THREW` — must run clean in 5 s.** The observed crash is
`undefined is not iterable`: destructuring an array a helper did not return. Always
return a concrete array, never a bare `return;`. No `Math.random()`, no `Date` — two
runs must produce identical geometry.
"""

SYSTEM_PROMPT = """You convert a photograph of an object into a Three.js module that \
procedurally reconstructs it.

Return ONLY the JavaScript module. No markdown fences, no commentary, no explanation.

The rules below are enforced by static analysis and sandbox execution. Any violation \
is rejected outright and scores zero.

{rules}
{guards}"""

USER_PROMPT = """Reconstruct the object in this image as a Three.js module.

Priorities, in order:
1. Validity — it must pass every rule. A rejected module scores zero.
2. Silhouette and proportions — the overall shape must read as the same object.
3. Part decomposition — build from primitives; keep draw calls well under 200.
4. Colour and material — procedural textures only; no embedded asset data.

Output the complete module, starting with `export default function generate(THREE) {`."""

REPAIR_PROMPT = """Your previous module was REJECTED with these errors:

{failures}

Fix every error and return the complete corrected module. Output only the JavaScript."""

JUDGE_PROMPT = """You are scoring a procedural 3D reconstruction.

Image 1 is the target photograph. Image 2 shows multiple rendered views of a \
reconstruction built from Three.js primitives.

Score how well the reconstruction matches the target on geometry, proportion, part \
layout and colour. A perfect low-poly approximation scores 1.0; an unrecognisable or \
empty scene scores 0.0. Judge the match, not the artistic polish — low-poly is expected.

Reply with JSON only: {"score": <0.0-1.0>, "reason": "<one short sentence>"}"""


def load_rules() -> str:
    try:
        return AGENTS_MD.read_text()
    except OSError:
        return "(AGENTS.md not found — supply the Output Specification rules here.)"


def strip_fences(text: str) -> str:
    """Models wrap code in markdown fences even when told not to."""
    t = text.strip()
    if t.startswith("```"):
        lines = t.split("\n")
        lines = lines[1:]
        if lines and lines[-1].strip().startswith("```"):
            lines = lines[:-1]
        t = "\n".join(lines)
    return t.strip()



def extract_json(text: str) -> dict | None:
    """Pull the final JSON verdict out of a reasoning model's reply.

    GLM-4.6V-Flash emits the object TWICE: a draft inside <think>...</think>, then the
    real answer wrapped in <|begin_of_box|>...<|end_of_box|>. Naively slicing from the
    first '{' to the last '}' spans both plus the markers and fails with
    "Extra data" — which silently degraded every such duel to the coin-flip fallback.

    Strategy: drop the thinking block, prefer the boxed answer, and otherwise take the
    LAST balanced object that actually parses.
    """
    if not text:
        return None
    t = strip_fences(text)

    # 1. discard the reasoning block
    end = t.rfind("</think>")
    if end != -1:
        t = t[end + len("</think>"):]

    # 2. prefer the explicitly boxed answer
    b0 = t.find("<|begin_of_box|>")
    if b0 != -1:
        b1 = t.find("<|end_of_box|>", b0)
        inner = t[b0 + len("<|begin_of_box|>"): b1 if b1 != -1 else len(t)]
        try:
            return json.loads(inner.strip())
        except Exception:
            t = inner

    # 3. last balanced {...} that parses, scanning from the right
    for start in range(len(t) - 1, -1, -1):
        if t[start] != "{":
            continue
        depth = 0
        for k in range(start, len(t)):
            if t[k] == "{":
                depth += 1
            elif t[k] == "}":
                depth -= 1
                if depth == 0:
                    try:
                        return json.loads(t[start:k + 1])
                    except Exception:
                        break
    return None


@dataclass
class Candidate:
    source: str
    latency_ms: float
    error: str = ""


class StubCoder:
    """No-model backend: returns the canonical car.js for every prompt.

    Mirrors miner_reference/threejs_placeholder.py. It exercises the full
    validate -> render -> score -> select path with zero inference, so the harness is
    testable before you rent a GPU. It is NOT a generator: every prompt gets the same
    car, so quality scores from a stub run are meaningless.
    """

    name = "stub"

    def __init__(self, **_):
        self.source = FALLBACK_JS.read_text()

    def generate(self, image_bytes: bytes, n: int, seed: int,
                 repair_from: str = "", failures: str = "") -> list[Candidate]:
        return [Candidate(source=self.source, latency_ms=0.0) for _ in range(n)]


class OpenAICompatCoder:
    """Chat-completions coder. Point base_url at your vLLM instance."""

    name = "openai-compat"

    def __init__(self, base_url: str, model: str, api_key: str = "local",
                 temperature: float = 0.7, max_tokens: int = 24576,
                 timeout: float = 600.0, top_p: float = 0.95, **_):
        self.base_url = base_url.rstrip("/")
        self.model = model
        self.api_key = api_key
        self.temperature = temperature
        self.max_tokens = max_tokens
        self.timeout = timeout
        self.top_p = top_p
        self.rules = load_rules()
        # CODER_PROMPT_FILE overrides the composed system prompt wholesale — used to A/B
        # alternative prompts (e.g. the champion-derived v2) without touching code.
        pf = os.environ.get("CODER_PROMPT_FILE")
        self.system_text = (open(pf).read() if pf
                            else SYSTEM_PROMPT.format(rules=self.rules,
                                                      guards=REJECTION_GUARDS))

    def _post(self, payload: dict) -> dict:
        req = urllib.request.Request(
            f"{self.base_url}/chat/completions",
            data=json.dumps(payload).encode(),
            headers={"Content-Type": "application/json",
                     "Authorization": f"Bearer {self.api_key}"},
            method="POST",
        )
        with urllib.request.urlopen(req, timeout=self.timeout) as r:
            return json.loads(r.read())

    def generate(self, image_bytes: bytes, n: int, seed: int,
                 repair_from: str = "", failures: str = "") -> list[Candidate]:
        b64 = base64.b64encode(image_bytes).decode()
        content = [
            {"type": "image_url",
             "image_url": {"url": f"data:image/png;base64,{b64}"}},
            {"type": "text", "text": USER_PROMPT},
        ]
        messages = [
            {"role": "system", "content": self.system_text},
            {"role": "user", "content": content},
        ]
        if repair_from:
            messages.append({"role": "assistant", "content": repair_from})
            messages.append({"role": "user",
                             "content": REPAIR_PROMPT.format(failures=failures)})

        payload = {
            "model": self.model,
            "messages": messages,
            "n": n,
            "temperature": self.temperature,
            "top_p": self.top_p,
            "max_tokens": self.max_tokens,
            "seed": seed,
        }
        t0 = time.perf_counter()
        try:
            data = self._post(payload)
        except urllib.error.HTTPError as e:
            detail = e.read()[:300].decode(errors="replace")
            err = f"http {e.code}: {detail}"
            return [Candidate("", (time.perf_counter() - t0) * 1000, err)]
        except Exception as e:
            return [Candidate("", (time.perf_counter() - t0) * 1000,
                              f"{type(e).__name__}: {e}")]

        elapsed = (time.perf_counter() - t0) * 1000
        out = []
        for choice in data.get("choices", []):
            text = (choice.get("message") or {}).get("content") or ""
            out.append(Candidate(strip_fences(text), elapsed / max(1, len(data["choices"]))))
        if not out:
            out = [Candidate("", elapsed, "no choices returned")]
        return out


class NullJudge:
    """No scorer configured. Selection falls back to first-valid.

    Reports score=None so reports never imply a quality measurement that did not happen.
    """

    name = "none"

    def score(self, prompt_png: bytes, render_png: bytes) -> tuple[float | None, str]:
        return None, "no judge configured"


class OpenAICompatJudge:
    """VLM judge. Production uses zai-org/GLM-4.6V-Flash — point this at your own copy."""

    name = "openai-compat"

    def __init__(self, base_url: str, model: str, api_key: str = "local",
                 timeout: float = 300.0, max_tokens: int = 512, **_):
        self.base_url = base_url.rstrip("/")
        self.model = model
        self.api_key = api_key
        self.timeout = timeout
        self.max_tokens = max_tokens

    def score(self, prompt_png: bytes, render_png: bytes) -> tuple[float | None, str]:
        a = base64.b64encode(prompt_png).decode()
        b = base64.b64encode(render_png).decode()
        payload = {
            "model": self.model,
            "messages": [{
                "role": "user",
                "content": [
                    {"type": "image_url", "image_url": {"url": f"data:image/png;base64,{a}"}},
                    {"type": "image_url", "image_url": {"url": f"data:image/png;base64,{b}"}},
                    {"type": "text", "text": JUDGE_PROMPT},
                ],
            }],
            "temperature": 0.0,
            "max_tokens": self.max_tokens,
        }
        req = urllib.request.Request(
            f"{self.base_url}/chat/completions",
            data=json.dumps(payload).encode(),
            headers={"Content-Type": "application/json",
                     "Authorization": f"Bearer {self.api_key}"},
            method="POST",
        )
        try:
            with urllib.request.urlopen(req, timeout=self.timeout) as r:
                data = json.loads(r.read())
            text = (data["choices"][0]["message"]["content"] or "").strip()
        except Exception as e:
            return None, f"judge error: {type(e).__name__}: {e}"

        obj = extract_json(text)
        if obj is not None and obj.get("score") is not None:
            try:
                return max(0.0, min(1.0, float(obj["score"]))), str(obj.get("reason", ""))[:200]
            except Exception:
                pass
        return None, f"unparseable judge reply: {text[-120:]}"



PAIRWISE_SYSTEM = """You are a pairwise visual judge for procedurally generated 3D objects.

You receive THREE images in this exact order:
1. The ORIGINAL reference image.
2. RENDER A — a grid of camera angles for candidate A.
3. RENDER B — a grid of camera angles for candidate B.

Pick which candidate matches the ORIGINAL more faithfully.

## What "matches better" means, in priority order (earlier dominates)
1. Object class / silhouette — does it read as the SAME kind of thing at a glance?
2. Major part hierarchy — are the structurally important parts present, in roughly the
   right relative position and proportion?
3. Counts and symmetry — 4 legs vs 3, 6 spokes vs 8. Visible miscounts hurt.
4. Materials and colour — dominant tones, metal vs opaque vs glass.
5. Decorations and fine detail — only when 1-4 are genuinely tied.

Slight pose, scale or lighting differences are NOT deciding factors. Judge 3D structure.

## Ties
Pick one anyway. Use confidence 0.3-0.5 when they are close, 0.8-1.0 only when the
difference is unambiguous.

## Output
Return ONLY a JSON object, no prose and no markdown fences:
{"winner": "A", "reason": "B has 3 legs instead of 4; A has the spout.", "confidence": 0.85}
"""

PAIRWISE_USER = """Three images follow: 1) ORIGINAL reference, 2) RENDER A, 3) RENDER B.
Which render matches the original better? Emit the JSON verdict."""


class PairwiseJudge:
    """Relative judge — A vs B against a reference.

    Replaces absolute scoring, which measured floor-compressed on real output (mean
    0.18, 22% exactly 0.00, max 0.60), making a 0.55 threshold unreachable. VLMs
    calibrate comparisons far better than absolute scores, and the subnet's own judging
    is itself pairwise duels, so this is also the more predictive signal.
    """

    name = "pairwise"

    def __init__(self, base_url: str, model: str, api_key: str = "local",
                 timeout: float = 300.0, max_tokens: int = 2048, retries: int = 2,
                 temperature: float = 0.7, **_):
        # temperature 0.7, NOT 0.0: at temp 0 decoding is deterministic (measured 5/5
        # identical answers across 5 identical calls), so repeated votes add nothing and
        # the only variance comes from the slot swap — which is what produced a 54%
        # undecided rate. Sampling is what makes voting informative.
        # 2048, not 512: GLM-4.6V-Flash emits a <think> block first and a 512-token
        # budget truncates before the JSON, so every duel silently degrades to the
        # coin-flip fallback. Thinking must stay ON — disabling it measured 50% swap
        # consistency (a coin flip) with the judge picking slot A regardless of content.
        self.base_url = base_url.rstrip("/")
        self.model = model
        self.api_key = api_key
        self.timeout = timeout
        self.max_tokens = max_tokens
        self.retries = retries
        self.temperature = temperature

    def _img(self, raw: bytes) -> dict:
        return {"type": "image_url",
                "image_url": {"url": "data:image/png;base64," + base64.b64encode(raw).decode()}}

    def compare(self, ref: bytes, a: bytes, b: bytes) -> tuple[str, float, str]:
        """-> (winner 'A'|'B', confidence, reason). Falls back to 'A' at 0.0 confidence."""
        payload = {
            "model": self.model,
            "messages": [
                {"role": "system", "content": PAIRWISE_SYSTEM},
                {"role": "user", "content": [self._img(ref), self._img(a), self._img(b),
                                             {"type": "text", "text": PAIRWISE_USER}]},
            ],
            "temperature": self.temperature,
            "max_tokens": self.max_tokens,
        }
        # 9% of replies came back unparseable in measurement, so retry before falling back.
        for _ in range(self.retries):
            try:
                req = urllib.request.Request(
                    f"{self.base_url}/chat/completions",
                    data=json.dumps(payload).encode(),
                    headers={"Content-Type": "application/json",
                             "Authorization": f"Bearer {self.api_key}"},
                    method="POST")
                with urllib.request.urlopen(req, timeout=self.timeout) as r:
                    text = json.loads(r.read())["choices"][0]["message"]["content"] or ""
            except Exception as e:
                text = ""
                last = f"{type(e).__name__}: {e}"
            if text:
                o = extract_json(text)
                if o is not None:
                    w = str(o.get("winner", "")).strip().upper()
                    if w in ("A", "B"):
                        c = float(o.get("confidence", 0.5) or 0.5)
                        return w, max(0.0, min(1.0, c)), str(o.get("reason", ""))[:200]
                last = f"unparseable: {text[-120:]}"
        # Undecidable — report zero confidence so the caller can see it was a coin flip.
        return "A", 0.0, locals().get("last", "no verdict")


    def compare_voted(self, ref: bytes, a: bytes, b: bytes, *, votes: int = 5,
                      margin: float = 0.7, workers: int = 10) -> tuple[str, float]:
        """-> ('A' | 'B' | 'UNDECIDED', fraction_favouring_A).

        Runs `votes` samples in EACH slot order and pools them. A bare majority is not
        enough: one measured pair flipped from a temp-0 tie to a verdict on a 6/10
        margin, which is a coin flip wearing a decision. Requiring `margin` keeps
        genuinely-close pairs honestly undecided instead of inflating the win rate.
        """
        from concurrent.futures import ThreadPoolExecutor
        with ThreadPoolExecutor(max_workers=workers) as ex:
            ab = list(ex.map(lambda _: self.compare(ref, a, b)[0], range(votes)))
            ba = list(ex.map(lambda _: self.compare(ref, b, a)[0], range(votes)))
        # in AB order 'A' favours a; in BA order 'B' favours a
        a_votes = sum(1 for w in ab if w == "A") + sum(1 for w in ba if w == "B")
        n = len(ab) + len(ba)
        if not n:
            return "UNDECIDED", 0.5
        frac = a_votes / n
        if frac >= margin:
            return "A", frac
        if frac <= 1.0 - margin:
            return "B", frac
        return "UNDECIDED", frac

def build_pairwise_judge(cfg: dict):
    return PairwiseJudge(**{k: v for k, v in cfg.items() if k != "kind"})



QUALITY_REPAIR_PROMPT = """Your previous module was reviewed against the reference image.

{brief}

Return the COMPLETE corrected module — not a diff, not a fragment. Keep everything on the
preserve-list exactly as it is; change only what the issues name. All the original rules
still apply, and a module that fails validation is worth nothing, so do not trade
correctness for detail.

Output only the JavaScript."""


def add_quality_repair(cls):
    """Attach a critique-driven repair turn to a coder backend.

    Distinct from the existing validation repair: that one fixes modules the VALIDATOR
    rejected, this one improves modules that are already valid but score poorly against
    the reference. The preserve-list is the important half — a coder asked only to fix
    faults will routinely regress parts that were already right.
    """
    def repair(self, image_bytes: bytes, prior_source: str, brief: str,
               n: int = 1, seed: int = 0):
        b64 = base64.b64encode(image_bytes).decode()
        messages = [
            {"role": "system", "content": getattr(self, "system_text", SYSTEM_PROMPT.format(
                rules=load_rules(), guards=REJECTION_GUARDS))},
            {"role": "user", "content": [
                {"type": "image_url", "image_url": {"url": f"data:image/png;base64,{b64}"}},
                {"type": "text", "text": USER_PROMPT}]},
            {"role": "assistant", "content": prior_source},
            {"role": "user", "content": QUALITY_REPAIR_PROMPT.format(brief=brief)},
        ]
        # The repair turn resends the whole prior module (~6.8k tokens), which initial
        # generation does not. At max_tokens 24576 that pushed input+output past the
        # coder's 32768 context and every call returned empty. Budget the output from
        # what the prompt actually leaves.
        approx_in = 5300 + len(prior_source) // 4 + len(brief) // 4
        budget = max(4096, min(self.max_tokens, 32768 - approx_in - 1024))
        payload = {"model": self.model, "messages": messages, "n": n,
                   "temperature": self.temperature, "top_p": self.top_p,
                   "max_tokens": budget, "seed": seed}
        t0 = time.perf_counter()
        try:
            data = self._post(payload)
        except Exception as e:
            return [Candidate("", (time.perf_counter()-t0)*1000, f"{type(e).__name__}: {e}")]
        elapsed = (time.perf_counter()-t0)*1000
        out = [Candidate(strip_fences((c.get("message") or {}).get("content") or ""),
                         elapsed/max(1, len(data.get("choices", []))))
               for c in data.get("choices", [])]
        return out or [Candidate("", elapsed, "no choices returned")]
    cls.repair = repair
    return cls


OpenAICompatCoder = add_quality_repair(OpenAICompatCoder)

def build_coder(cfg: dict):
    kind = cfg.get("kind", "stub")
    if kind == "stub":
        return StubCoder(**cfg)
    if kind == "openai-compat":
        return OpenAICompatCoder(**{k: v for k, v in cfg.items() if k != "kind"})
    raise ValueError(f"unknown coder kind: {kind}")


def build_judge(cfg: dict):
    kind = cfg.get("kind", "none")
    if kind == "none":
        return NullJudge()
    if kind == "openai-compat":
        return OpenAICompatJudge(**{k: v for k, v in cfg.items() if k != "kind"})
    raise ValueError(f"unknown judge kind: {kind}")
