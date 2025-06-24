// src/app/teacher/(dashboard)/layout.tsx
import React from 'react';
import type { Metadata } from "next";
import TeacherHeader from '@/components/teacher/layout/Header/TeacherHeader';
import '../teacher.css'; // 引入教师端专属全局样式

export const metadata: Metadata = {
    title: "EduSpark 教师工作台",
    description: "创建和管理您的课程智能体，高效赋能教学。",
};

export default function TeacherDashboardLayout({
                                                   children,
                                               }: {
    children: React.ReactNode;
}) {
    return (
        <div className="teacher-layout-wrapper">
            <TeacherHeader />
            <main className="teacher-main-container">
                {children}
            </main>
        </div>
    );
}