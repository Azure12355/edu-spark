"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { DocumentVO } from '@/features/teacher/knowledge/knowledge-detail/services/documentService';
import SourceFilterDropdown from './SourceFilterDropdown';
import ViewModeToggle, { ViewMode } from './ViewModeToggle';
import styles from './ChunkToolbar.module.css';

interface ChunkToolbarProps {
    chunkCount: number;
    documents: DocumentVO[];
    activeFilterId: number | 'ALL';
    onFilterChange: (id: number | 'ALL') => void;
    searchTerm: string;
    onSearchChange: (term: string) => void;
    viewMode: ViewMode;
    onViewModeChange: (mode: ViewMode) => void;
    onOpenAddModal: () => void;
    isSearching: boolean;
}

const ChunkToolbar: React.FC<ChunkToolbarProps> = ({
                                                       chunkCount, documents, activeFilterId, onFilterChange,
                                                       searchTerm, onSearchChange, viewMode, onViewModeChange,
                                                       onOpenAddModal, isSearching
                                                   }) => {
    return (
        <motion.div
            className={styles.toolbarContainer}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            <div className={styles.leftSection}>
                <button className={styles.newButton} onClick={onOpenAddModal}>
                    <i className="fas fa-plus"></i>
                    <span>新增切片</span>
                </button>
                <div className={styles.divider}></div>
                <div className={styles.countInfo}>
                    共 <span className={styles.countNumber}>{chunkCount.toLocaleString()}</span> 个切片
                </div>
            </div>
            <div className={styles.rightSection}>
                <SourceFilterDropdown
                    documents={documents}
                    activeFilterId={activeFilterId}
                    onFilterChange={onFilterChange}
                />
                <div className={styles.searchBar}>
                    {isSearching ? (
                        <i className={`fas fa-spinner fa-spin ${styles.searchIcon}`}></i>
                    ) : (
                        <i className={`fas fa-search ${styles.searchIcon}`}></i>
                    )}
                    <input
                        type="text"
                        placeholder="搜索切片内容..."
                        value={searchTerm}
                        onChange={(e) => onSearchChange(e.target.value)}
                        aria-label="搜索切片"
                    />
                </div>
                <ViewModeToggle
                    currentMode={viewMode}
                    onModeChange={onViewModeChange}
                />
            </div>
        </motion.div>
    );
};

export default ChunkToolbar;