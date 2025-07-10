// src/shared/lib/data/creativeCardData.ts
import { CreativeCardData } from '@/features/student/home/components/common/CreativeCard/CreativeCard';
import { Atom, Beaker, BrainCircuit, Code, Sigma } from "lucide-react";
import React from "react";

export const creativeCardMockData: CreativeCardData[] = [
    // --- 类型 1: 概念闪卡 (Concept) ---
    {
        id: 'concept-1',
        type: 'concept',
        title: '闭包',
        subtitle: 'JavaScript',
        content: '函数及其周边状态（词法环境）的引用捆绑。',
        theme: 'lilac',
        icon: <BrainCircuit size={150} />,
},
{
    id: 'concept-2',
        type: 'concept',
    title: '熵',
    subtitle: '热力学',
    content: '衡量一个系统混乱程度的物理量。',
    theme: 'ember',
    icon: <Atom size={150} />,
},
{
    id: 'concept-3',
        type: 'concept',
    title: '光合作用',
    subtitle: '生物学',
    content: '植物利用光能将二氧化碳和水转化为能量的过程。',
    theme: 'meadow',
    icon: <Beaker size={150} />,
},

// --- 类型 2: 代码片段卡 (Code) ---
{
    id: 'code-1',
        type: 'code',
    title: '快速排序',
    subtitle: 'Python',
    content:
    `def quick_sort(arr):
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    return quick_sort(left) + middle + quick_sort(right)`,
        theme: 'sky', // 使用背景色
    icon: <Code size={18} />,
},

// --- 类型 3: 公式卡 (Formula) ---
{
    id: 'formula-1',
        type: 'formula',
    title: '欧拉公式',
    subtitle: '数学',
    content: 'e^(iπ) + 1 = 0',
    theme: 'lilac',
    icon: <Sigma size={18} />,
},
{
    id: 'code-2',
        type: 'code',
    title: 'React Hook',
    subtitle: 'TypeScript',
    content:
    `import { useState, useEffect } from 'react';

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}`,
        theme: 'ember',
    icon: <Code size={18} />,
},
{
    id: 'formula-2',
        type: 'formula',
    title: '质能方程',
    subtitle: '物理学',
    content: 'E = mc²',
    theme: 'meadow',
    icon: <Sigma size={18} />,
},
{
    id: 'concept-4',
        type: 'concept',
    title: '认知失调',
    subtitle: '心理学',
    content: '个体持有相互矛盾的信念、想法或价值观时的心理压力。',
    theme: 'sky',
    icon: <BrainCircuit size={150} />,
},
    {
        id: 'formula-112',
        type: 'formula',
        title: '质能方程',
        subtitle: '物理学',
        content: 'E = mc²',
        theme: 'sakura',
        icon: <Sigma size={18} />,
    },
    {
        id: 'concept-1234',
        type: 'concept',
        title: '认知失调',
        subtitle: '心理学',
        content: '个体持有相互矛盾的信念、想法或价值观时的心理压力。',
        theme: 'lemon',
        icon: <BrainCircuit size={150} />,
    },
];