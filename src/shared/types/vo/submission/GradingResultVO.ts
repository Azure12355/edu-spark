import {UserVO} from "@/shared/types";

export interface GradingResultVO {
    scoreAwarded: number;
    feedback?: string;
    gradedAt: string;
    grader: UserVO;
}