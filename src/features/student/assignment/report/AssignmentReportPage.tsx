// [!file src/features/student/assignment/report/AssignmentReportPage.tsx]
"use client";

import React, { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import styles from './AssignmentReportPage.module.css';
import { useAssignmentReport } from './hooks/useAssignmentReport';

const AssignmentReportPage: React.FC = () => {
    const router = useRouter();
    const { isLoading, activity, result } = useAssignmentReport();

    const scorePercentage = useMemo(() => {
        if (!result) return 0;
        return result.totalScore > 0 ? (result.score / result.totalScore) * 100 : 0;
    }, [result]);

    if (isLoading) {
        return <div className={styles.reportContainer}>加载报告中...</div>;
    }

    if (!result) {
        return <div className={styles.reportContainer}>无法找到练习结果，请返回重试。</div>;
    }

    const circumference = 2 * Math.PI * 80; // circle radius is 80
    const strokeDashoffset = circumference - (scorePercentage / 100) * circumference;

    return (
        <div className={styles.reportContainer}>
            <div className={styles.reportCard}>
                <h1 className={styles.title}>练习报告</h1>
                <p className={styles.subtitle}>{activity?.title}</p>

                <div className={styles.scoreCircle}>
                    <svg width="180" height="180" viewBox="0 0 180 180">
                        <circle cx="90" cy="90" r="80" strokeWidth="15" fill="none" className={styles.circleBg} />
                        <circle cx="90" cy="90" r="80" strokeWidth="15" fill="none" className={styles.circleProgress}
                                strokeDasharray={circumference}
                                strokeDashoffset={strokeDashoffset} />
                    </svg>
                    <div className={styles.scoreText}>
                        {result.score}<small> / {result.totalScore}</small>
                    </div>
                </div>

                <div className={styles.statsGrid}>
                    <div className={styles.statItem}>
                        <div className={styles.statValue}>{result.correctCount}</div>
                        <div className={styles.statLabel}>答对题数</div>
                    </div>
                    <div className={styles.statItem}>
                        <div className={styles.statValue}>{result.totalQuestions - result.correctCount}</div>
                        <div className={styles.statLabel}>答错题数</div>
                    </div>
                    <div className={styles.statItem}>
                        <div className={styles.statValue}>{scorePercentage.toFixed(1)}%</div>
                        <div className={styles.statLabel}>正确率</div>
                    </div>
                </div>

                <div className={styles.actions}>
                    <button className={`${styles.actionButton} ${styles.backButton}`} onClick={() => router.push('/student/assignment/plaza')}>返回练习广场</button>
                    <button className={`${styles.actionButton} ${styles.reviewButton}`} onClick={() => alert("功能开发中...")}>查看解析</button>
                </div>
            </div>
        </div>
    );
};

export default AssignmentReportPage;