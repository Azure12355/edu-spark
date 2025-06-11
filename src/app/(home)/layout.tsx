// src/app/(home)/layout.tsx
import type { Metadata } from "next";

// 你可以为这个布局下的页面定义特定的元数据，它会与根布局的合并
export const metadata: Metadata = {
    title: "EduSpark - AI赋能教育",
    description: "EduSpark 是一款基于开源大模型的教学实训智能体软件，旨在通过 AI 赋能教师和学生，提升备课效率，提供个性化练习与指导，推动教育数字化转型。",
};

// 注意：这里不再有 <html>, <head>, <body> 标签
export default function HomeLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            {children}
        </>
    );
}