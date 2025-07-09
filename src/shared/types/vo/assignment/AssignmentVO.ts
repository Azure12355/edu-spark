import {AssignmentQuestionLinkVO} from "@/shared/types/vo/assignment/AssignmentQuestionLinkVO";
import {UserVO} from "@/shared/types";

export interface AssignmentVO {
    id: number;
    courseId: number;
    title: string;
    description?: string;
    type: string;
    templateStatus: string;
    config?: Record<string, any>;
    createdAt: string;
    updatedAt: string;
    creator: UserVO;
    questionCount?: number;
    totalScore?: number;
    questions?: AssignmentQuestionLinkVO[];
}