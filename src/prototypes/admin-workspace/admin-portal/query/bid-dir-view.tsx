/**
 * @name 投标服务品类查看
 */
import { useState } from 'react';
import { theme, Typography, Card, Space, Input, Select, Button, Table, Tag } from 'antd';
import PortalLayout from '../../common/portal-layout';
import { adminGroups } from '../../common/menu-data';
import { useFilterData } from '../../common/hooks';
import { DetailPanel } from '../../common/components';

const filterFields = [
  { key: 'name', label: '服务商名称', placeholder: '请输入服务商名称' },
  { key: 'dirName', label: '目录名称', placeholder: '请输入目录名称' },
  { key: 'status', label: '目录状态', type: 'select' as const, options: ['全部', '启用', '停用'] },
];

const statusColors: Record<string, string> = {
  '启用': 'success',
  '停用': 'default',
};

const rawData = [
  { seq: 1, name: '华油技术服务有限公司', dirCode: 'S1001000', dirName: '钻采设备维保', level: '一级', type: '专业', status: '启用' },
  { seq: 2, name: '中盛建设集团股份有限公司', dirCode: 'S1002000', dirName: '井下作业服务', level: '二级', type: '通用', status: '启用' },
  { seq: 3, name: '远东能源工程技术有限公司', dirCode: 'S1003000', dirName: '地面工程建设', level: '一级', type: '专业', status: '停用' },
  { seq: 4, name: '天诚油田设备制造有限公司', dirCode: 'S1004000', dirName: '信息技术服务', level: '三级', type: '专业', status: '启用' },
  { seq: 5, name: '恒通管道工程有限公司', dirCode: 'S1005000', dirName: '管道检测服务', level: '二级', type: '通用', status: '启用' },
  { seq: 6, name: '博瑞达石化装备有限公司', dirCode: 'S1006000', dirName: '设备租赁服务', level: '一级', type: '专业', status: '停用' },
];

export default function BidDirView() {
  const [searchValues, setSearchValues] = useState<Record<string, string>>({});
  const [expandedRowKeys, setExpandedRowKeys] = useState<React.Key[]>([]);
  const { setFilter, filteredData } = useFilterData(rawData, filterFields);

  const toggleRowExpand = (key: React.Key) => {
    setExpandedRowKeys(prev => prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]);
  };

  const columns = [
    { key: 'seq', title: '序号', width: 60, align: 'center' as const, dataIndex: 'seq' },
    { key: 'name', title: '服务商名称', dataIndex: 'name', ellipsis: true },
    { key: 'dirCode', title: '目录编码', width: 110, dataIndex: 'dirCode', ellipsis: true },
    { key: 'dirName', title: '目录名称', dataIndex: 'dirName', ellipsis: true },
    { key: 'level', title: '级别', width: 70, align: 'center' as const, dataIndex: 'level' },
    { key: 'type', title: '目录类型', width: 90, align: 'center' as const, dataIndex: 'type' },
    {
      key: 'status', title: '状态', width: 80, align: 'center' as const, dataIndex: 'status',
      render: (text: string) => <Tag color={statusColors[text] || 'default'}>{text}</Tag>,
    },
    {
      key: 'action', title: '操作', width: 100, align: 'center' as const,
      render: (_: unknown, record: any) => (
        <Button type="link" size="small" style={{ color: '#1677ff' }} onClick={(e) => { e.stopPropagation(); toggleRowExpand(record._key); }}>
          查看详情
        </Button>
      ),
    },
  ];

  return (
    <PortalLayout groups={adminGroups} activePath="/admin/bid-dir-view" portalType="admin">
      <Typography.Title level={4}>投标服务品类查看</Typography.Title>
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
        expandable={{
          expandedRowKeys,
          onExpandedRowsChange: (keys) => setExpandedRowKeys(keys as React.Key[]),
        }}
        expandedRowRender={(record) => {
          const fields = [
            { label: '服务商名称', value: record.name },
            { label: '目录编码', value: record.dirCode },
            { label: '目录名称', value: record.dirName },
            { label: '级别', value: record.level },
            { label: '目录类型', value: record.type },
            { label: '状态', value: record.status },
          ];
          return <DetailPanel title="目录详情" fields={fields} onClose={() => toggleRowExpand(record._key)} />;
        }}
        onRow={(record) => ({ onClick: () => toggleRowExpand(record._key), style: { cursor: 'pointer' } })}
      />
    </PortalLayout>
  );
}
