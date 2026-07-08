/**
 * @name 信息查询
 */
import { useState } from 'react';
import { theme, Typography, Card, Space, Input, Button, Table, Tag, Modal, message } from 'antd';
import PortalLayout from '../../common/portal-layout';
import { adminGroups } from '../../common/menu-data';
import { useFilterData } from '../../common/hooks';

const rawData = [
  { idx: 1, name: '中海油能源发展股份有限公司', code: '91440300MA5F1234AB', type: '所属企业管理', status: '待提交', source: '公开招标采购中标', category: '新增准入供应商', time: '2025-12-19 09:15', submitter: '张三', editor: '张三', dataSource: '准入信息管理', workCode: '', workType: '' },
  { idx: 2, name: '杰瑞石油装备技术有限公司', code: '913706005971234523', type: '总部管理', status: '待复核', source: '其他采购形式', category: '新增服务产品', time: '2025-12-17 15:03', submitter: '李四', editor: '李四', dataSource: '自助服务管理', workCode: '', workType: '' },
  { idx: 3, name: '中海油能源发展股份有限公司', code: '91440300MA5F1234AB', type: '所属企业管理', status: '已完成', source: '公开招标采购中标', category: '新增准入供应商', time: '2025-12-19 09:15', submitter: '张三', editor: '张三', dataSource: '准入信息管理', workCode: '', workType: '' },
  { idx: 4, name: '杰瑞石油装备技术有限公司', code: '913706005971234523', type: '总部管理', status: '已退回', source: '其他采购形式', category: '新增服务产品', time: '2025-12-17 15:03', submitter: '李四', editor: '李四', dataSource: '自助服务管理', workCode: '', workType: '' },
  { idx: 5, name: '中海油能源发展股份有限公司', code: '91440300MA5F1234AB', type: '', status: '已拒绝', source: '', category: '', time: '2025-12-19 09:15', submitter: '张三', editor: '张三', dataSource: '', workCode: '', workType: '' },
  { idx: 6, name: '杰瑞石油装备技术有限公司', code: '913706005971234523', type: '', status: '已终止', source: '', category: '', time: '2025-12-17 15:03', submitter: '李四', editor: '李四', dataSource: '', workCode: '', workType: '' },
];

const statusColors: Record<string, string> = {
  '待提交': 'default',
  '待复核': 'processing',
  '已完成': 'success',
  '已退回': 'warning',
  '已拒绝': 'error',
  '已终止': 'default',
};

const progressData = [
  { step: '第1步', unit: '服务商', unitColor: '#1677ff', status: '已提交', handler: '张明远', submitTime: '2025-12-19 09:15', finishTime: '2025-12-19 09:15', approved: '—', opinion: '—' },
  { step: '第2步', unit: '管理单位', unitColor: '#1677ff', status: '待复核', handler: '王建国', submitTime: '—', finishTime: '—', approved: '—', opinion: '—' },
];

const progressColumns = [
  { key: 'step', title: '步骤', width: 80, dataIndex: 'step' },
  { key: 'unit', title: '受理单位', width: 100, dataIndex: 'unit', render: (v: string, r: any) => <Typography.Link style={{ color: r.unitColor }}>{v}</Typography.Link> },
  { key: 'status', title: '状态', width: 90, dataIndex: 'status' },
  { key: 'handler', title: '受理人', width: 90, dataIndex: 'handler' },
  { key: 'submitTime', title: '受理时间', width: 150, dataIndex: 'submitTime' },
  { key: 'finishTime', title: '完成时间', width: 150, dataIndex: 'finishTime' },
  { key: 'approved', title: '审批是否通过', width: 120, dataIndex: 'approved' },
  { key: 'opinion', title: '处理意见', width: 120, dataIndex: 'opinion' },
];

export default function QueryPage() {
  const { token: t } = theme.useToken();
  const [nameFilter, setNameFilter] = useState('');
  const [codeFilter, setCodeFilter] = useState('');
  const [timeFilter, setTimeFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [progressModalOpen, setProgressModalOpen] = useState(false);
  const { setFilter, filteredData, clearFilters } = useFilterData(rawData, [
    { key: 'name', label: '服务商名称' },
    { key: 'code', label: '统一社会信用代码' },
    { key: 'time', label: '提交时间' },
    { key: 'status', label: '审批状态' },
  ]);

  const handleSearch = () => {
    setFilter('name', nameFilter);
    setFilter('code', codeFilter);
    setFilter('time', timeFilter);
    setFilter('status', statusFilter);
  };

  const handleReset = () => {
    setNameFilter('');
    setCodeFilter('');
    setTimeFilter('');
    setStatusFilter('');
    clearFilters();
  };

  const columns = [
    { key: 'idx', title: '序号', width: 50, align: 'center' as const, dataIndex: 'idx' },
    { key: 'name', title: '服务商名称', width: 160, dataIndex: 'name', ellipsis: true },
    { key: 'code', title: '统一社会信用代码', width: 170, dataIndex: 'code', ellipsis: true },
    { key: 'type', title: '服务商管理类型', width: 110, dataIndex: 'type', ellipsis: true },
    {
      key: 'status', title: '流程状态', width: 80, align: 'center' as const, dataIndex: 'status',
      render: (val: string) => val ? <Tag color={statusColors[val] || 'default'}>{val}</Tag> : '—',
    },
    { key: 'source', title: '准入来源', width: 140, dataIndex: 'source', ellipsis: true },
    { key: 'category', title: '准入类别', width: 120, dataIndex: 'category', ellipsis: true },
    { key: 'time', title: '提交时间', width: 130, dataIndex: 'time' },
    { key: 'submitter', title: '提交人', width: 70, dataIndex: 'submitter' },
    { key: 'editor', title: '编辑人', width: 70, dataIndex: 'editor' },
    { key: 'dataSource', title: '数据来源', width: 110, dataIndex: 'dataSource', ellipsis: true },
    { key: 'workCode', title: '工作单编号', width: 100, dataIndex: 'workCode', ellipsis: true },
    { key: 'workType', title: '工作单类型', width: 130, dataIndex: 'workType', ellipsis: true },
    {
      key: 'action',
      title: '操作',
      width: 120,
      align: 'center' as const,
      render: () => (
        <Space size={2}>
          <Typography.Link style={{ fontSize: 13, color: '#1677ff' }} onClick={() => window.location.hash = '#/admin/info-edit-detail'}>查看</Typography.Link>
          <Typography.Text type="secondary">、</Typography.Text>
          <Typography.Link style={{ fontSize: 13, color: '#1677ff' }} onClick={() => setProgressModalOpen(true)}>进度查询</Typography.Link>
        </Space>
      ),
    },
  ];

  return (
    <PortalLayout groups={adminGroups} activePath="/admin/info-query" portalType="admin">
      <Card size="small" variant="outlined" style={{ marginBottom: 16 }}>
        <Space direction="vertical" style={{ width: '100%' }} size={8}>
          <Typography.Text style={{ color: t.colorPrimary }}>注册服务商审核</Typography.Text>
          <Typography.Title level={4} style={{ margin: 0 }}>服务商信息编辑</Typography.Title>
          <Card size="small" variant="outlined" style={{ marginBottom: 0 }}>
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
                  <Input placeholder="请选择日期" value={timeFilter} onChange={e => setTimeFilter(e.target.value)} />
                </div>
                <Space>
                  <Button type="primary" danger onClick={handleSearch}>查询</Button>
                  <Button onClick={handleReset}>重置</Button>
                </Space>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr) auto', gap: 12, alignItems: 'end' }}>
                <div>
                  <Typography.Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 4 }}>审批状态</Typography.Text>
                  <Input placeholder="请输入审批状态" value={statusFilter} onChange={e => setStatusFilter(e.target.value)} />
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

      <Modal
        title="进度流程查询信息框"
        open={progressModalOpen}
        onCancel={() => setProgressModalOpen(false)}
        footer={<Button type="primary" danger onClick={() => setProgressModalOpen(false)}>关闭</Button>}
        width={900}
        destroyOnClose
      >
        <Table
          columns={progressColumns}
          dataSource={progressData}
          rowKey="step"
          pagination={false}
          bordered
          size="small"
          style={{ marginTop: 16 }}
        />
      </Modal>
    </PortalLayout>
  );
}
