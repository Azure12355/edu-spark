// src/features/teacher/knowledge/knowledge-detail/sub-features/document-management/services/documentService.ts
import apiClient from '@/shared/api/apiClient';
import { Page } from '@/features/teacher/knowledge/knowledge-list/services/knowledgeService';

// ===================================================================
//  1. 类型定义 (与后端 DTO 和 VO 精确对应)
// ===================================================================

/**
 * 文档视图对象 (VO)
 * 与后端的 DocumentVO.java 对应。
 */
export interface DocumentVO {
    id: number;
    knowledgeBaseId: number;
    name: string;
    type: string;
    size: number;
    status: number; // 0(待处理), 1(处理中), 2(完毕), 9(失败)
    sliceCount: number;
    cosUrl: string;
    previewUrl?: string | null | undefined;
    errorMessage?: string;
    createdAt: string; // ISO Date String
}

/**
 * 文档状态视图对象 (VO)
 * 用于轮询获取文档处理状态
 */
export interface DocumentStatusVO {
    id: number;
    status: number;
    sliceCount: number;
    errorMessage?: string;
}

/**
 * 分页查询文档的请求体 (DTO)
 * 与后端的 DocumentQueryRequest.java 对应。
 */
export interface DocumentQueryRequest {
    knowledgeBaseId: number | string;
    current: number;
    pageSize: number;
    name?: string | "";
    status?: number;
    type?: string;
    startTime?: string;
    endTime?: string;
    sortField?: 'created_at' | 'name' | 'size' | 'status';
    sortOrder?: 'ascend' | 'descend';
}

/**
 * 批量删除文档的请求体 (DTO)
 * 与后端的 DocumentDeleteRequest.java 对应。
 */
export interface DocumentDeleteRequest {
    ids: (number | string)[];
}

/**
 * 更新文档信息的请求体 (DTO)
 * 与后端的 DocumentUpdateRequest.java 对应。
 */
export interface DocumentUpdateRequest {
    id: number;
    name?: string;
    metadata?: Record<string, any>;
}


// ===================================================================
//  2. API 调用函数
// ===================================================================

/**
 * @description 分页获取指定知识库下的文档列表。
 * @param params - 查询参数对象。
 * @returns 返回文档的分页数据。
 */
/**
 * @description 【已修复】分页获取指定知识库下的文档列表。
 *              现在使用 POST 请求，并将所有查询参数作为请求体发送。
 * @param params - 包含所有分页、筛选和排序条件的查询参数对象。
 * @returns 返回文档的分页数据。
 */
export const listDocumentsByPage = (params: DocumentQueryRequest): Promise<Page<DocumentVO> | any> => {
    // 将请求方法从 GET 改为 POST
    // 将参数从 { params } 对象改为直接作为请求体 (第二个参数) 发送
    return apiClient.post<Page<DocumentVO>>('/kb/document/list/page', params);
};


/**
 * @description 批量删除文档。
 * @param data - 包含要删除的文档ID数组的对象。
 * @returns 返回操作是否成功。
 */
export const batchDeleteDocuments = (data: DocumentDeleteRequest): Promise<boolean | any> => {
    // 使用 DELETE 方法，并将数据作为请求体发送
    return apiClient.delete<boolean>('/kb/document/batchDelete', { data });
};

/**
 * @description 更新单个文档的信息。
 * @param data - 包含文档ID和待更新字段的对象。
 * @returns 返回操作是否成功。
 */
export const updateDocument = (data: DocumentUpdateRequest): Promise<boolean | any> => {
    return apiClient.put<boolean>('/kb/document/update', data);
};


/**
 * @description 上传文档到指定的知识库。
 * 这是一个 multipart/form-data 请求。
 * @param kbId - 目标知识库的ID。
 * @param file - 要上传的文件对象。
 * @param onUploadProgress - 可选的回调函数，用于跟踪上传进度。
 * @returns 返回一个包含新创建文档记录ID的对象。
 */
export const uploadDocument = async (
    kbId: number | string,
    file: File,
    onUploadProgress?: (progressEvent: any) => void
): Promise<{ documentId: number | any }> => {
    const formData = new FormData();
    formData.append('kbId', String(kbId));
    formData.append('file', file);

    const documentId = await apiClient.post<number>(
        '/kb/document/upload',
        formData,
        {
            headers: { 'Content-Type': 'multipart/form-data' },
            onUploadProgress,
        }
    );
    // 后端直接返回的是 Long 类型的 documentId，Axios 拦截器会把它解包出来
    return { documentId };
};

/**
 * @description 根据文档ID获取其最新处理状态。
 * 用于在上传后进行轮询。
 * @param documentId - 要查询的文档ID。
 * @returns 返回文档的状态信息。
 */
export const getDocumentStatus = (documentId: number): Promise<DocumentStatusVO | any> => {
    // 使用 GET 请求，并将 ID 作为查询参数
    return apiClient.get<DocumentStatusVO>(`/kb/document/get?id=${documentId}`);
};