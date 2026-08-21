/**
 * @name 待配码库
 */
import React from 'react';
import { useState } from 'react';
import { theme, Typography, Card, Space, Input, Select, Button, Table, Tag, Descriptions, Modal, message } from 'antd';
import { useFilterData } from '../common/hooks';

const rawData = [
  { idx: 1, name: '中海油能源发展股份有限公司', code: '91440300MA5F1234AB', manageType: '所属企业管理', regDate: '2025-06-15' },
  { idx: 2, name: '杰瑞石油装备技术有限公司', code: '913706005971234523', manageType: '总部管理', regDate: '2025-07-20' },
  { idx: 3, name: '宝鸡石油钢管有限责任公司', code: '91610300220523456A', manageType: '所属企业管理', regDate: '2025-05-10' },
  { idx: 4, name: '山东科瑞机械制造有限公司', code: '91370500567890123B', manageType: '总部管理', regDate: '2025-08-01' },
  { idx: 5, name: '天津渤海石油装备制造有限公司', code: '91120116MA05CDEF5G', manageType: '所属企业管理', regDate: '2025-04-22' },
  { idx: 6, name: '四川宏华石油设备有限公司', code: '91510100MA6123456H', manageType: '总部管理', regDate: '2025-03-18' },
  { idx: 7, name: '河南中原测控技术有限公司', code: '91410100MA40JKLM7N', manageType: '所属企业管理', regDate: '2025-09-05' },
  { idx: 8, name: '北京石油机械有限公司', code: '91110108MA01PQRST8Q', manageType: '总部管理', regDate: '2025-02-28' },
];

const templateOptions = [
  { label: '补充资料通知模板A', value: 'templateA' },
  { label: '补充资料通知模板B', value: 'templateB' },
  { label: '补充资料通知模板C', value: 'templateC' },
];

const templatePreviews: Record<string, string> = {
  templateA: '尊敬的服务商：\n\n您的准入申请资料不完整，请在5个工作日内补充以下材料：\n1. 营业执照副本扫描件\n2. 法定代表人身份证明\n\n请及时登录系统上传补充资料。',
  templateB: '尊敬的服务商：\n\n您的资质证书即将过期，请及时更新以下资质文件：\n1. ISO9001质量管理体系认证\n2. 安全生产许可证\n\n请在30日内完成更新。',
  templateC: '尊敬的服务商：\n\n经审核，您提交的准入申请需要补充以下信息：\n1. 近三年财务审计报告\n2. 主要业绩证明材料\n\n请尽快补充提交。',
};

export default function PendingList() {
  const { token: t } = theme.useToken();
  const [nameFilter, setNameFilter] = useState('');
  const [codeFilter, setCodeFilter] = useState('');
  const [manageTypeFilter, setManageTypeFilter] = useState('');
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [notifyModalOpen, setNotifyModalOpen] = useState(false);
  const [notifyRecord, setNotifyRecord] = useState<any>(null);
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [data] = useState(rawData);

  const { setFilter, filteredData, clearFilters } = useFilterData(data, [
    { key: 'name', label: '服务商名称' },
    { key: 'code', label: '统一社会信用代码' },
    { key: 'manageType', label: '服务商管理类型' },
  ]);

  const handleSearch = () => {
    setFilter('name', nameFilter);
    setFilter('code', codeFilter);
    setFilter('manageType', manageTypeFilter);
  };

  const handleReset = () => {
    setNameFilter('');
    setCodeFilter('');
    setManageTypeFilter('');
    clearFilters();
  };

  const handleBatchNotify = () => {
    if (selectedRowKeys.length === 0) { message.warning('请先选择记录'); return; }
    setNotifyRecord(null);
    setSelectedTemplate('');
    setNotifyModalOpen(true);
  };

  const handleViewDetail = (record: any) => {
    window.location.hash = `#/admin/pending-detail?code=${record.code}`;
  };

  const handleSendNotify = () => {
    if (!selectedTemplate) { message.warning('请选择通知模板'); return; }
    message.success('通知已发送');
    setNotifyModalOpen(false);
    setSelectedTemplate('');
  };

  const columns = [
    { key: 'idx', title: '序号', width: 50, align: 'center' as const, dataIndex: 'idx' },
    { key: 'name', title: '服务商名称', width: 220, dataIndex: 'name', ellipsis: true },
    { key: 'code', title: '统一社会信用代码', width: 200, dataIndex: 'code', ellipsis: true },
    {
      key: 'manageType', title: '服务商管理类型', width: 130, dataIndex: 'manageType',
      render: (v: string) => <Tag color={v === '总部管理' ? 'blue' : 'default'}>{v}</Tag>,
    },
    { key: 'regDate', title: '注册日期', width: 110, dataIndex: 'regDate' },
    {
      key: 'action', title: '操作', width: 200, align: 'center' as const,
      render: (_: unknown, record: any) => (
        <Space size={4}>
          <Typography.Link style={{ fontSize: 13, color: '#ff4d4f' }} onClick={() => handleViewDetail(record)}>查看</Typography.Link>
          <Typography.Text type="secondary">|</Typography.Text>
          <Typography.Link style={{ fontSize: 13, color: '#ff4d4f' }} onClick={() => window.location.hash = '#/admin/pending-mdg'}>补充MDG</Typography.Link>
          <Typography.Text type="secondary">|</Typography.Text>
          <Typography.Link style={{ fontSize: 13, color: '#ff4d4f' }} onClick={() => { setNotifyRecord(record); setSelectedTemplate(''); setNotifyModalOpen(true); }}>发送通知</Typography.Link>
        </Space>
      ),
    },
  ];

  const rowSelection = {
    selectedRowKeys,
    onChange: (keys: React.Key[]) => setSelectedRowKeys(keys),
  };

  return (
    <div>
      <Card size="small" variant="outlined" style={{ marginBottom: 16 }}>
        <Space direction="vertical" style={{ width: '100%' }} size={8}>
          <Typography.Text style={{ color: t.colorPrimary }}>准入管理</Typography.Text>
          <Typography.Title level={4} style={{ margin: 0 }}>待配码库</Typography.Title>
          <Card size="small" variant="outlined" style={{ marginBottom: 0 }}>
            <Space direction="vertical" style={{ width: '100%' }} size={12}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr) 160px auto', gap: 12, alignItems: 'end' }}>
                <div>
                  <Typography.Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 4 }}>服务商名称</Typography.Text>
                  <Input placeholder="请输入服务商名称" value={nameFilter} onChange={e => setNameFilter(e.target.value)} />
                </div>
                <div>
                  <Typography.Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 4 }}>统一社会信用代码</Typography.Text>
                  <Input placeholder="请输入信用代码" value={codeFilter} onChange={e => setCodeFilter(e.target.value)} />
                </div>
                <div>
                  <Typography.Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 4 }}>服务商管理类型</Typography.Text>
                  <Select placeholder="请选择" allowClear style={{ width: '100%' }} value={manageTypeFilter || undefined} onChange={v => setManageTypeFilter(v || '')} options={[{ label: '所属企业管理', value: '所属企业管理' }, { label: '总部管理', value: '总部管理' }]} />
                </div>
                <Space>
                  <Button type="primary" danger onClick={handleSearch}>查询</Button>
                  <Button onClick={handleReset}>重置</Button>
                </Space>
              </div>
            </Space>
          </Card>
        </Space>
      </Card>

      <Card size="small" variant="outlined" style={{ marginBottom: 16 }}>
        <Space size={8}>
          <Button type="primary" danger disabled={selectedRowKeys.length === 0} onClick={handleBatchNotify}>批量发送通知</Button>
        </Space>
      </Card>

      <Table
        columns={columns}
        dataSource={filteredData.map((d, i) => ({ ...d, _key: i }))}
        rowKey="_key"
        rowSelection={rowSelection}
        pagination={false}
        bordered
        size="middle"
        scroll={{ x: 'max-content' }}
      />

      <Modal
        title="发送通知"
        open={notifyModalOpen}
        onOk={handleSendNotify}
        onCancel={() => { setNotifyModalOpen(false); setSelectedTemplate(''); }}
        okText="发送"
        cancelText="取消"
        okButtonProps={{ danger: true }}
        width={560}
        destroyOnClose
      >
        <Space direction="vertical" style={{ width: '100%', marginTop: 16 }} size={12}>
          {notifyRecord && (
            <Descriptions column={2} size="small">
              <Descriptions.Item label="服务商">{notifyRecord.name}</Descriptions.Item>
              <Descriptions.Item label="信用代码">{notifyRecord.code}</Descriptions.Item>
            </Descriptions>
          )}
          <div>
            <Typography.Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 4 }}>选择通知模板</Typography.Text>
            <Select placeholder="请选择通知模板" style={{ width: '100%' }} value={selectedTemplate || undefined} onChange={setSelectedTemplate} options={templateOptions} />
          </div>
          {selectedTemplate && (
            <Card size="small" variant="outlined" style={{ background: t.colorBgLayout }}>
              <Typography.Text strong style={{ fontSize: 13 }}>模板预览：</Typography.Text>
              <Typography.Text style={{ display: 'block', marginTop: 8, whiteSpace: 'pre-wrap', fontSize: 13 }}>
                {templatePreviews[selectedTemplate]}
              </Typography.Text>
            </Card>
          )}
        </Space>
      </Modal>
    </div>
  );
}
