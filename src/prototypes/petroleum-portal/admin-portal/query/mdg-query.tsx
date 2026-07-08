/**
 * @name MDG信息查询
 */
import { useState } from 'react';
import { theme, Typography, Card, Space, Input, Button, Table } from 'antd';
import PortalLayout from '../../common/portal-layout';
import { adminGroups } from '../../common/menu-data';
import { useFilterData } from '../../common/hooks';

const filterFields = [
  { key: 'name', label: '服务商名称' },
  { key: 'mgmtType', label: '服务商管理类型' },
  { key: 'submitter', label: '提交人' },
];

const columns = [
  { key: 'index', title: '序号', width: 60, align: 'center' as const, dataIndex: 'index' },
  { key: 'code', title: '服务商编码', width: 120, dataIndex: 'code', ellipsis: true },
  { key: 'name', title: '服务商名称', width: 200, dataIndex: 'name', ellipsis: true },
  { key: 'mgmtType', title: '服务商管理类型', width: 120, dataIndex: 'mgmtType', ellipsis: true },
  { key: 'adminUnit', title: '管理单位', width: 120, dataIndex: 'adminUnit', ellipsis: true },
  { key: 'flowStatus', title: '流程状态', width: 120, dataIndex: 'flowStatus', ellipsis: true },
  { key: 'syncType', title: '同步类型', width: 100, dataIndex: 'syncType', ellipsis: true },
  { key: 'dataSource', title: '数据来源', width: 120, dataIndex: 'dataSource', ellipsis: true },
];

const tableData = [
  { index: '1', code: '1000020022', name: '中海油能源发展股份有限公司', mgmtType: '所属企业管理', adminUnit: '长庆油田', flowStatus: '同步完成', syncType: '新增', dataSource: '准入办理' },
  { index: '2', code: '1000020022', name: '杰瑞石油装备技术有限公司', mgmtType: '总部管理', adminUnit: '', flowStatus: '同步验证驳回', syncType: '变更', dataSource: '信息变更' },
  { index: '3', code: '1000020022', name: '中海油能源发展股份有限公司', mgmtType: '所属企业管理', adminUnit: '', flowStatus: 'MDG处理中', syncType: '', dataSource: '准入办理' },
  { index: '4', code: '1000020022', name: '杰瑞石油装备技术有限公司', mgmtType: '总部管理', adminUnit: '', flowStatus: '已关闭', syncType: '', dataSource: '信息变更' },
  { index: '5', code: '1000020022', name: '中海油能源发展股份有限公司', mgmtType: '', adminUnit: '', flowStatus: '', syncType: '', dataSource: '' },
  { index: '6', code: '', name: '杰瑞石油装备技术有限公司', mgmtType: '', adminUnit: '', flowStatus: '', syncType: '', dataSource: '' },
];

export default function MdgQuery() {
  const [searchValues, setSearchValues] = useState<Record<string, string>>({});
  const { setFilter, filteredData } = useFilterData(tableData, filterFields);
  return (
    <PortalLayout groups={adminGroups} activePath="/admin/mdg-query" portalType="admin">
      <Typography.Text type="secondary" style={{ display: 'block', marginBottom: 8 }}>
        <Typography.Text style={{ color: theme.useToken().token.colorPrimary }}>注册服务商审核</Typography.Text>
      </Typography.Text>
      <Typography.Title level={4}>MDG信息查询</Typography.Title>
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
