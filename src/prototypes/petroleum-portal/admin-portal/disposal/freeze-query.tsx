/**
 * @name 冻结解冻查询
 */
import { useState } from 'react';
import { theme, Typography, Card, Space, Input, Select, Button, Table } from 'antd';
import PortalLayout from '../../common/portal-layout';
import { adminGroups } from '../../common/menu-data';
import { useFilterData } from '../../common/hooks';

const filterFields = [
  { key: 'code', label: '服务商编码', placeholder: '请输入' },
  { key: 'name', label: '服务商名称', placeholder: '请输入' },
  { key: 'adminUnit', label: '管理单位', type: 'select' as const, options: ['全部', '长庆油田分公司', '大庆油田分公司'] },
  { key: 'mgmtType', label: '服务商管理类型', type: 'select' as const, options: ['全部', '所属企业管理', '总部管理'] },
  { key: 'disposalType', label: '处置类型', type: 'select' as const, options: ['全部', '冻结', '解冻'] },
  { key: 'flowStatus', label: '流程状态', type: 'select' as const, options: ['全部', '待审批', '已审批', '已驳回'] },
];

const columns = [
  { key: 'index', title: '序号', width: 60, align: 'center' as const, dataIndex: 'index' },
  { key: 'code', title: '服务商编码', width: 120, dataIndex: 'code', ellipsis: true },
  { key: 'name', title: '服务商名称', width: 200, dataIndex: 'name', ellipsis: true },
  { key: 'mgmtType', title: '服务商管理类型', width: 120, dataIndex: 'mgmtType', ellipsis: true },
  { key: 'adminUnit', title: '管理单位', width: 140, dataIndex: 'adminUnit', ellipsis: true },
  { key: 'disposalType', title: '处置类型', width: 100, dataIndex: 'disposalType', ellipsis: true },
  { key: 'flowStatus', title: '流程状态', width: 100, dataIndex: 'flowStatus', ellipsis: true },
  { key: 'applyTime', title: '申请时间', width: 120, dataIndex: 'applyTime', ellipsis: true },
  { key: 'operator', title: '操作人', width: 100, dataIndex: 'operator', ellipsis: true },
];

const tableData = [
  { index: '1', code: '1000020022', name: '中海油能源发展股份有限公司', mgmtType: '所属企业管理', adminUnit: '长庆油田分公司', disposalType: '冻结', flowStatus: '待审批', applyTime: '2025-06-01', operator: '张三' },
  { index: '2', code: '1000020022', name: '杰瑞石油装备技术有限公司', mgmtType: '总部管理', adminUnit: '长庆油田分公司', disposalType: '解冻', flowStatus: '已审批', applyTime: '2025-06-02', operator: '李四' },
  { index: '3', code: '1000020022', name: '中海油能源发展股份有限公司', mgmtType: '所属企业管理', adminUnit: '长庆油田分公司', disposalType: '冻结', flowStatus: '已驳回', applyTime: '2025-06-03', operator: '王五' },
  { index: '4', code: '1000020022', name: '杰瑞石油装备技术有限公司', mgmtType: '总部管理', adminUnit: '长庆油田分公司', disposalType: '解冻', flowStatus: '待审批', applyTime: '2025-06-04', operator: '赵六' },
  { index: '5', code: '1000020022', name: '中海油能源发展股份有限公司', mgmtType: '所属企业管理', adminUnit: '长庆油田分公司', disposalType: '冻结', flowStatus: '已审批', applyTime: '2025-06-05', operator: '张三' },
  { index: '6', code: '1000020022', name: '杰瑞石油装备技术有限公司', mgmtType: '总部管理', adminUnit: '长庆油田分公司', disposalType: '解冻', flowStatus: '已审批', applyTime: '2025-06-06', operator: '李四' },
];

export default function FreezeQuery() {
  const [searchValues, setSearchValues] = useState<Record<string, string>>({});
  const { setFilter, filteredData } = useFilterData(tableData, filterFields);

  return (
    <PortalLayout groups={adminGroups} activePath="/admin/freeze-query" portalType="admin">
      <Typography.Text type="secondary" style={{ display: 'block', marginBottom: 8 }}>
        <Typography.Text style={{ color: theme.useToken().token.colorPrimary }}>注册服务商审核</Typography.Text>
      </Typography.Text>
      <Typography.Title level={4}>冻结解冻查询</Typography.Title>
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
      />
    </PortalLayout>
  );
}
