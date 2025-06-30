import apiClient from './apiClient'; // 引入我们配置好的 Axios 实例

// ===================================================================
//  类型定义 (与后端 DTO 和 VO 对齐)
// ===================================================================

/**
 * 用户视图对象 (VO) - 用于安全地展示用户信息
 * 与后端的 UserVO.java 对应
 */
export interface UserVO {
    id: number;
    username: string;
    email?: string;
    phoneNumber?: string;
    nickname: string;
    avatarUrl?: string;
    bio?: string;
    role: 'STUDENT' | 'TEACHER' | 'ADMIN';
    status: 'ACTIVE' | 'INACTIVE' | 'BANNED';
    metadata?: any;
    lastLoginAt?: string; // ISO Date String
    createdAt: string; // ISO Date String
}

/**
 * 用户登录请求体 (DTO)
 * 与后端的 UserLoginRequest.java 对应
 */
export interface UserLoginRequest {
    account: string; // 可以是 username, email, or phone
    password?: string;
}

/**
 * 用户注册请求体 (DTO)
 * 与后端的 UserRegisterRequest.java 对应
 */
export interface UserRegisterRequest {
    username: string;
    password?: string;
    checkPassword?: string;
}

// ===================================================================
//  API 调用函数
// ===================================================================

/**
 * 用户登录
 * @param loginRequest - 包含账户和密码的登录信息
 * @returns 返回脱敏后的用户信息 (UserVO)
 */
export const login = async (loginRequest: UserLoginRequest): Promise<UserVO | any> => {
    return apiClient.post<UserVO>('/user/login', loginRequest);
};

/**
 * 用户注册
 * @param registerRequest - 包含用户名、密码和确认密码的注册信息
 * @returns 返回新用户的 ID
 */
export const register = async (registerRequest: UserRegisterRequest): Promise<number | any> => {
    return apiClient.post<number>('/user/register', registerRequest);
};

/**
 * 获取当前登录的用户信息
 * @returns 返回当前登录用户的脱敏信息 (UserVO)
 */
export const getLoginUser = async (): Promise<UserVO | any> => {
    return apiClient.get<UserVO>('/user/get/login');
};

/**
 * 用户注销
 * @returns 返回操作是否成功
 */
export const logout = async (): Promise<boolean | any> => {
    return apiClient.post<boolean>('/user/logout');
};

/**
 * 更新用户信息
 * 注意：后端需要实现 UserUpdateRequest DTO
 *
 * @param updateData - 包含要更新字段的对象
 * @returns 返回操作是否成功
 */
// export const updateUser = async (updateData: Partial<UserVO>): Promise<boolean> => {
//     return apiClient.post<boolean>('/user/update', updateData);
// };