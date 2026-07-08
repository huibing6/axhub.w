/**
 * @name 信息复核
 */
import { useState } from 'react';
import { theme, Typography, Card, Space, Input, Button, Table, message } from 'antd';
import PortalLayout from '../../common/portal-layout';
import { adminGroups } from '../../common/menu-data';
import { useFilterData } from '../../common/hooks';
import { ReviewModal } from '../../common/components';

const rawData = [
  { idx: 1, name: '中海油能源发展股份有限公司', type: '所属企业管理', status: '待复核', source: '公开招标采购中标', category: '新增准入供应商', time: '2025-12-19 09:15' },
  { idx: 2, name: '杰瑞石油装备技术有限公司', type: '总部管理', status: '待复核', source: '其他采购形式', category: '新增服务产品', time: '2025-12-17 15:03' },
  { idx: 3, name: '中海油能源发展股份有限公司', type: '所属企业管理', status: '待复核', source: '公开招标采购中标', category: '新增准入供应商', time: '2025-12-19 09:15' },
  { idx: 4, name: '杰瑞石油装备技术有限公司', type: '总部管理', status: '待复核', source: '其他采购形式', category: '新增服务产品', time: '2025-12-17 15:03' },
  { idx: 5, name: '中海油能源发展股份有限公司', type: '所属企业管理', status: '待复核', source: '公开招标采购中标', category: '新增准入供应商', time: '2025-12-19 09:15' },
  { idx: 6, name: '杰瑞石油装备技术有限公司', type: '总部管理', status: '待复核', source: '其他采购形式', category: '新增服务产品', time: '2025-12-17 15:03' },
];

export default function AdmissionReviewPage() {
  const { token: t } = theme.useToken();
  const [nameFilter, setNameFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [submitterFilter, setSubmitterFilter] = useState('');
  const { setFilter, filteredData } = useFilterData(rawData, [
    { key: 'name', label: '服务商名称' },
    { key: 'type', label: '服务商管理类型' },
    { key: 'submitter', label: '提交人' },
  ]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);

  const handleSearch = () => {
    setFilter('name', nameFilter);
    setFilter('type', typeFilter);
    setFilter('submitter', submitterFilter);
  };

  const handleReview = () => {
    if (selectedRowKeys.length === 0) {
      message.warning('请先选择要复核的服务商');
      return;
    }
    setReviewModalOpen(true);
  };

  const handleReviewOk = (_opinion: string, _approved: boolean) => {
    message.success('复核完成');
    setReviewModalOpen(false);
    setSelectedRowKeys([]);
  };

  const columns = [
    { key: 'idx', title: '序号', width: 60, align: 'center' as const, dataIndex: 'idx' },
    { key: 'name', title: '服务商名称', width: 220, dataIndex: 'name', ellipsis: true },
    { key: 'type', title: '服务商管理类型', width: 140, dataIndex: 'type', ellipsis: true },
    { key: 'status', title: '流程状态', width: 100, dataIndex: 'status', ellipsis: true },
    { key: 'source', title: '准入来源', width: 160, dataIndex: 'source', ellipsis: true },
    { key: 'category', title: '准入类别', width: 140, dataIndex: 'category', ellipsis: true },
    { key: 'time', title: '提交时间', width: 160, dataIndex: 'time', ellipsis: true },
  ];

  return (
    <PortalLayout groups={adminGroups} activePath="/admin/info-review" portalType="admin">
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
                <Button onClick={handleReview}>复核</Button>
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
        rowSelection={{
          selectedRowKeys,
          onChange: setSelectedRowKeys,
        }}
      />
      <ReviewModal
        open={reviewModalOpen}
        title="信息复核"
        onOk={handleReviewOk}
        onCancel={() => setReviewModalOpen(false)}
      />
    </PortalLayout>
  );
}
