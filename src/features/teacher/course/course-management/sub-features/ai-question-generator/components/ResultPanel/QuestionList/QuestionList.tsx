// [!file src/features/teacher/course/course-management/sub-features/ai-question-generator/components/ResultPanel/QuestionList/QuestionList.tsx]
"use client";
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './QuestionList.module.css';
import { QuestionTypeEnum } from '@/shared/types';
// [!code focus start]
import { useAIGeneratedQuestionsStore } from '../../../store/aiGeneratedQuestionsStore';
import GeneratedQuestionCard
    from "@/features/teacher/course/course-management/sub-features/ai-question-generator/components/QuestionCard/GeneratedQuestionCard";
// [!code focus end]

// 主题常量，可以从一个共享文件中导入，这里为方便演示暂时保留
const statThemes: Record<string, { colors: { bgEnd: string; iconBg: string; } }> = {
    [QuestionTypeEnum.SINGLE_CHOICE]: { colors: { bgEnd: '#0ea5e9', iconBg: '#e0f2fe' } },
    [QuestionTypeEnum.MULTIPLE_CHOICE]: { colors: { bgEnd: '#6366f1', iconBg: '#eef2ff' } },
    [QuestionTypeEnum.TRUE_FALSE]: { colors: { bgEnd: '#a855f7', iconBg: '#fdf4ff' } },
    [QuestionTypeEnum.FILL_IN_THE_BLANK]: { colors: { bgEnd: '#22c55e', iconBg: '#f0fdf4' } },
    [QuestionTypeEnum.SHORT_ANSWER]: { colors: { bgEnd: '#f59e0b', iconBg: '#fffbeb' } },
    [QuestionTypeEnum.PROGRAMMING]: { colors: { bgEnd: '#475569', iconBg: '#f1f5f9' } },
};

// 独立的空状态组件
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

// [!code focus start]
// 1. 移除所有 Props
const QuestionList: React.FC = () => {
    // 2. 直接从 Store 中订阅所需的状态和 actions
    const { questions, deleteQuestion, addQuestionToBank } = useAIGeneratedQuestionsStore();
// [!code focus end]

    // 3. 根据 Store 中的 questions 状态来决定渲染内容
    if (questions.length === 0) {
        return <EmptyState />;
    }

    return (
        <div className={styles.questionList}>
            <AnimatePresence>
                {questions.map(q => (
                    <motion.div
                        key={q.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                        transition={{ type: 'spring', stiffness: 260, damping: 25 }}
                    >
                        <GeneratedQuestionCard
                            question={q}
                            theme={statThemes[q.type as keyof typeof statThemes]}
                            // 4. 将从 Store 获取的 actions 直接传递给子组件
                            onDelete={deleteQuestion}
                            onAddToBank={addQuestionToBank}
                        />
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
};

export default QuestionList;