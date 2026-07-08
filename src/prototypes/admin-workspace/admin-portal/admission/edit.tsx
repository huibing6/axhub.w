/**
 * @name 信息编辑
 */
import { useState } from 'react';
import { theme, Typography, Card, Space, Input, Button, Table, Tag, message } from 'antd';
import PortalLayout from '../../common/portal-layout';
import { adminGroups } from '../../common/menu-data';
import { useFilterData } from '../../common/hooks';

const rawData = [
  { idx: 1, name: '中海油能源发展股份有限公司', type: '所属企业管理', status: '待提交', source: '公开招标采购中标', category: '新增准入供应商', time: '2025-12-19 09:15', submitter: '张三', editor: '张三', dataSource: '准入信息管理', workCode: '', workType: '' },
  { idx: 2, name: '杰瑞石油装备技术有限公司', type: '总部管理', status: '待提交', source: '其他采购形式', category: '新增服务产品', time: '2025-12-17 15:03', submitter: '李四', editor: '李四', dataSource: '自助服务管理', workCode: '', workType: '' },
  { idx: 3, name: '中海油能源发展股份有限公司', type: '所属企业管理', status: '已拒绝', source: '公开招标采购中标', category: '新增准入供应商', time: '2025-12-19 09:15', submitter: '张三', editor: '张三', dataSource: '准入信息管理', workCode: '', workType: '' },
  { idx: 4, name: '杰瑞石油装备技术有限公司', type: '总部管理', status: '已拒绝', source: '其他采购形式', category: '新增服务产品', time: '2025-12-17 15:03', submitter: '李四', editor: '李四', dataSource: '自助服务管理', workCode: '', workType: '' },
  { idx: 5, name: '中海油能源发展股份有限公司', type: '', status: '', source: '', category: '', time: '2025-12-19 09:15', submitter: '张三', editor: '张三', dataSource: '', workCode: '', workType: '' },
  { idx: 6, name: '杰瑞石油装备技术有限公司', type: '', status: '', source: '', category: '', time: '2025-12-17 15:03', submitter: '李四', editor: '李四', dataSource: '', workCode: '', workType: '' },
];

const statusColors: Record<string, string> = {
  '待提交': 'default',
  '已拒绝': 'error',
  '已提交': 'processing',
  '已完成': 'success',
};

export default function EditPage() {
  const { token: t } = theme.useToken();
  const [nameFilter, setNameFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [submitterFilter, setSubmitterFilter] = useState('');
  const { setFilter, filteredData, clearFilters } = useFilterData(rawData, [
    { key: 'name', label: '服务商名称' },
    { key: 'type', label: '服务商管理类型' },
    { key: 'status', label: '流程状态' },
    { key: 'submitter', label: '提交人' },
  ]);

  const handleSearch = () => {
    setFilter('name', nameFilter);
    setFilter('type', typeFilter);
    setFilter('status', statusFilter);
    setFilter('submitter', submitterFilter);
  };

  const handleReset = () => {
    setNameFilter('');
    setTypeFilter('');
    setStatusFilter('');
    setSubmitterFilter('');
    clearFilters();
  };

  const columns = [
    { key: 'idx', title: '序号', width: 50, align: 'center' as const, dataIndex: 'idx' },
    { key: 'name', title: '服务商名称', width: 180, dataIndex: 'name', ellipsis: true },
    { key: 'type', title: '服务商管理类型', width: 110, dataIndex: 'type', ellipsis: true },
    {
      key: 'status', title: '流程状态', width: 80, align: 'center' as const, dataIndex: 'status',
      render: (val: string) => val ? <Tag color={statusColors[val] || 'default'}>{val}</Tag> : '—',
    },
    { key: 'source', title: '准入来源', width: 140, dataIndex: 'source', ellipsis: true },
    { key: 'category', title: '准入类别', width: 120, dataIndex: 'category', ellipsis: true },
    { key: 'time', title: '提交时间', width: 130, dataIndex: 'time' },
    { key: 'submitter', title: '提交人', width: 70, dataIndex: 'submitter' },
    { key: 'editor', title: '编辑人', width: 70, dataIndex: 'editor' },
    { key: 'dataSource', title: '数据来源', width: 110, dataIndex: 'dataSource', ellipsis: true },
    { key: 'workCode', title: '工作单编码', width: 100, dataIndex: 'workCode', ellipsis: true },
    { key: 'workType', title: '工作单类型', width: 100, dataIndex: 'workType', ellipsis: true },
    {
      key: 'action',
      title: '操作',
      width: 140,
      align: 'center' as const,
      render: (_: unknown, record: any) => {
        const isReject = record.status === '已拒绝';
        return (
          <Space size={2} wrap>
            <Typography.Link style={{ fontSize: 13, color: '#1677ff' }} onClick={() => window.location.hash = '#/admin/info-edit-detail'}>查看</Typography.Link>
            <Typography.Text type="secondary">、</Typography.Text>
            <Typography.Link style={{ fontSize: 13, color: '#1677ff' }} onClick={() => window.location.hash = '#/admin/info-edit-form'}>编辑</Typography.Link>
            {isReject ? (
              <>
                <Typography.Text type="secondary">、</Typography.Text>
                <Typography.Link style={{ fontSize: 13, color: '#1677ff' }}>退回</Typography.Link>
              </>
            ) : (
              <>
                <Typography.Text type="secondary">、</Typography.Text>
                <Typography.Link style={{ fontSize: 13, color: '#1677ff' }}>删除</Typography.Link>
                <Typography.Text type="secondary">、</Typography.Text>
                <Typography.Link style={{ fontSize: 13, color: '#1677ff' }}>终止</Typography.Link>
              </>
            )}
          </Space>
        );
      },
    },
  ];

  return (
    <PortalLayout groups={adminGroups} activePath="/admin/info-edit" portalType="admin">
      <Card size="small" variant="outlined" style={{ marginBottom: 16 }}>
        <Space direction="vertical" style={{ width: '100%' }} size={8}>
          <Typography.Text style={{ color: t.colorPrimary }}>注册服务商审核</Typography.Text>
          <Typography.Title level={4} style={{ margin: 0 }}>服务商信息编辑</Typography.Title>
          <Card size="small" variant="outlined" style={{ marginBottom: 0 }}>
            <Space direction="vertical" style={{ width: '100%' }} size={12}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr) auto', gap: 12, alignItems: 'end' }}>
                <div>
                  <Typography.Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 4 }}>服务商名称</Typography.Text>
                  <Input placeholder="请输入服务商名称" value={nameFilter} onChange={e => setNameFilter(e.target.value)} />
                </div>
                <div>
                  <Typography.Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 4 }}>服务商管理类型</Typography.Text>
                  <Input placeholder="请输入服务商管理类型" value={typeFilter} onChange={e => setTypeFilter(e.target.value)} />
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
