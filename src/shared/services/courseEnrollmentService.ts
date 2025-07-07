// src/shared/services/courseEnrollmentService.ts

import apiClient from '../api/apiClient';
import { EnrollmentAddRequestDTO, CourseVO, UserVO } from '../types';

/**
 * @description 学生报名课程。
 * @param {EnrollmentAddRequestDTO} addRequest - 包含 courseId 的请求体。
 * @returns {Promise<boolean>} 返回操作是否成功。
 */
export const enrollCourse = (addRequest: EnrollmentAddRequestDTO): Promise<boolean> => {
    return apiClient.post('/enrollment/enroll', addRequest);
};

/**
 * @description 学生退出课程。
 * @param {EnrollmentAddRequestDTO} addRequest - 包含 courseId 的请求体。
 * @returns {Promise<boolean>} 返回操作是否成功。
 */
export const unenrollCourse = (addRequest: EnrollmentAddRequestDTO): Promise<boolean> => {
    return apiClient.post('/enrollment/unenroll', addRequest);
};

/**
 * @description 获取指定课程的学生列表。
 * @param {number} courseId - 课程ID。
 * @returns {Promise<UserVO[]>} 返回学生视图对象（UserVO）的列表。
 */
export const listStudentsByCourse = (courseId: number): Promise<UserVO[]> => {
    return apiClient.get(`/enrollment/course/${courseId}/students`);
};

/**
 * @description 获取指定用户报名的所有课程。
 * @param {number} userId - 用户ID。
 * @returns {Promise<CourseVO[]>} 返回课程视图对象（CourseVO）的列表。
 */
export const listCoursesByUser = (userId: number): Promise<CourseVO[]> => {
    return apiClient.get(`/enrollment/user/${userId}/courses`);
};

/**
 * @description (管理员/教师)将用户添加到课程。
 * @param {EnrollmentAddRequestDTO} addRequest - 包含 courseId, userId, role 的请求体。
 * @returns {Promise<boolean>} 返回操作是否成功。
 */
export const addUserToCourse = (addRequest: EnrollmentAddRequestDTO): Promise<boolean> => {
    return apiClient.post('/enrollment/admin/addUser', addRequest);
};

/**
 * @description (管理员/教师)从课程移除用户。
 * @param {EnrollmentAddRequestDTO} addRequest - 包含 courseId, userId 的请求体。
 * @returns {Promise<boolean>} 返回操作是否成功。
 */
export const removeUserFromCourse = (addRequest: EnrollmentAddRequestDTO): Promise<boolean> => {
    return apiClient.post('/enrollment/admin/removeUser', addRequest);
};