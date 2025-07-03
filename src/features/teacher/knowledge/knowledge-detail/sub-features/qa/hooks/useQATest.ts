// [!file src/features/teacher/knowledge/knowledge-detail/sub-features/qa/hooks/useQATest.ts]
"use client";

import { useState, useCallback, useRef } from 'react';
import { useImmer } from 'use-immer';
import { useToast } from '@/shared/hooks/useToast';
import { availableModels } from '@/shared/lib/data/availableModels';
import { KNOWLEDGE_QA_PROMPT_TEMPLATE } from '@/shared/lib/prompts';
// [!code focus start]
import { Message } from '../components/Chat/MessageList/MessageItem/MessageItem'; // 导入 Message 类型
import type { AdvancedQARequest, QACompleteResponse } from '../types'; // 导入与后端对应的类型
import { streamAnswer } from '../service/qaService'; // 导入流式请求服务
// [!code focus end]

// 定义问答测试的参数类型，与后端 DTO 对应
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

    // --- 状态管理 ---
    const [params, setParams] = useImmer<QATestParams>(DEFAULT_PARAMS);
    const [messages, setMessages] = useImmer<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [sessionUuid, setSessionUuid] = useState<string | null>(null);
    const [query, setQuery] = useState(''); // 将输入框内容状态提升到此 Hook

    // --- 回调函数 ---
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

    // [!code focus start]
    // --- 核心修复：发送消息的处理逻辑 ---
    const handleSendMessage = useCallback(async (queryText: string) => {
        if (isLoading || !queryText.trim()) return;

        setIsLoading(true);
        setQuery(''); // 发送后清空输入框状态

        // 修复：为用户和AI消息都创建唯一的ID
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
                    // [!code ++]
                    console.log('%c[useQATest] Updating state. Chunk:', 'color: #3B82F6;', chunk);
                    const assistantMsg = draft.find(m => m.id === assistantMessageId);
                    if (assistantMsg) {
                        // [!code ++]
                        console.log(`%c  -> Before: "${assistantMsg.content}"`, 'color: #64748B;');
                        assistantMsg.content += chunk;
                        // [!code ++]
                        console.log(`%c  -> After: "${assistantMsg.content}"`, 'color: #16A34A;');
                    }
                });
            },
            onComplete: (data: QACompleteResponse) => {
                setMessages(draft => {
                    // 修复：通过ID精确查找要更新的消息
                    const assistantMsg = draft.find(m => m.id === assistantMessageId);
                    if (assistantMsg) {
                        assistantMsg.isThinking = false;
                        assistantMsg.references = data.references.map(ref => ({
                            id: ref.id,
                            docName: ref.documentName,
                            score: ref.distance || 0,
                            content: ref.content,
                        }));
                    }
                });
                if (!sessionUuid) setSessionUuid(data.sessionUuid);
            },
            onError: (error: Error) => {
                showToast({ message: `请求失败: ${error.message}`, type: 'error' });
                // 修复：通过ID精确移除失败的消息占位符
                setMessages(draft => draft.filter(m => m.id !== assistantMessageId));
            },
            onEnd: () => {
                setIsLoading(false);
                abortStreamRef.current = null;
            }
        };

        abortStreamRef.current = streamAnswer(request, processor);

    }, [isLoading, params, kbId, sessionUuid, setMessages, showToast, setQuery]);
    // [!code focus end]

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