"use client";
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './KnowledgeSteps.module.css';

// 1. 根据 Coze API 文档重新定义步骤数据
const steps = [
    {
        step: "Step 01",
        title: "创建知识库",
        description: "定义知识库的名称、类型和描述，获得唯一的 `dataset_id`。",
        icon: "fas fa-database",
        apiEndpoint: "POST /v1/datasets"
    },
    {
        step: "Step 02",
        title: "上传文档",
        description: "将本地文件或网页URL上传至指定知识库，启动处理流程。",
        icon: "fas fa-cloud-upload-alt",
        apiEndpoint: "POST /knowledge/document/create"
    },
    {
        step: "Step 03",
        title: "异步处理",
        description: "Coze 自动对文档进行切片、清洗和向量化，可通过API查询进度。",
        icon: "fas fa-cogs",
        apiEndpoint: "POST /datasets/:id/process"
    },
    {
        step: "Step 04",
        title: "集成应用",
        description: "将就绪的知识库关联到核心智能体，赋能精准的RAG问答能力。",
        icon: "fas fa-robot",
        apiEndpoint: "Agent Config"
    },
];

interface KnowledgeStepsProps {
    isVisible: boolean;
    onToggle: () => void;
}

// 2. 定义动画变体
const containerVariants = {
    open: {
        height: 'auto',
        opacity: 1,
        transition: {
            type: 'spring',
            stiffness: 300,
            damping: 30,
            staggerChildren: 0.1,
        }
    },
    closed: {
        height: 0,
        opacity: 0,
        transition: {
            duration: 0.3,
            ease: "easeInOut"
        }
    }
};

const itemVariants = {
    open: {
        y: 0,
        opacity: 1,
        transition: {
            y: { stiffness: 1000, velocity: -100 }
        }
    },
    closed: {
        y: 30,
        opacity: 0,
        transition: {
            y: { stiffness: 1000 }
        }
    }
};

const lineVariants = {
    hidden: { pathLength: 0 },
    visible: {
        pathLength: 1,
        transition: {
            duration: 0.8,
            ease: "easeInOut",
            delay: 0.5 // 在卡片出现后再开始绘制
        }
    }
}

const KnowledgeSteps: React.FC<KnowledgeStepsProps> = ({ isVisible, onToggle }) => {
    return (
        <div className={styles.stepsContainer}>
            <button className={styles.toggleButton} onClick={onToggle}>
                <span className={styles.toggleText}>快速入门指南</span>
                <motion.i
                    className={`fas fa-chevron-down ${styles.toggleIcon}`}
                    animate={{ rotate: isVisible ? 180 : 0 }}
                />
            </button>
            <AnimatePresence initial={false}>
                {isVisible && (
                    <motion.div
                        className={styles.stepsGrid}
                        variants={containerVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                    >
                        {/* 3. 动态连接线 SVG */}
                        <svg className={styles.connectorLines} >
                            <motion.path
                                d="M 120 40 Q 220 40 220 80 T 320 120" // 使用曲线路径
                                fill="none"
                                stroke="url(#line-grad)"
                                strokeWidth="2"
                                strokeDasharray="4 4" // 虚线效果
                                variants={lineVariants}
                                initial="hidden"
                                animate="visible"
                            />
                            <motion.path
                                d="M 460 120 Q 560 120 560 80 T 660 40"
                                fill="none"
                                stroke="url(#line-grad)"
                                strokeWidth="2"
                                strokeDasharray="4 4"
                                variants={lineVariants}
                                initial="hidden"
                                animate="visible"
                            />
                            <defs>
                                <linearGradient id="line-grad" gradientUnits="userSpaceOnUse">
                                    <stop offset="0%" stopColor="rgba(79, 70, 229, 0.2)" />
                                    <stop offset="100%" stopColor="rgba(79, 70, 229, 0.8)" />
                                </linearGradient>
                            </defs>
                        </svg>

                        {steps.map((step, index) => (
                            <motion.div key={step.step} className={styles.stepCard} variants={itemVariants}>
                                <div className={styles.cardIcon}>
                                    <i className={step.icon}></i>
                                </div>
                                <div className={styles.cardContent}>
                                    <span className={styles.stepLabel}>{step.step}</span>
                                    <h3 className={styles.stepTitle}>{step.title}</h3>
                                    <p className={styles.stepDescription}>{step.description}</p>
                                </div>
                                <div className={styles.apiInfo}>
                                    {step.apiEndpoint}
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default KnowledgeSteps;