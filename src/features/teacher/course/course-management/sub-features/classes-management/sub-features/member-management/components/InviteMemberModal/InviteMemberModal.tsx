// [!file src/features/teacher/course/course-management/sub-features/classes-management/sub-features/member-management/components/InviteMemberModal/InviteMemberModal.tsx]
"use client";

import React, { useState, useEffect } from 'react';
import styles from './InviteMemberModal.module.css';
import Modal from '@/shared/components/ui/Modal/Modal';
import { useToast } from '@/shared/hooks/useToast';
import { ClassMemberRoleEnum } from '@/shared/types/enums/course/ClassMemberRoleEnum';
import { useDebounce } from '@/shared/hooks/useDebounce';
import Image from "next/image";
import {ClassMemberVO, UserVO} from "@/shared/types";
import {addMember, listUsersByPage} from "@/shared/services";
import {MemberAddRequestDTO} from "@/shared/types/dto/course/classes";

// 定义 Props 类型
interface InviteMemberModalProps {
    isOpen: boolean;
    classId: number;
    onClose: () => void;
    onSuccess: (newMember: ClassMemberVO) => void;
}

const InviteMemberModal: React.FC<InviteMemberModalProps> = ({ isOpen, classId, onClose, onSuccess }) => {
    // 1. 状态管理
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState<UserVO[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [selectedUser, setSelectedUser] = useState<UserVO | null>(null);
    const [selectedRole, setSelectedRole] = useState<string>(ClassMemberRoleEnum.STUDENT);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const debouncedSearchTerm = useDebounce(searchTerm, 500);
    const showToast = useToast();

    // 2. 搜索逻辑
    useEffect(() => {
        if (debouncedSearchTerm.trim().length < 2) {
            setSearchResults([]);
            return;
        }

        const searchUsers = async () => {
            setIsSearching(true);
            try {
                // 调用 userService 进行用户搜索
                const response = await listUsersByPage({
                    current: 1,
                    pageSize: 10, // 最多显示10个搜索结果
                    username: debouncedSearchTerm,
                });
                setSearchResults(response.records);
            } catch (error) {
                // 错误已由拦截器处理
            } finally {
                setIsSearching(false);
            }
        };

        searchUsers();
    }, [debouncedSearchTerm]);

    // 3. 事件处理
    const handleUserSelect = (user: UserVO) => {
        setSelectedUser(user);
        setSearchTerm(user.nickname); // 将搜索框的值设为选中用户的昵称
        setSearchResults([]); // 清空搜索结果列表
    };

    const handleClearSelection = () => {
        setSelectedUser(null);
        setSearchTerm('');
    };

    const handleSubmit = async () => {
        if (!selectedUser) {
            showToast({ message: '请先选择一个要邀请的用户', type: 'warning' });
            return;
        }

        setIsSubmitting(true);
        const requestData: MemberAddRequestDTO = {
            userId: selectedUser.id,
            role: selectedRole,
        };

        try {
            const newMember = await addMember(classId, requestData);
            onSuccess(newMember); // 调用成功回调
            onClose(); // 关闭弹窗
        } catch (error) {
            // 错误已由拦截器处理
        } finally {
            setIsSubmitting(false);
        }
    };

    // 清理函数，当弹窗关闭时重置所有状态
    useEffect(() => {
        if (!isOpen) {
            setTimeout(() => {
                setSearchTerm('');
                setSearchResults([]);
                setSelectedUser(null);
                setSelectedRole(ClassMemberRoleEnum.STUDENT);
                setIsSubmitting(false);
            }, 300); // 延迟以等待关闭动画
        }
    }, [isOpen]);

    // 4. Modal 页脚
    const footer = (
        <>
            <button onClick={onClose} className={`${styles.button} ${styles.cancelButton}`} disabled={isSubmitting}>
                取消
            </button>
            <button onClick={handleSubmit} className={`${styles.button} ${styles.confirmButton}`} disabled={isSubmitting || !selectedUser}>
                {isSubmitting ? '邀请中...' : '确认邀请'}
            </button>
        </>
    );

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="邀请新成员" footer={footer}>
            <div className={styles.formContainer}>
                {/* 用户搜索框 */}
                <div className={styles.formItem}>
                    <label htmlFor="userSearch" className={styles.label}>搜索用户</label>
                    <div className={styles.searchWrapper}>
                        <input
                            id="userSearch"
                            type="text"
                            className={styles.input}
                            placeholder="输入用户名或昵称进行搜索"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            disabled={!!selectedUser}
                        />
                        {isSearching && <i className={`fas fa-spinner fa-spin ${styles.searchSpinner}`}></i>}
                        {selectedUser && (
                            <button onClick={handleClearSelection} className={styles.clearSelectionButton} title="清除选择">
                                <i className="fas fa-times"></i>
                            </button>
                        )}
                    </div>
                    {/* 搜索结果列表 */}
                    {searchResults.length > 0 && (
                        <ul className={styles.searchResults}>
                            {searchResults.map(user => (
                                <li key={user.id} onClick={() => handleUserSelect(user)}>
                                    <Image src={user.avatarUrl || '/default-avatar.jpg'} alt={user.nickname} width={32} height={32} />
                                    <div className={styles.userInfo}>
                                        <span>{user.nickname}</span>
                                        <small>@{user.username}</small>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* 角色选择 */}
                <div className={styles.formItem}>
                    <label htmlFor="memberRole" className={styles.label}>分配角色</label>
                    <select
                        id="memberRole"
                        className={styles.input}
                        value={selectedRole}
                        onChange={(e) => setSelectedRole(e.target.value)}
                        disabled={!selectedUser}
                    >
                        <option value={ClassMemberRoleEnum.STUDENT}>学生</option>
                        <option value={ClassMemberRoleEnum.TEACHER}>教师/助教</option>
                    </select>
                </div>
            </div>
        </Modal>
    );
};

export default InviteMemberModal;