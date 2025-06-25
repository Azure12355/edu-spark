// src/app/teacher/assistant/page.tsx
"use client";

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import styles from './assistant.module.css';

// 导入所有需要的组件
import ChatSidebar from '@/components/common/UniversalChatWidget/ChatSidebar/ChatSidebar';
import ChatPanel from '@/components/common/UniversalChatWidget/ChatPanel/ChatPanel';
import ChatHeader from '@/components/common/UniversalChatWidget/ChatHeader/ChatHeader';
import WelcomeScreen from '@/components/common/UniversalChatWidget/WelcomeScreen/WelcomeScreen';
import ChatInputForm from '@/components/common/UniversalChatWidget/ChatInputForm/ChatInputForm';
import SkillSelector, { Skill } from '@/components/common/UniversalChatWidget/SkillSelector/SkillSelector';
import MessageBubble, { BubbleMessage } from '@/components/common/UniversalChatWidget/MessageBubble/MessageBubble';
import { PromptCardData } from '@/components/common/UniversalChatWidget/PromptCard/PromptCard';
import ChatFooter from '@/components/common/UniversalChatWidget/ChatFooter/ChatFooter';
import { useToast } from '@/hooks/useToast';

// 模拟数据 (保持不变)
const teacherWelcomeData = {
    title: "我是您的专属备课助教",
    subtitle: "从课程设计、教案生成到题目创作，我能为您提供全方位的教学支持。您可以直接提问，或从下面的卡片开始。",
    promptCards: [
        { id: 'gen-syllabus', icon: <i className="fas fa-sitemap"></i>, title: '生成教学大纲', description: '为《计算机网络》课程生成一份为期16周的教学大纲，包含每周主题和关键知识点。' },
        { id: 'create-exam', icon: <i className="fas fa-file-signature"></i>, title: '创建测验题目', description: '围绕“操作系统中的进程与线程”，出5道选择题和2道简答题，并提供答案和解析。' },
        { id: 'design-case', icon: <i className="fas fa-lightbulb"></i>, title: '设计教学案例', description: '设计一个生动的案例，用于解释“市场营销中的4P理论”。' },
        { id: 'write-script', icon: <i className="fas fa-film"></i>, title: '撰写讲解脚本', description: '为一段5分钟的，讲解“光合作用过程”的教学视频，撰写一份讲解稿。' },
    ] as PromptCardData[]
};
const teacherSkills: Skill[] = [
    { id: 'lesson_plan', name: '教案生成', icon: <i style={{color: '#3B82F6'}} className="fas fa-book-open"></i> },
    { id: 'exam_creation', name: '题目生成', icon: <i style={{color: '#10B981'}} className="fas fa-question-circle"></i> },
    { id: 'ppt_outline', name: 'PPT大纲', icon: <i style={{color: '#F97316'}} className="fas fa-file-powerpoint"></i> },
    { id: 'course_design', name: '课程设计', icon: <i style={{color: '#8B5CF6'}} className="fas fa-drafting-compass"></i> },
    { id: 'knowledge_graph', name: '知识图谱', icon: <i style={{color: '#EF4444'}} className="fas fa-project-diagram"></i> },
];


export default function TeacherAssistantPage() {
    // 对话逻辑 (保持不变)
    const [messages, setMessages] = useState<BubbleMessage[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [isSending, setIsSending] = useState(false);
    const [showThinkingPanelId, setShowThinkingPanelId] = useState<string | null>(null);
    const [selectedSkill, setSelectedSkill] = useState<string>('');
    const abortControllerRef = useRef<AbortController | null>(null);
    const showToast = useToast();

    const handleSendMessage = async (data: { text: string; mode: any }) => {
        let content = data.text.trim();
        if (!content) return;

        const skillName = teacherSkills.find(s => s.id === selectedSkill)?.name || '';
        if (skillName) {
            content = `[使用${skillName}功能] ${content}`;
        }

        setIsSending(true);
        abortControllerRef.current = new AbortController();
        const newUserMessage: BubbleMessage = { id: `user-${Date.now()}`, role: 'user', content, isComplete: true };
        const assistantMsgId = `assistant-${Date.now()}`;

        const currentMessages = [...messages, newUserMessage];
        setMessages([...currentMessages, { id: assistantMsgId, role: 'assistant', content: '', isThinking: true, isComplete: false }]);
        setInputValue('');
        setSelectedSkill('');

        const apiMessagesHistory = currentMessages.filter(m => m.role === 'user' || m.isComplete).map(({ role, content }) => ({ role, content }));

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: apiMessagesHistory }),
                signal: abortControllerRef.current.signal,
            });

            if (!response.ok || !response.body) throw new Error('API request failed');

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let accumulatedContent = '';

            while (true) {
                const { value, done } = await reader.read();
                if (done) break;
                const chunk = decoder.decode(value, { stream: true });
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
                                setMessages(prev => prev.map(msg => msg.id === assistantMsgId ? { ...msg, content: accumulatedContent, isThinking: true } : msg));
                            }
                        } catch (e) { /* ignore */ }
                    }
                }
            }
            setMessages(prev => prev.map(msg => msg.id === assistantMsgId ? { ...msg, content: accumulatedContent, isThinking: false, isComplete: true } : msg));
        } catch (error: any) {
            if (error.name !== 'AbortError') {
                showToast({ message: "请求出错，请稍后重试", type: 'error' });
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
    const handleCardClick = (card: PromptCardData) => handleSendMessage({ text: card.description, mode: 'auto' });

    const showWelcome = messages.length === 0;

    const assistantAgent = {
        avatar: <Image src="/robot.gif" alt="智能助教" width={36} height={36} style={{borderRadius: '50%'}}/>,
        themeColor: '#8B5CF6',
    };

    return (
        <div className={styles.pageContainer}>
            <ChatSidebar />
            <div className={styles.chatPanelContainer}>
                <ChatPanel
                    overrideClassName={styles.chatPanelOverride}
                    showWelcome={showWelcome}
                    welcomeScreen={
                        <WelcomeScreen
                            avatar={<Image src="/robot.gif" alt="智能助教" width={80} height={80} priority style={{borderRadius: '50%'}}/>}
                            title={teacherWelcomeData.title}
                            subtitle={teacherWelcomeData.subtitle}
                            promptCards={teacherWelcomeData.promptCards}
                            onCardClick={handleCardClick}
                        />
                    }
                    header={
                        <ChatHeader
                            title="智能备课助教"
                            avatar={<Image src="/robot.gif" alt="智能助教" width={28} height={28} style={{borderRadius: '50%'}}/>}
                        >
                            <button onClick={handleClearChat} style={{background: 'none', border: 'none', cursor: 'pointer', color: '#64748b', fontSize: '16px', width: '34px', height: '34px'}} title="新对话">
                                <i className="far fa-plus-square"></i>
                            </button>
                        </ChatHeader>
                    }
                    chatContent={
                        messages.map(msg => (
                            <MessageBubble
                                key={msg.id}
                                message={{ ...msg, agent: msg.role === 'assistant' ? assistantAgent : undefined }}
                                isThinkingPanelOpen={showThinkingPanelId === msg.id}
                                onToggleThinkingPanel={toggleThinkingPanel}
                                showAvatar={true}
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
                    footer={<ChatFooter />}
                />
            </div>
        </div>
    );
}