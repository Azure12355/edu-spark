// src/features/teacher/knowledge/knowledge-detail/sub-features/document-management/components/DocumentToolbar.tsx
"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ConfirmationModal from '@/shared/components/ui/ConfirmationModal/ConfirmationModal';
import { useDropdown } from '@/shared/hooks/useDropdown';
import styles from '../style/DocumentToolbar.module.css';

// ===================================================================
//  1. 类型定义 (Props)
// ===================================================================
export interface FilterOption<T> {
    value: T;
    label: string;
}

interface DocumentToolbarProps {
    // 批量操作相关
    selectionCount: number;
    onDeleteSelected: () => Promise<boolean>;
    onReprocessSelected?: () => Promise<boolean>; // 可选的重新处理功能

    // 筛选与搜索
    statusOptions: FilterOption<number | 'ALL'>[];
    currentStatus: number | 'ALL';
    onStatusChange: (status: number | 'ALL') => void;

    searchTerm: string;
    onSearchTermChange: (term: string) => void;

    // 排序
    sortOptions: FilterOption<string>[];
    currentSort: string;
    onSortChange: (sortKey: string) => void;

    // 加载状态
    isDeleting?: boolean;
    isSearching?: boolean;
}

// ===================================================================
//  2. 可复用的下拉菜单子组件
// ===================================================================
interface FilterDropdownProps<T> {
    options: FilterOption<T>[];
    value: T;
    onChange: (value: T) => void;
    label: string;
}

const FilterDropdown = <T extends string | number>({ options, value, onChange, label }: FilterDropdownProps<T>) => {
    const { isOpen, toggle, close, dropdownRef } = useDropdown<HTMLDivElement>();

    // 如果 options 是 undefined 或 null，则 selectedLabel 会安全地回退到 '未知'。
    const selectedLabel = Array.isArray(options)
        ? options.find(opt => opt.value === value)?.label || '未知'
        : '未知';

    return (
        <div ref={dropdownRef} style={{ position: 'relative' }}>
            <button className={`${styles.dropdownButton} ${isOpen ? styles.open : ''}`} onClick={toggle}>
                <span>{label}: <strong>{selectedLabel}</strong></span>
                <i className={`fas fa-chevron-down ${styles.chevron}`}></i>
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
                            <li
                                key={String(option.value)}
                                className={option.value === value ? styles.active : ''}
                                onClick={() => { onChange(option.value); close(); }}
                            >
                                {option.label}
                            </li>
                        ))}
                    </motion.ul>
                )}
            </AnimatePresence>
        </div>
    );
};

// ===================================================================
//  3. 主 Toolbar 组件
// ===================================================================
const DocumentToolbar: React.FC<DocumentToolbarProps> = ({
                                                             selectionCount,
                                                             onDeleteSelected,
                                                             onReprocessSelected,
                                                             statusOptions,
                                                             currentStatus,
                                                             onStatusChange,
                                                             searchTerm,
                                                             onSearchTermChange,
                                                             sortOptions,
                                                             currentSort,
                                                             onSortChange,
                                                             isDeleting = false,
                                                             isSearching = false,
                                                         }) => {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const handleConfirmDelete = async () => {
        const success = await onDeleteSelected();
        if (success) {
            setIsDeleteModalOpen(false);
        }
    };

    const toolbarVariants = {
        initial: { opacity: 0, y: -10 },
        animate: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 25 } },
        exit: { opacity: 0, y: -10 },
    };

    const renderDefaultView = () => (
        <motion.div key="default-filters" className={styles.actionsContainer} {...toolbarVariants}>
            <div className={styles.leftSection}>
                <FilterDropdown label="状态" options={statusOptions} value={currentStatus} onChange={onStatusChange} />
                <FilterDropdown label="排序" options={sortOptions} value={currentSort} onChange={onSortChange} />
            </div>
            <div className={styles.rightSection}>
                <div className={styles.searchContainer}>
                    <i className={`fas ${isSearching ? 'fa-spinner fa-spin' : 'fa-search'}`}></i>
                    <input type="text" placeholder="搜索文档名称..." value={searchTerm} onChange={(e) => onSearchTermChange(e.target.value)} disabled={isSearching} />
                </div>
            </div>
        </motion.div>
    );



    const renderBatchActionsView = () => (
        <motion.div key="batch-actions" className={styles.actionsContainer} {...toolbarVariants}>
            <span className={styles.selectionInfo}>已选择 {selectionCount} 项</span>
            <div className={styles.buttonGroup}>
                {onReprocessSelected && (
                    <button className={styles.actionButton} onClick={onReprocessSelected}>
                        <i className="fas fa-redo"></i> 重新处理
                    </button>
                )}
                <button
                    className={`${styles.actionButton} ${styles.deleteButton}`}
                    onClick={() => setIsDeleteModalOpen(true)}
                    disabled={isDeleting}
                >
                    <i className={`fas ${isDeleting ? 'fa-spinner fa-spin' : 'fa-trash-alt'}`}></i>
                    {isDeleting ? '删除中...' : '删除'}
                </button>
            </div>
        </motion.div>
    );

    return (
        <>
            <div className={styles.toolbar}>
                <AnimatePresence mode="wait">
                    {selectionCount > 0 ? renderBatchActionsView() : renderDefaultView()}
                </AnimatePresence>
            </div>

            <ConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleConfirmDelete}
                isConfirming={isDeleting}
                title="确认批量删除"
                message={<>您确定要永久删除选中的 <strong>{selectionCount}</strong> 个文档吗？<br/>此操作将级联删除其下的所有切片，且不可撤销。</>}
                confirmText={isDeleting ? "删除中..." : "确认删除"}
                type="danger"
            />
        </>
    );
};

export default DocumentToolbar;