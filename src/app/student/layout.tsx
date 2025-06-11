// src/app/student/layout.tsx
import React from 'react';
import type { Metadata } from 'next';
import StudentHeader from '@/components/student/Header/StudentHeader';
import StudentSidebar from '@/components/student/Sidebar/StudentSidebar';
import FloatingHelpButton from '@/components/student/FloatingHelpButton/FloatingHelpButton';
import './student.css'; // 引入学生端专属全局样式

export const metadata: Metadata = {
    title: "EduSpark 学生中心",
    description: "EduSpark 学生在线学习与实训平台",
};

export default function StudentLayout({
                                          children,
                                      }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="zh-CN">
        <head>
            <link
                rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css"
            />
        </head>
        <body>
        <div className="student-layout-wrapper">
            <StudentHeader />
            <div className="student-main-container">
                <StudentSidebar />
                {/* 优化：为主内容区添加包裹div，方便设置样式 */}
                <div className="student-content-area">
                    <main>
                        {children}
                    </main>
                </div>
            </div>
        </div>
        <FloatingHelpButton />
        </body>
        </html>
    );
}