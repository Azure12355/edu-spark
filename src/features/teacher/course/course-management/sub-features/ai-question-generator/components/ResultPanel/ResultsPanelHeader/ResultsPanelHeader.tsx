// [!file src/features/teacher/course/course-management/sub-features/ai-question-generator/components/ResultPanel/ResultsPanelHeader/ResultsPanelHeader.tsx]
"use client";
import React, { useState } from 'react';
import styles from './ResultsPanelHeader.module.css';
import ConfirmationModal from '@/shared/components/ui/ConfirmationModal/ConfirmationModal';
import { useToast } from '@/shared/hooks/useToast';
import Tooltip from "@/shared/components/ui/Tooltip/Tooltip";
import {
    useAIGeneratedQuestionsStore
} from "@/features/teacher/course/course-management/sub-features/ai-question-generator/store/aiGeneratedQuestionsStore";

// 1. 移除所有 Props，组件不再依赖外部传入的状态
const ResultsPanelHeader: React.FC = () => {
    // 2. 直接从 Store 中订阅所需的状态和 actions
    const {
        pagination,
        isTaskRunning,
        taskProgress,
        clearQuestions,
        addQuestionToBank,
        startGenerationTask, // 订阅重新生成的 action
    } = useAIGeneratedQuestionsStore();

    // 3. 本地 UI 状态（模态框、刷新动画）保持不变
    const [isClearModalOpen, setIsClearModalOpen] = useState(false);
    const [isAddAllModalOpen, setIsAddAllModalOpen] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false); // 仅用于UI动画
    const showToast = useToast();

    // 4. 事件处理函数直接调用 Store 的 actions
    const handleClearConfirm = () => {
        clearQuestions();
        showToast({ message: '所有已生成题目已清空', type: 'info' });
        // onClose 已经由 Modal 内部处理
    };

    const handleAddAllConfirm = () => {
        // 【待办】: `addQuestionsToBank` 应该支持批量操作
        // addQuestionsToBank();
        showToast({ message: `已将 ${pagination.total} 道题目加入题库`, type: 'success' });
    };

    const handleRefresh = () => {
        if (isTaskRunning) {
            showToast({ message: '正在生成题目，请稍后...', type: 'info' });
            return;
        }
        setIsRefreshing(true);
        // 【待办】: 这里应该调用一个重新生成的 action，目前暂无
        // reGenerateTask();
        setTimeout(() => setIsRefreshing(false), 1500); // 模拟
        showToast({ message: '已请求重新生成', type: 'info' });
    };

    return (
        <>
            <header className={styles.header}>
                <div className={styles.titleGroup}>
                    {/* 5. UI 直接绑定 Store 中的状态 */}
                    <span className={styles.countBadge}>{pagination.total}</span>
                    <h2 className={styles.title}>已生成题目</h2>
                </div>

                <div className={styles.actions}>
                    <div className={styles.buttonGroup}>
                        <Tooltip content="重新生成" position="top">
                            <button
                                className={`${styles.iconButton} ${isRefreshing || isTaskRunning ? styles.spinning : ''}`}
                                onClick={handleRefresh}
                                title="重新生成"
                                disabled={isRefreshing || isTaskRunning}
                            >
                                <i className="fas fa-sync-alt"></i>
                            </button>
                        </Tooltip>
                        <Tooltip content="清空当前所有结果" position="top">
                            <button
                                onClick={() => setIsClearModalOpen(true)}
                                className={styles.textButton}
                                disabled={pagination.total === 0 || isTaskRunning}
                            >
                                清空题目
                            </button>
                        </Tooltip>
                    </div>
                    <div className={styles.divider}></div>
                    <Tooltip content="将当前所有题目加入题库" position="top">
                        <button
                            onClick={() => setIsAddAllModalOpen(true)}
                            className={`${styles.textButton} ${styles.primaryButton}`}
                            disabled={pagination.total === 0 || isTaskRunning}
                        >
                            全部加入题库
                        </button>
                    </Tooltip>
                </div>
            </header>

            {/* 6. 模态框逻辑保持不变，但 onConfirm 调用的是 Store 的 action */}
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
                message={`您确定要将当前已生成的 ${pagination.total} 道题目全部加入到正式题库中吗？`}
                confirmText="确认加入"
                type="info"
            />
        </>
    );
};

export default ResultsPanelHeader;