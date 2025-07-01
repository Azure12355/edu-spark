// src/lib/data/aiGeneratedQuestionsData.ts
import { AIGeneratedQuestion, Question } from '@/shared/types/question'; // 导入新的类型
import { QuestionType, QuestionDifficulty } from '@/shared/constants/enums'; // 导入新的枚举
import { KnowledgePoint } from '@/shared/types/knowledge';
import { syllabusData } from './syllabusData';

// 辅助函数保持不变
const findPointByTitle = (title: string): KnowledgePoint | null => {
    for (const chapter of syllabusData) {
        for (const section of chapter.sections) {
            const point = section.points.find(p => p.title === title);
            if (point) return point as KnowledgePoint;
        }
    }
    return null;
};
const findPointsByTitle = (titles: string[]): KnowledgePoint[] => {
    return titles.map(title => findPointByTitle(title)).filter((p): p is KnowledgePoint => p !== null);
};


// 更新后的模拟数据，以适配新的 Question 类型
export const aiGeneratedQuestionsData: AIGeneratedQuestion[] = [
    {
        id: 'ai-q-1',
        points: findPointsByTitle(['栈 (LIFO) 的实现与应用']),
        type: QuestionType.SINGLE_CHOICE,
        difficulty: QuestionDifficulty.EASY,
        stem: '在Python中，`not True`的结果是什么？',
        options: ['True', 'False', 'None', 'Error'],
        answers: ['False'],
        analyses: ['`not`运算符用于逻辑非操作，它将一个布尔值取反。因此，`not True`的结果是`False`。'],
        creators: ['AI'],
        createdAt: new Date('2024-05-20 10:30').getTime()
    },
    {
        id: 'ai-q-2',
        points: findPointsByTitle(['栈 (LIFO) 的实现与应用']),
        type: QuestionType.SINGLE_CHOICE,
        difficulty: QuestionDifficulty.EASY,
        stem: '表达式 `5 > 3 or 1 < 0` 在Python中的值为？',
        options: ['`True`', '`False`', '`1`', '`0`'],
        answers: ['`True`'],
        analyses: ['`or`运算符在两个操作数中只要有一个为`True`，结果就为`True`。因为 `5 > 3` 是 `True`，所以整个表达式的值为 `True`，并且由于“短路求值”特性，`1 < 0` 不会被计算。'],
        creators: ['AI'],
        createdAt: new Date('2024-05-20 10:31').getTime()
    },
    {
        id: 'ai-q-3',
        points: findPointsByTitle(['哈希表 (Hash Table) 的实现与应用']), // 假设有这个知识点
        type: QuestionType.MULTIPLE_CHOICE,
        difficulty: QuestionDifficulty.MEDIUM,
        stem: '下列哪些数据结构的操作，其平均时间复杂度为 O(1)？',
        options: [
            '哈希表（Hash Table）的插入操作',
            '数组（Array）的末尾添加元素（当容量足够时）',
            '单链表（Singly Linked List）的头部插入操作',
            '栈（Stack）的 Push 和 Pop 操作'
        ],
        answers: [
            '哈希表（Hash Table）的插入操作',
            '数组（Array）的末尾添加元素（当容量足够时）',
            '单链表（Singly Linked List）的头部插入操作',
            '栈（Stack）的 Push 和 Pop 操作'
        ],
        analyses: ['哈希表在没有哈希冲突的理想情况下插入是O(1)。数组末尾添加在不扩容时是O(1)。链表头部插入和栈的压入/弹出操作都只需要改变指针，是O(1)。'],
        creators: ['AI'],
        createdAt: new Date('2024-05-20 10:32').getTime()
    },
    {
        id: 'ai-q-4',
        points: findPointsByTitle(['二叉树的遍历 (前、中、后、层序)']),
        type: QuestionType.TRUE_FALSE,
        difficulty: QuestionDifficulty.MEDIUM,
        stem: '已知一棵二叉树的前序遍历序列和后序遍历序列，可以唯一确定这棵二叉树的结构。',
        answers: ['false'],
        analyses: ['错误。仅凭前序和后序遍历无法唯一确定一棵二叉树。例如，一个节点，其左子树为空，右子树只有一个节点；和另一个节点，其右子树为空，左子树只有一个节点，这两种情况的前序和后序遍历序列可能相同。必须是**中序遍历**与**前序**或**后序**之一结合，才能唯一确定一棵二叉树。'],
        creators: ['AI'],
        createdAt: new Date('2024-05-20 10:33').getTime()
    },
    // ... 其他题目也按此格式修改
];