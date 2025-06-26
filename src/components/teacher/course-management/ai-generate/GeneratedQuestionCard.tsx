// src/components/teacher/course-management/ai-generate/GeneratedQuestionCard.tsx
import React from 'react';
import { AIGeneratedQuestion } from '@/lib/data/aiGeneratedQuestionsData';
import styles from './GeneratedQuestionCard.module.css';
const GeneratedQuestionCard: React.FC<{ question: AIGeneratedQuestion }> = ({ question }) => (
    <div className={styles.card}>
        <header className={styles.header}>
            <div className={styles.meta}>
                <span className={styles.typeTag}>{question.type}</span>
                <span className={styles.pointLabel}>知识点:</span>
                {question.pointIds.map(id => <span key={id} className={styles.pointTag}>{id}</span>)}
            </div>
            <div className={styles.actions}>
                <button title="加入题库"><i className="fas fa-plus-square"></i></button>
                <button title="编辑"><i className="fas fa-pen"></i></button>
                <button title="删除"><i className="fas fa-trash"></i></button>
            </div>
        </header>
        <div className={styles.body}>
            <p className={styles.stem}>{question.stem}</p>
            {question.options && (
                <ul className={styles.options}>
                    {question.options.map((opt, i) => <li key={i} className={styles.option}><span className={styles.letter}>{String.fromCharCode(65+i)}</span> {opt}</li>)}
                </ul>
            )}
            <div className={styles.answerSection}>
                <strong>正确答案：</strong> {question.answer} <br/>
                <strong>答案解析：</strong> {question.analysis}
            </div>
        </div>
    </div>
);
export default GeneratedQuestionCard;