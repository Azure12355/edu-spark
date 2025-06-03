// src/components/layout/FloatingSidebar/FloatingSidebar.tsx
"use client";
import React, { useState, useEffect } from 'react';
import styles from './FloatingSidebar.module.css';

const FloatingSidebar: React.FC = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <aside className={styles.floatingSidebar}>
      <div className={styles.consultBtn}>
        <i className="fas fa-headset"></i>
        <span>售前咨询</span>
      </div>
      <div className={styles.sidebarIcon} title="售后">
        <i className="fas fa-tools"></i>
        <span>售后</span>
      </div>
      <div className={styles.sidebarIcon} title="活动">
        <i className="fas fa-gift"></i>
        <span>活动</span>
      </div>
      <div className={styles.sidebarIcon} title="调研">
        <i className="fas fa-comment-dots"></i>
        <span>调研</span>
      </div>
      {showBackToTop && (
        <div 
          className={`${styles.sidebarIcon} ${styles.backToTop}`} 
          title="返回顶部"
          onClick={scrollToTop}
        >
          <i className="fas fa-arrow-up"></i>
        </div>
      )}
    </aside>
  );
};

export default FloatingSidebar;