"use client";
import React, {useState} from 'react';
import {motion} from 'framer-motion';
import {ChunkVO} from '@/services/chunkService';
import {getFileIcon} from '@/lib/data/documentData';
import {useToast} from '@/hooks/useToast';
import ConfirmationModal from '@/components/common/ConfirmationModal/ConfirmationModal';
import styles from './ChunkCard.module.css';

interface ChunkCardProps {
    chunk: ChunkVO;
    onDelete: (chunkId: number) => Promise<boolean>;
}

const ChunkCard: React.FC<ChunkCardProps> = ({chunk, onDelete}) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const showToast = useToast();

    const extension = chunk.sourceDocumentName?.split('.').pop()?.toLowerCase() || 'txt';
    const {icon, color} = getFileIcon(extension as any);

    const handleCopy = () => {
        navigator.clipboard.writeText(chunk.content);
        showToast({message: '切片内容已复制', type: 'success'});
    };

    const handleDelete = async () => {
        setIsDeleting(true);
        const success = await onDelete(chunk.id);
        setIsDeleting(false);
        if (success) {
            setIsDeleteModalOpen(false); // 成功后关闭弹窗
        }
    };

    return (
        <>
            <motion.div layout className={styles.card}>
                <div className={styles.cardHeader}>
                    <div className={styles.headerLeft}>
                        <span className={styles.indexTag}># {chunk.orderInDocument ?? chunk.id}</span>
                        <div className={styles.sourceInfo} title={chunk.sourceDocumentName}>
                            <i className={`fas ${icon}`} style={{color}}></i>
                            <span>{chunk.sourceDocumentName}</span>
                        </div>
                    </div>
                    <div className={styles.cardActions}>
                        <button onClick={handleCopy} title="复制内容"><i className="far fa-copy"></i></button>
                        <button title="编辑切片"><i className="fas fa-pen"></i></button>
                        <button className={styles.deleteButton} title="删除切片"
                                onClick={() => setIsDeleteModalOpen(true)}><i className="fas fa-trash-alt"></i></button>
                    </div>
                </div>

                <div className={`${styles.content} ${isExpanded ? styles.expanded : ''}`}>
                    <p>{chunk.content}</p>
                </div>

                <div className={styles.cardFooter}>
                    <div className={styles.metaInfo}>
                        <span><i className="fas fa-text-width"></i> 字符数: {chunk.charCount}</span>
                        <span><i className="far fa-clock"></i> 更新于: {new Date(chunk.createdAt).toLocaleDateString()}</span>
                    </div>
                    <button className={styles.expandButton} onClick={() => setIsExpanded(!isExpanded)}>
                        {isExpanded ? '收起' : '展开'}
                        <motion.i className="fas fa-chevron-down" animate={{rotate: isExpanded ? 180 : 0}}/>
                    </button>
                </div>
            </motion.div>

            <ConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleDelete}
                isConfirming={isDeleting}
                title="确认删除切片"
                message={<>您确定要删除此切片吗？此操作不可撤销。</>}
                confirmText={isDeleting ? "删除中..." : "确认删除"}
                type="danger"
            />
        </>
    );
};

export default ChunkCard;