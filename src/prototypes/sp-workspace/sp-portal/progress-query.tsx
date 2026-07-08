/**
 * @name 进度查询
 */
import { useState } from 'react';
import { theme, Tabs, Table, Typography, Space } from 'antd';

export default function SpProgressQuery() {
  const [activeTab, setActiveTab] = useState('sp-info');

  const spColumns = [
    { key: 'index', title: '序号', width: 60, align: 'center' as const, dataIndex: 'index' },
    { key: 'name', title: '服务商名称', dataIndex: 'name' },
    { key: 'unit', title: '管理单位', dataIndex: 'unit' },
    { key: 'applyDept', title: '申请时间', dataIndex: 'applyDept' },
    { key: 'applyType', title: '申请类别', dataIndex: 'applyType' },
    { key: 'handler', title: '当前处理人', dataIndex: 'handler' },
    { key: 'status', title: '状态', dataIndex: 'status' },
    {
      key: 'action',
      title: '操作',
      width: 160,
      align: 'center' as const,
      render: (_: any, record: any) => {
        const actions: string[] = [];
        if (record.status === '待提交') {
          actions.push('查看', '编辑');
        } else if (record.status === '待审核') {
          actions.push('查看', '撤回');
        } else if (record.status === '已退回') {
          actions.push('查看', '编辑', '退回意见');
        } else if (record.status === '已终止') {
          actions.push('查看', '终止意见');
        } else {
          actions.push('查看');
        }
        return (
          <Space size={4}>
            {actions.map((a, i) => (
              <span key={a}>
                {i > 0 && <Typography.Text type="secondary">、</Typography.Text>}
                <Typography.Link style={{ color: '#1677ff' }}>
                  {a}
                </Typography.Link>
              </span>
            ))}
          </Space>
        );
      },
    },
  ];

  const spData = [
    { key: 1, index: 1, name: '中海油能源发展股份有限公司', unit: '长庆油田', applyDept: '所属企业管理', applyType: '新增准入', handler: '服务商', status: '待提交' },
    { key: 2, index: 2, name: '杰瑞石油装备技术有限公司', unit: '中国石油天然气集团有限公司', applyDept: '总部管理', applyType: '变更申请', handler: '管理单位处理中', status: '待审核' },
    { key: 3, index: 3, name: '中海油能源发展股份有限公司', unit: '长庆油田', applyDept: '', applyType: '资质维护申请', handler: '', status: '已退回' },
    { key: 4, index: 4, name: '杰瑞石油装备技术有限公司', unit: '中国石油天然气集团有限公司', applyDept: '', applyType: '', handler: '', status: '已终止' },
    { key: 5, index: 5, name: '中海油能源发展股份有限公司', unit: '长庆油田', applyDept: '', applyType: '', handler: '', status: '' },
    { key: 6, index: 6, name: '杰瑞石油装备技术有限公司', unit: '中国石油天然气集团有限公司', applyDept: '', applyType: '', handler: '', status: '' },
  ];

  const svcColumns = [
    { key: 'index', title: '序号', width: 60, align: 'center' as const, dataIndex: 'index' },
    { key: 'svcCode', title: '服务分类编码', dataIndex: 'svcCode' },
    { key: 'svcName', title: '名称服务', dataIndex: 'svcName' },
    { key: 'level', title: '级别', dataIndex: 'level' },
    { key: 'type', title: '目录类型', dataIndex: 'type' },
    { key: 'unit', title: '管理单位', dataIndex: 'unit' },
    { key: 'changeType', title: '产品变更类型', dataIndex: 'changeType' },
    { key: 'handler', title: '当前处理人', dataIndex: 'handler' },
    { key: 'status', title: '状态', dataIndex: 'status' },
    {
      key: 'action',
      title: '操作',
      width: 160,
      align: 'center' as const,
      render: (_: any, record: any) => {
        const actions: string[] = [];
        if (record.status === '待提交') {
          actions.push('查看', '编辑');
        } else if (record.status === '待审核') {
          actions.push('查看', '撤回');
        } else if (record.status === '已退回') {
          actions.push('查看', '编辑', '退回意见');
        } else if (record.status === '已终止') {
          actions.push('查看', '终止意见');
        } else {
          actions.push('查看');
        }
        return (
          <Space size={4}>
            {actions.map((a, i) => (
              <span key={a}>
                {i > 0 && <Typography.Text type="secondary">、</Typography.Text>}
                <Typography.Link style={{ color: '#1677ff' }}>{a}</Typography.Link>
              </span>
            ))}
          </Space>
        );
      },
    },
  ];

  const svcData = [
    { key: 1, index: 1, svcCode: 'S1001000', svcName: '租赁服务', level: '一级', type: '专业', unit: '中国石油集团', changeType: '新增', handler: '服务商', status: '待提交' },
    { key: 2, index: 2, svcCode: 'S1001000', svcName: '租赁服务', level: '二级', type: '通用', unit: '长庆油田', changeType: '变更', handler: '管理单位处理中', status: '待审核' },
    { key: 3, index: 3, svcCode: 'S1001000', svcName: '租赁服务', level: '二级', type: '专业', unit: '', changeType: '删除', handler: '', status: '已退回' },
    { key: 4, index: 4, svcCode: 'S1001000', svcName: '租赁服务', level: '', type: '', unit: '', changeType: '', handler: '', status: '已终止' },
    { key: 5, index: 5, svcCode: 'S1001000', svcName: '租赁服务', level: '', type: '', unit: '', changeType: '', handler: '', status: '' },
    { key: 6, index: 6, svcCode: 'S1001000', svcName: '租赁服务', level: '', type: '', unit: '', changeType: '', handler: '', status: '' },
  ];

  return (
    <div>
      {/* 信息行 */}
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 20 }}>
        <Typography.Text type="secondary">服务商名称：中海油能源发展股份有限公司</Typography.Text>
        <Typography.Text type="secondary">服务商编码：100001231</Typography.Text>
        <Typography.Text type="secondary">服务商状态：正常</Typography.Text>
      </div>

      {/* Tabs */}
      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        style={{ marginBottom: 16 }}
        items={[
          {
            key: 'sp-info',
            label: <span style={{ color: activeTab === 'sp-info' ? '#ff4d4f' : undefined, fontWeight: activeTab === 'sp-info' ? 500 : undefined }}>服务商信息</span>,
          },
          {
            key: 'svc-info',
            label: <span style={{ color: activeTab === 'svc-info' ? '#ff4d4f' : undefined, fontWeight: activeTab === 'svc-info' ? 500 : undefined }}>服务品类信息</span>,
          },
        ]}
      />

      {/* 表格 */}
      {activeTab === 'sp-info' ? (
        <Table
          columns={spColumns}
          dataSource={spData}
          pagination={{ pageSize: 10, showTotal: (total: number) => `共 ${total} 条` }}
          bordered
          size="middle"
        />
      ) : (
        <Table
          columns={svcColumns}
          dataSource={svcData}
          pagination={{ pageSize: 10, showTotal: (total: number) => `共 ${total} 条` }}
          bordered
          size="middle"
        />
      )}
    </div>
  );
}
