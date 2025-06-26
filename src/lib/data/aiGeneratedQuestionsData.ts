// src/lib/data/aiGeneratedQuestionsData.ts
import { Question } from './questionBankData';
import { syllabusData, KnowledgePoint } from './syllabusData'; // 导入所需类型和数据

// 辅助函数：根据 title 查找知识点对象（因为AI题目用的是title）
const findPointByTitle = (title: string): KnowledgePoint | null => {
    for (const chapter of syllabusData) {
        for (const section of chapter.sections) {
            const point = section.points.find(p => p.title === title);
            if (point) return point;
        }
    }
    return null;
};
const findPointsByTitle = (titles: string[]): KnowledgePoint[] => {
    return titles.map(title => findPointByTitle(title)).filter((p): p is KnowledgePoint => p !== null);
};

export interface AIGeneratedQuestion extends Question {};

// 更新后的模拟数据，包含所有题型
export const aiGeneratedQuestionsData: AIGeneratedQuestion[] = [
    {
        id: 'ai-q-1',
        points: [{ id: 'p-2-2-1', title: '栈 (LIFO) 的实现与应用', type: '核心' }],
        type: '单选题',
        difficulty: '简单',
        stem: '在Python中，`not True`的结果是什么？',
        options: ['`True`', '`False`', '`None`', '`Error`'],
        answer: '`False`',
        analysis: '`not`运算符用于逻辑非操作，它将一个布尔值取反。因此，`not True`的结果是`False`。',
        creator: 'AI',
        createdAt: '2024-05-20 10:30'
    },
    {
        id: 'ai-q-2',
        points: [{ id: 'p-2-2-1', title: '栈 (LIFO) 的实现与应用', type: '核心' }],
        type: '单选题',
        difficulty: '简单',
        stem: '表达式 `5 > 3 or 1 < 0` 在Python中的值为？',
        options: ['`True`', '`False`', '`1`', '`0`'],
        answer: '`True`',
        analysis: '`or`运算符在两个操作数中只要有一个为`True`，结果就为`True`。因为 `5 > 3` 是 `True`，所以整个表达式的值为 `True`，并且由于“短路求值”特性，`1 < 0` 不会被计算。',
        creator: 'AI',
        createdAt: '2024-05-20 10:31'
    },
    {
        id: 'ai-q-3',
        points: [{ id: 'p-2-2-1', title: '栈 (LIFO) 的实现与应用', type: '核心' }],
        type: '多选题',
        difficulty: '中等',
        stem: '下列哪些数据结构的操作，其平均时间复杂度为 O(1)？',
        options: [
            '哈希表（Hash Table）的插入操作',
            '数组（Array）的末尾添加元素（当容量足够时）',
            '单链表（Singly Linked List）的头部插入操作',
            '栈（Stack）的 Push 和 Pop 操作'
        ],
        answer: [
            '哈希表（Hash Table）的插入操作',
            '数组（Array）的末尾添加元素（当容量足够时）',
            '单链表（Singly Linked List）的头部插入操作',
            '栈（Stack）的 Push 和 Pop 操作'
        ],
        analysis: '哈希表在没有哈希冲突的理想情况下插入是O(1)。数组末尾添加在不扩容时是O(1)。链表头部插入和栈的压入/弹出操作都只需要改变指针，是O(1)。',
        creator: 'AI',
        createdAt: '2024-05-20 10:32'
    },
    {
        id: 'ai-q-4',
        points: [{ id: 'p-2-2-1', title: '栈 (LIFO) 的实现与应用', type: '核心' }],
        type: '判断题',
        difficulty: '中等',
        stem: '已知一棵二叉树的前序遍历序列和后序遍历序列，可以唯一确定这棵二叉树的结构。',
        answer: false,
        analysis: '错误。仅凭前序和后序遍历无法唯一确定一棵二叉树。例如，一个节点，其左子树为空，右子树只有一个节点；和另一个节点，其右子树为空，左子树只有一个节点，这两种情况的前序和后序遍历序列可能相同。必须是**中序遍历**与**前序**或**后序**之一结合，才能唯一确定一棵二叉树。',
        creator: 'AI',
        createdAt: '2024-05-20 10:33'
    },
    {
        id: 'ai-q-5',
        points: [{ id: 'p-2-2-1', title: '栈 (LIFO) 的实现与应用', type: '核心' }],
        type: '填空题',
        difficulty: '简单',
        stem: '在HTTP协议中，表示“页面未找到”的状态码是______。',
        answer: '404',
        analysis: 'HTTP状态码中，`404 Not Found` 是客户端错误响应代码，表示服务器找不到请求的资源。',
        creator: 'AI',
        createdAt: '2024-05-20 10:34'
    },
    {
        id: 'ai-q-6',
        points: [{ id: 'p-2-2-1', title: '栈 (LIFO) 的实现与应用', type: '核心' }],
        type: '简答题',
        difficulty: '中等',
        stem: '请简述 CSS 中 `Flexbox` 布局和 `Grid` 布局的主要区别和各自的适用场景。',
        answer: `
1.  **维度差异**:
    *   **Flexbox** 主要是一维布局系统，设计用来在单行或单列上对齐项目。
    *   **Grid** 是二维布局系统，可以同时处理行和列。
2.  **适用场景**:
    *   **Flexbox** 非常适合组件内部的元素对齐，如导航栏项目、按钮组等。
    *   **Grid** 非常适合整个页面的宏观布局，创建复杂的、非线性的网格结构。
`,
        analysis: '核心区别在于维度。Flexbox 擅长处理一维（行或列）的对齐和分布，而 Grid 擅长处理二维（行和列）的整体布局。简单来说，“Flexbox for components, Grid for layout”。',
        creator: 'AI',
        createdAt: '2024-05-20 10:35'
    },
    {
        id: 'ai-q-7',
        points: [{ id: 'p-2-2-1', title: '栈 (LIFO) 的实现与应用', type: '核心' }],
        type: '编程题',
        difficulty: '困难',
        stem: '请手写一个 JavaScript 函数 `myReduce`，模拟实现原生 `Array.prototype.reduce` 的功能，不能使用原生的 `reduce` 方法。',
        answer:
            "```javascript\n" +
            "function myReduce(arr, callback, initialValue) {\n" +
            "  if (!Array.isArray(arr) || typeof callback !== 'function') {\n" +
            "    throw new TypeError('Invalid arguments');\n" +
            "  }\n\n" +
            "  let accumulator = initialValue;\n" +
            "  let startIndex = 0;\n\n" +
            "  if (initialValue === undefined) {\n" +
            "    if (arr.length === 0) {\n" +
            "      throw new TypeError('Reduce of empty array with no initial value');\n" +
            "    }\n" +
            "    accumulator = arr[0];\n" +
            "    startIndex = 1;\n" +
            "  }\n\n" +
            "  for (let i = startIndex; i < arr.length; i++) {\n" +
            "    accumulator = callback(accumulator, arr[i], i, arr);\n" +
            "  }\n\n" +
            "  return accumulator;\n" +
            "}\n```",
        analysis: '实现的关键在于正确处理 `initialValue` 是否存在的两种情况。如果 `initialValue` 不存在，则累加器 `accumulator` 初始值为数组的第一个元素，并从第二个元素开始遍历。如果存在，则从第一个元素开始遍历。同时，需要处理空数组且无初始值的边界情况，这会抛出 `TypeError`。',
        creator: 'AI',
        createdAt: '2024-05-20 10:36'
    }
];