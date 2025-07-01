import apiClient from '../../../../../shared/api/apiClient';
import { Page } from '@/features/teacher/knowledge/knowledge-list/services/knowledgeService'; // 复用已有的Page类型

// 1. 定义与后端 DocumentVO.java 精确匹配的类型
export interface DocumentVO {
    id: number;
    knowledgeBaseId: number;
    name: string;
    type: string;
    size: number;
    status: number; // 0(待处理), 1(处理中), 2(完毕), 9(失败)
    sliceCount: number;
    cosUrl: string;
    errorMessage?: string;
    createdAt: string; // ISO Date String
}

// 2. 定义列表查询的请求参数类型
export interface DocumentQueryRequest {
    kbId: number | string;
    current: number;
    pageSize: number;
    // 未来可扩展的筛选参数
    name?: string;
    status?: number;
}

// 3. 定义批量删除的请求体类型
export interface DeleteDocumentsRequest {
    ids: number[];
}


/**
 * @description 分页获取指定知识库下的文档列表
 * @param params - 查询参数，包括知识库ID, 页码, 每页数量等
 * @returns 返回文档的分页数据
 */
export const listDocumentsByKbId = (params: DocumentQueryRequest): Promise<Page<DocumentVO>> => {
    return apiClient.get('/kb/document/list/page', { params });
};


/**
 * @description 批量删除文档
 * @param data - 包含要删除的文档ID数组
 * @returns 返回操作是否成功
 */
export const deleteDocuments = (data: DeleteDocumentsRequest): Promise<boolean> => {
    // 【后端注意】: 此接口需要您在后端实现。
    // 建议的 Controller 方法签名如下：
    // @PostMapping("/document/delete")
    // public BaseResponse<Boolean> deleteDocuments(@RequestBody DeleteRequest deleteRequest) { ... }
    // 其中 DeleteRequest 可以是 { private List<Long> ids; }
    return apiClient.post('/kb/document/delete', data);
};

// ... 未来可以添加其他文档相关的 service, 如重新处理文档等 ...