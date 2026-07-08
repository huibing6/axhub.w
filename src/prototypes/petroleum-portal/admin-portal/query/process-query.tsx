/**
 * @name 流程查询
 */
import { useState } from 'react';
import { theme, Typography, Card, Space, Input, Select, Button, Table, Tabs, Tag } from 'antd';
import PortalLayout from '../../common/portal-layout';
import { adminGroups } from '../../common/menu-data';
import { useFilterData } from '../../common/hooks';

const tabItems = [
  { key: 'sp', label: '服务商流程' },
  { key: 'cat', label: '服务品类流程' },
];

const columns = [
  { key: 'seq', title: '序号', width: 60, align: 'center' as const, dataIndex: 'seq' },
  { key: 'code', title: '服务商编码', width: 110, dataIndex: 'code', ellipsis: true },
  { key: 'name', title: '服务商名称', dataIndex: 'name', ellipsis: true },
  { key: 'mgmtType', title: '服务商管理类型', width: 120, dataIndex: 'mgmtType', ellipsis: true },
  { key: 'unit', title: '管理单位', dataIndex: 'unit', ellipsis: true },
  { key: 'status', title: '服务商状态', width: 100, align: 'center' as const, dataIndex: 'status' },
  { key: 'flow', title: '流程', width: 120, dataIndex: 'flow', ellipsis: true },
];

const statusColors: Record<string, string> = {
  '正常': 'success',
  '暂停': 'warning',
  '取消': 'default',
};

function StatusTag({ status }: { status: string }) {
  return <Tag color={statusColors[status] || 'default'}>{status}</Tag>;
}

const spData = [
  { seq: 1, code: '1000020022', name: '中海油能源发展股份有限公司', mgmtType: '所属企业管理', unit: '长庆油田', status: '正常', flow: '注册流程' },
  { seq: 2, code: '1000020022', name: '杰瑞石油装备技术有限公司', mgmtType: '总部管理', unit: '', status: '暂停', flow: '准入流程' },
  { seq: 3, code: '1000020022', name: '中海油能源发展股份有限公司', mgmtType: '所属企业管理', unit: '', status: '取消', flow: '服务商信息变更流程' },
  { seq: 4, code: '1000020022', name: '杰瑞石油装备技术有限公司', mgmtType: '总部管理', unit: '', status: '', flow: '资质变更流程' },
  { seq: 5, code: '1000020022', name: '中海油能源发展股份有限公司', mgmtType: '', unit: '', status: '', flow: '冻结流程' },
  { seq: 6, code: '', name: '杰瑞石油装备技术有限公司', mgmtType: '', unit: '', status: '', flow: '解冻流程' },
];

const catData = [
  { seq: 1, code: 'GC', name: '工程技术服务', mgmtType: '通用', unit: '总部', status: '正常', flow: '品类注册流程' },
  { seq: 2, code: 'GC-ZJ', name: '钻井工程', mgmtType: '专业', unit: '勘探开发', status: '正常', flow: '品类准入流程' },
  { seq: 3, code: 'GC-CY', name: '采油工程', mgmtType: '专业', unit: '勘探开发', status: '暂停', flow: '品类变更流程' },
  { seq: 4, code: 'DM', name: '地面建设服务', mgmtType: '通用', unit: '工程管理', status: '正常', flow: '品类注册流程' },
  { seq: 5, code: 'DM-GD', name: '管道工程', mgmtType: '专业', unit: '管道工程', status: '', flow: '品类准入流程' },
  { seq: 6, code: 'DM-EL', name: '电力工程', mgmtType: '专业', unit: '', status: '', flow: '品类变更流程' },
];

const filterFields = [
  { key: 'name', label: '服务商名称', placeholder: '请输入服务商名称' },
  { key: 'mgmtType', label: '服务商管理类型', type: 'select' as const, options: ['全部', '所属企业管理', '总部管理', '通用', '专业'] },
  { key: 'submitter', label: '提交人', placeholder: '请输入提交人' },
];

export default function ProcessQuery() {
  const [activeTab, setActiveTab] = useState('sp');
  const [searchValues, setSearchValues] = useState<Record<string, string>>({});
  const currentData = activeTab === 'sp' ? spData : catData;
  const { setFilter, filteredData } = useFilterData(currentData, filterFields);

  const formattedData = filteredData.map(d => ({
    ...d,
    status: d.status ? <StatusTag status={d.status as string} /> : '',
  }));

  return (
    <PortalLayout groups={adminGroups} activePath="/admin/process-query" portalType="admin">
      <Typography.Title level={4}>流程查询</Typography.Title>
      <Tabs activeKey={activeTab} onChange={setActiveTab} items={tabItems} />
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
        dataSource={formattedData.map((d, i) => ({ ...d, _key: i }))}
        rowKey="_key"
        pagination={{ pageSize: 10, showSizeChanger: true, showTotal: (t) => `共 ${t} 条` }}
        bordered
        size="middle"
      />
    </PortalLayout>
  );
}
