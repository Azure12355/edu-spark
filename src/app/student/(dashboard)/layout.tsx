// src/app/student/(dashboard)/layout.tsx
"use client";
import React from 'react';
import { usePathname } from 'next/navigation';
import StudentHeader from '@/components/student/layout/Header/StudentHeader';
import StudentSidebar from '@/components/student/layout/Sidebar/StudentSidebar';
import '../student.css'; // 引入学生端专属全局样式

export default function StudentDashboardLayout({
                                                   children,
                                               }: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const isCreateAgentPage = pathname.includes('/student/create-agent');

    return (
        <div className="student-layout-wrapper">
            <StudentHeader />
            <div className="student-main-container">
                <StudentSidebar />
                <div className="student-content-area">
                    {isCreateAgentPage ? (
                        children // 直接渲染，让子页面控制所有
                    ) : (
                        // 对所有其他页面，使用带内边距和滚动的容器
                        <main className="student-scrollable-content">
                            {children}
                        </main>
                    )}
                </div>
            </div>
        </div>
    );
}