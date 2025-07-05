"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './MyCoursesToolbar.module.css';
import Tooltip from '@/shared/components/ui/Tooltip/Tooltip';
// [!code ++] 导入 FilterStatus 类型
import { FilterStatus } from '../../hooks/useMyCourses';
// [!code ++] 导入 useDropdown 自定义 Hook
import { useDropdown } from '@/shared/hooks/useDropdown';

// 1. 定义组件接收的 Props 类型，与 Hook 完全对应
interface MyCoursesToolbarProps {
    searchTerm: string;
    onSearchChange: (term: string) => void;
    filterStatus: FilterStatus;
    onFilterChange: (status: FilterStatus) => void;
    // [!code focus start]
    // 排序逻辑的 Props
    sorter: { field: string; order: string } | null;
    onSorterChange: (sorter: { field: string; order: string } | null) => void;
    // [!code focus end]
    onBatchDelete: () => void;
    selectedCount: number;
}

// 定义筛选器选项
const filterOptions: FilterStatus[] = ['全部课程', '进行中', '已结束', '我的草稿'];

// [!code focus start]
// 定义排序选项
const sortOptions = [
    { field: 'updated_at', order: 'descend', label: '按最后更新排序' },
    { field: 'created_at', order: 'descend', label: '按创建时间排序' },
    { field: 'name', order: 'ascend', label: '按课程名排序' },
];
// [!code focus end]

const MyCoursesToolbar: React.FC<MyCoursesToolbarProps> = ({
                                                               searchTerm,
                                                               onSearchChange,
                                                               filterStatus,
                                                               onFilterChange,
                                                               sorter,
                                                               onSorterChange,
                                                               onBatchDelete,
                                                               selectedCount,
                                                           }) => {
    // 筛选器 "药丸" 动画所需的状态
    const [pillStyle, setPillStyle] = useState({});
    const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

    // [!code focus start]
    // 使用自定义 Hook 管理排序下拉菜单的开关状态
    const { isOpen: isSortMenuOpen, toggle: toggleSortMenu, close: closeSortMenu, dropdownRef: sortMenuRef } = useDropdown<HTMLDivElement>();
    // [!code focus end]

    useEffect(() => {
        const activeIndex = filterOptions.indexOf(filterStatus);
        const activeButton = buttonRefs.current[activeIndex];
        if (activeButton) {
            setPillStyle({
                left: activeButton.offsetLeft,
                width: activeButton.offsetWidth,
            });
        }
    }, [filterStatus]);

    const currentSortLabel = sortOptions.find(opt => opt.field === sorter?.field && opt.order === sorter?.order)?.label || '自定义排序';

    return (
        <div className={styles.toolbarContainer}>
            <div className={styles.leftSection}>
                {/* 筛选器按钮组 */}
                <div className={styles.filterGroup}>
                    <motion.div
                        className={styles.activePill}
                        animate={pillStyle}
                        transition={{ type: "spring", stiffness: 400, damping: 35 }}
                    />
                    {filterOptions.map((filter, index) => (
                        // @ts-ignore
                        <button key={filter} ref={(el) => buttonRefs.current[index] = el}
                            onClick={() => onFilterChange(filter)} // 调用 Hook 的方法
                            className={styles.filterButton}
                        >
                            {filter}
                        </button>
                    ))}
                </div>
            </div>

            <div className={styles.rightSection}>
                {/* 搜索框 (无变化) */}
                <div className={styles.searchInput}>
                    <i className="fas fa-search"></i>
                    <input
                        type="text"
                        placeholder="搜索我的课程..."
                        value={searchTerm}
                        onChange={(e) => onSearchChange(e.target.value)}
                    />
                </div>

                {/* [!code focus start] */}
                {/* 排序按钮，现在包含一个下拉菜单 */}
                <div className={styles.sortMenuWrapper} ref={sortMenuRef}>
                    <button className={styles.sortButton} onClick={toggleSortMenu}>
                        <i className="fas fa-sort-amount-down"></i>
                        <span>{currentSortLabel}</span>
                        <i className={`fas fa-chevron-down ${styles.sortChevron} ${isSortMenuOpen ? styles.open : ''}`}></i>
                    </button>
                    <AnimatePresence>
                        {isSortMenuOpen && (
                            <motion.div
                                className={styles.sortDropdown}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                            >
                                {sortOptions.map(option => (
                                    <button
                                        key={`${option.field}-${option.order}`}
                                        className={styles.sortItem}
                                        onClick={() => {
                                            onSorterChange(option);
                                            closeSortMenu();
                                        }}
                                    >
                                        {option.label}
                                    </button>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
                {/* [!code focus end] */}

                {/* 批量删除按钮 (无变化) */}
                <Tooltip content={selectedCount > 0 ? `删除选中的 ${selectedCount} 门课程` : "请先选择要删除的课程"}>
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
export default MyCoursesToolbar;