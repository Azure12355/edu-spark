// src/shared/types/entity/Document.ts

/**
 * @description 与后端 'com.weilanx.eduspark.model.entity.Document' 类完全对应的 TypeScript 类型。
 * 代表数据库中的完整文档实体，并跟踪其处理状态。
 */
export interface Document {
    /**
     * 本地主键
     * @type {number}
     */
    id: number;

    /**
     * [逻辑外键] 所属知识库ID (knowledge_bases.id)
     * @type {number}
     */
    knowledgeBaseId: number;

    /**
     * 用户上传时的原始文件名
     * @type {string}
     */
    name: string;

    /**
     * 文件的MIME类型, e.g., 'application/pdf'
     * @type {string | null}
     */
    type?: string;

    /**
     * 文件大小（字节）
     * @type {number | null}
     */
    size?: number;

    /**
     * 处理状态: 0(待处理), 1(处理中), 2(处理完毕), 9(失败)
     * @type {number}
     */
    status: number;

    /**
     * 成功处理后生成的切片数量
     * @type {number | null}
     */
    sliceCount?: number;

    /**
     * 文件在腾讯云COS中的唯一对象键
     * @type {string | null}
     */
    cosObjectKey?: string;

    /**
     * 文件的CDN或临时访问URL，用于前端预览
     * @type {string | null}
     */
    cosUrl?: string;

    /**
     * 文档的在线预览链接(HTML格式)，由数据万象生成。
     * @type {string | null}
     */
    previewUrl?: string;

    /**
     * 当 status 为 FAILED 时的错误信息
     * @type {string | null}
     */
    errorMessage?: string;

    /**
     * [可选] Coze 平台的文档ID
     * @type {string | null}
     */
    cozeDocumentId?: string;

    /**
     * Coze平台上传时间 (ISO 8601 格式的字符串)
     * @type {string | null}
     */
    cozeCreatedAt?: string;

    /**
     * 记录创建时间 (ISO 8601 格式的字符串)
     * @type {string}
     */
    createdAt: string;

    /**
     * 逻辑删除标记 (0: 未删除, 1: 已删除)
     * @type {number}
     */
    isDeleted: number;

    /**
     * 用户自定义元数据 (JSONB)
     * @type {Record<string, any> | null}
     */
    metadata?: Record<string, any>;
}