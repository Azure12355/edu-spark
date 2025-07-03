// [!file src/features/teacher/knowledge/knowledge-detail/sub-features/qa/hooks/useQATest.ts]
"use client";

// [!code focus start]
import { useState, useCallback, useRef, useEffect } from 'react'; // 1. 导入 useEffect
// [!code focus end]
import { useImmer } from 'use-immer';
import { useToast } from '@/shared/hooks/useToast';
import { availableModels } from '@/shared/lib/data/availableModels';
import { KNOWLEDGE_QA_PROMPT_TEMPLATE } from '@/shared/lib/prompts';
import { Message } from '../components/Chat/MessageList/MessageItem/MessageItem';
import type { AdvancedQARequest, QACompleteResponse } from '../types';
import { streamAnswer } from '../service/qaService';
import {ApiError} from "@/shared/lib/errors/apiError";

import { useAuthModal } from '@/shared/store/userStore'; // 1. 导入新的 Hook


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

    const openAuthModal = useAuthModal(); // 3. 获取打开弹窗的函数

    const [params, setParams] = useImmer<QATestParams>(DEFAULT_PARAMS);
    const [messages, setMessages] = useImmer<Message[]>([]);
    const [isLoading, setIsLoading]= useState(false);
    const [sessionUuid, setSessionUuid] = useState<string | null>(null);
    const [query, setQuery] = useState('上海哪个酒店性价比最高?');

    // [!code focus start]
    // --- 核心修复：使用 useRef 来存储最新的 params 和 sessionUuid ---
    const latestParamsRef = useRef(params);
    const latestSessionUuidRef = useRef(sessionUuid);

    // 2. 使用 useEffect 保证 ref 永远指向最新的状态
    useEffect(() => {
        latestParamsRef.current = params;
    }, [params]);

    useEffect(() => {
        latestSessionUuidRef.current = sessionUuid;
    }, [sessionUuid]);
    // --- 核心修复结束 ---
    // [!code focus end]

    const handleRetrievalParamChange = useCallback(<K extends keyof QATestParams['retrieval']>(
        key: K,
        value: QATestParams['retrieval'][K]
    ) => {
        setParams(draft => {
            draft.retrieval[key] = value;
        });
    }, [setParams]);

    const handleGenerationParamChange = useCallback(<K extends keyof QATestParams['generation']>(
        key: K,
        value: QATestParams['generation'][K]
    ) => {
        setParams(draft => {
            draft.generation[key] = value;
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
    // 3. handleSendMessage 现在可以不再依赖 params 和 sessionUuid
    // 因为它可以直接从 ref 中读取最新的值
    const handleSendMessage = useCallback(async (queryText: string) => {
        // [!code focus end]
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

        // [!code focus start]
        // 4. 从 ref 中读取最新的状态来构建请求
        const request: AdvancedQARequest = {
            ...latestParamsRef.current,
            query: queryText,
            knowledgeBaseIds: [Number(kbId)],
            sessionUuid: latestSessionUuidRef.current,
        };
        // [!code focus end]

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
                        const uniqueReferences = Array.from(new Map(data.references.map(ref => [ref.id, ref])).values());
                        assistantMsg.references = uniqueReferences.map(ref => ({
                            id: ref.id,
                            docName: ref.documentName,
                            score: ref.distance || 0,
                            content: ref.content,
                        }));
                    }
                });
                if (!sessionUuid) setSessionUuid(data.sessionUuid);
            },
            // [!code focus start]
            // --- 核心修复：增强 onError 的处理逻辑 ---
            onError: (error: Error) => {

                if (error instanceof ApiError && error.code === 40100) {
                    // 如果是未登录错误
                    showToast({ message: '请先登录再开始对话', type: 'warning' });
                    // 打开登录弹窗，并传递一个“登录成功后重新发送消息”的回调
                    openAuthModal(() => {
                        showToast({ message: '登录成功！正在重新为您发送消息...', type: 'success' });
                        // 重新调用 handleSendMessage
                        handleSendMessage(queryText);
                    });
                } else {
                    // 其他所有错误，按原逻辑处理
                    showToast({ message: `请求出错: ${error.message}`, type: 'error' });
                }

                // 无论哪种错误，都更新UI
                setMessages(draft => {
                    const assistantMsg = draft.find(m => m.id === assistantMessageId);
                    if (assistantMsg) {
                        assistantMsg.content = `抱歉，处理您的请求时遇到了问题。`;
                        assistantMsg.isThinking = false;
                        assistantMsg.isError = true;
                    }
                });
            },
            // [!code focus end]
            onEnd: () => {
                setIsLoading(false);
                abortStreamRef.current = null;
            }
        };

        abortStreamRef.current = streamAnswer(request, processor);

        // [!code focus start]
        // 5. 现在 handleSendMessage 的依赖项可以简化，因为它不再需要直接依赖 params 和 sessionUuid
    }, [isLoading, kbId, setMessages, showToast, setQuery, sessionUuid, openAuthModal]); // 保留 sessionUuid 是因为 onComplete 中有 setSessionUuid，以防万一
    // [!code focus end]


    return {
        params,
        messages,
        isLoading,
        query,
        availableModels,
        actions: {
            setQuery,
            handleRetrievalParamChange,
            handleGenerationParamChange,
            handleResetParams,
            handleSendMessage,
            handleClear,
            handleStop,
        },
    };
};