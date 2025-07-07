// [!file src/features/teacher/course/course-management/sub-features/ai-question-generator/hooks/useAIConfig.ts]
import { useState, useCallback } from 'react';
import { useImmer } from 'use-immer';
import {
    QuestionTypeEnum,
    QuestionDifficultyEnum,
    KnowledgePoint,
} from '@/shared/types';
import { useAIGeneratedQuestionsStore } from '../store/aiGeneratedQuestionsStore';
import { useToast } from '@/shared/hooks/useToast';

/**
 * @description AI出题的完整配置项接口
 */
export interface AIConfig {
    selectedType: QuestionTypeEnum;
    selectedDifficulty: QuestionDifficultyEnum;
    quantity: number;
    knowledgePoints: KnowledgePoint[];
    supplementaryContent: string;
    modelId: string;
}

/**
 * @description `useAIConfig` Hook 的返回值类型
 */
interface UseAIConfigReturn {
    // --- State ---
    config: AIConfig;
    isGenerating: boolean;
    isConfirmModalOpen: boolean;
    isPointModalOpen: boolean;
    isAddPointModalOpen: boolean;

    // --- Actions ---
    updateConfig: <K extends keyof AIConfig>(field: K, value: AIConfig[K]) => void;
    handleQuantityChange: (delta: number) => void;
    handleGenerateToggle: () => void;
    handleConfirmGeneration: () => void;
    closeConfirmModal: () => void;

    // --- Modal Actions ---
    openPointModal: () => void;
    closePointModal: () => void;
    openAddPointModal: () => void;
    closeAddPointModal: () => void;
    handleAddPointSubmit: (newPointTitle: string) => void;
    handlePointsSelected: (newPoints: KnowledgePoint[]) => void;
}

/**
 * @description 管理AI出题配置面板所有状态和UI交互逻辑的Hook。
 * @returns {UseAIConfigReturn}
 */
export const useAIConfig = (): UseAIConfigReturn => {
    // 1. Store 和基础 Hooks
    const startGenerationTask = useAIGeneratedQuestionsStore((state) => state.startGenerationTask);
    const isGenerating = useAIGeneratedQuestionsStore((state) => state.isTaskRunning);
    const showToast = useToast();

    // 2. 配置状态
    const [config, setConfig] = useImmer<AIConfig>({
        selectedType: QuestionTypeEnum.SINGLE_CHOICE,
        selectedDifficulty: QuestionDifficultyEnum.MEDIUM,
        quantity: 5,
        knowledgePoints: [],
        supplementaryContent: '',
        modelId: 'glm-4',
    });

    // 3. UI 模态框状态
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [isPointModalOpen, setIsPointModalOpen] = useState(false);
    const [isAddPointModalOpen, setIsAddPointModalOpen] = useState(false);

    // 4. 封装所有交互逻辑
    const updateConfig = useCallback(<K extends keyof AIConfig>(field: K, value: AIConfig[K]) => {
        setConfig(draft => { (draft[field] as any) = value; });
    }, [setConfig]);

    const handleQuantityChange = useCallback((delta: number) => {
        setConfig(draft => { draft.quantity = Math.max(1, Math.min(20, draft.quantity + delta)); });
    }, [setConfig]);

    const handleGenerateToggle = () => {
        if (isGenerating) return;
        if (config.knowledgePoints.length === 0) {
            showToast({ message: "请至少选择一个知识点", type: "warning" });
            return;
        }
        setIsConfirmModalOpen(true);
    };

    const closeConfirmModal = () => setIsConfirmModalOpen(false);

    const handleConfirmGeneration = () => {
        closeConfirmModal();
        startGenerationTask(config, 3174);
    };

    // --- Modal Logic ---
    const openPointModal = () => setIsPointModalOpen(true);
    const closePointModal = () => setIsPointModalOpen(false);
    const openAddPointModal = () => setIsAddPointModalOpen(true);
    const closeAddPointModal = () => setIsAddPointModalOpen(false);

    const handleAddPointSubmit = (newPointTitle: string) => {
        const trimmedTitle = newPointTitle.trim();
        if (config.knowledgePoints.some(p => p.title === trimmedTitle)) {
            showToast({ message: `知识点 "${trimmedTitle}" 已存在！`, type: 'warning' });
            return;
        }
        const newPoint: KnowledgePoint = {
            id: `manual-${Date.now()}`,
            title: trimmedTitle,
            type: '重点',
            sectionId: 0,
            orderIndex: 0,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            isDeleted: 0,
        };
        updateConfig('knowledgePoints', [...config.knowledgePoints, newPoint]);
        showToast({ message: '添加成功！', type: 'success' });
    };

    const handlePointsSelected = (newPoints: KnowledgePoint[]) => {
        updateConfig('knowledgePoints', newPoints);
        showToast({ message: `已更新关联知识点 (${newPoints.length}个)`, type: 'info' });
    };

    // 5. 返回所有状态和方法
    return {
        config,
        isGenerating,
        isConfirmModalOpen,
        isPointModalOpen,
        isAddPointModalOpen,
        updateConfig,
        handleQuantityChange,
        handleGenerateToggle,
        handleConfirmGeneration,
        closeConfirmModal,
        openPointModal,
        closePointModal,
        openAddPointModal,
        closeAddPointModal,
        handleAddPointSubmit,
        handlePointsSelected,
    };
};