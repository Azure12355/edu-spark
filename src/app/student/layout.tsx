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
            {/* Font Awesome CDN for icons (已在根布局中提供, 此处为冗余确保) */}
            <link
                rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
            />
        </head>
        <body>
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <StudentHeader />
            <div style={{ display: 'flex', flexGrow: 1, paddingTop: '64px' /* Header height */ }}>
                <StudentSidebar />
                <main style={{ flexGrow: 1, overflowY: 'auto', padding: '24px' }}>
                    {children}
                </main>
            </div>
        </div>
        <FloatingHelpButton />
        </body>
        </html>
    );
}