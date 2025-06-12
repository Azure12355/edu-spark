"use client";
import React from 'react';
import Link from 'next/link'; // 引入 Link
import styles from './KnowledgeCard.module.css';
import { KnowledgeBase, KnowledgeStatus } from '@/lib/data/knowledgeData';

interface KnowledgeCardProps {
    kb: KnowledgeBase;
}

const statusMap: { [key in KnowledgeStatus]: { text: string, icon: string, style: string } } = {
    pending: { text: '待构建', icon: 'fa-minus-circle', style: styles.statusPending },
    ready: { text: '就绪', icon: 'fa-check-circle', style: styles.statusReady },
    building: { text: '构建中', icon: 'fa-sync-alt fa-spin', style: styles.statusBuilding },
    error: { text: '失败', icon: 'fa-exclamation-circle', style: styles.statusError },
};

const KnowledgeCard: React.FC<KnowledgeCardProps> = ({ kb }) => {
    const statusInfo = statusMap[kb.status];

    return (
        <div className={styles.card}>
            <div className={styles.cardHeader}>
                <div className={styles.headerLeft}>
                    <div className={styles.icon}><i className={`fas ${kb.icon}`}></i></div>
                    <div>
                        <h3 className={styles.name}>{kb.name}</h3>
                        <p className={styles.meta}>{kb.creator} 于 {kb.createdAt} 创建</p>
                    </div>
                </div>

                <div className={styles.cardActions}>
                    {/* --- 核心修改：为“管理”按钮添加链接 --- */}
                    <Link href={`/student/knowledge/${kb.id}`} passHref>
                        <button className={styles.actionButton} title="管理" onClick={(e) => e.stopPropagation()}>
                            <i className="fas fa-cog"></i>
                        </button>
                    </Link>
                    <button className={styles.actionButton} title="测试"><i className="fas fa-vial"></i></button>
                    <button className={`${styles.actionButton} ${styles.deleteButton}`} title="删除"><i className="fas fa-trash-alt"></i></button>
                </div>
            </div>

            <div className={styles.body}>
                <div className={`${styles.statusTag} ${statusInfo.style}`}>
                    <i className={`fas ${statusInfo.icon}`}></i>
                    <span>{statusInfo.text}</span>
                </div>
            </div>

            <div className={styles.stats}>
                <div className={styles.statItem}>
                    <div className={styles.statValue}>{kb.type}</div>
                    <div className={styles.statLabel}>知识库类型</div>
                </div>
                <div className={styles.statItem}>
                    <div className={styles.statValue}>{kb.fileCount}</div>
                    <div className={styles.statLabel}>文档数量</div>
                </div>
                <div className={styles.statItem}>
                    <div className={styles.statValue}>{kb.chunkCount.toLocaleString()}</div>
                    <div className={styles.statLabel}>切片数量</div>
                </div>
            </div>
        </div>
    );
};

export default KnowledgeCard;