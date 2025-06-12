"use client";
import React from 'react';
import styles from './KnowledgeGrid.module.css';
import KnowledgeCard from '../KnowledgeCard/KnowledgeCard';
import { knowledgeData } from '@/lib/data/knowledgeData';

const KnowledgeGrid = () => {
    return (
        <div className={styles.grid}>
            {knowledgeData.map(kb => (
                <KnowledgeCard key={kb.id} kb={kb} />
            ))}
        </div>
    );
};

export default KnowledgeGrid;