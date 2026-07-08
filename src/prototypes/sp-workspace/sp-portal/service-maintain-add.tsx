/**
 * @name 维护服务品类
 */
import { useState } from 'react';
import { useFilterData } from '../common/hooks';
import { theme, Table, Input, Button, Card, Row, Col, Typography, Tabs, Space, message } from 'antd';

interface ServiceRow {
  key: number;
  index: number;
  code: string;
  name: string;
  level: string;
  type: string;
  unit: string;
  admissionSource: string;
  bidNotice: string;
  bidProjectNo?: string;
  bidProjectName?: string;
  bidTime?: string;
}

const admittedData: ServiceRow[] = [
  { key: 1, index: 1, code: 'S1001000', name: '租赁服务', level: '一级', type: '专业', unit: '长庆油田', admissionSource: '公开招标采购中标', bidNotice: '中标通知文件.pdf' },
  { key: 2, index: 2, code: 'S1001000', name: '租赁服务', level: '二级', type: '通用', unit: '长庆油田', admissionSource: '其他公开方式', bidNotice: '' },
  { key: 3, index: 3, code: 'S1001000', name: '租赁服务', level: '二级', type: '专业', unit: '', admissionSource: '公开招标采购中标', bidNotice: '中标通知文件.pdf' },
  { key: 4, index: 4, code: 'S1001000', name: '租赁服务', level: '二级', type: '通用', unit: '', admissionSource: '其他公开方式', bidNotice: '' },
  { key: 5, index: 5, code: 'S1001000', name: '租赁服务', level: '', type: '', unit: '', admissionSource: '', bidNotice: '' },
  { key: 6, index: 6, code: 'S1001000', name: '租赁服务', level: '', type: '', unit: '', admissionSource: '', bidNotice: '' },
];

const pendingData: ServiceRow[] = [
  { key: 1, index: 1, code: 'S1001000', name: '租赁服务', level: '一级', type: '专业', unit: '长庆油田', admissionSource: '公开招标采购中标', bidNotice: '中标通知文件.pdf', bidProjectNo: 'ZB12345', bidProjectName: '炼油化工分公司设备检修服务采购', bidTime: '2026-06-01' },
  { key: 2, index: 2, code: 'S1001000', name: '租赁服务', level: '二级', type: '通用', unit: '长庆油田', admissionSource: '其他公开方式', bidNotice: '中标通知文件.pdf', bidProjectNo: 'ZB12345', bidProjectName: '炼油化工分公司设备检修服务采购', bidTime: '2026-06-01' },
  { key: 3, index: 3, code: 'S1001000', name: '租赁服务', level: '二级', type: '专业', unit: '', admissionSource: '公开招标采购中标', bidNotice: '中标通知文件.pdf', bidProjectNo: 'ZB12345', bidProjectName: '炼油化工分公司设备检修服务采购', bidTime: '2026-06-01' },
  { key: 4, index: 4, code: 'S1001000', name: '租赁服务', level: '二级', type: '通用', unit: '', admissionSource: '其他公开方式', bidNotice: '中标通知文件.pdf', bidProjectNo: 'ZB12345', bidProjectName: '炼油化工分公司设备检修服务采购', bidTime: '2026-06-01' },
  { key: 5, index: 5, code: 'S1001000', name: '租赁服务', level: '', type: '', unit: '', admissionSource: '', bidNotice: '', bidProjectNo: '', bidProjectName: '', bidTime: '' },
  { key: 6, index: 6, code: 'S1001000', name: '租赁服务', level: '', type: '', unit: '', admissionSource: '', bidNotice: '', bidProjectNo: '', bidProjectName: '', bidTime: '' },
];

/* ─── 已准入服务品类 Tab ─── */
function AdmittedTab() {
  const { filters, setFilter, clearFilters, filteredData } = useFilterData(admittedData, [
    { key: 'code', label: '服务品类编码' },
    { key: 'unit', label: '管理单位' },
    { key: 'admissionSource', label: '准入来源' },
  ]);

  const columns = [
    { key: 'index', title: '序号', width: 60, align: 'center' as const, dataIndex: 'index' },
    { key: 'code', title: '服务分类编码', dataIndex: 'code' },
    { key: 'name', title: '服务分类名称', dataIndex: 'name' },
    { key: 'level', title: '级别', dataIndex: 'level' },
    { key: 'type', title: '目录类型', dataIndex: 'type' },
    { key: 'unit', title: '管理单位', dataIndex: 'unit' },
    { key: 'admissionSource', title: '准入来源', dataIndex: 'admissionSource' },
    {
      key: 'bidNotice', title: '中标通知书', dataIndex: 'bidNotice',
      render: (v: string) => v ? <Typography.Link>{v}</Typography.Link> : '',
    },
    {
      key: 'action', title: '操作', width: 80, align: 'center' as const,
      render: () => <Typography.Link style={{ color: '#ff4d4f' }}>删除</Typography.Link>,
    },
  ];

  return (
    <>
      <Card variant="outlined" size="small" style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ flex: 1 }}>
            <Row gutter={16} style={{ marginBottom: 12 }}>
              <Col span={6}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Typography.Text style={{ whiteSpace: 'nowrap' }}>服务品类编码</Typography.Text>
                  <Input size="small" style={{ flex: 1 }} value={filters.code || ''} onChange={e => setFilter('code', e.target.value)} />
                </div>
              </Col>
              <Col span={6}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Typography.Text style={{ whiteSpace: 'nowrap' }}>管理单位</Typography.Text>
                  <Input size="small" style={{ flex: 1 }} value={filters.unit || ''} onChange={e => setFilter('unit', e.target.value)} />
                </div>
              </Col>
              <Col span={6}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Typography.Text style={{ whiteSpace: 'nowrap' }}>流程状态</Typography.Text>
                  <Input size="small" style={{ flex: 1 }} value={filters.status || ''} onChange={e => setFilter('status', e.target.value)} />
                </div>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={6}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Typography.Text style={{ whiteSpace: 'nowrap' }}>提交人</Typography.Text>
                  <Input size="small" style={{ flex: 1 }} value={filters.submitter || ''} onChange={e => setFilter('submitter', e.target.value)} />
                </div>
              </Col>
            </Row>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, paddingTop: 2 }}>
            <Button type="primary" onClick={clearFilters}>查询</Button>
            <Button onClick={clearFilters}>重置</Button>
          </div>
        </div>
      </Card>
      <div style={{ marginBottom: 16 }}>
        <Button type="primary" danger>批量删除</Button>
      </div>
      <Table
        columns={columns}
        dataSource={filteredData}
        pagination={{ pageSize: 10, showTotal: (total: number) => `共 ${total} 条` }}
        bordered
        size="middle"
      />
    </>
  );
}

/* ─── 已中标未准入服务品类 Tab ─── */
function PendingTab() {
  const { filters, setFilter, clearFilters, filteredData } = useFilterData(pendingData, [
    { key: 'code', label: '服务品类编码' },
    { key: 'unit', label: '管理单位' },
    { key: 'status', label: '流程状态' },
    { key: 'submitter', label: '提交人' },
  ]);

  const columns = [
    { key: 'index', title: '序号', width: 60, align: 'center' as const, dataIndex: 'index' },
    { key: 'code', title: '服务分类编码', dataIndex: 'code' },
    { key: 'name', title: '服务分类名称', dataIndex: 'name' },
    { key: 'level', title: '级别', dataIndex: 'level' },
    { key: 'type', title: '目录类型', dataIndex: 'type' },
    { key: 'admissionSource', title: '准入来源', dataIndex: 'admissionSource' },
    { key: 'unit', title: '管理单位', dataIndex: 'unit' },
    { key: 'bidProjectNo', title: '中标项目编号', dataIndex: 'bidProjectNo' },
    { key: 'bidProjectName', title: '中标项目名称', dataIndex: 'bidProjectName' },
    {
      key: 'bidNotice', title: '中标通知书', dataIndex: 'bidNotice',
      render: (v: string) => v ? <Typography.Link>{v}</Typography.Link> : '',
    },
    { key: 'bidTime', title: '中标时间', dataIndex: 'bidTime' },
    {
      key: 'action', title: '操作', width: 120, align: 'center' as const,
      render: () => (
        <Space size={4}>
          <Typography.Link onClick={() => { window.location.hash = '#/sp/service-maintain/edit'; }}>编辑</Typography.Link>
          <Typography.Text type="secondary">、</Typography.Text>
          <Typography.Link>提交</Typography.Link>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Card variant="outlined" size="small" style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ flex: 1 }}>
            <Row gutter={16} style={{ marginBottom: 12 }}>
              <Col span={6}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Typography.Text style={{ whiteSpace: 'nowrap' }}>服务品类编码</Typography.Text>
                  <Input size="small" style={{ flex: 1 }} value={filters.code || ''} onChange={e => setFilter('code', e.target.value)} />
                </div>
              </Col>
              <Col span={6}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Typography.Text style={{ whiteSpace: 'nowrap' }}>管理单位</Typography.Text>
                  <Input size="small" style={{ flex: 1 }} value={filters.unit || ''} onChange={e => setFilter('unit', e.target.value)} />
                </div>
              </Col>
              <Col span={6}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Typography.Text style={{ whiteSpace: 'nowrap' }}>流程状态</Typography.Text>
                  <Input size="small" style={{ flex: 1 }} value={filters.status || ''} onChange={e => setFilter('status', e.target.value)} />
                </div>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={6}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Typography.Text style={{ whiteSpace: 'nowrap' }}>提交人</Typography.Text>
                  <Input size="small" style={{ flex: 1 }} value={filters.submitter || ''} onChange={e => setFilter('submitter', e.target.value)} />
                </div>
              </Col>
            </Row>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, paddingTop: 2 }}>
            <Button type="primary" onClick={clearFilters}>查询</Button>
            <Button onClick={clearFilters}>重置</Button>
          </div>
        </div>
      </Card>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
        <Button type="primary" danger>批量编辑</Button>
        <Typography.Text style={{ color: '#ff4d4f' }}>以下数据来源于中标结果。</Typography.Text>
      </div>
      <Table
        columns={columns}
        dataSource={filteredData}
        pagination={{ pageSize: 10, showTotal: (total: number) => `共 ${total} 条` }}
        bordered
        size="middle"
      />
    </>
  );
}

export default function SpServiceMaintainAdd() {
  const [activeTab, setActiveTab] = useState('admitted');

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
        <Typography.Title level={4} style={{ margin: 0 }}>服务维护</Typography.Title>
        <Typography.Text type="secondary" style={{ fontSize: 14 }}>维护服务品类</Typography.Text>
      </div>

      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        items={[
          {
            key: 'admitted',
            label: <span style={{ color: activeTab === 'admitted' ? '#ff4d4f' : undefined, fontWeight: activeTab === 'admitted' ? 500 : undefined }}>已准入服务品类</span>,
            children: <AdmittedTab />,
          },
          {
            key: 'pending',
            label: <span style={{ color: activeTab === 'pending' ? '#ff4d4f' : undefined, fontWeight: activeTab === 'pending' ? 500 : undefined }}>已中标未准入服务品类</span>,
            children: <PendingTab />,
          },
        ]}
      />
    </div>
  );
}
