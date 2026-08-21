/**
 * @name 补充MDG信息
 * 待配码库 → 补充MDG，复用MDGCards共享组件
 */
import React from 'react';
import { useState } from 'react';
import { theme, Typography, Card, Space, Button, Form, message } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { MDGCards } from '../../admin-workspace/common/admission-shared';

export default function PendingMdg() {
  const { token: t } = theme.useToken();
  const [form] = Form.useForm();

  const handleBack = () => {
    window.location.hash = '#/admin/pending-list';
  };

  const handleSubmit = () => {
    message.success('MDG信息已补充完成');
    handleBack();
  };

  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        <Button type="link" icon={<ArrowLeftOutlined />} onClick={handleBack} style={{ paddingLeft: 0 }}>返回列表</Button>
        <Typography.Text type="secondary">{'>'}</Typography.Text>
        <Typography.Text>准入管理</Typography.Text>
        <Typography.Text type="secondary">{'>'}</Typography.Text>
        <Typography.Text>补充MDG信息</Typography.Text>
      </Space>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
        <div>
          <Typography.Title level={4} style={{ margin: 0 }}>湖北江汉石油机械制造有限公司</Typography.Title>
          <Space style={{ marginTop: 8 }} size={24}>
            <Typography.Text type="secondary">统一社会信用代码：91420000706802345X</Typography.Text>
            <Typography.Text type="secondary">管理单位：长庆油田分公司</Typography.Text>
          </Space>
        </div>
        <Typography.Text style={{ color: '#faad14', border: '1px solid #faad14', padding: '2px 12px', borderRadius: 4 }}>待配码</Typography.Text>
      </div>
      <Card variant="outlined" size="small">
        <Form form={form} layout="vertical">
          <MDGCards mode="editable" form={form} />
        </Form>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 16 }}>
          <Button onClick={handleBack}>取消</Button>
          <Button type="primary" danger onClick={handleSubmit}>提交</Button>
        </div>
      </Card>
    </div>
  );
}
