// src/store/documentTableStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface DocumentTableState {
    selectedDocIds: Set<string>; // 核心：使用 Set 来存储选中的ID
    toggleDocumentSelection: (docId: string) => void;
    toggleAllDocumentsSelection: (docIds: string[], areAllCurrentlySelected: boolean) => void;
    clearSelection: () => void;
}

// 1. 定义自定义存储适配器，处理 Set 的序列化和反序列化
const customSetStorage = {
    // 从 localStorage 读取数据时，将标记为 'Set' 的对象转换回 Set 实例
    getItem: (name: string): string | null => {
        const str = localStorage.getItem(name);
        if (!str) return null;
        return JSON.parse(str, (key, value) => {
            // 如果 value 是一个对象，且包含我们自定义的 dataType: 'Set' 标记
            if (typeof value === 'object' && value !== null && value.dataType === 'Set') {
                return new Set(value.value); // 将其 value 数组转换回 Set 实例
            }
            return value;
        });
    },
    // 向 localStorage 写入数据时，将 Set 实例转换为普通对象以便 JSON 序列化
    setItem: (name: string, value: any): void => {
        // 使用 JSON.stringify 的 replacer 参数
        const str = JSON.stringify(value, (key, val) => {
            if (val instanceof Set) {
                // 如果遇到 Set 实例，返回一个包含特殊标记和数组表示的对象
                return { dataType: 'Set', value: Array.from(val) };
            }
            return val;
        });
        localStorage.setItem(name, str);
    },
    // 移除数据
    removeItem: (name: string): void => localStorage.removeItem(name),
};

export const useDocumentTableStore = create<DocumentTableState>()(
    persist(
        (set, get) => ({
            selectedDocIds: new Set<string>(), // 初始状态为一个空的 Set

            toggleDocumentSelection: (docId) => {
                set(state => {
                    const newSelection = new Set(state.selectedDocIds); // 创建 Set 的副本以修改
                    if (newSelection.has(docId)) {
                        newSelection.delete(docId);
                    } else {
                        newSelection.add(docId);
                    }
                    return { selectedDocIds: newSelection }; // 返回新的 Set 实例
                });
            },

            toggleAllDocumentsSelection: (docIds, areAllCurrentlySelected) => {
                if (areAllCurrentlySelected) {
                    set({ selectedDocIds: new Set<string>() }); // 如果全选了，则全不选
                } else {
                    set({ selectedDocIds: new Set(docIds) }); // 否则，全选当前页的所有文档ID
                }
            },

            clearSelection: () => set({ selectedDocIds: new Set<string>() }) // 清空选择
        }),
        {
            name: 'edu-spark-document-table-storage', // localStorage 中存储的键名
            storage: createJSONStorage(() => customSetStorage), // 2. 使用我们自定义的存储适配器
            version: 2, // 3. 增加版本号，强制清除旧的 localStorage 数据
        }
    )
);