/**
 * @name 注册信息查询
 * 服务商管理工作台2.0 - 注册信息查询（历史单据）
 * 以申请单维度查看所有提交记录与审批记录（服务商提交→中油物采→各专业部门并行审核）。
 */
import { useState } from 'react';
import { Typography, Card, Space, Input, Button, Table, Tag, Select } from 'antd';
import ProgressQueryModal from '@/components/progress-query-modal';

interface ApprovalStep {
  step: string;
  unit: string;
  status: string;
  handler: string;
  submitTime: string;
  finishTime: string;
  approved: string;
  opinion: string;
}

interface RegRecord {
  no: string;
  name: string;
  creditCode: string;
  submitter: string;
  submitTime: string;
  categories: { code: string; name: string }[];
  depts: string[];
  status: '审核中' | '注册成功' | '已生效' | '已驳回';
  steps: ApprovalStep[];
}

const rawData: RegRecord[] = [
  {
    no: 'ZB-2026-001',
    name: '中海油能源发展股份有限公司',
    creditCode: '91440300MA5F1234AB',
    submitter: '张明远',
    submitTime: '2026-06-10 14:30',
    categories: [
      { code: 'S0101000', name: '咨询服务' },
      { code: 'S0201000', name: '物化探服务' },
    ],
    depts: ['咨询资质审核部', '物化探技术审核部'],
    status: '注册成功',
    steps: [
      { step: '第1步', unit: '服务商', status: '已提交', handler: '张明远', submitTime: '2026-06-10 14:30', finishTime: '2026-06-10 14:30', approved: '—', opinion: '—' },
      { step: '第2步', unit: '中油物采', status: '已通过', handler: '王芳', submitTime: '2026-06-11 09:00', finishTime: '2026-06-11 09:00', approved: '通过', opinion: '基础信息符合要求，转专业部门审核' },
      { step: '第3步', unit: '咨询资质审核部', status: '已通过', handler: '赵强', submitTime: '2026-06-11 09:05', finishTime: '2026-06-12 10:20', approved: '通过', opinion: '资质证书齐全有效，审核通过' },
      { step: '第3步', unit: '物化探技术审核部', status: '审核中', handler: '孙丽', submitTime: '2026-06-11 09:05', finishTime: '—', approved: '—', opinion: '审核中' },
    ],
  },
  {
    no: 'ZB-2026-002',
    name: '杰瑞石油装备技术有限公司',
    creditCode: '913706005971234523',
    submitter: '李四',
    submitTime: '2026-06-12 10:15',
    categories: [
      { code: 'S0301000', name: '工序外协加工服务' },
      { code: 'S0501000', name: '科技项目服务' },
    ],
    depts: ['装备制造审核部', '科技服务审核部'],
    status: '审核中',
    steps: [
      { step: '第1步', unit: '服务商', status: '已提交', handler: '李四', submitTime: '2026-06-12 10:15', finishTime: '2026-06-12 10:15', approved: '—', opinion: '—' },
      { step: '第2步', unit: '中油物采', status: '已通过', handler: '陈静', submitTime: '2026-06-13 09:20', finishTime: '2026-06-13 09:20', approved: '通过', opinion: '基础信息符合要求，转专业部门审核' },
      { step: '第3步', unit: '装备制造审核部', status: '审核中', handler: '周敏', submitTime: '2026-06-13 09:25', finishTime: '—', approved: '—', opinion: '审核中' },
      { step: '第3步', unit: '科技服务审核部', status: '待审核', handler: '—', submitTime: '—', finishTime: '—', approved: '—', opinion: '—' },
    ],
  },
  {
    no: 'ZB-2026-003',
    name: '大庆油田工程建设有限公司',
    creditCode: '912306001234567890',
    submitter: '郑华',
    submitTime: '2026-06-05 08:45',
    categories: [
      { code: 'S0102000', name: '勘查服务' },
      { code: 'S0501000', name: '科技项目服务' },
    ],
    depts: ['勘查资质审核部', '科技服务审核部'],
    status: '已生效',
    steps: [
      { step: '第1步', unit: '服务商', status: '已提交', handler: '郑华', submitTime: '2026-06-05 08:45', finishTime: '2026-06-05 08:45', approved: '—', opinion: '—' },
      { step: '第2步', unit: '中油物采', status: '已通过', handler: '王芳', submitTime: '2026-06-06 10:30', finishTime: '2026-06-06 10:30', approved: '通过', opinion: '审核通过，同意注册' },
      { step: '第3步', unit: '勘查资质审核部', status: '已通过', handler: '郑华', submitTime: '2026-06-06 10:35', finishTime: '2026-06-07 09:00', approved: '通过', opinion: '勘查资质有效，通过' },
      { step: '第3步', unit: '科技服务审核部', status: '已通过', handler: '吴磊', submitTime: '2026-06-06 10:35', finishTime: '2026-06-07 16:40', approved: '通过', opinion: '研发能力符合要求，通过' },
      { step: '第4步', unit: '使用单位', status: '已配码', handler: '系统', submitTime: '2026-06-08 09:00', finishTime: '2026-06-08 09:00', approved: '通过', opinion: 'MDG 配码完成，正式生效' },
    ],
  },
  {
    no: 'ZB-2026-004',
    name: '胜利油田装备制造有限公司',
    creditCode: '913705001234567801',
    submitter: '钱斌',
    submitTime: '2026-05-28 09:00',
    categories: [
      { code: 'S0101000', name: '咨询服务' },
      { code: 'S0201000', name: '物化探服务' },
    ],
    depts: ['咨询资质审核部', '物化探技术审核部'],
    status: '已驳回',
    steps: [
      { step: '第1步', unit: '服务商', status: '已提交', handler: '钱斌', submitTime: '2026-05-28 09:00', finishTime: '2026-05-28 09:00', approved: '—', opinion: '—' },
      { step: '第2步', unit: '中油物采', status: '已通过', handler: '陈静', submitTime: '2026-05-29 11:00', finishTime: '2026-05-29 11:00', approved: '通过', opinion: '基础信息符合要求，转专业部门审核' },
      { step: '第3步', unit: '咨询资质审核部', status: '已驳回', handler: '赵强', submitTime: '2026-05-29 11:05', finishTime: '2026-05-30 16:10', approved: '驳回', opinion: '咨询服务资质证书已过期，请补充后重新提交' },
      { step: '第3步', unit: '物化探技术审核部', status: '已驳回', handler: '孙丽', submitTime: '2026-05-29 11:05', finishTime: '2026-05-31 10:20', approved: '驳回', opinion: '缺少安全生产许可证，请补充后重新提交' },
    ],
  },
  {
    no: 'ZB-2026-005',
    name: '中原油田工程建设有限公司',
    creditCode: '914109001234567812',
    submitter: '马骏',
    submitTime: '2026-06-02 09:00',
    categories: [],
    depts: [],
    status: '已生效',
    steps: [
      { step: '第1步', unit: '服务商', status: '已提交', handler: '马骏', submitTime: '2026-06-02 09:00', finishTime: '2026-06-02 09:00', approved: '—', opinion: '—' },
      { step: '第2步', unit: '中油物采', status: '已通过', handler: '王芳', submitTime: '2026-06-03 10:30', finishTime: '2026-06-03 10:30', approved: '通过', opinion: '仅通用品类，审核通过，同意注册' },
      { step: '第3步', unit: '使用单位', status: '已配码', handler: '系统', submitTime: '2026-06-04 09:00', finishTime: '2026-06-04 09:00', approved: '通过', opinion: 'MDG 配码完成，正式生效' },
    ],
  },
];

const statusColor: Record<string, string> = {
  '审核中': 'processing',
  '注册成功': 'blue',
  '已生效': 'success',
  '已驳回': 'error',
};

const allCategories = ['咨询服务', '物化探服务', '工序外协加工服务', '科技项目服务', '勘查服务'];
const allStatus = ['审核中', '注册成功', '已生效', '已驳回'];

export default function RegQuery() {
  const [noFilter, setNoFilter] = useState('');
  const [nameFilter, setNameFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [progressOpen, setProgressOpen] = useState(false);
  const [progressData, setProgressData] = useState<any[]>([]);

  const filteredData = rawData.filter(d => {
    if (noFilter && !d.no.includes(noFilter)) return false;
    if (nameFilter && !d.name.includes(nameFilter)) return false;
    if (categoryFilter && !d.categories.some(c => c.name === categoryFilter)) return false;
    if (statusFilter && d.status !== statusFilter) return false;
    return true;
  });

  const handleReset = () => {
    setNoFilter('');
    setNameFilter('');
    setCategoryFilter('');
    setStatusFilter('');
  };

  const columns = [
    { key: 'no', title: '申请编号', width: 130, dataIndex: 'no' },
    { key: 'name', title: '服务商名称', width: 220, dataIndex: 'name', ellipsis: true },
    { key: 'creditCode', title: '统一社会信用代码', width: 200, dataIndex: 'creditCode', ellipsis: true },
    {
      key: 'categories', title: '专业品类', width: 260,
      render: (_: unknown, record: RegRecord) => record.categories.length > 0
        ? record.categories.map(c => <Tag key={c.code} color="blue" style={{ marginBottom: 4 }}>{c.name}</Tag>)
        : <Tag>仅通用品类</Tag>,
    },
    {
      key: 'status', title: '状态', width: 100, align: 'center' as const, dataIndex: 'status',
      render: (v: string) => <Tag color={statusColor[v] || 'default'}>{v}</Tag>,
    },
    {
      key: 'action',
      title: '操作',
      width: 160,
      align: 'center' as const,
      render: (_: unknown, record: RegRecord) => (
        <Space size={4}>
          <Typography.Link style={{ fontSize: 13, color: '#ff4d4f' }} onClick={() => { window.location.hash = `#/admin/reg-detail?no=${record.no}`; }}>
            查看单据
          </Typography.Link>
          <Typography.Text type="secondary">|</Typography.Text>
          <Typography.Link style={{ fontSize: 13, color: '#ff4d4f' }} onClick={() => { setProgressData(record.steps); setProgressOpen(true); }}>
            进度查询
          </Typography.Link>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Typography.Title level={4} style={{ marginTop: 0, marginBottom: 4 }}>注册信息查询</Typography.Title>
      <Typography.Text type="secondary" style={{ display: 'block', marginBottom: 16 }}>
        查看服务商注册申请的历史单据，包含所有提交记录与审批记录（服务商提交→中油物采→各专业部门并行审核）。
      </Typography.Text>

      <Card size="small" variant="outlined" style={{ marginBottom: 16 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr) auto', gap: 12, alignItems: 'end' }}>
          <div>
            <Typography.Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 4 }}>申请编号</Typography.Text>
            <Input placeholder="请输入申请编号" value={noFilter} onChange={e => setNoFilter(e.target.value)} />
          </div>
          <div>
            <Typography.Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 4 }}>服务商名称</Typography.Text>
            <Input placeholder="请输入服务商名称" value={nameFilter} onChange={e => setNameFilter(e.target.value)} />
          </div>
          <div>
            <Typography.Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 4 }}>专业品类</Typography.Text>
            <Select
              value={categoryFilter}
              onChange={setCategoryFilter}
              style={{ width: '100%' }}
              allowClear
              placeholder="全部品类"
              options={allCategories.map(v => ({ label: v, value: v }))}
            />
          </div>
          <Space>
            <Button type="primary" danger>查询</Button>
            <Button onClick={handleReset}>重置</Button>
          </Space>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr) auto', gap: 12, alignItems: 'end', marginTop: 12 }}>
          <div>
            <Typography.Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 4 }}>状态</Typography.Text>
            <Select
              value={statusFilter}
              onChange={setStatusFilter}
              style={{ width: '100%' }}
              allowClear
              placeholder="全部状态"
              options={allStatus.map(v => ({ label: v, value: v }))}
            />
          </div>
        </div>
      </Card>

      <Table
        columns={columns}
        dataSource={filteredData.map((d, i) => ({ ...d, _key: i }))}
        rowKey="_key"
        pagination={false}
        bordered
        size="middle"
        scroll={{ x: 'max-content' }}
      />

      <ProgressQueryModal
        open={progressOpen}
        title="进度流程查询"
        data={progressData}
        onClose={() => setProgressOpen(false)}
      />
    </>
  );
}
