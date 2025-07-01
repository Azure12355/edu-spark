// src/store/questionBankStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {questionBankData as initialQuestionBankData } from '@/shared/lib/data/questionBankData';
import {Question} from "@/shared/types/question";

interface QuestionBankState {
    questionBank: Record<string, Question[]>;
    getQuestionsByPointId: (pointId: string) => Question[];
    getQuestionById: (questionId: string) => Question | undefined;
    updateQuestion: (updatedQuestion: Question) => void;
    // --- 核心新增：添加题目的 Action ---
    addQuestion: (question: Question) => void;
}

export const useQuestionBankStore = create<QuestionBankState>()(
    persist(
        (set, get) => ({
            questionBank: initialQuestionBankData,

            // ... (getQuestionById, updateQuestion 等方法保持不变) ...
            getQuestionsByPointId: (pointId: string) => get().questionBank[pointId] || [],
            getQuestionById: (questionId: string) => {
                for (const pointId in get().questionBank) {
                    const question = get().questionBank[pointId].find(q => q.id === questionId);
                    if (question) return question;
                }
                return undefined;
            },
            updateQuestion: (updatedQuestion: Question) => {
                set(state => {
                    const newBank = { ...state.questionBank };
                    let found = false;
                    for (const pointId in newBank) {
                        const index = newBank[pointId].findIndex(q => q.id === updatedQuestion.id);
                        if (index !== -1) {
                            newBank[pointId][index] = updatedQuestion;
                            found = true;
                            break;
                        }
                    }
                    return { questionBank: newBank };
                });
            },

            // --- 核心新增：addQuestion 的实现 ---
            addQuestion: (questionToAdd: Question) => {
                set(state => {
                    const newBank = { ...state.questionBank };
                    // 遍历题目关联的所有知识点
                    questionToAdd.points.forEach(point => {
                        const pointId = point.id;
                        // 如果该知识点下还没有题目列表，则创建一个
                        if (!newBank[pointId]) {
                            newBank[pointId] = [];
                        }
                        // 检查是否已存在相同ID的题目，避免重复添加
                        const exists = newBank[pointId].some(q => q.id === questionToAdd.id);
                        if (!exists) {
                            newBank[pointId].push(questionToAdd);
                        }
                    });
                    return { questionBank: newBank };
                });
            },
        }),
        {
            name: 'question-bank-storage',
        }
    )
);