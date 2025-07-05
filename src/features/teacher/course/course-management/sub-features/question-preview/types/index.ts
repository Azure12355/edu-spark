// [!file src/features/teacher/course/course-management/sub-features/question-preview/types/index.ts]
/**
 * @file src/features/teacher/course/course-management/sub-features/question-preview/types/index.ts
 * @description 定义题目预览领域所需的核心数据类型。
 */

// 1. 与后端 QuestionTypeEnum.java 和 QuestionDifficultyEnum.java 对应的枚举
export enum QuestionTypeEnum {
    SINGLE_CHOICE = 'SINGLE_CHOICE',
    MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
    TRUE_FALSE = 'TRUE_FALSE',
    FILL_IN_THE_BLANK = 'FILL_IN_THE_BLANK',
    SHORT_ANSWER = 'SHORT_ANSWER',
    PROGRAMMING = 'PROGRAMMING',
}

export enum QuestionDifficultyEnum {
    EASY = 'EASY',
    MEDIUM = 'MEDIUM',
    HARD = 'HARD',
}

// 2. 关联的知识点信息VO
export interface QuestionKnowledgePointLinkVO {
    knowledgePointId: number;
    knowledgePointTitle: string;
    knowledgePointType: string;
}

// 3. 创建者信息VO
export interface CreatorVO {
    id: number;
    nickname: string;
    avatarUrl?: string;
}

// 4. 【核心】题目视图对象 (QuestionVO)，与后端完全对应
export interface QuestionVO {
    id: number;
    type: QuestionTypeEnum;
    difficulty: QuestionDifficultyEnum;
    stem: string;
    options?: string[];
    answers: string[];
    analyses: string[];
    source: string;
    metadata?: Record<string, any>;
    createdAt: string; // ISO Date String
    updatedAt: string;
    creators: CreatorVO[];
    knowledgePoints: QuestionKnowledgePointLinkVO[];
}