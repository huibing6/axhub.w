/**
 * @name 专业部门审核
 * 服务商管理工作台2.0 - 专业部门审核专业品类
 * 业务场景：服务商提交的注册信息若包含专业品类，则各专业品类并行分流至对应专业部门审核；
 * 各品类独立审核、互不排斥。点击查看/审核进入审核详情页面（admin/dept-detail）。
 */
import { useState } from 'react';
import { theme, Typography, Card, Space, Input, Button, Table, Tag, Select } from 'antd';
import ProgressQueryModal from '@/components/progress-query-modal';
import { deptTaskData, deptOptions, statusOptions, statusColor, type DeptTask } from '../common/dept-data';

export default function DeptReview() {
  const { token: t } = theme.useToken();
  const [data, setData] = useState<DeptTask[]>(deptTaskData);
  const [deptFilter, setDeptFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [searchFilter, setSearchFilter] = useState('');
  const [progressOpen, setProgressOpen] = useState(false);
  const [progressData, setProgressData] = useState<any[]>([]);

  const filteredData = data.filter(d => {
    if (deptFilter && d.deptName !== deptFilter) return false;
    if (statusFilter && d.status !== statusFilter) return false;
    if (searchFilter && !d.name.includes(searchFilter) && !d.no.includes(searchFilter) && !d.category.includes(searchFilter)) return false;
    return true;
  });

  const handleReset = () => {
    setDeptFilter('');
    setStatusFilter('');
    setSearchFilter('');
  };

  const goDetail = (record: DeptTask) => {
    window.location.hash = `#/admin/dept-detail?no=${record.no}`;
  };

  const handleProgress = (record: DeptTask) => {
    setProgressData(record.steps);
    setProgressOpen(true);
  };

  const columns = [
    { key: 'no', title: '申请编号', width: 130, dataIndex: 'no' },
    { key: 'name', title: '服务商名称', dataIndex: 'name', ellipsis: true },
    { key: 'category', title: '专业品类', width: 140, dataIndex: 'category' },
    { key: 'categoryCode', title: '品类编码', width: 110, align: 'center' as const, dataIndex: 'categoryCode' },
    { key: 'deptName', title: '审核部门', width: 140, dataIndex: 'deptName', render: (v: string) => <Tag color="blue">{v}</Tag> },
    { key: 'time', title: '提交时间', width: 160, dataIndex: 'time' },
    {
      key: 'status', title: '状态', width: 90, align: 'center' as const, dataIndex: 'status',
      render: (v: string) => <Tag color={statusColor[v] || 'default'}>{v}</Tag>,
    },
    {
      key: 'action',
      title: '操作',
      width: 200,
      align: 'center' as const,
      render: (_: unknown, record: DeptTask) => (
        <Space size={4}>
          <Typography.Link style={{ fontSize: 13, color: '#ff4d4f' }} onClick={() => goDetail(record)}>查看</Typography.Link>
          <Typography.Text type="secondary">|</Typography.Text>
          <Typography.Link style={{ fontSize: 13, color: '#ff4d4f' }} onClick={() => goDetail(record)}>审核</Typography.Link>
          <Typography.Text type="secondary">|</Typography.Text>
          <Typography.Link style={{ fontSize: 13, color: '#ff4d4f' }} onClick={() => handleProgress(record)}>进度查询</Typography.Link>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Typography.Title level={4} style={{ marginTop: 0, marginBottom: 4 }}>专业部门审核</Typography.Title>
      <Typography.Text type="secondary" style={{ display: 'block', marginBottom: 16 }}>
        服务商提交的注册信息若包含专业品类，各品类并行流转至对应专业部门审核（各品类独立审核、互不排斥）。点击「查看 / 审核」进入审核详情页面。
      </Typography.Text>

      <Card size="small" variant="outlined" style={{ marginBottom: 16 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr) auto', gap: 12, alignItems: 'end' }}>
          <div>
            <Typography.Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 4 }}>审核部门</Typography.Text>
            <Select
              value={deptFilter}
              onChange={setDeptFilter}
              style={{ width: '100%' }}
              allowClear
              placeholder="全部部门"
              options={deptOptions.map(v => ({ label: v, value: v }))}
            />
          </div>
          <div>
            <Typography.Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 4 }}>状态</Typography.Text>
            <Select
              value={statusFilter}
              onChange={setStatusFilter}
              style={{ width: '100%' }}
              allowClear
              placeholder="全部状态"
              options={statusOptions.map(v => ({ label: v, value: v }))}
            />
          </div>
          <div>
            <Typography.Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 4 }}>搜索</Typography.Text>
            <Input placeholder="服务商名称/申请编号/专业品类" value={searchFilter} onChange={e => setSearchFilter(e.target.value)} />
          </div>
          <Space>
            <Button type="primary" danger>查询</Button>
            <Button onClick={handleReset}>重置</Button>
          </Space>
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
