// src/shared/services/courseService.ts

import apiClient from '../api/apiClient';
import {
    CourseAddRequestDTO,
    CourseBatchDeleteRequestDTO,
    CourseQueryRequestDTO,
    CourseUpdateRequestDTO,
    CourseVO,
    CourseDetail, KnowledgeBase,
} from '../types';
import { Page } from '@/shared/types';

// ===================================================================
//  课程 (Course) 本体相关服务
// ===================================================================

/**
 * @description 创建一个新课程。
 * @param {CourseAddRequestDTO} addRequest - 创建课程的请求体。
 * @returns {Promise<number>} 返回新创建课程的ID。
 */
export const addCourse = (addRequest: CourseAddRequestDTO): Promise<number> => {
    return apiClient.post('/course/add', addRequest);
};

/**
 * @description 删除一个课程（逻辑删除）。
 * @param {number} id - 要删除的课程ID。
 * @returns {Promise<boolean>} 返回操作是否成功。
 */
export const deleteCourse = (id: number): Promise<boolean> => {
    return apiClient.post('/course/delete', { id });
};

/**
 * @description 更新课程信息。
 * @param {CourseUpdateRequestDTO} updateRequest - 更新课程的请求体。
 * @returns {Promise<boolean>} 返回操作是否成功。
 */
export const updateCourse = (updateRequest: CourseUpdateRequestDTO): Promise<boolean> => {
    return apiClient.post('/course/update', updateRequest);
};

/**
 * @description 根据ID获取课程的视图对象 (VO)。
 * @param {number} id - 课程ID。
 * @returns {Promise<CourseVO>} 返回课程的视图对象。
 */
export const getCourseVOById = (id: number): Promise<CourseVO> => {
    return apiClient.get('/course/get/vo', { params: { id } });
};

/**
 * @description 分页获取课程列表 (VO)。
 * @param {CourseQueryRequestDTO} queryRequest - 查询请求体。
 * @returns {Promise<Page<CourseVO>>} 返回课程的分页视图对象。
 */
export const listCourseVOByPage = (queryRequest: CourseQueryRequestDTO): Promise<Page<CourseVO>> => {
    return apiClient.post('/course/list/page/vo', queryRequest);
};

/**
 * @description 批量删除课程。
 * @param {CourseBatchDeleteRequestDTO} deleteRequest - 包含待删除课程ID列表的请求体。
 * @returns {Promise<boolean>} 返回操作是否成功。
 */
export const batchDeleteCourses = (deleteRequest: CourseBatchDeleteRequestDTO): Promise<boolean> => {
    return apiClient.post('/course/batchDelete', deleteRequest);
};


// ===================================================================
//  课程详情 (Course Detail) 相关服务
// ===================================================================

/**
 * @description 根据课程ID获取课程详情。
 * @param {number} id - 课程ID。
 * @returns {Promise<CourseDetail>} 返回课程详情实体。
 */
export const getCourseDetail = (id: number): Promise<CourseDetail> => {
    return apiClient.get(`/course/detail/${id}`);
};

/**
 * @description 创建或更新课程详情。
 * @param {CourseDetail} courseDetail - 包含课程ID和待更新内容的课程详情对象。
 * @returns {Promise<boolean>} 返回操作是否成功。
 */
export const saveOrUpdateCourseDetail = (courseDetail: CourseDetail): Promise<boolean> => {
    return apiClient.post('/course/detail/save', courseDetail);
};

// ===================================================================
//  课程与知识库关联 (Course-KnowledgeBase Link) 相关服务
// ===================================================================

/**
 * @description 将一个或多个知识库关联到指定课程。
 * @param {number} courseId - 目标课程的ID。
 * @param {number[]} knowledgeBaseIds - 要关联的知识库ID列表。
 * @returns {Promise<void>} 操作成功则返回，失败则抛出异常。
 */
export const linkKnowledgeBasesToCourse = (courseId: number, knowledgeBaseIds: number[]): Promise<void> => {
    return apiClient.post(`/course/${courseId}/knowledge-bases`, knowledgeBaseIds);
};

/**
 * @description 解除课程与单个知识库的关联。
 * @param {number} courseId - 课程ID。
 * @param {number} knowledgeBaseId - 要解除关联的知识库ID。
 * @returns {Promise<void>} 操作成功则返回，失败则抛出异常。
 */
export const unlinkKnowledgeBaseFromCourse = (courseId: number, knowledgeBaseId: number): Promise<void> => {
    return apiClient.delete(`/course/${courseId}/knowledge-bases/${knowledgeBaseId}`);
};



/**
 * @description 获取指定课程已关联的所有知识库列表。
 * @param {number} courseId - 课程ID。
 * @returns {Promise<KnowledgeBase[]>} 返回关联的知识库实体列表。
 */
export const listLinkedKnowledgeBases = (courseId: number): Promise<KnowledgeBase[]> => {
    return apiClient.get(`/course/${courseId}/knowledge-bases`);
};