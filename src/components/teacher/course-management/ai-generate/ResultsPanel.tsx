// src/components/teacher/course-management/ai-generate/ResultsPanel.tsx
"use client";
import React from 'react';
import StatCard from './StatCard';
import GeneratedQuestionCard from './GeneratedQuestionCard';
import { AIGeneratedQuestion } from '@/lib/data/aiGeneratedQuestionsData';
import styles from './ResultsPanel.module.css';

interface Props { questions: AIGeneratedQuestion[]; }

const ResultsPanel: React.FC<Props> = ({ questions }) => {
    // A simple implementation to calculate stats
    const stats = {
        '单选题': questions.filter(q => q.type === '单选题').length,
        '多选题': questions.filter(q => q.type === '多选题').length,
        '判断题': questions.filter(q => q.type === '判断题').length,
        '填空题': questions.filter(q => q.type === '填空题').length,
        '简答题': questions.filter(q => q.type === '简答题').length,
        '编程题': questions.filter(q => q.type === '编程题').length,
    };
    const total = questions.length;

    return (
        <div className={styles.panel}>
            <header className={styles.header}>
                <div className={styles.titleGroup}>
                    <span className={styles.countBadge}>{total}</span>
                    <h2 className={styles.title}>已生成题目</h2>
                </div>
                <div className={styles.actions}>
                    <button className="teacher-button-secondary">清空题目</button>
                    <button className="teacher-button-primary">加入题库</button>
                </div>
            </header>
            <div className={styles.statsGrid}>
                {Object.entries(stats).map(([label, value]) => <StatCard key={label} label={label} value={value} />)}
                <StatCard label="总计" value={total} />
            </div>
            <div className={styles.questionList}>
                {questions.map(q => <GeneratedQuestionCard key={q.id} question={q} />)}
            </div>
        </div>
    );
};
export default ResultsPanel;