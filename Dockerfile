# ---- Stage 1: Dependency Installation ----
# 使用一个标准的 Node.js 镜像来安装依赖
FROM node:20-slim AS deps
# 设置工作目录
WORKDIR /app

# 复制 package.json 和 pnpm-lock.yaml，利用 Docker 的层缓存机制
COPY package.json pnpm-lock.yaml* ./

# 安装 pnpm
# 我们使用 corepack，这是 Node.js 官方推荐的管理包管理器版本的方式
RUN corepack enable
RUN corepack prepare pnpm@latest --activate

# 使用 pnpm 安装依赖
RUN pnpm install --frozen-lockfile


# ---- Stage 2: Builder ----
# 使用相同的镜像来构建应用
FROM node:20-slim AS builder
WORKDIR /app
# 从 'deps' 阶段复制已经安装好的 node_modules
COPY --from=deps /app/node_modules ./node_modules
# 复制项目的其他所有文件
COPY . .

# 再次启用 pnpm
RUN corepack enable
RUN corepack prepare pnpm@latest --activate

# --- 注入构建时所需的所有环境变量 ---
# 1. 注入需要打包进客户端代码的 NEXT_PUBLIC_* 变量
ARG NEXT_PUBLIC_TINYMCE_API_KEY
ENV NEXT_PUBLIC_TINYMCE_API_KEY=${NEXT_PUBLIC_TINYMCE_API_KEY}
ARG NEXT_PUBLIC_API_BASE_URL
ENV NEXT_PUBLIC_API_BASE_URL=${NEXT_PUBLIC_API_BASE_URL}

# 2. 注入服务器端代码在构建时需要的私密密钥
# !! 安全警告：这些密钥会保留在 Docker 镜像的构建层中 !!
ARG COZE_API_KEY
ENV COZE_API_KEY=${COZE_API_KEY}
ARG COZE_WORKFLOW_ID
ENV COZE_WORKFLOW_ID=${COZE_WORKFLOW_ID}
ARG ZHIPUAI_API_KEY
ENV ZHIPUAI_API_KEY=${ZHIPUAI_API_KEY}

# 运行构建命令
# 现在 pnpm build 可以访问到所有需要的环境变量
RUN pnpm build


# ---- Stage 3: Production Runner ----
# 使用一个超轻量的 Alpine Linux 镜像作为最终的运行环境
# 这一阶段不会包含构建时的密钥，因为我们只从 'builder' 阶段复制必要的文件
FROM node:20-alpine AS runner
WORKDIR /app

# 设置生产环境变量
ENV NODE_ENV=production
# 禁用 Next.js 的遥测数据收集
ENV NEXT_TELEMETRY_DISABLED=1

# 创建一个非 root 用户来运行应用，增强安全性
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# 从 'builder' 阶段复制 standalone 输出
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
# 复制 public 和 .next/static 文件夹
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# 切换到非 root 用户
USER nextjs

# 暴露应用运行的端口
EXPOSE 3000

# 设置默认端口和主机名
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# 运行应用的命令
CMD ["node", "server.js"]