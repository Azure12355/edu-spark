"use client";
import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import styles from './ConversationView.module.css';
import MessageItem from '../MessageItem/MessageItem';
import { HistoryEntry } from '@/shared/lib/data/historyData';
import { Agent } from '@/shared/lib/data/agentData';

interface ConversationViewProps {
    history: HistoryEntry;
    agent: Agent;
}

const ConversationView: React.FC<ConversationViewProps> = ({ history, agent }) => {
    const [messages, setMessages] = useState(history.conversation);

    const handleEditMessage = (index: number, newContent: string) => {
        const updatedMessages = [...messages];
        updatedMessages[index].content = newContent;
        setMessages(updatedMessages);
    };

    const handleDeleteMessage = (index: number) => {
        const updatedMessages = messages.filter((_, i) => i !== index);
        setMessages(updatedMessages);
    };

    return (
        <div className={styles.conversationView}>
            <AnimatePresence>
                {messages.map((msg, index) => (
                    <MessageItem
                        key={`${history.id}-${index}`}
                        message={msg}
                        agent={agent}
                        onEdit={(newContent) => handleEditMessage(index, newContent)}
                        onDelete={() => handleDeleteMessage(index)}
                    />
                ))}
            </AnimatePresence>
        </div>
    );
};

export default ConversationView;