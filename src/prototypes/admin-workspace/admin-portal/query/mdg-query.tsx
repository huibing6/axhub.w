/**
 * @name MDG信息查询
 */
import { useState } from 'react';
import { theme, Typography, Card, Space, Input, Button, Table } from 'antd';
import PortalLayout from '../../common/portal-layout';
import { adminGroups } from '../../common/menu-data';
import { useFilterData } from '../../common/hooks';

const rawData = [
  { idx: 1, code: '1000020022', name: '中海油能源发展股份有限公司', mgmtType: '所属企业管理', adminUnit: '长庆油田', flowStatus: '同步完成', syncType: '新增', dataSource: '准入办理', applyTime: '2025-12-19 09:15', sendTime: '2025-12-19 09:15', completeTime: '2025-12-19 09:15', creator: '张三', sender: '张三', rejectReason: '' },
  { idx: 2, code: '1000020022', name: '杰瑞石油装备技术有限公司', mgmtType: '总部管理', adminUnit: '', flowStatus: '同步验证驳回', syncType: '变更', dataSource: '信息变更', applyTime: '2025-12-17 15:03', sendTime: '2025-12-17 15:03', completeTime: '2025-12-17 15:03', creator: '李四', sender: '李四', rejectReason: '' },
  { idx: 3, code: '1000020022', name: '中海油能源发展股份有限公司', mgmtType: '所属企业管理', adminUnit: '', flowStatus: 'MDG处理中', syncType: '', dataSource: '准入办理', applyTime: '2025-12-19 09:15', sendTime: '2025-12-19 09:15', completeTime: '2025-12-19 09:15', creator: '张三', sender: '张三', rejectReason: '' },
  { idx: 4, code: '1000020022', name: '杰瑞石油装备技术有限公司', mgmtType: '总部管理', adminUnit: '', flowStatus: '已关闭', syncType: '', dataSource: '信息变更', applyTime: '2025-12-17 15:03', sendTime: '2025-12-17 15:03', completeTime: '2025-12-17 15:03', creator: '李四', sender: '李四', rejectReason: '' },
  { idx: 5, code: '1000020022', name: '中海油能源发展股份有限公司', mgmtType: '', adminUnit: '', flowStatus: '', syncType: '', dataSource: '', applyTime: '2025-12-19 09:15', sendTime: '2025-12-19 09:15', completeTime: '2025-12-19 09:15', creator: '张三', sender: '张三', rejectReason: '' },
  { idx: 6, code: '', name: '杰瑞石油装备技术有限公司', mgmtType: '', adminUnit: '', flowStatus: '', syncType: '', dataSource: '', applyTime: '2025-12-17 15:03', sendTime: '2025-12-17 15:03', completeTime: '2025-12-17 15:03', creator: '李四', sender: '李四', rejectReason: '' },
];

export default function MdgQuery() {
  const { token: t } = theme.useToken();
  const [nameFilter, setNameFilter] = useState('');
  const [mgmtTypeFilter, setMgmtTypeFilter] = useState('');
  const [flowStatusFilter, setFlowStatusFilter] = useState('');
  const [submitterFilter, setSubmitterFilter] = useState('');

  const { setFilter, filteredData, clearFilters } = useFilterData(rawData, [
    { key: 'name', label: '服务商名称' },
    { key: 'mgmtType', label: '服务商管理类型' },
    { key: 'flowStatus', label: '流程状态' },
    { key: 'creator', label: '提交人' },
  ]);

  const handleSearch = () => {
    setFilter('name', nameFilter);
    setFilter('mgmtType', mgmtTypeFilter);
    setFilter('flowStatus', flowStatusFilter);
    setFilter('creator', submitterFilter);
  };

  const handleReset = () => {
    setNameFilter('');
    setMgmtTypeFilter('');
    setFlowStatusFilter('');
    setSubmitterFilter('');
    clearFilters();
  };

  const columns = [
    { key: 'idx', title: '序号', width: 50, align: 'center' as const, dataIndex: 'idx' },
    { key: 'code', title: '服务商编码', width: 110, dataIndex: 'code', ellipsis: true },
    { key: 'name', title: '服务商名称', width: 150, dataIndex: 'name', ellipsis: true },
    { key: 'mgmtType', title: '服务商管理类型', width: 120, dataIndex: 'mgmtType', ellipsis: true },
    { key: 'adminUnit', title: '管理单位', width: 100, dataIndex: 'adminUnit', ellipsis: true },
    { key: 'flowStatus', title: '流程状态', width: 110, dataIndex: 'flowStatus', ellipsis: true },
    { key: 'syncType', title: '同步类型', width: 80, dataIndex: 'syncType', ellipsis: true },
    { key: 'dataSource', title: '数据来源', width: 100, dataIndex: 'dataSource', ellipsis: true },
    { key: 'applyTime', title: '申请时间', width: 110, dataIndex: 'applyTime' },
    { key: 'sendTime', title: '发送时间', width: 110, dataIndex: 'sendTime' },
    { key: 'completeTime', title: '完成时间', width: 110, dataIndex: 'completeTime' },
    { key: 'creator', title: '创建人', width: 70, dataIndex: 'creator', ellipsis: true },
    { key: 'sender', title: '发送人', width: 70, dataIndex: 'sender', ellipsis: true },
    { key: 'rejectReason', title: '驳回意见', width: 100, dataIndex: 'rejectReason', ellipsis: true },
    {
      key: 'action', title: '操作', width: 140, align: 'center' as const,
      render: (_: unknown, record: any) => {
        const isReject = record.flowStatus === '同步验证驳回';
        return (
          <Space size={2}>
            <Typography.Link style={{ fontSize: 13, color: '#1677ff' }}>查看</Typography.Link>
            {isReject ? (
              <>
                <Typography.Text type="secondary">、</Typography.Text>
                <Typography.Link style={{ fontSize: 13, color: '#1677ff' }} onClick={() => window.location.hash = '#/admin/mdg-edit'}>编辑</Typography.Link>
                <Typography.Text type="secondary">、</Typography.Text>
                <Typography.Link style={{ fontSize: 13, color: '#1677ff' }}>终止</Typography.Link>
              </>
            ) : null}
          </Space>
        );
      },
    },
  ];

  return (
    <PortalLayout groups={adminGroups} activePath="/admin/mdg-query" portalType="admin">
      <Typography.Title level={4} style={{ margin: '0 0 16px' }}>MDG信息查询</Typography.Title>
      <Card size="small" variant="outlined" style={{ marginBottom: 16 }}>
        <Space direction="vertical" style={{ width: '100%' }} size={12}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr) auto', gap: 12, alignItems: 'end' }}>
            <div>
              <Typography.Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 4 }}>服务商名称</Typography.Text>
              <Input placeholder="请输入服务商名称" value={nameFilter} onChange={e => setNameFilter(e.target.value)} />
            </div>
            <div>
              <Typography.Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 4 }}>服务商管理类型</Typography.Text>
              <Input placeholder="请输入服务商管理类型" value={mgmtTypeFilter} onChange={e => setMgmtTypeFilter(e.target.value)} />
            </div>
            <div>
              <Typography.Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 4 }}>流程状态</Typography.Text>
              <Input placeholder="请输入流程状态" value={flowStatusFilter} onChange={e => setFlowStatusFilter(e.target.value)} />
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
      <Table
        columns={columns}
        dataSource={filteredData.map((d, i) => ({ ...d, _key: i }))}
        rowKey="_key"
        pagination={false}
        bordered
        size="middle"
        scroll={{ x: 'max-content' }}
      />
    </PortalLayout>
  );
}
