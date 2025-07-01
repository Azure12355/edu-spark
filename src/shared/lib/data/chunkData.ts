// src/lib/data/chunkData.ts

export interface Chunk {
    id: string;
    index: number;
    content: string;
    sourceDocument: string;
    charCount: number;
    updatedAt: string;
}

const sampleContents = [
    "Python的基本语法具有简洁、易读的特点，强调代码的可读性。以下是 Python 基本语法的详细罗列：\n1. 注释 (Comments)\n...",
    "'Hello''World'''''多行7. 运算符 (Operators)8. 输入和输出 (Input and Output)print(\"Hello, world!\")\nmy_tuple = (1, \"hello\", 3.14)",
    "字典 (Dictionaries): 无序、可变、键值对的集合。用大括号 {} 表示。...",
    "12. 错误和异常处理 (Error and Exception Handling) f\"发生错误: {e}\")finally: # 无论是否发生异常，都会执行\nprint(\"程序执行完毕.\")",
    "面向对象编程 (Object-Oriented Programming OOP)...",
    "Python基本语法\nPython基本语法",
];

const sourceDocuments = [
    { name: 'Python基本语法.pdf', type: 'pdf' },
    { name: 'Python基本语法.docx', type: 'docx' },
    { name: 'Python基本语法.pptx', type: 'pptx' },
];

export const chunkData: Chunk[] = Array.from({ length: 21 }, (_, i) => {
    const doc = sourceDocuments[i % sourceDocuments.length];
    const date = new Date(Date.now() - i * 1000 * 60 * 30); // 每30分钟一条

    return {
        id: `106465-_sys_auto_gen_doc_id-10196831511152972660-${i}`,
        index: i + 1,
        content: sampleContents[i % sampleContents.length],
        sourceDocument: doc.name,
        charCount: Math.floor(Math.random() * 2000) + 50,
        updatedAt: date.toISOString().slice(0, 19).replace('T', ' '),
    };
});