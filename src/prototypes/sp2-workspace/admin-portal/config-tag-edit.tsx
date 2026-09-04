/**
 * @name 服务商标签配置（编辑页）
 * 管理端 - 参数配置 - 服务商标签配置
 * 新建/编辑标签配置，包含基础信息和规则配置。
 */
import React from 'react';
import { useState, useEffect } from 'react';
import { Typography, Card, Space, Button, Form, Input, Select, Radio, Switch, message, Tag } from 'antd';

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

const levelOptions = [
  { label: 'L1 状态标签', value: 'L1', description: '由状态触发' },
  { label: 'L2 集成系统标签', value: 'L2', description: '由集成系统触发（可自定义名称）' },
];

export default function ConfigTagEdit() {
  const [form] = Form.useForm();
  const [ruleType, setRuleType] = useState<'status' | 'integration'>('status');
  const isEdit = window.location.search.includes('id=');

  useEffect(() => {
    if (isEdit) {
      form.setFieldsValue({
        name: '承包商',
        color: 'orange',
        level: 'L2',
        enabled: true,
        description: '钻井工程、采油工程、油田技术服务类服务商',
        ruleType: 'integration',
        integrationSystemId: 'GC-001',
      });
      setRuleType('integration');
    }
  }, [isEdit]);

  const handleSave = () => {
    form.validateFields().then(values => {
      console.log('保存标签配置:', values);
      message.success(isEdit ? '修改成功' : '新建成功');
      window.location.hash = '#/admin/config-tag';
    });
  };

  const handleIntegrationChange = (systemId: string) => {
    const system = integrationSystems.find(s => s.id === systemId);
    if (system && !isEdit) {
      form.setFieldValue('name', system.name);
    }
  };

  return (
    <div>
      <Card size="small" variant="outlined" style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Space direction="vertical" size={4}>
            <Typography.Link onClick={() => window.location.hash = '#/admin/config-tag'} style={{ color: '#ff4d4f', fontSize: 13, display: 'block', marginBottom: 4 }}>← 返回列表</Typography.Link>
            <Space size={16} align="center">
              <Typography.Text type="secondary" style={{ fontSize: 12 }}>服务商标签配置</Typography.Text>
              <Typography.Text type="secondary" style={{ fontSize: 12 }}>&gt;</Typography.Text>
              <Typography.Text type="secondary" style={{ fontSize: 12 }}>{isEdit ? '编辑标签' : '新建标签'}</Typography.Text>
            </Space>
            <Typography.Title level={4} style={{ margin: '4px 0 0 0' }}>{isEdit ? '编辑标签配置' : '新建标签配置'}</Typography.Title>
          </Space>
          <Space>
            <Button onClick={() => window.location.hash = '#/admin/config-tag'}>取消</Button>
            <Button type="primary" onClick={handleSave}>{isEdit ? '保存' : '提交'}</Button>
          </Space>
        </div>
      </Card>

      <Card size="small" variant="outlined" title="基础信息" style={{ marginBottom: 16 }}>
        <Form form={form} layout="vertical" initialValues={{ level: 'L1', enabled: true }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0 24px' }}>
            <Form.Item name="name" label="标签名称" rules={[{ required: true, message: '请输入标签名称' }]}>
              <Input placeholder="请输入标签名称" />
            </Form.Item>
            <Form.Item name="color" label="标签颜色" rules={[{ required: true, message: '请选择标签颜色' }]}>
              <Select placeholder="请选择标签颜色">
                {colorOptions.map(opt => (
                  <Select.Option key={opt.value} value={opt.value}>
                    <Space>
                      <Tag color={opt.color} style={{ margin: 0 }}>{opt.label}</Tag>
                    </Space>
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name="level" label="标签层级" rules={[{ required: true, message: '请选择标签层级' }]}>
              <Select placeholder="请选择标签层级">
                {levelOptions.map(opt => (
                  <Select.Option key={opt.value} value={opt.value}>
                    <div>
                      <div>{opt.label}</div>
                      <div style={{ fontSize: 12, color: '#999' }}>{opt.description}</div>
                    </div>
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name="enabled" label="启用状态" valuePropName="checked">
              <Switch />
            </Form.Item>
            <Form.Item name="description" label="说明" style={{ gridColumn: 'span 2' }}>
              <Input.TextArea rows={2} placeholder="请输入标签说明" />
            </Form.Item>
          </div>
        </Form>
      </Card>

      <Card size="small" variant="outlined" title="触发规则配置">
        <Form form={form} layout="vertical" initialValues={{ ruleType: 'status' }}>
          <Form.Item name="ruleType" label="规则类型" rules={[{ required: true, message: '请选择规则类型' }]}>
            <Radio.Group onChange={(e) => setRuleType(e.target.value)}>
              <Radio.Button value="status">状态规则</Radio.Button>
              <Radio.Button value="integration">集成系统规则</Radio.Button>
            </Radio.Group>
          </Form.Item>

          {ruleType === 'status' && (
            <Form.Item name="statusValue" label="匹配状态" rules={[{ required: true, message: '请选择状态' }]}>
              <Select placeholder="请选择状态" style={{ width: 300 }}>
                {statusOptions.map(opt => (
                  <Select.Option key={opt.value} value={opt.value}>{opt.label}</Select.Option>
                ))}
              </Select>
            </Form.Item>
          )}

          {ruleType === 'integration' && (
            <Form.Item name="integrationSystemId" label="关联集成系统" rules={[{ required: true, message: '请选择集成系统' }]}>
              <Select placeholder="请选择集成系统" style={{ width: 300 }} onChange={handleIntegrationChange}>
                {integrationSystems.map(sys => (
                  <Select.Option key={sys.id} value={sys.id}>{sys.name}</Select.Option>
                ))}
              </Select>
            </Form.Item>
          )}
        </Form>

        <div style={{ marginTop: 16, padding: 16, background: '#f5f5f5', borderRadius: 6 }}>
          <Typography.Text type="secondary" style={{ fontSize: 13 }}>
            {ruleType === 'status'
              ? '当服务商状态匹配所选值时，自动打上此标签。'
              : '当服务商包含的品类关联了所选集成系统时，自动打上此标签。'}
          </Typography.Text>
        </div>
      </Card>
    </div>
  );
}
