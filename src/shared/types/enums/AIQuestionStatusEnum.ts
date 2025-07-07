// src/shared/types/enums/AIQuestionStatusEnum.ts

/**
 * @description AI生成题目记录的状态枚举。
 * 严格对标后端的 'com.weilanx.eduspark.model.enums.AIQuestionStatusEnum.java'。
 */
export enum AIQuestionStatusEnum {
    PENDING_REVIEW = 'PENDING_REVIEW',
    EDITED = 'EDITED',
    APPROVED = 'APPROVED',
    IMPORTED = 'IMPORTED',
    DISCARDED = 'DISCARDED',
    FAILED = 'FAILED',
}

/**
 * AI题目状态到中文文本的映射，用于UI展示。
 */
export const AIQuestionStatusTextMap: Record<AIQuestionStatusEnum, string> = {
    [AIQuestionStatusEnum.PENDING_REVIEW]: '待审核',
    [AIQuestionStatusEnum.EDITED]: '已编辑',
    [AIQuestionStatusEnum.APPROVED]: '已批准',
    [AIQuestionStatusEnum.IMPORTED]: '已入库',
    [AIQuestionStatusEnum.DISCARDED]: '已丢弃',
    [AIQuestionStatusEnum.FAILED]: '生成失败',
};