// src/app/layout.tsx
"use client"

import "./globals.css";
import 'github-markdown-css/github-markdown-light.css';
import AuthModal from "@/shared/components/common/auth/AuthModal"; // 1. 导入登录弹窗
import {useUserStore} from "@/shared/store/userStore"; // 2. 导入 userStore
// 1. 引入 ToastProvider
import ToastProvider from "@/shared/components/ui/Toast/Toast";
import ClientLayoutWrapper from "@/app/ClientLayoutWrapper";

// export const metadata: Metadata = {
//     title: "EduSpark - AI 驱动的教学实训平台",
//     description: "EduSpark 是一款基于开源大模型的教学实训智能体软件...",
// };

export default function RootLayout({children}: Readonly<{ children: React.ReactNode; }>) {

    const {isAuthModalOpen, closeAuthModal} = useUserStore();

    return (
        <html lang="zh-CN">
        <head>
            {/* ... head 内容保持不变 ... */}
            <link
                rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css"
                integrity="sha512-KfkfwYDsLkIlwQp6LFnl8zNdLGxu9YAA1QvwINks4PhcElQSvqcyVLLD9aMhXd13uQjoXtEKNosOWaZqXgel0g=="
                crossOrigin="anonymous"
                referrerPolicy="no-referrer"/>
            <link
                rel="stylesheet"
                href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css"
                integrity="sha384-n8MVd4RsNIU0tAv4ct0nTaAbDJwPJzDEaqSD1odI+WdtXRGWt2kTvGFasHpSy3SV"
                crossOrigin="anonymous"
            />
        </head>
        <body>
        <ClientLayoutWrapper>
            {children}
            {/* 2. 在 body 结束前渲染 ToastProvider */}
            <ToastProvider/>
            <AuthModal isOpen={isAuthModalOpen} onClose={closeAuthModal}/>
        </ClientLayoutWrapper>

        </body>
        </html>
    );
}