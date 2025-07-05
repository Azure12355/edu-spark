"use client";

import React from 'react';
import { usePathname } from 'next/navigation';
import styles from './course-management-layout.module.css';
import CourseManagementSidebar from '@/features/teacher/course/course-management/components/Sidebar/CourseManagementSidebar';
// [!code focus start]
// 1. 导入新创建的 Hook
import { useCourseManagementLayout } from '@/features/teacher/course/course-management/hooks/useCourseManagementLayout';
// [!code focus end]

// 2. 创建一个优雅的加载骨架屏组件
const LayoutSkeleton = () => (
    <div className={styles.layoutContainer}>
        {/* 模拟侧边栏 */}
        <div className={styles.sidebarSkeleton}>
            <div className={styles.avatarSkeleton}></div>
            <div className={styles.textLineSkeleton} style={{ width: '70%' }}></div>
            <div className={styles.textLineSkeleton} style={{ width: '50%' }}></div>
            <div className={styles.menuSkeleton}>
                {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className={styles.menuItemSkeleton}></div>
                ))}
            </div>
        </div>
        {/* 内容区可以暂时为空，或也放置一个简单的加载指示器 */}
        <main className={styles.contentArea}>
            <div className={styles.contentLoading}>
                <div className={styles.spinner}></div>
            </div>
        </main>
    </div>
);

// 3. 创建一个清晰的错误提示组件
const ErrorState = ({ message }: { message: string }) => (
    <div className={styles.notFound}>
        <i className="fas fa-exclamation-circle" style={{ fontSize: '48px', color: '#ef4444' }}></i>
        <h2>加载课程失败</h2>
        <p>{message || "抱歉，我们无法找到您要管理的课程信息。"}</p>
    </div>
);


export default function CourseManagementLayout({ children }: { children: React.ReactNode }) {
    // 4. 调用 Hook 获取数据和状态
    const { course, isLoading, error } = useCourseManagementLayout();
    const pathname = usePathname();

    // 5. 根据状态进行条件渲染
    if (isLoading) {
        return <LayoutSkeleton />;
    }

    if (error || !course) {
        return <ErrorState message={error!} />;
    }

    // 判断当前是否在知识点详情页或相关页面
    const isImmersiveSubPage =
        pathname.includes('/syllabus/') ||
        pathname.includes('/questions');

    return (
        <div className={styles.layoutContainer}>
             {/*6. 将获取到的真实 `course` 数据传递给侧边栏 */}
            <CourseManagementSidebar
                course={course}
                defaultCollapsed={isImmersiveSubPage}
            />
            <main className={styles.contentArea}>
                {children}
            </main>
        </div>
    );
}