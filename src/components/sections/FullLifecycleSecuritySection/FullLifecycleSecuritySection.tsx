// src/components/sections/FullLifecycleSecuritySection/FullLifecycleSecuritySection.tsx
"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './FullLifecycleSecuritySection.module.css';

// 图标占位符 - 实际项目中请替换为SVG或真实图标组件
const SecurityIcon = ({ color = '#4E5969' }: { color?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill={color} className="bi bi-check-circle-fill" viewBox="0 0 16 16" style={{ marginRight: '8px', flexShrink: 0 }}>
        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
    </svg>
);


interface SecurityFeature {
  id: string;
  tabName: string;
  title: string;
  description: string; // 主描述，用于没有 points 的情况
  points?: string[];   // Points for detailed list
  imageSrc: string;
  imageAlt: string;
}

const securityData: SecurityFeature[] = [
  {
    id: 'data-confidentiality',
    tabName: '数据高保密',
    title: '多层级数据加密',
    points: [
        "训练集与精调模型落盘即加密，只能在安全沙箱内存中被解密",
        "基于FUSE的透明加密文件系统，保证数据和模型从安全沙箱内存直写至分布式存储时无缝加密",
        "密钥由用户通过密钥管理系统(KMS)管理，并在安全沙箱内进行安全访问",
        "支持GPU信创，解密、保证数据访问效率"
    ],
    description: '',
    imageSrc: '/images/FullLifecycleSecuritySection/adub0ayscfv_大图-数据搞保密.png',
    imageAlt: '数据高保密示意图',
  },
  {
    id: 'environment-isolation',
    tabName: '环境强隔离',
    title: '多维度环境隔离',
    description: '任务级动态安全计算环境', // 主标题下的描述
    points: [
        "安全沙箱：为动态运行时实例提供任务级强隔离，采用uArmor增强容器安全，确保程序以非特权模式启动、动态调配系统调用，保证攻击者无法利用当前任务逃逸",
        "网络隔离：针对VPC和RDMA网络使用任务级网络隔离，支持设置独立隔离策略，保证即使是处于同一网络/如VPC内均不可互相通信，也不泄露连接通信",
        "可信数据访问代理：针对沙箱外部数据源(如KMS)、只能通过可信代理访问，叠加严格的权限校验和访问请求检查，防止沙箱内的进程将数据发送到外部",
        "白名单运维：任何人员(含内部人员)进行调试，都需要经过堡垒机、在调试过程中，都会被全程同步原则，并且会被全程录屏、便于审计和追溯"
    ],
    imageSrc: '/images/FullLifecycleSecuritySection/re9lrtb3kn_大图-环境强隔离.png',
    imageAlt: '环境强隔离示意图',
  },
  {
    id: 'operation-audit',
    tabName: '操作可审计',
    title: '多类别审计日志',
    description: '通过OpenAPI以及方舟控制台，获取指定地理接入和精调任务的审计日志，以便在安全策略生成和潜在风险检测时使用',
    points: [
        "沙箱登录日志：记录通过堡垒机或者本地对堡垒沙箱的行为什么",
        "沙箱通信日志：记录沙箱是否通过对外网络连接发送数据",
        "沙箱管理日志：记录是否有超级权限的用户执行命令",
        "uArmor拦截日志：记录系统uArmor执行的用户非法命令",
        "KMS访问日志：记录系统对KMS的访问、验证是否执行正解密钥",
        "..."
    ],
    imageSrc: '/images/FullLifecycleSecuritySection/dr549oliz6d_大图-操作可审计.png',
    imageAlt: '操作可审计示意图',
  }
];

const FullLifecycleSecuritySection: React.FC = () => {
  const [activeTabId, setActiveTabId] = useState<string>(securityData[0].id);
  // For slide direction: 1 means new tab is to the right, -1 means to the left
  const [direction, setDirection] = useState(0); 

  const handleTabClick = (tabId: string) => {
    const currentIndex = securityData.findIndex(s => s.id === tabId);
    const previousIndex = securityData.findIndex(s => s.id === activeTabId);
    setDirection(currentIndex > previousIndex ? 1 : (currentIndex < previousIndex ? -1 : 0));
    setActiveTabId(tabId);
  };

  const activeFeature = securityData.find(feature => feature.id === activeTabId) || securityData[0];

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.95,
    }),
  };

  return (
    <section className={`section-padding ${styles.securitySection}`}>
      <div className="container">
        <motion.h2 
          className={`section-title-global text-center ${styles.mainSectionTitle}`}
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          全周期安全可信，会话无痕
        </motion.h2>
        <motion.p 
          className={`text-center ${styles.sectionSubtitle}`}
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
        >
          数据端你可见，唯你所用，唯你所有
        </motion.p>

        <div className={styles.tabsContainer}>
          {securityData.map((feature, index) => (
            <motion.button
              key={feature.id}
              className={`${styles.tabButton} ${activeTabId === feature.id ? styles.active : ''}`}
              onClick={() => handleTabClick(feature.id)}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.1 * index + 0.2, ease: "easeOut" }}
            >
              {feature.tabName}
              {activeTabId === feature.id && (
                <motion.div className={styles.activeTabIndicator} layoutId="activeIndicator" />
              )}
            </motion.button>
          ))}
        </div>
        
        <div className={styles.cardContentWrapper}>
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={activeTabId} // Key change triggers animation
              className={styles.featureCard}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30, duration: 0.4 },
                opacity: { duration: 0.3, ease: "easeOut" },
                scale: {duration: 0.3, ease: "easeOut" }
              }}
            >
              <div className={styles.cardTextContent}>
                <motion.h3 
                    className={styles.cardTitle}
                    initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, duration: 0.4 }}
                >
                    {activeFeature.title}
                </motion.h3>
                {activeFeature.description && !activeFeature.points && (
                    <motion.p 
                        className={styles.cardDescription}
                        initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25, duration: 0.4 }}
                    >
                        {activeFeature.description}
                    </motion.p>
                )}
                {activeFeature.points && (
                  <ul className={styles.descriptionList}>
                    {activeFeature.points.map((point, i) => (
                      <motion.li 
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + i * 0.05, duration: 0.4 }}
                      >
                        <SecurityIcon color="var(--ve-primary-blue)" /> {point}
                      </motion.li>
                    ))}
                  </ul>
                )}
              </div>
              <motion.div 
                className={styles.cardImageWrapper}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.35, duration: 0.5, ease: [0.22, 1, 0.36, 1] }} // Expo out ease
              >
                <Image
                  src={activeFeature.imageSrc}
                  alt={activeFeature.imageAlt}
                  width={520} // 根据图片实际调整
                  height={300} // 根据图片实际调整
                  className={styles.featureImage}
                  priority={true}
                />
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        <motion.div 
          className={styles.actionButtonsContainer}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
        >
          <a href="#" className={`${styles.actionBtn} ${styles.primaryBtn}`}>更多安全信息</a>
          <a href="#" className={`${styles.actionBtn} ${styles.secondaryBtn}`}>互信计算架构白皮书</a>
        </motion.div>

      </div>
    </section>
  );
};

export default FullLifecycleSecuritySection;