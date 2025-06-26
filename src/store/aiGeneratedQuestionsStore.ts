// src/store/aiGeneratedQuestionsStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AIGeneratedQuestion, aiGeneratedQuestionsData as initialData } from '@/lib/data/aiGeneratedQuestionsData';

// 定义 Store 的状态和操作类型
interface AIGeneratedQuestionsState {
    questions: AIGeneratedQuestion[];
    getQuestionById: (id: string) => AIGeneratedQuestion | undefined;
    updateQuestion: (updatedQuestion: AIGeneratedQuestion) => void;
    deleteQuestion: (id: string) => void;
    addQuestionsToBank: () => void; // 模拟加入题库
    clearQuestions: () => void;
    setQuestions: (questions: AIGeneratedQuestion[]) => void;
}

export const useAIGeneratedQuestionsStore = create<AIGeneratedQuestionsState>()(
    persist(
        (set, get) => ({
            // 初始状态
            questions: initialData,

            // 查询
            getQuestionById: (id) => get().questions.find(q => q.id === id),

            // 更新
            updateQuestion: (updatedQuestion) => {
                set((state) => ({
                    questions: state.questions.map(q =>
                        q.id === updatedQuestion.id ? updatedQuestion : q
                    )
                }));
            },

            // 删除
            deleteQuestion: (id) => {
                set((state) => ({
                    questions: state.questions.filter(q => q.id !== id)
                }));
            },

            // 加入题库（模拟）
            // 在实际应用中，这里会调用后端API，并可能与 questionBankStore 交互
            addQuestionsToBank: () => {
                const questionsToMove = get().questions;
                console.log('Adding to question bank:', questionsToMove);
                // 成功后清空
                set({ questions: [] });
            },

            // 清空
            clearQuestions: () => set({ questions: [] }),

            // 设置（例如，从API获取新题目后）
            setQuestions: (questions) => set({ questions }),
        }),
        {
            name: 'ai-generated-questions-storage', // localStorage 中的键名
        }
    )
);