import apiClient from './apiClient';
import { UserVO } from './userService'; // 假设您有 userService 并导出了 UserVO

// ===================================================================
//  类型定义 (与后端 VO 和 DTO 对齐)
// ===================================================================

export interface KnowledgeBaseVO {
    id: number;
    cozeDatasetId: string;
    name: string;
    description: string;
    formatType: number;
    visibility: string;
    forkCount: number;
    metadataStats: any; // 可根据后端具体结构定义
    owner: UserVO;
    createdAt: string; // ISO Date String
    updatedAt: string; // ISO Date String
}

export interface KnowledgeBaseAddRequest {
    name: string;
    description: string;
    formatType: number; // 0 for text, 2 for image
}

// 分页响应结构
export interface Page<T> {
    records: T[];
    total: number;
    size: number;
    current: number;
}


// ===================================================================
//  API 调用函数
// ===================================================================

/**
 * 分页获取知识库列表
 * @param params - 包含分页和查询条件的参数
 * @returns 返回知识库的分页数据
 */
export const listKnowledgeBasesByPage = async (params: {
    current: number;
    pageSize: number;
    // ...未来可添加 name, status 等查询条件
}): Promise<Page<KnowledgeBaseVO>> => {
    // 假设后端有一个分页查询接口 /api/kb/list/page/vo
    // 注意：真实后端分页接口通常用 POST + RequestBody 传递复杂查询条件
    return await apiClient.post<Page<KnowledgeBaseVO>>('/kb/list/page/vo', params) as unknown as Page<KnowledgeBaseVO>;
};


/**
 * 创建一个新的知识库
 * @param data - 创建知识库所需的数据
 * @returns 返回新创建的知识库信息
 */
export const createKnowledgeBase = async (data: KnowledgeBaseAddRequest): Promise<KnowledgeBaseVO> => {
    return await apiClient.post<KnowledgeBaseVO>('/kb/create', data) as unknown as KnowledgeBaseVO;
};

/**
 * 上传文档到指定的知识库
 *
 * @param kbId - 知识库 ID
 * @param file - 要上传的文件对象
 * @param onUploadProgress - 上传进度回调函数
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

    // 【核心修复】: apiClient.post 返回的已经是解包后的 data，其类型为 number。
    // 我们直接使用它，并构造成函数签名要求的 { documentId: number } 对象。
    const documentId = await apiClient.post<number>(
        '/kb/document/upload',
        formData,
        {
            headers: { 'Content-Type': 'multipart/form-data' },
            onUploadProgress,
        }
    );

    return { documentId };
};


/**
 * 定义文档状态的类型
 */
export interface DocumentStatusVO {
    id: number;
    status: number; // 0: PENDING, 1: PROCESSING, 2: COMPLETED, 9: FAILED
    errorMessage?: string;
}

/**
 * 根据文档ID轮询获取文档处理状态
 *
 * @param documentId - 文档ID
 * @returns 返回文档的状态信息
 */
export const getDocumentStatus = async (documentId: number): Promise<DocumentStatusVO> => {
    return await apiClient.get<DocumentStatusVO>(`/kb/document/get?id=${documentId}`) as unknown as DocumentStatusVO;
};