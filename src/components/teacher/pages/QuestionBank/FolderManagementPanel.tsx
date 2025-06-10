// src/components/teacher/pages/QuestionBank/FolderManagementPanel.tsx
"use client";
import React, { useState, useMemo } from 'react';
import {
  App, Button, Input, Table, Tag, Tree, Space, Dropdown, Popconfirm, Tooltip, Modal, Form, TreeSelect, Typography, Select
} from 'antd';
import type { MenuProps, TreeProps, TableProps } from 'antd';
import {
  FolderAddOutlined, MoreOutlined, EditOutlined, DeleteOutlined, SwapOutlined, PlusOutlined, UploadOutlined
} from '@ant-design/icons';
import styles from './FolderManagementPanel.module.css';
import { mockFolders, mockQuestions, questionTypeMap, Question, QuestionFolder, QuestionType } from '@/lib/question-bank-data';

const { Title, Text } = Typography;
const { Search } = Input;
const { Option } = Select;

const ROOT_FOLDER_VALUE = '__ROOT__';

const buildTreeData = (folders: QuestionFolder[], parentId: string | null = null): any[] => {
  return folders
    .filter(folder => folder.parentId === parentId)
    .map(folder => ({
      title: folder.name,
      key: folder.id,
      value: folder.id,
      children: buildTreeData(folders, folder.id),
      questionCount: folder.questionCount
    }));
};

const UnifiedQuestionBankPanel: React.FC = () => {
    const { message, modal } = App.useApp();
    const [folders, setFolders] = useState<QuestionFolder[]>(mockFolders);
    const [questions, setQuestions] = useState<Question[]>(mockQuestions);
    const [selectedFolderKey, setSelectedFolderKey] = useState<string>('all');
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingFolder, setEditingFolder] = useState<QuestionFolder | null>(null);
    
    // [MERGE] 新增筛选状态
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedDifficulty, setSelectedDifficulty] = useState('all');
    const [selectedType, setSelectedType] = useState<QuestionType | 'all'>('all');
    
    const [form] = Form.useForm();

    const folderTreeData = useMemo(() => {
        const tree = buildTreeData(folders);
        const totalQuestions = questions.length;
        return [{ title: '全部题目', key: 'all', children: tree, questionCount: totalQuestions }];
    }, [folders, questions]);
    
    const treeSelectData = useMemo(() => {
        return [{
            title: '根目录 (无父级)',
            value: ROOT_FOLDER_VALUE,
            key: ROOT_FOLDER_VALUE,
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
        children.forEach(child => ids.push(...getFolderIdsRecursive(child.id)));
        return ids;
    };

    // [MERGE] 整合所有筛选逻辑
    const displayedQuestions = useMemo(() => {
        let folderFilteredQuestions = questions;
        if (selectedFolderKey !== 'all') {
            const folderIdsToDisplay = getFolderIdsRecursive(selectedFolderKey);
            folderFilteredQuestions = questions.filter(q => folderIdsToDisplay.includes(q.folderId));
        }
        return folderFilteredQuestions
          .filter(q => searchQuery === '' || q.content.toLowerCase().includes(searchQuery.toLowerCase()))
          .filter(q => selectedDifficulty === 'all' || q.difficulty === selectedDifficulty)
          .filter(q => selectedType === 'all' || q.type === selectedType);
    }, [selectedFolderKey, questions, searchQuery, folders, selectedDifficulty, selectedType]);

    const selectedFolder = useMemo(() => folders.find(f => f.id === selectedFolderKey) || null, [selectedFolderKey, folders]);

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
            modal.confirm({
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
                setFolders(currentFolders => currentFolders.map(f => f.id === editingFolder.id ? { ...f, name: values.name, parentId } : f));
                message.success('文件夹已更新');
            } else {
                const newFolder: QuestionFolder = { id: `folder-${Date.now()}`, name: values.name, parentId, questionCount: 0 };
                setFolders(currentFolders => [...currentFolders, newFolder]);
                message.success('文件夹已创建');
            }
            setIsModalOpen(false);
        }).catch(info => console.log('Validate Failed:', info));
    };

    const handleMoveQuestions = (targetFolderId: string) => {
        if (selectedRowKeys.length === 0) { message.warning('请至少选择一道题目'); return; }
        setQuestions(currentQuestions => currentQuestions.map(q => selectedRowKeys.includes(q.id) ? { ...q, folderId: targetFolderId } : q));
        message.success(`${selectedRowKeys.length}道题目已移动`);
        setSelectedRowKeys([]);
    };
    
    // [MERGE] 新增批量删除功能
    const handleBatchDelete = () => {
        setQuestions(qs => qs.filter(q => !selectedRowKeys.includes(q.id)));
        message.success(`成功删除 ${selectedRowKeys.length} 道题`);
        setSelectedRowKeys([]);
    };
    
    // [MERGE] 新增单行删除功能
    const handleDeleteRow = (id: string) => {
        setQuestions(qs => qs.filter(q => q.id !== id));
        message.success(`题目 ${id} 已删除`);
    };

    const moveMenu: MenuProps['items'] = folders.map(f => ({ key: f.id, label: f.name, onClick: () => handleMoveQuestions(f.id) }));
    const rowSelection = { selectedRowKeys, onChange: setSelectedRowKeys };

    // [MERGE] 采用 QuestionListPanel 中更丰富的列定义
    const columns: TableProps<Question>['columns'] = [
        { title: '题干', dataIndex: 'content', key: 'content', render: (text: string, record: Question) => (
            <div className={styles.questionContentCell}>
              <Tag color={questionTypeMap[record.type].color}>{questionTypeMap[record.type].text}</Tag>
              <Tooltip title={text} placement="topLeft"><span className={styles.questionText}>{text}</span></Tooltip>
            </div>
        )},
        { title: '难度', dataIndex: 'difficulty', key: 'difficulty', width: 100, filters: [{ text: '简单', value: 'easy' }, { text: '中等', value: 'medium' }, { text: '困难', value: 'hard' }], onFilter: (value: any, record: Question) => record.difficulty === value, render: (difficulty: string) => {
            const textMap: any = { easy: '简单', medium: '中等', hard: '困难' };
            const colorMap: any = { easy: 'green', medium: 'orange', hard: 'red' };
            return <Tag color={colorMap[difficulty]}>{textMap[difficulty]}</Tag>;
        }},
        { title: '创建者', dataIndex: 'creator', key: 'creator', width: 120 },
        { title: '创建时间', dataIndex: 'createdAt', key: 'createdAt', width: 150, sorter: (a: Question, b: Question) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime() },
        { title: '操作', key: 'action', width: 150, render: (_: any, record: Question) => (
            <Space size="small">
                <Button type="link" icon={<EditOutlined />} size="small">编辑</Button>
                <Popconfirm title="确定删除这道题吗？" onConfirm={() => handleDeleteRow(record.id)}>
                    <Button type="link" icon={<DeleteOutlined />} danger size="small">删除</Button>
                </Popconfirm>
            </Space>
        )},
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
                    <Tree showLine blockNode defaultExpandAll selectedKeys={[selectedFolderKey]} onSelect={handleSelectFolder} treeData={folderTreeData} titleRender={renderTreeTitle} />
                </div>
            </aside>
            <main className={styles.mainContent}>
                {/* [MERGE] 整合后的工具栏 */}
                <div className={styles.mainToolbar}>
                    <Space>
                        <Button type="primary" icon={<PlusOutlined />}>新建题目</Button>
                        <Button icon={<UploadOutlined />}>批量导入</Button>
                        <Popconfirm title={`确定要删除选中的 ${selectedRowKeys.length} 道题吗?`} onConfirm={handleBatchDelete} disabled={selectedRowKeys.length === 0}>
                            <Button danger disabled={selectedRowKeys.length === 0}>批量删除</Button>
                        </Popconfirm>
                        <Dropdown menu={{ items: moveMenu }} trigger={['click']} disabled={selectedRowKeys.length === 0}>
                            <Button icon={<SwapOutlined />}>移动到</Button>
                        </Dropdown>
                    </Space>
                    <Space>
                        <Select value={selectedType} onChange={setSelectedType} style={{width: 120}}><Option value="all">全部题型</Option>{Object.entries(questionTypeMap).map(([key, {text}]) => <Option key={key} value={key as QuestionType}>{text}</Option>)}</Select>
                        <Select value={selectedDifficulty} onChange={setSelectedDifficulty} style={{width: 120}}><Option value="all">全部难度</Option><Option value="easy">简单</Option><Option value="medium">中等</Option><Option value="hard">困难</Option></Select>
                        <Search placeholder="搜索题干" onSearch={setSearchQuery} style={{ width: 200 }} allowClear />
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
                destroyOnClose
                modalRender={(modal) => <Form form={form} onFinish={handleModalOk}>{modal}</Form>}
            >
                <Form.Item name="name" label="文件夹名称" rules={[{ required: true, message: '请输入文件夹名称' }]}><Input /></Form.Item>
                <Form.Item name="parentId" label="父级文件夹">
                    <TreeSelect showSearch style={{ width: '100%' }} popupStyle={{ maxHeight: 400, overflow: 'auto' }} placeholder="选择一个父级文件夹（可选）" allowClear treeDefaultExpandAll treeData={treeSelectData} />
                </Form.Item>
            </Modal>
        </div>
    );
};


// [MERGE] 最后，将组件包裹在 <App> 中，以提供 message, modal 等上下文
const FolderManagementPanelWrapper: React.FC = () => (
    <App>
        <UnifiedQuestionBankPanel />
    </App>
);

export default FolderManagementPanelWrapper;