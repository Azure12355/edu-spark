// [!file src/features/teacher/course/course-management/sub-features/question-edit/types/index.ts]
/**
 * @file src/features/teacher/course/course-management/sub-features/question-edit/types/index.ts
 * @description 定义题目创建/编辑领域所需的核心数据类型。
 */

// 1. 复用 question-bank 中已定义的枚举，保持一致性
// 在真实项目中，这些通用的枚举可以提升到 shared 目录下
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

// 2. 关联的知识点信息VO (用于展示)
export interface QuestionKnowledgePointLinkVO {
    knowledgePointId: number;
    knowledgePointTitle: string;
    knowledgePointType: string;
}

// 3. 创建者信息VO (用于展示)
export interface CreatorVO {
    id: number;
    nickname: string;
    avatarUrl?: string;
}

// 4. 【核心】用于编辑页面的完整题目数据模型 (聚合了VO和实体)
// 这个模型既用于从后端接收数据，也作为前端本地编辑状态的基础
export interface EditableQuestion {
    id: number | string; // 新建时为 string (e.g., 'new-123'), 编辑时为 number
    type: QuestionTypeEnum;
    difficulty: QuestionDifficultyEnum;
    stem: string;
    options: string[];
    answers: string[];
    analyses: string[];
    // knowledgePoints 存储的是完整的关联对象，便于在UI上展示
    knowledgePoints: QuestionKnowledgePointLinkVO[];
    // creatorIds 存储的是ID，用于提交给后端
    creatorIds?: number[];
    // creators 存储的是VO，用于展示
    creators?: CreatorVO[];
}

// 5. 【DTO】创建新题目的请求体 (与后端 QuestionAddRequest.java 对应)
export interface QuestionAddRequestDTO {
    type: QuestionTypeEnum;
    difficulty: QuestionDifficultyEnum;
    stem: string;
    options?: string[];
    answers: string[];
    analyses: string[];
    metadata?: Record<string, any>;
    knowledgePointIds: number[]; // 核心：关联的知识点ID列表
}

// 6. 【DTO】更新题目的请求体 (与后端 QuestionUpdateRequest.java 对应)
export interface QuestionUpdateRequestDTO {
    id: number;
    type?: QuestionTypeEnum;
    difficulty?: QuestionDifficultyEnum;
    stem?: string;
    options?: string[];
    answers?: string[];
    analyses?: string[];
    metadata?: Record<string, any>;
    knowledgePointIds?: number[]; // 核心：全量替换的知识点ID列表
}

// 7. 【VO】获取题目用于编辑时，后端返回的数据结构（等同于 QuestionVO）
// 为了类型清晰，我们重新定义一次
export interface QuestionForEditVO {
    id: number;
    type: QuestionTypeEnum;
    difficulty: QuestionDifficultyEnum;
    stem: string;
    options?: string[];
    answers: string[];
    analyses: string[];
    source: string;
    metadata?: Record<string, any>;
    createdAt: string;
    updatedAt: string;
    creators: CreatorVO[];
    knowledgePoints: QuestionKnowledgePointLinkVO[];
}

// 在 types/index.ts 文件中确保有这些定义

// 知识点基础类型
export interface KnowledgePointForSyllabus {
    id: number;
    title: string;
    type: '核心' | '重点' | '选学';
}

// 小节视图对象
export interface SectionForSyllabus {
    id: number;
    title: string;
    points: KnowledgePointForSyllabus[];
}

// 章节视图对象
export interface ChapterForSyllabus {
    id: number;
    title: string;
    sections: SectionForSyllabus[];
}

// 完整大纲视图对象
export interface SyllabusVO {
    chapters: ChapterForSyllabus[];
}