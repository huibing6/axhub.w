/**
 * @name 复核
 */
import { useState } from 'react';
import { theme, Typography, Card, Space, Input, Select, Button, Table, Tag, message } from 'antd';
import PortalLayout from '../../common/portal-layout';
import { adminGroups } from '../../common/menu-data';
import { useFilterData } from '../../common/hooks';
import { ReviewModal } from '../../common/components';

const filterFields = [
  { key: 'name', label: '服务商名称', placeholder: '请输入服务商名称' },
  { key: 'type', label: '业务类型', type: 'select' as const, options: ['全部', '准入申请', '信息变更', '资质变更', '冻结申请', '解冻申请'] },
  { key: 'status', label: '状态', type: 'select' as const, options: ['全部', '待复核', '复核通过', '复核退回'] },
];

const columns = [
  { key: 'seq', title: '序号', width: 60, align: 'center' as const, dataIndex: 'seq' },
  { key: 'code', title: '服务商编码', width: 110, dataIndex: 'code', ellipsis: true },
  { key: 'name', title: '服务商名称', dataIndex: 'name', ellipsis: true },
  { key: 'type', title: '业务类型', width: 120, dataIndex: 'type', ellipsis: true },
  { key: 'applicant', title: '申请人', width: 100, dataIndex: 'applicant', ellipsis: true },
  { key: 'submitTime', title: '提交时间', width: 140, dataIndex: 'submitTime', ellipsis: true },
  { key: 'status', title: '状态', width: 80, align: 'center' as const, dataIndex: 'status' },
  { key: 'action', title: '操作', width: 100, align: 'center' as const, dataIndex: 'action' },
];

const statusColors: Record<string, string> = {
  '待复核': 'warning',
  '复核通过': 'success',
  '复核退回': 'error',
};

function StatusTag({ status }: { status: string }) {
  return <Tag color={statusColors[status] || 'default'}>{status}</Tag>;
}

export default function Review() {
  const { token: t } = theme.useToken();
  const [searchValues, setSearchValues] = useState<Record<string, string>>({});
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [reviewOpen, setReviewOpen] = useState(false);

  const data = [
    { seq: 1, code: '1000020022', name: '中海油能源发展股份有限公司', type: '准入申请', applicant: '张三', submitTime: '2025-06-18 14:30', status: '待复核', action: <Button type="link" size="small">复核</Button> },
    { seq: 2, code: '1000020022', name: '杰瑞石油装备技术有限公司', type: '信息变更', applicant: '李四', submitTime: '2025-06-17 10:15', status: '待复核', action: <Button type="link" size="small">复核</Button> },
    { seq: 3, code: '1000020022', name: '中海油能源发展股份有限公司', type: '资质变更', applicant: '王五', submitTime: '2025-06-16 09:00', status: '复核通过', action: <Typography.Link>查看</Typography.Link> },
    { seq: 4, code: '1000020022', name: '杰瑞石油装备技术有限公司', type: '冻结申请', applicant: '赵六', submitTime: '2025-06-15 16:45', status: '复核退回', action: <Button type="link" size="small">复核</Button> },
    { seq: 5, code: '1000020022', name: '中海油能源发展股份有限公司', type: '解冻申请', applicant: '钱七', submitTime: '2025-06-14 11:20', status: '复核通过', action: <Typography.Link>查看</Typography.Link> },
    { seq: 6, code: '1000020022', name: '杰瑞石油装备技术有限公司', type: '准入申请', applicant: '孙八', submitTime: '2025-06-13 08:30', status: '待复核', action: <Button type="link" size="small">复核</Button> },
  ];

  const { setFilter, filteredData } = useFilterData(data, filterFields);

  const formattedData = filteredData.map(d => ({
    ...d,
    status: <StatusTag status={d.status as string} />,
  }));

  return (
    <PortalLayout groups={adminGroups} activePath="/admin/review" portalType="admin">
      <Typography.Title level={4}>复核</Typography.Title>
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
      <div style={{ marginBottom: 16 }}>
        <Button type="primary" disabled={selectedRowKeys.length === 0} onClick={() => setReviewOpen(true)}>复核</Button>
      </div>
      <Table
        columns={columns}
        dataSource={formattedData.map((d, i) => ({ ...d, _key: i }))}
        rowKey="_key"
        pagination={{ pageSize: 10, showSizeChanger: true, showTotal: (t) => `共 ${t} 条` }}
        bordered
        size="middle"
        rowSelection={{ selectedRowKeys, onChange: setSelectedRowKeys }}
      />
      <ReviewModal open={reviewOpen} title="复核" onOk={(opinion, approved) => { message.success('复核完成'); setReviewOpen(false); }} onCancel={() => setReviewOpen(false)} />
    </PortalLayout>
  );
}
