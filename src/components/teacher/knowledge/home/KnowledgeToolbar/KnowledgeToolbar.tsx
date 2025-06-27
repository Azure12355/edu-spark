"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// --- CORE FIX: Import the new dedicated store ---
import { useKnowledgeViewStore, KnowledgeFilterStatus, KnowledgeFilterType, KnowledgeSortBy } from '@/store/knowledgeViewStore';
import styles from './KnowledgeToolbar.module.css';

// Data for dropdowns (no change)
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

// FilterDropdown sub-component (no change)
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
                            <li key={String(option.value)} onClick={() => { onSelect(option.value); setIsOpen(false); }}>
                                {option.label}
                            </li>
                        ))}
                    </motion.ul>
                )}
            </AnimatePresence>
        </div>
    );
};

// Main Toolbar component
interface KnowledgeToolbarProps {
    onOpenCreateModal: () => void;
}

const KnowledgeToolbar: React.FC<KnowledgeToolbarProps> = ({ onOpenCreateModal }) => {
    // --- CORE FIX: Use the new useKnowledgeViewStore ---
    const {
        searchTerm,
        setSearchTerm,
        filterStatus,
        setFilterStatus,
        filterType,
        setFilterType,
        sortBy,
        setSortBy
    } = useKnowledgeViewStore();

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