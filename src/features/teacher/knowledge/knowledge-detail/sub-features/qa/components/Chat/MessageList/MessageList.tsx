// src/features/teacher/knowledge/knowledge-detail/sub-features/qa/components/MessageList/MessageList.tsx
import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MessageItem, { Message } from './MessageItem/MessageItem';
import WelcomeMessage from './WelcomeMessage/WelcomeMessage';
import styles from './MessageList.module.css';

/**
 * @interface MessageListProps
 * @description MessageList 组件的 Props 定义
 */
interface MessageListProps {
    messages: Message[];
}

/**
 * 消息列表组件
 * @description 负责渲染整个对话消息流，或在对话开始前显示欢迎界面。
 *              同时，它还管理着消息列表的自动滚动行为。
 */
const MessageList: React.FC<MessageListProps> = ({ messages }) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    // 自动滚动到底部的 Effect
    useEffect(() => {
        const container = scrollContainerRef.current;
        if (container) {
            container.scrollTo({
                top: container.scrollHeight,
                behavior: 'smooth'
            });
        }
    }, [messages]); // 依赖于 messages 数组，每次消息更新都会触发

    const showWelcome = messages.length === 0;

    // 动画变体，用于消息项的入场效果
    const itemVariants = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -10 },
    };

    return (
        <div ref={scrollContainerRef} className={styles.scrollContainer}>
            {showWelcome ? (
                <WelcomeMessage />
            ) : (
                <div className={styles.messageListWrapper}>
                    <AnimatePresence>
                        {messages.map((msg, index) => (
                            <motion.div
                                key={`${msg.role}-${index}`} // 使用更稳定的 key
                                variants={itemVariants}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                layout // 启用布局动画
                                transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                            >
                                <MessageItem message={msg} />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            )}
        </div>
    );
};

export default MessageList;