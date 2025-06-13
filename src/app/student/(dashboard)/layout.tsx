// src/app/student/(dashboard)/layout.tsx
"use client"; // 需要 'use client' 来使用 usePathname
import React from 'react';
import { usePathname } from 'next/navigation'; // 引入 usePathname
import StudentHeader from '@/components/student/layout/Header/StudentHeader';
import StudentSidebar from '@/components/student/layout/Sidebar/StudentSidebar';
import '../student.css'; // 引入学生端专属全局样式

export default function StudentDashboardLayout({
                                                   children,
                                               }: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    // 检查当前路径是否是我们的“全屏”创建页面
    const isCreateAgentPage = pathname.includes('/student/create-agent');

    return (
        <div className="student-layout-wrapper">
            <StudentHeader />
            <div className="student-main-container">
                <StudentSidebar />
                <div className="student-content-area">
                    {/*
                      核心逻辑：
                      - 如果是 create-agent 页面，直接渲染 children，让它自己控制100%高度和内部滚动。
                      - 如果是其他普通页面，则用 .student-scrollable-content 包裹，提供统一的内边距和滚动条。
                    */}
                    {isCreateAgentPage ? (
                        children
                    ) : (
                        <main className="student-scrollable-content">
                            {children}
                        </main>
                    )}
                </div>
            </div>
        </div>
    );
}