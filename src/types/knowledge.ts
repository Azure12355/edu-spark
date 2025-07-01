/**
 * @file src/types/knowledge.ts
 * @description 与知识体系相关的类型定义，如知识点。
 * 【重构说明】: 与后端交互的实体类型（如 KnowledgeBaseVO, DocumentVO）
 * 已移至对应的 service 文件中进行统一定义，以确保与API响应一致。
 * 此文件现在只保留纯前端或与后端无关的类型。
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

// 注意：原有的 KnowledgeBase, Document, Chunk 等类型已从此文件移除。