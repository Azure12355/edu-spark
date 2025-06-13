"use client";
import React from 'react';
import styles from './createAgent.module.css';
import CreateAgentHeader from '@/components/student/component/create-agent/CreateAgentHeader/CreateAgentHeader';
import ConfigPanel from '@/components/student/component/create-agent/ConfigPanel/ConfigPanel';
import ChatPanel from '@/components/student/component/create-agent/ChatPanel/ChatPanel';

export default function CreateAgentPage() {
    return (
        // 我们不再需要 StudentDashboardLayout，因为这个页面应该有自己的全屏布局
        <div className={styles.pageContainer}>
            <CreateAgentHeader />
            <div className={styles.mainLayout}>
                <ConfigPanel />
                <ChatPanel />
            </div>
        </div>
    );
}