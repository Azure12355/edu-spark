// src/components/teacher/course-management/introduction/LearningTimeline/LearningTimeline.tsx
"use client";
import React, { useRef } from 'react'; // 导入 useRef
import { motion } from 'framer-motion';
import styles from './LearningTimeline.module.css';

export interface TimelineItemData {
    time: string;
    title: string;
    description: string;
    icon: string;
}

interface LearningTimelineProps {
    items: TimelineItemData[];
}

const LearningTimeline: React.FC<LearningTimelineProps> = ({ items }) => {
    // 创建一个 ref 引用，用于 Framer Motion 的 viewport
    const timelineRef = useRef(null);

    return (
        <div className={styles.card}>
            <h2 className={styles.sectionTitle}>学习路线图</h2>

            {/* 核心修改：将 ref 传递给滚动容器 */}
            <div className={styles.timelineContainer} ref={timelineRef}>
                {items.map((item, index) => (
                    <motion.div
                        key={index}
                        className={styles.timelineItem}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        // 让动画相对于滚动容器触发，而不是整个页面
                        viewport={{ root: timelineRef, once: true, amount: 0.3 }}
                        transition={{ duration: 0.5, delay: index * 0.05 }}
                    >
                        <div className={styles.timelineIcon}>
                            <i className={item.icon}></i>
                        </div>
                        <div className={styles.timelineContent}>
                            <span className={styles.time}>{item.time}</span>
                            <h4 className={styles.title}>{item.title}</h4>
                            <p className={styles.description}>{item.description}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default LearningTimeline;