// src/store/knowledgeStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { KnowledgeBase, Document, KnowledgeFormatType } from '@/types/knowledge';
import { mockKnowledgeBases, mockDocuments } from '@/lib/data/knowledgeMockData';
import { useDocumentTableStore } from './documentTableStore';

interface KnowledgeState {
    knowledgeBases: KnowledgeBase[];
    documents: Record<string, Document[]>; // key 是 knowledge_base_id

    getKnowledgeBaseById: (id: string) => KnowledgeBase | undefined;
    addKnowledgeBase: (data: { name: string, description: string, format_type: KnowledgeFormatType }) => void;
    deleteKnowledgeBase: (id: string) => void;

    getDocumentsByKbId: (kbId: string) => Document[];
    addDocuments: (kbId: string, newDocs: Omit<Document, 'id' | 'knowledge_base_id'>[]) => void;
    deleteSelectedDocuments: (kbId: string) => void;
}

export const useKnowledgeStore = create<KnowledgeState>()(
    persist(
        (set, get) => ({
            knowledgeBases: mockKnowledgeBases,
            documents: mockDocuments,

            getKnowledgeBaseById: (id) => get().knowledgeBases.find(kb => kb.id === id),

            addKnowledgeBase: (data) => {
                const newKb: KnowledgeBase = {
                    id: `kb_local_${Date.now()}`,
                    coze_dataset_id: `coze_id_${Date.now()}`,
                    owner_id: 'user_teacher_01',
                    name: data.name,
                    description: data.description,
                    format_type: data.format_type,
                    visibility: 'PRIVATE',
                    fork_count: 0,
                    status: 'READY',
                    stats: { doc_count: 0, slice_count: 0, hit_count: 0, all_file_size: 0, bot_used_count: 0 },
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString(),
                };
                set((state) => ({
                    knowledgeBases: [newKb, ...state.knowledgeBases],
                }));
            },

            deleteKnowledgeBase: (id) => {
                set((state) => {
                    const newDocs = { ...state.documents };
                    delete newDocs[id]; // 删除该知识库下的所有文档记录
                    return {
                        knowledgeBases: state.knowledgeBases.filter(kb => kb.id !== id),
                        documents: newDocs,
                    };
                });
            },

            getDocumentsByKbId: (kbId) => get().documents[kbId] || [],

            addDocuments: (kbId, newDocsData) => {
                set(state => {
                    const docsToAdd: Document[] = newDocsData.map(d => ({
                        ...d,
                        id: `doc_${kbId}_${Date.now()}_${Math.random()}`,
                        knowledge_base_id: kbId
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
                const selectedIds = useDocumentTableStore.getState().selectedDocIds;
                if (selectedIds.size === 0) return;
                set(state => {
                    const currentDocs = state.documents[kbId] || [];
                    return {
                        documents: {
                            ...state.documents,
                            [kbId]: currentDocs.filter(doc => !selectedIds.has(doc.id))
                        }
                    };
                });
                useDocumentTableStore.getState().clearSelection();
            },
        }),
        {
            name: 'edu-spark-knowledge-storage',
            version: 5, // 版本迭代
        }
    )
);