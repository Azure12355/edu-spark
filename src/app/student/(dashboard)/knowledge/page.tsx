"use client";
import React, { useState } from 'react'; // 引入 useState
import styles from './knowledge.module.css';
import KnowledgeBaseHeader from '@/components/student/component/knowledge/KnowledgeBaseHeader/KnowledgeBaseHeader';
import KnowledgeSteps from '@/components/student/component/knowledge/KnowledgeSteps/KnowledgeSteps';
import KnowledgeToolbar from '@/components/student/component/knowledge/KnowledgeToolbar/KnowledgeToolbar';
import KnowledgeGrid from '@/components/student/component/knowledge/KnowledgeGrid/KnowledgeGrid';
import { knowledgeData } from '@/lib/data/knowledgeData';

export default function KnowledgePage() {
    // 添加状态来控制教程步骤的可见性
    const [isStepsVisible, setIsStepsVisible] = useState(true);

    const toggleStepsVisibility = () => {
        setIsStepsVisible(prev => !prev);
    };

    return (
        <div className={styles.knowledgeContainer}>
            <KnowledgeBaseHeader />
            <KnowledgeSteps
                isVisible={isStepsVisible}
                onToggle={toggleStepsVisibility}
            />
            <KnowledgeToolbar count={knowledgeData.length} />
            <KnowledgeGrid />
        </div>
    );
}