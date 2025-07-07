// src/shared/types/dto/course/chapter/ChapterAddRequest.ts

/**
 * @description 添加新章节请求的数据传输对象（DTO）。
 * 严格对标后端的 'com.weilanx.eduspark.model.dto.course.chapter.ChapterAddRequest.java'。
 */
export interface ChapterAddRequestDTO {
    /**
     * 所属课程的ID
     * @type {number}
     */
    courseId: number;

    /**
     * 章节标题
     * @type {string}
     */
    title: string;

    /**
     * 章节描述
     * @type {string | null}
     */
    description?: string;
}