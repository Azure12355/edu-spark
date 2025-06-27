/**
 * @file src/types/question.ts
 * @description 题库中题目的核心类型定义文件。
 */

import { KnowledgePoint } from './knowledge';
import { QuestionType, QuestionDifficulty } from '@/constants/enums';

/**
 * 题目数据结构接口 (重构后)
 * 定义了一个标准化的、可扩展的题目对象结构。
 */
export interface Question {
    /**
     * 题目的唯一标识符。
     */
    id: string;

    /**
     * 题目关联的知识点对象数组。
     */
    points: KnowledgePoint[];

    /**
     * 题目类型，使用 QuestionType 枚举。
     */
    type: QuestionType;

    /**
     * 题目难度，使用 QuestionDifficulty 枚举。
     */
    difficulty: QuestionDifficulty;

    /**
     * 题干内容，支持 Markdown 格式。
     */
    stem: string;

    /**
     * 选项数组，仅用于选择题。
     * 对于非选择题，此字段为 undefined。
     */
    options?: string[];

    /**
     * 答案数组，统一使用字符串数组存储。
     * - 单选题: `['A']` 或 `['唯一的正确选项内容']`
     * - 多选题: `['A', 'C']` 或 `['选项1内容', '选项3内容']`
     * - 判断题: `['true']` 或 `['false']`
     * - 填空/简答/编程题: `['参考答案1', '参考答案2', ...]`
     */
    answers: string[];

    /**
     * 题目解析数组，支持多条解析，每条都支持 Markdown。
     */
    analyses: string[];

    /**
     * 创建者数组，支持多个创建者（如 AI 和教师共同创建）。
     */
    creators: string[];

    /**
     * 题目创建时间的 Unix 时间戳 (毫秒)。
     * 存储为数字便于排序和计算，在前端显示时进行格式化。
     */
    createdAt: number;
}

// 为了兼容 AI 生成题目的场景，可以创建一个别名或扩展类型
export type AIGeneratedQuestion = Question;