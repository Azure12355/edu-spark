// src/components/sections/SystemCapacitySection/SystemCapacitySection.tsx
import React from 'react';
import Image from 'next/image';
import styles from './SystemCapacitySection.module.css';

const SystemCapacitySection: React.FC = () => {
  return (
    <section className={`section-padding light-bg ${styles.systemCapacitySection}`}>
      <div className="container">
        <h2 className="section-title-global text-center">强大系统承载力，保障大模型落地</h2>
        <p className={`text-center ${styles.videoLink}`}>
          <a href="#" className="link-arrow">完整视频介绍 <i className="fas fa-chevron-right"></i></a>
        </p>
        <div className={styles.capacityContent}>
          <div className={styles.capacityText}>
            <h3>充沛GPU算力</h3>
            <h3>超高吞吐能力</h3>
            <h3>极致调度能力</h3>
            <p>灵活配置GPU算力资源，精准应对业务高峰</p>
          </div>
          <div className={styles.capacityImageContainer}>
            <Image 
              src="https://via.placeholder.com/500x350/E0E8FF/666666?text=System+Capacity" 
              alt="System Capacity Graphic"
              width={500}
              height={350}
              className={styles.capacityImage}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SystemCapacitySection;