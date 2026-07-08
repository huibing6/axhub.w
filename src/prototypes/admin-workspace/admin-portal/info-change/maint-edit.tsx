/**
 * @name 维护编辑
 */
import { useState } from 'react';
import { theme, Typography, Card, Space, Input, Button, Table, Tabs, Tag, message } from 'antd';
import PortalLayout from '../../common/portal-layout';
import { adminGroups } from '../../common/menu-data';
import { useFilterData } from '../../common/hooks';

const basicRawData = [
  { idx: 1, code: '10000100', name: '中海油能源发展股份有限公司', mgmtType: '所属企业管理', flowStatus: '待提交', adminUnit: '长庆油田分公司', dataSource: '自助服务管理', changeType: '一般信息变更', workCode: 'ZD123456', workType: '供应商更名', time: '2025-12-19 09:15' },
  { idx: 2, code: '10000100', name: '杰瑞石油装备技术有限公司', mgmtType: '总部管理', flowStatus: '待提交', adminUnit: '长庆油田分公司', dataSource: '自助服务管理', changeType: '更名', workCode: 'ZD123456', workType: '供应商更名', time: '2025-12-17 15:03' },
  { idx: 3, code: '10000100', name: '中海油能源发展股份有限公司', mgmtType: '所属企业管理', flowStatus: '已拒绝', adminUnit: '长庆油田分公司', dataSource: '日常信息管理', changeType: '非更名的重要信息变更', workCode: 'ZD123456', workType: '供应商更名', time: '2025-12-19 09:15' },
  { idx: 4, code: '10000100', name: '杰瑞石油装备技术有限公司', mgmtType: '总部管理', flowStatus: '已拒绝', adminUnit: '长庆油田分公司', dataSource: '日常信息管理', changeType: '一般信息变更', workCode: 'ZD123456', workType: '供应商更名', time: '2025-12-17 15:03' },
  { idx: 5, code: '', name: '中海油能源发展股份有限公司', mgmtType: '', flowStatus: '', adminUnit: '', dataSource: '', changeType: '更名', workCode: 'ZD123456', workType: '', time: '2025-12-19 09:15' },
  { idx: 6, code: '', name: '杰瑞石油装备技术有限公司', mgmtType: '', flowStatus: '', adminUnit: '', dataSource: '', changeType: '非更名的重要信息变更', workCode: 'ZD123456', workType: '', time: '2025-12-17 15:03' },
];

const catalogRawData = [
  { idx: 1, catCode: 'S10000', catName: '通信服务', dirType: '专业', dirLevel: '一级', flowStatus: '待提交', dataSource: '自助服务管理', spCode: '10000100', spName: '中海油能源发展股份有限公司', spMgmtType: '总部管理', adminUnit: '长庆油田分公司', productChangeType: '新增', time: '2025-12-19 09:15', remark: '' },
  { idx: 2, catCode: 'S10000', catName: '交通服务', dirType: '通用', dirLevel: '二级', flowStatus: '已拒绝', dataSource: '自助服务管理', spCode: '10000100', spName: '杰瑞石油装备技术有限公司', spMgmtType: '所属企业管理', adminUnit: '长庆油田分公司', productChangeType: '删除', time: '2025-12-17 15:03', remark: '' },
  { idx: 3, catCode: 'S10000', catName: '通信服务', dirType: '', dirLevel: '', flowStatus: '待提交', dataSource: '日常信息管理', spCode: '10000100', spName: '中海油能源发展股份有限公司', spMgmtType: '', adminUnit: '长庆油田分公司', productChangeType: '', time: '', remark: '' },
  { idx: 4, catCode: 'S10000', catName: '交通服务', dirType: '', dirLevel: '', flowStatus: '已拒绝', dataSource: '日常信息管理', spCode: '10000100', spName: '杰瑞石油装备技术有限公司', spMgmtType: '', adminUnit: '长庆油田分公司', productChangeType: '', time: '', remark: '' },
  { idx: 5, catCode: '', catName: '中海油能源发展股份有限公司', dirType: '', dirLevel: '', flowStatus: '', dataSource: '', spCode: '', spName: '更名', spMgmtType: '', adminUnit: '', productChangeType: '', time: '', remark: '' },
  { idx: 6, catCode: '', catName: '杰瑞石油装备技术有限公司', dirType: '', dirLevel: '', flowStatus: '', dataSource: '', spCode: '', spName: '非更名的重要信息变更', spMgmtType: '', adminUnit: '', productChangeType: '', time: '', remark: '' },
];

const statusColors: Record<string, string> = {
  '待提交': 'default',
  '待复核': 'processing',
  '已拒绝': 'error',
  '已完成': 'success',
};

export default function MaintEdit() {
  const { token: t } = theme.useToken();
  const [activeTab, setActiveTab] = useState('basic');
  const [codeFilter, setCodeFilter] = useState('');
  const [nameFilter, setNameFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [unitFilter, setUnitFilter] = useState('');
  const [sourceFilter, setSourceFilter] = useState('');
  const { setFilter: setBasicFilter, filteredData: basicFilteredData, clearFilters: clearBasicFilters } = useFilterData(basicRawData, [
    { key: 'code', label: '服务商编码' },
    { key: 'name', label: '服务商名称' },
    { key: 'flowStatus', label: '流程状态' },
    { key: 'adminUnit', label: '管理单位' },
    { key: 'dataSource', label: '数据来源' },
  ]);
  const { setFilter: setCatalogFilter, filteredData: catalogFilteredData, clearFilters: clearCatalogFilters } = useFilterData(catalogRawData, [
    { key: 'spCode', label: '服务商编码' },
    { key: 'spName', label: '服务商名称' },
    { key: 'flowStatus', label: '流程状态' },
    { key: 'adminUnit', label: '管理单位' },
    { key: 'dataSource', label: '数据来源' },
  ]);

  const handleSearch = () => {
    if (activeTab === 'basic') {
      setBasicFilter('code', codeFilter);
      setBasicFilter('name', nameFilter);
      setBasicFilter('flowStatus', statusFilter);
      setBasicFilter('adminUnit', unitFilter);
      setBasicFilter('dataSource', sourceFilter);
    } else {
      setCatalogFilter('spCode', codeFilter);
      setCatalogFilter('spName', nameFilter);
      setCatalogFilter('flowStatus', statusFilter);
      setCatalogFilter('adminUnit', unitFilter);
      setCatalogFilter('dataSource', sourceFilter);
    }
  };

  const handleReset = () => {
    setCodeFilter('');
    setNameFilter('');
    setStatusFilter('');
    setUnitFilter('');
    setSourceFilter('');
    if (activeTab === 'basic') {
      clearBasicFilters();
    } else {
      clearCatalogFilters();
    }
  };

  const basicColumns = [
    { key: 'idx', title: '序号', width: 50, align: 'center' as const, dataIndex: 'idx' },
    { key: 'code', title: '服务商编码', width: 100, dataIndex: 'code', ellipsis: true },
    { key: 'name', title: '服务商名称', width: 180, dataIndex: 'name', ellipsis: true },
    { key: 'mgmtType', title: '服务商管理类型', width: 110, dataIndex: 'mgmtType', ellipsis: true },
    {
      key: 'flowStatus', title: '流程状态', width: 80, align: 'center' as const, dataIndex: 'flowStatus',
      render: (val: string) => val ? <Tag color={statusColors[val] || 'default'}>{val}</Tag> : '—',
    },
    { key: 'adminUnit', title: '管理单位', width: 120, dataIndex: 'adminUnit', ellipsis: true },
    { key: 'dataSource', title: '数据来源', width: 110, dataIndex: 'dataSource', ellipsis: true },
    { key: 'changeType', title: '变更类型', width: 130, dataIndex: 'changeType', ellipsis: true },
    { key: 'workCode', title: '工作单编码', width: 100, dataIndex: 'workCode', ellipsis: true },
    { key: 'workType', title: '工作单类型', width: 100, dataIndex: 'workType', ellipsis: true },
    { key: 'time', title: '服务商提交时间', width: 130, dataIndex: 'time' },
    {
      key: 'action', title: '操作', width: 140, align: 'center' as const,
      render: (_: unknown, record: any) => {
        const isReject = record.flowStatus === '已拒绝';
        return (
          <Space size={2} wrap>
            <Typography.Link style={{ fontSize: 13, color: '#1677ff' }} onClick={() => window.location.hash = '#/admin/info-edit-detail'}>查看</Typography.Link>
            <Typography.Text type="secondary">、</Typography.Text>
            <Typography.Link style={{ fontSize: 13, color: '#1677ff' }} onClick={() => window.location.hash = '#/admin/maint-edit-form'}>编辑</Typography.Link>
            {isReject ? (
              <><Typography.Text type="secondary">、</Typography.Text><Typography.Link style={{ fontSize: 13, color: '#1677ff' }}>退回</Typography.Link></>
            ) : (
              <><Typography.Text type="secondary">、</Typography.Text><Typography.Link style={{ fontSize: 13, color: '#1677ff' }}>删除</Typography.Link><Typography.Text type="secondary">、</Typography.Text><Typography.Link style={{ fontSize: 13, color: '#1677ff' }}>终止</Typography.Link></>
            )}
          </Space>
        );
      },
    },
  ];

  const catalogColumns = [
    { key: 'idx', title: '序号', width: 50, align: 'center' as const, dataIndex: 'idx' },
    { key: 'catCode', title: '服务品类编码', width: 110, dataIndex: 'catCode', ellipsis: true },
    { key: 'catName', title: '服务品类名称', width: 120, dataIndex: 'catName', ellipsis: true },
    { key: 'dirType', title: '目录类型', width: 80, dataIndex: 'dirType', ellipsis: true },
    { key: 'dirLevel', title: '目录等级', width: 80, dataIndex: 'dirLevel', ellipsis: true },
    {
      key: 'flowStatus', title: '流程状态', width: 80, align: 'center' as const, dataIndex: 'flowStatus',
      render: (val: string) => val ? <Tag color={statusColors[val] || 'default'}>{val}</Tag> : '—',
    },
    { key: 'dataSource', title: '数据来源', width: 110, dataIndex: 'dataSource', ellipsis: true },
    { key: 'spCode', title: '供应商编码', width: 100, dataIndex: 'spCode', ellipsis: true },
    { key: 'spName', title: '供应商名称', width: 140, dataIndex: 'spName', ellipsis: true },
    { key: 'spMgmtType', title: '供应商管理类型', width: 120, dataIndex: 'spMgmtType', ellipsis: true },
    { key: 'adminUnit', title: '管理单位', width: 120, dataIndex: 'adminUnit', ellipsis: true },
    { key: 'productChangeType', title: '产品变更类型', width: 110, dataIndex: 'productChangeType', ellipsis: true },
    { key: 'time', title: '服务商提交时间', width: 130, dataIndex: 'time' },
    { key: 'remark', title: '备注', width: 100, dataIndex: 'remark', ellipsis: true },
    {
      key: 'action', title: '操作', width: 160, align: 'center' as const,
      render: (_: unknown, record: any) => {
        const isReject = record.flowStatus === '已拒绝';
        return (
          <Space size={2} wrap>
            <Typography.Link style={{ fontSize: 13, color: '#1677ff' }} onClick={() => window.location.hash = '#/admin/info-edit-detail'}>查看</Typography.Link>
            <Typography.Text type="secondary">、</Typography.Text>
            <Typography.Link style={{ fontSize: 13, color: '#1677ff' }} onClick={() => window.location.hash = '#/admin/maint-edit-form'}>编辑</Typography.Link>
            {isReject ? (
              <>
                <Typography.Text type="secondary">、</Typography.Text>
                <Typography.Link style={{ fontSize: 13, color: '#1677ff' }}>删除</Typography.Link>
                <Typography.Text type="secondary">、</Typography.Text>
                <Typography.Link style={{ fontSize: 13, color: '#1677ff' }}>终止</Typography.Link>
              </>
            ) : (
              <>
                <Typography.Text type="secondary">、</Typography.Text>
                <Typography.Link style={{ fontSize: 13, color: '#1677ff' }}>提交</Typography.Link>
                <Typography.Text type="secondary">、</Typography.Text>
                <Typography.Link style={{ fontSize: 13, color: '#1677ff' }}>退回</Typography.Link>
              </>
            )}
          </Space>
        );
      },
    },
  ];

  const tabItems = [
    { key: 'basic', label: '基本信息维护' },
    { key: 'catalog', label: '服务品类维护' },
  ];

  return (
    <PortalLayout groups={adminGroups} activePath="/admin/maint-edit" portalType="admin">
      <Typography.Text style={{ color: t.colorPrimary }}>注册服务商审核</Typography.Text>
      <Typography.Title level={4} style={{ margin: '0 0 16px' }}>维护编辑</Typography.Title>
      <Tabs activeKey={activeTab} onChange={setActiveTab} items={tabItems} />
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
              <Typography.Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 4 }}>管理单位</Typography.Text>
              <Input placeholder="请输入管理单位" value={unitFilter} onChange={e => setUnitFilter(e.target.value)} />
            </div>
            <div>
              <Typography.Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 4 }}>数据来源</Typography.Text>
              <Input placeholder="请输入数据来源" value={sourceFilter} onChange={e => setSourceFilter(e.target.value)} />
            </div>
          </div>
        </Space>
      </Card>
      <div style={{ marginBottom: 16 }}>
        {activeTab === 'basic' ? (
          <Button type="primary" danger onClick={() => window.location.hash = '#/admin/select-sp'}>创建基本信息维护</Button>
        ) : (
          <Button type="primary" danger onClick={() => window.location.hash = '#/admin/select-sp?from=category'}>创建服务品类维护</Button>
        )}
      </div>
      <Table
        columns={activeTab === 'basic' ? basicColumns : catalogColumns}
        dataSource={(activeTab === 'basic' ? basicFilteredData : catalogFilteredData).map((d, i) => ({ ...d, _key: i }))}
        rowKey="_key"
        pagination={false}
        bordered
        size="middle"
        scroll={{ x: 'max-content' }}
      />
    </PortalLayout>
  );
}
