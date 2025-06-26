// src/app/teacher/(dashboard)/courses/[id]/questions/[questionId]/edit/page.tsx
"use client";
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useQuestionBankStore } from '@/store/questionBankStore';
import { Question } from '@/lib/data/questionBankData';
import styles from './edit.module.css';
import QuestionEditHeader from '@/components/teacher/course-management/question-edit/QuestionEditHeader';
import QuestionConfigPanel from '@/components/teacher/course-management/question-edit/QuestionConfigPanel';
import QuestionEditorPanel from '@/components/teacher/course-management/question-edit/QuestionEditorPanel';
import KnowledgePointModal from '@/components/teacher/course-management/question-edit/KnowledgePointModal';
import { useToast } from '@/hooks/useToast';

export default function QuestionEditPage() {
    const params = useParams();
    const router = useRouter();
    const showToast = useToast();
    const courseId = params.id as string;
    const questionId = params.questionId as string;

    const { getQuestionById, updateQuestion } = useQuestionBankStore();

    const [question, setQuestion] = useState<Question | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const data = getQuestionById(questionId);
        if (data) {
            setQuestion(JSON.parse(JSON.stringify(data)));
        } else {
            // 如果没找到题目，可以跳转回列表页或显示错误
            router.replace(`/teacher/courses/${courseId}/questions`);
        }
    }, [questionId, getQuestionById, courseId, router]);

    const handleUpdate = (field: keyof Question, value: any) => {
        setQuestion(prev => prev ? { ...prev, [field]: value } : null);
    };

    const handlePointsSave = (newPointIds: string[]) => {
        handleUpdate('pointIds', newPointIds);
    }

    const handleSave = () => {
        if (question) {
            updateQuestion(question);
            showToast({ message: '题目已成功保存！', type: 'success' });
            router.back();
        }
    };

    if (!question) {
        return <div>加载题目数据中...</div>;
    }

    return (
        <div className={styles.pageContainer}>
            <QuestionEditHeader courseId={courseId} onSave={handleSave} />
            <div className={styles.mainContent}>
                <aside>
                    <QuestionConfigPanel
                        question={question}
                        onUpdate={handleUpdate}
                        onEditPoints={() => setIsModalOpen(true)}
                    />
                </aside>
                <main>
                    <QuestionEditorPanel question={question} onUpdate={handleUpdate} />
                </main>
            </div>
            <KnowledgePointModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                currentPointIds={question.pointIds}
                onSave={handlePointsSave}
            />
        </div>
    );
}