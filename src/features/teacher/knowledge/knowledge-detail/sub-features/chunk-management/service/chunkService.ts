// src/features/teacher/knowledge/knowledge-detail/sub-features/chunk-management/service/chunkService.ts

import apiClient from '@/shared/api/apiClient';
import { Page } from '@/features/teacher/knowledge/knowledge-list/services/knowledgeService'; // 复用已有的Page类型

// ===================================================================
//  1. 类型定义 (与后端 VO 和 DTO 精确对应)
// ===================================================================

/**
 * 知识切片视图对象 (ChunkVO)
 * 与后端的 ChunkVO.java 对应。
 */
export interface ChunkVO {
    id: number;
    content: string;
    charCount: number;
    metadata: Record<string, any>;
    createdAt: string; // ISO Date String
    documentId: number;
    documentName: string;
    documentType: string;
    documentCosUrl: string;
    knowledgeBaseId: number;
    distance?: number; // 向量搜索时可能返回
}

/**
 * 知识切片详情视图对象 (ChunkDetailVO)
 * 与后端的 ChunkDetailVO.java 对应。
 */
export interface ChunkDetailVO {
    id: number;
    content: string;
    charCount: number;
    metadata: Record<string, any>;
    createdAt: string;
    documentId: number;
    documentName: string;
    documentType: string;
    documentCosUrl: string;
    knowledgeBaseId: number;
    knowledgeBaseName: string;
    knowledgeBaseDescription: string;
}

/**
 * 分页查询知识切片的请求体 (DTO)
 * 与后端的 ChunkQueryRequest.java 对应。
 */
export interface ChunkQueryRequest {
    current: number;
    pageSize: number;
    knowledgeBaseId?: number | string;
    documentId?: number | string;
    searchText?: string;
    vectorSearchText?: string;
    minCharCount?: number;
    maxCharCount?: number;
    sortField?: 'created_at' | 'char_count';
    sortOrder?: 'ascend' | 'descend';
}

/**
 * 手动添加新切片的请求体 (DTO)
 * 与后端的 ChunkAddRequest.java 对应。
 */
export interface AddChunkRequest {
    documentId: number;
    content: string;
}

/**
 * 批量删除知识切片的请求体 (DTO)
 * 与后端的 ChunkDeleteRequest.java 对应。
 */
export interface BatchDeleteChunkRequest {
    ids: number[];
}


// ===================================================================
//  2. API 调用函数
// ===================================================================

/**
 * 【查询】根据多种条件分页查询知识切片。
 * @param queryRequest - 包含所有分页、筛选和排序条件的查询请求对象。
 * @returns 返回知识切片的分页数据。
 */
export const listChunksByPage = (queryRequest: ChunkQueryRequest): Promise<Page<ChunkVO> | any> => {
    return apiClient.post<Page<ChunkVO>>('/chunk/list/page', queryRequest);
};

/**
 * 【查询】根据 ID 获取单个切片的详细信息。
 * @param chunkId - 要查询的切片 ID。
 * @returns 返回包含完整关联信息的切片详情。
 */
export const getChunkDetailById = (chunkId: number): Promise<ChunkDetailVO | any> => {
    return apiClient.get<ChunkDetailVO>(`/chunk/${chunkId}/detail`);
};


/**
 * 【增加】手动添加一个新切片。
 * @param data - 新切片的数据。
 * @returns 返回新创建的切片的 ID。
 */
export const addChunk = (data: AddChunkRequest): Promise<number | any> => {
    return apiClient.post<number>('/chunk/add', data);
};


/**
 * 【删除】批量删除一个或多个知识切片。
 * @param data - 包含要删除的切片ID数组的对象。
 * @returns 返回操作是否成功。
 */
export const batchDeleteChunks = (data: BatchDeleteChunkRequest): Promise<boolean | any> => {
    return apiClient.delete<boolean>('/chunk/batchDelete', { data });
};