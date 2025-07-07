// src/shared/services/knowledgeService.ts

import apiClient from '../api/apiClient';
import {
    KnowledgeBaseAddRequestDTO,
    KnowledgeBaseQueryRequestDTO,
    KnowledgeBaseUpdateRequestDTO,
    DocumentQueryRequestDTO,
    DocumentUpdateRequestDTO,
    DocumentDeleteRequestDTO,
} from '../types';
import { KnowledgeBaseVO, DocumentVO } from '../types';
import { Page } from '@/shared/types';

// ===================================================================
//  知识库 (Knowledge Base) 相关服务
// ===================================================================

/**
 * @description 创建一个新的知识库。
 * @param {KnowledgeBaseAddRequestDTO} addRequest - 创建知识库的请求体。
 * @returns {Promise<KnowledgeBaseVO>} 返回新创建知识库的视图对象。
 */
export const createKnowledgeBase = (addRequest: KnowledgeBaseAddRequestDTO): Promise<KnowledgeBaseVO> => {
    return apiClient.post('/kb/create', addRequest);
};

/**
 * @description 根据ID获取单个知识库的详细信息 (VO)。
 * @param {number} id - 知识库ID。
 * @returns {Promise<KnowledgeBaseVO>} 返回知识库的详细视图对象。
 */
export const getKnowledgeBaseVOById = (id: number): Promise<KnowledgeBaseVO> => {
    return apiClient.get('/kb/get/vo', { params: { id } });
};

/**
 * @description 分页获取知识库列表 (VO)。
 * @param {KnowledgeBaseQueryRequestDTO} queryRequest - 查询请求体。
 * @returns {Promise<Page<KnowledgeBaseVO>>} 返回知识库的分页视图对象。
 */
export const listKnowledgeBaseVOByPage = (queryRequest: KnowledgeBaseQueryRequestDTO): Promise<Page<KnowledgeBaseVO>> => {
    return apiClient.post('/kb/list/page/vo', queryRequest);
};

/**
 * @description 更新知识库信息。
 * @param {KnowledgeBaseUpdateRequestDTO} updateRequest - 更新请求体。
 * @returns {Promise<boolean>} 返回操作是否成功。
 */
export const updateKnowledgeBase = (updateRequest: KnowledgeBaseUpdateRequestDTO): Promise<boolean> => {
    return apiClient.post('/kb/update', updateRequest);
};

/**
 * @description 级联删除知识库及其下的所有文档和切片。
 * @param {number} id - 要删除的知识库ID。
 * @returns {Promise<boolean>} 返回操作是否成功。
 */
export const deleteKnowledgeBase = (id: number): Promise<boolean> => {
    return apiClient.delete('/kb/delete', { params: { id } });
};


// ===================================================================
//  文档 (Document) 相关服务
// ===================================================================

/**
 * @description 上传文档到指定知识库。这是一个复合操作，需要使用 FormData。
 * @param {number} knowledgeBaseId - 目标知识库ID。
 * @param {File} file - 要上传的文件对象。
 * @param {(progressEvent: any) => void} [onUploadProgress] - (可选) 上传进度回调函数。
 * @returns {Promise<number>} 返回代表文档处理任务的文档ID。
 */
export const uploadDocument = (
    knowledgeBaseId: number,
    file: File,
    onUploadProgress?: (progressEvent: any) => void
): Promise<number> => {
    const formData = new FormData();
    formData.append('kbId', String(knowledgeBaseId));
    formData.append('file', file);

    return apiClient.post('/kb/document/upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        onUploadProgress,
    });
};

/**
 * @description 获取单个文档的状态和信息。
 * @param {number} id - 文档ID。
 * @returns {Promise<DocumentVO>} 返回文档的视图对象。
 */
export const getDocumentById = (id: number): Promise<DocumentVO> => {
    return apiClient.get('/kb/document/get', { params: { id } });
};

/**
 * @description 分页查询指定知识库下的文档列表。
 * @param {DocumentQueryRequestDTO} queryRequest - 查询请求体。
 * @returns {Promise<Page<DocumentVO>>} 返回文档的分页视图对象。
 */
export const listDocumentsByPage = (queryRequest: DocumentQueryRequestDTO): Promise<Page<DocumentVO>> => {
    return apiClient.post('/kb/document/list/page', queryRequest);
};

/**
 * @description 批量级联删除一个或多个文档及其下的所有知识切片。
 * @param {DocumentDeleteRequestDTO} deleteRequest - 包含待删除文档ID列表的请求体。
 * @returns {Promise<boolean>} 返回操作是否成功。
 */
export const batchDeleteDocuments = (deleteRequest: DocumentDeleteRequestDTO): Promise<boolean> => {
    return apiClient.delete('/kb/document/batchDelete', { data: deleteRequest }); // 注意：axios 的 delete 方法，body在 data 属性中
};

/**
 * @description 更新指定文档的元数据，如名称。
 * @param {DocumentUpdateRequestDTO} updateRequest - 更新请求体。
 * @returns {Promise<boolean>} 返回操作是否成功。
 */
export const updateDocument = (updateRequest: DocumentUpdateRequestDTO): Promise<boolean> => {
    return apiClient.put('/kb/document/update', updateRequest);
};