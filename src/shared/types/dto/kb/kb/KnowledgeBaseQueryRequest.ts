// src/shared/types/dto/kb/KnowledgeBaseQueryRequest.ts
import { PageRequest } from '@/shared/types/common';

/**
 * @description 知识库查询请求的数据传输对象（DTO）。
 * 严格对标后端的 'com.weilanx.eduspark.model.dto.kb.KnowledgeBaseQueryRequest.java'。
 */
export interface KnowledgeBaseQueryRequestDTO extends PageRequest {
    /**
     * 按名称模糊查询
     * @type {string | null}
     */
    name?: string;

    /**
     * 按所有者ID查询
     * @type {number | null}
     */
    ownerId?: number;

    /**
     * 按可见性查询 ('PRIVATE', 'PUBLIC')
     * @type {string | null}
     */
    visibility?: 'PRIVATE' | 'PUBLIC';

    /**
     * 按知识库格式类型查询
     * @type {number | null}
     */
    formatType?: number;

    /**
     * 按知识库状态查询 (如果后端支持)
     * @type {string | null}
     */
    status?: string;
}