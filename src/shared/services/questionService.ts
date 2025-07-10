// src/shared/services/questionService.ts

import apiClient from '../api/apiClient';
import { Page, PageRequest } from '../types/common';
import {
    QuestionAddRequestDTO,
    QuestionBatchDeleteRequestDTO, QuestionQueryRequestDTO,
    QuestionUpdateRequestDTO
} from "@/shared/types/dto/course/question";
import {QuestionVO} from "@/shared/types";

/**
 * @description 创建一个新题目。
 * @param {QuestionAddRequestDTO} addRequest - 包含新题目信息的请求体。
 * @returns {Promise<number>} 返回新创建题目的ID。
 */
export const addQuestion = (addRequest: QuestionAddRequestDTO): Promise<number> => {
    return apiClient.post('/question/add', addRequest);
};

/**
 * @description 更新一个已存在的题目。
 * @param {QuestionUpdateRequestDTO} updateRequest - 包含题目ID和待更新字段的请求体。
 * @returns {Promise<boolean>} 返回操作是否成功。
 */
export const updateQuestion = (updateRequest: QuestionUpdateRequestDTO): Promise<boolean> => {
    return apiClient.put('/question/update', updateRequest);
};

/**
 * @description 根据ID删除一个题目。
 * @param {number} id - 要删除的题目ID。
 * @returns {Promise<boolean>} 返回操作是否成功。
 */
export const deleteQuestion = (id: number): Promise<boolean> => {
    return apiClient.delete(`/question/${id}`);
};

/**
 * @description 批量删除题目。
 * @param {QuestionBatchDeleteRequestDTO} deleteRequest - 包含待删除题目ID列表的请求体。
 * @returns {Promise<boolean>} 返回操作是否成功。
 */
export const batchDeleteQuestions = (deleteRequest: QuestionBatchDeleteRequestDTO): Promise<boolean> => {
    // 后端接口是 POST，所以我们使用 post 方法
    return apiClient.post('/question/batchDelete', deleteRequest);
};

/**
 * @description 根据ID获取单个题目的详细视图对象 (VO)。
 * @param {number} id - 题目ID。
 * @returns {Promise<QuestionVO>} 返回题目的详细视图对象。
 */
export const getQuestionVOById = (id: number): Promise<QuestionVO> => {
    return apiClient.get(`/question/${id}`);
};

/**
 * @description 分页获取题目列表 (VO)。
 * @param {QuestionQueryRequestDTO} queryRequest - 包含分页、筛选和排序条件的请求体。
 * @returns {Promise<Page<QuestionVO>>} 返回题目的分页视图对象。
 */
export const listQuestionVOByPage = (queryRequest: QuestionQueryRequestDTO): Promise<Page<QuestionVO>> => {
    return apiClient.post('/question/list/page/vo', queryRequest);
};

/**
 * @description 根据知识点ID分页查询所有关联的题目 (VO)。
 * @param {number} pointId - 知识点ID。
 * @param {PageRequest} pageRequest - 通用的分页请求对象。
 * @returns {Promise<Page<QuestionVO>>} 返回关联题目的分页视图对象。
 */
export const listQuestionsByKnowledgePoint = (pointId: number, pageRequest: PageRequest): Promise<Page<QuestionVO>> => {
    return apiClient.post(`/question/list/by_knowledge_point/${pointId}`, pageRequest);
};

/**
 * @description 根据知识点ID获取所有关联的题目列表 (不分页)。
 * @param {number} pointId - 知识点ID。
 * @returns {Promise<QuestionVO[]>} 返回关联题目的视图对象列表。
 */
export const listAllQuestionsByKnowledgePoint = (pointId: number): Promise<QuestionVO[]> => {
    return apiClient.get(`/question/list/all/by_knowledge_point/${pointId}`);
};