/**
 * @name 待更新MDG
 * 信息变更 → 待更新MDG，列表+查看跳转详情
 */
import React from 'react';
import { useState } from 'react';
import { theme, Typography, Card, Space, Input, Select, Button, Table, Tag, message } from 'antd';
import { useFilterData } from '../common/hooks';

const rawData = [
  { idx: 1, spCode: '10000100', name: '中海油能源发展股份有限公司', code: '91440300MA5F1234AB', manageType: '所属企业管理', regDate: '2025-06-15', updateStatus: '待更新' },
  { idx: 2, spCode: '10000200', name: '杰瑞石油装备技术有限公司', code: '913706005971234523', manageType: '总部管理', regDate: '2025-07-20', updateStatus: '待更新' },
  { idx: 3, spCode: '10000300', name: '宝鸡石油钢管有限责任公司', code: '91610300220523456A', manageType: '所属企业管理', regDate: '2025-05-10', updateStatus: '已更新' },
  { idx: 4, spCode: '10000400', name: '山东科瑞机械制造有限公司', code: '91370500567890123B', manageType: '总部管理', regDate: '2025-08-01', updateStatus: '待更新' },
  { idx: 5, spCode: '10000500', name: '天津渤海石油装备制造有限公司', code: '91120116MA05CDEF5G', manageType: '所属企业管理', regDate: '2025-04-22', updateStatus: '已更新' },
  { idx: 6, spCode: '10000600', name: '四川宏华石油设备有限公司', code: '91510100MA6123456H', manageType: '总部管理', regDate: '2025-03-18', updateStatus: '待更新' },
  { idx: 7, spCode: '10000700', name: '河南中原测控技术有限公司', code: '91410100MA40JKLM7N', manageType: '所属企业管理', regDate: '2025-09-05', updateStatus: '已更新' },
  { idx: 8, spCode: '10000800', name: '北京石油机械有限公司', code: '91110108MA01PQRST8Q', manageType: '总部管理', regDate: '2025-02-28', updateStatus: '待更新' },
];

const statusColors: Record<string, string> = {
  '待更新': 'processing',
  '已更新': 'success',
};

export default function PendingMdgList() {
  const { token: t } = theme.useToken();
  const [nameFilter, setNameFilter] = useState('');
  const [codeFilter, setCodeFilter] = useState('');
  const [manageTypeFilter, setManageTypeFilter] = useState('');
  const [data] = useState(rawData);

  const { setFilter, filteredData, clearFilters } = useFilterData(data, [
    { key: 'name', label: '服务商名称' },
    { key: 'code', label: '统一社会信用代码' },
    { key: 'manageType', label: '服务商管理类型' },
  ]);

  const handleSearch = () => {
    setFilter('name', nameFilter);
    setFilter('code', codeFilter);
    setFilter('manageType', manageTypeFilter);
  };

  const handleReset = () => {
    setNameFilter('');
    setCodeFilter('');
    setManageTypeFilter('');
    clearFilters();
  };

  const handleViewDetail = (record: any) => {
    window.location.hash = `#/admin/pending-mdg-detail?code=${record.code}&spCode=${record.spCode}`;
  };

  const columns = [
    { key: 'idx', title: '序号', width: 50, align: 'center' as const, dataIndex: 'idx' },
    { key: 'spCode', title: '服务商编码', width: 100, dataIndex: 'spCode', ellipsis: true },
    { key: 'name', title: '服务商名称', width: 220, dataIndex: 'name', ellipsis: true },
    { key: 'code', title: '统一社会信用代码', width: 200, dataIndex: 'code', ellipsis: true },
    {
      key: 'manageType', title: '服务商管理类型', width: 130, dataIndex: 'manageType',
      render: (v: string) => <Tag color={v === '总部管理' ? 'blue' : 'default'}>{v}</Tag>,
    },
    { key: 'regDate', title: '注册日期', width: 110, dataIndex: 'regDate' },
    {
      key: 'updateStatus', title: '更新状态', width: 90, align: 'center' as const, dataIndex: 'updateStatus',
      render: (v: string) => <Tag color={statusColors[v] || 'default'}>{v}</Tag>,
    },
    {
      key: 'action', title: '操作', width: 200, align: 'center' as const,
      render: (_: unknown, record: any) => (
        <Space size={4}>
          <Typography.Link style={{ fontSize: 13, color: '#ff4d4f' }} onClick={() => handleViewDetail(record)}>查看</Typography.Link>
          <Typography.Text type="secondary">|</Typography.Text>
          <Typography.Link style={{ fontSize: 13, color: '#ff4d4f' }} onClick={() => window.location.hash = '#/admin/pending-mdg'}>更新MDG</Typography.Link>
          <Typography.Text type="secondary">|</Typography.Text>
          <Typography.Link style={{ fontSize: 13, color: '#ff4d4f' }} onClick={() => message.success('通知已发送')}>发送通知</Typography.Link>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Card size="small" variant="outlined" style={{ marginBottom: 16 }}>
        <Space direction="vertical" style={{ width: '100%' }} size={8}>
          <Typography.Title level={4} style={{ margin: 0 }}>待更新MDG</Typography.Title>
          <Card size="small" variant="outlined" style={{ marginBottom: 0 }}>
            <Space direction="vertical" style={{ width: '100%' }} size={12}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr) 160px auto', gap: 12, alignItems: 'end' }}>
                <div>
                  <Typography.Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 4 }}>服务商名称</Typography.Text>
                  <Input placeholder="请输入服务商名称" value={nameFilter} onChange={e => setNameFilter(e.target.value)} />
                </div>
                <div>
                  <Typography.Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 4 }}>统一社会信用代码</Typography.Text>
                  <Input placeholder="请输入信用代码" value={codeFilter} onChange={e => setCodeFilter(e.target.value)} />
                </div>
                <div>
                  <Typography.Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 4 }}>服务商管理类型</Typography.Text>
                  <Select placeholder="请选择" allowClear style={{ width: '100%' }} value={manageTypeFilter || undefined} onChange={v => setManageTypeFilter(v || '')} options={[{ label: '所属企业管理', value: '所属企业管理' }, { label: '总部管理', value: '总部管理' }]} />
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

      <Table
        columns={columns}
        dataSource={filteredData.map((d, i) => ({ ...d, _key: i }))}
        rowKey="_key"
        pagination={false}
        bordered
        size="middle"
        scroll={{ x: 'max-content' }}
      />
    </div>
  );
}
