// src/features/teacher/course/course-management/sub-features/ai-question-generator/components/ConfigPanel/SupplementaryContent.tsx
"use client";
import React from 'react';
import styles from './SupplementaryContent.module.css';

interface SupplementaryContentProps {
    content: string;
    onContentChange: (content: string) => void;
}

const SupplementaryContent: React.FC<SupplementaryContentProps> = ({ content, onContentChange }) => (
    <div className={styles.card}>
        <h3 className={styles.cardTitle}>补充内容 (选填)</h3>
        <textarea
            className={styles.textarea}
            value={content}
            onChange={e => onContentChange(e.target.value)}
            placeholder="输入补充内容，帮助AI更好地理解出题需求，例如“请围绕实际应用场景出题”或“请模仿xx风格出题”"
        />
    </div>
);

export default SupplementaryContent;