// src/lib/question-bank-data.ts
import { TagProps } from 'antd';

export type QuestionType = 'single-choice' | 'multi-choice' | 'true-false' | 'fill-in' | 'short-answer' | 'definition' | 'essay' | 'calculation' | 'programming';

export const questionTypeMap: Record<QuestionType, { text: string; color: TagProps['color'] }> = {
    'single-choice': { text: '单选题', color: 'blue' },
    'multi-choice': { text: '多选题', color: 'cyan' },
    'true-false': { text: '判断题', color: 'green' },
    'fill-in': { text: '填空题', color: 'gold' },
    'short-answer': { text: '简答题', color: 'purple' },
    'definition': { text: '名词解释', color: 'magenta' },
    'essay': { text: '论述题', color: 'volcano' },
    'calculation': { text: '计算题', color: 'orange' },
    'programming': { text: '程序题', color: 'geekblue' },
};

export interface Question {
    id: string;
    folderId: string;
    type: QuestionType;
    content: string;
    options?: string[];
    answer: string | string[];
    analysis: string;
    difficulty: 'easy' | 'medium' | 'hard';
    creator: string;
    createdAt: string;
}

export interface QuestionFolder {
    id: string;
    name: string;
    parentId: string | null;
    questionCount: number;
}

// --- [ENHANCEMENT] 增强模拟文件夹数据，包含更深层级和多样化名称 ---
export const mockFolders: QuestionFolder[] = [
    { id: 'folder-1', name: '第一章：Python入门', parentId: null, questionCount: 5 },
    { id: 'folder-1-1', name: '1.1 基础语法与环境配置', parentId: 'folder-1', questionCount: 2 },
    { id: 'folder-1-2', name: '1.2 第一个Python程序 - "Hello World"', parentId: 'folder-1', questionCount: 3 },
    { id: 'folder-2', name: '第二章：数据类型与变量', parentId: null, questionCount: 5 },
    { id: 'folder-3', name: '第三章：控制流（深入探讨循环与判断）', parentId: null, questionCount: 3 },
    { id: 'folder-4', name: '第四章：函数与模块的艺术', parentId: null, questionCount: 2 },
    { id: 'folder-4-1', name: '4.1 内置函数与高阶函数', parentId: 'folder-4', questionCount: 1 },
    { id: 'folder-4-1-1', name: '4.1.1 Lambda表达式专题', parentId: 'folder-4-1', questionCount: 1 }, // 三级目录
    { id: 'folder-5', name: '第五章：面向对象编程', parentId: null, questionCount: 0 },
    { id: 'folder-5-1', name: '5.1 类与对象', parentId: 'folder-5', questionCount: 0 },
    { id: 'folder-5-2', name: '5.2 继承与多态', parentId: 'folder-5', questionCount: 0 },
    { id: 'folder-5-2-1', name: '5.2.1 Mixin模式的应用', parentId: 'folder-5-2', questionCount: 0 }, // 四级目录
    { id: 'folder-empty', name: '空文件夹（用于测试删除）', parentId: null, questionCount: 0 },
    { id: 'folder-unassigned', name: '未分类题目', parentId: null, questionCount: 3 },
];

// --- 保持题目数据不变 ---
export const mockQuestions: Question[] = [
    { id: 'q-1', folderId: 'folder-1-1', type: 'single-choice', content: '以下哪个是 Python 中的关键字？', options: ['function', 'def', 'var', 'int'], answer: 'def', analysis: '在Python中，`def` 用于定义函数，是一个关键字。', difficulty: 'easy', creator: '王老师', createdAt: '2024-05-21' },
    { id: 'q-2', folderId: 'folder-2', type: 'multi-choice', content: 'Python 中不可变的数据类型有哪些？', options: ['List', 'Tuple', 'String', 'Set'], answer: ['Tuple', 'String'], analysis: 'Tuple（元组）和 String（字符串）是不可变的，而 List（列表）和 Set（集合）是可变的。', difficulty: 'medium', creator: 'AI助手', createdAt: '2024-05-20' },
    { id: 'q-3', folderId: 'folder-3', type: 'true-false', content: 'Python 中的 `else` 子句只能与 `if` 语句一起使用。', answer: 'false', analysis: '`else` 子句也可以与 `for` 和 `while` 循环（在循环正常结束时执行）以及 `try...except` 语句一起使用。', difficulty: 'hard', creator: '王老师', createdAt: '2024-05-19' },
    { id: 'q-4-1-1-1', folderId: 'folder-4-1-1', type: 'programming', content: '使用lambda表达式实现一个函数，计算两个数的和。', answer: 'add = lambda x, y: x + y', analysis: 'Lambda表达式提供了一种简洁的方式来创建匿名函数。', difficulty: 'medium', creator: 'AI助手', createdAt: '2024-05-18' },
    { id: 'q-5', folderId: 'folder-unassigned', type: 'short-answer', content: '请简述 Python 中 GIL（全局解释器锁）的作用和影响。', answer: 'GIL是CPython解释器中的一个锁...', difficulty: 'hard', creator: '王老师', createdAt: '2024-05-17', analysis: '...' },
    { id: 'q-6', folderId: 'folder-1-1', type: 'single-choice', content: 'Python 的官方缩写是什么？', answer: 'py', analysis: '通常使用 .py 作为Python文件的扩展名。', difficulty: 'easy', creator: '王老师', createdAt: '2024-05-22' },
    { id: 'q-7', folderId: 'folder-2', type: 'fill-in', content: '在Python中，创建一个空集合应该使用 ____。', answer: 'set()', analysis: '{} 创建的是一个空字典，而不是空集合。', difficulty: 'medium', creator: 'AI助手', createdAt: '2024-05-22' },
    { id: 'q-8', folderId: 'folder-1-2', type: 'short-answer', content: '如何在控制台打印 "Hello, World!"？', answer: "print('Hello, World!')", difficulty: 'easy', creator: '王老师', createdAt: '2024-05-23', analysis: '' },
    { id: 'q-9', folderId: 'folder-1-2', type: 'short-answer', content: '注释的符号是什么？', answer: '#', difficulty: 'easy', creator: '王老师', createdAt: '2024-05-23', analysis: '' },
    { id: 'q-10', folderId: 'folder-1-2', type: 'short-answer', content: '如何查看一个变量的类型？', answer: 'type()', difficulty: 'easy', creator: '王老师', createdAt: '2024-05-23', analysis: '' },
    { id: 'q-11', folderId: 'folder-2', type: 'true-false', content: '字典是无序的。', answer: 'false', difficulty: 'medium', creator: '王老师', createdAt: '2024-05-23', analysis: '在Python 3.7+中，字典是有序的。' },
    { id: 'q-12', folderId: 'folder-2', type: 'true-false', content: '集合中的元素是唯一的。', answer: 'true', difficulty: 'easy', creator: '王老师', createdAt: '2024-05-23', analysis: '集合的一个主要特性就是元素不重复。' },
    { id: 'q-13', folderId: 'folder-2', type: 'true-false', content: '`None` 和 `0` 相等。', answer: 'false', difficulty: 'easy', creator: '王老师', createdAt: '2024-05-23', analysis: '`None` 是一个特殊的对象，不等于任何其他值。' },
    { id: 'q-14', folderId: 'folder-3', type: 'short-answer', content: '`break` 和 `continue` 的区别是什么？', answer: 'break跳出整个循环，continue跳过当前迭代', difficulty: 'easy', creator: '王老师', createdAt: '2024-05-23', analysis: '' },
    { id: 'q-15', folderId: 'folder-3', type: 'short-answer', content: '`is` 和 `==` 的区别是什么？', answer: 'is判断对象id，==判断值', difficulty: 'medium', creator: '王老师', createdAt: '2024-05-23', analysis: '' },
    { id: 'q-16', folderId: 'folder-4-1', type: 'short-answer', content: '什么是*args和**kwargs？', answer: '用于接收不定长参数', difficulty: 'medium', creator: '王老师', createdAt: '2024-05-23', analysis: '' },
    { id: 'q-17', folderId: 'folder-unassigned', type: 'short-answer', content: 'Python是静态语言还是动态语言？', answer: '动态语言', difficulty: 'easy', creator: '王老师', createdAt: '2024-05-23', analysis: '' },
    { id: 'q-18', folderId: 'folder-unassigned', type: 'short-answer', content: '什么是鸭子类型？', answer: '“如果它走路像鸭子，叫声像鸭子，那么它就是一只鸭子”', difficulty: 'medium', creator: '王老师', createdAt: '2024-05-23', analysis: '关注对象的行为而非类型。' },
];