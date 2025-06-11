// src/app/layout.tsx
"use client";
import React from 'react';
import type { Metadata } from "next";
import { App, ConfigProvider, theme } from 'antd';
import 'antd/dist/reset.css';
import "./globals.css"; // 引入全局样式

// export const metadata: Metadata = {
//   title: "EduSpark - AI赋能教育",
//   description: "EduSpark 是一款基于开源大模型的教学实训智能体软件...",
// };
// Metadata in client component is not supported. We can handle it differently if needed.

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <head>
        <title>EduSpark - AI赋能教育</title>
        <meta name="description" content="EduSpark 是一款基于开源大模型的教学实训智能体软件..."/>
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
        />
      </head>
      <body>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#0052FF',
              borderRadius: 6,
            },
            components: {
              Layout: {
                bodyBg: '#F5F7FA', // 设置Layout组件的背景色
                headerBg: 'rgba(255, 255, 255, 0.6)',
                siderBg: '#FFFFFF',
              }
            }
          }}
        >
          {/* AntD App Component provides context for message, notification etc. */}
          <App style={{ height: '100vh' }}>{children}</App>
        </ConfigProvider>
      </body>
    </html>
  );
}