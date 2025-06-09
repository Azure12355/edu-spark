// src/components/teacher/pages/QuestionBank/QuestionListPanel.tsx
"use client";
import React, { useState, useMemo } from 'react';
import {
  Button, Input, Select, Space, Table, Tag, List, Typography, Dropdown, Popconfirm, message, Tooltip,
} from 'antd';
import type { MenuProps } from 'antd';
import {
  FolderAddOutlined, PlusOutlined, UploadOutlined, DownOutlined, SearchOutlined, FolderOutlined, MoreOutlined, EditOutlined, DeleteOutlined
} from '@ant-design/icons';
import styles from './QuestionListPanel.module.css';
import { mockFolders, mockQuestions, questionTypeMap, Question, QuestionType } from '@/lib/question-bank-data';

const { Text } = Typography;
const { Option } = Select;

const QuestionListPanel: React.FC = () => {
  const [selectedFolderId, setSelectedFolderId] = useState<string>('all');
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedType, setSelectedType] = useState<QuestionType | 'all'>('all');

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const handleDelete = (id: string) => {
    // 实际项目中应调用API
    message.success(`题目 ${id} 已删除`);
  };

  const filteredQuestions = useMemo(() => {
    return mockQuestions
      .filter(q => selectedFolderId === 'all' || q.folderId === selectedFolderId)
      .filter(q => searchQuery === '' || q.content.includes(searchQuery))
      .filter(q => selectedDifficulty === 'all' || q.difficulty === selectedDifficulty)
      .filter(q => selectedType === 'all' || q.type === selectedType);
  }, [selectedFolderId, searchQuery, selectedDifficulty, selectedType]);


  const columns = [
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
    {
      title: '难度',
      dataIndex: 'difficulty',
      key: 'difficulty',
      width: 100,
      filters: [
          { text: '简单', value: 'easy' },
          { text: '中等', value: 'medium' },
          { text: '困难', value: 'hard' },
      ],
      onFilter: (value: any, record: Question) => record.difficulty === value,
      render: (difficulty: string) => {
        const textMap = { easy: '简单', medium: '中等', hard: '困难' };
        const colorMap = { easy: 'green', medium: 'orange', hard: 'red' };
        // @ts-ignore
        return <Tag color={colorMap[difficulty]}>{textMap[difficulty]}</Tag>;
      },
    },
    {
      title: '创建者',
      dataIndex: 'creator',
      key: 'creator',
      width: 120,
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 150,
      sorter: (a: Question, b: Question) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    },
    {
      title: '操作',
      key: 'action',
      width: 150,
      render: (_: any, record: Question) => {
        const items: MenuProps['items'] = [
            { key: '1', label: '移动到...' },
            { key: '2', label: '复制题目' },
        ];
        return (
            <Space size="small">
                <Button type="link" icon={<EditOutlined />} size="small">编辑</Button>
                <Popconfirm title="确定删除这道题吗？" onConfirm={() => handleDelete(record.id)}>
                    <Button type="link" icon={<DeleteOutlined />} danger size="small">删除</Button>
                </Popconfirm>
                <Dropdown menu={{ items }}>
                    <Button type="text" icon={<MoreOutlined />} size="small" />
                </Dropdown>
            </Space>
        );
      }
    },
  ];

  return (
    <div className={styles.panelWrapper}>
      <aside className={styles.sider}>
        <div className={styles.siderHeader}>
            <Button type="primary" icon={<FolderAddOutlined />} block>新建文件夹</Button>
        </div>
        <List
            className={styles.folderList}
            dataSource={[{id: 'all', name: '全部题目'}, ...mockFolders]}
            renderItem={(folder) => (
                <List.Item
                    onClick={() => setSelectedFolderId(folder.id)}
                    className={selectedFolderId === folder.id ? styles.active : ''}
                >
                    <Space>
                        <FolderOutlined />
                        <Text>{folder.name}</Text>
                    </Space>
                    <Text type="secondary">
                        {folder.id === 'all' ? mockQuestions.length : mockQuestions.filter(q => q.folderId === folder.id).length}
                    </Text>
                </List.Item>
            )}
        />
      </aside>

      <main className={styles.mainContent}>
        <div className={styles.toolbar}>
            <Space>
                <Button type="primary" icon={<PlusOutlined />}>新建题目</Button>
                <Button icon={<UploadOutlined />}>批量导入</Button>
                <Popconfirm
                    title={`确定要删除选中的 ${selectedRowKeys.length} 道题吗?`}
                    onConfirm={() => message.success(`成功删除 ${selectedRowKeys.length} 道题`)}
                    disabled={selectedRowKeys.length === 0}
                >
                    <Button danger disabled={selectedRowKeys.length === 0}>批量删除</Button>
                </Popconfirm>
            </Space>
            <Space>
                <Select
                    value={selectedType}
                    onChange={setSelectedType}
                    style={{width: 120}}
                >
                    <Option value="all">全部题型</Option>
                    {Object.entries(questionTypeMap).map(([key, {text}]) => <Option key={key} value={key}>{text}</Option>)}
                </Select>
                <Input.Search
                    placeholder="搜索题干内容"
                    onSearch={setSearchQuery}
                    style={{width: 200}}
                    allowClear
                />
            </Space>
        </div>
        <div className={styles.tableWrapper}>
            <Table
                rowKey="id"
                rowSelection={rowSelection}
                columns={columns}
                dataSource={filteredQuestions}
                pagination={{ pageSize: 10, showSizeChanger: true, size: 'small' }}
                scroll={{ y: '100%' }}
                size="small"
            />
        </div>
      </main>
    </div>
  );
};

export default QuestionListPanel;