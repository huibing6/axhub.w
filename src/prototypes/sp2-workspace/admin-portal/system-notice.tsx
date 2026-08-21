/**
 * @name 系统通知配置
 * 列表页面，点击新增/编辑跳转到子页面
 */
import React from 'react';
import { useState } from 'react';
import { theme, Typography, Input, Select, Button, Table, Card, Row, Col, Tag, Space, Modal, message } from 'antd';
import { systemNoticeData, type SystemNotice } from '../common/qualification-config';

export default function SystemNoticeList() {
  const { token: t } = theme.useToken();
  const [data, setData] = useState<SystemNotice[]>(systemNoticeData);
  const [filterType, setFilterType] = useState<string | undefined>(undefined);

  const filteredData = filterType ? data.filter(d => d.type === filterType) : data;

  const handleReset = () => { setFilterType(undefined); };

  const handleDelete = (seq: number) => {
    Modal.confirm({
      title: '确认删除',
      content: '确定要删除该通知吗？',
      okText: '确定',
      cancelText: '取消',
      onOk: () => {
        setData(prev => prev.filter(d => d.seq !== seq));
        message.success('删除成功');
      },
    });
  };

  const handlePublish = (seq: number) => {
    setData(prev => prev.map(d => d.seq === seq ? { ...d, status: '已发布' as const } : d));
    message.success('通知已发布');
  };

  const handleToggleStatus = (seq: number) => {
    setData(prev => prev.map(d => {
      if (d.seq !== seq) return d;
      const newStatus = d.status === '已发布' ? '草稿' as const : '已发布' as const;
      return { ...d, status: newStatus };
    }));
    message.success('状态已更新');
  };

  return (
    <div>
      <Typography.Title level={4} style={{ margin: '0 0 16px' }}>系统通知配置</Typography.Title>

      <Card size="small" variant="outlined" style={{ marginBottom: 16 }}>
        <Row gutter={24} align="middle">
          <Col>
            <Space size={8}>
              <Typography.Text style={{ whiteSpace: 'nowrap' }}>通知类型：</Typography.Text>
              <Select
                style={{ width: 200 }}
                placeholder="请选择"
                allowClear
                value={filterType}
                onChange={setFilterType}
                options={[
                  { value: '系统通知', label: '系统通知' },
                  { value: '操作手册', label: '操作手册' },
                ]}
              />
            </Space>
          </Col>
          <Col>
            <Space size={8}>
              <Button type="primary">查询</Button>
              <Button onClick={handleReset}>重置</Button>
            </Space>
          </Col>
        </Row>
      </Card>

      <Card size="small" variant="outlined" style={{ marginBottom: 16 }}>
        <Row justify="space-between" align="middle">
          <Col>
            <Typography.Text type="secondary" style={{ fontSize: 12 }}>
              💡 系统通知展示在服务商工作台右侧通知列表，操作手册展示在左侧操作手册区域
            </Typography.Text>
          </Col>
          <Col>
            <Button type="primary" danger onClick={() => window.location.hash = '#/admin/system-notice-edit'}>
              + 新增通知
            </Button>
          </Col>
        </Row>
      </Card>

      <Table
        columns={[
          {
            key: 'type', title: '通知类型', dataIndex: 'type', width: 100,
            render: (val: string) => <Tag color={val === '系统通知' ? 'blue' : 'green'}>{val}</Tag>,
          },
          { key: 'title', title: '标题', dataIndex: 'title', ellipsis: true },
          {
            key: 'content', title: '内容摘要', dataIndex: 'content', width: 200, ellipsis: true,
            render: (val: string) => <Typography.Text type="secondary" style={{ fontSize: 12 }}>{val.slice(0, 50)}...</Typography.Text>,
          },
          {
            key: 'attachments', title: '附件', dataIndex: 'attachments', width: 80, align: 'center' as const,
            render: (val: { name: string }[]) => val.length > 0 ? <Tag>{val.length}</Tag> : '-',
          },
          { key: 'createTime', title: '创建时间', dataIndex: 'createTime', width: 140 },
          {
            key: 'status', title: '状态', dataIndex: 'status', width: 80, align: 'center' as const,
            render: (val: string) => <Tag color={val === '已发布' ? 'success' : 'default'}>{val}</Tag>,
          },
          {
            key: 'action', title: '操作', width: 180,
            render: (_: unknown, record: SystemNotice) => (
              <Space size={8}>
                <Typography.Link
                  style={{ color: '#ff4d4f' }}
                  onClick={() => window.location.hash = `#/admin/system-notice-edit?seq=${record.seq}`}
                >
                  编辑
                </Typography.Link>
                <Typography.Link
                  style={{ color: record.status === '已发布' ? '#faad14' : '#52c41a' }}
                  onClick={() => handleToggleStatus(record.seq)}
                >
                  {record.status === '已发布' ? '取消发布' : '发布'}
                </Typography.Link>
                <Typography.Link style={{ color: '#ff4d4f' }} onClick={() => handleDelete(record.seq)}>
                  删除
                </Typography.Link>
              </Space>
            ),
          },
        ]}
        dataSource={filteredData}
        rowKey="seq"
        bordered
        size="middle"
        pagination={{ pageSize: 10, showTotal: total => `共 ${total} 条` }}
      />
    </div>
  );
}
