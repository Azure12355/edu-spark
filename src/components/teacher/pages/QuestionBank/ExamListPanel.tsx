// src/components/teacher/pages/QuestionBank/ExamListPanel.tsx
"use client";
import React, { useState, useMemo } from 'react';
import { Button, Input, Select, Row, Col, Card, Typography, Tag, Space, Popconfirm, App } from 'antd';
import { PlusOutlined, SettingOutlined, CloudUploadOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import styles from './ExamListPanel.module.css';
import { mockExamLists, ExamList, ExamListStatus } from '@/lib/exam-list-data';

const { Title, Text, Paragraph } = Typography;
const { Search } = Input;
const { Option } = Select;

interface ExamListPanelProps {
  onEdit: (examList: ExamList | null) => void; // null 表示新建
}

const ExamListCard: React.FC<{
  examList: ExamList;
  onEdit: (examList: ExamList) => void;
  onPublish: (id: string) => void;
  onDelete: (id: string) => void;
}> = ({ examList, onEdit, onPublish, onDelete }) => {
  const isDraft = examList.status === 'draft';
  return (
    <Card className={styles.examCard} hoverable>
      <div className={styles.cardHeader}>
        <div>
          <Title level={5} className={styles.cardTitle}>{examList.title}</Title>
          <Text className={styles.cardMeta}>
            {examList.creator} · 更新于 {examList.updatedAt}
          </Text>
        </div>
        <Tag color={isDraft ? 'geekblue' : 'green'}>
          {isDraft ? '预发布' : '已发布'}
        </Tag>
      </div>
      <Paragraph className={styles.description} ellipsis={{ rows: 2 }}>
        {examList.description}
      </Paragraph>
      <div className={styles.tagsContainer}>
        <Space size={[0, 8]} wrap>
          {examList.tags.map(tag => <Tag key={tag}>{tag}</Tag>)}
        </Space>
      </div>
      <div className={styles.cardFooter}>
        <Text type="secondary">
          {examList.questionIds.length} 题 · 总分 {examList.totalScore}
        </Text>
        <Space>
          {isDraft && (
            <Popconfirm title="发布后将无法修改题目，确定吗？" onConfirm={() => onPublish(examList.id)}>
              <Button size="small" icon={<CloudUploadOutlined />}>发布</Button>
            </Popconfirm>
          )}
          <Button type="primary" size="small" icon={isDraft ? <SettingOutlined /> : <EditOutlined />} onClick={() => onEdit(examList)}>
            {isDraft ? '设置' : '查看'}
          </Button>
          {isDraft && (
             <Popconfirm title="确定要删除这个题单吗？" onConfirm={() => onDelete(examList.id)}>
                <Button size="small" danger icon={<DeleteOutlined />} />
            </Popconfirm>
          )}
        </Space>
      </div>
    </Card>
  );
};

export const ExamListPanel: React.FC<ExamListPanelProps> = ({ onEdit }) => {
  const { message } = App.useApp();
  const [examLists, setExamLists] = useState<ExamList[]>(mockExamLists);
  const [statusFilter, setStatusFilter] = useState<ExamListStatus | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLists = useMemo(() => {
    return examLists
      .filter(list => statusFilter === 'all' || list.status === statusFilter)
      .filter(list => list.title.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [examLists, statusFilter, searchQuery]);

  const handlePublish = (id: string) => {
    setExamLists(lists => lists.map(list => list.id === id ? { ...list, status: 'published' } : list));
    message.success('题单发布成功！');
  };
  
  const handleDelete = (id: string) => {
    setExamLists(lists => lists.filter(list => list.id !== id));
    message.success('题单已删除。');
  };

  return (
    <div className={styles.panelWrapper}>
      <div className={styles.toolbar}>
        <Space>
          <Button type="primary" icon={<PlusOutlined />} onClick={() => onEdit(null)}>
            新建题单
          </Button>
        </Space>
        <Space>
          <Select value={statusFilter} onChange={setStatusFilter} style={{ width: 120 }}>
            <Option value="all">全部状态</Option>
            <Option value="draft">预发布</Option>
            <Option value="published">已发布</Option>
          </Select>
          <Search
            placeholder="搜索题单标题"
            onSearch={setSearchQuery}
            style={{ width: 240 }}
            allowClear
          />
        </Space>
      </div>
      <div className={styles.listContainer}>
        <Row gutter={[24, 24]}>
          {filteredLists.map(list => (
            <Col key={list.id} xs={24} sm={12} md={12} lg={8}>
              <ExamListCard
                examList={list}
                onEdit={onEdit}
                onPublish={handlePublish}
                onDelete={handleDelete}
              />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};