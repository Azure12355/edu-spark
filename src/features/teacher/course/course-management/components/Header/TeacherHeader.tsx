// src/components/teacher/layout/Header/TeacherHeader.tsx
"use client";

import React, {useEffect, useRef, useState} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {usePathname} from 'next/navigation';
import styles from './TeacherHeader.module.css';
import AuthModal from '@/shared/components/common/auth/AuthModal';
import {useUserStore} from "@/shared/store/userStore";
import {useAuth} from "@/shared/hooks/useAuth";
import UserProfileDropdown from "@/shared/components/common/UserProfileDropdown/UserProfileDropdown";
import {AnimatePresence, motion } from 'framer-motion';

const navLinks = [
    {name: '课程智能体', href: '/teacher/assistant'},
    {name: '工作台', href: '/teacher/studio'},
    {name: '我的课程', href: '/teacher/courses'},
    {name: '知识库', href: '/teacher/knowledge'},
    {name: '共享资源', href: '/teacher/shared-resources'},
];

const TeacherHeader = () => {
    const pathname = usePathname();

    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

    // 【核心修改】: 添加下拉菜单的显示状态
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const { isLoggedIn, loginUser } = useUserStore();
    const { handleLogout } = useAuth();

    // 【核心修改】: 点击外部区域关闭下拉菜单的 Hook
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <>
            <header className={styles.header}>
                <div className={styles.leftSection}>
                    <Link href="/" className={styles.logo}>
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
                    {isLoggedIn && loginUser ? (
                        <div className={styles.profileContainer} ref={dropdownRef}>
                            <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className={styles.avatarButton}>
                                <Image
                                    src={loginUser.avatarUrl || '/default-avatar.jpg'}
                                    alt={loginUser.nickname}
                                    width={36}
                                    height={36}
                                    className={styles.avatar}
                                />
                            </button>

                            <AnimatePresence>
                                {isDropdownOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        transition={{ duration: 0.2, ease: "easeOut" }}
                                    >
                                        <UserProfileDropdown user={loginUser} onLogout={handleLogout} />
                                    </motion.div>
                                )}
                            </AnimatePresence>
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