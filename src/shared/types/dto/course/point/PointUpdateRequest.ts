// src/shared/types/dto/course/point/PointUpdateRequest.ts

/**
 * @description 更新知识点请求的数据传输对象（DTO）。
 * 严格对标后端的 'com.weilanx.eduspark.model.dto.course.point.PointUpdateRequest.java'。
 */
export interface PointUpdateRequestDTO {
    /**
     * 要更新的知识点的ID
     * @type {number}
     */
    id: number;

    /**
     * 新的知识点标题
     * @type {string | null}
     */
    title?: string;

    /**
     * 新的类型
     * @type {string | null}
     */
    type?: string;

    /**
     * 新的难度
     * @type {string | null}
     */
    difficulty?: string;

    /**
     * 新的详细内容
     * @type {string | null}
     */
    content?: string;

    /**
     * 新的显示顺序
     * @type {number | null}
     */
    orderIndex?: number;

    /**
     * 新的扩展信息
     * @type {Record<string, any> | null}
     */
    metadata?: Record<string, any>;
}