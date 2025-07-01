// src/app/teacher/(dashboard)/layout.tsx
"use client";
import React from 'react';
import { usePathname } from 'next/navigation';
import TeacherHeader from '@/features/teacher/course/course-management/components/Header/TeacherHeader';
import '../teacher.css';

export default function TeacherDashboardLayout({
                                                   children,
                                               }: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const isImmersivePage =
        pathname.startsWith('/teacher/assistant') ||
        pathname.startsWith('/teacher/courses/') ||
        pathname.includes('/ai-generate') ||
        pathname.includes('/teacher/knowledge/')
    ;

    return (
        <div className="teacher-layout-wrapper">
            <TeacherHeader />
            <main
                // 当是沉浸式页面时，使用 .teacher-main-full (无内边距，全高)
                // 否则使用 .teacher-main-container (有内边距，可滚动)
                className={isImmersivePage ? "teacher-main-full" : "teacher-main-container"}
            >
                {children}
            </main>
        </div>
    );
}