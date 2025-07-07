// src/shared/types/vo/qa/QAResponse.ts

/**
 * @description 基础的QA响应视图对象 (VO)。
 * 严格对标后端的 'com.weilanx.eduspark.model.vo.qa.QAResponse.java'。
 */
export interface QAResponseVO {
    /**
     * AI 生成的回答内容
     * @type {string}
     */
    answer: string;

    /**
     * 本次问答所属的会话ID (UUID)
     * @type {string}
     */
    sessionId: string;
}