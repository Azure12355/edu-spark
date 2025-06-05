// src/components/layout/Footer/Footer.tsx
"use client"; // Framer Motion 使用了 hooks，需要 "use client"
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion'; // 引入 Framer Motion
import styles from './Footer.module.css';

// 模拟官网 Logo (SVG 格式)
const VolcEngineLogoDark = () => (
  <svg width="115" height="28" viewBox="0 0 115 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M24.2168 19.999L20.3606 13.8812L24.2168 7.76345H20.873L18.4385 11.8224L15.9852 7.76345H12.6413L16.4975 13.8812L12.6413 19.999H15.9852L18.4385 15.9399L20.873 19.999H24.2168Z" fill="#A7B0BA"/>
    <path d="M30.7259 20V7.76345H27.2344V20H30.7259Z" fill="#A7B0BA"/>
    <path d="M39.3999 20.2607C41.2553 20.2607 42.714 19.3678 43.3591 17.8596L40.1273 16.7632C39.8384 17.375 39.3063 17.7251 38.5674 17.7251C37.6041 17.7251 37.0194 17.0564 36.9837 16.0507H43.666V14.6832C43.666 11.4513 41.8463 10.223 39.1741 10.223C36.7039 10.223 35.0521 11.8991 34.6953 13.8812L37.9082 14.9249C38.0981 14.2204 38.5863 13.7659 39.2109 13.7659C39.8712 13.7659 40.2637 14.1718 40.2637 14.8763V14.9249H36.9837C35.7556 14.9249 34.8626 15.7618 34.8626 17.5348C34.8626 19.2721 36.2091 20.2607 39.3999 20.2607Z" fill="#A7B0BA"/>
    <path d="M54.3081 19.999H50.8166V10.4981H47.3251V7.76345H57.7996V10.4981H54.3081V19.999Z" fill="#A7B0BA"/>
    <path d="M66.4581 20.2607C69.1302 20.2607 70.931 18.7882 70.931 16.5272C70.931 14.3019 69.166 12.7588 66.4581 12.7588C63.7501 12.7588 61.9494 14.3019 61.9494 16.5272C61.9494 18.7882 63.7501 20.2607 66.4581 20.2607ZM66.4581 17.7251C65.1305 17.7251 64.5099 16.9862 64.5099 16.015C64.5099 15.0259 65.1117 14.3193 66.4581 14.3193C67.7857 14.3193 68.4063 15.0437 68.4063 16.015C68.4063 16.9862 67.8045 17.7251 66.4581 17.7251Z" fill="#A7B0BA"/>
    <path d="M0 13.9999C0 10.9843 1.01859 8.7764 3.16393 7.43096C5.21904 6.15599 7.78807 5.76343 10.2844 5.76343V8.90058C8.49039 8.90058 7.17978 9.25736 6.26028 9.95022C5.37651 10.6073 4.92493 11.7245 4.92493 13.2327V14.7673C4.92493 16.2755 5.37651 17.3927 6.26028 18.0498C7.17978 18.7426 8.49039 19.0994 10.2844 19.0994V22.2366C7.78807 22.2366 5.21904 21.844 3.16393 20.569C1.01859 19.2236 0 17.0157 0 13.9999Z" fill="url(#paint0_linear_footer)"/>
    <path d="M10.2844 5.76343V0H13.7587V28H10.2844V22.2366C7.78807 22.2366 5.21904 21.844 3.16393 20.569C1.01859 19.2236 0 17.0157 0 13.9999C0 10.9843 1.01859 8.7764 3.16393 7.43096C5.21904 6.15599 7.78807 5.76343 10.2844 5.76343Z" fill="url(#paint1_linear_footer)"/>
    <path d="M78.4869 20V7.76345H74.9954V20H78.4869Z" fill="#A7B0BA"/>
    <path d="M81.7999 19.999L85.6561 13.8812L81.7999 7.76345H85.1437L87.5782 11.8224L90.0315 7.76345H93.3754L89.5192 13.8812L93.3754 19.999H90.0315L87.5782 15.9399L85.1437 19.999H81.7999Z" fill="#A7B0BA"/>
    <path d="M99.9608 20.2607C101.816 20.2607 103.275 19.3678 103.92 17.8596L100.688 16.7632C100.399 17.375 99.8672 17.7251 99.1282 17.7251C98.1649 17.7251 97.5799 17.0564 97.5443 16.0507H104.227V14.6832C104.227 11.4513 102.407 10.223 99.7349 10.223C97.2647 10.223 95.6129 11.8991 95.2561 13.8812L98.469 14.9249C98.6589 14.2204 99.1471 13.7659 99.7717 13.7659C100.432 13.7659 100.824 14.1718 100.824 14.8763V14.9249H97.5443C96.3164 14.9249 95.4234 15.7618 95.4234 17.5348C95.4234 19.2721 96.7699 20.2607 99.9608 20.2607Z" fill="#A7B0BA"/>
    <path d="M111.571 10.4981H108.079V19.999H111.571V22.7336H104.588V7.76345H111.571V10.4981Z" fill="#A7B0BA"/>
    <defs>
    <linearGradient id="paint0_linear_footer" x1="13.7587" y1="0" x2="13.7587" y2="28" gradientUnits="userSpaceOnUse">
    <stop stopColor="#00A1FF"/>
    <stop offset="1" stopColor="#006EFF"/>
    </linearGradient>
    <linearGradient id="paint1_linear_footer" x1="13.7587" y1="0" x2="13.7587" y2="28" gradientUnits="userSpaceOnUse">
    <stop stopColor="#00A1FF"/>
    <stop offset="1" stopColor="#006EFF"/>
    </linearGradient>
    </defs>
  </svg>
);


const footerColumnsData = [
  {
    title: "关于我们",
    links: [
      { text: "为什么选火山", href: "#" }, { text: "文档中心", href: "#" },
      { text: "联系我们", href: "#" }, { text: "人才招聘", href: "#" },
      { text: "云通信中心", href: "#" }, { text: "友情链接", href: "#" },
    ],
  },
  {
    title: "产品",
    links: [
      { text: "云服务器", href: "#" }, { text: "GPU云服务器", href: "#" },
      { text: "机器学习平台", href: "#" }, { text: "客户数据平台 VeCDP", href: "#" },
      { text: "飞连", href: "#" }, { text: "视频直播", href: "#" }, { text: "全部产品", href: "#" },
    ],
  },
  {
    title: "解决方案",
    links: [
      { text: "汽车行业", href: "#" }, { text: "金融行业", href: "#" },
      { text: "文娱行业", href: "#" }, { text: "医疗健康行业", href: "#" },
      { text: "传媒行业", href: "#" }, { text: "智慧文旅", href: "#" }, { text: "大消费", href: "#" },
    ],
  },
  {
    title: "服务与支持",
    links: [
      { text: "备案服务", href: "#" }, { text: "服务总览", href: "#" },
      { text: "建议与反馈", href: "#" }, { text: "廉洁舞弊举报", href: "#" }, { text: "举报平台", href: "#" },
    ],
  },
];


// Framer Motion 动画变体
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // 子元素依次入场
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
      whileInView="visible" // 当元素进入视口时触发动画
      viewport={{ once: true, amount: 0.3 }} // 动画只触发一次，进入视口30%时触发
    >
      <div className={`container ${styles.footerContent}`}>
        <motion.div className={styles.footerColumn} variants={itemVariants}>
          <Link href="/" className={styles.footerLogoContainer}>
            <VolcEngineLogoDark />
          </Link>
          <p className={styles.footerSlogan}>驱动企业智能创新</p> {/* 示例口号 */}
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
          <p>业务咨询: service@volcengine.com</p>
          <p>市场合作: marketing@volcengine.com</p>
          <p>电话: 400-650-0030</p>
          <p>地址: 北京市海淀区北三环西路甲18号院大钟寺广场1号楼</p>
        </motion.div>
      </div>
      <motion.div 
        className={styles.footerBottom}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 + footerColumnsData.length * 0.1 }} // 延迟到底部动画
      >
        <div className="container">
          <p>
            © {new Date().getFullYear()} Volcano Engine. All Rights Reserved.
            <Link href="#" className={styles.footerLink}>京ICP备17038715号-3</Link>
            <Link href="#" className={styles.footerLink}>京公网安备11010802030491号</Link>
          </p>
        </div>
      </motion.div>
    </motion.footer>
  );
};

export default Footer;