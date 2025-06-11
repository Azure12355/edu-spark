"use client";
import React from 'react';
import Image from 'next/image';
import styles from './PopularCreators.module.css';

// 模拟数据
const creatorData = [
    { id: 1, name: '李教授', avatar: '/images/student-dashboard/avatar1.png', specialty: '计算机科学', isFollowed: false },
    { id: 2, name: 'Anna', avatar: '/images/student-dashboard/avatar2.png', specialty: '外国语言文学', isFollowed: true },
    { id: 3, name: '华尔街之狼', avatar: '/images/student-dashboard/avatar3.png', specialty: '金融与经济', isFollowed: false },
];

const PopularCreators = () => {
    return (
        <div className={styles.card}>
            <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>热门创作者</h3>
                <a href="#" className={styles.viewAll}>查看更多 {'>'}</a>
            </div>
            <div className={styles.creatorList}>
                {creatorData.map(creator => (
                    <div key={creator.id} className={styles.creatorItem}>
                        <Image src={creator.avatar} alt={creator.name} width={40} height={40} className={styles.creatorAvatar} />
                        <div className={styles.creatorInfo}>
                            <span className={styles.creatorName}>{creator.name}</span>
                            <span className={styles.creatorSpecialty}>{creator.specialty}</span>
                        </div>
                        <button className={`${styles.followButton} ${creator.isFollowed ? styles.followed : ''}`}>
                            {creator.isFollowed ? '已关注' : '关注'}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PopularCreators;