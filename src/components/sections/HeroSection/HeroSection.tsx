// src/components/sections/HeroSection/HeroSection.tsx
"use client"
import React, { useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import styles from './HeroSection.module.css';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 12,
    },
  },
};

const HeroSection: React.FC = () => {

  useEffect(() => {
    console.log(motion);
    
  },[motion])

  return (
    <section className={styles.heroSection}>
      <div className={styles.videoBackgroundContainer}>
        <video
          autoPlay
          loop
          muted
          playsInline
          className={styles.backgroundVideo}
          poster="/video/hero-video-poster.jpg"
        >
          <source src="/video/hero.mp4" type="video/mp4" />
          您的浏览器不支持 HTML5 视频。
        </video>
        <div className={styles.videoOverlay}></div>
      </div>

      <motion.div
        className={`container ${styles.heroContent}`}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className={styles.heroText}>
          <motion.div variants={itemVariants} className={styles.newAnnouncementContainer}>
            <span className={styles.newTag}>NEW</span>
            <span className={styles.newAnnouncement}>Prompt优解限时免费60天 <i className="fas fa-chevron-right"></i></span>
          </motion.div>
          <motion.h1 variants={itemVariants} className={styles.mainTitle}>EduSpark</motion.h1>
          <motion.h2 variants={itemVariants} className={styles.subTitle}>Agent助力教育行业</motion.h2>
          <motion.p variants={itemVariants} className={styles.description}>
            模型能力拓展 | 专业算法服务 | 安全可信会话无痕 | 高并发算力保障
          </motion.p>
          <motion.div variants={itemVariants} className={styles.heroButtons}>
            <a href="#" className={`${styles.heroBtn} ${styles.primaryBtn}`}>立即体验</a>
            <a href="#" className={`${styles.heroBtn} ${styles.secondaryBtn}`}>API文档</a>
          </motion.div>
        </div>
        <motion.div
          className={styles.heroImageContainer}
          initial={{ opacity: 0, scale: 0.8, x: 50 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <Image
            src="/images/HeroSection/banner.png"
            alt="AI 助力教育行业图示"
            width={480}
            height={480}
            className={styles.heroImage}
            priority
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection; // <--- 确保这一行存在且正确！