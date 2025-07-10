// [!file src/features/student/assignment/plaza/components/AssignmentCard/AssignmentCard.tsx]
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ClassActivityVO } from '@/shared/types';
import styles from './AssignmentCard.module.css';

interface AssignmentCardProps {
    activity: ClassActivityVO;
}

const AssignmentCard: React.FC<AssignmentCardProps> = ({ activity }) => {
    const router = useRouter();

    const statusMap = {
        ONGOING: { text: '进行中', icon: 'fa-play-circle', className: styles.ONGOING },
        NOT_STARTED: { text: '未开始', icon: 'fa-hourglass-start', className: styles.NOT_STARTED },
        ENDED: { text: '已结束', icon: 'fa-check-circle', className: styles.ENDED },
        PENDING: { text: '待发布', icon: 'fa-clock', className: styles.ENDED },
    };

    const typeMap = {
        HOMEWORK: '课程作业',
        QUIZ: '随堂测验',
        MIDTERM_EXAM: '期中考试',
        FINAL_EXAM: '期末考试',
    };

    const { status, text, icon } = statusMap[activity.status as keyof typeof statusMap] || statusMap.ENDED;
    const settings = activity.settingsOverride || {};

    const handleActionClick = (e: React.MouseEvent) => {
        e.preventDefault();
        // 根据状态导航到不同页面
        if (activity.status === 'ENDED') {
            // router.push(`/student/assignment/report/${activity.id}`);
            alert('跳转到报告页面');
        } else {
            router.push(`/student/assignment/player/${activity.id}`);
        }
    };

    return (
        <Link href={`/student/assignment/player/${activity.id}`} className={styles.cardLink}>
            <div className={styles.cardContainer}>
                <div className={styles.header}>
                    <h3 className={styles.title}>{activity.title}</h3>
                    <div className={`${styles.statusTag} ${statusMap[activity.status].className}`}>
                        <i className={`fas ${statusMap[activity.status].icon}`}></i>
                        <span>{statusMap[activity.status].text}</span>
                    </div>
                </div>
                <p className={styles.description}>{activity.description}</p>
                <div className={styles.infoGrid}>
                    <div className={styles.infoItem}>
                        <i className="fas fa-layer-group"></i>
                        <span>类型: <strong>{typeMap[activity.activityType as keyof typeof typeMap] || '练习'}</strong></span>
                    </div>
                    <div className={styles.infoItem}>
                        <i className="fas fa-list-ol"></i>
                        <span>题目: <strong>{settings.questionCount || 0} 题</strong></span>
                    </div>
                    <div className={styles.infoItem}>
                        <i className="fas fa-star"></i>
                        <span>总分: <strong>{settings.totalScore || 0} 分</strong></span>
                    </div>
                </div>
                <div className={styles.footer}>
                    <div className={styles.infoItem}>
                        <i className="fas fa-user-edit"></i>
                        <span>发布者: <strong>{activity.publisher.nickname}</strong></span>
                    </div>
                    <button className={`${styles.actionButton} ${activity.status === 'ENDED' ? styles.report : styles.start}`} onClick={handleActionClick}>
                        {activity.status === 'ENDED' ? '查看报告' : '开始练习'}
                    </button>
                </div>
            </div>
        </Link>
    );
};

export default AssignmentCard;