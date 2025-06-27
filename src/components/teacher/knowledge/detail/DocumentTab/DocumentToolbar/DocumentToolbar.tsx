"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useKnowledgeStore } from '@/store/knowledgeStore';
import { useDocumentTableStore } from '@/store/documentTableStore'; // CORE FIX: Import new store
import ConfirmationModal from '@/components/common/ConfirmationModal/ConfirmationModal';
import { useToast } from '@/hooks/useToast';
import styles from './DocumentToolbar.module.css';

const DocumentToolbar: React.FC<{ kbId: string }> = ({ kbId }) => {
    // CORE FIX: Get selection state from documentTableStore
    const selectedDocIds = useDocumentTableStore(state => state.selectedDocIds);
    // Get deletion action from knowledgeStore
    const deleteSelectedDocuments = useKnowledgeStore(state => state.deleteSelectedDocuments);

    const showToast = useToast();
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const selectionCount = selectedDocIds.size;

    const handleDeleteConfirm = () => {
        deleteSelectedDocuments(kbId);
        showToast({ message: `成功删除 ${selectionCount} 个文档`, type: 'success' });
    };

    const toolbarVariants = { /* ... (no change) ... */ };

    return (
        <>
            <div className={styles.toolbar}>
                <AnimatePresence mode="wait">
                    {selectionCount > 0 ? (
                        <motion.div
                            key="batch-actions"
                            className={styles.actionsContainer}
                            variants={toolbarVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                        >
                            <span className={styles.selectionInfo}>已选择 {selectionCount} 项</span>
                            <div className={styles.buttonGroup}>
                                <button className={styles.actionButton}>
                                    <i className="fas fa-redo"></i> 重新处理
                                </button>
                                <button
                                    className={`${styles.actionButton} ${styles.deleteButton}`}
                                    onClick={() => setIsDeleteModalOpen(true)}
                                >
                                    <i className="fas fa-trash-alt"></i> 删除
                                </button>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="default-filters"
                            className={styles.actionsContainer}
                            variants={toolbarVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                        >
                            <div className={styles.filterDropdown}>
                                <span>所有状态</span>
                                <i className="fas fa-chevron-down"></i>
                            </div>
                            <div className={styles.searchContainer}>
                                <i className="fas fa-search"></i>
                                <input type="text" placeholder="搜索文档名称" />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <ConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleDeleteConfirm}
                title="确认批量删除"
                message={<>您确定要永久删除选中的 <strong>{selectionCount}</strong> 个文档吗？<br/>此操作不可撤销。</>}
                confirmText="确认删除"
                type="danger"
            />
        </>
    );
};
export default DocumentToolbar;