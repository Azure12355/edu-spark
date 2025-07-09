// [!file src/features/teacher/studio/studio-dashboard/components/StudioSidebar/StudioSidebar.tsx]
"use client"; // 确保这是一个客户端组件以使用Link
import React from 'react';
import styles from './StudioSidebar.module.css';
import Link from 'next/link'; // 引入Next.js的Link组件

// 定义入口项的数据结构
interface AccessItem {
    name: string;
    icon: string;
    href: string;
    description?: string; // 新增：简短的描述，用于Tooltip
}

// [code focus start ++]
// --- 核心修改：替换为真实的教学功能快捷入口 ---
const quickAccessItems: AccessItem[] = [
    {
        name: '我的课程',
        icon: 'fas fa-book',
        href: '/teacher/courses',
        description: '查看和管理您创建的所有课程'
    },
    {
        name: '知识库',
        icon: 'fas fa-brain',
        href: '/teacher/knowledge',
        description: '管理您的个人和共享知识库'
    },
    {
        name: 'AI 助教',
        icon: 'fas fa-robot',
        href: '/teacher/assistant',
        description: '与您的专属AI教学助理对话'
    },
    {
        name: '学情分析',
        icon: 'fas fa-chart-pie',
        href: '/teacher/studio', // 当前页面
        description: '查看教学相关的统计数据'
    },
    {
        name: '账号设置',
        icon: 'fas fa-user-cog',
        href: '/profile/settings', // 假设的个人设置页
        description: '修改您的个人信息和偏好'
    },
    {
        name: '帮助中心',
        icon: 'fas fa-question-circle',
        href: '/help',
        description: '获取平台使用帮助和教程'
    },
];

// 最近访问数据 - 这里仍然使用模拟数据，因为真实数据需要从用户行为历史中获取
const recentVisitsItems: AccessItem[] = [
    { name: '我的课程', icon: 'fas fa-book', href: '/teacher/courses', description: '查看和管理您的所有课程' },
    { name: 'AI 助教', icon: 'fas fa-robot', href: '/teacher/assistant', description: '与您的专属AI教学助理对话' },
    { name: '知识库', icon: 'fas fa-brain', href: '/teacher/knowledge', description: '管理您的个人和共享知识库' },
];
// [code focus end ++]


// 可复用的网格项组件 - 【核心修改】使用Link组件
const AccessGridItem: React.FC<{ item: AccessItem }> = ({ item }) => (
    // [code focus start ++]
    <Link href={item.href} className={styles.item} title={item.description}>
        <div className={styles.itemIcon}>
            <i className={item.icon}></i>
        </div>
        <span className={styles.itemName}>{item.name}</span>
    </Link>
    // [code focus end ++]
);


const StudioSidebar = () => {
    return (
        <aside className={styles.card}>
            {/* 快捷入口部分 */}
            <div className={styles.header}>
                <h3 className={styles.title}>快捷入口</h3>
                {/* <a href="#" className={styles.moreLink}>查看更多</a> */}
            </div>
            <div className={styles.grid}>
                {quickAccessItems.map(item => (
                    <AccessGridItem key={item.name} item={item} />
                ))}
            </div>

            {/* 分隔线 */}
            <hr className={styles.divider} />

            {/* 最近访问部分 */}
            <div className={styles.header}>
                <h3 className={styles.title}>最近访问</h3>
            </div>
            <div className={styles.grid}>
                {recentVisitsItems.map(item => (
                    <AccessGridItem key={item.name} item={item} />
                ))}
            </div>
        </aside>
    );
};

export default StudioSidebar;