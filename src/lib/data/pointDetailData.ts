// src/lib/data/pointDetailData.ts
import { KnowledgePoint, syllabusData } from './syllabusData';

export interface PointDetail extends KnowledgePoint {
    difficulty: '简单' | '中等' | '困难';
    tags: string[];
    viewCount: number;
    likeCount: number;
    lastReviewed?: string;
    content: string; // Markdown 格式的内容
}

export interface HotQuestion {
    id: string;
    title: string;
    viewCount: number;
}

// 模拟的知识点详情数据
const pointDetails: Record<string, Omit<PointDetail, keyof KnowledgePoint>> = {
    'p-3-1-1': {
        difficulty: '简单',
        tags: ['算法基础', '性能分析'],
        viewCount: 52313,
        likeCount: 390,
        content: `
# 回答重点

## 序列化 (Serialization)
是将对象转换为字节流的过程，这样对象可以通过网络传输、持久化存储或者缓存。Java 提供了 \`java.io.Serializable\` 接口来支持序列化，只要类实现了这个接口，就可以将该类的对象进行序列化。

\`\`\`java
public class User implements java.io.Serializable {
    private static final long serialVersionUID = 1L;
    private String name;
    private int age;
    // 构造函数、getter/setter 省略
}
\`\`\`

## 反序列化 (Deserialization)
是将字节流重新转换为对象的过程，即从存储中读取数据并重新创建对象。

## 其它
- **应用场景**: 包括网络传输、远程调用、持久化存储（如保存到文件或数据库），以及分布式系统中数据交换。
- **Java 序列化关键类和接口**: \`ObjectOutputStream\` 用于序列化，\`ObjectInputStream\` 用于反序列化。类必须实现 \`Serializable\` 接口才能被序列化。
- **transient 关键字**: 在序列化过程中，有些字段不需要被序列化，例如敏感数据，可以使用 \`transient\` 关键字标记不需要序列化的字段。
- **serialVersionUID**: 每个 \`Serializable\` 类都应该定义一个 \`serialVersionUID\`，用于在反序列化时验证版本一致性。如果没有显式定义，JVM会根据类的结构自动生成一个，但这可能导致在类结构发生变化后反序列化失败。

# 扩展知识

### 序列化与反序列化深层理解
序列化不仅仅是保存对象的数据，它还保存了对象的类型信息、对象数据的类型以及对象内部数据的细节。这使得反序列化时能够精确地重建对象。

- **深拷贝与浅拷贝**: 序列化可以实现对象的深拷贝。通过将对象序列化到内存中的字节数组，然后再从字节数组中反序列化，可以得到一个与原对象完全独立但内容相同的新对象。

### Java 序列化 Serializable 与 Externalizable 的区别
- \`Serializable\` 是一个标记接口，没有方法。JVM会负责默认的序列化过程。
- \`Externalizable\` 接口继承自 \`Serializable\`，它包含两个方法 \`writeExternal()\` 和 \`readExternal()\`。实现这个接口可以让你完全控制对象的序列化和反序列化过程，性能通常更好，但也更复杂。
    `,
    },
    // 你可以为 syllabusData 中的每个 point.id 添加一个条目
    'p-2-1-2': {
        difficulty: '中等',
        tags: ['数据结构', '线性表'],
        viewCount: 48990,
        likeCount: 512,
        content: `
# 单链表、循环链表与双向链表

## 单链表 (Singly Linked List)
每个节点只包含一个指向下一个节点的指针。
- **优点**: 结构简单，节省存储空间。
- **缺点**: 只能单向遍历，访问前驱节点需要从头开始。

## 循环链表 (Circular Linked List)
尾节点的指针指向头节点，形成一个环。
- **优点**: 可以从任意节点开始遍历整个链表。

## 双向链表 (Doubly Linked List)
每个节点包含两个指针，一个指向前驱节点，一个指向后继节点。
- **优点**: 可以双向遍历，方便地访问前驱和后继节点，插入和删除操作更高效。
- **缺点**: 需要额外的存储空间来存放前驱指针。
    `,
    }
};

// 模拟的热门题目数据
export const hotQuestions: HotQuestion[] = [
    { id: 'q1', title: '你认为 Java 的优势是什么？', viewCount: 55409 },
    { id: 'q2', title: 'Java 中的序列化和反序列化...', viewCount: 52279 },
    { id: 'q3', title: '说说 Java 中的多态', viewCount: 40010 },
    { id: 'q4', title: '什么是 Java 的泛型？', viewCount: 39134 },
    { id: 'q5', title: 'MySQL 中的索引...', viewCount: 37890 },
];

// 一个函数，用于根据 pointId 获取完整的详情数据
export const getPointDetailById = (pointId: string): PointDetail | null => {
    let basePoint: KnowledgePoint | null = null;

    for (const chapter of syllabusData) {
        for (const section of chapter.sections) {
            const found = section.points.find(p => p.id === pointId);
            if (found) {
                basePoint = found;
                break;
            }
        }
        if (basePoint) break;
    }

    if (!basePoint) return null;

    const detailData = pointDetails[pointId] || {
        difficulty: '中等',
        tags: ['待补充'],
        viewCount: 100,
        likeCount: 10,
        content: '# 内容正在建设中...\n\n该知识点的详细内容正在紧急编写中，敬请期待！'
    };

    return { ...basePoint, ...detailData };
};