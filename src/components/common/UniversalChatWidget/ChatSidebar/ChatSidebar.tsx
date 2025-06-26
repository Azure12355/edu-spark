// src/components/common/UniversalChatWidget/ChatSidebar/ChatSidebar.tsx
"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './ChatSidebar.module.css';
import Tooltip from '@/components/common/Tooltip/Tooltip';
// 新增导入
import { TeacherCourse } from '@/lib/data/teacherAssistantCourseData';

// 原有的 mock 数据
const topMenuItems = [
    { id: 'search', icon: 'fas fa-search', text: 'AI 搜索' },
    { id: 'write', icon: 'fas fa-pencil-alt', text: '帮我写作' },
    { id: 'code', icon: 'fas fa-code', text: 'AI 编程'},
    { id: 'image', icon: 'fas fa-image', text: '图像生成' },
];
const historyItems = [
    { id: 'h1', icon: 'far fa-comment', text: '日常问候' },
    { id: 'h2', icon: 'far fa-comment', text: '友好问候' },
    { id: 'h3', icon: 'far fa-comment', text: '手机版对话', hasNotification: true },
    { id: 'h4', icon: 'far fa-comment', text: '表述不清' },
    { id: 'h5', icon: 'far fa-comment', text: '生成3D插画' },
    { id: 'h6', icon: 'far fa-comment', text: '绘制漫画场景' },
];


// 修改 Props 接口
interface ChatSidebarProps {
    children?: React.ReactNode;
    currentCourse: TeacherCourse | null;
    onCourseSelectClick: () => void;
    onNewChatClick: () => void;
}


const ChatSidebar: React.FC<ChatSidebarProps> = ({ currentCourse, onCourseSelectClick, onNewChatClick }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [activeItem, setActiveItem] = useState('h3');

    const sidebarVariants = {
        open: { width: 280 },
        collapsed: { width: 68 }
    };

    const textVariants = {
        open: { opacity: 1, x: 0, transition: { duration: 0.2, delay: 0.1 } },
        collapsed: { opacity: 0, x: -10, transition: { duration: 0.1 } }
    };

    return (
        <motion.aside
            className={styles.sidebarContainer}
            variants={sidebarVariants}
            initial="open"
            animate={isCollapsed ? 'collapsed' : 'open'}
            transition={{ type: 'spring', stiffness: 5000, damping: 5000 }}
        >
            <div className={styles.sidebar}>
                <div className={styles.header}>
                    <button
                        className={styles.toggleButton}
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        title={isCollapsed ? "展开侧边栏" : "收起侧边栏"}
                    >
                        <motion.i
                            className={`${styles.icon} fas fa-chevron-left`}
                            animate={{ rotate: isCollapsed ? 180 : 0 }}
                        />
                    </button>

                    <AnimatePresence>
                        {!isCollapsed && (
                            <motion.div
                                key="header-content"
                                className={styles.headerContent}
                                initial={{ opacity: 0, width: 0, x: -20 }}
                                animate={{ opacity: 1, width: 'auto', x: 0 }}
                                exit={{ opacity: 0, width: 0, x: -20, transition: { duration: 0.1 } }}
                                transition={{ duration: 0.2, delay: 0.05 }}
                            >
                                {/* --- 新增的课程选择框 --- */}
                                <div className={styles.courseSelector} onClick={onCourseSelectClick} title="点击切换课程">
                                    <div className={styles.courseSelectorContent}>
                                        <div className={styles.courseIcon} style={{ backgroundColor: currentCourse?.color || '#6c757d' }}>
                                            <i className={currentCourse?.icon || 'fas fa-book'}></i>
                                        </div>
                                        <div className={styles.courseDetails}>
                                            <span className={styles.courseNameLabel}>当前课程</span>
                                            <span className={styles.courseNameValue}>{currentCourse?.name || '未选择'}</span>
                                        </div>
                                    </div>
                                    <i className={`fas fa-chevron-down ${styles.courseSelectorChevron}`}></i>
                                </div>

                                {/* 原有的新建对话按钮 */}
                                <button className={styles.newChatButton} onClick={onNewChatClick}>
                                    <i className="fas fa-plus"></i>
                                    <span>新对话</span>
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div className={styles.scrollableArea}>
                    {/* 主要功能区 */}
                    <div className={styles.menuSection}>
                        {topMenuItems.map(item => (
                            <Tooltip key={item.id} content={item.text} position="right">
                                <a href="#" className={`${styles.menuItem} ${isCollapsed ? styles.menuItemIconOnly : ''}`}>
                                    <i className={`${styles.icon} ${item.icon}`}></i>
                                    <AnimatePresence>
                                        {!isCollapsed && <motion.span variants={textVariants} className={styles.text}>{item.text}</motion.span>}
                                    </AnimatePresence>
                                </a>
                            </Tooltip>
                        ))}
                    </div>

                    {/* 历史对话区 */}
                    <div className={styles.menuSection}>
                        {!isCollapsed &&
                            <motion.h4 variants={textVariants} className={styles.sectionTitle}>历史对话</motion.h4>
                        }
                        {historyItems.map(item => (
                            <Tooltip key={item.id} content={item.text} position="right">
                                <a href="#"
                                   className={`${styles.menuItem} ${activeItem === item.id ? styles.active : ''} ${isCollapsed ? styles.menuItemIconOnly : ''}`}
                                   onClick={() => setActiveItem(item.id)}
                                >
                                    <i className={`${styles.icon} ${item.icon}`}></i>
                                    <AnimatePresence>
                                        {!isCollapsed && <motion.span variants={textVariants} className={styles.text}>{item.text}</motion.span>}
                                    </AnimatePresence>
                                    {!isCollapsed && item.hasNotification && <div className={styles.notification}></div>}
                                </a>
                            </Tooltip>
                        ))}
                    </div>
                </div>
            </div>
        </motion.aside>
    );
};

export default ChatSidebar;