// [!file src/features/teacher/course/course-management/sub-features/assignments-management/sub-features/assignment-edit/hooks/useAssignmentEdit.ts]
"use client";

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useToast } from '@/shared/hooks/useToast';
import { useConfirmationModal } from '@/shared/hooks/useConfirmationModal';
import {
    AssignmentVO,
    AssignmentUpdateRequestDTO,
    AssignmentQuestionLinkVO,
    QuestionLinkRequestDTO,
    QuestionVO // 用于AddQuestionModal的QuestionVO
} from '@/shared/types';
import { AssignmentTypeEnum } from '@/shared/types/enums/assignment/AssignmentTypeEnum';
import { AssignmentTemplateStatusEnum } from '@/shared/types/enums/assignment/AssignmentTemplateStatusEnum';
import { orderBy } from 'lodash';
import {
    getAssignmentTemplate,
    linkQuestionsToTemplate,
    unlinkQuestionFromTemplate,
    updateAssignmentTemplate
} from "@/shared/services"; // 引入lodash的排序工具，如果没有安装请 pnpm add lodash 或 yarn add lodash

/**
 * 作业模板编辑页面的核心逻辑 Hook。
 */
export const useAssignmentEdit = () => {
    // 1. 路由参数和导航
    const router = useRouter();
    const params = useParams();
    const courseId = Number(params.id);
    const templateId = Number(params.templateId);

    // 2. 状态管理
    const [originalTemplate, setOriginalTemplate] = useState<AssignmentVO | null>(null); // 存储原始模板数据
    const [formData, setFormData] = useState<AssignmentUpdateRequestDTO | null>(null); // 编辑表单数据
    const [questions, setQuestions] = useState<AssignmentQuestionLinkVO[]>([]); // 模板关联的题目列表
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // 3. 依赖注入
    const showToast = useToast();
    const showConfirmationModal = useConfirmationModal();

    // 4. 数据获取 (模板详情)
    const fetchTemplateDetails = useCallback(async () => {
        if (isNaN(templateId) || templateId <= 0) {
            setError('无效的模板ID');
            setIsLoading(false);
            return;
        }
        setIsLoading(true);
        setError(null);
        try {
            const response = await getAssignmentTemplate(templateId);
            setOriginalTemplate(response);
            // 初始化表单数据
            setFormData({
                title: response.title,
                description: response.description,
                type: response.type,
                templateStatus: response.templateStatus,
                config: response.config,
            });
            // 初始化题目列表，确保 orderIndex 有序
            if (response.questions) {
                setQuestions(orderBy(response.questions, 'orderIndex'));
            } else {
                setQuestions([]);
            }
        } catch (err: any) {
            setError(err.message || '获取模板详情失败');
            showToast({ message: '获取模板详情失败', type: 'error' });
        } finally {
            setIsLoading(false);
        }
    }, [templateId, showToast]);

    // 5. Effect Hook: 页面加载时获取模板详情
    useEffect(() => {
        fetchTemplateDetails();
    }, [fetchTemplateDetails]);

    // 6. 表单数据改变处理
    const handleFormChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev!, [name]: value }));
    }, []);

    const handleConfigChange = useCallback((key: string, value: any) => {
        setFormData(prev => ({
            ...prev!,
            config: {
                ...prev?.config,
                [key]: value,
            },
        }));
    }, []);

    // 7. 题目关联管理
    const handleAddQuestion = useCallback(async (newQuestion: QuestionVO, score: number) => {
        // 检查是否已存在
        const existingLink = questions.find(q => q.question.id === newQuestion.id);
        if (existingLink) {
            showToast({ message: '该题目已存在于模板中', type: 'warning' });
            return false;
        }

        // 计算新的 orderIndex
        const maxOrderIndex = questions.reduce((max, q) => Math.max(max, q.orderIndex), -1);
        const newOrderIndex = maxOrderIndex + 1;

        const linkRequest: QuestionLinkRequestDTO = {
            questionId: Number(newQuestion.id),
            score: score,
            orderIndex: newOrderIndex,
        };

        setIsSaving(true);
        try {
            // 调用后端API关联题目
            await linkQuestionsToTemplate(templateId, [linkRequest]);
            showToast({ message: `题目 "${newQuestion.stem.substring(0, 20)}..." 关联成功`, type: 'success' });

            // 立即更新前端状态，无需重新fetch
            const newLink: AssignmentQuestionLinkVO = {
                assignmentId: templateId,
                questionId: Number(newQuestion.id),
                score: score,
                orderIndex: newOrderIndex,
                question: newQuestion, // 完整QuestionVO，方便前端显示
            };
            setQuestions(prev => orderBy([...prev, newLink], 'orderIndex'));
            return true;
        } catch (err: any) {
            showToast({ message: err.message || '关联题目失败', type: 'error' });
            return false;
        } finally {
            setIsSaving(false);
        }
    }, [questions, templateId, showToast]);

    const handleUpdateQuestionLink = useCallback((questionId: number, newScore: number, newOrderIndex: number) => {
        setQuestions(prev => {
            const updated = prev.map(link => {
                if (link.question.id === questionId) {
                    return { ...link, score: newScore, orderIndex: newOrderIndex };
                }
                return link;
            });
            return orderBy(updated, 'orderIndex'); // 保持排序
        });
        showToast({ message: '题目分值或顺序已更新（待保存）', type: 'info' });
    }, [showToast]);

    const handleRemoveQuestion = useCallback((questionId: number) => {
        showConfirmationModal({
            title: '确认移除题目',
            message: '您确定要从模板中移除这道题目吗？',
            confirmText: '确认移除',
            type: 'danger',
            onConfirm: async () => {
                try {
                    await unlinkQuestionFromTemplate(templateId, questionId);
                    showToast({ message: '题目移除成功', type: 'success' });
                    setQuestions(prev => prev.filter(q => q.question.id !== questionId));
                } catch (err: any) {
                    showToast({ message: err.message || '移除题目失败', type: 'error' });
                }
            },
        });
    }, [templateId, showToast, showConfirmationModal]);

    // 8. 保存所有变更
    const handleSave = useCallback(async () => {
        if (!formData) return;

        setIsSaving(true);
        try {
            // 1. 更新模板基本信息
            await updateAssignmentTemplate(templateId, formData);
            showToast({ message: '模板基本信息已保存', type: 'success' });

            // 2. 同步题目关联 (如果题目列表有变化，这里需要更复杂的逻辑，目前只处理增删)
            // 考虑一个批量更新关联的API，或者每次增删都立即同步到后端
            // 目前我们的 addQuestion 和 removeQuestion 已经是立即同步的
            // 所以这里只需要更新模板信息即可

            // 重新获取数据以确保UI同步最新状态
            await fetchTemplateDetails();
            showToast({ message: '所有变更已成功保存！', type: 'success' });
            router.push(`/teacher/courses/${courseId}/assignments`); // 保存成功后跳转回列表页
        } catch (err: any) {
            showToast({ message: err.message || '保存失败', type: 'error' });
        } finally {
            setIsSaving(false);
        }
    }, [formData, templateId, showToast, fetchTemplateDetails, router, courseId]);

    // 9. 取消编辑，返回列表页
    const handleCancel = useCallback(() => {
        router.push(`/teacher/courses/${courseId}/assignments`);
    }, [router, courseId]);

    // 10. Memoized 返回值
    const memoizedValues = useMemo(() => ({
        originalTemplate,
        formData,
        questions,
        isLoading,
        isSaving,
        error,
        handleFormChange,
        handleConfigChange,
        handleAddQuestion,
        handleUpdateQuestionLink,
        handleRemoveQuestion,
        handleSave,
        handleCancel,
        courseId, // 导出 courseId 方便子组件使用 Link
        templateId, // 导出 templateId
    }), [
        originalTemplate, formData, questions, isLoading, isSaving, error,
        handleFormChange, handleConfigChange, handleAddQuestion,
        handleUpdateQuestionLink, handleRemoveQuestion, handleSave, handleCancel,
        courseId, templateId
    ]);

    return memoizedValues;
};