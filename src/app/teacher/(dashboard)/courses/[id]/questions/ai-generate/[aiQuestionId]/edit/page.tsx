// src/app/teacher/(dashboard)/courses/[id]/questions/ai-generate/[aiQuestionId]/edit/page.tsx
"use client";
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAIGeneratedQuestionsStore } from '@/store/aiGeneratedQuestionsStore';
import { AIGeneratedQuestion } from '@/lib/data/aiGeneratedQuestionsData';
import styles from './edit.module.css';
import QuestionEditHeader from '@/components/teacher/course-management/question-edit/QuestionEditHeader';
import QuestionConfigPanel from '@/components/teacher/course-management/question-edit/QuestionConfigPanel';
import QuestionEditorPanel from '@/components/teacher/course-management/question-edit/QuestionEditorPanel';
import KnowledgePointModal from '@/components/teacher/course-management/question-edit/KnowledgePointModal';
import { useToast } from '@/hooks/useToast';
import { useSyllabusStore } from '@/store/syllabusStore';
import { KnowledgePoint } from '@/lib/data/syllabusData';

export default function AIQuestionEditPage() {
    const params = useParams();
    const router = useRouter();
    const showToast = useToast();
    const courseId = params.id as string;
    const aiQuestionId = params.aiQuestionId as string;
    const { syllabus } = useSyllabusStore();

    const { getQuestionById, updateQuestion } = useAIGeneratedQuestionsStore();

    const [question, setQuestion] = useState<AIGeneratedQuestion | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const data = getQuestionById(aiQuestionId);
        if (data) {
            setQuestion(JSON.parse(JSON.stringify(data)));
        } else {
            router.replace(`/teacher/courses/${courseId}/questions/ai-generate`);
        }
    }, [aiQuestionId, getQuestionById, courseId, router]);

    const handleUpdate = (field: keyof AIGeneratedQuestion, value: any) => {
        setQuestion(prev => prev ? { ...prev, [field]: value } : null);
    };

    const handlePointsSave = (newPointIds: string[]) => {
        const newPoints: KnowledgePoint[] = [];
        const pointMap = new Map<string, KnowledgePoint>();
        syllabus.forEach(c => c.sections.forEach(s => s.points.forEach(p => pointMap.set(p.id, p))));

        newPointIds.forEach(id => {
            const point = pointMap.get(id);
            if(point) newPoints.push(point);
        });

        handleUpdate('points', newPoints);
    }

    const handleSave = () => {
        if (question) {
            updateQuestion(question);
            showToast({ message: 'AI 题目已成功保存！', type: 'success' });
            router.push(`/teacher/courses/${courseId}/questions/ai-generate`);
        }
    };

    if (!question) {
        return <div>加载题目数据中...</div>;
    }

    return (
        <div className={styles.pageContainer}>
            {/* --- 核心修改：不再传递 courseId prop --- */}
            <QuestionEditHeader onSave={handleSave} />
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
                currentPoints={question.points}
                onSave={handlePointsSave}
            />
        </div>
    );
}