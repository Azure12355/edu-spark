import apiClient from '../../../../../../../shared/api/apiClient';
import { Page } from '@/features/teacher/knowledge/knowledge-list/services/knowledgeService'; // 复用已有的 Page 类型

// ===================================================================
// 1. 类型定义 (与后端 VO 和 DTO 精确对应)
// ===================================================================

/**
 * 知识切片视图对象 (ChunkVO)
 * @description 聚合了切片和所属文档的关键信息
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
    distance?: number; // 向量搜索时可能返回
}

/**
 * 知识切片详情视图对象 (ChunkDetailVO)
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
 * 添加新切片的请求体 (DTO)
 */
export interface AddChunkRequest {
    documentId: number;
    content: string;
}

// ===================================================================
// 2. API 调用函数
// ===================================================================

/**
 * @description 根据知识库ID分页获取切片列表
 * @param kbId - 知识库 ID
 * @param current - 当前页码
 * @param size - 每页数量
 * @returns 切片的分页数据
 */
export const listChunksByKbId = (kbId: number, current: number, size: number): Promise<Page<ChunkVO>> => {
    return apiClient.get('/chunk/list/page/by_kb', {
        params: { kbId, current, size }
    });
};

/**
 * @description 根据文档ID分页获取切片列表
 * @param docId - 文档 ID
 * @param current - 当前页码
 * @param size - 每页数量
 * @returns 切片的分页数据
 */
export const listChunksByDocId = (docId: number, current: number, size: number): Promise<Page<ChunkVO>> => {
    return apiClient.get('/chunk/list/page/by_doc', {
        params: { docId, current, size }
    });
};

/**
 * @description 手动添加一个新切片
 * @param data - 新切片的数据
 * @returns 新创建的切片的 ID
 */
export const addChunk = (data: AddChunkRequest): Promise<number> => {
    return apiClient.post('/chunk/add', data);
};

/**
 * @description 根据 ID 删除一个知识切片
 * @param chunkId - 要删除的切片 ID
 * @returns 操作是否成功
 */
export const deleteChunk = (chunkId: number): Promise<boolean> => {
    return apiClient.delete(`/chunk/${chunkId}`);
};

/**
 * @description 根据 ID 获取单个切片的详细信息
 * @param chunkId - 要查询的切片 ID
 * @returns 包含完整关联信息的切片详情
 */
export const getChunkDetailById = (chunkId: number): Promise<ChunkDetailVO> => {
    return apiClient.get(`/chunk/${chunkId}/detail`);
};