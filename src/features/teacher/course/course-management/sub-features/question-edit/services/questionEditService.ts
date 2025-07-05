// [!file src/features/teacher/course/course-management/sub-features/question-edit/services/questionEditService.ts]
/**
 * @file src/features/teacher/course/course-management/sub-features/question-edit/services/questionEditService.ts
 * @description 封装题目创建与编辑功能相关的 API 服务请求。
 */

import apiClient from '@/shared/api/apiClient';
import { QuestionAddRequestDTO, QuestionUpdateRequestDTO, QuestionForEditVO } from '../types';

/**
 * 【编辑模式】根据题目ID获取其详细信息，用于初始化编辑页面。
 * 调用后端的 GET /api/question/{id} 接口。
 *
 * @param questionId - 要编辑的题目的ID。
 * @returns 返回一个 Promise，成功时解析为 QuestionForEditVO 对象。
 */
export const getQuestionForEdit = async (
    questionId: number | string
): Promise<QuestionForEditVO | any> => {
    try {
        const response = await apiClient.get<QuestionForEditVO>(`/question/${questionId}`);
        return response;
    } catch (error) {
        console.error(`Failed to fetch question for edit with id ${questionId}:`, error);
        throw error;
    }
};

/**
 * 【创建模式】创建一个新题目。
 * 调用后端的 POST /api/question/add 接口。
 *
 * @param addDto - 包含新题目所有信息的 DTO 对象。
 * @returns 返回一个 Promise，成功时解析为新创建题目的 ID (number)。
 */
export const createQuestion = async (
    addDto: QuestionAddRequestDTO
): Promise<number | any> => {
    try {
        const response = await apiClient.post<number>('/question/add', addDto);
        return response;
    } catch (error) {
        console.error('Failed to create new question:', error);
        throw error;
    }
};

/**
 * 【编辑模式】更新一个已存在的题目。
 * 调用后端的 PUT /api/question/update 接口。
 *
 * @param updateDto - 包含题目 ID 和待更新字段的 DTO 对象。
 * @returns 返回一个 Promise，成功时解析为 boolean (true)。
 */
export const updateQuestion = async (
    updateDto: QuestionUpdateRequestDTO
): Promise<boolean | any> => {
    if (!updateDto.id) {
        throw new Error("更新题目时必须提供 ID。");
    }
    try {
        const response = await apiClient.put<boolean>('/question/update', updateDto);
        return response;
    } catch (error) {
        console.error(`Failed to update question with id ${updateDto.id}:`, error);
        throw error;
    }
};