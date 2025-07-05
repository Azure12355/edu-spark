// [!file src/features/teacher/course/course-management/sub-features/question-preview/QuestionPreviewPage.tsx]
"use client";

import React from 'react';
import { motion } from 'framer-motion';
import styles from './QuestionPreview.module.css';

// 1. 导入核心 Hook 和所有子组件
import { useQuestionPreview } from './hooks/useQuestionPreview';
import QuestionPreviewHeader
    from "@/features/teacher/course/course-management/sub-features/question-preview/components/QuestionPreviewHeader";
import QuestionPreviewCard
    from "@/features/teacher/course/course-management/sub-features/question-preview/components/QuestionPreviewCard";

// 2. 将加载和错误状态的 UI 实现为独立的、可复用的组件
const LoadingState: React.FC = () => (
    <div className={styles.stateContainer}>
        <div className={styles.spinner}></div>
        <p>正在加载题目详情...</p>
    </div>
);

const ErrorState: React.FC<{ message: string; onRetry: () => void }> = ({ message, onRetry }) => (
    <div className={styles.stateContainer}>
        <i className={`fas fa-exclamation-triangle ${styles.errorIcon}`}></i>
        <h3>加载失败</h3>
        <p>{message || "无法获取题目信息，请检查网络或稍后重试。"}</p>
        <button onClick={onRetry} className={styles.retryButton}>点击重试</button>
    </div>
);

export default function QuestionPreviewPage() {
    // 3. 一行代码获取所有数据、状态和逻辑
    const { question, isLoading, error, refetch } = useQuestionPreview();

    // 定义页面内容过渡动画
    const pageVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
    };

    // 4. 在页面顶层处理加载和错误状态
    if (isLoading) {
        return <LoadingState />;
    }

    if (error || !question) {
        return <ErrorState message={error || "未能找到题目信息。"} onRetry={refetch} />;
    }

    // 5. 成功获取数据后，装配核心 UI 组件
    return (
        <div className={styles.pageContainer}>
            <motion.div
                className={styles.contentWrapper}
                variants={pageVariants}
                initial="hidden"
                animate="visible"
            >
                <QuestionPreviewHeader
                    courseId={1} // 注意：在真实应用中，courseId 应从路由或上层 context 获取
                    questionId={question.id}
                />
                <QuestionPreviewCard question={question} />
            </motion.div>
        </div>
    );
}