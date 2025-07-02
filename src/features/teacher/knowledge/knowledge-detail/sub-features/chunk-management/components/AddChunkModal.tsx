// src/features/teacher/knowledge/knowledge-detail/sub-features/chunk-management/components/AddChunkModal.tsx
"use client";

import React, { FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from '../styles/AddChunkModal.module.css';
import {
    DocumentVO
} from "@/features/teacher/knowledge/knowledge-detail/sub-features/document-management/services/documentService";
import DocumentSelector
    from "@/features/teacher/knowledge/knowledge-detail/sub-features/chunk-management/components/DocumentSelector";

// 1. 定义清晰的 Props 接口
interface AddChunkModalProps {
    isOpen: boolean;
    documents: DocumentVO[]; // 文档列表，用于下拉选择

    // 表单状态
    selectedDocId: number | null;
    content: string;
    isSubmitting: boolean;

    // 事件回调
    onClose: () => void;
    onSelectedDocIdChange: (id: number | null) => void;
    onContentChange: (content: string) => void;
    onSubmit: () => void; // 提交事件现在不带参数，因为状态由外部管理
}

// 2. 动画变体 (保持不变)
const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
};
const modalVariants = {
    hidden: { opacity: 0, y: -50, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 300, damping: 25 } },
    exit: { opacity: 0, y: 30, scale: 0.95 },
};

const MAX_CHARS = 2000;

const AddChunkModal: React.FC<AddChunkModalProps> = ({
                                                         isOpen,
                                                         documents,
                                                         selectedDocId,
                                                         content,
                                                         isSubmitting,
                                                         onClose,
                                                         onSelectedDocIdChange,
                                                         onContentChange,
                                                         onSubmit,
                                                     }) => {

    // 3. 将表单校验逻辑变成一个简单的派生状态
    const isFormValid = selectedDocId !== null && content.trim() !== '' && content.length <= MAX_CHARS;

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault(); // 阻止表单的默认提交行为
        if (isFormValid && !isSubmitting) {
            onSubmit(); // 调用从 Hook 传入的提交函数
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className={styles.backdrop}
                    variants={backdropVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    onClick={onClose}
                >
                    <motion.div
                        className={styles.modal}
                        variants={modalVariants}
                        onClick={(e) => e.stopPropagation()}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="add-chunk-title"
                    >
                        <header className={styles.modalHeader}>
                            <h2 id="add-chunk-title">手动添加切片</h2>
                            <button onClick={onClose} className={styles.closeButton} aria-label="关闭" disabled={isSubmitting}>
                                <i className="fas fa-times"></i>
                            </button>
                        </header>

                        <form onSubmit={handleSubmit}>
                            <main className={styles.modalBody}>
                                {/* 文档选择器 */}
                                <div className={styles.formGroup}>
                                    <label className={styles.label}>
                                        <span className={styles.required}>*</span> 所属文档
                                    </label>
                                    <DocumentSelector
                                        documents={documents}
                                        selectedId={selectedDocId}
                                        onSelect={onSelectedDocIdChange} // 绑定回调
                                        disabled={isSubmitting}
                                    />
                                </div>

                                {/* 内容输入框 */}
                                <div className={styles.formGroup}>
                                    <label htmlFor="chunk-content-textarea" className={styles.label}>
                                        <span className={styles.required}>*</span> 切片内容
                                    </label>
                                    <div className={styles.textareaWrapper}>
                                        <textarea
                                            id="chunk-content-textarea"
                                            className={styles.textarea}
                                            value={content}
                                            onChange={(e) => onContentChange(e.target.value)} // 绑定回调
                                            placeholder="请输入切片内容..."
                                            maxLength={MAX_CHARS + 10}
                                            rows={8}
                                            disabled={isSubmitting}
                                            required
                                        />
                                        <span className={`${styles.charCount} ${content.length > MAX_CHARS ? styles.error : ''}`}>
                                            {content.length}/{MAX_CHARS}
                                        </span>
                                    </div>
                                </div>
                            </main>

                            {/* 底部按钮 */}
                            <footer className={styles.modalFooter}>
                                <button type="button" className={`${styles.footerButton} ${styles.cancelButton}`} onClick={onClose} disabled={isSubmitting}>
                                    取消
                                </button>
                                <button type="submit" className={`${styles.footerButton} ${styles.addButton}`} disabled={!isFormValid || isSubmitting}>
                                    {isSubmitting ? (
                                        <><i className="fas fa-spinner fa-spin"></i> 添加中...</>
                                    ) : (
                                        '确认添加'
                                    )}
                                </button>
                            </footer>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default AddChunkModal;