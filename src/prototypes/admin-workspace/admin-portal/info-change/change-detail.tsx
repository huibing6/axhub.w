/**
 * @name 变更详情
 */
import { useState } from 'react';
import { theme, Typography, Card, Space, Button, Table, Descriptions, Divider, message, Modal } from 'antd';
import PortalLayout from '../../common/portal-layout';
import { adminGroups } from '../../common/menu-data';
import { StatusTimeline } from '../../common/components';

const { Text, Title } = Typography;

const timelineItems = [
  { status: '提交申请', time: '2026-06-25 09:30', operator: '张三', opinion: '提交服务商信息变更申请' },
  { status: '部门审核', time: '2026-06-25 14:15', operator: '李四', opinion: '材料齐全，同意流转至复核环节' },
  { status: '待复核', time: '2026-06-26 10:00', operator: '王五' },
];

const approvalRecords = [
  { key: '1', step: '部门审核', operator: '李四', time: '2026-06-25 14:15', opinion: '材料齐全，同意流转至复核环节', result: '通过' },
  { key: '2', step: '提交申请', operator: '张三', time: '2026-06-25 09:30', opinion: '提交服务商信息变更申请', result: '提交' },
];

const changeFields = [
  { label: '服务商编码', before: '1000020022', after: '1000020022' },
  { label: '服务商名称', before: '中海油能源发展股份有限公司', after: '中海油能源发展股份有限公司（变更后）' },
  { label: '统一社会信用代码', before: '91110105MA00XXXXXX', after: '91110105MA00YYYYYY' },
  { label: '法定代表人', before: '张三', after: '李四' },
  { label: '联系电话', before: '010-12345678', after: '010-87654321' },
];

const approvalColumns = [
  { key: 'step', title: '审批环节', dataIndex: 'step', width: 120 },
  { key: 'operator', title: '审批人', dataIndex: 'operator', width: 100 },
  { key: 'time', title: '审批时间', dataIndex: 'time', width: 180 },
  { key: 'opinion', title: '审批意见', dataIndex: 'opinion', ellipsis: true },
  { key: 'result', title: '审批结果', dataIndex: 'result', width: 100, render: (v: string) => <Text type={v === '通过' ? 'success' : 'secondary'}>{v}</Text> },
];

export default function ChangeDetail() {
  const { token: t } = theme.useToken();
  const [approveOpen, setApproveOpen] = useState(false);
  const [rejectOpen, setRejectOpen] = useState(false);

  return (
    <PortalLayout groups={adminGroups} activePath="/admin/info-change" portalType="admin">
      <Typography.Link onClick={() => window.history.back()} style={{ marginBottom: 8, display: 'block' }}>← 返回</Typography.Link>
      <Title level={4}>变更详情</Title>

      <Card size="small" variant="outlined" style={{ marginBottom: 16 }}>
        <Title level={5} style={{ marginBottom: 16 }}>变更信息</Title>
        <Descriptions column={2} bordered size="small">
          <Descriptions.Item label="变更类型">一般信息变更</Descriptions.Item>
          <Descriptions.Item label="变更原因">法定代表人变更</Descriptions.Item>
          <Descriptions.Item label="提交人">张三</Descriptions.Item>
          <Descriptions.Item label="提交时间">2026-06-25 09:30</Descriptions.Item>
          <Descriptions.Item label="当前状态">
            <Text type="warning">待复核</Text>
          </Descriptions.Item>
          <Descriptions.Item label="变更编号">CHG-20260625-001</Descriptions.Item>
        </Descriptions>
      </Card>

      <Card size="small" variant="outlined" style={{ marginBottom: 16 }}>
        <Title level={5} style={{ marginBottom: 16 }}>变更前后对比</Title>
        <Table
          columns={[
            { key: 'label', title: '字段', dataIndex: 'label', width: 160 },
            { key: 'before', title: '变更前', dataIndex: 'before', render: (v: string) => <Text type="secondary">{v}</Text> },
            { key: 'after', title: '变更后', dataIndex: 'after', render: (v: string) => <Text style={{ color: t.colorSuccess }}>{v}</Text> },
          ]}
          dataSource={changeFields}
          rowKey="label"
          pagination={false}
          bordered
          size="small"
        />
      </Card>

      <Card size="small" variant="outlined" style={{ marginBottom: 16 }}>
        <Title level={5} style={{ marginBottom: 16 }}>审批状态时间线</Title>
        <StatusTimeline items={timelineItems} />
      </Card>

      <Card size="small" variant="outlined" style={{ marginBottom: 16 }}>
        <Title level={5} style={{ marginBottom: 16 }}>审批记录</Title>
        <Table
          columns={approvalColumns}
          dataSource={approvalRecords}
          rowKey="key"
          pagination={false}
          bordered
          size="small"
        />
      </Card>

      <Space size={12}>
        <Button type="primary" onClick={() => setApproveOpen(true)}>复核通过</Button>
        <Button danger onClick={() => setRejectOpen(true)}>复核退回</Button>
      </Space>

      <Modal
        title="确认复核通过"
        open={approveOpen}
        onOk={() => { message.success('复核通过'); setApproveOpen(false); }}
        onCancel={() => setApproveOpen(false)}
        okText="确认"
        cancelText="取消"
      >
        确认该变更申请复核通过？
      </Modal>
      <Modal
        title="确认复核退回"
        open={rejectOpen}
        onOk={() => { message.success('已退回'); setRejectOpen(false); }}
        onCancel={() => setRejectOpen(false)}
        okText="确认退回"
        cancelText="取消"
        okButtonProps={{ danger: true }}
      >
        确认将该变更申请退回？
      </Modal>
    </PortalLayout>
  );
}
