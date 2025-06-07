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
  tagType?: 'hot' | 'new' | 'default';
}

// 适配 EduSpark 的功能卡片数据
const features: FeatureItem[] = [
  {
    title: "教师智能备课",
    description: "上传课程大纲，一键生成包含知识点、实训任务的完整教案。",
    linkText: "开始备课",
    href: "/teacher/dashboard", // 假设的教师端链接
    tag: "效率提升",
    tagType: "hot"
  },
  {
    title: "学生在线练习",
    description: "选择学科，进行实时练习与评测，获取即时反馈和纠错指导。",
    linkText: "开始学习",
    href: "/student/dashboard", // 假设的学生端链接
    tag: "个性化",
    tagType: "new"
  },
  {
    title: "课程资源广场",
    description: "探索由AI和教师社区共同创建的丰富课程、题库和教学资源。",
    linkText: "浏览课程",
    href: "/courses" // 假设的课程广场链接
  },
  {
    title: "使用指南与文档",
    description: "查看详细的功能介绍和API文档，快速上手 EduSpark 的所有功能。",
    linkText: "查看文档",
    href: "/docs" // 假设的文档链接
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