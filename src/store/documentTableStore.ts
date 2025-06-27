// src/store/documentTableStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface DocumentTableState {
    selectedDocIds: Set<string>;
    toggleDocumentSelection: (docId: string) => void;
    toggleAllDocumentsSelection: (docIds: string[], areAllCurrentlySelected: boolean) => void;
    clearSelection: () => void;
}

// Custom storage wrapper to handle Set serialization
const storageWithSet = {
    getItem: (name: string): string | null => {
        const str = localStorage.getItem(name);
        if (!str) return null;
        return JSON.parse(str, (key, value) => {
            if (typeof value === 'object' && value !== null && value.dataType === 'Set') {
                return new Set(value.value);
            }
            return value;
        });
    },
    setItem: (name: string, value: any): void => {
        const str = JSON.stringify(value, (key, value) => {
            if (value instanceof Set) {
                return { dataType: 'Set', value: Array.from(value) };
            }
            return value;
        });
        localStorage.setItem(name, str);
    },
    removeItem: (name: string): void => localStorage.removeItem(name),
};

export const useDocumentTableStore = create<DocumentTableState>()(
    persist(
        (set, get) => ({
            selectedDocIds: new Set<string>(),

            toggleDocumentSelection: (docId) => {
                set(state => {
                    const newSelection = new Set(state.selectedDocIds);
                    if (newSelection.has(docId)) {
                        newSelection.delete(docId);
                    } else {
                        newSelection.add(docId);
                    }
                    return { selectedDocIds: newSelection };
                });
            },

            toggleAllDocumentsSelection: (docIds, areAllCurrentlySelected) => {
                if (areAllCurrentlySelected) {
                    set({ selectedDocIds: new Set<string>() });
                } else {
                    set({ selectedDocIds: new Set(docIds) });
                }
            },

            clearSelection: () => set({ selectedDocIds: new Set<string>() })
        }),
        {
            name: 'edu-spark-document-table-storage',
            storage: createJSONStorage(() => storageWithSet), // Use our custom storage
            version: 1,
        }
    )
);