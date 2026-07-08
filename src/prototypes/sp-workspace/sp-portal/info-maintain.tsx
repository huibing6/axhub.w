/**
 * @name 信息维护
 * 2 tabs: 基本信息 (multi-section form) + 资质信息 (file upload table)
 */
import { useState } from 'react';
import { ConfirmDialog } from '../common/components';
import {
  theme, Card, Form, Input, Select, Row, Col, Typography,
  message, Button as AntButton, Upload, Radio, Checkbox, DatePicker, Tabs,
} from 'antd';
import { UploadOutlined, PlusOutlined } from '@ant-design/icons';

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

export default function SpInfoMaintain() {
  const [activeTab, setActiveTab] = useState('basic');
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [basicForm] = Form.useForm();

  const requiredDocTypes = [
    '营业执照',
    '专业资质证书',
    '无重大违法违规承诺',
    '信用信息合规（4大平台无黑名单）',
    '服务商准入承诺书',
    '中标通知书',
  ];

  const handleSaveDraft = () => {
    message.success('草稿已保存');
  };

  const handleSubmitReview = () => {
    setConfirmOpen(true);
  };

  /* ═══════════ Tab 1: 基本信息 ═══════════ */
  const renderBasicInfo = () => (
    <>
      {/* 准入信息 */}
      <Card variant="outlined" size="small" style={{ marginBottom: 16 }}>
        <SectionTitle icon="📋" title="准入信息" />
        <Form form={basicForm} layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="准入来源" name="admissionSource">
                <Select defaultValue="公开招标采购中标" options={[
                  { value: '公开招标采购中标', label: '公开招标采购中标' },
                ]} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="准入类别" name="admissionCategory">
                <Select defaultValue="新增准入服务商" options={[
                  { value: '新增准入服务商', label: '新增准入服务商' },
                ]} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="中标项目" name="bidProject">
                <Input defaultValue="2026年度江汉油田钻采设备维保服务项目" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="中标编号">
                <Input defaultValue="ZB-2026-JH-0318" disabled />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>

      {/* 基础信息 */}
      <Card variant="outlined" size="small" style={{ marginBottom: 16 }}>
        <SectionTitle icon="🏢" title="基础信息" />
        <Form form={basicForm} layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="服务商名称" name="companyName">
                <Input defaultValue="湖北江汉石油机械制造有限公司" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="统一社会信用代码" name="creditCode">
                <Input defaultValue="91420000706802345X" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="成立日期" name="estDate">
                <Input defaultValue="2005-03-15" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="注册资本" name="regCapital">
                <Input defaultValue="5,000" suffix={<Typography.Text type="secondary">万元</Typography.Text>} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>

      {/* 管理信息 */}
      <Card variant="outlined" size="small" style={{ marginBottom: 16 }}>
        <SectionTitle icon="🏛️" title="管理信息" />
        <Form form={basicForm} layout="vertical">
          <Form.Item label="是否内部服务商" name="isInternal">
            <Radio.Group defaultValue="external">
              <Radio value="external">外部服务商</Radio>
              <Radio value="internal">中国石油集团全资或控股子公司</Radio>
            </Radio.Group>
          </Form.Item>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="内部组织" name="internalOrg">
                <Select placeholder="请选择内部组织" options={[
                  { value: ' organization1', label: '组织1' },
                ]} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="管理单位" name="manageUnit">
                <Input defaultValue="中国石油天然气集团有限公司" disabled />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item label="权属关系证明" name="ownershipProof">
            <Upload customRequest={() => message.info('文件上传功能待对接')}>
              <AntButton icon={<UploadOutlined />}>上传文件</AntButton>
            </Upload>
          </Form.Item>
        </Form>
      </Card>

      {/* 联系人信息 */}
      <Card variant="outlined" size="small" style={{ marginBottom: 16 }}>
        <SectionTitle icon="👤" title="联系人信息" />
        <Form form={basicForm} layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="联系人姓名" name="contactPerson">
                <Input defaultValue="张明远" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="联系电话" name="contactPhone">
                <Input defaultValue="138-0726-8856" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="电子邮箱" name="contactEmail">
                <Input defaultValue="zhangmingyuan@jhxx.com" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="通讯地址" name="contactAddress">
                <Input defaultValue="湖北省潜江市江汉油田矿区路18号" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>

      {/* 公司情况 */}
      <Card variant="outlined" size="small" style={{ marginBottom: 16 }}>
        <SectionTitle icon="🏭" title="公司情况" />
        <Form form={basicForm} layout="vertical">
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item label="法定代表人姓名" name="legalPerson">
                <Input defaultValue="王建华" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="币种" name="currency">
                <Select defaultValue="CNY" options={[
                  { value: 'CNY', label: '人民币 (CNY)' },
                ]} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="企业规模" name="companyScale">
                <Select defaultValue="中型企业" options={[
                  { value: '中型企业', label: '中型企业' },
                  { value: '大型企业', label: '大型企业' },
                  { value: '小型企业', label: '小型企业' },
                ]} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="开户银行" name="bankName">
                <Input defaultValue="中国工商银行潜江支行" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="银行信用等级" name="bankRating">
                <Select defaultValue="AAA" options={[
                  { value: 'AAA', label: 'AAA' },
                  { value: 'AA', label: 'AA' },
                  { value: 'A', label: 'A' },
                ]} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="公司网址" name="website">
                <Input defaultValue="https://www.jhxxjx.com" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="注册资本" name="regCapital2">
                <Input defaultValue="5000" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="成立日期" name="estDate2">
                <Input defaultValue="2005/03/15" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="银行账号" name="bankAccount">
                <Input defaultValue="6228480328888666" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="开户银行账号" name="bankAccountNo">
                <Input defaultValue="4200-1286-5678-0001" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="公司电话" name="companyPhone">
                <Input defaultValue="0728-6234567" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>

      {/* 详细信息 */}
      <Card variant="outlined" size="small" style={{ marginBottom: 16 }}>
        <SectionTitle icon="📍" title="详细信息" />
        <Form form={basicForm} layout="vertical">
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item label="国家" name="country">
                <Select defaultValue="中国" options={[{ value: '中国', label: '中国' }]} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="省/直辖市" name="province">
                <Select defaultValue="湖北省" options={[{ value: '湖北省', label: '湖北省' }]} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="城市" name="city">
                <Input defaultValue="潜江市" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="通讯地址" name="mailAddress">
                <Input defaultValue="湖北省潜江市江汉油田矿区路18号" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="注册地址" name="regAddress">
                <Input defaultValue="湖北省潜江市江汉油田矿区路18号" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="邮编" name="postcode">
                <Input defaultValue="433100" />
              </Form.Item>
            </Col>
            <Col span={16}>
              <Form.Item label="经营范围" name="businessScope">
                <Input.TextArea defaultValue="石油天然气钻采设备制造与维修；石油化工机械设备及配件制造与销售；油气田地面工程设备安装与调试；机械设备租赁及技术服务；压力管道安装及维修（凭资质经营）。" rows={3} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>

      {/* 企业概况 */}
      <Card variant="outlined" size="small" style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
          <SectionTitle icon="👥" title="企业概况" />
          <span style={{
            background: '#ff4d4f', color: '#fff', fontSize: 12, padding: '0 6px',
            borderRadius: 4, lineHeight: '20px',
          }}>必填</span>
        </div>
        <Form form={basicForm} layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="服务队伍人数" name="teamSize" required>
                <Input placeholder="请输入服务队伍总人数" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="技术人员数量" name="techStaff" required>
                <Input placeholder="请输入技术人员数量" />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item label="人员资质情况" name="staffQualification" required>
            <Input.TextArea placeholder="请描述主要人员的资质证书、执业资格等情况" rows={3} />
          </Form.Item>
        </Form>
      </Card>

      {/* 经营情况 */}
      <Card variant="outlined" size="small" style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
          <SectionTitle icon="📊" title="经营情况" />
          <span style={{
            background: '#ff4d4f', color: '#fff', fontSize: 12, padding: '0 6px',
            borderRadius: 4, lineHeight: '20px',
          }}>必填</span>
        </div>
        <Form form={basicForm} layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="近三年营业收入（万元）" name="revenue3y" required>
                <Input placeholder="如：2022年1200万/2023年1500万/2024年1800万" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="近三年净利润（万元）" name="netProfit3y">
                <Input placeholder="如：2022年120万/2023年180万/2024年200万" />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item label="主要业务范围" name="mainBusiness" required>
            <Input.TextArea placeholder="请描述主要业务范围及核心竞争优势" rows={3} />
          </Form.Item>
        </Form>
      </Card>

      {/* 服务业绩 */}
      <Card variant="outlined" size="small" style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
          <SectionTitle icon="🏆" title="服务业绩" />
          <span style={{
            background: '#ff4d4f', color: '#fff', fontSize: 12, padding: '0 6px',
            borderRadius: 4, lineHeight: '20px',
          }}>必填</span>
        </div>
        <Form form={basicForm} layout="vertical">
          <Form.Item label="主要项目业绩" name="majorProjects" required>
            <Input.TextArea placeholder="请列举近三年的主要服务项目名称、甲方单位、项目金额等" rows={4} />
          </Form.Item>
          <Form.Item label="与中国石油合作经历" name="cnpcHistory">
            <Input.TextArea placeholder="请描述与中国石油集团及其下属单位的合作历史" rows={3} />
          </Form.Item>
        </Form>
      </Card>

      {/* QHSE管理 */}
      <Card variant="outlined" size="small" style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
          <SectionTitle icon="🛡️" title="QHSE管理" />
          <span style={{
            background: '#ff4d4f', color: '#fff', fontSize: 12, padding: '0 6px',
            borderRadius: 4, lineHeight: '20px',
          }}>必填</span>
        </div>
        <Form form={basicForm} layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="质量管理体系认证" name="qualityCert" required>
                <Select placeholder="请选择" options={[
                  { value: 'iso9001', label: 'ISO 9001' },
                  { value: 'api', label: 'API 认证' },
                ]} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="HSE管理体系" name="hseCert" required>
                <Select placeholder="请选择" options={[
                  { value: 'iso14001', label: 'ISO 14001' },
                  { value: 'iso45001', label: 'ISO 45001' },
                ]} />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item label="安全生产记录" name="safetyRecord">
            <Input.TextArea placeholder="请描述近三年安全生产情况，是否有重大安全事故" rows={3} />
          </Form.Item>
          <Form.Item name="needOnSiteAudit">
            <Checkbox>需要现场审核（根据服务类别及风险评估结果，必要时安排现场审核）</Checkbox>
          </Form.Item>
        </Form>
      </Card>

      {/* ESG管理 */}
      <Card variant="outlined" size="small" style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
          <SectionTitle icon="🌱" title="ESG管理" />
          <span style={{
            background: '#ff4d4f', color: '#fff', fontSize: 12, padding: '0 6px',
            borderRadius: 4, lineHeight: '20px',
          }}>必填</span>
        </div>
        <Form form={basicForm} layout="vertical">
          <Form.Item label="环境管理措施" name="envManagement">
            <Input.TextArea placeholder="请描述企业在环境保护方面采取的主要措施" rows={3} />
          </Form.Item>
          <Form.Item label="社会责任" name="socialResponsibility">
            <Input.TextArea placeholder="请描述企业在社会责任方面的主要实践" rows={3} />
          </Form.Item>
          <Form.Item label="公司治理" name="corporateGovernance">
            <Input.TextArea placeholder="请描述企业治理结构和合规管理制度" rows={3} />
          </Form.Item>
        </Form>
      </Card>
    </>
  );

  /* ═══════════ Tab 2: 资质信息 ═══════════ */
  const renderQualificationInfo = () => (
    <>
      {/* Steps indicator for qualification tab */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
          {['基本信息', '资质信息'].map((label, i) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{
                width: 28, height: 28, borderRadius: '50%', display: 'flex',
                alignItems: 'center', justifyContent: 'center', fontSize: 13,
                background: i === 0 ? '#52c41a' : '#ff4d4f',
                color: '#fff',
              }}>
                {i === 0 ? '✓' : i + 1}
              </div>
              <Typography.Text style={{
                marginLeft: 8, marginRight: 16, fontSize: 13,
                color: i === 1 ? '#ff4d4f' : '#52c41a',
              }}>{label}</Typography.Text>
              {i < 1 && <div style={{ width: 80, height: 1, background: '#52c41a', marginRight: 16 }} />}
            </div>
          ))}
        </div>
      </div>

      {/* 资质文件上传 */}
      <Card variant="outlined" size="small" style={{ marginBottom: 16 }}>
        <SectionTitle icon="📄" title="资质文件上传" />
        <div style={{ border: '1px solid #f0f0f0', borderRadius: 8, overflow: 'hidden' }}>
          {/* 表头 */}
          <div style={{
            display: 'grid', gridTemplateColumns: '200px 1fr 160px 300px',
            background: '#fafafa', padding: '12px 16px', borderBottom: '1px solid #f0f0f0',
            fontWeight: 500, fontSize: 13,
          }}>
            <span>文件类型</span>
            <span>文件上传</span>
            <span>备注</span>
            <span>有效时间</span>
          </div>

          {/* 必填文件行 */}
          {requiredDocTypes.map((docType) => (
            <div key={docType} style={{
              display: 'grid', gridTemplateColumns: '200px 1fr 160px 300px',
              padding: '12px 16px', borderBottom: '1px solid #f0f0f0',
              alignItems: 'center', gap: 12,
            }}>
              <span style={{ fontSize: 13 }}>
                <span style={{ color: '#ff4d4f', marginRight: 4 }}>*</span>
                {docType}
              </span>
              <div>
                <Upload customRequest={() => message.info('文件上传功能待对接')}>
                  <AntButton icon={<UploadOutlined />}>上传文件</AntButton>
                </Upload>
              </div>
              <Input placeholder="备注" size="small" />
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                <DatePicker placeholder="年/月/日" size="small" style={{ width: 110 }} />
                <Typography.Text type="secondary">至</Typography.Text>
                <DatePicker placeholder="年/月/日" size="small" style={{ width: 110 }} />
                <Checkbox>永久有效</Checkbox>
              </div>
            </div>
          ))}

          {/* 自定义附件行（已上传） */}
          <div style={{
            display: 'grid', gridTemplateColumns: '200px 1fr 160px 300px',
            padding: '12px 16px', borderBottom: '1px solid #f0f0f0',
            alignItems: 'center', gap: 12,
          }}>
            <span style={{ fontSize: 13 }}>ISO 9001 质量管理体系认证证书</span>
            <div>
              <Typography.Text style={{ fontSize: 13 }}>ISO9001_cert.pdf</Typography.Text>
              <div style={{ marginTop: 4 }}>
                <Typography.Link style={{ fontSize: 12 }}>预览</Typography.Link>
                <Typography.Link style={{ fontSize: 12, marginLeft: 8 }}>替换</Typography.Link>
                <Typography.Link style={{ fontSize: 12, marginLeft: 8, color: '#ff4d4f' }}>删除</Typography.Link>
              </div>
            </div>
            <Input defaultValue="自定义附件" size="small" />
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <DatePicker size="small" style={{ width: 110 }} placeholder="年/月/日" />
              <Typography.Text type="secondary">至</Typography.Text>
              <DatePicker size="small" style={{ width: 110 }} placeholder="年/月/日" />
            </div>
          </div>
        </div>

        {/* 添加自定义附件 */}
        <div style={{ marginTop: 12 }}>
          <AntButton type="link" icon={<PlusOutlined />} style={{ padding: 0 }}>添加自定义附件</AntButton>
        </div>
      </Card>
    </>
  );

  return (
    <div>
      <Typography.Title level={4} style={{ marginTop: 0, marginBottom: 20 }}>信息维护</Typography.Title>

      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        items={[
          { key: 'basic', label: '基本信息', children: renderBasicInfo() },
          { key: 'qualification', label: '资质信息', children: renderQualificationInfo() },
        ]}
      />

      {/* 底部操作栏 */}
      <div style={{
        display: 'flex',
        justifyContent: activeTab === 'basic' ? 'flex-end' : 'flex-end',
        gap: 12,
        padding: '16px 0',
        borderTop: '1px solid #f0f0f0',
        marginTop: 16,
      }}>
        {activeTab === 'qualification' && (
          <AntButton onClick={() => setActiveTab('basic')}>上一步</AntButton>
        )}
        <AntButton onClick={handleSaveDraft}>保存草稿</AntButton>
        {activeTab === 'basic' && (
          <AntButton type="primary" onClick={() => setActiveTab('qualification')}>下一步</AntButton>
        )}
        {activeTab === 'qualification' && (
          <AntButton type="primary" danger onClick={handleSubmitReview}>提交审核</AntButton>
        )}
      </div>

      <ConfirmDialog
        open={confirmOpen}
        title="确认提交信息维护"
        content="提交后将进入审批流程，是否确认提交？"
        onOk={() => {
          setSubmitting(true);
          setTimeout(() => {
            setSubmitting(false);
            setConfirmOpen(false);
            message.success('信息维护已提交审核');
          }, 800);
        }}
        onCancel={() => setConfirmOpen(false)}
        confirmLoading={submitting}
      />
    </div>
  );
}
