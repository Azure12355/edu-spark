// src/lib/data/availableModels.ts
export interface AvailableModel {
    id: string;
    name: string;
    provider: 'AstraFlow' | '通义' | '智谱' | 'DeepSeek';
    description: string;
    tag?: '推荐' | '新功能';
}

export const availableModels: AvailableModel[] = [
    {
        id: 'gemini-3-flash-preview',
        name: 'Gemini 3 Flash Preview',
        provider: 'AstraFlow',
        description: '通过 AstraFlow Modelverse 接入的 Gemini-compatible 模型，适合快速问答和知识库对话。',
        tag: '推荐',
    },
    {
        id: 'qwen-plus',
        name: '通义千问-Plus-Latest',
        provider: '通义',
        description: '通义千问超大规模语言模型，支持长文本，综合性能优秀。',
    },
    {
        id: 'glm-4',
        name: '智谱 GLM-4',
        provider: '智谱',
        description: '支持更长上下文，具备更强的多模态、代码执行和 Agent 能力。',
    },
    {
        id: 'deepseek-v2',
        name: 'DeepSeek-V2',
        provider: 'DeepSeek',
        description: '经济实惠的开源模型，具有强大的代码和数学能力。',
        tag: '新功能',
    },
    {
        id: 'qwen-turbo',
        name: '通义千问-Turbo',
        provider: '通义',
        description: '响应速度更快，适用于高并发、低延迟的对话场景。',
    },
];
