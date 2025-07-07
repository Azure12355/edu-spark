// src/shared/types/vo/question/QuestionKnowledgePointLinkVO.ts

/**
 * @description 题目关联知识点链接的视图对象（VO）。
 * 严格对标后端的 'com.weilanx.eduspark.model.vo.question.QuestionKnowledgePointLinkVO.java'。
 */
export interface QuestionKnowledgePointLinkVO {
    /**
     * 知识点ID
     * @type {number}
     */
    knowledgePointId: number;

    /**
     * 知识点标题
     * @type {string}
     */
    knowledgePointTitle: string;

    /**
     * 知识点类型
     * @type {string}
     */
    knowledgePointType: string;
}