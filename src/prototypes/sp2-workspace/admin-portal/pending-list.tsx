/**
 * @name 待配码库
 */
import React from 'react';
import { useState } from 'react';
import { theme, Typography, Card, Space, Input, Select, Button, Table, Tag, message } from 'antd';
import { useFilterData } from '../common/hooks';

const rawData = [
  { idx: 1, name: '中海油能源发展股份有限公司', code: '91440300MA5F1234AB', regDate: '2025-06-15' },
  { idx: 2, name: '杰瑞石油装备技术有限公司', code: '913706005971234523', regDate: '2025-07-20' },
  { idx: 3, name: '宝鸡石油钢管有限责任公司', code: '91610300220523456A', regDate: '2025-05-10' },
  { idx: 4, name: '山东科瑞机械制造有限公司', code: '91370500567890123B', regDate: '2025-08-01' },
  { idx: 5, name: '天津渤海石油装备制造有限公司', code: '91120116MA05CDEF5G', regDate: '2025-04-22' },
  { idx: 6, name: '四川宏华石油设备有限公司', code: '91510100MA6123456H', regDate: '2025-03-18' },
  { idx: 7, name: '河南中原测控技术有限公司', code: '91410100MA40JKLM7N', regDate: '2025-09-05' },
  { idx: 8, name: '北京石油机械有限公司', code: '91110108MA01PQRST8Q', regDate: '2025-02-28' },
];

export default function PendingList() {
  const { token: t } = theme.useToken();
  const [nameFilter, setNameFilter] = useState('');
  const [codeFilter, setCodeFilter] = useState('');
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [data] = useState(rawData);

  const { setFilter, filteredData, clearFilters } = useFilterData(data, [
    { key: 'name', label: '服务商名称' },
    { key: 'code', label: '统一社会信用代码' },
  ]);

  const handleSearch = () => {
    setFilter('name', nameFilter);
    setFilter('code', codeFilter);
  };

  const handleReset = () => {
    setNameFilter('');
    setCodeFilter('');
    clearFilters();
  };

  const handleBatchNotify = () => {
    if (selectedRowKeys.length === 0) { message.warning('请先选择记录'); return; }
    message.info('批量发送功能开发中');
  };

  const handleViewDetail = (record: any) => {
    window.location.hash = `#/admin/pending-detail?code=${record.code}`;
  };

  const columns = [
    { key: 'idx', title: '序号', width: 50, align: 'center' as const, dataIndex: 'idx' },
    { key: 'name', title: '服务商名称', width: 220, dataIndex: 'name', ellipsis: true },
    { key: 'code', title: '统一社会信用代码', width: 200, dataIndex: 'code', ellipsis: true },
    { key: 'regDate', title: '注册日期', width: 110, dataIndex: 'regDate' },
    {
      key: 'action', title: '操作', width: 200, align: 'center' as const,
      render: (_: unknown, record: any) => (
        <Space size={4}>
          <Typography.Link style={{ fontSize: 13, color: '#ff4d4f' }} onClick={() => handleViewDetail(record)}>查看</Typography.Link>
          <Typography.Text type="secondary">|</Typography.Text>
          <Typography.Link style={{ fontSize: 13, color: '#ff4d4f' }} onClick={() => window.location.hash = '#/admin/pending-mdg'}>补充MDG</Typography.Link>
          <Typography.Text type="secondary">|</Typography.Text>
          <Typography.Link style={{ fontSize: 13, color: '#ff4d4f' }} onClick={() => window.location.hash = `#/admin/pending-notify?code=${record.code}`}>发送通知</Typography.Link>
        </Space>
      ),
    },
  ];

  const rowSelection = {
    selectedRowKeys,
    onChange: (keys: React.Key[]) => setSelectedRowKeys(keys),
  };

  return (
    <div>
      <Card size="small" variant="outlined" style={{ marginBottom: 16 }}>
        <Space direction="vertical" style={{ width: '100%' }} size={8}>
          <Typography.Text style={{ color: t.colorPrimary }}>配码管理</Typography.Text>
          <Typography.Title level={4} style={{ margin: 0 }}>待配码库</Typography.Title>
          <Card size="small" variant="outlined" style={{ marginBottom: 0 }}>
            <Space direction="vertical" style={{ width: '100%' }} size={12}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr) auto', gap: 12, alignItems: 'end' }}>
                <div>
                  <Typography.Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 4 }}>服务商名称</Typography.Text>
                  <Input placeholder="请输入服务商名称" value={nameFilter} onChange={e => setNameFilter(e.target.value)} />
                </div>
                <div>
                  <Typography.Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 4 }}>统一社会信用代码</Typography.Text>
                  <Input placeholder="请输入信用代码" value={codeFilter} onChange={e => setCodeFilter(e.target.value)} />
                </div>
                <Space>
                  <Button type="primary" danger onClick={handleSearch}>查询</Button>
                  <Button onClick={handleReset}>重置</Button>
                </Space>
              </div>
            </Space>
          </Card>
        </Space>
      </Card>

      <Card size="small" variant="outlined" style={{ marginBottom: 16 }}>
        <Space size={8}>
          <Button type="primary" danger disabled={selectedRowKeys.length === 0} onClick={handleBatchNotify}>批量发送通知</Button>
        </Space>
      </Card>

      <Table
        columns={columns}
        dataSource={filteredData.map((d, i) => ({ ...d, _key: i }))}
        rowKey="_key"
        rowSelection={rowSelection}
        pagination={false}
        bordered
        size="middle"
        scroll={{ x: 'max-content' }}
      />
    </div>
  );
}
