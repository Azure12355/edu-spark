// src/shared/types/dto/ai/AIQuestionRecordQueryRequest.ts
import { PageRequest } from '@/shared/types/common';

/**
 * @description AI题目生成记录查询请求的数据传输对象（DTO）。
 * 严格对标后端的 'com.weilanx.eduspark.model.dto.ai.AIQuestionRecordQueryRequest.java'。
 */
export interface AIQuestionRecordQueryRequestDTO extends PageRequest {
    courseId: number;
    creatorId?: number;
    type?: string;
    difficulty?: string;
    stemLike?: string;
    statuses?: string[];
    modelUsed?: string;
    generatedAtStart?: string;
    generatedAtEnd?: string;
    sourceKnowledgePointId?: number;
}