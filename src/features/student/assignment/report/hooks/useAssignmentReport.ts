// [!file src/features/student/assignment/player/hooks/useAssignmentReport.ts]

import {useAssignmentPlayerStore} from "@/features/student/assignment/player/store/assignmentPlayerStore";

/**
 * 为练习报告页面提供数据和逻辑的 Hook
 */
export const useAssignmentReport = () => {
    // 直接从 player store 中读取结果，实现了状态共享
    const { activity, submissionResult } = useAssignmentPlayerStore();

    const isLoading = !activity || !submissionResult;

    return {
        isLoading,
        activity,
        result: submissionResult,
    };
};