// src/store/knowledgeStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { KnowledgeBase, Document } from '@/types/knowledge';
import { mockKnowledgeBases, mockDocuments } from '@/lib/data/knowledgeMockData';
import { useDocumentTableStore } from './documentTableStore'; // Import the new store

interface KnowledgeState {
    knowledgeBases: KnowledgeBase[];
    documents: Record<string, Document[]>;

    getKnowledgeBaseById: (id: string) => KnowledgeBase | undefined;
    addKnowledgeBase: (newKb: Omit<KnowledgeBase, 'id' | 'created_at' | 'updated_at'>) => void;
    updateKnowledgeBase: (id: string, updates: Partial<KnowledgeBase>) => void;
    deleteKnowledgeBase: (id: string) => void;

    getDocumentsByKbId: (kbId: string) => Document[];
    addDocuments: (kbId: string, newDocs: Document[]) => void;
    deleteSelectedDocuments: (kbId: string) => void; // This action remains here
}

export const useKnowledgeStore = create<KnowledgeState>()(
    persist(
        (set, get) => ({
            knowledgeBases: mockKnowledgeBases,
            documents: { 'kb_local_1000': mockDocuments },

            getKnowledgeBaseById: (id) => get().knowledgeBases.find(kb => kb.id === id),
            addKnowledgeBase: (newKb) => { /* ... (no change) ... */ },
            updateKnowledgeBase: (id, updates) => { /* ... (no change) ... */ },
            deleteKnowledgeBase: (id) => { /* ... (no change) ... */ },
            getDocumentsByKbId: (kbId) => get().documents[kbId] || [],
            addDocuments: (kbId, newDocs) => { /* ... (no change) ... */ },

            // This action now interacts with another store
            deleteSelectedDocuments: (kbId) => {
                // Get selected IDs from the documentTableStore
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

                // After deleting, clear the selection in the other store
                useDocumentTableStore.getState().clearSelection();
            },
        }),
        {
            name: 'edu-spark-knowledge-storage',
            version: 4,
        }
    )
);