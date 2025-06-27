/**
 * @file src/types/knowledge.ts
 * @description 与知识体系相关的类型定义，如知识点。
 */

/**
 * 知识点类型枚举
 * 定义了知识点的重要程度。
 */
export enum KnowledgePointType {
    CORE = '核心',
    IMPORTANT = '重点',
    OPTIONAL = '选学',
}

/**
 * 知识点接口定义
 * 代表课程大纲中的一个最小知识单元。
 */
export interface KnowledgePoint {
    id: string;
    title: string;
    type: KnowledgePointType;
}