// src/app/teacher/course-center/create-courses/page.tsx
"use client";
import React, { useState } from 'react';
import {
  Typography,
  Form,
  Input,
  Select,
  Button,
  Upload,
  DatePicker,
  Radio,
  Steps,
  Card,
  Space,
  message,
  Switch,
  Divider,
  Row,
  Col,
} from 'antd';
import { InboxOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;
const { Option } = Select;
const { Dragger } = Upload;
const { RangePicker } = DatePicker;

const CreateCoursePage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm();

  const next = async () => {
    try {
      await form.validateFields();
      setCurrentStep(currentStep + 1);
    } catch (errorInfo) {
      console.log('Validate Failed:', errorInfo);
    }
  };

  const prev = () => {
    setCurrentStep(currentStep - 1);
  };
  
  const onFinish = (values: any) => {
    console.log('Form Values:', values);
    message.success('课程创建成功!');
  };

  const steps = [
    {
      title: '基本信息',
      content: (
        <>
            <Form.Item
                name="title"
                label="课程名称"
                rules={[{ required: true, message: '请输入课程名称' }]}
            >
                <Input placeholder="例如：嵌入式Linux开发实践教程" />
            </Form.Item>
            <Form.Item
                name="description"
                label="课程简介"
                rules={[{ required: true, message: '请输入课程简介' }]}
            >
                <Input.TextArea rows={4} placeholder="简要介绍课程的目标、内容和特色" />
            </Form.Item>
            <Form.Item label="课程封面">
                <Dragger name="files" action="/upload.do" style={{backgroundColor: '#fafafa'}}>
                    <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">点击或拖拽文件到此区域上传</p>
                    <p className="ant-upload-hint">支持 JPG/PNG/GIF, 推荐尺寸 800x450px</p>
                </Dragger>
            </Form.Item>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item name="category" label="课程分类" rules={[{ required: true, message: '请选择课程分类'}]}>
                        <Select placeholder="选择一个分类">
                            <Option value="cs">计算机科学</Option>
                            <Option value="lang">语言文学</Option>
                            <Option value="sci">数理科学</Option>
                            <Option value="biz">商科经济</Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item name="tags" label="课程标签">
                        <Select mode="tags" placeholder="输入标签后按回车确认" />
                    </Form.Item>
                </Col>
            </Row>
        </>
      ),
    },
    {
      title: '课程内容',
      content: (
        <>
            <Paragraph type="secondary" style={{textAlign: 'center', marginBottom: 24}}>
                您可以上传课程大纲或知识库文档，EduSpark 将利用 AI 为您自动生成初始的教学内容、练习题和考核。
            </Paragraph>
            <Form.Item 
                name="knowledgeBase" 
                label="上传课程大纲/知识库"
                rules={[{ required: true, message: '请上传至少一份课程资料'}]}
            >
                <Dragger name="files" multiple>
                    <p className="ant-upload-drag-icon"><InboxOutlined /></p>
                    <p className="ant-upload-text">点击或拖拽文件到此区域</p>
                    <p className="ant-upload-hint">支持 PDF, DOCX, MD, PPTX 等多种格式</p>
                </Dragger>
            </Form.Item>
            <Form.Item 
                name="aiGeneration" 
                label="AI 自动生成教学内容" 
                valuePropName="checked"
                tooltip="开启后，系统将根据您上传的资料，自动创建包含知识讲解、实训任务和考核题目的完整教案。"
            >
                <Switch defaultChecked />
            </Form.Item>
            <Divider>或 手动创建</Divider>
            <div style={{textAlign: 'center'}}>
                <Button type="link">前往内容编辑器手动创建章节</Button>
            </div>
        </>
      ),
    },
    {
      title: '发布设置',
      content: (
        <>
            <Form.Item 
                name="visibility" 
                label="开放设置" 
                rules={[{ required: true, message: '请选择课程的开放设置'}]}
                initialValue="private"
            >
                <Radio.Group>
                    <Radio.Button value="private">私有课程 (仅限邀请)</Radio.Button>
                    <Radio.Button value="public">公开课程 (所有人可见)</Radio.Button>
                </Radio.Group>
            </Form.Item>
            <Form.Item 
                name="courseDates" 
                label="开课时间"
                rules={[{ required: true, message: '请选择开课与结课日期'}]}
            >
                <RangePicker style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item 
                name="allowJoin" 
                label="允许学生加入" 
                valuePropName="checked"
            >
                <Switch />
            </Form.Item>
        </>
      ),
    },
  ];

  return (
    <div>
      <Title level={2}>创建新课程</Title>
      <Paragraph type="secondary">
        请跟随以下步骤，轻松创建一门由 AI 赋能的互动式实训课程。
      </Paragraph>
      <Card style={{ marginTop: 24 }}>
        <Steps current={currentStep} items={steps.map(item => ({ key: item.title, title: item.title }))} style={{ marginBottom: 32 }}/>
        
        <Form
          form={form}
          layout="vertical"
          name="create_course"
          onFinish={onFinish}
          style={{ maxWidth: '800px', margin: '0 auto' }}
        >
          <div>{steps[currentStep].content}</div>

          <div style={{ marginTop: 40, textAlign: 'center' }}>
            <Space size="large">
              {currentStep > 0 && (
                <Button icon={<LeftOutlined />} onClick={() => prev()}>
                  上一步
                </Button>
              )}
              {currentStep < steps.length - 1 && (
                <Button type="primary" icon={<RightOutlined />} onClick={() => next()}>
                  下一步
                </Button>
              )}
              {currentStep === steps.length - 1 && (
                <Button type="primary" htmlType="submit">
                  完成创建
                </Button>
              )}
            </Space>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default CreateCoursePage;