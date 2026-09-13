#!/usr/bin/env bash
# SN17 miner pod entrypoint — SELF-CONTAINED: render sidecar, coder+judge vLLMs, API.
#
# Topology (4xH200 default, from measured budgets):
#   GPU 0,1  coder replicas (OupiGoupi FP8)  — K=8 regeneration ≈ 2,200s of the 7,200s cap
#   GPU 2    judge (GLM-4.6V-Flash)          — S1-only selection (thinking OFF, 4 ints)
#   GPU 3    spare headroom
# Lessons baked in: two-PHASE starts (a co-located vLLM profiling while another
# allocates reads negative KV), S1-only on-pod selection (bracket/multistage blow the
# cap), thinking OFF for scoring only.
set -uo pipefail
RENDER_PORT="${RENDER_PORT:-8000}"
PORT="${PORT:-10006}"
CODER=Tooony133/Qwen-3.6-27B-OupiGoupi
CODER_REV=1683b08dfa4a36b0ad09fa50c222674caf69c2d0
JUDGE=zai-org/GLM-4.6V-Flash
N_GPUS=$(nvidia-smi --query-gpu=index --format=csv,noheader 2>/dev/null | wc -l)
echo "[entrypoint] $N_GPUS GPUs visible"
if [ "$N_GPUS" -eq 0 ]; then
  echo "[entrypoint] NO GPUs — stub mode (conformance testing only)"
  ( cd /app/render-service-js && PORT="$RENDER_PORT" node src/server.js ) &
  for i in $(seq 1 300); do curl -sf -o /dev/null "http://localhost:$RENDER_PORT/ping" && break; sleep 1; done
  export RENDER_URL="http://localhost:$RENDER_PORT"
  exec python -u /app/service/main.py
fi

echo "[entrypoint] render sidecar :$RENDER_PORT"
( cd /app/render-service-js && PORT="$RENDER_PORT" node src/server.js ) &
for i in $(seq 1 300); do
  curl -sf -o /dev/null "http://localhost:$RENDER_PORT/ping" && break; sleep 1
done

wait_llm () { for i in $(seq 1 3600); do curl -sf -o /dev/null "http://localhost:$1/v1/models" && { echo "[entrypoint] $2 ready (${i}s)"; return 0; }; sleep 1; done; echo "[entrypoint] $2 TIMEOUT"; return 1; }

# phase 1: coder replicas
CODER_URLS=""
for g in 0 $( [ "$N_GPUS" -ge 2 ] && echo 1 ); do
  port=$((8100 + g))
  CUDA_VISIBLE_DEVICES=$g vllm serve "$CODER" --revision "$CODER_REV" \
    --port $port --served-model-name coder --tensor-parallel-size 1 \
    --gpu-memory-utilization 0.90 --max-model-len 32768 --max-num-seqs 48 \
    --trust-remote-code > /var/log/coder$g.log 2>&1 &
  CODER_URLS="${CODER_URLS:+$CODER_URLS,}http://localhost:$port/v1"
done
for g in 0 $( [ "$N_GPUS" -ge 2 ] && echo 1 ); do wait_llm $((8100+g)) "coder$g" || exit 1; done

# phase 2: judge (only after coders settle)
JGPU=$(( N_GPUS >= 3 ? 2 : 0 ))
JUTIL=$([ "$N_GPUS" -ge 3 ] && echo 0.90 || echo 0.35)
CUDA_VISIBLE_DEVICES=$JGPU vllm serve "$JUDGE" --port 8200 --served-model-name judge \
  --tensor-parallel-size 1 --gpu-memory-utilization "$JUTIL" \
  --max-model-len 32768 --max-num-seqs 16 --limit-mm-per-prompt '{"image":4}' \
  --trust-remote-code > /var/log/judge.log 2>&1 &
wait_llm 8200 judge || exit 1

export CODER_URLS JUDGE_URL="http://localhost:8200/v1" RENDER_URL="http://localhost:$RENDER_PORT"
echo "[entrypoint] starting miner API :$PORT (coders: $CODER_URLS)"
exec python -u /app/service/main.py
