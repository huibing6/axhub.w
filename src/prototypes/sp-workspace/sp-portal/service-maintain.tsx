/**
 * @name 服务维护
 */
import { useState } from 'react';
import { useFilterData } from '../common/hooks';
import { theme, Table, Input, Button, Card, Row, Col, Typography, Space, message, Form, Select } from 'antd';
import { showConfirm, ConfirmDialog, ActionModal } from '../common/components';

interface ServiceRow {
  key: number;
  index: number;
  code: string;
  name: string;
  level: string;
  type: string;
  unit: string;
  changeType: string;
  admissionSource: string;
}

export default function SpServiceMaintain() {
  const { token: t } = theme.useToken();
  const [form] = Form.useForm();
  const [editForm] = Form.useForm();

  const initialData: ServiceRow[] = [
    { key: 1, index: 1, code: 'S1001000', name: '租赁服务', level: '一级', type: '专业', unit: '长庆油田', changeType: '新增', admissionSource: '公开招标采购中标' },
    { key: 2, index: 2, code: 'S1001000', name: '租赁服务', level: '二级', type: '通用', unit: '长庆油田', changeType: '剔除', admissionSource: '其他公开方式' },
    { key: 3, index: 3, code: 'S1001000', name: '租赁服务', level: '二级', type: '专业', unit: '', changeType: '剔除', admissionSource: '公开招标采购中标' },
    { key: 4, index: 4, code: 'S1001000', name: '租赁服务', level: '二级', type: '通用', unit: '', changeType: '', admissionSource: '其他公开方式' },
    { key: 5, index: 5, code: 'S1001000', name: '租赁服务', level: '', type: '', unit: '', changeType: '', admissionSource: '' },
    { key: 6, index: 6, code: 'S1001000', name: '租赁服务', level: '', type: '', unit: '', changeType: '', admissionSource: '' },
  ];

  const [data, setData] = useState<ServiceRow[]>(initialData);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const [editOpen, setEditOpen] = useState(false);
  const [editRecord, setEditRecord] = useState<ServiceRow | null>(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [deleteRecord, setDeleteRecord] = useState<ServiceRow | null>(null);
  const [batchDeleteOpen, setBatchDeleteOpen] = useState(false);

  const { filters, setFilter, clearFilters, filteredData } = useFilterData(data, [
    { key: 'code', label: '服务品类编码' },
    { key: 'level', label: '级别' },
    { key: 'changeType', label: '变更类型' },
    { key: 'submitter', label: '提交人' },
  ]);

  const columns = [
    { key: 'index', title: '序号', width: 60, align: 'center' as const, dataIndex: 'index' },
    { key: 'code', title: '服务分类编码', dataIndex: 'code' },
    { key: 'name', title: '服务分类名称', dataIndex: 'name' },
    { key: 'level', title: '级别', dataIndex: 'level' },
    { key: 'type', title: '目录类型', dataIndex: 'type' },
    { key: 'unit', title: '管理单位', dataIndex: 'unit' },
    { key: 'changeType', title: '服务变更类型', dataIndex: 'changeType' },
    { key: 'admissionSource', title: '准入来源', dataIndex: 'admissionSource' },
    {
      key: 'action',
      title: '操作',
      width: 120,
      align: 'center' as const,
      render: (_: any, record: ServiceRow) => (
        <Space size={4}>
          <Typography.Link onClick={() => handleEdit(record)}>编辑</Typography.Link>
          <Typography.Text type="secondary">、</Typography.Text>
          <Typography.Link onClick={() => handleDeleteClick(record)} style={{ color: '#ff4d4f' }}>删除</Typography.Link>
        </Space>
      ),
    },
  ];

  const handleEdit = (record: ServiceRow) => {
    setEditRecord(record);
    editForm.setFieldsValue({ code: record.code, name: record.name, level: record.level, type: record.type, unit: record.unit });
    setEditOpen(true);
  };

  const handleEditOk = () => {
    editForm.validateFields().then(values => {
      setData(prev => prev.map(item =>
        item.key === editRecord?.key ? { ...item, ...values } : item
      ));
      setEditOpen(false);
      setEditRecord(null);
      editForm.resetFields();
      message.success('编辑成功');
    });
  };

  const handleDeleteClick = (record: ServiceRow) => {
    setDeleteRecord(record);
    setDeleteConfirmOpen(true);
  };

  const handleDeleteOk = () => {
    if (deleteRecord) {
      setData(prev => prev.filter(item => item.key !== deleteRecord.key));
      setSelectedRowKeys(prev => prev.filter(k => k !== deleteRecord.key));
      message.success('删除成功');
    }
    setDeleteConfirmOpen(false);
    setDeleteRecord(null);
  };

  const handleBatchDelete = () => {
    if (selectedRowKeys.length === 0) {
      message.warning('请先选择要删除的条目');
      return;
    }
    setBatchDeleteOpen(true);
  };

  const handleBatchDeleteOk = () => {
    setData(prev => prev.filter(item => !selectedRowKeys.includes(item.key)));
    setSelectedRowKeys([]);
    setBatchDeleteOpen(false);
    message.success('批量删除成功');
  };

  return (
    <div>
      {/* 标题行 */}
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 20 }}>
        <Typography.Title level={4} style={{ margin: 0 }}>服务维护</Typography.Title>
        <Typography.Text type="secondary">服务商名称：中海油能源发展股份有限公司</Typography.Text>
        <Typography.Text type="secondary">服务商编码：100001231</Typography.Text>
        <Typography.Text type="secondary">服务商状态：正常</Typography.Text>
      </div>

      {/* 查询条件 */}
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
      </Card>

      {/* 操作按钮 */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
        <Button type="primary" danger onClick={() => { window.location.hash = '#/sp/service-maintain/add'; }}>维护服务品类</Button>
        <Button type="primary" danger onClick={handleBatchDelete}>批量删除</Button>
      </div>

      {/* 数据表格 */}
      <Table
        columns={columns}
        dataSource={filteredData}
        rowSelection={{ selectedRowKeys, onChange: setSelectedRowKeys }}
        pagination={{ pageSize: 10, showSizeChanger: true, showTotal: (total: number) => `共 ${total} 条` }}
        bordered
        size="middle"
      />

      {/* 编辑服务品类弹窗 */}
      <ActionModal
        open={editOpen}
        title="编辑服务品类"
        onOk={handleEditOk}
        onCancel={() => { setEditOpen(false); setEditRecord(null); editForm.resetFields(); }}
      >
        <Form form={editForm} layout="vertical">
          <Form.Item name="code" label="服务品类编码" rules={[{ required: true, message: '请输入服务品类编码' }]}>
            <Input placeholder="请输入服务品类编码" />
          </Form.Item>
          <Form.Item name="name" label="服务品类名称" rules={[{ required: true, message: '请输入服务品类名称' }]}>
            <Input placeholder="请输入服务品类名称" />
          </Form.Item>
          <Form.Item name="level" label="服务品类等级" rules={[{ required: true, message: '请输入服务品类等级' }]}>
            <Input placeholder="请输入服务品类等级" />
          </Form.Item>
          <Form.Item name="type" label="服务品类类型" rules={[{ required: true, message: '请输入服务品类类型' }]}>
            <Input placeholder="请输入服务品类类型" />
          </Form.Item>
          <Form.Item name="unit" label="管理单位" rules={[{ required: true, message: '请输入管理单位' }]}>
            <Input placeholder="请输入管理单位" />
          </Form.Item>
        </Form>
      </ActionModal>

      {/* 单条删除确认弹窗 */}
      <ConfirmDialog
        open={deleteConfirmOpen}
        title="确认删除"
        content={`确定要删除服务品类「${deleteRecord?.name || ''}」吗？`}
        onOk={handleDeleteOk}
        onCancel={() => { setDeleteConfirmOpen(false); setDeleteRecord(null); }}
        danger
      />

      {/* 批量删除确认弹窗 */}
      <ConfirmDialog
        open={batchDeleteOpen}
        title="确认批量删除"
        content={`确定要删除选中的 ${selectedRowKeys.length} 条服务品类记录吗？`}
        onOk={handleBatchDeleteOk}
        onCancel={() => setBatchDeleteOpen(false)}
        danger
      />
    </div>
  );
}
