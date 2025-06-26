// src/components/teacher/course-management/ai-generate/GeneratedQuestionCard/AnswerAnalysisViewer.tsx
"use client";
import React, { useMemo } from 'react';
import { Viewer } from '@bytemd/react';
import gfm from '@bytemd/plugin-gfm';
import { AIGeneratedQuestion } from '@/lib/data/aiGeneratedQuestionsData';
import styles from './AnswerAnalysisViewer.module.css';

interface Props {
    question: AIGeneratedQuestion;
}

const AnswerAnalysisViewer: React.FC<Props> = ({ question }) => {
    const plugins = useMemo(() => [gfm()], []);
    const answerString = Array.isArray(question.answer) ? question.answer.join(', ') : String(question.answer);

    return (
        <div className={styles.answerWrapper}>
            <strong>正确答案：</strong>
            <Viewer value={answerString} plugins={plugins} />
            <br />
            <div style={{ display: 'flex', alignItems: 'flex-start', marginTop: '8px' }}>
                <strong>答案解析：</strong>
                {/* 使用 Viewer 渲染解析 */}
                <Viewer value={question.analysis} plugins={plugins} />
            </div>
        </div>
    );
};

export default AnswerAnalysisViewer;