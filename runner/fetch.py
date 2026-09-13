"""Hardened image fetch.

The prompt CDN rejects Python's default `User-Agent: Python-urllib/X.Y` with HTTP 403.
curl and browser agents are served normally. This is a silent round-killer: a pod that
fetches prompts with stock urllib 403s on every image and scores zero across the board,
with nothing in the logs but "download failed".

Always send a real User-Agent, and retry — a round fetches 32 images concurrently and
transient rate-limiting is likelier than a genuine 404.
"""
from __future__ import annotations

import time
import urllib.error
import urllib.request

USER_AGENT = "Mozilla/5.0 (X11; Linux x86_64) sn17-miner/1.0"


def http_get(url: str, *, timeout: float = 60.0, retries: int = 3,
             backoff: float = 1.5) -> bytes:
    last: Exception | None = None
    for attempt in range(retries):
        req = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
        try:
            with urllib.request.urlopen(req, timeout=timeout) as r:
                return r.read()
        except urllib.error.HTTPError as e:
            last = e
            if e.code in (400, 401, 403, 404) and attempt == 0:
                # Retry once even on 4xx — 403 here has been observed as UA/rate related
                # rather than a permanent refusal.
                pass
            elif e.code < 500 and e.code != 429:
                raise
        except Exception as e:
            last = e
        if attempt < retries - 1:
            time.sleep(backoff ** attempt)
    raise last if last else RuntimeError(f"fetch failed: {url}")
