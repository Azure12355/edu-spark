// src/shared/types/dto/course/section/SectionUpdateRequest.ts

/**
 * @description 更新小节请求的数据传输对象（DTO）。
 * 严格对标后端的 'com.weilanx.eduspark.model.dto.course.section.SectionUpdateRequest.java'。
 */
export interface SectionUpdateRequestDTO {
    /**
     * 要更新的小节的ID
     * @type {number}
     */
    id: number;

    /**
     * 新的小节标题
     * @type {string | null}
     */
    title?: string;

    /**
     * 新的小节显示顺序
     * @type {number | null}
     */
    orderIndex?: number;
}