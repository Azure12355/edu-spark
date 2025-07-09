// [!file src/features/teacher/course/course-management/sub-features/knowledge-linking/components/LinkedKnowledgeBases/LinkedCard.tsx]
"use client";

import React from 'react';
import styles from './LinkedCard.module.css';
import { KnowledgeBase } from '@/shared/types';
import Tooltip from '@/shared/components/ui/Tooltip/Tooltip';

interface LinkedCardProps {
    kb: KnowledgeBase;
    onUnlink: (kbId: number) => void;
}

const LinkedCard: React.FC<LinkedCardProps> = ({ kb, onUnlink }) => {
    return (
        <div className={styles.cardContainer}>
            <div className={styles.iconWrapper}>
                <i className="fas fa-book"></i>
            </div>
            <div className={styles.infoWrapper}>
                <h4 className={styles.kbName}>{kb.name}</h4>
                <p className={styles.kbDescription}>{kb.description || '暂无描述'}</p>
            </div>
            <Tooltip content="解除关联" position="top">
                <button
                    onClick={() => onUnlink(kb.id)}
                    className={styles.unlinkButton}
                >
                    <i className="fas fa-times"></i>
                </button>
            </Tooltip>
        </div>
    );
};

export default LinkedCard;