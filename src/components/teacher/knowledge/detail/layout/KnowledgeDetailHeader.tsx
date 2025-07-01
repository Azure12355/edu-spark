"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { KnowledgeBaseVO } from '@/services/knowledgeService';
import styles from './KnowledgeDetailHeader.module.css';
import Tooltip from '@/components/common/Tooltip/Tooltip'; // 引入 Tooltip

interface DocumentHeaderProps {
    kb: KnowledgeBaseVO;
}

const DocumentHeader: React.FC<DocumentHeaderProps> = ({ kb }) => {

    return (
        <motion.header
            className={styles.header}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
        >
            <div className={styles.leftSection}>
                <Link href="/teacher/knowledge" className={styles.backButton} title="返回知识库列表">
                    <i className="fas fa-arrow-left"></i>
                </Link>
                <div className={styles.titleInfo}>
                    <div className={styles.titleText}>
                        <h1 className={styles.title} title={kb.name}>{kb.name}</h1>
                        <div className={styles.metaInfo}>
                            {/* 直接展示核心统计数据 */}
                            <Tooltip content="知识库中的文档总数">
                                <span className={styles.metaItem}>
                                    <i className="fas fa-file-alt" style={{color: '#3b82f6'}}></i>
                                    {kb.metadataStats?.doc_count ?? 0} 文档
                                </span>
                            </Tooltip>
                            <span className={styles.divider}></span>
                            <Tooltip content="所有文档处理后生成的切片总数">
                                <span className={styles.metaItem}>
                                    <i className="fas fa-cubes" style={{color: '#16a34a'}}></i>
                                    {(kb.metadataStats?.slice_count ?? 0).toLocaleString()} 切片
                                </span>
                            </Tooltip>
                            <span className={styles.divider}></span>
                            <Tooltip content="被其他用户收藏/引用的次数">
                                <span className={styles.metaItem}>
                                    <i className="fas fa-heart" style={{color: '#ef4444'}}></i>
                                    {kb.forkCount ?? 0} 收藏
                                </span>
                            </Tooltip>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.rightSection}>
                <button className={styles.secondaryButton}>
                    <i className="fas fa-sliders-h"></i>
                    <span>配置</span>
                </button>
                <Link href={`/teacher/knowledge/${kb.id}/import`} legacyBehavior >
                    <a className={styles.primaryButton}>
                        <i className="fas fa-plus"></i>
                        <span>导入文档</span>
                    </a>
                </Link>
            </div>
        </motion.header>
    );
};

export default DocumentHeader;