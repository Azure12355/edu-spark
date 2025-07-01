"use client";

import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDropdown } from '@/hooks/useDropdown';
import { DocumentVO } from '@/services/documentService';
import { getFileIcon } from '@/lib/data/documentData';
import styles from './AddChunkModal.module.css'; // 复用样式

interface DocumentSelectorProps {
    documents: DocumentVO[];
    selectedId: number | null;
    onSelect: (id: number) => void;
    disabled?: boolean;
}

const DocumentSelector: React.FC<DocumentSelectorProps> = ({ documents, selectedId, onSelect, disabled }) => {
    const { isOpen, toggle, close, dropdownRef } = useDropdown<HTMLDivElement>();
    const selectedDoc = useMemo(() => documents.find(d => d.id === selectedId), [documents, selectedId]);
    const iconInfo = selectedDoc ? getFileIcon(selectedDoc.type as any) : { icon: 'fa-question-circle', color: '#6c757d' };

    return (
        <div className={styles.customSelectWrapper} ref={dropdownRef}>
            <button
                type="button" // 关键：防止触发表单提交
                className={`${styles.selectDisplay} ${isOpen ? styles.open : ''}`}
                onClick={toggle}
                disabled={disabled}
                aria-haspopup="listbox"
                aria-expanded={isOpen}
            >
                {selectedDoc ? (
                    <>
                        <i className={`fas ${iconInfo.icon}`} style={{ color: iconInfo.color }}></i>
                        <span>{selectedDoc.name}</span>
                    </>
                ) : (
                    <span className={styles.placeholder}>请选择一个来源文档</span>
                )}
                <motion.i className={`fas fa-chevron-down ${styles.chevron}`} animate={{ rotate: isOpen ? 180 : 0 }} />
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.ul
                        className={styles.dropdownList}
                        role="listbox"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                    >
                        {documents.map(doc => (
                            <li
                                key={doc.id}
                                className={`${styles.dropdownItem} ${selectedId === doc.id ? styles.selected : ''}`}
                                onClick={() => { onSelect(doc.id); close(); }}
                                role="option"
                                aria-selected={selectedId === doc.id}
                            >
                                <i className={`fas ${getFileIcon(doc.type as any).icon}`} style={{ color: getFileIcon(doc.type as any).color }}></i>
                                <span>{doc.name}</span>
                                {selectedId === doc.id && <i className="fas fa-check"></i>}
                            </li>
                        ))}
                    </motion.ul>
                )}
            </AnimatePresence>
        </div>
    );
};

export default DocumentSelector;