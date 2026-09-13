"""Replica of the REAL validators' S1 judge (ported from the champion's multi_stage.py,
which our duel-report mining showed is itself a replica of the validator protocol).

Protocol, verbatim from the real system:
- inputs are SINGLE white-background views at 4 fixed frontal angles, not grids
- per angle, TWO calls (both slot orders): reference + model1 + model2, anchored
  penalty rubric 0-10 per model, temperature 0.0
- per-angle penalties averaged across orders; sign-flip between orders marks the angle
  contradictory and it is dropped
- aggregate: weighted mean penalty per side over consistent angles;
  draw if both-bad (avg >= 8, |diff| <= 1.5), draw if |diff| <= 0.7,
  draw if signed angles split (consistency < 0.65 with >= 3 signed); else lower
  penalty wins.

Why replicate instead of keep our own: our home-grown pairwise judge measured only
55-58% agreement with the real judge's verdicts — near chance. Agreement of THIS replica
against the 15,381 labeled real duels is the calibration that decides if we can trust it.
"""
from __future__ import annotations

import json
import urllib.request
from concurrent.futures import ThreadPoolExecutor

from backends import extract_json

S1_ANGLES = [
    (30, 0, 1.0, "front_left"),
    (330, 0, 1.0, "front_right"),
    (0, 15, 1.0, "front_below"),
    (0, -30, 1.0, "front_above"),
]
S1_ANGLE_DESC = {
    "front_left": "slightly left of the front",
    "front_right": "slightly right of the front",
    "front_below": "the front, from slightly below",
    "front_above": "the front, from slightly above",
}
S1_DRAW_THRESHOLD = 0.7
S1_BOTH_BAD_AVG = 8.0
S1_BOTH_BAD_MAX_DIFF = 1.5
S1_SPLIT_CONSISTENCY_THRESH = 0.65
S1_SPLIT_MIN_SIGNED = 3

SYSTEM = ("You are a specialized 3D model evaluation system.\n"
          "Analyze visual quality and prompt adherence with expert precision.\n"
          "Always respond with valid JSON only.")

USER_TMPL = (
    "You see two 3D models rendered from {angle_desc}.\n"
    "The reference image shows the target object.\n\n"
    "Which model is a more faithful 3D reproduction of the reference?\n\n"
    "Penalty 0-10:\n"
    "0 = Perfect match to reference\n"
    "3 = Minor issues (slight shape differences, missing small details)\n"
    "5 = Moderate issues (wrong style, significant details missing)\n"
    "7 = Major issues (wrong category but related, e.g. chair vs stool)\n"
    "10 = Completely wrong object\n\n"
    'Output: {{"penalty_1": <0-10>, "penalty_2": <0-10>, "issues": "<brief>"}}'
)


def render_single_view(render_url: str, source: str, theta: float, phi: float,
                       timeout: float = 300.0) -> bytes | None:
    """One white-background view via our render service (same code validators run)."""
    q = f"?thetas={theta}&phis={phi}&bg_color=ffffff&lighting=neutral"
    req = urllib.request.Request(
        render_url.rstrip("/") + "/render" + q,
        data=json.dumps({"source": source}).encode(),
        headers={"Content-Type": "application/json"}, method="POST")
    try:
        with urllib.request.urlopen(req, timeout=timeout) as r:
            return r.read()
    except Exception:
        return None


def render_s1_views(render_url: str, source: str) -> dict | None:
    """-> {label: png} for the 4 S1 angles, or None if any view fails."""
    out = {}
    with ThreadPoolExecutor(max_workers=4) as ex:
        futs = {label: ex.submit(render_single_view, render_url, source, th, ph)
                for th, ph, _w, label in S1_ANGLES}
        for label, f in futs.items():
            png = f.result()
            if png is None:
                return None
            out[label] = png
    return out


class RealS1Judge:
    def __init__(self, base_url: str, model: str = "judge", api_key: str = "local",
                 timeout: float = 300.0, think: bool = False, retries: int = 3):
        self.base_url = base_url.rstrip("/")
        self.model = model
        self.api_key = api_key
        self.timeout = timeout
        self.think = think
        self.retries = retries

    def _img(self, raw: bytes) -> dict:
        import base64
        return {"type": "image_url",
                "image_url": {"url": "data:image/png;base64," + base64.b64encode(raw).decode()}}

    def _ask(self, ref: bytes, m1: bytes, m2: bytes, angle_desc: str):
        payload = {
            "model": self.model,
            "messages": [
                {"role": "system", "content": SYSTEM},
                {"role": "user", "content": [
                    {"type": "text", "text": "Reference image (target object):"},
                    self._img(ref),
                    {"type": "text", "text": "3D model 1:"},
                    self._img(m1),
                    {"type": "text", "text": "3D model 2:"},
                    self._img(m2),
                    {"type": "text", "text": USER_TMPL.format(angle_desc=angle_desc)},
                ]},
            ],
            "temperature": 0.0,
            "max_tokens": 1024,
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
            o = extract_json(text)
            if o is None:
                continue
            try:
                p1 = max(0.0, min(10.0, float(o.get("penalty_1"))))
                p2 = max(0.0, min(10.0, float(o.get("penalty_2"))))
                return p1, p2, False
            except Exception:
                continue
        return 5.0, 5.0, True     # neutral + json_failed, like the real system

    def duel(self, ref: bytes, views_a: dict, views_b: dict, workers: int = 8):
        """-> ('A'|'B'|'draw', detail) following the real aggregation exactly."""
        tasks = []
        for th, ph, w, label in S1_ANGLES:
            if label not in views_a or label not in views_b:
                continue
            desc = S1_ANGLE_DESC[label]
            tasks.append((label, w, views_a[label], views_b[label], desc, False))
            tasks.append((label, w, views_b[label], views_a[label], desc, True))
        with ThreadPoolExecutor(max_workers=workers) as ex:
            results = list(ex.map(lambda t: self._ask(ref, t[2], t[3], t[4]), tasks))

        angles = []
        for i in range(0, len(tasks), 2):
            label, w = tasks[i][0], tasks[i][1]
            (ab1, ab2, jf1) = results[i]        # order A,B  -> penalty_1 = A
            (ba1, ba2, jf2) = results[i + 1]    # order B,A  -> penalty_1 = B
            pen_a_ab, pen_b_ab = ab1, ab2
            pen_a_ba, pen_b_ba = ba2, ba1
            diff_ab = pen_a_ab - pen_b_ab
            diff_ba = pen_a_ba - pen_b_ba
            json_failed = jf1 or jf2
            contradictory = json_failed or ((diff_ab > 0 and diff_ba < 0)
                                            or (diff_ab < 0 and diff_ba > 0))
            angles.append(dict(label=label, weight=w,
                               pen_a=(pen_a_ab + pen_a_ba) / 2,
                               pen_b=(pen_b_ab + pen_b_ba) / 2,
                               contradictory=contradictory))

        consistent = [a for a in angles if not a["contradictory"]]
        if not consistent:
            return "draw", dict(angles=angles, why="all contradictory")
        tw = sum(a["weight"] for a in consistent)
        wpa = sum(a["weight"] * a["pen_a"] for a in consistent) / tw
        wpb = sum(a["weight"] * a["pen_b"] for a in consistent) / tw
        diff = wpa - wpb
        avg = (wpa + wpb) / 2
        detail = dict(angles=angles, wpa=round(wpa, 2), wpb=round(wpb, 2))
        if avg >= S1_BOTH_BAD_AVG and abs(diff) <= S1_BOTH_BAD_MAX_DIFF:
            return "draw", {**detail, "why": "both-bad"}
        if abs(diff) <= S1_DRAW_THRESHOLD:
            return "draw", {**detail, "why": "close"}
        w_a = sum(a["weight"] for a in consistent if a["pen_a"] < a["pen_b"])
        w_b = sum(a["weight"] for a in consistent if a["pen_b"] < a["pen_a"])
        n_signed = sum(1 for a in consistent if a["pen_a"] != a["pen_b"])
        tot = w_a + w_b
        consistency = abs(w_a - w_b) / tot if tot else 1.0
        if n_signed >= S1_SPLIT_MIN_SIGNED and consistency < S1_SPLIT_CONSISTENCY_THRESH:
            return "draw", {**detail, "why": "split"}
        return ("A" if diff < 0 else "B"), {**detail, "why": "decided"}
