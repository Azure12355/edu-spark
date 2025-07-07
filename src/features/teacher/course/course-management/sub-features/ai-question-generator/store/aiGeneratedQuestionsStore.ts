// [!file src/features/teacher/course/course-management/sub-features/ai-question-generator/store/aiGeneratedQuestionsStore.ts]
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

// 1. 导入所有需要的类型和服务
import {
    AIConfig,
} from '@/features/teacher/course/course-management/sub-features/ai-question-generator/hooks/useAIConfig';
import {
    AIQuestionRecordVO,
    AIGenerationTaskCreateRequestDTO,
    Page,
    AIQuestionRecordQueryRequestDTO,
} from '@/shared/types';
import {
    createGenerationTask,
    getGenerationTaskStatus,
    listAIQuestionRecordsByPage,
    discardAIQuestionRecord,
    importQuestionsToBank
} from '@/shared/services/aiQuestionService';
import { useToastStore } from '@/shared/hooks/useToast';
import { useUserStore } from '@/shared/store/userStore';

const POLLING_INTERVAL = 2500; // 轮询间隔（毫秒）

// 2. 定义 Store 的状态接口 (State)
interface AIGeneratedQuestionsState {
    questions: AIQuestionRecordVO[];
    pagination: {
        current: number;
        pageSize: number;
        total: number;
    };
    isListLoading: boolean; // 列表是否正在加载
    isTaskRunning: boolean; // AI出题任务是否正在运行
    taskProgress: number;   // 任务进度 (0-100)
    taskMessage: string;    // 任务状态消息
    currentTaskId: string | null; // 当前正在轮询的任务ID
    _pollingRef: NodeJS.Timeout | null; // 内部使用的轮询计时器引用
}

// 3. 定义 Store 的操作接口 (Actions)
interface AIGeneratedQuestionsActions {
    startGenerationTask: (config: AIConfig, courseId: number) => Promise<void>;
    fetchRecords: (courseId: number, page?: number) => Promise<void>;
    deleteQuestion: (recordId: number) => Promise<void>;
    addQuestionToBank: (recordId: number) => Promise<void>;
    clearQuestions: () => void;
    _startPolling: (taskId: string, courseId: number) => void;
    _stopPolling: () => void;
    _resetTaskState: () => void;
}

// 4. 定义初始状态
const initialState: AIGeneratedQuestionsState = {
    questions: [],
    pagination: {
        current: 1,
        pageSize: 10,
        total: 0,
    },
    isListLoading: true,
    isTaskRunning: false,
    taskProgress: 0,
    taskMessage: '',
    currentTaskId: null,
    _pollingRef: null,
};

// 5. 创建 Store
export const useAIGeneratedQuestionsStore = create<AIGeneratedQuestionsState & AIGeneratedQuestionsActions>()(
    immer((set, get) => ({
        ...initialState,

        // ===================================================================
        //  Public Actions (供UI组件调用)
        // ===================================================================

        /**
         * @description 开始一个AI出题任务
         */
        startGenerationTask: async (config, courseId) => {
            if (get().isTaskRunning) {
                useToastStore.getState().showToast({ message: '已有任务正在运行中', type: 'warning' });
                return;
            }

            set({ isTaskRunning: true, taskProgress: 0, taskMessage: '正在创建任务...' });

            const { loginUser } = useUserStore.getState();
            if (!loginUser) {
                useToastStore.getState().showToast({ message: '请先登录', type: 'error' });
                set({ isTaskRunning: false });
                return;
            }

            const requestDto: AIGenerationTaskCreateRequestDTO = {
                courseId: courseId,
                knowledgePointIds: config.knowledgePoints.map(p => p.id as number),
                questionType: config.selectedType,
                questionCount: config.quantity,
                difficulty: config.selectedDifficulty,
                modelId: config.modelId,
            };

            try {
                const response = await createGenerationTask(requestDto);
                set({ currentTaskId: response.taskId });
                useToastStore.getState().showToast({ message: '出题任务已成功创建！', type: 'info' });
                get()._startPolling(response.taskId, courseId);
            } catch (error) {
                // 错误已被 apiClient 拦截器处理
                get()._resetTaskState();
            }
        },

        /**
         * @description 分页获取AI生成的题目记录
         */
        fetchRecords: async (courseId, page = 1) => {
            set({ isListLoading: true });
            const { loginUser } = useUserStore.getState();
            if (!loginUser) {
                set({ isListLoading: false });
                return;
            }

            try {
                const query: AIQuestionRecordQueryRequestDTO = {
                    current: page,
                    pageSize: get().pagination.pageSize,
                    courseId: courseId,
                    creatorId: loginUser.id,
                    sortField: 'updated_at',
                    sortOrder: 'descend',
                };
                const result: Page<AIQuestionRecordVO> = await listAIQuestionRecordsByPage(query);
                set(state => {
                    state.questions = result.records;
                    state.pagination.current = result.current;
                    state.pagination.total = result.total;
                    state.isListLoading = false;
                });
            } catch (error) {
                set({ isListLoading: false });
            }
        },

        /**
         * @description 删除（丢弃）一条AI生成的题目
         */
        deleteQuestion: async (recordId) => {
            try {
                await discardAIQuestionRecord(recordId);
                useToastStore.getState().showToast({ message: '题目已丢弃', type: 'success' });
                // 从当前列表中移除，实现乐观更新
                set(state => {
                    state.questions = state.questions.filter(q => q.id !== recordId);
                    state.pagination.total -= 1;
                });
            } catch (error) {
                // 错误已被 apiClient 拦截器处理
            }
        },

        /**
         * @description 将单个题目加入到正式题库
         */
        addQuestionToBank: async (recordId) => {
            try {
                await importQuestionsToBank({ aiRecordIds: [recordId] });
                useToastStore.getState().showToast({ message: '成功加入题库！', type: 'success' });
                // 从当前列表中移除，实现乐观更新
                set(state => {
                    state.questions = state.questions.filter(q => q.id !== recordId);
                    state.pagination.total -= 1;
                });
            } catch (error) {
                // 错误已被 apiClient 拦截器处理
            }
        },

        /**
         * @description 清空所有已生成的题目（仅前端状态）
         */
        clearQuestions: () => {
            set(initialState); // 简单地重置为初始状态
        },

        // ===================================================================
        //  Internal Actions (带下划线，表示内部使用)
        // ===================================================================

        /**
         * @description 开始轮询任务状态
         */
        _startPolling: (taskId, courseId) => {
            const poll = async () => {
                try {
                    const status = await getGenerationTaskStatus(taskId);
                    set({ taskProgress: status.progress, taskMessage: status.message });

                    if (status.status === 'COMPLETED' || status.status === 'FAILED') {
                        get()._stopPolling();
                        useToastStore.getState().showToast({
                            message: status.status === 'COMPLETED' ? '题目生成完成！' : `任务失败: ${status.message || '未知错误'}`,
                            type: status.status === 'COMPLETED' ? 'success' : 'error',
                        });
                        await get().fetchRecords(courseId, 1); // 任务结束后刷新列表
                    }
                } catch (error) {
                    get()._stopPolling();
                }
            };
            get()._stopPolling(); // 确保开始前是干净的
            const intervalId = setInterval(poll, POLLING_INTERVAL);
            set({ _pollingRef: intervalId });
            poll(); // 立即执行一次
        },

        /**
         * @description 停止轮询
         */
        _stopPolling: () => {
            const pollingRef = get()._pollingRef;
            if (pollingRef) {
                clearInterval(pollingRef);
                set({ _pollingRef: null });
            }
            get()._resetTaskState();
        },

        /**
         * @description 重置任务相关的状态
         */
        _resetTaskState: () => {
            set({
                isTaskRunning: false,
                taskProgress: 0,
                taskMessage: '',
                currentTaskId: null,
            });
        },
    }))
);