import apiClient from './apiClient';
import { UserVO } from './userService';

// ===================================================================
//  1. 类型定义 (与后端 VO 和 DTO 对齐)
// ===================================================================

/**
 * 知识库视图对象 (VO)
 */
export interface KnowledgeBaseVO {
    id: number;
    cozeDatasetId: string;
    name: string;
    description: string;
    formatType: number;
    visibility: string;
    forkCount: number;
    metadataStats: any;
    owner: UserVO;
    createdAt: string;
    updatedAt: string;
}

/**
 * 创建知识库请求体 (DTO)
 */
export interface KnowledgeBaseAddRequest {
    name: string;
    description: string;
    formatType: number; // 0 for text, 2 for image
}

/**
 * 【新增】知识库查询请求参数类型 (DTO)
 * 与后端的 KnowledgeBaseQueryRequest.java 严格对应
 */
export interface KnowledgeBaseQueryRequest {
    current: number;
    pageSize: number;
    name?: string;
    ownerId?: number;
    visibility?: 'PRIVATE' | 'PUBLIC';
    formatType?: number;
    status?: string; // 如果后端支持此字段
    sortField?: 'updated_at' | 'name' | 'fork_count';
    sortOrder?: 'ascend' | 'descend';
}

/**
 * 分页响应结构
 */
export interface Page<T> {
    records: T[];
    total: number;
    size: number;
    current: number;
}


// ===================================================================
//  2. API 调用函数 (经过优化)
// ===================================================================

/**
 * 【优化】分页获取知识库列表
 * @param params - 类型安全的查询参数对象
 * @returns 返回知识库的分页数据
 */
export const listKnowledgeBasesByPage = (params: KnowledgeBaseQueryRequest): Promise<Page<KnowledgeBaseVO> | any> => {
    // apiClient.post<Page<KnowledgeBaseVO>> 明确了拦截器成功后返回的 data 类型是 Page<KnowledgeBaseVO>
    // 因此，整个函数的返回值类型 Promise<Page<KnowledgeBaseVO>> 是类型安全的，无需任何强制转换。
    return apiClient.post<Page<KnowledgeBaseVO>>('/kb/list/page/vo', params);
};


/**
 * 【优化】创建一个新的知识库
 * @param data - 创建知识库所需的数据
 * @returns 返回新创建的知识库信息
 */
export const createKnowledgeBase = (data: KnowledgeBaseAddRequest): Promise<KnowledgeBaseVO | any> => {
    return apiClient.post<KnowledgeBaseVO>('/kb/create', data);
};

/**
 * 【新增】根据ID删除一个知识库（及其所有关联数据）
 * @param id - 要删除的知识库ID
 * @returns 返回操作是否成功
 */
export const deleteKnowledgeBase = (id: number): Promise<boolean | any> => {
    // 参数通过 URL query string 传递
    return apiClient.delete<boolean>(`/kb/delete?id=${id}`);
};

/**
 * 【优化】上传文档到指定的知识库
 * @returns 返回一个包含文档ID的对象
 */
export const uploadDocument = async (
    kbId: number | string,
    file: File,
    onUploadProgress: (progressEvent: any) => void
): Promise<{ documentId: number | any }> => {
    const formData = new FormData();
    formData.append('kbId', String(kbId));
    formData.append('file', file);

    // apiClient.post<number> 返回 Promise<number>
    const documentId = await apiClient.post<number>(
        '/kb/document/upload',
        formData,
        {
            headers: { 'Content-Type': 'multipart/form-data' },
            onUploadProgress,
        }
    );

    return { documentId }; // 直接构造返回对象，类型匹配
};


/**
 * 文档状态视图对象 (VO)
 */
export interface DocumentStatusVO {
    id: number;
    status: number;
    errorMessage?: string;
}

/**
 * 【优化】根据文档ID轮询获取文档处理状态
 */
export const getDocumentStatus = (documentId: number): Promise<DocumentStatusVO | any> => {
    return apiClient.get<DocumentStatusVO>(`/kb/document/get?id=${documentId}`);
};