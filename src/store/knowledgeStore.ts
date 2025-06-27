// src/store/knowledgeStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {KnowledgeBase, Document, KnowledgeFormatType, KnowledgeStatus} from '@/types/knowledge';
import { mockKnowledgeBases, mockDocuments } from '@/lib/data/knowledgeMockData';

// 1. 新增 Filter 和 Sort 的类型定义
export type KnowledgeFilterStatus = 'ALL' | KnowledgeStatus;
export type KnowledgeFilterType = 'ALL' | KnowledgeFormatType;
export type KnowledgeSortBy = 'updated_at' | 'name' | 'fork_count';

// 定义 Store 的状态和操作
interface KnowledgeState {
    // --- State ---
    knowledgeBases: KnowledgeBase[];
    documents: Record<string, Document[]>; // 按 knowledge_base_id 分组存储文档

    // --- 2. 新增筛选和排序状态 ---
    filterStatus: KnowledgeFilterStatus;
    filterType: KnowledgeFilterType;
    searchTerm: string;
    sortBy: KnowledgeSortBy;

    // --- Actions for KnowledgeBase ---
    getKnowledgeBaseById: (id: string) => KnowledgeBase | undefined;
    addKnowledgeBase: (newKb: Omit<KnowledgeBase, 'id' | 'created_at' | 'updated_at'>) => void;
    updateKnowledgeBase: (id: string, updates: Partial<KnowledgeBase>) => void;
    deleteKnowledgeBase: (id: string) => void;

    // --- Actions for Document ---
    getDocumentsByKbId: (kbId: string) => Document[];
    addDocument: (newDoc: Omit<Document, 'id' | 'created_at' | 'updated_at'>) => void;
    // ... 其他文档操作可以按需添加

    // --- 3. 新增筛选和排序的 Actions ---
    setFilterStatus: (status: KnowledgeFilterStatus) => void;
    setFilterType: (type: KnowledgeFilterType) => void;
    setSearchTerm: (term: string) => void;
    setSortBy: (sort: KnowledgeSortBy) => void;
}

export const useKnowledgeStore = create<KnowledgeState>()(
    persist(
        (set, get) => ({
            // --- Initial State ---
            knowledgeBases: mockKnowledgeBases,
            documents: {
                'kb_local_001': mockDocuments,
                // 其他知识库的文档可以按需初始化
            },

            // 新状态的初始值
            filterStatus: 'ALL',
            filterType: 'ALL',
            searchTerm: '',
            sortBy: 'updated_at',

            // --- KnowledgeBase Actions ---
            getKnowledgeBaseById: (id) => get().knowledgeBases.find(kb => kb.id === id),

            addKnowledgeBase: (newKb) => {
                const fullNewKb: KnowledgeBase = {
                    ...newKb,
                    id: `kb_local_${Date.now()}`,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString(),
                };
                set((state) => ({
                    knowledgeBases: [fullNewKb, ...state.knowledgeBases],
                }));
            },

            updateKnowledgeBase: (id, updates) => {
                set((state) => ({
                    knowledgeBases: state.knowledgeBases.map(kb =>
                        kb.id === id ? { ...kb, ...updates, updated_at: new Date().toISOString() } : kb
                    ),
                }));
            },

            deleteKnowledgeBase: (id) => {
                set((state) => ({
                    knowledgeBases: state.knowledgeBases.filter(kb => kb.id !== id),
                    documents: Object.fromEntries(
                        Object.entries(state.documents).filter(([kbId]) => kbId !== id)
                    )
                }));
            },

            // --- Document Actions ---
            getDocumentsByKbId: (kbId) => get().documents[kbId] || [],

            addDocument: (newDoc) => {
                const fullNewDoc: Document = {
                    ...newDoc,
                    id: `doc_local_${Date.now()}`,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString(),
                };

                set(state => {
                    const docsForKb = state.documents[newDoc.knowledge_base_id] || [];
                    return {
                        documents: {
                            ...state.documents,
                            [newDoc.knowledge_base_id]: [fullNewDoc, ...docsForKb]
                        }
                    }
                });
            },

            // --- 4. 新 Actions 的实现 ---
            setFilterStatus: (status) => set({ filterStatus: status }),
            setFilterType: (type) => set({ filterType: type }),
            setSearchTerm: (term) => set({ searchTerm: term }),
            setSortBy: (sort) => set({ sortBy: sort }),
        }),
        {
            name: 'edu-spark-knowledge-storage', // localStorage 中的 key
            version: 2,
        }
    )
);