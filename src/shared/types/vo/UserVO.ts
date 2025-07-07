// src/shared/types/vo/UserVO.ts

/**
 * @description 用户视图对象（VO），用于安全地在前端展示用户信息。
 * 严格对标后端的 'com.weilanx.eduspark.model.vo.UserVO.java'。
 * 这是从API获取用户信息时推荐使用的类型。
 */
export interface UserVO {
    /**
     * 用户的唯一标识符
     * @type {number}
     */
    id: number;

    /**
     * 用户名
     * @type {string}
     */
    username: string;

    /**
     * 用户邮箱
     * @type {string | null}
     */
    email?: string;

    /**
     * 用户手机号
     * @type {string | null}
     */
    phoneNumber?: string;

    /**
     * 用户昵称
     * @type {string}
     */
    nickname: string;

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

    /**
     * 角色: 'STUDENT', 'TEACHER', 'ADMIN'
     * @type {string}
     */
    role: 'STUDENT' | 'TEACHER' | 'ADMIN';

    /**
     * 状态: 'ACTIVE', 'INACTIVE', 'BANNED'
     * @type {string}
     */
    status: 'ACTIVE' | 'INACTIVE' | 'BANNED';

    /**
     * 扩展信息，如学生学号、教师职称等
     * @type {Record<string, any> | null}
     */
    metadata?: Record<string, any>;

    /**
     * 最后登录时间 (ISO 8601 格式的字符串)
     * @type {string | null}
     */
    lastLoginAt?: string;

    /**
     * 创建时间 (ISO 8601 格式的字符串)
     * @type {string}
     */
    createdAt: string;
}