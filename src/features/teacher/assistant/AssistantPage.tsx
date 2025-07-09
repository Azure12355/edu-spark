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
    // --- 1. 从 Hook 中解构出所有需要用到的状态和方法 ---
    const {
        courses,
        selectedCourse,
        handleSelectCourse,
        syllabus,
        selectedNode,
        handleSelectNode,
        isLoading,
        messages,
        isSending,
        sendMessage,
        stopSending,
        clearConversation,
        selectedSkill,
        setSelectedSkill,
        // thinkingMode 和 setThinkingMode 暂时还未使用，后续会用到
    } = useTeacherAssistant();

    // 弹窗的开关状态，这是纯UI状态，可以保留在组件中
    const [isModalOpen, setIsModalOpen] = useState(false);
    // 输入框的值，这也是纯UI状态
    const [inputValue, setInputValue] = useState('');
    // 控制思考面板的显示，纯UI状态
    const [showThinkingPanelId, setShowThinkingPanelId] = useState<string | null>(null);

    // --- 2. 移除所有本地业务逻辑和状态管理 (useState, useRef for abort, handleSendMessage) ---

    // 简单的提交处理函数
    const handleSubmit = async (data: { text: string; mode: any }) => {
        // 调用 Hook 中的 sendMessage 方法
        await sendMessage(data.text);
        setInputValue(''); // 发送后清空输入框
    };

    const handleCardClick = (card: PromptCardData) => {
        sendMessage(card.description);
    };

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
                onNewChatClick={clearConversation} // 使用 Hook 中的方法
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
                            avatar={<Image src="/robot.gif" alt="智能助教" width={80} height={80} priority style={{borderRadius: '50%'}}/>}
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
                                message={{ ...msg, agent: msg.role === 'assistant' ? assistantAgent : undefined }}
                                isThinkingPanelOpen={showThinkingPanelId === msg.id}
                                onToggleThinkingPanel={() => setShowThinkingPanelId(prev => prev === msg.id ? null : msg.id)}
                                showAvatar={false}
                            />
                        ))
                    }
                    skillSelector={
                        <SkillSelector
                            skills={teacherSkills}
                            selectedSkillId={selectedSkill}
                            onSkillSelect={setSelectedSkill} // 使用 Hook 中的方法
                        />
                    }
                    inputForm={
                        <ChatInputForm
                            inputValue={inputValue}
                            onInputChange={setInputValue}
                            onSubmit={handleSubmit} // 使用新的提交处理函数
                            isSending={isSending}
                            onStop={stopSending} // 使用 Hook 中的方法
                            shouldFocus={!showWelcome}
                        />
                    }
                    footer={<ChatFooter />}
                />
            </div>

            <CourseSelectionModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                courses={courses}
                selectedCourse={selectedCourse}
                onSelectCourse={(course) => handleSelectCourse(course as CourseVO)}
                isLoading={isLoading}
            />
        </div>
    );
}