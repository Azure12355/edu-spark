// [!file src/features/student/assignment/player/store/assignmentPlayerStore.ts]
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { AssignmentVO, QuestionVO, QuestionTypeEnum } from "@/shared/types";

type AnswersState = Record<number, any>;

// [code focus start ++]
// 新增：定义提交结果的状态
interface SubmissionResult {
    score: number;
    totalScore: number;
    correctCount: number;
    totalQuestions: number;
}
// [code focus end ++]

interface PlayerState {
    activity: AssignmentVO | null;
    questions: QuestionVO[];
    currentQuestionIndex: number;
    userAnswers: AnswersState;
    startTime: number | null;
    isLoading: boolean;
    error: string | null;
    // [code focus start ++]
    submissionStatus: 'idle' | 'submitting' | 'submitted'; // 新增：交卷状态
    submissionResult: SubmissionResult | null; // 新增：存储交卷结果
    // [code focus end ++]
}

interface PlayerActions {
    initializePlayer: (activity: AssignmentVO) => void;
    setCurrentQuestionIndex: (index: number) => void;
    updateUserAnswer: (questionId: number, answer: any) => void;
    submitAnswers: () => void;
    resetPlayer: () => void;
}

const initialState: PlayerState = {
    activity: null,
    questions: [],
    currentQuestionIndex: 0,
    userAnswers: {},
    startTime: null,
    isLoading: true,
    error: null,
    // [code focus start ++]
    submissionStatus: 'idle',
    submissionResult: null,
    // [code focus end ++]
};

// [code focus start ++]
export const useAssignmentPlayerStore = create<PlayerState & PlayerActions>()(
    immer((set, get) => ({ // 注意：这里需要添加 get
// [code focus end ++]
        ...initialState,

        initializePlayer: (activity) => set(state => {
            state.activity = activity;
            state.questions = activity.questions?.map(qLink => qLink.question) || [];
            state.currentQuestionIndex = 0;
            state.userAnswers = {};
            state.startTime = Date.now();
            state.isLoading = false;
            state.error = null;
            // [code focus start ++]
            // 重置交卷状态
            state.submissionStatus = 'idle';
            state.submissionResult = null;
            // [code focus end ++]
        }),

        setCurrentQuestionIndex: (index) => set(state => {
            if (index >= 0 && index < state.questions.length) {
                state.currentQuestionIndex = index;
            }
        }),

        updateUserAnswer: (questionId, answer) => set(state => {
            state.userAnswers[questionId] = answer;
        }),

        // [code focus start ++]
        // --- 核心重构：实现完整的交卷和评分逻辑 ---
        submitAnswers: () => {
            set({ submissionStatus: 'submitting' });

            // 使用 get() 来安全地访问当前状态
            const { questions, userAnswers, activity } = get();

            if (!activity || !activity.questions) {
                console.error("无法交卷：练习活动数据不完整。");
                set({ submissionStatus: 'idle' });
                return;
            }

            let calculatedScore = 0;
            let correctCount = 0;
            const totalScore = activity.totalScore || 100;

            activity.questions.forEach(qLink => {
                const question = qLink.question;
                const questionId = question.id as number;
                const userAnswer = userAnswers[questionId];
                const correctAnswer = question.answers;

                if (userAnswer === undefined || userAnswer === null || userAnswer === '') return;

                let isCorrect = false;
                switch (question.type) {
                    case QuestionTypeEnum.SINGLE_CHOICE:
                    case QuestionTypeEnum.TRUE_FALSE:
                        isCorrect = userAnswer === correctAnswer[0];
                        break;

                    case QuestionTypeEnum.MULTIPLE_CHOICE:
                        // 确保答案数组经过排序，以进行准确比较
                        isCorrect = Array.isArray(userAnswer) &&
                            userAnswer.length === correctAnswer.length &&
                            [...userAnswer].sort().join(',') === [...correctAnswer].sort().join(',');
                        break;

                    // 填空和简答题暂时以“作答即给分”的方式模拟
                    case QuestionTypeEnum.FILL_IN_THE_BLANK:
                    case QuestionTypeEnum.SHORT_ANSWER:
                    case QuestionTypeEnum.PROGRAMMING:
                        // 简化逻辑：只要回答了就认为是正确的（用于骨架演示）
                        isCorrect = !!userAnswer;
                        break;
                }

                if (isCorrect) {
                    correctCount++;
                    calculatedScore += qLink.score;
                }
            });

            // 模拟延迟后更新结果
            setTimeout(() => {
                set(state => {
                    state.submissionResult = {
                        score: calculatedScore,
                        totalScore: totalScore,
                        correctCount: correctCount,
                        totalQuestions: questions.length,
                    };
                    state.submissionStatus = 'submitted';
                });
            }, 1000); // 模拟1秒的提交处理时间
        },
        // [code focus end ++]

        resetPlayer: () => set(initialState),
    }))
);