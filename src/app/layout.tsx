// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css"; // 引入全局样式

export const metadata: Metadata = {
  title: "EduSpark - AI赋能教育",
  description: "EduSpark 是一款基于开源大模型的教学实训智能体软件，旨在通过 AI 赋能教师和学生，提升备课效率，提供个性化练习与指导，推动教育数字化转型。",
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