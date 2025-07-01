"use client";
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useQuestionBankStore } from '@/features/teacher/course/course-management/sub-features/question-bank/store/questionBankStore';
import { Question } from '@/shared/lib/data/questionBankData';
import styles from './QuestionEditPage.module.css';
import QuestionEditHeader from '@/features/teacher/course/course-management/sub-features/question-edit/components/QuestionEditHeader';
import QuestionConfigPanel from '@/features/teacher/course/course-management/sub-features/question-edit/components/QuestionConfigPanel';
import QuestionEditorPanel from '@/features/teacher/course/course-management/sub-features/question-edit/components/QuestionEditorPanel';
import KnowledgePointModal from '@/features/teacher/course/course-management/sub-features/question-edit/components/KnowledgePointModal';
import { useToast } from '@/shared/hooks/useToast';
import {KnowledgePoint} from "@/shared/lib/data/syllabusData";
import {useSyllabusStore} from "@/features/teacher/course/course-management/sub-features/syllabus/store/syllabusStore";

export default function QuestionEditPage() {
    const params = useParams();
    const router = useRouter();
    const showToast = useToast();
    const courseId = params.id as string;
    const questionId = params.questionId as string;
    const { syllabus } = useSyllabusStore(); // 获取完整的教学大纲

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
        // --- 核心修改：根据 ID 查找完整的知识点对象 ---
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
                // --- 核心修改：传递对象数组 ---
                currentPoints={question.points}
                onSave={handlePointsSave}
            />
        </div>
    );
}