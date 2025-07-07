// src/shared/types/dto/kb/KnowledgeBaseUpdateRequest.ts

/**
 * @description 更新知识库请求的数据传输对象（DTO）。
 * 严格对标后端的 'com.weilanx.eduspark.model.dto.kb.KnowledgeBaseUpdateRequest.java'。
 */
export interface KnowledgeBaseUpdateRequestDTO {
    /**
     * 要更新的知识库的ID
     * @type {number}
     */
    id: number;

    /**
     * 新的知识库名称
     * @type {string | null}
     */
    name?: string;

    /**
     * 新的知识库描述
     * @type {string | null}
     */
    description?: string;

    /**
     * 新的可见性
     * @type {string | null}
     */
    visibility?: 'PRIVATE' | 'PUBLIC';
}