// [!file src/features/teacher/course/course-management/sub-features/ai-question-generator/AiQuestionGeneratorPage.tsx]
"use client";

import React from 'react';
import { motion } from 'framer-motion';
import styles from './AiQuestionGenerator.module.css';

// 1. 只导入两个核心的面板组件
import ConfigPanel from './components/ConfigPanel/ConfigPanel';
import ResultsPanel from './components/ResultPanel/ResultsPanel';

// 2. 组件本身是一个无状态的功能组件 (Stateless Functional Component)
export default function AiQuestionGeneratorPage() {

    // 4. 返回值只包含页面布局和动画效果
    return (
        <div className={styles.pageContainer}>
            <motion.aside
                className={styles.leftPanel}
                initial={{ x: -80, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
            >
                {/* ConfigPanel 内部自管理其所有逻辑 */}
                <ConfigPanel />
            </motion.aside>

            <motion.main
                className={styles.rightPanel}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                {/* ResultsPanel 内部也自管理其所有逻辑 */}
                <ResultsPanel />
            </motion.main>
        </div>
    );
}