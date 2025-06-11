// src/components/sections/TechnicalArchitectureSection/TechnicalArchitectureSection.tsx
"use client";
import React from 'react';
import { motion } from 'framer-motion';
import styles from './TechnicalArchitectureSection.module.css';

// Placeholder icons for tech stack
const IconNextJs = () => <span className={`${styles.customIcon} ${styles.iconNextJs}`}>Next.js</span>;
const IconSpringBoot = () => <span className={`${styles.customIcon} ${styles.iconSpringBoot}`}>Spring</span>;
const IconJava = () => <i className={`fas fa-coffee ${styles.customIcon} ${styles.iconJava}`}></i>;
const IconDocker = () => <i className={`fab fa-docker ${styles.customIcon} ${styles.iconDocker}`}></i>;
const IconAlibaba = () => <span className={`${styles.customIcon} ${styles.iconAlibaba}`}>Ali</span>;
const IconNginx = () => <i className={`fas fa-server ${styles.customIcon} ${styles.iconNginx}`}></i>;
const IconPostgres = () => <i className={`fas fa-database ${styles.customIcon} ${styles.iconPostgres}`}></i>;

// Animation variants
const sectionVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, when: "beforeChildren", staggerChildren: 0.1 } },
};

const titleVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const diagramRowVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
      delay: i * 0.1,
    },
  }),
};

const infoPanelVariants = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut", delay: 0.3 } },
};


const TechnicalArchitectureSection: React.FC = () => {
  const aiCapabilities = [
    '知识库 (RAG)', '智能体 (Agent)', '工具调用', '模型调度 (MCP)'
  ];
  const cloudModels = ['阿里云百炼', '通义千问'];
  const localModels = ['智谱GLM', 'DeepSeek'];
  const infrastructure = [
    { name: '阿里云 (ECS, RDS)', icon: <IconAlibaba /> },
    { name: 'Docker 容器化', icon: <IconDocker /> },
    { name: 'Nginx (网关)', icon: <IconNginx /> },
    { name: 'PGvector', icon: <IconPostgres /> },
    { name: 'CDN', icon: <i className={`fas fa-globe-asia ${styles.customIcon}`}></i> },
  ];

  return (
    <motion.section
      className={styles.technicalArchitectureSection}
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      <div className={`container ${styles.fullHeightContainer}`}>
        <motion.h2
          className={`section-title-global text-center ${styles.mainSectionTitle}`}
          variants={titleVariants}
        >
          EduSpark 技术架构全景
        </motion.h2>

        <div className={styles.contentWrapper}>
          {/* Left Column: Diagram */}
          <div className={styles.diagramContainer}>
            <motion.div className={styles.diagramRow} custom={0} variants={diagramRowVariants}>
              <div className={styles.rowLabel}>应用层 (User Application)</div>
              <div className={styles.rowContent}>
                <div className={`${styles.diagramBox} ${styles.largeBox} ${styles.interactiveBox}`}><IconNextJs /> 教师 & 学生门户</div>
                <div className={`${styles.diagramBox} ${styles.largeBox} ${styles.interactiveBox}`}><IconNextJs /> 管理驾驶舱</div>
              </div>
            </motion.div>

            <motion.div className={styles.diagramRow} custom={1} variants={diagramRowVariants}>
              <div className={styles.rowLabel}>服务与智能引擎层 (Backend & AI Engine)</div>
              <div className={styles.rowContent}>
                <div className={`${styles.diagramBox} ${styles.fullWidthBox} ${styles.interactiveBox}`}>
                  <IconSpringBoot /> <IconJava /> EduSpark 核心服务 (Spring Boot, SpringAI, Langchain4j)
                </div>
              </div>
            </motion.div>

            <motion.div className={`${styles.diagramRow} ${styles.platformFeaturesRow}`} custom={2} variants={diagramRowVariants}>
              <div className={styles.rowLabel}>AI 核心能力 (AI Core Capabilities)</div>
              <div className={styles.rowContent}>
                {aiCapabilities.map(item => (
                  <div key={item} className={`${styles.diagramBox} ${styles.featureBox} ${styles.interactiveBox}`}>{item}</div>
                ))}
              </div>
            </motion.div>

            <motion.div className={styles.diagramRow} custom={3} variants={diagramRowVariants}>
              <div className={styles.rowLabel}>基础模型层 (Foundation Models)</div>
              <div className={styles.rowContent}>
                <div className={`${styles.diagramBox} ${styles.baseModelCategory} ${styles.interactiveBox}`}>云服务模型</div>
                <div className={`${styles.diagramBox} ${styles.baseModelCategory} ${styles.interactiveBox}`}>开源/本地模型</div>
              </div>
            </motion.div>

            <motion.div className={styles.diagramRow} custom={4} variants={diagramRowVariants}>
                <div className={styles.rowLabel}>基础设施层 (Infrastructure)</div>
                <div className={styles.rowContent}>
                    {infrastructure.map(item => (
                         <div key={item.name} className={`${styles.diagramBox} ${styles.featureBox} ${styles.interactiveBox}`}>{item.icon}{item.name}</div>
                    ))}
                </div>
             </motion.div>
          </div>

          {/* Right Column: Info Panel */}
          <motion.div className={styles.infoPanel} variants={infoPanelVariants}>
            <h3 className={styles.panelTitle}>稳健、可扩展的技术架构</h3>
            <p className={styles.panelDescription}>
              EduSpark 采用业界领先的前后端分离架构，结合主流大模型技术，确保平台的高性能、高可靠性和未来的可扩展性，为智能教育提供坚实的技术基石。
            </p>
            <h4 className={styles.panelSubtitle}>架构优势</h4>
            <ul className={styles.advantagesList}>
              <li><i className="fas fa-check-circle"></i> 混合模型策略，兼顾成本与性能</li>
              <li><i className="fas fa-check-circle"></i> 高性能Java后端，保障万人同时在线</li>
              <li><i className="fas fa-check-circle"></i> 向量化存储，实现高效知识库检索</li>
              <li><i className="fas fa-check-circle"></i> 全链路容器化部署，敏捷迭代</li>
            </ul>
            <button className={styles.consultButton}>查看技术白皮书</button>
            <h4 className={styles.panelSubtitle}>关键技术栈</h4>
            <div className={styles.relatedCapabilities}>
              <div className={`${styles.capabilityItem} ${styles.interactiveItem}`}><IconNextJs /> Next.js</div>
              <div className={`${styles.capabilityItem} ${styles.interactiveItem}`}><IconSpringBoot /> Spring Boot</div>
              <div className={`${styles.capabilityItem} ${styles.interactiveItem}`}><IconDocker /> Docker</div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default TechnicalArchitectureSection;