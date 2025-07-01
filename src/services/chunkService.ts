import apiClient from './apiClient';
import { Page } from './knowledgeService'; // 复用 Page 类型

// 1. 定义与后端 Chunk.java 实体匹配的 VO 类型
export interface ChunkVO {
    id: number;
    documentId: number;
    content: string;
    charCount: number;
    metadata?: any; // 假设 metadata 是一个 JSON 对象
    createdAt: string; // ISO Date String

    // 为了前端显示，可能需要从后端联表查询或前端自行补充
    sourceDocumentName?: string;
    orderInDocument?: number;
}

// 2. 定义切片列表查询的请求参数类型
export interface ChunkQueryRequest {
    current: number;
    pageSize: number;
    kbId: number; // 必须按知识库ID查询
    documentId?: number; // 可选，按文档ID筛选
    searchTerm?: string; // 按内容搜索
}

// 3. 定义添加新切片的请求体类型
export interface AddChunkRequest {
    documentId: number;
    content: string;
}

// 4. 定义批量删除切片的请求体类型
export interface DeleteChunksRequest {
    ids: number[];
}

/**
 * @description 分页获取知识库下的切片列表
 * @param params - 查询参数
 * @returns 返回切片的分页数据
 * @backend-suggestion 需要后端实现此接口 GET /api/kb/chunk/list/page
 */
export const listChunksByKbId = (params: ChunkQueryRequest): Promise<Page<ChunkVO>> => {
    return apiClient.get('/kb/chunk/list/page', { params });
};

/**
 * @description 手动添加一个新切片
 * @param data - 新切片的数据
 * @returns 返回新创建的切片信息
 * @backend-suggestion 需要后端实现此接口 POST /api/kb/chunk/add
 */
export const addChunk = (data: AddChunkRequest): Promise<ChunkVO> => {
    return apiClient.post('/kb/chunk/add', data);
};

/**
 * @description 批量删除切片
 * @param data - 包含要删除的切片ID数组
 * @returns 返回操作是否成功
 * @backend-suggestion 需要后端实现此接口 POST /api/kb/chunk/delete
 */
export const deleteChunks = (data: DeleteChunksRequest): Promise<boolean> => {
    return apiClient.post('/kb/chunk/delete', data);
};