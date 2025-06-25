// src/app/teacher/(dashboard)/layout.tsx
"use client"; // 需要 usePathname, 必须是客户端组件
import React from 'react';
import { usePathname } from 'next/navigation'; // 导入 usePathname
import TeacherHeader from '@/components/teacher/layout/Header/TeacherHeader';
import '../teacher.css';

export default function TeacherDashboardLayout({
                                                   children,
                                               }: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    // 判断当前是否是智能助教页面
    const isAssistantPage = pathname === '/teacher/assistant';

    return (
        <div className="teacher-layout-wrapper">
            <TeacherHeader />
            {/*
              根据页面路径动态改变 main 标签的 class 和样式
              - 如果是助教页，移除内边距，并让其 flex-grow 占满剩余高度
              - 如果是其他页面，保持原有的内边距和布局
            */}
            <main
                className={isAssistantPage ? "teacher-main-full" : "teacher-main-container"}
            >
                {children}
            </main>
        </div>
    );
}