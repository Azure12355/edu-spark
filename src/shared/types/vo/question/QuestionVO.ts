// src/shared/types/vo/question/QuestionVO.ts
import { UserVO } from '../UserVO';
import { QuestionKnowledgePointLinkVO } from './QuestionKnowledgePointLinkVO';

/**
 * @description 题目视图对象（VO），用于在前端安全、完整地展示题目信息。
 * 严格对标后端的 'com.weilanx.eduspark.model.vo.question.QuestionVO.java'。
 */
export interface QuestionVO {
    id: number | string;
    type: string;
    difficulty: string;
    stem: string;
    options: string[];
    answers: string[];
    analyses: string[];
    source?: string;
    metadata?: Record<string, any>;
    createdAt?: string;
    updatedAt?: string;

    /**
     * 创建者信息列表 (脱敏)
     * @type {UserVO[]}
     */
    creators?: UserVO[];

    /**
     * 关联的知识点信息列表
     * @type {QuestionKnowledgePointLinkVO[]}
     */
    knowledgePoints: QuestionKnowledgePointLinkVO[];
}