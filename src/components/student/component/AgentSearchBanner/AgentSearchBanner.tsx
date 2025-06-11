"use client";
import React from 'react';
import Image from 'next/image';
import styles from './AgentSearchBanner.module.css';

const AgentSearchBanner = () => {
    return (
        <div className={styles.heroBanner}>
            <div className={styles.content}>
                <div className={styles.textSection}>
                    <h2>欢迎来到 Agent 广场</h2>
                    <p>探索由顶尖教师和AI驱动的课程智能体，开启你的超个性化学习之旅。</p>
                </div>
                <div className={styles.searchSection}>
                    <div className={styles.searchBar}>
                        <i className="fas fa-search"></i>
                        <input type="text" placeholder="搜索课程、老师或Agent名称，如“高数辅导”" />
                        <button className={styles.searchButton}>探索 Agent</button>
                    </div>
                    <div className={styles.quickLinks}>
                        <span>热门搜索:</span>
                        <a href="#">🔥 Python编程</a>
                        <a href="#">考研政治</a>
                        <a href="#">Java面试</a>
                        <a href="#">AI绘画</a>
                    </div>
                </div>
            </div>
            <div className={styles.imageContainer}>
                {/* 用一个更有科技感的图片占位符 */}
                <Image src="/images/ai.webp" alt="AI Agent" width={220} height={200} />
            </div>
        </div>
    );
};

export default AgentSearchBanner;