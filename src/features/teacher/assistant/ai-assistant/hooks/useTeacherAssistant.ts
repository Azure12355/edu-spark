// [!file src/features/teacher/assistant/ai-assistant/hooks/useTeacherAssistant.ts]
import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { CourseVO, SyllabusVO } from '@/shared/types';
import { listCourseVOByPage } from '@/shared/services/courseService';
import { getSyllabusByCourseId } from '@/shared/services/syllabusService';
import { useToast } from '@/shared/hooks/useToast';
import { BubbleMessage } from '@/widgets/chat/UniversalChatWidget/MessageBubble/MessageBubble';

// 定义知识树中选中的节点类型
export interface SelectedNode {
    id: number | string;
    type: 'course' | 'chapter' | 'section' | 'point';
    name: string;
}

/* [code focus start ++] */
// 定义模型思考方式的类型
export type ThinkingMode = 'auto' | 'on' | 'off';
/* [code focus end ++] */


export const useTeacherAssistant = () => {
    // --- 1. 上下文管理状态 (课程、大纲) ---
    const [courses, setCourses] = useState<CourseVO[]>([]);
    const [selectedCourse, setSelectedCourse] = useState<CourseVO | null>(null);
    const [syllabus, setSyllabus] = useState<SyllabusVO | null>(null);
    const [selectedNode, setSelectedNode] = useState<SelectedNode | null>(null);

    /* [code focus start ++] */
    // --- 2. 对话与参数管理状态 ---
    const [messages, setMessages] = useState<BubbleMessage[]>([]);
    const [isSending, setIsSending] = useState(false);
    const [selectedSkill, setSelectedSkill] = useState<string>('');
    const [thinkingMode, setThinkingMode] = useState<ThinkingMode>('auto');
    const abortControllerRef = useRef<AbortController | null>(null);
    /* [code focus end ++] */

    // --- 3. 加载与错误状态 ---
    const [isLoadingCourses, setIsLoadingCourses] = useState(true);
    const [isLoadingSyllabus, setIsLoadingSyllabus] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const showToast = useToast();

    // ... (获取课程和教学大纲的 useEffect 保持不变) ...
    useEffect(() => {
        const fetchCourses = async () => {
            setIsLoadingCourses(true);
            setError(null);
            try {
                const coursePage = await listCourseVOByPage({ current: 1, pageSize: 999 });
                if (coursePage.records && coursePage.records.length > 0) {
                    setCourses(coursePage.records);
                    setSelectedCourse(coursePage.records[0]);
                } else {
                    setCourses([]);
                    setSelectedCourse(null);
                    showToast({ message: "您还没有创建任何课程", type: 'info' });
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
                setSelectedNode({ id: selectedCourse.id, type: 'course', name: `整个课程: ${selectedCourse.name}`});
            } catch (e: any) {
                setError('获取教学大纲失败，请稍后重试。');
            } finally {
                setIsLoadingSyllabus(false);
            }
        };
        fetchSyllabus();
    }, [selectedCourse]);

    // --- 4. 封装所有对外暴露的业务方法 ---

    // 切换课程
    const handleSelectCourse = useCallback((course: CourseVO) => {
        if (course.id !== selectedCourse?.id) {
            showToast({ message: `已切换到《${course.name}》课程`, type: 'info' });
            setSelectedCourse(course);
            setMessages([]); // 切换课程时清空对话
        }
    }, [selectedCourse, showToast]);

    // 选择知识节点
    const handleSelectNode = useCallback((node: SelectedNode) => {
        setSelectedNode(node);
        showToast({ message: `上下文已切换到: ${node.name}`, type: 'info' });
    }, [showToast]);

    /* [code focus start ++] */
    // 清空对话
    const clearConversation = useCallback(() => {
        setMessages([]);
        abortControllerRef.current?.abort(); // 如果正在发送，则中断
    }, []);

    // 发送消息 (核心API调用逻辑)
    const sendMessage = useCallback(async (text: string) => {
        if (!text.trim()) return;

        setIsSending(true);
        abortControllerRef.current = new AbortController();

        const newUserMessage: BubbleMessage = {id: `user-${Date.now()}`, role: 'user', content: text, isComplete: true};
        const assistantMsgId = `assistant-${Date.now()}`;

        // 立即更新UI，展示用户消息和AI的思考状态
        setMessages(prev => [...prev, newUserMessage, {
            id: assistantMsgId,
            role: 'assistant',
            content: '',
            isThinking: true,
            isComplete: false
        }]);

        // 准备API请求历史
        const apiMessagesHistory = [...messages, newUserMessage]
            .filter(m => m.role === 'user' || m.isComplete)
            .map(({role, content}) => ({role, content}));

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    messages: apiMessagesHistory,
                    context: {
                        courseId: selectedCourse?.id,
                        node: selectedNode,
                        skill: selectedSkill,
                        thinkingMode: thinkingMode
                    }
                }),
                signal: abortControllerRef.current.signal,
            });

            if (!response.ok || !response.body) throw new Error('API request failed');

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let accumulatedContent = '';

            while (true) {
                const {value, done} = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value, {stream: true});
                const lines = chunk.split('\n\n');

                for (const line of lines) {
                    if (line.startsWith('data: ')) {
                        const jsonDataString = line.substring('data: '.length).trim();
                        if (jsonDataString === '[DONE]') break;
                        try {
                            const parsedChunk = JSON.parse(jsonDataString);
                            const deltaContent = parsedChunk.choices?.[0]?.delta?.content || '';
                            if (deltaContent) {
                                accumulatedContent += deltaContent;
                                setMessages(prev => prev.map(msg => msg.id === assistantMsgId ? {
                                    ...msg,
                                    content: accumulatedContent,
                                    isThinking: true
                                } : msg));
                            }
                        } catch (e) { /* ignore */
                        }
                    }
                }
            }

            setMessages(prev => prev.map(msg => msg.id === assistantMsgId ? {
                ...msg,
                content: accumulatedContent,
                isThinking: false,
                isComplete: true
            } : msg));

        } catch (error: any) {
            if (error.name !== 'AbortError') {
                showToast({message: "请求出错，请稍后重试", type: 'error'});
                setMessages(prev => prev.filter(msg => msg.id !== assistantMsgId));
            }
        } finally {
            setIsSending(false);
            setSelectedSkill(''); // 发送后清空技能选择
            abortControllerRef.current = null;
        }

    }, [messages, selectedCourse, selectedNode, selectedSkill, thinkingMode, showToast]);

    // 中断消息发送
    const stopSending = useCallback(() => {
        abortControllerRef.current?.abort();
    }, []);

    // --- 5. 组合最终的加载状态 ---
    const isLoading = useMemo(() => isLoadingCourses || isLoadingSyllabus, [isLoadingCourses, isLoadingSyllabus]);

    // --- 6. 返回所有UI需要的状态和方法 ---
    return {
        // 上下文相关
        courses,
        selectedCourse,
        handleSelectCourse,
        syllabus,
        selectedNode,
        handleSelectNode,
        // 对话相关
        messages,
        isSending,
        sendMessage,
        stopSending,
        clearConversation,
        // 参数相关
        selectedSkill,
        setSelectedSkill, // 直接暴露 setter
        thinkingMode,
        setThinkingMode,   // 直接暴露 setter
        // 全局状态
        isLoading,
        error,
    };
    /* [code focus end ++] */
};