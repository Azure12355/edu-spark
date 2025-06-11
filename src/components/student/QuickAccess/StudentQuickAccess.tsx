"use client";
import React from 'react';
import styles from './StudentQuickAccess.module.css';

const accessItems = [
    { icon: '⭐', text: '精选模板' },
    { icon: '🖼️', text: '海报' },
    { icon: '📕', text: '小红书' },
    { icon: '公众号', text: '公众号' },
    { icon: '🖥️', text: 'PPT' },
    { icon: '🛒', text: '电商' },
    { icon: '印刷物料', text: '印刷物料' },
    { icon: '企业设计', text: '企业设计' },
];

const QuickAccessItem = ({ icon, text }) => (
    <div className={styles.item}>
        <div className={styles.icon}>{icon}</div>
        <span>{text}</span>
    </div>
);

const StudentQuickAccess = () => {
    return (
        <div className={styles.quickAccess}>
            <div className={styles.itemsContainer}>
                {accessItems.map(item => (
                    <QuickAccessItem key={item.text} icon={item.icon} text={item.text} />
                ))}
            </div>
            <button className={styles.arrowButton}>
                <i className="fas fa-chevron-down"></i>
            </button>
        </div>
    );
};

export default StudentQuickAccess;