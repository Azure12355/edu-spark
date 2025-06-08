// src/app/teacher/course-management/[courseId]/ai-workbench/page.tsx
"use client";
import React from 'react';
import { Breadcrumb } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import CourseManagementSider from '@/components/teacher/pages/CourseManagement/CourseManagementSider';
import AIWorkbenchChatPanel from '@/components/teacher/pages/CourseManagement/AIWorkbenchChatPanel';
import AIToolbox from '@/components/teacher/pages/CourseManagement/AIToolbox';
import styles from './page.module.css';

const AIWorkbenchPage: React.FC = () => {
    return (
        <div className={styles.pageContainer}>
            <CourseManagementSider />
            <div className={styles.mainContentArea}>
                <div className={styles.breadcrumbBar}>
                    <Breadcrumb
                        items={[
                            { href: '/teacher/dashboard', title: <HomeOutlined /> },
                            { href: '/teacher/course-center/created-courses', title: '我创建的课程' },
                            { title: 'Python' }, // 这里可以动态获取课程名
                        ]}
                    />
                </div>
                <div className={styles.workbenchWrapper}>
                    <AIWorkbenchChatPanel />
                    <AIToolbox />
                </div>
            </div>
        </div>
    );
};

export default AIWorkbenchPage;