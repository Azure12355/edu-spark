"use client";
import React from 'react';
import styles from './knowledge.module.css';
import KnowledgeBaseHeader from '@/components/student/component/knowledge/KnowledgeBaseHeader/KnowledgeBaseHeader';
import KnowledgeSteps from '@/components/student/component/knowledge/KnowledgeSteps/KnowledgeSteps';
import KnowledgeToolbar from '@/components/student/component/knowledge/KnowledgeToolbar/KnowledgeToolbar';
import KnowledgeGrid from '@/components/student/component/knowledge/KnowledgeGrid/KnowledgeGrid';
import { knowledgeData } from '@/lib/data/knowledgeData';

export default function KnowledgePage() {
    return (
        <div className={styles.knowledgeContainer}>
            <KnowledgeBaseHeader />
            <KnowledgeSteps />
            <KnowledgeToolbar count={knowledgeData.length} />
            <KnowledgeGrid />
        </div>
    );
}