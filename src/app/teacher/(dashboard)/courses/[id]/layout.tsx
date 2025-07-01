// src/app/teacher/(dashboard)/courses/[id]/layout.tsx
"use client";

import React from 'react';
import { usePathname, useParams } from 'next/navigation';
import styles from './course-management-layout.module.css';
import CourseManagementSidebar from '@/features/teacher/course/course-management/components/Sidebar/CourseManagementSidebar';
import { teacherCourseData } from '@/shared/lib/data/teacherCourseData';

export default function CourseManagementLayout({
                                                   children,
                                               }: {
    children: React.ReactNode;
}) {
    const params = useParams();
    const pathname = usePathname(); // 1. 获取当前路径
    const courseId = params.id as string;
    const currentCourse = teacherCourseData.find(c => c.id === courseId);

    // 2. 判断当前是否在知识点详情页
    const isPointDetailPage = pathname.includes('/syllabus/') ||
        pathname.includes('/questions')
    ;

    if (!currentCourse) {
        return (
            <div className={styles.notFound}>
                <h2>课程不存在</h2>
                <p>抱歉，我们找不到您要管理的课程信息。</p>
            </div>
        );
    }

    return (
        <div className={styles.layoutContainer}>
            {/* 3. 将 isCollapsed 状态传递给侧边栏 */}
            {
                !isPointDetailPage && <CourseManagementSidebar course={currentCourse} defaultCollapsed={isPointDetailPage} />
            }

            <main className={styles.contentArea}>
                {children}
            </main>
        </div>
    );
}