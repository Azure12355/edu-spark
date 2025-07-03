// [!file src/features/teacher/knowledge/knowledge-detail/sub-features/qa/hooks/useQATest.ts]
"use client";

import { useState, useCallback, useRef } from 'react';
import { useImmer } from 'use-immer';
import { useToast } from '@/shared/hooks/useToast';
import { availableModels } from '@/shared/lib/data/availableModels';
import { KNOWLEDGE_QA_PROMPT_TEMPLATE } from '@/shared/lib/prompts';
import { Message } from '../components/Chat/MessageList/MessageItem/MessageItem';
import type { AdvancedQARequest, QACompleteResponse } from '../types';
import { streamAnswer } from '../service/qaService';

export type QATestParams = Omit<AdvancedQARequest, 'query' | 'knowledgeBaseIds' | 'sessionUuid'>;
const DEFAULT_PARAMS: QATestParams = {
    retrieval: { topK: 5 },
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
    const [messages, setMessages] = useImmer<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [sessionUuid, setSessionUuid] = useState<string | null>(null);
    const [query, setQuery] = useState('');

    const handleParamChange = useCallback((path: string, value: any) => {
        setParams(draft => {
            const keys = path.split('.');
            let current: any = draft;
            for (let i = 0; i < keys.length - 1; i++) current = current[keys[i]];
            current[keys.length - 1] = value;
        });
    }, [setParams]);

    const handleResetParams = useCallback(() => {
        setParams(DEFAULT_PARAMS);
        showToast({ message: '参数已重置为默认值', type: 'info' });
    }, [setParams, showToast]);

    const handleStop = useCallback(() => {
        abortStreamRef.current?.();
    }, []);

    const handleClear = useCallback(() => {
        handleStop();
        setMessages([]);
        setSessionUuid(null);
        showToast({ message: '对话已清空', type: 'info' });
    }, [handleStop, setMessages, showToast]);

    const handleSendMessage = useCallback(async (queryText: string) => {
        if (isLoading || !queryText.trim()) return;

        setIsLoading(true);
        setQuery('');

        const userMessage: Message = { id: `user-${Date.now()}`, role: 'user', content: queryText };
        const assistantMessageId = `assistant-${Date.now()}`;
        const assistantPlaceholder: Message = {
            id: assistantMessageId,
            role: 'assistant',
            content: '',
            isThinking: true,
        };

        setMessages(draft => {
            draft.push(userMessage);
            draft.push(assistantPlaceholder);
        });

        const request: AdvancedQARequest = {
            ...params,
            query: queryText,
            knowledgeBaseIds: [Number(kbId)],
            sessionUuid: sessionUuid,
        };

        const processor = {
            onData: (chunk: string) => {
                setMessages(draft => {
                    const assistantMsg = draft.find(m => m.id === assistantMessageId);
                    if (assistantMsg) {
                        assistantMsg.content += chunk;
                    }
                });
            },
            onComplete: (data: QACompleteResponse) => {
                setMessages(draft => {
                    const assistantMsg = draft.find(m => m.id === assistantMessageId);
                    if (assistantMsg) {
                        assistantMsg.isThinking = false;

                        // [!code focus start]
                        // --- 核心修复：对收到的引用文献进行去重 ---
                        const uniqueReferences = Array.from(new Map(data.references.map(ref => [ref.id, ref])).values());

                        assistantMsg.references = uniqueReferences.map(ref => ({
                            id: ref.id,
                            docName: ref.documentName,
                            score: ref.distance || 0, // Fallback to 0 if distance is undefined
                            content: ref.content,
                        }));
                        // --- 核心修复结束 ---
                        // [!code focus end]
                    }
                });
                if (!sessionUuid) setSessionUuid(data.sessionUuid);
            },
            onError: (error: Error) => {
                showToast({ message: `请求失败: ${error.message}`, type: 'error' });
                setMessages(draft => draft.filter(m => m.id !== assistantMessageId));
            },
            onEnd: () => {
                setIsLoading(false);
                abortStreamRef.current = null;
            }
        };

        abortStreamRef.current = streamAnswer(request, processor);

    }, [isLoading, params, kbId, sessionUuid, setMessages, showToast, setQuery]);

    return {
        params,
        messages,
        isLoading,
        query,
        availableModels,
        actions: {
            setQuery,
            handleParamChange,
            handleResetParams,
            handleSendMessage,
            handleClear,
            handleStop,
        },
    };
};