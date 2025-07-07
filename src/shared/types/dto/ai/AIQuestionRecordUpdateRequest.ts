// src/shared/types/dto/ai/AIQuestionRecordUpdateRequest.ts

/**
 * @description AI题目记录更新请求的数据传输对象（DTO）。
 * 严格对标后端的 'com.weilanx.eduspark.model.dto.ai.AIQuestionRecordUpdateRequest.java'。
 */
export interface AIQuestionRecordUpdateRequestDTO {
    type?: string;
    difficulty?: string;
    stem?: string;
    options?: string[];
    answers?: string[];
    analyses?: string[];
    reviewComment?: string;
}