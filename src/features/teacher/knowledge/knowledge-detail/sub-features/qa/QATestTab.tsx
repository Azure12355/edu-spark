"use client";

import React from 'react';
import { motion } from 'framer-motion';

// --- 业务逻辑 Hook ---
import { useQATest } from './hooks/useQATest';

// --- UI 子组件 ---
import QAParameters from './components/QAParameters';
import QAChatView from './components/QAChatView';

// --- 样式 ---
import styles from './QATestTab.module.css';

/**
 * @interface QATestTabProps
 * @description QATestTab 组件的 Props 定义。
 */
interface QATestTabProps {
    kbId: number | string;
}

/**
 * 知识问答测试标签页 (装配组件)
 * @description 负责调用 useQATest Hook，并将状态和逻辑装配到 QAParameters 和 QAChatView 组件中。
 */
const QATestTab: React.FC<QATestTabProps> = ({ kbId }) => {
    // 1. 调用核心业务逻辑 Hook，获取所有需要的数据和操作函数
    const {
        params,
        messages,
        isLoading,
        query,
        availableModels,
        actions,
    } = useQATest({ kbId });

    // 动画变体（保持不变）
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.5 } }
    };

    return (
        <motion.div
            className={styles.tabContainer}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {/* 左侧：参数配置面板 */}
            <aside className={styles.leftPanel}>
                <QAParameters
                    params={params}
                    availableModels={availableModels}
                    onRetrievalParamChange={actions.handleRetrievalParamChange}
                    onGenerationParamChange={actions.handleGenerationParamChange}
                    onResetParams={actions.handleResetParams}
                />
            </aside>

            {/* 右侧：聊天视图 */}
            <main className={styles.rightPanel}>
                <QAChatView
                    messages={messages}
                    isLoading={isLoading}
                    query={query}
                    setQuery={actions.setQuery}
                    onSendMessage={actions.handleSendMessage}
                    onClear={actions.handleClear}
                    onStop={actions.handleStop}
                />
            </main>
        </motion.div>
    );
};

export default QATestTab;