/**
 * @name 服务商注册审核
 */
import { useState } from 'react';
import { theme, Typography, Card, Space, Input, Button, Table, DatePicker, Modal, message } from 'antd';
import PortalLayout from '../../common/portal-layout';
import { adminGroups } from '../../common/menu-data';
import { useFilterData } from '../../common/hooks';
import { ReviewModal } from '../../common/components';

const rawData = [
  { idx: 1, name: '中海油能源发展股份有限公司', code: '91440300MA5F1234AB', time: '2025-12-19 09:15', submitter: '张三' },
  { idx: 2, name: '杰瑞石油装备技术有限公司', code: '913706005971234523', time: '2025-12-17 15:03', submitter: '李四' },
  { idx: 3, name: '安东油田服务集团', code: '911100007561234567', time: '2025-12-16 09:30', submitter: '王磊' },
  { idx: 4, name: '海默科技（集团）股份有限公司', code: '916200007123456789', time: '2025-12-15 14:22', submitter: '赵晓峰' },
  { idx: 5, name: '新疆贝肯能源工程股份有限公司', code: '916500005671234589', time: '2025-12-14 11:08', submitter: '陈文华' },
  { idx: 6, name: '通源石油技术服务股份有限公司', code: '916100007891234523', time: '2025-12-13 16:55', submitter: '刘洋' },
];

const filterFields = [
  { key: 'name', label: '服务商名称' },
  { key: 'code', label: '统一社会信用代码' },
];

const progressData = [
  { step: '第1步', unit: '服务商', status: '已提交', handler: '张明远', submitTime: '2025-12-19 09:15', finishTime: '2025-12-19 09:15', approved: '—', opinion: '—' },
  { step: '第2步', unit: '管理单位', status: '待复核', handler: '王建国', submitTime: '—', finishTime: '—', approved: '—', opinion: '—' },
];

const progressColumns = [
  { key: 'step', title: '步骤', width: 80, dataIndex: 'step' },
  { key: 'unit', title: '受理单位', width: 100, dataIndex: 'unit', render: (v: string) => <Typography.Link style={{ color: '#1677ff' }}>{v}</Typography.Link> },
  { key: 'status', title: '状态', width: 90, dataIndex: 'status' },
  { key: 'handler', title: '受理人', width: 90, dataIndex: 'handler' },
  { key: 'submitTime', title: '受理时间', width: 150, dataIndex: 'submitTime' },
  { key: 'finishTime', title: '完成时间', width: 150, dataIndex: 'finishTime' },
  { key: 'approved', title: '审批是否通过', width: 120, dataIndex: 'approved' },
  { key: 'opinion', title: '处理意见', width: 120, dataIndex: 'opinion' },
];

export default function ReviewPage() {
  const { token: t } = theme.useToken();
  const [nameFilter, setNameFilter] = useState('');
  const [codeFilter, setCodeFilter] = useState('');
  const [dateFilter, setDateFilter] = useState<any>(null);
  const { setFilter, filteredData, clearFilters } = useFilterData(rawData, filterFields);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [progressModalOpen, setProgressModalOpen] = useState(false);

  const handleSearch = () => {
    setFilter('name', nameFilter);
    setFilter('code', codeFilter);
  };

  const handleReset = () => {
    setNameFilter('');
    setCodeFilter('');
    setDateFilter(null);
    clearFilters();
  };

  const handleBatchReview = () => {
    if (selectedRowKeys.length === 0) {
      message.warning('请先选择要审核的服务商');
      return;
    }
    setReviewModalOpen(true);
  };

  const handleReviewOk = (_opinion: string, _approved: boolean) => {
    message.success('审核完成');
    setReviewModalOpen(false);
    setSelectedRowKeys([]);
  };

  const handleRowReview = (_record: any) => {
    setReviewModalOpen(true);
  };

  const handleViewDetail = (_record: any) => {
    window.location.hash = '#/admin/reg-detail';
  };

  const handleProgressQuery = (_record: any) => {
    setProgressModalOpen(true);
  };

  const columns = [
    { key: 'idx', title: '序号', width: 60, align: 'center' as const, dataIndex: 'idx' },
    { key: 'name', title: '服务商名称', dataIndex: 'name', ellipsis: true },
    { key: 'code', title: '统一社会信用代码', width: 200, dataIndex: 'code', ellipsis: true },
    { key: 'time', title: '提交时间', width: 160, dataIndex: 'time' },
    { key: 'submitter', title: '提交人', width: 90, dataIndex: 'submitter' },
    {
      key: 'action',
      title: '操作',
      width: 220,
      align: 'center' as const,
      render: (_: unknown, record: any) => (
        <Space size={4}>
          <Typography.Link style={{ fontSize: 13, color: '#1677ff' }} onClick={(e) => { e.stopPropagation(); handleViewDetail(record); }}>查看</Typography.Link>
          <Typography.Text type="secondary">|</Typography.Text>
          <Typography.Link style={{ fontSize: 13, color: '#1677ff' }} onClick={(e) => { e.stopPropagation(); handleRowReview(record); }}>审核</Typography.Link>
          <Typography.Text type="secondary">|</Typography.Text>
          <Typography.Link style={{ fontSize: 13, color: '#1677ff' }} onClick={(e) => { e.stopPropagation(); handleProgressQuery(record); }}>进度查询</Typography.Link>
        </Space>
      ),
    },
  ];

  return (
    <PortalLayout groups={adminGroups} activePath="/admin/reg-review" portalType="admin">
      <Typography.Title level={4} style={{ marginTop: 0, marginBottom: 16 }}>注册服务商审核</Typography.Title>

      <Card size="small" variant="outlined" style={{ marginBottom: 16 }}>
        <Space direction="vertical" style={{ width: '100%' }} size={12}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr) auto', gap: 12, alignItems: 'end' }}>
            <div>
              <Typography.Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 4 }}>服务商名称</Typography.Text>
              <Input placeholder="请输入服务商名称" value={nameFilter} onChange={e => setNameFilter(e.target.value)} />
            </div>
            <div>
              <Typography.Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 4 }}>统一社会信用代码</Typography.Text>
              <Input placeholder="请输入信用代码" value={codeFilter} onChange={e => setCodeFilter(e.target.value)} />
            </div>
            <div>
              <Typography.Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 4 }}>提交时间</Typography.Text>
              <DatePicker style={{ width: '100%' }} value={dateFilter} onChange={setDateFilter} placeholder="请选择日期" />
            </div>
            <Space>
              <Button type="primary" onClick={handleSearch}>查询</Button>
              <Button onClick={handleReset}>重置</Button>
            </Space>
          </div>
        </Space>
      </Card>

      <Button type="primary" danger style={{ marginBottom: 16 }} onClick={handleBatchReview}>
        批量审核
      </Button>

      <Table
        columns={columns}
        dataSource={filteredData.map((d, i) => ({ ...d, _key: i }))}
        rowKey="_key"
        pagination={false}
        bordered
        size="middle"
        rowSelection={{
          selectedRowKeys,
          onChange: setSelectedRowKeys,
        }}
      />

      <ReviewModal
        open={reviewModalOpen}
        title="审核"
        onOk={handleReviewOk}
        onCancel={() => setReviewModalOpen(false)}
      />

      <Modal
        open={progressModalOpen}
        title="进度流程查询信息框"
        onCancel={() => setProgressModalOpen(false)}
        footer={null}
        width={900}
        destroyOnClose
      >
        <Table
          columns={progressColumns}
          dataSource={progressData}
          rowKey="step"
          pagination={false}
          bordered
          size="middle"
          style={{ marginBottom: 16 }}
        />
        <div style={{ textAlign: 'right' }}>
          <Button type="primary" danger onClick={() => setProgressModalOpen(false)}>关闭</Button>
        </div>
      </Modal>
    </PortalLayout>
  );
}
