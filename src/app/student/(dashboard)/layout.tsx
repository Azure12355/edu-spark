// src/app/student/(dashboard)/layout.tsx
"use client";
import React from 'react';
import {usePathname} from 'next/navigation';
import '../student.css';
import Header from "@/shared/components/common/Header/Header"; // 引入学生端专属全局样式
import '../../globals.css';

export default function StudentDashboardLayout({
                                                   children,
                                               }: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    const navLinks = [
        {name: '智能广场', href: '/student/home'},
        {name: '课程智能体', href: '/student/assistant'},
        {name: '我的课程', href: '/student/courses'},
        {name: '在线练习', href: '/student/assignment/player'},
        {name: '学情分析', href: '/student/academic'},
        {name: '知识库', href: '/student/knowledge'},
        {name: '共享资源', href: '/student/shared-resources'},
    ];

    return (
        <div className="student-layout-wrapper">
            <Header navLinks={navLinks} name={"学生端📐"}/>
            <div className="student-main-container">
                <div className="student-content-area">
                    {children}
                </div>
            </div>
        </div>
    );
}