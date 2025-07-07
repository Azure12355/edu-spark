// src/shared/types/dto/qa/QARequest.ts

/**
 * @description 基础知识问答（QA）请求的数据传输对象（DTO）。
 * 严格对标后端的 'com.weilanx.eduspark.model.dto.qa.QARequest.java'。
 */
export interface QARequestDTO {
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
}