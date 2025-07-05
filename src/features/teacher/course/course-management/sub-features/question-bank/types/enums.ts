// [!file src/features/teacher/course/course-management/sub-features/question-bank/types/enums.ts]
/**
 * @file src/features/teacher/course/course-management/sub-features/question-bank/types/enums.ts
 * @description 定义题库管理领域中用于UI展示的枚举值到中文文本的映射。
 */

import { QuestionTypeEnum, QuestionDifficultyEnum } from './index';

// 题目类型到中文的映射
export const QuestionTypeTextMap: Record<QuestionTypeEnum, string> = {
    [QuestionTypeEnum.SINGLE_CHOICE]: '单选题',
    [QuestionTypeEnum.MULTIPLE_CHOICE]: '多选题',
    [QuestionTypeEnum.TRUE_FALSE]: '判断题',
    [QuestionTypeEnum.FILL_IN_THE_BLANK]: '填空题',
    [QuestionTypeEnum.SHORT_ANSWER]: '简答题',
    [QuestionTypeEnum.PROGRAMMING]: '编程题',
};

// 题目难度到中文和样式的映射
export const QuestionDifficultyMap: Record<QuestionDifficultyEnum, { text: string; className: string }> = {
    [QuestionDifficultyEnum.EASY]: { text: '简单', className: 'EASY' },
    [QuestionDifficultyEnum.MEDIUM]: { text: '中等', className: 'MEDIUM' },
    [QuestionDifficultyEnum.HARD]: { text: '困难', className: 'HARD' },
};