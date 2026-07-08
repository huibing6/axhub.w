/**
 * @name 维护查询
 */
import { useState } from 'react';
import { theme, Typography, Card, Space, Input, Button, Table, Tabs } from 'antd';
import PortalLayout from '../../common/portal-layout';
import { adminGroups } from '../../common/menu-data';
import { useFilterData } from '../../common/hooks';

const tabItems = [
  { key: 'info', label: '服务商信息复核' },
  { key: 'catalog', label: '服务目录复核' },
];

const columns = [
  { key: 'index', title: '序号', width: 60, align: 'center' as const, dataIndex: 'index' },
  { key: 'code', title: '服务商编码', width: 120, dataIndex: 'code', ellipsis: true },
  { key: 'name', title: '服务商名称', width: 200, dataIndex: 'name', ellipsis: true },
  { key: 'mgmtType', title: '服务商管理类型', width: 120, dataIndex: 'mgmtType', ellipsis: true },
  { key: 'adminUnit', title: '管理单位', width: 120, dataIndex: 'adminUnit', ellipsis: true },
  { key: 'flowStatus', title: '流程状态', width: 100, dataIndex: 'flowStatus', ellipsis: true },
  { key: 'changeType', title: '变更类型', width: 120, dataIndex: 'changeType', ellipsis: true },
];

const tableData = [
  { index: '1', code: '1000020022', name: '中海油能源发展股份有限公司', mgmtType: '所属企业管理', adminUnit: '长庆油田', flowStatus: '待提交', changeType: '非更名的重要信息变更' },
  { index: '2', code: '1000020022', name: '杰瑞石油装备技术有限公司', mgmtType: '总部管理', adminUnit: '', flowStatus: '待复核', changeType: '更名' },
  { index: '3', code: '1000020022', name: '中海油能源发展股份有限公司', mgmtType: '所属企业管理', adminUnit: '', flowStatus: '已拒绝', changeType: '一般信息变更' },
  { index: '4', code: '1000020022', name: '杰瑞石油装备技术有限公司', mgmtType: '总部管理', adminUnit: '', flowStatus: '已退回', changeType: '自助维护资质' },
  { index: '5', code: '1000020022', name: '中海油能源发展股份有限公司', mgmtType: '', adminUnit: '', flowStatus: '已终止', changeType: '' },
  { index: '6', code: '', name: '杰瑞石油装备技术有限公司', mgmtType: '', adminUnit: '', flowStatus: '已完成', changeType: 'MDG同步中' },
];

const filterFields = [
  { key: 'name', label: '服务商名称' },
  { key: 'mgmtType', label: '服务商管理类型' },
  { key: 'submitter', label: '提交人' },
];

export default function MaintQuery() {
  const [activeTab, setActiveTab] = useState('info');
  const [searchValues, setSearchValues] = useState<Record<string, string>>({});
  const { setFilter, filteredData } = useFilterData(tableData, filterFields);

  return (
    <PortalLayout groups={adminGroups} activePath="/admin/maint-query" portalType="admin">
      <Typography.Text type="secondary" style={{ display: 'block', marginBottom: 8 }}>
        <Typography.Text style={{ color: theme.useToken().token.colorPrimary }}>注册服务商审核</Typography.Text>
      </Typography.Text>
      <Typography.Title level={4}>维护查询</Typography.Title>
      <Tabs activeKey={activeTab} onChange={setActiveTab} items={tabItems} />
      <Card size="small" variant="outlined" style={{ marginBottom: 16 }}>
        <Space direction="vertical" style={{ width: '100%' }} size={12}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 12 }}>
            {filterFields.map((f, i) => (
              <Space key={i} size={8}>
                <Typography.Text style={{ whiteSpace: 'nowrap' }}>{f.label}</Typography.Text>
                <Input placeholder="请输入" style={{ width: 200 }} value={searchValues[f.key] || ''} onChange={e => setSearchValues(prev => ({ ...prev, [f.key]: e.target.value }))} />
              </Space>
            ))}
          </div>
          <Button type="primary" onClick={() => { Object.entries(searchValues).forEach(([k, v]) => setFilter(k, v)); }}>查询</Button>
        </Space>
      </Card>
      <Table
        columns={columns}
        dataSource={filteredData.map((d, i) => ({ ...d, _key: i }))}
        rowKey="_key"
        pagination={{ pageSize: 10, showSizeChanger: true, showTotal: (t) => `共 ${t} 条` }}
        bordered
        size="middle"
      />
    </PortalLayout>
  );
}
