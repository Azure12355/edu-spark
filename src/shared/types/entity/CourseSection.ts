// src/shared/types/entity/CourseSection.ts

/**
 * @description 与后端 'com.weilanx.eduspark.model.entity.CourseSection' 类完全对应的 TypeScript 类型。
 * 代表数据库中的完整课程小节实体。
 */
export interface CourseSection {
    /**
     * 小节的唯一标识符，主键
     * @type {number}
     */
    id: number;

    /**
     * [逻辑外键] 所属章节ID (course_chapters.id)
     * @type {number}
     */
    chapterId: number;

    /**
     * 小节标题
     * @type {string}
     */
    title: string;

    /**
     * 小节显示顺序
     * @type {number}
     */
    orderIndex: number;

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