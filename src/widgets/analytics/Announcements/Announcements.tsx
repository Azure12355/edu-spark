// src/components/teacher/studio/Announcements/Announcements.tsx
"use client";
import React from 'react';
import styles from './Announcements.module.css';

// 定义公告项的数据结构和类型
type AnnouncementType = '活动' | '消息' | '通知';

interface AnnouncementItemData {
    id: number;
    type: AnnouncementType;
    text: string;
}

// 模拟数据
const announcementData: AnnouncementItemData[] = [
    { id: 1, type: '活动', text: '内容最新优惠活动' },
    { id: 2, type: '消息', text: '新增内容尚未通过审核，详情请...' },
    { id: 3, type: '通知', text: '当前产品试用期即将结束，如需...' },
    { id: 4, type: '通知', text: '1月新系统升级计划通知' },
    { id: 5, type: '消息', text: '新增内容已经通过审核，详情请...' },
];

// 映射公告类型到 CSS 类名
const tagClassMap: Record<AnnouncementType, string> = {
    '活动': styles.tagActivity,
    '消息': styles.tagMessage,
    '通知': styles.tagNotification,
};

const Announcements = () => {
    return (
        <div className={styles.card}>
            <div className={styles.header}>
                <h3 className={styles.title}>公告</h3>
                <a href="#" className={styles.moreLink}>查看更多</a>
            </div>
            <div className={styles.list}>
                {announcementData.map(item => (
                    <a href="#" key={item.id} className={styles.item}>
                        <span className={`${styles.tag} ${tagClassMap[item.type]}`}>
                            {item.type}
                        </span>
                        <p className={styles.text}>{item.text}</p>
                    </a>
                ))}
            </div>
        </div>
    );
};

export default Announcements;