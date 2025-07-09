// [!file src/features/teacher/course/course-management/sub-features/assignments-management/sub-features/assignment-player/store/assignmentPlayerStore.ts]
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

/**
 * 定义 Store 的状态接口
 */
interface AssignmentPlayerState {
    // 答题记录，key 为题目ID，value 为学生的答案
    answers: Record<number, any>;

    // 当前正在查看的题目索引
    currentQuestionIndex: number;

    // 标记的题目ID列表
    markedQuestionIds: Set<number>;

    // 计时器相关状态（如果需要）
    startTime: number | null;
    elapsedTime: number;
}

/**
 * 定义 Store 的操作（Actions）接口
 */
interface AssignmentPlayerActions {
    // 设置某个题目的答案
    setAnswer: (questionId: number, answer: any) => void;

    // 设置当前题目索引
    setCurrentQuestionIndex: (index: number) => void;

    // 切换题目的标记状态
    toggleMarkQuestion: (questionId: number) => void;

    // 开始计时
    startTimer: () => void;

    // 重置整个Store到初始状态
    resetStore: () => void;
}

/**
 * 初始状态
 */
const initialState: AssignmentPlayerState = {
    answers: {},
    currentQuestionIndex: 0,
    markedQuestionIds: new Set(),
    startTime: null,
    elapsedTime: 0,
};

/**
 * 创建 Zustand Store
 * 使用 immer 中间件来简化对嵌套状态（如 answers 对象）的更新。
 */
export const useAssignmentPlayerStore = create<AssignmentPlayerState & AssignmentPlayerActions>()(
    immer((set, get) => ({
        ...initialState,

        setAnswer: (questionId, answer) =>
            set((state) => {
                state.answers[questionId] = answer;
            }),

        setCurrentQuestionIndex: (index) =>
            set({ currentQuestionIndex: index }),

        toggleMarkQuestion: (questionId) =>
            set((state) => {
                if (state.markedQuestionIds.has(questionId)) {
                    state.markedQuestionIds.delete(questionId);
                } else {
                    state.markedQuestionIds.add(questionId);
                }
            }),

        startTimer: () => {
            // 防止重复启动计时器
            if (get().startTime === null) {
                set({ startTime: Date.now(), elapsedTime: 0 });
            }
        },

        resetStore: () => set(initialState),
    }))
);