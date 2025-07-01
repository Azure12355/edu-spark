// src/hooks/useDebounce.ts
import { useEffect, useMemo, useRef } from 'react';

export function useDebounce<T extends (...args: any[]) => void>(callback: T, delay: number) {
    const ref = useRef<T>(callback);

    useEffect(() => {
        ref.current = callback;
    }, [callback]);

    const debouncedCallback = useMemo(() => {
        let timer: ReturnType<typeof setTimeout> | undefined;
        return (...args: Parameters<T>) => {
            clearTimeout(timer);
            timer = setTimeout(() => {
                ref.current(...args);
            }, delay);
        };
    }, [delay]);

    return debouncedCallback;
}