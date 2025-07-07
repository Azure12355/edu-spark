// [!file src/features/teacher/course/course-management/sub-features/question-bank/components/QuestionTableToolbar/QuestionTableToolbar.tsx]
"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from './QuestionTableToolbar.module.css';
import Tooltip from '@/shared/components/ui/Tooltip/Tooltip';
import {QuestionTypeEnum, QuestionTypeTextMap} from "@/shared/types";

// 1. 定义 props 接口，使其成为一个完全受控的组件
interface QuestionTableToolbarProps {
    activeFilter: '全部' | QuestionTypeEnum;
    onFilterChange: (filter: '全部' | QuestionTypeEnum) => void;
    searchTerm: string;
    onSearchChange: (term: string) => void;
    selectedCount: number;
    onBatchDelete: () => void;
}

// 2. 将筛选器选项移到组件外部，作为常量
const filters: ('全部' | QuestionTypeEnum)[] = ['全部', ...Object.values(QuestionTypeEnum)];

const QuestionTableToolbar: React.FC<QuestionTableToolbarProps> = ({
                                                                       activeFilter,
                                                                       onFilterChange,
                                                                       searchTerm,
                                                                       onSearchChange,
                                                                       selectedCount,
                                                                       onBatchDelete
                                                                   }) => {
    // 3. 内部状态只用于 UI 动画效果
    const [pillStyle, setPillStyle] = useState({});
    const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

    // 4. 使用 useEffect 监听 activeFilter 的变化，并计算“药丸”的位置和大小
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

    return (
        <div className={styles.toolbarContainer}>
            <div className={styles.filterGroup}>
                <span className={styles.filterLabel}>题目类型:</span>
                <div className={styles.filterButtons}>
                    <motion.div
                        className={styles.activePill}
                        animate={pillStyle}
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                    {filters.map((filter, index) => (
                        <button
                            key={filter}
                            ref={(el: any) => (buttonRefs.current[index] = el)}
                            className={styles.filterButton}
                            onClick={() => onFilterChange(filter)}
                        >
                            {filter === '全部' ? filter : QuestionTypeTextMap[filter]}
                        </button>
                    ))}
                </div>
            </div>

            <div className={styles.actionsGroup}>
                <div className={styles.searchInput}>
                    <i className="fas fa-search"></i>
                    <input
                        type="text"
                        placeholder="搜索题干内容..."
                        value={searchTerm}
                        onChange={(e) => onSearchChange(e.target.value)}
                    />
                </div>
                <Tooltip content={selectedCount > 0 ? `删除选中的 ${selectedCount} 道题` : "请先选择要删除的题目"}>
                    <button
                        className={styles.batchDeleteButton}
                        onClick={onBatchDelete}
                        disabled={selectedCount === 0}
                    >
                        <i className="fas fa-trash-alt"></i>
                        <span>批量删除</span>
                        {selectedCount > 0 && (
                            <span className={styles.countBadge}>{selectedCount}</span>
                        )}
                    </button>
                </Tooltip>
            </div>
        </div>
    );
};

export default QuestionTableToolbar;