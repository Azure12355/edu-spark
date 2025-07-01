// src/store/chunkStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Chunk } from '@/shared/types/knowledge';
import { mockChunks } from '@/shared/lib/data/chunkMockData'; // 1. 导入新的mock数据

export type ChunkViewMode = 'grid' | 'list';

interface ChunkState {
    chunks: Chunk[];
    sourceFilter: string; // 'ALL' or a document id
    searchTerm: string;
    viewMode: ChunkViewMode;
    currentPage: number;
    itemsPerPage: number;

    setSourceFilter: (filter: string) => void;
    setSearchTerm: (term: string) => void;
    setViewMode: (mode: ChunkViewMode) => void;
    setCurrentPage: (page: number) => void;
    addChunk: (newChunkData: Omit<Chunk, 'id'>) => void;
}

export const useChunkStore = create<ChunkState>()(
    persist(
        (set, get) => ({
            chunks: mockChunks, // 2. 使用新的mock数据初始化
            sourceFilter: 'ALL',
            searchTerm: '',
            viewMode: 'grid',
            currentPage: 1,
            itemsPerPage: 12,

            setSourceFilter: (filter) => set({ sourceFilter: filter, currentPage: 1 }),
            setSearchTerm: (term) => set({ searchTerm: term, currentPage: 1 }),
            setViewMode: (mode) => set({ viewMode: mode }),
            setCurrentPage: (page) => set({ currentPage: page }),

            addChunk: (newChunkData) => {
                const fullNewChunk: Chunk = {
                    ...newChunkData,
                    id: `chunk_local_${Date.now()}`,
                };
                set(state => ({ chunks: [fullNewChunk, ...state.chunks] }))
            }
        }),
        {
            name: 'edu-spark-chunk-storage',
            version: 2, // 版本迭代
        }
    )
);