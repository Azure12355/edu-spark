// src/shared/types/entity/KnowledgeBase.ts

/**
 * @description 与后端 'com.weilanx.eduspark.model.entity.KnowledgeBase' 类完全对应的 TypeScript 类型。
 * 代表数据库中的完整知识库实体。
 */
export interface KnowledgeBase {
    /**
     * 本地主键
     * @type {number}
     */
    id: number;

    /**
     * [核心] Coze 平台的知识库ID
     * @type {string}
     */
    cozeDatasetId: string;

    /**
     * [本地业务] 所有者ID (users.id)
     * @type {number}
     */
    ownerId: number;

    /**
     * 知识库名称 (与Coze同步)
     * @type {string}
     */
    name: string;

    /**
     * 知识库描述 (与Coze同步)
     * @type {string | null}
     */
    description?: string;

    /**
     * 类型: 0(文本), 1(表格), 2(图片) (与Coze同步)
     * @type {number}
     */
    formatType: number;

    /**
     * 可见性: 'PRIVATE', 'PUBLIC'
     * @type {string}
     */
    visibility: 'PRIVATE' | 'PUBLIC';

    /**
     * 如果是收藏/fork，记录源知识库ID
     * @type {number | null}
     */
    forkFromKbId?: number;

    /**
     * 被收藏/fork的次数
     * @type {number}
     */
    forkCount: number;

    /**
     * 存储Coze的 ChunkStrategy 对象 (JSONB)
     * @type {Record<string, any> | null}
     */
    chunkStrategyJson?: Record<string, any>;

    /**
     * 缓存统计信息，如 doc_count, slice_count (JSONB)
     * @type {Record<string, any> | null}
     */
    metadataStats?: Record<string, any>;

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