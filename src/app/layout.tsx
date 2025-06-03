// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css"; // 引入全局样式

export const metadata: Metadata = {
  title: "火山引擎 - 大模型",
  description: "火山引擎一站式大模型开发平台",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <head>
        {/* Font Awesome CDN for icons */}
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" 
          integrity="sha512-Fo3rlrZj/k7ujTnHg4CGR2D7kSs0v4LLanw2qksYuRlEzO+tcaEPQogQ0KaoGN26/zrn20ImR1DfuLWnOo7aBA=="
          crossOrigin="anonymous" 
          referrerPolicy="no-referrer" />
      </head>
      <body>{children}</body>
    </html>
  );
}