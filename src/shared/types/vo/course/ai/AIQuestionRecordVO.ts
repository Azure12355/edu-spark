// src/shared/types/vo/ai/AIQuestionRecordVO.ts
import { UserVO } from '../../user/UserVO';
import { QuestionKnowledgePointLinkVO } from '../../question/QuestionKnowledgePointLinkVO';

/**
 * @description AI题目记录的视图对象（VO），用于在审核列表展示。
 * 严格对标后端的 'com.weilanx.eduspark.model.vo.ai.AIQuestionRecordVO.java'。
 */
export interface AIQuestionRecordVO {
    id: number;
    type: string;
    difficulty: string;
    stem: string;
    options?: string[];
    answers: string[];
    analyses: string[];
    modelUsed?: string;
    status: string;
    reviewComment?: string;
    importedQuestionId?: number;
    sourceKnowledgePoints: QuestionKnowledgePointLinkVO[];
    creator: UserVO;
    createdAt: string;
    updatedAt: string;
}