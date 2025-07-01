"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChunkVO } from '@/services/chunkService';
// 【移除】不再需要 MarkdownRenderer
// import MarkdownRenderer from '@/components/common/MarkdownRenderer/MarkdownRenderer';
import styles from './ChunkPreviewModal.module.css';

interface ChunkPreviewModalProps {
    isOpen: boolean;
    onClose: () => void;
    chunk: ChunkVO | null;
}

const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
};

const modalVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 250, damping: 25 } },
    exit: { opacity: 0, y: 30, scale: 0.95 },
};

const ChunkPreviewModal: React.FC<ChunkPreviewModalProps> = ({ isOpen, onClose, chunk }) => {
    if (!chunk) return null;

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
                    >
                        <header className={styles.modalHeader}>
                            <div className={styles.headerInfo}>
                                <i className="fas fa-file-alt"></i>
                                <h2>切片内容预览</h2>
                                <span className={styles.sourceDoc}>来源: {chunk.documentName}</span>
                            </div>
                            <button onClick={onClose} className={styles.closeButton} title="关闭">
                                <i className="fas fa-times"></i>
                            </button>
                        </header>
                        <div className={styles.modalBody}>
                            {/*
                                【核心修改】: 使用 <pre> 标签包裹内容
                                 对应的样式在 CSS 文件中设置
                            */}
                            <pre className={styles.textContent}>
                                {chunk.content}
                            </pre>
                        </div>
                        <footer className={styles.modalFooter}>
                            <button className={styles.footerButton} onClick={onClose}>关闭</button>
                        </footer>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ChunkPreviewModal;