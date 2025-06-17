// src/components/common/ChatInputForm/ChatInputForm.tsx
"use client";

import React, {useEffect, useRef, useState} from 'react';
import styles from './ChatInputForm.module.css';
import AttachmentDisplay from './AttachmentDisplay';
import Popover from './Popover';
import {AnimatePresence, motion} from 'framer-motion';
import Image from "next/image";

// --- 类型定义保持不变 ---
interface AttachmentFile extends File {
    id: string;
}

type DeepThoughtMode = 'auto' | 'on' | 'off';

interface ChatInputFormProps {
    inputValue: string;
    onInputChange: (value: string) => void;
    onSubmit: (data: { text: string; mode: DeepThoughtMode }) => void;
    isSending: boolean;
    onStop: () => void;
    shouldFocus: boolean;
}

// --- 语音识别API的类型定义 ---
interface SpeechRecognition extends EventTarget {
    continuous: boolean;
    interimResults: boolean;
    lang: string;
    onresult: (event: any) => void;
    onerror: (event: any) => void;
    onend: () => void;

    start(): void;

    stop(): void;

    abort(): void;
}

declare var SpeechRecognition: { new(): SpeechRecognition; };
declare var webkitSpeechRecognition: { new(): SpeechRecognition; };


const ChatInputForm: React.FC<ChatInputFormProps> = ({
                                                         inputValue,
                                                         onInputChange,
                                                         onSubmit,
                                                         isSending,
                                                         onStop,
                                                         shouldFocus
                                                     }) => {
    // ... 其他 state 和 ref 保持不变 ...
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [attachments, setAttachments] = useState<AttachmentFile[]>([]);
    const [deepThoughtMode, setDeepThoughtMode] = useState<DeepThoughtMode>('auto');
    const [activePopover, setActivePopover] = useState<'attachment' | 'deepThought' | null>(null);

    // --- 核心修改 1: 语音输入相关状态和 ref ---
    const [isListening, setIsListening] = useState(false);
    const [isSpeechSupported, setIsSpeechSupported] = useState(false);
    const recognitionRef = useRef<SpeechRecognition | null>(null);

    // --- 核心修改 2: 在客户端挂载时检查API支持并初始化 ---
    useEffect(() => {
        // 确保只在浏览器环境中执行
        if (typeof window !== 'undefined') {
            //@ts-ignore
            const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
            if (SpeechRecognitionAPI) {
                setIsSpeechSupported(true);
                const recognitionInstance = new SpeechRecognitionAPI();
                recognitionInstance.continuous = true;
                recognitionInstance.interimResults = true;
                recognitionInstance.lang = 'zh-CN';

                recognitionInstance.onresult = (event: any) => {
                    let interimTranscript = '';
                    let finalTranscript = '';
                    for (let i = event.resultIndex; i < event.results.length; ++i) {
                        if (event.results[i].isFinal) {
                            finalTranscript += event.results[i][0].transcript;
                        } else {
                            interimTranscript += event.results[i][0].transcript;
                        }
                    }
                    // 将最终识别的文本附加到现有输入值后面
                    if (finalTranscript) {
                        onInputChange(inputValue + finalTranscript);
                    }
                };

                recognitionInstance.onerror = (event: any) => {
                    console.error('Speech recognition error', event.error);
                    setIsListening(false);
                };

                recognitionInstance.onend = () => {
                    setIsListening(false);
                };

                recognitionRef.current = recognitionInstance;
            } else {
                setIsSpeechSupported(false);
                console.warn('Speech Recognition API is not supported in this browser.');
            }
        }
    }, [inputValue, onInputChange]); // 依赖 inputValue 和 onInputChange 以确保 onresult 回调能获取到最新的值


    // ... 其他 effect 保持不变 ...
    useEffect(() => {
        if (shouldFocus && inputRef.current) inputRef.current.focus();
    }, [shouldFocus]);
    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.style.height = 'auto';
            inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
        }
    }, [inputValue]);


    // --- 核心修改 3: 语音输入的控制函数 ---
    const handleToggleListening = () => {
        if (isListening) {
            recognitionRef.current?.stop();
        } else {
            recognitionRef.current?.start();
        }
        setIsListening(!isListening);
    };


    // --- 其他函数保持不变 ---
    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleFormSubmit();
        }
    };
    const handleFormSubmit = () => {
        let contentWithAttachments = inputValue;
        if (attachments.length > 0) {
            const fileNames = attachments.map(f => `[${f.name}]`).join(' ');
            contentWithAttachments = `${inputValue}\n\n已上传附件: ${fileNames}`;
        }
        if (!isSending && (contentWithAttachments.trim())) {
            onSubmit({text: contentWithAttachments, mode: deepThoughtMode});
            setAttachments([]);
        }
    };
    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const newFiles = Array.from(event.target.files).map(file => Object.assign(file, {id: `${file.name}-${Date.now()}`}));
            setAttachments(prev => [...prev, ...newFiles]);
        }
        if (fileInputRef.current) fileInputRef.current.value = "";
        setActivePopover(null);
    };
    const removeAttachment = (fileId: string) => {
        setAttachments(prev => prev.filter(file => file.id !== fileId));
    };
    const deepThoughtOptions: { key: DeepThoughtMode; label: string; desc: string; }[] = [{
        key: 'auto',
        label: '自动',
        desc: '根据上下文智能切换'
    }, {key: 'on', label: '开', desc: '输出带推理过程的答案'}, {key: 'off', label: '关', desc: '快速直接回答'},];


    return (<div className={styles.inputFormContainer}>
            <input type="file" multiple ref={fileInputRef} style={{display: 'none'}} onChange={handleFileSelect}/>
            <AttachmentDisplay attachments={attachments} onRemove={removeAttachment}/>

            <div className={styles.mainInputArea}>
                <textarea
                    ref={inputRef}
                    value={inputValue}
                    onChange={(e) => onInputChange(e.target.value)}
                    placeholder="发消息、输入 @ 选择技能或 / 选择文件"
                    rows={1}
                    onKeyDown={handleKeyDown}
                    disabled={isSending || isListening} // 正在收听时也禁用文本输入
                />
            </div>

            <div className={styles.inputToolbar}>
                <div className={styles.leftActions}>
                    <Popover
                        isOpen={activePopover === 'attachment'}
                        onClose={() => setActivePopover(null)}
                        trigger={<button className={styles.toolButton} onClick={() => setActivePopover('attachment')}>
                            <i className="fas fa-paperclip"></i>
                        </button>}>
                        <div className={styles.popoverMenu}>
                            <div className={styles.menuItem} onClick={() => fileInputRef.current?.click()}><i
                                className="fas fa-file-upload"></i> 上传文档
                            </div>
                            <div className={styles.menuItem} onClick={() => fileInputRef.current?.click()}><i
                                className="fas fa-image"></i> 上传图片
                            </div>
                        </div>
                    </Popover>

                    <Popover
                        isOpen={activePopover === 'deepThought'}
                        onClose={() => setActivePopover(null)}
                        trigger={<button
                            className={`${styles.toolButton} ${styles.deepThoughtButton} ${deepThoughtMode !== 'off' ? styles.active : ''}`}
                            onClick={() => setActivePopover('deepThought')}>
                            <Image
                                src={deepThoughtMode !== 'off' ? "/file-icons/think.svg" : "/file-icons/no-think.svg"}
                                alt={"深度思考"} width={20} height={20}/>
                            深度思考：{deepThoughtOptions.find(o => o.key === deepThoughtMode)?.label}
                        </button>}>
                        <div className={styles.popoverMenu}>
                            {deepThoughtOptions.map(option => (
                                <div key={option.key} className={styles.menuItem} onClick={() => {
                                    setDeepThoughtMode(option.key);
                                    setActivePopover(null);
                                }}
                                     style={option.key == deepThoughtMode ? {
                                         color: "blue",
                                         backgroundColor: "#e8edf8",
                                         border: "1px solid #2069fc",
                                     } : {}}
                                >
                                    <div className={styles.menuItemContent}>
                                        <Image
                                            src={option.key == deepThoughtMode ? "/file-icons/think.svg" : "/file-icons/no-think.svg"}
                                            alt={"深度思考"} width={20} height={20} style={{marginRight: '8px'}}/>
                                        <div className={styles.menuItemText}>
                                            <span>{option.label}</span>
                                            <small>{option.desc}</small>
                                        </div>
                                    </div>
                                    {deepThoughtMode === option.key &&
                                        <i className={`fas fa-check ${styles.checkIcon}`}></i>}
                                </div>))}
                        </div>
                    </Popover>
                </div>

                <div className={styles.rightActions}>

                    {/* --- 核心修改 4: 渲染语音输入按钮 --- */}
                    {isSpeechSupported && (<button
                            className={`${styles.toolButton} ${isListening ? styles.listening : ''}`}
                            title="语音输入"
                            onClick={handleToggleListening}
                            disabled={isSending}
                        >
                            <i className="fas fa-microphone"></i>
                        </button>)}

                    <div className={styles.sendButtonWrapper}>
                        <AnimatePresence mode="popLayout">
                            {isSending ? (
                                <motion.button key="stop" className={`${styles.sendButton} ${styles.stopButton}`}
                                               onClick={onStop} title="停止生成" initial={{opacity: 0, scale: 0.8}}
                                               animate={{opacity: 1, scale: 1}} exit={{opacity: 0, scale: 0.8}}
                                               transition={{duration: 0.2}}>
                                    <i className="fas fa-square"></i>
                                </motion.button>) : (
                                <motion.button key="send" className={styles.sendButton} onClick={handleFormSubmit}
                                               disabled={!inputValue.trim() && attachments.length === 0}
                                               initial={{opacity: 0, scale: 0.8}} animate={{opacity: 1, scale: 1}}
                                               exit={{opacity: 0, scale: 0.8}} transition={{duration: 0.2}}>
                                    <i className="fas fa-arrow-up"></i>
                                </motion.button>)}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>);
};

export default ChatInputForm;