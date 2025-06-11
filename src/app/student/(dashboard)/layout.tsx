// src/app/student/(dashboard)/layout.tsx
import React from 'react';
import type { Metadata } from 'next';
import StudentHeader from '@/components/student/layout/Header/StudentHeader';
import StudentSidebar from '@/components/student/layout/Sidebar/StudentSidebar';
import FloatingHelpButton from '@/components/student/component/plaza/FloatingHelpButton/FloatingHelpButton';
import '../student.css'; // 引入学生端专属全局样式

export const metadata: Metadata = {
    title: "EduSpark 学生中心",
    description: "EduSpark 学生在线学习与实训平台",
};

// 注意：这里不再有 <html>, <head>, <body> 标签
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
                <div className="student-content-area">
                    <main>
                        {children}
                    </main>
                </div>
            </div>
            <FloatingHelpButton />
        </div>
    );
}