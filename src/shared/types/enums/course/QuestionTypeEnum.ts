// src/shared/types/enums/QuestionTypeEnum.ts
export enum QuestionTypeEnum {
    SINGLE_CHOICE = 'SINGLE_CHOICE',
    MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
    TRUE_FALSE = 'TRUE_FALSE',
    FILL_IN_THE_BLANK = 'FILL_IN_THE_BLANK',
    SHORT_ANSWER = 'SHORT_ANSWER',
    PROGRAMMING = 'PROGRAMMING',
}
export const QuestionTypeTextMap: Record<QuestionTypeEnum | string, string> = {
    [QuestionTypeEnum.SINGLE_CHOICE]: '单选题',
    [QuestionTypeEnum.MULTIPLE_CHOICE]: '多选题',
    [QuestionTypeEnum.TRUE_FALSE]: '判断题',
    [QuestionTypeEnum.FILL_IN_THE_BLANK]: '填空题',
    [QuestionTypeEnum.SHORT_ANSWER]: '简答题',
    [QuestionTypeEnum.PROGRAMMING]: '编程题',
};