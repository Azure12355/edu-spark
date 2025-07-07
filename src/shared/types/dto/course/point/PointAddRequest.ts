// src/shared/types/dto/course/point/PointAddRequest.ts

/**
 * @description 添加新知识点请求的数据传输对象（DTO）。
 * 严格对标后端的 'com.weilanx.eduspark.model.dto.course.point.PointAddRequest.java'。
 */
export interface PointAddRequestDTO {
    /**
     * 所属小节的ID
     * @type {number}
     */
    sectionId: number;

    /**
     * 知识点标题
     * @type {string}
     */
    title: string;

    /**
     * 知识点类型，例如: "重点"
     * @type {string}
     */
    type: string;
}