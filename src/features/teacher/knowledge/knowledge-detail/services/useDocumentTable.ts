// src/hooks/useDocumentTable.ts
import { useState, useCallback } from 'react';

/**
 * @description 管理表格 UI 状态（特别是选择逻辑）的自定义 Hook。
 * @param allItemIdsOnPage - 当前页所有项的 ID 列表。
 */
export const useDocumentTable = (allItemIdsOnPage: (string | number)[]) => {
    // 1. 使用 Set 来管理选择的 ID，性能更优
    const [selectedIds, setSelectedIds] = useState(new Set<string | number>());

    // 2. 切换单个项目的选择状态
    const toggleSelection = useCallback((id: string | number) => {
        setSelectedIds(prev => {
            const newSelection = new Set(prev);
            if (newSelection.has(id)) {
                newSelection.delete(id);
            } else {
                newSelection.add(id);
            }
            return newSelection;
        });
    }, []);

    // 3. 全选/取消全选当前页
    const toggleAllSelection = useCallback(() => {
        setSelectedIds(prev => {
            // 如果当前已全选，则清空；否则，全选当前页所有项
            if (prev.size === allItemIdsOnPage.length) {
                return new Set();
            } else {
                return new Set(allItemIdsOnPage);
            }
        });
    }, [allItemIdsOnPage]);

    // 4. 清空所有选择
    const clearSelection = useCallback(() => {
        setSelectedIds(new Set());
    }, []);

    // 5. 计算是否已全选
    const areAllSelected = allItemIdsOnPage.length > 0 && selectedIds.size === allItemIdsOnPage.length;

    return {
        selectedIds,
        areAllSelected,
        toggleSelection,
        toggleAllSelection,
        clearSelection,
    };
};