"use client";
import React from 'react';
import styles from './KnowledgeGrid.module.css';
import KnowledgeCard from '../KnowledgeCard/KnowledgeCard';
import { KnowledgeBase } from '@/lib/data/knowledgeData'; // 引入类型

// 新增 Props 接口
interface KnowledgeGridProps {
    kbs: KnowledgeBase[];
}

const KnowledgeGrid: React.FC<KnowledgeGridProps> = ({ kbs }) => {
    return (
        <div className={styles.grid}>
            {kbs.map(kb => (
                <KnowledgeCard key={kb.id} kb={kb} />
            ))}
        </div>
    );
};

export default KnowledgeGrid;