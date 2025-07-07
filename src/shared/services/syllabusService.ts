// src/shared/services/syllabusService.ts

import apiClient from '../api/apiClient';
import {
    SyllabusVO,
    ChapterAddRequestDTO,
    ChapterUpdateRequestDTO,
    SectionAddRequestDTO,
    SectionUpdateRequestDTO,
    PointAddRequestDTO,
    PointUpdateRequestDTO,
    KnowledgePointDetailVO,
} from '../types';

type SyllabusNodeType = 'chapter' | 'section' | 'point';

/**
 * @description 根据课程ID获取完整的教学大纲视图。
 * @param {number} courseId - 课程ID。
 * @returns {Promise<SyllabusVO>} 返回完整的大纲视图对象。
 */
export const getSyllabusByCourseId = (courseId: number): Promise<SyllabusVO> => {
    return apiClient.get('/syllabus/get', { params: { courseId } });
};

// ===================================================================
//  章节 (Chapter) 管理
// ===================================================================

/**
 * @description 添加一个新的课程章节。
 * @param {ChapterAddRequestDTO} addRequest - 章节添加请求体。
 * @returns {Promise<number>} 返回新创建章节的ID。
 */
export const addChapter = (addRequest: ChapterAddRequestDTO): Promise<number> => {
    return apiClient.post('/syllabus/chapter/add', addRequest);
};

/**
 * @description 更新一个章节的信息。
 * @param {ChapterUpdateRequestDTO} updateRequest - 章节更新请求体。
 * @returns {Promise<boolean>} 返回操作是否成功。
 */
export const updateChapter = (updateRequest: ChapterUpdateRequestDTO): Promise<boolean> => {
    return apiClient.post('/syllabus/chapter/update', updateRequest);
};

// ===================================================================
//  小节 (Section) 管理
// ===================================================================

/**
 * @description 添加一个新的课程小节。
 * @param {SectionAddRequestDTO} addRequest - 小节添加请求体。
 * @returns {Promise<number>} 返回新创建小节的ID。
 */
export const addSection = (addRequest: SectionAddRequestDTO): Promise<number> => {
    return apiClient.post('/syllabus/section/add', addRequest);
};

/**
 * @description 更新一个小节的信息。
 * @param {SectionUpdateRequestDTO} updateRequest - 小节更新请求体。
 * @returns {Promise<boolean>} 返回操作是否成功。
 */
export const updateSection = (updateRequest: SectionUpdateRequestDTO): Promise<boolean> => {
    return apiClient.post('/syllabus/section/update', updateRequest);
};

// ===================================================================
//  知识点 (Point) 管理
// ===================================================================

/**
 * @description 添加一个新的知识点。
 * @param {PointAddRequestDTO} addRequest - 知识点添加请求体。
 * @returns {Promise<number>} 返回新创建知识点的ID。
 */
export const addPoint = (addRequest: PointAddRequestDTO): Promise<number> => {
    return apiClient.post('/syllabus/point/add', addRequest);
};

/**
 * @description 更新一个知识点的信息。
 * @param {PointUpdateRequestDTO} updateRequest - 知识点更新请求体。
 * @returns {Promise<boolean>} 返回操作是否成功。
 */
export const updatePoint = (updateRequest: PointUpdateRequestDTO): Promise<boolean> => {
    return apiClient.post('/syllabus/point/update', updateRequest);
};

/**
 * @description 根据知识点ID获取其详细信息（包含层级路径）。
 * @param {number} pointId - 知识点ID。
 * @returns {Promise<KnowledgePointDetailVO>} 返回知识点详情视图对象。
 */
export const getKnowledgePointDetail = (pointId: number): Promise<KnowledgePointDetailVO> => {
    return apiClient.get(`/syllabus/point/${pointId}/detail`);
};

// ===================================================================
//  统一删除接口
// ===================================================================

/**
 * @description 统一删除大纲节点 (章节、小节、知识点)，后端会处理级联删除。
 * @param {number} id - 要删除的节点的ID。
 * @param {SyllabusNodeType} type - 节点类型 ('chapter', 'section', 'point')。
 * @returns {Promise<boolean>} 返回操作是否成功。
 */
export const deleteSyllabusNode = (id: number, type: SyllabusNodeType): Promise<boolean> => {
    return apiClient.delete('/syllabus/node/delete', {
        params: { id, type }
    });
};