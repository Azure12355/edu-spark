// src/components/teacher/layout/Header/TeacherHeader.tsx
"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import styles from './TeacherHeader.module.css';

const navLinks = [
    { name: '工作台', href: '/teacher/studio' },
    { name: '智能助教', href: '/teacher/assistant' },
    { name: '我的课程', href: '/teacher/courses' },
    { name: '智能组卷', href: '/teacher/exam-builder' },
    { name: 'AI备课助手', href: '/teacher/ai-assistant' },
];

const TeacherHeader = () => {
    const pathname = usePathname();

    return (
        <header className={styles.header}>
            <div className={styles.leftSection}>
                <Link href="/teacher/courses" className={styles.logo}>
                    <Image src="/robot.gif" alt="EduSpark Logo" width={44} height={44} />
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
                <div className={styles.avatar} title="个人中心">
                    {/* Placeholder for user avatar */}
                </div>
            </div>
        </header>
    );
};

export default TeacherHeader;