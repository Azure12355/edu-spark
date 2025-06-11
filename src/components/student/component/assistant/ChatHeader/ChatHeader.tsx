// src/components/student/component/assistant/ChatHeader.tsx
import React from 'react';
import Image from 'next/image';
import styles from './ChatHeader.module.css';

interface ChatHeaderProps {
    onClearChat: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ onClearChat }) => {
    return (
        <header className={styles.widgetHeader}>
            <div className={styles.headerTitle}>
                <Image src="/images/Chat/robot.png" alt="Agent 助教" width={26} height={26} />
                Agent 助教
            </div>
            <div className={styles.headerControls}>
                <button className={styles.controlButton} title="清空对话" onClick={onClearChat}>
                    <i className="fas fa-trash-alt"></i>
                </button>
            </div>
        </header>
    );
};

export default ChatHeader;