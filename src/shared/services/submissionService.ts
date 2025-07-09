// [!file src/shared/services/submissionService.ts]
import apiClient from '../api/apiClient';
import {
    GradingRequestDTO,
    SubmissionRequestDTO,
} from '@/shared/types';
import {SubmissionVO} from "@/shared/types"; // 假设所有相关类型都从一个统一的index导出

// 基础URL的前半部分，后半部分将动态构建
const BASE_URL = '/classes';

/**
 * @description 学生为某次班级活动提交一份答案。
 * @param {number} classId - 班级ID。
 * @param {number} activityId - 班级活动ID。
 * @param {SubmissionRequestDTO} submissionRequest - 包含答案内容的请求体。
 * @returns {Promise<SubmissionVO>} 返回提交成功后的提交记录视图对象。
 */
export const submitAnswer = (classId: number, activityId: number, submissionRequest: SubmissionRequestDTO): Promise<SubmissionVO> => {
    return apiClient.post(`${BASE_URL}/${classId}/activities/${activityId}/submissions`, submissionRequest);
};

/**
 * @description 获取当前登录学生在某次活动中的提交记录。
 * @param {number} classId - 班级ID。
 * @param {number} activityId - 班级活动ID。
 * @returns {Promise<SubmissionVO>} 返回学生的提交记录视图对象。
 */
export const getMySubmission = (classId: number, activityId: number): Promise<SubmissionVO> => {
    return apiClient.get(`${BASE_URL}/${classId}/activities/${activityId}/submissions/my`);
};

/**
 * @description (教师)获取指定学生在某次活动中的提交记录。
 * @param {number} classId - 班级ID。
 * @param {number} activityId - 班级活动ID。
 * @param {number} userId - 学生的用户ID。
 * @returns {Promise<SubmissionVO>} 返回学生的提交记录视图对象。
 */
export const getStudentSubmission = (classId: number, activityId: number, userId: number): Promise<SubmissionVO> => {
    return apiClient.get(`${BASE_URL}/${classId}/activities/${activityId}/submissions/user/${userId}`);
};

/**
 * @description (教师)批改一份提交记录。
 * @param {number} classId - 班级ID。
 * @param {number} activityId - 班级活动ID。
 * @param {number} submissionId - 要批改的提交记录ID。
 * @param {GradingRequestDTO} gradingRequest - 包含分数和评语的请求体。
 * @returns {Promise<SubmissionVO>} 返回更新后的提交记录视图对象。
 */
export const gradeSubmission = (
    classId: number,
    activityId: number,
    submissionId: number,
    gradingRequest: GradingRequestDTO
): Promise<SubmissionVO> => {
    return apiClient.put(`${BASE_URL}/${classId}/activities/${activityId}/submissions/${submissionId}/grade`, gradingRequest);
};