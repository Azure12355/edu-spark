/**
 * @file src/features/teacher/knowledge/knowledge-detail/sub-features/qa/types/index.ts
 * @description 定义知识问答（QA）领域所有与后端API交互的数据结构类型。
 */

// 复用已在 chunk-management 领域中定义的 ChunkVO 类型，以确保类型统一
import { ChunkVO } from '@/features/teacher/knowledge/knowledge-detail/sub-features/chunk-management/service/chunkService';

/**
 * QA 检索阶段参数
 * 对应后端的 AdvancedQARequest.RetrievalParams
 */
export interface RetrievalParams {
    topK: number;
}

/**
 * QA 生成阶段参数
 * 对应后端的 AdvancedQARequest.GenerationParams
 */
export interface GenerationParams {
    modelId: string;
    promptTemplate: string;
    temperature: number;
    neighboringChunks: number;
}

/**
 * 高级知识问答请求体 (DTO)
 * 与后端的 AdvancedQARequest.java 完全对应。
 */
export interface AdvancedQARequest {
    sessionUuid?: string | null; // 会话ID，初次对话可不传
    query: string;
    knowledgeBaseIds: number[];
    retrieval: RetrievalParams;
    generation: GenerationParams;
}

/**
 * QA 流式响应结束时，由 "done" 事件推送的完整响应体 (VO)
 * 与后端的 QACompleteResponse.java 对应。
 */
export interface QACompleteResponse {
    qaRecordId: number;
    sessionUuid: string;
    fullAnswer: string;
    references: ChunkVO[];
    responseMetadata: Record<string, any>;
}

/**
 * 定义流式响应处理器的回调函数类型
 */
export interface StreamProcessor {
    onData: (chunk: string) => void;
    onComplete: (data: QACompleteResponse) => void;
    onError: (error: Error) => void;
    onEnd: () => void;
}