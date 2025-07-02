"use client";
import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { KnowledgeBaseVO } from '@/features/teacher/knowledge/knowledge-list/services/knowledgeService';
import EChartsReactCore from '@/shared/components/ui/ECharts/EChartsReactCore';
import type { EChartsOption } from 'echarts';
import styles from './KnowledgeBaseInfo.module.css';
import Tooltip from "@/shared/components/ui/Tooltip/Tooltip"; // 引入Tooltip

// --- 子组件：核心指标卡片 ---
interface MetricCardProps {
    icon: string;
    value: string | number;
    label: string;
    color: string;
    delay: number;
}

const MetricCard: React.FC<MetricCardProps> = ({ icon, value, label, color, delay }) => {
    return (
        <motion.div
            className={styles.metricCard}
            style={{ '--metric-color': color } as React.CSSProperties}
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: 'spring', stiffness: 150, damping: 20, delay }}
            whileHover={{ y: -5, boxShadow: `0 20px 30px -10px rgba(${hexToRgb(color)}, 0.3)` }}
        >
            <div className={styles.metricIconWrapper}>
                <i className={icon}></i>
            </div>
            <div className={styles.metricValue}>{value}</div>
            <div className={styles.metricLabel}>{label}</div>
        </motion.div>
    );
};

// --- 子组件：信息列表项 ---
const InfoItem: React.FC<{ label: string; children: React.ReactNode, isBlock?: boolean }> = ({ label, children, isBlock }) => (
    <div className={`${styles.infoItem} ${isBlock ? styles.infoItemBlock : ''}`}>
        <div className={styles.infoLabel}>{label}</div>
        <div className={styles.infoValue}>{children}</div>
    </div>
);

// --- 主组件 ---
interface KnowledgeBaseInfoProps {
    kb: KnowledgeBaseVO;
}

const KnowledgeBaseInfo: React.FC<KnowledgeBaseInfoProps> = ({ kb }) => {

    // ECharts - 内容类型分布图配置
    const contentTypeChartOption = useMemo((): EChartsOption => {
        // 在真实应用中，此数据应从 kb.metadataStats 或关联的 documents 中计算
        const mockData = [
            { value: 10, name: 'PDF' },
            { value: 5, name: 'DOCX' },
            { value: 8, name: 'Markdown' },
            { value: 2, name: 'URL' },
        ];
        return {
            tooltip: { trigger: 'item', formatter: '{b}: {c}个 ({d}%)' },
            legend: {
                orient: 'vertical', left: 'right', top: 'center',
                textStyle: { color: '#64748b' }, itemGap: 15
            },
            series: [{
                name: '文档类型', type: 'pie', radius: ['50%', '80%'],
                center: ['35%', '50%'], avoidLabelOverlap: false,
                label: { show: false }, itemStyle: { borderRadius: 8, borderColor: '#fff', borderWidth: 4 },
                data: mockData
            }]
        };
    }, []);

    // ECharts - 近期活动趋势图配置
    const activityTrendChartOption = useMemo((): EChartsOption => {
        return {
            tooltip: { trigger: 'axis' },
            grid: { left: '3%', right: '4%', bottom: '3%', top: '10%', containLabel: true },
            xAxis: { type: 'category', boundaryGap: false, data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'] },
            yAxis: { type: 'value', splitLine: { lineStyle: { type: 'dashed', color: '#e5e6eb' } } },
            series: [{
                name: '检索次数', type: 'line', smooth: true,
                symbol: 'circle', symbolSize: 8,
                itemStyle: { color: '#3b82f6' },
                areaStyle: {
                    color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
                        colorStops: [{ offset: 0, color: 'rgba(59, 130, 246, 0.2)' }, { offset: 1, color: 'rgba(59, 130, 246, 0)' }]
                    }
                },
                data: [120, 132, 101, 134, 90, 230, 210]
            }]
        };
    }, []);

    return (
        <div className={styles.dashboardContainer}>
            {/* 核心指标区域 */}
            <div className={styles.metricsGrid}>
                <MetricCard icon="fas fa-file-alt" value={kb.metadataStats?.doc_count ?? 0} label="文档总数" color="#3b82f6" delay={0.1} />
                <MetricCard icon="fas fa-cubes" value={(kb.metadataStats?.slice_count ?? 0).toLocaleString()} label="切片总数" color="#16a34a" delay={0.2} />
                <MetricCard icon="fas fa-database" value={`${((kb.metadataStats?.all_file_size ?? 0) / (1024*1024)).toFixed(1)} MB`} label="知识库体积" color="#f97316" delay={0.3} />
                <MetricCard icon="fas fa-heart" value={kb.forkCount} label="被收藏数" color="#ef4444" delay={0.4} />
            </div>

            {/* 信息与图表区域 */}
            <div className={styles.detailsAndChartsGrid}>
                <motion.div className={`${styles.card} ${styles.infoCard}`} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
                    <h3 className={styles.cardTitle}><i className="fas fa-info-circle"></i>元数据与配置</h3>
                    <div className={styles.infoGrid}>
                        <InfoItem label="知识库名称">{kb.name}</InfoItem>
                        <InfoItem label="所有者">{kb.owner.nickname}</InfoItem>
                        <InfoItem label="知识库 ID">{kb.cozeDatasetId}</InfoItem>
                        <InfoItem label="创建时间">{new Date(kb.createdAt).toLocaleString()}</InfoItem>
                        <InfoItem label="可见性">{kb.visibility === 'PUBLIC' ? '公开' : '私有'}</InfoItem>
                        <InfoItem label="内容类型">{kb.formatType === 0 ? '文本' : '图片'}</InfoItem>
                        <InfoItem label="描述" isBlock>{kb.description || '暂无描述'}</InfoItem>
                    </div>
                </motion.div>

                <motion.div className={`${styles.card} ${styles.pieCard}`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
                    <h3 className={styles.cardTitle}><i className="fas fa-pie-chart"></i>内容类型分布</h3>
                    <div className={styles.chartWrapper}>
                        <EChartsReactCore option={contentTypeChartOption} style={{ height: '100%', width: '100%' }} />
                    </div>
                </motion.div>

                <motion.div className={`${styles.card} ${styles.trendCard}`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
                    <h3 className={styles.cardTitle}><i className="fas fa-chart-line"></i>近期检索热度</h3>
                    <div className={styles.chartWrapper}>
                        <EChartsReactCore option={activityTrendChartOption} style={{ height: '100%', width: '100%' }} />
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

// Helper function to convert hex to rgb
function hexToRgb(hex: string) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : '0,0,0';
}

export default KnowledgeBaseInfo;