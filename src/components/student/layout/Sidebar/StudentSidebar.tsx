// src/components/student/Sidebar/StudentSidebar.tsx
"use client";
import React, { useState } from 'react';
import styles from './StudentSidebar.module.css';

// 定义菜单项的数据结构
const sidebarGroups = [
    {
        items: [
            { id: 'recommend', icon: 'fa-star', text: '为你推荐' },
            { id: 'templates', icon: 'fa-window-maximize', text: '模板中心' },
            { id: 'materials', icon: 'fa-shapes', text: '素材中心' },
            { id: 'create', icon: 'fa-plus-square', text: '创建设计' },
        ],
    },
    {
        title: '资源空间',
        items: [
            { id: 'designs', icon: 'fa-user', text: '我的设计' },
            { id: 'team', icon: 'fa-users', text: '创建团队', tag: '限免', tagColor: 'blue' },
        ],
    },
    {
        title: '工具箱',
        items: [
            { id: 'ckt-ai', icon: 'fa-wave-square', text: '创客贴AI' },
            { id: 'smart-design', icon: 'fa-magic', text: '智能设计', tag: '小红书', tagColor: 'red' },
            { id: 'smart-crop', icon: 'fa-crop-alt', text: '智能抠图' },
            { id: 'edit', icon: 'fa-edit', text: '图片编辑' },
            { id: 'batch', icon: 'fa-clone', text: '批量设计' },
            { id: 'pro-gen', icon: 'custom-pro', text: '生图专业版' }, // 使用自定义图标标识
        ],
    },
];

// 侧边栏项组件
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
    const [activeId, setActiveId] = useState('recommend');
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
                        <i className="fas fa-users"></i>
                    </div>
                    <div className={styles.upgradeText}>
                        <h4>免费升级团队版</h4>
                        <p>体验多人在线协作</p>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default StudentSidebar;