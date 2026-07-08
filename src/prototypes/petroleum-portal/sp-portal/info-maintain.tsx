/**
 * @name 信息维护
 */
import { useState } from 'react';
import PortalLayout from '../common/portal-layout';
import { spGroups } from '../common/menu-data';
import { theme, Steps, Card, Form, Input, Select, Row, Col, Typography, message, Button as AntButton, Space, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

export default function SpInfoMaintain() {
  const { token: t } = theme.useToken();
  const [currentStep, setCurrentStep] = useState(0);

  const qualFiles = ['营业执照', '专业资质证书', '无重大违法违规承诺', '信用信息合规证明'];

  return (
    <PortalLayout groups={spGroups} activePath="/sp/info-maintain" portalType="sp">
      <Typography.Title level={4} style={{ marginTop: 0, marginBottom: 20 }}>信息维护</Typography.Title>

      <Steps current={currentStep} items={[{ title: '基本信息' }, { title: '资质信息' }]} size="small" style={{ marginBottom: 24 }} />

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
                    <Input defaultValue="2005-03-15" variant="filled" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="注册资本" required>
                    <Input defaultValue="5,000" suffix={<Typography.Text type="secondary">万元</Typography.Text>} variant="filled" />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Card>
        </>
      )}

      {currentStep === 1 && (
        <Card title="资质信息" variant="outlined" size="small" style={{ marginBottom: 16 }}>
          <Form layout="vertical">
            {qualFiles.map((file, i) => (
              <Form.Item key={i} label={file} required>
                <Upload customRequest={() => message.success('文件上传成功')}>
                  <AntButton icon={<UploadOutlined />}>上传文件</AntButton>
                </Upload>
              </Form.Item>
            ))}
          </Form>
        </Card>
      )}

      <div style={{ textAlign: 'center', marginTop: 24 }}>
        <Space size={12}>
          <AntButton disabled={currentStep === 0} onClick={() => setCurrentStep(0)}>上一步</AntButton>
          {currentStep === 0 && <AntButton type="primary" onClick={() => setCurrentStep(1)}>下一步</AntButton>}
          {currentStep === 1 && <AntButton type="primary" onClick={() => message.success('信息维护已保存')}>提交</AntButton>}
        </Space>
      </div>
    </PortalLayout>
  );
}
