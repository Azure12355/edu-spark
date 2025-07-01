"use client";
import React from 'react';
import { motion } from 'framer-motion';
import styles from './ChunkGrid.module.css'; // 复用样式

interface EmptyStateProps {
    hasFilters: boolean; // 是否有筛选或搜索条件
}

const EmptyState: React.FC<EmptyStateProps> = ({ hasFilters }) => {
    return (
        <motion.div
            className={styles.emptyContainer}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
        >
            <div className={styles.emptyState}>
                <div className={styles.emptyIcon}>
                    <i className={hasFilters ? "fas fa-search-minus" : "fas fa-box-open"}></i>
                </div>
                <h3>{hasFilters ? "未找到匹配的切片" : "暂无切片数据"}</h3>
                <p>
                    {hasFilters
                        ? "请尝试调整筛选条件或搜索关键词。"
                        : "您可以通过“新增切片”或在“原始文档”中上传新文档来创建切片。"}
                </p>
            </div>
        </motion.div>
    );
};

export default EmptyState;