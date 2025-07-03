// src/features/teacher/knowledge/knowledge-detail/sub-features/qa/components/MessageList/WelcomeMessage.tsx
import React from 'react';
import Image from 'next/image';
import styles from './WelcomeMessage.module.css';

/**
 * 欢迎界面组件
 * @description 在对话开始前，向用户展示的引导信息。
 */
const WelcomeMessage = () => {
    return (
        <div className={styles.welcomeContainer}>
            <Image src="/robot.gif" alt="QA 助手" width={80} height={80} style={{ borderRadius: '50%' }} priority />
            <h4 className={styles.welcomeTitle}>开始测试您的知识库</h4>
            <p className={styles.welcomeSubtitle}>
                在下方输入问题，或在左侧调整参数，以检验 AI 对知识库内容的理解和回答能力。
            </p>
        </div>
    );
};

export default WelcomeMessage;