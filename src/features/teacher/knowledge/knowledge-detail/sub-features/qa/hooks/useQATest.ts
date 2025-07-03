"use client";

import { useState, useCallback, useRef } from 'react';
import { useImmer } from 'use-immer';
import { useToast } from '@/shared/hooks/useToast';
import { availableModels } from '@/shared/lib/data/availableModels';
import { KNOWLEDGE_QA_PROMPT_TEMPLATE } from '@/shared/lib/prompts';
import { BubbleMessage } from '@/widgets/chat/UniversalChatWidget/MessageBubble/MessageBubble';
import type { AdvancedQARequest, QACompleteResponse } from '../types';
import { streamAnswer } from '../service/qaService';

// Types and defaults remain the same
export type QATestParams = Omit<AdvancedQARequest, 'knowledgeBaseIds' | 'sessionUuid'>;
const DEFAULT_PARAMS: QATestParams = {
    query: '',
    retrieval: { topK: 5, },
    generation: {
        modelId: 'qwen-plus',
        promptTemplate: KNOWLEDGE_QA_PROMPT_TEMPLATE,
        temperature: 0.7,
        neighboringChunks: 0,
    },
};

interface UseQATestProps {
    kbId: number | string;
}

export const useQATest = ({ kbId }: UseQATestProps) => {
    const showToast = useToast();
    const abortStreamRef = useRef<(() => void) | null>(null);

    const [params, setParams] = useImmer<QATestParams>(DEFAULT_PARAMS);
    const [messages, setMessages] = useImmer<BubbleMessage[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [sessionUuid, setSessionUuid] = useState<string | null>(null);

    const handleParamChange = useCallback((path: string, value: any) => {
        setParams(draft => {
            const keys = path.split('.');
            let current: any = draft;
            for (let i = 0; i < keys.length - 1; i++) {
                current = current[keys[i]];
            }
            current[keys.length - 1] = value;
        });
    }, [setParams]);

    const handleQueryChange = useCallback((newQuery: string) => {
        setParams(draft => { draft.query = newQuery; });
    }, [setParams]);

    const handleResetParams = useCallback(() => {
        setParams(DEFAULT_PARAMS);
        showToast({ message: '参数已重置为默认值', type: 'info' });
    }, [setParams, showToast]);

    const handleStop = useCallback(() => {
        abortStreamRef.current?.();
        // The isLoading state will be set to false in the onEnd callback
    }, []);

    const handleClear = useCallback(() => {
        handleStop();
        setMessages([]);
        setSessionUuid(null);
    }, [handleStop, setMessages]);

    const handleSendMessage = useCallback(async (queryText: string) => {
        if (isLoading || !queryText.trim()) return;

        setIsLoading(true);
        const userMessageId = `user-${Date.now()}`;
        const assistantMessageId = `assistant-${Date.now()}`;

        setMessages(draft => {
            draft.push({ id: userMessageId, role: 'user', content: queryText, isComplete: true });
            // [!code focus start]
            // 【核心修复 1】: 创建一个结构完整的、表示“思考中”的 assistant 消息
            draft.push({
                id: assistantMessageId,
                role: 'assistant',
                content: '',
                isThinking: true, // 初始为思考状态
                isComplete: false, // 初始为未完成状态
                references: [], // 初始引用为空
            });
            // [!code focus end]
        });

        const request: AdvancedQARequest = {
            ...params,
            query: queryText,
            knowledgeBaseIds: [Number(kbId)],
            sessionUuid: sessionUuid,
        };

        const processor = {
            onData: (chunk: string) => {
                // [!code focus start]
                // 【核心修复 2】: 使用函数式更新来安全地追加内容
                setMessages(draft => {
                    const assistantMsg = draft.find(m => m.id === assistantMessageId);
                    if (assistantMsg) {
                        assistantMsg.content += chunk;
                    }
                });
                // [!code focus end]
            },
            onComplete: (data: QACompleteResponse) => {
                // [!code focus start]
                // 【核心修复 3】: 在完成时更新消息的最终状态
                setMessages(draft => {
                    const assistantMsg = draft.find(m => m.id === assistantMessageId);
                    if (assistantMsg) {
                        assistantMsg.isThinking = false;
                        assistantMsg.isComplete = true;
                        assistantMsg.references = data.references;
                        // 如果后端返回的 fullAnswer 与流式内容不一致，可以在这里覆盖
                        // assistantMsg.content = data.fullAnswer;
                    }
                });
                // [!code focus end]
                if (!sessionUuid) {
                    setSessionUuid(data.sessionUuid);
                }
            },
            onError: (error: Error) => {
                showToast({ message: `请求失败: ${error.message}`, type: 'error' });
                // [!code focus start]
                // 【核心修复 4】: 移除失败的消息占位符
                setMessages(draft => draft.filter(m => m.id !== assistantMessageId));
                // [!code focus end]
            },
            onEnd: () => {
                setIsLoading(false);
                abortStreamRef.current = null;
            }
        };

        abortStreamRef.current = streamAnswer(request, processor);

    }, [isLoading, params, kbId, sessionUuid, setMessages, showToast]);

    return {
        params,
        messages,
        isLoading,
        query: params.query,
        availableModels,
        actions: {
            setQuery: handleQueryChange,
            handleParamChange,
            handleResetParams,
            handleSendMessage,
            handleClear,
            handleStop,
        },
    };
};