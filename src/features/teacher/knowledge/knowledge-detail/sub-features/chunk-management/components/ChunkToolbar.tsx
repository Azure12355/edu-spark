// src/features/teacher/knowledge/knowledge-detail/sub-features/chunk-management/components/ChunkToolbar.tsx
"use client";

import React from 'react';
import { motion } from 'framer-motion';
import SourceFilterDropdown from './toolbar-parts/SourceFilterDropdown';
import ViewModeToggle, { ViewMode } from './toolbar-parts/ViewModeToggle';
import styles from '../styles/ChunkToolbar.module.css';
import {
    DocumentVO
} from "@/features/teacher/knowledge/knowledge-detail/sub-features/document-management/services/documentService";

// 1. 定义清晰、全面的 Props 接口
interface ChunkToolbarProps {
    // 数据
    chunkCount: number;
    documents: DocumentVO[];

    // 状态
    activeFilterId: number | 'ALL';
    searchTerm: string;
    viewMode: ViewMode;
    isSearching: boolean;

    // 回调函数
    onFilterChange: (id: number | 'ALL') => void;
    onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onViewModeChange: (mode: ViewMode) => void;
    onOpenAddModal: () => void;
}

// 2. 组件实现
const ChunkToolbar: React.FC<ChunkToolbarProps> = ({
                                                       chunkCount,
                                                       documents,
                                                       activeFilterId,
                                                       searchTerm,
                                                       viewMode,
                                                       isSearching,
                                                       onFilterChange,
                                                       onSearchChange,
                                                       onViewModeChange,
                                                       onOpenAddModal,
                                                   }) => {
    // 动画变体
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.08, delayChildren: 0.1 },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 200, damping: 20 } },
    };

    return (
        <motion.div
            className={styles.toolbarContainer}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {/* 左侧区域：新增按钮和统计信息 */}
            <div className={styles.leftSection}>
                <motion.button
                    className={styles.newButton}
                    onClick={onOpenAddModal}
                    variants={itemVariants}
                    aria-label="新增切片"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <i className="fas fa-plus"></i>
                    <span>新增切片</span>
                </motion.button>
                <motion.div className={styles.divider} variants={itemVariants}></motion.div>
                <motion.div className={styles.countInfo} variants={itemVariants}>
                    共 <span className={styles.countNumber}>{chunkCount.toLocaleString()}</span> 个切片
                </motion.div>
            </div>

            {/* 右侧区域：筛选、搜索和视图切换 */}
            <div className={styles.rightSection}>
                {/* 3. 装配 SourceFilterDropdown 子组件 */}
                <motion.div variants={itemVariants}>
                    <SourceFilterDropdown
                        documents={documents}
                        activeFilterId={activeFilterId}
                        onFilterChange={onFilterChange}
                        disabled={isSearching}
                    />
                </motion.div>

                {/* 4. 装配搜索框 */}
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
                        disabled={isSearching}
                    />
                </motion.div>

                {/* 5. 装配 ViewModeToggle 子组件 */}
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