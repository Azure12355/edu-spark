// src/components/teacher/course-management/ai-generate/ResultsPanel/ResultsPanelHeader.tsx
"use client";
import React, { useState } from 'react';
import styles from './ResultsPanelHeader.module.css';
// --- 核心新增：导入 Store 和 Modal ---
import { useAIGeneratedQuestionsStore } from '@/store/aiGeneratedQuestionsStore';
import ConfirmationModal from '@/components/common/ConfirmationModal/ConfirmationModal';
import { useToast } from '@/hooks/useToast';

interface Props {
    total: number;
}

const ResultsPanelHeader: React.FC<Props> = ({ total }) => {
    // --- 核心新增：获取 actions 并管理模态框状态 ---
    const { clearQuestions, addQuestionsToBank } = useAIGeneratedQuestionsStore();
    const [isClearModalOpen, setIsClearModalOpen] = useState(false);
    const [isAddAllModalOpen, setIsAddAllModalOpen] = useState(false);
    const showToast = useToast();

    // ... (handleRefresh 逻辑保持不变) ...
    const [isRefreshing, setIsRefreshing] = useState(false);
    const handleRefresh = () => { setIsRefreshing(true); setTimeout(() => { setIsRefreshing(false); }, 1000); };

    const handleClearConfirm = () => {
        clearQuestions();
        showToast({ message: '所有已生成题目已清空', type: 'info' });
    }

    const handleAddAllConfirm = () => {
        addQuestionsToBank();
        showToast({ message: `已将 ${total} 道题目加入题库`, type: 'success' });
    }

    return (
        <>
            <header className={styles.header}>
                <div className={styles.titleGroup}>
                    <span className={styles.countBadge}>{total}</span>
                    <h2 className={styles.title}>已生成题目</h2>
                </div>

                <div className={styles.actions}>
                    <div className={styles.buttonGroup}>
                        <button className={`${styles.iconButton} ${isRefreshing ? styles.spinning : ''}`} onClick={handleRefresh} title="重新生成" disabled={isRefreshing}>
                            <i className="fas fa-sync-alt"></i>
                        </button>
                        {/* --- 核心修改：绑定事件打开模态框 --- */}
                        <button onClick={() => setIsClearModalOpen(true)} className={styles.textButton} disabled={total === 0}>清空题目</button>
                    </div>
                    <div className={styles.divider}></div>
                    <button onClick={() => setIsAddAllModalOpen(true)} className={`${styles.textButton} ${styles.primaryButton}`} disabled={total === 0}>加入题库</button>
                </div>
            </header>

            {/* --- 核心新增：为头部按钮渲染模态框 --- */}
            <ConfirmationModal
                isOpen={isClearModalOpen}
                onClose={() => setIsClearModalOpen(false)}
                onConfirm={handleClearConfirm}
                title="确认清空"
                message="您确定要清空所有已生成的题目吗？此操作将无法撤销。"
                confirmText="全部清空"
                type="danger"
            />
            <ConfirmationModal
                isOpen={isAddAllModalOpen}
                onClose={() => setIsAddAllModalOpen(false)}
                onConfirm={handleAddAllConfirm}
                title="确认全部加入题库"
                message={`您确定要将当前已生成的 ${total} 道题目全部加入到正式题库中吗？`}
                confirmText="确认加入"
                type="info"
            />
        </>
    );
};

export default ResultsPanelHeader;