// src/components/teacher/course-management/questions/QuestionTableToolbar.tsx
"use client";
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from './QuestionTableToolbar.module.css';
import { QuestionType } from '@/shared/constants/enums'; // 核心修改 1：导入 QuestionType 枚举

// 核心修改 2：定义新的 Filter 类型，并动态生成筛选器列表
type FilterType = '全部' | QuestionType;
const filters: FilterType[] = ['全部', ...Object.values(QuestionType)];

interface QuestionTableToolbarProps {
    onFilterChange: (filter: FilterType) => void;
}

const QuestionTableToolbar: React.FC<QuestionTableToolbarProps> = ({ onFilterChange }) => {
    // 核心修改 3：更新 activeFilter 的状态类型
    const [activeFilter, setActiveFilter] = useState<FilterType>('全部');
    const [pillStyle, setPillStyle] = useState({});
    const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

    useEffect(() => {
        const activeIndex = filters.indexOf(activeFilter);
        const activeButton = buttonRefs.current[activeIndex];
        if (activeButton) {
            setPillStyle({
                left: activeButton.offsetLeft,
                width: activeButton.offsetWidth,
            });
        }
    }, [activeFilter]);

    const handleFilterClick = (filter: FilterType) => {
        setActiveFilter(filter);
        onFilterChange(filter);
    };

    return (
        <div className={styles.toolbarContainer}>
            <div className={styles.filterGroup}>
                <span className={styles.filterLabel}>题目类型:</span>
                <div className={styles.filterButtons}>
                    <motion.div
                        className={styles.activePill}
                        animate={pillStyle}
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                    {/* 核心修改 4：遍历新的 filters 数组 */}
                    {filters.map((filter, index) => (
                        <button
                            key={filter}
                            ref={(el: any) => buttonRefs.current[index] = el}
                            className={styles.filterButton}
                            onClick={() => handleFilterClick(filter)}
                        >
                            {filter}
                        </button>
                    ))}
                </div>
            </div>
            <div className={styles.searchGroup}>
                <div className={styles.searchInput}>
                    <i className="fas fa-search"></i>
                    <input type="text" placeholder="搜索题干内容..." />
                </div>
            </div>
        </div>
    );
};

export default QuestionTableToolbar;