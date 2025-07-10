// [!file src/features/student/assignment/player/hooks/useCountdown.ts]
import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * 一个通用的倒计时 Hook.
 * @param initialSeconds - 初始倒计时秒数.
 * @param onEnd - 倒计时结束时触发的回调函数.
 */
export const useCountdown = (initialSeconds: number, onEnd?: () => void) => {
    const [secondsLeft, setSecondsLeft] = useState(initialSeconds);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const stopCountdown = useCallback(() => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    }, []);

    const startCountdown = useCallback(() => {
        stopCountdown(); // 先停止任何已存在的计时器
        setSecondsLeft(initialSeconds); // 重置时间

        intervalRef.current = setInterval(() => {
            setSecondsLeft(prev => {
                if (prev <= 1) {
                    stopCountdown();
                    onEnd?.(); // 触发结束回调
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    }, [initialSeconds, onEnd, stopCountdown]);

    // 当组件卸载时，确保清除计时器
    useEffect(() => {
        return () => stopCountdown();
    }, [stopCountdown]);

    // 格式化时间为 MM:SS
    const formattedTime = {
        minutes: Math.floor(secondsLeft / 60).toString().padStart(2, '0'),
        seconds: (secondsLeft % 60).toString().padStart(2, '0'),
    };

    return {
        secondsLeft,
        formattedTime,
        startCountdown,
        stopCountdown,
    };
};