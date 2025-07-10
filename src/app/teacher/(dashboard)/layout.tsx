// src/app/teacher/(dashboard)/layout.tsx
"use client";
import React from 'react';
import { usePathname } from 'next/navigation';
import Header from '@/shared/components/common/Header/Header';
import '../teacher.css';

export default function TeacherDashboardLayout({
                                                   children,
                                               }: {
    children: React.ReactNode;
}) {
    const pathname = usePathname() || "";

    const isKnowledgeDetailPage = /^\/teacher\/knowledge\/\d+/.test(pathname);

    const isImmersivePage =
        pathname.startsWith('/teacher/assistant') ||
        pathname.startsWith('/teacher/courses/') ||
        pathname.includes('/ai-generate') ||
        pathname.includes('/teacher/knowledge/') ||
        isKnowledgeDetailPage
    ;

    const navLinks = [
        {name: '课程智能体', href: '/teacher/assistant'},
        {name: '工作台', href: '/teacher/studio'},
        {name: '我的课程', href: '/teacher/courses'},
        {name: '学情分析', href: '/teacher/academic'},
        {name: '知识库', href: '/teacher/knowledge'},
        {name: '共享资源', href: '/teacher/shared-resources'},
    ];

    return (
        <div className="teacher-layout-wrapper">
            {!isKnowledgeDetailPage && <Header navLinks={navLinks} name={"教师端"} />}
            <main
                className={isImmersivePage ? "teacher-main-full" : "teacher-main-container"}
            >
                {children}
            </main>
        </div>
    );
}