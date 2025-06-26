// src/components/teacher/course-management/ai-generate/ResultsPanel/QuestionList.tsx
"use client";
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GeneratedQuestionCard from '../GeneratedQuestionCard';
import { AIGeneratedQuestion } from '@/lib/data/aiGeneratedQuestionsData';
import styles from './QuestionList.module.css';

interface StatTheme {
    colors: {
        bgEnd: string;
        iconBg: string;
    }
}
interface Props {
    questions: AIGeneratedQuestion[];
    themes: Record<string, StatTheme>;
}

// 独立的空状态组件，便于维护
const EmptyState = () => (
    <div className={styles.emptyState}>
        <div className={styles.emptyStateIcon}>
            <i className="fas fa-magic"></i>
        </div>
        <h3 className={styles.emptyStateTitle}>AI 已就绪，待您指令</h3>
        <p className={styles.emptyStateMessage}>
            请在左侧配置出题参数，然后点击“开始出题”按钮，AI 将为您生成题目。
        </p>
    </div>
);


const QuestionList: React.FC<Props> = ({ questions, themes }) => {
    // --- 核心修改：判断题目列表是否为空 ---
    if (questions.length === 0) {
        return <EmptyState />;
    }

    return (
        <div className={styles.questionList}>
            <AnimatePresence>
                {questions.map(q => (
                    <motion.div
                        key={q.id}
                        layout // 启用布局动画，当题目被删除时，其他题目会平滑移动
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                        transition={{ type: 'spring', stiffness: 260, damping: 25 }}
                    >
                        <GeneratedQuestionCard
                            question={q}
                            theme={themes[q.type as keyof typeof themes]}
                        />
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
};

export default QuestionList;