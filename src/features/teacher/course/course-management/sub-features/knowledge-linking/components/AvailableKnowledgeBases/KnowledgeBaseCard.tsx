// [!file src/features/teacher/course/course-management/sub-features/knowledge-linking/components/AvailableKnowledgeBases/KnowledgeBaseCard.tsx]
"use client";

import React from 'react';
import styles from './KnowledgeBaseCard.module.css';
import { KnowledgeBaseVO } from '@/shared/types';
import Tooltip from '@/shared/components/ui/Tooltip/Tooltip';
import Image from "next/image";

interface KnowledgeBaseCardProps {
    kb: KnowledgeBaseVO;
    onLink: (kbId: number) => void;
}

const KnowledgeBaseCard: React.FC<KnowledgeBaseCardProps> = ({ kb, onLink }) => {
    return (
        <div className={styles.cardContainer}>
            <div className={styles.cardHeader}>
                <div className={styles.ownerInfo}>
                    <Image
                        src={kb.owner.avatarUrl || '/default-avatar.jpg'}
                        alt={kb.owner.nickname}
                        width={24}
                        height={24}
                        className={styles.ownerAvatar}
                    />
                    <span className={styles.ownerName}>{kb.owner.nickname}</span>
                </div>
                <div className={styles.stats}>
                    <Tooltip content="文档数量" position="top">
                        <span className={styles.statItem}><i className="far fa-file-alt"></i> {kb.metadataStats?.doc_count || 0}</span>
                    </Tooltip>
                    <Tooltip content="被引用次数" position="top">
                        <span className={styles.statItem}><i className="fas fa-link"></i> {kb.forkCount || 0}</span>
                    </Tooltip>
                </div>
            </div>
            <div className={styles.cardBody}>
                <h3 className={styles.kbName}>{kb.name}</h3>
                <p className={styles.kbDescription}>{kb.description || '暂无描述'}</p>
            </div>
            <div className={styles.cardFooter}>
                <span className={styles.updateTime}>更新于 {new Date(kb.updatedAt).toLocaleDateString()}</span>
                <button onClick={() => onLink(kb.id)} className={styles.linkButton}>
                    <i className="fas fa-plus"></i> 关联
                </button>
            </div>
        </div>
    );
};

export default KnowledgeBaseCard;