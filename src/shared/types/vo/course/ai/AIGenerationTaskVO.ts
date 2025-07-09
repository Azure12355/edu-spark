// src/shared/types/vo/ai/AIGenerationTaskVO.ts

/**
 * @description AI出题任务状态的视图对象（VO）。
 * 严格对标后端的 'com.weilanx.eduspark.model.vo.ai.AIGenerationTaskVO.java'。
 */
export interface AIGenerationTaskVO {
    taskId: string;
    status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED';
    progress: number;
    message?: string;
    createdAt: string;
    finishedAt?: string;
}