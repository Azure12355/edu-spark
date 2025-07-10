/* [!file src/features/student/home/components/HeroSection/HeroSection.tsx] */
// [code focus start ++]
"use client";

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import styles from './HeroSection.module.css';
import {event} from "next/dist/build/output/log";

// 定义语音识别API的接口类型
interface SpeechRecognition extends EventTarget {
    continuous: boolean;
    interimResults: boolean;
    lang: string;
    onresult: (event: any) => void;
    onerror: (event: any) => void;
    onend: () => void;
    start(): void;
    stop(): void;
}
declare var SpeechRecognition: { new(): SpeechRecognition; };
declare var webkitSpeechRecognition: { new(): SpeechRecognition; };

// 建议标签的数据
const suggestionTags = [
    { text: "AI生成教案", icon: "fas fa-file-alt", color: "#3B82F6" },
    { text: "智能出题", icon: "fas fa-puzzle-piece", color: "#10B981" },
    { text: "知识点梳理", icon: "fas fa-lightbulb", color: "#F59E0B" },
    { text: "代码 Debug", icon: "fas fa-bug", color: "#EF4444" },
    { text: "论文润色", icon: "fas fa-pen-fancy", color: "#8B5CF6" },
];

// 1. 定义动画变体
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15, // 子元素依次入场，间隔0.15秒
            delayChildren: 0.2,    // 容器延迟0.2秒后开始执行子动画
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 30, filter: 'blur(5px)' }, // 初始状态：透明、下方30px、模糊
    visible: {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: {
            type: 'spring',
            damping: 15,
            stiffness: 100,
        },
    },
};

const formVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            type: 'spring',
            damping: 20,
            stiffness: 100,
            delay: 0.1, // 让搜索框比标题稍晚出现
        },
    },
};

const HeroSection = () => {
    const [inputValue, setInputValue] = useState('');
    const [isListening, setIsListening] = useState(false);
    const [isSpeechSupported, setIsSpeechSupported] = useState(false);
    const recognitionRef = useRef<SpeechRecognition | null>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const router = useRouter();

    // 初始化语音识别API
    useEffect(() => {
        if (typeof window !== 'undefined') {
            //@ts-ignore
            const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
            if (SpeechRecognitionAPI) {
                setIsSpeechSupported(true);
                const recognition = new SpeechRecognitionAPI();
                recognition.continuous = true;
                recognition.interimResults = true;
                recognition.lang = 'zh-CN';

                recognition.onresult = (event: any) => {
                    let finalTranscript = '';
                    for (let i = event.resultIndex; i < event.results.length; ++i) {
                        if (event.results[i].isFinal) {
                            finalTranscript += event.results[i][0].transcript;
                        }
                    }
                    if (finalTranscript) {
                        setInputValue(prev => prev + finalTranscript);
                    }
                };
                recognition.onerror = () => setIsListening(false);
                recognition.onend = () => setIsListening(false);
                recognitionRef.current = recognition;
            }
        }
    }, []);

    // 文本域高度自适应
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [inputValue]);

    const handleToggleListening = () => {
        if (isListening) {
            recognitionRef.current?.stop();
        } else {
            recognitionRef.current?.start();
        }
        setIsListening(!isListening);
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputValue.trim()) return;
        const encodedQuery = encodeURIComponent(inputValue);
        router.push(`/student/assistant?q=${encodedQuery}`);
    };

    const handleSuggestionClick = (text: string) => {
        setInputValue(text);
        textareaRef.current?.focus();
    };

    return (
        // [code focus start ++]
        // 2. 将动画变体应用到 section 容器
        <motion.section
            className={styles.heroSection}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {/* [code focus end ++] */}
            <motion.h1 className={styles.mainTitle} variants={itemVariants}>EduSpark</motion.h1>

            {/* 3. 为每个核心元素应用 itemVariants */}
            <motion.h1 className={styles.heroTitle} variants={itemVariants}>
                开启你的 <span>AI 智能学习</span> 新纪元
            </motion.h1>

            {/* 4. 为表单应用独特的 formVariants */}
            <motion.form className={styles.searchForm} onSubmit={handleFormSubmit} variants={formVariants}>
                <textarea
                    ref={textareaRef}
                    className={styles.inputField}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="向我提问任何问题，例如：用生活中的例子解释“递归”"
                    rows={1}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleFormSubmit(e);
                        }
                    }}
                    disabled={isListening}
                />
                <div className={styles.actionsToolbar}>
                    {isSpeechSupported && (
                        <motion.button
                            type="button"
                            className={`${styles.toolButton} ${isListening ? styles.listening : ''}`}
                            title="语音输入"
                            onClick={handleToggleListening}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <i className="fas fa-microphone"></i>
                        </motion.button>
                    )}
                    <motion.button
                        type="submit"
                        className={styles.submitButton}
                        disabled={!inputValue.trim()}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        title="立即提问"
                    >
                        <i className="fas fa-arrow-up"></i>
                    </motion.button>
                </div>
            </motion.form>

            {/* 5. 为建议标签的容器也应用 itemVariants */}
            <motion.div className={styles.suggestionTags} variants={itemVariants}>
                {suggestionTags.map(tag => (
                    <button
                        type="button"
                        key={tag.text}
                        className={styles.suggestionTag}
                        style={{ '--tag-bg-color': `${tag.color}20`, '--tag-text-color': tag.color } as React.CSSProperties}
                        onClick={() => handleSuggestionClick(tag.text)}
                    >
                        <i className={tag.icon}></i>
                        <span>{tag.text}</span>
                    </button>
                ))}
            </motion.div>
            {/* [code focus start ++] */}
        </motion.section>
        // [code focus end ++]
    );
};

export default HeroSection;
// [code focus end ++]