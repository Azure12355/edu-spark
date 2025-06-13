// src/components/student/layout/Sidebar/StudentSidebar.tsx
"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // 导入 usePathname Hook
import styles from './StudentSidebar.module.css';

// 重新定义菜单项以适应Agent广场的需求, 并增加 href 属性
const sidebarGroups = [
    {
        items: [
            { id: 'agent-square', icon: 'fa-rocket', text: 'Agent 广场', href: '/student/plaza' },
            { id: 'agent-robot', icon: 'fa-paper-plane', text: 'Agent 助教', href: '/student/assistant' },
            { id: 'leaderboard', icon: 'fa-trophy', text: '热门排行', href: '/student/leaderboard' },
        ],
    },
    {
        title: '我的空间',
        items: [
            { id: 'my-agents', icon: 'fa-user-astronaut', text: '我的 Agent', href: '/student/my-agents' },
            { id: 'chat-history', icon: 'fa-history', text: '对话历史', href: '/student/history', tag: '3', tagColor: 'red' },
        ],
    },
    {
        title: '创作中心',
        items: [
            { id: 'create-agent', icon: 'fa-magic', text: '创建 Agent', href: '#', tag: 'Beta', tagColor: 'blue' },
            { id: 'knowledge-base', icon: 'fa-book', text: '我的知识库', href: '/student/knowledge', tag: 'Alpha', tagColor: 'red' },
            { id: 'debug-center', icon: 'fa-bug', text: '调试中心', href: '#' },
        ],
    },
];

// 侧边栏项组件
type SidebarItemProps = {
    icon?: string;
    text: string;
    href: string; // 将 href 设为必须
    active?: boolean;
    tag?: string;
    tagColor?: string;
};

// 将 SidebarItem 改造为使用 Next.js Link 组件
const SidebarItem = ({ icon, text, href, active, tag, tagColor }: any) => (
    <Link href={href} className={`${styles.sidebarItem} ${active ? styles.active : ''}`}>
        {icon === 'custom-pro' ? (
            <span className={styles.customProIcon}>PRO</span>
        ) : (
            <i className={`fas ${icon} ${styles.icon}`}></i>
        )}
        <span>{text}</span>
        {tag && <span className={`${styles.tag} ${styles[tagColor]}`}>{tag}</span>}
    </Link>
);

// 主侧边栏组件
const StudentSidebar = () => {
    const pathname = usePathname(); // 获取当前路由路径

    // 根据当前路径判断哪个 item 是 active
    const isActive = (href: string) => {
        if (href === '/student') {
            return pathname === '/student';
        }
        return pathname.startsWith(href) && href !== '/student';
    };

    return (
        <aside className={styles.sidebar}>
            <div className={styles.sidebarContent}>
                {sidebarGroups.map((group, groupIndex) => (
                    <nav key={groupIndex} className={styles.navGroup}>
                        {group.title && <div className={styles.groupTitle}>{group.title}</div>}
                        {group.items.map((item: any) => (
                            <SidebarItem
                                key={item.id}
                                icon={item.icon}
                                text={item.text}
                                href={item.href}
                                tag={item.tag}
                                tagColor={item.tagColor}
                                active={isActive(item.href)}
                            />
                        ))}
                    </nav>
                ))}

                <div className={styles.upgradeCard}>
                    <div className={styles.upgradeIcon}>
                        <i className="fas fa-satellite-dish"></i>
                    </div>
                    <div className={styles.upgradeText}>
                        <h4>升级 Pro 版</h4>
                        <p>解锁更强大的Agent能力</p>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default StudentSidebar;