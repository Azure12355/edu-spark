// src/shared/types/dto/user/UserQueryRequest.ts
import { PageRequest } from '@/shared/types/common'; // 假设 PageRequest 在通用类型文件中

/**
 * @description 用户查询请求的数据传输对象（DTO）。
 * 严格对标后端的 'com.weilanx.eduspark.model.dto.user.UserQueryRequest.java'。
 * 继承自通用的分页请求类型。
 */
export interface UserQueryRequestDTO extends PageRequest {
    /**
     * 用户名 (支持模糊查询)
     * @type {string | null}
     */
    username?: string;

    /**
     * 角色
     * @type {string | null}
     */
    role?: string;

    /**
     * 状态
     * @type {string | null}
     */
    status?: string;
}