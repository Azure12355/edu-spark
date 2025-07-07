// src/shared/types/enums/UserStatusEnum.ts
export enum UserStatusEnum {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE',
    BANNED = 'BANNED',
}
export const UserStatusTextMap: Record<UserStatusEnum, string> = {
    [UserStatusEnum.ACTIVE]: '正常',
    [UserStatusEnum.INACTIVE]: '停用',
    [UserStatusEnum.BANNED]: '封禁',
};