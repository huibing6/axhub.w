/**
 * @name 维护复核
 */
import { useState } from 'react';
import { theme, Typography, Card, Space, Input, Button, Table, Tabs } from 'antd';
import PortalLayout from '../../common/portal-layout';
import { adminGroups } from '../../common/menu-data';
import { useFilterData } from '../../common/hooks';

const infoRawData = [
  { idx: 1, code: '1000020022', name: '中海油能源发展股份有限公司', mgmtType: '所属企业管理', flowStatus: '待复核', changeType: '非更名的重要信息变更', dataSource: '准入信息管理', submitter: '张三', submitTime: '2025-12-19 09:15', editor: '张三', editTime: '2025-12-19 09:15' },
  { idx: 2, code: '1000020022', name: '杰瑞石油装备技术有限公司', mgmtType: '总部管理', flowStatus: '待复核', changeType: '更名', dataSource: '自助服务管理', submitter: '李四', submitTime: '2025-12-17 15:03', editor: '李四', editTime: '2025-12-17 15:03' },
  { idx: 3, code: '1000020022', name: '中海油能源发展股份有限公司', mgmtType: '所属企业管理', flowStatus: '待复核', changeType: '一般信息变更', dataSource: '准入信息管理', submitter: '张三', submitTime: '2025-12-19 09:15', editor: '张三', editTime: '2025-12-19 09:15' },
  { idx: 4, code: '1000020022', name: '杰瑞石油装备技术有限公司', mgmtType: '总部管理', flowStatus: '待复核', changeType: '自助维护资质', dataSource: '自助服务管理', submitter: '李四', submitTime: '2025-12-17 15:03', editor: '李四', editTime: '2025-12-17 15:03' },
  { idx: 5, code: '1000020022', name: '中海油能源发展股份有限公司', mgmtType: '', flowStatus: '', changeType: '', dataSource: '', submitter: '张三', submitTime: '2025-12-19 09:15', editor: '张三', editTime: '2025-12-19 09:15' },
  { idx: 6, code: '', name: '杰瑞石油装备技术有限公司', mgmtType: '', flowStatus: '', changeType: '', dataSource: '', submitter: '李四', submitTime: '2025-12-17 15:03', editor: '李四', editTime: '2025-12-17 15:03' },
];

const catalogRawData = [
  { idx: 1, catCode: 'S1000200', catName: '租赁服务', dirType: '专业', dirLevel: '一级', flowStatus: '待复核', changeType: '新增', spCode: '1000020022', spName: '中海油能源发展股份有限公司', adminUnit: '长庆油田', submitter: '张三', submitTime: '2025-12-19 09:15', editor: '张三', editTime: '2025-12-19 09:15', remark: '' },
  { idx: 2, catCode: 'S1000200', catName: '租赁服务', dirType: '通用', dirLevel: '二级', flowStatus: '待复核', changeType: '删除', spCode: '1000020022', spName: '杰瑞石油装备技术有限公司', adminUnit: '长庆油田', submitter: '李四', submitTime: '2025-12-17 15:03', editor: '李四', editTime: '2025-12-17 15:03', remark: '' },
  { idx: 3, catCode: 'S1000200', catName: '租赁服务', dirType: '专业', dirLevel: '一级', flowStatus: '待复核', changeType: '新增', spCode: '1000020022', spName: '中海油能源发展股份有限公司', adminUnit: '长庆油田', submitter: '张三', submitTime: '2025-12-19 09:15', editor: '张三', editTime: '2025-12-19 09:15', remark: '' },
  { idx: 4, catCode: 'S1000200', catName: '租赁服务', dirType: '通用', dirLevel: '二级', flowStatus: '待复核', changeType: '删除', spCode: '1000020022', spName: '杰瑞石油装备技术有限公司', adminUnit: '长庆油田', submitter: '李四', submitTime: '2025-12-17 15:03', editor: '李四', editTime: '2025-12-17 15:03', remark: '' },
  { idx: 5, catCode: '', catName: '', dirType: '', dirLevel: '', flowStatus: '', changeType: '', spCode: '1000020022', spName: '中海油能源发展股份有限公司', adminUnit: '', submitter: '张三', submitTime: '2025-12-19 09:15', editor: '张三', editTime: '2025-12-19 09:15', remark: '' },
  { idx: 6, catCode: '', catName: '', dirType: '', dirLevel: '', flowStatus: '', changeType: '', spCode: '', spName: '杰瑞石油装备技术有限公司', adminUnit: '', submitter: '李四', submitTime: '2025-12-17 15:03', editor: '李四', editTime: '2025-12-17 15:03', remark: '' },
];

export default function MaintReview() {
  const { token: t } = theme.useToken();
  const [activeTab, setActiveTab] = useState('info');
  const [nameFilter, setNameFilter] = useState('');
  const [mgmtTypeFilter, setMgmtTypeFilter] = useState('');
  const [flowStatusFilter, setFlowStatusFilter] = useState('');
  const [submitterFilter, setSubmitterFilter] = useState('');

  const { setFilter: setInfoFilter, filteredData: infoFilteredData, clearFilters: clearInfoFilters } = useFilterData(infoRawData, [
    { key: 'name', label: '服务商名称' },
    { key: 'mgmtType', label: '服务商管理类型' },
    { key: 'flowStatus', label: '流程状态' },
    { key: 'submitter', label: '提交人' },
  ]);

  const { setFilter: setCatalogFilter, filteredData: catalogFilteredData, clearFilters: clearCatalogFilters } = useFilterData(catalogRawData, [
    { key: 'spName', label: '服务商名称' },
    { key: 'spMgmtType', label: '服务商管理类型' },
    { key: 'flowStatus', label: '流程状态' },
    { key: 'submitter', label: '提交人' },
  ]);

  const handleSearch = () => {
    if (activeTab === 'info') {
      setInfoFilter('name', nameFilter);
      setInfoFilter('mgmtType', mgmtTypeFilter);
      setInfoFilter('flowStatus', flowStatusFilter);
      setInfoFilter('submitter', submitterFilter);
    } else {
      setCatalogFilter('spName', nameFilter);
      setCatalogFilter('spMgmtType', mgmtTypeFilter);
      setCatalogFilter('flowStatus', flowStatusFilter);
      setCatalogFilter('submitter', submitterFilter);
    }
  };

  const handleReset = () => {
    setNameFilter('');
    setMgmtTypeFilter('');
    setFlowStatusFilter('');
    setSubmitterFilter('');
    if (activeTab === 'info') {
      clearInfoFilters();
    } else {
      clearCatalogFilters();
    }
  };

  const infoColumns = [
    { key: 'idx', title: '序号', width: 50, align: 'center' as const, dataIndex: 'idx' },
    { key: 'code', title: '服务商编码', width: 120, dataIndex: 'code', ellipsis: true },
    { key: 'name', title: '服务商名称', width: 200, dataIndex: 'name', ellipsis: true },
    { key: 'mgmtType', title: '服务商管理类型', width: 120, dataIndex: 'mgmtType', ellipsis: true },
    { key: 'flowStatus', title: '流程状态', width: 80, dataIndex: 'flowStatus', ellipsis: true },
    { key: 'changeType', title: '变更类型', width: 140, dataIndex: 'changeType', ellipsis: true },
    { key: 'dataSource', title: '数据来源', width: 110, dataIndex: 'dataSource', ellipsis: true },
    { key: 'submitter', title: '提交人', width: 70, dataIndex: 'submitter', ellipsis: true },
    { key: 'submitTime', title: '提交时间', width: 110, dataIndex: 'submitTime' },
    { key: 'editor', title: '编辑人', width: 70, dataIndex: 'editor', ellipsis: true },
    { key: 'editTime', title: '编辑时间', width: 110, dataIndex: 'editTime' },
    {
      key: 'action', title: '操作', width: 100, align: 'center' as const,
      render: () => (
        <Space size={2}>
          <Typography.Link style={{ fontSize: 13, color: '#1677ff' }} onClick={() => window.location.hash = '#/admin/info-edit-detail'}>查看</Typography.Link>
          <Typography.Text type="secondary">、</Typography.Text>
          <Typography.Link style={{ fontSize: 13, color: '#1677ff' }} onClick={() => window.location.hash = '#/admin/maint-review-detail'}>复核</Typography.Link>
        </Space>
      ),
    },
  ];

  const catalogColumns = [
    { key: 'idx', title: '序号', width: 50, align: 'center' as const, dataIndex: 'idx' },
    { key: 'catCode', title: '服务分类编码', width: 110, dataIndex: 'catCode', ellipsis: true },
    { key: 'catName', title: '服务分类名称', width: 110, dataIndex: 'catName', ellipsis: true },
    { key: 'dirType', title: '目录类型', width: 80, dataIndex: 'dirType', ellipsis: true },
    { key: 'dirLevel', title: '目录等级', width: 80, dataIndex: 'dirLevel', ellipsis: true },
    { key: 'flowStatus', title: '流程状态', width: 80, dataIndex: 'flowStatus', ellipsis: true },
    { key: 'changeType', title: '变更类型', width: 80, dataIndex: 'changeType', ellipsis: true },
    { key: 'spCode', title: '服务商编码', width: 110, dataIndex: 'spCode', ellipsis: true },
    { key: 'spName', title: '服务商名称', width: 140, dataIndex: 'spName', ellipsis: true },
    { key: 'adminUnit', title: '管理单位', width: 90, dataIndex: 'adminUnit', ellipsis: true },
    { key: 'submitter', title: '提交人', width: 70, dataIndex: 'submitter', ellipsis: true },
    { key: 'submitTime', title: '提交时间', width: 110, dataIndex: 'submitTime' },
    { key: 'editor', title: '编辑人', width: 70, dataIndex: 'editor', ellipsis: true },
    { key: 'editTime', title: '编辑时间', width: 110, dataIndex: 'editTime' },
    { key: 'remark', title: '备注', width: 80, dataIndex: 'remark', ellipsis: true },
    {
      key: 'action', title: '操作', width: 100, align: 'center' as const,
      render: () => (
        <Space size={2}>
          <Typography.Link style={{ fontSize: 13, color: '#1677ff' }} onClick={() => window.location.hash = '#/admin/info-edit-detail'}>查看</Typography.Link>
          <Typography.Text type="secondary">、</Typography.Text>
          <Typography.Link style={{ fontSize: 13, color: '#1677ff' }} onClick={() => window.location.hash = '#/admin/maint-catalog-review-detail'}>复核</Typography.Link>
        </Space>
      ),
    },
  ];

  const tabItems = [
    { key: 'info', label: '服务商信息复核' },
    { key: 'catalog', label: '服务目录复核' },
  ];

  return (
    <PortalLayout groups={adminGroups} activePath="/admin/maint-review" portalType="admin">
      <Typography.Text style={{ color: t.colorPrimary }}>注册服务商审核</Typography.Text>
      <Typography.Title level={4} style={{ margin: '0 0 16px' }}>维护复核</Typography.Title>
      <Tabs activeKey={activeTab} onChange={setActiveTab} items={tabItems} />
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
              <Input placeholder="请输入流程状态" value={flowStatusFilter} onChange={e => setFlowStatusFilter(e.target.value)} />
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
        columns={activeTab === 'info' ? infoColumns : catalogColumns}
        dataSource={(activeTab === 'info' ? infoFilteredData : catalogFilteredData).map((d, i) => ({ ...d, _key: i }))}
        rowKey="_key"
        pagination={false}
        bordered
        size="middle"
        scroll={{ x: 'max-content' }}
      />
    </PortalLayout>
  );
}
