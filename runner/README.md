# SN17 batch runner

Walks a round's prompts through **generate → validate → render → self-score → select**
and writes CDN-ready `<stem>.js` files plus a `_failed.json` manifest.

Structure mirrors what the round-42 champion shipped: an ensemble of candidates per
prompt, local rendering, a VLM self-judge, best-of selection, and bounded repair
iterations. Stdlib-only Python, so it drops into your Docker image unchanged.

## Why the same core must serve both runs

The verification duel rejects you if your **submitted** output strictly beats your
**regenerated** output — margin 0%. So the code that produces your submission and the
code inside your Docker image must be the same code, with the same per-prompt compute
budget. `pipeline.PromptPipeline` is that shared core; `batch.py` is just a CLI around
it, and your `POST /generate` handler should be another.

## Prerequisites

The render service must be up — it does static analysis, sandboxed execution,
post-validation and rendering in one call, using the production code path:

```bash
/workspace/sn17-bench/start-render-service     # port 8000, idempotent
```

## Usage

```bash
# plumbing test — no model, no GPU. Exercises validate/render/select only.
./batch.py --limit 5 --ensemble 2

# real run against your own vLLM instances
./batch.py \
  --coder-url http://localhost:8001/v1 --coder-model my-org/my-coder \
  --judge-url http://localhost:8002/v1 --judge-model zai-org/GLM-4.6V-Flash \
  --ensemble 20 --concurrency 8 --save-renders
```

| Flag | Default | Notes |
|---|---|---|
| `--prompts` | round-43 list | any file of prompt image URLs |
| `--cache` | `prompts-r43/` | images are fetched once and reused |
| `--ensemble` | 4 | candidates per prompt (champion runs **20**) |
| `--max-iter` | 2 | repair rounds; failures are fed back to the model verbatim |
| `--score-threshold` | 0.55 | stop early once a candidate scores this well |
| `--time-budget` | 14400 | seconds — the real round window is 240 min |
| `--concurrency` | 4 | prompts in flight |
| `--resume` | off | skip stems already written |
| `--no-fallback` | off | see *Fallback* below |

## Design decisions worth knowing

**Fallback modules are on by default.** If every candidate for a prompt fails, the
runner emits a known-good module rather than nothing. A missing file and an invalid
file both score zero against the field — but a *valid* module can still win duels
against other miners' failures. Never submit nothing. Use `--no-fallback` when you are
measuring true generation quality, since fallbacks would otherwise flatter your numbers.

**The time budget gates dispatch, not completion.** Prompts are queued on demand, at
most `--concurrency` in flight. When the budget is spent the runner stops starting new
work and drains what is already running — in-flight results are never discarded.
Unstarted prompts land in `_failed.json` as `skipped: time budget exhausted`.

**Scores are never invented.** With no `--judge-url`, the judge reports `None` and
selection falls back to first-valid. The report prints `n/a (no judge configured)`
rather than a fabricated number.

**The stub coder is not a generator.** Without `--coder-url` every prompt gets the same
`car.js`. It exists to exercise the plumbing before you rent a GPU. Quality figures from
a stub run are meaningless and the runner says so on startup.

## Outputs

```
out/
  <stem>.js         one per prompt — upload this directory to your CDN
  _failed.json      {stem: reason} — same shape the pod must return, omitted if empty
  report.json       per-prompt outcomes, validity rate, timings, scores
  renders/          best render per prompt (--save-renders)
```

## Reading the report

- `candidate_valid_rate` — fraction of *generated candidates* that passed validation.
  This is your reliability signal. The verification pod tolerates **12 failures of 128**
  (`MAX_MISMATCHED_PROMPTS`), so a low rate here predicts rejection there.
- `elapsed_min` against 240 — your submission window.
- Separately, your pipeline must regenerate 128 prompts in **7200 s on 4×H200**, three
  consecutive repeats. Seven of the twelve recorded verification rejections in this
  competition were that time limit, not quality. Build to ~5000 s.

## Compliance reminder

During generation you may only call **open-source, commercially-licensed** models. No
closed-source APIs (OpenAI, Anthropic). The OpenAI *wire format* is fine — the model
behind `--coder-url` must be compliant, and it must be pinned by revision in your repo.
