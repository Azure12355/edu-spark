// src/app/student/(dashboard)/assistant/components/AssistantContainer.tsx
"use client";

import React, { useState, useRef } from 'react';
import Image from 'next/image';

// --- 统一导入所有UI组件和类型 ---
import ChatPanel from '@/components/common/UniversalChatWidget/ChatPanel/ChatPanel';
import ChatHeader from '@/components/common/UniversalChatWidget/ChatHeader/ChatHeader';
import WelcomeScreen from '@/components/common/UniversalChatWidget/WelcomeScreen/WelcomeScreen';
import ChatInputForm from '@/components/common/UniversalChatWidget/ChatInputForm/ChatInputForm';
import SkillSelector from '@/components/common/UniversalChatWidget/SkillSelector/SkillSelector';
import MessageBubble, { BubbleMessage } from '@/components/common/UniversalChatWidget/MessageBubble/MessageBubble';
import { PromptCardData } from '@/components/common/UniversalChatWidget/PromptCard/PromptCard';
import { ReferenceItem } from '@/components/common/UniversalChatWidget/MessageBubble/MessageReferences/MessageReferences';
import ChatFooter from '@/components/common/UniversalChatWidget/ChatFooter/ChatFooter'; // 保留特定组件的路径
import {Skill} from "@/components/common/UniversalChatWidget/SkillSelector/SkillSelector";


// --- 全面的测试数据 ---
const mockMessages: BubbleMessage[] = [
    {
        id: 'user-1',
        role: 'user',
        content: '你好，请帮我解释一下什么是快速排序算法，并用 Python 实现。',
        isComplete: true,
    },
    {
        id: 'assistant-1',
        role: 'assistant',
        content: '当然，快速排序（Quicksort）是一种高效的分治排序算法。\n\n```python\ndef quick_sort(arr):\n    if len(arr) <= 1:\n        return arr\n    pivot = arr[len(arr) // 2]\n    left = [x for x in arr if x < pivot]\n    middle = [x for x in arr if x == pivot]\n    right = [x for x in arr if x > pivot]\n    return quick_sort(left) + middle + quick_sort(right)\n\nprint(quick_sort([3,6,8,10,1,2,1]))\n```',
        thinkingText: "1.  用户需要快速排序的解释和Python代码。\n2.  首先提供简要定义。\n3.  编写一个经典的、使用列表推导式的Python实现。\n4.  提供一个简单的测试用例。",
        isThinking: false,
        isComplete: true,
    },
    {
        id: 'user-2',
        role: 'user',
        content: '这个算法的时间复杂度是多少？',
        isComplete: true,
    },
    {
        id: 'assistant-2',
        role: 'assistant',
        content: '快速排序的平均时间复杂度是 $O(n \\log n)$，这是非常高效的。但在最坏情况下，例如当输入数组已经排序或所有元素相同时，其时间复杂度会退化到 $O(n^2)$。',
        isThinking: false,
        isComplete: true,
    },
    {
        id: 'user-3',
        role: 'user',
        content: '请根据我上传的文档，总结一下核心内容。',
        isComplete: true,
    },
    {
        id: 'assistant-3',
        role: 'assistant',
        content: "根据您提供的《数据结构与算法.pdf》<span class=\"reference-sup\">1</span>和《Web安全基础.docx》<span class=\"reference-sup\">2</span>文档，核心内容总结如下：\n\n- **数据结构与算法**：主要探讨了数组、链表、栈、队列、树和图等基本数据结构，并详细介绍了排序（如快速排序<span class=\"reference-sup\">1</span>）和搜索算法。\n- **Web安全**：重点讲解了XSS、CSRF等常见Web攻击手段及其防御措施<span class=\"reference-sup\">2</span>。",
        references: [
            { type: 'file', title: '数据结构与算法.pdf' },
            { type: 'file', title: 'Web安全基础.docx' },
            { type: 'web', title: '什么是跨站脚本攻击(XSS)? - OWASP', link: '#' }
        ] as ReferenceItem[],
        isThinking: false,
        isComplete: true,
    }
];

// 欢迎界面的数据
const welcomeScreenData = {
    title: "我是您的专属 AI 助教",
    subtitle: "无论是概念辨析、代码编写，还是创意 brainstorm，我都能助您一臂之力。您可以直接提问，或从下面的卡片开始。",
    promptCards: [
        { id: 'prompt-cs', icon: <i className="fas fa-laptop-code"></i>, title: '计算机科学', description: '用 Python语言 编写一个绘制爱心的代码，并解释说明。' },
        { id: 'prompt-history', icon: <i className="fas fa-landmark"></i>, title: '人文历史', description: '比较分析一下古希腊哲学中，柏拉图和亚里士多德在“理念论”上的核心分歧。' },
        { id: 'prompt-science', icon: <i className="fas fa-atom"></i>, title: '数理科学', description: '请推导牛顿第二定律 (F=ma) 在变质量系统中的表达式。' },
        { id: 'prompt-business', icon: <i className="fas fa-chart-pie"></i>, title: '商业经济', description: '为一家新开的咖啡店，设计一个为期三个月的市场营销策略，包含线上和线下活动。' },
    ] as PromptCardData[]
};

// 技能按钮的数据
const availableSkills: Skill[] = [
    { id: 'deep_think', name: '深度思考', icon: <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em"><defs><linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="grad_deep_think"><stop stopColor="#2DD4BF" offset="0%"></stop><stop stop-color="#3B82F6" offset="100%"></stop></linearGradient></defs><path d="M512 992a32 32 0 0 1-14.72-3.84l-384-221.76a32 32 0 0 1-17.28-27.84V285.44a32 32 0 0 1 17.28-27.84l384-221.76a32 32 0 0 1 29.44 0l384 221.76a32 32 0 0 1 17.28 27.84v448.32a32 32 0 0 1-17.28 27.84l-384 221.76A32 32 0 0 1 512 992z m-352-277.44l352 203.2 352-203.2V309.44l-352-203.2-352 203.2zM512 608a32 32 0 1 1 0-64 32 32 0 0 1 0 64z m-160 92.16a32 32 0 1 1 0-64 32 32 0 0 1 0 64z m320 0a32 32 0 1 1 0-64 32 32 0 0 1 0 64z m-160-184.32a32 32 0 1 1 0-64 32 32 0 0 1 0 64z" p-id="4523" fill="url(#grad_deep_think)"></path></svg> },
    { id: 'analyze_research', name: '分析研究', icon: <i style={{color: '#4F46E5'}} className="fas fa-chart-pie"></i> },
    { id: 'code_mode', name: '代码模式', icon: <i style={{color: '#3B82F6'}} className="fas fa-code"></i> },
    { id: 'web_search', name: '联网搜索', icon: <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em"><defs><linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="grad_web_search"><stop stop-color="#A78BFA" offset="0%"></stop><stop stop-color="#3B82F6" offset="100%"></stop></linearGradient></defs><path d="M512 960A448 448 0 1 1 512 64a448 448 0 0 1 0 896z m0-64a384 384 0 1 0 0-768 384 384 0 0 0 0 768z" p-id="1371" fill="url(#grad_web_search)"></path><path d="M512 832c-154.112 0-288.768-100.8-336.704-242.88a32 32 0 1 1 59.52-25.216C275.904 686.08 384.896 768 512 768c127.104 0 236.096-81.92 277.184-204.16a32 32 0 1 1 59.52 25.216C800.768 731.2 666.112 832 512 832z" p-id="1372" fill="url(#grad_web_search)"></path></svg> },
    { id: 'ppt_creation', name: 'PPT创作', icon: <i style={{color: '#EF4444'}} className="fas fa-file-powerpoint"></i> },
    { id: 'command_center', name: '指令中心', icon: <i style={{color: '#8B5CF6'}} className="fas fa-satellite-dish"></i> },
];


/**
 * AssistantContainer 是一个容器组件，
 * 它包含了 AI 助教页面的所有业务逻辑和状态管理。
 */
const AssistantContainer: React.FC = () => {
    // --- 所有 State 和 Ref 都留在这里 ---
    const [messages, setMessages] = useState<BubbleMessage[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [isSending, setIsSending] = useState(false);
    const [showThinkingPanelId, setShowThinkingPanelId] = useState<string | null>(null);
    const [selectedSkill, setSelectedSkill] = useState<string>('');
    const abortControllerRef = useRef<AbortController | null>(null);

    // --- 业务逻辑函数 ---
    const handleSendMessage = async (data: { text: string; mode: string }) => {
        let content = data.text.trim();
        if (!content) return;

        if (selectedSkill) {
            const skillName = availableSkills.find(s => s.id === selectedSkill)?.name || '';
            content = `[使用${skillName}功能] ${content}`;
        }

        setIsSending(true);
        abortControllerRef.current = new AbortController();
        const newUserMessage: BubbleMessage = { id: `user-${Date.now()}`, role: 'user', content: content, isComplete: true };
        const assistantMsgId = `assistant-${Date.now()}`;

        setMessages(prev => [ ...prev, newUserMessage, { id: assistantMsgId, role: 'assistant', content: '', isThinking: true, isComplete: false } ]);
        setInputValue('');
        setSelectedSkill('');

        const apiMessagesHistory = [...messages, newUserMessage].filter(m => m.role === 'user' || m.isComplete).map(({ role, content }) => ({ role, content }));

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: apiMessagesHistory,
                    mode: data.mode,
                    skill: selectedSkill
                }),
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
                        } catch (error) { /* 忽略不完整的JSON块 */ }
                    }
                }
            }

            const thinkStartTag = "<think>";
            const thinkEndTag = "</think>";
            let finalThinkingText: string | null = null;
            let finalDisplayText = accumulatedContent;
            const thinkStartIndex = accumulatedContent.indexOf(thinkStartTag);
            const thinkEndIndex = accumulatedContent.indexOf(thinkEndTag);
            if (thinkStartIndex !== -1 && thinkEndIndex > thinkStartIndex) {
                finalThinkingText = accumulatedContent.substring(thinkStartIndex + thinkStartTag.length, thinkEndIndex).trim();
                finalDisplayText = (accumulatedContent.substring(0, thinkStartIndex) + accumulatedContent.substring(thinkEndIndex + thinkEndTag.length)).trim();
            }

            setMessages(prev => prev.map(msg => msg.id === assistantMsgId ? { ...msg, content: finalDisplayText, thinkingText: finalThinkingText, isThinking: false, isComplete: true } : msg));

        } catch (error: any) {
            if (error.name === 'AbortError') {
                console.log('Fetch aborted by user.');
                setMessages(prev => prev.map(msg => msg.id === assistantMsgId ? { ...msg, content: msg.content + "\n\n[用户已中断]", isThinking: false, isComplete: true } : msg));
            } else {
                console.error("Error handling stream:", error);
                setMessages(prev => prev.map(msg => msg.id === assistantMsgId ? { ...msg, content: `抱歉，处理您的请求时发生了错误。`, isThinking: false, isComplete: true } : msg));
            }
        } finally {
            setIsSending(false);
            abortControllerRef.current = null;
        }
    };

    const handleStopSending = () => abortControllerRef.current?.abort();
    const handleClearChat = () => { setMessages([]); handleStopSending(); };
    const toggleThinkingPanel = (id: string) => setShowThinkingPanelId(prev => (prev === id ? null : id));

    const handleCardClick = (card: PromptCardData) => {
        handleSendMessage({ text: card.description, mode: 'auto' });
    };

    const showWelcome = messages.length === 0;

    const assistantAgent = {
        avatar: <Image src="/robot.gif" alt="Agent 助教" width={36} height={36} />,
        themeColor: 'var(--student-primary)',
    };

    return (
        <ChatPanel
            showWelcome={showWelcome}
            welcomeScreen={
                <WelcomeScreen
                    avatar={<Image src="/robot.gif" alt="Agent 助教" width={80} height={80} priority />}
                    title={welcomeScreenData.title}
                    subtitle={welcomeScreenData.subtitle}
                    promptCards={welcomeScreenData.promptCards}
                    onCardClick={handleCardClick}
                />
            }
            header={
                <ChatHeader
                    title="Agent 助教"
                    avatar={<Image src="/robot.gif" alt="Agent 助教" width={26} height={26} />}
                >
                    <button style={{background: 'none', border: 'none', cursor: 'pointer', color: '#64748b', fontSize: '16px', width: '34px', height: '34px'}} title="加载测试数据" onClick={() => setMessages(mockMessages)}>
                        <i className="fas fa-vial"></i>
                    </button>
                    <button style={{background: 'none', border: 'none', cursor: 'pointer', color: '#64748b', fontSize: '16px', width: '34px', height: '34px'}} title="清空对话" onClick={handleClearChat}>
                        <i className="fas fa-trash-alt"></i>
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
                        showAvatar={false}
                    />
                ))
            }
            skillSelector={
                <SkillSelector
                    skills={availableSkills}
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
    );
};

export default AssistantContainer;