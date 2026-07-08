/**
 * @name 信息录入
 */
import { useState } from 'react';
import { theme, Typography, Card, Space, Input, Select, Button, Steps, Form, Row, Col, Table, message } from 'antd';
import PortalLayout from '../../common/portal-layout';
import { adminGroups } from '../../common/menu-data';

const serviceCategories = [
  { value: 'cat1', label: '钻采设备维保服务' },
  { value: 'cat2', label: '租赁服务' },
  { value: 'cat3', label: '运输服务' },
  { value: 'cat4', label: '技术服务' },
];

export default function EntryPage() {
  const { token: t } = theme.useToken();
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleCancel = () => {
    message.info('已取消');
  };

  const handleSave = () => {
    message.success('已暂存');
  };

  const handleSubmit = () => {
    message.success('正式准入申请已提交审核');
  };

  const categoryColumns = [
    { key: 'idx', title: '序号', width: 60, align: 'center' as const, dataIndex: 'idx' },
    { key: 'code', title: '服务分类码', width: 140, dataIndex: 'code', ellipsis: true },
    { key: 'name', title: '服务分类名称', width: 200, dataIndex: 'name', ellipsis: true },
  ];

  return (
    <PortalLayout groups={adminGroups} activePath="/admin/info-entry" portalType="admin">
      <Card variant="outlined" size="small">
        <Space direction="vertical" style={{ width: '100%' }} size={16}>
          <div>
            <Typography.Title level={4} style={{ margin: 0 }}>正式准入申请</Typography.Title>
            <Typography.Text type="secondary">基于中标结果的准入申请，请完善相关信息并提交审核</Typography.Text>
          </div>
          <Steps
            current={currentStep}
            items={[
              { title: '基本信息' },
              { title: '服务品类' },
            ]}
          />
          {currentStep === 0 && (
            <>
              <Card size="small" variant="outlined" title={<Space><span>☰</span><span>准入信息</span></Space>}>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item label="准入来源" required>
                      <Input defaultValue="公开招标采购中标" readOnly style={{ background: t.colorBgLayout }} />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="中标项目" required>
                      <Input defaultValue="2026年度江汉油田钻采设备维保服务项目" readOnly style={{ background: t.colorBgLayout }} />
                    </Form.Item>
                  </Col>
                </Row>
              </Card>
              <Card size="small" variant="outlined" title={<Space><span>📄</span><span>基础信息</span></Space>}>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item label="服务商名称" required>
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="统一社会信用代码" required>
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="服务商管理类型" required>
                      <Select defaultValue="请选择" style={{ width: '100%' }}>
                        <Select.Option value="请选择">请选择</Select.Option>
                        <Select.Option value="所属企业管理">所属企业管理</Select.Option>
                        <Select.Option value="总部管理">总部管理</Select.Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="联系人" required>
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="联系电话" required>
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>
              </Card>
            </>
          )}
          {currentStep === 1 && (
            <Card size="small" variant="outlined" title={<Space><span>📋</span><span>服务品类</span></Space>}>
              <Space direction="vertical" style={{ width: '100%' }} size={12}>
                <Select
                  mode="multiple"
                  placeholder="请选择服务品类"
                  style={{ width: '100%' }}
                  value={selectedCategories}
                  onChange={setSelectedCategories}
                  options={serviceCategories}
                />
                <Table
                  columns={categoryColumns}
                  dataSource={selectedCategories.map((cat, i) => {
                    const found = serviceCategories.find(c => c.value === cat);
                    return { idx: i + 1, code: cat, name: found?.label || cat, _key: i };
                  })}
                  rowKey="_key"
                  pagination={false}
                  bordered
                  size="small"
                />
              </Space>
            </Card>
          )}
          <Row justify="end">
            <Space size={12}>
              {currentStep > 0 && <Button onClick={() => setCurrentStep(s => s - 1)}>上一步</Button>}
              {currentStep < 1 && <Button type="primary" onClick={() => setCurrentStep(s => s + 1)}>下一步</Button>}
              {currentStep === 1 && <Button type="primary" onClick={handleSubmit}>提交</Button>}
              <Button onClick={handleSave}>暂存</Button>
              <Button onClick={handleCancel}>取消</Button>
            </Space>
          </Row>
        </Space>
      </Card>
    </PortalLayout>
  );
}
