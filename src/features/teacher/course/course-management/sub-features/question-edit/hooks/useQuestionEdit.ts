// [!file src/features/teacher/course/course-management/sub-features/question-edit/hooks/useQuestionEdit.ts]
/**
 * @file src/features/teacher/course/course-management/sub-features/question-edit/hooks/useQuestionEdit.ts
 * @description 题目创建/编辑页面的核心业务逻辑钩子。
 * @version 3.0 - 最终优化版
 */

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useImmer } from 'use-immer';

// 1. 导入所需的所有类型、Service 和共享 Hooks
import {
    EditableQuestion,
    QuestionAddRequestDTO,
    QuestionUpdateRequestDTO,
    QuestionTypeEnum,
    QuestionDifficultyEnum,
    SyllabusVO,
    QuestionKnowledgePointLinkVO,
} from '../types';
import { getQuestionForEdit, createQuestion, updateQuestion } from '../services/questionEditService';
import { getSyllabusForModal } from '../services/syllabusServiceForModal';
import { useToast } from '@/shared/hooks/useToast';

// 2. 定义 Hook 返回的接口，这是它与外界的“契约”
interface UseQuestionEditReturn {
    question: EditableQuestion | null;
    syllabusForModal: SyllabusVO | null;
    mode: 'create' | 'edit';
    isLoading: boolean;
    isSaving: boolean;
    isKnowledgePointModalOpen: boolean;
    handleFieldChange: <K extends keyof EditableQuestion>(field: K, value: EditableQuestion[K]) => void;
    handleSave: () => Promise<void>;
    openKnowledgePointModal: () => void;
    closeKnowledgePointModal: () => void;
}

// 3. 创建新题目的默认模板
const createDefaultQuestion = (): EditableQuestion => ({
    id: `new-${Date.now()}`,
    type: QuestionTypeEnum.SINGLE_CHOICE,
    difficulty: QuestionDifficultyEnum.MEDIUM,
    stem: '',
    options: ['新选项 A', '新选项 B', '新选项 C', '新选项 D'],
    answers: ['新选项 A'],
    analyses: [''],
    knowledgePoints: [],
});

export const useQuestionEdit = (): UseQuestionEditReturn => {
    // 4. 初始化所有需要的 Hooks 和状态
    const params = useParams();
    const router = useRouter();
    const showToast = useToast();

    const courseId = params.id as string;
    const questionId = params.questionId as string;

    const [question, setQuestion] = useImmer<EditableQuestion | null>(null);
    const [syllabusForModal, setSyllabusForModal] = useState<SyllabusVO | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [isKnowledgePointModalOpen, setIsKnowledgePointModalOpen] = useState(false);

    const mode = useMemo(() => (
        typeof questionId === 'string' && questionId.startsWith('new-') ? 'create' : 'edit'
    ), [questionId]);

    // 5. 数据初始化逻辑
    useEffect(() => {
        const initialize = async () => {
            setIsLoading(true);
            try {
                // 并行获取题目详情和课程大纲
                const [questionData, syllabusData] = await Promise.all([
                    mode === 'edit' ? getQuestionForEdit(questionId) : Promise.resolve(createDefaultQuestion()),
                    getSyllabusForModal(courseId)
                ]);

                setQuestion(questionData);
                setSyllabusForModal(syllabusData);

            } catch (error: any) {
                showToast({ message: error.message || '加载页面数据失败，请返回重试', type: 'error' });
                router.back();
            } finally {
                setIsLoading(false);
            }
        };
        initialize();
    }, [mode, questionId, courseId, setQuestion, showToast, router]);


    // 6. 统一的状态更新函数 (包含复杂的业务联动逻辑)
    const handleFieldChange = useCallback(<K extends keyof EditableQuestion>(field: K, value: EditableQuestion[K]) => {
        setQuestion(draft => {
            if (!draft) return;

            // a. 特殊处理 knowledgePoints 的更新，这是由 Modal 回调触发的
            if (field === 'knowledgePoints') {
                const newPointIds = new Set((value as {id: number}[]).map(p => p.id));

                if (!syllabusForModal) {
                    console.warn("Syllabus data is not ready, cannot update knowledge points.");
                    return;
                }

                // 从完整大纲中查找ID对应的知识点对象
                const newPoints: QuestionKnowledgePointLinkVO[] = [];
                syllabusForModal.chapters.forEach(chapter => {
                    chapter.sections.forEach(section => {
                        section.points.forEach(point => {
                            if (newPointIds.has(point.id)) {
                                newPoints.push({
                                    knowledgePointId: point.id,
                                    knowledgePointTitle: point.title,
                                    knowledgePointType: point.type,
                                });
                            }
                        });
                    });
                });
                draft.knowledgePoints = newPoints;
                return; // 处理完毕，直接返回
            }

            // b. 处理其他字段的通用更新
            (draft[field] as any) = value;

            // c.【核心联动逻辑】当题型变化时，自动调整答案和选项的结构
            if (field === 'type') {
                const newType = value as QuestionTypeEnum;
                switch (newType) {
                    case QuestionTypeEnum.SINGLE_CHOICE:
                        draft.options = draft.options && draft.options.length >= 2 ? draft.options : ['选项A', '选项B'];
                        draft.answers = draft.options.length > 0 ? [draft.options[0]] : [];
                        break;
                    case QuestionTypeEnum.MULTIPLE_CHOICE:
                        draft.options = draft.options && draft.options.length >= 2 ? draft.options : ['选项A', '选项B'];
                        draft.answers = [];
                        break;
                    case QuestionTypeEnum.TRUE_FALSE:
                        draft.options = [];
                        draft.answers = ['true'];
                        break;
                    default: // 填空、简答、编程题
                        draft.options = [];
                        draft.answers = [''];
                        break;
                }
            }
        });
    }, [setQuestion, syllabusForModal]);

    // 7. 统一的保存函数
    const handleSave = async () => {
        if (!question) {
            showToast({ message: '题目数据异常，无法保存', type: 'warning' });
            return;
        }

        // a. 前端最终校验
        if (!question.stem.trim()) {
            showToast({ message: '题干内容不能为空', type: 'error' });
            return;
        }
        if (question.knowledgePoints.length === 0) {
            showToast({ message: '请至少关联一个知识点', type: 'error' });
            return;
        }
        if (question.answers.length === 0 || (question.answers.length === 1 && !question.answers[0])) {
            showToast({ message: '答案不能为空', type: 'error' });
            return;
        }


        setIsSaving(true);
        try {
            const knowledgePointIds = question.knowledgePoints.map(p => p.knowledgePointId);

            if (mode === 'create') {
                const addDto: QuestionAddRequestDTO = {
                    type: question.type,
                    difficulty: question.difficulty,
                    stem: question.stem,
                    options: question.options.length > 0 ? question.options : undefined,
                    answers: question.answers,
                    analyses: question.analyses.filter(Boolean),
                    knowledgePointIds: knowledgePointIds,
                };
                const newId = await createQuestion(addDto);
                showToast({ message: '题目创建成功！', type: 'success' });
                router.replace(`/teacher/courses/${courseId}/questions/${newId}/preview`);
            } else {
                const updateDto: QuestionUpdateRequestDTO = {
                    id: question.id as number,
                    type: question.type,
                    difficulty: question.difficulty,
                    stem: question.stem,
                    options: question.options.length > 0 ? question.options : undefined,
                    answers: question.answers,
                    analyses: question.analyses.filter(Boolean),
                    knowledgePointIds: knowledgePointIds,
                };
                await updateQuestion(updateDto);
                showToast({ message: '题目更新成功！', type: 'success' });
                router.push(`/teacher/courses/${courseId}/questions/${question.id}/preview`);
            }
        } catch (error: any) {
            // 错误已被 apiClient 拦截器处理，无需额外弹窗
            console.error("Save question failed:", error);
        } finally {
            setIsSaving(false);
        }
    };

    // 8. 模态框开关函数
    const openKnowledgePointModal = useCallback(() => setIsKnowledgePointModalOpen(true), []);
    const closeKnowledgePointModal = useCallback(() => setIsKnowledgePointModalOpen(false), []);

    // 9. 返回对外的完整接口
    return {
        question,
        syllabusForModal,
        mode,
        isLoading,
        isSaving,
        isKnowledgePointModalOpen,
        handleFieldChange,
        handleSave,
        openKnowledgePointModal,
        closeKnowledgePointModal,
    };
};