// src/lib/data/syllabusData.ts

export type KnowledgePointType = '核心' | '重点' | '选学';

export interface KnowledgePoint {
    id: string;
    title: string;
    type: KnowledgePointType;
}

export interface SyllabusSection {
    id: string;
    title: string;
    points: KnowledgePoint[];
}

export interface SyllabusChapter {
    id: string;
    title: string;
    description: string;
    icon: string; // Font Awesome icon class
    sections: SyllabusSection[];
}

export const syllabusData: SyllabusChapter[] = [
    {
        id: 'ch-1',
        title: '第一章：基础入门与复杂度分析',
        icon: 'fas fa-tachometer-alt',
        description: '建立对数据结构与算法的宏观认识，掌握衡量算法效率的核心指标。',
        sections: [
            {
                id: 'sec-1-1',
                title: '数据结构与算法绪论',
                points: [
                    { id: 'p-1-1-1', title: '数据结构的基本概念', type: '核心' },
                    { id: 'p-1-1-2', title: '算法的定义与特性', type: '核心' },
                    { id: 'p-1-1-3', title: '抽象数据类型 (ADT)', type: '重点' },
                ],
            },
            {
                id: 'sec-1-2',
                title: '算法效率度量',
                points: [
                    { id: 'p-1-2-1', title: '时间复杂度：大O表示法', type: '核心' },
                    { id: 'p-1-2-2', title: '空间复杂度分析', type: '核心' },
                    { id: 'p-1-2-3', title: '最好、最坏、平均情况', type: '重点' },
                ],
            },
        ],
    },
    {
        id: 'ch-2',
        title: '第二章：线性表',
        icon: 'fas fa-layer-group',
        description: '深入理解两种基本的线性存储结构：顺序表和链表，以及两种受限的线性结构：栈和队列。',
        sections: [
            {
                id: 'sec-2-1',
                title: '顺序表与链表',
                points: [
                    { id: 'p-2-1-1', title: '顺序存储 (数组) 实现', type: '重点' },
                    { id: 'p-2-1-2', title: '单链表、循环链表、双向链表', type: '核心' },
                    { id: 'p-2-1-3', title: '两种结构的操作与复杂度对比', type: '核心' },
                ],
            },
            {
                id: 'sec-2-2',
                title: '栈与队列',
                points: [
                    { id: 'p-2-2-1', title: '栈 (LIFO) 的实现与应用', type: '核心' },
                    { id: 'p-2-2-2', title: '队列 (FIFO) 的实现与应用', type: '核心' },
                    { id: 'p-2-2-3', title: '循环队列的设计', type: '重点' },
                    { id: 'p-2-2-4', title: '双端队列 (Deque)', type: '选学' },
                ],
            },
        ],
    },
    {
        id: 'ch-3',
        title: '第三章：树形结构',
        icon: 'fas fa-leaf',
        description: '掌握非线性结构中的核心——树，重点研究二叉树及其各种高级形态。',
        sections: [
            {
                id: 'sec-3-1',
                title: '树与二叉树基础',
                points: [
                    { id: 'p-3-1-1', title: '树的定义与术语', type: '核心' },
                    { id: 'p-3-1-2', title: '二叉树的性质与存储结构', type: '核心' },
                    { id: 'p-3-1-3', title: '二叉树的遍历 (前、中、后、层序)', type: '核心' },
                ],
            },
            {
                id: 'sec-3-2',
                title: '高级树结构',
                points: [
                    { id: 'p-3-2-1', title: '二叉搜索树 (BST)', type: '重点' },
                    { id: 'p-3-2-2', title: '平衡二叉树 (AVL)', type: '重点' },
                    { id: 'p-3-2-3', title: '红黑树概念', type: '选学' },
                    { id: 'p-3-2-4', title: '堆 (Heap) 与优先队列', type: '核心' },
                    { id: 'p-3-2-5', title: '哈夫曼树与编码', type: '重点' },
                ],
            },
        ],
    },
    {
        id: 'ch-4',
        title: '第四章：图',
        icon: 'fas fa-project-diagram',
        description: '学习用于表示多对多关系的图结构，并掌握其核心遍历与应用算法。',
        sections: [
            {
                id: 'sec-4-1',
                title: '图的基础与遍历',
                points: [
                    { id: 'p-4-1-1', title: '图的定义与术语', type: '核心' },
                    { id: 'p-4-1-2', title: '邻接矩阵与邻接表表示法', type: '核心' },
                    { id: 'p-4-1-3', title: '深度优先搜索 (DFS)', type: '核心' },
                    { id: 'p-4-1-4', title: '广度优先搜索 (BFS)', type: '核心' },
                ],
            },
            {
                id: 'sec-4-2',
                title: '图的应用算法',
                points: [
                    { id: 'p-4-2-1', title: '最小生成树 (Prim & Kruskal)', type: '重点' },
                    { id: 'p-4-2-2', title: '最短路径 (Dijkstra & Floyd)', type: '重点' },
                    { id: 'p-4-2-3', title: '拓扑排序与关键路径', type: '选学' },
                ],
            },
        ],
    },
    // 你可以继续添加更多章节...
];