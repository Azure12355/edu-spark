// [!file src/features/teacher/course/course-management/sub-features/assignments-management/sub-features/assignment-player/hooks/useAssignmentPlayer.ts]
"use client";

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useToast } from '@/shared/hooks/useToast';
import { useConfirmationModal } from '@/shared/hooks/useConfirmationModal';
import { AssignmentVO, AssignmentQuestionLinkVO } from '@/shared/types';
import { useAssignmentPlayerStore } from '../store/assignmentPlayerStore';
import {getAssignmentTemplate, submitAnswer} from "@/shared/services"; // 引入Zustand Store

/**
 * 在线作业/考试播放器的核心逻辑 Hook。
 */
export const useAssignmentPlayer = () => {
    // 1. 路由与依赖
    const router = useRouter();
    const params = useParams();
    const courseId = Number(params.id);
    const templateId = Number(params.templateId);
    // TODO: 从URL或状态管理中获取 classActivityId，对于学生答题场景至关重要
    const classActivityId = 1; // 临时硬编码

    const showToast = useToast();
    const showConfirmationModal = useConfirmationModal();

    // 2. Zustand Store 状态与操作
    const {
        answers,
        setAnswer,
        resetStore,
        currentQuestionIndex,
        setCurrentQuestionIndex,
    } = useAssignmentPlayerStore();

    // 3. 本地状态管理
    const [assignment, setAssignment] = useState<AssignmentVO | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // 4. 数据获取
    const fetchAssignmentData = useCallback(async () => {
        if (isNaN(templateId) || templateId <= 0) {
            setError('无效的作业/考试ID');
            setIsLoading(false);
            return;
        }
        setIsLoading(true);
        setError(null);
        try {
            const data = await getAssignmentTemplate(templateId);
            setAssignment(data);
        } catch (err: any) {
            setError(err.message || '获取作业详情失败');
            showToast({ message: '获取作业详情失败', type: 'error' });
        } finally {
            setIsLoading(false);
        }
    }, [templateId, showToast]);

    // 5. Effect Hook - 页面加载时获取数据并重置Store
    useEffect(() => {
        resetStore(); // 每次进入页面时重置答题状态
        fetchAssignmentData();
        return () => {
            resetStore(); // 组件卸载时再次重置，确保状态干净
        };
    }, [fetchAssignmentData, resetStore]);

    // 6. 派生状态 (Derived State)
    const questions = useMemo(() => assignment?.questions || [], [assignment]);
    const currentQuestion = useMemo(() => questions[currentQuestionIndex], [questions, currentQuestionIndex]);
    const totalQuestions = useMemo(() => questions.length, [questions]);

    // 7. 核心操作函数
    const goToQuestion = (index: number) => {
        if (index >= 0 && index < totalQuestions) {
            setCurrentQuestionIndex(index);
        }
    };

    const nextQuestion = () => {
        if (currentQuestionIndex < totalQuestions - 1) {
            goToQuestion(currentQuestionIndex + 1);
        }
    };

    const prevQuestion = () => {
        if (currentQuestionIndex > 0) {
            goToQuestion(currentQuestionIndex - 1);
        }
    };

    const handleAnswerChange = (questionId: number, answer: any) => {
        setAnswer(questionId, answer);
    };

    const handleSubmit = () => {
        const answeredCount = Object.keys(answers).length;
        const message = answeredCount < totalQuestions
            ? `您还有 ${totalQuestions - answeredCount} 道题未作答，确定要交卷吗？`
            : '您已答完所有题目，确定要交卷吗？';

        showConfirmationModal({
            title: '确认交卷',
            message: message,
            confirmText: '确认交卷',
            type: 'info',
            onConfirm: async () => {
                setIsSubmitting(true);
                try {
                    await submitAnswer(courseId, classActivityId, {
                        classActivityId,
                        answers
                    });
                    showToast({ message: '提交成功！', type: 'success' });
                    // TODO: 跳转到结果页或班级活动页
                    router.push(`/teacher/courses/${courseId}/assignments`);
                } catch (err) {
                    // 错误已由拦截器处理
                } finally {
                    setIsSubmitting(false);
                }
            },
        });
    };

    // 8. 返回给UI组件的接口
    return {
        assignment,
        questions,
        currentQuestion,
        currentQuestionIndex,
        totalQuestions,
        isLoading,
        isSubmitting,
        error,
        answers,
        goToQuestion,
        nextQuestion,
        prevQuestion,
        handleAnswerChange,
        handleSubmit,
    };
};