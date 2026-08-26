/**
 * @name 集成系统配置（列表页）
 * 管理端 - 参数配置 - 集成系统配置
 * 维护与本系统对接的外部集成系统，按品类维度配置推送关系。
 */
import React from 'react';
import { useState } from 'react';
import { Typography, Button, Table, Tag, Card, Space, Switch, message, Popconfirm } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { categoryCodeLabelMap } from '../common/qualification-config';

interface IntegrationRecord {
  id: string;
  name: string;
  code: string;
  apiUrl: string;
  status: 'active' | 'inactive';
  description: string;
  categoryCodes: string[];
}

const initialData: IntegrationRecord[] = [
  {
    id: '1',
    name: '钻井工程资质管理系统',
    code: 'ZJGC',
    apiUrl: 'https://zjgc.example.com/api/push',
    status: 'active',
    description: '钻井工程类服务商资质专业化管理平台，接收基础信息与资质数据进行专业化管理。',
    categoryCodes: ['S0101000', 'S0102000'],
  },
  {
    id: '2',
    name: '物化探服务管理系统',
    code: 'WHT-FW',
    apiUrl: 'https://wht.example.com/api/provider',
    status: 'active',
    description: '物化探类服务商专业化管理平台，含设备台账与作业资质管理。',
    categoryCodes: ['S0201000'],
  },
  {
    id: '3',
    name: '管道工程安全监管平台',
    code: 'GD-GC',
    apiUrl: 'https://gd.example.com/api/safety',
    status: 'inactive',
    description: '管道工程安全监管平台，目前建设中。',
    categoryCodes: ['S0301000', 'S0501000'],
  },
];

const codeLabelMap = categoryCodeLabelMap;

export default function ConfigThirdparty() {
  const [data, setData] = useState<IntegrationRecord[]>(initialData);

  const toggleStatus = (id: string, checked: boolean) => {
    setData(prev => prev.map(r => r.id === id ? { ...r, status: checked ? 'active' : 'inactive' } : r));
    message.success(checked ? '已启用' : '已停用');
  };

  const handleDelete = (id: string) => {
    setData(prev => prev.filter(r => r.id !== id));
    message.success('已删除');
  };

  const columns = [
    { key: 'name', title: '系统名称', dataIndex: 'name', width: 220 },
    { key: 'code', title: '系统编码', dataIndex: 'code', width: 120 },
    { key: 'description', title: '说明', dataIndex: 'description', ellipsis: true },
    {
      key: 'categories',
      title: '关联品类',
      dataIndex: 'categoryCodes',
      width: 280,
      render: (codes: string[]) => (
        <Space size={4} wrap>
          {codes.map(c => (
            <Tag key={c} color="blue" style={{ fontSize: 12 }}>{codeLabelMap[c] || c}</Tag>
          ))}
          {codes.length === 0 && <Typography.Text type="secondary">暂无</Typography.Text>}
        </Space>
      ),
    },
    {
      key: 'status',
      title: '状态',
      dataIndex: 'status',
      width: 100,
      align: 'center' as const,
      render: (_: string, record: IntegrationRecord) => (
        <Switch
          size="small"
          checked={record.status === 'active'}
          onChange={(checked) => toggleStatus(record.id, checked)}
        />
      ),
    },
    {
      key: 'action',
      title: '操作',
      width: 150,
      align: 'center' as const,
      render: (_: unknown, record: IntegrationRecord) => (
        <Space size={4}>
          <Typography.Link
            style={{ fontSize: 13, color: '#ff4d4f' }}
            onClick={() => { window.location.hash = `#/admin/config-thirdparty-edit?id=${record.id}`; }}
          >
            编辑
          </Typography.Link>
          <Typography.Text type="secondary">|</Typography.Text>
          <Popconfirm title="确认删除此集成系统？" onConfirm={() => handleDelete(record.id)} okText="确认" cancelText="取消">
            <Typography.Link style={{ fontSize: 13, color: '#ff4d4f' }}>删除</Typography.Link>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Typography.Title level={4} style={{ marginTop: 0, marginBottom: 4 }}>集成系统配置</Typography.Title>
      <Typography.Text type="secondary" style={{ display: 'block', marginBottom: 16 }}>
        管理与本系统对接的外部集成系统。配置品类关联后，服务商注册审核通过时自动推送基础信息与服务品类数据至对应系统接口。
      </Typography.Text>

      <Button
        type="primary"
        danger
        icon={<PlusOutlined />}
        style={{ marginBottom: 16 }}
        onClick={() => { window.location.hash = '#/admin/config-thirdparty-edit'; }}
      >
        新建集成系统
      </Button>

      <Card variant="outlined" size="small">
        <Table
          columns={columns}
          dataSource={data.map((d, i) => ({ ...d, _key: i }))}
          rowKey="_key"
          pagination={false}
          bordered
          size="middle"
        />
      </Card>
    </>
  );
}
