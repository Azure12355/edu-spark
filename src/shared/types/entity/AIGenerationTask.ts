// src/shared/types/entity/AIGenerationTask.ts

/**
 * @description 与后端 'com.weilanx.eduspark.model.entity.AIGenerationTask' 类完全对应的 TypeScript 类型。
 * 代表一个异步的AI出题任务。
 */
export interface AIGenerationTask {
    /**
     * 自增主键
     * @type {number}
     */
    id: number;

    /**
     * 任务的全局唯一业务ID
     * @type {string}
     */
    taskUuid: string;

    /**
     * [逻辑外键] 发起任务的用户ID
     * @type {number}
     */
    userId: number;

    /**
     * [逻辑外键] 关联的课程ID
     * @type {number}
     */
    courseId: number;

    /**
     * 发起任务的完整请求参数 (JSONB)
     * @type {Record<string, any>}
     */
    requestParams: Record<string, any>;

    /**
     * 任务状态: 'PENDING', 'PROCESSING', 'COMPLETED', 'FAILED'
     * @type {string}
     */
    status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED';

    /**
     * 任务进度百分比 (0-100)
     * @type {number}
     */
    progress: number;

    /**
     * 附带的友好提示信息或错误原因
     * @type {string | null}
     */
    message?: string;

    /**
     * 任务成功后，生成的 ai_question_records 表的ID列表 (JSONB数组)
     * @type {number[] | null}
     */
    resultRecordIds?: number[];

    /**
     * 任务完成或失败的时间 (ISO 8601 格式的字符串)
     * @type {string | null}
     */
    finishedAt?: string;

    /**
     * 创建时间 (ISO 8601 格式的字符串)
     * @type {string}
     */
    createdAt: string;

    /**
     * 更新时间 (ISO 8601 格式的字符串)
     * @type {string}
     */
    updatedAt: string;

    /**
     * 逻辑删除标记 (0: 未删除, 1: 已删除)
     * @type {number}
     */
    isDeleted: number;
}