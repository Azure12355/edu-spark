"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './StudentHeader.module.css';

const StudentHeader = () => {
    return (
        <header className={styles.header}>
            <div className={styles.leftSection}>
                <Link href="/student" className={styles.logo}>
                    {/* 使用项目已有的Logo图 */}
                    <Image src="/EduSpark-icon.png" alt="创客贴" width={32} height={32} />
                    <h1>创客贴</h1>
                </Link>
                <div className={styles.divider}></div>
                <button className={styles.versionButton}>
                    个人版 <i className="fas fa-chevron-down"></i>
                </button>
            </div>
            <nav className={styles.navigation}>
                <Link href="#" className={styles.navLinkActive}>首页</Link>
                <Link href="#" className={styles.navLink}>AI工具箱</Link>
                <Link href="#" className={styles.navLink}>定制设计</Link>
                <Link href="#" className={styles.navLink}>印刷制作</Link>
                <Link href="#" className={styles.navLink}>下载APP</Link>
                <button className={styles.navLink}><i className="fas fa-ellipsis-h"></i></button>
            </nav>
            <div className={styles.rightSection}>
                <button className={styles.vipButton}>
                    <i className="fas fa-crown"></i> 开通会员
                </button>
                <button className={styles.enterpriseButton}>
                    <i className="fas fa-building"></i> 企业服务
                </button>
                <button className={styles.iconButton}>
                    <i className="fas fa-bell"></i>
                </button>
                <button className={styles.iconButton}>
                    <div className={styles.avatar}></div>
                </button>
            </div>
        </header>
    );
};

export default StudentHeader;