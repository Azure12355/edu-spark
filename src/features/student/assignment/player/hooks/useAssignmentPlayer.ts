// [!file src/features/student/assignment/player/hooks/useAssignmentPlayer.ts]
import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useAssignmentPlayerStore } from '../store/assignmentPlayerStore';
import { AssignmentVO, QuestionVO, QuestionTypeEnum, UserVO } from "@/shared/types";

// --- 模拟数据，严格遵循类型定义 ---

const mockCreator: UserVO = {
    id: 101, username: 'teacher_wang', nickname: '王老师', role: 'TEACHER', status: 'ACTIVE', createdAt: new Date().toISOString()
};

// 模拟各种题型的题目
const mockQuestions: QuestionVO[] = [
    {
        id: 1,
        type: QuestionTypeEnum.SINGLE_CHOICE,
        difficulty: 'EASY',
        stem: '在JavaScript中，哪个关键字用于声明一个常量？',
        options: ['var', 'let', 'const', 'static'],
        answers: ['C'],
        analyses: ['`const` 用于声明一个块作用域的常量，一旦赋值后不能再重新赋值。'],
        knowledgePoints: [{ knowledgePointId: 1, knowledgePointTitle: '变量声明', knowledgePointType: '核心' }]
    },
    {
        id: 2,
        type: QuestionTypeEnum.MULTIPLE_CHOICE,
        difficulty: 'MEDIUM',
        stem: '以下哪些是有效的CSS选择器？',
        options: ['.class-name', '#id-name', 'div p', ':pseudo-class'],
        answers: ['A', 'B', 'C', 'D'],
        analyses: ['这四个都是CSS中常见的选择器类型。'],
        knowledgePoints: [{ knowledgePointId: 2, knowledgePointTitle: 'CSS选择器', knowledgePointType: '重点' }]
    },
    {
        id: 3,
        type: QuestionTypeEnum.TRUE_FALSE,
        difficulty: 'EASY',
        stem: '`null` 在JavaScript中是一个对象（object）。',
        options: [],
        answers: ['T'],
        analyses: ['这是一个历史遗留问题，`typeof null` 返回 `object`。'],
        knowledgePoints: [{ knowledgePointId: 3, knowledgePointTitle: '数据类型', knowledgePointType: '核心' }]
    },
    {
        id: 4,
        type: QuestionTypeEnum.FILL_IN_THE_BLANK,
        difficulty: 'MEDIUM',
        stem: 'React的生命周期方法 `componentDidMount` 在组件挂载后立即执行，它通常用于发起___请求。',
        answers: ['网络', 'API', '异步'],
        options: [],
        analyses: ['在组件挂载后进行数据获取是 `componentDidMount` 的常见用途。'],
        knowledgePoints: [{ knowledgePointId: 4, knowledgePointTitle: 'React生命周期', knowledgePointType: '重点' }]
    },
    {
        id: 5,
        type: QuestionTypeEnum.SHORT_ANSWER,
        difficulty: 'HARD',
        options: [],
        stem: '请简述TCP协议的三次握手过程。',
        answers: ['（1）客户端发送SYN包到服务器...（2）服务器响应SYN-ACK包...（3）客户端发送ACK包...'],
        analyses: ['三次握手是为了建立可靠的连接，确保双方都具备收发数据的能力。'],
        knowledgePoints: [{ knowledgePointId: 5, knowledgePointTitle: 'TCP协议', knowledgePointType: '核心' }]
    }
];

// 模拟一个完整的 AssignmentVO
const mockAssignment: AssignmentVO = {
    id: 1,
    courseId: 101,
    title: '第一章：数据结构基础测试',
    description: '检验您对线性表、栈和队列的理解程度。',
    type: 'HOMEWORK',
    templateStatus: 'READY',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    creator: mockCreator,
    questionCount: mockQuestions.length,
    totalScore: 100,
    config: { timeLimitMinutes: 60 },
    questions: mockQuestions.map((q, index) => ({
        question: q,
        score: 20,
        orderIndex: index
    }))
};

/**
 * 播放器页面的核心业务逻辑 Hook
 */
export const useAssignmentPlayer = () => {
    const params = useParams();
    const activityId = params.activityId as string;

    const { initializePlayer, ...playerState } = useAssignmentPlayerStore();

    // 模拟从API获取数据
    useEffect(() => {
        // 模拟API调用延迟
        const timer = setTimeout(() => {
            // 假设我们根据 activityId 获取到了 mockAssignment
            initializePlayer(mockAssignment);
        }, 500);

        return () => clearTimeout(timer);
    }, [activityId, initializePlayer]);

    return {
        ...playerState,
        currentQuestion: playerState.questions[playerState.currentQuestionIndex],
    };
};