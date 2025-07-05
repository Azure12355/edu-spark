// [!file src/features/teacher/course/course-management/sub-features/question-edit/hooks/useQuestionEdit.ts]
/**
 * @file src/features/teacher/course/course-management/sub-features/question-edit/hooks/useQuestionEdit.ts
 * @description 题目创建/编辑页面的核心业务逻辑钩子。
 * @version 2.2 - 优化知识点关联状态同步逻辑
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
    SyllabusVO, // 确保从 types 导入大纲类型
} from '../types';
import { getQuestionForEdit, createQuestion, updateQuestion } from '../services/questionEditService';
import { getSyllabusForModal } from '../services/syllabusServiceForModal'; // 使用本领域的 service
import { useToast } from '@/shared/hooks/useToast';


// 2. 更新 Hook 返回值类型，移除不再需要的 onEditPoints
interface UseQuestionEditReturn {
    question: EditableQuestion | null;
    syllabusForModal: SyllabusVO | null; // 新增：为模态框提供数据
    mode: 'create' | 'edit';
    isLoading: boolean;
    isSaving: boolean;
    isKnowledgePointModalOpen: boolean; // 重命名，更清晰
    handleFieldChange: <K extends keyof EditableQuestion>(field: K, value: EditableQuestion[K]) => void;
    handleSave: () => Promise<void>;
    openKnowledgePointModal: () => void; // 重命名
    closeKnowledgePointModal: () => void; // 重命名
}

// 创建新题目的默认状态
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
    // 3. 初始化 Hooks 和状态
    const params = useParams();
    const router = useRouter();
    const showToast = useToast();
    const courseId = params.id as string;
    const questionId = params.questionId as string;

    const [question, setQuestion] = useImmer<EditableQuestion | null>(null);
    const [syllabusForModal, setSyllabusForModal] = useState<SyllabusVO | null>(null); // 新增状态
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [isKnowledgePointModalOpen, setIsKnowledgePointModalOpen] = useState(false);

    const mode = useMemo(() => (questionId.startsWith('new-') ? 'create' : 'edit'), [questionId]);

    // 4. 数据初始化逻辑
    useEffect(() => {
        const initialize = async () => {
            setIsLoading(true);
            try {
                // 并行获取题目详情和大纲数据
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


    // 5. 【核心优化】重构状态更新函数，使其能处理知识点ID列表
    const handleFieldChange = useCallback(<K extends keyof EditableQuestion>(field: K, value: EditableQuestion[K]) => {
        setQuestion(draft => {
            if (!draft) return;

            // a. 特殊处理 knowledgePoints 的更新
            if (field === 'knowledgePoints') {
                const newPointIds = new Set( (value as any[]).map(p => p.knowledgePointId || p.id) );

                if (!syllabusForModal) return; // 如果大纲数据未加载，则不处理

                // b. 从完整大纲中查找ID对应的知识点对象
                const newPoints = [];
                for (const chapter of syllabusForModal.chapters) {
                    for (const section of chapter.sections) {
                        for (const point of section.points) {
                            if (newPointIds.has(point.id)) {
                                newPoints.push({
                                    knowledgePointId: point.id,
                                    knowledgePointTitle: point.title,
                                    knowledgePointType: point.type,
                                });
                            }
                        }
                    }
                }
                draft.knowledgePoints = newPoints;
                return; // 处理完毕，直接返回
            }

            // c. 原有的联动逻辑
            (draft[field] as any) = value;
            if (field === 'type') {
                const newType = value as QuestionTypeEnum;
                // ... (类型切换联动逻辑保持不变)
            }
        });
    }, [setQuestion, syllabusForModal]);

    // 6. 保存函数 (逻辑基本不变，但 DTO 转换更可靠)
    const handleSave = async () => {
        if (!question) return;
        // ... (校验逻辑)
        if (question.knowledgePoints.length === 0) {
            showToast({ message: '请至少关联一个知识点', type: 'error' });
            return;
        }

        setIsSaving(true);
        try {
            // 从 question.knowledgePoints 中提取 ID 列表
            const knowledgePointIds = question.knowledgePoints.map(p => p.knowledgePointId);

            if (mode === 'create') {
                const addDto: QuestionAddRequestDTO = { /* ... */ knowledgePointIds };
                await createQuestion(addDto);
                // ...
            } else {
                const updateDto: QuestionUpdateRequestDTO = { /* ... */ knowledgePointIds };
                await updateQuestion(updateDto);
                // ...
            }
            // ... (刷新和跳转逻辑)
        } catch (error) {
            // ...
        } finally {
            setIsSaving(false);
        }
    };

    // 7. 模态框开关函数
    const openKnowledgePointModal = useCallback(() => setIsKnowledgePointModalOpen(true), []);
    const closeKnowledgePointModal = useCallback(() => setIsKnowledgePointModalOpen(false), []);

    // 8. 返回对外的接口
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