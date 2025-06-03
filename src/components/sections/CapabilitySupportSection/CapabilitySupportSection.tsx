// src/components/sections/CapabilitySupportSection/CapabilitySupportSection.tsx
import React from 'react';
import Image from 'next/image';
import styles from './CapabilitySupportSection.module.css';

const capabilities = [
  {
    imgSrc: "https://via.placeholder.com/200x100/F0F4FF/666666?text=Algo+Service",
    title: "专业算法服务",
    description: "专业算法团队提供业务诊断、训练优化、问题解答等服务，让企业AI应用轻松实现",
    points: ["释放客户现有数据价值", "场景驱动的最后一公里", "助力客户成功"]
  },
  {
    imgSrc: "https://via.placeholder.com/200x100/F0F4FF/666666?text=Model+Expand",
    title: "模型能力拓展",
    description: "提供联网插件、内置插件、知识库和插件专项专AI应用开发平台，帮助企业构建应用",
    points: ["联网插件大幅提升模型搜索能力", "提供海量优质图文视频内容", "RAG知识库性能知识库检索"]
  },
  {
    imgSrc: "https://via.placeholder.com/200x100/F0F4FF/666666?text=Compute+Power",
    title: "高并发算力保障",
    description: "充沛的公有云GPU资源池、创建模型训练时可用，分钟级完成千卡扩容，保障业务稳定",
    points: ["充沛的公有云GPU资源池", "创建模型推理接入点后瞬时可用", "分钟级完成千卡扩缩容"]
  },
  {
    imgSrc: "https://via.placeholder.com/200x100/F0F4FF/666666?text=Security",
    title: "安全可信会话无痕",
    description: "通过传输加密、数据源加密和安全沙箱等技术，在模型训练、部署和推理中，有效保障数据安全",
    points: ["访问可控制、可审计", "多重数据加密及环境隔离", "安全护栏提供内容风险识别"]
  }
];

const CapabilitySupportSection: React.FC = () => {
  return (
    <section className={`section-padding ${styles.capabilitySupportSection}`}>
      <div className="container">
        <h2 className="section-title-global text-center">火山方舟平台能力支撑</h2>
        <div className={styles.capabilityCards}>
          {capabilities.map((cap, index) => (
            <div key={index} className={styles.capabilityCard}>
              <div className={styles.cardImageContainer}>
                <Image 
                  src={cap.imgSrc} 
                  alt={cap.title} 
                  width={200} 
                  height={100}
                  className={styles.cardImage}
                />
              </div>
              <h4>{cap.title}</h4>
              <p>{cap.description}</p>
              <ul>
                {cap.points.map((point, pIndex) => (
                  <li key={pIndex}><i className="fas fa-check-circle"></i> {point}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CapabilitySupportSection;