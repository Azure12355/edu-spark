// src/components/teacher/pages/QuestionBank/FolderManagementPanel.tsx
"use client";
import React, { useState, useMemo } from 'react';
import {
  Button, Input, Table, Tag, Tree, Space, Dropdown, Popconfirm, message, Tooltip, Modal, Form, TreeSelect, Typography
} from 'antd';
import type { MenuProps, TreeProps, TableProps } from 'antd';
import {
  FolderAddOutlined, MoreOutlined, EditOutlined, DeleteOutlined, SwapOutlined
} from '@ant-design/icons';
import styles from './FolderManagementPanel.module.css';
import { mockFolders, mockQuestions, questionTypeMap, Question, QuestionFolder } from '@/lib/question-bank-data';

const { Title, Text } = Typography;
const { Search } = Input;

// --- 核心修正 1: 修改 buildTreeData 函数，使其同时生成 key 和 value ---
// 这个函数现在将为 Tree 和 TreeSelect 生成兼容的数据
const buildTreeData = (folders: QuestionFolder[], parentId: string | null = null): any[] => {
  return folders
    .filter(folder => folder.parentId === parentId)
    .map(folder => ({
      title: folder.name,
      key: folder.id,
      value: folder.id, // 确保每个节点都有一个与 key 相同的 value
      children: buildTreeData(folders, folder.id),
      isLeaf: !folders.some(f => f.parentId === folder.id),
      questionCount: folder.questionCount
    }));
};

const FolderManagementPanel: React.FC = () => {
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
        return [{ title: '全部题目', key: 'all', children: tree, questionCount: questions.length }];
    }, [folders, questions]);

    // --- 核心修正 2: 为 TreeSelect 组件专门创建一个带“根目录”选项的树数据 ---
    const treeSelectData = useMemo(() => {
        return [{
            title: '根目录',
            value: null, // 根目录的值为 null
            key: 'root-null', // 提供一个唯一的 key
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
        form.setFieldsValue({ parentId: selectedFolderKey === 'all' ? null : selectedFolderKey });
        setIsModalOpen(true);
    };

    const handleEditFolder = (folder: QuestionFolder, e: React.MouseEvent) => {
        e.stopPropagation();
        setEditingFolder(folder);
        form.setFieldsValue({ name: folder.name, parentId: folder.parentId });
        setIsModalOpen(true);
    };

    const handleDeleteFolder = (folderId: string, e: React.MouseEvent) => {
        e.stopPropagation();
        const folderToDelete = folders.find(f => f.id === folderId);
        if (!folderToDelete) return;

        const hasChildren = folders.some(f => f.parentId === folderId);
        const hasQuestions = questions.some(q => q.folderId === folderId);

        if (hasChildren || hasQuestions) {
            message.error('无法删除非空文件夹，请先移动或删除其内容。');
            return;
        }

        setFolders(currentFolders => currentFolders.filter(f => f.id !== folderId));
        message.success(`文件夹 "${folderToDelete.name}" 已删除`);
    };

    const handleModalOk = () => {
        form.validateFields().then(values => {
            if (editingFolder) { // 编辑模式
                setFolders(currentFolders =>
                    currentFolders.map(f => f.id === editingFolder.id ? { ...f, ...values } : f)
                );
                message.success('文件夹已更新');
            } else { // 新建模式
                const newFolder: QuestionFolder = {
                    id: `folder-${Date.now()}`,
                    name: values.name,
                    parentId: values.parentId, // 这里直接使用表单的值，可能是 null 或 string
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
        {
          title: '题干',
          dataIndex: 'content',
          key: 'content',
          render: (text: string, record: Question) => (
            <div className={styles.questionContentCell}>
              <Tag color={questionTypeMap[record.type].color}>{questionTypeMap[record.type].text}</Tag>
              <Tooltip title={text} placement="topLeft">
                <span className={styles.questionText}>{text}</span>
              </Tooltip>
            </div>
          ),
        },
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
                        <Search
                            placeholder="搜索题干"
                            onSearch={setSearchQuery}
                            style={{ width: 240 }}
                            allowClear
                        />
                    </Space>
                </div>
                <div className={styles.tableWrapper}>
                    <Table
                        rowKey="id"
                        rowSelection={rowSelection}
                        columns={columns}
                        dataSource={displayedQuestions}
                        pagination={{ pageSize: 10, showSizeChanger: true, size: 'small' }}
                        scroll={{ y: '100%' }}
                        size="small"
                    />
                </div>
            </main>

            <Modal
                title={editingFolder ? '编辑文件夹' : '新建文件夹'}
                open={isModalOpen}
                onOk={handleModalOk}
                onCancel={() => setIsModalOpen(false)}
                destroyOnClose
            >
                <Form form={form} layout="vertical" name="folder_form">
                    <Form.Item name="name" label="文件夹名称" rules={[{ required: true, message: '请输入文件夹名称' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="parentId" label="父级文件夹">
                        <TreeSelect
                            showSearch
                            style={{ width: '100%' }}
                            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                            placeholder="选择一个父级文件夹（可选）"
                            allowClear
                            treeDefaultExpandAll
                            treeData={treeSelectData} // --- 核心修正 3: 使用新创建的 treeSelectData
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default FolderManagementPanel;