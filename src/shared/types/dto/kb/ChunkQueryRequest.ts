// src/shared/types/dto/kb/ChunkQueryRequest.ts
import { PageRequest } from '@/shared/types/common';

/**
 * @description 知识切片分页查询请求的数据传输对象（DTO）。
 * 严格对标后端的 'com.weilanx.eduspark.model.dto.kb.ChunkQueryRequest.java'。
 */
export interface ChunkQueryRequestDTO extends PageRequest {
    /**
     * [范围-可选] 按知识库ID进行范围限定
     * @type {number | null}
     */
    knowledgeBaseId?: number;

    /**
     * [范围-可选] 按文档ID进行范围限定
     * @type {number | null}
     */
    documentId?: number;

    /**
     * [搜索-可选] 关键词搜索 (对 content 字段进行模糊匹配)
     * @type {string | null}
     */
    searchText?: string;

    /**
     * [搜索-可选] 向量语义搜索的查询文本
     * @type {string | null}
     */
    vectorSearchText?: string;

    /**
     * [筛选-可选] 最小字符数
     * @type {number | null}
     */
    minCharCount?: number;

    /**
     * [筛选-可选] 最大字符数
     * @type {number | null}
     */
    maxCharCount?: number;
}