// [!file src/features/teacher/course/course-management/sub-features/point-edit/services/pointEditService.ts]
/**
 * @file src/features/teacher/course/course-management/sub-features/point-edit/services/pointEditService.ts
 * @description 封装知识点编辑页面相关的 API 服务请求。
 */

import apiClient from '@/shared/api/apiClient';
import { KnowledgePointDetailVO, PointUpdateRequestDTO } from '../types';

/**
 * 根据知识点ID获取其完整的详细信息，用于编辑页面的数据初始化。
 * 此函数调用后端的 GET /api/syllabus/point/{pointId}/detail 接口。
 *
 * @param pointId - 知识点的ID。
 * @returns 返回一个 Promise，成功时解析为 KnowledgePointDetailVO 对象。
 */
export const getPointForEdit = async (pointId: number | string): Promise<KnowledgePointDetailVO | any> => {
    try {
        const response = await apiClient.get<KnowledgePointDetailVO>(`/syllabus/point/${pointId}/detail`);
        return response;
    } catch (error) {
        console.error(`Failed to fetch knowledge point for editing (id: ${pointId}):`, error);
        throw error;
    }
};

/**
 * 更新知识点信息。
 * 此函数调用后端的 POST /api/syllabus/point/update 接口。
 *
 * @param updateDto - 包含知识点 ID 和待更新字段的 DTO 对象。
 * @returns 返回一个 Promise，成功时解析为 boolean (true)。
 */
export const savePointChanges = async (updateDto: PointUpdateRequestDTO): Promise<boolean | any> => {
    if (!updateDto.id) {
        throw new Error("更新知识点时必须提供 ID。");
    }

    try {
        const response = await apiClient.post<boolean>('/syllabus/point/update', updateDto);
        return response;
    } catch (error) {
        console.error(`Failed to save changes for knowledge point (id: ${updateDto.id}):`, error);
        throw error;
    }
};