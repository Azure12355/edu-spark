/**
 * @file src/features/teacher/course/course-management/sub-features/introduction/services/introductionService.ts
 * @description 封装获取课程介绍页面所需数据的API请求。
 */

import apiClient from '@/shared/api/apiClient';
import { CourseVO, CourseDetail } from '../types';

/**
 * 根据课程ID获取课程的核心信息 (VO)。
 * 对应后端的 GET /api/course/get/vo?id={id}
 *
 * @param courseId - 课程的ID
 * @returns 返回一个 Promise，成功时解析为 CourseVO 对象。
 */
export const getCourseVOById = async (courseId: string | number): Promise<CourseVO | any> => {
    try {
        const response = await apiClient.get<CourseVO>(`/course/get/vo`, {
            params: { id: courseId }
        });
        return response;
    } catch (error) {
        console.error(`Failed to fetch course VO for id ${courseId}:`, error);
        throw error; // 错误由 apiClient 拦截器处理，这里向上抛出以中断调用链
    }
};

/**
 * 根据课程ID获取课程的详细描述信息。
 * 对应后端的 GET /api/course/detail/{id}
 *
 * @param courseId - 课程的ID
 * @returns 返回一个 Promise，成功时解析为 CourseDetail 对象。
 */
export const getCourseDetailById = async (courseId: string | number): Promise<CourseDetail | any> => {
    try {
        const response = await apiClient.get<CourseDetail>(`/course/detail/${courseId}`);
        return response;
    } catch (error) {
        console.error(`Failed to fetch course detail for id ${courseId}:`, error);
        // 如果详情不存在，后端会返回404，拦截器会处理。
        // 如果是其他错误，也向上抛出。
        throw error;
    }
};