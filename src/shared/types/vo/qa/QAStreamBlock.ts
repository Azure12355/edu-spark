// src/shared/types/vo/qa/QAStreamBlock.ts

/**
 * @description QA 问答流式输出的数据块 (VO)。
 * 严格对标后端的 'com.weilanx.eduspark.model.vo.qa.QAStreamBlock.java'。
 */
export interface QAStreamBlockVO {
    /**
     * 数据块类型: "content" (内容), "error" (错误), "done" (结束信号)
     * @type {string}
     */
    type: 'content' | 'error' | 'done';

    /**
     * 数据内容 (当 type 为 'content' 或 'error' 时)
     * @type {string | null}
     */
    data?: string;
}