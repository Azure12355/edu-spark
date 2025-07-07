// src/shared/types/dto/question/QuestionAddRequest.ts

/**
 * @description 创建新题目请求的数据传输对象（DTO）。
 * 严格对标后端的 'com.weilanx.eduspark.model.dto.question.QuestionAddRequest.java'。
 */
export interface QuestionAddRequestDTO {
    type: string;
    difficulty: string;
    stem: string;
    options?: string[];
    answers: string[];
    analyses?: string[];
    metadata?: Record<string, any>;
    knowledgePointIds: number[];
}