"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './CourseManagementSidebar.module.css';
import Tooltip from '@/shared/components/ui/Tooltip/Tooltip';
import {CourseVO} from "@/shared/types";

// 侧边栏链接数据保持不变
const sidebarLinks = [
    { name: '课程介绍', href: '/introduction', icon: 'fas fa-info-circle' },
    { name: '课程大纲', href: '/syllabus', icon: 'fas fa-sitemap' },
    { name: '题库管理', href: '/questions', icon: 'fas fa-file-alt' },
    { name: '班级管理', href: '/classes', icon: 'fas fa-users' },
    { name: '知识库', href: '/knowledge', icon: 'fas fa-database' },
    { name: '在线作业', href: '/assignments', icon: 'fas fa-pencil-ruler' },
    { name: '线上考试', href: '/exams', icon: 'fas fa-scroll' },
    { name: '课程统计', href: '/analytics', icon: 'fas fa-chart-pie' },
];

// 2. 更新 Props 接口
interface CourseManagementSidebarProps {
    course: CourseVO; // 使用真实的、从后端获取的 CourseVO 类型
    defaultCollapsed?: boolean;
}

const CourseManagementSidebar: React.FC<CourseManagementSidebarProps> = ({ course, defaultCollapsed = false }) => {
    const pathname = usePathname();
    // 3. 简化状态管理
    const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);

    // 4. 当 defaultCollapsed prop 变化时，同步内部状态
    useEffect(() => {
        setIsCollapsed(defaultCollapsed);
    }, [defaultCollapsed]);

    // 动画变体保持不变
    const sidebarVariants = {
        open: { width: 260, transition: { type: 'spring', stiffness: 350, damping: 35 } },
        collapsed: { width: 88, transition: { type: 'spring', stiffness: 350, damping: 35 } }
    };

    const textAndDetailsVariants = {
        open: { opacity: 1, x: 0, transition: { duration: 0.2, delay: 0.1 } },
        collapsed: { opacity: 0, x: -10, transition: { duration: 0.1 } }
    };

    return (
        <motion.aside
            className={styles.sidebar}
            variants={sidebarVariants}
            initial={isCollapsed ? "collapsed" : "open"} // 根据初始状态设置动画
            animate={isCollapsed ? 'collapsed' : 'open'}
        >
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
                        style={{ backgroundColor: course.colorTheme || '#4f46e5' }}
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
                                {/* 5. 使用真实的课程数据 */}
                                <h3 className={styles.courseName}>{course.name}</h3>
                                <p className={styles.courseTerm}>{course.term}</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <nav className={styles.navigation}>
                    {sidebarLinks.map((link) => {
                        // 6. 动态生成链接的 href
                        const fullHref = `/teacher/courses/${course.id}${link.href}`;
                        // 7. 优化激活状态的判断逻辑
                        const isActive = link.href === '/introduction'
                            ? pathname === fullHref // 仅当路径完全匹配时，"课程介绍"才激活
                            : pathname.startsWith(fullHref);

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
                    <Tooltip content="返回我的课程" position={isCollapsed ? "right" : "top"}>
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