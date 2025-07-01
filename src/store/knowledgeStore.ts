// src/store/knowledgeStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
// 【核心修复1】: 导入与后端API响应一致的 VO 类型
import { KnowledgeBaseVO } from '@/services/knowledgeService';
import { DocumentVO } from '@/services/documentService';
import { mockKnowledgeBases, mockDocuments } from '@/lib/data/knowledgeMockData';
import { useDocumentTableStore } from './documentTableStore';
import { useUserStore } from './userStore';

// 【核心修复2】: 定义一个常量空数组，确保引用稳定
const EMPTY_DOCS: DocumentVO[] = [];

interface KnowledgeState {
    // 【核心修复3】: 更新 state 中的类型定义
    knowledgeBases: KnowledgeBaseVO[];
    documents: Record<string, DocumentVO[]>; // key 是 knowledge_base_id

    getKnowledgeBaseById: (id: string) => KnowledgeBaseVO | undefined;
    addKnowledgeBase: (data: { name: string, description: string, format_type: number }) => void;
    deleteKnowledgeBase: (id: string) => void;

    getDocumentsByKbId: (kbId: string) => DocumentVO[];
    addDocuments: (kbId: string, newDocs: Omit<DocumentVO, 'id' | 'knowledgeBaseId' | 'createdAt'>[]) => void;
    deleteSelectedDocuments: (kbId: string) => void;
}

export const useKnowledgeStore = create<KnowledgeState>()(
    persist(
        (set, get) => ({
            knowledgeBases: mockKnowledgeBases as KnowledgeBaseVO[],
            documents: mockDocuments as Record<string, DocumentVO[]>,

            getKnowledgeBaseById: (id) => get().knowledgeBases.find(kb => String(kb.id) === id),

            addKnowledgeBase: (data) => {
                const newKb: KnowledgeBaseVO = {
                    id: Date.now(), // 使用时间戳作为临时ID
                    cozeDatasetId: `coze_id_${Date.now()}`,
                    name: data.name,
                    description: data.description,
                    formatType: data.format_type,
                    // ... 补全其他必要字段
                    visibility: 'PRIVATE',
                    forkCount: 0,
                    metadataStats: { doc_count: 0, slice_count: 0, hit_count: 0, all_file_size: 0, bot_used_count: 0 },
                    owner: useUserStore.getState().loginUser!, // 假设已登录
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                };
                set((state) => ({
                    knowledgeBases: [newKb, ...state.knowledgeBases],
                }));
            },

            deleteKnowledgeBase: (id) => {
                set((state) => {
                    const newDocs = { ...state.documents };
                    delete newDocs[id];
                    return {
                        knowledgeBases: state.knowledgeBases.filter(kb => String(kb.id) !== id),
                        documents: newDocs,
                    };
                });
            },

            // 【核心修复4】: 在找不到时返回预定义的 EMPTY_DOCS
            getDocumentsByKbId: (kbId) => get().documents[kbId] || EMPTY_DOCS,

            addDocuments: (kbId, newDocsData) => {
                set(state => {
                    const docsToAdd: DocumentVO[] = newDocsData.map(d => ({
                        ...d,
                        id: Date.now() + Math.random(),
                        knowledgeBaseId: Number(kbId),
                        createdAt: new Date().toISOString(),
                    }));
                    const currentDocs = state.documents[kbId] || [];
                    return {
                        documents: {
                            ...state.documents,
                            [kbId]: [...docsToAdd, ...currentDocs]
                        }
                    };
                });
            },

            deleteSelectedDocuments: (kbId) => {
                const selectedIds = Array.from(useDocumentTableStore.getState().selectedDocIds).map(Number);
                if (selectedIds.length === 0) return;
                set(state => {
                    const currentDocs = state.documents[kbId] || [];
                    return {
                        documents: {
                            ...state.documents,
                            [kbId]: currentDocs.filter(doc => !selectedIds.includes(doc.id))
                        }
                    };
                });
                useDocumentTableStore.getState().clearSelection();
            },
        }),
        {
            name: 'edu-spark-knowledge-storage',
            version: 6, // 迭代版本以清除旧的不兼容数据
        }
    )
);