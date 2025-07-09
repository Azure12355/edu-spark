// [!file src/features/teacher/assistant/AssistantPage.tsx]
"use client";

import React, {useRef, useState} from 'react';
import Image from 'next/image';
import styles from './Assistant.module.css';

// 导入所有需要的通用组件
import ChatSidebar from '@/widgets/chat/UniversalChatWidget/ChatSidebar/ChatSidebar';
import ChatPanel from '@/widgets/chat/UniversalChatWidget/ChatPanel/ChatPanel';
import WelcomeScreen from '@/widgets/chat/UniversalChatWidget/WelcomeScreen/WelcomeScreen';
import MessageBubble, {BubbleMessage} from '@/widgets/chat/UniversalChatWidget/MessageBubble/MessageBubble';
import {PromptCardData} from '@/widgets/chat/UniversalChatWidget/PromptCard/PromptCard';
import ChatInputForm from '@/widgets/chat/UniversalChatWidget/ChatInputForm/ChatInputForm';
import SkillSelector, {Skill} from '@/widgets/chat/UniversalChatWidget/SkillSelector/SkillSelector';
import ChatFooter from '@/widgets/chat/UniversalChatWidget/ChatFooter/ChatFooter';
import {useToast} from '@/shared/hooks/useToast';

// --- 核心改造：导入课程选择相关组件和新的 Hook ---
import CourseSelectionModal
    from '@/features/teacher/assistant/ai-assistant/components/CourseSelectionModal/CourseSelectionModal';
/* [code focus start ++] */
// 1. 导入新创建的 Hook
import {useTeacherAssistant} from '@/features/teacher/assistant/ai-assistant/hooks/useTeacherAssistant';
/* [code focus end ++] */
import {CourseVO} from "@/shared/types";


// 原有的模拟数据
const teacherWelcomeData = {
    title: "我是您的专属课程智能体",
    subtitle: "我已加载了当前课程的知识库。您可以就本课程的任何内容向我提问，或使用下方的快捷指令开始.\n教学灵感，此刻触手可及 ✨",
    promptCards: [
        {
            id: 'summarize-keypoints',
            icon: <i className="fas fa-project-diagram"></i>,
            title: '总结核心概念',
            description: '总结一下本课程中关于“TCP三次握手”的核心知识点。'
        },
        {
            id: 'explain-difference',
            icon: <i className="fas fa-exchange-alt"></i>,
            title: '比较概念异同',
            description: '比较一下“进程”与“线程”这两个概念的定义、优缺点和适用场景。'
        },
        {
            id: 'generate-questions',
            icon: <i className="fas fa-question-circle"></i>,
            title: '生成练习题',
            description: '围绕“动态规划”这个知识点，帮我出3道难度中等的编程题。'
        },
        {
            id: 'provide-example',
            icon: <i className="fas fa-laptop-code"></i>,
            title: '提供代码示例',
            description: '用Java语言提供一个“单例模式”的懒汉式和饿汉式实现代码。'
        },
        {
            id: 'create-analogy',
            icon: <i className="fas fa-lightbulb"></i>,
            title: '创建生动比喻',
            description: '用一个生动、易于理解的比喻来解释什么是“HTTP的无状态性”。'
        },
        {
            id: 'design-activity',
            icon: <i className="fas fa-users"></i>,
            title: '设计课堂活动',
            description: '为讲解“OSI七层模型”设计一个持续15分钟的课堂互动活动。'
        }
    ] as PromptCardData[]
};
export const teacherSkills: Skill[] = [
    {
        id: 'lesson_plan_generation',
        name: '智能备课',
        icon: <i style={{color: '#2F7BFF'}} className="fas fa-book-open"></i>
    },
    {
        id: 'question_generation',
        name: '题目生成',
        icon: <i style={{color: '#16A34A'}} className="fas fa-question-circle"></i>
    },
    {
        id: 'ppt_outline_creation',
        name: 'PPT大纲',
        icon: <i style={{color: '#F97316'}} className="fas fa-file-powerpoint"></i>
    },
    {
        id: 'case_study_design',
        name: '案例设计',
        icon: <i style={{color: '#8B5CF6'}} className="fas fa-lightbulb"></i>
    },
    {
        id: 'grading_assistant',
        name: '作业批改',
        icon: <i style={{color: '#EF4444'}} className="fas fa-marker"></i>
    },
    {
        id: 'feedback_generator',
        name: '评语生成',
        icon: <i style={{color: '#34D399'}} className="fas fa-comment-dots"></i>
    },
    {
        id: 'knowledge_summary',
        name: '知识点总结',
        icon: <i style={{color: '#6366F1'}} className="fas fa-book-reader"></i>
    },
    {
        id: 'resource_recommendation',
        name: '教学资源推荐',
        icon: <i style={{color: '#0EA5E9'}} className="fas fa-globe"></i>
    },
    {
        id: 'learning_path_design',
        name: '设计学习路径',
        icon: <i style={{color: '#D946EF'}} className="fas fa-route"></i>
    },
    {
        id: 'simulation_script',
        name: '实训脚本生成',
        icon: <i style={{color: '#64748B'}} className="fas fa-terminal"></i>
    }
];


export default function AssistantPage() {

    const {
        courses,
        selectedCourse,
        handleSelectCourse,
        syllabus,
        selectedNode,
        handleSelectNode,
        isLoading,
        error,
    } = useTeacherAssistant();

    const [isModalOpen, setIsModalOpen] = useState(false);

    // 原有的对话状态
    const [messages, setMessages] = useState<BubbleMessage[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [isSending, setIsSending] = useState(false);
    const [showThinkingPanelId, setShowThinkingPanelId] = useState<string | null>(null);
    const [selectedSkill, setSelectedSkill] = useState<string>('');
    const abortControllerRef = useRef<AbortController | null>(null);
    const showToast = useToast();

    // 原有的对话处理逻辑
    const handleSendMessage = async (data: { text: string; mode: any }) => {
        let content = data.text.trim();
        if (!content) return;

        const skillName = teacherSkills.find(s => s.id === selectedSkill)?.name || '';
        if (skillName) {
            content = `[使用${skillName}功能] ${content}`;
        }

        // 在发送消息时，附带当前课程和知识点上下文
        const contextMessage = `当前课程: ${selectedCourse?.name || '无'}\n当前知识点: ${selectedNode?.name || '整个课程'}\n\n用户提问: ${content}`;
        console.log("发送包含上下文的消息:", contextMessage);

        setIsSending(true);
        abortControllerRef.current = new AbortController();
        const newUserMessage: BubbleMessage = {id: `user-${Date.now()}`, role: 'user', content, isComplete: true};
        const assistantMsgId = `assistant-${Date.now()}`;

        const currentMessages = [...messages, newUserMessage];
        setMessages([...currentMessages, {
            id: assistantMsgId,
            role: 'assistant',
            content: '',
            isThinking: true,
            isComplete: false
        }]);
        setInputValue('');
        setSelectedSkill('');

        const apiMessagesHistory = currentMessages.filter(m => m.role === 'user' || m.isComplete).map(({
                                                                                                           role,
                                                                                                           content
                                                                                                       }) => ({
            role,
            content
        }));

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    messages: apiMessagesHistory,
                    courseId: selectedCourse?.id,
                    /* [code focus start ++] */
                    // 传递选中的知识节点信息
                    contextNode: selectedNode,
                    /* [code focus end ++] */
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
            abortControllerRef.current = null;
        }
    };

    const handleStopSending = () => abortControllerRef.current?.abort();
    const handleClearChat = () => setMessages([]);
    const toggleThinkingPanel = (id: string) => setShowThinkingPanelId(prev => (prev === id ? null : id));
    const handleCardClick = (card: PromptCardData) => handleSendMessage({text: card.description, mode: 'auto'});

    const showWelcome = messages.length === 0;

    const assistantAgent = {
        avatar: <Image src="/robot.gif" alt="智能助教" width={36} height={36} style={{borderRadius: '50%'}}/>,
        themeColor: '#8B5CF6',
    };

    return (
        <div className={styles.pageContainer}>
            <ChatSidebar
                currentCourse={selectedCourse}
                onCourseSelectClick={() => setIsModalOpen(true)}
                onNewChatClick={handleClearChat}
                syllabus={syllabus}
                selectedNode={selectedNode}
                onNodeSelect={handleSelectNode}
                isLoading={isLoading}
            />

            <div className={styles.chatPanelContainer}>
                <ChatPanel
                    overrideClassName={styles.chatPanelOverride}
                    showWelcome={showWelcome}
                    welcomeScreen={
                        <WelcomeScreen
                            avatar={<Image src="/robot.gif" alt="智能助教" width={80} height={80} priority
                                           style={{borderRadius: '50%'}}/>}
                            title={teacherWelcomeData.title}
                            subtitle={teacherWelcomeData.subtitle}
                            promptCards={teacherWelcomeData.promptCards}
                            onCardClick={handleCardClick}
                        />
                    }
                    chatContent={
                        messages.map(msg => (
                            <MessageBubble
                                key={msg.id}
                                message={{...msg, agent: msg.role === 'assistant' ? assistantAgent : undefined}}
                                isThinkingPanelOpen={showThinkingPanelId === msg.id}
                                onToggleThinkingPanel={toggleThinkingPanel}
                                showAvatar={false}
                            />
                        ))
                    }
                    skillSelector={
                        <SkillSelector
                            skills={teacherSkills}
                            selectedSkillId={selectedSkill}
                            onSkillSelect={setSelectedSkill}
                        />
                    }
                    inputForm={
                        <ChatInputForm
                            inputValue={inputValue}
                            onInputChange={setInputValue}
                            onSubmit={handleSendMessage}
                            isSending={isSending}
                            onStop={handleStopSending}
                            shouldFocus={!showWelcome}
                        />
                    }
                    footer={<ChatFooter/>}
                />
            </div>

            <CourseSelectionModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                courses={courses}
                selectedCourse={selectedCourse}
                onSelectCourse={handleSelectCourse}
                /* [code focus start ++] */
                isLoading={isLoading} // Pass the loading state here
                /* [code focus end ++] */
            />
        </div>
    );
}