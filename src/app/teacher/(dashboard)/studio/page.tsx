// src/app/teacher/studio/page.tsx
"use client";
import React from 'react';
import styles from './studio.module.css';
import EChartsReactCore from '@/components/common/ECharts/EChartsReactCore';
import type { EChartsOption } from 'echarts';
import StatCard from '@/components/teacher/studio/StatCard/StatCard';
import OverviewChart from "@/components/teacher/studio/OverviewChart/OverviewChart";
import HotContentTable from "@/components/teacher/studio/HotContentTable/HotContentTable";
import ContentTypePieChart from "@/components/teacher/studio/ContentTypePieChart/ContentTypePieChart";
import StudioSidebar from "@/components/teacher/studio/StudioSidebar/StudioSidebar";
import Announcements from "@/components/teacher/studio/Announcements/Announcements"; // Assuming StatCard is created
import AnalyticsCard from '@/components/teacher/studio/AnalyticsCard/AnalyticsCard';
import ContentPublishChart from "@/components/teacher/studio/ContentPublishChart/ContentPublishChart";
import TopAuthorsTable from "@/components/teacher/studio/TopAuthorsTable/TopAuthorsTable";
import ContentTimeAnalysisChart from "@/components/teacher/studio/ContentTimeAnalysisChart/ContentTimeAnalysisChart";
import DataSummary from '@/components/teacher/studio/DataSummary/DataSummary';
import DataTrendChart from "@/components/teacher/studio/DataTrendChart/DataTrendChart";
import TodayStats from "@/components/teacher/studio/TodayStats/TodayStats";
import TopicRadarChart from '@/components/teacher/studio/TopicRadarChart/TopicRadarChart';
import TrendCard from "@/components/teacher/studio/TrendCard/TrendCard";
import SourcePieCharts from "@/components/teacher/studio/SourcePieCharts/SourcePieCharts";

// Helper function for card headers
const CardHeader = ({ title, moreText = "查看更多" }: { title: string, moreText?: string }) => (
    <div className={styles.cardHeader}>
        <h3 className={styles.cardTitle}>{title}</h3>
        <a href="#" className={styles.moreLink}>{moreText}</a>
    </div>
);

const userRetentionTrendData = [5, 8, 6, 10, 20, 18, 25, 28, 30, 40];
const userRetentionVolumeData = [
    { value: 10, itemStyle: { color: '#93c5fd' } },
    { value: 15, itemStyle: { color: '#a7f3d0' } },
    { value: 20, itemStyle: { color: '#93c5fd' } },
    { value: 18, itemStyle: { color: '#a7f3d0' } },
    { value: 25, itemStyle: { color: '#93c5fd' } },
    { value: 30, itemStyle: { color: '#93c5fd' } },
    { value: 28, itemStyle: { color: '#a7f3d0' } },
    { value: 40, itemStyle: { color: '#93c5fd' } },
    { value: 38, itemStyle: { color: '#a7f3d0' } },
    { value: 45, itemStyle: { color: '#93c5fd' } },
];
const contentConsumptionTrendData = [10, 25, 40, 50, 60, 65, 68, 70, 72, 70];
const contentConsumptionVolumeData = userRetentionVolumeData.map(item => ({...item})).reverse();

// Welcome Header Component
const WelcomeHeader = () => (
    <div>
        <h2 style={{ fontSize: '24px', fontWeight: 600, margin: '0 0 4px' }}>欢迎回来，王立群</h2>
        <p style={{ fontSize: '14px', color: '#86909C', margin: 0 }}>高效管理您的课程智能体，开启新一代数字化教学。</p>
    </div>
);

// --- All Chart Options ---
const overviewChartOption: EChartsOption = { /* Copied from above */ };
const contentTypePieOption: EChartsOption = {
    tooltip: { trigger: 'item' },
    legend: { bottom: '5%', left: 'center' },
    series: [
        {
            name: '内容类别', type: 'pie', radius: ['40%', '70%'], avoidLabelOverlap: false,
            label: { show: false, position: 'center' },
            emphasis: { label: { show: true, fontSize: 20, fontWeight: 'bold' } },
            labelLine: { show: false },
            data: [
                { value: 928530, name: '内容库' },
                { value: 160000, name: '图文' },
                { value: 360000, name: '视频' },
            ]
        }
    ]
};
// ... Add all other chart options here for brevity ...
const contentPublishOption: EChartsOption = { /* Bar chart config */ };
const contentTimeAnalysisOption: EChartsOption = { /* Multi-line chart config */ };

export default function StudioPage() {
    return (
        <div className={styles.pageContainer}>
            <WelcomeHeader />

            {/* --- SECTION 1 --- */}
            <div className={styles.sectionOne}>
                <main className={styles.mainContent}>
                    <div className={styles.headerStats}>
                        <StatCard
                            title="线上总数据"
                            value="373.5W+"
                            trendValue="12.5%"
                            trendDirection="up"
                            icon="fas fa-book-reader"
                            iconColor="#3b82f6"
                            iconBgColor="#dbeafe"
                        />
                        <StatCard
                            title="投放中的内容"
                            value="368"
                            trendValue="2.1%"
                            trendDirection="up"
                            icon="fas fa-rocket"
                            iconColor="#8b5cf6"
                            iconBgColor="#ede9fe"
                        />
                        <StatCard
                            title="日新增评论"
                            value="8874"
                            trendValue="8.3%"
                            trendDirection="up"
                            icon="fas fa-comments"
                            iconColor="#f97316"
                            iconBgColor="#ffedd5"
                        />
                        <StatCard
                            title="较昨日新增"
                            value="2.8%"
                            trendValue="1.5%"
                            trendDirection="up"
                            icon="fas fa-chart-line"
                            iconColor="#10b981"
                            iconBgColor="#dcfce7"
                        />
                    </div>

                    <OverviewChart />
                    <div className={styles.bottomGrid}>
                        <HotContentTable/>
                        <ContentTypePieChart/>
                    </div>
                </main>
                <aside className={styles.sidebar}>
                    {/* Sidebar components (QuickAccess, Announcements, etc.) would go here */}
                    <StudioSidebar/>
                    <Announcements />
                    <div className={styles.card}><CardHeader title="文档中心"/></div>
                </aside>
            </div>

            {/* --- SECTION 2 --- */}
            <div className={styles.sectionTwo}>
                <AnalyticsCard
                    title="访问总人数"
                    value="5,784"
                    trendLabel="较昨日"
                    trendValue="912"
                    trendDirection="up"
                    chartType="line"
                    chartData={[10, 52, 20, 33, 39, 30, 60, 23, 40]}
                    cardBgColor="#f0f9ff" // Light Blue
                    chartColor="#3b82f6"
                />
                <AnalyticsCard
                    title="内容发布量"
                    value="2,601"
                    trendLabel="较昨日"
                    trendValue="126"
                    trendDirection="up"
                    chartType="bar"
                    chartData={[10, 52, 20, 33, 39, 30, 60, 23, 40]}
                    cardBgColor="#f0fdf4" // Light Green
                    chartColor="#22c55e"
                />
                <AnalyticsCard
                    title="评论总量"
                    value="4,676"
                    trendLabel="较昨日"
                    trendValue="960"
                    trendDirection="down"
                    chartType="line"
                    chartData={[30, 23, 60, 20, 50, 26, 40, 30, 10]}
                    cardBgColor="#f0f9ff" // Light Blue
                    chartColor="#3b82f6"
                />
                <AnalyticsCard
                    title="分享总量"
                    value="1,038"
                    trendLabel="较昨日"
                    trendValue="404"
                    trendDirection="down"
                    chartType="pie"
                    chartData={[335, 310, 234]}
                    cardBgColor="#f5f3ff" // Light Purple
                    chartColor={['#8b5cf6', '#a78bfa', '#c4b5fd']}
                />
            </div>
            <div className={styles.publishAuthorSection}>
                <ContentPublishChart />
                <TopAuthorsTable />
            </div>

            <ContentTimeAnalysisChart/>

            <div className={styles.sectionThree}>
                <DataSummary />
                <aside className={styles.rightSidebar}>
                    <TodayStats />
                    <TopicRadarChart />
                </aside>
            </div>

            {/* --- SECTION 4 - 趋势卡片 --- */}
            <div className={styles.trendCardsContainer}>
                <TrendCard
                    title="用户留存趋势"
                    value="1,009"
                    trendValue="994"
                    trendDirection="down"
                    chartType="line"
                    chartData={userRetentionTrendData}
                    chartColor="#3b82f6"
                    cardBgColor="#f0f9ff" /* 浅蓝色背景 */
                />
                <TrendCard
                    title="用户留存量"
                    value="1,344"
                    trendValue="201"
                    trendDirection="down"
                    chartType="bar"
                    chartData={userRetentionVolumeData}
                    cardBgColor="#f0fdf4" /* 浅绿色背景 */
                />
                <TrendCard
                    title="内容消费趋势"
                    value="6,908"
                    trendValue="932"
                    trendDirection="down"
                    chartType="line"
                    chartData={contentConsumptionTrendData}
                    chartColor="#3b82f6"
                    cardBgColor="#f0f9ff" /* 浅蓝色背景 */
                />
                <TrendCard
                    title="内容消费量"
                    value="8,130"
                    trendValue="655"
                    trendDirection="down"
                    chartType="bar"
                    chartData={contentConsumptionVolumeData}
                    cardBgColor="#f0fdf4" /* 浅绿色背景 */
                />
            </div>

            <SourcePieCharts/>


            {/* ... Render other sections similarly ... */}

        </div>


    );
}