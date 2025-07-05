// [!file src/features/teacher/course/course-management/sub-features/question-edit/services/syllabusServiceForModal.ts]
/**
 * @file src/features/teacher/course/course-management/sub-features/question-edit/services/syllabusServiceForModal.ts
 * @description 专门为知识点选择模态框获取课程大纲的 API 服务。
 */

import apiClient from '@/shared/api/apiClient';
import {SyllabusVO} from "@/features/teacher/course/course-management/sub-features/question-edit/types";
// 导入本领域的类型定义

/**
 * 根据课程ID获取完整的课程大纲。
 * 此函数调用后端的 GET /api/syllabus/get?courseId={id} 接口。
 *
 * @param courseId - 课程的ID。
 * @returns 返回一个 Promise，成功时解析为 SyllabusVO 对象。
 */
export const getSyllabusForModal = async (courseId: string | number): Promise<SyllabusVO | any> => {
    try {
        const response = await apiClient.get<SyllabusVO>('/syllabus/get', {
            params: { courseId }
        });
        return response;
    } catch (error) {
        console.error(`Failed to fetch syllabus for modal (courseId: ${courseId}):`, error);
        throw error; // 错误由 apiClient 拦截器统一处理
    }
};