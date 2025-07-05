"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useCourseIntroduction } from './hooks/useCourseIntroduction';
import styles from './CourseIntroduction.module.css';

// 导入所有需要装配的子组件
import HeroBanner from './components/HeroBanner/HeroBanner';
import LearningObjectives from './components/LearningObjectives/LearningObjectives';
import LearningTimeline from './components/LearningTimeline/LearningTimeline';
import ResourceCarousel from './components/ResourceCarousel/ResourceCarousel';
import LearningMethodsCard from "./components/LearningMethodsCard/LearningMethodsCard";
import AssessmentChartCard from "./components/AssessmentCard/AssessmentChartCard";
import ToolsAndResourcesCard from "./components/ToolsAndResourcesCard/ToolsAndResourcesCard";

// 加载和错误状态的组件 (保持不变)
const LoadingSkeleton = () => (
    <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>正在加载课程信息...</p>
    </div>
);

const ErrorDisplay = ({ message, onRetry }: { message: string, onRetry: () => void }) => (
    <div className={styles.errorContainer}>
        <h3><i className="fas fa-exclamation-triangle"></i> 加载失败</h3>
        <p>{message}</p>
        <button onClick={onRetry}>点击重试</button>
    </div>
);

// 动画变体
const pageVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1, // 让页面中的每个大模块依次入场
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring' } },
};


export default function CourseIntroductionPage() {
    // 1. 调用 Hook，获取所有状态和方法
    const { fullCourseInfo, isInitialLoading, error, refetch } = useCourseIntroduction();

    // 2. 处理加载和错误状态
    if (isInitialLoading) {
        return <LoadingSkeleton />;
    }

    if (error) {
        return <ErrorDisplay message={error} onRetry={refetch} />;
    }

    if (!fullCourseInfo) {
        return <ErrorDisplay message="未能获取到任何课程信息。" onRetry={refetch} />;
    }

    // 3. 【核心】装配所有子组件
    return (
        <motion.div
            className={styles.pageContainer}
            variants={pageVariants}
            initial="hidden"
            animate="visible"
        >
            {/* Hero Banner */}
            <motion.div variants={itemVariants}>
                <HeroBanner
                    course={fullCourseInfo}
                    details={fullCourseInfo.details}
                />
            </motion.div>

            {/* 主要内容网格布局 */}
            <div className={styles.mainGrid}>
                {/* 学习目标 */}
                <motion.div className={styles.objectivesCardWrapper} variants={itemVariants}>
                    <LearningObjectives objectives={fullCourseInfo.details?.learningObjectives} />
                </motion.div>

                {/* 学习路线图 */}
                <motion.div className={styles.timelineCardWrapper} variants={itemVariants}>
                    <LearningTimeline items={fullCourseInfo.details?.learningTimeline} />
                </motion.div>

                {/* 学习方法 */}
                <motion.div className={styles.methodsCardWrapper} variants={itemVariants}>
                    <LearningMethodsCard
                        title="学习方法"
                        intro="采用“理论讲解 + 编码实践 + 项目驱动”三位一体的教学模式，确保知识学以致用。"
                        methods={fullCourseInfo.details?.learningMethods}
                    />
                </motion.div>

                {/* 推荐书籍 */}
                <motion.div className={styles.resourcesCardWrapper} variants={itemVariants}>
                    <ResourceCarousel books={fullCourseInfo.details?.recommendedBooks} />
                </motion.div>

                {/* 考核方式 */}
                <motion.div className={styles.assessmentCardWrapper} variants={itemVariants}>
                    <AssessmentChartCard
                        title="考核方式"
                        data={fullCourseInfo.details?.assessmentMethods}
                    />
                </motion.div>

                {/* 技术栈与工具 */}
                <motion.div className={styles.toolsCardWrapper} variants={itemVariants}>
                    <ToolsAndResourcesCard
                        techStack={fullCourseInfo.details?.techStack}
                        onlineResources={fullCourseInfo.details?.onlineResources}
                    />
                </motion.div>
            </div>
        </motion.div>
    );
}