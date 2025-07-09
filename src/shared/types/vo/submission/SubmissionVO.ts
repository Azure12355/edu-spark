import { ClassActivityVO } from '../activity/ClassActivityVO';
import {UserVO} from "@/shared/types";
export interface SubmissionVO {
    id: number;
    submittedAnswers: Record<number, any>;
    scoreAwarded?: number;
    status: string;
    gradingFeedback?: string;
    submittedAt: string;
    gradedAt?: string;
    student: UserVO;
    activity: ClassActivityVO;
}