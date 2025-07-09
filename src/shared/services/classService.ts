// [!file src/shared/services/classService.ts]
import apiClient from '../api/apiClient';
import {ActivityPublishRequestDTO, ClassActivityVO, ClassMemberVO, ClassVO, Page, PageRequest} from '../types';
import {
    ClassCreateRequestDTO,
    ClassQueryRequestDTO,
    ClassUpdateRequestDTO,
    MemberAddRequestDTO,
    MemberQueryRequestDTO,
    MemberUpdateRequestDTO,
} from '../types/dto/course/classes'; // 假设所有相关类型都从一个统一的index导出

// ===================================================================
//  班级 (Class) 核心服务
// ===================================================================

/**
 * @description 创建一个新班级。
 * @param {ClassCreateRequestDTO} createRequest - 创建班级的请求体。
 * @returns {Promise<ClassVO>} 返回新创建班级的视图对象。
 */
export const createClass = (createRequest: ClassCreateRequestDTO): Promise<ClassVO> => {
    return apiClient.post('/classes', createRequest);
};

/**
 * @description 更新班级信息。
 * @param {number} classId - 要更新的班级ID。
 * @param {ClassUpdateRequestDTO} updateRequest - 更新请求体。
 * @returns {Promise<ClassVO>} 返回更新后的班级视图对象。
 */
export const updateClass = (classId: number, updateRequest: ClassUpdateRequestDTO): Promise<ClassVO> => {
    return apiClient.put(`/classes/${classId}`, updateRequest);
};

/**
 * @description 删除一个班级。
 * @param {number} classId - 要删除的班级ID。
 * @returns {Promise<boolean>} 返回操作是否成功。
 */
export const deleteClass = (classId: number): Promise<boolean> => {
    return apiClient.delete(`/classes/${classId}`);
};

/**
 * @description 根据ID获取班级详情。
 * @param {number} classId - 班级ID。
 * @returns {Promise<ClassVO>} 返回班级的详细视图对象。
 */
export const getClassById = (classId: number): Promise<ClassVO> => {
    return apiClient.get(`/classes/${classId}`);
};

/**
 * @description 分页查询班级列表。
 * @param {ClassQueryRequestDTO} queryRequest - 查询请求体。
 * @returns {Promise<Page<ClassVO>>} 返回班级的分页视图对象。
 */
export const listClassesByPage = (queryRequest: ClassQueryRequestDTO): Promise<Page<ClassVO>> => {
    return apiClient.post('/classes/list/page', queryRequest);
};


// ===================================================================
//  班级成员 (Member) 管理服务
// ===================================================================

/**
 * @description 向班级中添加成员。
 * @param {number} classId - 目标班级ID。
 * @param {MemberAddRequestDTO} addRequest - 添加成员的请求体。
 * @returns {Promise<ClassMemberVO>} 返回新增成员的视图对象。
 */
export const addMember = (classId: number, addRequest: MemberAddRequestDTO): Promise<ClassMemberVO> => {
    return apiClient.post(`/classes/${classId}/members`, addRequest);
};

/**
 * @description 更新班级成员信息。
 * @param {number} classId - 班级ID。
 * @param {number} userId - 要更新的成员的用户ID。
 * @param {MemberUpdateRequestDTO} updateRequest - 更新请求体。
 * @returns {Promise<ClassMemberVO>} 返回更新后的成员视图对象。
 */
export const updateMember = (classId: number, userId: number, updateRequest: MemberUpdateRequestDTO): Promise<ClassMemberVO> => {
    return apiClient.put(`/classes/${classId}/members/${userId}`, updateRequest);
};

/**
 * @description 从班级中移除成员。
 * @param {number} classId - 班级ID。
 * @param {number} userId - 要移除的用户ID。
 * @returns {Promise<boolean>} 返回操作是否成功。
 */
export const removeMember = (classId: number, userId: number): Promise<boolean> => {
    return apiClient.delete(`/classes/${classId}/members/${userId}`);
};

/**
 * @description 分页查询班级成员列表。
 * @param {number} classId - 班级ID。
 * @param {MemberQueryRequestDTO} queryRequest - 查询请求体。
 * @returns {Promise<Page<ClassMemberVO>>} 返回班级成员的分页视图对象。
 */
export const listMembersByPage = (classId: number, queryRequest: MemberQueryRequestDTO): Promise<Page<ClassMemberVO>> => {
    return apiClient.post(`/classes/${classId}/members/list/page`, queryRequest);
};


// ===================================================================
//  班级活动 (Activity) 管理服务
// ===================================================================

/**
 * @description 在班级中发布一个新活动（如作业、考试）。
 * @param {number} classId - 目标班级ID。
 * @param {ActivityPublishRequestDTO} publishRequest - 发布活动的请求体。
 * @returns {Promise<ClassActivityVO>} 返回新发布的班级活动视图对象。
 */
export const publishActivity = (classId: number, publishRequest: ActivityPublishRequestDTO): Promise<ClassActivityVO> => {
    return apiClient.post(`/classes/${classId}/activities`, publishRequest);
};

// ... 未来可在此处添加获取活动列表、更新活动等服务函数 ...