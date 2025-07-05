"use client";

import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import styles from './LearningTimeline.module.css';
// [!code focus start]
// 1. 从我们定义的领域类型中导入 TimelineItem
import { TimelineItem as TimelineItemData } from '../../types';
// [!code focus end]

// 2. 更新组件的 Props 接口
interface LearningTimelineProps {
    // items 是一个可选的 TimelineItemData 数组
    items?: TimelineItemData[];
}

// 3. 新增一个优雅的空状态组件
const EmptyState = () => (
    <div className={styles.emptyState}>
        <div className={styles.emptyIcon}>
            <i className="fas fa-route"></i>
        </div>
        <p>暂未规划学习路线图</p>
        <span>请在课程设置中添加时间线节点</span>
    </div>
);

const LearningTimeline: React.FC<LearningTimelineProps> = ({ items }) => {
    const timelineRef = useRef(null);

    // 4. 检查数据是否存在且不为空
    const hasItems = items && items.length > 0;

    return (
        <div className={styles.card}>
            <h2 className={styles.sectionTitle}>学习路线图</h2>

            {/* 5. 根据数据是否存在进行条件渲染 */}
            {hasItems ? (
                <div className={styles.timelineContainer} ref={timelineRef}>
                    {items.map((item, index) => (
                        <motion.div
                            key={index} // 在动态列表中，使用 index 作为 key 是可接受的，如果 item 有 id 则更好
                            className={styles.timelineItem}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ root: timelineRef, once: true, amount: 0.3 }}
                            transition={{ duration: 0.5, delay: index * 0.05 }}
                        >
                            <div className={styles.timelineIcon}>
                                <i className={item.icon || 'fas fa-flag'}></i>
                            </div>
                            <div className={styles.timelineContent}>
                                <span className={styles.time}>{item.week}</span>
                                <h4 className={styles.title}>{item.title}</h4>
                                <p className={styles.description}>{item.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            ) : (
                <EmptyState />
            )}
        </div>
    );
};

export default LearningTimeline;