"use client";

import { useState, useCallback, useRef } from 'react';
import { useImmer } from 'use-immer';
import { useToast } from '@/shared/hooks/useToast';
import { BubbleMessage } from '../MessageBubble/MessageBubble';
import { Skill } from '../SkillSelector/SkillSelector';

/**
 * @interface ChatHandler
 * @description 定义了外部传入的、用于处理消息发送的核心逻辑函数。
 * @param query - 用户输入的查询文本。
 * @param options - 包含消息历史、技能等上下文信息的对象。
 * @returns {ReadableStream<string>} - 返回一个可读的字符串流。
 */
export type ChatHandler = (
    query: string,
    options: {
        history: BubbleMessage[];
        skill: Skill | null;
        abortSignal: AbortSignal;
    }
) => Promise<ReadableStream<string>>;

/**
 * @interface useChatProps
 * @description useChat Hook 的配置参数。
 */
interface useChatProps {
    /**
     * 【核心】处理消息发送的异步函数，必须返回一个流。
     */
    chatHandler: ChatHandler;
    /**
     * 可供选择的技能列表。
     */
    availableSkills?: Skill[];
}

/**
 * @description 管理通用聊天窗口所有状态和逻辑的核心 Hook。
 */
export const useChat = ({ chatHandler, availableSkills = [] }: useChatProps) => {
    const showToast = useToast();
    const abortControllerRef = useRef<AbortController | null>(null);

    // --- 状态管理 ---
    const [messages, setMessages] = useImmer<BubbleMessage[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);

    // --- 核心方法: 发送消息 ---
    const sendMessage = useCallback(async (query: string) => {
        const trimmedQuery = query.trim();
        if (!trimmedQuery || isLoading) return;

        setIsLoading(true);
        setInputValue(''); // 发送后清空输入框

        const userMessage: BubbleMessage = { id: `user-${Date.now()}`, role: 'user', content: trimmedQuery, isComplete: true };
        const assistantMessageId = `assistant-${Date.now()}`;

        // 使用函数式更新，确保拿到最新的 messages 状态
        const currentHistory = [...messages, userMessage];
        setMessages(draft => {
            draft.push(userMessage);
            draft.push({
                id: assistantMessageId,
                role: 'assistant',
                content: '',
                isThinking: true,
                isComplete: false,
            });
        });

        abortControllerRef.current = new AbortController();

        try {
            const stream = await chatHandler(trimmedQuery, {
                history: currentHistory,
                skill: selectedSkill,
                abortSignal: abortControllerRef.current.signal,
            });

            const reader = stream.getReader();
            const decoder = new TextDecoder('utf-8');

            while (true) {
                const { value, done } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value);
                setMessages(draft => {
                    const assistantMsg = draft.find(m => m.id === assistantMessageId);
                    if (assistantMsg) {
                        assistantMsg.content += chunk;
                    }
                });
            }

            // 流结束，更新最终状态
            setMessages(draft => {
                const assistantMsg = draft.find(m => m.id === assistantMessageId);
                if (assistantMsg) {
                    assistantMsg.isThinking = false;
                    assistantMsg.isComplete = true;
                    // 在真实场景中，引用文献等最终数据会在一个'done'事件中传来并附加到这里
                }
            });

        } catch (error) {
            if ((error as Error).name !== 'AbortError') {
                console.error('Chat processing error:', error);
                showToast({ message: '请求失败，请稍后重试', type: 'error' });
                setMessages(draft => draft.filter(m => m.id !== assistantMessageId));
            }
        } finally {
            setIsLoading(false);
            abortControllerRef.current = null;
            setSelectedSkill(null); // 发送后清空技能选择
        }

    }, [isLoading, messages, chatHandler, selectedSkill, setMessages, showToast]);

    // --- 其他辅助方法 ---
    const stop = useCallback(() => {
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
            showToast({ message: '已停止生成', type: 'warning' });
        }
    }, [showToast]);

    const clear = useCallback(() => {
        stop();
        setMessages([]);
        setInputValue('');
        setSelectedSkill(null);
    }, [stop, setMessages]);

    const regenerate = useCallback((messageId: string) => {
        // 找到需要重试的前一条用户消息
        const messageIndex = messages.findIndex(m => m.id === messageId);
        if (messageIndex > 0 && messages[messageIndex - 1].role === 'user') {
            const userQuery = messages[messageIndex - 1].content;
            // 移除旧的AI回答并重新发送
            setMessages(draft => draft.slice(0, messageIndex));
            sendMessage(userQuery);
        }
    }, [messages, sendMessage, setMessages]);

    const selectSkill = (skill: Skill | null) => {
        setSelectedSkill(skill);
    };

    return {
        messages,
        isLoading,
        inputValue,
        selectedSkill,
        availableSkills,
        setInputValue,
        sendMessage,
        stop,
        clear,
        regenerate,
        selectSkill,
    };
};