// src/components/sections/SystemCapacitySection/SystemCapacitySection.tsx
"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './SystemCapacitySection.module.css';

interface CapacityTab {
  id: string;
  title: string;
  subtitle: string;
  imageSrc: string;
  imageAlt: string;
}

const capacityTabsData: CapacityTab[] = [
  {
    id: 'gpu',
    title: '充沛GPU算力',
    subtitle: '提供海量、高性能的GPU集群，支持万卡级别并行训练，加速大模型研发迭代。',
    imageSrc: '/images/SystemCapacitySection/CPU算力.jpg', // 替换为对应图片
    imageAlt: '充沛GPU算力图示',
  },
  {
    id: 'throughput',
    title: '超高吞吐能力',
    subtitle: '具备强大数据吞吐，优化网络与存储架构，保障业务繁忙时仍畅行无阻。',
    imageSrc: '/images/SystemCapacitySection/吞吐量.jpg', // 替换为对应图片
    imageAlt: '超高吞吐能力图示',
  },
  {
    id: 'scheduling',
    title: '极致调度能力',
    subtitle: '灵活配置GPU算力资源，智能任务调度与弹性伸缩，精准应对业务高峰。',
    imageSrc: '/images/SystemCapacitySection/极致调度.jpg', // 替换为对应图片
    imageAlt: '极致调度能力图示',
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


const SystemCapacitySection: React.FC = () => {
  const [activeTabId, setActiveTabId] = useState<string>(capacityTabsData[0].id);

  const activeTabData = capacityTabsData.find(tab => tab.id === activeTabId) || capacityTabsData[0];

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
          强大系统承载力，保障大模型落地
        </motion.h2>
        <motion.p
          className={`text-center ${styles.videoLink}`}
          variants={titleMainVariants} // 可以复用标题动画
          custom={0.1} // 动画延迟
        >
          <a href="#" className="link-arrow">完整视频介绍 <i className="fas fa-chevron-right"></i></a>
        </motion.p>

        <div className={styles.capacityContent}>
          {/* Left Column: Tabs */}
          <motion.div className={styles.capacityTabsNav} variants={{ visible: { transition: { staggerChildren: 0.1 }}}}>
            {capacityTabsData.map((tab, index) => (
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
                  <motion.div className={styles.activeTabLine} layoutId="activeCapacityTabLine" />
                )}
              </motion.button>
            ))}
          </motion.div>

          {/* Right Column: Content (Subtitle & Image) */}
          <div className={styles.capacityTabContent}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTabData.id} // Key change triggers AnimatePresence
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
                    width={520} // 统一图片尺寸
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

export default SystemCapacitySection;