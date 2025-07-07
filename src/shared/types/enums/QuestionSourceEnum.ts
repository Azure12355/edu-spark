// src/shared/types/enums/QuestionSourceEnum.ts
export enum QuestionSourceEnum {
    MANUAL = 'MANUAL',
    AI_GENERATED = 'AI_GENERATED',
    BATCH_IMPORTED = 'BATCH_IMPORTED',
}
export const QuestionSourceTextMap: Record<QuestionSourceEnum, string> = {
    [QuestionSourceEnum.MANUAL]: '手动录入',
    [QuestionSourceEnum.AI_GENERATED]: 'AI 生成',
    [QuestionSourceEnum.BATCH_IMPORTED]: '批量导入',
};