// src/shared/types/entity/QuestionKnowledgePointLink.ts

/**
 * @description 与后端 'com.weilanx.eduspark.model.entity.QuestionKnowledgePointLink' 类完全对应的 TypeScript 类型。
 * 代表题目与知识点的多对多关联关系。
 */
export interface QuestionKnowledgePointLink {
    /**
     * [逻辑外键] 题目ID (questions.id)
     * @type {number}
     */
    questionId: number;

    /**
     * [逻辑外键] 知识点ID (knowledge_points.id)
     * @type {number}
     */
    knowledgePointId: number;

    /**
     * 【冗余字段】知识点标题
     * @type {string}
     */
    knowledgePointTitle: string;

    /**
     * 【冗余字段】知识点类型
     * @type {string}
     */
    knowledgePointType: string;

    /**
     * 逻辑删除标记 (0: 未删除, 1: 已删除)
     * @type {number}
     */
    isDeleted: number;
}