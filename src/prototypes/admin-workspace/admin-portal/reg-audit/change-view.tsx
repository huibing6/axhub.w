/**
 * @name 注册服务商变更查看
 */
import { useState } from 'react';
import { theme, Typography, Card, Space, Input, Button, Table, Tag, Modal, message } from 'antd';
import PortalLayout from '../../common/portal-layout';
import { adminGroups } from '../../common/menu-data';
import { useFilterData } from '../../common/hooks';

const rawData = [
  { idx: 1, catCode: 'S1000010', catName: '租赁服务', spCode: '100000010', spName: '中海油能源发展股份有限公司', mgmtType: '所属企业管理', flowStatus: '待提交', tag: '注册服务商', time: '2025-12-19 09:15', submitter: '张三' },
  { idx: 2, catCode: 'S1000011', catName: '租赁服务', spCode: '100000010', spName: '杰瑞石油装备技术有限公司', mgmtType: '总部管理', flowStatus: '待复核', tag: '正式服务商', time: '2025-12-17 15:03', submitter: '李四' },
  { idx: 3, catCode: 'S1000010', catName: '租赁服务', spCode: '', spName: '中海油能源发展股份有限公司', mgmtType: '所属企业管理', flowStatus: '已拒绝', tag: '', time: '2025-12-19 09:15', submitter: '张三' },
  { idx: 4, catCode: 'S1000010', catName: '租赁服务', spCode: '', spName: '杰瑞石油装备技术有限公司', mgmtType: '总部管理', flowStatus: '已完成', tag: '', time: '2025-12-17 15:03', submitter: '李四' },
  { idx: 5, catCode: 'S1000010', catName: '租赁服务', spCode: '', spName: '中海油能源发展股份有限公司', mgmtType: '', flowStatus: '', tag: '', time: '2025-12-19 09:15', submitter: '张三' },
  { idx: 6, catCode: 'S1000010', catName: '租赁服务', spCode: '', spName: '杰瑞石油装备技术有限公司', mgmtType: '', flowStatus: '', tag: '', time: '2025-12-17 15:03', submitter: '李四' },
];

const filterFields = [
  { key: 'spName', label: '服务商名称' },
  { key: 'mgmtType', label: '服务商管理类型' },
  { key: 'flowStatus', label: '流程状态' },
  { key: 'submitter', label: '提交人' },
];

const statusColors: Record<string, string> = {
  '待提交': 'default',
  '待复核': 'processing',
  '已完成': 'success',
  '已拒绝': 'error',
};

const progressData = [
  { step: '第1步', unit: '服务商', status: '已提交', handler: '张明远', submitTime: '2025-12-19 09:15', finishTime: '2025-12-19 09:15', approved: '—', opinion: '—' },
  { step: '第2步', unit: '管理单位', status: '待复核', handler: '王建国', submitTime: '—', finishTime: '—', approved: '—', opinion: '—' },
];

const progressColumns = [
  { key: 'step', title: '步骤', width: 80, dataIndex: 'step' },
  { key: 'unit', title: '受理单位', width: 100, dataIndex: 'unit', render: (v: string) => <Typography.Link style={{ color: '#1677ff' }}>{v}</Typography.Link> },
  { key: 'status', title: '状态', width: 90, dataIndex: 'status' },
  { key: 'handler', title: '受理人', width: 90, dataIndex: 'handler' },
  { key: 'submitTime', title: '受理时间', width: 150, dataIndex: 'submitTime' },
  { key: 'finishTime', title: '完成时间', width: 150, dataIndex: 'finishTime' },
  { key: 'approved', title: '审批是否通过', width: 120, dataIndex: 'approved' },
  { key: 'opinion', title: '处理意见', width: 120, dataIndex: 'opinion' },
];

export default function ChangeViewPage() {
  const { token: t } = theme.useToken();
  const [nameFilter, setNameFilter] = useState('');
  const [mgmtTypeFilter, setMgmtTypeFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [submitterFilter, setSubmitterFilter] = useState('');
  const { setFilter, filteredData, clearFilters } = useFilterData(rawData, filterFields);
  const [progressModalOpen, setProgressModalOpen] = useState(false);

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

  const columns = [
    { key: 'idx', title: '序号', width: 50, align: 'center' as const, dataIndex: 'idx' },
    { key: 'catCode', title: '服务品类码', width: 100, dataIndex: 'catCode', ellipsis: true },
    { key: 'catName', title: '服务品类名称', width: 100, dataIndex: 'catName', ellipsis: true },
    { key: 'spCode', title: '服务商编码', width: 100, dataIndex: 'spCode', ellipsis: true },
    { key: 'spName', title: '服务商名称', dataIndex: 'spName', ellipsis: true },
    { key: 'mgmtType', title: '管理类型', width: 100, dataIndex: 'mgmtType' },
    {
      key: 'flowStatus', title: '流程状态', width: 80, align: 'center' as const, dataIndex: 'flowStatus',
      render: (val: string) => val ? <Tag color={statusColors[val] || 'default'}>{val}</Tag> : '—',
    },
    {
      key: 'tag', title: '服务商标签', width: 100, dataIndex: 'tag',
      render: (val: string) => val ? <Tag color={val === '注册服务商' ? 'blue' : 'green'}>{val}</Tag> : '—',
    },
    { key: 'time', title: '提交时间', width: 140, dataIndex: 'time' },
    { key: 'submitter', title: '提交人', width: 70, dataIndex: 'submitter' },
    {
      key: 'action',
      title: '操作',
      width: 120,
      align: 'center' as const,
      render: (_: unknown, record: any) => (
        <Space size={4}>
          <Typography.Link style={{ fontSize: 13, color: '#1677ff' }} onClick={(e) => { e.stopPropagation(); handleView(); }}>查看</Typography.Link>
          <Typography.Text type="secondary">、</Typography.Text>
          <Typography.Link style={{ fontSize: 13, color: '#1677ff' }} onClick={(e) => { e.stopPropagation(); setProgressModalOpen(true); }}>进度查询</Typography.Link>
        </Space>
      ),
    },
  ];

  return (
    <PortalLayout groups={adminGroups} activePath="/admin/reg-change-view" portalType="admin">
      <Typography.Title level={4} style={{ marginTop: 0, marginBottom: 16 }}>注册服务商变更查看</Typography.Title>

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
        scroll={{ x: 'max-content' }}
      />

      <Modal
        open={progressModalOpen}
        title="进度流程查询信息框"
        onCancel={() => setProgressModalOpen(false)}
        footer={null}
        width={900}
        destroyOnClose
      >
        <Table
          columns={progressColumns}
          dataSource={progressData}
          rowKey="step"
          pagination={false}
          bordered
          size="middle"
          style={{ marginBottom: 16 }}
        />
        <div style={{ textAlign: 'right' }}>
          <Button type="primary" danger onClick={() => setProgressModalOpen(false)}>关闭</Button>
        </div>
      </Modal>
    </PortalLayout>
  );
}
