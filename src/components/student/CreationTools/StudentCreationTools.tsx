"use client";
import React from 'react';
import styles from './StudentCreationTools.module.css';

const CreationToolsCard = ({ title , children, badge = null, badgeType = 'hot' }) => (
    <div className={styles.card}>
        <h3 className={styles.cardTitle}>
            {title}
            {badge && <span className={`${styles.badge} ${styles[badgeType]}`}>{badge}</span>}
        </h3>
        <div className={styles.cardContent}>{children}</div>
    </div>
);

const ToolButton = ({ icon, text, badge = null, badgeType = 'new' }) => (
    <button className={styles.toolButton}>
        <i className={`fas fa-${icon}`}></i>
        <span>{text}</span>
        {badge && <span className={`${styles.toolBadge} ${styles[badgeType]}`}>{badge}</span>}
    </button>
);

const StudentCreationTools = () => {
    return (
        <div className={styles.creationTools}>
            <CreationToolsCard title="创建设计">
                <div className={styles.startDesign}>
                    <div className={styles.plusIcon}><i className="fas fa-plus"></i></div>
                    <p>开始设计</p>
                </div>
                <div className={styles.recentDesigns}>
                    <div className={styles.recentItem}></div>
                    <div className={styles.recentItem}></div>
                    <div className={styles.recentItemArrow}><i className="fas fa-chevron-right"></i></div>
                </div>
            </CreationToolsCard>

            <CreationToolsCard title="图片编辑">
                <div className={styles.toolsGrid}>
                    <ToolButton icon="crop" text="智能抠图" />
                    <ToolButton icon="magic" text="图片变清晰" badge="HD" badgeType="hd" />
                    <ToolButton icon="eraser" text="智能消除" />
                    <ToolButton icon="sync-alt" text="图片批处理" />
                    <ToolButton icon="expand-arrows-alt" text="智能外拓" />
                    <ToolButton icon="object-group" text="智能改图" />
                </div>
            </CreationToolsCard>

            <CreationToolsCard title="AI创作" badge="一键出海" badgeType="hot">
                <div className={styles.toolsGrid}>
                    <ToolButton icon="pencil-alt" text="AI创作" />
                    <ToolButton icon="lightbulb" text="智能设计" />
                    <ToolButton icon="shapes" text="AI Logo" />
                    <ToolButton icon="feather-alt" text="AI文案" badge="deepseek" badgeType="deepseek" />
                    <ToolButton icon="image" text="AI图生图" />
                    <ToolButton icon="shopping-bag" text="AI商品图" />
                </div>
            </CreationToolsCard>
        </div>
    );
};

export default StudentCreationTools;