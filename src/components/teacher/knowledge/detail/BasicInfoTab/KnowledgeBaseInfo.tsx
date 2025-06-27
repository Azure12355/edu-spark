"use client";
import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { KnowledgeBase, Document, DocumentStatus } from '@/types/knowledge';
import EChartsReactCore from '@/components/common/ECharts/EChartsReactCore';
import type { EChartsOption } from 'echarts';
import { useKnowledgeStore } from '@/store/knowledgeStore';
import styles from './KnowledgeBaseInfo.module.css';

// 1. 定义动画变体
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 150, damping: 20 } }
};

// 2. 状态图标组件
const TaskStatusIcon: React.FC<{ status: DocumentStatus }> = ({ status }) => {
    const statusMap = {
        COMPLETED: { icon: 'fas fa-check-circle', color: '#10B981', text: '处理完成' },
        PROCESSING: { icon: 'fas fa-sync-alt fa-spin', color: '#3B82F6', text: '处理中' },
        FAILED: { icon: 'fas fa-times-circle', color: '#EF4444', text: '处理失败' },
    };
    const { icon, color, text } = statusMap[status];
    return <span style={{ color }} title={text}><i className={icon}></i></span>;
};


const KnowledgeBaseInfo: React.FC<{ kb: KnowledgeBase }> = ({ kb }) => {
    // 3. 从 Store 中获取关联的文档数据
    const getDocumentsByKbId = useKnowledgeStore(state => state.getDocumentsByKbId);
    const documents = useMemo(() => getDocumentsByKbId(kb.id), [kb.id, getDocumentsByKbId]);

    // 4. ECharts - 文档类型分布环形图配置
    const docTypeChartOption = useMemo((): EChartsOption => {
        const typeCounts = documents.reduce((acc, doc) => {
            const typeLabel = doc.type.toUpperCase();
            acc[typeLabel] = (acc[typeLabel] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);

        const chartData = Object.entries(typeCounts).map(([name, value]) => ({ name, value }));

        return {
            tooltip: { trigger: 'item', formatter: '{b}: {c}个 ({d}%)' },
            legend: { show: false },
            series: [{
                name: '文档类型',
                type: 'pie',
                radius: ['65%', '90%'],
                center: ['50%', '50%'],
                avoidLabelOverlap: false,
                itemStyle: { borderRadius: 8, borderColor: '#fff', borderWidth: 2 },
                label: { show: false },
                emphasis: {
                    label: { show: true, fontSize: 16, fontWeight: 'bold', formatter: '{b}\n{c}个' },
                    scaleSize: 8
                },
                data: chartData
            }]
        };
    }, [documents]);

    // 5. ECharts - 切片数量趋势折线图配置
    const sliceTrendChartOption = useMemo((): EChartsOption => {
        const data = Array.from({length: 7}, (_, i) => ({
            date: `07-${22 - 6 + i}`,
            count: Math.floor(Math.random() * 500) + 50 * i // 模拟增长趋势
        }));
        return {
            tooltip: { trigger: 'axis' },
            grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
            xAxis: { type: 'category', boundaryGap: false, data: data.map(d => d.date) },
            yAxis: { type: 'value' },
            series: [{
                name: '新增切片数', type: 'line', stack: 'Total', smooth: true,
                areaStyle: {
                    color: {
                        type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
                        colorStops: [{ offset: 0, color: 'rgba(59, 130, 246, 0.5)' }, { offset: 1, color: 'rgba(59, 130, 246, 0)' }]
                    }
                },
                data: data.map(d => d.count),
            }]
        };
    }, []);

    return (
        <motion.div
            className={styles.gridContainer}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {/* 基础信息卡片 */}
            <motion.div className={styles.card} variants={itemVariants}>
                <h3 className={styles.cardTitle}><i className="fas fa-info-circle"></i> 基础信息</h3>
                <ul className={styles.infoList}>
                    <li><span className={styles.infoLabel}>知识库ID</span><span className={styles.infoValue}>{kb.coze_dataset_id}</span></li>
                    <li><span className={styles.infoLabel}>所有者</span><span className={styles.infoValue}>{kb.owner_id}</span></li>
                    <li><span className={styles.infoLabel}>创建时间</span><span className={styles.infoValue}>{new Date(kb.created_at).toLocaleString()}</span></li>
                    <li className={styles.descriptionItem}>
                        <span className={styles.infoLabel}>描述</span>
                        <p className={styles.infoValue}>{kb.description || '暂无描述'}</p>
                    </li>
                </ul>
            </motion.div>

            {/* 文档类型分布卡片 */}
            <motion.div className={styles.card} variants={itemVariants}>
                <h3 className={styles.cardTitle}><i className="fas fa-pie-chart"></i> 文档类型分布</h3>
                <div className={styles.chartWrapper}>
                    <EChartsReactCore option={docTypeChartOption} style={{ height: '100%', width: '100%' }} />
                </div>
            </motion.div>

            {/* 切片数量趋势卡片 */}
            <motion.div className={`${styles.card} ${styles.trendCard}`} variants={itemVariants}>
                <h3 className={styles.cardTitle}><i className="fas fa-chart-line"></i> 切片数量趋势 (近7日)</h3>
                <div className={styles.chartWrapper}>
                    <EChartsReactCore option={sliceTrendChartOption} style={{ height: '100%', width: '100%' }} />
                </div>
            </motion.div>

            {/* 最近处理任务卡片 */}
            <motion.div className={`${styles.card} ${styles.tasksCard}`} variants={itemVariants}>
                <h3 className={styles.cardTitle}><i className="fas fa-tasks"></i> 最近文档处理任务</h3>
                <div className={styles.tasksList}>
                    {documents.slice(0, 5).map(doc => ( // 只显示最近5条
                        <div key={doc.id} className={styles.taskItem}>
                            <div className={styles.taskFile}>
                                <i className={`fas ${doc.type === 'pdf' ? 'fa-file-pdf' : 'fa-file-word'}`}></i>
                                <span className={styles.taskFileName} title={doc.name}>{doc.name}</span>
                            </div>
                            <span className={styles.taskTime}>{new Date(doc.created_at).toLocaleDateString()}</span>
                            <TaskStatusIcon status={doc.status} />
                        </div>
                    ))}
                    {documents.length === 0 && <p className={styles.noTasks}>暂无处理任务</p>}
                </div>
            </motion.div>
        </motion.div>
    );
};
export default KnowledgeBaseInfo;