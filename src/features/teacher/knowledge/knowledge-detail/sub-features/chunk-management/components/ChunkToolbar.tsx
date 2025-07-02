// src/features/teacher/knowledge/knowledge-detail/sub-features/chunk-management/components/ChunkToolbar.tsx
"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { DocumentVO } from '@/features/teacher/knowledge/knowledge-detail/services/documentService';
// 导入路径已更新
import { ViewMode } from './toolbar-parts/ViewModeToggle';
import SourceFilterDropdown from './toolbar-parts/SourceFilterDropdown';
import ViewModeToggle from './toolbar-parts/ViewModeToggle';
// 导入新的样式文件路径
import styles from '../styles/ChunkToolbar.module.css';

interface ChunkToolbarProps {
    chunkCount: number;
    documents: DocumentVO[];
    activeFilterId: number | 'ALL';
    onFilterChange: (id: number | 'ALL') => void;
    searchTerm: string;
    onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    viewMode: ViewMode;
    onViewModeChange: (mode: ViewMode) => void;
    onOpenAddModal: () => void;
    isSearching: boolean;
}

const ChunkToolbar: React.FC<ChunkToolbarProps> = ({
                                                       chunkCount,
                                                       documents,
                                                       activeFilterId,
                                                       onFilterChange,
                                                       searchTerm,
                                                       onSearchChange,
                                                       viewMode,
                                                       onViewModeChange,
                                                       onOpenAddModal,
                                                       isSearching,
                                                   }) => {
    // 动画变体保持不变
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.1 },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 200 } },
    };

    return (
        <motion.div
            className={styles.toolbarContainer}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <div className={styles.leftSection}>
                <motion.button
                    className={styles.newButton}
                    onClick={onOpenAddModal}
                    variants={itemVariants}
                    aria-label="新增切片"
                >
                    <i className="fas fa-plus"></i>
                    <span>新增切片</span>
                </motion.button>
                <motion.div className={styles.divider} variants={itemVariants}></motion.div>
                <motion.div className={styles.countInfo} variants={itemVariants}>
                    共 <span className={styles.countNumber}>{chunkCount.toLocaleString()}</span> 个切片
                </motion.div>
            </div>

            <div className={styles.rightSection}>
                <motion.div variants={itemVariants}>
                    <SourceFilterDropdown
                        documents={documents}
                        activeFilterId={activeFilterId}
                        onFilterChange={onFilterChange}
                    />
                </motion.div>

                <motion.div className={styles.searchBar} variants={itemVariants}>
                    <span className={styles.searchIcon} aria-hidden="true">
                        {isSearching ? (
                            <i className="fas fa-spinner fa-spin"></i>
                        ) : (
                            <i className="fas fa-search"></i>
                        )}
                    </span>
                    <input
                        type="text"
                        placeholder="搜索切片内容..."
                        className={styles.searchInput}
                        value={searchTerm}
                        onChange={onSearchChange}
                        aria-label="搜索切片"
                    />
                </motion.div>

                {/* 视图切换按钮的结构保持不变，但其内部样式已在 CSS 中更新 */}
                <motion.div variants={itemVariants}>
                    <ViewModeToggle
                        currentMode={viewMode}
                        onModeChange={onViewModeChange}
                    />
                </motion.div>
            </div>
        </motion.div>
    );
};

export default ChunkToolbar;