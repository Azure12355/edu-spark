// src/store/questionBankStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Question, questionBankData as initialQuestionBankData } from '@/lib/data/questionBankData';

interface QuestionBankState {
    questionBank: Record<string, Question[]>;
    getQuestionsByPointId: (pointId: string) => Question[];
    // 未来可以添加 addQuestion, updateQuestion, deleteQuestion 等操作
}

export const useQuestionBankStore = create<QuestionBankState>()(
    persist(
        (set, get) => ({
            questionBank: initialQuestionBankData,

            getQuestionsByPointId: (pointId: string) => {
                const state = get();
                return state.questionBank[pointId] || [];
            },
        }),
        {
            name: 'question-bank-storage', // localStorage 中的键名
        }
    )
);