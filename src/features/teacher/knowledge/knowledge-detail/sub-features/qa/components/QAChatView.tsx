// [!file src/features/teacher/knowledge/knowledge-detail/sub-features/qa/components/QAChatView.tsx]
import React from 'react';

import QAChatHeader from './Chat/QAChatHeader/QAChatHeader';
import MessageList from './Chat/MessageList/MessageList';
import QAChatFooter from './Chat/QAChatFooter/QAChatFooter';
import { Message } from './Chat/MessageList/MessageItem/MessageItem';

import styles from './QAChatView.module.css';

/**
 * @interface QAChatViewProps
 * @description 定义QA聊天视图的所有外部依赖（数据和回调）。
 */
// [!code focus start]
export interface QAChatViewProps {
    messages: Message[];
    isLoading: boolean;
    query: string;
    setQuery: (query: string) => void;
    onSendMessage: (message: string) => void;
    onClear: () => void;
    onStop: () => void;
}
// [!code focus end]

/**
 * QA聊天视图装配组件 (重构版)
 * @description 负责组装 Header, MessageList, 和 Footer，构建完整的聊天界面。
 */
const QAChatView: React.FC<QAChatViewProps> = ({
// [!code focus start]
                                                   messages,
                                                   isLoading,
                                                   query,
                                                   setQuery,
                                                   onSendMessage,
                                                   onClear,
                                                   onStop,
// [!code focus end]
                                               }) => {
    return (
        <div className={styles.chatViewContainer}>
            <QAChatHeader onClear={onClear} />
            <MessageList messages={messages} />
            <QAChatFooter
                // [!code focus start]
                query={query}
                setQuery={setQuery}
                onSendMessage={onSendMessage}
                isLoading={isLoading}
                onStop={onStop}
                // [!code focus end]
            />
        </div>
    );
};

export default QAChatView;