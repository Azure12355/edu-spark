// src/components/teacher/layout/Header/Header.tsx
"use client";
import '@/app/globals.css'

import React, {useEffect, useRef, useState} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {usePathname} from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { Bell, HelpCircle } from 'lucide-react'; // 引入更现代的 Lucide 图标

import styles from './Header.module.css';
import AuthModal from '@/shared/components/common/auth/AuthModal';
import {useUserStore} from "@/shared/store/userStore";
import {useAuth} from "@/shared/hooks/useAuth";
import UserProfileDropdown from "@/shared/components/common/UserProfileDropdown/UserProfileDropdown";


interface HeaderProps {
    navLinks: Record<string, string>[];
    name: string;
    icon?: string;
}

const Header: React.FC<HeaderProps> = ({navLinks, name, icon}) => {
    const pathname = usePathname();
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const { isLoggedIn, loginUser } = useUserStore();
    const { handleLogout } = useAuth();

    // 点击外部区域关闭下拉菜单的 Hook
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
            {/* 头部容器，采用 Grid 布局实现三栏式完美居中 */}
            <header className={styles.header}>
                {/* 1. 左侧区域：Logo */}
                <div className={styles.leftSection}>
                    <Link href="/home" className={styles.logo}>
                        <Image src={icon || "/robot.gif"} alt="EduSpark Logo" width={44} height={44} className={styles.logoIcon} />
                        <h1 className={styles.logoTitle}>EduSpark · {name}</h1>
                    </Link>
                </div>

                {/* 2. 中间区域：导航链接 */}
                <nav className={styles.navigation}>
                    {navLinks.map(link => {
                        const isActive = pathname.startsWith(link.href);
                        return (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`${styles.navLink} ${isActive ? styles.navLinkActive : ''}`}
                            >
                                {link.name}
                                {/* 【核心交互优化】: 使用 Framer Motion 的 layoutId 实现流体动画指示器 */}
                                {isActive && (
                                    <motion.div
                                        className={styles.activeLinkIndicator}
                                        layoutId="active-nav-link-indicator"
                                        transition={{type: 'spring', stiffness: 350, damping: 30}}
                                    />
                                )}
                            </Link>
                        )
                    })}
                </nav>

                {/* 3. 右侧区域：操作按钮与用户头像 */}
                <div className={styles.rightSection}>
                    <button className={styles.iconButton} title="通知中心">
                        <Bell size={22} strokeWidth={1.5} />
                    </button>
                    <button className={styles.iconButton} title="帮助中心">
                        <HelpCircle size={22} strokeWidth={1.5} />
                    </button>

                    {isLoggedIn && loginUser ? (
                        <div className={styles.profileContainer} ref={dropdownRef}>
                            <motion.button
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className={styles.avatarButton}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Image
                                    src={loginUser.avatarUrl || '/default-avatar.jpg'}
                                    alt={loginUser.nickname}
                                    width={38}
                                    height={38}
                                    className={styles.avatar}
                                />
                            </motion.button>

                            {/* 【核心动画优化】: 使用 AnimatePresence 和更具弹性的 spring 动画 */}
                            <AnimatePresence>
                                {isDropdownOpen && (
                                    <motion.div
                                        className={styles.dropdownWrapper}
                                        initial={{ opacity: 0, y: 15, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 15, scale: 0.95, transition: { duration: 0.15, ease: "easeIn" } }}
                                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
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

export default Header;