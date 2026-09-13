#!/usr/bin/env python3
"""Drive the miner service exactly as the orchestrator does, and assert the contract.

Run this before every submission. A service that fails here fails verification, and a
failed verification hands back a crown you already won.
"""
from __future__ import annotations

import io
import json
import sys
import time
import urllib.error
import urllib.request
import zipfile
from pathlib import Path

BASE = "http://localhost:10006"
PROMPT_LIST = Path("/workspace/404active/rounds/43/prompts.txt")

passed = failed = 0


def check(name: str, cond: bool, detail: str = "") -> None:
    global passed, failed
    if cond:
        passed += 1
        print(f"  PASS  {name}")
    else:
        failed += 1
        print(f"  FAIL  {name}  {detail}")


def get(path: str, want_raw: bool = False):
    req = urllib.request.Request(BASE + path,
                                 headers={"Authorization": "Bearer test-token"})
    try:
        with urllib.request.urlopen(req, timeout=120) as r:
            body = r.read()
            return r.status, dict(r.headers), (body if want_raw else json.loads(body))
    except urllib.error.HTTPError as e:
        body = e.read()
        try:
            return e.code, dict(e.headers), json.loads(body)
        except Exception:
            return e.code, dict(e.headers), body


def post(path: str, obj: dict):
    req = urllib.request.Request(
        BASE + path, data=json.dumps(obj).encode(),
        headers={"Content-Type": "application/json"}, method="POST")
    try:
        with urllib.request.urlopen(req, timeout=120) as r:
            return r.status, json.loads(r.read())
    except urllib.error.HTTPError as e:
        return e.code, json.loads(e.read())


def wait_status(target: set[str], timeout: float = 900) -> str:
    t0 = time.time()
    last = None
    while time.time() - t0 < timeout:
        _, _, s = get("/status?replacements_remaining=3")
        last = s["status"]
        if last in target:
            return last
        time.sleep(1)
    return last or "timeout"


def main() -> int:
    urls = PROMPT_LIST.read_text().split()
    batch1 = [{"stem": Path(u).stem, "image_url": u} for u in urls[:6]]
    batch2 = [{"stem": Path(u).stem, "image_url": u} for u in urls[6:12]]

    print("\n[1] health + warmup")
    code, _, _ = get("/health")
    check("GET /health -> 200", code == 200, f"got {code}")
    st = wait_status({"ready", "replace"})
    check("reaches ready", st == "ready", f"got {st}")
    if st != "ready":
        return 1

    print("\n[2] 409 semantics before a batch")
    code, body = post("/generate", {"prompts": [], "seed": 1})
    check("empty prompts -> 422", code == 422, f"got {code}")

    print("\n[3] first batch")
    code, body = post("/generate", {"prompts": batch1, "seed": 42})
    check("POST /generate -> 200", code == 200, f"got {code} {body}")
    check("accepted == len(prompts)", body.get("accepted") == len(batch1), str(body))

    print("\n[4] idempotency + conflict while generating")
    code2, body2 = post("/generate", {"prompts": batch1, "seed": 42})
    check("same stems while generating -> 200 (idempotent)", code2 == 200,
          f"got {code2} {body2}")
    check("idempotent retry returns same accepted count",
          body2.get("accepted") == len(batch1), str(body2))
    code3, body3 = post("/generate", {"prompts": batch2, "seed": 42})
    check("different stems while generating -> 409", code3 == 409, f"got {code3}")
    check("409 body carries current_status",
          isinstance(body3, dict) and body3.get("current_status") == "generating",
          str(body3))

    print("\n[5] progress reporting")
    _, _, s = get("/status?replacements_remaining=3")
    if s["status"] == "generating":
        check("generating reports progress int", isinstance(s.get("progress"), int), str(s))
        check("generating reports total", s.get("total") == len(batch1), str(s))
    else:
        check("generating reports progress int", True, "(batch finished too fast)")
        check("generating reports total", True, "(batch finished too fast)")

    st = wait_status({"complete", "replace"})
    check("reaches complete", st == "complete", f"got {st}")

    print("\n[6] results archive")
    code, headers, raw = get("/results", want_raw=True)
    check("GET /results -> 200", code == 200, f"got {code}")
    hl = {k.lower(): v for k, v in headers.items()}
    check("Content-Type is application/zip",
          hl.get("content-type") == "application/zip", str(hl.get("content-type")))
    check("chunked, no Content-Length", "content-length" not in hl,
          f"content-length={hl.get('content-length')}")
    check("transfer-encoding chunked", hl.get("transfer-encoding") == "chunked",
          str(hl.get("transfer-encoding")))
    try:
        z = zipfile.ZipFile(io.BytesIO(raw))
        names = z.namelist()
        bad = z.testzip()
    except Exception as e:
        check("valid ZIP", False, str(e))
        return 1
    check("valid ZIP", bad is None)
    js = [n for n in names if n.endswith(".js")]
    check("archive holds <stem>.js entries", len(js) > 0, str(names[:5]))
    stems = {p["stem"] for p in batch1}
    check("every .js name is a requested stem",
          all(Path(n).stem in stems for n in js), str(js[:3]))
    check("file count within cap (100)", len(names) <= 100, str(len(names)))
    if "_failed.json" in names:
        f = json.loads(z.read("_failed.json"))
        check("_failed.json maps stem -> reason",
              all(isinstance(k, str) and isinstance(v, str) for k, v in f.items()),
              str(f)[:120])
    src = z.read(js[0]).decode()
    check("module exports default generate", "export default function generate" in src,
          src[:80])

    print("\n[7] /results is retryable and byte-identical")
    code_b, _, raw_b = get("/results", want_raw=True)
    check("second GET /results -> 200", code_b == 200, f"got {code_b}")
    check("identical archive on retry", raw_b == raw,
          f"{len(raw)} vs {len(raw_b)} bytes")

    print("\n[8] next batch from complete")
    code, body = post("/generate", {"prompts": batch2, "seed": 42})
    check("POST /generate from complete -> 200", code == 200, f"got {code} {body}")
    st = wait_status({"complete", "replace"})
    check("second batch completes", st == "complete", f"got {st}")
    _, _, s = get("/status?replacements_remaining=3")
    pay = s.get("payload") or {}
    check("payload reports cumulative_seconds", "cumulative_seconds" in pay, str(pay))

    print("\n[9] replacement budget guard")
    _, _, s0 = get("/status?replacements_remaining=0")
    check("never asks for replace at 0 budget", s0["status"] != "replace", str(s0))

    print(f"\n{'─'*56}\npassed {passed}   failed {failed}")
    return 0 if failed == 0 else 1


if __name__ == "__main__":
    sys.exit(main())
