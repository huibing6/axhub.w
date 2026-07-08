/**
 * @name 投标服务品类审核
 */
import { useState } from 'react';
import { theme, Typography, Card, Space, Input, Select, Button, Table, Tag, message } from 'antd';
import PortalLayout from '../../common/portal-layout';
import { adminGroups } from '../../common/menu-data';
import { useFilterData } from '../../common/hooks';
import { ReviewModal } from '../../common/components';

const filterFields = [
  { key: 'name', label: '服务商名称', placeholder: '请输入服务商名称' },
  { key: 'dirName', label: '目录名称', placeholder: '请输入目录名称' },
  { key: 'status', label: '审核状态', type: 'select' as const, options: ['全部', '待审核', '审核通过', '审核驳回'] },
];

const statusColors: Record<string, string> = {
  '待审核': 'processing',
  '审核通过': 'success',
  '审核驳回': 'error',
};

const rawData = [
  { seq: 1, name: '华油技术服务有限公司', dirCode: 'S1001000', dirName: '钻采设备维保', submitTime: '2026-06-03', status: '待审核' },
  { seq: 2, name: '中盛建设集团股份有限公司', dirCode: 'S1002000', dirName: '井下作业服务', submitTime: '2026-06-03', status: '待审核' },
  { seq: 3, name: '远东能源工程技术有限公司', dirCode: 'S1003000', dirName: '地面工程建设', submitTime: '2026-06-02', status: '审核通过' },
  { seq: 4, name: '天诚油田设备制造有限公司', dirCode: 'S1004000', dirName: '信息技术服务', submitTime: '2026-06-02', status: '待审核' },
  { seq: 5, name: '恒通管道工程有限公司', dirCode: 'S1005000', dirName: '管道检测服务', submitTime: '2026-06-01', status: '审核驳回' },
  { seq: 6, name: '博瑞达石化装备有限公司', dirCode: 'S1006000', dirName: '设备租赁服务', submitTime: '2026-06-01', status: '待审核' },
];

export default function BidDirAudit() {
  const [searchValues, setSearchValues] = useState<Record<string, string>>({});
  const [expandedRowKeys, setExpandedRowKeys] = useState<React.Key[]>([]);
  const [reviewOpen, setReviewOpen] = useState(false);
  const [reviewTarget, setReviewTarget] = useState<any>(null);
  const { setFilter, filteredData } = useFilterData(rawData, filterFields);

  const toggleRowExpand = (key: React.Key) => {
    setExpandedRowKeys(prev => prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]);
  };

  const handleReview = (record: any) => {
    setReviewTarget(record);
    setReviewOpen(true);
  };

  const handleReviewOk = (opinion: string, approved: boolean) => {
    message.success(approved ? '审核通过' : '已驳回');
    setReviewOpen(false);
    setReviewTarget(null);
  };

  const columns = [
    { key: 'seq', title: '序号', width: 60, align: 'center' as const, dataIndex: 'seq' },
    { key: 'name', title: '服务商名称', dataIndex: 'name', ellipsis: true },
    { key: 'dirCode', title: '目录编码', width: 110, dataIndex: 'dirCode', ellipsis: true },
    { key: 'dirName', title: '目录名称', dataIndex: 'dirName', ellipsis: true },
    { key: 'submitTime', title: '提交时间', width: 120, dataIndex: 'submitTime' },
    {
      key: 'status', title: '审核状态', width: 100, align: 'center' as const, dataIndex: 'status',
      render: (text: string) => <Tag color={statusColors[text] || 'default'}>{text}</Tag>,
    },
    {
      key: 'action', title: '操作', width: 100, align: 'center' as const,
      render: (_: unknown, record: any) => (
        <Button type="link" size="small" style={{ color: '#1677ff' }} onClick={(e) => { e.stopPropagation(); handleReview(record); }}>
          审核
        </Button>
      ),
    },
  ];

  return (
    <PortalLayout groups={adminGroups} activePath="/admin/bid-dir-audit" portalType="admin">
      <Typography.Title level={4}>投标服务品类审核</Typography.Title>
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
        expandedRowRender={(record) => (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '8px 24px', padding: '8px 0' }}>
            {[
              { label: '服务商名称', value: record.name },
              { label: '目录编码', value: record.dirCode },
              { label: '目录名称', value: record.dirName },
              { label: '提交时间', value: record.submitTime },
              { label: '审核状态', value: record.status },
            ].map((f, i) => (
              <div key={i}>
                <Typography.Text type="secondary" style={{ fontSize: 12 }}>{f.label}</Typography.Text>
                <div style={{ fontSize: 14, marginTop: 2 }}>{f.value || '-'}</div>
              </div>
            ))}
          </div>
        )}
        onRow={(record) => ({ onClick: () => toggleRowExpand(record._key), style: { cursor: 'pointer' } })}
      />
      <ReviewModal
        open={reviewOpen}
        title={`审核 - ${reviewTarget?.dirName || ''}`}
        onOk={handleReviewOk}
        onCancel={() => { setReviewOpen(false); setReviewTarget(null); }}
      />
    </PortalLayout>
  );
}
