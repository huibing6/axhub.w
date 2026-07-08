/**
 * @name 注册服务商变更审核
 */
import { useState } from 'react';
import { theme, Typography, Card, Space, Input, Button, Table, message } from 'antd';
import PortalLayout from '../../common/portal-layout';
import { adminGroups } from '../../common/menu-data';
import { useFilterData } from '../../common/hooks';

const columns = [
  { key: 'idx', title: '序号', width: 60, align: 'center' as const, dataIndex: 'idx' },
  { key: 'catCode', title: '服务分类码', width: 120, dataIndex: 'catCode', ellipsis: true },
  { key: 'catName', title: '服务分类名称', width: 140, dataIndex: 'catName', ellipsis: true },
  { key: 'spCode', title: '服务商编码', width: 120, dataIndex: 'spCode', ellipsis: true },
  { key: 'spName', title: '服务商名称', width: 260, dataIndex: 'spName', ellipsis: true },
];

const data = [
  { idx: 1, catCode: 'S1000010', catName: '租赁服务', spCode: '100000010', spName: '中海油能源发展股份有限公司' },
  { idx: 2, catCode: 'S1000011', catName: '租赁服务', spCode: '100000010', spName: '杰瑞石油装备技术有限公司' },
  { idx: 3, catCode: 'S1000010', catName: '租赁服务', spCode: '', spName: '中海油能源发展股份有限公司' },
  { idx: 4, catCode: 'S1000010', catName: '租赁服务', spCode: '', spName: '杰瑞石油装备技术有限公司' },
  { idx: 5, catCode: 'S1000010', catName: '租赁服务', spCode: '', spName: '中海油能源发展股份有限公司' },
  { idx: 6, catCode: 'S1000010', catName: '租赁服务', spCode: '', spName: '杰瑞石油装备技术有限公司' },
];

export default function ChangeReviewPage() {
  const [nameFilter, setNameFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [submitterFilter, setSubmitterFilter] = useState('');
  const { setFilter, filteredData } = useFilterData(data, [
    { key: 'spName', label: '服务商名称' },
    { key: 'type', label: '服务商管理类型' },
    { key: 'submitter', label: '提交人' },
  ]);
  const handleSearch = () => {
    setFilter('spName', nameFilter);
    setFilter('type', typeFilter);
    setFilter('submitter', submitterFilter);
  };
  return (
    <PortalLayout groups={adminGroups} activePath="/admin/reg-change-review" portalType="admin">
      <Typography.Title level={4}>注册服务商变更审核</Typography.Title>
      <Card size="small" variant="outlined" style={{ marginBottom: 16 }}>
        <Space direction="vertical" style={{ width: '100%' }} size={12}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 12 }}>
            <Space size={8}>
              <Typography.Text style={{ whiteSpace: 'nowrap' }}>服务商名称</Typography.Text>
              <Input placeholder="请输入服务商名称" style={{ width: 200 }} value={nameFilter} onChange={e => setNameFilter(e.target.value)} />
            </Space>
            <Space size={8}>
              <Typography.Text style={{ whiteSpace: 'nowrap' }}>服务商管理类型</Typography.Text>
              <Input placeholder="请输入服务商管理类型" style={{ width: 200 }} value={typeFilter} onChange={e => setTypeFilter(e.target.value)} />
            </Space>
            <Space size={8}>
              <Typography.Text style={{ whiteSpace: 'nowrap' }}>提交人</Typography.Text>
              <Input placeholder="请输入提交人" style={{ width: 200 }} value={submitterFilter} onChange={e => setSubmitterFilter(e.target.value)} />
            </Space>
          </div>
          <Space size={12}>
            <Button type="primary" onClick={handleSearch}>查询</Button>
          </Space>
        </Space>
      </Card>
      <Table
        columns={columns}
        dataSource={filteredData.map((d, i) => ({ ...d, _key: i }))}
        rowKey="_key"
        pagination={{ pageSize: 10, showSizeChanger: true, showTotal: (t: number) => `共 ${t} 条` }}
        bordered
        size="middle"
      />
    </PortalLayout>
  );
}
