// src/shared/types/dto/ai/AIGenerationTaskCreateRequest.ts

/**
 * @description AI出题任务创建请求的数据传输对象（DTO）。
 * 严格对标后端的 'com.weilanx.eduspark.model.dto.ai.AIGenerationTaskCreateRequest.java'。
 */
export interface AIGenerationTaskCreateRequestDTO {
    courseId: number;
    knowledgePointIds: number[];
    questionType: string;
    questionCount: number;
    difficulty: string;
    modelId: string;
}

export interface AIConfig extends AIGenerationTaskCreateRequestDTO {};