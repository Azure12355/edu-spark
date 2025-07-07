// src/shared/types/enums/QuestionDifficultyEnum.ts
export enum QuestionDifficultyEnum {
    EASY = 'EASY',
    MEDIUM = 'MEDIUM',
    HARD = 'HARD',
}
export const QuestionDifficultyTextMap: Record<QuestionDifficultyEnum | string, {text: string, className: string}> = {
    [QuestionDifficultyEnum.EASY]: { text: '简单', className: 'EASY' },
    [QuestionDifficultyEnum.MEDIUM]: { text: '中等', className: 'MEDIUM' },
    [QuestionDifficultyEnum.HARD]: { text: '困难', className: 'HARD' },
};