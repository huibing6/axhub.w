/**
 * @name 正式准入申请
 * 4-step wizard: 基本信息 → 服务目录 → 资质信息 → 审批中
 */
import { useState } from 'react';
import { ConfirmDialog, StatusTimeline } from '../common/components';
import {
  theme, Steps, Card, Form, Input, Select, Row, Col, Typography,
  message, Button as AntButton, Space, Table, Upload, DatePicker, Radio, Checkbox,
} from 'antd';
import { UploadOutlined, PlusOutlined } from '@ant-design/icons';

/* ─── 卡片分区标题 ─── */
function SectionTitle({ icon, title }: { icon: string; title: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
      <span style={{ fontSize: 16 }}>{icon}</span>
      <Typography.Text strong style={{ fontSize: 14 }}>{title}</Typography.Text>
    </div>
  );
}

/* ─── 只读展示项 ─── */
function ReadonlyField({ label, value }: { label: string; value: string }) {
  return (
    <Col span={8}>
      <div style={{ marginBottom: 16 }}>
        <Typography.Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 4 }}>{label}</Typography.Text>
        <Typography.Text style={{ fontSize: 14 }}>{value}</Typography.Text>
      </div>
    </Col>
  );
}

export default function SpAdmission() {
  const { token: t } = theme.useToken();
  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm();
  const [svcForm] = Form.useForm();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [timeline, setTimeline] = useState([
    { status: '待提交', time: '2026-06-29 10:00', operator: '系统' },
  ]);

  /* ─── 服务目录表格 ─── */
  const svcColumns = [
    { key: 'code', title: '服务品类编码', dataIndex: 'code' },
    { key: 'name', title: '服务品类名称', dataIndex: 'name' },
    {
      key: 'type', title: '目录类型', dataIndex: 'type',
      render: (v: string) => (
        <span style={{
          display: 'inline-block', padding: '1px 8px', borderRadius: 4, fontSize: 12,
          background: v === '专业' ? '#fff1f0' : '#f6ffed',
          color: v === '专业' ? '#ff4d4f' : '#52c41a',
          border: `1px solid ${v === '专业' ? '#ffa39e' : '#b7eb8f'}`,
        }}>{v}</span>
      ),
    },
    { key: 'level', title: '目录等级', dataIndex: 'level' },
    {
      key: 'action', title: '操作', dataIndex: 'action',
      render: (_: unknown, record: { key: number }) => (
        <Typography.Link>{record.key === 3 ? '合并' : '编辑'}</Typography.Link>
      ),
    },
  ];
  const svcData = [
    { key: 1, code: '502010', name: '工程技术服务 / 生产及维修服务', level: '一级', type: '专业' },
    { key: 2, code: '502030', name: '工程技术服务 / 设备维保服务', level: '一级', type: '专业' },
    { key: 3, code: '601010', name: '办公服务 / 物业管理', level: '二级', type: '通用' },
  ];

  /* ─── 资质信息表格 ─── */
  const certColumns = [
    { key: 'type', title: '资质类型', dataIndex: 'type' },
    { key: 'name', title: '资质名称', dataIndex: 'name' },
    { key: 'no', title: '证书编号', dataIndex: 'no' },
    { key: 'validUntil', title: '有效期至', dataIndex: 'validUntil' },
    { key: 'status', title: '状态', dataIndex: 'status', render: (v: string) => <Typography.Text type={v === '有效' ? 'success' : 'danger'}>{v}</Typography.Text> },
  ];
  const certData = [
    { key: 1, type: '营业执照', name: '营业执照', no: '91420000706802345X', validUntil: '2030-12-31', status: '有效' },
    { key: 2, type: '专业资质', name: '石油机械维修资质', no: 'ZY-2024-0089', validUntil: '2027-06-30', status: '有效' },
    { key: 3, type: 'HSE认证', name: '健康安全环境管理体系', no: 'HSE-2025-0123', validUntil: '2028-03-15', status: '有效' },
  ];

  /* ─── Handlers ─── */
  const handleNext = () => {
    setCurrentStep(s => Math.min(s + 1, 3));
  };

  const handlePrev = () => {
    setCurrentStep(s => Math.max(s - 1, 0));
  };

  const handleSaveDraft = () => {
    message.success('草稿已保存');
  };

  const handleSubmit = () => {
    setConfirmOpen(true);
  };

  const handleConfirmSubmit = async () => {
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setConfirmOpen(false);
      setSubmitted(true);
      setCurrentStep(3);
      setTimeline([
        { status: '待提交', time: '2026-06-29 10:00', operator: '系统' },
        { status: '审核中', time: '2026-06-29 14:30', operator: '提交人' },
      ]);
      message.success('准入申请已提交，请等待审核');
    }, 1000);
  };

  /* ═══════════ Step 0: 基本信息 ═══════════ */
  const renderStepBasicInfo = () => (
    <>
      {/* 1. 准入信息 */}
      <Card variant="outlined" size="small" style={{ marginBottom: 16 }}>
        <SectionTitle icon="📋" title="准入信息" />
        <Form form={form} layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="准入来源" name="admissionSource">
                <Select defaultValue="公开招标采购中标" options={[
                  { value: '公开招标采购中标', label: '公开招标采购中标' },
                  { value: '定向谈判', label: '定向谈判' },
                  { value: '框架协议', label: '框架协议' },
                ]} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="准入类别" name="admissionCategory">
                <Select defaultValue="新增准入服务商" options={[
                  { value: '新增准入服务商', label: '新增准入服务商' },
                  { value: '已有服务商新增类别', label: '已有服务商新增类别' },
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

      {/* 2. 基础信息 */}
      <Card variant="outlined" size="small" style={{ marginBottom: 16 }}>
        <SectionTitle icon="🏢" title="基础信息" />
        <Row gutter={16}>
          <ReadonlyField label="服务商名称" value="湖北江汉石油机械制造有限公司" />
          <ReadonlyField label="统一社会信用代码" value="91420000706802345X" />
          <ReadonlyField label="成立日期" value="1998-06-15" />
          <ReadonlyField label="注册资本" value="5000万元" />
        </Row>
      </Card>

      {/* 3. 管理信息 */}
      <Card variant="outlined" size="small" style={{ marginBottom: 16 }}>
        <SectionTitle icon="🏛️" title="管理信息" />
        <Form form={form} layout="vertical">
          <Form.Item label="是否内部服务商" name="isInternal">
            <Radio.Group defaultValue="external">
              <Radio value="external">外部服务商</Radio>
              <Radio value="internal">中国石油集团全资或控股子公司</Radio>
            </Radio.Group>
          </Form.Item>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="内部组织" name="internalOrg">
                <Input placeholder="请填写内部组织" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="管理单位" name="manageUnit">
                <Select defaultValue="长庆油田" options={[
                  { value: '长庆油田', label: '长庆油田' },
                  { value: '大庆油田', label: '大庆油田' },
                  { value: '胜利油田', label: '胜利油田' },
                  { value: '新疆油田', label: '新疆油田' },
                ]} />
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

      {/* 4. 联系人信息 */}
      <Card variant="outlined" size="small" style={{ marginBottom: 16 }}>
        <SectionTitle icon="👤" title="联系人信息" />
        <Form form={form} layout="vertical">
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item label="联系人" name="contactPerson">
                <Input defaultValue="张伟" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="联系电话" name="contactPhone">
                <Input defaultValue="138-0866-5200" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="联系邮箱" name="contactEmail">
                <Input defaultValue="zhangwei@jh-petro.com" />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item label="联系地址" name="contactAddress">
            <Input defaultValue="湖北省潜江市江汉路128号" />
          </Form.Item>
        </Form>
      </Card>

      {/* 5. 公司情况 */}
      <Card variant="outlined" size="small" style={{ marginBottom: 16 }}>
        <SectionTitle icon="🏭" title="公司情况" />
        <Form form={form} layout="vertical">
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item label="法人代表" name="legalPerson">
                <Input defaultValue="李明" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="币种" name="currency">
                <Select defaultValue="CNY" options={[
                  { value: 'CNY', label: '人民币 (CNY)' },
                  { value: 'USD', label: '美元 (USD)' },
                ]} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="企业规模" name="companyScale">
                <Select defaultValue="中型" options={[
                  { value: '大型', label: '大型' },
                  { value: '中型', label: '中型' },
                  { value: '小型', label: '小型' },
                  { value: '微型', label: '微型' },
                ]} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="注册资本" name="regCapital">
                <Input defaultValue="5000万元" disabled />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="成立日期" name="estDate">
                <Input defaultValue="1998-06-15" disabled />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="公司电话" name="companyPhone">
                <Input defaultValue="0728-6588888" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="开户银行" name="bankName">
                <Input defaultValue="中国工商银行潜江支行" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="银行账号" name="bankAccount">
                <Input defaultValue="1801 0109 0920 0001 234" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="开户银行账号" name="bankAccountNo">
                <Input defaultValue="1801 0109 0920 0001 234" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="网址" name="website">
                <Input defaultValue="www.jh-petro.com" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>

      {/* 6. 详细信息 */}
      <Card variant="outlined" size="small" style={{ marginBottom: 16 }}>
        <SectionTitle icon="📍" title="详细信息" />
        <Form form={form} layout="vertical">
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item label="国家" name="country">
                <Select defaultValue="中国" options={[{ value: '中国', label: '中国' }]} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="省/自治区/直辖市" name="province">
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
                <Input defaultValue="湖北省潜江市江汉路128号" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="注册地址" name="regAddress">
                <Input defaultValue="湖北省潜江市高新技术开发区江汉路128号" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="邮编" name="postcode">
                <Input defaultValue="433100" />
              </Form.Item>
            </Col>
            <Col span={16}>
              <Form.Item label="经营范围" name="businessScope">
                <Input.TextArea defaultValue="石油机械设备制造、维修及技术服务；油田工程技术服务；钻采设备及配件销售；自动化控制系统集成；石油化工设备安装与调试。" rows={3} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>

      {/* 7. 企业概况 */}
      <Card variant="outlined" size="small" style={{ marginBottom: 16 }}>
        <SectionTitle icon="👥" title="企业概况" />
        <Form form={form} layout="vertical">
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item label="服务队伍人数" name="teamSize">
                <Input defaultValue="286" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="技术人员数量" name="techStaff">
                <Input defaultValue="152" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="人员资质情况" name="staffQualification">
                <Input defaultValue="高级工程师18人，工程师45人，技师89人" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>

      {/* 8. 经营情况 */}
      <Card variant="outlined" size="small" style={{ marginBottom: 16 }}>
        <SectionTitle icon="📊" title="经营情况" />
        <Form form={form} layout="vertical">
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item label="近三年营业收入" name="revenue3y">
                <Input defaultValue="8.5亿元" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="净利润" name="netProfit">
                <Input defaultValue="6200万元" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="主要业务范围" name="mainBusiness">
                <Input defaultValue="石油机械维保、钻采设备制造" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>

      {/* 9. 服务业绩 */}
      <Card variant="outlined" size="small" style={{ marginBottom: 16 }}>
        <SectionTitle icon="🏆" title="服务业绩" />
        <Form form={form} layout="vertical">
          <Form.Item label="主要项目业绩" name="majorProjects">
            <Input.TextArea defaultValue="1. 长庆油田钻采设备年度维保项目（2023-2025），合同金额1.2亿元；\n2. 新疆油田注采设备大修项目（2024），合同金额3800万元；\n3. 大庆油田自动化控制系统集成项目（2024-2025），合同金额5600万元。" rows={4} />
          </Form.Item>
          <Form.Item label="与中国石油合作经历" name="cnpcHistory">
            <Input.TextArea defaultValue="自2005年起与中国石油建立合作关系，累计服务12家油田单位，合作项目超过50个，合同总金额超过8亿元，连续8年被评为优秀服务商。" rows={3} />
          </Form.Item>
        </Form>
      </Card>

      {/* 10. QHSE管理 */}
      <Card variant="outlined" size="small" style={{ marginBottom: 16 }}>
        <SectionTitle icon="🛡️" title="QHSE管理" />
        <Form form={form} layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="质量管理体系认证" name="qualityCert">
                <Checkbox.Group defaultValue={['iso9001']}>
                  <Space direction="vertical">
                    <Checkbox value="iso9001">ISO 9001 质量管理体系</Checkbox>
                    <Checkbox value="api">API 美国石油学会认证</Checkbox>
                    <Checkbox value="other">其他</Checkbox>
                  </Space>
                </Checkbox.Group>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="HSE管理体系" name="hseCert">
                <Checkbox.Group defaultValue={['iso14001', 'iso45001']}>
                  <Space direction="vertical">
                    <Checkbox value="iso14001">ISO 14001 环境管理体系</Checkbox>
                    <Checkbox value="iso45001">ISO 45001 职业健康安全管理体系</Checkbox>
                    <Checkbox value="ohsas18001">OHSAS 18001</Checkbox>
                  </Space>
                </Checkbox.Group>
              </Form.Item>
            </Col>
          </Row>
          <Form.Item label="安全生产许可证" name="safetyPermit">
            <Input defaultValue="(鄂)WH安许证字[2025]002345号" />
          </Form.Item>
          <Form.Item label="现场审核情况" name="onSiteAudit">
            <Input.TextArea defaultValue="2025年3月通过中石油QHSE现场审核，审核评级为A级。最近一次内部审核于2026年1月完成，所有不符合项均已关闭。" rows={2} />
          </Form.Item>
        </Form>
      </Card>

      {/* 11. ESG管理 */}
      <Card variant="outlined" size="small" style={{ marginBottom: 16 }}>
        <SectionTitle icon="🌱" title="ESG管理" />
        <Form form={form} layout="vertical">
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item label="环境管理 (E)" name="envManagement">
                <Input.TextArea defaultValue="已建立碳排放管理体系，2025年碳排放强度较上年下降12%，清洁能源使用比例达35%。" rows={3} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="社会责任 (S)" name="socialResponsibility">
                <Input.TextArea defaultValue="积极参与社区公益活动，2025年公益投入120万元，员工志愿服务时长超过2000小时。" rows={3} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="公司治理 (G)" name="corporateGovernance">
                <Input.TextArea defaultValue="建立了完善的公司治理架构，独立董事占比1/3，定期发布ESG报告。" rows={3} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
    </>
  );

  /* ═══════════ Step 1: 服务目录 ═══════════ */
  const renderStepServiceCatalog = () => (
    <>
      {/* 提示横幅 */}
      <div style={{
        padding: '8px 16px', marginBottom: 16, borderRadius: 8,
        background: '#e6f7ff', border: '1px solid #91d5ff',
        display: 'flex', alignItems: 'center', gap: 8,
      }}>
        <span style={{ color: '#1890ff', fontSize: 16 }}>💡</span>
        <Typography.Text style={{ color: '#0050b3' }}>
          以下服务品类信息来源于中标结果，其中包含专业目录，需填写资质信用、服务能力等内容
        </Typography.Text>
      </div>

      {/* 中标服务目录 */}
      <Card variant="outlined" size="small" style={{ marginBottom: 16 }}>
        <SectionTitle icon="📋" title="中标服务目录" />
        <Table columns={svcColumns} dataSource={svcData} pagination={false} bordered size="middle" />
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
        <Form form={svcForm} layout="vertical">
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
                  <AntButton icon={<UploadOutlined />}>上传文件</AntButton>
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
        <Form form={svcForm} layout="vertical">
          <Form.Item label="主要设备/装备情况" name="equipment" required>
            <Input.TextArea placeholder="请描述拥有的主要设备、仪器等硬件条件" rows={4} />
          </Form.Item>
          <Form.Item label="技术优势及特色" name="techAdvantage" required>
            <Input.TextArea placeholder="请描述核心技术能力、专利技术、工艺特色等" rows={4} />
          </Form.Item>
        </Form>
      </Card>
    </>
  );

  /* ═══════════ Step 2: 资质信息 ═══════════ */
  const requiredDocTypes = [
    '营业执照',
    '专业资质证书',
    '无重大违法违规承诺',
    '信用信息合规（4大平台无黑名单）',
    '服务商准入承诺书',
    '中标通知书',
  ];

  const renderStepQualification = () => (
    <>
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

  /* ═══════════ Step 3: 审批中 ═══════════ */
  const renderStepApproval = () => (
    <Card variant="outlined" size="small" style={{ marginBottom: 16 }}>
      <SectionTitle icon="⏳" title="审批状态" />
      <StatusTimeline items={timeline} />
      <div style={{ marginTop: 24, padding: 16, background: '#f6f8fa', borderRadius: 8 }}>
        <Typography.Text type="secondary">
          准入申请已提交，等待审核人员处理。审核通过后将正式成为服务商。
        </Typography.Text>
      </div>
    </Card>
  );

  /* ─── 步骤渲染 ─── */
  const renderStepContent = () => {
    switch (currentStep) {
      case 0: return renderStepBasicInfo();
      case 1: return renderStepServiceCatalog();
      case 2: return renderStepQualification();
      case 3: return renderStepApproval();
      default: return null;
    }
  };

  return (
    <div>
      <Typography.Title level={4} style={{ marginTop: 0, marginBottom: 4 }}>正式准入申请</Typography.Title>
      <Typography.Text type="secondary" style={{ display: 'block', marginBottom: 20 }}>
        基于中标结果的准入申请，请完善相关信息并提交审核
      </Typography.Text>

      <Steps
        current={currentStep}
        items={[
          { title: '基本信息' },
          { title: '服务目录' },
          { title: '资质信息' },
          { title: '审批中' },
        ]}
        size="small"
        style={{ marginBottom: 24 }}
      />

      {renderStepContent()}

      {/* 底部操作栏 */}
      <div style={{
        display: 'flex',
        justifyContent: currentStep === 0 ? 'space-between' : 'flex-end',
        gap: 12,
        padding: '16px 0',
        borderTop: '1px solid #f0f0f0',
        marginTop: 16,
      }}>
        {currentStep === 0 && (
          <AntButton onClick={handleSaveDraft}>保存草稿</AntButton>
        )}
        {currentStep > 0 && (
          <AntButton onClick={handlePrev}>上一步</AntButton>
        )}
        {currentStep < 2 && (
          <AntButton type="primary" onClick={handleNext}>下一步</AntButton>
        )}
        {currentStep === 2 && (
          <>
            <AntButton onClick={handleSaveDraft}>保存草稿</AntButton>
            <AntButton type="primary" danger onClick={handleSubmit}>提交审核</AntButton>
          </>
        )}
      </div>

      <ConfirmDialog
        open={confirmOpen}
        title="确认提交"
        content="确定要提交准入申请吗？提交后将无法直接修改。"
        onOk={handleConfirmSubmit}
        onCancel={() => setConfirmOpen(false)}
        confirmLoading={submitting}
      />
    </div>
  );
}
