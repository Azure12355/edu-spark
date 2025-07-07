
export interface LocalEditablePoint {
    id: number;
    title: string;
    content: string;
    type: '核心' | '重点' | '选学';
    difficulty: '简单' | '中等' | '困难';
    tags: string[];
}