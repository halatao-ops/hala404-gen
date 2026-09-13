"""Per-prompt generation core: ensemble -> validate+render -> judge -> select.

This mirrors the structure the round-42 champion shipped (ensemble of candidates,
local render, VLM self-judge, best-of selection, bounded repair iterations).

The same core is meant to back BOTH your submission run and the Docker service the
validators deploy. Keeping them identical is what protects you from the verification
duel, which rejects you if your submitted output strictly beats your regenerated output.
"""
from __future__ import annotations

import os
import time
from dataclasses import dataclass, field
from pathlib import Path

from backends import Candidate
from render_client import RenderClient, RenderResult

FALLBACK_JS = Path(os.environ.get("MINER_REF_DIR", "/workspace/404gen/miner-reference")) \
    / "examples" / "car.js"


@dataclass
class Attempt:
    source: str
    valid: bool
    score: float | None
    reason: str
    failures: str
    gen_ms: float
    render_ms: float
    png: bytes | None = None


@dataclass
class PromptOutcome:
    stem: str
    ok: bool = False
    source: str = ""
    score: float | None = None
    reason: str = ""
    used_fallback: bool = False
    attempts: list[Attempt] = field(default_factory=list)
    elapsed_s: float = 0.0
    error: str = ""
    best_png: bytes | None = None
    duel_log: list = field(default_factory=list)

    def summary(self) -> dict:
        return {
            "stem": self.stem,
            "ok": self.ok,
            "score": self.score,
            "reason": self.reason,
            "used_fallback": self.used_fallback,
            "n_attempts": len(self.attempts),
            "n_valid": sum(1 for a in self.attempts if a.valid),
            "elapsed_s": round(self.elapsed_s, 2),
            "duel_rounds": len(self.duel_log),
            "duel_coin_flips": sum(d.get("coin_flips", 0) for d in self.duel_log),
            "error": self.error,
        }



def bracket_select(ref_png: bytes, attempts: list, judge, max_workers: int = 8):
    """Single-elimination bracket over valid candidates. K candidates -> K-1 duels.

    Duels within a round are independent, so each round runs in parallel; depth is
    ceil(log2(K)), which keeps latency near log rather than linear in K.

    Slot assignment alternates by round because the judge is told to break genuine ties
    by picking A — without alternation that bias would compound down the bracket.
    """
    from concurrent.futures import ThreadPoolExecutor

    field = [a for a in attempts if a.valid and a.png]
    if not field:
        return None, []
    if len(field) == 1:
        return field[0], []

    log = []
    round_no = 0
    while len(field) > 1:
        pairs, bye = [], None
        if len(field) % 2:
            bye = field[-1]
            field = field[:-1]
        for i in range(0, len(field), 2):
            x, y = field[i], field[i + 1]
            # alternate slots per round to cancel the "pick A on ties" bias
            pairs.append((y, x) if round_no % 2 else (x, y))

        def duel(pair):
            a, b = pair
            w, conf, reason = judge.compare(ref_png, a.png, b.png)
            return (a if w == "A" else b), conf, reason

        with ThreadPoolExecutor(max_workers=max_workers) as ex:
            results = list(ex.map(duel, pairs))

        field = [r[0] for r in results]
        log.append({"round": round_no, "duels": len(pairs),
                    "mean_confidence": round(sum(r[1] for r in results) / len(results), 3),
                    "coin_flips": sum(1 for r in results if r[1] == 0.0)})
        if bye is not None:
            field.append(bye)
        round_no += 1

    return field[0], log


class PromptPipeline:
    def __init__(self, coder, judge, render: RenderClient, *,
                 ensemble: int = 4, max_iter: int = 2,
                 score_threshold: float = 0.55, use_fallback: bool = True,
                 pairwise=None, duel_workers: int = 8):
        self.coder = coder
        self.judge = judge
        self.render = render
        self.ensemble = ensemble
        self.max_iter = max_iter
        self.score_threshold = score_threshold
        self.use_fallback = use_fallback
        # When set, selection is by single-elimination bracket instead of absolute
        # score. Absolute scoring measured floor-compressed (mean 0.18, max 0.60),
        # which also made score_threshold unreachable.
        self.pairwise = pairwise
        self.duel_workers = duel_workers
        self._fallback_src = FALLBACK_JS.read_text() if use_fallback else ""

    def _evaluate(self, cand: Candidate, prompt_png: bytes) -> Attempt:
        if not cand.source:
            return Attempt("", False, None, "", cand.error or "empty generation",
                           cand.latency_ms, 0.0)
        r: RenderResult = self.render.render_grid(cand.source)
        if not r.ok:
            return Attempt(cand.source, False, None, "", r.failure_text(),
                           cand.latency_ms, r.elapsed_ms)
        score, reason = self.judge.score(prompt_png, r.png)
        return Attempt(cand.source, True, score, reason, "",
                       cand.latency_ms, r.elapsed_ms, r.png)

    def run(self, stem: str, prompt_png: bytes, seed: int) -> PromptOutcome:
        t0 = time.perf_counter()
        out = PromptOutcome(stem=stem)
        repair_from, failures = "", ""

        # Generate, then repair ONLY while nothing valid has come back. The old
        # early-exit compared an absolute score against score_threshold, but measured
        # scores floor at 0.0-0.3 (max ever 0.60), so a 0.55 threshold never fired and
        # max_iter always ran in full — pure waste. Validity is the real stop condition.
        for it in range(self.max_iter):
            try:
                cands = self.coder.generate(
                    prompt_png, n=self.ensemble, seed=seed + it * 1009,
                    repair_from=repair_from, failures=failures,
                )
            except Exception as e:
                out.error = f"coder raised: {type(e).__name__}: {e}"
                break

            for c in cands:
                out.attempts.append(self._evaluate(c, prompt_png))

            if any(a.valid for a in out.attempts):
                break
            bad = next((a for a in out.attempts if not a.valid and a.source), None)
            if bad is None:
                break
            repair_from, failures = bad.source, bad.failures

        valid = [a for a in out.attempts if a.valid]
        best: Attempt | None = None

        if valid and self.pairwise is not None and len(valid) > 1:
            best, log = bracket_select(prompt_png, valid, self.pairwise,
                                       max_workers=self.duel_workers)
            out.duel_log = log
            out.reason = f"bracket winner of {len(valid)} valid candidates"
        elif valid:
            # No pairwise judge: fall back to the absolute scorer if one is configured,
            # otherwise first-valid. Never invent a score.
            best = valid[0]
            for a in valid:
                if a.score is not None and (best.score is None or a.score > best.score):
                    best = a
            out.reason = best.reason

        if best is not None:
            out.ok = True
            out.source = best.source
            out.score = best.score
            out.best_png = best.png
        elif self.use_fallback:
            # A missing file and an invalid file both score zero, but a VALID module can
            # still win duels against other miners' failures. Never submit nothing.
            out.ok = True
            out.source = self._fallback_src
            out.used_fallback = True
            out.reason = "no valid candidate; emitted fallback module"
        else:
            out.error = out.error or "no valid candidate"

        out.elapsed_s = time.perf_counter() - t0
        return out
