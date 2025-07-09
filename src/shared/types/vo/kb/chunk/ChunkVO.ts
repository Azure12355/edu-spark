// src/shared/types/vo/kb/ChunkVO.ts

/**
 * @description 知识切片视图对象（VO），用于在前端列表展示切片信息及其关联的文档信息。
 * 严格对标后端的 'com.weilanx.eduspark.model.vo.kb.ChunkVO.java'。
 */
export interface ChunkVO {
    /**
     * 切片的唯一ID
     * @type {number}
     */
    id: number;

    /**
     * 切片的文本内容
     * @type {string}
     */
    content: string;

    /**
     * 字符数
     * @type {number}
     */
    charCount: number;

    /**
     * 切片的元数据
     * @type {Record<string, any> | null}
     */
    metadata?: Record<string, any>;

    /**
     * 创建时间
     * @type {string}
     */
    createdAt: string;

    // --- 关联的 Document 信息 ---
    /**
     * 所属文档的ID
     * @type {number}
     */
    documentId: number;

    /**
     * 所属文档的名称
     * @type {string}
     */
    documentName: string;

    /**
     * 所属文档的类型 (e.g., "application/pdf")
     * @type {string}
     */
    documentType: string;

    /**
     * 所属文档的访问URL
     * @type {string}
     */
    documentCosUrl: string;

    /**
     * 所属知识库的ID
     * @type {number}
     */
    knowledgeBaseId: number;

    /**
     * (可选) 向量搜索时返回的相似度分数
     * @type {number | null}
     */
    distance?: number;
}