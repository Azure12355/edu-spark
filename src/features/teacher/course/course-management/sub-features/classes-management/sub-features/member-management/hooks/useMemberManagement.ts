// [!file src/features/teacher/course/course-management/sub-features/classes-management/sub-features/member-management/hooks/useMemberManagement.ts]
"use client";

import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';
import { useToast } from '@/shared/hooks/useToast';
import { useConfirmationModal } from '@/shared/hooks/useConfirmationModal';
import { useDebounce } from '@/shared/hooks/useDebounce';
import {ClassMemberVO, Page} from "@/shared/types";
import {MemberQueryRequestDTO} from "@/shared/types/dto/course/classes";
import {listMembersByPage, removeMember} from "@/shared/services";

/**
 * 班级成员管理页面的核心逻辑 Hook。
 */
export const useMemberManagement = () => {
    // 1. 状态定义
    const [members, setMembers] = useState<ClassMemberVO[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
        total: 0,
    });
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState<Partial<MemberQueryRequestDTO>>({});
    const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

    // 2. 依赖与路由
    const params = useParams();
    // 从URL中获取 courseId 和 classId
    const courseId = Number(params.id);
    const classId = Number(params.classId);

    const showToast = useToast();
    const showConfirmationModal = useConfirmationModal();
    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    // 3. 数据获取函数
    const fetchMembers = useCallback(async (query: MemberQueryRequestDTO) => {
        setIsLoading(true);
        setError(null);
        try {
            const response: Page<ClassMemberVO> = await listMembersByPage(classId, query);
            setMembers(response.records);
            setPagination({
                total: response.total,
                current: response.current,
                pageSize: response.size,
            });
        } catch (err: any) {
            setError(err.message || '获取班级成员列表失败');
        } finally {
            setIsLoading(false);
        }
    }, [classId]); // classId 是 fetchMembers 的一个关键依赖

    // 4. Effect Hook - 监听变化并触发数据获取
    useEffect(() => {
        if (!classId || isNaN(classId)) {
            setError('无效的班级ID');
            setIsLoading(false);
            return;
        }

        const query: MemberQueryRequestDTO = {
            classId: classId,
            current: pagination.current,
            pageSize: pagination.pageSize,
            userKeyword: debouncedSearchTerm,
            ...filters,
        };
        fetchMembers(query);
    }, [classId, pagination.current, pagination.pageSize, debouncedSearchTerm, filters, fetchMembers]);

    // 5. 事件处理器
    const handlePageChange = (page: number, pageSize?: number) => {
        setPagination(prev => ({ ...prev, current: page, pageSize: pageSize || prev.pageSize }));
    };

    const handleSearchChange = (term: string) => {
        setSearchTerm(term);
        setPagination(prev => ({ ...prev, current: 1 }));
    };

    const handleFilterChange = (newFilters: Partial<MemberQueryRequestDTO>) => {
        setFilters(prev => ({ ...prev, ...newFilters }));
        setPagination(prev => ({ ...prev, current: 1 }));
    };

    const openInviteModal = () => setIsInviteModalOpen(true);
    const closeInviteModal = () => setIsInviteModalOpen(false);

    const handleInviteSuccess = (newMember: ClassMemberVO) => {
        showToast({ message: `成功邀请成员 ${newMember.user.nickname}`, type: 'success' });
        // 刷新列表以显示新成员
        const query: MemberQueryRequestDTO = {
            classId: classId,
            current: pagination.current,
            pageSize: pagination.pageSize,
            userKeyword: debouncedSearchTerm,
            ...filters,
        };
        fetchMembers(query);
    };

    const handleRemoveMember = (member: ClassMemberVO) => {
        showConfirmationModal({
            title: `移除成员`,
            message: `您确定要从班级中移除 "${member.user.nickname}" 吗？`,
            confirmText: '确认移除',
            type: 'danger',
            onConfirm: async () => {
                try {
                    await removeMember(classId, member.user.id);
                    showToast({ message: `成员 "${member.user.nickname}" 已被移除`, type: 'success' });
                    fetchMembers({ classId, current: pagination.current, pageSize: pagination.pageSize, userKeyword: debouncedSearchTerm, ...filters });
                } catch (err) {
                    // 错误已由拦截器处理
                }
            }
        });
    };

    // 6. 返回接口
    return {
        classId,
        members,
        isLoading,
        error,
        pagination,
        searchTerm,
        isInviteModalOpen,
        handlePageChange,
        handleSearchChange,
        handleFilterChange,
        openInviteModal,
        closeInviteModal,
        handleInviteSuccess,
        handleRemoveMember,
    };
};