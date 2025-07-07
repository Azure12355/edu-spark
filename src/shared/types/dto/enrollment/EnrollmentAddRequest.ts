// src/shared/types/dto/enrollment/EnrollmentAddRequest.ts

/**
 * @description 添加课程报名记录请求的数据传输对象（DTO）。
 * 严格对标后端的 'com.weilanx.eduspark.model.dto.enrollment.EnrollmentAddRequest.java'。
 */
export interface EnrollmentAddRequestDTO {
    /**
     * 要报名的课程ID
     * @type {number}
     */
    courseId: number;

    /**
     * (可选) 管理员或教师为其他用户报名时使用
     * @type {number | null}
     */
    userId?: number;

    /**
     * (可选) 管理员或教师指定报名角色时使用
     * @type {string | null}
     */
    role?: 'TEACHER' | 'STUDENT';
}