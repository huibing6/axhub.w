/**
 * @name 服务品类冻结申请编辑
 */
import { useState } from 'react';
import { theme, Typography, Form, Input, Select, Button, Tabs, Card, Divider, Space, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import PortalLayout from '../../common/portal-layout';
import { adminGroups } from '../../common/menu-data';

export default function CategoryFreezeEdit() {
  const { token: t } = theme.useToken();
  const [form] = Form.useForm();
  const [activeTab, setActiveTab] = useState('create');

  return (
    <PortalLayout groups={adminGroups} activePath="/admin/freeze-apply" portalType="admin">
      <Card style={{ minHeight: 'calc(100vh - 56px - 48px)' }}>
        <Typography.Title level={4} style={{ marginBottom: 0 }}>服务品类冻结申请创建</Typography.Title>
        <Divider style={{ margin: '16px 0 24px' }} />

        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          items={[
            {
              key: 'create',
              label: <span style={{ color: activeTab === 'create' ? t.colorPrimary : undefined, fontWeight: activeTab === 'create' ? 600 : 400 }}>服务品类冻结申请</span>,
              children: (
                <div style={{ maxWidth: 800, marginTop: 16 }}>
                  <Form form={form} layout="horizontal" labelCol={{ span: 5 }} wrapperCol={{ span: 18 }}>
                    <Form.Item label="服务商编码" required>
                      <Input value="1001011400" disabled />
                    </Form.Item>
                    <Form.Item label="服务商名称" required>
                      <Input value="新疆三力石化装备物资有限公司" disabled />
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
                    <Form.Item label="目录级别" required>
                      <Select defaultValue="二级物资">
                        <Select.Option value="一级物资">一级物资</Select.Option>
                        <Select.Option value="二级物资">二级物资</Select.Option>
                        <Select.Option value="三级物资">三级物资</Select.Option>
                      </Select>
                    </Form.Item>
                    <Form.Item label="服务品类编码" required>
                      <Input value="A34100103" disabled />
                    </Form.Item>
                    <Form.Item label="服务品类名称" required>
                      <Input value="抽油泵用化工六氟灵料" disabled />
                    </Form.Item>
                    <Form.Item label="服务状态">
                      <Select defaultValue="正常">
                        <Select.Option value="正常">正常</Select.Option>
                        <Select.Option value="已冻结">已冻结</Select.Option>
                      </Select>
                    </Form.Item>
                    <Form.Item label="申请类型" required>
                      <Select defaultValue="暂停准入产品交易权限">
                        <Select.Option value="暂停准入产品交易权限">暂停准入产品交易权限</Select.Option>
                        <Select.Option value="取消准入资格">取消准入资格</Select.Option>
                      </Select>
                    </Form.Item>
                    <Form.Item label="冻结原因">
                      <Select placeholder="请选择">
                        <Select.Option value="资质过期">资质过期</Select.Option>
                        <Select.Option value="违规操作">违规操作</Select.Option>
                        <Select.Option value="稽核未通过">稽核未通过</Select.Option>
                        <Select.Option value="产品资质到期">产品资质到期</Select.Option>
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
              children: <div style={{ padding: 40, textAlign: 'center', color: t.colorTextQuaternary }}>要件信息（待开发）</div>,
            },
          ]}
        />

        <Divider style={{ margin: '16px 0' }} />
        <Space size={16}>
          <Button type="primary" danger onClick={() => message.success('进入下一步')}>下一步</Button>
          <Button onClick={() => window.history.back()}>返回</Button>
        </Space>
      </Card>
    </PortalLayout>
  );
}
