// [!file src/shared/services/classActivityService.ts]
import apiClient from '../api/apiClient';
import {ClassActivityVO, Page} from '../types';
import {
    ActivityPublishRequestDTO,
    ActivityQueryRequestDTO,
    ActivityUpdateRequestDTO,
} from '../types/dto/activity'; // 假设所有相关类型都从一个统一的index导出

// 基础URL的前半部分，后半部分将动态构建
const BASE_URL = '/classes';

/**
 * @description 在指定班级中发布一个新活动。
 * @param {number} classId - 目标班级ID。
 * @param {ActivityPublishRequestDTO} publishRequest - 发布活动的请求体。
 * @returns {Promise<ClassActivityVO>} 返回新发布的班级活动视图对象。
 */
export const publishActivity = (classId: number, publishRequest: ActivityPublishRequestDTO): Promise<ClassActivityVO> => {
    return apiClient.post(`${BASE_URL}/${classId}/activities`, publishRequest);
};

/**
 * @description 更新一个班级活动的信息。
 * @param {number} classId - 活动所属的班级ID。
 * @param {number} activityId - 要更新的班级活动ID。
 * @param {ActivityUpdateRequestDTO} updateRequest - 更新请求体。
 * @returns {Promise<ClassActivityVO>} 返回更新后的活动视图对象。
 */
export const updateActivity = (classId: number, activityId: number, updateRequest: ActivityUpdateRequestDTO): Promise<ClassActivityVO> => {
    return apiClient.put(`${BASE_URL}/${classId}/activities/${activityId}`, updateRequest);
};

/**
 * @description 删除或撤回一个班级活动。
 * @param {number} classId - 活动所属的班级ID。
 * @param {number} activityId - 要删除的活动ID。
 * @returns {Promise<boolean>} 返回操作是否成功。
 */
export const deleteActivity = (classId: number, activityId: number): Promise<boolean> => {
    return apiClient.delete(`${BASE_URL}/${classId}/activities/${activityId}`);
};

/**
 * @description 获取单个班级活动的详细信息。
 * @param {number} classId - 活动所属的班级ID。
 * @param {number} activityId - 活动ID。
 * @returns {Promise<ClassActivityVO>} 返回活动的详细视图对象。
 */
export const getClassActivity = (classId: number, activityId: number): Promise<ClassActivityVO> => {
    return apiClient.get(`${BASE_URL}/${classId}/activities/${activityId}`);
};

/**
 * @description 分页查询指定班级下的活动列表。
 * @param {number} classId - 班级ID。
 * @param {ActivityQueryRequestDTO} queryRequest - 查询请求体。
 * @returns {Promise<Page<ClassActivityVO>>} 返回班级活动的分页视图对象。
 */
export const listActivitiesByPage = (classId: number, queryRequest: ActivityQueryRequestDTO): Promise<Page<ClassActivityVO>> => {
    return apiClient.post(`${BASE_URL}/${classId}/activities/list/page`, queryRequest);
};