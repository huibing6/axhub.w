/**
 * @name 流程查询详情（只读）
 */
import React from 'react';
import { useState } from 'react';
import { Typography, Card, Space, Button, Table, Tabs, Tag, Input } from 'antd';

const flowDetail = {
  spCode: '1000020022',
  spName: '中海油能源发展股份有限公司',
  creditCode: '91420000706802345X',
  mgmtType: '所属企业管理',
  unit: '长庆油田',
  spStatus: '正常',
  flow: '注册流程',
  flowStatus: '审批中',
  submitter: '张三',
  submitTime: '2025-12-19 09:15',
  flowUnit: '中油物采',
};

const flowSteps = [
  { step: '第1步', unit: '服务商', status: '已提交', handler: '张三', submitTime: '2025-12-19 09:15', finishTime: '2025-12-19 09:15', approved: '—', opinion: '—' },
  { step: '第2步', unit: '中油物采', status: '已通过', handler: '王芳', submitTime: '2025-12-20 10:00', finishTime: '2025-12-20 10:30', approved: '通过', opinion: '审核通过' },
  { step: '第3步', unit: '专业部门', status: '审批中', handler: '李强', submitTime: '2025-12-21 09:00', finishTime: '—', approved: '—', opinion: '—' },
];

const statusColors: Record<string, string> = {
  '已提交': 'default', '已通过': 'success', '审批中': 'processing', '已拒绝': 'error',
  '正常': 'success', '暂停': 'warning', '取消': 'default',
};

const SectionTitle = ({ title }: { title: string }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12, paddingBottom: 8, borderBottom: '1px solid #f0f0f0' }}>
    <span style={{ fontSize: 14, fontWeight: 600, color: 'rgba(0,0,0,0.88)' }}>{title}</span>
  </div>
);

const FormField = ({ label, children, span }: { label: string; children: React.ReactNode; span?: number }) => (
  <div style={{ gridColumn: span ? `span ${span}` : undefined }}>
    <div style={{ marginBottom: 4 }}><Typography.Text style={{ fontSize: 13 }}>{label}</Typography.Text></div>
    {children}
  </div>
);

const ReadonlyInput = ({ value }: { value: string }) => <Input value={value} disabled />;

export default function SpQueryProcessDetail() {
  const [activeTab, setActiveTab] = useState('info');

  const tabItems = [
    {
      key: 'info',
      label: '基本信息',
      children: (
        <Space direction="vertical" style={{ width: '100%' }} size={20}>
          <div>
            <SectionTitle title="服务商信息" />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px 24px' }}>
              <FormField label="服务商编码"><ReadonlyInput value={flowDetail.spCode} /></FormField>
              <FormField label="服务商名称"><ReadonlyInput value={flowDetail.spName} /></FormField>
              <FormField label="统一社会信用代码"><ReadonlyInput value={flowDetail.creditCode} /></FormField>
              <FormField label="使用单位"><ReadonlyInput value={flowDetail.unit} /></FormField>
              <FormField label="服务商状态"><ReadonlyInput value={flowDetail.spStatus} /></FormField>
            </div>
          </div>
          <div>
            <SectionTitle title="流程信息" />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px 24px' }}>
              <FormField label="流程类型"><ReadonlyInput value={flowDetail.flow} /></FormField>
              <FormField label="流程状态"><ReadonlyInput value={flowDetail.flowStatus} /></FormField>
              <FormField label="提交人"><ReadonlyInput value={flowDetail.submitter} /></FormField>
              <FormField label="提交时间"><ReadonlyInput value={flowDetail.submitTime} /></FormField>
              <FormField label="流程发起单位"><ReadonlyInput value={flowDetail.flowUnit} /></FormField>
            </div>
          </div>
        </Space>
      ),
    },
    {
      key: 'steps',
      label: '审批记录',
      children: (
        <Table
          columns={[
            { key: 'step', title: '步骤', width: 80, dataIndex: 'step' },
            { key: 'unit', title: '受理单位', width: 120, dataIndex: 'unit' },
            { key: 'status', title: '状态', width: 90, align: 'center' as const, dataIndex: 'status', render: (val: string) => <Tag color={statusColors[val]}>{val}</Tag> },
            { key: 'handler', title: '受理人', width: 90, dataIndex: 'handler' },
            { key: 'submitTime', title: '受理时间', width: 160, dataIndex: 'submitTime' },
            { key: 'finishTime', title: '完成时间', width: 160, dataIndex: 'finishTime' },
            { key: 'approved', title: '审批是否通过', width: 110, align: 'center' as const, dataIndex: 'approved' },
            { key: 'opinion', title: '处理意见', dataIndex: 'opinion', ellipsis: true },
          ]}
          dataSource={flowSteps.map((s, i) => ({ ...s, _key: i }))}
          rowKey="_key"
          bordered
          size="middle"
          pagination={false}
        />
      ),
    },
  ];

  return (
    <div>
      <Card size="small" variant="outlined" style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Space direction="vertical" size={4}>
            <Typography.Link onClick={() => window.location.hash = '#/admin/sp-query-process'} style={{ color: '#ff4d4f', fontSize: 13, display: 'block', marginBottom: 4 }}>← 返回列表</Typography.Link>
            <Space size={16} align="center">
              <Typography.Text type="secondary" style={{ fontSize: 12 }}>流程查询</Typography.Text>
              <Typography.Text type="secondary" style={{ fontSize: 12 }}>&gt;</Typography.Text>
              <Typography.Text type="secondary" style={{ fontSize: 12 }}>流程详情</Typography.Text>
            </Space>
            <Typography.Title level={4} style={{ margin: '4px 0 0 0' }}>{flowDetail.spName}</Typography.Title>
            <Space size={16} style={{ marginTop: 4 }}>
              <Typography.Text type="secondary" style={{ fontSize: 12 }}>统一社会信用代码 {flowDetail.creditCode}</Typography.Text>
              <Typography.Text type="secondary" style={{ fontSize: 12 }}>流程: {flowDetail.flow}</Typography.Text>
              <Typography.Text type="secondary" style={{ fontSize: 12 }}>提交时间: {flowDetail.submitTime}</Typography.Text>
            </Space>
          </Space>
          <Tag color="processing" style={{ fontSize: 13, padding: '4px 12px' }}>{flowDetail.flowStatus}</Tag>
        </div>
      </Card>
      <Card size="small" variant="outlined">
        <Tabs activeKey={activeTab} onChange={setActiveTab} items={tabItems} />
      </Card>
    </div>
  );
}
