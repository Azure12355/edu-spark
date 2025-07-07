// src/shared/types/dto/user/UserLoginRequest.ts

/**
 * @description 用户登录请求的数据传输对象（DTO）。
 * 严格对标后端的 'com.weilanx.eduspark.model.dto.user.UserLoginRequest.java'。
 */
export interface UserLoginRequestDTO {
    /**
     * 用户名、邮箱或手机号
     * @type {string}
     */
    account: string;

    /**
     * 密码
     * @type {string}
     */
    password?: string; // 密码在某些登录场景下（如验证码登录）可能不是必需的
}