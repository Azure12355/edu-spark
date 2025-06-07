# =========================================================================
# STAGE 1: Build Stage - 在这里构建我们的 Next.js 应用
# =========================================================================
FROM node:20-alpine AS builder

# 声明一个构建参数
ARG ZHIPUAI_API_KEY_ARG
# 将构建参数设置为环境变量，这样 `pnpm run build` 就能读取到它
ENV ZHIPUAI_API_KEY=$ZHIPUAI_API_KEY_ARG

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

# 安装 pnpm
RUN npm install -g pnpm

# 安装项目依赖
RUN pnpm install

# 复制项目的其余代码
COPY . .

# 执行构建命令
RUN pnpm run build

# =========================================================================
# STAGE 2: Production Stage - 创建最终的、轻量级的生产镜像
# =========================================================================
FROM node:20-alpine AS runner

WORKDIR /app

# ✅ 在这里添加，为 runner 阶段安装 pnpm
RUN npm install -g pnpm

# 从 builder 阶段复制构建好的应用
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# 暴露 Next.js 默认的端口
EXPOSE 3000

# 定义容器启动时运行的命令
# 使用 `next start` 来启动生产服务器
CMD ["pnpm", "start"]