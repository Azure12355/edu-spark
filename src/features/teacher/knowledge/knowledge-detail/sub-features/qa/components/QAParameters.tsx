"use client";

import React, { useState } from 'react';
import type { RetrievalParams, GenerationParams } from '../types';
import styles from '../styles/QAParameters.module.css';
import Tooltip from '@/shared/components/ui/Tooltip/Tooltip';
import ParameterCard
    from "@/features/teacher/knowledge/knowledge-detail/sub-features/qa/components/parameters-part/ParameterCard";
import SliderParameter
    from "@/features/teacher/knowledge/knowledge-detail/sub-features/qa/components/parameters-part/SliderParameter";
import ModelSelector
    from "@/features/teacher/knowledge/knowledge-detail/sub-features/qa/components/parameters-part/ModelSelector";
import PromptEditor
    from "@/features/teacher/knowledge/knowledge-detail/sub-features/qa/components/parameters-part/PromptEditor";

// Props 和类型定义保持不变
interface AvailableModel { id: string; name: string; }
interface QAParametersProps {
    params: { retrieval: RetrievalParams; generation: GenerationParams; };
    availableModels: AvailableModel[];
    onParamChange: (path: string, value: any) => void;
    onResetParams: () => void;
}

const QAParameters: React.FC<QAParametersProps> = ({ params, availableModels, onParamChange, onResetParams }) => {

    // 状态和逻辑保持不变
    const [openCards, setOpenCards] = useState<Record<string, boolean>>({
        retrieval: true,
        generation: true,
    });
    const handleToggleCard = (cardKey: 'retrieval' | 'generation') => {
        setOpenCards(prev => ({ ...prev, [cardKey]: !prev[cardKey] }));
    };
    const selectedModel = availableModels.find(m => m.id === params.generation.modelId) || availableModels[0];

    return (
        <div className={styles.panel}>
            <header className={styles.header}>
                <i className="fas fa-sliders-h"></i><h3>参数配置</h3>
            </header>
            <p className={styles.description}>调整检索与生成参数，以优化AI在特定知识库上的问答表现。</p>

            <div className={styles.formContainer}>
                <ParameterCard title="检索阶段" isOpen={openCards.retrieval} onToggle={() => handleToggleCard('retrieval')}>
                    {/* 2. 【核心】直接使用导入的 SliderParameter 组件 */}
                    <SliderParameter
                        label="召回数量 (Top K)"
                        tooltip="从向量数据库中初步检索最相关的文本切片数量。"
                        value={params.retrieval.topK}
                        min={1}
                        max={20}
                        step={1}
                        onChange={(v) => onParamChange('retrieval.topK', v)}
                    />
                </ParameterCard>

                <ParameterCard title="生成阶段" isOpen={openCards.generation} onToggle={() => handleToggleCard('generation')}>
                    <ModelSelector
                        selectedModel={selectedModel}
                        onSwapModel={() => { /* Logic to be implemented in hook */ }}
                    />
                    <SliderParameter
                        label="模型温度 (Temperature)"
                        tooltip="控制模型回复的创造性和随机性。值越高，回复越随机；值越低，回复越确定。"
                        value={params.generation.temperature}
                        min={0.0}
                        max={1.0}
                        step={0.1}
                        onChange={(v) => onParamChange('generation.temperature', Number(v))}
                    />
                    <SliderParameter
                        label="邻近上下文拼接"
                        tooltip="为每个召回的切片拼接其前后N个切片作为上下文，以增强连贯性。0表示不拼接。"
                        value={params.generation.neighboringChunks}
                        min={0}
                        max={3}
                        step={1}
                        onChange={(v) => onParamChange('generation.neighboringChunks', Number(v))}
                    />
                    <PromptEditor
                        value={params.generation.promptTemplate}
                        onChange={(v) => onParamChange('generation.promptTemplate', v)}
                    />
                </ParameterCard>
            </div>

            <footer className={styles.bottomActions}>
                <button onClick={onResetParams} className={styles.actionButton}>
                    <i className="fas fa-undo"></i> 恢复默认
                </button>
            </footer>
        </div>
    );
};

export default QAParameters;