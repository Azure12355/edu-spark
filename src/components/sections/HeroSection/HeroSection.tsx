// src/components/sections/HeroSection/HeroSection.tsx
import React from 'react';
import Image from 'next/image';
import styles from './HeroSection.module.css';

const HeroSection: React.FC = () => {
  return (
    <section className={styles.heroSection}>
      {/* 视频背景 */}
      <div className={styles.videoBackgroundContainer}>
        <video
          autoPlay
          loop
          muted
          playsInline // 关键属性，用于在移动设备上（尤其是iOS）内联播放
          className={styles.backgroundVideo}
          poster="/images/hero-video-poster.jpg" // 可选：视频加载前的占位图
        >
          {/* 确保视频文件放在 public/videos/ 目录下 */}
          <source src="/video/hero.mp4" type="video/mp4" />
          {/* 可以为不支持mp4的浏览器提供其他格式 */}
          {/* <source src="/videos/hero-background.webm" type="video/webm" /> */}
          您的浏览器不支持 HTML5 视频。
        </video>
      </div>

      {/* 内容层 - 确保内容在视频之上 */}
      <div className={`container ${styles.heroContent}`}>
        <div className={styles.heroText}>
          <div className={styles.newAnnouncementContainer}>
            <span className={styles.newTag}>NEW</span>
            <span className={styles.newAnnouncement}>Prompt优解限时免费60天 <i className="fas fa-chevron-right"></i></span>
          </div>
          <h1 className={styles.mainTitle}>EduSpark</h1>
          <h2 className={styles.subTitle}>Agent助力教育行业，提供智能化的教育解决方案</h2>
          <p className={styles.description}>模型能力拓展 | 专业算法服务 | 安全可信会话无痕 | 高并发算力保障</p>
          <div className={styles.heroButtons}>
            <a href="#" className={`${styles.heroBtn} ${styles.primaryBtn}`}>立即体验</a>
            <a href="#" className={`${styles.heroBtn} ${styles.secondaryBtn}`}>API文档</a>
          </div>
        </div>
        <div className={styles.heroImageContainer}>
          <Image
            src="/"
            alt="火山方舟平台图示"
            width={570}
            height={428}
            className={styles.heroImage}
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;