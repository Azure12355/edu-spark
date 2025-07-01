"use client";
import React, { useState } from 'react';
import styles from './QAChatView.module.css';

// 模拟的对话数据
const initialMessages = [
    {
        role: 'user',
        content: '你好',
    },
    {
        role: 'assistant',
        content: '你好！有什么可以帮您的吗？如果具有具体问题，欢迎随时告诉我，我会为您解答。',
        references: [
            { name: '笔记本电脑表格.xlsx' },
            { name: 'Python基本语法.txt' },
            { name: 'Python基本语法.pdf' },
            { name: 'Python基本语法.pptx' },
        ],
    },
];

const WelcomeMessage = () => (
    <div className={styles.welcomeMessage}>
        <div className={styles.welcomeIcon}>👋</div>
        <h3>Hi，我是知识问答助手</h3>
        <p>我可以阅读知识库的资料，让检索更加准确。你可以调整左侧的参数，预览和调试检索的效果。</p>
    </div>
);

const QAChatView = () => {
    const [messages, setMessages] = useState<any[]>([]);

    // 模拟开始对话
    const startChat = () => {
        setMessages(initialMessages);
    };

    return (
        <div className={styles.chatView}>
            {messages.length === 0 ? (
                <WelcomeMessage />
            ) : (
                <div className={styles.chatContainer}>
                    <div className={styles.chatHeader}>
                        <button className={styles.clearButton} onClick={() => setMessages([])}><i className="fas fa-trash-alt"></i> 清空对话</button>
                    </div>
                    <div className={styles.chatBody}>
                        {messages.map((msg, index) => (
                            <div key={index} className={`${styles.messageBubble} ${styles[msg.role]}`}>
                                {msg.content}
                                {msg.references && (
                                    <div className={styles.references}>
                                        <h4 className={styles.refHeader}>参考文档 ({msg.references.length})</h4>
                                        <div className={styles.refList}>
                                            {msg.references.map((ref: any, refIndex: number) => (
                                                <div key={refIndex} className={styles.refItem}>
                                                    <i className="fas fa-file-pdf"></i>
                                                    <span>{ref.name}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className={styles.inputArea}>
                <textarea placeholder="我可以阅读知识库的资料并使用自然语言回答你的问题" rows={1} onFocus={messages.length === 0 ? startChat : undefined}></textarea>
                <button className={styles.sendButton}><i className="fas fa-paper-plane"></i></button>
            </div>
            <div className={styles.footer}>
                试用体验内容均由人工智能模型生成，不代表平台立场 免费声明 测试协议 隐私政策
            </div>
        </div>
    );
};
export default QAChatView;