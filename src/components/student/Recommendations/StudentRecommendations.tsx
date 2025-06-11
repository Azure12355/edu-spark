"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import styles from './StudentRecommendations.module.css';

const tabs = ["为你推荐", "618", "父亲节", "小红书", "邀请函", "喜报", "早安", "简历", "名片印刷", "招聘", "商品主图", "教育培训", "公众号首图"];

const RecommendationCard = ({ imgSrc, newTag = false }) => (
    <div className={styles.card}>
        <Image src={imgSrc} alt="推荐模板" layout="fill" objectFit="cover" className={styles.cardImage} />
        {newTag && <div className={styles.newTag}>NEW</div>}
    </div>
);

const SpecialCard = ({ title, daysLeft, date, bgColor, imgUrl }) => (
    <div className={styles.specialCard} style={{ backgroundColor: bgColor }}>
        <div className={styles.specialText}>
            <h3>{title}</h3>
            <div className={styles.daysLeft}>{daysLeft}</div>
            <p>{date}</p>
        </div>
        <div className={styles.specialImage}>
            <Image src={imgUrl} alt={title} width={80} height={80} />
        </div>
    </div>
);


const StudentRecommendations = () => {
    const [activeTab, setActiveTab] = useState("为你推荐");

    return (
        <section>
            <div className={styles.tabsHeader}>
                <div className={styles.tabs}>
                    {tabs.slice(0, 6).map(tab => (
                        <button
                            key={tab}
                            className={`${styles.tabButton} ${activeTab === tab ? styles.active : ''}`}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab}
                        </button>
                    ))}
                    <div className={styles.tabDivider}></div>
                    {tabs.slice(6).map(tab => (
                        <button
                            key={tab}
                            className={`${styles.tabButton} ${activeTab === tab ? styles.active : ''}`}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
                <button className={styles.moreButton}><i className="fas fa-chevron-down"></i></button>
            </div>

            <div className={styles.grid}>
                <SpecialCard
                    title="父亲节"
                    daysLeft="4天后"
                    date="2025.06.15 星期日"
                    bgColor="#FFF7E6"
                    imgUrl="https://via.placeholder.com/80?text=👨‍👧"
                />
                <RecommendationCard imgSrc="https://via.placeholder.com/300x400?text=Template+1" />
                <RecommendationCard imgSrc="https://via.placeholder.com/300x400?text=Template+2" newTag />
                <RecommendationCard imgSrc="https://via.placeholder.com/300x400?text=Template+3" />
                <SpecialCard
                    title="618"
                    daysLeft="7天后"
                    date="2025.06.18 星期三"
                    bgColor="#FFF1F0"
                    imgUrl="https://via.placeholder.com/80?text=🛒"
                />
                <RecommendationCard imgSrc="https://via.placeholder.com/300x400?text=Template+4" />
                <RecommendationCard imgSrc="https://via.placeholder.com/300x400?text=Template+5" />
                <RecommendationCard imgSrc="https://via.placeholder.com/300x400?text=Template+6" />
            </div>
        </section>
    );
};

export default StudentRecommendations;