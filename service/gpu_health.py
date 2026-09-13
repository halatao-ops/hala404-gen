"""GPU preflight and per-batch health check.

A degraded pod is worth replacing early: you get 4 pods per round (initial + 3), and a
slow GPU silently burns the shared 2-hour generation budget that does NOT reset on
replacement. But never ask for a replacement you cannot afford — the orchestrator passes
`replacements_remaining`, and requesting `replace` at 0 just wastes the round.

torch is optional. Without it the check degrades to "assume healthy" rather than
crashing the pod, since a false `replace` is more expensive than a missed one.
"""
from __future__ import annotations

import time
from dataclasses import dataclass, asdict


@dataclass
class GpuReport:
    gpu_id: int
    tflops: float
    vram_gb: float
    passed: bool


def _benchmark_gpu(torch, idx: int, threshold_tflops: float,
                   threshold_vram_gb: float, size: int = 8192) -> GpuReport:
    dev = torch.device(f"cuda:{idx}")
    props = torch.cuda.get_device_properties(idx)
    vram_gb = props.total_memory / (1024 ** 3)

    a = torch.randn(size, size, device=dev, dtype=torch.float16)
    b = torch.randn(size, size, device=dev, dtype=torch.float16)
    torch.cuda.synchronize(dev)
    for _ in range(3):                      # warm the clocks before timing
        a @ b
    torch.cuda.synchronize(dev)

    iters = 10
    t0 = time.perf_counter()
    for _ in range(iters):
        a @ b
    torch.cuda.synchronize(dev)
    dt = time.perf_counter() - t0

    flops = 2.0 * (size ** 3) * iters
    tflops = flops / dt / 1e12
    del a, b
    torch.cuda.empty_cache()

    return GpuReport(idx, round(tflops, 1), round(vram_gb, 1),
                     tflops >= threshold_tflops and vram_gb >= threshold_vram_gb)


def check(threshold_tflops: float = 30.0,
          threshold_vram_gb: float = 134.0) -> dict:
    """-> the `payload` object the spec shows for a `replace` status."""
    try:
        import torch
    except ImportError:
        return {"benchmark": "gpu_health", "all_passed": True,
                "note": "torch unavailable — health check skipped", "gpus": []}

    if not torch.cuda.is_available():
        return {"benchmark": "gpu_health", "all_passed": True,
                "note": "no CUDA devices — health check skipped", "gpus": []}

    reports = []
    for i in range(torch.cuda.device_count()):
        try:
            reports.append(_benchmark_gpu(torch, i, threshold_tflops, threshold_vram_gb))
        except Exception as e:
            reports.append(GpuReport(i, 0.0, 0.0, False))
            reports[-1] = GpuReport(i, 0.0, 0.0, False)
    return {
        "benchmark": "gpu_health",
        "threshold_tflops": threshold_tflops,
        "threshold_vram_gb": threshold_vram_gb,
        "all_passed": all(r.passed for r in reports),
        "gpus": [asdict(r) for r in reports],
    }
