// src/features/teacher/knowledge/knowledge-detail/sub-features/qa/components/QAChatFooter.tsx
import React from 'react';
import QAChatInput from './QAChatInput/QAChatInput';
import styles from './QAChatFooter.module.css';

interface QAChatFooterProps {
    onSendMessage: (message: string) => void;
    isLoading: boolean;
}

/**
 * 知识问答聊天视图的底部组件
 * @description 封装了输入框和免责声明。
 */
const QAChatFooter: React.FC<QAChatFooterProps> = ({ onSendMessage, isLoading }) => {
    return (
        <footer className={styles.chatFooter}>
            <QAChatInput onSendMessage={onSendMessage} isLoading={isLoading} />
            <p className={styles.footerDisclaimer}>
                回答由 AI 生成，可能存在不准确之处，请结合引用来源进行核实。
            </p>
        </footer>
    );
};

export default QAChatFooter;