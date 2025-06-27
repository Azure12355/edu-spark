"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useKnowledgeStore, KnowledgeFilterStatus, KnowledgeFilterType, KnowledgeSortBy } from '@/store/knowledgeStore';
import styles from './KnowledgeToolbar.module.css';

// 1. 定义筛选和排序选项的数据
const statusOptions: { value: KnowledgeFilterStatus, label: string }[] = [
    { value: 'ALL', label: '所有状态' },
    { value: 'READY', label: '就绪' },
    { value: 'BUILDING', label: '构建中' },
    { value: 'ERROR', label: '失败' },
    { value: 'DISABLED', label: '未启用' },
];

const typeOptions: { value: KnowledgeFilterType, label: string }[] = [
    { value: 'ALL', label: '所有类型' },
    { value: 0, label: '文本' },
    { value: 2, label: '图片' },
];

const sortOptions: { value: KnowledgeSortBy, label: string }[] = [
    { value: 'updated_at', label: '按更新时间' },
    { value: 'name', label: '按名称' },
    { value: 'fork_count', label: '按热度' },
];

// 2. 自定义下拉菜单子组件
interface FilterDropdownProps {
    options: { value: any, label: string }[];
    selectedValue: any;
    onSelect: (value: any) => void;
    label: string;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({ options, selectedValue, onSelect, label }) => {
    const [isOpen, setIsOpen] = useState(false);
    const selectedLabel = options.find(opt => opt.value === selectedValue)?.label;

    return (
        <div className={styles.dropdownContainer}>
            <button className={styles.dropdownButton} onClick={() => setIsOpen(!isOpen)}>
                {label}: <span className={styles.dropdownValue}>{selectedLabel}</span>
                <i className={`fas fa-chevron-down ${styles.dropdownChevron} ${isOpen ? styles.open : ''}`}></i>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.ul
                        className={styles.dropdownMenu}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                    >
                        {options.map(option => (
                            <li key={option.value} onClick={() => { onSelect(option.value); setIsOpen(false); }}>
                                {option.label}
                            </li>
                        ))}
                    </motion.ul>
                )}
            </AnimatePresence>
        </div>
    );
};

// 3. 主工具栏组件
interface KnowledgeToolbarProps {
    onOpenCreateModal: () => void;
}

const KnowledgeToolbar: React.FC<KnowledgeToolbarProps> = ({ onOpenCreateModal }) => {
    // 4. 从 Store 中获取所有需要的状态和 actions
    const {
        searchTerm,
        setSearchTerm,
        filterStatus,
        setFilterStatus,
        filterType,
        setFilterType,
        sortBy,
        setSortBy
    } = useKnowledgeStore();

    return (
        <motion.div
            className={styles.toolbarContainer}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            <div className={styles.leftSection}>
                <button className={styles.createButton} onClick={onOpenCreateModal}>
                    <i className="fas fa-plus"></i>
                    <span>创建知识库</span>
                </button>
                <div className={styles.filters}>
                    <FilterDropdown label="状态" options={statusOptions} selectedValue={filterStatus} onSelect={setFilterStatus} />
                    <FilterDropdown label="类型" options={typeOptions} selectedValue={filterType} onSelect={setFilterType} />
                </div>
            </div>

            <div className={styles.rightSection}>
                <div className={styles.searchBar}>
                    <i className="fas fa-search"></i>
                    <input
                        type="text"
                        placeholder="搜索知识库名称..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    {searchTerm && (
                        <button className={styles.clearSearchButton} onClick={() => setSearchTerm('')}>
                            <i className="fas fa-times"></i>
                        </button>
                    )}
                </div>
                <FilterDropdown label="排序" options={sortOptions} selectedValue={sortBy} onSelect={setSortBy} />
            </div>
        </motion.div>
    );
};

export default KnowledgeToolbar;