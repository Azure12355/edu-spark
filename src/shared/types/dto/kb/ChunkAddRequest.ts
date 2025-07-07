// src/shared/types/dto/kb/ChunkAddRequest.ts

/**
 * @description 手动添加新知识切片请求的数据传输对象（DTO）。
 * 严格对标后端的 'com.weilanx.eduspark.model.dto.kb.ChunkAddRequest.java'。
 */
export interface ChunkAddRequestDTO {
    /**
     * 切片所属的文档ID
     * @type {number}
     */
    documentId: number;

    /**
     * 切片的文本内容
     * @type {string}
     */
    content: string;
}