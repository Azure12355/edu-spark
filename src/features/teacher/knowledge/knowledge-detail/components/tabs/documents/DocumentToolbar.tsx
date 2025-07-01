"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ConfirmationModal from '@/shared/components/ui/ConfirmationModal/ConfirmationModal';
import styles from './DocumentToolbar.module.css';

interface DocumentToolbarProps {
    selectionCount: number;
    onDelete: () => Promise<boolean>; // 回调现在是异步的
}

const DocumentToolbar: React.FC<DocumentToolbarProps> = ({ selectionCount, onDelete }) => {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false); // 新增删除中的状态

    const handleConfirmDelete = async () => {
        setIsDeleting(true);
        await onDelete(); // 等待异步删除操作完成
        setIsDeleting(false);
        setIsDeleteModalOpen(false); // 关闭弹窗
    };

    const toolbarVariants = {
        initial: { opacity: 0, y: -10 },
        animate: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 25 } },
        exit: { opacity: 0, y: -10 },
    };

    return (
        <>
            <div className={styles.toolbar}>
                <AnimatePresence mode="wait">
                    {selectionCount > 0 ? (
                        <motion.div key="batch-actions" className={styles.actionsContainer} {...toolbarVariants}>
                            <span className={styles.selectionInfo}>已选择 {selectionCount} 项</span>
                            <div className={styles.buttonGroup}>
                                <button className={styles.actionButton}>
                                    <i className="fas fa-redo"></i> 重新处理
                                </button>
                                <button className={`${styles.actionButton} ${styles.deleteButton}`} onClick={() => setIsDeleteModalOpen(true)}>
                                    <i className="fas fa-trash-alt"></i> 删除
                                </button>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div key="default-filters" className={styles.actionsContainer} {...toolbarVariants}>
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
                onConfirm={handleConfirmDelete}
                isConfirming={isDeleting} // 传递加载状态
                title="确认批量删除"
                message={<>您确定要永久删除选中的 <strong>{selectionCount}</strong> 个文档吗？<br/>此操作不可撤销。</>}
                confirmText={isDeleting ? "删除中..." : "确认删除"}
                type="danger"
            />
        </>
    );
};

export default DocumentToolbar;