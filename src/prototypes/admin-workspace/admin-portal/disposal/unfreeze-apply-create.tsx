/**
 * @name 服务商解冻申请创建
 */
import { useState } from 'react';
import { theme, Typography, Form, Input, Select, Button, Card, Divider, Space, Upload, Table, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import PortalLayout from '../../common/portal-layout';
import { adminGroups } from '../../common/menu-data';

const historyColumns = [
  { key: 'applyPerson', title: '申请人', width: 100, dataIndex: 'applyPerson', ellipsis: true },
  { key: 'applyTime', title: '申请时间', width: 160, dataIndex: 'applyTime', ellipsis: true },
  { key: 'applyUnit', title: '申请单位', width: 180, dataIndex: 'applyUnit', ellipsis: true },
  { key: 'applyType', title: '申请类型', width: 120, dataIndex: 'applyType', ellipsis: true },
  { key: 'freezeRange', title: '冻结范围', width: 100, dataIndex: 'freezeRange', ellipsis: true },
  { key: 'freezeReason', title: '冻结原因', width: 120, dataIndex: 'freezeReason', ellipsis: true },
  { key: 'freezeDuration', title: '冻结时效（月）', width: 120, dataIndex: 'freezeDuration', ellipsis: true },
  { key: 'effectTime', title: '生效时间', width: 160, dataIndex: 'effectTime', ellipsis: true },
  { key: 'remark', title: '备注意见', width: 200, dataIndex: 'remark', ellipsis: true },
];

const historyData = [];

export default function UnfreezeApplyCreate() {
  const { token: t } = theme.useToken();
  const [form] = Form.useForm();

  return (
    <PortalLayout groups={adminGroups} activePath="/admin/unfreeze-apply" portalType="admin">
      <Card style={{ minHeight: 'calc(100vh - 56px - 48px)' }}>
        <Typography.Title level={4} style={{ marginBottom: 0 }}>服务商解冻申请创建</Typography.Title>
        <Divider style={{ margin: '16px 0 24px' }} />

        <Typography.Title level={5} style={{ color: t.colorPrimary, marginBottom: 16 }}>解冻申请创建</Typography.Title>

        <div style={{ maxWidth: 800 }}>
          <Form form={form} layout="horizontal" labelCol={{ span: 5 }} wrapperCol={{ span: 18 }}>
            <Form.Item label="服务商编码" required>
              <Select placeholder="请选择" />
            </Form.Item>
            <Form.Item label="服务商名称" required>
              <Input placeholder="请输入" />
            </Form.Item>
            <Form.Item label="解冻类型" required>
              <Select placeholder="请选择">
                <Select.Option value="资质更新解冻">资质更新解冻</Select.Option>
                <Select.Option value="整改完成解冻">整改完成解冻</Select.Option>
                <Select.Option value="其他解冻">其他解冻</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="冻结范围">
              <Select placeholder="请选择">
                <Select.Option value="全集团">全集团</Select.Option>
                <Select.Option value="本单位">本单位</Select.Option>
              </Select>
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

        <Divider style={{ margin: '24px 0' }} />
        <Typography.Title level={5} style={{ marginBottom: 16 }}>冻结历史</Typography.Title>
        <Table
          columns={historyColumns}
          dataSource={historyData}
          rowKey="index"
          size="middle"
          scroll={{ x: 1200 }}
          pagination={{ pageSize: 10, showTotal: total => `共 ${total} 条` }}
          locale={{ emptyText: '暂无数据' }}
        />

        <Divider style={{ margin: '16px 0' }} />
        <Space size={16}>
          <Button type="primary" danger onClick={() => message.info('保存成功')}>保存</Button>
          <Button onClick={() => message.info('选择审核人')}>选择审核人</Button>
          <Button type="primary" onClick={() => message.success('提交成功')}>提交</Button>
          <Button onClick={() => window.history.back()}>返回</Button>
        </Space>
      </Card>
    </PortalLayout>
  );
}
