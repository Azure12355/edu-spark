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

###