// src/components/sections/ProductDiagramSection/ProductDiagramSection.tsx
import React from 'react';
import Image from 'next/image';
import styles from './ProductDiagramSection.module.css';

// 假设我们有一些图标的路径或者组件
// 为了演示，这里用 Font Awesome 图标代替，实际项目中可能是 SVG 或 Image 组件
const IconCoze = () => <i className={`fas fa-robot ${styles.customIcon} ${styles.iconCoze}`}></i>; // 示例
const IconHiAgent = () => <i className={`fas fa-headset ${styles.customIcon} ${styles.iconHiAgent}`}></i>; // 示例
const IconVolcArk = () => <i className={`fas fa-water ${styles.customIcon} ${styles.iconVolcArk}`}></i>; // 示例，官网是三条波浪线
const IconDoubao = () => <i className={`fas fa-brain ${styles.customIcon} ${styles.iconDoubao}`}></i>; // 示例，官网是多彩豆子

const ProductDiagramSection: React.FC = () => {
  return (
    <section className={`section-padding ${styles.productDiagramSection}`}>
      <div className="container">
        <h2 className={`section-title-global text-center ${styles.mainSectionTitle}`}>
          大模型产品关系图
        </h2>
        <div className={styles.contentWrapper}>
          {/* Left Column: Diagram */}
          <div className={styles.diagramContainer}>
            {/* Row 1: AI 应用开发 */}
            <div className={styles.diagramRow}>
              <div className={styles.rowLabel}>AI应用开发</div>
              <div className={styles.rowContent}>
                <div className={`${styles.diagramBox} ${styles.largeBox}`}>
                  <IconCoze /> Coze专业版
                </div>
                <div className={`${styles.diagramBox} ${styles.largeBox}`}>
                  <IconHiAgent /> Hi Agent
                </div>
              </div>
            </div>

            {/* Row 2: 大模型服务 */}
            <div className={styles.diagramRow}>
              <div className={styles.rowLabel}>大模型服务</div>
              <div className={styles.rowContent}>
                <div className={`${styles.diagramBox} ${styles.fullWidthBox} ${styles.arkBox}`}>
                  <IconVolcArk /> 火山方舟 —— 一站式大模型服务平台
                </div>
              </div>
            </div>

            {/* Row 3: 火山方舟平台能力 */}
            <div className={`${styles.diagramRow} ${styles.platformFeaturesRow}`}>
              {/* No explicit label, part of 火山方舟 */}
              <div className={styles.rowContent}>
                <div className={`${styles.diagramBox} ${styles.featureBox}`}>体验中心</div>
                <div className={`${styles.diagramBox} ${styles.featureBox}`}>模型精调</div>
                <div className={`${styles.diagramBox} ${styles.featureBox}`}>模型测评</div>
                <div className={`${styles.diagramBox} ${styles.featureBox}`}>模型推理</div>
                <div className={`${styles.diagramBox} ${styles.featureBox}`}>Prompt优化</div>
                <div className={`${styles.diagramBox} ${styles.featureBox}`}>智能体广场</div>
              </div>
            </div>

            {/* Row 4: 基础模型 */}
            <div className={styles.diagramRow}>
              <div className={styles.rowLabel}>基础模型</div>
              <div className={styles.rowContent}>
                <div className={`${styles.diagramBox} ${styles.baseModelCategory} ${styles.doubaoCategory}`}>
                  <IconDoubao /> 豆包大模型
                </div>
                <div className={`${styles.diagramBox} ${styles.baseModelCategory} ${styles.thirdPartyCategory}`}>
                  三方模型
                </div>
              </div>
            </div>

             {/* Row 5: 豆包大模型 subtypes */}
             <div className={`${styles.diagramRow} ${styles.subModelsRow}`}>
                <div className={styles.rowContent} style={{ paddingLeft: 'calc(25% + 10px)'}}> {/* 粗略对齐豆包大模型 */}
                    <div className={`${styles.diagramBox} ${styles.subModelBox}`}>视觉大模型</div>
                    <div className={`${styles.diagramBox} ${styles.subModelBox}`}>多模态大模型</div>
                    <div className={`${styles.diagramBox} ${styles.subModelBox}`}>语音大模型</div>
                    <div className={`${styles.diagramBox} ${styles.subModelBox}`}>语言大模型</div>
                </div>
             </div>

          </div>

          {/* Right Column: Info Panel */}
          <div className={styles.infoPanel}>
            <h3 className={styles.panelTitle}>火山方舟</h3>
            <p className={styles.panelDescription}>
              平台提供模型精调、推理、评测等全方位功能与服务，提供丰富的插件生态和AI原生应用开发服务，并通过安全可信的基础设施、专业的算法技术服务，全方位保障企业级AI应用落地
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
              <div className={styles.capabilityItem}><IconDoubao /> 豆包大模型</div>
              <div className={styles.capabilityItem}><IconVolcArk /> 火山方舟</div>
              <div className={styles.capabilityItem}><IconCoze /> Coze专业版</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDiagramSection;