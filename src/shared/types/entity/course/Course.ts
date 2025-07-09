// src/shared/types/entity/Course.ts

/**
 * @description 与后端 'com.weilanx.eduspark.model.entity.Course' 类完全对应的 TypeScript 类型。
 * 代表数据库中的完整课程实体。
 */
export interface Course {
    /**
     * 课程的唯一标识符，主键
     * @type {number}
     */
    id: number;

    /**
     * [逻辑外键] 创建者ID (users.id)
     * @type {number}
     */
    creatorId: number;

    /**
     * 课程名称
     * @type {string}
     */
    name: string;

    /**
     * 课程详细介绍
     * @type {string | null}
     */
    description?: string;

    /**
     * 课程封面URL
     * @type {string | null}
     */
    coverImageUrl?: string;

    /**
     * 课程主题色
     * @type {string | null}
     */
    colorTheme?: string;

    /**
     * 开设学期
     * @type {string | null}
     */
    term?: string;

    /**
     * 状态: 'DRAFT', 'PUBLISHED', 'ARCHIVED'
     * @type {string}
     */
    status: string;

    /**
     * 可见性: 'PRIVATE', 'PUBLIC' (共享)
     * @type {string}
     */
    visibility: string;

    /**
     * 扩展信息 (JSONB)
     * @type {Record<string, any> | null}
     */
    metadata?: Record<string, any>;

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