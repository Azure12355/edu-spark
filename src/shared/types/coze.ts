/**
 * @file src/types/coze.ts
 * @description 定义与 Coze 工作流 API 交互所需的所有请求参数和响应数据结构。
 */

import { Question } from "@/shared/types/question";
import { QuestionDifficulty, QuestionType } from "@/shared/constants/enums";
import { KnowledgePoint } from "@/shared/types/knowledge";

/**
 * Coze 工作流的输入参数 `parameters` 的类型。
 * 这与您提供的入参 JSON 结构完全对应。
 */
export interface CozeWorkflowInputParameters {
    courseContext: {
        courseId: string;
        courseName: string;
    };
    generationConfig: {
        difficulty: QuestionDifficulty | string;
        language: string;
        modelPreference: string;
        quantity: number;
        questionTypes: (QuestionType | string)[];
    };
    knowledgePoints: KnowledgePoint[];
    supplementaryInstruc: string;
    user: {
        userId: string;
        userName: string;
    };
}

/**
 * Coze API `workflow.runs.create` 方法的原始成功响应体。
 * 注意：`data` 字段是一个 JSON 字符串，需要二次解析。
 */
export interface CozeRawWorkflowResponse {
    code: number; // BugFix: Changed from string to number to match API output
    msg: string;
    data: string;
    debug_url: string;
    token: number;
}

/**
 * 二次解析 Coze 响应体中 `data` 字符串后得到的内部数据结构。
 */
interface ParsedDataField {
    code: string;
    data: {
        generatedQuestions: Question[];
        greeting: string;
        summary: string;
    };
    msg: string;
}

/**
 * 最终经过我们后端API处理后，返回给前端的规范化响应体。
 */
export type GeneratedQuestionsResponse = ParsedDataField;