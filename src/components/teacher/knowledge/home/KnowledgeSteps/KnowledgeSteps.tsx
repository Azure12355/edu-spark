"use client";
import React from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './KnowledgeSteps.module.css';

const steps = [
    { step: "第1_step", title: "创建知识库", description: "按特定场景/领域管理知识库，支持结构化和非结构化类型知识库", imageUrl: "/images/teacher-dashboard/step1.png" },
    { step: "第2_step", title: "上传文档", description: "Excel, Pdf, 飞书文档等多种文档格式，支持图片OCR", imageUrl: "/images/teacher-dashboard/step2.png" },
    { step: "第3_step", title: "检索问答", description: "基于知识库，通过切片检索及大模型问答，调试检索问答效果", imageUrl: "/images/teacher-dashboard/step3.png" },
    { step: "第4_step", title: "API 调用", description: "调用API集成到你的生产业务，实现端到端知识问答", imageUrl: "/images/teacher-dashboard/step4.png" },
];

interface KnowledgeStepsProps {
    isVisible: boolean;
    onToggle: () => void;
}

const KnowledgeSteps: React.FC<KnowledgeStepsProps> = ({ isVisible, onToggle }) => {
    return (
        <div className={styles.stepsContainer}>
            <button className={styles.toggleButton} onClick={onToggle}>
                {isVisible ? '收起教程' : '展开教程'}
                <i className={`fas fa-chevron-up ${styles.toggleIcon} ${!isVisible ? styles.collapsed : ''}`}></i>
            </button>
            <AnimatePresence>
                {isVisible && (
                    <motion.div
                        className={styles.stepsGrid}
                        initial={{ height: 0, opacity: 0, marginTop: 0 }}
                        animate={{ height: 'auto', opacity: 1, marginTop: '20px' }}
                        exit={{ height: 0, opacity: 0, marginTop: 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                    >
                        {steps.map(step => (
                            <div key={step.step} className={styles.stepCard}>
                                <div className={styles.textInfo}>
                                    <p className={styles.stepLabel}>{step.step}</p>
                                    <h3>{step.title}</h3>
                                    <p>{step.description}</p>
                                </div>
                                <div className={styles.imageWrapper}>
                                    {/* <Image src={step.imageUrl} alt={step.title} width={80} height={80} /> */}
                                </div>
                            </div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default KnowledgeSteps;