// src/shared/types/entity/Chunk.ts

/**
 * @description 与后端 'com.weilanx.eduspark.model.entity.Chunk' 类完全对应的 TypeScript 类型。
 * 代表数据库中的完整知识切片实体，包含文本内容和其向量表示。
 */
export interface Chunk {
    /**
     * 本地主键
     * @type {number}
     */
    id: number;

    /**
     * [逻辑外键] 所属文档ID (documents.id)
     * @type {number}
     */
    documentId: number;

    /**
     * [可选] Coze 平台的切片ID，用于双向同步
     * @type {string | null}
     */
    cozeChunkId?: string;

    /**
     * 切片的文本内容
     * @type {string}
     */
    content: string;

    /**
     * 切片内容的字符数
     * @type {number}
     */
    charCount: number;

    /**
     * 内容的向量表示 (Embedding)
     * @type {number[] | null}
     */
    embedding?: number[];

    /**
     * 扩展信息，如来源页码、标题等 (JSONB)
     * @type {Record<string, any> | null}
     */
    metadata?: Record<string, any>;

    /**
     * 创建时间 (ISO 8601 格式的字符串)
     * @type {string}
     */
    createdAt: string;

    /**
     * 更新时间 (ISO 8601 格式的字符串)
     * @type {string}
     */
    updatedAt: string;

    /**
     * 逻辑删除标记 (0: 未删除, 1: 已删除)
     * @type {number}
     */
    isDeleted: number;
}