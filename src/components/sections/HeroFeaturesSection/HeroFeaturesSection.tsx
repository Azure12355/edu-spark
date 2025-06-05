// src/components/sections/HeroFeaturesSection/HeroFeaturesSection.tsx
"use client";
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import styles from './HeroFeaturesSection.module.css';

interface FeatureItem {
  title: string;
  description: string;
  linkText: string;
  href: string;
  tag?: string;
  tagType?: 'hot' | 'new' | 'default'; // 新增 tagType 用于区分标签样式
}

const features: FeatureItem[] = [
  {
    title: "大模型特惠",
    description: "限量秒杀！19.9元起1000万tokens",
    linkText: "立即抢购",
    href: "#",
    tag: "限时特惠",
    tagType: "hot"
  },
  {
    title: "定价与计费",
    description: "各模型定价与计费方式",
    linkText: "了解详情",
    href: "#"
  },
  {
    title: "体验中心",
    description: "DeepSeek-R1/0528 上线",
    linkText: "免费体验",
    href: "#",
    tag: "上新",
    tagType: "new"
  },
  {
    title: "API文档",
    description: "快速入门与调用",
    linkText: "查看文档",
    href: "#"
  }
];

// 动画变体
const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // 卡片动画错开时间
      delayChildren: 0.2,   // 整体延迟一点开始子动画
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1], // 自定义缓动曲线，更平滑
    },
  },
};

const HeroFeaturesSection: React.FC = () => {
  return (
    <motion.section
      className={styles.heroFeaturesSection}
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }} // 元素10%可见时触发
    >
      <div className={`container ${styles.featuresContainer}`}>
        {features.map((feature, index) => (
          <motion.div key={index} variants={cardVariants} className={styles.cardMotionWrapper}>
            <Link href={feature.href} className={styles.featureCard}>
              <div className={styles.cardHeader}>
                <h3 className={styles.featureTitle}>{feature.title}</h3>
                {feature.tag && (
                  <span className={`${styles.featureTag} ${feature.tagType ? styles[feature.tagType] : ''}`}>
                    {feature.tag}
                  </span>
                )}
              </div>
              <p className={styles.featureDescription}>{feature.description}</p>
              <div className={styles.featureLinkWrapper}>
                <span className={styles.featureLink}>
                  {feature.linkText} <i className={`fas fa-arrow-right ${styles.linkArrow}`}></i>
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default HeroFeaturesSection;