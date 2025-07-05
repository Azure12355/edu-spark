// [!file src/features/teacher/course/course-management/sub-features/point-detail/services/pointDetailService.ts]
/**
 * @file src/features/teacher/course/course-management/sub-features/point-detail/services/pointDetailService.ts
 * @description 封装与知识点详情相关的 API 服务请求。
 */

import apiClient from '@/shared/api/apiClient';
// [!code focus:start]
import { KnowledgePointDetailVO, PointUpdateRequest } from '../types';
// [!code focus:end]

/**
 * 更新一个知识点的详细信息。
 * 此函数对应后端的 POST /api/syllabus/point/update 接口。
 *
 * @param updateData - 包含知识点 ID 和待更新字段的对象。
 * @returns 返回一个 Promise，成功时解析为 boolean (true)，失败时由 apiClient 拦截器处理。
 */
export const updatePointDetail = async (updateData: PointUpdateRequest): Promise<boolean | any> => {
    // 基础校验：确保更新请求中必须包含 ID
    if (!updateData.id) {
        throw new Error("更新知识点时必须提供知识点ID。");
    }

    try {
        const response = await apiClient.post<boolean>('/syllabus/point/update', updateData);
        return response; // 成功时，拦截器会直接返回 true
    } catch (error) {
        // apiClient 的拦截器会处理错误弹窗，这里只需确保错误能被上层逻辑捕获
        console.error(`Failed to update knowledge point with id ${updateData.id}:`, error);
        throw error;
    }
};

// [!code focus:start]
/**
 * 根据知识点ID获取其详细视图对象 (VO)。
 * 此方法会调用后端的 GET /api/syllabus/point/{pointId}/detail 接口。
 *
 * @param pointId - 知识点ID。
 * @returns 返回一个 Promise，成功时解析为 KnowledgePointDetailVO 对象。
 */
export const getKnowledgePointDetail = async (pointId: number | string): Promise<KnowledgePointDetailVO | any> => {
    try {
        const response = await apiClient.get<KnowledgePointDetailVO>(`/syllabus/point/${pointId}/detail`);
        return response;
    } catch (error) {
        // apiClient 的拦截器会处理错误弹窗，这里向上抛出，让 Hook 处理具体的错误状态
        console.error(`Failed to fetch knowledge point detail for id ${pointId}:`, error);
        throw error;
    }
};
// [!code focus:end]