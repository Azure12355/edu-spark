// src/shared/types/dto/course/section/SectionAddRequest.ts

/**
 * @description 添加新小节请求的数据传输对象（DTO）。
 * 严格对标后端的 'com.weilanx.eduspark.model.dto.course.section.SectionAddRequest.java'。
 */
export interface SectionAddRequestDTO {
    /**
     * 所属章节的ID
     * @type {number}
     */
    chapterId: number;

    /**
     * 小节标题
     * @type {string}
     */
    title: string;
}