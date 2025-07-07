// src/shared/types/dto/kb/DocumentQueryRequest.ts
import { PageRequest } from '@/shared/types/common';

/**
 * @description 文档分页查询请求的数据传输对象（DTO）。
 * 严格对标后端的 'com.weilanx.eduspark.model.dto.kb.DocumentQueryRequest.java'。
 */
export interface DocumentQueryRequestDTO extends PageRequest {
    /**
     * [核心上下文] 所属知识库的ID
     * @type {number}
     */
    knowledgeBaseId: number;

    /**
     * 按文档名称进行模糊查询
     * @type {string | null}
     */
    name?: string;

    /**
     * 按文档状态进行精确筛选 (0, 1, 2, 9)
     * @type {number | null}
     */
    status?: number;

    /**
     * 按文件MIME类型进行筛选
     * @type {string | null}
     */
    type?: string;

    /**
     * 查询的起始时间（上传时间）
     * @type {string | null}
     */
    startTime?: string;

    /**
     * 查询的结束时间（上传时间）
     * @type {string | null}
     */
    endTime?: string;
}