// src/components/teacher/pages/QuestionBank/ExamSettingsPanel.tsx
"use client";
import React, { useState, useEffect, useMemo } from 'react';
import { Button, Form, Input, Typography, Space, App, Table, Tag, Tooltip, Select } from 'antd';
import { ArrowLeftOutlined, SaveOutlined, PlusCircleOutlined, DeleteOutlined } from '@ant-design/icons';
import styles from './ExamSettingsPanel.module.css';
import { ExamList } from '@/lib/exam-list-data';
import { mockQuestions, questionTypeMap, Question, QuestionType } from '@/lib/question-bank-data';

const { Title, Text } = Typography;
const { Search } = Input;
const { Option } = Select;

interface ExamSettingsPanelProps {
  initialData: ExamList | null;
  onSave: (examList: ExamList) => void;
  onBack: () => void;
}

export const ExamSettingsPanel: React.FC<ExamSettingsPanelProps> = ({ initialData, onSave, onBack }) => {
    const { message } = App.useApp();
    const [form] = Form.useForm();
    const [selectedQIds, setSelectedQIds] = useState<string[]>([]);
    
    // 题库筛选状态
    const [searchQuery, setSearchQuery] = useState('');
    const [typeFilter, setTypeFilter] = useState<QuestionType | 'all'>('all');

    useEffect(() => {
        if (initialData) {
            form.setFieldsValue({
                title: initialData.title,
                description: initialData.description,
            });
            setSelectedQIds(initialData.questionIds);
        } else {
            form.resetFields();
            setSelectedQIds([]);
        }
    }, [initialData, form]);

    const handleSave = () => {
        form.validateFields().then(values => {
            const newExamList: ExamList = {
                id: initialData?.id || `exam-${Date.now()}`,
                status: initialData?.status || 'draft',
                creator: initialData?.creator || '王老师',
                createdAt: initialData?.createdAt || new Date().toISOString().split('T')[0],
                ...values,
                questionIds: selectedQIds,
                updatedAt: new Date().toISOString().split('T')[0],
                tags: initialData?.tags || [], // 简单处理
                totalScore: selectedQIds.length * 5, // 假设每题5分
            };
            onSave(newExamList);
            message.success('题单已保存！');
            onBack();
        });
    };

    const handleAddQuestion = (questionId: string) => {
        if (selectedQIds.includes(questionId)) {
            message.warning('该题目已在题单中');
            return;
        }
        setSelectedQIds(prev => [...prev, questionId]);
    };

    const handleRemoveQuestion = (questionId: string) => {
        setSelectedQIds(prev => prev.filter(id => id !== questionId));
    };

    const selectedQuestions = useMemo(() => {
        return selectedQIds.map(id => mockQuestions.find(q => q.id === id)).filter(Boolean) as Question[];
    }, [selectedQIds]);
    
    const availableQuestions = useMemo(() => {
        return mockQuestions
          .filter(q => q.content.toLowerCase().includes(searchQuery.toLowerCase()))
          .filter(q => typeFilter === 'all' || q.type === typeFilter);
    }, [searchQuery, typeFilter]);

    const columns: TableProps<Question>['columns'] = [
        {
          title: '题干',
          dataIndex: 'content',
          key: 'content',
          render: (text: string, record: Question) => (
            <Tooltip title={text} placement="topLeft">
                <Tag color={questionTypeMap[record.type].color}>{questionTypeMap[record.type].text}</Tag>
                {text}
            </Tooltip>
          ),
        },
        {
          title: '操作',
          key: 'action',
          width: 80,
          render: (_, record) => (
            <Button
              type="link"
              icon={<PlusCircleOutlined />}
              onClick={() => handleAddQuestion(record.id)}
              disabled={selectedQIds.includes(record.id)}
            >
              添加
            </Button>
          ),
        },
    ];

    return (
        <div className={styles.panelWrapper}>
            <header className={styles.header}>
                <Space>
                    <Button icon={<ArrowLeftOutlined />} onClick={onBack}>返回列表</Button>
                    <Title level={4} style={{ margin: 0 }}>
                        {initialData ? '编辑题单' : '新建题单'}
                    </Title>
                </Space>
                <Button type="primary" icon={<SaveOutlined />} onClick={handleSave}>保存题单</Button>
            </header>
            <div className={styles.content}>
                <aside className={styles.leftPanel}>
                    <Title level={5} className={styles.panelTitle}>题单设置</Title>
                    <Form form={form} layout="vertical">
                        <Form.Item name="title" label="题单标题" rules={[{ required: true, message: '请输入标题' }]}>
                            <Input placeholder="例如：期中综合能力测验" />
                        </Form.Item>
                        <Form.Item name="description" label="题单描述">
                            <Input.TextArea rows={3} placeholder="简要描述题单的用途、范围等" />
                        </Form.Item>
                    </Form>
                    <Title level={5} className={styles.panelTitle} style={{ marginTop: 16 }}>
                        已选题目 ({selectedQuestions.length}道)
                    </Title>
                    <div className={styles.selectedQuestionsList}>
                        {selectedQuestions.map((q, index) => (
                            <div key={q.id} className={styles.selectedItem}>
                                <Text className={styles.selectedItemIndex}>{index + 1}.</Text>
                                <Text className={styles.selectedItemContent} ellipsis={{tooltip: q.content}}>
                                    [{questionTypeMap[q.type].text}] {q.content}
                                </Text>
                                <div className={styles.selectedItemActions}>
                                    <Button type="text" danger icon={<DeleteOutlined />} onClick={() => handleRemoveQuestion(q.id)} />
                                </div>
                            </div>
                        ))}
                    </div>
                </aside>
                <main className={styles.rightPanel}>
                    <div className={styles.questionSourceHeader}>
                        <Title level={5} className={styles.panelTitle}>从题库选择</Title>
                        <Space style={{width: '100%'}}>
                            <Search placeholder="搜索题干" onSearch={setSearchQuery} allowClear style={{flex: 1}}/>
                            <Select value={typeFilter} onChange={setTypeFilter} style={{ width: 120 }}>
                                <Option value="all">全部题型</Option>
                                {Object.entries(questionTypeMap).map(([key, {text}]) => <Option key={key} value={key as QuestionType}>{text}</Option>)}
                            </Select>
                        </Space>
                    </div>
                    <div className={styles.tableWrapper}>
                        <Table
                            rowKey="id"
                            columns={columns}
                            dataSource={availableQuestions}
                            pagination={{ pageSize: 8, size: 'small' }}
                            scroll={{ y: '100%' }}
                            size="small"
                        />
                    </div>
                </main>
            </div>
        </div>
    );
};