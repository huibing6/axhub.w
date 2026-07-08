/**
 * @name 服务管理目录
 */
import { useState } from 'react';
import { theme, Typography, Card, Space, Input, Select, Button, Table } from 'antd';
import PortalLayout from '../../common/portal-layout';
import { adminGroups } from '../../common/menu-data';
import { useFilterData } from '../../common/hooks';
import { DetailPanel } from '../../common/components';

const filterFields = [
  { key: 'name', label: '目录名称', placeholder: '请输入目录名称' },
  { key: 'code', label: '目录编码', placeholder: '请输入目录编码' },
  { key: 'type', label: '目录类型', type: 'select' as const, options: ['全部', '通用', '专业'] },
  { key: 'level', label: '目录级别', type: 'select' as const, options: ['全部', '1级', '2级'] },
];

const columns = [
  { key: 'seq', title: '序号', width: 60, align: 'center' as const, dataIndex: 'seq' },
  { key: 'code', title: '目录编码', width: 120, dataIndex: 'code', ellipsis: true },
  { key: 'name', title: '目录名称', dataIndex: 'name', ellipsis: true },
  { key: 'parent', title: '上级目录', dataIndex: 'parent', ellipsis: true },
  { key: 'level', title: '目录级别', width: 80, align: 'center' as const, dataIndex: 'level' },
  { key: 'type', title: '目录类型', width: 100, align: 'center' as const, dataIndex: 'type' },
  { key: 'status', title: '状态', width: 80, align: 'center' as const, dataIndex: 'status' },
  { key: 'action', title: '操作', width: 120, align: 'center' as const, dataIndex: 'action' },
];

const rawData = [
  { seq: 1, code: 'GC', name: '工程技术服务', parent: '-', level: '1级', type: '通用', status: '启用', action: <Button type="link" size="small" style={{ color: '#1677ff' }}>查看</Button> },
  { seq: 2, code: 'GC-ZJ', name: '钻井工程', parent: '工程技术服务', level: '2级', type: '专业', status: '启用', action: <Button type="link" size="small" style={{ color: '#1677ff' }}>查看</Button> },
  { seq: 3, code: 'GC-CY', name: '采油工程', parent: '工程技术服务', level: '2级', type: '专业', status: '启用', action: <Button type="link" size="small" style={{ color: '#1677ff' }}>查看</Button> },
  { seq: 4, code: 'GC-SY', name: '试油技术服务', parent: '工程技术服务', level: '2级', type: '通用', status: '启用', action: <Button type="link" size="small" style={{ color: '#1677ff' }}>查看</Button> },
  { seq: 5, code: 'DM', name: '地面建设服务', parent: '-', level: '1级', type: '通用', status: '启用', action: <Button type="link" size="small" style={{ color: '#1677ff' }}>查看</Button> },
  { seq: 6, code: 'DM-GD', name: '管道工程', parent: '地面建设服务', level: '2级', type: '专业', status: '启用', action: <Button type="link" size="small" style={{ color: '#1677ff' }}>查看</Button> },
];

export default function ServiceDir() {
  const [searchValues, setSearchValues] = useState<Record<string, string>>({});
  const [expandedRowKeys, setExpandedRowKeys] = useState<React.Key[]>([]);
  const { setFilter, filteredData } = useFilterData(rawData, filterFields);

  const toggleRowExpand = (key: React.Key) => {
    setExpandedRowKeys(prev => prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]);
  };

  const expandedRowRender = (record: any) => {
    const fields = [
      { label: '目录编码', value: record.code },
      { label: '目录名称', value: record.name },
      { label: '上级目录', value: record.parent },
      { label: '目录级别', value: record.level },
      { label: '目录类型', value: record.type },
      { label: '状态', value: record.status },
    ];
    return <DetailPanel title="目录详情" fields={fields} onClose={() => toggleRowExpand(record._key)} />;
  };

  const tableColumns = [
    ...columns,
    { key: 'action', title: '操作', width: 100, align: 'center' as const, render: (_: unknown, record: any) => <Button type="link" size="small" style={{ color: '#1677ff' }} onClick={() => toggleRowExpand(record._key)}>查看详情</Button> },
  ];

  return (
    <PortalLayout groups={adminGroups} activePath="/admin/service-dir" portalType="admin">
      <Typography.Title level={4}>服务管理目录</Typography.Title>
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
        columns={tableColumns}
        dataSource={filteredData.map((d, i) => ({ ...d, _key: i }))}
        rowKey="_key"
        pagination={{ pageSize: 10, showSizeChanger: true, showTotal: (t) => `共 ${t} 条` }}
        bordered
        size="middle"
        expandable={{ expandedRowKeys, onExpandedRowsChange: (keys) => setExpandedRowKeys(keys as React.Key[]) }}
        expandedRowRender={expandedRowRender}
        onRow={(record) => ({ onClick: () => toggleRowExpand(record._key), style: { cursor: 'pointer' } })}
      />
    </PortalLayout>
  );
}
