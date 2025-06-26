// src/components/teacher/course-management/ai-generate/ResultsPanel.tsx
"use client";
import React from 'react';
import StatCard from './StatCard';
import GeneratedQuestionCard from './GeneratedQuestionCard';
import { AIGeneratedQuestion } from '@/lib/data/aiGeneratedQuestionsData';
import styles from './ResultsPanel.module.css';

interface Props { questions: AIGeneratedQuestion[]; }

const statThemes = {
    '单选题': { icon: 'fas fa-check-circle', colors: { bgStart: '#43cea2', bgEnd: '#185a9d', iconBg: 'rgba(255,255,255,0.2)', text: '#ffffff' } },
    '多选题': { icon: 'fas fa-check-double', colors: { bgStart: '#ff7e5f', bgEnd: '#feb47b', iconBg: 'rgba(255,255,255,0.2)', text: '#ffffff' } },
    '判断题': { icon: 'fas fa-balance-scale', colors: { bgStart: '#6a11cb', bgEnd: '#2575fc', iconBg: 'rgba(255,255,255,0.2)', text: '#ffffff' } },
    '填空题': { icon: 'fas fa-pencil-alt', colors: { bgStart: '#11998e', bgEnd: '#38ef7d', iconBg: 'rgba(255,255,255,0.2)', text: '#ffffff' } },
    '简答题': { icon: 'fas fa-align-left', colors: { bgStart: '#DA4453', bgEnd: '#89216B', iconBg: 'rgba(255,255,255,0.2)', text: '#ffffff' } },
    '编程题': { icon: 'fas fa-code', colors: { bgStart: '#232526', bgEnd: '#414345', iconBg: 'rgba(255,255,255,0.1)', text: '#ffffff' } },
    '总计': { icon: 'fas fa-sigma', colors: { bgStart: '#f2f2f2', bgEnd: '#e0e0e0', iconBg: 'rgba(0,0,0,0.1)', text: '#333333' } },
};

const ResultsPanel: React.FC<Props> = ({ questions }) => {
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
                {Object.entries(stats).map(([label, value]) => (
                    <StatCard
                        key={label}
                        label={label}
                        value={value}
                        icon={statThemes[label as keyof typeof statThemes].icon}
                        colors={statThemes[label as keyof typeof statThemes].colors}
                    />
                ))}
                <StatCard label="总计" value={total} icon={statThemes['总计'].icon} colors={statThemes['总计'].colors} />
            </div>
            <div className={styles.questionList}>
                {/* --- 核心修改：为每个卡片传递对应的主题色 --- */}
                {questions.map(q => (
                    <GeneratedQuestionCard
                        key={q.id}
                        question={q}
                        theme={statThemes[q.type as keyof typeof statThemes]}
                    />
                ))}
            </div>
        </div>
    );
};
export default ResultsPanel;