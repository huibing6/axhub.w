/**
 * @name 维护编辑 - 创建（选择服务商）
 * 中间过渡页：选择要维护的服务商后进入编辑详情
 */
import React from 'react';
import { useState } from 'react';
import { Typography, Form, Select, Button, Card, Divider, Space, Table, Tag, message } from 'antd';

const mockProviders = [
  { idx: 1, code: '10000100', name: '中海油能源发展股份有限公司', mgmtType: '所属企业管理', status: '正式' },
  { idx: 2, code: '10000101', name: '杰瑞石油装备技术有限公司', mgmtType: '总部管理', status: '正式' },
  { idx: 3, code: '10000102', name: '安东油田服务集团', mgmtType: '总部管理', status: '意向' },
  { idx: 4, code: '10000103', name: '海默科技（集团）股份有限公司', mgmtType: '所属企业管理', status: '正式' },
  { idx: 5, code: '10000104', name: '新疆贝肯能源工程股份有限公司', mgmtType: '总部管理', status: '正式' },
];

const statusColors: Record<string, string> = { '正式': 'success', '意向': 'processing', '暂停': 'warning' };

export default function MaintEditCreate() {
  const hash = window.location.hash;
  const fromCategory = hash.includes('from=category');
  const [form] = Form.useForm();
  const [selectedProvider, setSelectedProvider] = useState<any>(null);
  const [keyword, setKeyword] = useState('');

  const filteredData = mockProviders.filter(d =>
    !keyword || d.name.includes(keyword) || d.code.includes(keyword)
  );

  const handleNext = () => {
    if (!selectedProvider) {
      message.warning('请先选择一个服务商');
      return;
    }
    message.success(`已选择「${selectedProvider.name}」，进入${fromCategory ? '服务品类' : '基本信息'}编辑`);
    window.location.hash = `#/admin/info-edit-detail?from=${fromCategory ? 'category' : 'basic'}&sp=${selectedProvider.code}`;
  };

  const columns = [
    { key: 'idx', title: '序号', width: 50, align: 'center' as const, dataIndex: 'idx' },
    { key: 'code', title: '服务商编码', width: 110, dataIndex: 'code' },
    { key: 'name', title: '服务商名称', dataIndex: 'name', ellipsis: true },
    { key: 'mgmtType', title: '管理类型', width: 120, dataIndex: 'mgmtType' },
    {
      key: 'status', title: '服务商状态', width: 90, align: 'center' as const, dataIndex: 'status',
      render: (val: string) => <Tag color={statusColors[val] || 'default'}>{val}</Tag>,
    },
  ];

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
        <Button onClick={() => window.location.hash = '#/admin/maint-edit'}>← 返回列表</Button>
        <Typography.Title level={4} style={{ margin: 0 }}>
          {fromCategory ? '创建服务品类维护' : '创建基本信息维护'} - 选择服务商
        </Typography.Title>
      </div>

      <Card variant="outlined" size="small" style={{ marginBottom: 16 }}>
        <Form form={form} layout="inline">
          <Form.Item label="服务商名称">
            <input
              style={{ border: '1px solid #d9d9d9', borderRadius: 4, padding: '4px 11px', width: 240 }}
              placeholder="请输入服务商名称或编码"
              value={keyword}
              onChange={e => setKeyword(e.target.value)}
            />
          </Form.Item>
        </Form>
      </Card>

      <Card variant="outlined" size="small" style={{ marginBottom: 16 }}>
        <Table
          columns={columns}
          dataSource={filteredData.map((d, i) => ({ ...d, _key: i }))}
          rowKey="_key"
          pagination={false}
          bordered
          size="middle"
          rowClassName={(record) => selectedProvider?.idx === record.idx ? 'ant-table-row-selected' : ''}
          onRow={(record) => ({
            onClick: () => setSelectedProvider(record),
            style: { cursor: 'pointer' },
          })}
          locale={{ emptyText: '暂无匹配的服务商' }}
        />
      </Card>

      {selectedProvider && (
        <div style={{ background: '#f6ffed', border: '1px solid #b7eb8f', borderRadius: 4, padding: '8px 16px', marginBottom: 16, fontSize: 13 }}>
          已选择：<Typography.Text strong>{selectedProvider.name}</Typography.Text>
          <Typography.Text type="secondary" style={{ marginLeft: 8 }}>({selectedProvider.code})</Typography.Text>
        </div>
      )}

      <Divider />
      <Space>
        <Button type="primary" danger onClick={handleNext}>下一步</Button>
        <Button onClick={() => window.location.hash = '#/admin/maint-edit'}>取消</Button>
      </Space>
    </>
  );
}
