"use client";
import React from 'react';
import Image from 'next/image';
import styles from './KnowledgeSteps.module.css';

const steps = [
    { step: "第1_step", title: "创建知识库", description: "按特定场景/领域管理知识库，支持结构化和非结构化类型知识库", imageUrl: "/images/student-dashboard/step1.png" },
    { step: "第2_step", title: "上传文档", description: "Excel, Pdf, 飞书文档等多种文档格式，支持图片OCR", imageUrl: "/images/student-dashboard/step2.png" },
    { step: "第3_step", title: "检索问答", description: "基于知识库，通过切片检索及大模型问答，调试检索问答效果", imageUrl: "/images/student-dashboard/step3.png" },
    { step: "第4_step", title: "API 调用", description: "调用API集成到你的生产业务，实现端到端知识问答", imageUrl: "/images/student-dashboard/step4.png" },
];

const KnowledgeSteps = () => {
    return (
        <div className={styles.stepsContainer}>
            <button className={styles.toggleButton}>收起教程 <i className="fas fa-chevron-up"></i></button>
            <div className={styles.stepsGrid}>
                {steps.map(step => (
                    <div key={step.step} className={styles.stepCard}>
                        <div className={styles.textInfo}>
                            <p className={styles.stepLabel}>{step.step}</p>
                            <h3>{step.title}</h3>
                            <p>{step.description}</p>
                        </div>
                        <div className={styles.imageWrapper}>
                            {/*  <Image src={step.imageUrl} alt={step.title} width={80} height={80} /> */}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default KnowledgeSteps;