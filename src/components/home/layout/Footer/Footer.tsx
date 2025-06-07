// src/components/layout/Footer/Footer.tsx
"use client";
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import styles from './Footer.module.css';

// 专为 EduSpark 设计的深色主题 Logo
const EduSparkLogoDark = () => (
    <svg width="115" height="28" viewBox="0 0 115 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <text x="30" y="20" fontFamily="Arial, sans-serif" fontSize="20" fontWeight="bold" fill="url(#logoGradient)">
            Edu<tspan fill="#A7B0BA">Spark</tspan>
        </text>
        <path d="M4.92,14.77c0-1.51.45-2.63,1.34-3.28,0.92-0.69,2.23-1.05,4.02-1.05V22.24c-2.5,0-5.07-0.39-7.12-1.67C1.02,19.22,0,17.02,0,14s1.02-5.22,3.16-6.57c2.1-1.28,4.6-1.67,7.12-1.67V0h3.47V28h-3.47V22.24Z" fill="url(#logoGradient)"/>
        <defs>
            <linearGradient id="logoGradient" x1="0" y1="0" x2="0" y2="28" gradientUnits="userSpaceOnUse">
                <stop stopColor="#00A1FF"/>
                <stop offset="1" stopColor="#006EFF"/>
            </linearGradient>
        </defs>
    </svg>
);


// 适配 EduSpark 的页脚链接
const footerColumnsData = [
  {
    title: "核心功能",
    links: [
      { text: "教师智能备课", href: "#" },
      { text: "学生实时问答", href: "#" },
      { text: "智能考核与纠错", href: "#" },
      { text: "学情数据分析", href: "#" },
      { text: "资源推荐", href: "#" },
    ],
  },
  {
    title: "解决方案",
    links: [
      { text: "高校实训教学", href: "#" },
      { text: "企业员工内训", href: "#" },
      { text: "职业技能教育", href: "#" },
      { text: "个性化学习路径", href: "#" },
    ],
  },
  {
    title: "资源中心",
    links: [
      { text: "文档中心", href: "#" },
      { text: "API 参考", href: "#" },
      { text: "课程案例", href: "#" },
      { text: "技术博客", href: "#" },
      { text: "常见问题", href: "#" },
    ],
  },
  {
    title: "关于我们",
    links: [
      { text: "公司介绍", href: "#" },
      { text: "加入我们", href: "#" },
      { text: "新闻动态", href: "#" },
      { text: "法律声明", href: "#" },
    ],
  },
];


const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 12,
    },
  },
};


const Footer: React.FC = () => {
  return (
    <motion.footer
      className={styles.mainFooter}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className={`container ${styles.footerContent}`}>
        <motion.div className={styles.footerColumn} variants={itemVariants}>
          <Link href="/" className={styles.footerLogoContainer}>
            <EduSparkLogoDark />
          </Link>
          <p className={styles.footerSlogan}>AI 赋能教育，点亮智慧未来</p>
        </motion.div>

        {footerColumnsData.map((column) => (
          <motion.div className={styles.footerColumn} key={column.title} variants={itemVariants}>
            <h4 className={styles.footerTitleGradient}>{column.title}</h4>
            <ul>
              {column.links.map((link) => (
                <li key={link.text}>
                  <Link href={link.href} className={styles.footerLink}>
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}

        <motion.div className={`${styles.footerColumn} ${styles.footerContact}`} variants={itemVariants}>
          <h4 className={styles.footerTitleGradient}>联系我们</h4>
          <p>业务咨询: contact@eduspark.com</p>
          <p>市场合作: marketing@eduspark.com</p>
          <p>电话: 400-123-4567</p>
          <p>地址: 中国 · 上海市杨浦区大学路</p>
        </motion.div>
      </div>
      <motion.div 
        className={styles.footerBottom}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 + footerColumnsData.length * 0.1 }}
      >
        <div className="container">
          <p>
            © {new Date().getFullYear()} EduSpark Inc. All Rights Reserved.
            <Link href="#" className={styles.footerLink}>沪ICP备20240401号-1</Link>
            <Link href="#" className={styles.footerLink}>沪公网安备31011002002333号</Link>
          </p>
        </div>
      </motion.div>
    </motion.footer>
  );
};

export default Footer;