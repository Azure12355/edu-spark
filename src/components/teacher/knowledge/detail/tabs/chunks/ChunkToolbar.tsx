"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DocumentVO } from '@/services/documentService';
import styles from './ChunkToolbar.module.css';

interface ChunkToolbarProps {
    chunkCount: number;
    documents: DocumentVO[];
    activeFilterId: number | 'ALL';
    onFilterChange: (id: number | 'ALL') => void;
    searchTerm: string;
    onSearchChange: (term: string) => void;
    onOpenAddModal: () => void;
}

const ChunkToolbar: React.FC<ChunkToolbarProps> = ({
                                                       chunkCount,
                                                       documents,
                                                       activeFilterId,
                                                       onFilterChange,
                                                       searchTerm,
                                                       onSearchChange,
                                                       onOpenAddModal
                                                   }) => {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const selectedDocName = documents.find(d => d.id === activeFilterId)?.name || '所有文档';

    return (
        <div className={styles.toolbar}>
            <div className={styles.leftSection}>
                <button className={styles.newButton} onClick={onOpenAddModal}>
                    <i className="fas fa-plus"></i> 新增切片
                </button>
                <div className={styles.divider}></div>
                <div className={styles.countInfo}>
                    共 <span className={styles.countNumber}>{chunkCount.toLocaleString()}</span> 个切片
                </div>
            </div>

            <div className={styles.rightSection}>
                <div className={styles.dropdownContainer}>
                    <button className={styles.filterButton} onClick={() => setIsFilterOpen(!isFilterOpen)}>
                        <i className="fas fa-filter"></i>
                        <span title={selectedDocName}>{selectedDocName}</span>
                        <i className={`fas fa-chevron-down ${styles.chevron} ${isFilterOpen ? styles.open : ''}`}></i>
                    </button>
                    <AnimatePresence>
                        {isFilterOpen && (
                            <motion.ul className={styles.dropdownMenu} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                                <li onClick={() => { onFilterChange('ALL'); setIsFilterOpen(false); }}>所有文档</li>
                                {documents.map(doc => (
                                    <li key={doc.id} onClick={() => { onFilterChange(doc.id); setIsFilterOpen(false); }}>
                                        {doc.name}
                                    </li>
                                ))}
                            </motion.ul>
                        )}
                    </AnimatePresence>
                </div>

                <div className={styles.searchBar}>
                    <i className={`fas fa-search ${styles.searchIcon}`}></i>
                    <input
                        type="text"
                        placeholder="搜索切片内容..."
                        className={styles.searchInput}
                        value={searchTerm}
                        onChange={(e) => onSearchChange(e.target.value)}
                    />
                </div>
            </div>
        </div>
    );
};

export default ChunkToolbar;