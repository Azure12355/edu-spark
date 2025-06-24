// src/components/teacher/my-courses/MyCoursesToolbar.tsx
"use client";
import React, { useState } from 'react';
// 1. 从导入中移除 AnimateSharedLayout
import { motion } from 'framer-motion';
import styles from './MyCoursesToolbar.module.css';

const filterOptions = ['全部课程', '进行中', '已结束', '我的收藏'];

const MyCoursesToolbar = () => {
    const [activeFilter, setActiveFilter] = useState('全部课程');

    return (
        <div className={styles.toolbarContainer}>
            <div className={styles.filterGroup}>
                {/* 2. 移除 <AnimateSharedLayout> 包裹器，直接映射按钮 */}
                {filterOptions.map(option => (
                    <button
                        key={option}
                        onClick={() => setActiveFilter(option)}
                        className={`${styles.filterButton} ${activeFilter === option ? styles.active : ''}`}
                    >
                        {activeFilter === option &&
                            <motion.div
                                layoutId="activeFilterPill"
                                className={styles.activePill}
                                // 添加一个平滑的弹簧动画过渡
                                transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                            />
                        }
                        {option}
                    </button>
                ))}
            </div>
            <div className={styles.actionGroup}>
                <div className={styles.searchInput}>
                    <i className="fas fa-search"></i>
                    <input type="text" placeholder="搜索我的课程" />
                </div>
                <button className="teacher-button-primary">
                    <i className="fas fa-plus"></i> 创建新课程
                </button>
            </div>
        </div>
    );
};

export default MyCoursesToolbar;