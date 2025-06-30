// src/lib/data/knowledgeMockData.ts

import { KnowledgeBase, Document, KnowledgeStatus, KnowledgeFormatType, DocumentStatus, DocumentSourceType } from '@/types/knowledge';

// --- 素材库 (保持不变) ---
const kbNames = [ "嵌入式Linux开发教程", "考研政治核心考点", "UI/UX 设计灵感库", "Web安全攻防实战", "机器学习白皮书" ];
const owners = [ { id: 'user_teacher_01', name: '王老师' }, { id: 'user_teacher_02', name: '李教授' } ];
const statuses: KnowledgeStatus[] = ['READY', 'BUILDING', 'ERROR', 'DISABLED', 'READY'];
const formatTypes: KnowledgeFormatType[] = [0, 0, 2, 0, 0];
const docTypes: Document['type'][] = ['pdf', 'docx', 'url', 'md', 'txt'];
const docStatuses: DocumentStatus[] = ['COMPLETED', 'PROCESSING', 'FAILED', 'COMPLETED'];

// --- 数据生成函数 ---

/**
 * 为单个知识库生成一组关联的文档
 * @param kb - 所属的知识库对象
 * @param count - 要生成的文档数量
 * @returns Document[]
 */
const generateMockDocumentsForKb = (kb: KnowledgeBase, count: number): Document[] => {
    const docs: Document[] = [];
    for (let i = 0; i < count; i++) {
        const type = docTypes[i % docTypes.length];
        const now = new Date();
        const docDate = new Date(now.getTime() - i * 3 * 24 * 60 * 60 * 1000); // 每3天一个文档
        const doc: Document = {
            id: `12345${kb.id}_${i}`,
            coze_document_id: `1234123${kb.id}_${i}`,
            knowledge_base_id: kb.id, // 明确绑定到传入的知识库ID
            name: `${kb.name} - 参考资料${i + 1}.${type}`, // 名称与知识库关联
            type: type,
            size: Math.floor(Math.random() * 5 * 1024 * 1024) + 102400, // 100KB to 5MB
            source_type: 0,
            status: docStatuses[i % docStatuses.length],
            slice_count: Math.floor(Math.random() * 200) + 1,
            char_count: Math.floor(Math.random() * 300000) + 5000,
            created_at: docDate.toISOString(),
            updated_at: docDate.toISOString(),
            error_message: docStatuses[i % docStatuses.length] === 'FAILED' ? '文件解析失败，请检查格式。' : undefined,
        };
        docs.push(doc);
    }
    return docs;
}


/**
 * 生成所有模拟数据，包括知识库和它们各自的文档
 * @param kbCount - 要生成的知识库数量
 * @param docsPerKb - 每个知识库平均的文档数量
 * @returns { knowledgeBases: KnowledgeBase[], documents: Record<string, Document[]> }
 */
const generateAllMockData = (kbCount: number, docsPerKb: number) => {
    const knowledgeBases: KnowledgeBase[] = [];
    const documents: Record<string, Document[]> = {};
    const now = new Date();

    for (let i = 0; i < kbCount; i++) {
        const updatedDate = new Date(now.getTime() - i * 7 * 24 * 60 * 60 * 1000); // 每周一个知识库
        const kb: Omit<KnowledgeBase, 'stats'> = {
            id: `12345${1000 + i}`,
            coze_dataset_id: `755123456789000${1000 + i}`,
            owner_id: owners[i % owners.length].id,
            name: `${kbNames[i % kbNames.length]}`,
            description: `这是关于 ${kbNames[i % kbNames.length]} 的综合知识库。`,
            format_type: formatTypes[i % formatTypes.length],
            visibility: 'PRIVATE',
            fork_count: 0,
            status: statuses[i % statuses.length],
            created_at: updatedDate.toISOString(),
            updated_at: updatedDate.toISOString(),
        };

        const docsForThisKb = generateMockDocumentsForKb(kb as KnowledgeBase, Math.floor(Math.random() * docsPerKb) + 1);
        documents[kb.id] = docsForThisKb;

        const finalKb: KnowledgeBase = {
            ...kb,
            stats: {
                doc_count: docsForThisKb.length,
                slice_count: docsForThisKb.reduce((sum, doc) => sum + doc.slice_count, 0),
                hit_count: Math.floor(Math.random() * 10000),
                all_file_size: docsForThisKb.reduce((sum, doc) => sum + doc.size, 0),
                bot_used_count: Math.floor(Math.random() * 5),
            }
        };
        knowledgeBases.push(finalKb);
    }

    return { knowledgeBases, documents };
};

const allData = generateAllMockData(15, 8); // 生成15个知识库，每个最多8个文档

export const mockKnowledgeBases: KnowledgeBase[] = allData.knowledgeBases;
export const mockDocuments: Record<string, Document[]> = allData.documents;