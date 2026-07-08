/**
 * @name 注册服务商信息变更
 */
import { useState } from 'react';
import PortalLayout from '../common/portal-layout';
import { spGroups } from '../common/menu-data';
import { theme, Tabs, Card, Form, Input, Select, Button, Radio, Row, Col, Typography, Upload, Space, Table, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

export default function SpRegisterChange() {
  const { token: t } = theme.useToken();
  const [activeTab, setActiveTab] = useState('basic');

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

  const qualFiles = ['营业执照', '专业资质证书', '无重大违法违规承诺', '信用信息合规证明'];

  return (
    <PortalLayout groups={spGroups} activePath="/sp/register-change" portalType="sp">
      <Space size={16} style={{ marginBottom: 16 }}>
        <Typography.Title level={4} style={{ margin: 0 }}>注册服务商信息修改</Typography.Title>
        <Typography.Text type="secondary">服务商名称：中海油能源发展股份有限公司</Typography.Text>
        <Typography.Text type="secondary">服务商编码：100001231</Typography.Text>
      </Space>

      <Tabs
        items={[
          { key: 'basic', label: '基本信息修变更' },
          { key: 'qual', label: '资质文件变更' },
          { key: 'service', label: '服务品类信息变更' },
        ]}
        activeKey={activeTab}
        onChange={setActiveTab}
        style={{ marginBottom: 16 }}
      />

      {activeTab === 'basic' && (
        <>
          <Card title="基础信息" variant="outlined" size="small" style={{ marginBottom: 16 }}>
            <Form layout="vertical">
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="服务商名称" required>
                    <Input placeholder="请输入服务商全称" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="注册资本" required>
                    <Input suffix={<Typography.Text type="secondary">单位：万元</Typography.Text>} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="统一社会信用代码" required>
                    <Input placeholder="18位统一社会信用代码" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="成立日期" required>
                    <Input type="date" />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Card>

          <Card title="管理信息" variant="outlined" size="small" style={{ marginBottom: 16 }}>
            <Form layout="vertical">
              <Form.Item label="是否内部服务商" required>
                <Radio.Group defaultValue="external">
                  <Radio value="external">外部服务商</Radio>
                  <Radio value="internal">中国石油集团全资或控股子公司</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item label="权属关系证明">
                <Upload customRequest={() => message.info('文件上传功能待对接')}>
                  <Button icon={<UploadOutlined />}>上传文件</Button>
                </Upload>
              </Form.Item>
              <Form.Item label="内部组织">
                <Select placeholder="请选择内部组织" style={{ width: '100%' }} />
              </Form.Item>
            </Form>
          </Card>
        </>
      )}

      {activeTab === 'qual' && (
        <Card title="资质文件上传" variant="outlined" size="small" style={{ marginBottom: 16 }}>
          <Form layout="vertical">
            {qualFiles.map((file, i) => (
              <Form.Item key={i} label={file} required>
                <Upload customRequest={() => message.info('文件上传功能待对接')}>
                  <Button icon={<UploadOutlined />}>上传文件</Button>
                </Upload>
              </Form.Item>
            ))}
          </Form>
        </Card>
      )}

      {activeTab === 'service' && (
        <Card title="服务品类信息" variant="outlined" size="small" style={{ marginBottom: 16 }}>
          <Table columns={svcColumns} dataSource={svcData} pagination={false} bordered size="middle" />
        </Card>
      )}

      <div style={{ textAlign: 'center', marginTop: 24 }}>
        <Button type="primary" onClick={() => message.success('变更申请已提交')}>提交变更</Button>
      </div>
    </PortalLayout>
  );
}
