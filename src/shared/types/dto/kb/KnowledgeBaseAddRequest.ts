// src/shared/types/dto/kb/KnowledgeBaseAddRequest.ts

/**
 * @description 创建知识库请求的数据传输对象（DTO）。
 * 严格对标后端的 'com.weilanx.eduspark.model.dto.kb.KnowledgeBaseAddRequest.java'。
 */
export interface KnowledgeBaseAddRequestDTO {
    /**
     * 知识库名称
     * @type {string}
     */
    name: string;

    /**
     * 知识库描述
     * @type {string | null}
     */
    description?: string;

    /**
     * 知识库格式类型: 0(文本), 1(表格), 2(图片)
     * @type {number}
     */
    formatType: number;

    /**
     * 可见性: 'PRIVATE' 或 'PUBLIC'
     * @type {string | null}
     */
    visibility?: 'PRIVATE' | 'PUBLIC';
}