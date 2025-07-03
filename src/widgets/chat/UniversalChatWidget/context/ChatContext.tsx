"use client";

import {createContext, ReactNode, useContext} from 'react';
import {BubbleMessage} from '../MessageBubble/MessageBubble';
import {Skill} from '../SkillSelector/SkillSelector';
import {ChatHandler, useChat} from '../hooks/useChat';

/**
 * @interface ChatContextType
 * @description 上下文的类型契约
 */
export interface ChatContextType {
    messages: BubbleMessage[];
    isLoading: boolean;
    inputValue: string;
    selectedSkill: Skill | null;
    availableSkills: Skill[];
    setInputValue: (value: string) => void;
    sendMessage: (query: string) => void;
    stop: () => void;
    clear: () => void;
    regenerate: (messageId: string) => void;
    selectSkill: (skill: Skill | null) => void;
}

/**
 * 创建 ChatContext
 */
export const ChatContext = createContext<ChatContextType | undefined>(undefined);


/**
 * @interface ChatProviderProps
 * @description ChatProvider 组件的 Props 定义。
 */
interface ChatProviderProps {
    children: ReactNode;
    chatHandler: ChatHandler;
    availableSkills?: Skill[];
}

/**
 * @description ChatProvider 组件
 */
export const ChatProvider: React.FC<ChatProviderProps> = ({children, chatHandler, availableSkills}) => {
    const chatLogic = useChat({chatHandler, availableSkills});

    return (
        <ChatContext.Provider value={chatLogic}>
            {children}
        </ChatContext.Provider>
    );
};


/**
 * 自定义 Hook: useChatContext
 */
export const useChatContext = (): ChatContextType => {
    const context = useContext(ChatContext);
    if (!context) {
        throw new Error('useChatContext must be used within a ChatProvider');
    }
    return context;
};