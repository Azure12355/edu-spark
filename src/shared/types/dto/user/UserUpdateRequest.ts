// src/shared/types/dto/user/UserUpdateRequest.ts

/**
 * @description 用户更新请求的数据传输对象（DTO）。
 * 严格对标后端的 'com.weilanx.eduspark.model.dto.user.UserUpdateRequest.java'。
 */
export interface UserUpdateRequestDTO {
    /**
     * 用户ID (用于指定要更新的用户)
     * @type {number}
     */
    id: number;

    /**
     * 用户昵称
     * @type {string | null}
     */
    nickname?: string;

    /**
     * 用户头像图片的URL
     * @type {string | null}
     */
    avatarUrl?: string;

    /**
     * 个人简介
     * @type {string | null}
     */
    bio?: string;
}