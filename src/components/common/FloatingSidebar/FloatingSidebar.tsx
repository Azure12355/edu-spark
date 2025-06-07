// src/components/layout/FloatingSidebar/FloatingSidebar.tsx
"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './FloatingSidebar.module.css';

interface SidebarItemData {
  id: string;
  iconClass: string;
  text: string;
  title: string;
  isPrimary?: boolean;
  hasNotification?: boolean;
  onClick?: () => void;
}

interface FloatingSidebarProps {
  onConsultClick: () => void;
}

const sidebarItemsTopData: SidebarItemData[] = [
  { id: 'assistant', iconClass: 'fas fa-robot', text: '智能助教', title: '打开智能助教', isPrimary: true },
];

const sidebarItemsGroupData: SidebarItemData[] = [
  { id: 'feedback', iconClass: 'fas fa-comment-alt', text: '反馈', title: '问题反馈' },
  { id: 'announcement', iconClass: 'fas fa-bullhorn', text: '公告', title: '学习公告' },
  { id: 'suggestion', iconClass: 'fas fa-lightbulb', text: '建议', title: '功能建议', hasNotification: true },
];


const sidebarVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 150,
      damping: 20,
      staggerChildren: 0.1,
      delayChildren: 0.5,
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
    handleScroll();

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
      animate="visible"
    >
      {sidebarItemsTopData.map((item) => (
        <motion.div
          key={item.id}
          className={`${styles.sidebarButton} ${styles.consultBtn}`}
          title={item.title}
          onClick={onConsultClick} // 主按钮触发父组件传递的函数
          variants={itemVariants}
          whileHover={{ scale: 1.03, y: -2, boxShadow: "0 8px 18px rgba(22, 100, 255, 0.25)" }}
          whileTap={{ scale: 0.97 }}
        >
          <i className={item.iconClass}></i>
          <span className={styles.consultText}>{item.text}</span>
        </motion.div>
      ))}

      <motion.div className={styles.iconGroupContainer} variants={itemVariants}>
        {sidebarItemsGroupData.map((item) => (
            <motion.div
            key={item.id}
            className={`${styles.sidebarButton} ${styles.sidebarIconRegular}`}
            title={item.title}
            onClick={item.onClick}
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
          </motion.div>
        )}
      </AnimatePresence>
    </motion.aside>
  );
};

export default FloatingSidebar;