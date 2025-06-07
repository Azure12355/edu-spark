# =========================================================================
# STAGE 1: Build Stage - 在这里构建我们的 Next.js 应用
# =========================================================================
FROM node:20-alpine AS builder

# 声明一个构建参数
ARG ZHIPUAI_API_KEY_ARG

# 将构建参数设置为环境变量，这样 `pnpm run build` 就能读取到它
ENV ZHIPUAI_API_KEY=$ZHIPUAI_API_KEY_ARG

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 pnpm-lock.yaml 文件
# 只复制这两个文件可以利用 Docker 的层缓存机制。
# 只有当这些文件改变时，才会重新运行 `pnpm install`。
COPY package.json pnpm-lock.yaml ./

# 安装 pnpm
RUN npm install -g pnpm

# 安装项目依赖
RUN pnpm install

# 复制项目的其余代码
COPY . .

# 复制 .env.local 文件。在构建时，Next.js 会读取这些变量。
# 注意：这会将你的 API Key 打包进镜像中，下面会讨论更安全的做法。
# COPY .env.local ./.env.local

# 执行构建命令
RUN pnpm run build

# =========================================================================
# STAGE 2: Production Stage - 创建最终的、轻量级的生产镜像
# =========================================================================
FROM node:20-alpine AS runner

# 设置工作目录
WORKDIR /app

# 从 builder 阶段复制构建好的应用
# 我们只需要 .next 目录和 node_modules 目录
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# 暴露 Next.js 默认的端口
EXPOSE 3000

# 定义容器启动时运行的命令
# 使用 `next start` 来启动生产服务器
CMD ["pnpm", "start"]