// src/shared/hooks/useDebounce.ts
import { useState, useEffect } from 'react';

/**
 * @description 一个用于防抖一个值的自定义 Hook。
 * @template T - 值的类型。
 * @param {T} value - 需要被防抖的原始值。
 * @param {number} delay - 延迟时间（毫秒）。
 * @returns {T} - 返回一个延迟更新的、被防抖后的值。
 */
export function useDebounce<T>(value: T, delay: number): T {
    // 状态，用于存储防抖后的值
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        // 创建一个定时器，在指定的 delay 时间后更新防抖后的值
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        // 清理函数：在下一次 effect 执行前或组件卸载时，清除上一个定时器。
        // 这是关键，确保了只有在 value 停止变化超过 delay 时间后，定时器才能完整执行。
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]); // 仅当 value 或 delay 变化时，才重新设置定时器

    return debouncedValue;
}