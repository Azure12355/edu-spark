// src/components/teacher/layout/Header/TeacherHeader.tsx
"use client";

import React, {useState} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {usePathname} from 'next/navigation';
import styles from './TeacherHeader.module.css';
import AuthModal from '@/components/common/auth/AuthModal';

const navLinks = [
    {name: '工作台', href: '/teacher/studio'},
    {name: '智能助教', href: '/teacher/assistant'},
    {name: '我的课程', href: '/teacher/courses'},
    {name: '知识库', href: '/teacher/knowledge'},
    {name: '共享资源', href: '/teacher/resources'},
    {name: '课程Agent', href: '/teacher/agent'},
];

const TeacherHeader = () => {
    const pathname = usePathname();

    const [isLoggedIn, setIsLoggedIn] = useState(false); // 模拟登录状态
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

    return (
        <>
            <header className={styles.header}>
                <div className={styles.leftSection}>
                    <Link href="/teacher/courses" className={styles.logo}>
                        <Image src="/robot.gif" alt="EduSpark Logo" width={44} height={44}/>
                        <h1>EduSpark · 教师端</h1>
                    </Link>
                    <nav className={styles.navigation}>
                        {navLinks.map(link => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`${styles.navLink} ${pathname.startsWith(link.href) ? styles.navLinkActive : ''}`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </nav>
                </div>
                <div className={styles.rightSection}>
                    <button className={styles.iconButton} title="通知">
                        <i className="far fa-bell"></i>
                    </button>
                    <button className={styles.iconButton} title="帮助中心">
                        <i className="far fa-question-circle"></i>
                    </button>
                    {isLoggedIn ? (
                        <div className={styles.avatar} title="个人中心">
                            {/* 登录后的头像 */}
                        </div>
                    ) : (
                        <div className={styles.authButtons}>
                            <button onClick={() => setIsAuthModalOpen(true)} className={styles.loginButton}>
                                登录 / 注册
                            </button>
                        </div>
                    )}
                </div>
            </header>

            <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />

        </>
    );
};

export default TeacherHeader;