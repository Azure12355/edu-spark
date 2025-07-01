// src/store/aiGeneratedQuestionsStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AIGeneratedQuestion, Question } from '@/shared/types/question'; // 导入 Question 类型
import { useQuestionBankStore } from '../../question-bank/store/questionBankStore';
import { aiGeneratedQuestionsData as initialData } from '@/shared/lib/data/aiGeneratedQuestionsData';

interface AIGeneratedQuestionsState {
    questions: AIGeneratedQuestion[];
    getQuestionById: (id: string) => AIGeneratedQuestion | undefined;
    updateQuestion: (updatedQuestion: AIGeneratedQuestion) => void;
    deleteQuestion: (id: string) => void;
    addQuestionsToBank: () => number;
    clearQuestions: () => void;
    setQuestions: (questions: AIGeneratedQuestion[]) => void;
}

export const useAIGeneratedQuestionsStore = create<AIGeneratedQuestionsState>()(
    persist(
        (set, get) => ({
            questions: initialData,

            getQuestionById: (id) => get().questions.find(q => q.id === id),

            updateQuestion: (updatedQuestion) => {
                set((state) => ({
                    questions: state.questions.map(q =>
                        q.id === updatedQuestion.id ? updatedQuestion : q
                    )
                }));
            },

            deleteQuestion: (id) => {
                set((state) => ({
                    questions: state.questions.filter(q => q.id !== id)
                }));
            },

            addQuestionsToBank: () => {
                const questionsToMove = get().questions;
                if (questionsToMove.length === 0) return 0;

                const addQuestion = useQuestionBankStore.getState().addQuestion;

                questionsToMove.forEach(question => {
                    const newId = `q-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
                    addQuestion({ ...question, id: newId });
                });

                set({ questions: [] });
                return questionsToMove.length;
            },

            clearQuestions: () => set({ questions: [] }),

            /**
             * BugFix: 重构 setQuestions 方法
             * 在将从API获取的题目存入store之前，对数据进行处理和规范化。
             * 1. 为每个题目添加临时的、唯一的客户端ID。
             * 2. 补充 `creators` 字段为 ['AI']。
             * 3. 补充 `createdAt` 字段为当前时间戳。
             */
            setQuestions: (questions: AIGeneratedQuestion[]) => {
                const now = Date.now(); // 获取当前时间戳
                const questionsWithDefaults = questions.map((q, index) => ({
                    ...q,
                    id: `ai-q-${now}-${index}`, // 添加唯一的客户端ID
                    creators: ['EduSpark Agent'], // 添加创建者信息
                    createdAt: now, // 添加创建时间
                }));
                set({ questions: questionsWithDefaults });
            },
        }),
        {
            name: 'ai-generated-questions-storage',
            version: 1,
        }
    )
);