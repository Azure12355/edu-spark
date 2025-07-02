"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DocumentVO } from '@/features/teacher/knowledge/knowledge-detail/services/documentService';
import { AddChunkRequest } from '@/features/teacher/knowledge/knowledge-detail/sub-features/chunk-management/service/chunkService';

// 导入子组件
import DocumentSelector from './DocumentSelector';

import styles from '../styles/AddChunkModal.module.css';

// --- Props 定义 ---
interface AddChunkModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAddChunk: (chunkData: AddChunkRequest) => Promise<boolean>;
    documents: DocumentVO[];
}

// --- 动画变体 ---
const backdropVariants = { /* ... */ };
const modalVariants = { /* ... */ };


const AddChunkModal: React.FC<AddChunkModalProps> = ({ isOpen, onClose, onAddChunk, documents }) => {
    // --- 状态管理 ---
    const [selectedDocId, setSelectedDocId] = useState<number | null>(null);
    const [content, setContent] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const MAX_CHARS = 2000;

    // --- 派生状态 ---
    const isFormValid = selectedDocId && content.trim() !== '' && content.length <= MAX_CHARS;

    // --- 副作用 ---
    // 在弹窗关闭时重置内部状态
    useEffect(() => {
        if (!isOpen) {
            // 使用 setTimeout 延迟重置，让退出动画更平滑
            const timer = setTimeout(() => {
                setSelectedDocId(null);
                setContent('');
                setIsSubmitting(false);
            }, 300); // 匹配动画时长
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    // --- 回调函数 ---
    const handleSubmit = useCallback(async (event: React.FormEvent) => {
        event.preventDefault(); // 防止表单默认提交行为
        if (!isFormValid || isSubmitting) return;

        setIsSubmitting(true);
        const success = await onAddChunk({ documentId: selectedDocId!, content });
        setIsSubmitting(false);

        if (success) {
            onClose(); // 仅在成功后关闭弹窗
        }
    }, [isFormValid, isSubmitting, onAddChunk, selectedDocId, content, onClose]);

    // --- 渲染 ---
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className={styles.backdrop}
                    variants={backdropVariants} initial="hidden" animate="visible" exit="hidden"
                    onClick={onClose}
                >
                    <motion.div
                        className={styles.modal}
                        variants={modalVariants} initial="hidden" animate="visible" exit="hidden"
                        onClick={(e) => e.stopPropagation()}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="add-chunk-title"
                    >
                        <header className={styles.modalHeader}>
                            <h2 id="add-chunk-title">手动添加切片</h2>
                            <button onClick={onClose} className={styles.closeButton} aria-label="关闭"><i className="fas fa-times"></i></button>
                        </header>

                        <form onSubmit={handleSubmit}>
                            <main className={styles.modalBody}>
                                <div className={styles.formGroup}>
                                    <label className={styles.label}>
                                        <span className={styles.required}>*</span> 所属文档
                                    </label>
                                    <DocumentSelector
                                        documents={documents}
                                        selectedId={selectedDocId}
                                        onSelect={setSelectedDocId}
                                        disabled={isSubmitting}
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label htmlFor="chunk-content-textarea" className={styles.label}>
                                        <span className={styles.required}>*</span> 切片内容
                                    </label>
                                    <div className={styles.textareaWrapper}>
                                        <textarea
                                            id="chunk-content-textarea"
                                            className={styles.textarea}
                                            value={content}
                                            onChange={(e) => setContent(e.target.value)}
                                            placeholder="请输入切片内容..."
                                            maxLength={MAX_CHARS + 10} // 稍微放宽一点，让用户看到超出提示
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