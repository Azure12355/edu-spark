// src/app/teacher/layout.tsx
"use client";
import React, { useState } from 'react';
import TeacherHeader from '@/components/teacher/layout/TeacherHeader';
import TeacherSider from '@/components/teacher/layout/TeacherSider';
import styles from './layout.module.css';
import { usePathname } from 'next/navigation';

export default function TeacherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAgentExperiencePage = pathname.includes('/teacher/agent-experience');
  const isCourseManagementPage = pathname.startsWith('/teacher/course-management');

  // 移除了内部的 FloatingSidebar 和 CourseAssistantWidget，因为它们不属于课程管理界面
  
  // 根据页面类型决定 contentWrapper 的样式和内边距
  const contentWrapperClass = isAgentExperiencePage || isCourseManagementPage
    ? styles.contentWrapper 
    : `${styles.contentWrapper} ${styles.scrollable}`;
  
  const contentWrapperStyle = { 
    padding: isAgentExperiencePage || isCourseManagementPage ? 0 : '24px' 
  };

  return (
    <div className={styles.teacherLayout}>
      <TeacherHeader />
      {/* 核心改动：用一个 flex-grow 的容器包裹所有主内容 */}
      <main className={styles.mainContentContainer}>
        {isCourseManagementPage || isAgentExperiencePage ? (
          // 对于课程管理和体验中心，让子页面直接填充
          children
        ) : (
          // 对于其他页面，使用旧的带 Sider 的布局
          <div className={styles.mainWrapper}>
            <TeacherSider />
            <div className={contentWrapperClass} style={contentWrapperStyle}>
              {children}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}