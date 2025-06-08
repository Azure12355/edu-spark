// src/app/teacher/course-management/[courseId]/layout.tsx
"use client";
import React from 'react';
import { Breadcrumb } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
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

      {/* 共享的右侧主内容区 */}
      <div className={styles.mainContentArea}>
        <div className={styles.breadcrumbBar}>
          <Breadcrumb
            items={[
              { href: '/teacher/dashboard', title: <HomeOutlined /> },
              { href: '/teacher/course-center/created-courses', title: '我创建的课程' },
              { title: 'Python' }, // 这里未来可以动态获取课程名
            ]}
          />
        </div>
        <main className={styles.contentWrapper}>
          {children} {/* 此处渲染具体页面内容，如 AI工作台或班级管理 */}
        </main>
      </div>
    </div>
  );
}