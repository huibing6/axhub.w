/**
 * @name 正式准入申请
 */
import { useState } from 'react';
import PortalLayout from '../common/portal-layout';
import { spGroups } from '../common/menu-data';
import { theme, Steps, Card, Form, Input, Select, Row, Col, Typography, message, Button as AntButton, Space, Table, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

export default function SpAdmission() {
  const { token: t } = theme.useToken();
  const [currentStep, setCurrentStep] = useState(0);

  const svcColumns = [
    { key: 'code', title: '服务分类编码', dataIndex: 'code' },
    { key: 'name', title: '服务分类名称', dataIndex: 'name' },
    { key: 'level', title: '级别', dataIndex: 'level' },
    { key: 'type', title: '目录类型', dataIndex: 'type' },
    { key: 'unit', title: '管理单位', dataIndex: 'unit' },
  ];

  const svcData = [
    { key: 1, code: 'S1001000', name: '租赁服务', level: '一级', type: '专业', unit: '长庆油田' },
    { key: 2, code: 'S1002000', name: '设备维保服务', level: '二级', type: '通用', unit: '长庆油田' },
  ];

  return (
    <PortalLayout groups={spGroups} activePath="/sp/admission" portalType="sp">
      <Typography.Title level={4} style={{ marginTop: 0, marginBottom: 4 }}>正式准入申请</Typography.Title>
      <Typography.Text type="secondary" style={{ display: 'block', marginBottom: 20 }}>基于中标结果的准入申请，请完善相关信息并提交审核</Typography.Text>

      <Steps current={currentStep} items={[{ title: '基本信息' }, { title: '服务目录' }, { title: '资质信息' }]} size="small" style={{ marginBottom: 24 }} />

      {currentStep === 0 && (
        <>
          <Card title="准入信息" variant="outlined" size="small" style={{ marginBottom: 16 }}>
            <Form layout="vertical">
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="准入来源" required>
                    <Select defaultValue="公开招标采购中标" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="准入类别" required>
                    <Typography.Text>新增准入服务商</Typography.Text>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="中标项目" required>
                    <Input defaultValue="2026年度江汉油田钻采设备维保服务项目" variant="filled" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="中标编号">
                    <Typography.Text>ZB-2026-JH-0318</Typography.Text>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Card>

          <Card title="基础信息" variant="outlined" size="small" style={{ marginBottom: 16 }}>
            <Form layout="vertical">
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="服务商名称" required>
                    <Input defaultValue="湖北江汉石油机械制造有限公司" variant="filled" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="统一社会信用代码" required>
                    <Input defaultValue="91420000706802345X" variant="filled" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="成立日期" required>
                    <Input type="date" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="注册资本" required>
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Card>
        </>
      )}

      {currentStep === 1 && (
        <Card title="服务目录" variant="outlined" size="small" style={{ marginBottom: 16 }}>
          <Table columns={svcColumns} dataSource={svcData} pagination={false} bordered size="middle" />
        </Card>
      )}

      {currentStep === 2 && (
        <Card title="资质信息" variant="outlined" size="small" style={{ marginBottom: 16 }}>
          <Form layout="vertical">
            <Form.Item label="营业执照" required>
              <Upload customRequest={() => message.info('文件上传功能待对接')}>
                <AntButton icon={<UploadOutlined />}>上传文件</AntButton>
              </Upload>
            </Form.Item>
            <Form.Item label="专业资质证书" required>
              <Upload customRequest={() => message.info('文件上传功能待对接')}>
                <AntButton icon={<UploadOutlined />}>上传文件</AntButton>
              </Upload>
            </Form.Item>
            <Form.Item label="无重大违法违规承诺" required>
              <Upload customRequest={() => message.info('文件上传功能待对接')}>
                <AntButton icon={<UploadOutlined />}>上传文件</AntButton>
              </Upload>
            </Form.Item>
            <Form.Item label="信用信息合规证明" required>
              <Upload customRequest={() => message.info('文件上传功能待对接')}>
                <AntButton icon={<UploadOutlined />}>上传文件</AntButton>
              </Upload>
            </Form.Item>
          </Form>
        </Card>
      )}

      <div style={{ textAlign: 'center', marginTop: 24 }}>
        <Space size={12}>
          <AntButton disabled={currentStep === 0} onClick={() => setCurrentStep(s => s - 1)}>上一步</AntButton>
          {currentStep < 2 && <AntButton type="primary" onClick={() => setCurrentStep(s => s + 1)}>下一步</AntButton>}
          {currentStep === 2 && <AntButton type="primary" onClick={() => message.success('准入申请已提交，请等待审核')}>提交</AntButton>}
        </Space>
      </div>
    </PortalLayout>
  );
}
