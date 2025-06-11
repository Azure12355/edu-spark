"use client";
import React from 'react';
import styles from './StudentSidebar.module.css';

const SidebarItem = ({ icon, text, active = false, tag = null, tagColor = 'blue' }) => (
    <a href="#" className={`${styles.sidebarItem} ${active ? styles.active : ''}`}>
        <i className={`fas fa-${icon} ${styles.icon}`}></i>
        <span>{text}</span>
        {tag && <span className={`${styles.tag} ${styles[tagColor]}`}>{tag}</span>}
    </a>
);

const StudentSidebar = () => {
    return (
        <aside className={styles.sidebar}>
            <nav className={styles.navGroup}>
                <SidebarItem icon="star" text="为你推荐" active />
                <SidebarItem icon="th-large" text="模板中心" />
                <SidebarItem icon="cloud" text="素材中心" />
                <SidebarItem icon="plus-square" text="创建设计" />
            </nav>
            <div className={styles.groupTitle}>资源空间</div>
            <nav className={styles.navGroup}>
                <SidebarItem icon="user" text="我的设计" />
                <SidebarItem icon="users" text="创建团队" tag="限免" />
            </nav>
            <div className={styles.groupTitle}>工具箱</div>
            <nav className={styles.navGroup}>
                <SidebarItem icon="magic" text="创客贴AI" />
                <SidebarItem icon="robot" text="智能设计" tag="小红书" tagColor="red" />
                <SidebarItem icon="crop-alt" text="智能抠图" />
                <SidebarItem icon="edit" text="图片编辑" />
                <SidebarItem icon="clone" text="批量设计" />
                <SidebarItem icon="gem" text="生图专业版" />
            </nav>
            <div className={styles.upgradeCard}>
                <div className={styles.upgradeIcon}>
                    <i className="fas fa-users"></i>
                </div>
                <div className={styles.upgradeText}>
                    <h4>免费升级团队版</h4>
                    <p>体验多人在线协作</p>
                </div>
            </div>
        </aside>
    );
};

export default StudentSidebar;