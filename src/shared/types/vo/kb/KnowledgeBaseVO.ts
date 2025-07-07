// src/shared/types/vo/kb/KnowledgeBaseVO.ts
import { UserVO } from '../UserVO';

/**
 * @description 知识库视图对象（VO），用于在前端安全地展示知识库信息，并包含了所有者信息。
 * 严格对标后端的 'com.weilanx.eduspark.model.vo.kb.KnowledgeBaseVO.java'。
 */
export interface KnowledgeBaseVO {
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
     * 类型: 0(文本), 1(表格), 2(图片)
     * @type {number}
     */
    formatType: number;

    /**
     * 可见性: 'PRIVATE', 'PUBLIC'
     * @type {string}
     */
    visibility: 'PRIVATE' | 'PUBLIC';

    /**
     * 被收藏/fork的次数
     * @type {number}
     */
    forkCount: number;

    /**
     * 缓存的统计信息，如文档数、切片数等
     * @type {Record<string, any> | null}
     */
    metadataStats?: Record<string, any>;

    /**
     * 知识库所有者的信息 (脱敏)
     * @type {UserVO}
     */
    owner: UserVO;

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
}