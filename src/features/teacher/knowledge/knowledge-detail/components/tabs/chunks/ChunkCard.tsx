"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChunkVO } from '@/features/teacher/knowledge/knowledge-detail/services/chunkService';
import { getFileIcon } from '@/shared/lib/data/documentData';
import { useToast } from '@/shared/hooks/useToast';
import ConfirmationModal from '@/shared/components/ui/ConfirmationModal/ConfirmationModal';
import Tooltip from '@/shared/components/ui/Tooltip/Tooltip';
import ChunkPreviewModal from './ChunkPreviewModal'; // 引入预览弹窗
import styles from './ChunkCard.module.css';

interface ChunkCardProps {
    chunk: ChunkVO;
    onDelete: (chunkId: number) => Promise<boolean>;
}

const ChunkCard: React.FC<ChunkCardProps> = ({ chunk, onDelete }) => {
    // --- 状态管理 ---
    const [isExpanded, setIsExpanded] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false); // 新增预览弹窗状态
    const showToast = useToast();

    // --- 数据与样式 ---
    const extension = chunk.documentName.split('.').pop()?.toLowerCase() || 'txt';
    const { icon, color } = getFileIcon(extension as any);

    // --- 事件处理 ---
    const handleCopy = (e: React.MouseEvent) => {
        e.stopPropagation(); // 防止事件冒泡触发展开/收起
        navigator.clipboard.writeText(chunk.content);
        showToast({ message: '切片内容已复制', type: 'success' });
    };

    const handleDelete = async () => {
        setIsDeleting(true);
        const success = await onDelete(chunk.id);
        setIsDeleting(false);
        if (success) {
            setIsDeleteModalOpen(false);
        }
    };

    // 动画变体
    const contentVariants = {
        collapsed: { height: '8.5em', opacity: 0.8, transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] } },
        expanded: { height: 'auto', opacity: 1, transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] } }
    };

    return (
        <>
            <motion.div
                className={styles.card}
                layout
                whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)' }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
                <div className={styles.cardHeader}>
                    <div className={styles.headerLeft}>
                        <div className={styles.sourceInfo} title={chunk.documentName}>
                            <i className={`fas ${icon}`} style={{ color }}></i>
                            <span>{chunk.documentName}</span>
                        </div>
                    </div>
                    <div className={styles.cardActions}>
                        <Tooltip content="复制内容"><button onClick={handleCopy}><i className="far fa-copy"></i></button></Tooltip>
                        <Tooltip content="编辑切片"><button><i className="fas fa-pen"></i></button></Tooltip>
                        <Tooltip content="删除切片"><button className={styles.deleteButton} onClick={(e) => { e.stopPropagation(); setIsDeleteModalOpen(true); }}><i className="fas fa-trash-alt"></i></button></Tooltip>
                    </div>
                </div>

                <motion.div
                    className={styles.content}
                    variants={contentVariants}
                    animate={isExpanded ? 'expanded' : 'collapsed'}
                >
                    <p>{chunk.content}</p>
                </motion.div>

                <div className={styles.cardFooter}>
                    <div className={styles.metaInfo}>
                        <Tooltip content="切片ID"><span className={styles.metaItem}><i className="fas fa-hashtag"></i>{chunk.id}</span></Tooltip>
                        <Tooltip content="字符数"><span className={styles.metaItem}><i className="fas fa-text-width"></i>{chunk.charCount}</span></Tooltip>
                        <Tooltip content="创建时间"><span className={styles.metaItem}><i className="far fa-clock"></i>{new Date(chunk.createdAt).toLocaleDateString()}</span></Tooltip>
                    </div>
                    <div className={styles.footerActions}>
                        <button className={styles.previewButton} onClick={() => setIsPreviewModalOpen(true)}>
                            <i className="fas fa-eye"></i> 预览
                        </button>
                        <button className={styles.expandButton} onClick={() => setIsExpanded(!isExpanded)}>
                            <span>{isExpanded ? '收起' : '展开'}</span>
                            <motion.i className="fas fa-chevron-down" animate={{ rotate: isExpanded ? 180 : 0 }} />
                        </button>
                    </div>
                </div>
            </motion.div>

            <ConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleDelete}
                isConfirming={isDeleting}
                title="确认删除切片"
                message={<>您确定要删除此切片吗？<br/>此操作不可撤销。</>}
                confirmText={isDeleting ? "删除中..." : "确认删除"}
                type="danger"
            />

            <ChunkPreviewModal
                isOpen={isPreviewModalOpen}
                onClose={() => setIsPreviewModalOpen(false)}
                chunk={chunk}
            />
        </>
    );
};

export default ChunkCard;