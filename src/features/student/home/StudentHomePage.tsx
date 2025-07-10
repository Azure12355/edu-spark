"use client";

import React from 'react';
import styles from './StudentHomePage.module.css';

// 1. 导入所有拆分出去的区块组件
import HeroSection from './components/HeroSection/HeroSection';
import CreationEntrySection from './components/CreationEntrySection/CreationEntrySection';
import CreativeGrid from './components/common/CreativeGrid/CreativeGrid';
import SectionHeader from "@/features/student/home/components/common/SectionHeader/SectionHeader";

// 2. 导入创意卡片的模拟数据
import {creativeCardMockData} from '@/shared/lib/data/creativeCardData';
import TimelineSection from "@/features/student/home/components/TimelineSection/TimelineSection";
import {timelineCardMockData} from "@/shared/lib/data/timelineCardData";

// 3. 导入浮动帮助按钮 (如果需要的话)
// import FloatingHelpButton from '@/shared/components/common/FloatingHelpButton/FloatingHelpButton';


/**
 * @description 学生端创意首页
 * 经过组件化重构后，主页面本身只负责组装各个区块，代码非常清晰。
 */
export default function StudentHomePage() {
    return (
        <div className={styles.homePageContainer}>
            {/* 区域一: 顶部的 Hero 区域 */}
            <HeroSection/>

            {/* 主内容区 */}
            <main className={styles.mainContent}>

                {/* 区域二: 开始创作与创作工具入口 */}
                <CreationEntrySection/>

                <TimelineSection
                    title="历史时间线"
                    items={timelineCardMockData}
                    showMoreLink={true}
                />

                {/* 区域三: 创意卡片瀑布流 */}
                <section className={styles.showcaseSection}>
                    <SectionHeader title="为你推荐"/>
                    <CreativeGrid cards={creativeCardMockData}/>
                </section>



            </main>

            {/* 浮动帮助按钮 (可选) */}
            {/* <FloatingHelpButton /> */}
        </div>
    );
}