// src/components/student/Header/StudentHeader.tsx
"use client";
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './StudentHeader.module.css';
import ProfileDropdown from './ProfileDropdown'; // 导入新组件

// 导航链接数据
const navLinks = [
    { text: '首页', href: '/student' },
    { text: 'AI工具箱', href: '#' },
    { text: '定制设计', href: '#' },
    { text: '印刷制作', href: '#' },
    { text: '下载APP', href: '#' },
    { text: '模板中心', href: '#' },
    { text: '素材中心', href: '#' },
];

const StudentHeader = () => {
    const [activeLink, setActiveLink] = useState('首页');
    const [isProfileOpen, setProfileOpen] = useState(false);
    const [isMoreMenuOpen, setMoreMenuOpen] = useState(false);
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const moreMenuRef = useRef<HTMLDivElement>(null);

    // 优化：将可见链接数量改为常量，方便调整
    const VISIBLE_LINKS_COUNT = 5;
    const visibleLinks = navLinks.slice(0, VISIBLE_LINKS_COUNT);
    const collapsedLinks = navLinks.slice(VISIBLE_LINKS_COUNT);

    useEffect(() => {
        // 点击 "更多" 菜单外部时关闭
        //@ts-ignore
        const handleClickOutside = (event) => {
            if (moreMenuRef.current && !moreMenuRef.current.contains(event.target)) {
                setMoreMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        // 移动端菜单打开时，禁止背景滚动
        document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'auto';
    }, [isMobileMenuOpen]);

    // 渲染导航链接的通用函数
    const renderNavLinks = (links: any[], isMobile = false) => (
        links.map(link => (
            <Link
                key={link.text}
                href={link.href}
                className={`${styles.navLink} ${activeLink === link.text ? styles.navLinkActive : ''}`}
                onClick={() => {
                    setActiveLink(link.text);
                    if(isMobile) setMobileMenuOpen(false);
                }}
            >
                {link.text}
            </Link>
        ))
    );

    return (
        <header className={styles.header}>
            <div className={styles.headerContent}>
                {/* Logo 和版本按钮 */}
                <div className={styles.logoSection}>
                    <Link href="/student" className={styles.logo}>
                        <Image src="/EduSpark-icon.png" alt="Logo" width={32} height={32} />
                        <h1>创客贴</h1>
                    </Link>
                    <div className={styles.divider}></div>
                    <button className={styles.versionButton}>
                        个人版 <i className="fas fa-chevron-down"></i>
                    </button>
                </div>

                {/* 桌面端导航 */}
                <nav className={styles.navigation}>
                    {renderNavLinks(visibleLinks)}
                    {collapsedLinks.length > 0 && (
                        <div className={styles.moreMenuWrapper} ref={moreMenuRef}>
                            <button className={styles.navLink} onClick={() => setMoreMenuOpen(!isMoreMenuOpen)}>
                                <i className="fas fa-ellipsis-h"></i>
                            </button>
                            {isMoreMenuOpen && (
                                <div className={styles.moreDropdown}>
                                    {renderNavLinks(collapsedLinks)}
                                </div>
                            )}
                        </div>
                    )}
                </nav>

                {/* 右侧操作区 */}
                <div className={styles.actionsSection}>
                    <button className={styles.vipButton}>
                        <i className="fas fa-crown"></i> 开通会员
                    </button>
                    <button className={styles.enterpriseButton}>
                        <i className="fas fa-building"></i> 企业服务
                    </button>
                    <button className={styles.iconButton}>
                        <i className="fas fa-bell"></i>
                    </button>
                    {/* 优化：使用父容器包裹头像和下拉菜单，并绑定事件 */}
                    <div
                        className={styles.profileWrapper}
                        onMouseEnter={() => setProfileOpen(true)}
                        onMouseLeave={() => setProfileOpen(false)}
                    >
                        <div className={styles.avatarButton}></div>
                        {isProfileOpen && <ProfileDropdown />}
                    </div>
                </div>

                {/* 移动端汉堡菜单按钮 */}
                <button className={styles.mobileMenuToggle} onClick={() => setMobileMenuOpen(true)}>
                    <i className="fas fa-bars"></i>
                </button>
            </div>

            {/* 移动端菜单面板 */}
            {isMobileMenuOpen && (
                <div className={styles.mobileNavPanel}>
                    <div className={styles.mobileNavHeader}>
                        <h3>菜单</h3>
                        <button onClick={() => setMobileMenuOpen(false)}><i className="fas fa-times"></i></button>
                    </div>
                    <nav className={styles.mobileNavLinks}>
                        {renderNavLinks(navLinks, true)}
                    </nav>
                </div>
            )}
        </header>
    );
};

export default StudentHeader;