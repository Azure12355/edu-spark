// src/components/teacher/course-management/ai-generate/GeneratedQuestionCard/CardHeader.tsx
"use client";
import React, { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { AIGeneratedQuestion } from '@/lib/data/aiGeneratedQuestionsData';
import { useAIGeneratedQuestionsStore } from '@/store/aiGeneratedQuestionsStore';
import { useToast } from '@/hooks/useToast';
import styles from './CardHeader.module.css';
// --- 核心新增：导入通用确认模态框 ---
import ConfirmationModal from '@/components/common/ConfirmationModal/ConfirmationModal';

interface Props {
    question: AIGeneratedQuestion;
    themeColor: string;
    themeBg: string;
}

const CardHeader: React.FC<Props> = ({ question, themeColor, themeBg }) => {
    const params = useParams();
    const courseId = params.id as string;
    const deleteQuestion = useAIGeneratedQuestionsStore((state) => state.deleteQuestion);
    const showToast = useToast();

    // --- 核心新增：管理模态框状态 ---
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    // ... (保留滚动相关的 state 和 hooks) ...
    const scrollRef = useRef<HTMLDivElement>(null);
    const [showLeftFade, setShowLeftFade] = useState(false);
    const [showRightFade, setShowRightFade] = useState(false);
    const checkScrollability = useCallback(() => {
        const el = scrollRef.current;
        if (el) {
            const hasOverflow = el.scrollWidth > el.clientWidth;
            setShowLeftFade(hasOverflow && el.scrollLeft > 10);
            setShowRightFade(hasOverflow && el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
        }
    }, []);
    useEffect(() => {
        const el = scrollRef.current;
        checkScrollability();
        el?.addEventListener('scroll', checkScrollability);
        window.addEventListener('resize', checkScrollability);
        return () => {
            el?.removeEventListener('scroll', checkScrollability);
            window.removeEventListener('resize', checkScrollability);
        };
    }, [checkScrollability, question.points]);


    // --- 核心修改：删除逻辑 ---
    const handleDeleteConfirm = () => {
        deleteQuestion(question.id);
        showToast({ message: '题目已成功删除', type: 'info' });
        // onClose is handled inside ConfirmationModal
    };

    const handleAddToBank = () => { showToast({ message: '功能开发中：加入题库', type: 'info' }); };

    return (
        <>
            <header className={styles.header}>
                {/* ... (左侧 meta 部分保持不变) ... */}
                <div className={styles.meta}>
                    <span
                        className={styles.typeTag}
                        style={{ '--card-theme-color': themeColor, '--card-theme-bg': themeBg } as React.CSSProperties}
                    >
                        {question.type}
                    </span>
                    <span className={styles.pointLabel}>知识点:</span>
                    <div className={styles.pointListContainer}>
                        <div
                            className={styles.scrollFade + ' ' + styles.left}
                            style={{ opacity: showLeftFade ? 1 : 0 }}
                        />
                        <div className={styles.scrollableArea} ref={scrollRef}>
                            {(question.points ?? []).map(point =>
                                <span key={point.id} className={styles.pointTag}>{point.title}</span>
                            )}
                        </div>
                        <div
                            className={styles.scrollFade + ' ' + styles.right}
                            style={{ opacity: showRightFade ? 1 : 0 }}
                        />
                    </div>
                </div>

                <div className={styles.actions}>
                    <button onClick={handleAddToBank} title="加入题库"><i className="fas fa-plus-square"></i></button>
                    <Link href={`/teacher/courses/${courseId}/questions/ai-generate/${question.id}/edit`} passHref>
                        <button title="编辑"><i className="fas fa-pen"></i></button>
                    </Link>
                    {/* --- 核心修改：点击删除按钮时，打开模态框 --- */}
                    <button onClick={() => setIsDeleteModalOpen(true)} title="删除"><i className="fas fa-trash"></i></button>
                </div>
            </header>

            {/* --- 核心新增：渲染确认模态框 --- */}
            <ConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleDeleteConfirm}
                title="确认删除题目"
                message={
                    <>
                        您确定要永久删除这个题目吗？
                        <br/>
                        <strong style={{ color: '#ef4444' }}>此操作不可撤销。</strong>
                    </>
                }
                confirmText="确认删除"
                type="danger"
            />
        </>
    );
};

export default CardHeader;