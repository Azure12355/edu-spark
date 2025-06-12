// src/app/student/(dashboard)/layout.tsx
import React from 'react';
import type { Metadata } from 'next';
import StudentHeader from '@/components/student/layout/Header/StudentHeader';
import StudentSidebar from '@/components/student/layout/Sidebar/StudentSidebar';
import '../student.css'; // 引入学生端专属全局样式

export const metadata: Metadata = {
    title: "EduSpark 学生中心",
    description: "EduSpark 学生在线学习与实训平台",
};

export default function StudentDashboardLayout({
                                                   children,
                                               }: {
    children: React.ReactNode;
}) {
    return (
        <div className="student-layout-wrapper">
            <StudentHeader />
            <div className="student-main-container">
                <StudentSidebar />
                {/*
                  --- 核心修改：将 student-content-area 改为纯粹的 flex 容器 ---
                  我们将 overflow 和 padding 的责任移交给一个新的内层 div
                */}
                <div className="student-content-area">
                    {/* 这个 main 元素将负责内边距和内容的实际滚动 */}
                    <main className="student-scrollable-content">
                        {children}
                    </main>
                </div>
                {/* --- 结束修改 --- */}
            </div>
        </div>
    );
}