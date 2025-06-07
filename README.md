<p align="center">
  <img src="docs/icon.svg" alt="volcano-engine-logo" width="200">
</p>

<h1 align="center">volcano-engine 🌋✨</h1>

<p align="center">
  <strong>火山引擎官网高保真复刻，集成 Next.js 15、Framer Motion 和 AI 聊天机器人。</strong>
</p>

<div align="center">
  <img src="https://img.shields.io/badge/Next.js-15-black?logo=next.js&logoColor=white" alt="Next.js">
  <img src="https://img.shields.io/badge/TypeScript-5-blue?logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/Framer%20Motion-12-blueviolet?logo=framer&logoColor=white" alt="Framer Motion">
  <img src="https://img.shields.io/badge/Tailwind%20CSS-4-38B2AC?logo=tailwind-css&logoColor=white" alt="Tailwind CSS">
  <img src="https://img.shields.io/badge/ZhipuAI-API-brightgreen" alt="ZhipuAI">
  <img src="https://img.shields.io/badge/Vercel-Ready-black?logo=vercel&logoColor=white" alt="Vercel Ready">
</div>


嗨，欢迎来到 **volcano-engine**！这是一个基于 **Next.js 15 (App Router)** 和 **TypeScript** 构建的，对[火山引擎大模型官网](https://www.volcengine.com/product/doubao)页面的高保真复刻项目。

项目不仅在视觉上力求还原官网的精美设计，更通过 `Framer Motion` 带来了流畅的动画效果，并集成了一个功能强大的 **实时聊天机器人** 🤖，与真实的 [ZhipuAI (智谱AI)](https://www.zhipuai.cn/) 模型 API 对接，为你带来完整的交互体验！

![Project Screenshot / GIF](/docs/image.png)

---

## ✨ 核心亮点 (Key Features)

*   **🎨 高保真UI复刻**: 精心还原了火山引擎官网的多个核心展示区域，包括但不限于英雄区、产品特性、定价方案、系统能力、安全保障等，像素级追求细节。
*   **💃 丝滑的动画体验**: 全站广泛使用 `framer-motion` 库，为页面加载、组件入场、滚动视图和用户交互添加了丰富而流畅的动画效果，提升用户体验。
*   **🤖 功能完备的AI聊天机器人**:
    *   **实时流式响应**: 对接智谱AI，实现了打字机效果的流式响应，体验如丝般顺滑。
    *   **Markdown全支持**: 采用 `react-markdown` 和 `remark-gfm`，完美渲染列表、表格、引用等所有 GFM 语法。
    *   **代码高亮**: 内置 `react-syntax-highlighter`，对代码块进行美观的语法高亮。
    *   **图表绘制**: 支持通过 `Mermaid.js` 语法直接在对话中生成流程图、序列图等多种图表。
    *   **思考过程展示**: 能够解析并展示AI的思考过程，让交互更透明。
*   **📱 响应式设计**: 无论是桌面、平板还是手机，都提供了良好的浏览体验。
*   **🛠️ 现代化的技术栈**: 采用 Next.js 15、TypeScript、Tailwind CSS 等前沿技术，提供了优秀的开发体验和性能。
*   **📂 清晰的项目结构**: 代码遵循高内聚、低耦合的原则，按功能模块（sections）、布局（layout）、公共组件（common）、小部件（widgets）进行组织，易于理解和扩展。

---

## 🛠️ 技术栈 (Tech Stack)

*   **前端框架**: [Next.js](https://nextjs.org/) 15 (App Router, Turbopack)
*   **编程语言**: [TypeScript](https://www.typescriptlang.org/)
*   **样式方案**: [CSS Modules](https://github.com/css-modules/css-modules) + [Tailwind CSS](https://tailwindcss.com/)
*   **动画库**: [Framer Motion](https://www.framer.com/motion/)
*   **AI模型服务**: [ZhipuAI (智谱AI)](https://www.zhipuai.cn/)
*   **Markdown渲染**: [React-Markdown](https://github.com/remarkjs/react-markdown) + [Remark-GFM](https://github.com/remarkjs/remark-gfm)
*   **代码高亮**: [React-Syntax-Highlighter](https://github.com/react-syntax-highlighter/react-syntax-highlighter)
*   **图表库**: [Mermaid.js](https://mermaid-js.github.io/mermaid/#/)

---

## 🚀 快速开始 (Getting Started)

想要在本地运行这个酷炫的项目吗？跟我来！

### 1. 环境准备

确保你的电脑上已经安装了 [Node.js](https://nodejs.org/) (v18.0 或更高版本) 和 [pnpm](https://pnpm.io/)。

### 2. 克隆项目

```bash
git clone https://github.com/your-username/volcano-engine.git
cd volcano-engine
```

### 3. 安装依赖

```bash
pnpm install
```
*(推荐使用 `pnpm`，当然 `npm` 或 `yarn` 也可以)*

### 4. 配置环境变量 🔑

这是最关键的一步！为了让聊天机器人能正常工作，你需要一个智谱AI的API Key。

首先，将项目根目录下的 `.env.local.example` (如果我提供了的话，如果没有请手动创建) 复制一份并重命名为 `.env.local`：

```bash
# 如果有 .env.local.example 文件
cp .env.local.example .env.local

# 如果没有，则手动创建 .env.local 文件
touch .env.local
```

然后，在 `.env.local` 文件中填入你的API Key：

```
ZHIPUAI_API_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```
> 💡 **提示**: 你可以在 [智谱AI开放平台](https://open.bigmodel.cn/) 免费注册并获取你的API Key。

### 5. 启动项目！

一切准备就绪，运行下面的命令来启动开发服务器：

```bash
pnpm dev
```

现在，打开你的浏览器并访问 [http://localhost:3000](http://localhost:3000)，你就能看到运行中的项目啦！🎉




## 🐳 Docker 部署 (Docker Deployment)

对于生产环境或需要更高可移植性的场景，我们强烈推荐使用 Docker 进行部署。本项目已包含一个经过优化的、采用多阶段构建的 `Dockerfile`，可以生成一个轻量且安全的生产镜像。

### 1. 环境准备

*   **本地**: 确保你的电脑上已经安装了 [Docker Desktop](https://www.docker.com/products/docker-desktop/)。
*   **服务器**: 你的目标服务器（如阿里云 ECS）需要安装 [Docker Engine](https://docs.docker.com/engine/install/)。

### 2. Dockerfile 解析

项目根目录下的 `Dockerfile` 文件定义了镜像的构建过程：
*   **多阶段构建 (Multi-stage builds)**:
    1.  **Builder 阶段**: 在一个完整的 Node.js 环境中安装所有依赖并执行 `pnpm run build`。
    2.  **Runner 阶段**: 在一个干净、轻量的 `node:20-alpine` 镜像中，只从上一阶段复制出运行所必需的构建产物 (`.next`) 和生产依赖 (`node_modules`)。
*   **安全与高效**: 这种方式可以确保最终镜像体积最小，并且不包含任何开发工具或源代码，更加安全。

### 3. 构建 Docker 镜像 🏗️

在你的本地机器上（例如 macOS），打开终端并进入项目根目录，运行以下命令来构建镜像。

> **跨平台构建**:
> 此命令使用 `--platform linux/amd64` 参数，确保即使你在 M1/M2/M3 Mac (ARM64) 上构建，生成的镜像也能在标准的 x86-64 Linux 服务器上运行。

```bash
docker build \
  --platform linux/amd64 \
  --build-arg ZHIPUAI_API_KEY_ARG="你的智谱AI_API_KEY" \
  -t your-dockerhub-username/volcano-engine:1.0.0 \
  .
```

*   `--build-arg ZHIPUAI_API_KEY_ARG`: **(构建时使用)** 这是在构建过程中安全传递 API Key 的方式，它**不会**被存储在最终的镜像层中。
*   `-t your-dockerhub-username/volcano-engine:1.0.0`: 为你的镜像打上一个标签，格式通常为 `[仓库用户名]/[镜像名]:[版本号]`。
*   `.`: 表示 `Dockerfile` 在当前目录。

### 4. 推送镜像到镜像仓库 ☁️

为了让你的服务器可以访问到这个镜像，你需要将它推送到一个镜像仓库，例如 [Docker Hub](https://hub.docker.com/)。

```bash
# 登录你的 Docker Hub 账户
docker login

# 推送你刚刚构建的镜像
docker push your-dockerhub-username/volcano-engine:1.0.0
```

### 5. 在服务器上部署并运行 🚀

现在，SSH 连接到你的 Linux 服务器，并执行以下命令来拉取并运行你的应用容器。

```bash
docker run -d \
  --name volcano-engine-app \
  -p 3000:3000 \
  -e ZHIPUAI_API_KEY="你的智谱AI_API_KEY" \
  --restart always \
  your-dockerhub-username/volcano-engine:1.0.0
```

*   `-d`: 在后台运行容器。
*   `--name volcano-engine-app`: 为容器指定一个友好的名称。
*   `-p 3000:3000`: 将服务器的 3000 端口映射到容器内部的 3000 端口。
*   `-e ZHIPUAI_API_KEY`: **(运行时使用)** 这是在容器运行时注入环境变量的安全方式。你的 Next.js 应用将通过 `process.env` 读取此变量。
*   `--restart always`: 确保在服务器重启或容器意外崩溃时，Docker 会自动重启它。

部署完成后，你就可以通过 `http://你的服务器IP:3000` 访问你的应用了！

> #### 💡 提示: `--build-arg` vs `-e`
> *   `--build-arg` (构建参数) 用于在 `docker build` 期间向 `Dockerfile` 传递变量，它**只在构建过程中存在**。
> *   `-e` (环境变量) 用于在 `docker run` 期间向正在运行的**容器**传递变量，它在容器的整个生命周期中都存在。
>
> 我们同时使用这两者，是因为 ZhipuAI 的 SDK 在**构建时**和**运行时**都需要 API Key。这种分离确保了构建过程能成功，同时运行时也能安全地获取到密钥，并且密钥本身不会被硬编码进镜像里。

### 生产环境建议

在真实的生产环境中，建议使用 Nginx 或 Caddy 等 Web 服务器作为反向代理，将 80/443 端口的流量转发到 Docker 容器的 3000 端口，并配置域名和 SSL/TLS 证书以启用 HTTPS。

## 📂 项目结构解析

本项目的代码结构清晰，主要目录和文件功能如下：

```
volcano-engine/
├── public/               # 存放图片、视频等静态资源
├── src/
│   ├── app/              # Next.js App Router 核心目录
│   │   ├── api/          # 后端API路由 (如: /api/chat)
│   │   ├── layout.tsx    # 全局根布局
│   │   └── page.tsx      # 网站主页
│   ├── components/       # ✨ 所有React组件的家
│   │   ├── common/       # 通用基础组件 (如: Button)
│   │   ├── layout/       # 布局组件 (Header, Footer, FloatingSidebar)
│   │   ├── sections/     # 页面中各个大的内容区块 (如: HeroSection, PricingSection)
│   │   └── widgets/      # 独立的小功能组件 (如: ChatbotWidget)
│   └── lib/              # 存放公共函数、常量等
├── .env.local            # 本地环境变量 (重要且不应提交到Git)
├── next.config.ts        # Next.js 配置文件
├── package.json          # 项目依赖与脚本
└── tsconfig.json         # TypeScript 配置文件
```

---

## 💡 未来可期 (Future Improvements)

虽然项目已经很完整，但总有可以变得更好的地方！

*   [ ] **功能扩展**: 完善更多官网页面，如“文档中心”、“解决方案”等。
*   [ ] **用户认证**: 引入 NextAuth.js 等方案，实现用户登录注册，保存聊天记录。
*   [ ] **组件库优化**: 进一步抽象和优化通用组件，提高复用性。
*   [ ] **单元与集成测试**: 为关键组件和API添加测试用例，保证项目稳定性。
*   [ ] **状态管理**: 对于更复杂的全局状态，可以引入 Zustand 或 Redux Toolkit。

---

## 🤝 贡献 (Contributing)

欢迎任何形式的贡献！如果你有任何好的想法或者发现了Bug，请随时提交 Pull Request 或创建 Issue。

1.  Fork 本仓库
2.  创建你的新分支 (`git checkout -b feature/AmazingFeature`)
3.  提交你的更改 (`git commit -m 'Add some AmazingFeature'`)
4.  推送到分支 (`git push origin feature/AmazingFeature`)
5.  打开一个 Pull Request

---

## 📄 许可证 (License)

本项目采用 [MIT License](LICENSE.md) 授权。

---

## 🙏 致谢 (Acknowledgements)

*   感谢 [火山引擎](https://www.volcengine.com/) 团队设计出如此精美的官网，为本项目提供了灵感源泉。
*   感谢 [Next.js](https://nextjs.org/) 和所有开源库的开发者，是你们让这一切成为可能。

---

希望你喜欢这个项目！如果觉得不错，别忘了给个 Star ⭐ 哦！