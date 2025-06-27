"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Chunk } from '@/types/knowledge';
import { getFileIcon } from '@/lib/data/documentData';
import { useToast } from '@/hooks/useToast';
import styles from './ChunkCard.module.css';

const ChunkCard: React.FC<{ chunk: Chunk }> = ({ chunk }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const showToast = useToast();

    // 1. 获取文件类型对应的图标和颜色
    // --- CORE FIX: Changed chunk.sourceDocument to chunk.source_document_name ---
    const extension = chunk.source_document_name.split('.').pop()?.toLowerCase() || 'txt';
    const { icon, color } = getFileIcon(extension as any);

    const handleCopy = () => {
        navigator.clipboard.writeText(chunk.content);
        showToast({ message: '切片内容已复制', type: 'success' });
    };

    return (
        <motion.div
            className={styles.card}
            layout // 启用布局动画，使高度变化平滑
            transition={{ type: 'spring', stiffness: 400, damping: 40 }}
            whileHover={{ y: -5, boxShadow: '0 10px 20px -5px rgba(0,0,0,0.1)' }}
        >
            <div className={styles.cardHeader}>
                <div className={styles.headerLeft}>
                    {/* --- CORE FIX: The property name in mock data is order_in_document --- */}
                    <span className={styles.indexTag}># {chunk.order_in_document}</span>
                    <div className={styles.sourceInfo} title={chunk.source_document_name}>
                        <i className={`fas ${icon}`} style={{ color }}></i>
                        {/* --- CORE FIX: Changed chunk.sourceDocument to chunk.source_document_name --- */}
                        <span>{chunk.source_document_name}</span>
                    </div>
                </div>
                {/* 2. 悬浮时出现的操作按钮 */}
                <div className={styles.cardActions}>
                    <button onClick={handleCopy} title="复制内容"><i className="far fa-copy"></i></button>
                    <button title="编辑切片"><i className="fas fa-pen"></i></button>
                    <button className={styles.deleteButton} title="删除切片"><i className="fas fa-trash-alt"></i></button>
                </div>
            </div>

            <div className={`${styles.content} ${isExpanded ? styles.expanded : ''}`}>
                <p>{chunk.content}</p>
            </div>

            <div className={styles.cardFooter}>
                <div className={styles.metaInfo}>
                    <span><i className="fas fa-text-width"></i> 字符数: {chunk.char_count}</span>
                    {/* --- CORE FIX: The property name in mock data is created_at --- */}
                    <span><i className="far fa-clock"></i> 更新于: {new Date(chunk.created_at).toLocaleDateString()}</span>
                </div>
                <button className={styles.expandButton} onClick={() => setIsExpanded(!isExpanded)}>
                    {isExpanded ? '收起' : '展开'}
                    <motion.i
                        className="fas fa-chevron-down"
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                    />
                </button>
            </div>
        </motion.div>
    );
};

export default ChunkCard;