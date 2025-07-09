// src/features/teacher/knowledge/knowledge-detail/sub-features/chunk-management/components/toolbar-parts/SourceFilterDropdown.tsx
"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDropdown } from '@/shared/hooks/useDropdown';
import styles from '../../styles/SourceFilterDropdown.module.css'; // 复用样式
import { DocumentVO } from '../../../document-management/services/documentService';

// 1. 定义清晰的 Props 接口
interface SourceFilterDropdownProps {
    documents: DocumentVO[];
    activeFilterId: number | 'ALL';
    onFilterChange: (id: number | 'ALL') => void;
    disabled?: boolean;
}

// 2. 组件实现
const SourceFilterDropdown: React.FC<SourceFilterDropdownProps> = ({
                                                                       documents,
                                                                       activeFilterId,
                                                                       onFilterChange,
                                                                       disabled = false
                                                                   }) => {
    // 3. 使用自定义 Hook 管理下拉菜单状态
    const { isOpen, toggle, close, dropdownRef } = useDropdown<HTMLDivElement>();

    // 4. 计算当前选中的显示文本
    const selectedDoc = documents.find(d => d.id === activeFilterId);
    const displayLabel = selectedDoc ? selectedDoc.name : '所有文档';

    // 5. 动画变体
    const menuVariants = {
        hidden: { opacity: 0, scale: 0.95, y: -10 },
        visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.15, ease: 'easeOut' } },
        exit: { opacity: 0, scale: 0.95, y: -10, transition: { duration: 0.1 } },
    };

    return (
        <div className={styles.dropdownContainer} ref={dropdownRef}>
            {/* 6. 渲染按钮 */}
            <button
                className={`${styles.filterButton} ${isOpen ? styles.open : ''}`}
                onClick={toggle}
                disabled={disabled}
                aria-haspopup="listbox"
                aria-expanded={isOpen}
            >
                <span className={styles.filterText} title={displayLabel}>{displayLabel}</span>
                <motion.i className={`fas fa-chevron-down ${styles.chevron}`} animate={{ rotate: isOpen ? 180 : 0 }} />
            </button>

            {/* 7. 渲染下拉菜单列表 */}
            <AnimatePresence>
                {isOpen && (
                    <motion.ul
                        className={styles.dropdownMenu}
                        role="listbox"
                        variants={menuVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        {/* “所有文档”选项 */}
                        <li
                            key="ALL"
                            className={`${styles.dropdownItem} ${activeFilterId === 'ALL' ? styles.active : ''}`}
                            onClick={() => { onFilterChange('ALL'); close(); }}
                            role="option"
                            aria-selected={activeFilterId === 'ALL'}
                        >
                            <i className="fas fa-book"></i>
                            <span>所有文档</span>
                        </li>

                        {/* 遍历文档列表 */}
                        {documents.map(doc => {
                            return (
                                <li
                                    key={doc.id}
                                    className={`${styles.dropdownItem} ${activeFilterId === doc.id ? styles.active : ''}`}
                                    onClick={() => { onFilterChange(doc.id); close(); }}
                                    role="option"
                                    aria-selected={activeFilterId === doc.id}
                                    title={doc.name}
                                >
                                    <span>{doc.name}</span>
                                </li>
                            );
                        })}
                    </motion.ul>
                )}
            </AnimatePresence>
        </div>
    );
};

export default SourceFilterDropdown;