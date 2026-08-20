/**
 * @name 准入通知配置（列表页）
 */
import { useState } from 'react';
import { Typography, Button, Table, Card, Row, Col, Space, Select, Modal, message } from 'antd';

interface NoticeTemplate {
  seq: number;
  name: string;
  unit: string;
  category: string;
  fillCount: number;
  fileDescCount: number;
  qualCount: number;
}

const initialData: NoticeTemplate[] = [
  { seq: 1, name: '注册补充资料通知', unit: '长庆油田分公司', category: '注册流程', fillCount: 3, fileDescCount: 1, qualCount: 2 },
  { seq: 2, name: '准入补充资料通知', unit: '西南油气田分公司', category: '准入流程', fillCount: 2, fileDescCount: 1, qualCount: 2 },
  { seq: 3, name: '变更补充资料通知', unit: '大庆油田有限责任公司', category: '变更流程', fillCount: 1, fileDescCount: 0, qualCount: 1 },
];

export default function ConfigNotice() {
  const [data, setData] = useState<NoticeTemplate[]>(initialData);
  const [filterUnit, setFilterUnit] = useState<string | undefined>(undefined);

  const filteredData = filterUnit ? data.filter(d => d.unit === filterUnit) : data;

  const handleReset = () => { setFilterUnit(undefined); };

  const handleDelete = (record: NoticeTemplate) => {
    Modal.confirm({
      title: '确认删除',
      content: `确定要删除通知模板「${record.name}」吗？`,
      okText: '确定',
      cancelText: '取消',
      okButtonProps: { danger: true },
      onOk: () => { setData(prev => prev.filter(d => d.seq !== record.seq)); message.success('已删除'); },
    });
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <Typography.Title level={4} style={{ margin: 0 }}>准入通知配置</Typography.Title>
        <Button type="primary" danger onClick={() => window.location.hash = '#/admin/config-notice-edit'}>+ 新增模板</Button>
      </div>

      <Card size="small" variant="outlined" style={{ marginBottom: 16 }}>
        <Row gutter={24} align="middle">
          <Col>
            <Space size={8}>
              <Typography.Text style={{ whiteSpace: 'nowrap' }}>使用单位：</Typography.Text>
              <Select style={{ width: 200 }} placeholder="请选择" allowClear value={filterUnit} onChange={setFilterUnit}
                options={[
                  { value: '长庆油田分公司', label: '长庆油田分公司' },
                  { value: '西南油气田分公司', label: '西南油气田分公司' },
                  { value: '大庆油田有限责任公司', label: '大庆油田有限责任公司' },
                ]} />
            </Space>
          </Col>
          <Col>
            <Space size={8}>
              <Button type="primary" danger>查询</Button>
              <Button onClick={handleReset}>重置</Button>
            </Space>
          </Col>
        </Row>
      </Card>

      <Table
        columns={[
          { key: 'seq', title: '序号', width: 60, align: 'center' as const, dataIndex: 'seq' },
          { key: 'unit', title: '使用单位', dataIndex: 'unit', width: 170 },
          { key: 'name', title: '模板名称', dataIndex: 'name' },
          { key: 'category', title: '适用流程', dataIndex: 'category', width: 110, align: 'center' as const },
          { key: 'fillCount', title: '填写项', dataIndex: 'fillCount', width: 70, align: 'center' as const },
          { key: 'fileDescCount', title: '文件描述', dataIndex: 'fileDescCount', width: 80, align: 'center' as const },
          { key: 'qualCount', title: '资质附件', dataIndex: 'qualCount', width: 80, align: 'center' as const },
          {
            key: 'action', title: '操作', width: 140, align: 'center' as const,
            render: (_: unknown, record: NoticeTemplate) => (
              <Space size={8}>
                <Typography.Link style={{ color: '#ff4d4f' }} onClick={() => window.location.hash = `#/admin/config-notice-edit?seq=${record.seq}`}>编辑</Typography.Link>
                <Typography.Link style={{ color: '#ff4d4f' }} onClick={() => handleDelete(record)}>删除</Typography.Link>
              </Space>
            ),
          },
        ]}
        dataSource={filteredData} rowKey="seq" bordered size="middle"
        pagination={{ pageSize: 10, showTotal: (t) => `共 ${t} 条` }}
      />
    </div>
  );
}
