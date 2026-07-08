/**
 * @name 录入考察结果
 */
import { useState } from 'react';
import { theme, Typography, Card, Space, Button, Input, Select, DatePicker, Form, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import PortalLayout from '../../common/portal-layout';
import { adminGroups } from '../../common/menu-data';

export default function InspectionInputPage() {
  const { token: t } = theme.useToken();
  const [form] = Form.useForm();

  const handleBack = () => {
    window.location.hash = '#/admin/inspection-manage';
  };

  const handleSubmit = () => {
    handleBack();
  };

  const handleSave = () => {
    handleBack();
  };

  return (
    <PortalLayout groups={adminGroups} activePath="/admin/inspection-manage" portalType="admin">
      <Typography.Title level={4} style={{ margin: '0 0 16px' }}>录入考察结果</Typography.Title>
      <Form form={form} layout="vertical">
        <Card size="small" title="考察方案" style={{ marginBottom: 16 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
            <Form.Item label="考察方案名称" name="planName">
              <Input placeholder="请输入" />
            </Form.Item>
            <Form.Item label="考察类型" name="inspType">
              <Select defaultValue="实地考察" options={[{ value: '实地考察', label: '实地考察' }, { value: '视频考察', label: '视频考察' }]} />
            </Form.Item>
            <Form.Item label="考察日期" name="inspDate">
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item label="联系人" name="contact">
              <Input placeholder="请输入" />
            </Form.Item>
            <Form.Item label="联系方式" name="contactInfo">
              <Input placeholder="请输入" />
            </Form.Item>
            <Form.Item label="考察内容" name="inspContent">
              <Input.TextArea rows={4} placeholder="请输入" />
            </Form.Item>
          </div>
          <Form.Item label="附件">
            <Upload><Button type="link" icon={<UploadOutlined />}>上传文件</Button></Upload>
          </Form.Item>
        </Card>
        <Card
          size="small"
          title="考察对象"
          extra={<Typography.Link style={{ color: '#1677ff' }}>添加考察对象</Typography.Link>}
          style={{ marginBottom: 16 }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
            <Form.Item label="服务商编码" name="spCode">
              <Input placeholder="请输入" />
            </Form.Item>
            <Form.Item label="服务商名称" name="spName">
              <Input placeholder="请输入" />
            </Form.Item>
            <Form.Item label="服务品类编码" name="catCode">
              <Input placeholder="请输入" />
            </Form.Item>
            <Form.Item label="服务品类名称" name="catName">
              <Input placeholder="请输入" />
            </Form.Item>
            <Form.Item label="服务品类级别" name="catLevel">
              <Input defaultValue="二级" />
            </Form.Item>
            <Form.Item label="服务品类类型" name="catType">
              <Input defaultValue="通用" />
            </Form.Item>
            <Form.Item label="服务情况" name="serviceInfo">
              <Input.TextArea rows={4} placeholder="企业概况、经营情况、服务质量、ESG等情况说明" />
            </Form.Item>
            <div />
            <Form.Item label="考察得分" name="score">
              <Input placeholder="请输入" />
            </Form.Item>
            <Form.Item label="考察结果" name="result">
              <Select defaultValue="通过" options={[{ value: '通过', label: '通过' }, { value: '不通过', label: '不通过' }]} />
            </Form.Item>
          </div>
          <Form.Item label="附件">
            <Upload><Button type="link" icon={<UploadOutlined />}>上传文件</Button></Upload>
          </Form.Item>
        </Card>
      </Form>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 16 }}>
        <Button onClick={handleBack}>取消</Button>
        <Button onClick={handleSave}>保存</Button>
        <Button type="primary" danger onClick={handleSubmit}>提交审核</Button>
      </div>
    </PortalLayout>
  );
}
