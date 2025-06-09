// src/app/teacher/course-management/[courseId]/layout.tsx
"use client";
import React from 'react';
import CourseManagementSider from '@/components/teacher/pages/CourseManagement/CourseManagementSider';
import styles from './layout.module.css';

export default function CourseManagementLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.pageContainer}>
      {/* 共享的左侧边栏 */}
      <CourseManagementSider />

      {/* 共享的右侧主内容区 (已移除面包屑) */}
      <div className={styles.mainContentArea}>
        <main className={styles.contentWrapper}>
          {children} {/* 此处渲染具体页面内容, 如 AI工作台或题库 */}
        </main>
      </div>
    </div>
  );
}