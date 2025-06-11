// src/components/teacher/pages/ClassManagement/GradingWeightsPanel.tsx
"use client";
import React from 'react';
import { Form, Slider, InputNumber, Button, Row, Col, Typography, Card, message } from 'antd';
const { Title } = Typography;

const GradingWeightsPanel: React.FC = () => {
    return (
        <div style={{ padding: '24px 48px' }}>
            <Card>
                <Title level={4}>成绩权重设置</Title>
                <Form layout="vertical" onFinish={() => message.success("成绩权重已保存！")}>
                    <Form.Item label="平时作业 (30%)">
                        <Slider defaultValue={30} />
                    </Form.Item>
                    <Form.Item label="在线练习 (20%)">
                        <Slider defaultValue={20} />
                    </Form.Item>
                    <Form.Item label="期中考试 (20%)">
                        <Slider defaultValue={20} />
                    </Form.Item>
                    <Form.Item label="期末考试 (30%)">
                        <Slider defaultValue={30} />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">保存设置</Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
}

export default GradingWeightsPanel; 