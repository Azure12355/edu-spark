// [code focus start ++]
"use client";

import React, { useEffect } from 'react';
import styles from './PlayerHeader.module.css';
import { Timer } from 'lucide-react';
import { useAssignmentPlayerStore } from '../../store/assignmentPlayerStore';
import { useCountdown } from '../../hooks/useCountdown';
import { useConfirmationModal } from '@/shared/hooks/useConfirmationModal';

/**
 * 播放器顶部的 Header, 包含标题和动态倒计时功能。
 */
const PlayerHeader: React.FC = () => {
    // 1. 从 Store 获取活动信息和交卷方法
    const { activity, submitAnswers } = useAssignmentPlayerStore();
    const showConfirmationModal = useConfirmationModal();

    // 2. 从活动配置中获取时间限制（分钟），并转换为秒
    const timeLimitInSeconds = (activity?.config?.timeLimitMinutes || 0) * 60;

    // 3. 定义时间结束时的回调，实现自动交卷
    const handleTimeEnd = () => {
        showConfirmationModal({
            title: '时间到！',
            message: '答题时间已结束，系统将为您自动交卷。',
            type: 'info',
            confirmText: '好的',
            onConfirm: () => {
                submitAnswers();
            }
        });
    };

    // 4. 使用 useCountdown Hook
    const { formattedTime, startCountdown } = useCountdown(timeLimitInSeconds, handleTimeEnd);

    // 5. 当 activity 加载完成后，启动计时器
    useEffect(() => {
        if (timeLimitInSeconds > 0) {
            startCountdown();
        }
    }, [timeLimitInSeconds, startCountdown]);

    const title = activity?.title || '在线练习';

    return (
        <header className={styles.header}>
            <h1 className={styles.title}>{title}</h1>
            {timeLimitInSeconds > 0 && (
                <div className={styles.timer}>
                    <Timer size={20} />
                    <span>剩余时间: <strong>{formattedTime.minutes}:{formattedTime.seconds}</strong></span>
                </div>
            )}
        </header>
    );
};

export default PlayerHeader;
// [code focus end ++]