// src/shared/types/vo/qa/QAChatResponse.ts
import { ChunkVO } from '../kb/ChunkVO';

/**
 * @description QA 聊天场景的响应视图对象（VO），用于聚合一次问答的所有信息。
 * 严格对标后端的 'com.weilanx.eduspark.model.vo.qa.QAChatResponse.java'。
 */
export interface QAChatResponseVO {
    /**
     * 本次问答记录在数据库中的ID
     * @type {number}
     */
    qaRecordId: number;

    /**
     * 本次问答所属的会话UUID
     * @type {string}
     */
    sessionUuid: string;

    /**
     * AI 生成的完整回答文本
     * @type {string}
     */
    answer: string;

    /**
     * 本次回答引用的所有知识切片来源
     * @type {ChunkVO[]}
     */
    references: ChunkVO[];

    /**
     * 其他元数据，例如 token 消耗等
     * @type {Record<string, any> | null}
     */
    responseMetadata?: Record<string, any>;
}