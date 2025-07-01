"use client";
import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import styles from './historyDetail.module.css';
import HistoryDetailHeader from '@/features/student/sub-features/history/HistoryDetailHeader/HistoryDetailHeader';
import ConversationView from '@/features/student/sub-features/history/ConversationView/ConversationView';
import { historyData } from '@/shared/lib/data/historyData';
import { agentData } from '@/shared/lib/data/agentData';

export default function HistoryDetailPage() {
    const params = useParams();
    const historyId = params.id as string;

    const historyEntry = historyData.find(h => h.id === historyId);

    if (!historyEntry) {
        return (
            <div className={styles.notFoundContainer}>
                <div className={styles.notFoundIcon}>
                    <i className="far fa-sad-tear"></i>
                </div>
                <h2>对话记录未找到</h2>
                <p>抱歉，我们无法找到您想查看的对话记录。它可能已被删除或链接有误。</p>
                <Link href="/student/history" className={styles.backLink}>
                    返回对话历史
                </Link>
            </div>
        );
    }

    const agent = agentData.find(a => a.id === historyEntry.agentId);

    if (!agent) {
        // 这种情况理论上不应该发生，但作为代码健壮性处理
        return (
            <div className={styles.notFoundContainer}>
                <div className={styles.notFoundIcon}>
                    <i className="fas fa-ghost"></i>
                </div>
                <h2>Agent 信息丢失</h2>
                <p>我们找到了对话记录，但关联的 Agent 信息已不存在。</p>
                <Link href="/student/history" className={styles.backLink}>
                    返回对话历史
                </Link>
            </div>
        );
    }

    return (
        <div className={styles.detailContainer}>
            <HistoryDetailHeader agent={agent} />
            <ConversationView history={historyEntry} agent={agent} />
        </div>
    );
}