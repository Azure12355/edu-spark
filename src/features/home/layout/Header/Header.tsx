// src/components/layout/Header/Header.tsx
"use client";
import React, {useEffect, useRef, useState} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {AnimatePresence, motion} from 'framer-motion';
import styles from './Header.module.css';
import {useUserStore} from "@/shared/store/userStore";
import {useAuth} from "@/shared/hooks/useAuth";
import UserProfileDropdown from "@/shared/components/common/UserProfileDropdown/UserProfileDropdown";
import AuthModal from "@/shared/components/common/auth/AuthModal";

// 更新导航链接以匹配 EduSpark 需求
const navLinksData = [
    {href: "/student/assistant", text: "首页", active: true},
    {href: "/teacher/courses", text: "教师中心", dropdown: true},
    {href: "/student/assistant", text: "学生中心", dropdown: true},
    {href: "#", text: "课程广场", newIndicator: true},
    {href: "#", text: "数据看板"},
    {href: "#", text: "关于我们"},
];

// Framer Motion 动画变体
const headerVariants = {
    hidden: {y: -100, opacity: 0},
    visible: {
        y: 0,
        opacity: 1,
        transition: {type: 'spring', stiffness: 120, damping: 20, delay: 0.2}
    },
};

const mobileNavVariants = {
    hidden: {opacity: 0, x: '100%'},
    visible: {
        opacity: 1,
        x: '0%',
        transition: {type: 'tween', duration: 0.3, ease: 'easeInOut'}
    },
    exit: {
        opacity: 0,
        x: '100%',
        transition: {type: 'tween', duration: 0.3, ease: 'easeInOut'}
    },
};

const mobileNavLinkVariants = {
    hidden: {opacity: 0, x: 20},
    visible: {opacity: 1, x: 0},
};


const Header: React.FC = () => {
    // --- 【核心】: 引入认证状态和逻辑 ---
    const {isLoggedIn, loginUser} = useUserStore();
    const {handleLogout} = useAuth();

    // --- UI 状态 ---
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

    // --- Effect Hooks ---
    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    }, [isMobileMenuOpen]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // 登录成功后关闭弹窗
    const handleLoginSuccess = () => {
        setIsAuthModalOpen(false);
    };


    return (
        <>
            <motion.header
                className={`${styles.veMainHeader} ${isScrolled ? styles.scrolled : ''}`}
                variants={headerVariants}
                initial="hidden"
                animate="visible"
            >
                <div className={styles.veHeaderContainer}>
                    <Link href="/public" className={styles.veLogo}>
                        {/* 假设 Logo 位于 public/images/logo.svg */}
                        <Image
                            src="/robot.gif"
                            alt="EduSpark Logo"
                            width={56}
                            height={56}
                            style={{borderRadius: '50%'}}
                        />
                        <span>EduSpark</span>
                    </Link>


                    {/* Desktop Navigation */}
                    <nav className={`${styles.veMainNav} ${styles.desktopNav}`}>
                        <ul>
                            {navLinksData.map((link, index) => (
                                <motion.li
                                    key={link.text}
                                    initial={{opacity: 0, y: -10}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 0.3 + index * 0.05}}
                                >
                                    <Link href={link.href}
                                          className={`${styles.veNavLink} ${link.active ? styles.active : ''}`}>
                                        {link.text}
                                        {link.newIndicator && <span className={styles.veNewIndicator}></span>}
                                        {link.dropdown && <i className={`fas fa-chevron-down ${styles.veChevron}`}></i>}
                                    </Link>
                                </motion.li>
                            ))}
                        </ul>
                    </nav>

                    {/* --- 【核心】: 动态渲染右侧操作区 --- */}
                    <div className={`${styles.veHeaderActions} ${styles.desktopActions}`}>
                        {isLoggedIn && loginUser ? (
                            // --- 已登录状态 ---
                            <div className={styles.profileContainer} ref={dropdownRef}>
                                <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                        className={styles.avatarButton}>
                                    <Image
                                        src={loginUser.avatarUrl || '/default-avatar.jpg'}
                                        alt={loginUser.nickname}
                                        width={40}
                                        height={40}
                                        style={{borderRadius: '50%'}}
                                    />
                                    <span>{loginUser.nickname}</span>
                                </button>
                                <AnimatePresence>
                                    {isDropdownOpen && (
                                        <motion.div
                                            animate={{opacity: 1, y: 0, scale: 1}}
                                            transition={{duration: 0.2, ease: "easeOut"}}
                                        >
                                            <UserProfileDropdown user={loginUser} onLogout={handleLogout}/>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ) : (
                            // --- 未登录状态 ---
                            <motion.div
                                initial={{opacity: 0}}
                                animate={{opacity: 1}}
                                transition={{delay: 0.9}}
                            >
                                <button onClick={() => setIsAuthModalOpen(true)}
                                        className={`${styles.veActionLink} ${styles.consoleLink}`}>
                                    登录 / 注册
                                </button>
                            </motion.div>
                        )}
                    </div>

                    {/* Mobile Menu Toggle Button */}
                    <button
                        className={styles.mobileMenuToggle}
                        onClick={toggleMobileMenu}
                        aria-label={isMobileMenuOpen ? "关闭菜单" : "打开菜单"}
                        aria-expanded={isMobileMenuOpen}
                    >
                        <div className={`${styles.hamburgerLine} ${isMobileMenuOpen ? styles.line1Open : ''}`}></div>
                        <div className={`${styles.hamburgerLine} ${isMobileMenuOpen ? styles.line2Open : ''}`}></div>
                        <div className={`${styles.hamburgerLine} ${isMobileMenuOpen ? styles.line3Open : ''}`}></div>
                    </button>
                </div>

                {/* Mobile Navigation Panel */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div className={styles.mobileNavPanel}
                                    variants={headerVariants}
                                    initial="hidden"
                                    animate="visible"
                        >
                            {/* ... (移动端导航保持不变，但登录按钮也需要修改) ... */}
                            <div className={styles.mobileActions}>
                                {/* ... 其他按钮 ... */}
                                {isLoggedIn && loginUser ? (
                                    <Link href={loginUser.role === 'TEACHER' ? '/teacher/studio' : '/student/plaza'}
                                          className={`${styles.veActionLinkMobile} ${styles.consoleLinkMobile}`}
                                          onClick={toggleMobileMenu}>
                                        进入工作台
                                    </Link>
                                ) : (
                                    <button onClick={() => {
                                        setIsAuthModalOpen(true);
                                        toggleMobileMenu();
                                    }} className={`${styles.veActionLinkMobile} ${styles.consoleLinkMobile}`}>
                                        登录 / 注册
                                    </button>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.header>

            {/* --- 【核心】: 渲染登录/注册弹窗 --- */}
            <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)}/>

        </>
    );
};

export default Header;