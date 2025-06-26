// src/app/teacher/(dashboard)/courses/[id]/introduction/page.tsx
"use client";
import React from 'react';
import { motion } from 'framer-motion';
import EChartsReactCore from '@/components/common/ECharts/EChartsReactCore';
import type { EChartsOption } from 'echarts';
import LearningTimeline, { TimelineItemData } from '@/components/teacher/course-management/introduction/LearningTimeline/LearningTimeline';
import ResourceCarousel, { BookResource } from '@/components/teacher/course-management/introduction/ResourceCarousel/ResourceCarousel';
import styles from './introduction.module.css';
import LearningObjectives from '@/components/teacher/course-management/introduction/LearningObjectives/LearningObjectives';

// --- 模拟数据区域 ---

// 学习目标数据
const learningObjectives = [
    { icon: 'fas fa-brain', title: '理论知识深化', description: '系统掌握线性表、树、图等核心数据结构，理解其逻辑与物理表示。' },
    { icon: 'fas fa-code', title: '算法编程能力', description: '熟练运用递归、排序、查找、动态规划等经典算法解决实际问题。' },
    { icon: 'fas fa-chart-bar', title: '复杂度分析', description: '能够精确分析算法的时间和空间复杂度，并进行性能优化。' },
    { icon: 'fas fa-puzzle-piece', title: '抽象思维构建', description: '培养将现实问题抽象为数据结构模型并设计算法求解的能力。' },
];

// 学习路线图数据
const timelineData: TimelineItemData[] = [
    { time: '第 1-2 周', title: '基础入门与线性表', description: '介绍课程，学习时间与空间复杂度分析，掌握数组、链表、栈和队列。', icon: 'fas fa-ruler-horizontal' },
    { time: '第 3-5 周', title: '树与二叉树', description: '深入学习二叉树、平衡二叉树（AVL）、红黑树以及哈夫曼树。', icon: 'fas fa-leaf' },
    { time: '第 6-8 周', title: '图结构与算法', description: '掌握图的表示、遍历（DFS/BFS）、最小生成树（Prim/Kruskal）和最短路径（Dijkstra）。', icon: 'fas fa-project-diagram' },
    { time: '第 9-12 周', title: '查找与排序', description: '全面学习哈希表、二分查找及各种内排序算法（冒泡、快排、归并、堆排）。', icon: 'fas fa-sort-alpha-down' },
    { time: '第 13-16 周', title: '高级主题与总复习', description: '介绍动态规划思想、字符串匹配（KMP），并进行期末总复习与项目答辩。', icon: 'fas fa-graduation-cap' },
];

// 学习资源数据
const bookResources: BookResource[] = [
    { title: '算法导论', author: 'Thomas H. Cormen', coverUrl: 'https://img3.doubanio.com/lpic/s1107193.jpg' },
    { title: '剑指Offer', author: '何海涛', coverUrl: 'https://img9.doubanio.com/view/subject/l/public/s29432604.jpg' },
    { title: '数据结构与算法分析', author: 'Mark Allen Weiss', coverUrl: 'https://img9.doubanio.com/view/subject/l/public/s1095795.jpg' },
];

const onlineResources = [
    { name: 'LeetCode', url: '#', desc: '算法练习与竞赛平台' },
    { name: 'GeeksforGeeks', url: '#', desc: '计算机科学知识门户' },
    { name: 'VisuAlgo', url: '#', desc: '数据结构和算法可视化' },
];

// 技术栈与工具数据
const techStack = [
    { name: 'Java', icon: 'fab fa-java', color: '#f89820' },
    { name: 'Python', icon: 'fab fa-python', color: '#3776ab' },
    { name: 'VS Code', icon: 'fas fa-code', color: '#007acc' },
    { name: 'Git', icon: 'fab fa-git-alt', color: '#f05032' },
    { name: 'JUnit', icon: 'fas fa-vial', color: '#25a162' },
];

// 考核方式图表配置
const assessmentOption: EChartsOption = {
    tooltip: { trigger: 'item' },
    legend: {
        orient: 'vertical',
        left: 'right',
        top: 'center',
        textStyle: { color: 'var(--teacher-text-secondary)'}
    },
    series: [
        {
            name: '考核方式',
            type: 'pie',
            radius: ['50%', '80%'],
            center: ['40%', '50%'],
            avoidLabelOverlap: false,
            label: { show: false, position: 'center' },
            emphasis: { label: { show: true, fontSize: 20, fontWeight: 'bold' } },
            labelLine: { show: false },
            data: [
                { value: 40, name: '期末项目 40%' },
                { value: 30, name: '期中考试 30%' },
                { value: 20, name: '平时作业 20%' },
                { value: 10, name: '课堂参与 10%' },
            ],
            color: ['#4f46e5', '#3b82f6', '#60a5fa', '#93c5fd']
        }
    ]
};

// 动画变体
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
};
const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring' }}
};


export default function CourseIntroductionPage() {

    // 新增：为辉光效果添加鼠标位置追踪
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const items = e.currentTarget.querySelectorAll(`.${styles.objectiveItem}`);
        items.forEach(item => {
            const rect = item.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            (item as HTMLElement).style.setProperty('--mouse-x', `${x}px`);
            (item as HTMLElement).style.setProperty('--mouse-y', `${y}px`);
        });
    };

    return (
        <motion.div
            className={styles.pageContainer}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {/* 1. 顶部 Hero Banner */}
            <motion.div className={`${styles.card} ${styles.heroCard}`} variants={itemVariants}>
                <div className={styles.heroContent}>
                    <h1 className={styles.heroTitle}>数据结构与算法</h1>
                    <p className={styles.heroSubtitle}>本课程是计算机科学的核心基石，旨在培养学生的计算思维、编程内功与问题求解能力，为未来的技术生涯铺平道路。</p>
                    <div className={styles.heroStats}>
                        <div className={styles.statItem}><i className="fas fa-book-open"></i>10+ 核心知识点</div>
                        <div className={styles.statItem}><i className="fas fa-microchip"></i>20+ 经典算法</div>
                        <div className={styles.statItem}><i className="far fa-clock"></i>96 预计学时</div>
                    </div>
                    <div className={styles.heroActions}>
                        <button className={styles.ctaButton}>开始第一章学习</button>
                        <button className={styles.outlineButton}>查看教学大纲</button>
                    </div>
                </div>
                <div className={styles.heroIllustration}>
                    {/* 可以放置一个与主题相关的SVG或图片 */}
                    <i className="fas fa-drafting-compass"></i>
                </div>
            </motion.div>

            <div className={styles.mainGrid}>
                {/* 2. 学习目标 */}
                <motion.div
                    className={styles.objectivesCardWrapper}
                    variants={itemVariants}
                    onMouseMove={handleMouseMove} // 添加鼠标追踪事件
                >
                    {/* 使用新的独立组件替换旧的 JSX 结构 */}
                    <LearningObjectives objectives={learningObjectives} />
                </motion.div>

                {/* 3. 学习路线图 */}
                <motion.div className={`${styles.card} ${styles.timelineCard}`} variants={itemVariants}>
                    <h2 className={styles.sectionTitle}>学习路线图</h2>
                    <LearningTimeline items={timelineData} />
                </motion.div>

                {/* 4. 学习方法与资源 */}
                <motion.div className={`${styles.card} ${styles.methodsCard}`} variants={itemVariants}>
                    <h2 className={styles.sectionTitle}>学习方法</h2>
                    <p className={styles.methodsIntro}>采用“理论讲解 + 编码实践 + 项目驱动”三位一体的教学模式，确保知识学以致用。</p>
                    <ul className={styles.methodsList}>
                        <li><i className="fas fa-check-circle"></i> 每周直播答疑，扫清知识盲点</li>
                        <li><i className="fas fa-check-circle"></i> 配套 LeetCode 题单，同步强化训练</li>
                        <li><i className="fas fa-check-circle"></i> 鼓励小组讨论，合作攻克难题</li>
                        <li><i className="fas fa-check-circle"></i> 期末大型项目，完整模拟企业级开发</li>
                    </ul>
                </motion.div>

                <motion.div className={`${styles.card} ${styles.resourcesCard}`} variants={itemVariants}>
                    <h2 className={styles.sectionTitle}>推荐书籍</h2>
                    <ResourceCarousel books={bookResources} />
                </motion.div>

                {/* 5. 考核方式 */}
                <motion.div className={`${styles.card} ${styles.assessmentCard}`} variants={itemVariants}>
                    <h2 className={styles.sectionTitle}>考核方式</h2>
                    <EChartsReactCore option={assessmentOption} style={{ height: '100%', width: '100%' }} />
                </motion.div>

                {/* 6. 环境与工具 */}
                <motion.div className={`${styles.card} ${styles.toolsCard}`} variants={itemVariants}>
                    <h2 className={styles.sectionTitle}>技术栈与工具</h2>
                    <div className={styles.toolsGrid}>
                        {techStack.map(tool => (
                            <div key={tool.name} className={styles.toolItem}>
                                <i className={tool.icon} style={{ color: tool.color }}></i>
                                <span>{tool.name}</span>
                            </div>
                        ))}
                    </div>
                    <h2 className={`${styles.sectionTitle} ${styles.secondaryTitle}`}>在线资源</h2>
                    <div className={styles.onlineResourcesList}>
                        {onlineResources.map(res => (
                            <a key={res.name} href={res.url} target="_blank" rel="noopener noreferrer" className={styles.onlineResourceItem}>
                                {res.name}
                                <i className="fas fa-external-link-alt"></i>
                            </a>
                        ))}
                    </div>
                </motion.div>

            </div>
        </motion.div>
    );
}