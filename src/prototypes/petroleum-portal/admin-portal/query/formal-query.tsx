/**
 * @name 正式服务商查询
 */
import { useState } from 'react';
import { theme, Typography, Card, Space, Input, Select, Button, Table, Tag } from 'antd';
import PortalLayout from '../../common/portal-layout';
import { adminGroups } from '../../common/menu-data';
import { useFilterData } from '../../common/hooks';

const filterFields = [
  { key: 'name', label: '服务商名称', placeholder: '请输入服务商名称' },
  { key: 'mgmtType', label: '服务商管理类型', type: 'select' as const, options: ['全部', '所属企业管理', '总部管理'] },
  { key: 'submitter', label: '提交人', placeholder: '请输入提交人' },
];

const columns = [
  { key: 'seq', title: '序号', width: 60, align: 'center' as const, dataIndex: 'seq' },
  { key: 'code', title: '服务商编码', width: 110, dataIndex: 'code', ellipsis: true },
  { key: 'name', title: '服务商名称', dataIndex: 'name', ellipsis: true },
  { key: 'mgmtType', title: '服务商管理类型', dataIndex: 'mgmtType', ellipsis: true },
  { key: 'unit', title: '管理单位', dataIndex: 'unit', ellipsis: true },
  { key: 'status', title: '状态', width: 80, align: 'center' as const, dataIndex: 'status' },
];

const statusColors: Record<string, string> = {
  '正常': 'success',
  '暂停': 'warning',
  '取消': 'default',
};

function StatusTag({ status }: { status: string }) {
  return <Tag color={statusColors[status] || 'default'}>{status}</Tag>;
}

const rawData = [
  { seq: 1, code: '1000020022', name: '中海油能源发展股份有限公司', mgmtType: '所属企业管理', unit: '长庆油田', status: '正常' },
  { seq: 2, code: '1000020022', name: '杰瑞石油装备技术有限公司', mgmtType: '总部管理', unit: '', status: '暂停' },
  { seq: 3, code: '1000020022', name: '中海油能源发展股份有限公司', mgmtType: '所属企业管理', unit: '', status: '取消' },
  { seq: 4, code: '1000020022', name: '杰瑞石油装备技术有限公司', mgmtType: '总部管理', unit: '', status: '正常' },
  { seq: 5, code: '1000020022', name: '中海油能源发展股份有限公司', mgmtType: '', unit: '', status: '正常' },
  { seq: 6, code: '', name: '杰瑞石油装备技术有限公司', mgmtType: '', unit: '', status: '正常' },
];

export default function FormalQuery() {
  const [searchValues, setSearchValues] = useState<Record<string, string>>({});
  const { setFilter, filteredData } = useFilterData(rawData, filterFields);

  const formattedData = filteredData.map(d => ({
    ...d,
    status: <StatusTag status={d.status as string} />,
  }));

  return (
    <PortalLayout groups={adminGroups} activePath="/admin/formal-query" portalType="admin">
      <Typography.Title level={4}>正式服务商查询</Typography.Title>
      <Card size="small" variant="outlined" style={{ marginBottom: 16 }}>
        <Space direction="vertical" style={{ width: '100%' }} size={12}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 12 }}>
            {filterFields.map((f, i) => (
              <Space key={i} size={8}>
                <Typography.Text style={{ whiteSpace: 'nowrap' }}>{f.label}</Typography.Text>
                {f.type === 'select' ? (
                  <Select value={searchValues[f.key] || '全部'} onChange={v => setSearchValues(prev => ({ ...prev, [f.key]: v }))} style={{ width: 200 }}>
                    {f.options.map(o => <Select.Option key={o} value={o}>{o}</Select.Option>)}
                  </Select>
                ) : (
                  <Input placeholder={f.placeholder} style={{ width: 200 }} value={searchValues[f.key] || ''} onChange={e => setSearchValues(prev => ({ ...prev, [f.key]: e.target.value }))} />
                )}
              </Space>
            ))}
          </div>
          <Button type="primary" onClick={() => { Object.entries(searchValues).forEach(([k, v]) => setFilter(k, v)); }}>查询</Button>
        </Space>
      </Card>
      <Table
        columns={columns}
        dataSource={formattedData.map((d, i) => ({ ...d, _key: i }))}
        rowKey="_key"
        pagination={{ pageSize: 10, showSizeChanger: true, showTotal: (t) => `共 ${t} 条` }}
        bordered
        size="middle"
      />
    </PortalLayout>
  );
}
