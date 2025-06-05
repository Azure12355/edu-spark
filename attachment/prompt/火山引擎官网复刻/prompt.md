图片中给出的是字节跳动火山引擎的官网，现在请你详细阅读分析我所给出的图片附件。完美复刻一下这个官方首页。
- 保持页面的布局与图片一致
- 配色和各种样式全部和图片一致
- 页面中有需要用到图片的地方请先使用开源图片链接替代
- 输出详细完整准确的html、css、js代码。

## 布局拆分
我现在需要你将我的html、css、js按照模块进行拆分，各个部分都拆解成独立的html、css、js，最后整合到一个html、css和js中
- 按照网页的布局模块进行细致的拆分
- 将每个模块拆解成独立的html、css、js，方便我后续进行更加细粒度的更改和优化。
- 最终将所有模块整合到一个独立的可直接运行的html中。
- 请按照section进行拆分，将header、section等都拆分成独立的模块，各个模块内的样式布局和逻辑互不影响
- 通用的逻辑和样式可以放到通用的css和js文件中，然后在独立的模块中引用。

## 首页section
请详细参照我的图片，创建对应的React组件。
- 请你详细参考图片，输出详细完整的React组件
- 请一比一仿照图片中的样式布局
- 卡片里面的元素需要实现一定的逻辑和动画，使用现代感的高级的动画和渐变来优化样式和布局
- 卡片上方是可切换的tab栏，点击tab栏，可以实现卡片的左右切换，实现卡片左右丝滑切换的代码
- 使用cdn引入第三方动画库，实现高级的交互式入场动画，让该部分的组件入场时更加优雅美观。
- 实现组件的响应式，让该组件适配各个尺寸的画面。

## 首页hero动画布局优化
请详细阅读我的图片，帮我优化我的hero-section部分的布局和样式
- 调整hero-section部分的整体的布局，让整体看起来更加紧凑、大气、美观。
- 保持整体的样式和配色不变，采用高级的现代感科技感的渐变的文字和按钮
- 使用高级的动画库和效果，为我的hero-section部分的文字和按钮设计一个高级优雅的入场动画
- 输出详细完整的修改后的react代码和样式代码

### src/components/sections/HeroSection/HeroSection.tsx
```tsx
// src/components/sections/HeroSection/HeroSection.tsx
import React from 'react';
import Image from 'next/image';
import styles from './HeroSection.module.css';

const HeroSection: React.FC = () => {
  return (
    <section className={styles.heroSection}>
      {/* 视频背景 */}
      <div className={styles.videoBackgroundContainer}>
        <video
          autoPlay
          loop
          muted
          playsInline // 关键属性，用于在移动设备上（尤其是iOS）内联播放
          className={styles.backgroundVideo}
          poster="/images/hero-video-poster.jpg" // 可选：视频加载前的占位图
        >
          {/* 确保视频文件放在 public/videos/ 目录下 */}
          <source src="/video/hero.mp4" type="video/mp4" />
          {/* 可以为不支持mp4的浏览器提供其他格式 */}
          {/* <source src="/videos/hero-background.webm" type="video/webm" /> */}
          您的浏览器不支持 HTML5 视频。
        </video>
      </div>

      {/* 内容层 - 确保内容在视频之上 */}
      <div className={`container ${styles.heroContent}`}>
        <div className={styles.heroText}>
          <div className={styles.newAnnouncementContainer}>
            <span className={styles.newTag}>NEW</span>
            <span className={styles.newAnnouncement}>Prompt优解限时免费60天 <i className="fas fa-chevron-right"></i></span>
          </div>
          <h1 className={styles.mainTitle}>EduSpark</h1>
          <h2 className={styles.subTitle}>Agent助力教育行业</h2>
          <p className={styles.description}>模型能力拓展 | 专业算法服务 | 安全可信会话无痕 | 高并发算力保障</p>
          <div className={styles.heroButtons}>
            <a href="#" className={`${styles.heroBtn} ${styles.primaryBtn}`}>立即体验</a>
            <a href="#" className={`${styles.heroBtn} ${styles.secondaryBtn}`}>API文档</a>
          </div>
        </div>
        <div className={styles.heroImageContainer}>
          <Image
            src="/images/ai.webp"
            alt="火山方舟平台图示"
            width={350}
            height={228}
            className={styles.heroImage}
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
```

### src/components/sections/HeroSection/HeroSection.module.css
```tsx
/* src/components/sections/HeroSection/HeroSection.module.css */
.heroSection {
  padding: 60px 0;
  position: relative; /* 关键：为视频背景容器提供定位上下文 */
  overflow: hidden; /* 隐藏可能溢出的视频部分 */
  /* 移除之前的渐变背景，因为现在使用视频背景 */
  /* background: linear-gradient(135deg, #f3f5fc 0%, #eef2fa 60%, #e6ecf7 100%); */
}

/* 移除之前的 ::before 和 ::after 伪元素背景，或根据需要调整 */
/*
.heroSection::before,
.heroSection::after {
  display: none;
}
*/

/* 新增：视频背景容器 */
.videoBackgroundContainer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0; /* 确保视频在最底层 */
  overflow: hidden; /* 再次确保溢出被隐藏 */
}

.backgroundVideo {
  width: 100%;
  height: 100%;
  object-fit: cover; /* 关键：覆盖整个容器，可能会裁剪视频边缘以填充 */
  /*
  如果您希望视频完整显示但可能有黑边（letterboxing/pillarboxing），可以使用:
  object-fit: contain;
  */
  position: absolute; /* 对于某些浏览器，绝对定位可能有助于 object-fit */
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); /* 确保视频居中 */
  min-width: 100%; /* 确保在各种宽高比下都能覆盖 */
  min-height: 100%; /* 确保在各种宽高比下都能覆盖 */
}


.heroContent {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 40px;
  position: relative; /* 关键：确保内容在视频之上 */
  z-index: 1; /* 高于视频背景的 z-index */
}

/* --- 以下样式与之前保持一致或按需微调 --- */

.heroText {
  max-width: 520px;
  flex-shrink: 0;
  /* 可选：为文本添加轻微背景或阴影以提高在复杂视频上的可读性 */
  /* background-color: rgba(255, 255, 255, 0.1); */
  /* padding: 20px; */
  /* border-radius: 8px; */
  /* text-shadow: 0 0 8px rgba(0,0,0,0.5); */
}

.newAnnouncementContainer {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  /* 如果视频背景复杂，可能需要给这个容器也加上一点背景使其更清晰 */
  /* background-color: rgba(255, 255, 255, 0.7);
  padding: 4px 8px;
  border-radius: 4px;
  display: inline-flex; */
}

.newTag {
  background-color: #E8F1FF;
  color: #1664FF;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  margin-right: 12px;
  line-height: 1.5;
}

.newAnnouncement {
  font-size: 14px;
  color: #4E5969;
  font-weight: 400;
  display: flex;
  align-items: center;
}
.newAnnouncement i {
  font-size: 12px;
  margin-left: 6px;
  color: #86909C;
}

.mainTitle {
  font-size: 64px;
  font-weight: 600;
  margin-bottom: 12px;
  line-height: 1.25;
  background: linear-gradient(90deg, #2f54eb 0%, #861dee 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
  display: inline-block;
}

.subTitle {
  font-size: 42px;
  /* 如果视频背景是浅色的，确保文字颜色足够深 */
  color: var(--text-dark);
  /* 如果视频背景是深色的，可以考虑浅色文字 */
  /* color: var(--white); */
  margin: 0 0 16px;
  font-weight: 500;
  line-height: 1.4;
}

.description {
  font-size: 16px;
  color: #4E5969; /* 根据视频背景调整可读性 */
  /* color: #f0f0f0; */
  margin-bottom: 32px;
  line-height: 1.6;
}

.heroButtons {
  display: flex;
  gap: 16px;
}

.heroBtn {
  padding: 12px 32px;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.3s ease;
  border: 1px solid transparent;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.primaryBtn {
  color: var(--white);
  background: linear-gradient(90deg, #2f54eb 0%, #5733ff 100%);
  box-shadow: 0 4px 12px rgba(47, 84, 235, 0.2);
}
.primaryBtn:hover {
  background: linear-gradient(90deg, #1e43d6 0%, #4a28e0 100%);
  box-shadow: 0 6px 16px rgba(47, 84, 235, 0.3);
}

.secondaryBtn {
  color: #1664FF;
  background-color: rgba(232, 241, 255, 0.85); /* 增加一点透明度，让视频背景透出来一点 */
  border: 1px solid #ADC6FF;
}
.secondaryBtn:hover {
  background-color: rgba(220, 233, 255, 0.9);
  border-color: #A0BFFF;
  color: #0052D9;
}

.heroImageContainer {
  flex-shrink: 0;
  margin-left: 20px;
}
.heroImage {
  max-width: 100%;
  height: auto;
  display: block;
}

@media (max-width: 1024px) {
  .heroContent {
    gap: 30px;
  }
  .heroText {
    max-width: 480px;
  }
  .mainTitle {
    font-size: 40px;
  }
  .subTitle {
    font-size: 24px;
  }
  .heroImageContainer {
    max-width: 45%;
  }
}

@media (max-width: 768px) {
  .heroSection {
    padding: 40px 0;
    /* 对于移动端，视频背景可能会很消耗性能，可以考虑在小屏幕上禁用视频，改用静态图或纯色/渐变背景 */
  }
  /* 示例：移动端禁用视频背景，改用之前的渐变 */
  /*
  .videoBackgroundContainer {
    display: none;
  }
  .heroSection {
     background: linear-gradient(135deg, #f3f5fc 0%, #eef2fa 60%, #e6ecf7 100%);
  }
  */
  .heroContent {
    flex-direction: column;
    text-align: center;
  }
  .heroText {
    max-width: 100%;
    margin-bottom: 30px;
    order: 2;
    /* background-color: rgba(0, 0, 0, 0.3); 示例：在移动端给文本区域一个深色半透明背景以保证可读性 */
    /* padding: 20px; */
    /* border-radius: 8px; */
  }
  /*
  .mainTitle, .subTitle, .description, .newAnnouncement {
    color: white; 示例：如果用了深色背景或视频，文本改白色
  }
  */
  .mainTitle {
    font-size: 32px;
  }
  .subTitle {
    font-size: 20px;
  }
  .newAnnouncementContainer, .heroButtons {
    justify-content: center;
  }
  .heroImageContainer {
    order: 1;
    margin-left: 0;
    max-width: 80%;
    margin-bottom: 20px;
  }
}
```

## QuickExperienceSection 快速体验section优化
请详细阅读我的图片，帮我优化我的QuickExperienceSection部分的布局和样式
- 调整QuickExperienceSection部分的整体的布局，让整体看起来更加紧凑、大气、美观。
- 保持整体的样式和配色不变，采用高级的现代感科技感的渐变的文字和按钮
- 使用高级的动画库和效果，为我的QuickExperienceSection部分的文字和按钮设计一个高级优雅的入场动画
- section的整体高度需要刚好适配浏览器的视口，不要超出。
- 优化响应式布局，实现各个尺寸界面的完美适配
- 输出详细完整的修改后的react代码和样式代码

### src/components/sections/QuickExperienceSection/QuickExperienceSection.tsx
```tsx
// src/components/sections/QuickExperienceSection/QuickExperienceSection.tsx
import React from 'react';
import Image from 'next/image';
import Button from '../../common/Button/Button';
import styles from './QuickExperienceSection.module.css';

const apiFeatures = [
  { icon: "/images/QuickExperience/模型选择.png", title: "模型选择", description: "多种模态模型体验，开箱即用" },
  { icon: "/images/QuickExperience/模型推理.png", title: "模型推理", description: "支持在线和批量推理，灵活适配" },
  { icon: "/images/QuickExperience/模型精调.png", title: "模型精调", description: "支持SFT精调，直接偏好学习等" },
  { icon: "/images/QuickExperience/模型评测.png", title: "模型评测", description: "准确评估性能，系统感知模型表现" },
  { icon: "/images/QuickExperience/prompt优化.png", title: "Prompt调优", description: "轻松打造精准Prompt，高效优化" },
  { icon: "/images/QuickExperience/应用实验室.png", title: "应用实验室", description: "多种开箱方式，搭建企业级应用" },
];

const QuickExperienceSection: React.FC = () => {
  return (
    <section className={`section-padding ${styles.quickExperienceSection}`}>
      <div className="container">
        <h2 className="section-title-global text-center">极速体验火山方舟</h2>
        <div className={styles.experienceColumns}>
          <div className={styles.experienceCol}>
            <h3>极速体验模型</h3>
            <p>体验全模型，领取超大免费权益。每款豆包大语言模型50万Tokens免费额度，企业用户参与协作计划可获得500万Tokens免费额度</p>
            <Button variant="primary" href="#">立即体验</Button>
            <div className={styles.featureBox}>
              <h4>免费额度</h4>
              <p className={styles.largeText}>50 <span className={styles.smallText}>万Tokens/豆包语言模型</span></p>
              <h4>企业客户权益</h4>
              <p className={styles.largeText}>500 <span className={styles.smallText}>万Tokens/天</span></p>
              <h4>主力模型价格低至</h4>
              <p className={styles.highlightPrice}>0.8 <span className={styles.smallText}>元/百万Tokens</span></p>
              <h4>多模态大模型</h4>
              <p>支持<span className="text-blue">文本</span>、<span className="text-blue">语音</span>、<span className="text-blue">视觉</span></p>
              {/* <div className={styles.featureBoxImageContainer}>
                <Image 
                    src="https://via.placeholder.com/400x250/F0F4FF/666666?text=Model+Features" 
                    alt="Model Features" 
                    width={350} 
                    height={218}
                    className={styles.featureBoxImg}
                />
              </div> */}
            </div>
          </div>
          <div className={styles.experienceCol}>
            <h3>API构建应用</h3>
            <p>平台提供模型精调、推理、评测等全方位功能与服务，提供联网内容等丰富插件功能、知识库与智能体集成能力，保障企业级AI应用落地</p>
            <Button variant="primary" href="#">立即使用</Button>
            <div className={styles.apiFeaturesGrid}>
              {apiFeatures.map((feature, index) => (
                <div key={index} className={styles.apiFeatureItem}>
                  <Image 
                    src={`${feature.icon}`} 
                    alt={feature.title}
                    width={32}
                    height={32}
                    className={styles.apiFeatureIcon}
                  />
                  <h4>{feature.title}</h4>
                  <p>{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuickExperienceSection;
```

### src/components/sections/QuickExperienceSection/QuickExperienceSection.module.css
```tsx
/* src/components/sections/QuickExperienceSection/QuickExperienceSection.module.css */
/* .quickExperienceSection {
    /* Uses global .section-padding */
/* } */

.experienceColumns {
    display: flex;
    gap: 40px;
    margin-top: 40px;
}
.experienceCol {
    flex: 1;
    background-color: var(--white);
    padding: 30px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.05);
}
.experienceCol h3 {
    font-size: 22px;
    margin-top: 0;
    margin-bottom: 10px;
}
.experienceCol > p {
    color: var(--text-light);
    font-size: 14px;
    margin-bottom: 20px;
    line-height: 1.7;
}
.featureBox {
    background-color: #F7F9FF; /* Very light blue */
    padding: 20px;
    border-radius: 8px;
    margin-top: 30px;
    position: relative;
}
.featureBox h4 {
    font-size: 14px;
    color: var(--text-medium);
    margin-top: 0;
    margin-bottom: 5px;
}
.largeText {
    font-size: 24px;
    font-weight: bold;
    color: var(--primary-blue);
    margin-bottom: 15px;
}
.smallText {
    font-size: 12px;
    font-weight: normal;
    color: var(--text-light);
}
.highlightPrice {
    font-size: 36px;
    font-weight: bold;
    color: var(--red-accent);
}
.featureBoxImageContainer {
    text-align: center; /* Center the image if it's smaller than container */
}
.featureBoxImg {
    max-width: 80%;
    height: auto;
    display: block;
    margin: 20px auto 0;
}

.apiFeaturesGrid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    margin-top: 30px;
}
.apiFeatureItem {
    background-color: #F7F9FF;
    padding: 20px 15px; /* More padding */
    border-radius: 6px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}
.apiFeatureIcon {
    margin-bottom: 10px;
    border-radius: 4px;
}
.apiFeatureItem h4 {
    font-size: 16px;
    margin: 0 0 5px;
    color: var(--text-dark);
}
.apiFeatureItem p {
    font-size: 13px;
    color: var(--text-light);
    margin: 0;
    line-height: 1.5;
}

@media (max-width: 992px) {
    .experienceColumns { flex-direction: column; }
}
@media (max-width: 768px) {
    .apiFeaturesGrid { grid-template-columns: 1fr; }
    .featureBoxImg { max-width: 100%; }
}
```

## HeroFeaturesSection 优化
帮我优化我的HeroFeaturesSection部分的布局和样式
- 调整HeroFeaturesSection部分的整体的布局，让整体看起来更加紧凑、优雅、美观。
- 保持整体的样式和配色不变，采用高级的现代感科技感的渐变的文字和按钮，并且契合主题
- 使用高级的动画库和效果，为我的HeroFeaturesSection部分的卡片设计一个高级优雅的入场动画
- 优化响应式布局，实现各个尺寸界面的完美适配
- 输出详细完整的修改后的react代码和样式代码

### src/components/sections/HeroFeaturesSection/HeroFeaturesSection.tsx
```tsx
// src/components/sections/HeroFeaturesSection/HeroFeaturesSection.tsx
import React from 'react';
import Link from 'next/link';
import styles from './HeroFeaturesSection.module.css';

interface FeatureItem {
  title: string;
  description: string;
  linkText: string;
  href: string;
  tag?: string; // 可选的标签，如 "限时特惠"
}

const features: FeatureItem[] = [
  {
    title: "大模型特惠",
    description: "限量秒杀！19.9元起1000万tokens",
    linkText: "立即抢购",
    href: "#",
    tag: "限时特惠"
  },
  {
    title: "定价与计费",
    description: "各模型定价与计费方式",
    linkText: "了解详情",
    href: "#"
  },
  {
    title: "体验中心",
    description: "DeepSeek-R1/0528 上线",
    linkText: "免费体验",
    href: "#",
    tag: "上新"
  },
  {
    title: "API文档",
    description: "快速入门与调用",
    linkText: "查看文档",
    href: "#"
  }
];

const HeroFeaturesSection: React.FC = () => {
  return (
    <section className={styles.heroFeaturesSection}>
      <div className={`container ${styles.featuresContainer}`}>
        {features.map((feature, index) => (
          <Link href={feature.href} key={index} className={styles.featureCard}>
            <div className={styles.cardHeader}>
              <h3 className={styles.featureTitle}>{feature.title}</h3>
              {feature.tag && <span className={styles.featureTag}>{feature.tag}</span>}
            </div>
            <p className={styles.featureDescription}>{feature.description}</p>
            <div className={styles.featureLink}>
              {feature.linkText} <i className="fas fa-chevron-right"></i>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default HeroFeaturesSection;
```

### src/components/sections/HeroFeaturesSection/HeroFeaturesSection.module.css
```tsx
/* src/components/sections/HeroFeaturesSection/HeroFeaturesSection.module.css */
.heroFeaturesSection {
    padding: 40px 0; /* 与 HeroSection 区分开，调整上下间距 */
    background-color: var(--white); /* 或者与 HeroSection 不同的浅色背景 */
    border-bottom: 1px solid var(--ve-border-color); /* 底部加一条分割线 */
  }
  
  .featuresContainer {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 24px; /* 卡片间距 */
  }
  
  .featureCard {
    background-color: #F7F8FA; /* 卡片背景色，类似官网 */
    padding: 24px;
    border-radius: 8px;
    text-decoration: none;
    color: inherit;
    display: flex;
    flex-direction: column;
    justify-content: space-between; /* 使链接在底部对齐 */
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    border: 1px solid transparent; /* 为 hover 效果预留边框位置 */
  }
  
  .featureCard:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.08);
    border-color: #E0E8FF;
  }
  
  .cardHeader {
    display: flex;
    justify-content: space-between;
    align-items: flex-start; /* 确保标签在右上角时标题不受影响 */
    margin-bottom: 8px;
  }
  
  .featureTitle {
    font-size: 18px;
    font-weight: 500;
    color: var(--text-dark);
    margin: 0;
  }
  
  .featureTag {
    background-color: #FFEFEF; /* 示例标签背景 */
    color: #F53F3F; /* 示例标签文字颜色 */
    font-size: 12px;
    padding: 2px 6px;
    border-radius: 4px;
    font-weight: 500;
    white-space: nowrap; /* 防止标签文字换行 */
  }
  /* 特定标签样式 */
  .featureTag:where(:first-child) { /* 假设 "上新" 标签颜色不同 */
    background-color: #E8FFEA;
    color: #00B42A;
  }
  
  
  .featureDescription {
    font-size: 14px;
    color: #86909C; /* 描述文字颜色 */
    line-height: 1.5;
    margin-bottom: 16px;
    flex-grow: 1; /* 让描述占据多余空间 */
  }
  
  .featureLink {
    font-size: 14px;
    font-weight: 500;
    color: var(--ve-primary-blue);
    display: inline-flex; /* 使图标和文字对齐 */
    align-items: center;
  }
  
  .featureLink i {
    font-size: 12px;
    margin-left: 6px;
    transition: transform 0.2s ease;
  }
  
  .featureCard:hover .featureLink i {
    transform: translateX(3px);
  }
  
  /* 响应式调整 */
  @media (max-width: 1024px) {
    .featuresContainer {
      grid-template-columns: repeat(2, 1fr); /* 平板两列 */
      gap: 20px;
    }
  }
  
  @media (max-width: 640px) { /* 更小的屏幕，单列 */
    .featuresContainer {
      grid-template-columns: 1fr;
      gap: 16px;
    }
    .featureCard {
      padding: 20px;
    }
  }
```

### 
