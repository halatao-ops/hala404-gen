"""Client for the local render-service-js.

One call does static analysis, sandboxed execution, post-validation and rendering —
the same code path production uses. A 422 carries structured `{stage, rule, detail}`
failures, which is exactly what you feed back to the coder model on a retry.
"""
from __future__ import annotations

import json
import urllib.error
import urllib.request
from dataclasses import dataclass, field


@dataclass
class RenderResult:
    ok: bool
    png: bytes | None = None
    failures: list[dict] = field(default_factory=list)
    metrics: dict = field(default_factory=dict)
    error: str = ""
    elapsed_ms: float = 0.0

    def failure_text(self) -> str:
        """Compact, model-readable summary of why this candidate was rejected."""
        if self.error and not self.failures:
            return self.error
        parts = []
        for f in self.failures:
            stage = f.get("stage", "?")
            rule = f.get("rule", "?")
            detail = f.get("detail", "")
            parts.append(f"[{stage}/{rule}] {detail}".strip())
        return "; ".join(parts) or "unknown failure"


class RenderClient:
    def __init__(self, base_url: str = "http://localhost:8000", timeout: float = 120.0,
                 lighting: str = "neutral", n_views: int = 4, elevations=None):
        self.base_url = base_url.rstrip("/")
        self.timeout = timeout
        self.lighting = lighting
        # The renderer already accepts arbitrary thetas/phis, so richer coverage is a
        # query param, not a code change. The champion judges on 12 white + 4 gray views;
        # 4 views (the default) may simply not show the judge enough to discriminate.
        self.n_views = n_views
        self.elevations = elevations or [-15.0, 10.0, -35.0]

    def _view_params(self) -> str:
        if self.n_views <= 4:
            return ""
        step = 360.0 / self.n_views
        thetas, phis = [], []
        for i in range(self.n_views):
            thetas.append(round(24.0 + i * step, 1))
            phis.append(self.elevations[i % len(self.elevations)])
        return ("&thetas=" + ",".join(str(t) for t in thetas)
                + "&phis=" + ",".join(str(p) for p in phis))

    def health(self) -> bool:
        try:
            with urllib.request.urlopen(f"{self.base_url}/health", timeout=5) as r:
                return r.status == 200
        except Exception:
            return False

    def render_grid(self, source: str) -> RenderResult:
        """Validate + render. ok=True means the module would be accepted in production."""
        import time
        body = json.dumps({"source": source}).encode()
        req = urllib.request.Request(
            f"{self.base_url}/render/grid?lighting={self.lighting}{self._view_params()}",
            data=body,
            headers={"Content-Type": "application/json"},
            method="POST",
        )
        t0 = time.perf_counter()
        try:
            with urllib.request.urlopen(req, timeout=self.timeout) as r:
                png = r.read()
            return RenderResult(ok=True, png=png,
                                elapsed_ms=(time.perf_counter() - t0) * 1000)
        except urllib.error.HTTPError as e:
            raw = e.read()
            elapsed = (time.perf_counter() - t0) * 1000
            try:
                payload = json.loads(raw)
            except Exception:
                return RenderResult(ok=False, error=f"http {e.code}: {raw[:200]!r}",
                                    elapsed_ms=elapsed)
            return RenderResult(
                ok=False,
                failures=payload.get("failures", []),
                metrics=payload.get("metrics", {}) or {},
                error=payload.get("error", f"http {e.code}"),
                elapsed_ms=elapsed,
            )
        except Exception as e:
            return RenderResult(ok=False, error=f"{type(e).__name__}: {e}",
                                elapsed_ms=(time.perf_counter() - t0) * 1000)
