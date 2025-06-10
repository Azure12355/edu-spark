// src/components/teacher/pages/QuestionBank/FolderManagementPanel.tsx
"use client";
import React, { useState, useMemo } from 'react';
import {
  App, Button, Input, Table, Tag, Tree, Space, Dropdown, Popconfirm, Tooltip, Modal, Form, TreeSelect, Typography
} from 'antd';
import type { MenuProps, TreeProps, TableProps } from 'antd';
import {
  FolderAddOutlined, MoreOutlined, EditOutlined, DeleteOutlined, SwapOutlined
} from '@ant-design/icons';
import styles from './FolderManagementPanel.module.css';
import { mockFolders, mockQuestions, questionTypeMap, Question, QuestionFolder } from '@/lib/question-bank-data';

const { Title, Text } = Typography;
const { Search } = Input;

// [WARNING FIX & ROBUSTNESS] 使用一个唯一的字符串常量代表根目录
const ROOT_FOLDER_VALUE = '__ROOT__';

// 函数现在为 Tree 和 TreeSelect 生成兼容的数据
const buildTreeData = (folders: QuestionFolder[], parentId: string | null = null): any[] => {
  return folders
    .filter(folder => folder.parentId === parentId)
    .map(folder => ({
      title: folder.name,
      key: folder.id,
      value: folder.id, // 确保每个节点都有一个与 key 相同的 value
      children: buildTreeData(folders, folder.id),
      questionCount: folder.questionCount
    }));
};

const FolderManagementPanel: React.FC = () => {
    // [WARNING FIX] 使用 App.useApp() 来获取上下文中的 message 实例
    const { message } = App.useApp();
    const [folders, setFolders] = useState<QuestionFolder[]>(mockFolders);
    const [questions, setQuestions] = useState<Question[]>(mockQuestions);
    const [selectedFolderKey, setSelectedFolderKey] = useState<string>('all');
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingFolder, setEditingFolder] = useState<QuestionFolder | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [form] = Form.useForm();

    const folderTreeData = useMemo(() => {
        const tree = buildTreeData(folders);
        const totalQuestions = questions.length;
        return [{ title: '全部题目', key: 'all', children: tree, questionCount: totalQuestions }];
    }, [folders, questions]);
    
    // 为 TreeSelect 组件专门创建一个带“根目录”选项的树数据
    const treeSelectData = useMemo(() => {
        return [{
            title: '根目录 (无父级)',
            value: ROOT_FOLDER_VALUE, // 使用常量作为根的值
            key: ROOT_FOLDER_VALUE,   // 保持 key 和 value 一致
            children: buildTreeData(folders)
        }];
    }, [folders]);

    const handleSelectFolder: TreeProps['onSelect'] = (selectedKeys) => {
        if (selectedKeys.length > 0) {
            setSelectedFolderKey(selectedKeys[0] as string);
        }
    };
    
    const getFolderIdsRecursive = (folderId: string): string[] => {
        let ids = [folderId];
        const children = folders.filter(f => f.parentId === folderId);
        children.forEach(child => {
            ids = [...ids, ...getFolderIdsRecursive(child.id)];
        });
        return ids;
    };

    const displayedQuestions = useMemo(() => {
        let folderFilteredQuestions = questions;
        if (selectedFolderKey !== 'all') {
            const folderIdsToDisplay = getFolderIdsRecursive(selectedFolderKey);
            folderFilteredQuestions = questions.filter(q => folderIdsToDisplay.includes(q.folderId));
        }
        return folderFilteredQuestions.filter(q =>
            q.content.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [selectedFolderKey, questions, searchQuery, folders]);

    const selectedFolder = useMemo(() => {
        return folders.find(f => f.id === selectedFolderKey) || null;
    }, [selectedFolderKey, folders]);

    const handleAddFolder = () => {
        setEditingFolder(null);
        form.resetFields();
        const parentId = selectedFolderKey === 'all' ? ROOT_FOLDER_VALUE : selectedFolderKey;
        form.setFieldsValue({ parentId });
        setIsModalOpen(true);
    };

    const handleEditFolder = (folder: QuestionFolder, e: React.MouseEvent) => {
        e.stopPropagation();
        setEditingFolder(folder);
        form.setFieldsValue({ name: folder.name, parentId: folder.parentId || ROOT_FOLDER_VALUE });
        setIsModalOpen(true);
    };

    const handleDeleteFolder = (folderId: string, e: React.MouseEvent) => {
        e.stopPropagation();
        const folderToDelete = folders.find(f => f.id === folderId);
        if (!folderToDelete) return;

        const hasChildren = folders.some(f => f.parentId === folderId);
        if (hasChildren) {
            message.error('文件夹包含子文件夹，无法删除。');
            return;
        }

        const questionsInFolder = questions.filter(q => q.folderId === folderId);
        if(questionsInFolder.length > 0) {
            // 提供更友好的提示
            Modal.confirm({
                title: '文件夹中包含题目',
                content: `此文件夹中有 ${questionsInFolder.length} 道题目，删除文件夹会将这些题目移动到“未分类题目”。确定要删除吗？`,
                onOk: () => {
                    setQuestions(qs => qs.map(q => q.folderId === folderId ? {...q, folderId: 'folder-unassigned'} : q));
                    setFolders(currentFolders => currentFolders.filter(f => f.id !== folderId));
                    message.success(`文件夹 "${folderToDelete.name}" 已删除`);
                }
            })
        } else {
             setFolders(currentFolders => currentFolders.filter(f => f.id !== folderId));
             message.success(`文件夹 "${folderToDelete.name}" 已删除`);
        }
    };

    const handleModalOk = () => {
        form.validateFields().then(values => {
            const parentId = values.parentId === ROOT_FOLDER_VALUE ? null : values.parentId;
            
            if (editingFolder) {
                setFolders(currentFolders =>
                    currentFolders.map(f => f.id === editingFolder.id ? { ...f, name: values.name, parentId } : f)
                );
                message.success('文件夹已更新');
            } else {
                const newFolder: QuestionFolder = {
                    id: `folder-${Date.now()}`,
                    name: values.name,
                    parentId: parentId,
                    questionCount: 0,
                };
                setFolders(currentFolders => [...currentFolders, newFolder]);
                message.success('文件夹已创建');
            }
            setIsModalOpen(false);
        }).catch(info => {
            console.log('Validate Failed:', info);
        });
    };

    const handleMoveQuestions = (targetFolderId: string) => {
        if (selectedRowKeys.length === 0) {
            message.warning('请至少选择一道题目');
            return;
        }
        setQuestions(currentQuestions =>
            currentQuestions.map(q => selectedRowKeys.includes(q.id) ? { ...q, folderId: targetFolderId } : q)
        );
        message.success(`${selectedRowKeys.length}道题目已移动`);
        setSelectedRowKeys([]);
    };
    
    const moveMenu: MenuProps['items'] = folders.map(f => ({
        key: f.id,
        label: f.name,
        onClick: () => handleMoveQuestions(f.id)
    }));


    const rowSelection = {
        selectedRowKeys,
        onChange: setSelectedRowKeys,
    };

    const columns: TableProps<Question>['columns'] = [
        { title: '题干', dataIndex: 'content', key: 'content', render: (text: string, record: Question) => (
            <div className={styles.questionContentCell}>
              <Tag color={questionTypeMap[record.type].color}>{questionTypeMap[record.type].text}</Tag>
              <Tooltip title={text} placement="topLeft"><span className={styles.questionText}>{text}</span></Tooltip>
            </div>
        )},
        { title: '创建者', dataIndex: 'creator', width: 120 },
        { title: '创建时间', dataIndex: 'createdAt', width: 150 },
    ];

    const renderTreeTitle = (nodeData: any) => {
        const folder = folders.find(f => f.id === nodeData.key);
        const menuItems: MenuProps['items'] = [
            { key: 'edit', label: '重命名', icon: <EditOutlined />, onClick: (e) => handleEditFolder(folder!, e.domEvent) },
            { type: 'divider' },
            { key: 'delete', label: '删除', icon: <DeleteOutlined />, danger: true, onClick: (e) => handleDeleteFolder(folder!.id, e.domEvent) },
        ];
        return (
            <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                <span className={styles.treeNodeTitle}>{nodeData.title}</span>
                <Text type="secondary" style={{ marginRight: 8 }}>({nodeData.questionCount || 0})</Text>
                {nodeData.key !== 'all' && (
                    <Dropdown menu={{ items: menuItems }} trigger={['click']}>
                        <Button type="text" size="small" icon={<MoreOutlined />} className={styles.treeNodeActions} onClick={e => e.stopPropagation()} />
                    </Dropdown>
                )}
            </div>
        );
    };

    return (
        <div className={styles.panelWrapper}>
            <aside className={styles.sider}>
                <div className={styles.siderHeader}>
                    <Button type="primary" icon={<FolderAddOutlined />} block onClick={handleAddFolder}>新建文件夹</Button>
                </div>
                <div className={styles.folderTreeContainer}>
                    <Tree
                        showLine
                        blockNode
                        defaultExpandAll
                        selectedKeys={[selectedFolderKey]}
                        onSelect={handleSelectFolder}
                        treeData={folderTreeData}
                        titleRender={renderTreeTitle}
                    />
                </div>
            </aside>
            <main className={styles.mainContent}>
                <div className={styles.mainHeader}>
                    <Title level={5} style={{ margin: 0 }}>
                        {selectedFolderKey === 'all' ? '全部题目' : selectedFolder?.name || ''}
                    </Title>
                    <Space>
                        <Dropdown menu={{ items: moveMenu }} trigger={['click']} disabled={selectedRowKeys.length === 0}>
                            <Button icon={<SwapOutlined />}>移动到</Button>
                        </Dropdown>
                        <Search placeholder="搜索题干" onSearch={setSearchQuery} style={{ width: 240 }} allowClear />
                    </Space>
                </div>
                <div className={styles.tableWrapper}>
                    <Table rowKey="id" rowSelection={rowSelection} columns={columns} dataSource={displayedQuestions} pagination={{ pageSize: 10, showSizeChanger: true, size: 'small' }} scroll={{ y: '100%' }} size="small" />
                </div>
            </main>
            <Modal
                title={editingFolder ? '编辑文件夹' : '新建文件夹'}
                open={isModalOpen}
                onOk={handleModalOk}
                onCancel={() => setIsModalOpen(false)}
                // [WARNING FIX] 使用新的 API
                destroyOnClose
                modalRender={(modal) => <Form form={form} onFinish={handleModalOk}>{modal}</Form>}
            >
                <Form.Item name="name" label="文件夹名称" rules={[{ required: true, message: '请输入文件夹名称' }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="parentId" label="父级文件夹">
                    <TreeSelect
                        showSearch
                        style={{ width: '100%' }}
                        // [WARNING FIX] 使用新的 API
                        popupStyle={{ maxHeight: 400, overflow: 'auto' }}
                        placeholder="选择一个父级文件夹（可选）"
                        allowClear
                        treeDefaultExpandAll
                        treeData={treeSelectData}
                    />
                </Form.Item>
            </Modal>
        </div>
    );
};

export default FolderManagementPanel;