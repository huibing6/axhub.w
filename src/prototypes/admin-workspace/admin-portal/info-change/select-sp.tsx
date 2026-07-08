/**
 * @name 选择服务商
 */
import { useState } from 'react';
import { theme, Typography, Card, Space, Input, Button, Table } from 'antd';
import PortalLayout from '../../common/portal-layout';
import { adminGroups } from '../../common/menu-data';
import { useFilterData } from '../../common/hooks';

const rawData = [
  { idx: 1, code: '10000100', name: '中海油能源发展股份有限公司', mgmtType: '所属企业管理', spStatus: '暂停', adminUnit: '长庆油田分公司' },
  { idx: 2, code: '10000100', name: '杰瑞石油装备技术有限公司', mgmtType: '总部管理', spStatus: '正常', adminUnit: '长庆油田分公司' },
  { idx: 3, code: '10000100', name: '中海油能源发展股份有限公司', mgmtType: '所属企业管理', spStatus: '取消', adminUnit: '长庆油田分公司' },
  { idx: 4, code: '10000100', name: '杰瑞石油装备技术有限公司', mgmtType: '总部管理', spStatus: '', adminUnit: '长庆油田分公司' },
  { idx: 5, code: '', name: '中海油能源发展股份有限公司', mgmtType: '', spStatus: '', adminUnit: '' },
  { idx: 6, code: '', name: '杰瑞石油装备技术有限公司', mgmtType: '', spStatus: '', adminUnit: '' },
];

export default function SelectSPPage() {
  const { token: t } = theme.useToken();
  const urlParams = new URLSearchParams(window.location.hash.split('?')[1] || '');
  const fromCategory = urlParams.get('from') === 'category';
  const [codeFilter, setCodeFilter] = useState('');
  const [nameFilter, setNameFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [unitFilter, setUnitFilter] = useState('');
  const { setFilter, filteredData, clearFilters } = useFilterData(rawData, [
    { key: 'code', label: '服务商编码' },
    { key: 'name', label: '服务商名称' },
    { key: 'spStatus', label: '供应商状态' },
    { key: 'adminUnit', label: '管理单位' },
  ]);

  const handleSearch = () => {
    setFilter('code', codeFilter);
    setFilter('name', nameFilter);
    setFilter('spStatus', statusFilter);
    setFilter('adminUnit', unitFilter);
  };

  const handleReset = () => {
    setCodeFilter('');
    setNameFilter('');
    setStatusFilter('');
    setUnitFilter('');
    clearFilters();
  };

  const columns = [
    { key: 'idx', title: '序号', width: 50, align: 'center' as const, dataIndex: 'idx' },
    { key: 'code', title: '服务商编码', width: 120, dataIndex: 'code', ellipsis: true },
    { key: 'name', title: '服务商名称', width: 220, dataIndex: 'name', ellipsis: true },
    { key: 'mgmtType', title: '服务商管理类型', width: 130, dataIndex: 'mgmtType', ellipsis: true },
    {
      key: 'spStatus', title: '服务商状态', width: 100, align: 'center' as const, dataIndex: 'spStatus',
      render: (val: string) => val || '—',
    },
    { key: 'adminUnit', title: '管理单位', width: 150, dataIndex: 'adminUnit', ellipsis: true },
    {
      key: 'action',
      title: '操作',
      width: 100,
      align: 'center' as const,
      render: () => (
        <Space size={2}>
          <Typography.Link style={{ fontSize: 13, color: '#1677ff' }} onClick={() => window.location.hash = '#/admin/info-edit-detail'}>查看</Typography.Link>
          <Typography.Text type="secondary">、</Typography.Text>
          <Typography.Link style={{ fontSize: 13, color: '#1677ff' }} onClick={() => window.location.hash = fromCategory ? '#/admin/service-dir-maint' : '#/admin/maint-edit-form'}>编辑</Typography.Link>
        </Space>
      ),
    },
  ];

  return (
    <PortalLayout groups={adminGroups} activePath="/admin/maint-edit" portalType="admin">
      <Typography.Text style={{ color: t.colorPrimary }}>注册服务商审核</Typography.Text>
      <Typography.Title level={4} style={{ margin: '0 0 16px' }}>选择服务商</Typography.Title>
      <Card size="small" variant="outlined" style={{ marginBottom: 16 }}>
        <Space direction="vertical" style={{ width: '100%' }} size={12}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr) auto', gap: 12, alignItems: 'end' }}>
            <div>
              <Typography.Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 4 }}>服务商编码</Typography.Text>
              <Input placeholder="请输入服务商编码" value={codeFilter} onChange={e => setCodeFilter(e.target.value)} />
            </div>
            <div>
              <Typography.Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 4 }}>服务商名称</Typography.Text>
              <Input placeholder="请输入服务商名称" value={nameFilter} onChange={e => setNameFilter(e.target.value)} />
            </div>
            <div>
              <Typography.Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 4 }}>供应商状态</Typography.Text>
              <Input placeholder="请输入供应商状态" value={statusFilter} onChange={e => setStatusFilter(e.target.value)} />
            </div>
            <Space>
              <Button type="primary" danger onClick={handleSearch}>查询</Button>
              <Button onClick={handleReset}>重置</Button>
            </Space>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr) auto', gap: 12, alignItems: 'end' }}>
            <div>
              <Typography.Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 4 }}>管理单位</Typography.Text>
              <Input placeholder="请输入管理单位" value={unitFilter} onChange={e => setUnitFilter(e.target.value)} />
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
    </PortalLayout>
  );
}
