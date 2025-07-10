// [!file src/features/teacher/assistant/ai-assistant/hooks/useTeacherAssistant.ts]
import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {AssistantChatCompleteResponse, ChunkVO, CourseVO, SyllabusVO} from '@/shared/types';
import {listCourseVOByPage} from '@/shared/services/courseService';
import {getSyllabusByCourseId} from '@/shared/services/syllabusService';
import {useToast} from '@/shared/hooks/useToast';
import {BubbleMessage} from '@/widgets/chat/UniversalChatWidget/MessageBubble/MessageBubble';
import {ApiError} from '@/shared/lib/errors/apiError';
import {
    Reference
} from "@/features/teacher/knowledge/knowledge-detail/sub-features/qa/components/Chat/MessageList/References/ReferenceCard";
import {useUserStore} from "@/shared/store/userStore"; // 导入自定义错误类型

// 定义知识树中选中的节点类型
export interface SelectedNode {
    id: number | string;
    type: 'course' | 'chapter' | 'section' | 'point';
    name: string;
}

// 定义模型思考方式的类型
export type ThinkingMode = 'auto' | 'on' | 'off';

export const useTeacherAssistant = () => {
    // ------------------- 状态定义 (保持不变) -------------------
    const [courses, setCourses] = useState<CourseVO[]>([]);
    const [selectedCourse, setSelectedCourse] = useState<CourseVO | null>(null);
    const [syllabus, setSyllabus] = useState<SyllabusVO | null>(null);
    const [selectedNode, setSelectedNode] = useState<SelectedNode | null>(null);
    const [messages, setMessages] = useState<BubbleMessage[]>([]);
    const [isSending, setIsSending] = useState(false);
    const [selectedSkill, setSelectedSkill] = useState<string>('');
    const [thinkingMode, setThinkingMode] = useState<ThinkingMode>('auto');
    const [isLoadingCourses, setIsLoadingCourses] = useState(true);
    const [isLoadingSyllabus, setIsLoadingSyllabus] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const showToast = useToast();

    const {openAuthModal} = useUserStore();

    const abortControllerRef = useRef<AbortController | null>(null);

    // ------------------- 数据获取 Hooks (保持不变) -------------------
    useEffect(() => {
        const fetchCourses = async () => {
            setIsLoadingCourses(true);
            setError(null);
            try {
                const coursePage = await listCourseVOByPage({current: 1, pageSize: 999});
                if (coursePage.records && coursePage.records.length > 0) {
                    setCourses(coursePage.records);
                    setSelectedCourse(coursePage.records[0]);
                } else {
                    setCourses([]);
                    setSelectedCourse(null);
                    showToast({message: "您还没有创建任何课程", type: 'info'});
                }
            } catch (e: any) {
                setError('获取课程列表失败，请稍后重试。');
            } finally {
                setIsLoadingCourses(false);
            }
        };
        fetchCourses();
    }, [showToast]);

    useEffect(() => {
        if (!selectedCourse) {
            setSyllabus(null);
            setSelectedNode(null);
            return;
        }
        const fetchSyllabus = async () => {
            setIsLoadingSyllabus(true);
            setError(null);
            try {
                const syllabusData = await getSyllabusByCourseId(selectedCourse.id);
                setSyllabus(syllabusData);
                setSelectedNode({id: selectedCourse.id, type: 'course', name: `整个课程: ${selectedCourse.name}`});
            } catch (e: any) {
                setError('获取教学大纲失败，请稍后重试。');
            } finally {
                setIsLoadingSyllabus(false);
            }
        };
        fetchSyllabus();
    }, [selectedCourse]);

    // ------------------- 核心业务方法 (重构) -------------------

    const handleSelectCourse = useCallback((course: CourseVO) => {
        if (course.id !== selectedCourse?.id) {
            showToast({message: `已切换到《${course.name}》课程`, type: 'info'});
            setSelectedCourse(course);
            setMessages([]);
        }
    }, [selectedCourse, showToast]);

    const handleSelectNode = useCallback((node: SelectedNode) => {
        setSelectedNode(node);
        showToast({message: `上下文已切换到: ${node.name}`, type: 'info'});
    }, [showToast]);

    // 【核心重构】: 使用 fetch API 和参照您的 streamAnswer 逻辑
    const sendMessage = useCallback(async (text: string) => {
        if (!text.trim() || isSending) return;

        setIsSending(true);
        abortControllerRef.current = new AbortController();

        const newUserMessage: BubbleMessage = {id: `user-${Date.now()}`, role: 'user', content: text, isComplete: true};
        const assistantMsgId = `assistant-${Date.now()}`;

        setMessages(prev => [...prev, newUserMessage, {
            id: assistantMsgId,
            role: 'assistant',
            content: '',
            isThinking: true,
            isComplete: false,
            references: []
        }]);

        const requestBody = {
            // ... (与之前版本相同)
            messages: [...messages, newUserMessage]
                .filter(m => m.role === 'user' || m.isComplete)
                .map(({role, content}) => ({role, content})),
            context: {
                courseId: selectedCourse?.id,
                node: selectedNode,
                skill: selectedSkill,
                thinkingMode: thinkingMode,
            },
        };

        // 【新增】用于最终兜底的变量
        let finalAccumulatedContent = '';
        let doneEventReceived = false;

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/assistant/chat`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json', 'Accept': 'text/event-stream'},
                body: JSON.stringify(requestBody),
                signal: abortControllerRef.current.signal,
                credentials: "include",
            });

            if (!response.body) throw new Error('服务器未返回有效响应体');
            if (!response.ok) {
                // 错误预判逻辑
                const errorText = await response.text();
                try {
                    const errorJson = JSON.parse(errorText);
                    throw new ApiError(errorJson.message || '服务器返回未知业务错误', errorJson.code || response.status);
                } catch (e) {
                    // 如果无法解析为JSON，则抛出原始文本
                    throw new Error(errorText || `请求失败，状态码: ${response.status}`);
                }
            }


            const reader = response.body.getReader();
            const decoder = new TextDecoder("utf-8");
            let buffer = '';


            const processBuffer = () => {
                let eolIndex;
                while ((eolIndex = buffer.indexOf('\n\n')) >= 0) {
                    const messageBlock = buffer.slice(0, eolIndex).trim();
                    buffer = buffer.slice(eolIndex + 2);

                    if (messageBlock.startsWith('event:done')) {
                        const dataLine = messageBlock.split('\n').find(line => line.startsWith('data:'));
                        if (dataLine) {
                            const jsonData = dataLine.substring(5).trim();
                            try {
                                const completeData: AssistantChatCompleteResponse = JSON.parse(jsonData);
                                const references: Reference[] = completeData.references.map((chunk: ChunkVO) => ({
                                    id: chunk.id,
                                    docName: chunk.documentName,
                                    content: chunk.content,
                                    score: chunk.distance ?? 0.85
                                }));
                                finalAccumulatedContent = completeData.fullAnswer;
                                setMessages(prev => prev.map(msg =>
                                    msg.id === assistantMsgId ? {
                                        ...msg,
                                        content: completeData.fullAnswer,
                                        references: references,
                                        metadata: completeData.responseMetadata,
                                        isThinking: false,
                                        isComplete: true
                                    } : msg
                                ));
                                doneEventReceived = true;
                            } catch (e) {
                                console.error("解析 'done' 事件数据失败:", e);
                            }
                        }
                    } else if (messageBlock.startsWith('data:')) {
                        // 【核心修正】: 精确解析多行 data: 的消息块
                        const content = messageBlock
                            .split('\n')
                            .map(line => line.replace(/^data: ?/, '').trim())
                            .join('\n');

                        if (content) {
                            finalAccumulatedContent += content;
                            setMessages(prev => prev.map(msg =>
                                msg.id === assistantMsgId ? {
                                    ...msg,
                                    content: finalAccumulatedContent,
                                    isThinking: true
                                } : msg
                            ));
                        }
                    }
                }
            };

            while (true) {
                const {done, value} = await reader.read();
                if (done) break;
                buffer += decoder.decode(value, {stream: true});
                processBuffer(); // 每次读取到新数据都尝试处理缓冲区
            }
            // 确保流结束后，缓冲区里最后不完整的消息也被处理
            processBuffer();


        } catch (error: any) {
            console.log(error.code)

            showToast({ message: '请先登录再开始对话', type: 'warning' });
            // 打开登录弹窗，并传递一个“登录成功后重新发送消息”的回调
            openAuthModal(() => {
                showToast({message: '登录成功！正在重新为您发送消息...', type: 'success'});
            });

            if (error.name !== 'AbortError') {
                console.error("智能助教流处理失败:", error);
                showToast({message: error.message || '与AI服务的连接中断', type: 'error'});
                finalAccumulatedContent += `\n\n[错误: ${error.message}]`;
            } else {
                console.log('Stream aborted by user.');
                finalAccumulatedContent += "\n\n[用户已中断]";
            }

        } finally {
            // 【核心兜底逻辑】
            // 无论上面发生了什么，只要流结束了，就执行这里的最终化操作
            if (!doneEventReceived) {
                // 如果 `done` 事件因为任何原因（如解析失败）没有被成功处理
                // 我们也要确保UI不会卡住
                setMessages(prev => prev.map(msg =>
                    msg.id === assistantMsgId ? {
                        ...msg,
                        content: finalAccumulatedContent, // 使用已累积的所有内容
                        isThinking: false,
                        isComplete: true, // 强制标记为完成
                    } : msg
                ));
                if (finalAccumulatedContent.includes('[错误:')) {
                    // 如果是错误，就不用显示成功toast了
                } else if (finalAccumulatedContent.includes('[用户已中断]')) {
                    showToast({message: '已停止生成', type: 'info'});
                } else {
                    showToast({message: '生成完成', type: 'success'});
                }
            }

            setIsSending(false);
            setSelectedSkill('');
            abortControllerRef.current = null;
        }
    }, [isSending, messages, selectedCourse, selectedNode, selectedSkill, thinkingMode, showToast]);

    const stopSending = useCallback(() => {
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }
    }, []);

    const clearConversation = useCallback(() => {
        stopSending();
        setMessages([]);
    }, [stopSending]);

    const isLoading = useMemo(() => isLoadingCourses || isLoadingSyllabus, [isLoadingCourses, isLoadingSyllabus]);

    return {
        courses,
        selectedCourse,
        handleSelectCourse,
        syllabus,
        selectedNode,
        handleSelectNode,
        messages,
        isSending,
        sendMessage,
        stopSending,
        clearConversation,
        selectedSkill,
        setSelectedSkill,
        thinkingMode,
        setThinkingMode,
        isLoading,
        error,
    };
};