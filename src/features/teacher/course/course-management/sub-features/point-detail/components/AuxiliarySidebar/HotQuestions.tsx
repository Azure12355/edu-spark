// [!file src/features/teacher/course/course-management/sub-features/point-detail/components/AuxiliarySidebar/HotQuestions.tsx]
"use client";

import React from 'react';
import Link from 'next/link';
import styles from './AuxiliarySidebar.module.css';

export interface HotQuestion {
    id: string;
    title: string;
    viewCount: number;
}

interface HotQuestionsProps {
    questions: HotQuestion[];
}

const HotQuestions: React.FC<HotQuestionsProps> = ({ questions }) => {
    const getHotnessColor = (index: number) => {
        if (index === 0) return styles.hotnessTop1;
        if (index === 1) return styles.hotnessTop2;
        if (index === 2) return styles.hotnessTop3;
        return styles.hotnessNormal;
    };

    return (
        <div className={`${styles.card} ${styles.hotQuestionsCard}`}>
            <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}><i className="fas fa-fire-alt"></i> 热门题目榜</h3>
                <Link href="#" className={styles.moreLink}>更多</Link>
            </div>
            <div className={styles.hotList}>
                {questions.map((q, index) => (
                    <Link key={q.id} href="#" className={styles.hotItem}>
                        <span className={`${styles.hotRank} ${getHotnessColor(index)}`}>{index + 1}</span>
                        <span className={styles.hotTitle} title={q.title}>{q.title}</span>
                        <span className={styles.hotViews}><i className="far fa-eye"></i> {q.viewCount}</span>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default HotQuestions;