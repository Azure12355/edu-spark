// src/components/layout/Header/Header.tsx
"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Header.module.css';

// 更新导航链接以匹配 EduSpark 需求
const navLinksData = [
  { href: "/student/assistant", text: "首页", active: true },
  { href: "#", text: "教师中心", dropdown: true },
  { href: "/student/assistant", text: "学生中心", dropdown: true },
  { href: "#", text: "课程广场", newIndicator: true },
  { href: "#", text: "数据看板" },
  { href: "#", text: "关于我们" },
];

// Framer Motion 动画变体
const headerVariants = {
  hidden: { y: -100, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { type: 'spring', stiffness: 120, damping: 20, delay: 0.2 }
  },
};

const mobileNavVariants = {
  hidden: { opacity: 0, x: '100%' },
  visible: { 
    opacity: 1, 
    x: '0%',
    transition: { type: 'tween', duration: 0.3, ease: 'easeInOut' }
  },
  exit: { 
    opacity: 0, 
    x: '100%',
    transition: { type: 'tween', duration: 0.3, ease: 'easeInOut' }
  },
};

const mobileNavLinkVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0 },
};


const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);


  return (
    <motion.header
      className={`${styles.veMainHeader} ${isScrolled ? styles.scrolled : ''}`}
      variants={headerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className={styles.veHeaderContainer}>
        <Link href="/public" className={styles.veLogo}>
          {/* 假设 Logo 位于 public/images/logo.svg */}
          <Image
            src="/robot.gif"
            alt="EduSpark Logo"
            width={56}
            height={56}
            style={{borderRadius: '50%'}}
          />
          <span>EduSpark</span>
        </Link>


        {/* Desktop Navigation */}
        <nav className={`${styles.veMainNav} ${styles.desktopNav}`}>
          <ul>
            {navLinksData.map((link, index) => (
              <motion.li 
                key={link.text}
                initial={{ opacity:0, y: -10 }}
                animate={{ opacity:1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.05 }}
              >
                <Link href={link.href} className={`${styles.veNavLink} ${link.active ? styles.active : ''}`}>
                  {link.text}
                  {link.newIndicator && <span className={styles.veNewIndicator}></span>}
                  {link.dropdown && <i className={`fas fa-chevron-down ${styles.veChevron}`}></i>}
                </Link>
              </motion.li>
            ))}
          </ul>
        </nav>

        {/* Header Actions (Desktop) - 更新为 EduSpark 的操作 */}
        <div className={`${styles.veHeaderActions} ${styles.desktopActions}`}>
          <motion.div 
            className={styles.veSearchBar}
            initial={{ opacity:0, scaleX: 0.8 }}
            animate={{ opacity:1, scaleX: 1 }}
            transition={{ delay: 0.8 }}
          >
            <i className={`fas fa-search ${styles.veSearchIcon}`}></i>
            <input type="text" placeholder="搜索课程或功能..." />
          </motion.div>
          <motion.div
            initial={{ opacity:0 }}
            animate={{ opacity:1 }}
            transition={{ delay: 0.9 }}
          >
            <Link href="#" className={styles.veActionLink}>文档</Link>
            <Link href="#" className={styles.veActionLink}>定价</Link>
            <Link href="#" className={`${styles.veActionLink} ${styles.consoleLink}`}>登录/注册</Link>
          </motion.div>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          className={styles.mobileMenuToggle}
          onClick={toggleMobileMenu}
          aria-label={isMobileMenuOpen ? "关闭菜单" : "打开菜单"}
          aria-expanded={isMobileMenuOpen}
        >
          <div className={`${styles.hamburgerLine} ${isMobileMenuOpen ? styles.line1Open : ''}`}></div>
          <div className={`${styles.hamburgerLine} ${isMobileMenuOpen ? styles.line2Open : ''}`}></div>
          <div className={`${styles.hamburgerLine} ${isMobileMenuOpen ? styles.line3Open : ''}`}></div>
        </button>
      </div>

      {/* Mobile Navigation Panel */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className={styles.mobileNavPanel}
            variants={mobileNavVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className={styles.mobileNavHeader}>
                <Link href="/public" className={styles.veLogoMobile} onClick={toggleMobileMenu}>
                <Image
                    src="/EduSpark-icon-font.png"
                    alt="EduSpark Logo"
                    width={150}
                    height={20}
                />
                </Link>
                 <button
                    className={`${styles.mobileMenuToggle} ${styles.closeBtnInPanel}`}
                    onClick={toggleMobileMenu}
                    aria-label="关闭菜单"
                >
                    <div className={`${styles.hamburgerLine} ${styles.line1Open}`}></div>
                    <div className={`${styles.hamburgerLine} ${styles.line2Open}`}></div>
                    <div className={`${styles.hamburgerLine} ${styles.line3Open}`}></div>
                </button>
            </div>
            <nav className={styles.veMobileNav}>
              <ul>
                {navLinksData.map((link, index) => (
                  <motion.li 
                    key={link.text}
                    variants={mobileNavLinkVariants}
                  >
                    <Link href={link.href} className={`${styles.veNavLink} ${link.active ? styles.active : ''}`} onClick={toggleMobileMenu}>
                      {link.text}
                      {link.newIndicator && <span className={styles.veNewIndicatorMobile}></span>}
                      {link.dropdown && <i className={`fas fa-chevron-down ${styles.veChevron}`}></i>}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>
            <div className={styles.mobileActions}>
              <div className={styles.veSearchBarMobile}>
                <i className={`fas fa-search ${styles.veSearchIcon}`}></i>
                <input type="text" placeholder="搜索..." />
              </div>
              <Link href="#" className={styles.veActionLinkMobile} onClick={toggleMobileMenu}>文档</Link>
              <Link href="#" className={styles.veActionLinkMobile} onClick={toggleMobileMenu}>定价</Link>
              <Link href="#" className={`${styles.veActionLinkMobile} ${styles.consoleLinkMobile}`} onClick={toggleMobileMenu}>登录/注册</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;