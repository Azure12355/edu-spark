// [!file src/widgets/analytics/Announcements/Announcements.tsx]
"use client";
import React from 'react';
import styles from './Announcements.module.css';
import Link from 'next/link'; // 引入Link组件以实现路由跳转

// [code focus start ++]
// --- 核心修改：定义新的数据类型和模拟数据 ---
type AnnouncementType = '待办' | '提醒' | '更新';

interface AnnouncementItemData {
    id: number;
    type: AnnouncementType;
    text: string;
    href: string; // 新增：每个公告都应该可以点击跳转到相关页面
}

// 模拟数据，完全契合教师的教学场景
const announcementData: AnnouncementItemData[] = [
    {
        id: 1,
        type: '待办',
        text: '您有 5 份来自“01班-数据结构期中考”的作业待批改。',
        href: '/teacher/courses/1/activities/1/submissions' // 假设的批改页面路由
    },
    {
        id: 2,
        type: '提醒',
        text: '“02班-计算机网络第一次作业” 将于明天 23:59 截止。',
        href: '/teacher/courses/2/activities/3'
    },
    {
        id: 3,
        type: '更新',
        text: 'AI出题功能已升级，现支持“编程题”的自动生成。',
        href: '/teacher/courses/1/questions/ai-generate'
    },
    {
        id: 4,
        type: '待办',
        text: '学生“派大星”在“操作系统”课程中提出了一个问题。',
        href: '/teacher/qa/123' // 假设的问答详情页
    },
    {
        id: 5,
        type: '更新',
        text: '平台新增了“共享资源中心”，快去发现好用的课程吧！',
        href: '/teacher/shared-resources'
    },
];

// 映射公告类型到 CSS 类名
const tagClassMap: Record<AnnouncementType, string> = {
    '待办': styles.tagTodo,
    '提醒': styles.tagReminder,
    '更新': styles.tagUpdate,
};
// [code focus end ++]

const Announcements = () => {
    return (
        <div className={styles.card}>
            <div className={styles.header}>
                {/* [code focus start ++] */}
                <h3 className={styles.title}>教学动态与待办</h3>
                {/* [code focus end ++] */}
                <a href="#" className={styles.moreLink}>查看更多</a>
            </div>
            <div className={styles.list}>
                {announcementData.map(item => (
                    // [code focus start ++]
                    // 使用 Link 组件实现路由跳转
                    <Link href={item.href} key={item.id} className={styles.item}>
                        <span className={`${styles.tag} ${tagClassMap[item.type]}`}>
                            {item.type}
                        </span>
                        <p className={styles.text}>{item.text}</p>
                    </Link>
                    // [code focus end ++]
                ))}
            </div>
        </div>
    );
};

export default Announcements;