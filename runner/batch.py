#!/usr/bin/env python3
"""SN17 batch runner: walk a round's prompts through generate -> validate -> render
-> self-score -> select, and write CDN-ready `<stem>.js` files.

Defaults mirror the real round: 128 prompts, a 240-minute wall-clock budget, and a
`_failed.json` manifest in the same shape the verification pod must return.

  # plumbing test, no model needed
  ./batch.py --limit 5 --ensemble 2

  # real run against your own vLLM
  ./batch.py --coder-url http://localhost:8001/v1 --coder-model my-org/my-coder \\
             --judge-url http://localhost:8002/v1 --judge-model zai-org/GLM-4.6V-Flash \\
             --ensemble 20
"""
from __future__ import annotations

import argparse
import json
import sys
import time
import urllib.request
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))

from backends import build_coder, build_judge          # noqa: E402
from pipeline import PromptPipeline                    # noqa: E402
from fetch import http_get                             # noqa: E402
from render_client import RenderClient                 # noqa: E402

DEFAULT_PROMPTS = Path("/workspace/404active/rounds/43/prompts.txt")
DEFAULT_CACHE = Path("/workspace/sn17-bench/prompts-r43")
GENERATION_WINDOW_S = 240 * 60


def load_prompts(list_file: Path, cache_dir: Path, limit: int | None) -> list[tuple[str, Path, str]]:
    """-> [(stem, local_png_path, url)]"""
    urls = [u.strip() for u in list_file.read_text().split() if u.strip()]
    if limit:
        urls = urls[:limit]
    items = []
    for u in urls:
        stem = Path(u).stem
        items.append((stem, cache_dir / f"{stem}.png", u))
    return items


def ensure_image(path: Path, url: str, timeout: float = 60.0) -> bytes:
    if path.exists() and path.stat().st_size > 0:
        return path.read_bytes()
    path.parent.mkdir(parents=True, exist_ok=True)
    data = http_get(url, timeout=timeout)
    path.write_bytes(data)
    return data


def main() -> int:
    p = argparse.ArgumentParser(description=__doc__,
                                formatter_class=argparse.RawDescriptionHelpFormatter)
    p.add_argument("--prompts", type=Path, default=DEFAULT_PROMPTS)
    p.add_argument("--cache", type=Path, default=DEFAULT_CACHE)
    p.add_argument("--out", type=Path, default=Path("/workspace/sn17-bench/out"))
    p.add_argument("--limit", type=int, default=None)
    p.add_argument("--seed", type=int, default=42)
    p.add_argument("--ensemble", type=int, default=4, help="candidates per prompt")
    p.add_argument("--max-iter", type=int, default=2, help="repair iterations")
    p.add_argument("--score-threshold", type=float, default=0.55)
    p.add_argument("--concurrency", type=int, default=4)
    p.add_argument("--time-budget", type=float, default=GENERATION_WINDOW_S,
                   help="seconds; stop dispatching new prompts past this (round window is 14400)")
    p.add_argument("--render-url", default="http://localhost:8000")
    p.add_argument("--coder-url", default=None, help="OpenAI-compatible base_url; omit for stub")
    p.add_argument("--coder-model", default=None)
    p.add_argument("--coder-key", default="local")
    p.add_argument("--judge-url", default=None)
    p.add_argument("--judge-model", default=None)
    p.add_argument("--judge-key", default="local")
    p.add_argument("--no-fallback", action="store_true",
                   help="do not emit a placeholder module when every candidate fails")
    p.add_argument("--save-renders", action="store_true", help="write best render PNGs")
    p.add_argument("--resume", action="store_true", help="skip stems already written")
    args = p.parse_args()

    render = RenderClient(args.render_url)
    if not render.health():
        print(f"render service not reachable at {args.render_url}\n"
              f"start it:  /workspace/sn17-bench/start-render-service", file=sys.stderr)
        return 2

    coder_cfg = ({"kind": "openai-compat", "base_url": args.coder_url,
                  "model": args.coder_model, "api_key": args.coder_key}
                 if args.coder_url else {"kind": "stub"})
    judge_cfg = ({"kind": "openai-compat", "base_url": args.judge_url,
                  "model": args.judge_model, "api_key": args.judge_key}
                 if args.judge_url else {"kind": "none"})
    if args.coder_url and not args.coder_model:
        print("--coder-url requires --coder-model", file=sys.stderr)
        return 2
    if args.judge_url and not args.judge_model:
        print("--judge-url requires --judge-model", file=sys.stderr)
        return 2

    coder = build_coder(coder_cfg)
    judge = build_judge(judge_cfg)
    pipe = PromptPipeline(coder, judge, render, ensemble=args.ensemble,
                          max_iter=args.max_iter,
                          score_threshold=args.score_threshold,
                          use_fallback=not args.no_fallback)

    items = load_prompts(args.prompts, args.cache, args.limit)
    args.out.mkdir(parents=True, exist_ok=True)
    render_dir = args.out / "renders"
    if args.save_renders:
        render_dir.mkdir(parents=True, exist_ok=True)

    if args.resume:
        before = len(items)
        items = [i for i in items if not (args.out / f"{i[0]}.js").exists()]
        print(f"resume: {before - len(items)} already done, {len(items)} remaining")

    print(f"prompts      : {len(items)}")
    print(f"coder        : {coder.name}" + (f" ({args.coder_model})" if args.coder_model else ""))
    print(f"judge        : {judge.name}" + (f" ({args.judge_model})" if args.judge_model else ""))
    print(f"ensemble     : {args.ensemble}   max_iter: {args.max_iter}   "
          f"threshold: {args.score_threshold}")
    print(f"time budget  : {args.time_budget/60:.0f} min   concurrency: {args.concurrency}")
    if coder.name == "stub":
        print("\n  NOTE: stub coder — every prompt gets the same car.js. This exercises the\n"
              "  validate/render/select plumbing only. Quality numbers are meaningless.\n")

    t0 = time.perf_counter()
    results, skipped = [], []

    def work(item):
        stem, path, url = item
        try:
            img = ensure_image(path, url)
        except Exception as e:
            from pipeline import PromptOutcome
            o = PromptOutcome(stem=stem)
            o.error = f"image download failed: {type(e).__name__}: {e}"
            return o
        return pipe.run(stem, img, args.seed)

    # Dispatch is demand-driven, not fire-and-forget: submitting every prompt up front
    # would make the time budget meaningless, since the submit loop finishes in
    # milliseconds. We keep `concurrency` prompts in flight and queue the next one only
    # if the budget still allows, so an overrun stops the run instead of blowing the
    # 240-minute window. Work already in flight is always drained — never discarded.
    pending = list(items)
    total = len(pending)
    done = 0

    with ThreadPoolExecutor(max_workers=args.concurrency) as ex:
        futures: dict = {}

        def fill():
            """Top up the in-flight set. Returns False once the budget is spent."""
            if time.perf_counter() - t0 > args.time_budget:
                return False
            while pending and len(futures) < args.concurrency:
                item = pending.pop(0)
                futures[ex.submit(work, item)] = item[0]
                if time.perf_counter() - t0 > args.time_budget:
                    return False
            return True

        fill()
        while futures:
            fut = next(as_completed(list(futures)))
            stem = futures.pop(fut)
            done += 1
            try:
                out = fut.result()
            except Exception as e:
                # Count it as a failure — a swallowed exception would silently
                # under-report the very thing that costs you duels.
                from pipeline import PromptOutcome
                out = PromptOutcome(stem=stem)
                out.error = f"pipeline exception: {type(e).__name__}: {e}"
            results.append(out)
            if out.ok:
                (args.out / f"{out.stem}.js").write_text(out.source)
                if args.save_renders and out.best_png:
                    (render_dir / f"{out.stem}.png").write_bytes(out.best_png)
            score = "  n/a" if out.score is None else f"{out.score:5.2f}"
            tag = "FALLBACK" if out.used_fallback else ("ok" if out.ok else "FAIL")
            nv = sum(1 for a in out.attempts if a.valid)
            print(f"  [{done}/{total}] {stem[:12]} {tag:8s} score {score} "
                  f"valid {nv}/{len(out.attempts)} {out.elapsed_s:6.1f}s"
                  + (f"  {out.error[:60]}" if out.error else ""))
            if not fill() and pending:
                print(f"\n  time budget spent — {len(pending)} prompt(s) not started; "
                      f"draining {len(futures)} in flight")
                # keep looping to drain futures, but stop queueing new work
                while futures:
                    fut = next(as_completed(list(futures)))
                    stem = futures.pop(fut)
                    done += 1
                    try:
                        out = fut.result()
                    except Exception as e:
                        from pipeline import PromptOutcome
                        out = PromptOutcome(stem=stem)
                        out.error = f"pipeline exception: {type(e).__name__}: {e}"
                    results.append(out)
                    if out.ok:
                        (args.out / f"{out.stem}.js").write_text(out.source)
                        if args.save_renders and out.best_png:
                            (render_dir / f"{out.stem}.png").write_bytes(out.best_png)
                    print(f"  [{done}/{total}] {stem[:12]} drained")
                break

    skipped.extend(i[0] for i in pending)

    elapsed = time.perf_counter() - t0

    failed = {o.stem: (o.error or "no valid candidate") for o in results if not o.ok}
    for s in skipped:
        failed[s] = "skipped: time budget exhausted"
    if failed:
        (args.out / "_failed.json").write_text(json.dumps(failed, indent=1))
    elif (args.out / "_failed.json").exists():
        (args.out / "_failed.json").unlink()

    emitted = sum(1 for o in results if o.ok)
    fallbacks = sum(1 for o in results if o.used_fallback)
    real = emitted - fallbacks
    scored = [o.score for o in results if o.score is not None]
    valid_rate = [sum(1 for a in o.attempts if a.valid) / len(o.attempts)
                  for o in results if o.attempts]

    report = {
        "prompts_requested": len(items),
        "completed": len(results),
        "skipped_time_budget": len(skipped),
        "emitted_js": emitted,
        "real_generations": real,
        "fallbacks": fallbacks,
        "failed": len(failed),
        "elapsed_s": round(elapsed, 1),
        "elapsed_min": round(elapsed / 60, 1),
        "candidate_valid_rate": round(sum(valid_rate) / len(valid_rate), 4) if valid_rate else None,
        "mean_score": round(sum(scored) / len(scored), 4) if scored else None,
        "coder": coder.name, "judge": judge.name,
        "ensemble": args.ensemble, "seed": args.seed,
        "per_prompt": [o.summary() for o in results],
    }
    (args.out / "report.json").write_text(json.dumps(report, indent=1))

    print("\n" + "─" * 64)
    print(f"emitted .js        : {emitted}/{len(items)}   (real {real}, fallback {fallbacks})")
    print(f"failed             : {len(failed)}"
          + (f"  (incl. {len(skipped)} skipped on time budget)" if skipped else ""))
    if valid_rate:
        print(f"candidate validity : {100*sum(valid_rate)/len(valid_rate):.1f}% of generated candidates passed")
    print(f"mean score         : {report['mean_score'] if scored else 'n/a (no judge configured)'}")
    print(f"wall clock         : {elapsed/60:.1f} min / {args.time_budget/60:.0f} min budget")
    print(f"output             : {args.out}")
    print(f"report             : {args.out / 'report.json'}")

    # A prompt with no .js is an automatic loss against every other miner.
    if failed:
        print(f"\n  {len(failed)} prompt(s) have no module — each is an automatic loss "
              f"against every miner.\n  Tolerance on the verification pod is 12 of 128.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
