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
    // 优化：使用 useRef 来存储计时器ID，这样它在组件重渲染时不会丢失
    const hideProfileTimerRef = useRef<NodeJS.Timeout | null>(null);

    const VISIBLE_LINKS_COUNT = 5;
    const visibleLinks = navLinks.slice(0, VISIBLE_LINKS_COUNT);
    const collapsedLinks = navLinks.slice(VISIBLE_LINKS_COUNT);

    // --- 优化：新的鼠标事件处理函数 ---
    const handleProfileMouseEnter = () => {
        // 如果有正在准备关闭的计时器，立即清除它
        if (hideProfileTimerRef.current) {
            clearTimeout(hideProfileTimerRef.current);
        }
        // 打开下拉菜单
        setProfileOpen(true);
    };

    const handleProfileMouseLeave = () => {
        // 设置一个计时器，在延迟后关闭下拉菜单。
        // 300毫秒是一个比较舒适的用户体验延迟时间，远好于2秒。
        hideProfileTimerRef.current = setTimeout(() => {
            setProfileOpen(false);
        }, 300); // 延迟300毫秒
    };

    useEffect(() => {
        const handleClickOutside = (event: { target: any; }) => {
            if (moreMenuRef.current && !moreMenuRef.current.contains(event.target)) {
                setMoreMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);

        // 组件卸载时，清除所有计时器，防止内存泄漏
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            if (hideProfileTimerRef.current) {
                clearTimeout(hideProfileTimerRef.current);
            }
        };
    }, []);

    useEffect(() => {
        document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'auto';
    }, [isMobileMenuOpen]);

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
                <div className={styles.logoSection}>
                    <Link href="/public" className={styles.logo}>
                        <Image src="/robot.gif" alt="Logo" width={56} height={56} style={{borderRadius: '50%'}} />
                        <h1>EduSpark</h1>
                    </Link>
                    <div className={styles.divider}></div>
                    <button className={styles.versionButton}>
                        个人版 <i className="fas fa-chevron-down"></i>
                    </button>
                </div>

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
                    {/* 优化：绑定新的事件处理函数 */}
                    <div
                        className={styles.profileWrapper}
                        onMouseEnter={handleProfileMouseEnter}
                        onMouseLeave={handleProfileMouseLeave}
                    >
                        <Image src="/robot.gif" alt="Logo" width={42} height={42} className={styles.avatarButton}></Image>
                        {isProfileOpen && <ProfileDropdown />}
                    </div>
                </div>

                <button className={styles.mobileMenuToggle} onClick={() => setMobileMenuOpen(true)}>
                    <i className="fas fa-bars"></i>
                </button>
            </div>

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