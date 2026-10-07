# syntax=docker/dockerfile:1.7
# ==============================================================================
# EduSpark 前端 Dockerfile (优化版)
# ==============================================================================
# 支持多平台: linux/amd64, linux/arm64
# 构建示例:
#   docker build -t eduspark-frontend:latest .
#   docker build --platform linux/amd64 -t eduspark-frontend:amd64 .
# ==============================================================================

# ---- 参数定义 ----
ARG DOCKER_REGISTRY_MIRROR=docker.m.daocloud.io
ARG NODE_VERSION=20
ARG PNPM_VERSION=9.15.4
ARG NPM_REGISTRY=https://registry.npmmirror.com

# ---- Stage 1: Base ----
FROM ${DOCKER_REGISTRY_MIRROR}/library/node:${NODE_VERSION}-slim AS base
WORKDIR /app

ARG PNPM_VERSION
ARG NPM_REGISTRY

# 使用固定版本 pnpm，避免每次 corepack 拉取 latest
ENV NPM_CONFIG_REGISTRY=${NPM_REGISTRY}
RUN echo "Using NPM registry: ${NPM_REGISTRY}" && \
    npm install -g pnpm@${PNPM_VERSION} --registry=${NPM_REGISTRY} && \
    pnpm config set registry ${NPM_REGISTRY}

# ---- Stage 2: Dependencies ----
FROM base AS deps
ARG NPM_REGISTRY
COPY package.json pnpm-lock.yaml* ./
RUN --mount=type=cache,id=eduspark-pnpm-store,target=/root/.local/share/pnpm/store \
    pnpm config set store-dir /root/.local/share/pnpm/store && \
    pnpm install --frozen-lockfile --prod=false --prefer-offline --registry=${NPM_REGISTRY}

# ---- Stage 3: Builder ----
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# ---- 构建参数 ----
ARG NEXT_PUBLIC_TINYMCE_API_KEY
ARG NEXT_PUBLIC_API_BASE_URL=https://eduspark.weilanx.com/api
ARG COZE_API_KEY
ARG COZE_WORKFLOW_ID
ARG ZHIPUAI_API_KEY

# ---- 环境变量 ----
ENV NEXT_PUBLIC_TINYMCE_API_KEY=${NEXT_PUBLIC_TINYMCE_API_KEY}
ENV NEXT_PUBLIC_API_BASE_URL=${NEXT_PUBLIC_API_BASE_URL}
ENV COZE_API_KEY=${COZE_API_KEY}
ENV COZE_WORKFLOW_ID=${COZE_WORKFLOW_ID}
ENV ZHIPUAI_API_KEY=${ZHIPUAI_API_KEY}
ENV NEXT_TELEMETRY_DISABLED=1

RUN pnpm build

# ---- Stage 4: Production ----
FROM ${DOCKER_REGISTRY_MIRROR}/library/node:${NODE_VERSION}-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_PUBLIC_API_BASE_URL=https://eduspark.weilanx.com/api

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Next standalone 已包含运行所需依赖，避免 runner 阶段再次安装依赖
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:3000 || exit 1

CMD ["node", "server.js"]
