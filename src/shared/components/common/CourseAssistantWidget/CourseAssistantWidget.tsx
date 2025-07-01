// src/components/common/CourseAssistantWidget/CourseAssistantWidget.tsx
"use client";

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './CourseAssistantWidget.module.css';

// --- 统一导入所有需要的通用组件和类型 ---
import ChatPanel from '@/widgets/chat/UniversalChatWidget/ChatPanel/ChatPanel';
import ChatHeader from '@/widgets/chat/UniversalChatWidget/ChatHeader/ChatHeader';
import WelcomeScreen from '@/widgets/chat/UniversalChatWidget/WelcomeScreen/WelcomeScreen';
import { PromptCardData } from '@/widgets/chat/UniversalChatWidget/PromptCard/PromptCard';
import ChatInputForm from '@/widgets/chat/UniversalChatWidget/ChatInputForm/ChatInputForm';
import SkillSelector from '@/widgets/chat/UniversalChatWidget/SkillSelector/SkillSelector';
import MessageBubble, { BubbleMessage } from '@/widgets/chat/UniversalChatWidget/MessageBubble/MessageBubble';
import ChatFooter from '@/widgets/chat/UniversalChatWidget/ChatFooter/ChatFooter';
import {Skill} from "@/widgets/chat/UniversalChatWidget/SkillSelector/SkillSelector";

// --- 统一导入所有数据 ---
import { useToast } from '@/shared/hooks/useToast';

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



interface CourseAssistantWidgetProps {
  isOpen: boolean;
  onClose: () => void;
}

const CourseAssistantWidget: React.FC<CourseAssistantWidgetProps> = ({ isOpen, onClose }) => {
  // --- 业务逻辑和状态管理 ---
  const [messages, setMessages] = useState<BubbleMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [showThinkingPanelId, setShowThinkingPanelId] = useState<string | null>(null);
  const [selectedSkill, setSelectedSkill] = useState<string>('');
  const abortControllerRef = useRef<AbortController | null>(null);
  const showToast = useToast();

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
        setMessages(prev => prev.map(msg => msg.id === assistantMsgId ? { ...msg, content: (msg.content || '') + "\n\n[用户已中断]", isThinking: false, isComplete: true } : msg));
      } else {
        console.error("Error handling stream:", error);
        showToast({ message: "请求出错，请稍后重试", type: 'error' });
        setMessages(prev => prev.filter(msg => msg.id !== assistantMsgId)); // 出错时直接移除AI的空消息
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

  // AI 助手 Agent 的定义
  const assistantAgent = {
    avatar: <Image src="/images/Chat/robot.png" alt="Agent 助教" width={36} height={36} />,
    themeColor: 'var(--user-bubble-bg)',
  };

  const widgetVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", damping: 20, stiffness: 200 } },
    exit: { opacity: 0, y: 20, scale: 0.98, transition: { duration: 0.2 } },
  };

  return (
      <AnimatePresence>
        {isOpen && (
            <motion.div
                className={`${styles.chatbotWidget} ${isMaximized ? styles.maximized : ''}`}
                variants={widgetVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
            >
              <ChatPanel
                  showWelcome={showWelcome}
                  welcomeScreen={
                    <WelcomeScreen
                        avatar={<Image src="/images/Chat/robot.png" alt="智能助教" width={80} height={80} priority />}
                        title={welcomeScreenData.title}
                        subtitle={welcomeScreenData.subtitle}
                        promptCards={welcomeScreenData.promptCards}
                        onCardClick={handleCardClick}
                    />
                  }
                  header={
                    <ChatHeader
                        title="EduSpark 智能助教"
                        avatar={<Image src="/images/Chat/robot.png" alt="智能助教" width={26} height={26} />}
                    >
                      <button onClick={() => setIsMaximized(!isMaximized)} className={styles.controlButton} title={isMaximized ? "还原" : "最大化"}>
                        <i className={`fas ${isMaximized ? 'fa-compress-alt' : 'fa-expand-alt'}`}></i>
                      </button>
                      <button onClick={onClose} className={styles.controlButton} title="关闭">
                        <i className="fas fa-times"></i>
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
            </motion.div>
        )}
      </AnimatePresence>
  );
};

export default CourseAssistantWidget;