import React from 'react';
import Image from 'next/image';
import styles from './InfoPanel.module.css';

const features = [
    "AI 助教 7x24 小时在线答疑",
    "一键生成备课教案与完整题库",
    "个性化练习与自适应学习路径",
    "精准学情分析，洞悉教学效果",
    "知识库&大模型，回答精准可控",
    "多人协作，共建课程与知识库"
];

const InfoPanel = () => {
    return (
        <div className={styles.infoPanel}>
            <div className={styles.logoAndTitle}>
                <Image src="/robot.gif" alt="EduSpark Logo" width={52} height={52} style={{borderRadius: 10}} />
                <h1 className={styles.platformName}>EduSpark</h1>
            </div>
            <h2 className={styles.slogan}>
                AI 赋能教育
                <br />
                触手可得！
            </h2>
            <ul className={styles.featureList}>
                {features.map((feature, index) => (
                    <li key={index} className={styles.featureItem}>
                        <i className="fas fa-check-circle"></i>
                        <span>{feature}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default InfoPanel;