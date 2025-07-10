"use client";

import React from 'react';
import Link from 'next/link';
import styles from './CreationEntrySection.module.css';
import ActionCard, { ActionCardProps } from '../common/ActionCard/ActionCard';

// 1. 定义核心功能卡片的数据
const actionCards: ActionCardProps[] = [
    {
        href: '/student/assistant',
        icon: 'fas fa-comments',
        title: 'AI 智能问答',
        description: '7x24小时在线，随时解答你的课程疑问，提供深度解析。',
        themeColor: '#4f46e5',
    },
    {
        href: '/student/assignment/plaza',
        icon: 'fas fa-pen-ruler',
        title: '在线练习中心',
        description: '海量题库，智能推荐，即时反馈，巩固你的知识掌握。',
        themeColor: '#059669',
    },
    {
        href: '/student/shared-resources',
        icon: 'fas fa-lightbulb',
        title: '探索共享知识库',
        description: '探索资料，创建卡片，打造属于你自己的专属学习大脑。',
        themeColor: '#db2777',
    },
];


/**
 * @description 重构后的学生端核心功能入口区域
 */
const CreationEntrySection = () => {
    return (
        <div className={styles.wrapper}>
            {/* 1. "核心功能" 区域 */}
            <section>
                <h2 className={styles.sectionTitle}>核心功能</h2>
                <div className={styles.actionCardsGrid}>
                    {actionCards.map((card) => (
                        <ActionCard key={card.title} {...card} />
                    ))}
                </div>
            </section>
        </div>
    );
};

export default CreationEntrySection;