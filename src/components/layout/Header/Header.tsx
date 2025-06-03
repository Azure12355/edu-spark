// src/components/layout/Header/Header.tsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Header.module.css';

const Header: React.FC = () => {
  return (
    <header className={styles.veMainHeader}>
      <div className={styles.veHeaderContainer}>
        <Link href="/" className={styles.veLogo}>
          <Image 
            src="https://lf3-static.bytednsdoc.com/obj/eden-cn/pipuzhpldbp/volcengine-fe/img/logo-new.038f9439.svg" 
            alt="火山引擎 Logo"
            width={115} // 根据实际logo调整
            height={28} // 根据实际logo调整
            priority
          />
        </Link>

        <nav className={styles.veMainNav}>
          <ul>
            <li>
              <Link href="#" className={`${styles.veNavLink} ${styles.active}`}>
                最新活动
                <span className={styles.veNewIndicator}></span>
              </Link>
            </li>
            <li><Link href="#" className={styles.veNavLink}>大模型 <i className={`fas fa-chevron-down ${styles.veChevron}`}></i></Link></li>
            <li><Link href="#" className={styles.veNavLink}>产品 <i className={`fas fa-chevron-down ${styles.veChevron}`}></i></Link></li>
            <li><Link href="#" className={styles.veNavLink}>解决方案 <i className={`fas fa-chevron-down ${styles.veChevron}`}></i></Link></li>
            <li><Link href="#" className={styles.veNavLink}>定价 <i className={`fas fa-chevron-down ${styles.veChevron}`}></i></Link></li>
            <li><Link href="#" className={styles.veNavLink}>生态与合作 <i className={`fas fa-chevron-down ${styles.veChevron}`}></i></Link></li>
            <li><Link href="#" className={styles.veNavLink}>支持与服务 <i className={`fas fa-chevron-down ${styles.veChevron}`}></i></Link></li>
            <li><Link href="#" className={styles.veNavLink}>开发者 <i className={`fas fa-chevron-down ${styles.veChevron}`}></i></Link></li>
            <li><Link href="#" className={styles.veNavLink}>了解我们 <i className={`fas fa-chevron-down ${styles.veChevron}`}></i></Link></li>
          </ul>
        </nav>

        <div className={styles.veHeaderActions}>
          <div className={styles.veSearchBar}>
            <i className={`fas fa-search ${styles.veSearchIcon}`}></i>
            <input type="text" placeholder="请输入关键字" />
          </div>
          <Link href="#" className={styles.veActionLink}>文档</Link>
          <Link href="#" className={styles.veActionLink}>备案</Link>
          <Link href="#" className={styles.veActionLink}>控制台</Link>
          <Link href="#" className={styles.veNotificationLink}>
            <span className={styles.veNotificationBadge}>1</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;