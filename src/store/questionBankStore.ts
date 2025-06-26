// src/store/questionBankStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Question, questionBankData as initialQuestionBankData } from '@/lib/data/questionBankData';

interface QuestionBankState {
    questionBank: Record<string, Question[]>;
    getQuestionsByPointId: (pointId: string) => Question[];
    getQuestionById: (questionId: string) => Question | undefined;
    updateQuestion: (updatedQuestion: Question) => void;
}

export const useQuestionBankStore = create<QuestionBankState>()(
    persist(
        (set, get) => ({
            questionBank: initialQuestionBankData,

            getQuestionsByPointId: (pointId: string) => {
                const state = get();
                return state.questionBank[pointId] || [];
            },

            getQuestionById: (questionId: string) => {
                const state = get();
                for (const pointId in state.questionBank) {
                    const question = state.questionBank[pointId].find(q => q.id === questionId);
                    if (question) {
                        return question;
                    }
                }
                return undefined;
            },

            updateQuestion: (updatedQuestion: Question) => {
                set(state => {
                    const newBank = { ...state.questionBank };
                    let found = false;
                    // 遍历整个题库找到并更新题目
                    for (const pointId in newBank) {
                        const index = newBank[pointId].findIndex(q => q.id === updatedQuestion.id);
                        if (index !== -1) {
                            newBank[pointId][index] = updatedQuestion;
                            found = true;
                            // 注意：这里我们只在一个地方更新。如果一个题目可以属于多个知识点，
                            // 那么在数据结构设计上可能需要将题目和知识点的关系解耦。
                            // 但基于当前模型，我们先这样实现。
                            break;
                        }
                    }
                    if (!found) {
                        // 如果题目是新关联到某个知识点，则需要更复杂的逻辑来处理。
                        // 这里我们简化为仅更新已存在的题目。
                        console.warn("Update failed: Question not found in any existing point list.");
                    }
                    return { questionBank: newBank };
                });
            }
        }),
        {
            name: 'question-bank-storage',
        }
    )
);