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
import StudioSidebar from "@/components/teacher/studio/StudioSidebar/StudioSidebar"; // Assuming StatCard is created

// Helper function for card headers
const CardHeader = ({ title, moreText = "查看更多" }: { title: string, moreText?: string }) => (
    <div className={styles.cardHeader}>
        <h3 className={styles.cardTitle}>{title}</h3>
        <a href="#" className={styles.moreLink}>{moreText}</a>
    </div>
);

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
                    <div className={styles.card}><CardHeader title="公告"/></div>
                    <div className={styles.card}><CardHeader title="文档中心"/></div>
                </aside>
            </div>

            {/* --- SECTION 2 --- */}
            <div className={styles.sectionTwo}>
                <div className={styles.card}><CardHeader title="访问总人数"/></div>
                <div className={styles.card}><CardHeader title="内容发布量"/></div>
                <div className={styles.card}><CardHeader title="评论总总量"/></div>
                <div className={styles.card}><CardHeader title="分享总量"/></div>
            </div>
            <div className={styles.card} style={{height: "400px"}}>
                <CardHeader title="内容发布比列"/>
                {/* contentPublishOption chart here */}
            </div>

            {/* ... Render other sections similarly ... */}

        </div>
    );
}