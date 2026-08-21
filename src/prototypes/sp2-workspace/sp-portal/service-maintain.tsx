/**
 * @name 服务维护
 * 服务商工作台2.0 - 服务维护（2.0 改造）
 * 功能要素：
 * 1) 待提交（暂存）数据：编辑后暂存未提交的品类，可继续编辑/提交审核/删除；
 * 2) 已注册服务品类：可剔除（即时生效，需填写剔除原因并记录）；
 * 3) 未注册品类新增入口：维护服务品类 → 从完整服务目录（专业+通用）自由选择新增。
 */
import React from 'react';
import { useState } from 'react';
import { useFilterData } from '../common/hooks';
import { Table, Input, Button, Card, Row, Col, Typography, Space, message, Modal, Form, Tabs, Tag } from 'antd';
import { ConfirmDialog } from '../common/components';

interface RegisteredRow {
  key: number;
  index: number;
  code: string;
  name: string;
  level: string;
  type: string;
  units: string[];
  changeType: string;
}

interface PendingRow {
  key: number;
  no: string;
  code: string;
  name: string;
  type: string;
  level: string;
  saveTime: string;
}

const registeredData: RegisteredRow[] = [
  { key: 1, index: 1, code: 'S1001000', name: '租赁服务', level: '一级', type: '专业', units: ['长庆油田', '西南油气田分公司'], changeType: '新增' },
  { key: 2, index: 2, code: 'S1001000', name: '租赁服务', level: '二级', type: '通用', units: ['长庆油田'], changeType: '新增' },
  { key: 3, index: 3, code: 'S1001000', name: '租赁服务', level: '二级', type: '专业', units: ['大庆油田有限责任公司', '塔里木油田分公司'], changeType: '' },
  { key: 4, index: 4, code: 'S0401000', name: '仓储服务', level: '二级', type: '通用', units: ['长庆油田', '青海油田分公司'], changeType: '' },
  { key: 5, index: 5, code: 'S0101000', name: '咨询', level: '一级', type: '专业', units: ['西南油气田分公司'], changeType: '' },
];

const pendingData: PendingRow[] = [
  { key: 1, no: 'WG2026-0001', code: 'S0401001', name: '仓储包装服务', type: '通用', level: '三级', saveTime: '2026-06-14 10:20' },
  { key: 2, no: 'WG2026-0002', code: 'S0102001', name: '劳务勘查', type: '专业', level: '三级', saveTime: '2026-06-13 16:45' },
];

function TypeTag({ type }: { type: string }) {
  if (!type) return <></>;
  return (
    <span style={{
      display: 'inline-block', padding: '0 8px', borderRadius: 4, fontSize: 12,
      background: type === '专业' ? '#fff1f0' : '#e6f7ff',
      color: '#ff4d4f',
      border: `1px solid ${type === '专业' ? '#ffa39e' : '#91d5ff'}`,
    }}>{type}</span>
  );
}

export default function SpServiceMaintain() {
  const [activeTab, setActiveTab] = useState('registered');
  const [registered, setRegistered] = useState<RegisteredRow[]>(registeredData);
  const [pending, setPending] = useState<PendingRow[]>(pendingData);
  const [pendingSelected, setPendingSelected] = useState<React.Key[]>([]);

  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [deleteRecord, setDeleteRecord] = useState<PendingRow | null>(null);
  const [submitConfirmOpen, setSubmitConfirmOpen] = useState(false);
  const [submitRecord, setSubmitRecord] = useState<PendingRow | null>(null);

  const [removeOpen, setRemoveOpen] = useState(false);
  const [removeRecord, setRemoveRecord] = useState<RegisteredRow | null>(null);
  const [removeReason, setRemoveReason] = useState('');

  const { filters, setFilter, clearFilters, filteredData } = useFilterData(registered, [
    { key: 'code', label: '服务品类编码' },
    { key: 'level', label: '级别' },
    { key: 'changeType', label: '变更类型' },
    { key: 'submitter', label: '提交人' },
  ]);

  /* ─── 待提交数据操作 ─── */
  const handleEditPending = (record: PendingRow) => {
    window.location.hash = `#/sp/service-maintain/edit?code=${record.code}`;
  };

  const handleSubmitPending = (record: PendingRow) => {
    setSubmitRecord(record);
    setSubmitConfirmOpen(true);
  };

  const handleSubmitOk = () => {
    if (submitRecord) {
      setPending(prev => prev.filter(p => p.key !== submitRecord.key));
      message.success('已提交审核');
    }
    setSubmitRecord(null);
    setSubmitConfirmOpen(false);
  };

  const handleDeletePending = (record: PendingRow) => {
    setDeleteRecord(record);
    setDeleteConfirmOpen(true);
  };

  const handleDeletePendingOk = () => {
    if (deleteRecord) {
      setPending(prev => prev.filter(p => p.key !== deleteRecord.key));
      setPendingSelected(prev => prev.filter(k => k !== deleteRecord.key));
      message.success('删除成功');
    }
    setDeleteRecord(null);
    setDeleteConfirmOpen(false);
  };

  const handleBatchDeletePending = () => {
    if (pendingSelected.length === 0) {
      message.warning('请先选择要删除的暂存数据');
      return;
    }
    setPending(prev => prev.filter(p => !pendingSelected.includes(p.key)));
    setPendingSelected([]);
    message.success('批量删除成功');
  };

  /* ─── 已注册品类剔除（即时生效，需原因并记录） ─── */
  const handleRemoveClick = (record: RegisteredRow) => {
    setRemoveRecord(record);
    setRemoveReason('');
    setRemoveOpen(true);
  };

  const handleRemoveOk = () => {
    if (!removeReason.trim()) {
      message.warning('请填写剔除原因');
      return;
    }
    if (removeRecord) {
      setRegistered(prev => prev.filter(r => r.key !== removeRecord.key));
      message.success(`已剔除「${removeRecord.name}」（即时生效，剔除原因已记录）`);
    }
    setRemoveRecord(null);
    setRemoveOpen(false);
    setRemoveReason('');
  };

  const pendingColumns = [
    { key: 'no', title: '暂存单号', width: 130, dataIndex: 'no' },
    { key: 'code', title: '服务品类码', width: 120, dataIndex: 'code' },
    { key: 'name', title: '服务品类名称', dataIndex: 'name' },
    {
      key: 'type', title: '品类类型', width: 100, align: 'center' as const, dataIndex: 'type',
      render: (v: string) => <TypeTag type={v} />,
    },
    { key: 'level', title: '品类等级', width: 90, align: 'center' as const, dataIndex: 'level' },
    { key: 'saveTime', title: '暂存时间', width: 160, dataIndex: 'saveTime' },
    {
      key: 'action', title: '操作', width: 180, align: 'center' as const,
      render: (_: unknown, record: PendingRow) => (
        <Space size={4}>
          <Typography.Link style={{ fontSize: 13, color: '#ff4d4f' }} onClick={() => handleEditPending(record)}>编辑</Typography.Link>
          <Typography.Text type="secondary">|</Typography.Text>
          <Typography.Link style={{ fontSize: 13, color: '#ff4d4f' }} onClick={() => handleSubmitPending(record)}>提交</Typography.Link>
          <Typography.Text type="secondary">|</Typography.Text>
          <Typography.Link style={{ fontSize: 13, color: '#ff4d4f' }} onClick={() => handleDeletePending(record)}>删除</Typography.Link>
        </Space>
      ),
    },
  ];

  const registeredColumns = [
    { key: 'index', title: '序号', width: 60, align: 'center' as const, dataIndex: 'index' },
    { key: 'code', title: '服务分类编码', dataIndex: 'code' },
    { key: 'name', title: '服务分类名称', dataIndex: 'name' },
    { key: 'level', title: '级别', dataIndex: 'level' },
    {
      key: 'type', title: '目录类型', dataIndex: 'type',
      render: (v: string) => <TypeTag type={v} />,
    },
    {
      key: 'units', title: '使用单位', dataIndex: 'units',
      render: (v: string[]) => v && v.length ? (
        <Space size={4} wrap>
          {v.map((u, i) => <Tag key={i} color="blue" style={{ fontSize: 12, marginInlineEnd: 0 }}>{u}</Tag>)}
        </Space>
      ) : '',
    },
    { key: 'changeType', title: '服务变更类型', dataIndex: 'changeType' },
    {
      key: 'action',
      title: '操作',
      width: 100,
      align: 'center' as const,
      render: (_: unknown, record: RegisteredRow) => (
        <Typography.Link style={{ fontSize: 13, color: '#ff4d4f' }} onClick={() => handleRemoveClick(record)}>剔除</Typography.Link>
      ),
    },
  ];

  return (
    <div>
      {/* 标题行 */}
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 20 }}>
        <Typography.Title level={4} style={{ margin: 0 }}>服务维护</Typography.Title>
        <Typography.Text type="secondary">服务商名称：中海油能源发展股份有限公司</Typography.Text>
        <Typography.Text type="secondary">服务商编码：100001231</Typography.Text>
        <Typography.Text type="secondary">服务商状态：正常</Typography.Text>
      </div>

      {/* 左右两个 Tab：已注册 / 未注册 */}
      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        items={[
          {
            key: 'registered',
            label: '已注册服务品类',
            children: (
              /* 已注册服务品类 */
              <Card variant="outlined" size="small" style={{ marginBottom: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                  <Typography.Text strong style={{ fontSize: 14 }}>✅ 已注册服务品类</Typography.Text>
                  <Typography.Text type="secondary" style={{ fontSize: 12 }}>已注册品类剔除后即时生效，剔除原因自动记录</Typography.Text>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
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
                          <Typography.Text style={{ whiteSpace: 'nowrap' }}>级别</Typography.Text>
                          <Input size="small" style={{ flex: 1 }} value={filters.level || ''} onChange={e => setFilter('level', e.target.value)} />
                        </div>
                      </Col>
                      <Col span={6}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <Typography.Text style={{ whiteSpace: 'nowrap' }}>变更类型</Typography.Text>
                          <Input size="small" style={{ flex: 1 }} value={filters.changeType || ''} onChange={e => setFilter('changeType', e.target.value)} />
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
                <Table
                  columns={registeredColumns}
                  dataSource={filteredData}
                  rowKey="key"
                  pagination={false}
                  bordered
                  size="middle"
                />
              </Card>
            ),
          },
          {
            key: 'unregistered',
            label: '未注册服务品类',
            children: (
              <>
                {/* 未注册品类新增入口 */}
                <Card variant="outlined" size="small" style={{ marginBottom: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <Typography.Text strong style={{ fontSize: 14 }}>未注册服务品类</Typography.Text>
                      <Typography.Text type="secondary" style={{ fontSize: 13 }}>
                        可从完整服务目录（专业+通用）中自由选择任意品类注册，专业品类需填写资质审查资料
                      </Typography.Text>
                    </div>
                    <Button type="primary" danger onClick={() => { window.location.hash = '#/sp/service-maintain/add'; }}>
                      维护服务品类
                    </Button>
                  </div>
                </Card>

                {/* 待提交（暂存）数据 */}
                <Card
                  variant="outlined"
                  size="small"
                  title={<span style={{ fontSize: 14 }}>⏳ 待提交（暂存）数据</span>}
                  extra={<Button onClick={handleBatchDeletePending}>批量删除</Button>}
                  style={{ marginBottom: 16 }}
                >
                  <Table
                    rowSelection={{ selectedRowKeys: pendingSelected, onChange: setPendingSelected }}
                    columns={pendingColumns}
                    dataSource={pending}
                    rowKey="key"
                    pagination={false}
                    bordered
                    size="middle"
                  />
                </Card>
              </>
            ),
          },
        ]}
      />

      {/* 待提交：提交确认弹窗 */}
      <ConfirmDialog
        open={submitConfirmOpen}
        title="确认提交"
        content={`确认提交暂存品类「${submitRecord?.name || ''}」进入审核流程吗？`}
        onOk={handleSubmitOk}
        onCancel={() => { setSubmitRecord(null); setSubmitConfirmOpen(false); }}
      />

      {/* 待提交：删除确认弹窗 */}
      <ConfirmDialog
        open={deleteConfirmOpen}
        title="确认删除"
        content={`确定要删除暂存数据「${deleteRecord?.name || ''}」吗？`}
        onOk={handleDeletePendingOk}
        onCancel={() => { setDeleteRecord(null); setDeleteConfirmOpen(false); }}
        danger
      />

      {/* 已注册：剔除原因弹窗（即时生效） */}
      <Modal
        open={removeOpen}
        title={`剔除服务品类 - ${removeRecord?.name || ''}`}
        onOk={handleRemoveOk}
        onCancel={() => { setRemoveRecord(null); setRemoveOpen(false); }}
        okText="确认剔除"
        cancelText="取消"
        okButtonProps={{ danger: true }}
        destroyOnClose
      >
        <div style={{ marginBottom: 12, padding: '10px 12px', background: '#fff1f0', border: '1px solid #ffa39e', borderRadius: 4, fontSize: 13, color: '#ff4d4f' }}>
          剔除后即时生效，该服务品类将不可交易，剔除原因将强制记录日志。
        </div>
        <Form layout="vertical">
          <Form.Item label="剔除原因" required>
            <Input.TextArea rows={4} value={removeReason} onChange={e => setRemoveReason(e.target.value)} placeholder="请填写剔除原因" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}