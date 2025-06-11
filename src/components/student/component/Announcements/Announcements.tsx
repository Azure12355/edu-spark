"use client";
import React from 'react';
import styles from './Announcements.module.css';

const announcementsData = [
    { id: 1, tag: '更新', text: '“创建Agent”功能上线Beta版，快来体验！', date: '06-12' },
    { id: 2, tag: '活动', text: '首届校园Agent创作大赛火热进行中', date: '06-10' },
    { id: 3, tag: '上新', text: '新增《嵌入式Linux》课程知识库', date: '06-08' },
];

const Announcements = () => {
    return (
        <div className={styles.card}>
            <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>平台公告</h3>
            </div>
            <div className={styles.announcementList}>
                {announcementsData.map(item => (
                    <a href="#" key={item.id} className={styles.announcementItem}>
                        <span className={`${styles.tag} ${styles[`tag${item.tag}`]}`}>{item.tag}</span>
                        <p className={styles.text}>{item.text}</p>
                        <span className={styles.date}>{item.date}</span>
                    </a>
                ))}
            </div>
        </div>
    );
};

export default Announcements;