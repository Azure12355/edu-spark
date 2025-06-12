// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import 'github-markdown-css/github-markdown-light.css';

export const metadata: Metadata = {
    title: "EduSpark - AI 驱动的教学实训平台",
    description: "EduSpark 是一款基于开源大模型的教学实训智能体软件...",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="zh-CN">
        <head>
            <link
                rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css"
                integrity="sha512-KfkfwYDsLkIlwQp6LFnl8zNdLGxu9YAA1QvwINks4PhcElQSvqcyVLLD9aMhXd13uQjoXtEKNosOWaZqXgel0g=="
                crossOrigin="anonymous"
                referrerPolicy="no-referrer" />

            {/* --- 核心修改：更新 integrity 属性值 --- */}
            <link
                rel="stylesheet"
                href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css"
                integrity="sha384-n8MVd4RsNIU0tAv4ct0nTaAbDJwPJzDEaqSD1odI+WdtXRGWt2kTvGFasHpSy3SV"
                crossOrigin="anonymous"
            />
            {/* --- 结束修改 --- */}

        </head>
        <body>{children}</body>
        </html>
    );
}