// src/shared/types/entity/CourseEnrollment.ts

/**
 * @description 与后端 'com.weilanx.eduspark.model.entity.CourseEnrollment' 类完全对应的 TypeScript 类型。
 * 代表数据库中的课程报名关系实体。
 */
export interface CourseEnrollment {
    /**
     * [逻辑外键] 用户ID (users.id)
     * @type {number}
     */
    userId: number;

    /**
     * [逻辑外键] 课程ID (courses.id)
     * @type {number}
     */
    courseId: number;

    /**
     * 报名角色: 'TEACHER', 'STUDENT'
     * @type {string}
     */
    role: 'TEACHER' | 'STUDENT';

    /**
     * 报名时间 (ISO 8601 格式的字符串)
     * @type {string}
     */
    enrolledAt: string;

    /**
     * 逻辑删除标记 (0: 未删除, 1: 已删除)
     * @type {number}
     */
    isDeleted: number;
}