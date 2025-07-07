// src/shared/types/entity/User.ts

/**
 * @description 与后端 'com.weilanx.eduspark.model.entity.User' 类完全对应的 TypeScript 类型。
 * 注意：这代表了数据库中的完整实体，通常不直接在前端UI中使用。
 * 主要用于理解数据模型或在特定场景下进行数据转换。
 */
export interface User {
    /**
     * 用户的唯一标识符，主键
     * @type {number}
     */
    id: number;

    /**
     * 用户名，用于登录
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
     * 加盐哈希后的密码 (前端永远不应该处理或存储这个字段)
     * @type {string}
     */
    passwordHash: string;

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
    role: string;

    /**
     * 状态: 'ACTIVE', 'INACTIVE', 'BANNED'
     * @type {string}
     */
    status: string;

    /**
     * 扩展信息，如学生学号、教师职称等 (JSONB)
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

    /**
     * 更新时间 (ISO 8601 格式的字符串)
     * @type {string}
     */
    updatedAt: string;

    /**
     * 逻辑删除标记 (0: 未删除, 1: 已删除)
     * @type {number}
     */
    isDeleted: number;
}