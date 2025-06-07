// src/components/sections/HeroSection/HeroSection.tsx
"use client"
import React from 'react';
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
            <span className={styles.newAnnouncement}>《嵌入式Linux》课程智能体已上线 <i className="fas fa-chevron-right"></i></span>
          </motion.div>
          <motion.h1 variants={itemVariants} className={styles.mainTitle}>EduSpark</motion.h1>
          <motion.h2 variants={itemVariants} className={styles.subTitle}>点亮教学灵感，激发求知火花</motion.h2>
          <motion.p variants={itemVariants} className={styles.description}>
            为教师提供智能备课与学情分析，为学生打造个性化实时练习与辅导。开启教学新范式，培养未来高素质人才。
          </motion.p>
          <motion.div variants={itemVariants} className={styles.heroButtons}>
            <a href="#" className={`${styles.heroBtn} ${styles.primaryBtn}`}>教师快速备课</a>
            <a href="#" className={`${styles.heroBtn} ${styles.secondaryBtn}`}>学生在线实训</a>
          </motion.div>
        </div>
        <motion.div
          className={styles.heroImageContainer}
          initial={{ opacity: 0, scale: 0.8, x: 50 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* 沿用参考项目的图片作为占位符 */}
          <Image
            src="/images/HeroSection/banner.png"
            alt="AI 赋能教育实训图示"
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

export default HeroSection;