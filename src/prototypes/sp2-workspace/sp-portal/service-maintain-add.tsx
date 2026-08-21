/**
 * @name 维护服务品类
 * 服务商工作台2.0 - 服务维护·维护服务品类（改造自1.0，不再基于中标结果）
 * 服务商可自由从专业/通用目录（无范围限制）选择任意品类，按品类类型填写不同资质：
 * 专业品类需资质信用+资质附件（按专业目录配置）+服务能力；通用品类无需资质附件。
 */
import React from 'react';
import { useState } from 'react';
import {
  Card, Form, Table, Typography, Space, Input, Select, Row, Col, Upload, Button, message,
} from 'antd';
import { UploadOutlined, PlusOutlined } from '@ant-design/icons';
import { QualAttachCard, ConfirmDialog } from '../common/components';
import { ServiceCatalogModal, type SelectedService } from '../common/service-catalog';
import { getCategoryInstructions } from '../common/qualification-config';

interface ServiceItem {
  id: number;
  code: string;
  name: string;
  type: '专业' | '通用';
  level: string;
  expanded: boolean;
}

function TypeTag({ type }: { type: string }) {
  return (
    <span style={{
      display: 'inline-block', padding: '0 8px', borderRadius: 4, fontSize: 12,
      background: type === '专业' ? '#fff1f0' : '#e6f7ff',
      color: '#ff4d4f',
      border: `1px solid ${type === '专业' ? '#ffa39e' : '#91d5ff'}`,
    }}>{type}</span>
  );
}

function SectionLabel({ title }: { title: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
      <Typography.Text strong style={{ fontSize: 14 }}>{title}</Typography.Text>
      <span style={{ background: '#fff1f0', color: '#ff4d4f', fontSize: 11, padding: '0 6px', borderRadius: 3, border: '1px solid #ffa39e' }}>必填</span>
    </div>
  );
}

export default function SpServiceMaintainAdd() {
  const [services, setServices] = useState<ServiceItem[]>([
    { id: 1, code: 'S0101000', name: '咨询', type: '专业', level: '一级', expanded: false },
    { id: 2, code: 'S0401000', name: '仓储服务', type: '通用', level: '二级', expanded: false },
    { id: 3, code: 'S0301000', name: '工序外协加工服务', type: '专业', level: '一级', expanded: false },
  ]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const removeService = (id: number) => {
    setServices(prev => prev.filter(s => s.id !== id));
    setSelectedRowKeys(prev => prev.filter(k => k !== id));
  };

  const toggleExpand = (id: number) => {
    setServices(prev => prev.map(s => s.id === id ? { ...s, expanded: !s.expanded } : s));
  };

  const handleAddServices = (items: SelectedService[]) => {
    setServices(prev => [...prev, ...items.map(item => ({
      id: Date.now() + Math.random(),
      code: item.code,
      name: item.name,
      type: item.type,
      level: item.level,
      expanded: false,
    }))]);
  };

  const handleBatchDelete = () => {
    if (selectedRowKeys.length === 0) {
      message.warning('请先选择要删除的品类');
      return;
    }
    setServices(prev => prev.filter(s => !selectedRowKeys.includes(s.id)));
    setSelectedRowKeys([]);
    message.success('批量删除成功');
  };

  const handleSaveDraft = () => {
    message.success('草稿已暂存，可在「服务品类维护 - 待提交（暂存）数据」中查看并继续编辑');
  };

  const handleSubmitReview = () => {
    setConfirmOpen(true);
  };

  const columns = [
    { key: 'code', title: '服务品类码', width: 130, dataIndex: 'code' },
    { key: 'name', title: '服务品类名称', dataIndex: 'name' },
    {
      key: 'type', title: '品类类型', width: 100, align: 'center' as const, dataIndex: 'type',
      render: (v: string) => <TypeTag type={v} />,
    },
    { key: 'level', title: '品类等级', width: 90, align: 'center' as const, dataIndex: 'level' },
    {
      key: 'action', title: '操作', width: 130, align: 'center' as const,
      render: (_: unknown, record: ServiceItem) => (
        <Space size={8}>
          <Typography.Link style={{ fontSize: 13 }} onClick={() => toggleExpand(record.id)}>
            {record.expanded ? '合并' : '编辑'}
          </Typography.Link>
          <Typography.Link style={{ fontSize: 13, color: '#ff4d4f' }} onClick={() => removeService(record.id)}>删除</Typography.Link>
        </Space>
      ),
    },
  ];

  return (
    <div>
      {/* 面包屑标题 */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
        <Typography.Title level={4} style={{ margin: 0 }}>服务维护</Typography.Title>
        <Typography.Text type="secondary" style={{ fontSize: 14 }}>维护服务品类</Typography.Text>
      </div>

      {/* 提示横幅 */}
      <div style={{
        background: '#fffbe6', border: '1px solid #ffe58f', borderRadius: 4,
        padding: '10px 16px', marginBottom: 16, fontSize: 13, color: '#ad6800',
        display: 'flex', alignItems: 'center', gap: 8,
      }}>
        <span style={{ fontSize: 16 }}>⚠️</span>
        选择专业目录下需要进行专业资格审查，请按要求填写服务品类的资质信用、服务能力；通用目录品类无需上传资质附件
      </div>

      {/* 已添加的服务目录 */}
      <Card
        variant="outlined"
        size="small"
        title={<span style={{ fontSize: 14 }}>☑ 已添加的服务目录</span>}
        extra={
          <Space>
            <Button onClick={handleBatchDelete}>批量删除</Button>
            <Button type="primary" danger icon={<PlusOutlined />} onClick={() => setModalOpen(true)}>添加服务品类</Button>
          </Space>
        }
        style={{ marginBottom: 16 }}
      >
        <Table
          rowSelection={{ selectedRowKeys, onChange: setSelectedRowKeys }}
          columns={columns}
          dataSource={services}
          rowKey="id"
          pagination={false}
          bordered
          size="middle"
        />
      </Card>

      {/* 展开的资质信用、资质附件与服务能力（按品类类型） */}
      {services.filter(s => s.expanded).map(svc => (
        <div key={svc.id} style={{ marginBottom: 16 }}>
          {getCategoryInstructions(svc.code) && (
            <div style={{ marginBottom: 16 }}>
              <div style={{ background: '#fffbe6', border: '1px solid #ffe58f', borderRadius: 4, padding: '12px 16px' }}>
                <Typography.Text strong style={{ fontSize: 13, display: 'block', marginBottom: 8, color: '#ad6800' }}>📋 填报须知</Typography.Text>
                <Typography.Text style={{ fontSize: 13, whiteSpace: 'pre-wrap', lineHeight: 1.8 }}>
                  {getCategoryInstructions(svc.code)}
                </Typography.Text>
              </div>
            </div>
          )}
          <Card variant="outlined" size="small" style={{ marginBottom: 16 }}>
            <SectionLabel title="资质信用" />
            <Form layout="vertical">
              <Row gutter={24}>
                <Col span={12}>
                  <Form.Item label="资质等级" required>
                    <Select placeholder="请选择资质等级" options={[
                      { value: 'a', label: '甲级' },
                      { value: 'b', label: '乙级' },
                      { value: 'c', label: '丙级' },
                    ]} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="资质证书编号" required>
                    <Input placeholder="请输入资质证书编号" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="信用评级">
                    <Select placeholder="请选择信用评级" options={[
                      { value: 'aaa', label: 'AAA' },
                      { value: 'aa', label: 'AA' },
                      { value: 'a', label: 'A' },
                      { value: 'bbb', label: 'BBB' },
                    ]} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="资质证明文件">
                    <Upload beforeUpload={() => false}>
                      <Button icon={<UploadOutlined />}>上传文件</Button>
                    </Upload>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Card>

          {/* 资质附件（按专业目录配置；通用目录显示无需上传） */}
          <QualAttachCard categoryCode={svc.code} categoryName={svc.name} />

          <Card variant="outlined" size="small">
            <SectionLabel title="服务能力" />
            <Form layout="vertical">
              <Form.Item label="主要设备/装备情况" required>
                <Input.TextArea rows={3} placeholder="请描述拥有的主要设备、仪器等硬件条件" />
              </Form.Item>
              <Form.Item label="技术优势及特色" required>
                <Input.TextArea rows={3} placeholder="请描述核心技术能力、专利技术、工艺特色等" />
              </Form.Item>
            </Form>
          </Card>
        </div>
      ))}

      {/* 底部操作栏 */}
      <div style={{
        display: 'flex', justifyContent: 'flex-end', gap: 12,
        padding: '16px 0', borderTop: '1px solid #f0f0f0', marginTop: 16,
      }}>
        <Button onClick={() => window.history.back()}>取消</Button>
        <Button onClick={handleSaveDraft}>保存草稿</Button>
        <Button type="primary" danger onClick={handleSubmitReview}>提交审核</Button>
      </div>

      {/* 选择服务目录弹框（专业/通用，无限制） */}
      <ServiceCatalogModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleAddServices}
      />

      <ConfirmDialog
        open={confirmOpen}
        title="确认提交"
        content="确定要提交审核吗？"
        onOk={() => {
          setSubmitting(true);
          setTimeout(() => {
            setSubmitting(false);
            setConfirmOpen(false);
            message.success('已提交审核');
          }, 800);
        }}
        onCancel={() => setConfirmOpen(false)}
        confirmLoading={submitting}
      />
    </div>
  );
}