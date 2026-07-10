/**
 * @name 服务商复核详情
 */
import { useState } from 'react';
import { theme, Typography, Card, Divider, Space, Button, Table, Input, Radio, Timeline, Form, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import PortalLayout from '../../common/portal-layout';
import { adminGroups } from '../../common/menu-data';

const requiredDocColumns = [
  { key: 'docType', title: '文件类型', width: 200, dataIndex: 'docType', ellipsis: true },
  { key: 'docName', title: '文件名称', width: 300, dataIndex: 'docName', ellipsis: true },
  { key: 'remark', title: '备注', width: 200, dataIndex: 'remark', ellipsis: true },
];

const requiredDocData = [
  { index: 1, docType: '物资采购管理部门审批件', docName: '', remark: '' },
];

const uploadDocColumns = [
  { key: 'docType', title: '文件类型', width: 150, dataIndex: 'docType', ellipsis: true },
  { key: 'upload', title: '文件上传', width: 200, dataIndex: 'upload', ellipsis: true },
  { key: 'remark', title: '备注', width: 200, dataIndex: 'remark', ellipsis: true },
  { key: 'uploadTime', title: '上传时间', width: 150, dataIndex: 'uploadTime', ellipsis: true },
];

const uploadDocData: any[] = [];

export default function ReviewDetail() {
  const { token: t } = theme.useToken();
  const [form] = Form.useForm();
  const [auditResult, setAuditResult] = useState('通过');

  return (
    <PortalLayout groups={adminGroups} activePath="/admin/review" portalType="admin">
      <Card style={{ minHeight: 'calc(100vh - 56px - 48px)' }}>
        <Typography.Title level={4} style={{ marginBottom: 0 }}>申请信息</Typography.Title>
        <Divider style={{ margin: '16px 0' }} />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px 24px', marginBottom: 24 }}>
          <div>
            <Typography.Text type="secondary">服务商编码：</Typography.Text>
            <Typography.Text>1002020631</Typography.Text>
          </div>
          <div>
            <Typography.Text type="secondary">服务商名称：</Typography.Text>
            <Typography.Text>山东丽新石化股份有限公司</Typography.Text>
          </div>
          <div>
            <Typography.Text type="secondary">服务商类型：</Typography.Text>
            <Typography.Text>制造商</Typography.Text>
          </div>
          <div>
            <Typography.Text type="secondary">服务商管理类型：</Typography.Text>
            <Typography.Text>总部管理</Typography.Text>
          </div>
          <div>
            <Typography.Text type="secondary">申请类型：</Typography.Text>
            <Typography.Text>暂停交易权限</Typography.Text>
          </div>
          <div>
            <Typography.Text type="secondary">处置范围：</Typography.Text>
            <Typography.Text>本单位</Typography.Text>
          </div>
          <div>
            <Typography.Text type="secondary">申请时间：</Typography.Text>
            <Typography.Text>2026-06-17</Typography.Text>
          </div>
          <div>
            <Typography.Text type="secondary">冻结原因：</Typography.Text>
            <Typography.Text>未年审</Typography.Text>
          </div>
          <div>
            <Typography.Text type="secondary">冻结时效：</Typography.Text>
            <Typography.Text>11</Typography.Text>
          </div>
          <div>
            <Typography.Text type="secondary">备注意见：</Typography.Text>
            <Typography.Text>11111</Typography.Text>
          </div>
          <div>
            <Typography.Text type="secondary">附件：</Typography.Text>
            <Typography.Text></Typography.Text>
          </div>
        </div>

        <Typography.Title level={5} style={{ marginBottom: 16 }}>要件信息</Typography.Title>
        <Table
          columns={requiredDocColumns}
          dataSource={requiredDocData}
          rowKey="index"
          size="middle"
          pagination={false}
          bordered
          style={{ marginBottom: 24 }}
        />

        <Typography.Title level={5} style={{ marginBottom: 16 }}>添加附件</Typography.Title>
        <Table
          columns={uploadDocColumns}
          dataSource={uploadDocData}
          rowKey="index"
          size="middle"
          pagination={false}
          bordered
          style={{ marginBottom: 16 }}
        />
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <Button type="primary" danger onClick={() => message.info('添加附件')}>添加</Button>
        </div>

        <Typography.Title level={5} style={{ marginBottom: 16 }}>审核</Typography.Title>
        <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
          <Button>加签</Button>
          <Button>待阅</Button>
        </div>

        <Timeline style={{ marginBottom: 24 }}>
          <Timeline.Item color="blue">
            <Typography.Text>2026-06-17 14:03:02</Typography.Text>
            <Typography.Text style={{ marginLeft: 8 }}>nyyh1</Typography.Text>
            <Typography.Text type="success" style={{ marginLeft: 8 }}>提交</Typography.Text>
          </Timeline.Item>
          <Timeline.Item color="gray">
            <Typography.Text type="secondary">【nyyh1】</Typography.Text>
            <Typography.Text type="danger" style={{ marginLeft: 8 }}>待审批</Typography.Text>
          </Timeline.Item>
        </Timeline>

        <Form form={form} layout="vertical">
          <Form.Item label="* 审批意见" required>
            <Input.TextArea rows={4} placeholder="请输入审批意见" />
          </Form.Item>
          <Form.Item label="审批结果" required>
            <Radio.Group value={auditResult} onChange={e => setAuditResult(e.target.value)}>
              <Radio value="通过">通过</Radio>
              <Radio value="拒绝">拒绝</Radio>
            </Radio.Group>
          </Form.Item>
        </Form>

        <Divider style={{ margin: '16px 0' }} />
        <div style={{ display: 'flex', gap: 16 }}>
          <Button type="primary" danger onClick={() => message.success('审核完成')}>审核</Button>
          <Button onClick={() => window.history.back()}>返回</Button>
        </div>
      </Card>
    </PortalLayout>
  );
}
