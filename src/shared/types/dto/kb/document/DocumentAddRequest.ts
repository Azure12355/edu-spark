// src/shared/types/dto/kb/DocumentAddRequest.ts

/**
 * @description 上传新文档请求的数据传输对象（DTO）。
 * 严格对标后端的 'com.weilanx.eduspark.model.dto.kb.DocumentAddRequest.java'。
 * 注意：文件本身通过 multipart/form-data 形式上传，不包含在此DTO中。
 */
export interface DocumentAddRequestDTO {
    /**
     * 目标知识库的ID
     * @type {number}
     */
    knowledgeBaseId: number;

    // 如果未来支持URL上传，可以添加 url 字段
    // url?: string;
}