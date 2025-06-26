// src/lib/data/aiGeneratedQuestionsData.ts
import { Question, QuestionType } from './questionBankData';

// AI生成的题目可能包含额外元数据，但这里我们复用Question类型
export type AIGeneratedQuestion = Question;

export const aiGeneratedQuestionsData: AIGeneratedQuestion[] = [
    {
        id: 'ai-q-1',
        pointIds: ['布尔运算基础', 'Python逻辑非not'],
        type: '单选题',
        difficulty: '简单',
        stem: '在Python中，`not True`的结果是什么？',
        options: ['True', 'False', 'None', 'Error'],
        answer: 'False',
        analysis: '`not`运算符用于逻辑非操作，它将一个布尔值取反。因此，`not True`的结果是`False`。',
        creator: 'AI',
        createdAt: '2024-05-20 10:30'
    },
    {
        id: 'ai-q-2',
        pointIds: ['Python逻辑或or'],
        type: '单选题',
        difficulty: '简单',
        stem: '表达式 `5 > 3 or 1 < 0` 在Python中的值为？',
        options: ['True', 'False', '1', '0'],
        answer: 'True',
        analysis: '`or`运算符在两个操作数中只要有一个为`True`，结果就为`True`。因为 `5 > 3` 是 `True`，所以整个表达式的值为 `True`。',
        creator: 'AI',
        createdAt: '2024-05-20 10:31'
    }
];