// src/components/teacher/studio/StudioSidebar/StudioSidebar.tsx
import React from 'react';
import Image from 'next/image';
import styles from './StudioSidebar.module.css';

const QuickAccess = () => (
    <div className={styles.card}>
        <div className={styles.header}>
            <h3 className={styles.title}>快速入口</h3>
            <a href="#" className={styles.moreLink}>查看更多</a>
        </div>
        <div className={styles.grid}>
            <a href="#" className={styles.item}><div className={styles.itemIcon}><i className="fas fa-book"></i></div><span>内容管理</span></a>
            <a href="#" className={styles.item}><div className={styles.itemIcon}><i className="fas fa-users"></i></div><span>用户管理</span></a>
            <a href="#" className={styles.item}><div className={styles.itemIcon}><i className="fas fa-file-alt"></i></div><span>线上推广</span></a>
            <a href="#" className={styles.item}><div className={styles.itemIcon}><i className="fas fa-chart-bar"></i></div><span>内容报表</span></a>
        </div>
    </div>
);

const Announcements = () => (
    <div className={styles.card}>
        <div className={styles.header}>
            <h3 className={styles.title}>公告</h3>
            <a href="#" className={styles.moreLink}>查看更多</a>
        </div>
        <div className={styles.announcementList}>
            <div className={styles.announcementItem}>
                <span className={styles.tag}>活动</span>
                <span className={styles.announcementText}>内容创作激励活动</span>
            </div>
            <div className={styles.announcementItem}>
                <span className={styles.tag}>通知</span>
                <span className={styles.announcementText}>新版产品试用期即将结束...</span>
            </div>
        </div>
    </div>
);

const DocCenter = () => (
    <div className={styles.card}>
        <div className={styles.header}>
            <h3 className={styles.title}>文档中心</h3>
            <a href="#" className={styles.moreLink}>查看更多</a>
        </div>
        <Image src="/images/student-dashboard/avatar1.png" alt="Doc Center" width={300} height={150} className={styles.image} />
    </div>
)


const StudioSidebar = () => {
    return (
        <aside className={styles.sidebar}>
            <QuickAccess />
            <Announcements />
            <DocCenter />
        </aside>
    );
};

export default StudioSidebar;