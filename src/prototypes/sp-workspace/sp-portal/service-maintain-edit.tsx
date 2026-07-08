/**
 * @name 服务维护 - 编辑服务品类
 */
import { useState } from 'react';
import {
  theme, Card, Form, Input, Select, Row, Col, Typography, Upload, Checkbox, Table, Button, Space, message,
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { ConfirmDialog } from '../common/components';

function SectionTitle({ icon, title, tag }: { icon: string; title: string; tag?: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
      <span style={{ fontSize: 16 }}>{icon}</span>
      <Typography.Text strong style={{ fontSize: 14 }}>{title}</Typography.Text>
      {tag && (
        <span style={{
          background: '#ff4d4f', color: '#fff', fontSize: 12, padding: '0 6px',
          borderRadius: 4, lineHeight: '20px',
        }}>{tag}</span>
      )}
    </div>
  );
}

const selectedCategories = [
  { key: 1, code: '502010', name: '工程技术服务 / 生产及维修服务', type: '专业', level: '一级' },
  { key: 2, code: '601010', name: '办公服务 / 物业管理', type: '通用', level: '二级' },
];

export default function SpServiceMaintainEdit() {
  const [form] = Form.useForm();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const columns = [
    {
      key: 'select',
      width: 50,
      render: (_: any, record: any) => (
        <Checkbox
          checked={selectedRowKeys.includes(record.key)}
          onChange={(e) => {
            setSelectedRowKeys(prev =>
              e.target.checked ? [...prev, record.key] : prev.filter(k => k !== record.key)
            );
          }}
        />
      ),
    },
    { key: 'code', title: '服务品类码', dataIndex: 'code' },
    { key: 'name', title: '服务品类名称', dataIndex: 'name' },
    {
      key: 'type', title: '品类类型', dataIndex: 'type',
      render: (v: string) => (
        <span style={{
          display: 'inline-block', padding: '1px 8px', borderRadius: 4, fontSize: 12,
          background: v === '专业' ? '#fff1f0' : '#f6ffed',
          color: v === '专业' ? '#ff4d4f' : '#52c41a',
          border: `1px solid ${v === '专业' ? '#ffa39e' : '#b7eb8f'}`,
        }}>{v}</span>
      ),
    },
    { key: 'level', title: '品类等级', dataIndex: 'level' },
    {
      key: 'action', title: '操作', width: 120, align: 'center' as const,
      render: (_: any, record: any) => (
        <Space size={4}>
          <Typography.Link>{record.key === 2 ? '合并' : '编辑'}</Typography.Link>
          <Typography.Text type="secondary">|</Typography.Text>
          <Typography.Link style={{ color: '#ff4d4f' }}>删除</Typography.Link>
        </Space>
      ),
    },
  ];

  const handleSaveDraft = () => {
    message.success('草稿已保存');
  };

  const handleSubmitReview = () => {
    setConfirmOpen(true);
  };

  return (
    <div>
      {/* 面包屑标题 */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
        <Typography.Title level={4} style={{ margin: 0 }}>服务维护</Typography.Title>
        <Typography.Text type="secondary" style={{ fontSize: 14 }}>维护服务品类</Typography.Text>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 24, marginBottom: 20, borderBottom: '1px solid #f0f0f0', paddingBottom: 0 }}>
        <Typography.Text style={{ paddingBottom: 8, cursor: 'pointer' }}>已准入服务品类</Typography.Text>
        <Typography.Text style={{ paddingBottom: 8, color: '#ff4d4f', fontWeight: 500, borderBottom: '2px solid #ff4d4f' }}>已中标未准入服务品类</Typography.Text>
      </div>

      {/* 已选择的服务品类 */}
      <Card variant="outlined" size="small" style={{ marginBottom: 16 }}>
        <SectionTitle icon="☑️" title="已选择的服务品类" />
        <Table
          columns={columns}
          dataSource={selectedCategories}
          pagination={false}
          bordered
          size="middle"
        />
      </Card>

      {/* 资质信用 */}
      <Card variant="outlined" size="small" style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
          <SectionTitle icon="📄" title="资质信用" />
          <span style={{
            background: '#ff4d4f', color: '#fff', fontSize: 12, padding: '0 6px',
            borderRadius: 4, lineHeight: '20px',
          }}>必填</span>
        </div>
        <Form form={form} layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="资质等级" name="qualLevel" required>
                <Select placeholder="请选择资质等级" options={[
                  { value: '一级', label: '一级' },
                  { value: '二级', label: '二级' },
                  { value: '三级', label: '三级' },
                ]} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="资质证书编号" name="certNo" required>
                <Input placeholder="请输入资质证书编号" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="信用评级" name="creditRating">
                <Select placeholder="请选择信用评级" options={[
                  { value: 'AAA', label: 'AAA' },
                  { value: 'AA', label: 'AA' },
                  { value: 'A', label: 'A' },
                  { value: 'BBB', label: 'BBB' },
                ]} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="资质证明文件" name="certFile">
                <Upload customRequest={() => message.info('文件上传功能待对接')}>
                  <Button icon={<UploadOutlined />}>上传文件</Button>
                </Upload>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>

      {/* 服务能力 */}
      <Card variant="outlined" size="small" style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
          <SectionTitle icon="⚙️" title="服务能力" />
          <span style={{
            background: '#ff4d4f', color: '#fff', fontSize: 12, padding: '0 6px',
            borderRadius: 4, lineHeight: '20px',
          }}>必填</span>
        </div>
        <Form form={form} layout="vertical">
          <Form.Item label="主要设备/装备情况" name="equipment" required>
            <Input.TextArea placeholder="请描述拥有的主要设备、仪器等硬件条件" rows={4} />
          </Form.Item>
          <Form.Item label="技术优势及特色" name="techAdvantage" required>
            <Input.TextArea placeholder="请描述核心技术能力、专利技术、工艺特色等" rows={4} />
          </Form.Item>
        </Form>
      </Card>

      {/* 底部操作栏 */}
      <div style={{
        display: 'flex', justifyContent: 'flex-end', gap: 12,
        padding: '16px 0', borderTop: '1px solid #f0f0f0', marginTop: 16,
      }}>
        <Button onClick={() => window.history.back()}>取消</Button>
        <Button onClick={handleSaveDraft}>保存草稿</Button>
        <Button type="primary" danger onClick={handleSubmitReview}>提交审核</Button>
      </div>

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
