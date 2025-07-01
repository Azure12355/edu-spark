// src/components/student/component/assistant/ChatFooter.tsx
import React from 'react';
import styles from './ChatFooter.module.css';

const ChatFooter = () => {
    return (
        <footer className={styles.footerInfo}>
            AI生成内容仅供参考，请谨慎采纳
            {/*<span className={styles.promoTag}>Beta</span>*/}
        </footer>
    );
};

export default ChatFooter;