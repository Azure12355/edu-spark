"use client";
import React from 'react';
import styles from './InfoCard.module.css';

interface InfoCardProps {
    icon: string;
    title: string;
    children: React.ReactNode;
    grid?: boolean; // 是否使用网格布局内容
}

const InfoCard: React.FC<InfoCardProps> = ({ icon, title, grid = false, children }) => {
    return (
        <div className={styles.card}>
            <div className={styles.header}>
                <div className={styles.icon}><i className={`fas ${icon}`}></i></div>
                <h3 className={styles.title}>{title}</h3>
            </div>
            <div className={grid ? styles.contentGrid : ''}>
                {children}
            </div>
        </div>
    );
};

// 用于 InfoCard 内部的子组件
export const InfoItem: React.FC<{ label: string; value: React.ReactNode }> = ({ label, value }) => (
    <div className={styles.infoItem}>
        <span className={styles.label}>{label}</span>
        <span className={styles.value}>{value}</span>
    </div>
);

export default InfoCard;