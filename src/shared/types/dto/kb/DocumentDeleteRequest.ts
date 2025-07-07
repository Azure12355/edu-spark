// src/shared/types/dto/kb/DocumentDeleteRequest.ts

/**
 * @description 批量删除文档请求的数据传输对象（DTO）。
 * 严格对标后端的 'com.weilanx.eduspark.model.dto.kb.DocumentDeleteRequest.java'。
 */
export interface DocumentDeleteRequestDTO {
    /**
     * 需要删除的文档ID列表
     * @type {number[]}
     */
    ids: number[];
}