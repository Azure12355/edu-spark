// [!file src/features/teacher/course/course-management/sub-features/assignments-management/sub-features/assignment-player/components/PlayerHeader/PlayerHeader.tsx]
"use client";

import React, { useState, useEffect } from 'react';
import styles from './PlayerHeader.module.css';
import { AssignmentVO } from '@/shared/types';
import Link from 'next/link';

// 定义 Props 类型
interface PlayerHeaderProps {
    assignment: AssignmentVO;
}

// 倒计时逻辑 Hook
const useCountdown = (dueDate: string | undefined) => {
    const [timeLeft, setTimeLeft] = useState('');

    useEffect(() => {
        if (!dueDate) return;

        const intervalId = setInterval(() => {
            const now = new Date().getTime();
            const dueTime = new Date(dueDate).getTime();
            const distance = dueTime - now;

            if (distance < 0) {
                setTimeLeft("已截止");
                clearInterval(intervalId);
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            setTimeLeft(`${days}天 ${hours}时 ${minutes}分 ${seconds}秒`);
        }, 1000);

        return () => clearInterval(intervalId);
    }, [dueDate]);

    return timeLeft;
};


const PlayerHeader: React.FC<PlayerHeaderProps> = ({ assignment }) => {
    const { title, courseId, questionCount, totalScore } = assignment;

    // 从后端获取截止时间（假设在 config 或专门字段中）
    // TODO: 应该从 `class_activities` 表获取真实的 dueAt
    const dueDateFromActivity = "2025-12-31T23:59:59Z"; // 临时硬编码
    const timeLeft = useCountdown(dueDateFromActivity);

    return (
        <header className={styles.header}>
            <div className={styles.leftSection}>
                <Link href={`/teacher/courses/${courseId}/assignments`} className={styles.backButton} title="返回列表">
                    <i className="fas fa-chevron-left"></i>
                </Link>
                <div className={styles.titleContainer}>
                    <h1 className={styles.title}>{title}</h1>
                    <div className={styles.metaInfo}>
                        <span><i className="fas fa-question-circle"></i> {questionCount || 0} 题</span>
                        <span className={styles.divider}>|</span>
                        <span><i className="fas fa-calculator"></i> {totalScore || 0} 分</span>
                    </div>
                </div>
            </div>
            <div className={styles.rightSection}>
                <div className={styles.countdown}>
                    <i className="far fa-clock"></i>
                    <span>剩余时间:</span>
                    <span className={styles.timeValue}>{timeLeft || '加载中...'}</span>
                </div>
                {/*
                <div className={styles.userAvatar}>
                    <img src="/default-avatar.jpg" alt="User" />
                </div>
                */}
            </div>
        </header>
    );
};

export default PlayerHeader;