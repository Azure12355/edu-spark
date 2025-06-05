// src/components/sections/QuickExperienceSection/QuickExperienceSection.tsx
"use client"; // Framer Motion 需要客户端组件
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion'; // 引入 Framer Motion
import styles from './QuickExperienceSection.module.css';

// 假设图标已放置在 public/images/QuickExperience/ 目录下
const apiFeatures = [
  { icon: "/images/QuickExperience/模型选择.png", title: "模型选择", description: "多种模态模型体验，开箱即用" },
  { icon: "/images/QuickExperience/模型推理.png", title: "模型推理", description: "支持在线和批量推理，灵活适配" },
  { icon: "/images/QuickExperience/模型精调.png", title: "模型精调", description: "支持SFT精调，直接偏好学习等" },
  { icon: "/images/QuickExperience/模型评测.png", title: "模型评测", description: "准确评估性能，系统感知模型表现" },
  { icon: "/images/QuickExperience/prompt优化.png", title: "Prompt调优", description: "轻松打造精准Prompt，高效优化" },
  { icon: "/images/QuickExperience/应用实验室.png", title: "应用实验室", description: "多种开箱方式，搭建企业级应用" },
];

// 动画变体 (variants) 定义
const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // 子元素动画错开
    },
  },
};

const columnVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const titleVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: "backOut" } }, // backOut 提供回弹效果
};


const QuickExperienceSection: React.FC = () => {
  return (
    <motion.section
      className={styles.quickExperienceSection}
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible" // 当元素进入视口时触发动画
      viewport={{ once: true, amount: 0.2 }} // 动画只播放一次，元素20%可见时触发
    >
      <div className={`container ${styles.sectionContainer}`}>
        <motion.h2
          className={`section-title-global text-center ${styles.mainTitle}`}
          variants={titleVariants}
        >
          极速体验火山方舟
        </motion.h2>

        <div className={styles.experienceColumns}>
          {/* 左侧体验模型 */}
          <motion.div className={styles.experienceCol} variants={columnVariants}>
            <motion.h3 variants={itemVariants}>极速体验模型</motion.h3>
            <motion.p variants={itemVariants}>
              体验全模型，领取超大免费权益。每款豆包大语言模型50万Tokens免费额度，企业用户参与协作计划可获得500万Tokens免费额度。
            </motion.p>
            <motion.a href="#" className={`${styles.actionButton} ${styles.primaryGradientBtn}`} variants={itemVariants}>
              立即体验
            </motion.a>
            <motion.div className={styles.featureBox} variants={itemVariants}>
              <motion.h4 variants={itemVariants}>免费额度</motion.h4>
              <motion.p className={styles.largeText} variants={itemVariants}>50 <span className={styles.smallText}>万Tokens/豆包语言模型</span></motion.p>
              <motion.h4 variants={itemVariants}>企业客户权益</motion.h4>
              <motion.p className={styles.largeText} variants={itemVariants}>500 <span className={styles.smallText}>万Tokens/天</span></motion.p>
              <motion.h4 variants={itemVariants}>主力模型价格低至</motion.h4>
              <motion.p className={styles.highlightPrice} variants={itemVariants}>0.8 <span className={styles.smallText}>元/百万Tokens</span></motion.p>
              <motion.h4 variants={itemVariants}>多模态大模型</motion.h4>
              <motion.p variants={itemVariants}>支持<span className={styles.textBlueGradient}>文本</span>、<span className={styles.textBlueGradient}>语音</span>、<span className={styles.textBlueGradient}>视觉</span></motion.p>
            </motion.div>
          </motion.div>

          {/* 右侧API构建应用 */}
          <motion.div className={styles.experienceCol} variants={columnVariants}>
            <motion.h3 variants={itemVariants}>API构建应用</motion.h3>
            <motion.p variants={itemVariants}>
              平台提供模型精调、推理、评测等全方位功能与服务，提供联网内容等丰富插件功能、知识库与智能体集成能力，保障企业级AI应用落地。
            </motion.p>
            <motion.a href="#" className={`${styles.actionButton} ${styles.primaryGradientBtn}`} variants={itemVariants}>
              立即使用
            </motion.a>
            <motion.div className={styles.apiFeaturesGrid} variants={itemVariants}>
              {apiFeatures.map((feature, index) => (
                <motion.div key={index} className={styles.apiFeatureItem} variants={itemVariants}>
                  <Image
                    src={feature.icon} // 确保路径正确
                    alt={feature.title}
                    width={40} // 图标尺寸可以稍大一些
                    height={40}
                    className={styles.apiFeatureIcon}
                  />
                  <h4>{feature.title}</h4>
                  <p>{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default QuickExperienceSection;