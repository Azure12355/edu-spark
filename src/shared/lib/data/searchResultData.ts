// src/lib/data/searchResultData.ts

export interface SearchResult {
    id: string;
    content: string;
    sourceDocument: {
        name: string;
        type: 'docx' | 'pdf' | 'pptx' | 'txt' | 'md' | 'xlsx';
    };
    score: number;
    rank: number;
}

const sampleResults: Omit<SearchResult, 'id'>[] = [
    {
        content: "Python的基本语法具有简洁、易读的特点，强调代码的可读性。以下是 Python 基本语法的详细罗列：\n1. 注释 (Comments)\n· 单行注释: 以 # 开头，从 # 到行尾的内容都会被解释器忽略。...",
        sourceDocument: { name: 'Python基本语法.docx', type: 'docx' },
        score: 0.3517,
        rank: 1,
    },
    {
        content: "Python的基本语法具有简洁、易读的特点，强调代码的可读性。以下是 Python 基本语法的详细罗列：\n1. 注释 (Comments)\n...",
        sourceDocument: { name: 'Python基本语法.pdf', type: 'pdf' },
        score: 0.3498,
        rank: 2,
    },
    {
        content: "面向对象编程 (Object-Oriented Programming OOP)是Python的核心特性之一。它允许开发者通过类（Class）和对象（Object）来组织代码，实现封装、继承和多态。这大大提高了代码的复用性和可维护性。",
        sourceDocument: { name: 'Python基本语法.pptx', type: 'pptx' },
        score: 0.3321,
        rank: 3,
    },
];

export const searchResultData: SearchResult[] = sampleResults.map(item => ({
    id: `result-${Math.random().toString(36).substr(2, 9)}`,
    ...item
}));