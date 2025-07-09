// [!file src/shared/types/vo/course/classes/ClassMemberVO.ts]
import { UserVO } from '../../user';

export interface ClassMemberVO {
    role: string;
    status: string;
    joinedAt: string;
    user: UserVO;
}