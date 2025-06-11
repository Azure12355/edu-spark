"use client";
import React from 'react';
import Image from 'next/image';
import styles from './StudentHeroBanner.module.css';

const StudentHeroBanner = () => {
    return (
        <div className={styles.heroBanner}>
            <div className={styles.content}>
                <div className={styles.textSection}>
                    <h2>教程玩法中心</h2>
                    <p>从起步到精通 挖掘多元玩法</p>
                    <button>立即了解</button>
                </div>
                <div className={styles.searchSection}>
                    <div className={styles.searchBar}>
                        <i className="fas fa-search"></i>
                        <input type="text" placeholder="用2个及以上关键词描述你想要的设计" />
                        <button className={styles.cameraButton}>
                            <i className="fas fa-camera"></i>
                        </button>
                        <button className={styles.searchButton}>搜索</button>
                    </div>
                    <div className={styles.quickLinks}>
                        <span>你可能想找:</span>
                        <a href="#">🔥 618</a>
                        <a href="#">小红书</a>
                        <a href="#">喜报</a>
                        <a href="#">邀请函</a>
                        <a href="#">AI文案</a>
                    </div>
                </div>
                <div className={styles.pagination}>
                    <span className={`${styles.dot} ${styles.active}`}></span>
                    <span className={styles.dot}></span>
                    <span className={styles.dot}></span>
                    <span className={styles.dot}></span>
                    <span className={styles.dot}></span>
                </div>
            </div>
            <div className={styles.imageContainer}>
                {/* 使用占位图 */}
                <Image src="" alt="教程玩法中心" width={300} height={180} />
            </div>
        </div>
    );
};

export default StudentHeroBanner;