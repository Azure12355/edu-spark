// src/shared/types/dto/kb/DocumentUpdateRequest.ts

/**
 * @description 更新文档信息请求的数据传输对象（DTO）。
 * 严格对标后端的 'com.weilanx.eduspark.model.dto.kb.DocumentUpdateRequest.java'。
 */
export interface DocumentUpdateRequestDTO {
    /**
     * 要更新的文档的ID
     * @type {number}
     */
    id: number;

    /**
     * 新的文档名称
     * @type {string | null}
     */
    name?: string;

    /**
     * 用户自定义的元数据
     * @type {Record<string, any> | null}
     */
    metadata?: Record<string, any>;
}