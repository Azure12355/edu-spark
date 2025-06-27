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


// src/types/knowledge.ts

/**
 * 知识库的格式类型，与 Coze API 对齐。
 * 0: 文本, 2: 图片
 */
export type KnowledgeFormatType = 0 | 2;

/**
 * 知识库的状态，与 Coze API 对齐。
 * 1: 启用中, 3: 未启用
 * 我们在本地业务中可以增加一些状态，如 'BUILDING', 'ERROR'
 */
export type KnowledgeStatus = 'READY' | 'DISABLED' | 'BUILDING' | 'ERROR';

/**
 * 文档的处理状态，与 Coze API 对齐。
 * 0: 处理中, 1: 处理完毕, 9: 失败
 */
export type DocumentStatus = 'PROCESSING' | 'COMPLETED' | 'FAILED';

/**
 * 文档的上传方式，与 Coze API 对齐。
 * 0: 本地文件, 1: 在线网页, 5: file_id
 */
export type DocumentSourceType = 0 | 1 | 5;

/**
 * 知识库 (KnowledgeBase) 实体类型定义
 * 映射自 `knowledge_bases` 表和 Coze Dataset 对象
 */
export interface KnowledgeBase {
    id: string; // 本地主键
    coze_dataset_id: string; // Coze 知识库 ID
    owner_id: string; // 本地用户 ID
    name: string;
    description?: string;
    format_type: KnowledgeFormatType;
    visibility: 'PRIVATE' | 'PUBLIC';
    fork_from_kb_id?: string;
    fork_count: number;
    icon_url?: string;
    status: KnowledgeStatus;
    // 统计信息，对应 Coze 的 doc_count, slice_count 等
    stats: {
        doc_count: number;
        slice_count: number;
        hit_count: number;
        all_file_size: number; // in bytes
        bot_used_count: number;
    };
    // Coze 的分段策略，直接存为 JSON 对象
    chunk_strategy_json?: any;
    created_at: string; // ISO 格式日期字符串
    updated_at: string; // ISO 格式日期字符串
}

/**
 * 文档 (Document) 实体类型定义
 * 映射自 `documents` 表和 Coze DocumentInfo 对象
 */
export interface Document {
    id: string; // 本地主键
    coze_document_id: string; // Coze 文档 ID
    knowledge_base_id: string; // 关联的本地知识库 ID
    name: string;
    type: 'pdf' | 'txt' | 'doc' | 'docx' | 'png' | 'jpg' | 'url'; // 文件类型或来源
    size: number; // in bytes
    source_type: DocumentSourceType;
    status: DocumentStatus;
    slice_count: number;
    char_count: number;
    error_message?: string;
    created_at: string; // ISO 格式日期字符串
    updated_at: string; // ISO 格式日期字符串
}

/**
 * 知识切片 (Chunk) 实体类型定义
 */
export interface Chunk {
    id: string;
    document_id: string; // 来源文档的本地ID
    source_document_name: string;
    content: string;
    char_count: number;
    order_in_document: number;
    created_at: string; // ISO 格式日期字符串
}