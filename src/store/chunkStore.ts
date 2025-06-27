// src/store/chunkStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Chunk } from '@/types/knowledge'; // 我们将 Chunk 类型也移到 knowledge.ts 中
import { mockChunks } from '@/lib/data/chunkMockData';

export type ChunkViewMode = 'grid' | 'list';

interface ChunkState {
    // --- State ---
    chunks: Chunk[];
    sourceFilter: string; // 'ALL' or a document id
    searchTerm: string;
    viewMode: ChunkViewMode;
    currentPage: number;
    itemsPerPage: number;

    // --- Actions ---
    setSourceFilter: (filter: string) => void;
    setSearchTerm: (term: string) => void;
    setViewMode: (mode: ChunkViewMode) => void;
    setCurrentPage: (page: number) => void;

    // --- Mock Data Actions ---
    addChunk: (newChunk: Omit<Chunk, 'id'>) => void;
}

export const useChunkStore = create<ChunkState>()(
    persist(
        (set, get) => ({
            // --- Initial State ---
            chunks: mockChunks,
            sourceFilter: 'ALL',
            searchTerm: '',
            viewMode: 'grid',
            currentPage: 1,
            itemsPerPage: 12, // 每页显示12个

            // --- Actions ---
            setSourceFilter: (filter) => set({ sourceFilter: filter, currentPage: 1 }), // 筛选时重置到第一页
            setSearchTerm: (term) => set({ searchTerm: term, currentPage: 1 }), // 搜索时重置到第一页
            setViewMode: (mode) => set({ viewMode: mode }),
            setCurrentPage: (page) => set({ currentPage: page }),

            addChunk: (newChunk) => {
                const fullNewChunk: Chunk = {
                    ...newChunk,
                    id: `chunk_local_${Date.now()}`,
                };
                set(state => ({ chunks: [fullNewChunk, ...state.chunks] }))
            }
        }),
        {
            name: 'edu-spark-chunk-storage',
            version: 1,
        }
    )
);