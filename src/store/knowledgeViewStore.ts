// src/store/knowledgeViewStore.ts
import { create } from 'zustand';
import { KnowledgeStatus, KnowledgeFormatType } from '@/types/knowledge';

export type KnowledgeSortBy = 'updated_at' | 'name' | 'doc_count';
export type KnowledgeView = 'grid' | 'list';

interface KnowledgeViewState {
    // State
    searchTerm: string;
    filterStatus: KnowledgeStatus | 'ALL';
    filterType: KnowledgeFormatType | 'ALL';
    sortBy: KnowledgeSortBy;
    view: KnowledgeView;

    // Actions
    setSearchTerm: (term: string) => void;
    setFilterStatus: (status: KnowledgeStatus | 'ALL') => void;
    setFilterType: (type: KnowledgeFormatType | 'ALL') => void;
    setSortBy: (sort: KnowledgeSortBy) => void;
    setView: (view: KnowledgeView) => void;
    resetFilters: () => void;
}

export const useKnowledgeViewStore = create<KnowledgeViewState>((set) => ({
    // Initial State
    searchTerm: '',
    filterStatus: 'ALL',
    filterType: 'ALL',
    sortBy: 'updated_at',
    view: 'grid',

    // Actions
    setSearchTerm: (searchTerm) => set({ searchTerm }),
    setFilterStatus: (status) => set({ filterStatus: status }),
    setFilterType: (type) => set({ filterType: type }),
    setSortBy: (sort) => set({ sortBy: sort }),
    setView: (view) => set({ view }),
    resetFilters: () => set({
        searchTerm: '',
        filterStatus: 'ALL',
        filterType: 'ALL',
        sortBy: 'updated_at',
    }),
}));