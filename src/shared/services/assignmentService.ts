// [!file src/shared/services/assignmentService.ts]
import apiClient from '../api/apiClient';
import {AssignmentVO, Page} from '../types';
import {
    AssignmentCreateRequestDTO,
    AssignmentQueryRequestDTO,
    AssignmentUpdateRequestDTO,
    QuestionLinkRequestDTO,
} from '../types/dto/assignment'; // 假设所有相关类型都从一个统一的index导出

const BASE_URL = '/assignments';

/**
 * @description 创建一个作业/考试模板。
 * @param {AssignmentCreateRequestDTO} createRequest - 创建模板的请求体。
 * @returns {Promise<AssignmentVO>} 返回新创建模板的视图对象。
 */
export const createAssignmentTemplate = (createRequest: AssignmentCreateRequestDTO): Promise<AssignmentVO> => {
    return apiClient.post(`${BASE_URL}/template`, createRequest);
};

/**
 * @description 更新一个作业/考试模板。
 * @param {number} templateId - 要更新的模板ID。
 * @param {AssignmentUpdateRequestDTO} updateRequest - 更新请求体。
 * @returns {Promise<AssignmentVO>} 返回更新后的模板视图对象。
 */
export const updateAssignmentTemplate = (templateId: number, updateRequest: AssignmentUpdateRequestDTO): Promise<AssignmentVO> => {
    return apiClient.put(`${BASE_URL}/template/${templateId}`, updateRequest);
};

/**
 * @description 删除一个作业/考试模板。
 * @param {number} templateId - 要删除的模板ID。
 * @returns {Promise<boolean>} 返回操作是否成功。
 */
export const deleteAssignmentTemplate = (templateId: number): Promise<boolean> => {
    return apiClient.delete(`${BASE_URL}/template/${templateId}`);
};

/**
 * @description 获取模板详情（含题目列表）。
 * @param {number} templateId - 模板ID。
 * @returns {Promise<AssignmentVO>} 返回模板的详细视图对象。
 */
export const getAssignmentTemplate = (templateId: number): Promise<AssignmentVO> => {
    return apiClient.get(`${BASE_URL}/template/${templateId}`);
};

/**
 * @description 分页查询课程下的模板列表。
 * @param {AssignmentQueryRequestDTO} queryRequest - 查询请求体。
 * @returns {Promise<Page<AssignmentVO>>} 返回模板的分页视图对象。
 */
export const listAssignmentTemplatesByPage = (queryRequest: AssignmentQueryRequestDTO): Promise<Page<AssignmentVO>> => {
    return apiClient.post(`${BASE_URL}/templates/list/page`, queryRequest);
};

/**
 * @description 为模板批量关联题目。
 * @param {number} templateId - 模板ID。
 * @param {QuestionLinkRequestDTO[]} linkRequests - 包含题目ID和分值的请求列表。
 * @returns {Promise<boolean>} 返回操作是否成功。
 */
export const linkQuestionsToTemplate = (templateId: number, linkRequests: QuestionLinkRequestDTO[]): Promise<boolean> => {
    return apiClient.post(`${BASE_URL}/template/${templateId}/questions`, linkRequests);
};

/**
 * @description 从模板中解除单个题目的关联。
 * @param {number} templateId - 模板ID。
 * @param {number} questionId - 要解除关联的题目ID。
 * @returns {Promise<boolean>} 返回操作是否成功。
 */
export const unlinkQuestionFromTemplate = (templateId: number, questionId: number): Promise<boolean> => {
    return apiClient.delete(`${BASE_URL}/template/${templateId}/questions/${questionId}`);
};