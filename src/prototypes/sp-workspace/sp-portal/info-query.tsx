/**
 * @name 信息查询
 * Read-only view of admission information
 */
import { theme, Card, Form, Input, Select, Row, Col, Typography, Button, Radio } from 'antd';

function ReadonlyField({ label, value, required }: { label: string; value: string; required?: boolean }) {
  return (
    <Form.Item label={label} required={required}>
      <Input value={value} disabled style={{ background: '#fafafa', color: '#333' }} />
    </Form.Item>
  );
}

function SectionTitle({ icon, title }: { icon: string; title: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
      <span style={{ fontSize: 16 }}>{icon}</span>
      <Typography.Text strong style={{ fontSize: 14 }}>{title}</Typography.Text>
    </div>
  );
}

export default function SpInfoQuery() {
  return (
    <div>
      {/* 标题 */}
      <Typography.Title level={4} style={{ marginTop: 0, marginBottom: 20 }}>信息查询</Typography.Title>

      {/* 信息查询 */}
      <Card variant="outlined" size="small" style={{ marginBottom: 16 }}>
        <SectionTitle icon="📋" title="信息查询" />
        <Form layout="vertical">
          {/* 准入信息 */}
          <Row gutter={16}>
            <Col span={12}>
              <ReadonlyField label="准入来源" value="公开招标采购中标" required />
            </Col>
            <Col span={12}>
              <ReadonlyField label="准入类别" value="新增准入服务商" required />
            </Col>
            <Col span={12}>
              <ReadonlyField label="中标项目" value="2026年度江汉油田钻采设备维保服务项目" required />
            </Col>
            <Col span={12}>
              <ReadonlyField label="中标编号" value="ZB-2026-JH-0318" />
            </Col>
          </Row>
        </Form>
      </Card>

      {/* 基础信息 */}
      <Card variant="outlined" size="small" style={{ marginBottom: 16 }}>
        <SectionTitle icon="🏢" title="基础信息" />
        <Form layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <ReadonlyField label="服务商名称" value="湖北江汉石油机械制造有限公司" required />
            </Col>
            <Col span={12}>
              <ReadonlyField label="统一社会信用代码" value="91420000706802345X" required />
            </Col>
            <Col span={12}>
              <ReadonlyField label="成立日期" value="2005-03-15" required />
            </Col>
            <Col span={12}>
              <ReadonlyField label="注册资本" value="5,000万元" required />
            </Col>
          </Row>
        </Form>
      </Card>

      {/* 管理信息 */}
      <Card variant="outlined" size="small" style={{ marginBottom: 16 }}>
        <SectionTitle icon="🏛️" title="管理信息" />
        <Form layout="vertical">
          <Form.Item label="是否内部服务商" required>
            <Radio.Group value="external" disabled>
              <Radio value="external">外部服务商</Radio>
              <Radio value="internal">中国石油集团全资或控股子公司</Radio>
            </Radio.Group>
          </Form.Item>
          <Row gutter={16}>
            <Col span={12}>
              <ReadonlyField label="内部组织" value="" />
            </Col>
            <Col span={12}>
              <ReadonlyField label="管理单位" value="中国石油天然气集团有限公司" />
            </Col>
          </Row>
          <Form.Item label="权属关系证明">
            <Button disabled style={{ background: '#fafafa' }}>上传文件</Button>
          </Form.Item>
        </Form>
      </Card>

      {/* 联系人信息 */}
      <Card variant="outlined" size="small" style={{ marginBottom: 16 }}>
        <SectionTitle icon="👤" title="联系人信息" />
        <Form layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <ReadonlyField label="联系人姓名" value="张明远" required />
            </Col>
            <Col span={12}>
              <ReadonlyField label="联系电话" value="138-0726-8856" required />
            </Col>
            <Col span={12}>
              <ReadonlyField label="电子邮箱" value="zhangmingyuan@jhxx.com" required />
            </Col>
            <Col span={12}>
              <ReadonlyField label="通讯地址" value="湖北省潜江市江汉油田矿区路18号" />
            </Col>
          </Row>
        </Form>
      </Card>

      {/* 公司情况 */}
      <Card variant="outlined" size="small" style={{ marginBottom: 16 }}>
        <SectionTitle icon="🏭" title="公司情况" />
        <Form layout="vertical">
          <Row gutter={16}>
            <Col span={8}>
              <ReadonlyField label="法定代表人姓名" value="王建华" required />
            </Col>
            <Col span={8}>
              <ReadonlyField label="币种" value="人民币（CNY）" />
            </Col>
            <Col span={8}>
              <ReadonlyField label="企业规模" value="中型企业" required />
            </Col>
            <Col span={8}>
              <ReadonlyField label="开户银行" value="中国工商银行潜江支行" />
            </Col>
            <Col span={8}>
              <ReadonlyField label="银行信用等级" value="AAA" required />
            </Col>
            <Col span={8}>
              <ReadonlyField label="公司网址" value="https://www.jhxxjx.com" />
            </Col>
            <Col span={8}>
              <ReadonlyField label="注册资本" value="5000" required />
            </Col>
            <Col span={8}>
              <ReadonlyField label="成立日期" value="2005/03/15" required />
            </Col>
            <Col span={8}>
              <ReadonlyField label="银行账号" value="6228480322888666" required />
            </Col>
            <Col span={8}>
              <ReadonlyField label="开户银行账号" value="4200-1286-5678-0001" required />
            </Col>
            <Col span={8}>
              <ReadonlyField label="公司电话" value="0728-6234567" required />
            </Col>
          </Row>
        </Form>
      </Card>

      {/* 详细信息 */}
      <Card variant="outlined" size="small" style={{ marginBottom: 16 }}>
        <SectionTitle icon="📍" title="详细信息" />
        <Form layout="vertical">
          <Row gutter={16}>
            <Col span={8}>
              <ReadonlyField label="国家" value="中国" required />
            </Col>
            <Col span={8}>
              <ReadonlyField label="省/直辖市" value="湖北省" required />
            </Col>
            <Col span={8}>
              <ReadonlyField label="城市" value="潜江市" />
            </Col>
            <Col span={12}>
              <ReadonlyField label="通讯地址" value="湖北省潜江市江汉油田矿区路18号" required />
            </Col>
            <Col span={12}>
              <ReadonlyField label="注册地址" value="湖北省潜江市江汉油田矿区路18号" required />
            </Col>
            <Col span={8}>
              <ReadonlyField label="邮编" value="433100" required />
            </Col>
            <Col span={16}>
              <Form.Item label="经营范围" required>
                <Input.TextArea
                  value="石油天然气钻采设备制造与维修；石油化工机械设备及配件制造与销售；油气田地面工程设备安装与调试；机械设备租赁及技术服务；压力管道安装及维修（凭资质经营）。"
                  disabled
                  rows={3}
                  style={{ background: '#fafafa', color: '#333' }}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>

      {/* 底部操作栏 */}
      <div style={{
        display: 'flex', justifyContent: 'flex-end', gap: 12,
        padding: '16px 0', borderTop: '1px solid #f0f0f0', marginTop: 16,
      }}>
        <Button disabled>保存草稿</Button>
        <Button type="primary" danger disabled>下一步</Button>
      </div>
    </div>
  );
}
