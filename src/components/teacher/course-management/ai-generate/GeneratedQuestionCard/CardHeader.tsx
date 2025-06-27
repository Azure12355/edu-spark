// src/components/teacher/course-management/ai-generate/GeneratedQuestionCard/CardHeader.tsx
"use client";
import React, { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { AIGeneratedQuestion } from '@/types/question'; // 已更新为新类型
import { useAIGeneratedQuestionsStore } from '@/store/aiGeneratedQuestionsStore';
import { useQuestionBankStore } from '@/store/questionBankStore';
import { useToast } from '@/hooks/useToast';
import styles from './CardHeader.module.css';
import ConfirmationModal from '@/components/common/ConfirmationModal/ConfirmationModal';

interface Props {
    question: AIGeneratedQuestion;
    themeColor: string;
    themeBg: string;
}

// 该组件不直接处理 answer 和 analysis，无需修改
const CardHeader: React.FC<Props> = ({ question, themeColor, themeBg }) => {
    const params = useParams();
    const courseId = params.id as string;
    const { deleteQuestion: deleteAIGeneratedQuestion } = useAIGeneratedQuestionsStore();
    const addQuestionToBank = useQuestionBankStore((state) => state.addQuestion);
    const showToast = useToast();

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isAddToBankModalOpen, setIsAddToBankModalOpen] = useState(false);

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

    const handleDeleteConfirm = () => {
        deleteAIGeneratedQuestion(question.id);
        showToast({ message: '题目已成功删除', type: 'info' });
    };

    const handleAddToBankConfirm = () => {
        addQuestionToBank(question);
        deleteAIGeneratedQuestion(question.id);
        showToast({ message: '题目已成功加入题库！', type: 'success' });
    };

    return (
        <>
            <header className={styles.header}>
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
                    <button onClick={() => setIsAddToBankModalOpen(true)} title="加入题库"><i className="fas fa-plus-square"></i></button>
                    <Link href={`/teacher/courses/${courseId}/questions/ai-generate/${question.id}/edit`} passHref>
                        <button title="编辑"><i className="fas fa-pen"></i></button>
                    </Link>
                    <button onClick={() => setIsDeleteModalOpen(true)} title="删除"><i className="fas fa-trash"></i></button>
                </div>
            </header>

            <ConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleDeleteConfirm}
                title="确认删除题目"
                message={<>您确定要永久删除这个题目吗？<br/><strong style={{ color: '#ef4444' }}>此操作不可撤销。</strong></>}
                confirmText="确认删除"
                type="danger"
            />

            <ConfirmationModal
                isOpen={isAddToBankModalOpen}
                onClose={() => setIsAddToBankModalOpen(false)}
                onConfirm={handleAddToBankConfirm}
                title="加入题库"
                message={
                    <div>
                        <p>确定要将此题目加入以下知识点的题库中吗？</p>
                        <ul style={{ listStyle: 'none', padding: '0 16px', background: '#f9fafb', border: '1px solid #f3f4f6', borderRadius: '8px', textAlign: 'left' }}>
                            {(question.points ?? []).map(p => <li key={p.id} style={{padding: '8px 0'}}>{p.title}</li>)}
                        </ul>
                    </div>
                }
                confirmText="确认加入"
                type="info"
            />
        </>
    );
};

export default CardHeader;