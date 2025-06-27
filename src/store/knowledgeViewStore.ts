// src/store/knowledgeViewStore.ts
import { create } from 'zustand';
import { KnowledgeStatus, KnowledgeFormatType } from '@/types/knowledge';

// Define the filter and sort types that this store will manage
export type KnowledgeFilterStatus = 'ALL' | KnowledgeStatus;
export type KnowledgeFilterType = 'ALL' | KnowledgeFormatType;
export type KnowledgeSortBy = 'updated_at' | 'name' | 'fork_count';

// Define the state and actions for this store
interface KnowledgeViewState {
    filterStatus: KnowledgeFilterStatus;
    filterType: KnowledgeFilterType;
    searchTerm: string;
    sortBy: KnowledgeSortBy;
    setFilterStatus: (status: KnowledgeFilterStatus) => void;
    setFilterType: (type: KnowledgeFilterType) => void;
    setSearchTerm: (term: string) => void;
    setSortBy: (sort: KnowledgeSortBy) => void;
}

export const useKnowledgeViewStore = create<KnowledgeViewState>((set) => ({
    // Initial state for all the view controls
    filterStatus: 'ALL',
    filterType: 'ALL',
    searchTerm: '',
    sortBy: 'updated_at',

    // Actions to update the state
    setFilterStatus: (status) => set({ filterStatus: status }),
    setFilterType: (type) => set({ filterType: type }),
    setSearchTerm: (term) => set({ searchTerm: term }),
    setSortBy: (sort) => set({ sortBy: sort }),
}));