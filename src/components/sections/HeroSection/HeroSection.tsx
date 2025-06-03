// src/components/sections/HeroSection/HeroSection.tsx
import React from 'react';
import Image from 'next/image';
// import Button from '../../common/Button/Button'; // 我们将为Hero部分的按钮定制样式，可以不直接用通用Button
import styles from './HeroSection.module.css';

const HeroSection: React.FC = () => {
  return (
    <section className={styles.heroSection}>
      <div className={`container ${styles.heroContent}`}>
        <div className={styles.heroText}>
          <div className={styles.newAnnouncementContainer}>
            <span className={styles.newTag}>NEW</span>
            {/* 官网的公告似乎有两个版本，这里采用第二个截图的样式 */}
            <span className={styles.newAnnouncement}>Prompt优解限时免费60天 <i className="fas fa-chevron-right"></i></span>
          </div>
          <h1 className={styles.mainTitle}>火山方舟</h1>
          <h2 className={styles.subTitle}>一站式大模型开发平台</h2>
          <p className={styles.description}>模型能力拓展 | 专业算法服务 | 安全可信会话无痕 | 高并发算力保障</p>
          <div className={styles.heroButtons}>
            <a href="#" className={`${styles.heroBtn} ${styles.primaryBtn}`}>立即体验</a>
            <a href="#" className={`${styles.heroBtn} ${styles.secondaryBtn}`}>API文档</a>
          </div>
        </div>
        <div className={styles.heroImageContainer}>
          <Image
            src="https://lf-volc-website.volccdn.com/obj/volcengine-public/large_language_model/image/ark-banner.image.1.0.png" // 使用官网图片链接
            alt="火山方舟平台图示"
            width={570} // 根据官网图片尺寸调整
            height={428} // 根据官网图片尺寸调整
            className={styles.heroImage}
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;