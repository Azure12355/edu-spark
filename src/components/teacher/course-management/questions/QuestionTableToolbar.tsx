// src/components/teacher/course-management/questions/QuestionTableToolbar.tsx
"use client";
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from './QuestionTableToolbar.module.css';
import { QuestionType } from '@/lib/data/questionBankData';

type Filter = '全部' | QuestionType;
const filters: Filter[] = ['全部', '单选题', '多选题', '判断题', '填空题', '简答题', '编程题'];

interface QuestionTableToolbarProps {
    onFilterChange: (filter: Filter) => void;
}

const QuestionTableToolbar: React.FC<QuestionTableToolbarProps> = ({ onFilterChange }) => {
    const [activeFilter, setActiveFilter] = useState<Filter>('全部');
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

    const handleFilterClick = (filter: Filter) => {
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