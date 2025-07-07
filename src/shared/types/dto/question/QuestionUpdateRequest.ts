// src/shared/types/dto/question/QuestionUpdateRequest.ts

/**
 * @description 更新题目请求的数据传输对象（DTO）。
 * 严格对标后端的 'com.weilanx.eduspark.model.dto.question.QuestionUpdateRequest.java'。
 */
export interface QuestionUpdateRequestDTO {
    id: number;
    type?: string;
    difficulty?: string;
    stem?: string;
    options?: string[];
    answers?: string[];
    analyses?: string[];
    metadata?: Record<string, any>;
    /**
     * 【全量替换】关联的知识点ID列表。
     */
    knowledgePointIds?: number[];
}