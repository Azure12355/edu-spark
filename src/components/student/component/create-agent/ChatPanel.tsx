"use client";
import React from 'react';
import styles from './ChatPanel.module.css';

const ChatPanel: React.FC = () => {
    return (
        <main className={styles.panel}>
            <div className={styles.panelHeader}>
                <h3>文本对话 <i className="fas fa-chevron-down"></i></h3>
                <div className={styles.headerActions}>
                    <button title="新对话"><i className="far fa-plus-square"></i></button>
                    <button title="设置"><i className="fas fa-cog"></i></button>
                    <button title="清除历史"><i className="fas fa-trash-alt"></i></button>
                </div>
            </div>

            <div className={styles.chatBody}>
                <div className={styles.welcomeScreen}>
                    <div className={styles.welcomeIcon}>
                        <span>T</span>
                    </div>
                    <h4>输入问题进行测试体验</h4>
                </div>
            </div>

            <div className={styles.chatInputWrapper}>
                <div className={styles.inputActions}>
                    <button><i className="fas fa-paperclip"></i></button>
                    <button><i className="far fa-image"></i></button>
                    <button><i className="fas fa-expand-arrows-alt"></i></button>
                </div>
                <textarea placeholder="请输入..."></textarea>
                <div className={styles.sendArea}>
                    <span>0/129024</span>
                    <button className={styles.sendButton}><i className="fas fa-arrow-up"></i></button>
                </div>
            </div>
        </main>
    );
};

export default ChatPanel;