// src/components/sections/ProductDiagramSection/ProductDiagramSection.tsx
"use client";
import React from 'react';
import { motion } from 'framer-motion';
import styles from './ProductDiagramSection.module.css';

// 保持您之前的图标定义
const IconCoze = () => <span className={`${styles.customIcon} ${styles.iconCoze}`}>Coze</span>;
const IconHiAgent = () => <span className={`${styles.customIcon} ${styles.iconHiAgent}`}>Hi</span>;
const IconVolcArk = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor" className={`${styles.customIcon} ${styles.iconVolcArk}`}>
    <path d="M3.515 10.484Q2.531 10.484 2.016 11.172Q1.5 11.859 1.5 12.984Q1.5 14.109 2.016 14.797Q2.531 15.484 3.515 15.484Q4.5 15.484 5.016 14.797Q5.531 14.109 5.531 12.984Q5.531 11.859 5.016 11.172Q4.5 10.484 3.515 10.484ZM9.515 10.484Q8.531 10.484 8.016 11.172Q7.5 11.859 7.5 12.984Q7.5 14.109 8.016 14.797Q8.531 15.484 9.515 15.484Q10.5 15.484 11.016 14.797Q11.531 14.109 11.531 12.984Q11.531 11.859 11.016 11.172Q10.5 10.484 9.515 10.484ZM15.515 10.484Q14.531 10.484 14.016 11.172Q13.5 11.859 13.5 12.984Q13.5 14.109 14.016 14.797Q14.531 15.484 15.515 15.484Q16.5 15.484 17.016 14.797Q17.531 14.109 17.531 12.984Q17.531 11.859 17.016 11.172Q16.5 10.484 15.515 10.484ZM21.484 10.484Q20.5 10.484 19.984 11.172Q19.468 11.859 19.468 12.984Q19.468 14.109 19.984 14.797Q20.5 15.484 21.484 15.484Q22.468 15.484 22.984 14.797Q23.5 14.109 23.5 12.984Q23.5 11.859 22.984 11.172Q22.468 10.484 21.484 10.484Z" />
    <path d="M3.515 6.484Q2.531 6.484 2.016 7.172Q1.5 7.859 1.5 8.984Q1.5 10.109 2.016 10.797Q2.531 11.484 3.515 11.484Q4.5 11.484 5.016 10.797Q5.531 10.109 5.531 8.984Q5.531 7.859 5.016 7.172Q4.5 6.484 3.515 6.484ZM9.515 6.484Q8.531 6.484 8.016 7.172Q7.5 7.859 7.5 8.984Q7.5 10.109 8.016 10.797Q8.531 11.484 9.515 11.484Q10.5 11.484 11.016 10.797Q11.531 10.109 11.531 8.984Q11.531 7.859 11.016 7.172Q10.5 6.484 9.515 6.484ZM15.515 6.484Q14.531 6.484 14.016 7.172Q13.5 7.859 13.5 8.984Q13.5 10.109 14.016 10.797Q14.531 11.484 15.515 11.484Q16.5 11.484 17.016 10.797Q17.531 10.109 17.531 8.984Q17.531 7.859 17.016 7.172Q16.5 6.484 15.515 6.484ZM21.484 6.484Q20.5 6.484 19.984 7.172Q19.468 7.859 19.468 8.984Q19.468 10.109 19.984 10.797Q20.5 11.484 21.484 11.484Q22.468 11.484 22.984 10.797Q23.5 10.109 23.5 8.984Q23.5 7.859 22.984 7.172Q22.468 6.484 21.484 6.484Z" />
    <path d="M3.515 14.484Q2.531 14.484 2.016 15.172Q1.5 15.859 1.5 16.984Q1.5 18.109 2.016 18.797Q2.531 19.484 3.515 19.484Q4.5 19.484 5.016 18.797Q5.531 18.109 5.531 16.984Q5.531 15.859 5.016 15.172Q4.5 14.484 3.515 14.484ZM9.515 14.484Q8.531 14.484 8.016 15.172Q7.5 15.859 7.5 16.984Q7.5 18.109 8.016 18.797Q8.531 19.484 9.515 19.484Q10.5 19.484 11.016 18.797Q11.531 18.109 11.531 16.984Q11.531 15.859 11.016 15.172Q10.5 14.484 9.515 14.484ZM15.515 14.484Q14.531 14.484 14.016 15.172Q13.5 15.859 13.5 16.984Q13.5 18.109 14.016 18.797Q14.531 19.484 15.515 19.484Q16.5 19.484 17.016 18.797Q17.531 18.109 17.531 16.984Q17.531 15.859 17.016 15.172Q16.5 14.484 15.515 14.484ZM21.484 14.484Q20.5 14.484 19.984 15.172Q19.468 15.859 19.468 16.984Q19.468 18.109 19.984 18.797Q20.5 19.484 21.484 19.484Q22.468 19.484 22.984 18.797Q23.5 18.109 23.5 16.984Q23.5 15.859 22.984 15.172Q22.468 14.484 21.484 14.484Z" />
  </svg>
);
const IconDoubao = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" className={`${styles.customIcon} ${styles.iconDoubao}`}>
        <defs>
            <linearGradient id="doubaoProductDiagramGradient" x1="0%" y1="0%" x2="100%" y2="100%"> {/* 使用新的ID避免冲突 */}
            <stop offset="0%" style={{stopColor: '#FF6B6B', stopOpacity: 1}} />
            <stop offset="50%" style={{stopColor: '#FFE66D', stopOpacity: 1}} />
            <stop offset="100%" style={{stopColor: '#4ECDC4', stopOpacity: 1}} />
            </linearGradient>
        </defs>
        <path fill="url(#doubaoProductDiagramGradient)" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.5 14.5c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3-5c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3 5c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>
    </svg>
);

// 动画变体
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
  visible: (i: number) => ({ // 接受自定义参数 i (index)
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
      delay: i * 0.1, // 基于索引的错开延迟
    },
  }),
};

const infoPanelVariants = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut", delay: 0.3 } }, // 稍晚于图表入场
};


const ProductDiagramSection: React.FC = () => {
  // 扩展平台能力数据
  const platformFeatures = [
    '体验中心', '模型精调', '模型测评', '模型推理', 
    'Prompt优化', '智能体广场', '插件生态', '安全防护'
  ];
  // 扩展三方模型数据
  const thirdPartyModels = [
    '通用对话模型', '代码生成模型', '文生图模型', '行业专用模型'
  ];


  return (
    <motion.section
      className={styles.productDiagramSection}
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }} // 元素10%可见时触发动画
    >
      <div className={`container ${styles.fullHeightContainer}`}>
        <motion.h2
          className={`section-title-global text-center ${styles.mainSectionTitle}`}
          variants={titleVariants}
        >
          大模型产品关系图
        </motion.h2>

        <div className={styles.contentWrapper}>
          {/* Left Column: Diagram */}
          <div className={styles.diagramContainer}>
            {/* Row 1: AI 应用开发 */}
            <motion.div className={styles.diagramRow} custom={0} variants={diagramRowVariants}>
              <div className={styles.rowLabel}>AI应用开发</div>
              <div className={styles.rowContent}>
                <div className={`${styles.diagramBox} ${styles.largeBox} ${styles.interactiveBox}`}>
                  <IconCoze /> Coze专业版
                </div>
                <div className={`${styles.diagramBox} ${styles.largeBox} ${styles.interactiveBox}`}>
                  <IconHiAgent /> Hi Agent
                </div>
              </div>
            </motion.div>

            {/* Row 2: 大模型服务 */}
            <motion.div className={styles.diagramRow} custom={1} variants={diagramRowVariants}>
              <div className={styles.rowLabel}>大模型服务</div>
              <div className={styles.rowContent}>
                <div className={`${styles.diagramBox} ${styles.fullWidthBox} ${styles.arkBox} ${styles.interactiveBox}`}>
                  <IconVolcArk /> 火山方舟 —— 一站式大模型服务平台
                </div>
              </div>
            </motion.div>

            {/* Row 3: 火山方舟平台能力 */}
            <motion.div className={`${styles.diagramRow} ${styles.platformFeaturesRow}`} custom={2} variants={diagramRowVariants}>
              <div className={styles.rowContent}>
                {platformFeatures.map(item => (
                  <div key={item} className={`${styles.diagramBox} ${styles.featureBox} ${styles.interactiveBox}`}>{item}</div>
                ))}
              </div>
            </motion.div>

            {/* Row 4: 基础模型 */}
            <motion.div className={styles.diagramRow} custom={3} variants={diagramRowVariants}>
              <div className={styles.rowLabel}>基础模型</div>
              <div className={styles.rowContent}>
                <div className={`${styles.diagramBox} ${styles.baseModelCategory} ${styles.doubaoCategory} ${styles.interactiveBox}`}>
                  <IconDoubao /> 豆包大模型
                </div>
                <div className={`${styles.diagramBox} ${styles.baseModelCategory} ${styles.thirdPartyCategoryContainer} ${styles.interactiveBox}`}>
                  <span className={styles.thirdPartyTitle}>三方模型</span>
                  <div className={styles.thirdPartyGrid}>
                    {thirdPartyModels.map(model => (
                      <span key={model} className={styles.thirdPartyItem}>{model}</span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

             {/* Row 5: 豆包大模型 subtypes - Centered */}
            <motion.div className={`${styles.diagramRow} ${styles.subModelsRowWrapper}`} custom={4} variants={diagramRowVariants}>
                <div className={styles.subModelsRowContent}>
                    {['视觉大模型', '多模态大模型', '语音大模型', '语言大模型', '安全与责任模型'].map(item => ( // 增加一个模型类型
                         <div key={item} className={`${styles.diagramBox} ${styles.subModelBox} ${styles.interactiveBox}`}>{item}</div>
                    ))}
                </div>
             </motion.div>
          </div>

          {/* Right Column: Info Panel */}
          <motion.div className={styles.infoPanel} variants={infoPanelVariants}>
            <h3 className={styles.panelTitle}>火山方舟</h3>
            <p className={styles.panelDescription}>
              平台提供模型精调、推理、评测等全方位功能与服务，提供丰富的插件生态和AI原生应用开发服务，并通过安全可信的基础设施、专业的算法技术服务，全方位保障企业级AI应用落地。
            </p>
            <h4 className={styles.panelSubtitle}>架构优势</h4>
            <ul className={styles.advantagesList}>
              <li><i className="fas fa-check-circle"></i> 专业算法服务</li>
              <li><i className="fas fa-check-circle"></i> 模型能力拓展</li>
              <li><i className="fas fa-check-circle"></i> 高并发算力保障</li>
              <li><i className="fas fa-check-circle"></i> 安全可信会话无痕</li>
            </ul>
            <button className={styles.consultButton}>立即咨询</button>
            <h4 className={styles.panelSubtitle}>相关能力</h4>
            <div className={styles.relatedCapabilities}>
              <div className={`${styles.capabilityItem} ${styles.interactiveItem}`}><IconDoubao /> 豆包大模型</div>
              <div className={`${styles.capabilityItem} ${styles.interactiveItem}`}><IconVolcArk /> 火山方舟</div>
              <div className={`${styles.capabilityItem} ${styles.interactiveItem}`}><IconCoze /> Coze专业版</div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default ProductDiagramSection;