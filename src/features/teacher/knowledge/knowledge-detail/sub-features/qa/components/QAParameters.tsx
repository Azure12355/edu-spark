// [!file src/features/teacher/knowledge/knowledge-detail/sub-features/qa/components/QAParameters.tsx]
"use client";

import React, { useState } from 'react';
import type { RetrievalParams, GenerationParams } from '../types';
import styles from './QAParameters.module.css';

// --- UI 子组件 ---
import ParameterCard from "./ParametersPanel/ParameterCard/ParameterCard";
import SliderParameter from "./ParametersPanel/SliderParameter/SliderParameter";
import ModelSelector from "./ParametersPanel/ModelSelector/ModelSelector";
import PromptEditor from "./ParametersPanel/PromptEditor/PromptEditor";
import ModelSelectionModal from './ParametersPanel/ModelSelector/ModelSelectionModal';
import { useToast } from "@/shared/hooks/useToast";
import { AvailableModel } from '@/shared/lib/data/availableModels';


interface QAParametersProps {
    params: { retrieval: RetrievalParams; generation: GenerationParams; };
    availableModels: AvailableModel[]; // 现在这个类型指向了正确的导入
    onRetrievalParamChange: <K extends keyof RetrievalParams>(key: K, value: RetrievalParams[K]) => void;
    onGenerationParamChange: <K extends keyof GenerationParams>(key: K, value: GenerationParams[K]) => void;
    onResetParams: () => void;
}

const QAParameters: React.FC<QAParametersProps> = ({ params, availableModels, onRetrievalParamChange,
                                                       onGenerationParamChange, onResetParams }) => {

    const showToast = useToast();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [openCards, setOpenCards] = useState<Record<string, boolean>>({
        retrieval: true,
        generation: true,
    });

    const handleToggleCard = (cardKey: 'retrieval' | 'generation') => {
        setOpenCards(prev => ({ ...prev, [cardKey]: !prev[cardKey] }));
    };

    const selectedModel = availableModels.find(m => m.id === params.generation.modelId) || availableModels[0];

    const handleModelSelect = (modelId: string) => {
        onGenerationParamChange('modelId', modelId); // 直接调用专用回调
        setIsModalOpen(false);
        showToast({ message: '模型已切换', type: 'success' });
    };

    return (
        <>
            <div className={styles.panel}>
                <header className={styles.header}>
                    <i className="fas fa-sliders-h"></i><h3>参数配置</h3>
                </header>
                <p className={styles.description}>调整检索与生成参数来优化AI在问答表现。</p>

                <div className={styles.formContainer}>
                    <ParameterCard
                        title="检索阶段"
                        isOpen={openCards.retrieval}
                        onToggle={() => handleToggleCard('retrieval')}
                    >
                        <SliderParameter
                            label="召回数量 (Top K)"
                            tooltip="从向量数据库中初步检索最相关的文本切片数量。"
                            value={params.retrieval.topK}
                            min={1} max={20} step={1}
                            onChange={(value) => onRetrievalParamChange('topK', value)}
                        />
                    </ParameterCard>

                    <ParameterCard
                        title="生成阶段"
                        isOpen={openCards.generation}
                        onToggle={() => handleToggleCard('generation')}
                    >
                        <ModelSelector
                            selectedModel={selectedModel}
                            onSwapModel={() => setIsModalOpen(true)}
                        />
                        <SliderParameter
                            label="模型温度 (Temperature)"
                            tooltip="控制模型回复的创造性和随机性。值越高，回复越随机；值越低，回复越确定。"
                            value={params.generation.temperature}
                            min={0.0} max={1.0} step={0.1}
                            onChange={(value) => onGenerationParamChange('temperature', Number(value))}
                        />
                        <SliderParameter
                            label="邻近上下文拼接"
                            tooltip="为每个召回的切片拼接其前后N个切片作为上下文，以增强连贯性。0表示不拼接。"
                            value={params.generation.neighboringChunks}
                            min={0} max={3} step={1}
                            onChange={(value) => onGenerationParamChange('neighboringChunks', Number(value))}
                        />
                        <PromptEditor
                            value={params.generation.promptTemplate}
                            onChange={(value) => onGenerationParamChange('promptTemplate', value)}
                        />
                    </ParameterCard>
                </div>

                <footer className={styles.bottomActions}>
                    <button onClick={onResetParams} className={styles.actionButton}>
                        <i className="fas fa-undo"></i> 恢复默认
                    </button>
                </footer>
            </div>

            <ModelSelectionModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                models={availableModels}
                selectedModelId={params.generation.modelId}
                onSelectModel={handleModelSelect}
            />
        </>
    );
};

export default QAParameters;