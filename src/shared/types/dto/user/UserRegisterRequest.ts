// src/shared/types/dto/user/UserRegisterRequest.ts

/**
 * @description 用户注册请求的数据传输对象（DTO）。
 * 严格对标后端的 'com.weilanx.eduspark.model.dto.user.UserRegisterRequest.java'。
 */
export interface UserRegisterRequestDTO {
    /**
     * 用户名
     * @type {string}
     */
    username: string;

    /**
     * 密码
     * @type {string}
     */
    password?: string;

    /**
     * 确认密码
     * @type {string}
     */
    checkPassword?: string;
}