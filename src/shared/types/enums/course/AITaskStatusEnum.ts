// src/shared/types/enums/AITaskStatusEnum.ts

/**
 * @description AI异步任务的状态枚举。
 * 严格对标后端的 'com.weilanx.eduspark.model.enums.AITaskStatusEnum.java'。
 */
export enum AITaskStatusEnum {
    PENDING = 'PENDING',
    PROCESSING = 'PROCESSING',
    COMPLETED = 'COMPLETED',
    FAILED = 'FAILED',
}

/**
 * AI任务状态到中文文本的映射，用于UI展示。
 */
export const AITaskStatusTextMap: Record<AITaskStatusEnum, string> = {
    [AITaskStatusEnum.PENDING]: '排队中',
    [AITaskStatusEnum.PROCESSING]: '处理中',
    [AITaskStatusEnum.COMPLETED]: '已完成',
    [AITaskStatusEnum.FAILED]: '已失败',
};