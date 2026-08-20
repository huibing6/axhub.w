/**
 * @name 服务商冻结申请创建
 */
import { useState } from 'react';
import { theme, Typography, Form, Input, Select, Button, Tabs, Card, Divider, Space, Table, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

export default function FreezeApplyCreate() {
  const { token: t } = theme.useToken();
  const [form] = Form.useForm();
  const [activeTab, setActiveTab] = useState('create');

  return (
    <Card style={{ minHeight: 'calc(100vh - 56px - 48px)' }}>
      <Typography.Title level={4} style={{ marginBottom: 0 }}>服务商冻结申请创建</Typography.Title>
      <Divider style={{ margin: '16px 0 24px' }} />

      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        items={[
          {
            key: 'create',
            label: <span style={{ color: activeTab === 'create' ? t.colorPrimary : undefined, fontWeight: activeTab === 'create' ? 600 : 400 }}>冻结申请创建</span>,
            children: (
              <div style={{ maxWidth: 800, marginTop: 16 }}>
                <Form form={form} layout="horizontal" labelCol={{ span: 5 }} wrapperCol={{ span: 18 }}>
                  <Form.Item label="服务商编码">
                    <Select placeholder="请选择" allowClear />
                  </Form.Item>
                  <Form.Item label="服务商名称">
                    <Select placeholder="请选择" allowClear />
                  </Form.Item>
                  <Form.Item label="处置范围" required>
                    <Select defaultValue="全集团">
                      <Select.Option value="全集团">全集团</Select.Option>
                      <Select.Option value="本单位">本单位</Select.Option>
                    </Select>
                  </Form.Item>
                  <Form.Item label="申请单位" required>
                    <Input value="中国石油天然气集团有限公司" disabled />
                  </Form.Item>
                  <Form.Item label="申请类型" required>
                    <Select defaultValue="暂停交易权限">
                      <Select.Option value="暂停交易权限">暂停交易权限</Select.Option>
                      <Select.Option value="取消服务商准入资格">取消服务商准入资格</Select.Option>
                    </Select>
                  </Form.Item>
                  <Form.Item label="服务商状态">
                    <Select placeholder="请选择">
                      <Select.Option value="正常">正常</Select.Option>
                      <Select.Option value="已冻结">已冻结</Select.Option>
                    </Select>
                  </Form.Item>
                  <Form.Item label="冻结原因" required>
                    <Select placeholder="请选择">
                      <Select.Option value="资质过期">资质过期</Select.Option>
                      <Select.Option value="违规操作">违规操作</Select.Option>
                      <Select.Option value="稽核未通过">稽核未通过</Select.Option>
                      <Select.Option value="现场考察不合格">现场考察不合格</Select.Option>
                      <Select.Option value="其他">其他</Select.Option>
                    </Select>
                  </Form.Item>
                  <Form.Item label="冻结时效">
                    <Input placeholder="请输入" suffix="月" style={{ maxWidth: 300 }} />
                  </Form.Item>
                  <Form.Item label="备注意见" required>
                    <Input.TextArea rows={4} placeholder="请输入备注" />
                  </Form.Item>
                  <Form.Item label="附件">
                    <div>
                      <Button type="primary" danger icon={<UploadOutlined />} onClick={() => message.info('附件上传')}>附件上传</Button>
                      <div style={{ marginTop: 8, color: t.colorTextSecondary, fontSize: 12 }}>
                        支持扩展名：.docx、.xlsx、.pdf，最大不超过 200M 的文件。
                      </div>
                    </div>
                  </Form.Item>
                </Form>
              </div>
            ),
          },
          {
            key: 'info',
            label: '要件信息',
            children: (
              <div style={{ marginTop: 16 }}>
                <Typography.Text strong style={{ fontSize: 14, display: 'block', marginBottom: 12 }}>资质文件要求</Typography.Text>
                <Table
                  rowKey="id"
                  size="small"
                  bordered
                  pagination={false}
                  dataSource={[
                    { id: 1, name: '营业执照', status: '有效', expiry: '2027-12-31' },
                    { id: 2, name: '安全生产许可证', status: '有效', expiry: '2026-06-30' },
                    { id: 3, name: '质量管理体系认证证书', status: '即将到期', expiry: '2026-03-15' },
                    { id: 4, name: '环境管理体系认证证书', status: '有效', expiry: '2027-09-20' },
                    { id: 5, name: '职业健康安全管理体系证书', status: '有效', expiry: '2027-09-20' },
                  ]}
                  columns={[
                    { title: '要件名称', dataIndex: 'name', key: 'name' },
                    { title: '状态', dataIndex: 'status', key: 'status', width: 100, render: (v: string) => (
                      <span style={{ color: v === '即将到期' ? '#faad14' : '#52c41a' }}>{v}</span>
                    )},
                    { title: '有效期至', dataIndex: 'expiry', key: 'expiry', width: 130 },
                  ]}
                />
              </div>
            ),
          },
        ]}
      />

      <Divider style={{ margin: '16px 0' }} />
      <Space size={16}>
        <Button type="primary" danger onClick={() => message.success('进入下一步')}>下一步</Button>
        <Button onClick={() => window.history.back()}>返回</Button>
      </Space>
    </Card>
  );
}
