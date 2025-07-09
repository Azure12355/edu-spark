// src/shared/types/dto/qa/AdvancedQARequest.ts

// 内部嵌套的参数类型
interface RetrievalParams {
    topK: number;
}

interface GenerationParams {
    modelId: string;
    promptTemplate: string;
    temperature: number;
    neighboringChunks: number;
}

/**
 * @description 高级知识问答（QA）请求的数据传输对象（DTO）。
 * 严格对标后端的 'com.weilanx.eduspark.model.dto.qa.AdvancedQARequest.java'。
 */
export interface AdvancedQARequestDTO {
    /**
     * [可选] 会话的UUID，用于连续对话
     * @type {string | null}
     */
    sessionUuid?: string;

    /**
     * 用户提出的问题或查询
     * @type {string}
     */
    query: string;

    /**
     * [可选] 用于限定RAG检索范围的知识库ID列表
     * @type {number[] | null}
     */
    knowledgeBaseIds?: number[];

    /**
     * RAG 检索阶段的参数配置
     * @type {RetrievalParams}
     */
    retrieval: RetrievalParams;

    /**
     * RAG 生成阶段的参数配置
     * @type {GenerationParams}
     */
    generation: GenerationParams;
}