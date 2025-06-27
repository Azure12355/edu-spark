// src/lib/data/questionBankData.ts

// 1. 导入新的类型和枚举
import { Question } from '@/types/question';
import { QuestionType, QuestionDifficulty } from '@/constants/enums';
import { KnowledgePoint, KnowledgePointType } from '@/types/knowledge';
import { syllabusData } from './syllabusData'; // 保持 syllabusData 的结构和位置不变

// 辅助函数：根据 ID 查找知识点对象
const findPoint = (id: string): KnowledgePoint | null => {
    for (const chapter of syllabusData) {
        for (const section of chapter.sections) {
            const point = section.points.find(p => p.id === id);
            if (point) return point as KnowledgePoint; // 强制类型转换，因为 syllabusData 中的 type 是字符串
        }
    }
    return null;
};
const findPoints = (ids: string[]): KnowledgePoint[] => {
    return ids.map(id => findPoint(id)).filter((p): p is KnowledgePoint => p !== null);
};

// 模拟的题库数据，以 pointId 为 key (重构后)
export const questionBankData: Record<string, Question[]> = {
    'p-1-2-1': [
        {
            id: 'q-001',
            points: findPoints(['p-1-2-1']),
            type: QuestionType.SINGLE_CHOICE,
            difficulty: QuestionDifficulty.EASY,
            stem: '在算法分析中，大O表示法（Big O notation）通常用来描述算法的什么特性？',
            options: ['最佳情况下的时间复杂度', '平均情况下的时间复杂度', '最坏情况下的时间复杂度', '算法的精确执行时间'],
            answers: ['最坏情况下的时间复杂度'],
            analyses: ['大O表示法描述了算法执行时间（或空间）的上界，即在最坏情况下的增长趋势。'],
            creators: ['王老师'],
            createdAt: new Date('2024-05-10').getTime(),
        },
        {
            id: 'q-002',
            points: findPoints(['p-1-2-1', 'p-1-2-2']),
            type: QuestionType.MULTIPLE_CHOICE,
            difficulty: QuestionDifficulty.MEDIUM,
            stem: '下列哪些算法的时间复杂度为 O(n log n)？',
            options: ['快速排序 (平均情况)', '归并排序', '堆排序', '冒泡排序 (最坏情况)'],
            answers: ['快速排序 (平均情况)', '归并排序', '堆排序'],
            analyses: ['快速排序的平均和最佳时间复杂度是 O(n log n)，最坏是 O(n^2)。归并排序和堆排序在所有情况下都是 O(n log n)。冒泡排序是 O(n^2)。'],
            creators: ['王老师'],
            createdAt: new Date('2024-05-11').getTime(),
        },
    ],
    'p-2-1-2': [
        {
            id: 'q-003',
            points: findPoints(['p-2-1-2']),
            type: QuestionType.TRUE_FALSE,
            difficulty: QuestionDifficulty.EASY,
            stem: '双向链表在插入和删除节点时，其效率一定高于单链表。',
            answers: ['true'],
            analyses: ['正确。因为双向链表可以直接找到前驱节点，而单链表需要从头遍历，所以双向链表在插入删除操作上通常更高效。'],
            creators: ['王老师'],
            createdAt: new Date('2024-05-12').getTime(),
        },
        {
            id: 'q-004',
            points: findPoints(['p-2-1-2']),
            type: QuestionType.SHORT_ANSWER,
            difficulty: QuestionDifficulty.MEDIUM,
            stem: '请简述循环链表和普通单链表相比，其主要优点和应用场景是什么？',
            answers: ['主要优点是从任意节点出发都可以遍历整个链表。\n主要应用场景是解决需要循环遍历的问题，如约瑟夫环问题。'],
            analyses: ['循环链表将尾节点的指针指向头节点，形成环状结构，这使得从任何节点开始都能遍历所有节点，非常适合需要循环访问数据的场景。'],
            creators: ['王老师'],
            createdAt: new Date('2024-05-13').getTime(),
        },
        {
            id: 'q-005',
            points: findPoints(['p-2-1-2']),
            type: QuestionType.PROGRAMMING,
            difficulty: QuestionDifficulty.HARD,
            stem: '请用 Java 实现一个函数，反转一个单链表。\n\n**输入:** 一个单链表的头节点 `head`\n**输出:** 反转后链表的头节点',
            answers: [
                "```java\n" +
                "public ListNode reverseList(ListNode head) {\n" +
                "    ListNode prev = null;\n" +
                "    ListNode curr = head;\n" +
                "    while (curr != null) {\n" +
                "        ListNode nextTemp = curr.next;\n" +
                "        curr.next = prev;\n" +
                "        prev = curr;\n" +
                "        curr = nextTemp;\n" +
                "    }\n" +
                "    return prev;\n" +
                "}\n```"
            ],
            analyses: ['可以使用迭代法，通过三个指针 `prev`, `curr`, `next` 来实现。`prev` 指向反转后链表的尾部（初始为 null），`curr` 指向当前待反转的节点，`next` 用于保存 `curr` 的下一个节点。'],
            creators: ['王老师', 'AI助教'],
            createdAt: new Date('2024-05-14').getTime(),
        }
    ],
    'p-3-1-3': [
        // ... 此处省略，请参照上面格式自行填充或扩展
    ]
};