// [!file src/shared/types/vo/course/classes/ClassActivityVO.ts]
import { UserVO } from '../../user';

export interface ClassActivityVO {
    id: number;
    title: string;
    description?: string;
    activityType: string;
    status: 'PENDING' | 'ONGOING' | 'ENDED'; // 动态计算的状态
    publishAt: string;
    startAt: string;
    dueAt: string;
    settingsOverride?: Record<string, any>;
    publisher: UserVO;
    activityTemplate: {
        id: number;
        originalTitle: string;
    };
}