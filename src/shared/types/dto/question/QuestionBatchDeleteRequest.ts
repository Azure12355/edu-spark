// src/shared/types/dto/question/QuestionBatchDeleteRequest.ts

/**
 * @description 批量删除题目请求的数据传输对象（DTO）。
 * 严格对标后端的 'com.weilanx.eduspark.model.dto.question.QuestionBatchDeleteRequest.java'。
 */
export interface QuestionBatchDeleteRequestDTO {
    ids: number[];
}