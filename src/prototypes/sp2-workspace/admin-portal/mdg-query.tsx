/**
 * @name MDG信息查询
 */
import React from 'react';
import { useState } from 'react';
import { theme, Typography, Card, Space, Input, Select, Button, Table, Tag, Modal, Descriptions, message } from 'antd';
import { useFilterData } from '../common/hooks';

const rawData = [
  { index: 1, spCode: '1000886989', spName: '中海油能源发展股份有限公司', mgmtType: '所属企业管理', adminUnit: '长庆油田', pushType: '新增', flowStatus: '处理中', applyTime: '2025-12-19 09:15', sendTime: '2025-12-19 09:15', completeTime: '2025-12-19 09:15', creator: '张三', sender: '张三', pushResult: '已推送至MDG主数据平台', rejectReason: '' },
  { index: 2, spCode: '1001003920', spName: '杰瑞石油装备技术有限公司', mgType: '总部管理', admin: '', pushType: '变更', flowStatus: '驳回', applyTime: '2025-12-17 15:03', sendTime: '2025-12-17 15:03', completeTime: '2025-12-17 15:03', creator: '李四', sender: '李四', pushResult: 'MDG平台校验失败，未推送成功', rejectReason: '统一社会信用代码与已有记录不一致，请核实后重新推送。' },
  { index: 3, spCode: '1000098405', spName: '镇江西门子母线有限公司', mgType: '总部管理', admin: '', pushType: '新增', flowStatus: '完成', applyTime: '2025-12-16 10:20', sendTime: '2025-12-16 10:20', completeTime: '2025-12-16 10:22', creator: '王五', sender: '王五', pushResult: '推送成功，MDG生成主数据编码 M20251216001', rejectReason: '' },
  { index: 4, spCode: '1000571968', spName: '山西建邦集团有限公司', mgType: '总部管理', admin: '', pushType: '变更', flowStatus: '终止', applyTime: '2025-12-14 11:08', sendTime: '2025-12-14 11:08', completeTime: '—', creator: '赵六', sender: '赵六', pushResult: '用户主动终止推送', rejectReason: '' },
];

const statusColors: Record<string, string> = {
  '处理中': 'blue',
  '驳回': 'red',
  '终止': 'default',
  '完成': 'green',
};

export default function MdgQuery() {
  const { token: t } = theme.useToken();
  const [spNameFilter, setSpNameFilter] = useState('');
  const [spCodeFilter, setSpCodeFilter] = useState('');
  const [pushTypeFilter, setPushTypeFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [detailOpen, setDetailOpen] = useState(false);
  const [detailRecord, setDetailRecord] = useState<any>(null);
  const { setFilter, filteredData, clearFilters } = useFilterData(rawData, [
    { key: 'spName', label: '服务商名称' },
    { key: 'spCode', label: '服务商编码' },
    { key: 'pushType', label: '推送类型' },
    { key: 'flowStatus', label: '状态' },
  ]);

  const handleSearch = () => {
    setFilter('spName', spNameFilter);
    setFilter('spCode', spCodeFilter);
    setFilter('pushType', pushTypeFilter);
    setFilter('flowStatus', statusFilter);
  };

  const handleReset = () => {
    setSpNameFilter('');
    setSpCodeFilter('');
    setPushTypeFilter('');
    setStatusFilter('');
    clearFilters();
  };

  const handleRepush = (record: any) => {
    message.success(`已重新推送 ${record.spName} 至 MDG`);
  };

  const columns = [
    { key: 'index', title: '序号', width: 50, align: 'center' as const, dataIndex: 'index' },
    { key: 'spCode', title: '服务商编码', width: 110, dataIndex: 'spCode', ellipsis: true },
    { key: 'spName', title: '服务商名称', width: 170, dataIndex: 'spName', ellipsis: true },
    { key: 'admin', title: '推送单位', width: 100, dataIndex: 'admin', ellipsis: true },
    { key: 'pushType', title: '推送类型', width: 80, align: 'center' as const, dataIndex: 'pushType', render: (v: string) => v || '—' },
    {
      key: 'flowStatus', title: '状态', width: 100, align: 'center' as const, dataIndex: 'flowStatus',
      render: (v: string) => v ? <Tag color={statusColors[v] || 'default'}>{v}</Tag> : '—',
    },
    { key: 'applyTime', title: '申请时间', width: 130, dataIndex: 'applyTime' },
    { key: 'sendTime', title: '发送时间', width: 130, dataIndex: 'sendTime' },
    { key: 'completeTime', title: '完成时间', width: 130, dataIndex: 'completeTime' },
    { key: 'creator', title: '创建人', width: 70, dataIndex: 'creator' },
    { key: 'sender', title: '发送人', width: 70, dataIndex: 'sender' },
    { key: 'rejectReason', title: '驳回原因', width: 120, dataIndex: 'rejectReason', ellipsis: true },
    {
      key: 'action', title: '操作', width: 150, align: 'center' as const,
      render: (_: unknown, record: any) => (
        <Space size={2}>
          <Typography.Link style={{ fontSize: 13, color: '#ff4d4f' }} onClick={() => { setDetailRecord(record); setDetailOpen(true); }}>查看</Typography.Link>
          {record.flowStatus === '驳回' && (
            <>
              <Typography.Text type="secondary">、</Typography.Text>
              <Typography.Link style={{ fontSize: 13, color: '#ff4d4f' }} onClick={() => { setDetailRecord(record); setDetailOpen(true); }}>编辑</Typography.Link>
              <Typography.Text type="secondary">、</Typography.Text>
              <Typography.Link style={{ fontSize: 13, color: '#ff4d4f' }} onClick={() => handleRepush(record)}>重新推送</Typography.Link>
            </>
          )}
          {record.flowStatus === '处理中' && (
            <>
              <Typography.Text type="secondary">、</Typography.Text>
              <Typography.Link style={{ fontSize: 13, color: '#ff4d4f' }} onClick={() => message.info('已终止推送')}>终止</Typography.Link>
            </>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Card size="small" variant="outlined" style={{ marginBottom: 16 }}>
        <Space direction="vertical" style={{ width: '100%' }} size={8}>
          <Typography.Text style={{ color: t.colorPrimary }}>MDG主数据</Typography.Text>
          <Typography.Title level={4} style={{ margin: 0 }}>MDG信息查询</Typography.Title>
          <Card size="small" variant="outlined" style={{ marginBottom: 0 }}>
            <Space direction="vertical" style={{ width: '100%' }} size={12}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr) auto', gap: 12, alignItems: 'end' }}>
                <div>
                  <Typography.Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 4 }}>服务商名称</Typography.Text>
                  <Input placeholder="请输入服务商名称" value={spNameFilter} onChange={e => setSpNameFilter(e.target.value)} />
                </div>
                <div>
                  <Typography.Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 4 }}>服务商编码</Typography.Text>
                  <Input placeholder="请输入服务商编码" value={spCodeFilter} onChange={e => setSpCodeFilter(e.target.value)} />
                </div>
                <div>
                  <Typography.Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 4 }}>推送类型</Typography.Text>
                  <Select placeholder="全部" allowClear style={{ width: '100%' }} value={pushTypeFilter || undefined} onChange={v => setPushTypeFilter(v || '')}>
                    <Select.Option value="新增">新增</Select.Option>
                    <Select.Option value="变更">变更</Select.Option>
                  </Select>
                </div>
                <Space>
                  <Button type="primary" danger onClick={handleSearch}>查询</Button>
                  <Button onClick={handleReset}>重置</Button>
                </Space>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr) auto', gap: 12, alignItems: 'end' }}>
                <div>
                  <Typography.Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 4 }}>状态</Typography.Text>
                  <Select placeholder="全部" allowClear style={{ width: '100%' }} value={statusFilter || undefined} onChange={v => setStatusFilter(v || '')}>
                    <Select.Option value="处理中">处理中</Select.Option>
                    <Select.Option value="驳回">驳回</Select.Option>
                    <Select.Option value="完成">完成</Select.Option>
                    <Select.Option value="终止">终止</Select.Option>
                  </Select>
                </div>
              </div>
            </Space>
          </Card>
        </Space>
      </Card>

      <Table
        columns={columns}
        dataSource={filteredData}
        rowKey="index"
        bordered
        size="middle"
        pagination={false}
        scroll={{ x: 'max-content' }}
      />

      <Modal
        title="MDG推送详情"
        open={detailOpen}
        onCancel={() => setDetailOpen(false)}
        footer={<Button type="primary" danger onClick={() => setDetailOpen(false)}>关闭</Button>}
        width={680}
        destroyOnClose
      >
        {detailRecord && (
          <Space direction="vertical" style={{ width: '100%' }} size={16}>
            <Typography.Title level={5} style={{ margin: 0 }}>推送信息</Typography.Title>
            <Descriptions column={1} bordered size="small">
              <Descriptions.Item label="服务商编码">{detailRecord.spCode}</Descriptions.Item>
              <Descriptions.Item label="服务商名称">{detailRecord.spName}</Descriptions.Item>
              <Descriptions.Item label="推送类型">{detailRecord.pushType || '—'}</Descriptions.Item>
              <Descriptions.Item label="状态">
                {detailRecord.flowStatus ? <Tag color={statusColors[detailRecord.flowStatus] || 'default'}>{detailRecord.flowStatus}</Tag> : '—'}
              </Descriptions.Item>
              <Descriptions.Item label="申请时间">{detailRecord.applyTime}</Descriptions.Item>
              <Descriptions.Item label="发送时间">{detailRecord.sendTime}</Descriptions.Item>
              <Descriptions.Item label="完成时间">{detailRecord.completeTime}</Descriptions.Item>
              <Descriptions.Item label="创建人">{detailRecord.creator}</Descriptions.Item>
              <Descriptions.Item label="发送人">{detailRecord.sender}</Descriptions.Item>
            </Descriptions>
            <Typography.Title level={5} style={{ margin: 0 }}>推送结果</Typography.Title>
            <Descriptions column={1} bordered size="small">
              <Descriptions.Item label="推送结果">{detailRecord.pushResult || '—'}</Descriptions.Item>
            </Descriptions>
            {detailRecord.flowStatus === '驳回' && (
              <Descriptions column={1} bordered size="small">
                <Descriptions.Item label="驳回原因">
                  <span style={{ color: '#ff4d4f' }}>{detailRecord.rejectReason || '—'}</span>
                </Descriptions.Item>
              </Descriptions>
            )}
          </Space>
        )}
      </Modal>
    </div>
  );
}