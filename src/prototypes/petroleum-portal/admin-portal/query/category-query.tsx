/**
 * @name 准入服务分类查询
 */
import { useState } from 'react';
import { theme, Typography, Card, Space, Input, Select, Button, Table } from 'antd';
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
  { key: 'catCode', title: '服务分类码', width: 100, dataIndex: 'catCode', ellipsis: true },
  { key: 'catName', title: '服务分类名称', width: 100, dataIndex: 'catName', ellipsis: true },
  { key: 'dirType', title: '目录类型', width: 80, align: 'center' as const, dataIndex: 'dirType' },
  { key: 'dirLevel', title: '目录级别', width: 80, align: 'center' as const, dataIndex: 'dirLevel' },
];

const rawData = [
  { seq: 1, code: '1000020022', name: '中海油能源发展股份有限公司', catCode: 'S100010', catName: '租赁服务', dirType: '通用', dirLevel: '一级' },
  { seq: 2, code: '1000020022', name: '杰瑞石油装备技术有限公司', catCode: 'S100010', catName: '租赁服务', dirType: '专业', dirLevel: '二级' },
  { seq: 3, code: '1000020022', name: '中海油能源发展股份有限公司', catCode: 'S100010', catName: '租赁服务', dirType: '通用', dirLevel: '一级' },
  { seq: 4, code: '1000020022', name: '杰瑞石油装备技术有限公司', catCode: 'S100010', catName: '租赁服务', dirType: '专业', dirLevel: '二级' },
  { seq: 5, code: '1000020022', name: '中海油能源发展股份有限公司', catCode: 'S100010', catName: '租赁服务', dirType: '', dirLevel: '' },
  { seq: 6, code: '', name: '杰瑞石油装备技术有限公司', catCode: '', catName: '', dirType: '', dirLevel: '' },
];

export default function CategoryQuery() {
  const [searchValues, setSearchValues] = useState<Record<string, string>>({});
  const { setFilter, filteredData } = useFilterData(rawData, filterFields);
  return (
    <PortalLayout groups={adminGroups} activePath="/admin/category-query" portalType="admin">
      <Typography.Title level={4}>准入服务分类查询</Typography.Title>
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
        dataSource={filteredData.map((d, i) => ({ ...d, _key: i }))}
        rowKey="_key"
        pagination={{ pageSize: 10, showSizeChanger: true, showTotal: (t) => `共 ${t} 条` }}
        bordered
        size="middle"
      />
    </PortalLayout>
  );
}
