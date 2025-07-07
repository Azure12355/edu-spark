// src/shared/types/entity/QARecord.ts
import { AdvancedQARequestDTO } from '@/shared/types';

/**
 * @description 与后端 'com.weilanx.eduspark.model.entity.QARecord' 类完全对应的 TypeScript 类型。
 * 代表一次详细的知识问答（QA）交互记录。
 */
export interface QARecord {
    /**
     * 记录的唯一标识符，主键
     * @type {number}
     */
    id: number;

    /**
     * [逻辑外键] 关联的会话业务ID
     * @type {string}
     */
    sessionUuid: string;

    /**
     * [逻辑外键] 发起提问的用户ID
     * @type {number}
     */
    userId: number;

    /**
     * 发起本次问答请求的完整参数 (JSONB)，前端对应为 DTO 对象
     * @type {AdvancedQARequestDTO}
     */
    requestParams: AdvancedQARequestDTO;

    /**
     * RAG检索阶段召回的知识切片ID列表 (JSONB数组)
     * @type {number[] | null}
     */
    retrievedChunkIds?: number[];

    /**
     * 最终组装后发送给大模型的系统提示词
     * @type {string | null}
     */
    systemPrompt?: string;

    /**
     * 用户输入的原始问题
     * @type {string}
     */
    userQuery: string;

    /**
     * AI助手生成的最终回答
     * @type {string}
     */
    assistantAnswer: string;

    /**
     * 大模型返回的元数据，如token用量、finish_reason等 (JSONB)
     * @type {Record<string, any> | null}
     */
    responseMetadata?: Record<string, any>;

    /**
     * 处理本次请求的总耗时（毫秒）
     * @type {number | null}
     */
    processingTimeMs?: number;

    /**
     * 用户反馈评分: 1 (点赞), -1 (点踩), 0 (无反馈或取消)
     * @type {number | null}
     */
    feedbackScore?: 1 | -1 | 0;

    /**
     * 记录创建时间 (ISO 8601 格式的字符串)
     * @type {string}
     */
    createdAt: string;

    /**
     * 逻辑删除标记 (0: 未删除, 1: 已删除)
     * @type {number}
     */
    isDeleted: number;
}