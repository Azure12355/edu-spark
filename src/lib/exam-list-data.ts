// src/lib/exam-list-data.ts

// 题单的状态
export type ExamListStatus = 'draft' | 'published';

// 题单的数据结构
export interface ExamList {
  id: string;
  title: string;
  description: string;
  status: ExamListStatus;
  creator: string;
  createdAt: string;
  updatedAt: string;
  questionIds: string[]; // 关键字段：关联的题目ID数组
  tags: string[];
  totalScore: number; // 总分可以根据题目动态计算
}

// 模拟的题单数据，确保questionIds引用了mockQuestions中的有效ID
export const mockExamLists: ExamList[] = [
  {
    id: 'exam-001',
    title: '第一章 Python基础 单元测试',
    description: '覆盖Python入门、关键字、变量和第一个程序相关的基础知识点，适合初学者自我检测。',
    status: 'published',
    creator: '王老师',
    createdAt: '2024-05-25',
    updatedAt: '2024-05-26',
    questionIds: ['q-1', 'q-6', 'q-8', 'q-9', 'q-10'],
    tags: ['Python', '单元测试', '基础'],
    totalScore: 25,
  },
  {
    id: 'exam-002',
    title: '期中综合能力测验 (预发布)',
    description: '涵盖前四章的核心内容，包括数据类型、控制流和函数，旨在考察学生的综合运用能力。',
    status: 'draft',
    creator: '王老师',
    createdAt: '2024-06-01',
    updatedAt: '2024-06-02',
    questionIds: ['q-2', 'q-3', 'q-4-1-1-1', 'q-7', 'q-11', 'q-14', 'q-15', 'q-16'],
    tags: ['期中考试', '综合'],
    totalScore: 80,
  },
  {
    id: 'exam-003',
    title: '高级特性摸底考试',
    description: '针对GIL、设计模式、动态语言特性等Python高级主题的专项考察。',
    status: 'published',
    creator: 'AI助教',
    createdAt: '2024-05-28',
    updatedAt: '2024-05-28',
    questionIds: ['q-5', 'q-17', 'q-18'],
    tags: ['Python', '高级', '面试'],
    totalScore: 30,
  },
  {
    id: 'exam-004',
    title: '课后练习题单 (空)',
    description: '这是一个预创建的题单，用于存放后续章节的课后练习题。',
    status: 'draft',
    creator: '王老师',
    createdAt: '2024-06-03',
    updatedAt: '2024-06-03',
    questionIds: [],
    tags: ['课后作业'],
    totalScore: 0,
  },
];