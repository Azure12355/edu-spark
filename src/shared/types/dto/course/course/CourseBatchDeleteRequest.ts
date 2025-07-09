// src/shared/types/dto/course/CourseBatchDeleteRequest.ts

/**
 * @description 课程批量删除请求的数据传输对象（DTO）。
 * 严格对标后端的 'com.weilanx.eduspark.model.dto.course.CourseBatchDeleteRequest.java'。
 */
export interface CourseBatchDeleteRequestDTO {
    /**
     * 需要批量删除的课程ID列表
     * @type {number[]}
     */
    ids: number[];
}