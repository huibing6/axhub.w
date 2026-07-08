/**
 * @name 现场考察审核
 */
import { useState } from 'react';
import { theme, Typography, Card, Space, Input, Button, Table, Select, Tabs } from 'antd';
import PortalLayout from '../../common/portal-layout';
import { adminGroups } from '../../common/menu-data';
import { useFilterData } from '../../common/hooks';

const rawData = [
  { idx: 1, planCode: '12343', planName: '市政绿化服务考察', inspType: '实地考察', status: '待审批', creator: '三阿', createTime: '2026-06-24' },
  { idx: 2, planCode: '12343', planName: '租赁服务实地考察', inspType: '视频考察', status: '待审批', creator: '三阿', createTime: '2026-06-24' },
  { idx: 3, planCode: '12343', planName: '市政绿化服务考察', inspType: '实地考察', status: '待审批', creator: '三阿', createTime: '2026-06-24' },
  { idx: 4, planCode: '12343', planName: '租赁服务实地考察', inspType: '视频考察', status: '待审批', creator: '三阿', createTime: '2026-06-24' },
  { idx: 5, planCode: '12343', planName: '市政绿化服务考察', inspType: '实地考察', status: '', creator: '', createTime: '2026-06-24' },
  { idx: 6, planCode: '12343', planName: '租赁服务实地考察', inspType: '视频考察', status: '', creator: '', createTime: '' },
];

const typeOptions = [
  { value: '实地考察', label: '实地考察' },
  { value: '视频考察', label: '视频考察' },
];

const statusOptions = [
  { value: '待审批', label: '待审批' },
  { value: '审批通过', label: '审批通过' },
  { value: '审批拒绝', label: '审批拒绝' },
];

export default function InspectionAuditPage() {
  const { token: t } = theme.useToken();
  const [activeTab, setActiveTab] = useState('pending');
  const [codeFilter, setCodeFilter] = useState('');
  const [nameFilter, setNameFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const { setFilter, filteredData, clearFilters } = useFilterData(rawData, [
    { key: 'planCode', label: '考察方案编号' },
    { key: 'planName', label: '考察方案名称' },
    { key: 'inspType', label: '考察类型' },
    { key: 'tabStatus', label: '状态' },
  ]);

  const handleSearch = () => {
    const tabStatusMap: Record<string, string> = { pending: '待审批', approved: '审批通过', rejected: '审批拒绝' };
    setFilter('planCode', codeFilter);
    setFilter('planName', nameFilter);
    setFilter('inspType', typeFilter);
    setFilter('tabStatus', tabStatusMap[activeTab] || '');
  };

  const handleReset = () => {
    setCodeFilter('');
    setNameFilter('');
    setTypeFilter('');
    setStatusFilter('');
    clearFilters();
  };

  const columns = [
    { key: 'idx', title: '序号', width: 50, align: 'center' as const, dataIndex: 'idx' },
    { key: 'planCode', title: '考察方案编号', width: 120, dataIndex: 'planCode', ellipsis: true },
    { key: 'planName', title: '考察方案名称', width: 200, dataIndex: 'planName', ellipsis: true },
    { key: 'inspType', title: '考察类型', width: 100, dataIndex: 'inspType', ellipsis: true },
    { key: 'status', title: '状态', width: 90, dataIndex: 'status', ellipsis: true },
    { key: 'creator', title: '创建人', width: 80, dataIndex: 'creator', ellipsis: true },
    { key: 'createTime', title: '创建时间', width: 110, dataIndex: 'createTime' },
    {
      key: 'action', title: '操作', width: 100, align: 'center' as const,
      render: () => (
        <Space size={2}>
          <Typography.Link style={{ fontSize: 13, color: '#1677ff' }}>查看</Typography.Link>
          <Typography.Text type="secondary">、</Typography.Text>
          <Typography.Link style={{ fontSize: 13, color: '#1677ff' }}>审批</Typography.Link>
        </Space>
      ),
    },
  ];

  const tabItems = [
    { key: 'pending', label: '待审批' },
    { key: 'approved', label: '审批通过' },
    { key: 'rejected', label: '审批拒绝' },
  ];

  return (
    <PortalLayout groups={adminGroups} activePath="/admin/inspection-audit" portalType="admin">
      <Typography.Title level={4} style={{ margin: '0 0 16px' }}>现场考察审核</Typography.Title>
      <Tabs activeKey={activeTab} onChange={setActiveTab} items={tabItems} />
      <Card size="small" variant="outlined" style={{ marginBottom: 16 }}>
        <Space direction="vertical" style={{ width: '100%' }} size={12}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr) auto', gap: 12, alignItems: 'end' }}>
            <div>
              <Typography.Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 4 }}>考察方案编号</Typography.Text>
              <Input placeholder="请输入考察方案编号" value={codeFilter} onChange={e => setCodeFilter(e.target.value)} />
            </div>
            <div>
              <Typography.Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 4 }}>考察方案名称</Typography.Text>
              <Input placeholder="请输入考察方案名称" value={nameFilter} onChange={e => setNameFilter(e.target.value)} />
            </div>
            <div />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr) auto', gap: 12, alignItems: 'end' }}>
            <div>
              <Typography.Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 4 }}>考察类型</Typography.Text>
              <Select placeholder="请选择" style={{ width: '100%' }} allowClear value={typeFilter || undefined} onChange={val => setTypeFilter(val || '')} options={typeOptions} />
            </div>
            <div>
              <Typography.Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 4 }}>状态</Typography.Text>
              <Select placeholder="请选择" style={{ width: '100%' }} allowClear value={statusFilter || undefined} onChange={val => setStatusFilter(val || '')} options={statusOptions} />
            </div>
            <Space>
              <Button type="primary" danger onClick={handleSearch}>查询</Button>
              <Button onClick={handleReset}>重置</Button>
            </Space>
          </div>
        </Space>
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
    </PortalLayout>
  );
}
