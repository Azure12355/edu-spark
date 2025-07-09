// src/shared/types/dto/kb/ChunkDeleteRequest.ts

/**
 * @description 批量删除知识切片请求的数据传输对象（DTO）。
 * 严格对标后端的 'com.weilanx.eduspark.model.dto.kb.ChunkDeleteRequest.java'。
 */
export interface ChunkDeleteRequestDTO {
    /**
     * 需要删除的知识切片ID列表
     * @type {number[]}
     */
    ids: number[];
}