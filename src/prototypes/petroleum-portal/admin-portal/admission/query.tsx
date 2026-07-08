/**
 * @name 信息查询
 */
import { useState } from 'react';
import { theme, Typography, Card, Space, Input, Button, Table, message } from 'antd';
import PortalLayout from '../../common/portal-layout';
import { adminGroups } from '../../common/menu-data';
import { useFilterData } from '../../common/hooks';

const rawData = [
  { idx: 1, name: '中海油能源发展股份有限公司', code: '91440300MA5F1234AB', type: '所属企业管理', status: '待提交', source: '', category: '', time: '2025-12-19 09:15' },
  { idx: 2, name: '杰瑞石油装备技术有限公司', code: '913706005971234523', type: '总部管理', status: '待复核', source: '', category: '', time: '2025-12-17 15:03' },
  { idx: 3, name: '中海油能源发展股份有限公司', code: '91440300MA5F1234AB', type: '', status: '已完成', source: '', category: '', time: '2025-12-19 09:15' },
  { idx: 4, name: '杰瑞石油装备技术有限公司', code: '913706005971234523', type: '', status: '已退回', source: '', category: '', time: '2025-12-17 15:03' },
  { idx: 5, name: '中海油能源发展股份有限公司', code: '91440300MA5F1234AB', type: '', status: '已拒绝', source: '', category: '', time: '2025-12-19 09:15' },
  { idx: 6, name: '杰瑞石油装备技术有限公司', code: '913706005971234523', type: '', status: '已终止', source: '', category: '', time: '2025-12-17 15:03' },
];

export default function QueryPage() {
  const { token: t } = theme.useToken();
  const [nameFilter, setNameFilter] = useState('');
  const [codeFilter, setCodeFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const { setFilter, filteredData } = useFilterData(rawData, [
    { key: 'name', label: '服务商名称' },
    { key: 'code', label: '统一社会信用代码' },
    { key: 'status', label: '审批状态' },
  ]);
  const handleSearch = () => {
    setFilter('name', nameFilter);
    setFilter('code', codeFilter);
    setFilter('status', statusFilter);
  };

  const columns = [
    { key: 'idx', title: '序号', width: 60, align: 'center' as const, dataIndex: 'idx' },
    { key: 'name', title: '服务商名称', width: 220, dataIndex: 'name', ellipsis: true },
    { key: 'code', title: '统一社会信用代码', width: 200, dataIndex: 'code', ellipsis: true },
    { key: 'type', title: '服务商管理类型', width: 130, dataIndex: 'type', ellipsis: true },
    { key: 'status', title: '流程状态', width: 100, dataIndex: 'status', ellipsis: true },
    { key: 'source', title: '准入来源', width: 140, dataIndex: 'source', ellipsis: true },
    { key: 'category', title: '准入类别', width: 130, dataIndex: 'category', ellipsis: true },
    { key: 'time', title: '提交时间', width: 140, dataIndex: 'time', ellipsis: true },
  ];

  return (
    <PortalLayout groups={adminGroups} activePath="/admin/info-query" portalType="admin">
      <Card size="small" variant="outlined" style={{ marginBottom: 16 }}>
        <Space direction="vertical" style={{ width: '100%' }} size={8}>
          <Typography.Text type="secondary">
            <Typography.Text style={{ color: t.colorPrimary }}>注册服务商审核</Typography.Text>
          </Typography.Text>
          <Typography.Title level={4} style={{ margin: 0 }}>服务商信息编辑</Typography.Title>
          <Card size="small" variant="outlined" style={{ marginBottom: 0 }}>
            <Space direction="vertical" style={{ width: '100%' }} size={12}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 12 }}>
                <Space size={8}>
                  <Typography.Text style={{ whiteSpace: 'nowrap' }}>服务商名称</Typography.Text>
                  <Input placeholder="请输入服务商名称" style={{ width: 200 }} value={nameFilter} onChange={e => setNameFilter(e.target.value)} />
                </Space>
                <Space size={8}>
                  <Typography.Text style={{ whiteSpace: 'nowrap' }}>统一社会信用代码</Typography.Text>
                  <Input placeholder="请输入信用代码" style={{ width: 200 }} value={codeFilter} onChange={e => setCodeFilter(e.target.value)} />
                </Space>
                <Space size={8}>
                  <Typography.Text style={{ whiteSpace: 'nowrap' }}>审批状态</Typography.Text>
                  <Input placeholder="请输入审批状态" style={{ width: 200 }} value={statusFilter} onChange={e => setStatusFilter(e.target.value)} />
                </Space>
              </div>
              <Space size={12}>
                <Button type="primary" onClick={handleSearch}>查询</Button>
              </Space>
            </Space>
          </Card>
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
      <Card size="small" style={{ marginTop: 16, background: '#F0F7FF', border: '1px solid #D6E4FF' }}>
        <Typography.Text strong>MDG同步中</Typography.Text>
      </Card>
    </PortalLayout>
  );
}
