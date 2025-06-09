// src/components/teacher/pages/QuestionBank/CreateQuestionPanel.tsx
"use client";
import React, { useState, useRef } from 'react';
import {
  Button, Form, Select, Input, Radio, Typography, Space, Checkbox, Divider, InputNumber, message
} from 'antd';
import { PlusOutlined, DeleteOutlined, SaveOutlined, BulbOutlined } from '@ant-design/icons';
// 引入 MDXEditor 及其核心插件
import {
  MDXEditor,
  MDXEditorMethods,
  toolbarPlugin,
  listsPlugin,
  quotePlugin,
  headingsPlugin,
  linkPlugin,
  imagePlugin,
  tablePlugin,
  thematicBreakPlugin,
  markdownShortcutPlugin,
  KitchenSinkToolbar, // 一个功能齐全的工具栏
  codeBlockPlugin, // 用于普通代码块
  // diffSourcePlugin, // 暂时移除
  // frontmatterPlugin, // 暂时移除
} from '@mdxeditor/editor';
import '@mdxeditor/editor/style.css'; // 必须引入样式
import styles from './CreateQuestionPanel.module.css';
import { questionTypeMap, mockFolders, QuestionType } from '@/lib/question-bank-data';

const { Title, Text } = Typography;
const { Option } = Select;

const CreateQuestionPanel: React.FC = () => {
    const [form] = Form.useForm();
    const [questionType, setQuestionType] = useState<QuestionType>('single-choice');
    const editorRef = useRef<MDXEditorMethods>(null);

    // 模拟的知识点数据
    const knowledgePoints = [
        { label: 'Python 基础语法', value: 'kp-1' },
        { label: '变量与数据类型', value: 'kp-2' },
        { label: '控制流与循环', value: 'kp-3' },
    ];

    const handleTypeChange = (value: QuestionType) => {
        setQuestionType(value);
        form.setFieldsValue({
            options: [{ value: '' }],
            correctAnswer: undefined,
            correctAnswers: [],
            blanks: [{ value: '' }],
            modelAnswer: '',
        });
    };
    
    const handleAiParse = () => {
        const knowledge = form.getFieldValue('aiKnowledge');
        if (!knowledge) {
            message.warning('请先选择一个知识点');
            return;
        }
        message.loading({ content: 'AI 正在解析知识点并生成题干...', key: 'ai_parse'});
        setTimeout(() => {
            const newContent = `根据知识点 **"${knowledgePoints.find(k=>k.value === knowledge)?.label}"** 生成的题干内容示例。这是一个包含 **加粗**、*斜体* 和 \`代码\` 的文本。\n\n这是一个公式示例(KaTeX格式)：\n\n$$
x^2 + y^2 = z^2
$$`;
            editorRef.current?.setMarkdown(newContent);
            form.setFieldsValue({ content: newContent });
            message.success({ content: '题干已生成！', key: 'ai_parse'});
        }, 1500);
    };

    const renderAnswerForm = () => {
        // ... (这部分代码与上一版完全相同，此处省略以节省篇幅)
        switch (questionType) {
            case 'single-choice':
                return (
                    <Form.Item label="选项与答案" required>
                        <Form.Item name="correctAnswer" noStyle>
                            <Radio.Group>
                                <Form.List name="options">
                                    {(fields, { add, remove }) => (
                                        <Space direction="vertical" style={{ width: '100%' }}>
                                            {fields.map(({ key, name, ...restField }, index) => (
                                                <div key={key} className={styles.optionItem}>
                                                    <Radio value={index} />
                                                    <Form.Item {...restField} name={[name, 'value']} noStyle rules={[{required: true, message: '选项内容不能为空'}]}>
                                                        <Input placeholder={`选项 ${String.fromCharCode(65 + index)}`} className={styles.optionInput}/>
                                                    </Form.Item>
                                                    {fields.length > 1 && <DeleteOutlined onClick={() => remove(name)} />}
                                                </div>
                                            ))}
                                            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>添加选项</Button>
                                        </Space>
                                    )}
                                </Form.List>
                            </Radio.Group>
                        </Form.Item>
                    </Form.Item>
                );
            case 'multi-choice':
                return (
                     <Form.Item label="选项与答案" required>
                        <Form.Item name="correctAnswers" noStyle>
                            <Checkbox.Group style={{width: '100%'}}>
                                <Form.List name="options">
                                     {(fields, { add, remove }) => (
                                        <Space direction="vertical" style={{ width: '100%' }}>
                                            {fields.map(({ key, name, ...restField }, index) => (
                                                <div key={key} className={styles.optionItem}>
                                                    <Checkbox value={index}/>
                                                    <Form.Item {...restField} name={[name, 'value']} noStyle rules={[{required: true, message: '选项内容不能为空'}]}>
                                                        <Input placeholder={`选项 ${String.fromCharCode(65 + index)}`} className={styles.optionInput}/>
                                                    </Form.Item>
                                                    {fields.length > 1 && <DeleteOutlined onClick={() => remove(name)} />}
                                                </div>
                                            ))}
                                            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>添加选项</Button>
                                        </Space>
                                    )}
                                </Form.List>
                            </Checkbox.Group>
                        </Form.Item>
                    </Form.Item>
                );
            case 'true-false':
                return (
                    <Form.Item name="correctAnswer" label="正确答案" rules={[{ required: true, message: '请选择正确答案'}]}>
                        <Radio.Group>
                            <Radio value="true">正确</Radio>
                            <Radio value="false">错误</Radio>
                        </Radio.Group>
                    </Form.Item>
                );
            case 'fill-in':
                 return (
                    <Form.Item label="参考答案 (每个填空一行)" required>
                        <Form.List name="blanks">
                            {(fields, { add, remove }) => (
                                <Space direction="vertical" style={{ width: '100%' }}>
                                    {fields.map(({ key, name, ...restField }, index) => (
                                        <div key={key} className={styles.optionItem}>
                                            <Text>空 {index + 1}:</Text>
                                            <Form.Item {...restField} name={[name, 'value']} noStyle rules={[{required: true, message: '答案不能为空'}]}>
                                                <Input placeholder={`答案 ${index + 1}`} className={styles.optionInput}/>
                                            </Form.Item>
                                            {fields.length > 1 && <DeleteOutlined onClick={() => remove(name)} />}
                                        </div>
                                    ))}
                                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>添加填空</Button>
                                </Space>
                            )}
                        </Form.List>
                    </Form.Item>
                );
            default:
                return (
                    <Form.Item name="modelAnswer" label="参考答案" rules={[{ required: true, message: '请输入参考答案'}]}>
                        <Input.TextArea rows={5} placeholder="请输入该题的参考答案或解题步骤..." />
                    </Form.Item>
                );
        }
    };
    
    return (
        <Form form={form} layout="vertical" initialValues={{ options: [{value: ''}], blanks: [{value: ''}] }}>
            <div className={styles.panelWrapper}>
                <main className={styles.mainPanel}>
                    <div className={styles.editorCard}>
                         <div className={styles.cardHeader}>
                             <Title level={5} style={{margin: 0}}>题目内容设置</Title>
                         </div>
                         
                         <Form.Item label="题型选择" required>
                             <div className={styles.aiActionRow}>
                                <Form.Item name="type" noStyle initialValue="single-choice" rules={[{ required: true }]}>
                                    <Select style={{ width: 140 }} onChange={handleTypeChange}>
                                        {Object.entries(questionTypeMap).map(([key, {text}]) => (
                                            <Option key={key} value={key}>{text}</Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                                <Form.Item name="aiKnowledge" noStyle>
                                    <Select placeholder="选择知识点 (AI出题用)" className={styles.aiKnowledgeSelect} options={knowledgePoints} allowClear />
                                </Form.Item>
                                <Button icon={<BulbOutlined />} className={styles.aiGenerateButton} onClick={handleAiParse}>AI一键解析</Button>
                             </div>
                         </Form.Item>
                         
                         <Form.Item 
                            label="题干" 
                            name="content" 
                            rules={[{ required: true, message: '题干内容不能为空'}]} 
                            style={{flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0}}
                         >
                            <div className={styles.editorWrapper}>
                               <MDXEditor
                                    ref={editorRef}
                                    markdown={form.getFieldValue('content') || ''}
                                    onChange={(md) => form.setFieldsValue({ content: md })}
                                    contentEditableClassName="prose"
                                    // --- 核心修复：使用一个稳定、简化的插件集 ---
                                    plugins={[
                                        toolbarPlugin({
                                          toolbarContents: () => <KitchenSinkToolbar />
                                        }),
                                        listsPlugin(),
                                        quotePlugin(),
                                        headingsPlugin(),
                                        linkPlugin(),
                                        imagePlugin({
                                            // 配置一个模拟的图片上传处理器
                                            imageUploadHandler: () => {
                                                return Promise.resolve('https://picsum.photos/200/300?t=' + Date.now())
                                            },
                                        }),
                                        tablePlugin(),
                                        thematicBreakPlugin(),
                                        codeBlockPlugin({ defaultCodeBlockLanguage: 'python' }),
                                        markdownShortcutPlugin(),
                                      ]}
                                />
                            </div>
                         </Form.Item>
                         
                         <div className={styles.answerArea}>
                             <Divider>答案与解析</Divider>
                             {renderAnswerForm()}
                             <Form.Item name="analysis" label="题目解析">
                                <Input.TextArea rows={3} placeholder="输入题目的详细解析，帮助学生理解。" />
                             </Form.Item>
                         </div>
                    </div>
                </main>
                <aside className={styles.configPanel}>
                    <div className={styles.configCard} style={{flex: 1, minHeight: 0}}>
                        <Title level={5}>题目配置</Title>
                        <div className={styles.configScrollable}>
                            <Form.Item name="folder" label="所属文件夹" initialValue="folder-unassigned">
                                <Select>
                                    {mockFolders.map(folder => <Option key={folder.id} value={folder.id}>{folder.name}</Option>)}
                                </Select>
                            </Form.Item>
                            <Form.Item name="difficulty" label="难度" initialValue="medium">
                                <Select>
                                <Option value="easy">简单</Option>
                                <Option value="medium">中等</Option>
                                <Option value="hard">困难</Option>
                                </Select>
                            </Form.Item>
                            <Form.Item name="score" label="分数" initialValue={5}>
                                <InputNumber min={0} style={{width: '100%'}} />
                            </Form.Item>
                            <Form.Item name="tags" label="标签">
                                <Select mode="tags" placeholder="输入标签后按回车确认" />
                            </Form.Item>
                            <Form.Item name="knowledgePoints" label="关联知识点">
                                <Select mode="multiple" placeholder="关联相关知识点" options={knowledgePoints} allowClear />
                            </Form.Item>
                        </div>
                    </div>
                     <div className={`${styles.configCard} ${styles.actionsBar}`}>
                        <Space style={{width: '100%', justifyContent: 'flex-end'}}>
                            <Button>取消</Button>
                            <Button icon={<SaveOutlined />}>保存并继续新增</Button>
                            <Button type="primary" icon={<SaveOutlined />}>保存</Button>
                        </Space>
                    </div>
                </aside>
            </div>
        </Form>
    );
};

export default CreateQuestionPanel;