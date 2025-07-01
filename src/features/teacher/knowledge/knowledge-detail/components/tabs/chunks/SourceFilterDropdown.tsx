"use client";
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDropdown } from '@/shared/hooks/useDropdown';
import { DocumentVO } from '@/features/teacher/knowledge/knowledge-detail/services/documentService';
import styles from './ChunkToolbar.module.css'; // 复用样式

interface SourceFilterDropdownProps {
    documents: DocumentVO[];
    activeFilterId: number | 'ALL';
    onFilterChange: (id: number | 'ALL') => void;
}

const SourceFilterDropdown: React.FC<SourceFilterDropdownProps> = ({ documents, activeFilterId, onFilterChange }) => {
    const { isOpen, toggle, close, dropdownRef } = useDropdown<HTMLDivElement>();
    const selectedDocName = documents.find(d => d.id === activeFilterId)?.name || '所有文档';

    return (
        <div className={styles.dropdownContainer} ref={dropdownRef}>
            <button className={styles.filterButton} onClick={toggle} aria-haspopup="true" aria-expanded={isOpen}>
                <i className="fas fa-filter"></i>
                <span title={selectedDocName}>{selectedDocName}</span>
                <motion.i className={`fas fa-chevron-down ${styles.chevron}`} animate={{ rotate: isOpen ? 180 : 0 }} />
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.ul className={styles.dropdownMenu} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                        <li onClick={() => { onFilterChange('ALL'); close(); }}>所有文档</li>
                        {documents.map(doc => (
                            <li key={doc.id} onClick={() => { onFilterChange(doc.id); close(); }}>
                                {doc.name}
                            </li>
                        ))}
                    </motion.ul>
                )}
            </AnimatePresence>
        </div>
    );
};

export default SourceFilterDropdown;