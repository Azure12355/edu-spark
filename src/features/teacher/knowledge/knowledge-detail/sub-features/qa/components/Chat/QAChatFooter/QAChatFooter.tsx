// [!file src/features/teacher/knowledge/knowledge-detail/sub-features/qa/components/Chat/QAChatFooter/QAChatFooter.tsx]
import React from 'react';
import QAChatInput from './QAChatInput/QAChatInput';
import styles from './QAChatFooter.module.css';

interface QAChatFooterProps {
    query: string;
    setQuery: (query: string) => void;
    onSendMessage: (message: string) => void;
    isLoading: boolean;
    onStop: () => void;
}

const QAChatFooter: React.FC<QAChatFooterProps> = ({ query, setQuery, onSendMessage, isLoading, onStop }) => {
    return (
        <footer className={styles.chatFooter}>
            <QAChatInput
                query={query}
                setQuery={setQuery}
                onSendMessage={onSendMessage}
                isLoading={isLoading}
                onStop={onStop}
            />
            <p className={styles.footerDisclaimer}>
                回答由 AI 生成，可能存在不准确之处，请结合引用来源进行核实。
            </p>
        </footer>
    );
};

export default QAChatFooter;