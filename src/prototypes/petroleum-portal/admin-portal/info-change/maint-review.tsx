/**
 * @name 维护复核
 */
import { useState } from 'react';
import { theme, Typography, Card, Space, Input, Button, Table, Tabs, message } from 'antd';
import PortalLayout from '../../common/portal-layout';
import { adminGroups } from '../../common/menu-data';
import { useFilterData } from '../../common/hooks';
import { ReviewModal } from '../../common/components';

const tabItems = [
  { key: 'info', label: '服务商信息复核' },
  { key: 'catalog', label: '服务目录复核' },
];

const columns = [
  { key: 'index', title: '序号', width: 60, align: 'center' as const, dataIndex: 'index' },
  { key: 'code', title: '服务商编码', width: 120, dataIndex: 'code', ellipsis: true },
  { key: 'name', title: '服务商名称', width: 200, dataIndex: 'name', ellipsis: true },
  { key: 'mgmtType', title: '服务商管理类型', width: 120, dataIndex: 'mgmtType', ellipsis: true },
  { key: 'flowStatus', title: '流程状态', width: 100, dataIndex: 'flowStatus', ellipsis: true },
  { key: 'changeType', title: '变更类型', width: 120, dataIndex: 'changeType', ellipsis: true },
  { key: 'dataSource', title: '数据来源', width: 120, dataIndex: 'dataSource', ellipsis: true },
];

const tableData = [
  { index: '1', code: '1000020022', name: '中海油能源发展股份有限公司', mgmtType: '所属企业管理', flowStatus: '待复核', changeType: '非更名的重要信息变更', dataSource: '准入信息管' },
  { index: '2', code: '1000020022', name: '杰瑞石油装备技术有限公司', mgmtType: '总部管理', flowStatus: '待复核', changeType: '更名', dataSource: '自助服务管' },
  { index: '3', code: '1000020022', name: '中海油能源发展股份有限公司', mgmtType: '所属企业管理', flowStatus: '待复核', changeType: '一般信息变更', dataSource: '准入信息管' },
  { index: '4', code: '1000020022', name: '杰瑞石油装备技术有限公司', mgmtType: '总部管理', flowStatus: '待复核', changeType: '自助维护资质', dataSource: '自助服务管' },
  { index: '5', code: '1000020022', name: '中海油能源发展股份有限公司', mgmtType: '', flowStatus: '', changeType: '', dataSource: '' },
  { index: '6', code: '', name: '杰瑞石油装备技术有限公司', mgmtType: '', flowStatus: '', changeType: '', dataSource: '' },
];

const filterFields = [
  { key: 'name', label: '服务商名称' },
  { key: 'mgmtType', label: '服务商管理类型' },
  { key: 'submitter', label: '提交人' },
];

export default function MaintReview() {
  const [activeTab, setActiveTab] = useState('info');
  const [searchValues, setSearchValues] = useState<Record<string, string>>({});
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [reviewOpen, setReviewOpen] = useState(false);
  const { setFilter, filteredData } = useFilterData(tableData, filterFields);

  return (
    <PortalLayout groups={adminGroups} activePath="/admin/maint-review" portalType="admin">
      <Typography.Text type="secondary" style={{ display: 'block', marginBottom: 8 }}>
        <Typography.Text style={{ color: theme.useToken().token.colorPrimary }}>注册服务商审核</Typography.Text>
      </Typography.Text>
      <Typography.Title level={4}>维护复核</Typography.Title>
      <Tabs activeKey={activeTab} onChange={setActiveTab} items={tabItems} />
      <Card size="small" variant="outlined" style={{ marginBottom: 16 }}>
        <Space direction="vertical" style={{ width: '100%' }} size={12}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 12 }}>
            {filterFields.map((f, i) => (
              <Space key={i} size={8}>
                <Typography.Text style={{ whiteSpace: 'nowrap' }}>{f.label}</Typography.Text>
                <Input placeholder="请输入" style={{ width: 200 }} value={searchValues[f.key] || ''} onChange={e => setSearchValues(prev => ({ ...prev, [f.key]: e.target.value }))} />
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
        dataSource={filteredData.map((d, i) => ({ ...d, _key: i }))}
        rowKey="_key"
        pagination={false}
        bordered
        size="middle"
        rowSelection={{ selectedRowKeys, onChange: setSelectedRowKeys }}
      />
      <ReviewModal open={reviewOpen} title="复核" onOk={(opinion, approved) => { message.success('复核完成'); setReviewOpen(false); }} onCancel={() => setReviewOpen(false)} />
    </PortalLayout>
  );
}
