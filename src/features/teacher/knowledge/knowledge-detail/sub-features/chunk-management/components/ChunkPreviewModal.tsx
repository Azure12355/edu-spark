"use client";

import React, {useMemo} from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChunkVO } from '@/features/teacher/knowledge/knowledge-detail/sub-features/chunk-management/service/chunkService';
import styles from '../styles/ChunkPreviewModal.module.css';

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

    // [!code focus start]
    // 2. 使用 useMemo 对文本进行预处理，仅在 chunk.content 变化时执行
    const cleanedContent = useMemo(() => {
        if (!chunk?.content) return '';

        // 步骤 a: 移除首尾多余的空白字符
        let processedText = chunk.content.trim();

        // 步骤 b: 将多个连续的换行符合并为一个或两个（保留段落感）
        // 这里我们将3个及以上的换行符合并为2个，模拟段落间隔
        processedText = processedText.replace(/\n{3,}/g, '\n\n');

        return processedText;
    }, [chunk?.content]);
    // [!code focus end]

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
                            <pre className={styles.textContent}>
                                {/* 3. 在此处渲染处理后的干净文本 */}
                                {cleanedContent}
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