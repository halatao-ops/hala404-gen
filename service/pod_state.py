"""Pod state machine + background batch generation.

State:  warming_up -> ready -> generating -> complete <-> generating
                                     \\-> replace (degraded hardware)

Two rules drive the design:

1. `/status` must stay responsive regardless of generation load, so all generation runs
   on a background thread and the handlers only read state under a short-lived lock.
2. The 2-hour generation budget is shared across ALL batches and does not reset on pod
   replacement. Seven of the twelve recorded verification rejections in this competition
   were that time limit — not quality — so the runner adapts ensemble size downward when
   it projects an overrun, rather than producing beautiful output too late to count.
"""
from __future__ import annotations

import io
import json
import threading
import time
import zipfile

from fetch import http_get
from dataclasses import dataclass, field

WARMING_UP = "warming_up"
READY = "ready"
GENERATING = "generating"
COMPLETE = "complete"
REPLACE = "replace"

MAX_ZIP_BYTES = 64 * 1024 * 1024   # orchestrator hard cap
MAX_ZIP_FILES = 100                # expected 33 = 32 .js + _failed.json


@dataclass
class BatchResult:
    stems: tuple[str, ...]
    zip_bytes: bytes
    generated: int
    failed: dict[str, str] = field(default_factory=dict)


class PodState:
    def __init__(self, pipeline, *, target_total_seconds: float = 5000.0,
                 expected_total_prompts: int = 128, max_ensemble: int = 20,
                 min_ensemble: int = 1, concurrency: int = 8,
                 image_timeout: float = 60.0):
        self._lock = threading.Lock()
        self._status = WARMING_UP
        self._payload: dict | None = None
        self._progress: int | None = None
        self._total: int | None = None

        self.pipeline = pipeline
        self.target_total_seconds = target_total_seconds
        self.expected_total_prompts = expected_total_prompts
        self.max_ensemble = max_ensemble
        self.min_ensemble = min_ensemble
        self.concurrency = concurrency
        self.image_timeout = image_timeout

        self._current_stems: tuple[str, ...] = ()
        self._result: BatchResult | None = None
        self._thread: threading.Thread | None = None

        # Cumulative across every batch this pod has handled.
        self._elapsed_total = 0.0
        self._processed_total = 0

    # ---------- status ----------

    def snapshot(self, replacements_remaining: int | None = None) -> dict:
        with self._lock:
            status, payload = self._status, self._payload
            progress, total = self._progress, self._total
        # Never ask for a pod we cannot afford — a `replace` at 0 budget just burns
        # the round. Degrade to serving the batch on the hardware we have.
        if status == REPLACE and replacements_remaining == 0:
            status = READY if self._result is None else COMPLETE
            payload = {**(payload or {}), "suppressed": "no replacements remaining"}
        return {"status": status, "progress": progress, "total": total, "payload": payload}

    def set_warmup_progress(self, stage: str, progress: int, total: int) -> None:
        with self._lock:
            if self._status == WARMING_UP:
                self._payload = {"stage": stage, "progress": progress, "total": total}

    def mark_ready(self) -> None:
        with self._lock:
            self._status = READY
            self._payload = None

    def request_replace(self, payload: dict) -> None:
        with self._lock:
            self._status = REPLACE
            self._payload = payload

    @property
    def status(self) -> str:
        with self._lock:
            return self._status

    # ---------- batch acceptance ----------

    def accept_batch(self, prompts: list[dict], seed: int) -> tuple[int, dict | None]:
        """-> (accepted_count, error). error is a 409 body when the batch is refused."""
        stems = tuple(p["stem"] for p in prompts)
        with self._lock:
            status = self._status

            # Idempotency: a retry of the batch we are already on is a no-op 200.
            if stems == self._current_stems and status in (GENERATING, COMPLETE):
                return len(stems), None

            if status == GENERATING:
                return 0, {"detail": "Cannot accept batch", "current_status": GENERATING}
            if status == WARMING_UP:
                return 0, {"detail": "Cannot accept batch", "current_status": WARMING_UP}
            if status == REPLACE:
                return 0, {"detail": "Cannot accept batch", "current_status": REPLACE}

            # ready or complete -> start the new batch
            self._status = GENERATING
            self._current_stems = stems
            self._result = None
            self._progress = 0
            self._total = len(stems)
            self._payload = None

        self._thread = threading.Thread(
            target=self._run_batch, args=(list(prompts), seed), daemon=True)
        self._thread.start()
        return len(stems), None

    # ---------- generation ----------

    def _ensemble_for_now(self, elapsed_batch: float, done_in_batch: int) -> int:
        """Scale candidates to fit the shared budget, based on measured pace."""
        processed = self._processed_total + done_in_batch
        if processed == 0:
            return self.max_ensemble
        elapsed = self._elapsed_total + elapsed_batch
        remaining_prompts = max(0, self.expected_total_prompts - processed)
        if remaining_prompts == 0:
            return self.max_ensemble
        mean_s = elapsed / processed
        projected = elapsed + mean_s * remaining_prompts
        if projected <= self.target_total_seconds * 0.85:
            return self.max_ensemble
        # Shrink proportionally to the overrun, never below min_ensemble.
        budget_left = max(0.0, self.target_total_seconds - elapsed)
        allowance = budget_left / remaining_prompts
        if mean_s <= 0:
            return self.max_ensemble
        scaled = int(self.max_ensemble * (allowance / mean_s))
        return max(self.min_ensemble, min(self.max_ensemble, scaled))

    def _fetch_image(self, url: str) -> bytes:
        # Must go through http_get: the prompt CDN 403s stock urllib's User-Agent.
        return http_get(url, timeout=self.image_timeout)

    def _run_batch(self, prompts: list[dict], seed: int) -> None:
        from concurrent.futures import ThreadPoolExecutor, as_completed

        t0 = time.perf_counter()
        sources: dict[str, str] = {}
        failed: dict[str, str] = {}
        done = 0

        def one(p: dict):
            stem = p["stem"]
            try:
                img = self._fetch_image(p["image_url"])
            except Exception as e:
                return stem, None, f"image download failed: {type(e).__name__}: {e}"
            n = self._ensemble_for_now(time.perf_counter() - t0, done)
            prev = self.pipeline.ensemble
            self.pipeline.ensemble = n
            try:
                out = self.pipeline.run(stem, img, seed)
            except Exception as e:
                return stem, None, f"pipeline error: {type(e).__name__}: {e}"
            finally:
                self.pipeline.ensemble = prev
            if out.ok and out.source:
                return stem, out.source, None
            return stem, None, out.error or "no valid candidate"

        try:
            with ThreadPoolExecutor(max_workers=self.concurrency) as ex:
                futs = [ex.submit(one, p) for p in prompts]
                for f in as_completed(futs):
                    stem, src, err = f.result()
                    if src:
                        sources[stem] = src
                    else:
                        failed[stem] = err or "unknown"
                    done += 1
                    with self._lock:
                        self._progress = done
        except Exception as e:
            for p in prompts:
                failed.setdefault(p["stem"], f"batch aborted: {type(e).__name__}: {e}")

        elapsed = time.perf_counter() - t0
        self._elapsed_total += elapsed
        self._processed_total += len(prompts)

        buf = io.BytesIO()
        with zipfile.ZipFile(buf, "w", zipfile.ZIP_DEFLATED) as z:
            for stem, src in sources.items():
                if len(z.namelist()) >= MAX_ZIP_FILES - 1:
                    failed[stem] = "dropped: archive file cap"
                    continue
                z.writestr(f"{stem}.js", src)
            if failed:
                z.writestr("_failed.json", json.dumps(failed, indent=1))
        data = buf.getvalue()
        if len(data) > MAX_ZIP_BYTES:
            # Better to ship a truncated archive than to have the orchestrator
            # reject an oversized one and score the whole batch zero.
            keep, acc = {}, 0
            for stem, src in sources.items():
                if acc + len(src) > MAX_ZIP_BYTES // 2:
                    failed[stem] = "dropped: archive size cap"
                    continue
                keep[stem] = src
                acc += len(src)
            buf = io.BytesIO()
            with zipfile.ZipFile(buf, "w", zipfile.ZIP_DEFLATED) as z:
                for stem, src in keep.items():
                    z.writestr(f"{stem}.js", src)
                z.writestr("_failed.json", json.dumps(failed, indent=1))
            data = buf.getvalue()
            sources = keep

        with self._lock:
            self._result = BatchResult(tuple(p["stem"] for p in prompts), data,
                                       len(sources), failed)
            self._status = COMPLETE
            self._progress = None
            self._total = None
            self._payload = {
                "batch_seconds": round(elapsed, 1),
                "cumulative_seconds": round(self._elapsed_total, 1),
                "target_total_seconds": self.target_total_seconds,
                "generated": len(sources),
                "failed": len(failed),
            }

    # ---------- results ----------

    def results_bytes(self) -> bytes | None:
        with self._lock:
            return self._result.zip_bytes if self._result else None
