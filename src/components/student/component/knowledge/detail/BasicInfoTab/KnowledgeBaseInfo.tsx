"use client";
import React from 'react';
import styles from './KnowledgeBaseInfo.module.css';
import { KnowledgeBase } from '@/lib/data/knowledgeData';
import { documentTypeData, chunkTrendData, recentTasksData, RecentTask } from '@/lib/data/infoData';

// 饼图/环形图组件
const PieChart = () => {
    const total = documentTypeData.reduce((sum, item) => sum + item.count, 0);
    let cumulativePercent = 0;
    const gradients = documentTypeData.map(item => {
        const percent = (item.count / total) * 100;
        const start = cumulativePercent;
        cumulativePercent += percent;
        return `${item.color} ${start}% ${cumulativePercent}%`;
    });

    return (
        <div className={styles.pieChartWrapper}>
            <div className={styles.pieChart} style={{ background: `conic-gradient(${gradients.join(', ')})` }}></div>
            <ul className={styles.pieLegend}>
                {documentTypeData.map(item => (
                    <li key={item.type} className={styles.legendItem}>
                        <span className={styles.legendColor} style={{ backgroundColor: item.color }}></span>
                        <span className={styles.legendText}>{item.type}</span>
                        <span className={styles.legendPercent}>{((item.count / total) * 100).toFixed(1)}%</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

// 折线图组件
const TrendChart = () => {
    const data = chunkTrendData;
    const width = 300, height = 200, padding = 30;
    const maxCount = Math.max(...data.map(d => d.count));
    const points = data.map((d, i) => {
        const x = (i / (data.length - 1)) * (width - 2 * padding) + padding;
        const y = height - padding - (d.count / maxCount) * (height - 2 * padding);
        return `${x},${y}`;
    }).join(' ');

    return (
        <div className={styles.trendChart}>
            <svg viewBox={`0 0 ${width} ${height}`}>
                {/* Grid lines */}
                {[...Array(5)].map((_, i) => (
                    <line key={i} x1={padding} y1={padding + i * (height - 2 * padding) / 4} x2={width - padding} y2={padding + i * (height - 2 * padding) / 4} stroke="#f1f3f5" />
                ))}
                {/* Polyline */}
                <polyline fill="none" stroke="#3b82f6" strokeWidth="2" points={points} />
                {/* Data points */}
                {data.map((d, i) => {
                    const x = (i / (data.length - 1)) * (width - 2 * padding) + padding;
                    const y = height - padding - (d.count / maxCount) * (height - 2 * padding);
                    return <circle key={i} cx={x} cy={y} r="3" fill="#3b82f6" />;
                })}
            </svg>
        </div>
    );
};

// 任务状态组件
const TaskStatus: React.FC<{ status: RecentTask['status'] }> = ({ status }) => {
    const statusMap = {
        completed: { text: '成功', icon: 'fa-check-circle', style: styles.statusCompleted },
        failed: { text: '失败', icon: 'fa-times-circle', style: styles.statusFailed },
        processing: { text: '处理中', icon: 'fa-sync-alt fa-spin', style: styles.statusProcessing },
    };
    const info = statusMap[status];
    return (
        <span className={`${styles.taskStatus} ${info.style}`}>
            <i className={`fas ${info.icon}`}></i> {info.text}
        </span>
    );
};

// 主组件
const KnowledgeBaseInfo: React.FC<{ kb: KnowledgeBase }> = ({ kb }) => {
    return (
        <div className={styles.gridContainer}>
            <div className={`${styles.card} ${styles.infoCard}`}>
                <h3 className={styles.cardTitle}><i className="fas fa-info-circle"></i> 基础信息</h3>
                <ul className={styles.infoList}>
                    <li className={styles.infoItem}><span className={styles.infoLabel}>知识库ID</span> <span className={styles.infoValue}>{kb.id}</span></li>
                    <li className={styles.infoItem}><span className={styles.infoLabel}>创建人</span> <span className={styles.infoValue}>{kb.creator}</span></li>
                    <li className={styles.infoItem}><span className={styles.infoLabel}>创建时间</span> <span className={styles.infoValue}>{kb.createdAt}</span></li>
                    <li className={styles.infoItem}><span className={styles.infoLabel}>描述</span> <span className={styles.infoValue}>{kb.name}知识库, 用于存放...</span></li>
                </ul>
            </div>
            <div className={`${styles.card} ${styles.pieCard}`}>
                <h3 className={styles.cardTitle}><i className="fas fa-pie-chart"></i> 文档类型分布</h3>
                <PieChart />
            </div>
            <div className={`${styles.card} ${styles.trendCard}`}>
                <h3 className={styles.cardTitle}><i className="fas fa-chart-line"></i> 切片数量趋势 (近7日)</h3>
                <TrendChart />
            </div>
            <div className={`${styles.card} ${styles.tasksCard}`}>
                <h3 className={styles.cardTitle}><i className="fas fa-tasks"></i> 最近处理任务</h3>
                <div className={styles.tasksList}>
                    {recentTasksData.map(task => (
                        <div key={task.id} className={styles.taskItem}>
                            <div className={styles.taskFile}>
                                <i className="far fa-file-alt"></i> <span>{task.fileName}</span>
                            </div>
                            <TaskStatus status={task.status} />
                            <span className={styles.taskTime}>{task.timestamp}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
export default KnowledgeBaseInfo;