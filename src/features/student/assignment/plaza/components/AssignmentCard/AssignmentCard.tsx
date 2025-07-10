import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ClassActivityVO, ActivityStatusEnum } from '@/shared/types'; // 1. 导入 ActivityStatusEnum
import styles from './AssignmentCard.module.css';

interface AssignmentCardProps {
    activity: ClassActivityVO;
}

// 2. 使用 Record<ActivityStatusEnum, ...> 来创建类型安全的 statusMap
const statusMap: Record<ActivityStatusEnum, { text: string; icon: string; className: string }> = {
    [ActivityStatusEnum.ONGOING]: { text: '进行中', icon: 'fa-play-circle', className: styles.ONGOING },
    [ActivityStatusEnum.NOT_STARTED]: { text: '未开始', icon: 'fa-hourglass-start', className: styles.NOT_STARTED },
    [ActivityStatusEnum.ENDED]: { text: '已结束', icon: 'fa-check-circle', className: styles.ENDED },
    [ActivityStatusEnum.PENDING]: { text: '待发布', icon: 'fa-clock', className: styles.ENDED }, // PENDING 状态也使用已结束的样式
};


const AssignmentCard: React.FC<AssignmentCardProps> = ({ activity }) => {
    const router = useRouter();

    // ... typeMap 保持不变 ...
    const typeMap = {
        HOMEWORK: '课程作业',
        QUIZ: '随堂测验',
        MIDTERM_EXAM: '期中考试',
        FINAL_EXAM: '期末考试',
    };

    // 3. 将 activity.status 断言为 ActivityStatusEnum
    const currentStatusKey = activity.status as ActivityStatusEnum;
    const statusInfo = statusMap[currentStatusKey] || statusMap.ENDED; // 提供一个默认值以防万一
    const settings = activity.settingsOverride || {};

    const handleActionClick = (e: React.MouseEvent) => {
        e.preventDefault();
        if (currentStatusKey === ActivityStatusEnum.ENDED) {
            router.push(`/student/assignment/report/${activity.id}`);
        } else {
            router.push(`/student/assignment/player/${activity.id}`);
        }
    };

    return (
        <Link href={`/student/assignment/player/${activity.id}`} className={styles.cardLink}>
            <div className={styles.cardContainer}>
                <div className={styles.header}>
                    <h3 className={styles.title}>{activity.title}</h3>
                    {/* 4. 现在 TypeScript 可以安全地推断类型 */}
                    <div className={`${styles.statusTag} ${statusInfo.className}`}>
                        <i className={`fas ${statusInfo.icon}`}></i>
                        <span>{statusInfo.text}</span>
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
                    <button className={`${styles.actionButton} ${currentStatusKey === ActivityStatusEnum.ENDED ? styles.report : styles.start}`} onClick={handleActionClick}>
                        {currentStatusKey === ActivityStatusEnum.ENDED ? '查看报告' : '开始练习'}
                    </button>
                </div>
            </div>
        </Link>
    );
};

export default AssignmentCard;