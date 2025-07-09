// [!file src/features/teacher/studio/StudioPage.tsx]
"use client";
import React from 'react';
import styles from './StudioPage.module.css';
import {motion} from 'framer-motion';
import StatCard from '@/widgets/analytics/StatCard/StatCard';
import OverviewChart from "@/widgets/analytics/OverviewChart/OverviewChart";
import HotContentTable from "@/widgets/analytics/HotContentTable/HotContentTable";
import ContentTypePieChart from "@/widgets/analytics/ContentTypePieChart/ContentTypePieChart";
import StudioSidebar from "@/features/teacher/studio/studio-dashboard/components/StudioSidebar/StudioSidebar";
import Announcements from "@/widgets/analytics/Announcements/Announcements";
import ContentPublishChart from "@/widgets/analytics/ContentPublishChart/ContentPublishChart";
import TopAuthorsTable from "@/widgets/analytics/TopAuthorsTable/TopAuthorsTable";

// Helper function for card headers (保持不变)
const CardHeader = ({title, moreText = "查看更多"}: { title: string, moreText?: string }) => (
    <div className={styles.cardHeader}>
        <h3 className={styles.cardTitle}>{title}</h3>
        <a href="#" className={styles.moreLink}>{moreText}</a>
    </div>
);

// Welcome Header Component (保持不变)
const WelcomeHeader = () => (
    <div>
        <h2 style={{fontSize: '24px', fontWeight: 600, margin: '0 0 4px'}}>欢迎回来，迷糊老师🎓</h2>
        <p style={{fontSize: '14px', color: '#86909C', margin: 0}}>高效管理您的课程智能体，开启新一代数字化教学。</p>
    </div>
);

const gridContainerVariants = {
    hidden: {opacity: 0},
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        }
    }
};

export default function StudioPage() {
    return (
        <div className={styles.pageContainer}>
            <WelcomeHeader/>

            {/* --- SECTION 1 --- */}
            <div className={styles.sectionOne}>
                <main className={styles.mainContent}>
                    <motion.div
                        className={styles.headerStats}
                        variants={gridContainerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {/* [code focus start ++] */}
                        {/* --- 核心修改：替换为学情分析相关的统计卡片 --- */}
                        <StatCard
                            title="管理课程总数"
                            value="8"
                            trendValue="+2"
                            trendDirection="up"
                            icon="fas fa-book-reader"
                            iconColor="#3b82f6"
                            cardBgColor="#eff6ff"

                        />
                        <StatCard
                            title="覆盖学生人次"
                            value="450"
                            trendValue="+35"
                            trendDirection="up"
                            icon="fas fa-user-graduate"
                            iconColor="#8b5cf6"
                            cardBgColor="#f5f3ff"
                        />
                        <StatCard
                            title="本周待批改作业"
                            value="28"
                            trendValue="-15"
                            trendDirection="down" // 待批改减少是好事
                            icon="fas fa-edit"
                            iconColor="#f97316"
                            cardBgColor="#fff7ed"
                        />
                        <StatCard
                            title="AI助教互动次数"
                            value="1,286"
                            trendValue="+18%"
                            trendDirection="up"
                            icon="fas fa-comments-dollar"
                            iconColor="#10b981"
                            cardBgColor="#f0fdf4"
                        />
                        {/* [code focus end ++] */}
                    </motion.div>

                    <div className={styles.bottomGrid}>
                        {/* HotContentTable可以重命名为TopCoursesTable或类似 */}
                        <HotContentTable/>
                        {/* ContentTypePieChart可以重命名为CourseTypePieChart */}
                        <ContentTypePieChart/>
                    </div>

                    <OverviewChart/>
                </main>
                <aside className={styles.sidebar}>
                    <StudioSidebar/>
                    <Announcements/>
                </aside>
            </div>

            <div className={styles.publishAuthorSection}>
                <ContentPublishChart/>
                <TopAuthorsTable/>
            </div>
        </div>
    );
}