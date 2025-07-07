// src/shared/services/chunkService.ts

import apiClient from '../api/apiClient';
import {
    ChunkAddRequestDTO,
    ChunkDeleteRequestDTO,
    ChunkQueryRequestDTO,
} from '../types';
import {
    ChunkDetailVO,
    ChunkVO,
} from '../types';
import { Page } from '../types/common';

/**
 * @description 根据知识库ID分页获取切片列表 (VO)。
 * @param {number} kbId - 知识库ID。
 * @param {number} current - 当前页码。
 * @param {number} size - 每页数量。
 * @returns {Promise<Page<ChunkVO>>} 返回切片的分页视图对象。
 */
export const listChunksByKnowledgeBaseId = (kbId: number, current: number, size: number): Promise<Page<ChunkVO>> => {
    return apiClient.get('/chunk/list/page/by_kb', {
        params: { kbId, current, size }
    });
};

/**
 * @description 根据文档ID分页获取切片列表 (VO)。
 * @param {number} docId - 文档ID。
 * @param {number} current - 当前页码。
 * @param {number} size - 每页数量。
 * @returns {Promise<Page<ChunkVO>>} 返回切片的分页视图对象。
 */
export const listChunksByDocumentId = (docId: number, current: number, size: number): Promise<Page<ChunkVO>> => {
    return apiClient.get('/chunk/list/page/by_doc', {
        params: { docId, current, size }
    });
};

/**
 * @description 手动添加一个新切片。
 * @param {ChunkAddRequestDTO} addRequest - 包含 documentId 和 content 的请求体。
 * @returns {Promise<number>} 返回新创建切片的 ID。
 */
export const addChunk = (addRequest: ChunkAddRequestDTO): Promise<number> => {
    return apiClient.post('/chunk/add', addRequest);
};

/**
 * @description 根据 ID 删除一个知识切片。
 * @param {number} id - 要删除的切片ID。
 * @returns {Promise<boolean>} 返回操作是否成功。
 */
export const deleteChunk = (id: number): Promise<boolean> => {
    return apiClient.delete(`/chunk/${id}`);
};

/**
 * @description 根据ID获取单个切片的详细信息。
 * @param {number} id - 切片ID。
 * @returns {Promise<ChunkDetailVO>} 返回包含详细关联信息的 ChunkDetailVO。
 */
export const getChunkDetailById = (id: number): Promise<ChunkDetailVO> => {
    return apiClient.get(`/chunk/${id}/detail`);
};

/**
 * @description 批量删除知识切片。
 * @param {ChunkDeleteRequestDTO} deleteRequest - 包含待删除切片ID列表的请求体。
 * @returns {Promise<boolean>} 返回操作是否成功。
 */
export const batchDeleteChunks = (deleteRequest: ChunkDeleteRequestDTO): Promise<boolean> => {
    return apiClient.delete('/chunk/batchDelete', { data: deleteRequest });
};

/**
 * @description 根据多种条件分页查询知识切片，支持关键词搜索和向量语义搜索。
 * @param {ChunkQueryRequestDTO} queryRequest - 包含所有查询条件的请求DTO。
 * @returns {Promise<Page<ChunkVO>>} 返回知识切片的分页视图对象。
 */
export const listChunksByPage = (queryRequest: ChunkQueryRequestDTO): Promise<Page<ChunkVO>> => {
    return apiClient.post('/chunk/list/page', queryRequest);
};