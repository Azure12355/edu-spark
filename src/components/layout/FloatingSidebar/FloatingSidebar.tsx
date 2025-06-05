// src/components/layout/FloatingSidebar/FloatingSidebar.tsx
"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './FloatingSidebar.module.css';

// 定义侧边栏项的数据结构
interface SidebarItemData {
  id: string;
  iconClass: string;
  text: string;
  title: string;
  isPrimary?: boolean; // 是否是主要的“售前咨询”按钮
  hasNotification?: boolean; // 是否有通知点
  onClick?: () => void; // 可选的点击处理
}

const sidebarItemsTop: SidebarItemData[] = [
  { id: 'consult', iconClass: 'fas fa-headset', text: '售前咨询', title: '售前咨询', isPrimary: true },
];

// 其他图标按钮组合在一个容器里
const sidebarItemsGroup: SidebarItemData[] = [
  { id: 'after-sales', iconClass: 'fas fa-tools', text: '售后', title: '售后服务' },
  { id: 'activity', iconClass: 'fas fa-gift', text: '活动', title: '最新活动' },
  { id: 'survey', iconClass: 'fas fa-comment-dots', text: '调研', title: '参与调研', hasNotification: true },
];


// Framer Motion 动画变体
const sidebarVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 150,
      damping: 20,
      staggerChildren: 0.1, // 子元素依次入场
      delayChildren: 0.5, // 整体延迟后子元素开始动画
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 10 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 200, damping: 15 },
  },
};

const backToTopVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.7 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 250, damping: 20 } },
  exit: { opacity: 0, y: 30, scale: 0.7, transition: { duration: 0.2 } },
};


const FloatingSidebar: React.FC = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isMounted, setIsMounted] = useState(false); // 用于确保只在客户端执行 useEffect

  useEffect(() => {
    setIsMounted(true); // 组件已挂载
    const handleScroll = () => {
      if (window.pageYOffset > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // 初始化检查一次

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  if (!isMounted) { // 防止水合错误，Framer Motion 的动画最好在客户端渲染后执行
      return null;
  }

  return (
    <motion.aside
      className={styles.floatingSidebar}
      variants={sidebarVariants}
      initial="hidden"
      animate="visible"
    >
      {sidebarItemsTop.map((item) => (
        <motion.div
          key={item.id}
          className={`${styles.sidebarButton} ${item.isPrimary ? styles.consultBtn : styles.sidebarIconRegular}`}
          title={item.title}
          onClick={item.onClick}
          variants={itemVariants}
          whileHover={{ scale: 1.05, y: -2, boxShadow: "0 6px 15px rgba(0, 82, 255, 0.2)" }}
          whileTap={{ scale: 0.95 }}
        >
          <i className={item.iconClass}></i>
          {item.isPrimary && <span className={styles.consultText}>{item.text}</span>}
          {!item.isPrimary && <span>{item.text}</span>}
          {item.hasNotification && <span className={styles.notificationDot}></span>}
        </motion.div>
      ))}

      {/* 图标按钮组 */}
      <motion.div className={styles.iconGroupContainer} variants={itemVariants}>
        {sidebarItemsGroup.map((item) => (
            <motion.div
            key={item.id}
            className={`${styles.sidebarButton} ${styles.sidebarIconRegular}`}
            title={item.title}
            onClick={item.onClick}
            variants={itemVariants} // 可以使用父级的 stagger, 或者为每个item单独设置
            whileHover={{ scale: 1.1, y: -2, color: 'var(--ve-primary-blue)' }}
            whileTap={{ scale: 0.9 }}
            >
            <i className={item.iconClass}></i>
            <span>{item.text}</span>
            {item.hasNotification && <span className={styles.notificationDot}></span>}
            </motion.div>
        ))}
      </motion.div>


      <AnimatePresence>
        {showBackToTop && (
          <motion.div
            className={`${styles.sidebarButton} ${styles.sidebarIconRegular} ${styles.backToTop}`}
            title="返回顶部"
            onClick={scrollToTop}
            variants={backToTopVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            whileHover={{ scale: 1.1, y: -3, boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)" }}
            whileTap={{ scale: 0.9 }}
          >
            <i className="fas fa-arrow-up"></i>
            {/* 返回顶部按钮通常不带文字，如果需要可以取消注释 */}
            {/* <span>顶部</span> */}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.aside>
  );
};

export default FloatingSidebar;