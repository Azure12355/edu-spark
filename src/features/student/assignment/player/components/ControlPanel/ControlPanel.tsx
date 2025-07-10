// [!file src/features/student/assignment/player/components/ControlPanel/ControlPanel.tsx]
// [code focus start ++]
"use client";

import React from 'react';
import styles from './ControlPanel.module.css';
import { useAssignmentPlayerStore } from '../../store/assignmentPlayerStore';
import { useConfirmationModal } from '@/shared/hooks/useConfirmationModal';
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';

/**
 * 播放器底部的控制面板，负责题目导航和交卷。
 */
const ControlPanel: React.FC = () => {
    // 1. 从 Zustand Store 获取所有需要的状态和 actions
    const {
        questions,
        currentQuestionIndex,
        userAnswers,
        setCurrentQuestionIndex,
        submitAnswers
    } = useAssignmentPlayerStore();

    // 2. 引入确认弹窗 Hook
    const showConfirmationModal = useConfirmationModal();

    // 3. 计算状态
    const isFirst = currentQuestionIndex === 0;
    const isLast = currentQuestionIndex === questions.length - 1;
    const answeredCount = Object.keys(userAnswers).length;
    const totalCount = questions.length;

    // 4. 定义交卷处理函数，包含二次确认逻辑
    const handleConfirmSubmit = () => {
        const unAnsweredCount = totalCount - answeredCount;
        showConfirmationModal({
            title: '确认交卷',
            message: (
                <div>
                    <p>总共有 {totalCount} 道题，您已回答 {answeredCount} 道。</p>
                    {unAnsweredCount > 0 && <p style={{ color: '#ef4444', fontWeight: 500 }}>您还有 {unAnsweredCount} 道题未作答，确定要交卷吗？</p>}
                    <p>交卷后将无法修改答案。</p>
                </div>
            ),
            type: unAnsweredCount > 0 ? 'warning' : 'info',
            confirmText: '确认交卷',
            onConfirm: () => {
                // 用户确认后，调用 store 中的 submitAnswers action
                submitAnswers();
            },
        });
    };

    return (
        <div className={styles.panel}>
            {/* 上一题按钮 */}
            <button
                className={`${styles.button} ${styles.prevNextButton}`}
                onClick={() => setCurrentQuestionIndex(currentQuestionIndex - 1)}
                disabled={isFirst}
            >
                <ArrowLeft size={18} />
                <span>上一题</span>
            </button>

            {/* 根据是否为最后一题，显示“下一题”或“交卷” */}
            {isLast ? (
                <button
                    className={`${styles.button} ${styles.submitButton}`}
                    onClick={handleConfirmSubmit}
                >
                    <CheckCircle size={18} />
                    <span>完成并交卷</span>
                </button>
            ) : (
                <button
                    className={`${styles.button} ${styles.prevNextButton}`}
                    onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}
                    disabled={isLast}
                >
                    <span>下一题</span>
                    <ArrowRight size={18} />
                </button>
            )}
        </div>
    );
};

export default ControlPanel;
// [code focus end ++]