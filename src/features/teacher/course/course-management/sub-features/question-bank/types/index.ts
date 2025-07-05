// [!file src/features/teacher/course/course-management/sub-features/question-bank/types/index.ts]
/**
 * @file src/features/teacher/course/course-management/sub-features/question-bank/types/index.ts
 * @description 定义题库管理领域所需的核心数据类型。
 */

// 1. 与后端 QuestionTypeEnum.java 对应的枚举
export enum QuestionTypeEnum {
    SINGLE_CHOICE = 'SINGLE_CHOICE',
    MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
    TRUE_FALSE = 'TRUE_FALSE',
    FILL_IN_THE_BLANK = 'FILL_IN_THE_BLANK',
    SHORT_ANSWER = 'SHORT_ANSWER',
    PROGRAMMING = 'PROGRAMMING',
}

// 2. 与后端 QuestionDifficultyEnum.java 对应的枚举
export enum QuestionDifficultyEnum {
    EASY = 'EASY',
    MEDIUM = 'MEDIUM',
    HARD = 'HARD',
}

// 3. 与后端 QuestionKnowledgePointLinkVO.java 对应的接口
export interface QuestionKnowledgePointLink {
    knowledgePointId: number;
    knowledgePointTitle: string;
    knowledgePointType: string;
}

// 4. 与后端 UserVO.java 对应的接口 (只包含必要字段)
export interface CreatorVO {
    id: number;
    nickname: string;
    avatarUrl?: string;
}

// 5. 与后端 QuestionVO.java 对应的核心视图对象
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
    knowledgePoints: QuestionKnowledgePointLink[];
}

// 6. 与后端 Page<QuestionVO> 对应的分页响应数据结构
export interface Page<T> {
    records: T[];
    total: number;
    size: number;
    current: number;
    pages: number;
}

// 7. 通用分页请求参数
export interface PageRequest {
    current: number;
    pageSize: number;
}