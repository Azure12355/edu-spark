// src/components/sections/QuickExperienceSection/QuickExperienceSection.tsx
"use client"; 
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion'; 
import styles from './QuickExperienceSection.module.css';

// 适配 EduSpark 学生端功能的数据
const studentFeatures = [
  { icon: "/images/QuickExperience/模型选择.png", title: "学科选择", description: "覆盖全学科，选择你的专属学习领域" },
  { icon: "/images/QuickExperience/模型推理.png", title: "在线练习", description: "随时随地进行练习，巩固知识点" },
  { icon: "/images/QuickExperience/模型精调.png", title: "个性化辅导", description: "AI根据你的学习进度，提供定制化指导" },
  { icon: "/images/QuickExperience/模型评测.png", title: "即时评测", description: "提交即评测，快速获取成绩和解析" },
  { icon: "/images/QuickExperience/prompt优化.png", title: "智能问答", description: "学习中遇到的任何问题，随时提问" },
  { icon: "/images/QuickExperience/应用实验室.png", title: "错题本分析", description: "自动归纳错题，精准定位薄弱环节" },
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
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: "backOut" } },
};


const QuickExperienceSection: React.FC = () => {
  return (
    <motion.section
      className={styles.quickExperienceSection}
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }} 
    >
      <div className={`container ${styles.sectionContainer}`}>
        <motion.h2
          className={`section-title-global text-center ${styles.mainTitle}`}
          variants={titleVariants}
        >
          快速开始您的 EduSpark 之旅
        </motion.h2>

        <div className={styles.experienceColumns}>
          {/* 左侧：教师端 */}
          <motion.div className={styles.experienceCol} variants={columnVariants}>
            <motion.h3 variants={itemVariants}>教师端：一键开启智能教学</motion.h3>
            <motion.p variants={itemVariants}>
              上传您的课程大纲、知识库文档，EduSpark 即可为您自动设计包含知识讲解、实训练习与指导的完整教学内容，将您从繁重的备课工作中解放出来。
            </motion.p>
            <motion.a href="/teacher/studio" className={`${styles.actionButton} ${styles.primaryGradientBtn}`} variants={itemVariants}>
              进入教师工作台
            </motion.a>
            <motion.div className={styles.featureBox} variants={itemVariants}>
              <motion.h4 variants={itemVariants}>教案生成速度</motion.h4>
              <motion.p className={styles.largeText} variants={itemVariants}>秒级响应 <span className={styles.smallText}>，告别数小时的手动整理</span></motion.p>
              <motion.h4 variants={itemVariants}>知识点覆盖率</motion.h4>
              <motion.p className={styles.largeText} variants={itemVariants}>95%+ <span className={styles.smallText}>，精准关联教学大纲</span></motion.p>
              <motion.h4 variants={itemVariants}>支持的教学资源</motion.h4>
              <motion.p variants={itemVariants}>
                支持<span className={styles.textBlueGradient}>大纲</span>、<span className={styles.textBlueGradient}>PPT</span>、<span className={styles.textBlueGradient}>本地文档</span>等多种格式
              </motion.p>
            </motion.div>
          </motion.div>

          {/* 右侧：学生端 */}
          <motion.div className={styles.experienceCol} variants={columnVariants}>
            <motion.h3 variants={itemVariants}>学生端：您的专属 AI 学习伙伴</motion.h3>
            <motion.p variants={itemVariants}>
              在这里，您可以随时随地进行在线练习，获得即时反馈和个性化辅导。AI 将成为您的全天候学习伙伴，帮助您攻克每一个知识难点。
            </motion.p>
            <motion.a href="/student/home" className={`${styles.actionButton} ${styles.primaryGradientBtn}`} variants={itemVariants}>
              开始在线学习
            </motion.a>
            <motion.div className={styles.apiFeaturesGrid} variants={itemVariants}>
              {studentFeatures.map((feature, index) => (
                <motion.div key={index} className={styles.apiFeatureItem} variants={itemVariants}>
                  <Image
                    src={feature.icon}
                    alt={feature.title}
                    width={40}
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