/**
 * @name 注册服务商变更审核
 */
import { useState } from 'react';
import { theme, Typography, Card, Space, Input, Button, Table, Tag, message } from 'antd';
import PortalLayout from '../../common/portal-layout';
import { adminGroups } from '../../common/menu-data';
import { useFilterData } from '../../common/hooks';

const rawData = [
  { idx: 1, catCode: 'S1000010', catName: '租赁服务', spCode: '100000010', spName: '中海油能源发展股份有限公司', changeType: '一般信息变更', flowStatus: '待复核', tag: '注册服务商', time: '2025-12-19 09:15', submitter: '张三' },
  { idx: 2, catCode: 'S1000011', catName: '租赁服务', spCode: '100000010', spName: '杰瑞石油装备技术有限公司', changeType: '资质变更', flowStatus: '待复核', tag: '正式服务商', time: '2025-12-17 15:03', submitter: '李四' },
  { idx: 3, catCode: 'S1000010', catName: '租赁服务', spCode: '', spName: '中海油能源发展股份有限公司', changeType: '资质变更', flowStatus: '待复核', tag: '', time: '2025-12-19 09:15', submitter: '张三' },
  { idx: 4, catCode: 'S1000010', catName: '租赁服务', spCode: '', spName: '杰瑞石油装备技术有限公司', changeType: '资质变更', flowStatus: '待复核', tag: '', time: '2025-12-17 15:03', submitter: '李四' },
  { idx: 5, catCode: 'S1000010', catName: '租赁服务', spCode: '', spName: '中海油能源发展股份有限公司', changeType: '', flowStatus: '', tag: '', time: '2025-12-19 09:15', submitter: '张三' },
  { idx: 6, catCode: 'S1000010', catName: '租赁服务', spCode: '', spName: '杰瑞石油装备技术有限公司', changeType: '', flowStatus: '', tag: '', time: '2025-12-17 15:03', submitter: '李四' },
];

const filterFields = [
  { key: 'spName', label: '服务商名称' },
  { key: 'mgmtType', label: '服务商管理类型' },
  { key: 'flowStatus', label: '流程状态' },
  { key: 'submitter', label: '提交人' },
];

export default function ChangeReviewPage() {
  const { token: t } = theme.useToken();
  const [nameFilter, setNameFilter] = useState('');
  const [mgmtTypeFilter, setMgmtTypeFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [submitterFilter, setSubmitterFilter] = useState('');
  const { setFilter, filteredData, clearFilters } = useFilterData(rawData, filterFields);

  const handleSearch = () => {
    setFilter('spName', nameFilter);
    setFilter('mgmtType', mgmtTypeFilter);
    setFilter('flowStatus', statusFilter);
    setFilter('submitter', submitterFilter);
  };

  const handleReset = () => {
    setNameFilter('');
    setMgmtTypeFilter('');
    setStatusFilter('');
    setSubmitterFilter('');
    clearFilters();
  };

  const handleView = () => {
    window.location.hash = '#/admin/reg-detail';
  };

  const handleReview = (_record: any) => {
    message.info('复核功能开发中');
  };

  const columns = [
    { key: 'idx', title: '序号', width: 60, align: 'center' as const, dataIndex: 'idx' },
    { key: 'catCode', title: '服务品类码', width: 120, dataIndex: 'catCode', ellipsis: true },
    { key: 'catName', title: '服务品类名称', width: 120, dataIndex: 'catName', ellipsis: true },
    { key: 'spCode', title: '服务商编码', width: 120, dataIndex: 'spCode', ellipsis: true },
    { key: 'spName', title: '服务商名称', dataIndex: 'spName', ellipsis: true },
    { key: 'changeType', title: '变更类型', width: 120, dataIndex: 'changeType' },
    {
      key: 'flowStatus', title: '流程状态', width: 100, align: 'center' as const, dataIndex: 'flowStatus',
      render: (val: string) => val ? <Tag color="processing">{val}</Tag> : '—',
    },
    {
      key: 'tag', title: '服务商标签', width: 120, dataIndex: 'tag',
      render: (val: string) => val ? <Tag color={val === '注册服务商' ? 'blue' : 'green'}>{val}</Tag> : '—',
    },
    { key: 'time', title: '提交时间', width: 160, dataIndex: 'time' },
    { key: 'submitter', title: '提交人', width: 80, dataIndex: 'submitter' },
    {
      key: 'action',
      title: '操作',
      width: 120,
      align: 'center' as const,
      render: (_: unknown, record: any) => (
        <Space size={4}>
          <Typography.Link style={{ fontSize: 13, color: '#1677ff' }} onClick={(e) => { e.stopPropagation(); handleView(); }}>查看</Typography.Link>
          <Typography.Text type="secondary">、</Typography.Text>
          <Typography.Link style={{ fontSize: 13, color: '#1677ff' }} onClick={(e) => { e.stopPropagation(); handleReview(record); }}>复核</Typography.Link>
        </Space>
      ),
    },
  ];

  return (
    <PortalLayout groups={adminGroups} activePath="/admin/reg-change-review" portalType="admin">
      <Typography.Title level={4} style={{ marginTop: 0, marginBottom: 16 }}>注册服务商变更审核</Typography.Title>

      <Card size="small" variant="outlined" style={{ marginBottom: 16 }}>
        <Space direction="vertical" style={{ width: '100%' }} size={12}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr) auto', gap: 12, alignItems: 'end' }}>
            <div>
              <Typography.Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 4 }}>服务商名称</Typography.Text>
              <Input placeholder="请输入服务商名称" value={nameFilter} onChange={e => setNameFilter(e.target.value)} />
            </div>
            <div>
              <Typography.Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 4 }}>服务商管理类型</Typography.Text>
              <Input placeholder="请输入服务商管理类型" value={mgmtTypeFilter} onChange={e => setMgmtTypeFilter(e.target.value)} />
            </div>
            <div>
              <Typography.Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 4 }}>流程状态</Typography.Text>
              <Input placeholder="请输入流程状态" value={statusFilter} onChange={e => setStatusFilter(e.target.value)} />
            </div>
            <Space>
              <Button type="primary" danger onClick={handleSearch}>查询</Button>
              <Button onClick={handleReset}>重置</Button>
            </Space>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr) auto', gap: 12, alignItems: 'end' }}>
            <div>
              <Typography.Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 4 }}>提交人</Typography.Text>
              <Input placeholder="请输入提交人" value={submitterFilter} onChange={e => setSubmitterFilter(e.target.value)} />
            </div>
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
      />
    </PortalLayout>
  );
}
