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
        <section className={styles.heroSection}>
            <h1 className={styles.heroTitle}>
                开启你的 <span>AI 智能学习</span> 新纪元
            </h1>

            <form className={styles.searchForm} onSubmit={handleFormSubmit}>
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
            </form>

            <div className={styles.suggestionTags}>
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
            </div>
        </section>
    );
};

export default HeroSection;
// [code focus end ++]