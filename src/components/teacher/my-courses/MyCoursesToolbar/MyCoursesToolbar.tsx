// src/components/teacher/my-courses/MyCoursesToolbar.tsx
"use client";
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import styles from './MyCoursesToolbar.module.css';

type FilterType = '全部课程' | '进行中' | '已结束' | '我的收藏';

interface ToolbarProps {
    activeFilter: FilterType;
    onFilterChange: (filter: FilterType) => void;
    searchTerm: string;
    onSearchChange: (term: string) => void;
}

const filterOptions = [
    { name: '全部课程', icon: 'fas fa-th-large' },
    { name: '进行中', icon: 'fas fa-spinner' },
    { name: '已结束', icon: 'fas fa-check-circle' },
    { name: '我的收藏', icon: 'fas fa-star' },
];

const MyCoursesToolbar: React.FC<ToolbarProps> = ({
                                                      activeFilter,
                                                      onFilterChange,
                                                      searchTerm,
                                                      onSearchChange
                                                  }) => {
    return (
        <div className={styles.toolbarContainer}>
            <div className={styles.filterGroup}>
                {filterOptions.map(option => (
                    <button
                        key={option.name}
                        onClick={() => onFilterChange(option.name as FilterType)}
                        className={`${styles.filterButton} ${activeFilter === option.name ? styles.active : ''}`}
                    >
                        {activeFilter === option.name &&
                            <motion.div
                                layoutId="activeFilterPill"
                                className={styles.activePill}
                                transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                            />
                        }
                        <div className={styles.buttonContent}>
                            <i className={option.icon + (activeFilter === '进行中' && option.name === '进行中' ? ' fa-spin' : '')}></i>
                            <span>{option.name}</span>
                        </div>
                    </button>
                ))}
            </div>
            <div className={styles.actionGroup}>
                <div className={styles.searchInput}>
                    <i className="fas fa-search"></i>
                    <input
                        type="text"
                        placeholder="搜索我的课程..."
                        value={searchTerm}
                        onChange={(e) => onSearchChange(e.target.value)}
                    />
                </div>
                <Link href="/teacher/create-course" className="teacher-button-primary">
                    <i className="fas fa-plus"></i> 创建新课程
                </Link>
            </div>
        </div>
    );
};

export default MyCoursesToolbar;