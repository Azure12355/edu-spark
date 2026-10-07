import {QuestionVO} from "@/shared/types";

export interface AssignmentQuestionLinkVO {
    assignmentId?: number;
    questionId?: number;
    score: number;
    orderIndex: number;
    question: QuestionVO;
}
