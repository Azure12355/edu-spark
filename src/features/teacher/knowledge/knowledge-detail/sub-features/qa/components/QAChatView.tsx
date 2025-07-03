// src/features/teacher/knowledge/knowledge-detail/sub-features/qa/components/QAChatView.tsx
import React from 'react';

// 1. 导入所有需要的子组件
import QAChatHeader from '@/features/teacher/knowledge/knowledge-detail/sub-features/qa/components/Chat/QAChatHeader/QAChatHeader';
import MessageList from '@/features/teacher/knowledge/knowledge-detail/sub-features/qa/components/Chat/MessageList/MessageList';
import QAChatFooter from '@/features/teacher/knowledge/knowledge-detail/sub-features/qa/components/Chat/QAChatFooter/QAChatFooter';
import { Message } from '@/features/teacher/knowledge/knowledge-detail/sub-features/qa/components/Chat/MessageList/MessageItem/MessageItem'; // 导入消息类型

// 2. 导入组件的样式
import styles from './QAChatView.module.css';

/**
 * @interface QAChatViewProps
 * @description 定义了 QA 聊天视图所需的所有外部依赖（数据和回调函数）。
 * 这是组件与外部逻辑（如 useQATest Hook）沟通的契约。
 */
export interface QAChatViewProps {
    messages: Message[];
    isLoading: boolean;
    onSendMessage: (message: string) => void;
    onClear: () => void;
}

/**
 * 知识问答（QA）聊天视图组件 (最终装配版)
 * @description 负责组装 Header, MessageList, 和 Footer，构建完整的聊天界面。
 *              它是一个纯粹的展示组件，所有业务逻辑由外部传入。
 */
const QAChatView: React.FC<QAChatViewProps> = ({
                                                   messages,
                                                   isLoading,
                                                   onSendMessage,
                                                   onClear,
                                               }) => {
    return (
        <div className={styles.chatViewContainer}>
            {/* 3. 装配头部组件，并传递 onClear 回调 */}
            <QAChatHeader onClear={onClear} />

            {/* 4. 装配消息列表组件，并传递 messages 数据 */}
            {/* MessageList 内部已处理了欢迎界面和消息滚动的逻辑 */}
            <MessageList messages={messages} />

            {/* 5. 装配底部组件，并传递发送消息的回调和加载状态 */}
            <QAChatFooter onSendMessage={onSendMessage} isLoading={isLoading} />
        </div>
    );
};

export default QAChatView;