// src/shared/types/entity/Question.ts

/**
 * @description 与后端 'com.weilanx.eduspark.model.entity.Question' 类完全对应的 TypeScript 类型。
 * 代表数据库中的完整题目实体。
 */
export interface Question {
    /**
     * 题目的唯一标识符，主键
     * @type {number}
     */
    id: number;

    /**
     * 题目类型，例如: 'SINGLE_CHOICE', 'MULTIPLE_CHOICE'
     * @type {string}
     */
    type: string;

    /**
     * 题目难度，例如: 'EASY', 'MEDIUM', 'HARD'
     * @type {string}
     */
    difficulty: string;

    /**
     * 题干内容，支持 Markdown 格式
     * @type {string}
     */
    stem: string;

    /**
     * 选择题选项数组 (JSONB)
     * @type {string[] | null}
     */
    options?: string[];

    /**
     * 正确答案数组 (JSONB)
     * @type {string[]}
     */
    answers: string[];

    /**
     * 题目解析数组 (JSONB)，支持多条解析
     * @type {string[] | null}
     */
    analyses?: string[];

    /**
     * 创建者用户ID数组 (JSONB)
     * @type {number[] | null}
     */
    creatorIds?: number[];

    /**
     * 题目来源，例如: 'MANUAL', 'AI_GENERATED'
     * @type {string}
     */
    source: string;

    /**
     * 扩展信息 (JSONB)
     * @type {Record<string, any> | null}
     */
    metadata?: Record<string, any>;

    /**
     * 创建时间 (ISO 8601 格式的字符串)
     * @type {string}
     */
    createdAt: string;

    /**
     * 更新时间 (ISO 8601 格式的字符串)
     * @type {string}
     */
    updatedAt: string;

    /**
     * 逻辑删除标记 (0: 未删除, 1: 已删除)
     * @type {number}
     */
    isDeleted: number;
}
