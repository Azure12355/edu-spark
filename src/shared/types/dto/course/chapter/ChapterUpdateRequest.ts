// src/shared/types/dto/course/chapter/ChapterUpdateRequest.ts

/**
 * @description 更新章节请求的数据传输对象（DTO）。
 * 严格对标后端的 'com.weilanx.eduspark.model.dto.course.chapter.ChapterUpdateRequest.java'。
 */
export interface ChapterUpdateRequestDTO {
    /**
     * 要更新的章节的ID
     * @type {number}
     */
    id: number;

    /**
     * 新的章节标题
     * @type {string | null}
     */
    title?: string;

    /**
     * 新的章节描述
     * @type {string | null}
     */
    description?: string;

    /**
     * 新的章节显示顺序
     * @type {number | null}
     */
    orderIndex?: number;
}