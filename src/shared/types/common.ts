// src/shared/types/common.ts

/**
 * 通用分页请求参数
 */
export interface PageRequest {
    current?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: 'ascend' | 'descend';
}

/**
 * @description 通用的分页响应数据结构。
 * @template T - 分页记录的类型。
 */
export interface Page<T> {
    records: T[];
    total: number;
    size: number;
    current: number;
    pages?: number; // 后端 Mybatis-Plus Page 对象包含此字段
}