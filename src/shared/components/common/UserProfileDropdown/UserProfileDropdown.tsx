"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './UserProfileDropdown.module.css';
import {UserVO} from "@/shared/types";

interface UserProfileDropdownProps {
    user: UserVO;
    onLogout: () => void;
}

const UserProfileDropdown: React.FC<UserProfileDropdownProps> = ({ user, onLogout }) => {

    const roleMap = {
        'STUDENT': { text: '学生', color: '#3b82f6' },
        'TEACHER': { text: '教师', color: '#16a34a' },
        'ADMIN': { text: '管理员', color: '#ef4444' },
    };

    const userRole = roleMap[user.role] || { text: '用户', color: '#64748b' };

    // 根据角色定义不同的导航链接
    const navLinks = user.role === 'TEACHER' ? [
        { href: '/teacher/studio', icon: 'fas fa-chalkboard-teacher', text: '教师工作台' },
        { href: '/teacher/courses', icon: 'fas fa-book-open', text: '我的课程' },
        { href: '/teacher/knowledge', icon: 'fas fa-brain', text: '我的知识库' },
    ] : [
        { href: '/plaza', icon: 'fas fa-store', text: '智能体广场' },
        { href: '/my-agents', icon: 'fas fa-robot', text: '我的智能体' },
        { href: '/history', icon: 'fas fa-history', text: '对话历史' },
    ];


    return (
        <div className={styles.dropdownContainer}>
            <div className={styles.profileInfo}>
                <Image
                    src={user.avatarUrl || '/default-avatar.jpg'}
                    alt={user.nickname}
                    width={48}
                    height={48}
                    className={styles.profileAvatar}
                />
                <div className={styles.profileDetails}>
                    <h4>
                        {user.nickname}
                        <span className={styles.roleTag} style={{ backgroundColor: userRole.color }}>
                            {userRole.text}
                        </span>
                    </h4>
                    <p>用户ID: {user.id}</p>
                </div>
            </div>

            <nav className={styles.actionList}>
                {navLinks.map(link => (
                    <Link key={link.href} href={link.href} className={styles.actionItem}>
                        <i className={link.icon}></i>
                        <span>{link.text}</span>
                    </Link>
                ))}
            </nav>

            <div className={styles.separator}></div>

            <nav className={styles.actionList}>
                <Link href="/profile/settings" className={styles.actionItem}>
                    <i className="fas fa-cog"></i>
                    <span>账号设置</span>
                </Link>
                <Link href="/help-center" className={styles.actionItem}>
                    <i className="fas fa-question-circle"></i>
                    <span>帮助中心</span>
                </Link>
            </nav>

            <div className={styles.logoutWrapper}>
                <button onClick={onLogout} className={styles.logoutButton}>
                    <i className="fas fa-sign-out-alt"></i>
                    <span>退出登录</span>
                </button>
            </div>
        </div>
    );
};

export default UserProfileDropdown;