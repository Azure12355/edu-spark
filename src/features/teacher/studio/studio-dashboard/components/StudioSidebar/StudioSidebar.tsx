// src/components/teacher/studio/StudioSidebar/StudioSidebar.tsx
import React from 'react';
import styles from './StudioSidebar.module.css';

// 定义入口项的数据结构
interface AccessItem {
    name: string;
    icon: string;
    href: string;
}

// 快捷入口数据
const quickAccessItems: AccessItem[] = [
    { name: '内容管理', icon: 'far fa-file-alt', href: '#' },
    { name: '内容数据', icon: 'far fa-chart-bar', href: '#' },
    { name: '高级管理', icon: 'fas fa-cog', href: '#' },
    { name: '线上推广', icon: 'fas fa-bullhorn', href: '#' },
    { name: '内容投放', icon: 'fas fa-fire', href: '#' },
];

// 最近访问数据
const recentVisitsItems: AccessItem[] = [
    { name: '内容数据', icon: 'far fa-chart-bar', href: '#' },
    { name: '内容管理', icon: 'far fa-file-alt', href: '#' },
    { name: '高级管理', icon: 'fas fa-cog', href: '#' },
];

// 可复用的网格项组件
const AccessGridItem: React.FC<{ item: AccessItem }> = ({ item }) => (
    <a href={item.href} className={styles.item}>
        <div className={styles.itemIcon}>
            <i className={item.icon}></i>
        </div>
        <span className={styles.itemName}>{item.name}</span>
    </a>
);


const StudioSidebar = () => {
    return (
        <aside className={styles.card}>
            {/* 快捷入口部分 */}
            <div className={styles.header}>
                <h3 className={styles.title}>快捷入口</h3>
                <a href="#" className={styles.moreLink}>查看更多</a>
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