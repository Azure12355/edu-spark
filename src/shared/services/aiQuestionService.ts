// src/shared/services/aiQuestionService.ts

import apiClient from '../api/apiClient';
import {AIGenerationTaskCreateResponseVO, AIGenerationTaskVO, AIQuestionRecordVO,} from '../types';
import {Page} from '../types/common';
import {
    AIGenerationTaskCreateRequestDTO,
    AIQuestionImportRequestDTO,
    AIQuestionRecordQueryRequestDTO,
    AIQuestionRecordUpdateRequestDTO
} from '../types/dto/course/ai';

/**
 * @description 创建并启动一个异步的AI出题任务。
 * @param {AIGenerationTaskCreateRequestDTO} createRequest - 包含出题配置的请求体。
 * @returns {Promise<AIGenerationTaskCreateResponseVO>} 返回包含任务ID的响应。
 */
export const createGenerationTask = (createRequest: AIGenerationTaskCreateRequestDTO): Promise<AIGenerationTaskCreateResponseVO> => {
    return apiClient.post('/ai/questions/generate-task', createRequest);
};

/**
 * @description 查询一个AI出题任务的当前状态（用于轮询）。
 * @param {string} taskId - 任务的UUID。
 * @returns {Promise<AIGenerationTaskVO>} 返回任务的状态视图对象。
 */
export const getGenerationTaskStatus = (taskId: string): Promise<AIGenerationTaskVO> => {
    return apiClient.get(`/ai/questions/generate-task/${taskId}`);
};

/**
 * @description 获取单个AI生成的题目记录的详细信息。
 * @param {number} recordId - AI题目记录的ID。
 * @returns {Promise<AIQuestionRecordVO>} 返回包含完整聚合信息的AI题目记录视图对象。
 */
export const getAIQuestionRecordById = (recordId: number): Promise<AIQuestionRecordVO> => {
    return apiClient.get(`/ai/questions/${recordId}`);
};

/**
 * @description 分页查询AI生成的题目记录。
 * @param {AIQuestionRecordQueryRequestDTO} queryRequest - 包含分页、筛选、排序条件的查询请求体。
 * @returns {Promise<Page<AIQuestionRecordVO>>} 返回AI题目记录的分页视图对象。
 */
export const listAIQuestionRecordsByPage = (queryRequest: AIQuestionRecordQueryRequestDTO): Promise<Page<AIQuestionRecordVO>> => {
    return apiClient.post('/ai/questions/list/page', queryRequest);
};

/**
 * @description 更新一条AI生成的题目记录。
 * @param {number} recordId - 要更新的记录ID。
 * @param {AIQuestionRecordUpdateRequestDTO} updateRequest - 包含待更新字段的请求体。
 * @returns {Promise<boolean>} 返回操作是否成功。
 */
export const updateAIQuestionRecord = (recordId: number, updateRequest: AIQuestionRecordUpdateRequestDTO): Promise<boolean> => {
    return apiClient.put(`/ai/questions/${recordId}`, updateRequest);
};

/**
 * @description 丢弃一条AI生成的题目记录（逻辑删除或状态变更）。
 * @param {number} recordId - 要丢弃的记录ID。
 * @returns {Promise<boolean>} 返回操作是否成功。
 */
export const discardAIQuestionRecord = (recordId: number): Promise<boolean> => {
    return apiClient.delete(`/ai/questions/${recordId}`);
};

/**
 * @description 将审核通过的AI题目批量导入到正式题库。
 * @param {AIQuestionImportRequestDTO} importRequest - 包含待导入记录ID列表的请求体。
 * @returns {Promise<number>} 返回成功导入的题目数量。
 */
export const importQuestionsToBank = (importRequest: AIQuestionImportRequestDTO): Promise<number> => {
    return apiClient.post('/ai/questions/import', importRequest);
};