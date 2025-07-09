// [!file src/features/teacher/course/course-management/sub-features/assignments-management/sub-features/assignment-edit/components/QuestionLinkManager/QuestionLinkManager.tsx]
"use client";

import React, { useState, useMemo } from 'react';
import styles from './QuestionLinkManager.module.css';
import QuestionListItem from './QuestionListItem';
import AddQuestionModal from './AddQuestionModal';
import { AssignmentQuestionLinkVO, QuestionVO } from '@/shared/types';

interface QuestionLinkManagerProps {
    questions: AssignmentQuestionLinkVO[];
    onAddQuestion: (question: QuestionVO, score: number) => Promise<boolean>;
    onUpdateQuestionLink: (questionId: number, newScore: number, newOrderIndex: number) => void;
    onRemoveQuestion: (questionId: number) => void;
    courseId: number; // 从父组件获取当前课程ID，用于AddQuestionModal
    isLoading?: boolean; // 用于显示加载状态
}

const QuestionLinkManager: React.FC<QuestionLinkManagerProps> = ({
                                                                     questions,
                                                                     onAddQuestion,
                                                                     onUpdateQuestionLink,
                                                                     onRemoveQuestion,
                                                                     courseId,
                                                                     isLoading = false,
                                                                 }) => {
    // 1. 弹窗状态管理
    const [isAddQuestionModalOpen, setIsAddQuestionModalOpen] = useState(false);
    const openAddQuestionModal = () => setIsAddQuestionModalOpen(true);
    const closeAddQuestionModal = () => setIsAddQuestionModalOpen(false);

    // 2. 传递给 AddQuestionModal 的现有题目ID列表
    const existingQuestionIds = useMemo(() => questions.map(q => Number(q.question.id)), [questions]);

    return (
        <div className={styles.managerContainer}>
            <h2 className={styles.sectionTitle}>题目管理</h2>
            <div className={styles.toolbar}>
                <button onClick={openAddQuestionModal} className={styles.addButton}>
                    <i className="fas fa-plus"></i>
                    <span>添加题目</span>
                </button>
                {/* 未来可以有其他批量操作按钮，例如批量设置分值，批量删除等 */}
            </div>

            {/* 题目列表 */}
            {isLoading && questions.length === 0 ? (
                <div className={styles.loadingState}>
                    <i className="fas fa-spinner fa-spin"></i>
                    <p>正在加载题目...</p>
                </div>
            ) : questions.length === 0 ? (
                <div className={styles.emptyState}>
                    <i className="fas fa-clipboard-question"></i>
                    <p>该模板还没有关联任何题目</p>
                    <button onClick={openAddQuestionModal} className={styles.addButton}>
                        <i className="fas fa-plus"></i> 添加第一道题目
                    </button>
                </div>
            ) : (
                <div className={styles.questionList}>
                    {/* 表头 */}
                    <div className={styles.listHeader}>
                        <div className={styles.headerCell} style={{ flex: 3 }}>题目</div>
                        <div className={styles.headerCell} style={{ flex: 0.5, textAlign: 'right' }}>分值</div>
                        <div className={styles.headerCell} style={{ flex: 0.5, textAlign: 'right', paddingRight: '20px' }}>操作</div> {/* 留出操作按钮空间 */}
                    </div>
                    {/* 题目列表项 */}
                    {questions.map(link => (
                        <QuestionListItem
                            key={link.question.id}
                            link={link}
                            onUpdateLink={onUpdateQuestionLink}
                            onRemoveLink={onRemoveQuestion}
                        />
                    ))}
                    {/* 加载遮罩层，用于异步操作时的局部加载 */}
                    {isLoading && questions.length > 0 && (
                        <div className={styles.loadingOverlay}>
                            <i className="fas fa-spinner fa-spin"></i>
                        </div>
                    )}
                </div>
            )}

            {/* 添加题目弹窗 */}
            <AddQuestionModal
                isOpen={isAddQuestionModalOpen}
                courseId={courseId}
                onClose={closeAddQuestionModal}
                onAddQuestion={onAddQuestion}
                existingQuestionIds={existingQuestionIds}
            />
        </div>
    );
};

export default QuestionLinkManager;