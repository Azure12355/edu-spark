

<p align="center">
  <img src="docs/robot.gif" alt="eduspark-logo" width="120" style="border-radius: 50%" >
</p>
<h1 align="center">EduSpark 🚀✨</h1>

<p align="center">
  <strong>一款 AI 驱动的教学实训平台，为教师和学生双向赋能，重塑智能教育未来。</strong>
</p>

<div align="center">
  <img src="https://img.shields.io/badge/Next.js-15-black?logo=next.js&logoColor=white" alt="Next.js">
  <img src="https://img.shields.io/badge/Spring_Boot-3-6DB33F?logo=spring&logoColor=white" alt="Spring Boot">
  <img src="https://img.shields.io/badge/LangChain4j-Java-orange" alt="LangChain4j">
  <img src="https://img.shields.io/badge/Multi--Model-Support-brightgreen" alt="Multi-Model Support">
  <img src="https://img.shields.io/badge/Docker-Ready-2496ED?logo=docker&logoColor=white" alt="Docker Ready">
  <img src="https://img.shields.io/badge/PostgreSQL-16-336791?logo=postgresql&logoColor=white" alt="PostgreSQL">
</div>


欢迎来到 **EduSpark**！这是一个基于 **Next.js 15 (App Router)** 构建前端，并由强大的 **Spring Boot** 后端驱动的全栈式教学实训智能体软件。

`EduSpark` 旨在响应国家教育数字化战略，深度融合大模型与实训教学。我们为教师提供一键式智能备课与学情分析工具，为学生打造全天候的个性化练习与实时辅导伙伴。我们的目标是解决传统教学中的核心痛点，推动实训教学向智能化、自适应化转型。

![Project Screenshot](/docs/image.png)

---

## ✨ 核心亮点 (Key Features)

*   **👨‍🏫 教师端：智能教学中枢**
    *   **一键智能备课**: 上传课程大纲或知识库，AI 自动生成包含知识讲解、实训任务和考核题目的完整教案。
    *   **自动化考核与分析**: 自动批改学生作业与练习，提供错误定位与修正建议，并生成多维度学情分析报告，洞察教学效果。

*   **👨‍🎓 学生端：个性化学习伴侣**
    *   **全时在线辅导**: 7x24 小时的 AI 助教，随时解答课程疑问，提供学习资源推荐。
    *   **自适应练习与纠错**: 根据学生的知识掌握情况，智能生成练习题，并对错误进行实时分析与指导。

*   **🤖 强大的 AI 内核**
    *   **多模型支持**: 集成并可灵活调度**通义千问、智谱GLM、DeepSeek**等多种业界领先的大模型。
    *   **先进的 RAG 架构**: 基于 `PGvector` 和 `LangChain4j` 构建高效、准确的本地知识库检索与生成能力。
    *   **Agent 与工具调用**: 具备复杂的任务规划与工具调用能力，实现高级的教学互动场景。

*   **📊 管理员驾驶舱**
    *   **多角色用户管理**: 支持管理员、教师、学生等多种角色的权限管理。
    *   **教学资源管理**: 统一管理所有课程、课件、题库资源，并支持导出。
    *   **可视化数据大屏**: 实时展示平台使用统计、教学效率指数、学生学习效果等核心指标。

*   **🛠️ 现代化的技术栈与架构**
    *   **前后端分离**: 采用 Next.js 构建动态、响应式的前端，Spring Boot 构建稳定、高性能的后端服务。
    *   **容器化部署**: 全面拥抱 Docker，提供标准化的部署流程，易于在任何云环境（如阿里云）中扩展。

---

## 🛠️ 技术栈 (Tech Stack)

*   **前端 (Frontend)**: [Next.js](https://nextjs.org/) 15 (App Router), [TypeScript](https://www.typescriptlang.org/), [React](https://react.dev/), [Framer Motion](https://www.framer.com/motion/), [CSS Modules](https://github.com/css-modules/css-modules)
*   **后端 (Backend)**: [Spring Boot](https://spring.io/projects/spring-boot), [Spring AI](https://spring.io/projects/spring-ai), [LangChain4j](https://github.com/langchain4j/langchain4j)
*   **大模型 (LLMs)**: [阿里云百炼平台](https://www.aliyun.com/product/bailian), [通义千问 (Qwen)](https://github.com/QwenLM/Qwen), [智谱GLM (ChatGLM)](https://github.com/THUDM/ChatGLM-6B), [DeepSeek](https://www.deepseek.com/)
*   **数据库 (Database)**: [PostgreSQL](https://www.postgresql.org/) + [PGvector](https://github.com/pgvector/pgvector)
*   **部署 (Deployment)**: [Docker](https://www.docker.com/), [Nginx](https://www.nginx.com/), [阿里云 (ECS, RDS)](https://www.aliyun.com/), CDN

---

## 🚀 快速开始 (Getting Started)

想要在本地运行这个强大的教育平台吗？请遵循以下步骤！

### 1. 环境准备

确保你的电脑上已经安装了 [Node.js](https://nodejs.org/) (v18.0 或更高版本), [pnpm](https://pnpm.io/), [Java](https://www.java.com/) (JDK 17 或更高版本), 和 [Docker](https://www.docker.com/)。

### 2. 克隆项目

```bash
git clone https://github.com/your-username/eduspark.git
cd eduspark
```

### 3. 启动后端服务

（详细步骤请参考后端项目的 `README`）
通常，您需要配置后端的 `application.yml` 文件，填入您的数据库连接信息和AI模型API Keys，然后运行 Spring Boot 应用。

### 4. 安装前端依赖

```bash
pnpm install
```

### 5. 配置前端环境变量 🔑

为了让前端能够与后端和AI服务正常通信，您需要配置环境变量。

首先，将项目根目录下的 `.env.local.example` 复制一份并重命名为 `.env.local`：

```bash
cp .env.local.example .env.local
```

然后，在 `.env.local` 文件中填入所需信息：
```
# 后端API服务的地址
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080/api

# 用于前端独立功能（如智能助教悬浮窗）的 ZhipuAI Key
ZHIPUAI_API_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```
> 💡 **提示**: 我们推荐将复杂的AI逻辑放在后端处理，但某些轻量级的前端交互（如本项目中的智能助教）可直连模型API以获得更快的流式响应。

### 6. 启动前端开发服务器！

```bash
pnpm dev
```

现在，打开你的浏览器并访问 [http://localhost:3000](http://localhost:3000)，你就能看到运行中的 `EduSpark` 平台了！🎉

---

## 🐳 Docker 部署 (Docker Deployment)

对于生产环境，我们强烈推荐使用 Docker 进行部署。项目已包含为前端优化的多阶段构建 `Dockerfile`。

### 1. 构建前端 Docker 镜像 🏗️

在项目根目录运行以下命令。此命令已优化，确保在任何CPU架构（如 M1/M2 Mac）上都能构建出可在标准 x86-64 Linux 服务器上运行的镜像。

```bash
docker build \
  --platform linux/amd64 \
  --build-arg ZHIPUAI_API_KEY_ARG="你的智谱AI_API_KEY" \
  -t your-dockerhub-username/eduspark-frontend:1.0.0 \
  .
```

*   `--build-arg`: 安全地在**构建时**传递密钥。
*   `-t`: 为你的镜像打上标签。

### 2. 推送镜像到仓库 ☁️

```bash
docker push your-dockerhub-username/eduspark-frontend:1.0.0
```

### 3. 在服务器上部署并运行 🚀

在您的服务器上（假设后端服务已在运行），执行以下命令来启动前端容器。

```bash
docker run -d \
  --name eduspark-frontend-app \
  -p 3000:3000 \
  -e ZHIPUAI_API_KEY="你的智谱AI_API_KEY" \
  --restart always \
  your-dockerhub-username/eduspark-frontend:1.0.0
```
*   `-d`: 后台运行。
*   `-p`: 端口映射。
*   `-e`: 在**运行时**安全地注入环境变量。
*   `--restart always`: 保证服务高可用。

部署完成后，通过 Nginx 等反向代理配置域名，即可对外提供服务。

---

## 📂 项目结构解析

本项目的代码结构清晰，主要目录和文件功能如下：

```
EduSpark/
├── public/               # 存放图片、视频等静态资源
├── src/
│   ├── app/              # Next.js App Router 核心目录
│   │   ├── api/          # 前端轻量级API (如: /api/chat)
│   │   ├── layout.tsx    # 全局根布局
│   │   └── page.tsx      # 网站主页
│   ├── components/       # ✨ 所有React组件的家
│   │   ├── common/       # 通用基础组件 (Button)
│   │   ├── layout/       # 布局组件 (Header, Footer, FloatingSidebar)
│   │   ├── sections/     # 页面中各个大的内容区块
│   │   └── widgets/      # 独立的小功能组件 (CourseAssistantWidget)
│   └── lib/              # 存放公共函数、常量等
├── .env.local            # 本地环境变量 (重要且不应提交到Git)
├── Dockerfile            # 前端 Docker 构建文件
├── next.config.ts        # Next.js 配置文件
└── package.json          # 项目依赖与脚本
```

---

## 💡 未来可期 (Future Improvements)

*   [ ] **支持更多学科**: 拓展平台对文、理、工、商、艺等更多学科领域的支持。
*   [ ] **游戏化学习**: 引入积分、徽章等游戏化元素，提升学生学习动机。
*   [ ] **移动端优化**: 开发原生或PWA应用，提供更佳的移动学习体验。
*   [ ] **协同教研**: 增加教师间的课程分享、集体备课等协同功能。
*   [ ] **开放平台**: 提供API，允许第三方开发者在 EduSpark 基础上构建应用。

---

## 🤝 贡献 (Contributing)

我们热烈欢迎任何形式的贡献！如果您有任何好的想法或者发现了Bug，请随时提交 Pull Request 或创建 Issue。

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

*   感谢所有为本项目提供灵感的开源项目和教育工作者。
*   特别感谢 [Next.js](https://nextjs.org/), [Spring](https://spring.io/), [LangChain4j](https://github.com/langchain4j/langchain4j) 以及各大模型开源社区的卓越贡献。

---

如果 `EduSpark` 对您有所启发，请不要吝啬您的 Star ⭐！