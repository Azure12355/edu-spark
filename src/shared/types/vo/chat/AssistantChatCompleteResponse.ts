// [!file src/shared/types/vo/chat/AssistantChatCompleteResponse.ts]
import { ChunkVO } from '../kb';

/**
 * @description 教师智能助教聊天完成响应的视图对象 (VO)。
 * 严格对标后端的 'com.weilanx.eduspark.model.vo.chat.AssistantChatCompleteResponse.java'。
 *
 * 在SSE流式输出结束后，通过一个特殊的 "done" 事件将此对象发送给前端，
 * 包含了完整的AI回答和所有可供溯源的参考文献信息。
 */
export interface AssistantChatCompleteResponse {
    /**
     * AI生成的完整回答文本。
     * @type {string}
     */
    fullAnswer: string;

    /**
     * 本次回答所引用的参考文献（知识切片）列表。
     * @type {ChunkVO[]}
     */
    references: ChunkVO[];

    /**
     * 大模型返回的原始元数据，例如token使用情况、finish_reason等。
     * 类型为 Record<string, any>，因为其结构可能因不同模型而异。
     * @type {Record<string, any>}
     */
    responseMetadata: Record<string, any>;
}