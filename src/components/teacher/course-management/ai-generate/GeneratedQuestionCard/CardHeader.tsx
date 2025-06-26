// src/components/teacher/course-management/ai-generate/GeneratedQuestionCard/CardHeader.tsx
"use client";
import React, { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { AIGeneratedQuestion } from '@/lib/data/aiGeneratedQuestionsData';
import { useAIGeneratedQuestionsStore } from '@/store/aiGeneratedQuestionsStore';
import { useToast } from '@/hooks/useToast';
import styles from './CardHeader.module.css';

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

    // --- 核心新增：滚动状态管理 ---
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
        checkScrollability(); // Initial check
        el?.addEventListener('scroll', checkScrollability);
        window.addEventListener('resize', checkScrollability); // Also check on resize
        return () => {
            el?.removeEventListener('scroll', checkScrollability);
            window.removeEventListener('resize', checkScrollability);
        };
    }, [checkScrollability, question.points]); // Re-check if points change
    // --- 结束新增 ---

    const handleDelete = () => {
        if (window.confirm(`确定要删除题目 "${question.stem.substring(0, 20)}..." 吗？此操作不可撤销。`)) {
            deleteQuestion(question.id);
            showToast({ message: '题目已删除', type: 'info' });
        }
    };
    const handleAddToBank = () => { showToast({ message: '功能开发中：加入题库', type: 'info' }); };

    return (
        <header className={styles.header}>
            <div className={styles.meta}>
                <span
                    className={styles.typeTag}
                    style={{ '--card-theme-color': themeColor, '--card-theme-bg': themeBg } as React.CSSProperties}
                >
                    {question.type}
                </span>
                <span className={styles.pointLabel}>知识点:</span>

                {/* --- 核心修改：包裹滚动区域和遮罩 --- */}
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
                <button onClick={handleDelete} title="删除"><i className="fas fa-trash"></i></button>
            </div>
        </header>
    );
};

export default CardHeader;