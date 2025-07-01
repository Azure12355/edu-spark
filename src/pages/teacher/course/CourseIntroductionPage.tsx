// src/app/teacher/(dashboard)/courses/[id]/introduction/KnowledgeDetailPage.tsx
"use client";
import React from 'react';
import { motion } from 'framer-motion';
import LearningTimeline, { TimelineItemData } from '@/features/teacher/course/course-management/sub-features/introduction/components/LearningTimeline/LearningTimeline';
import ResourceCarousel, { BookResource } from '@/features/teacher/course/course-management/sub-features/introduction/components/ResourceCarousel/ResourceCarousel';
import styles from './CourseIntroduction.module.css';
import LearningObjectives from '@/features/teacher/course/course-management/sub-features/introduction/components/LearningObjectives/LearningObjectives';
import LearningMethodsCard
    from "@/features/teacher/course/course-management/sub-features/introduction/components/LearningMethodsCard/LearningMethodsCard";
import AssessmentChartCard from "@/features/teacher/course/course-management/sub-features/introduction/components/AssessmentCard/AssessmentChartCard";
import ToolsAndResourcesCard
    from "@/features/teacher/course/course-management/sub-features/introduction/components/ToolsAndResourcesCard/ToolsAndResourcesCard";
import HeroBanner from "@/features/teacher/course/course-management/sub-features/introduction/components/HeroBanner/HeroBanner";

// --- 模拟数据区域 (保持不变) ---
const learningMethods = [
    '每周直播答疑，扫清知识盲点',
    '配套 LeetCode 题单，同步强化训练',
    '鼓励小组讨论，合作攻克难题',
    '期末大型项目，完整模拟企业级开发',
];
const learningObjectives = [
    { icon: 'fas fa-brain', title: '理论知识深化', description: '系统掌握线性表、树、图等核心数据结构，理解其逻辑与物理表示。' },
    { icon: 'fas fa-code', title: '算法编程能力', description: '熟练运用递归、排序、查找、动态规划等经典算法解决实际问题。' },
    { icon: 'fas fa-chart-bar', title: '复杂度分析', description: '能够精确分析算法的时间和空间复杂度，并进行性能优化。' },
];
const timelineData: TimelineItemData[] = [
    {
        time: '第 1 周',
        title: '课程导论与复杂度分析',
        description: '建立对数据结构与算法的宏观认识，掌握衡量算法效率的核心指标：时间与空间复杂度的分析方法。',
        icon: 'fas fa-tachometer-alt'
    },
    {
        time: '第 2-3 周',
        title: '线性表：数组、链表、栈与队列',
        description: '深入理解数组、链表的物理与逻辑结构，掌握栈和队列的特性及其在表达式求值、括号匹配等问题中的应用。',
        icon: 'fas fa-layer-group'
    },
    {
        time: '第 4-5 周',
        title: '字符串与树结构基础',
        description: '学习字符串的基本操作与KMP匹配算法。初步掌握树、二叉树的概念，以及前序、中序、后序遍历的递归与非递归实现。',
        icon: 'fas fa-leaf'
    },
    {
        time: '第 6 周',
        title: '高级树结构：堆与优先队列',
        description: '重点学习二叉堆的结构与操作（插入、删除），并理解其如何作为优先队列的底层实现，解决Top-K等问题。',
        icon: 'fas fa-medal'
    },
    {
        time: '第 7-8 周',
        title: '高级树结构：平衡二叉搜索树',
        description: '学习AVL树和红黑树的原理，理解它们如何通过旋转操作维持平衡，以保证高效的查找性能。',
        icon: 'fas fa-balance-scale-right'
    },
    {
        time: '第 9 周',
        title: '图的表示与遍历',
        description: '掌握图的邻接矩阵和邻接表两种表示方法，并熟练运用深度优先搜索（DFS）和广度优先搜索（BFS）解决图的连通性问题。',
        icon: 'fas fa-project-diagram'
    },
    {
        time: '第 10-11 周',
        title: '图的核心算法',
        description: '学习并实现最小生成树（Prim/Kruskal）和单源最短路径（Dijkstra/Bellman-Ford）算法。',
        icon: 'fas fa-route'
    },
    {
        time: '第 12-13 周',
        title: '查找技术与哈希表',
        description: '系统学习二分查找及其变体，深入理解哈希表的冲突解决方法（链地址法、开放定址法）与设计思想。',
        icon: 'fas fa-search'
    },
    {
        time: '第 14-15 周',
        title: '高级排序与动态规划',
        description: '精通快速排序、归并排序、堆排序等高级排序算法。初步入门动态规划，通过经典案例理解其核心思想。',
        icon: 'fas fa-sort-amount-up'
    },
    {
        time: '第 16 周',
        title: '课程总结与项目实战',
        description: '回顾整个课程的核心知识体系，进行综合性的项目实战，将所学知识融会贯通，并准备期末答辩。',
        icon: 'fas fa-graduation-cap'
    },
];
const bookResources: BookResource[] = [
    {
        title: '算法导论',
        author: 'Thomas H. Cormen',
        coverUrl: 'https://img3.doubanio.com/lpic/s1107193.jpg',
        themeColor: 'rgba(239, 68, 68, 0.2)'
    },
    {
        title: '剑指Offer',
        author: '何海涛',
        coverUrl: 'https://img9.doubanio.com/view/subject/l/public/s29432604.jpg',
        themeColor: 'rgba(59, 130, 246, 0.2)'
    },
    {
        title: '数据结构与算法分析',
        author: 'Mark Allen Weiss',
        coverUrl: 'https://img9.doubanio.com/view/subject/l/public/s1095795.jpg',
        themeColor: 'rgba(245, 158, 11, 0.2)'
    },
];
const onlineResources = [
    { name: 'LeetCode', url: '#' },
    { name: 'GeeksforGeeks', url: '#' },
    { name: 'VisuAlgo', url: '#' },
];
const techStack = [
    { name: 'Java', icon: 'fab fa-java', color: '#f89820' },
    { name: 'Python', icon: 'fab fa-python', color: '#3776ab' },
    { name: 'VS Code', icon: 'fas fa-code', color: '#007acc' },
    { name: 'Git', icon: 'fab fa-git-alt', color: '#f05032' },
    { name: 'JUnit', icon: 'fas fa-vial', color: '#25a162' },
];
const assessmentData = [
    { value: 40, name: '期末项目 40%' },
    { value: 30, name: '期中考试 30%' },
    { value: 20, name: '平时作业 20%' },
    { value: 10, name: '课堂参与 10%' },
];
const assessmentColors = ['#4f46e5', '#3b82f6', '#60a5fa', '#93c5fd'];

// 动画变体 (保持不变)
const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.07 } }
};
const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring' }}
};


export default function CourseIntroductionPage() {
    return (
        <motion.div
            className={styles.pageContainer}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {/* 1. 顶部 Hero Banner (保持不变) */}
            <HeroBanner/>

            {/* --- 核心修改：为每个卡片组件的包裹器添加正确的 className --- */}
            <div className={styles.mainGrid}>
                {/* 学习目标 */}
                <motion.div className={styles.objectivesCardWrapper} variants={itemVariants}>
                    <LearningObjectives objectives={learningObjectives} />
                </motion.div>

                {/* 学习路线图 */}
                <motion.div className={styles.timelineCardWrapper} variants={itemVariants}>
                    <LearningTimeline items={timelineData} />
                </motion.div>

                {/* 学习方法 */}
                <motion.div className={styles.methodsCardWrapper} variants={itemVariants}>
                    <LearningMethodsCard
                        title="学习方法"
                        intro="采用“理论讲解 + 编码实践 + 项目驱动”三位一体的教学模式，确保知识学以致用。"
                        methods={learningMethods}
                    />
                </motion.div>

                {/* 推荐书籍 */}
                <motion.div className={styles.resourcesCardWrapper} variants={itemVariants}>
                    <ResourceCarousel books={bookResources} />
                </motion.div>

                {/* 考核方式 */}
                <motion.div className={styles.assessmentCardWrapper} variants={itemVariants}>
                    <AssessmentChartCard
                        title="考核方式"
                        data={assessmentData}
                        colors={assessmentColors}
                    />
                </motion.div>

                {/* 技术栈与工具 */}
                <motion.div className={styles.toolsCardWrapper} variants={itemVariants}>
                    <ToolsAndResourcesCard
                        techStack={techStack}
                        onlineResources={onlineResources}
                    />
                </motion.div>
            </div>
        </motion.div>
    );
}