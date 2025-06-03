// src/components/layout/Footer/Footer.tsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Footer.module.css';

const Footer: React.FC = () => {
  return (
    <footer className={`section-padding ${styles.mainFooter}`}>
      <div className={`container ${styles.footerContent}`}>
        <div className={styles.footerColumn}>
          <div className={styles.footerLogoContainer}>
            <Image 
              src="https://via.placeholder.com/120x30/FFFFFF/333333?text=火山引擎" 
              alt="火山引擎 Logo" 
              width={115} 
              height={28}
              className={styles.footerLogo}
            />
          </div>
          <h4>关于我们</h4>
          <ul>
            <li><Link href="#">为什么选火山</Link></li>
            <li><Link href="#">文档中心</Link></li>
            <li><Link href="#">联系我们</Link></li>
            <li><Link href="#">人才招聘</Link></li>
            <li><Link href="#">云通信中心</Link></li>
            <li><Link href="#">友情链接</Link></li>
          </ul>
        </div>
        <div className={styles.footerColumn}>
          <h4>产品</h4>
          <ul>
            <li><Link href="#">云服务器</Link></li>
            <li><Link href="#">GPU云服务器</Link></li>
            <li><Link href="#">机器学习平台</Link></li>
            <li><Link href="#">客户数据平台 VeCDP</Link></li>
            <li><Link href="#">飞连</Link></li>
            <li><Link href="#">视频直播</Link></li>
            <li><Link href="#">全部产品</Link></li>
          </ul>
        </div>
        <div className={styles.footerColumn}>
          <h4>解决方案</h4>
          <ul>
            <li><Link href="#">汽车行业</Link></li>
            <li><Link href="#">金融行业</Link></li>
            <li><Link href="#">文娱行业</Link></li>
            <li><Link href="#">医疗健康行业</Link></li>
            <li><Link href="#">传媒行业</Link></li>
            <li><Link href="#">智慧文旅</Link></li>
            <li><Link href="#">大消费</Link></li>
          </ul>
        </div>
        <div className={styles.footerColumn}>
          <h4>服务与支持</h4>
          <ul>
            <li><Link href="#">备案服务</Link></li>
            <li><Link href="#">服务总览</Link></li>
            <li><Link href="#">建议与反馈</Link></li>
            <li><Link href="#">廉洁舞弊举报</Link></li>
            <li><Link href="#">举报平台</Link></li>
          </ul>
        </div>
        <div className={`${styles.footerColumn} ${styles.footerContact}`}>
          <h4>联系我们</h4>
          <p>业务咨询: service@volcengine.com</p>
          <p>市场合作: marketing@volcengine.com</p>
          <p>电话: 400-650-0030</p>
          <p>地址: 北京市海淀区北三环西路甲18号院大钟寺广场1号楼</p>
          <div className={styles.qrCodes}>
            <div>
              <Image src="https://via.placeholder.com/80x80/FFFFFF/333333?text=QR1" alt="微信公众号" width={70} height={70} />
              <span>微信公众号</span>
            </div>
            <div>
              <Image src="https://via.placeholder.com/80x80/FFFFFF/333333?text=QR2" alt="抖音号" width={70} height={70} />
              <span>抖音号</span>
            </div>
            <div>
              <Image src="https://via.placeholder.com/80x80/FFFFFF/333333?text=QR3" alt="视频号" width={70} height={70} />
              <span>视频号</span>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <div className="container">
          <p>© 2024 Volcano Engine. All Rights Reserved. <Link href="#">京ICP备17038715号-3</Link> <Link href="#">京公网安备11010802030491号</Link></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;