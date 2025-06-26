// src/app/teacher/(dashboard)/courses/[id]/questions/ai-generate/page.tsx
"use client";
import React, { useState } from 'react';
import styles from './ai-generate.module.css';
import ConfigPanel from '@/components/teacher/course-management/ai-generate/ConfigPanel';
import ResultsPanel from '@/components/teacher/course-management/ai-generate/ResultsPanel';
import { AIGeneratedQuestion, aiGeneratedQuestionsData } from '@/lib/data/aiGeneratedQuestionsData';

export default function AIGeneratePage() {
    const [generatedQuestions, setGeneratedQuestions] = useState<AIGeneratedQuestion[]>(aiGeneratedQuestionsData);

    return (
        <div className={styles.pageContainer}>
            <aside className={styles.leftPanel}>
                <ConfigPanel />
            </aside>
            <main className={styles.rightPanel}>
                <ResultsPanel questions={generatedQuestions} />
            </main>
        </div>
    );
}