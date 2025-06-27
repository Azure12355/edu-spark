"use client";
import React, { useState, useMemo } from 'react'; // Import useMemo
import { motion, AnimatePresence } from 'framer-motion';
import styles from './ChunkToolbar.module.css';
import { useKnowledgeStore } from '@/store/knowledgeStore';
import { useChunkStore, ChunkViewMode } from '@/store/chunkStore';
import { useParams } from 'next/navigation';

interface ChunkToolbarProps {
    chunkCount: number;
    onOpenAddModal: () => void;
    // We no longer need to pass filter props, the component gets them from the store
}

const ChunkToolbar: React.FC<ChunkToolbarProps> = ({ chunkCount, onOpenAddModal }) => {
    const params = useParams();
    const kbId = params.id as string;

    // --- CORE FIX: Select the entire documents object, which is stable ---
    const allDocuments = useKnowledgeStore(state => state.documents);
    // --- Use useMemo to get the specific documents for this kbId. This only recalculates if allDocuments or kbId changes ---
    const documents = useMemo(() => allDocuments[kbId] || [], [allDocuments, kbId]);

    const {
        sourceFilter,
        setSourceFilter,
        searchTerm,
        setSearchTerm,
        viewMode,
        setViewMode
    } = useChunkStore();

    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const selectedDocName = documents.find(d => d.id === sourceFilter)?.name || '所有文档';

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
                            <motion.ul
                                className={styles.dropdownMenu}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                            >
                                <li onClick={() => { setSourceFilter('ALL'); setIsFilterOpen(false); }}>所有文档</li>
                                {documents.map(doc => (
                                    <li key={doc.id} onClick={() => { setSourceFilter(doc.id); setIsFilterOpen(false); }}>
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
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className={styles.viewToggle}>
                    <button className={`${styles.toggleButton} ${viewMode === 'list' ? styles.active : ''}`} onClick={() => setViewMode('list')} title="列表视图">
                        <i className="fas fa-list"></i>
                    </button>
                    <button className={`${styles.toggleButton} ${viewMode === 'grid' ? styles.active : ''}`} onClick={() => setViewMode('grid')} title="网格视图">
                        <i className="fas fa-th-large"></i>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChunkToolbar;