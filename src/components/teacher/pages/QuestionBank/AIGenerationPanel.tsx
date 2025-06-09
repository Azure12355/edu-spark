// src/components/teacher/pages/QuestionBank/AIGenerationPanel.tsx
"use client";
import React, { useState } from 'react';
import {
  Button,
  Form,
  Select,
  Input,
  InputNumber,
  Radio,
  Upload,
  Typography,
  Space,
  Empty,
  Spin,
  Tag,
  Divider,
  message,
  Collapse,
} from 'antd';
import { InboxOutlined, CheckCircleOutlined, RedoOutlined, EditOutlined, BulbOutlined, DownloadOutlined } from '@ant-design/icons';
import styles from './AIGenerationPanel.module.css';
import { questionTypeMap, Question } from '@/lib/question-bank-data';

const { Title, Text, Paragraph } = Typography;
const { Dragger } = Upload;
const { Option } = Select;

type SourceType = 'knowledgeBase' | 'upload' | 'text';

const AIGenerationPanel: React.FC = () => {
    const [form] = Form.useForm();
    const [sourceType, setSourceType] = useState<SourceType>('knowledgeBase');
    const [isLoading, setIsLoading] = useState(false);
    const [generatedQuestions, setGeneratedQuestions] = useState<Partial<Question>[]>([]);

    const handleGenerate = () => {
        form.validateFields().then(values => {
            console.log('AI Generation Config:', values);
            setIsLoading(true);
            setGeneratedQuestions([]);
            setTimeout(() => {
                // 模拟更丰富的AI生成结果
                setGeneratedQuestions([
                    { id: 'gen-1', type: 'single-choice', content: '在Python中，用于定义函数的关键字是什么？', answer: 'def', analysis: '`def`是Python中用于定义函数的关键字，后跟函数名和括号。' },
                    { id: 'gen-2', type: 'true-false', content: 'Python中的列表（List）是不可变数据类型。', answer: 'false', analysis: '列表（List）是可变的，可以随时添加、删除或修改其元素。元组（Tuple）才是不可变的。' },
                    { id: 'gen-3', type: 'programming', content: '请用Python编写一个函数，计算一个列表中所有偶数的和。', answer: 'def sum_evens(numbers):\n  total = 0\n  for num in numbers:\n    if num % 2 == 0:\n      total += num\n  return total', analysis: '该函数通过循环遍历列表，使用模运算判断是否为偶数，并累加求和。' }
                ]);
                setIsLoading(false);
                message.success('3个新题目已生成！');
            }, 2000);
        });
    };

    const typeOptions = Object.entries(questionTypeMap).map(([key, { text, color }]) => ({
        value: key,
        label: <Tag color={color}>{text}</Tag>
    }));

    return (
        <div className={styles.panelWrapper}>
            <aside className={styles.configPanel}>
                <div className={styles.configHeader}>
                    <Title level={4} style={{ margin: 0 }}>AI 出题配置</Title>
                    <Text type="secondary">请配置参数，AI将为您智能生成题目</Text>
                </div>
                <Form form={form} layout="vertical" className={styles.configForm}>
                    <Form.Item name="source" label="知识来源" initialValue="knowledgeBase" style={{marginBottom: 16}}>
                        <Radio.Group onChange={(e) => setSourceType(e.target.value)} value={sourceType}>
                            <Space direction="vertical" style={{width: '100%'}}>
                                <Radio value="knowledgeBase" className={styles.sourceOption}>课程知识库</Radio>
                                <Radio value="upload" className={styles.sourceOption}>上传新文件</Radio>
                                {sourceType === 'upload' && (
                                    <Dragger name="files" className={styles.uploadDragger}>
                                        <p className="ant-upload-drag-icon"><InboxOutlined /></p>
                                        <p className="ant-upload-text">点击或拖拽文件</p>
                                    </Dragger>
                                )}
                                <Radio value="text" className={styles.sourceOption}>粘贴文本</Radio>
                                {sourceType === 'text' && (
                                    <Form.Item name="rawText" noStyle>
                                        <Input.TextArea rows={4} placeholder="在此粘贴文本内容..." className={styles.textAreaOption} />
                                    </Form.Item>
                                )}
                            </Space>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item name="types" label="题型选择" rules={[{ required: true, message: '请至少选择一种题型' }]}>
                        <Select mode="multiple" placeholder="选择生成的题型" options={typeOptions} allowClear />
                    </Form.Item>
                    <Form.Item name="count" label="题目数量" initialValue={5}>
                        <InputNumber min={1} max={50} style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item name="difficulty" label="难度" initialValue="medium">
                        <Select>
                            <Option value="easy">简单</Option>
                            <Option value="medium">中等</Option>
                            <Option value="hard">困难</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="prompt" label="高级指令 (可选)">
                        <Input.TextArea rows={3} placeholder="例如：请围绕“面向对象”这一主题出题..." />
                    </Form.Item>
                </Form>
                <Button type="primary" size="large" icon={<BulbOutlined />} block onClick={handleGenerate} loading={isLoading}>
                    {isLoading ? '正在生成中...' : '开始智能生成'}
                </Button>
            </aside>
            <main className={styles.resultPanel}>
                <div className={styles.resultHeader}>
                    <Title level={5} style={{ margin: 0 }}>生成结果</Title>
                    <Space>
                        <Button disabled={generatedQuestions.length === 0} icon={<DownloadOutlined />}>全部导出</Button>
                        <Button type="primary" disabled={generatedQuestions.length === 0} icon={<CheckCircleOutlined />}>全部采纳</Button>
                    </Space>
                </div>
                {isLoading ? (
                    <div className={styles.emptyState}>
                        <Spin size="large" tip="AI正在奋力出题中，请稍候..." />
                    </div>
                ) : generatedQuestions.length > 0 ? (
                    <div className={styles.resultListContainer}>
                        <Collapse accordion className={styles.resultCollapse}>
                            {generatedQuestions.map((q, index) => (
                                <Collapse.Panel
                                    key={q.id || index}
                                    header={
                                        <div className={styles.collapseHeaderContent}>
                                            <Tag color={questionTypeMap[q.type as any].color}>{questionTypeMap[q.type as any].text}</Tag>
                                            <Text className={styles.questionContentText}>{q.content}</Text>
                                        </div>
                                    }
                                    extra={
                                        <Space onClick={event => event.stopPropagation()}>
                                            <Button type="text" shape="circle" icon={<EditOutlined />} title="编辑" />
                                            <Button type="text" shape="circle" icon={<RedoOutlined />} title="重新生成此题" />
                                            <Button type="link">采纳</Button>
                                        </Space>
                                    }
                                >
                                    <Paragraph><strong>答案：</strong>{Array.isArray(q.answer) ? q.answer.join(', ') : q.answer}</Paragraph>
                                    <Divider style={{ margin: '12px 0' }} />
                                    <Paragraph type="secondary"><strong>解析：</strong>{q.analysis}</Paragraph>
                                </Collapse.Panel>
                            ))}
                        </Collapse>
                    </div>
                ) : (
                    <div className={styles.emptyState}>
                        <Empty description="配置左侧参数后，点击“开始智能生成”" />
                    </div>
                )}
            </main>
        </div>
    );
};

export default AIGenerationPanel;