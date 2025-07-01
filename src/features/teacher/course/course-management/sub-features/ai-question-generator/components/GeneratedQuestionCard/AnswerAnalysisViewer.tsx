// src/components/teacher/course-management/ai-generate/GeneratedQuestionCard/AnswerAnalysisViewer.tsx
"use client";
import React, { useMemo } from 'react';
import { Viewer } from '@bytemd/react';
import gfm from '@bytemd/plugin-gfm';
import { AIGeneratedQuestion } from '@/shared/types/question'; // 导入新类型
import { QuestionType } from '@/shared/constants/enums'; // 导入新枚举
import styles from './AnswerAnalysisViewer.module.css';

interface Props {
    question: AIGeneratedQuestion;
}

const AnswerAnalysisViewer: React.FC<Props> = ({ question }) => {
    const plugins = useMemo(() => [gfm()], []);

    // 核心修改 1: 处理新的 answers 数组
    const answerString = useMemo(() => {
        if (question.type === QuestionType.TRUE_FALSE) {
            return question.answers[0] === 'true' ? '正确' : '错误';
        }
        return question.answers.join(', ');
    }, [question.answers, question.type]);

    // 核心修改 2: 处理新的 analyses 数组
    const analysisString = useMemo(() => {
        // 使用 Markdown 的水平分割线来分隔多条解析
        return question.analyses.join('\n\n---\n\n');
    }, [question.analyses]);

    return (
        <div className={styles.answerWrapper}>
            <strong>正确答案：</strong>
            <Viewer value={answerString} plugins={plugins} />
            <br />
            <div style={{ display: 'flex', alignItems: 'flex-start', marginTop: '8px' }}>
                <strong>答案解析：</strong>
                <Viewer value={analysisString} plugins={plugins} />
            </div>
        </div>
    );
};

export default AnswerAnalysisViewer;