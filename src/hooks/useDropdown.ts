import { useState, useRef, useEffect, useCallback } from 'react';

/**
 * @description 管理下拉菜单开关状态和点击外部关闭逻辑的 Hook
 */
// 【核心】: 确保这里有 export 关键字
export const useDropdown = <T extends HTMLElement>() => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<T>(null);

    const toggle = useCallback(() => setIsOpen(prev => !prev), []);
    const close = useCallback(() => setIsOpen(false), []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                close();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [close]);

    return { isOpen, toggle, close, dropdownRef };
};