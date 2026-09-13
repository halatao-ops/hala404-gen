#!/usr/bin/env python3
"""SN17 miner verification service — the HTTP contract the orchestrator drives.

Implements GET /health, GET /status, POST /generate, GET /results per the 404-GEN
API specification. Listens on 0.0.0.0:10006.

It wraps the SAME `PromptPipeline` the batch runner uses. That is deliberate: the
verification duel rejects you if your submitted output strictly beats your regenerated
output (0% margin), so submission and regeneration must run identical code.

Config is environment-driven so the image is rebuilt only when code changes:

  CODER_URL / CODER_MODEL / CODER_KEY      OpenAI-compatible coder endpoint
  JUDGE_URL / JUDGE_MODEL / JUDGE_KEY      OpenAI-compatible judge endpoint
  RENDER_URL          default http://localhost:8000
  MAX_ENSEMBLE        default 20      candidates per prompt when time allows
  MIN_ENSEMBLE        default 1
  TARGET_TOTAL_S      default 5000    stay under the 7200 s audit cap with margin
  EXPECTED_PROMPTS    default 128
  CONCURRENCY         default 8
  GPU_MIN_TFLOPS      default 30
  GPU_MIN_VRAM_GB     default 134
  PORT                default 10006
"""
from __future__ import annotations

import io
import os
import sys
import threading
from contextlib import asynccontextmanager
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
sys.path.insert(0, str(Path(__file__).parent.parent / "runner"))

from fastapi import FastAPI, Query, Request        # noqa: E402
from fastapi.responses import JSONResponse, StreamingResponse  # noqa: E402

import gpu_health                                   # noqa: E402
from backends import build_coder, build_judge       # noqa: E402
from pipeline import PromptPipeline                 # noqa: E402
from pod_state import PodState, COMPLETE            # noqa: E402
from render_client import RenderClient              # noqa: E402


def _env(name: str, default: str | None = None) -> str | None:
    v = os.environ.get(name)
    return v if v not in (None, "") else default


class RoundRobinCoder:
    """Spread generation across coder replicas (CODER_URLS=url1,url2)."""

    name = "round-robin"

    def __init__(self, urls, model="coder", max_tokens=24576):
        from backends import OpenAICompatCoder
        self.pool = [OpenAICompatCoder(base_url=u, model=model,
                                       max_tokens=max_tokens, timeout=900)
                     for u in urls]
        self._i = 0

    def generate(self, *a, **kw):
        c = self.pool[self._i % len(self.pool)]
        self._i += 1
        return c.generate(*a, **kw)

    def repair(self, *a, **kw):
        return self.pool[self._i % len(self.pool)].repair(*a, **kw)


class S1OnlySelector:
    """On-pod selection: S1 numeric screen only (thinking OFF, four integers).

    The bracket (671 GPU-s/prompt) and multi-stage (380) both blow the 7,200 s
    verification cap at K=20; S1-only (128) fits at 40% of budget. S1 agrees with the
    full judge 100% at gap >= 1.5; pairs it cannot separate are near-equivalent, where
    the choice barely matters.
    """

    name = "s1-only"

    def __init__(self, base_url):
        from multistage import S1Scorer
        self.s1 = S1Scorer(base_url=base_url, model="judge", think=False)

    def score(self, prompt_png, render_png):
        v = self.s1.score(prompt_png, render_png)
        return (v / 10.0 if v is not None else None), "s1"


def build_state() -> PodState:
    urls = [u for u in (_env("CODER_URLS") or _env("CODER_URL") or "").split(",") if u]
    judge_url = _env("JUDGE_URL")
    coder = (RoundRobinCoder(urls, max_tokens=int(_env("CODER_MAX_TOKENS", "24576")))
             if urls else build_coder({"kind": "stub"}))
    judge = S1OnlySelector(judge_url) if judge_url else build_judge({"kind": "none"})

    pipe = PromptPipeline(
        coder,
        judge,
        RenderClient(_env("RENDER_URL", "http://localhost:8000"),
                     n_views=int(_env("N_VIEWS", "12"))),
        ensemble=int(_env("MAX_ENSEMBLE", "8")),
        max_iter=int(_env("MAX_ITER", "2")),
        score_threshold=2.0,     # unreachable on purpose: validity is the stop condition
        use_fallback=True,
    )
    return PodState(
        pipe,
        target_total_seconds=float(_env("TARGET_TOTAL_S", "5000")),
        expected_total_prompts=int(_env("EXPECTED_PROMPTS", "128")),
        max_ensemble=int(_env("MAX_ENSEMBLE", "20")),
        min_ensemble=int(_env("MIN_ENSEMBLE", "1")),
        concurrency=int(_env("CONCURRENCY", "8")),
    )


state: PodState | None = None


def warmup(st: PodState) -> None:
    """Load models and check hardware, then flip to `ready`.

    Budget is 4 hours from pod start. Everything slow belongs here, not in the first
    batch — the generation clock starts at the first POST /generate and never resets.
    """
    st.set_warmup_progress("gpu_health", 0, 2)
    report = gpu_health.check(
        threshold_tflops=float(_env("GPU_MIN_TFLOPS", "30")),
        threshold_vram_gb=float(_env("GPU_MIN_VRAM_GB", "134")),
    )
    if not report.get("all_passed", True):
        st.request_replace(report)
        return

    st.set_warmup_progress("render_service", 1, 2)
    # The renderer is part of the pipeline; if it is not up, generation cannot validate.
    if not st.pipeline.render.health():
        st.request_replace({"benchmark": "render_service",
                            "detail": "render service unreachable"})
        return

    st.mark_ready()


@asynccontextmanager
async def lifespan(app: FastAPI):
    global state
    state = build_state()
    threading.Thread(target=warmup, args=(state,), daemon=True).start()
    yield


app = FastAPI(title="sn17-miner", lifespan=lifespan)


@app.get("/health")
async def health():
    # Liveness only. 200 as soon as the server accepts connections — the orchestrator
    # switches to /status polling after this passes.
    return {"status": "ok"}


@app.get("/status")
async def status(replacements_remaining: int | None = Query(default=None)):
    return state.snapshot(replacements_remaining)


@app.post("/generate")
async def generate(request: Request):
    # Authorization may be present; accept but never require it.
    try:
        body = await request.json()
    except Exception:
        return JSONResponse({"detail": "invalid JSON body"}, status_code=422)

    prompts = body.get("prompts")
    seed = body.get("seed", 0)
    if not isinstance(prompts, list) or not prompts:
        return JSONResponse({"detail": "prompts must be a non-empty list"},
                            status_code=422)
    for p in prompts:
        if not isinstance(p, dict) or "stem" not in p or "image_url" not in p:
            return JSONResponse({"detail": "each prompt needs stem and image_url"},
                                status_code=422)

    accepted, err = state.accept_batch(prompts, int(seed))
    if err:
        return JSONResponse(err, status_code=409)
    return {"accepted": accepted}


@app.get("/results")
async def results():
    data = state.results_bytes()
    if data is None or state.status != COMPLETE:
        return JSONResponse({"detail": "no completed batch",
                             "current_status": state.status}, status_code=409)

    # Chunked transfer encoding is REQUIRED — no Content-Length. Provider proxies
    # enforce idle timeouts and size limits on buffered responses, and a dropped
    # download costs the whole batch. StreamingResponse without a length header
    # makes uvicorn emit chunked.
    def stream():
        buf = io.BytesIO(data)
        while chunk := buf.read(64 * 1024):
            yield chunk

    return StreamingResponse(stream(), media_type="application/zip")


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=int(_env("PORT", "10006")), log_level="info")
