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
  onClick?: () => void; // 可选的点击处理 (非 onConsultClick 的其他按钮)
}

// 声明一个类型给父组件传递的 onConsultClick prop
interface FloatingSidebarProps {
  onConsultClick: () => void;
}

const sidebarItemsTopData: SidebarItemData[] = [ // 重命名以区分
  { id: 'consult', iconClass: 'fas fa-headset', text: '售前咨询', title: '售前咨询', isPrimary: true },
];

// 其他图标按钮组合在一个容器里
const sidebarItemsGroupData: SidebarItemData[] = [ // 重命名以区分
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
      delayChildren: 0.5, // 整体延迟后子元素开始动画 (可以根据需要调整或移除)
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


const FloatingSidebar: React.FC<FloatingSidebarProps> = ({ onConsultClick }) => {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const handleScroll = () => {
      setShowBackToTop(window.pageYOffset > 300);
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
  
  if (!isMounted) {
      return null;
  }

  return (
    <motion.aside
      className={styles.floatingSidebar}
      variants={sidebarVariants}
      initial="hidden"
      animate="visible" // 或者使用 whileInView 如果你希望它只在视口内动画
    >
      {/* "售前咨询" 按钮 */}
      {sidebarItemsTopData.map((item) => (
        <motion.div
          key={item.id}
          className={`${styles.sidebarButton} ${item.isPrimary ? styles.consultBtn : ''}`} // 移除了 .sidebarIconRegular
          title={item.title}
          onClick={item.isPrimary ? onConsultClick : item.onClick} // 使用传入的 onConsultClick
          variants={itemVariants}
          whileHover={item.isPrimary ? 
            { scale: 1.03, y: -2, boxShadow: "0 8px 18px rgba(22, 100, 255, 0.25)" } :
            { scale: 1.1, y: -2, color: 'var(--ve-primary-blue)' }
          }
          whileTap={item.isPrimary ? { scale: 0.97 } : {scale: 0.9}}
        >
          <i className={item.iconClass}></i>
          {item.isPrimary && <span className={styles.consultText}>{item.text}</span>}
          {/* 对于非 primary 按钮，如果这个 map 循环将来可能包含非 primary，可以取消注释下面的行 */}
          {/* {!item.isPrimary && <span>{item.text}</span>} */}
          {item.hasNotification && <span className={styles.notificationDot}></span>}
        </motion.div>
      ))}

      {/* 图标按钮组 */}
      <motion.div className={styles.iconGroupContainer} variants={itemVariants}>
        {sidebarItemsGroupData.map((item) => (
            <motion.div
            key={item.id}
            className={`${styles.sidebarButton} ${styles.sidebarIconRegular}`}
            title={item.title}
            onClick={item.onClick} // 这里使用 item 定义的 onClick
            // variants={itemVariants} // 可以继承父级的 stagger, 或为每个 item 单独设置动画 (如果需要更复杂的延迟)
            whileHover={{ scale: 1.1, y: -2, color: 'var(--ve-primary-blue)' }}
            whileTap={{ scale: 0.9 }}
            >
            <i className={item.iconClass}></i>
            <span>{item.text}</span>
            {item.hasNotification && <span className={styles.notificationDot}></span>}
            </motion.div>
        ))}
      </motion.div>


      {/* 返回顶部按钮 */}
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
            {/* 通常返回顶部按钮没有文字 */}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.aside>
  );
};

export default FloatingSidebar;