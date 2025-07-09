// [!file src/shared/types/vo/activity/ClassActivityVO.ts]
import { UserVO } from '../user';

interface ActivityTemplateInfo {
    id: number;
    originalTitle: string;
}

export interface ClassActivityVO {
    id: number;
    title: string;
    description?: string;
    activityType: string;
    status: string; // PENDING, NOT_STARTED, ONGOING, ENDED
    publishAt: string;
    startAt: string;
    dueAt: string;
    settingsOverride?: Record<string, any>;
    publisher: UserVO;
    activityTemplate: ActivityTemplateInfo;
}