// [!file src/features/teacher/course/course-management/sub-features/question-bank/services/questionBankService.ts]
/**
 * @file src/features/teacher/course/course-management/sub-features/question-bank/services/questionBankService.ts
 * @description 封装题库管理功能相关的 API 服务请求。
 */

import apiClient from '@/shared/api/apiClient';
import { Page, PageRequest, QuestionVO } from '../types';

/**
 * 根据知识点ID分页获取其关联的题目列表。
 * 调用后端的 POST /api/question/list/by_knowledge_point/{pointId} 接口。
 *
 * @param pointId - 知识点的ID。
 * @param pageRequest - 包含分页信息（current, pageSize）的对象。
 * @returns 返回一个 Promise，成功时解析为包含 QuestionVO 的分页对象。
 */
export const getQuestionsByPointIdPaginated = async (
    pointId: number | string,
    pageRequest: PageRequest
): Promise<Page<QuestionVO> | any> => {
    try {
        const response = await apiClient.post<Page<QuestionVO>>(
            `/question/list/by_knowledge_point/${pointId}`,
            pageRequest
        );
        return response;
    } catch (error) {
        console.error(`Failed to fetch paginated questions for knowledge point ${pointId}:`, error);
        throw error; // 由 apiClient 拦截器处理错误提示，这里向上抛出
    }
};

/**
 * 【新增】根据知识点ID获取其关联的所有题目列表 (不分页)。
 * 调用后端的 GET /api/question/list/all/by_knowledge_point/{pointId} 接口。
 *
 * @param pointId - 知识点的ID。
 * @returns 返回一个 Promise，成功时解析为 QuestionVO 数组。
 */
export const getAllQuestionsByPointId = async (
    pointId: number | string
): Promise<QuestionVO[] | any> => {
    try {
        const response = await apiClient.get<QuestionVO[]>(
            `/question/list/all/by_knowledge_point/${pointId}`
        );
        return response;
    } catch (error) {
        console.error(`Failed to fetch all questions for knowledge point ${pointId}:`, error);
        throw error;
    }
};

/**
 * 根据题目ID删除题目。
 * 调用后端的 DELETE /api/question/{id} 接口。
 *
 * @param questionId - 要删除的题目的ID。
 * @returns 返回一个 Promise，成功时解析为 boolean (true)。
 */
export const deleteQuestionById = async (questionId: number | string): Promise<boolean | any> => {
    try {
        const response = await apiClient.delete<boolean>(`/question/${questionId}`);
        return response;
    } catch (error) {
        console.error(`Failed to delete question with id ${questionId}:`, error);
        throw error;
    }
};

/**
 * 批量删除题目。
 * 调用后端的 POST /api/question/batchDelete 接口。
 *
 * @param ids - 包含待删除题目ID的数组。
 * @returns 返回一个 Promise，成功时解析为 boolean (true)。
 */
export const batchDeleteQuestions = async (ids: number[]): Promise<boolean | any> => {
    try {
        const response = await apiClient.post<boolean>('/question/batchDelete', { ids });
        return response;
    } catch (error) {
        console.error(`Failed to batch delete questions with ids [${ids.join(', ')}]:`, error);
        throw error;
    }
};