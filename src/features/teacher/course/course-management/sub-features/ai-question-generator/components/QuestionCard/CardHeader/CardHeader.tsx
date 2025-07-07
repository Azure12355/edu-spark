// src/features/teacher/course/course-management/sub-features/ai-question-generator/components/QuestionCard/CardHeader.tsx
"use client";
import React, { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { AIQuestionRecordVO, QuestionTypeTextMap } from '@/shared/types';
import styles from './CardHeader.module.css';
import ConfirmationModal from '@/shared/components/ui/ConfirmationModal/ConfirmationModal';
import Tooltip from "@/shared/components/ui/Tooltip/Tooltip";

interface Props {
    question: AIQuestionRecordVO;
    themeColor: string;
    themeBg: string;
    onDelete: (id: number) => void;
    onAddToBank: (id: number) => void;
}

const CardHeader: React.FC<Props> = ({ question, themeColor, themeBg, onDelete, onAddToBank }) => {
    const params = useParams();
    const courseId = params.id as string;
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isAddToBankModalOpen, setIsAddToBankModalOpen] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);
    const [showLeftFade, setShowLeftFade] = useState(false);
    const [showRightFade, setShowRightFade] = useState(false);

    const checkScrollability = useCallback(() => {
        const el = scrollRef.current;
        if (el) {
            setShowLeftFade(el.scrollLeft > 0);
            setShowRightFade(el.scrollWidth > el.clientWidth && el.scrollLeft < el.scrollWidth - el.clientWidth);
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
    }, [checkScrollability, question.sourceKnowledgePoints]);

    return (
        <>
            <header className={styles.header}>
                <div className={styles.meta}>
                    <span className={styles.typeTag} style={{ '--card-theme-color': themeColor, '--card-theme-bg': themeBg } as React.CSSProperties}>
                        {QuestionTypeTextMap[question.type as keyof typeof QuestionTypeTextMap] || question.type}
                    </span>
                    <span className={styles.pointLabel}>知识点:</span>
                    <div className={styles.pointListContainer}>
                        <div className={`${styles.scrollFade} ${styles.left}`} style={{ opacity: showLeftFade ? 1 : 0 }} />
                        <div className={styles.scrollableArea} ref={scrollRef}>
                            {(question.sourceKnowledgePoints ?? []).map(point =>
                                <span key={point.knowledgePointId} className={styles.pointTag}>{point.knowledgePointTitle}</span>
                            )}
                        </div>
                        <div className={`${styles.scrollFade} ${styles.right}`} style={{ opacity: showRightFade ? 1 : 0 }} />
                    </div>
                </div>
                <div className={styles.actions}>
                    <Tooltip content="加入题库" position="top"><button onClick={() => setIsAddToBankModalOpen(true)}><i className="fas fa-plus-square"></i></button></Tooltip>
                    <Tooltip content="编辑" position="top"><Link href={`/teacher/courses/${courseId}/questions/ai-generate/${question.id}/edit`} passHref><button><i className="fas fa-pen"></i></button></Link></Tooltip>
                    <Tooltip content="删除" position="top"><button onClick={() => setIsDeleteModalOpen(true)}><i className="fas fa-trash"></i></button></Tooltip>
                </div>
            </header>
            <ConfirmationModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} onConfirm={() => onDelete(question.id)} title="确认删除题目" message="您确定要永久删除这个AI生成的题目吗？" confirmText="确认删除" type="danger" />
            <ConfirmationModal isOpen={isAddToBankModalOpen} onClose={() => setIsAddToBankModalOpen(false)} onConfirm={() => onAddToBank(question.id)} title="加入题库" message="确定要将此题目加入到正式题库中吗？" confirmText="确认加入" type="info" />
        </>
    );
};
export default CardHeader;