// src/lib/data/questionBankData.ts

export type QuestionType = '单选题' | '多选题' | '判断题' | '填空题' | '简答题' | '编程题';
export type QuestionDifficulty = '简单' | '中等' | '困难';

export interface Question {
    id: string;
    pointIds: string[]; // 关联的知识点 ID 数组 (核心修改)
    type: QuestionType;
    difficulty: QuestionDifficulty;
    stem: string; // 题干 (支持 Markdown)
    options?: string[]; // 选项 (单选/多选)
    answer: string | string[] | boolean; // 答案
    analysis: string; // 解析 (支持 Markdown)
    creator: string;
    createdAt: string;
}

// 模拟的题库数据，以 pointId 为 key
export const questionBankData: Record<string, Question[]> = {
    'p-1-2-1': [
        {
            id: 'q-001', pointIds: ['p-1-2-1'], type: '单选题', difficulty: '简单',
            stem: '在算法分析中，大O表示法（Big O notation）通常用来描述算法的什么特性？',
            options: ['最佳情况下的时间复杂度', '平均情况下的时间复杂度', '最坏情况下的时间复杂度', '算法的精确执行时间'],
            answer: '最坏情况下的时间复杂度',
            analysis: '大O表示法描述了算法执行时间（或空间）的上界，即在最坏情况下的增长趋势。',
            creator: '王老师', createdAt: '2024-05-10',
        },
        {
            id: 'q-002', pointIds: ['p-1-2-1', 'p-1-2-2'], type: '多选题', difficulty: '中等',
            stem: '下列哪些算法的时间复杂度为 O(n log n)？',
            options: ['快速排序 (平均情况)', '归并排序', '堆排序', '冒泡排序 (最坏情况)'],
            answer: ['快速排序 (平均情况)', '归并排序', '堆排序'],
            analysis: '快速排序的平均和最佳时间复杂度是 O(n log n)，最坏是 O(n^2)。归并排序和堆排序在所有情况下都是 O(n log n)。冒泡排序是 O(n^2)。',
            creator: '王老师', createdAt: '2024-05-11',
        },
    ],
    'p-2-1-2': [
        {
            id: 'q-003', pointIds: ['p-2-1-2'], type: '判断题', difficulty: '简单',
            stem: '双向链表在插入和删除节点时，其效率一定高于单链表。',
            answer: true,
            analysis: '正确。因为双向链表可以直接找到前驱节点，而单链表需要从头遍历，所以双向链表在插入删除操作上通常更高效。',
            creator: '王老师', createdAt: '2024-05-12',
        },
        {
            id: 'q-004', pointIds: ['p-2-1-2'], type: '简答题', difficulty: '中等',
            stem: '请简述循环链表和普通单链表相比，其主要优点和应用场景是什么？',
            answer: '...',
            analysis: '主要优点是从任意节点出发都可以遍历整个链表。主要应用场景是解决需要循环遍历的问题，如约瑟夫环问题。',
            creator: '王老师', createdAt: '2024-05-13',
        },
        {
            id: 'q-005', pointIds: ['p-2-1-2'], type: '编程题', difficulty: '困难',
            stem: '请用 Java 实现一个函数，反转一个单链表。\n\n**输入:** 一个单链表的头节点 `head`\n**输出:** 反转后链表的头节点',
            answer: '...',
            analysis: '可以使用迭代法，通过三个指针 `prev`, `curr`, `next` 来实现。`prev` 指向反转后链表的尾部（初始为 null），`curr` 指向当前待反转的节点，`next` 用于保存 `curr` 的下一个节点。',
            creator: '王老师', createdAt: '2024-05-14',
        }
    ],
    'p-3-1-3': [
        {
            id: 'q-006', pointIds: ['p-3-1-3'], type: '填空题', difficulty: '简单',
            stem: '一棵二叉树的前序遍历序列和中序遍历序列可以唯一确定这棵树，而后序遍历和______遍历序列也可以。',
            answer: '中序',
            analysis: '任何一种非中序遍历（前序或后序）与中序遍历结合，都可以唯一确定一棵二叉树。',
            creator: '王老师', createdAt: '2024-05-15',
        }
    ]
};