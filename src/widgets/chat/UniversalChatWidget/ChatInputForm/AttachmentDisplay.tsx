// src/components/common/ChatInputForm/AttachmentDisplay.tsx
"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './AttachmentDisplay.module.css';

// 自定义 File 类型，为其添加唯一 ID
interface AttachmentFile extends File {
    id: string;
}

interface AttachmentDisplayProps {
    attachments: AttachmentFile[];
    onRemove: (fileId: string) => void;
}

// AttachmentCard 子组件保持不变
const AttachmentCard: React.FC<{ file: AttachmentFile; onRemove: (id: string) => void; }> = ({ file, onRemove }) => {
    const [previewUrl, setPreviewUrl] = useState<string>('');
    const isImage = file.type.startsWith('image/');

    useEffect(() => {
        let objectUrl: string;
        if (isImage) {
            objectUrl = URL.createObjectURL(file);
            setPreviewUrl(objectUrl);
        }
        return () => {
            if (objectUrl) {
                URL.revokeObjectURL(objectUrl);
            }
        };
    }, [file, isImage]);

    const getFileIcon = () => {
        const extension = file.name.split('.').pop()?.toLowerCase();
        switch (extension) {
            case 'pdf': return '/file-icons/pdf.svg';
            case 'doc': return  '/file-icons/doc.svg';
            case 'docx': return '/file-icons/docx.svg';
            case 'xlxs': return '/file-icons/xls.svg';
            case 'md': return '/file-icons/md.svg';
            case 'ppt': return '/file-icons/ppt.svg';
            default: return '/file-icons/file.svg';
        }
    };

    const estimateTokens = (sizeInBytes: number): string => {
        const tokens = Math.round(sizeInBytes / 2.5); // 调整估计比例
        if (tokens > 1000) {
            return `约 ${(tokens / 1000).toFixed(1)}k 字`;
        }
        return `约 ${tokens} 字`;
    };

    const formatFileSize = (sizeInBytes: number): string => {
        if (sizeInBytes < 1024 * 1024) {
            return `${(sizeInBytes / 1024).toFixed(1)}KB`;
        }
        return `${(sizeInBytes / 1024 / 1024).toFixed(1)}MB`;
    };

    const getFileTypeLabel = (fileType: string): string => {
        if (fileType.startsWith('image/')) return 'Image';
        if (fileType.includes('pdf')) return 'PDF';
        if (fileType.includes('word')) return 'Word';
        return 'File';
    };

    return (
        <motion.div
            className={styles.attachmentItem}
            layout
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            title={file.name}
        >
            <div className={styles.preview}>
                {isImage && previewUrl ? (
                    <Image src={previewUrl} alt={file.name} width={40} height={40} className={styles.imagePreview} />
                ) : (
                    <Image src={getFileIcon()} alt="file icon" width={32} height={40} className={styles.fileIcon} />
                )}
            </div>
            <div className={styles.fileInfo}>
                <p className={styles.fileName}>{file.name}</p>
                <p className={styles.fileMeta}>
                    <span>{getFileTypeLabel(file.type)}</span>
                    <span>·</span>
                    <span>{formatFileSize(file.size)}</span>
                    <span>·</span>
                    <span>{estimateTokens(file.size)}</span>
                </p>
            </div>
            <button className={styles.removeButton} onClick={() => onRemove(file.id)} title="移除附件">
                <i className="fas fa-times"></i>
            </button>
        </motion.div>
    );
};

// 主显示组件，包含滚动逻辑
const AttachmentDisplay: React.FC<AttachmentDisplayProps> = ({ attachments, onRemove }) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    // --- 核心逻辑：检查滚动状态 ---
    const checkScrollability = useCallback(() => {
        const element = scrollRef.current;
        if (element) {
            const { scrollLeft, scrollWidth, clientWidth } = element;
            // 当 scrollLeft > 0 时，可以向左滚动
            setCanScrollLeft(scrollLeft > 5); // 加一个小的 buffer
            // 当 scrollLeft < (scrollWidth - clientWidth) 时，可以向右滚动
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);
        }
    }, []);

    // --- 核心逻辑：在组件挂载、附件列表变化和窗口大小变化时，检查滚动状态 ---
    useEffect(() => {
        checkScrollability();
        const element = scrollRef.current;
        window.addEventListener('resize', checkScrollability);
        element?.addEventListener('scroll', checkScrollability);

        return () => {
            window.removeEventListener('resize', checkScrollability);
            element?.removeEventListener('scroll', checkScrollability);
        };
    }, [attachments, checkScrollability]);

    // --- 核心逻辑：处理点击滚动按钮 ---
    const handleScroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const scrollAmount = direction === 'left' ? -250 : 250; // 每次滚动 250px
            scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <AnimatePresence>
            {attachments.length > 0 && (
                <motion.div
                    className={styles.attachmentContainer}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                >
                    <AnimatePresence>
                        {canScrollLeft && (
                            <motion.button
                                className={`${styles.scrollButton} ${styles.left}`}
                                onClick={() => handleScroll('left')}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <i className="fas fa-chevron-left"></i>
                            </motion.button>
                        )}
                    </AnimatePresence>

                    <div className={styles.scrollableArea} ref={scrollRef}>
                        {attachments.map(file => (
                            <AttachmentCard key={file.id} file={file} onRemove={onRemove} />
                        ))}
                    </div>

                    <AnimatePresence>
                        {canScrollRight && (
                            <motion.button
                                className={`${styles.scrollButton} ${styles.right}`}
                                onClick={() => handleScroll('right')}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <i className="fas fa-chevron-right"></i>
                            </motion.button>
                        )}
                    </AnimatePresence>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default AttachmentDisplay;