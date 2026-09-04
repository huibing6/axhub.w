/**
 * @name 配码编辑
 */
import React from 'react';
import { useState } from 'react';
import { theme, Typography, Card, Space, Input, Button, Table, Tag, message } from 'antd';
import { useFilterData } from '../common/hooks';

const rawData = [
  { idx: 1, name: '中海油能源发展股份有限公司', type: '所属企业管理', status: '待提交', source: '公开招标采购中标', time: '2025-12-19 09:15', submitter: '张三', editor: '张三', dataSource: '信息管理', code: '91440300MA5F1234AB' },
  { idx: 2, name: '杰瑞石油装备技术有限公司', type: '总部管理', status: '待提交', source: '其他公开方式', time: '2025-12-17 15:03', submitter: '李四', editor: '李四', dataSource: '自助服务管理', code: '913706005971234523' },
  { idx: 3, name: '中海油能源发展股份有限公司', type: '所属企业管理', status: '已拒绝', source: '公开招标采购中标', time: '2025-12-19 09:15', submitter: '张三', editor: '张三', dataSource: '信息管理', code: '91440300MA5F1234AB' },
  { idx: 4, name: '杰瑞石油装备技术有限公司', type: '总部管理', status: '已拒绝', source: '其他公开方式', time: '2025-12-17 15:03', submitter: '李四', editor: '李四', dataSource: '自助服务管理', code: '913706005971234523' },
  { idx: 5, name: '中海油能源发展股份有限公司', type: '', status: '', source: '', time: '2025-12-19 09:15', submitter: '张三', editor: '张三', dataSource: '', code: '' },
  { idx: 6, name: '杰瑞石油装备技术有限公司', type: '', status: '', source: '', time: '2025-12-17 15:03', submitter: '李四', editor: '李四', dataSource: '', code: '' },
];

const statusColors: Record<string, string> = {
  '待提交': 'default',
  '已拒绝': 'error',
  '已提交': 'processing',
  '已完成': 'success',
};

export default function InfoEdit() {
  const { token: t } = theme.useToken();
  const [nameFilter, setNameFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [submitterFilter, setSubmitterFilter] = useState('');
  const { setFilter, filteredData, clearFilters } = useFilterData(rawData, [
    { key: 'name', label: '服务商名称' },
    { key: 'status', label: '流程状态' },
    { key: 'submitter', label: '提交人' },
  ]);

  const handleSearch = () => {
    setFilter('name', nameFilter);
    setFilter('status', statusFilter);
    setFilter('submitter', submitterFilter);
  };

  const handleReset = () => {
    setNameFilter('');
    setStatusFilter('');
    setSubmitterFilter('');
    clearFilters();
  };

  const handleEdit = (record: any) => {
    window.location.hash = `#/admin/info-edit-detail?code=${record.code || ''}`;
  };

  const columns = [
    { key: 'idx', title: '序号', width: 50, align: 'center' as const, dataIndex: 'idx' },
    { key: 'name', title: '服务商名称', width: 200, dataIndex: 'name', ellipsis: true },
    {
      key: 'status', title: '流程状态', width: 80, align: 'center' as const, dataIndex: 'status',
      render: (val: string) => val ? <Tag color={statusColors[val] || 'default'}>{val}</Tag> : '—',
    },
    { key: 'source', title: '来源', width: 140, dataIndex: 'source', ellipsis: true },
    { key: 'time', title: '提交时间', width: 150, dataIndex: 'time' },
    { key: 'submitter', title: '提交人', width: 80, dataIndex: 'submitter' },
    { key: 'editor', title: '编辑人', width: 80, dataIndex: 'editor' },
    { key: 'dataSource', title: '数据来源', width: 120, dataIndex: 'dataSource', ellipsis: true },
    {
      key: 'action',
      title: '操作',
      width: 160,
      align: 'center' as const,
      render: (_: unknown, record: any) => {
        const isReject = record.status === '已拒绝';
        return (
          <Space size={2} wrap>
            <Typography.Link style={{ fontSize: 13, color: '#ff4d4f' }} onClick={() => handleEdit(record)}>编辑</Typography.Link>
            {isReject ? (
              <>
                <Typography.Text type="secondary">、</Typography.Text>
                <Typography.Link style={{ fontSize: 13, color: '#ff4d4f' }}>退回</Typography.Link>
              </>
            ) : (
              <>
                <Typography.Text type="secondary">、</Typography.Text>
                <Typography.Link style={{ fontSize: 13, color: '#ff4d4f' }}>删除</Typography.Link>
                <Typography.Text type="secondary">、</Typography.Text>
                <Typography.Link style={{ fontSize: 13, color: '#ff4d4f' }}>终止</Typography.Link>
              </>
            )}
          </Space>
        );
      },
    },
  ];

  return (
    <div>
      <Card size="small" variant="outlined" style={{ marginBottom: 16 }}>
        <Space direction="vertical" style={{ width: '100%' }} size={8}>
          <Typography.Title level={4} style={{ margin: 0 }}>配码编辑</Typography.Title>
          <Card size="small" variant="outlined" style={{ marginBottom: 0 }}>
            <Space direction="vertical" style={{ width: '100%' }} size={12}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr) auto', gap: 12, alignItems: 'end' }}>
                <div>
                  <Typography.Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 4 }}>服务商名称</Typography.Text>
                  <Input placeholder="请输入服务商名称" value={nameFilter} onChange={e => setNameFilter(e.target.value)} />
                </div>
                <div>
                  <Typography.Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 4 }}>流程状态</Typography.Text>
                  <Input placeholder="请输入流程状态" value={statusFilter} onChange={e => setStatusFilter(e.target.value)} />
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
