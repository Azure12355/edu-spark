// src/shared/types/dto/course/CourseAddRequest.ts

/**
 * @description 创建课程请求的数据传输对象（DTO）。
 * 严格对标后端的 'com.weilanx.eduspark.model.dto.course.CourseAddRequest.java'。
 */
export interface CourseAddRequestDTO {
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
     * 开设学期
     * @type {string | null}
     */
    term?: string;
}