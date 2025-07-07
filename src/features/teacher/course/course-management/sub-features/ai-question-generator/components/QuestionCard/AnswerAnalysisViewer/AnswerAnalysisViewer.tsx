// AnswerAnalysisViewer.tsx
"use client";
import React, { useMemo } from 'react';
import styles from './AnswerAnalysisViewer.module.css';
import { AIQuestionRecordVO, QuestionTypeEnum } from '@/shared/types';
import MarkdownRenderer from '@/shared/components/ui/MarkdownRenderer/MarkdownRenderer';

export default ({ question }: { question: AIQuestionRecordVO }) => {
    const answerString = useMemo(() => (question.type === QuestionTypeEnum.TRUE_FALSE ? (question.answers[0] === 'true' ? '正确' : '错误') : question.answers.join('、')), [question.answers, question.type]);
    const analysisString = useMemo(() => (question.analyses || []).join('\n\n---\n\n'), [question.analyses]);
    return (
        <div className={styles.answerWrapper}>
            <strong>正确答案：</strong><MarkdownRenderer content={answerString} />
            <br />
            <div style={{ display: 'flex', alignItems: 'flex-start', marginTop: '8px' }}>
                <strong>答案解析：</strong>{analysisString ? <MarkdownRenderer content={analysisString} /> : <span>暂无解析</span>}
            </div>
        </div>
    );
};