// src/features/teacher/knowledge/knowledge-detail/sub-features/chunk-management/components/toolbar-parts/DocumentSelector.tsx
"use client";

import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDropdown } from '@/shared/hooks/useDropdown';
import styles from '../styles/DocumentSelector.module.css'; // [!code focus] 引用新的、专属的样式文件
import { DocumentVO } from '../../document-management/services/documentService';

// Props 接口保持不变
interface DocumentSelectorProps {
    documents: DocumentVO[];
    selectedId: number | null;
    onSelect: (id: number) => void;
    disabled?: boolean;
    placeholder?: string;
}

const DocumentSelector: React.FC<DocumentSelectorProps> = ({
                                                               documents,
                                                               selectedId,
                                                               onSelect,
                                                               disabled = false,
                                                               placeholder = "请选择一个来源文档"
                                                           }) => {
    // 1. 使用 useDropdown Hook 管理状态
    const { isOpen, toggle, close, dropdownRef } = useDropdown<HTMLDivElement>();

    // 2. 使用 useMemo 缓存计算结果，避免不必要的重复计算
    const selectedDoc = useMemo(() => documents.find(d => d.id === selectedId), [documents, selectedId]);

    // 3. 将 UI 元素拆分为更小的、可读的变量
    const displayContent = useMemo(() => {
        if (selectedDoc) {
            return (
                <>
                    <span className={styles.text} title={selectedDoc.name}>{selectedDoc.name}</span>
                </>
            );
        }
        return <span className={`${styles.text} ${styles.placeholder}`}>{placeholder}</span>;
    }, [selectedDoc, placeholder]);

    // 4. 动画变体
    const menuVariants = {
        hidden: { opacity: 0, height: 0, transition: { duration: 0.2, ease: "easeInOut" } },
        visible: { opacity: 1, height: 'auto', transition: { duration: 0.2, ease: "easeInOut" } },
    };

    return (
        <div className={styles.selectorContainer} ref={dropdownRef}>
            {/* 显示按钮 */}
            <button
                type="button"
                className={`${styles.displayButton} ${isOpen ? styles.open : ''}`}
                onClick={toggle}
                disabled={disabled}
                aria-haspopup="listbox"
                aria-expanded={isOpen}
            >
                {displayContent}
                <motion.i className={`fas fa-chevron-down ${styles.chevron}`} animate={{ rotate: isOpen ? 180 : 0 }} />
            </button>

            {/* 下拉菜单 */}
            <AnimatePresence>
                {isOpen && (
                    <motion.ul
                        className={styles.dropdownMenu}
                        role="listbox"
                        variants={menuVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                    >
                        {documents.map(doc => (
                            <li
                                key={doc.id}
                                className={`${styles.dropdownItem} ${selectedId === doc.id ? styles.selected : ''}`}
                                onClick={() => { onSelect(doc.id); close(); }}
                                role="option"
                                aria-selected={selectedId === doc.id}
                                title={doc.name}
                            >
                                <span className={styles.text}>{doc.name}</span>
                                <i className={`fas fa-check ${styles.checkIcon}`}></i>
                            </li>
                        ))}
                    </motion.ul>
                )}
            </AnimatePresence>
        </div>
    );
};

export default DocumentSelector;