// src/shared/types/dto/course/CourseUpdateRequest.ts

/**
 * @description 更新课程请求的数据传输对象（DTO）。
 * 严格对标后端的 'com.weilanx.eduspark.model.dto.course.CourseUpdateRequest.java'。
 */
export interface CourseUpdateRequestDTO {
    /**
     * 要更新的课程ID
     * @type {number}
     */
    id: number;

    /**
     * 新的课程名称
     * @type {string | null}
     */
    name?: string;

    /**
     * 新的课程详细介绍
     * @type {string | null}
     */
    description?: string;

    /**
     * 新的课程封面URL
     * @type {string | null}
     */
    coverImageUrl?: string;

    /**
     * 新的课程主题色
     * @type {string | null}
     */
    colorTheme?: string;

    /**
     * 新的开设学期
     * @type {string | null}
     */
    term?: string;

    /**
     * 新的状态: 'DRAFT', 'PUBLISHED', 'ARCHIVED'
     * @type {string | null}
     */
    status?: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';

    /**
     * 新的可见性: 'PRIVATE', 'PUBLIC'
     * @type {string | null}
     */
    visibility?: 'PRIVATE' | 'PUBLIC';

    /**
     * 新的扩展信息
     * @type {Record<string, any> | null}
     */
    metadata?: Record<string, any>;
}