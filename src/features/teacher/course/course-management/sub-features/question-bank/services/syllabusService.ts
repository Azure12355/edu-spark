/**
 * @file src/features/teacher/course/course-management/sub-features/syllabus/services/syllabusService.ts
 * @description 封装与课程大纲相关的API请求。
 */

import apiClient from '@/shared/api/apiClient';
import {SyllabusNodeType, SyllabusVO} from "@/features/teacher/course/course-management/sub-features/syllabus/types";

/**
 * 根据课程ID获取完整的课程大纲。
 * @param courseId - 课程的ID
 * @returns 返回一个包含完整大纲树形结构的 Promise
 */
export const getSyllabusByCourseId = async (courseId: string | number): Promise<SyllabusVO | any> => {
    try {
        const response = await apiClient.get<SyllabusVO>('/syllabus/get', {
            params: { courseId }
        });
        return response;
    } catch (error) {
        console.error(`Failed to fetch syllabus for course ${courseId}:`, error);
        throw error;
    }
};

/**
 * 添加一个新的章节。
 * @param courseId - 课程ID
 * @param title - 章节标题
 * @param description - 章节描述
 * @returns 返回新创建章节的ID
 */
export const addChapter = async (courseId: number, title: string, description: string): Promise<number | any> => {
    try {
        const response = await apiClient.post<number>('/syllabus/chapter/add', { courseId, title, description });
        return response;
    } catch (error) {
        console.error('Failed to add chapter:', error);
        throw error;
    }
};

/**
 * 添加一个新的小节。
 * @param chapterId - 所属章节的ID
 * @param title - 小节标题
 * @returns 返回新创建小节的ID
 */
export const addSection = async (chapterId: number, title: string): Promise<number | any> => {
    try {
        const response = await apiClient.post<number>('/syllabus/section/add', { chapterId, title });
        return response;
    } catch (error) {
        console.error('Failed to add section:', error);
        throw error;
    }
};

/**
 * 添加一个新的知识点。
 * @param sectionId - 所属小节的ID
 * @param title - 知识点标题
 * @param type - 知识点类型
 * @returns 返回新创建知识点的ID
 */
export const addPoint = async (sectionId: number, title: string, type: '核心' | '重点' | '选学'): Promise<number | any> => {
    try {
        const response = await apiClient.post<number>('/syllabus/point/add', { sectionId, title, type });
        return response;
    } catch (error) {
        console.error('Failed to add knowledge point:', error);
        throw error;
    }
};

/**
 * 统一的更新接口，可以更新章节、小节或知识点。
 * @param type - 节点类型 ('chapter', 'section', 'point')
 * @param updateData - 包含ID和待更新字段的对象
 * @returns 返回操作是否成功的布尔值
 */
export const updateSyllabusNode = async (type: SyllabusNodeType, updateData: { id: number, [key: string]: any }): Promise<boolean | any> => {
    try {
        const response = await apiClient.post<boolean>(`/syllabus/${type}/update`, updateData);
        return response;
    } catch (error) {
        console.error(`Failed to update ${type} node:`, error);
        throw error;
    }
};

/**
 * 统一的删除接口，可以删除章节、小节或知识点。
 * @param id - 要删除的节点的ID
 * @param type - 节点类型 ('chapter', 'section', 'point')
 * @returns 返回操作是否成功的布尔值
 */
export const deleteSyllabusNode = async (id: number, type: SyllabusNodeType): Promise<boolean | any> => {
    try {
        const response = await apiClient.delete<boolean>('/syllabus/node/delete', {
            params: { id, type }
        });
        return response;
    } catch (error) {
        console.error(`Failed to delete ${type} node with id ${id}:`, error);
        throw error;
    }
};