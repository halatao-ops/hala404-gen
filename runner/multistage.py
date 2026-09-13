"""Two-stage judging: cheap numeric screen, expensive duel only for close calls.

Our bracket pays a full 3-image pairwise duel for every comparison: K-1 duels per prompt,
~7-9 s each, and judging now costs about as much as generation.

The champion's `judge/multi_stage.py` avoids that with a cheap S1 (per-angle numeric
scores, a draw threshold, escalate only when close) before an expensive S2.

The structural win is that S1 scores each candidate INDEPENDENTLY. Score K candidates
once, and every duel in the bracket becomes a free numeric comparison; only genuinely
close pairs cost a real duel. The bracket pays per comparison; this pays per candidate.

Why this avoids the critic's failure: the critic was 3.5x SLOWER than the bracket because
it emitted a long structured critique — output tokens dominate. S1 emits a handful of
integers and nothing else.
"""
from __future__ import annotations

import base64
import json
import re
import urllib.request

S1_SYSTEM = """You rate how well a rendered 3D reconstruction matches a reference image.

You receive the ORIGINAL reference, then a grid of RENDERS of one reconstruction.

Rate these four aspects, each 0-10:
  class      does it read as the same KIND of object at a glance
  silhouette overall outline and proportions
  parts      are the major parts present, in the right count and position
  material   dominant colours and materials

Scale: 0 = unrecognizable, 5 = recognizable but clearly wrong, 10 = near-identical.
Use the full range.

Output ONLY four integers separated by spaces, in that order. No words, no JSON, no
explanation. Example output:
6 7 5 4"""

S1_USER = "Rate the reconstruction. Four integers only."


class S1Scorer:
    """Terse numeric screen. Tiny output is the entire point."""

    def __init__(self, base_url: str, model: str, api_key: str = "local",
                 timeout: float = 300.0, max_tokens: int = 3000,
                 temperature: float = 0.0, retries: int = 2, think: bool = False):
        self.base_url = base_url.rstrip("/")
        self.model = model
        self.api_key = api_key
        self.timeout = timeout
        self.max_tokens = max_tokens
        self.temperature = temperature
        self.retries = retries
        # MEASURED: thinking off is 32x faster here (0.21 s vs 6.68 s per call) with
        # identical agreement (100% at gap >= 1.5 either way). That is the OPPOSITE of the
        # pairwise judge, where thinking off produced a coin flip. Scoring one image
        # survives without reasoning; comparing two does not.
        self.think = think

    def _img(self, raw: bytes) -> dict:
        return {"type": "image_url",
                "image_url": {"url": "data:image/png;base64," + base64.b64encode(raw).decode()}}

    def score(self, ref: bytes, render: bytes) -> float | None:
        """-> mean of the four aspect scores, 0-10, or None."""
        payload = {
            "model": self.model,
            "messages": [
                {"role": "system", "content": S1_SYSTEM},
                {"role": "user", "content": [self._img(ref), self._img(render),
                                             {"type": "text", "text": S1_USER}]},
            ],
            "temperature": self.temperature,
            "max_tokens": self.max_tokens,
        }
        if not self.think:
            payload["chat_template_kwargs"] = {"enable_thinking": False}
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
            except Exception:
                continue
            # take the LAST four integers: the model may still think before answering
            nums = re.findall(r"\b(10|[0-9])\b", text)
            if len(nums) >= 4:
                vals = [int(x) for x in nums[-4:]]
                return sum(vals) / 4.0
        return None


class MultiStageJudge:
    """S1 numeric screen, escalating close pairs to an S2 pairwise duel.

    `draw_threshold` is the S1 gap below which a pair is considered too close to call on
    numbers alone. The champion uses 0.7 on a 0-10 scale.
    """

    def __init__(self, s1: S1Scorer, s2, draw_threshold: float = 1.5):
        self.s1 = s1
        self.s2 = s2
        self.draw_threshold = draw_threshold
        self.stats = {"s1_resolved": 0, "s2_escalated": 0, "s1_missing": 0}

    def prescore(self, ref: bytes, renders: list[bytes], workers: int = 8) -> list[float | None]:
        """Score every candidate ONCE. This is what makes later comparisons free."""
        from concurrent.futures import ThreadPoolExecutor
        with ThreadPoolExecutor(max_workers=workers) as ex:
            return list(ex.map(lambda p: self.s1.score(ref, p), renders))

    def compare(self, ref: bytes, a: bytes, b: bytes,
                sa: float | None, sb: float | None, **s2_kwargs) -> str:
        """-> 'A' | 'B' | 'UNDECIDED', using precomputed S1 scores where they suffice."""
        if sa is None or sb is None:
            self.stats["s1_missing"] += 1
        elif abs(sa - sb) >= self.draw_threshold:
            self.stats["s1_resolved"] += 1
            return "A" if sa > sb else "B"
        self.stats["s2_escalated"] += 1
        verdict, _ = self.s2.compare_voted(ref, a, b, **s2_kwargs)
        return verdict
