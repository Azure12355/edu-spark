// src/components/sections/CoreTechnologySection/CoreTechnologySection.tsx
"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './CoreTechnologySection.module.css';

interface TechTab {
  id: string;
  title: string;
  subtitle: string;
  imageSrc: string;
  imageAlt: string;
}

const techTabsData: TechTab[] = [
  {
    id: 'knowledge-understanding',
    title: '多维知识理解',
    subtitle: '基于深度语义分析，精准解析课程大纲、本地知识库与学生提问，构建全面的学科知识图谱。',
    imageSrc: '/images/SystemCapacitySection/CPU算力.jpg', // 占位图，应替换为知识图谱或数据处理相关图片
    imageAlt: '多维知识理解技术图示',
  },
  {
    id: 'dynamic-generation',
    title: '动态内容生成',
    subtitle: '结合教学目标与学生学情，动态生成个性化的练习题、教学案例与纠错建议，实现千人千面的自适应学习。',
    imageSrc: '/images/SystemCapacitySection/吞吐量.jpg', // 占位图，应替换为个性化学习路径或动态内容生成图片
    imageAlt: '动态内容生成技术图示',
  },
  {
    id: 'learning-analytics',
    title: '大规模学情分析',
    subtitle: '运用自动化评估技术，高效处理海量练习数据，深度挖掘学生知识点掌握情况，为教学优化提供数据支撑。',
    imageSrc: '/images/SystemCapacitySection/极致调度.jpg', // 占位图，应替换为数据看板或分析图表图片
    imageAlt: '大规模学情分析技术图示',
  },
];

// 动画变体
const sectionOverallVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, when: "beforeChildren", staggerChildren: 0.1 } },
};

const titleMainVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const tabButtonVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const contentVariants = {
  initial: { opacity: 0, y: 20, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } },
  exit: { opacity: 0, y: -20, scale: 0.98, transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] } },
};


const CoreTechnologySection: React.FC = () => {
  const [activeTabId, setActiveTabId] = useState<string>(techTabsData[0].id);

  const activeTabData = techTabsData.find(tab => tab.id === activeTabId) || techTabsData[0];

  return (
    <motion.section
      className={styles.systemCapacitySection}
      variants={sectionOverallVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      <div className="container">
        <motion.h2
          className={`section-title-global text-center ${styles.mainSectionTitle}`}
          variants={titleMainVariants}
        >
          核心技术架构，保障智能教学体验
        </motion.h2>
        <motion.p
          className={`text-center ${styles.videoLink}`}
          variants={titleMainVariants}
          custom={0.1}
        >
          <a href="#" className="link-arrow">查看技术白皮书 <i className="fas fa-chevron-right"></i></a>
        </motion.p>

        <div className={styles.capacityContent}>
          {/* Left Column: Tabs */}
          <motion.div className={styles.capacityTabsNav} variants={{ visible: { transition: { staggerChildren: 0.1 }}}}>
            {techTabsData.map((tab) => (
              <motion.button
                key={tab.id}
                className={`${styles.tabNavItem} ${activeTabId === tab.id ? styles.active : ''}`}
                onClick={() => setActiveTabId(tab.id)}
                variants={tabButtonVariants}
                whileHover={{ scale: 1.03, color: 'var(--ve-primary-blue)'}}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                {tab.title}
                {activeTabId === tab.id && (
                  <motion.div className={styles.activeTabLine} layoutId="activeTechTabLine" />
                )}
              </motion.button>
            ))}
          </motion.div>

          {/* Right Column: Content (Subtitle & Image) */}
          <div className={styles.capacityTabContent}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTabData.id}
                className={styles.tabContentInner}
                variants={contentVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <motion.p className={styles.tabSubtitle} >{activeTabData.subtitle}</motion.p>
                <div className={styles.capacityImageContainer}>
                  <Image
                    src={activeTabData.imageSrc}
                    alt={activeTabData.imageAlt}
                    width={520}
                    height={380}
                    className={styles.capacityImage}
                    priority={activeTabData.id === activeTabId}
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default CoreTechnologySection;