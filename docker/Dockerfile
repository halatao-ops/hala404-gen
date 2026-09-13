# SN17 miner image.
#
# REQUIRED LAYOUT: this file must sit at `docker/Dockerfile` in your submission repo's
# root, and the build context is the repo root:  docker build -f docker/Dockerfile .
# The orchestrator's build pipeline assumes exactly that.
#
# Every dependency below is pinned. Floating versions may be rejected as
# non-reproducible, and a rejected build costs you the crown you just won.

# Swap to a CUDA base once you add vLLM, e.g.
#   pytorch/pytorch:2.5.1-cuda12.4-cudnn9-runtime
FROM vllm/vllm-openai:v0.29.0

ENV DEBIAN_FRONTEND=noninteractive \
    PYTHONUNBUFFERED=1 \
    NODE_VERSION=22.23.2 \
    PUPPETEER_CACHE_DIR=/opt/puppeteer

# Chromium's runtime libs — headless WebGL will not start without these.
RUN apt-get update && apt-get install -y --no-install-recommends \
      ca-certificates curl xz-utils \
      libnss3 libnspr4 libatk1.0-0t64 libatk-bridge2.0-0t64 libcups2t64 libdrm2 \
      libxkbcommon0 libxcomposite1 libxdamage1 libxfixes3 libxrandr2 libgbm1 \
      libasound2t64 libpango-1.0-0 libcairo2 \
    && rm -rf /var/lib/apt/lists/*

# Node from the official tarball, pinned by version.
RUN curl -fsSL "https://nodejs.org/dist/v${NODE_VERSION}/node-v${NODE_VERSION}-linux-x64.tar.xz" \
      -o /tmp/node.tar.xz \
 && tar -xJf /tmp/node.tar.xz -C /usr/local --strip-components=1 \
      --exclude=CHANGELOG.md --exclude=LICENSE --exclude=README.md \
 && rm /tmp/node.tar.xz \
 && node --version

WORKDIR /app

# Render sidecar: install from its lockfile so the tree is reproducible.
COPY render-service-js/package.json render-service-js/package-lock.json ./render-service-js/
RUN cd render-service-js && npm ci --omit=dev

# Chromium, pinned by puppeteer's own version resolution.
RUN cd render-service-js && npx puppeteer browsers install chrome

COPY render-service-js/src ./render-service-js/src

COPY service/requirements.txt ./service/requirements.txt
RUN pip install --no-cache-dir -r service/requirements.txt \
 && pip install --no-cache-dir flash-linear-attention==0.5.2

COPY runner ./runner
COPY service ./service

# The pipeline resolves the validator + fallback module from the miner-reference bundle.
COPY miner-reference/examples/car.js ./miner-reference/examples/car.js
COPY miner-reference/AGENTS.md ./miner-reference/AGENTS.md

ENV RENDER_URL=http://localhost:8000 \
    PORT=10006 \
    MINER_REF_DIR=/app/miner-reference

# The orchestrator connects here. Binding 127.0.0.1 makes the pod unreachable.
EXPOSE 10006

HEALTHCHECK --interval=15s --timeout=5s --start-period=60s --retries=3 \
  CMD curl -sf http://localhost:10006/health || exit 1

COPY prompts ./prompts
COPY docker ./docker
ENTRYPOINT ["/bin/bash", "/app/docker/entrypoint.sh"]
