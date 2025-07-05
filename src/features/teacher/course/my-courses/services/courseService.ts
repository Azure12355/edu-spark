/**
 * @file src/features/teacher/course/my-courses/services/.ts
 * @description 封装与课程相关的API请求。
 */

import apiClient from '@/shared/api/apiClient';
import {CourseVO, Page, CourseQueryRequest, CourseBatchDeleteRequest} from '../types';

/**
 * 分页并根据条件查询课程列表
 * @param query - 包含分页和筛选条件的对象
 * @returns 返回一个包含课程列表和分页信息的 Promise
 */
export const listCoursesByPage = async (query: CourseQueryRequest): Promise<Page<CourseVO> | any> => {
    try {
        const response = await apiClient.post<Page<CourseVO>>('/course/list/page/vo', query);
        return response;
    } catch (error) {
        console.error("Failed to fetch courses:", error);
        // 错误处理由 apiClient 的拦截器统一负责，这里只需重新抛出或返回一个空的分页对象
        return { records: [], total: 0, size: query.pageSize, current: query.current, pages: 0 };
    }
};

/**
 * 批量删除课程
 * @param courseIds - 包含待删除课程ID的列表
 * @returns 返回操作是否成功的布尔值
 */
export const batchDeleteCourses = async (courseIds: number[]): Promise<boolean | any> => {
    const requestBody: CourseBatchDeleteRequest = {
        ids: courseIds,
    };
    try {
        const response = await apiClient.post<boolean>('/course/batchDelete', requestBody);
        return response;
    } catch (error) {
        console.error("Failed to batch delete courses:", error);
        return false; // 在业务层，可以认为API调用失败即为操作失败
    }
};

/**
 * 创建一门新课程
 * @param courseData - 新课程的数据
 * @returns 返回新创建课程的ID
 */
export const createCourse = async (courseData: { name: string; description: string; term: string; }): Promise<number | any> => {
    try {
        const response = await apiClient.post<number>('/course/add', courseData);
        return response;
    } catch (error) {
        console.error("Failed to create course:", error);
        throw error; // 向上抛出错误，让调用方处理
    }
}