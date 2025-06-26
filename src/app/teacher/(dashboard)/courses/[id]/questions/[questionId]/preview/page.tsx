// src/app/teacher/(dashboard)/courses/[id]/questions/[questionId]/preview/page.tsx
"use client";
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useQuestionBankStore } from '@/store/questionBankStore';
import { Question } from '@/lib/data/questionBankData';
import styles from './preview.module.css';
import QuestionPreviewHeader from '@/components/teacher/course-management/question-preview/QuestionPreviewHeader';
import QuestionPreviewCard from '@/components/teacher/course-management/question-preview/QuestionPreviewCard';

export default function QuestionPreviewPage() {
    const params = useParams();
    const courseId = params.id as string;
    const questionId = params.questionId as string;
    const { getQuestionById } = useQuestionBankStore();
    const [question, setQuestion] = useState<Question | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const data = getQuestionById(questionId);
        if (data) {
            setQuestion(data);
        }
        setLoading(false);
    }, [questionId, getQuestionById]);

    if (loading) {
        return <div className={styles.loading}>加载题目信息中...</div>;
    }

    if (!question) {
        return <div className={styles.notFound}>抱歉，找不到该题目信息。</div>;
    }

    return (
        <div className={styles.pageContainer}>
            <QuestionPreviewHeader courseId={courseId} questionId={questionId} />
            <QuestionPreviewCard question={question} />
        </div>
    );
}