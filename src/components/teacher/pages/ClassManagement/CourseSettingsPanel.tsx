// src/components/teacher/pages/ClassManagement/CourseSettingsPanel.tsx
"use client";
import React from 'react';
import { Form, Input, Button, Typography, Card, Switch, message, Popconfirm } from 'antd';
const { Title, Paragraph } = Typography;

const CourseSettingsPanel: React.FC = () => {
    return (
        <div style={{ padding: '24px 48px' }}>
            <Card>
                <Title level={4}>课程设置</Title>
                <Form layout="vertical" initialValues={{ courseName: "Python 程序设计", allowJoin: true }} onFinish={() => message.success("课程设置已更新！")}>
                    <Form.Item label="课程名称" name="courseName">
                        <Input />
                    </Form.Item>
                    <Form.Item label="允许学生加入" name="allowJoin" valuePropName="checked">
                        <Switch />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">保存更改</Button>
                    </Form.Item>
                </Form>

                <Card.Meta
                    title={<Title level={5} style={{color: 'red'}}>危险区域</Title>}
                    description={
                        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 16}}>
                            <Paragraph style={{marginBottom: 0}}>归档后，课程将不可访问。此操作不可逆，请谨慎操作。</Paragraph>
                            <Popconfirm title="确认要归档此课程吗？" okText="确认归档" cancelText="取消" onConfirm={() => message.warning("课程已归档")}>
                                <Button danger>归档课程</Button>
                            </Popconfirm>
                        </div>
                    }
                    style={{marginTop: 32, padding: 16, border: '1px solid #ffccc7', borderRadius: 8}}
                />
            </Card>
        </div>
    );
}

export default CourseSettingsPanel;