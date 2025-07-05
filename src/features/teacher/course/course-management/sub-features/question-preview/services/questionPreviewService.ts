// [!file src/features/teacher/course/course-management/sub-features/question-preview/services/questionPreviewService.ts]
/**
 * @file src/features/teacher/course/course-management/sub-features/question-preview/services/questionPreviewService.ts
 * @description 封装题目预览功能相关的 API 服务请求。
 */

import apiClient from '@/shared/api/apiClient';
import { QuestionVO } from '../types';

/**
 * 根据题目ID获取其详细的视图对象 (VO)，用于预览页面展示。
 * 调用后端的 GET /api/question/{id} 接口。
 *
 * @param questionId - 要预览的题目的ID。
 * @returns 返回一个 Promise，成功时解析为 QuestionVO 对象。
 */
export const getQuestionForPreview = async (
    questionId: number | string
): Promise<QuestionVO | any> => {
    try {
        // 使用模板字符串构建 URL，确保 ID 被正确替换
        const response = await apiClient.get<QuestionVO>(`/question/${questionId}`);
        return response;
    } catch (error) {
        // apiClient 的拦截器会处理通用的错误提示，这里只记录日志并向上抛出
        console.error(`Failed to fetch question for preview with id ${questionId}:`, error);
        throw error;
    }
};