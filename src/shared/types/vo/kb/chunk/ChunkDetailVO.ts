// src/shared/types/vo/kb/ChunkDetailVO.ts

/**
 * @description 知识切片详情视图对象（VO），聚合了切片、文档和知识库的详细信息。
 * 严格对标后端的 'com.weilanx.eduspark.model.vo.kb.ChunkDetailVO.java'。
 */
export interface ChunkDetailVO {
    // --- Chunk 自身信息 ---
    id: number;
    content: string;
    charCount: number;
    metadata?: Record<string, any>;
    createdAt: string;

    // --- 关联的 Document 信息 ---
    documentId: number;
    documentName: string;
    documentType: string;
    documentCosUrl: string;

    // --- 关联的 KnowledgeBase 信息 ---
    knowledgeBaseId: number;
    knowledgeBaseName: string;
    knowledgeBaseDescription?: string;
}