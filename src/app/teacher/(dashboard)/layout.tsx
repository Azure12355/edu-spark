// src/app/teacher/(dashboard)/layout.tsx
"use client";
import React from 'react';
import { usePathname } from 'next/navigation';
import TeacherHeader from '@/components/teacher/layout/Header/TeacherHeader';
import '../teacher.css';

// 为 Metadata 提供一个静态导出，这符合 Next.js 的最佳实践
// 注意：因为我们使用了 'use client'，所以 Metadata 不能再直接导出
// 这是一个常见的权衡。如果需要动态 Metadata，需要采用其他策略。
// 但对于布局修复，这个结构是正确的。
/*
export const metadata: Metadata = {
    title: "EduSpark 教师工作台",
    description: "创建和管理您的课程智能体，高效赋能教学。",
};
*/

export default function TeacherDashboardLayout({
                                                   children,
                                               }: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const isImmersivePage = pathname.startsWith('/teacher/assistant');

    return (
        // .teacher-layout-wrapper 是所有布局的根，在 teacher.css 中定义
        <div className="teacher-layout-wrapper">
            <TeacherHeader />
            {/*
              动态选择 main 容器的 className
              - 沉浸式页面使用 .teacher-main-full
              - 普通页面使用 .teacher-main-container
            */}
            <main
                className={isImmersivePage ? "teacher-main-full" : "teacher-main-container"}
            >
                {children}
            </main>
        </div>
    );
}