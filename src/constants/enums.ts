/**
 * @file src/constants/enums.ts
 * @description 项目中所有枚举类型的统一定义。
 * 使用枚举可以增强代码的可读性和类型安全，避免使用魔法字符串。
 */

/**
 * 题目类型枚举
 * 定义了题库中支持的所有题目类型。
 */
export enum QuestionType {
    SINGLE_CHOICE = '单选题',
    MULTIPLE_CHOICE = '多选题',
    TRUE_FALSE = '判断题',
    FILL_IN_THE_BLANK = '填空题',
    SHORT_ANSWER = '简答题',
    PROGRAMMING = '编程题',
}

/**
 * 题目难度枚举
 * 定义了题目的难度等级。
 */
export enum QuestionDifficulty {
    EASY = '简单',
    MEDIUM = '中等',
    HARD = '困难',
}