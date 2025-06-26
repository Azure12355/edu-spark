// src/components/teacher/course-management/Sidebar/CourseManagementSidebar.tsx
"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './CourseManagementSidebar.module.css';
import { TeacherCourse } from '@/lib/data/teacherCourseData';
import Tooltip from '@/components/common/Tooltip/Tooltip'; // 引入 Tooltip 组件

// 侧边栏链接数据保持不变
const sidebarLinks = [
    { name: '课程介绍', href: '/introduction', icon: 'fas fa-info-circle' }, // 新增项
    { name: '课程大纲', href: '/syllabus', icon: 'fas fa-sitemap' }, // 新增项
    { name: '班级管理', href: '/classes', icon: 'fas fa-users' },
    { name: '题库管理', href: '/questions', icon: 'fas fa-file-alt' },
    { name: '知识库', href: '/knowledge', icon: 'fas fa-database' },
    { name: '在线作业', href: '/assignments', icon: 'fas fa-pencil-ruler' },
    { name: '线上考试', href: '/exams', icon: 'fas fa-scroll' },
    { name: '课程统计', href: '/analytics', icon: 'fas fa-chart-pie' },
];

interface CourseManagementSidebarProps {
    course: TeacherCourse;
}

const CourseManagementSidebar: React.FC<CourseManagementSidebarProps> = ({ course }) => {
    const pathname = usePathname();
    const params = useParams();
    const courseId = params.id;

    // 1. 新增状态来控制侧边栏的折叠
    const [isCollapsed, setIsCollapsed] = useState(false);

    // 2. 定义 Framer Motion 动画变体
    const sidebarVariants = {
        open: { width: 260 },
        collapsed: { width: 88 }
    };

    const textAndDetailsVariants = {
        open: { opacity: 1, x: 0, transition: { duration: 0.2, delay: 0.1 } },
        collapsed: { opacity: 0, x: -10, transition: { duration: 0.1 } }
    };

    return (
        <motion.aside
            className={styles.sidebar}
            variants={sidebarVariants}
            initial="open"
            animate={isCollapsed ? 'collapsed' : 'open'}
            transition={{ type: 'spring', stiffness: 350, damping: 35 }}
        >
            {/* 3. 添加折叠按钮 */}
            <button
                className={styles.toggleButton}
                onClick={() => setIsCollapsed(!isCollapsed)}
                title={isCollapsed ? '展开侧边栏' : '收起侧边栏'}
            >
                <motion.i
                    className="fas fa-chevron-left"
                    animate={{ rotate: isCollapsed ? 180 : 0 }}
                />
            </button>

            <div className={styles.sidebarContent}>
                <div className={styles.courseInfo}>
                    <motion.div
                        className={styles.courseAvatar}
                        animate={{
                            width: isCollapsed ? 48 : 64,
                            height: isCollapsed ? 48 : 64,
                            fontSize: isCollapsed ? '20px' : '28px',
                        }}
                        style={{ backgroundColor: course.color }}
                    >
                        {course.name.charAt(0)}
                    </motion.div>
                    <AnimatePresence>
                        {!isCollapsed && (
                            <motion.div
                                className={styles.courseDetails}
                                variants={textAndDetailsVariants}
                                initial="collapsed"
                                animate="open"
                                exit="collapsed"
                            >
                                <h3 className={styles.courseName}>{course.name}</h3>
                                <p className={styles.courseTerm}>{course.creator} · {course.status}</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <nav className={styles.navigation}>
                    {sidebarLinks.map((link) => {
                        const fullHref = `/teacher/courses/${courseId}${link.href}`;
                        const isActive = pathname.startsWith(fullHref);
                        const navLinkContent = (
                            <Link href={fullHref} className={`${styles.navLink} ${isCollapsed ? styles.navLinkCollapsed : ''} ${isActive ? styles.active : ''}`}>
                                <i className={`${link.icon} ${styles.icon}`}></i>
                                <AnimatePresence>
                                    {!isCollapsed && (
                                        <motion.span variants={textAndDetailsVariants} className={styles.linkText}>{link.name}</motion.span>
                                    )}
                                </AnimatePresence>
                                {isActive && !isCollapsed && (
                                    <motion.div
                                        className={styles.activeIndicator}
                                        layoutId="course-management-active-indicator"
                                        transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                                    />
                                )}
                            </Link>
                        );

                        return isCollapsed ? (
                            <Tooltip key={link.name} content={link.name} position="right">
                                {navLinkContent}
                            </Tooltip>
                        ) : (
                            <div key={link.name}>{navLinkContent}</div>
                        );
                    })}
                </nav>

                <div className={styles.sidebarFooter}>
                    <Tooltip content="返回我的课程" position="right">
                        <Link href="/teacher/courses" className={`${styles.backButton} ${isCollapsed ? styles.navLinkCollapsed : ''}`}>
                            <i className="fas fa-arrow-left"></i>
                            <AnimatePresence>
                                {!isCollapsed && (
                                    <motion.span variants={textAndDetailsVariants} className={styles.linkText}>返回我的课程</motion.span>
                                )}
                            </AnimatePresence>
                        </Link>
                    </Tooltip>
                </div>
            </div>
        </motion.aside>
    );
};

export default CourseManagementSidebar;