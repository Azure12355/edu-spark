// src/shared/types/dto/question/QuestionQueryRequest.ts
import { PageRequest } from '@/shared/types/common';

/**
 * @description 题目查询请求的数据传输对象（DTO）。
 * 严格对标后端的 'com.weilanx.eduspark.model.dto.question.QuestionQueryRequest.java'。
 */
export interface QuestionQueryRequestDTO extends PageRequest {
    type?: string;
    difficulty?: string;
    stemLike?: string;
    source?: string;
    creatorId?: number;
    knowledgePointId?: number;
}