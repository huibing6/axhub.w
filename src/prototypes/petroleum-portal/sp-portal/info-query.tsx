/**
 * @name 信息查询
 */
import PortalLayout from '../common/portal-layout';
import { spGroups } from '../common/menu-data';
import { theme, Card, Form, Input, Select, Row, Col, Typography, Button } from 'antd';

export default function SpInfoQuery() {
  const { token: t } = theme.useToken();
  return (
    <PortalLayout groups={spGroups} activePath="/sp/info-query" portalType="sp">
      <Button style={{ marginBottom: 16 }} onClick={() => window.history.back()}>返回</Button>
      <Card title="信息查询" variant="outlined" size="small" style={{ marginBottom: 16 }}>
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

      <Card title="管理信息" variant="outlined" size="small" style={{ marginBottom: 16 }}>
        <Form layout="vertical">
          <Form.Item label="是否内部服务商" required>
            <Typography.Text>外部服务商</Typography.Text>
          </Form.Item>
          <Form.Item label="内部组织">
            <Typography.Text>—</Typography.Text>
          </Form.Item>
        </Form>
      </Card>
    </PortalLayout>
  );
}
