/**
 * @name 服务商标签配置（列表页）
 * 管理端 - 参数配置 - 服务商标签配置
 * 配置服务商标签的触发规则，包括状态规则和集成系统规则。
 */
import React from 'react';
import { useState } from 'react';
import { Typography, Button, Table, Tag, Card, Space, Switch, message, Popconfirm, Input, Select } from 'antd';
import { PlusOutlined, SearchOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';

interface TagConfig {
  id: string;
  name: string;
  color: string;
  level: 'L1' | 'L2';
  enabled: boolean;
  description?: string;
  rule: {
    type: 'status' | 'integration';
    statusValue?: 'qualified' | 'formal' | 'pending' | 'frozen';
    integrationSystemId?: string;
  };
}

const colorOptions = [
  { label: '蓝色', value: 'blue', color: '#1677ff' },
  { label: '绿色', value: 'green', color: '#52c41a' },
  { label: '橙色', value: 'orange', color: '#fa8c16' },
  { label: '紫色', value: 'purple', color: '#722ed1' },
  { label: '青色', value: 'cyan', color: '#13c2c2' },
  { label: '红色', value: 'red', color: '#ff4d4f' },
  { label: '金色', value: 'gold', color: '#faad14' },
];

const statusOptions = [
  { label: '合格', value: 'qualified' },
  { label: '正式', value: 'formal' },
  { label: '待配码', value: 'pending' },
  { label: '已冻结', value: 'frozen' },
];

const integrationSystems = [
  { id: 'ZJGC', name: '钻井工程资质管理系统' },
  { id: 'WHT-FW', name: '物化探服务管理系统' },
  { id: 'GC-001', name: '承包商管理系统' },
  { id: 'EISC-001', name: 'EISC管理系统' },
];

const levelColors: Record<string, string> = {
  L1: 'blue',
  L2: 'orange',
};

const levelLabels: Record<string, string> = {
  L1: '状态标签',
  L2: '集成系统标签',
};

const getRuleDescription = (tag: TagConfig): string => {
  if (tag.rule.type === 'status') {
    const status = statusOptions.find(s => s.value === tag.rule.statusValue);
    return `状态 = ${status?.label || tag.rule.statusValue}`;
  }
  if (tag.rule.type === 'integration') {
    const system = integrationSystems.find(s => s.id === tag.rule.integrationSystemId);
    return `关联集成系统 = ${system?.name || tag.rule.integrationSystemId}`;
  }
  return '';
};

const initialTags: TagConfig[] = [
  {
    id: '1',
    name: '正式服务商',
    color: 'blue',
    level: 'L1',
    enabled: true,
    description: '状态为已生效的服务商',
    rule: { type: 'status', statusValue: 'formal' },
  },
  {
    id: '2',
    name: '合格服务商',
    color: 'green',
    level: 'L1',
    enabled: true,
    description: '通过资质审查，待配码的服务商',
    rule: { type: 'status', statusValue: 'qualified' },
  },
  {
    id: '3',
    name: '承包商',
    color: 'orange',
    level: 'L2',
    enabled: true,
    description: '钻井工程、采油工程、油田技术服务类服务商',
    rule: { type: 'integration', integrationSystemId: 'GC-001' },
  },
  {
    id: '4',
    name: 'EISC',
    color: 'purple',
    level: 'L2',
    enabled: true,
    description: '地面建设服务、物业安保类服务商',
    rule: { type: 'integration', integrationSystemId: 'EISC-001' },
  },
  {
    id: '5',
    name: '钻井工程资质管理系统',
    color: 'cyan',
    level: 'L2',
    enabled: true,
    description: '关联钻井工程资质管理集成系统的服务商',
    rule: { type: 'integration', integrationSystemId: 'ZJGC' },
  },
  {
    id: '6',
    name: '物化探服务管理系统',
    color: 'cyan',
    level: 'L2',
    enabled: true,
    description: '关联物化探服务管理集成系统的服务商',
    rule: { type: 'integration', integrationSystemId: 'WHT-FW' },
  },
];

export default function ConfigTag() {
  const [tags, setTags] = useState<TagConfig[]>(initialTags);
  const [searchName, setSearchName] = useState('');
  const [searchLevel, setSearchLevel] = useState<string | undefined>(undefined);
  const [searchEnabled, setSearchEnabled] = useState<boolean | undefined>(undefined);

  const filteredTags = tags.filter(tag => {
    const matchName = !searchName || tag.name.includes(searchName);
    const matchLevel = !searchLevel || tag.level === searchLevel;
    const matchEnabled = searchEnabled === undefined || tag.enabled === searchEnabled;
    return matchName && matchLevel && matchEnabled;
  });

  const handleToggleEnabled = (id: string, checked: boolean) => {
    setTags(prev => prev.map(tag => tag.id === id ? { ...tag, enabled: checked } : tag));
    message.success(checked ? '已启用' : '已禁用');
  };

  const handleDelete = (id: string) => {
    setTags(prev => prev.filter(tag => tag.id !== id));
    message.success('已删除');
  };

  const columns = [
    { key: 'name', title: '标签名称', dataIndex: 'name', render: (val: string, record: TagConfig) => <Tag color={record.color}>{val}</Tag> },
    { key: 'level', title: '标签层级', dataIndex: 'level', render: (val: string) => <Tag color={levelColors[val]}>{levelLabels[val]}</Tag> },
    { key: 'ruleType', title: '规则类型', render: (_: unknown, record: TagConfig) => record.rule.type === 'status' ? '状态规则' : '集成系统规则' },
    { key: 'ruleDesc', title: '规则内容', dataIndex: 'ruleDesc', render: (_: unknown, record: TagConfig) => getRuleDescription(record) },
    { key: 'enabled', title: '启用状态', dataIndex: 'enabled', width: 100, render: (val: boolean, record: TagConfig) => <Switch checked={val} onChange={(checked) => handleToggleEnabled(record.id, checked)} /> },
    {
      key: 'action', title: '操作', width: 120, render: (_: unknown, record: TagConfig) => (
        <Space>
          <Typography.Link href={`#/admin/config-tag-edit?id=${record.id}`}><EditOutlined /></Typography.Link>
          <Popconfirm title="确定删除该标签配置？" onConfirm={() => handleDelete(record.id)}>
            <Typography.Link type="danger"><DeleteOutlined /></Typography.Link>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Card size="small" variant="outlined" style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <Space size={16}>
            <Input
              placeholder="标签名称"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              style={{ width: 200 }}
              prefix={<SearchOutlined />}
            />
            <Select
              placeholder="标签层级"
              value={searchLevel}
              onChange={setSearchLevel}
              allowClear
              style={{ width: 120 }}
              options={[
                { label: 'L1 状态标签', value: 'L1' },
                { label: 'L2 集成系统标签', value: 'L2' },
              ]}
            />
            <Select
              placeholder="启用状态"
              value={searchEnabled}
              onChange={setSearchEnabled}
              allowClear
              style={{ width: 120 }}
              options={[
                { label: '已启用', value: true },
                { label: '已禁用', value: false },
              ]}
            />
          </Space>
          <Button type="primary" icon={<PlusOutlined />} href="#/admin/config-tag-edit">
            新建标签
          </Button>
        </div>
        <Table
          columns={columns}
          dataSource={filteredTags}
          rowKey="id"
          pagination={{ pageSize: 10 }}
          bordered
          size="middle"
        />
      </Card>
    </div>
  );
}
