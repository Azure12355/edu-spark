// src/components/student/layout/Sidebar/StudentSidebar.tsx
"use client";
import React, { useState } from 'react';
import styles from './StudentSidebar.module.css';

// 重新定义菜单项以适应Agent广场的需求
const sidebarGroups = [
    {
        items: [
            { id: 'agent-square', icon: 'fa-rocket', text: 'Agent 广场' },
            { id: 'leaderboard', icon: 'fa-trophy', text: '热门排行' },
            { id: 'explore', icon: 'fa-compass', text: '探索发现' },
        ],
    },
    {
        title: '我的空间',
        items: [
            { id: 'my-agents', icon: 'fa-user-astronaut', text: '我的 Agent' },
            { id: 'chat-history', icon: 'fa-history', text: '对话历史', tag: '3', tagColor: 'red' },
            { id: 'my-favorites', icon: 'fa-bookmark', text: '我的收藏' },
        ],
    },
    {
        title: '创作中心',
        items: [
            { id: 'create-agent', icon: 'fa-magic', text: '创建 Agent', tag: 'Beta', tagColor: 'blue' },
            { id: 'knowledge-base', icon: 'fa-book', text: '我的知识库' },
            { id: 'debug-center', icon: 'fa-bug', text: '调试中心' },
        ],
    },
];

// 侧边栏项组件 (保持不变)
type SidebarItemProps = {
    icon?: string;
    text?: string;
    active?: boolean;
    tag?: string | any;
    tagColor?: string | any;
    onClick?: React.MouseEventHandler<HTMLAnchorElement>;
};

const SidebarItem = (props: SidebarItemProps) => (
    <a href="#" className={`${styles.sidebarItem} ${props.active ? styles.active : ''}`} onClick={props.onClick}>
        {props.icon === 'custom-pro' ? (
            <span className={styles.customProIcon}>PRO</span>
        ) : (
            <i className={`fas ${props.icon} ${styles.icon}`}></i>
        )}
        <span>{props.text}</span>
        {props.tag && <span className={`${styles.tag} ${styles[props.tagColor]}`}>{props.tag}</span>}
    </a>
);

// 主侧边栏组件
const StudentSidebar = () => {
    // 默认选中 "Agent 广场"
    const [activeId, setActiveId] = useState('agent-square');
    return (
        <aside className={styles.sidebar}>
            <div className={styles.sidebarContent}>
                {sidebarGroups.map((group, groupIndex) => (
                    <nav key={groupIndex} className={styles.navGroup}>
                        {group.title && <div className={styles.groupTitle}>{group.title}</div>}
                        {group.items.map(item => (
                            <SidebarItem
                                key={item.id}
                                icon={item.icon}
                                text={item.text}
                                tag={(item as any )?.tag}
                                tagColor={(item as any)?.tagColor}
                                active={activeId === item.id}
                                onClick={() => setActiveId(item.id)}
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