// src/features/teacher/knowledge/knowledge-detail/sub-features/retrieval/SearchResultItem/SearchResultItem.tsx
"use client";

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Tooltip from '@/shared/components/ui/Tooltip/Tooltip';
import styles from '../style/SearchResultItem.module.css';
import type { SearchResult } from './SearchAndResults';

/**
 * @interface SearchResultItemProps
 * @description 定义 SearchResultItem 组件的 Props。
 */
export interface SearchResultItemProps {
    result: SearchResult;
    onPreview: (result: SearchResult) => void; // 预览回调
}

/**
 * 格式化相似度分数的辅助函数
 * @param score - 原始分数
 * @returns 格式化后的百分比字符串
 */
const formatScore = (score: number | undefined): string => {
    if (typeof score !== 'number' || isNaN(score)) {
        return 'N/A';
    }
    // 假设分数是距离，需要转换为相似度。这里用一个简单的转换，实际应根据向量算法调整。
    // 例如：(1 - distance) * 100。为简化，我们直接格式化。
    return `${(score * 100).toFixed(2)}%`;
};

/**
 * 搜索结果项组件 (重构后)
 * @description 展示单条搜索结果，包含更丰富的元数据和更优雅的交互。
 */
const SearchResultItem: React.FC<SearchResultItemProps> = ({ result, onPreview }) => {
    const [isExpanded, setIsExpanded] = useState(false);


    const scorePercentage = useMemo(() => formatScore(result.distance), [result.distance]);

    return (
        <motion.div
            layout
            className={styles.card}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        >
            {/* 卡片头部 */}
            <div className={styles.header}>
                <div className={styles.sourceInfo}>
                    <span className={styles.sourceName} title={result.documentName}>
                        {result.documentName}
                    </span>
                </div>
                <div className={styles.scoreInfo}>
                    <Tooltip content="与查询问题的相关度分数">
                        <i className={`fas fa-brain ${styles.scoreIcon}`}></i>
                    </Tooltip>
                    <span className={styles.scoreValue}>{scorePercentage}</span>
                </div>
            </div>

            {/* 内容区域 */}
            <div className={styles.content}>
                <p>{result.content}</p>
            </div>

            {/* 卡片脚部 */}
            <div className={styles.footer}>
                <div className={styles.metaInfo}>
                    <Tooltip content="切片ID">
                        <span className={styles.metaItem}>
                            <i className="fas fa-hashtag"></i> {result.id}
                        </span>
                    </Tooltip>
                    <Tooltip content="切片字符数">
                        <span className={styles.metaItem}>
                            <i className="fas fa-text-width"></i> {result.charCount}
                        </span>
                    </Tooltip>
                    <Tooltip content="创建时间">
                        <span className={styles.metaItem}>
                            <i className="far fa-clock"></i> {new Date(result.createdAt).toLocaleDateString()}
                        </span>
                    </Tooltip>
                </div>

                <div className={styles.actions}>
                    <button onClick={() => onPreview(result)} className={styles.actionButton}>
                        <i className="fas fa-eye"></i> 预览
                    </button>
                    <button onClick={() => setIsExpanded(!isExpanded)} className={styles.actionButton}>
                        {isExpanded ? '收起详情' : '展开详情'}
                    </button>
                </div>
            </div>

            {/* 可展开的元数据区域 */}
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        className={styles.extraInfo}
                        initial={{ height: 0, opacity: 0, marginTop: 0 }}
                        animate={{ height: 'auto', opacity: 1, marginTop: 16 }}
                        exit={{ height: 0, opacity: 0, marginTop: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                        <h4><i className="fas fa-cogs"></i> 详细元数据</h4>
                        <pre className={styles.metadataPre}>
                            {JSON.stringify(result.metadata || { info: '暂无元数据' }, null, 2)}
                        </pre>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default SearchResultItem;
