// src/shared/types/dto/course/CourseQueryRequest.ts
import { PageRequest } from '@/shared/types/common';

/**
 * @description 课程查询请求的数据传输对象（DTO）。
 * 严格对标后端的 'com.weilanx.eduspark.model.dto.course.CourseQueryRequest.java'。
 */
export interface CourseQueryRequestDTO extends PageRequest {
    /**
     * 按名称模糊查询
     * @type {string | null}
     */
    name?: string;

    /**
     * 按创建者ID查询
     * @type {number | null}
     */
    creatorId?: number;

    /**
     * 按学期查询
     * @type {string | null}
     */
    term?: string;

    /**
     * 按状态查询
     * @type {string | null}
     */
    status?: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';

    /**
     * 按可见性查询
     * @type {string | null}
     */
    visibility?: 'PRIVATE' | 'PUBLIC';
}