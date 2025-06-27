"use client";

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { KnowledgeBase, KnowledgeStatus } from '@/types/knowledge';
import styles from './DocumentHeader.module.css';

interface DocumentHeaderProps {
    kb: KnowledgeBase;
}

// 1. 状态映射，与 KnowledgeCard 保持一致
const statusMap: { [key in KnowledgeStatus]: { text: string, icon: string, color: string } } = {
    READY: { text: '就绪', icon: 'fas fa-check-circle', color: 'rgb(34 197 94)' },
    BUILDING: { text: '构建中', icon: 'fas fa-sync-alt', color: 'rgb(59 130 246)' },
    ERROR: { text: '失败', icon: 'fas fa-exclamation-circle', color: 'rgb(239 68 68)' },
    DISABLED: { text: '未启用', icon: 'fas fa-minus-circle', color: 'rgb(107 114 128)' },
};

const DocumentHeader: React.FC<DocumentHeaderProps> = ({ kb }) => {
    const params = useParams();
    const statusInfo = statusMap[kb.status];

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
                            <span className={styles.statusTag} style={{ color: statusInfo.color, backgroundColor: `rgba(${statusInfo.color.match(/\d+/g)?.join(',')}, 0.1)` }}>
                                <i className={`${statusInfo.icon} ${kb.status === 'BUILDING' ? styles.spinning : ''}`}></i>
                                {statusInfo.text}
                            </span>
                            <span className={styles.divider}></span>
                            <span className={styles.metaItem}><i className="fas fa-file-alt"></i> {kb.stats.doc_count} 文档</span>
                            <span className={styles.metaItem}><i className="fas fa-cubes"></i> {kb.stats.slice_count.toLocaleString()} 切片</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.rightSection}>
                <button className={styles.secondaryButton}>
                    <i className="fas fa-sliders-h"></i>
                    <span>配置</span>
                </button>
                <Link href={`/teacher/knowledge/${kb.id}/import`} passHref>
                    <button className={styles.primaryButton}>
                        <i className="fas fa-plus"></i>
                        <span>导入文档</span>
                    </button>
                </Link>
            </div>
        </motion.header>
    );
};

export default DocumentHeader;