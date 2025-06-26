// src/app/teacher/(dashboard)/courses/[id]/layout.tsx
"use client";

import React from 'react';
import { useParams } from 'next/navigation';
import styles from './course-management-layout.module.css';
import CourseManagementSidebar from '@/components/teacher/course-management/Sidebar/CourseManagementSidebar';
import { teacherCourseData } from '@/lib/data/teacherCourseData'; // 复用之前的课程数据

export default function CourseManagementLayout({
                                                   children,
                                               }: {
    children: React.ReactNode;
}) {
    const params = useParams();
    const courseId = params.id as string;

    // 根据 ID 从数据源查找当前课程信息
    // 在真实应用中，这里会是一个 API 请求
    const currentCourse = teacherCourseData.find(c => c.id === courseId);

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
            <CourseManagementSidebar course={currentCourse} />
            <main className={styles.contentArea}>
                {children}
            </main>
        </div>
    );
}