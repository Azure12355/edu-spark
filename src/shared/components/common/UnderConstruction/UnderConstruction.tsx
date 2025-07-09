// [!file src/shared/components/common/UnderConstruction.tsx]
"use client";

import React from 'react';
import styles from './UnderConstruction.module.css';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface UnderConstructionProps {
    pageTitle?: string;
    featureName?: string;
}

const UnderConstruction: React.FC<UnderConstructionProps> = ({
                                                                 pageTitle = "新功能探索中",
                                                                 featureName = "这个模块"
                                                             }) => {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className={styles.robotImageWrapper}
                >
                    <Image
                        src="/robot.gif" // 复用 public/robot.gif
                        alt="AI 工程师正在施工"
                        width={180}
                        height={180}
                        unoptimized // GIF图需要此属性
                    />
                </motion.div>

                <motion.h1
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className={styles.title}
                >
                    {pageTitle}
                </motion.h1>

                <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className={styles.description}
                >
                    我们的 AI 工程师正在为<strong>{featureName}</strong>注入新的魔法！<br/>
                    请稍作等待，更智能、更强大的功能即将上线。
                </motion.p>

                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                    className={styles.progressBarContainer}
                >
                    <div className={styles.progressBarLabel}>
                        <span>正在编译思想火花...</span>
                        <span className={styles.progressPercent}>42%</span>
                    </div>
                    <div className={styles.progressBar}>
                        <motion.div
                            className={styles.progressFill}
                            initial={{ width: '0%' }}
                            animate={{ width: '42%' }}
                            transition={{ duration: 1.5, delay: 1, ease: "easeInOut" }}
                        />
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default UnderConstruction;