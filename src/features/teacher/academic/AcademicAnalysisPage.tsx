// [!file src/app/teacher/studio/AcademicAnalysisPage.tsx]
"use client";
import React from 'react';
import styles from './AcademicAnalysisPage.module.css';
import AnalyticsCard from '@/widgets/analytics/AnalyticsCard/AnalyticsCard';
import ContentTimeAnalysisChart from "@/widgets/analytics/ContentTimeAnalysisChart/ContentTimeAnalysisChart";
import DataSummary from '@/widgets/analytics/DataSummary/DataSummary';
import TodayStats from "@/widgets/analytics/TodayStats/TodayStats";
import TopicRadarChart from '@/widgets/analytics/TopicRadarChart/TopicRadarChart';
import TrendCard from "@/widgets/analytics/TrendCard/TrendCard";
import SourcePieCharts from "@/widgets/analytics/SourcePieCharts/SourcePieCharts";

// Helper function for card headers (保持不变)
const CardHeader = ({title, moreText = "查看更多"}: { title: string, moreText?: string }) => (
    <div className={styles.cardHeader}>
        <h3 className={styles.cardTitle}>{title}</h3>
        <a href="#" className={styles.moreLink}>{moreText}</a>
    </div>
);

// [code focus start ++]
// --- 核心修改：将所有虚拟数据替换为真实的、符合逻辑的学情分析数据 ---

// 1. 学生活跃度趋势 (近7天) - 假设模拟周末活跃度较低
const studentActivityTrendData = [120, 150, 180, 160, 140, 80, 95];

// 2. 作业提交量与批改量 (近7天)
const submissionVolumeData = [
    { value: 88, name: '提交量', itemStyle: { color: '#93c5fd' } },
    { value: 82, name: '批改量', itemStyle: { color: '#a7f3d0' } },
    { value: 95, name: '提交量', itemStyle: { color: '#93c5fd' } },
    { value: 93, name: '批改量', itemStyle: { color: '#a7f3d0' } },
    { value: 110, name: '提交量', itemStyle: { color: '#93c5fd' } },
    { value: 45, name: '提交量', itemStyle: { color: '#93c5fd' } }, // 周末提交量少
    { value: 50, name: '提交量', itemStyle: { color: '#93c5fd' } },
];

// 3. 课程平均分趋势 (近7次作业/考试)
const courseAvgScoreTrendData = [85, 88, 82, 90, 86, 78, 89];

// 4. 班级参与度对比 (模拟数据)
const classEngagementVolumeData = [
    { value: 95, name: '01班', itemStyle: { color: '#80bfff' } },
    { value: 85, name: '02班', itemStyle: { color: '#89d9ab' } },
    { value: 92, name: '03班', itemStyle: { color: '#f7b977' } },
    { value: 78, name: '04班', itemStyle: { color: '#f3a0a4' } },
];
// [code focus end ++]


// Welcome Header Component (保持不变)
const WelcomeHeader = () => (
    <div>
        <h2 style={{fontSize: '24px', fontWeight: 600, margin: '0 0 4px'}}>欢迎回来，迷糊老师🎓</h2>
        <p style={{fontSize: '14px', color: '#86909C', margin: 0}}>高效管理您的课程智能体，开启新一代数字化教学。</p>
    </div>
);

export default function AcademicAnalysisPage() {
    // 动画容器变体 (保持不变)
    const gridContainerVariants = {
        hidden: {opacity: 0},
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    return (
        <div className={styles.pageContainer}>
            <WelcomeHeader/>

            <div className={styles.sectionTwo}>
                {/* [code focus start ++] */}
                <AnalyticsCard
                    title="课程总数"
                    value="12"
                    trendLabel="本学期新增"
                    trendValue="3"
                    trendDirection="up"
                    chartType="bar"
                    chartData={[5, 8, 3, 10, 6, 12]} // 模拟各学期课程数
                    cardBgColor="#f0f9ff"
                    chartColor="#3b82f6"
                />
                <AnalyticsCard
                    title="管理学生总数"
                    value="358"
                    trendLabel="较上周"
                    trendValue="12"
                    trendDirection="up"
                    chartType="line"
                    chartData={[320, 330, 325, 340, 350, 358]} // 模拟学生总数增长
                    cardBgColor="#f0fdf4"
                    chartColor="#22c55e"
                />
                <AnalyticsCard
                    title="本周作业提交率"
                    value="92.8%"
                    trendLabel="较上周"
                    trendValue="-2.1%"
                    trendDirection="down"
                    chartType="line"
                    chartData={[95, 96, 94, 98, 97, 92.8]} // 模拟提交率
                    cardBgColor="#fff7ed"
                    chartColor="#f97316"
                />
                <AnalyticsCard
                    title="知识库文档数"
                    value="126"
                    trendLabel="本周新增"
                    trendValue="15"
                    trendDirection="up"
                    chartType="pie"
                    chartData={[
                        60,64,32
                    ]}
                    cardBgColor="#f5f3ff"
                    chartColor={['#8b5cf6', '#a78bfa', '#c4b5fd']}
                />
                {/* [code focus end ++] */}
            </div>

            <div className={styles.sectionThree}>
                <DataSummary/>
                <aside className={styles.rightSidebar}>
                    <TodayStats/>
                    <TopicRadarChart/>
                </aside>
            </div>

            <ContentTimeAnalysisChart/>



            {/* --- SECTION 4 - 趋势卡片 --- */}
            <div className={styles.trendCardsContainer}>
                {/* [code focus start ++] */}
                <TrendCard
                    title="学生活跃度趋势"
                    value="95"
                    trendValue="较昨日 -5.2%"
                    trendDirection="down"
                    chartType="line"
                    chartData={studentActivityTrendData}
                    chartColor="#3b82f6"
                    cardBgColor="#f0f9ff"
                />
                <TrendCard
                    title="作业提交与批改"
                    value="110"
                    trendValue="昨日提交"
                    trendDirection="up"
                    chartType="bar"
                    chartData={submissionVolumeData}
                    cardBgColor="#f0fdf4"
                />
                <TrendCard
                    title="课程平均分趋势"
                    value="89.5"
                    trendValue="最近一次"
                    trendDirection="up"
                    chartType="line"
                    chartData={courseAvgScoreTrendData}
                    chartColor="#f97316"
                    cardBgColor="#fff7ed"
                />
                <TrendCard
                    title="班级参与度对比"
                    value="92%"
                    trendValue="01班最高"
                    trendDirection="up"
                    chartType="bar"
                    chartData={classEngagementVolumeData}
                    cardBgColor="#f5f3ff"
                />
                {/* [code focus end ++] */}
            </div>

            <SourcePieCharts/>
        </div>
    );
}