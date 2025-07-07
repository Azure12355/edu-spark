// src/shared/services/userService.ts

import apiClient from '../api/apiClient';
import {
    UserVO,
    UserLoginRequestDTO,
    UserRegisterRequestDTO,
    UserUpdateRequestDTO,
    UserQueryRequestDTO,
} from '../types';
import { Page } from '@/shared/types'; // 引入通用的分页响应类型

/**
 * @description 用户登录。
 * @param {UserLoginRequestDTO} loginRequest - 登录请求体。
 * @returns {Promise<UserVO>} 返回脱敏后的用户信息 (UserVO)。
 */
export const login = (loginRequest: UserLoginRequestDTO): Promise<UserVO> => {
    return apiClient.post('/user/login', loginRequest);
};

/**
 * @description 用户注册。
 * @param {UserRegisterRequestDTO} registerRequest - 注册请求体。
 * @returns {Promise<number>} 返回新用户的 ID。
 */
export const register = (registerRequest: UserRegisterRequestDTO): Promise<number> => {
    return apiClient.post('/user/register', registerRequest);
};

/**
 * @description 获取当前登录的用户信息。
 * @returns {Promise<UserVO>} 返回当前登录用户的脱敏信息 (UserVO)。
 */
export const getLoginUser = (): Promise<UserVO> => {
    return apiClient.get('/user/get/login');
};

/**
 * @description 用户注销。
 * @returns {Promise<boolean>} 返回操作是否成功。
 */
export const logout = (): Promise<boolean> => {
    return apiClient.post('/user/logout');
};

/**
 * @description 更新用户信息 (只能由本人或管理员操作)。
 * @param {UserUpdateRequestDTO} updateRequest - 更新请求体。
 * @returns {Promise<boolean>} 返回操作是否成功。
 */
export const updateUser = (updateRequest: UserUpdateRequestDTO): Promise<boolean> => {
    return apiClient.post('/user/update', updateRequest);
};

/**
 * @description 分页获取用户列表 (仅管理员)。
 * @param {UserQueryRequestDTO} queryRequest - 查询请求体，包含分页、筛选和排序信息。
 * @returns {Promise<Page<UserVO>>} 返回用户视图对象的分页结果。
 */
export const listUsersByPage = (queryRequest: UserQueryRequestDTO): Promise<Page<UserVO>> => {
    return apiClient.post('/user/list/page', queryRequest);
};

/**
 * @description 删除用户 (仅管理员)。
 * 这是一个通用的删除请求，可以被其他服务复用。
 * @param {number} userId - 要删除的用户的ID。
 * @returns {Promise<boolean>} 返回操作是否成功。
 */
export const deleteUser = (userId: number): Promise<boolean> => {
    // 后端的 /user/delete 接口接收一个包含 id 的 JSON 对象
    return apiClient.post('/user/delete', { id: userId });
};