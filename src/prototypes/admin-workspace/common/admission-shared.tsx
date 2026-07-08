import {
  theme, Typography, Card, Space, Input, Select, Row, Col, Table, Tag,
  Checkbox, Radio, Alert, DatePicker, Button, Form,
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import type { FormInstance } from 'antd';
import type { AdmissionMode, QualDocItem, RequiredDocItem } from './admission-types';
import {
  SERVICE_TABLE_DATA, QUALIFICATION_DOCS,
  PROVINCE_OPTIONS, QUAL_LEVEL_OPTIONS, CREDIT_RATING_OPTIONS,
  ENTERPRISE_SCALE_OPTIONS, CURRENCY_OPTIONS, COUNTRY_OPTIONS,
  QHSE_CERT_OPTIONS, HSE_SYSTEM_OPTIONS, INTERNAL_ORG_OPTIONS,
  CERT_TYPE_OPTIONS, BANK_CREDIT_OPTIONS, MDG_COMPANY_CODE_OPTIONS,
  MDG_HK_EXCHANGE_OPTIONS, MDG_GROUP_TYPE_OPTIONS, MDG_INDUSTRY_OPTIONS,
  MDG_OPERATE_STATUS_OPTIONS, MDG_TRADE_PARTNER_OPTIONS, MDG_CUSTOMER_DOC_OPTIONS,
} from './admission-types';

/* ========== Shared readonly data ========== */

const D = {
  admissionSource: '公开招标采购中标',
  admissionCategory: '新增准入服务商',
  bidProject: '2026年度江汉油田钻采设备维保服务项目',
  bidNumber: 'ZB-2026-JH-0318',
  companyName: '湖北江汉石油机械制造有限公司',
  creditCode: '91420000706802345X',
  establishedDate: '2005-03-15',
  registeredCapital: '5,000万元',
  isInternal: 'internal',
  internalOrg: '中国石油天然气集团有限公司',
  managementUnit: '中国石油天然气集团有限公司',
  contactName: '张明远',
  contactPhone: '138-0726-8856',
  contactEmail: 'zhangmingyuan@jhhx.com',
  contactAddress: '湖北省潜江市江汉油田矿区路18号',
  legalPerson: '王建华',
  currency: 'CNY',
  companyScale: '中型',
  bankName: '中国工商银行潜江支行',
  bankCreditLevel: 'AAA',
  companyWebsite: 'https://www.jhhxjx.com',
  registeredCapital2: '5000',
  establishedDate2: '2005/03/15',
  bankAccount: '6228480322888666',
  bankAccount2: '4200-1286-5678-0001',
  companyPhone: '0728-6234567',
  country: '中国',
  province: '湖北省',
  city: '潜江市',
  communicationAddress: '湖北省潜江市江汉油田矿区路18号',
  registeredAddress: '湖北省潜江市江汉油田矿区路18号',
  zipCode: '433100',
  businessScope: '石油天然气钻采设备制造与维修；石油化工机械设备及配件制造与销售；油气田地面工程设备安装与调试；机械设备租赁及技术服务；压力管道安装及维修（凭资质经营）。',
  serviceTeamSize: '186',
  techStaffSize: '89',
  personnelQualification: '拥有高级工程师12人，中级工程师35人，持证特种作业人员56人',
  recentRevenue: '2022年8500万/2023年9200万/2024年10500万',
  recentProfit: '2022年850万/2023年920万/2024年1050万',
  mainBusinessScope: '石油钻采设备维保、租赁及技术服务',
  projectPerformance: '2024年江汉油田钻采设备维保项目（1200万）；2023年长城钻探设备租赁项目（800万）',
  cnpcCooperation: '自2008年起与中国石油江汉油田分公司建立合作关系，累计服务15年',
  qualityCert: 'ISO9001',
  hseCert: 'SY/T6276',
  safetyRecord: '近三年无重大安全生产事故',
  needSiteAudit: false,
  envMeasures: '通过ISO14001环境管理体系认证',
  socialResponsibility: '连续5年参加潜江市扶贫帮困活动，累计捐赠30万元',
  corporateGovernance: '建立了完善的法人治理结构和合规管理制度',
  qualLevel: '一级',
  qualCertNumber: 'ZY-2024-HB-0056',
  creditRating: 'A',
  equipmentDetail: '拥有各类石油钻采设备维修工位6个，配备数控车床、数控铣床、大型焊接设备等主要生产设备32台/套，检测设备18台/套，年产值能力8,000万元。',
  techAdvantage: '拥有专利技术12项（其中发明专利3项），在深井钻采设备维修、高温高压井口装置检测等方面具有技术优势。与长江大学联合建立产学研基地，具备新产品研发能力。',
  mdgApplicant: '80021903',
  mdgApplyReason: '公开招标中标，需办理准入手续',
  mdgSupplierName: '石油外部一般往来单位22',
  mdgDocType: '02 三证合一',
  mdgCountry: '中国',
  mdgCity: '潜江市',
  mdgZipCode: '433124',
  mdgRegisteredCapital: '5,000万',
  mdgEstablishedDate: '2005-03-15',
  mdgProvince: '湖北省',
  mdgRegisteredAddress: '湖北省潜江市江汉油田矿区路18号',
  mdgLegalPerson: '王建华',
  mdgCurrency: 'CNY',
  mdgPhone: '0728-6234567',
  mdgUnitClassification: '石油外部一般往来单位',
  mdgUnitShortName: '江汉石油机械',
  mdgCompanyScale: 'medium',
  mdgRemark: '',
  mdgCompanyCode: '长庆油田分公司成本控制范围',
  mdgRelatedPersonHk: '',
  mdgGroupType: '外部单位>其他外部单位>国有',
  mdgRegisterRegion: '中国',
  mdgIndustry: '制造业',
  mdgCustomerDoc: '无',
  mdgBusinessStatus: '存续（在营、开业、在册）',
  mdgFormerName: '',
  mdgTradePartner: '外部',
};

/* ========== Helper components ========== */

interface FieldProps {
  mode: AdmissionMode;
  form?: FormInstance;
  name?: string;
  label: string;
  required?: boolean;
  colSpan?: number;
  children: React.ReactNode;
}

function FormField({ mode, name, label, required, colSpan = 12, children }: FieldProps) {
  if (mode === 'editable') {
    return (
      <Col span={colSpan}>
        <Form.Item label={label} name={name} required={required}>
          {children}
        </Form.Item>
      </Col>
    );
  }
  return (
    <Col span={colSpan}>
      <Form.Item label={label} required={required}>
        {children}
      </Form.Item>
    </Col>
  );
}

/* ========== 1. BasicInfoCards ========== */

export function BasicInfoCards({ mode, form }: { mode: AdmissionMode; form?: FormInstance }) {
  const { token: t } = theme.useToken();
  const ro = { background: t.colorBgLayout };

  const roProps = mode === 'readonly' ? { readOnly: true, style: ro } : {};

  const roVal = (key: string) => (D as any)[key];

  /* --- 准入信息 (always readonly in all modes) --- */
  const renderCard1 = () => (
    <Card size="small" variant="outlined" title={<Space><span>☰</span><span>准入信息</span></Space>}>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="准入来源" required>
            <Input defaultValue={D.admissionSource} readOnly style={ro} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="准入类别" required>
            <Input defaultValue={D.admissionCategory} readOnly style={ro} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="中标项目" required>
            <Input defaultValue={D.bidProject} readOnly style={ro} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="中标编号">
            <Input defaultValue={D.bidNumber} readOnly style={ro} />
          </Form.Item>
        </Col>
      </Row>
    </Card>
  );

  /* --- 基础信息 --- */
  const renderCard2 = () => (
    <Card size="small" variant="outlined" style={{ marginTop: 16 }} title={<Space><span>📄</span><span>基础信息</span></Space>}>
      <Row gutter={16}>
        <FormField mode={mode} name="companyName" label="服务商名称" required>
          {mode === 'editable'
            ? <Input />
            : <Input defaultValue={roVal('companyName')} {...roProps} />}
        </FormField>
        <FormField mode={mode} name="creditCode" label="统一社会信用代码" required>
          {mode === 'editable'
            ? <Input />
            : <Input defaultValue={roVal('creditCode')} {...roProps} />}
        </FormField>
        <FormField mode={mode} name="establishedDate" label="成立日期" required>
          {mode === 'editable'
            ? <Input type="date" />
            : <Input defaultValue={roVal('establishedDate')} {...roProps} />}
        </FormField>
        <FormField mode={mode} name="registeredCapital" label="注册资本" required>
          {mode === 'editable'
            ? <Input suffix="万元" />
            : <Input defaultValue={roVal('registeredCapital')} {...roProps} />}
        </FormField>
      </Row>
    </Card>
  );

  /* --- 管理信息 --- */
  const renderCard3 = () => (
    <Card size="small" variant="outlined" style={{ marginTop: 16 }} title={<Space><span>📋</span><span>管理信息</span></Space>}>
      <Row gutter={16}>
        <Col span={24}>
          {mode === 'editable' ? (
            <Form.Item label="是否内部服务商" name="isInternal" required>
              <Radio.Group>
                <Radio value="external">外部服务商</Radio>
                <Radio value="internal">中国石油集团全资或控股子公司</Radio>
              </Radio.Group>
            </Form.Item>
          ) : (
            <Form.Item label="是否内部服务商" required>
              <Radio.Group defaultValue={mode === 'new' ? 'external' : D.isInternal} disabled>
                <Radio value="external">外部服务商</Radio>
                <Radio value="internal">中国石油集团全资或控股子公司</Radio>
              </Radio.Group>
            </Form.Item>
          )}
        </Col>
        <FormField mode={mode} name="internalOrg" label="内部组织">
          {mode === 'editable'
            ? <Select placeholder="请选择内部组织" options={INTERNAL_ORG_OPTIONS} />
            : <Select placeholder={mode === 'new' ? '请选择' : '无'} disabled options={INTERNAL_ORG_OPTIONS} style={ro} />}
        </FormField>
        <Col span={12}>
          <Form.Item label="权属关系证明">
            {mode === 'editable'
              ? <Button type="primary" danger icon={<UploadOutlined />}>上传文件</Button>
              : mode === 'new'
                ? <Button type="primary" danger icon={<UploadOutlined />}>上传文件</Button>
                : <Typography.Text style={{ color: t.colorText }}>权属关系证明.pdf</Typography.Text>}
          </Form.Item>
        </Col>
        <FormField mode={mode} name="managementUnit" label="管理单位">
          {mode === 'editable'
            ? <Input />
            : <Input defaultValue={roVal('managementUnit')} {...roProps} />}
        </FormField>
      </Row>
    </Card>
  );

  /* --- 联系人信息 --- */
  const renderCard4 = () => (
    <Card size="small" variant="outlined" style={{ marginTop: 16 }} title={<Space><span>👤</span><span>联系人信息</span></Space>}>
      <Row gutter={16}>
        <FormField mode={mode} name="contactName" label="联系人姓名" required>
          {mode === 'editable'
            ? <Input />
            : <Input defaultValue={roVal('contactName')} {...roProps} />}
        </FormField>
        <FormField mode={mode} name="contactPhone" label="联系电话" required>
          {mode === 'editable'
            ? <Input />
            : <Input defaultValue={roVal('contactPhone')} {...roProps} />}
        </FormField>
        <FormField mode={mode} name="contactEmail" label="电子邮箱" required>
          {mode === 'editable'
            ? <Input />
            : <Input defaultValue={roVal('contactEmail')} {...roProps} />}
        </FormField>
        <FormField mode={mode} name="contactAddress" label="通讯地址">
          {mode === 'editable'
            ? <Input />
            : <Input defaultValue={roVal('contactAddress')} {...roProps} />}
        </FormField>
      </Row>
    </Card>
  );

  /* --- 公司情况 --- */
  const renderCard5 = () => (
    <Card size="small" variant="outlined" style={{ marginTop: 16 }} title={<Space><span>🏢</span><span>公司情况</span></Space>}>
      <Row gutter={16}>
        <FormField mode={mode} name="legalPerson" label="法定代表人姓名" required colSpan={8}>
          {mode === 'editable'
            ? <Input />
            : <Input defaultValue={roVal('legalPerson')} {...roProps} />}
        </FormField>
        <FormField mode={mode} name="currency" label="币种" colSpan={8}>
          {mode === 'editable'
            ? <Select options={CURRENCY_OPTIONS} />
            : <Select defaultValue={roVal('currency')} disabled options={CURRENCY_OPTIONS} style={ro} />}
        </FormField>
        <FormField mode={mode} name="companyScale" label="企业规模" required colSpan={8}>
          {mode === 'editable'
            ? <Select placeholder="请选择" options={ENTERPRISE_SCALE_OPTIONS} />
            : <Select defaultValue={roVal('companyScale')} disabled options={ENTERPRISE_SCALE_OPTIONS} style={ro} />}
        </FormField>
        <FormField mode={mode} name="bankName" label="开户银行" colSpan={8}>
          {mode === 'editable'
            ? <Input />
            : <Input defaultValue={roVal('bankName')} {...roProps} />}
        </FormField>
        <FormField mode={mode} name="bankCreditLevel" label="银行信用等级" required colSpan={8}>
          {mode === 'editable'
            ? <Select placeholder="请选择" options={BANK_CREDIT_OPTIONS} />
            : <Select defaultValue={roVal('bankCreditLevel')} disabled options={BANK_CREDIT_OPTIONS} style={ro} />}
        </FormField>
        <FormField mode={mode} name="companyWebsite" label="公司网址" colSpan={8}>
          {mode === 'editable'
            ? <Input />
            : <Input defaultValue={roVal('companyWebsite')} {...roProps} />}
        </FormField>
        <FormField mode={mode} name="registeredCapital2" label="注册资本(公司)" required colSpan={8}>
          {mode === 'editable'
            ? <Input suffix="万元" />
            : <Input defaultValue={roVal('registeredCapital2')} {...roProps} />}
        </FormField>
        <FormField mode={mode} name="establishedDate2" label="成立日期(公司)" required colSpan={8}>
          {mode === 'editable'
            ? <Input type="date" />
            : <Input defaultValue={roVal('establishedDate2')} {...roProps} />}
        </FormField>
        <FormField mode={mode} name="bankAccount" label="银行账号" required colSpan={8}>
          {mode === 'editable'
            ? <Input />
            : <Input defaultValue={roVal('bankAccount')} {...roProps} />}
        </FormField>
        <FormField mode={mode} name="bankAccount2" label="开户银行账号" required colSpan={8}>
          {mode === 'editable'
            ? <Input />
            : <Input defaultValue={roVal('bankAccount2')} {...roProps} />}
        </FormField>
        <FormField mode={mode} name="companyPhone" label="公司电话" required colSpan={8}>
          {mode === 'editable'
            ? <Input />
            : <Input defaultValue={roVal('companyPhone')} {...roProps} />}
        </FormField>
      </Row>
    </Card>
  );

  /* --- 详细信息 --- */
  const renderCard6 = () => (
    <Card size="small" variant="outlined" style={{ marginTop: 16 }} title={<Space><span>ⓘ</span><span>详细信息</span></Space>}>
      <Row gutter={16}>
        <FormField mode={mode} name="country" label="国家" required colSpan={8}>
          {mode === 'editable'
            ? <Select options={COUNTRY_OPTIONS} />
            : <Select defaultValue={roVal('country')} disabled options={COUNTRY_OPTIONS} style={ro} />}
        </FormField>
        <FormField mode={mode} name="province" label="省/直辖市" required colSpan={8}>
          {mode === 'editable'
            ? <Select placeholder="请选择" options={PROVINCE_OPTIONS} />
            : <Select defaultValue={roVal('province')} disabled options={PROVINCE_OPTIONS} style={ro} />}
        </FormField>
        <FormField mode={mode} name="city" label="城市" colSpan={8}>
          {mode === 'editable'
            ? <Input />
            : <Input defaultValue={roVal('city')} {...roProps} />}
        </FormField>
        <FormField mode={mode} name="communicationAddress" label="通讯地址(详细)" required colSpan={24}>
          {mode === 'editable'
            ? <Input />
            : <Input defaultValue={roVal('communicationAddress')} {...roProps} />}
        </FormField>
        <FormField mode={mode} name="registeredAddress" label="注册地址" required colSpan={24}>
          {mode === 'editable'
            ? <Input />
            : <Input defaultValue={roVal('registeredAddress')} {...roProps} />}
        </FormField>
        <FormField mode={mode} name="zipCode" label="邮编" required colSpan={8}>
          {mode === 'editable'
            ? <Input />
            : <Input defaultValue={roVal('zipCode')} {...roProps} />}
        </FormField>
        <FormField mode={mode} name="businessScope" label="经营范围" required colSpan={24}>
          {mode === 'editable'
            ? <Input.TextArea rows={3} />
            : <Input.TextArea rows={3} readOnly style={ro} defaultValue={roVal('businessScope')} />}
        </FormField>
      </Row>
    </Card>
  );

  /* --- 企业概况 (必填) --- */
  const renderCard7 = () => (
    <Card size="small" variant="outlined" style={{ marginTop: 16 }} title={<Space><span>📊</span><span>企业概况</span><Tag color="red" style={{ marginLeft: 4 }}>必填</Tag></Space>}>
      <Row gutter={16}>
        <FormField mode={mode} name="serviceTeamSize" label="服务队伍人数" required>
          {mode === 'editable'
            ? <Input placeholder="请输入服务队伍总人数" />
            : <Input defaultValue={roVal('serviceTeamSize')} {...roProps} />}
        </FormField>
        <FormField mode={mode} name="techStaffSize" label="技术人员数量" required>
          {mode === 'editable'
            ? <Input placeholder="请输入技术人员数量" />
            : <Input defaultValue={roVal('techStaffSize')} {...roProps} />}
        </FormField>
        <FormField mode={mode} name="personnelQualification" label="人员资质情况" required colSpan={24}>
          {mode === 'editable'
            ? <Input.TextArea rows={3} placeholder="请描述主要人员的资质证书、执业资格等情况" />
            : <Input.TextArea rows={3} readOnly style={ro} defaultValue={roVal('personnelQualification')} />}
        </FormField>
      </Row>
    </Card>
  );

  /* --- 经营情况 (必填) --- */
  const renderCard8 = () => (
    <Card size="small" variant="outlined" style={{ marginTop: 16 }} title={<Space><span>💼</span><span>经营情况</span><Tag color="red" style={{ marginLeft: 4 }}>必填</Tag></Space>}>
      <Row gutter={16}>
        <FormField mode={mode} name="recentRevenue" label="近三年营业收入（万元）" required>
          {mode === 'editable'
            ? <Input placeholder="如：2022年1200万/2023年1500万/2024年1800万" />
            : <Input defaultValue={roVal('recentRevenue')} {...roProps} />}
        </FormField>
        <FormField mode={mode} name="recentProfit" label="近三年净利润（万元）">
          {mode === 'editable'
            ? <Input placeholder="如：2022年120万/2023年180万/2024年200万" />
            : <Input defaultValue={roVal('recentProfit')} {...roProps} />}
        </FormField>
        <FormField mode={mode} name="mainBusinessScope" label="主要业务范围" required colSpan={24}>
          {mode === 'editable'
            ? <Input.TextArea rows={3} placeholder="请描述主营业务范围及核心竞争优势" />
            : <Input.TextArea rows={3} readOnly style={ro} defaultValue={roVal('mainBusinessScope')} />}
        </FormField>
      </Row>
    </Card>
  );

  /* --- 服务业绩 (必填) --- */
  const renderCard9 = () => (
    <Card size="small" variant="outlined" style={{ marginTop: 16 }} title={<Space><span>🏆</span><span>服务业绩</span><Tag color="red" style={{ marginLeft: 4 }}>必填</Tag></Space>}>
      <Row gutter={16}>
        <FormField mode={mode} name="projectPerformance" label="主要项目业绩" required colSpan={24}>
          {mode === 'editable'
            ? <Input.TextArea rows={3} placeholder="请列举近三年的主要服务项目名称、甲方单位、项目金额等" />
            : <Input.TextArea rows={3} readOnly style={ro} defaultValue={roVal('projectPerformance')} />}
        </FormField>
        <FormField mode={mode} name="cnpcCooperation" label="与中国石油合作经历" colSpan={24}>
          {mode === 'editable'
            ? <Input.TextArea rows={3} placeholder="请描述与中国石油集团及其下属单位的合作历史" />
            : <Input.TextArea rows={3} readOnly style={ro} defaultValue={roVal('cnpcCooperation')} />}
        </FormField>
      </Row>
    </Card>
  );

  /* --- QHSE管理 (必填) --- */
  const renderCard10 = () => (
    <Card size="small" variant="outlined" style={{ marginTop: 16 }} title={<Space><span>🛡️</span><span>QHSE管理</span><Tag color="red" style={{ marginLeft: 4 }}>必填</Tag></Space>}>
      <Row gutter={16}>
        <FormField mode={mode} name="qualityCert" label="质量管理体系认证" required>
          {mode === 'editable'
            ? <Select placeholder="请选择" options={QHSE_CERT_OPTIONS} />
            : <Select defaultValue={roVal('qualityCert')} disabled options={QHSE_CERT_OPTIONS} style={ro} />}
        </FormField>
        <FormField mode={mode} name="hseCert" label="HSE管理体系" required>
          {mode === 'editable'
            ? <Select placeholder="请选择" options={HSE_SYSTEM_OPTIONS} />
            : <Select defaultValue={roVal('hseCert')} disabled options={HSE_SYSTEM_OPTIONS} style={ro} />}
        </FormField>
        <FormField mode={mode} name="safetyRecord" label="安全生产记录" colSpan={24}>
          {mode === 'editable'
            ? <Input.TextArea rows={3} placeholder="请描述近三年安全生产情况，是否有重大安全事故" />
            : <Input.TextArea rows={3} readOnly style={ro} defaultValue={roVal('safetyRecord')} />}
        </FormField>
        <Col span={24}>
          {mode === 'editable' ? (
            <Form.Item name="needSiteAudit" valuePropName="checked">
              <Checkbox>需要现场审核（根据服务类别及风险评估结果，必要时安排现场审核）</Checkbox>
            </Form.Item>
          ) : (
            <Checkbox disabled={mode === 'readonly'} defaultChecked={mode === 'new' ? false : D.needSiteAudit}>
              需要现场审核（根据服务类别及风险评估结果，必要时安排现场审核）
            </Checkbox>
          )}
        </Col>
      </Row>
    </Card>
  );

  /* --- ESG管理 (选填) --- */
  const renderCard11 = () => (
    <Card size="small" variant="outlined" style={{ marginTop: 16 }} title={<Space><span>🌿</span><span>ESG管理</span><Tag style={{ marginLeft: 4 }}>选填</Tag></Space>}>
      <Row gutter={16}>
        <FormField mode={mode} name="envMeasures" label="环境管理措施" colSpan={24}>
          {mode === 'editable'
            ? <Input.TextArea rows={3} placeholder="请描述企业在环境保护方面采取的主要措施" />
            : <Input.TextArea rows={3} readOnly style={ro} defaultValue={roVal('envMeasures')} />}
        </FormField>
        <FormField mode={mode} name="socialResponsibility" label="社会责任" colSpan={24}>
          {mode === 'editable'
            ? <Input.TextArea rows={3} placeholder="请描述企业在社会责任方面的主要实践" />
            : <Input.TextArea rows={3} readOnly style={ro} defaultValue={roVal('socialResponsibility')} />}
        </FormField>
        <FormField mode={mode} name="corporateGovernance" label="公司治理" colSpan={24}>
          {mode === 'editable'
            ? <Input.TextArea rows={3} placeholder="请描述企业治理结构和合规管理制度" />
            : <Input.TextArea rows={3} readOnly style={ro} defaultValue={roVal('corporateGovernance')} />}
        </FormField>
      </Row>
    </Card>
  );

  return (
    <>
      {renderCard1()}
      {renderCard2()}
      {renderCard3()}
      {renderCard4()}
      {renderCard5()}
      {renderCard6()}
      {renderCard7()}
      {renderCard8()}
      {renderCard9()}
      {renderCard10()}
      {renderCard11()}
    </>
  );
}

/* ========== 2. ServiceCategoryCards ========== */

const serviceTableCols = [
  { key: 'code', title: '服务品类码', dataIndex: 'code', width: 120 },
  { key: 'name', title: '服务品类名称', dataIndex: 'name', width: 300 },
  { key: 'type', title: '品类类型', dataIndex: 'type', width: 100, render: (v: string, r: any) => <Tag color={r.typeColor}>{v}</Tag> },
  { key: 'level', title: '品类等级', dataIndex: 'level', width: 100 },
  {
    key: 'action',
    title: <Space>操作<Typography.Link style={{ fontSize: 13, color: '#1677ff' }}>全部合并</Typography.Link></Space>,
    dataIndex: 'action',
    width: 160,
    render: (v: string) => v === '—' ? '—' : <Typography.Link style={{ fontSize: 13, color: '#1677ff' }}>{v}</Typography.Link>,
  },
];

export function ServiceCategoryCards({ mode, form }: { mode: AdmissionMode; form?: FormInstance }) {
  const { token: t } = theme.useToken();
  const ro = { background: t.colorBgLayout };
  const roProps = mode === 'readonly' ? { readOnly: true, style: ro } : {};

  return (
    <>
      <Alert type="info" showIcon message="以下服务品类信息来源于中标结果，其中包含专业品类，需补充填写资质信用、服务能力等内容" style={{ marginBottom: 16 }} />

      <Card size="small" variant="outlined" title={<Space><span>☑</span><span>中标服务品类</span></Space>}>
        <Table
          columns={serviceTableCols}
          dataSource={SERVICE_TABLE_DATA}
          pagination={false}
          bordered
          size="small"
        />
      </Card>

      {/* 资质信用 必填 */}
      <Card size="small" variant="outlined" style={{ marginTop: 16 }} title={<Space><span>📑</span><span>资质信用</span><Tag color="red" style={{ marginLeft: 4 }}>必填</Tag></Space>}>
        <Row gutter={16}>
          <Col span={12}>
            {mode === 'editable' ? (
              <Form.Item label="资质等级" name="qualLevel" required>
                <Select placeholder="请选择资质等级" options={QUAL_LEVEL_OPTIONS} />
              </Form.Item>
            ) : (
              <Form.Item label="资质等级" required>
                <Select defaultValue={mode === 'new' ? undefined : D.qualLevel} disabled options={QUAL_LEVEL_OPTIONS} style={ro} placeholder="请选择资质等级" />
              </Form.Item>
            )}
          </Col>
          <Col span={12}>
            {mode === 'editable' ? (
              <Form.Item label="资质证书编号" name="qualCertNumber" required>
                <Input placeholder="请输入资质证书编号" />
              </Form.Item>
            ) : (
              <Form.Item label="资质证书编号" required>
                <Input defaultValue={mode === 'new' ? '' : D.qualCertNumber} {...roProps} placeholder="请输入资质证书编号" />
              </Form.Item>
            )}
          </Col>
          <Col span={12}>
            {mode === 'editable' ? (
              <Form.Item label="信用评级" name="creditRating">
                <Select placeholder="请选择信用评级" options={CREDIT_RATING_OPTIONS} />
              </Form.Item>
            ) : (
              <Form.Item label="信用评级">
                <Select defaultValue={mode === 'new' ? undefined : D.creditRating} disabled options={CREDIT_RATING_OPTIONS} style={ro} placeholder="请选择信用评级" />
              </Form.Item>
            )}
          </Col>
          <Col span={12}>
            <Form.Item label="资质证明文件">
              {mode === 'editable' || mode === 'new'
                ? <Button type="primary" danger icon={<UploadOutlined />}>上传文件</Button>
                : <Typography.Text style={{ color: t.colorText }}>资质证书.pdf</Typography.Text>}
            </Form.Item>
          </Col>
        </Row>
      </Card>

      {/* 服务能力 必填 */}
      <Card size="small" variant="outlined" style={{ marginTop: 16 }} title={<Space><span>🔧</span><span>服务能力</span><Tag color="red" style={{ marginLeft: 4 }}>必填</Tag></Space>}>
        <Row gutter={16}>
          <Col span={24}>
            {mode === 'editable' ? (
              <Form.Item label="主要设备/装备情况" name="equipmentDetail" required>
                <Input.TextArea rows={3} placeholder="请描述拥有的主要设备、仪器等硬件条件" />
              </Form.Item>
            ) : (
              <Form.Item label="主要设备/装备情况" required>
                <Input.TextArea rows={3} readOnly style={ro} defaultValue={mode === 'new' ? '' : D.equipmentDetail} placeholder="请描述拥有的主要设备、仪器等硬件条件" />
              </Form.Item>
            )}
          </Col>
          <Col span={24}>
            {mode === 'editable' ? (
              <Form.Item label="技术优势及特色" name="techAdvantage" required>
                <Input.TextArea rows={3} placeholder="请描述核心技术能力、专利技术、工艺特色等" />
              </Form.Item>
            ) : (
              <Form.Item label="技术优势及特色" required>
                <Input.TextArea rows={3} readOnly style={ro} defaultValue={mode === 'new' ? '' : D.techAdvantage} placeholder="请描述核心技术能力、专利技术、工艺特色等" />
              </Form.Item>
            )}
          </Col>
        </Row>
      </Card>
    </>
  );
}

/* ========== 3. QualificationTable ========== */

export function QualificationTable({
  mode,
  data,
  onDataChange,
}: {
  mode: AdmissionMode;
  data: QualDocItem[];
  onDataChange?: (data: QualDocItem[]) => void;
}) {
  const { token: t } = theme.useToken();
  const ro = { background: t.colorBgLayout };

  const columns = [
    {
      key: 'type',
      title: '文件类型',
      dataIndex: 'type',
      width: 260,
      render: (_: any, r: QualDocItem) => r.required
        ? <><span style={{ color: '#ff4d4f' }}>*</span> {r.type}</>
        : r.type,
    },
    {
      key: 'upload',
      title: '文件上传',
      width: 180,
      render: (_: any, r: QualDocItem) => {
        if (mode === 'new') {
          return <Button size="small" icon={<UploadOutlined />}>上传文件</Button>;
        }
        if (mode === 'readonly') {
          return r.fileName
            ? <Typography.Link style={{ color: '#1677ff' }}>{r.fileName}</Typography.Link>
            : '未上传';
        }
        /* editable */
        if (r.uploaded) {
          return <Space size={8}><Typography.Link style={{ color: '#1677ff' }}>预览</Typography.Link><Typography.Link style={{ color: '#1677ff' }}>替换</Typography.Link><Typography.Link style={{ color: '#1677ff' }}>删除</Typography.Link></Space>;
        }
        return <Button size="small" icon={<UploadOutlined />}>上传文件</Button>;
      },
    },
    {
      key: 'remark',
      title: '备注',
      dataIndex: 'remark',
      width: 160,
      render: (_: any, r: QualDocItem) => {
        if (mode === 'new') {
          return <Input size="small" placeholder="备注" />;
        }
        if (mode === 'readonly') {
          return <Input size="small" value={r.remark || ''} readOnly style={ro} />;
        }
        return <Input size="small" defaultValue={r.remark || ''} placeholder="备注" />;
      },
    },
    {
      key: 'validity',
      title: '有效时间',
      width: 280,
      render: (_: any, r: QualDocItem) => {
        if (mode === 'new') {
          return (
            <Space size={4}>
              <DatePicker size="small" /> 至 <DatePicker size="small" />
              <Checkbox>永久有效</Checkbox>
            </Space>
          );
        }
        if (mode === 'readonly') {
          return r.validityStart && r.validityEnd
            ? `${r.validityStart} 至 ${r.validityEnd}`
            : '—';
        }
        /* editable */
        return (
          <Space size={4}>
            <DatePicker size="small" defaultValue={r.validityStart ? undefined : undefined} /> 至 <DatePicker size="small" />
            <Checkbox>永久有效</Checkbox>
          </Space>
        );
      },
    },
  ];

  return (
    <Card size="small" variant="outlined" title={<Space><span>📄</span><span>资质文件上传</span></Space>}>
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        bordered
        size="small"
        rowKey="key"
      />
      {(mode === 'new' || mode === 'editable') && (
        <Button type="link" style={{ marginTop: 8, padding: 0 }}>+ 添加自定义附件</Button>
      )}
    </Card>
  );
}

/* ========== 4. RequiredDocsTable ========== */

export function RequiredDocsTable({
  mode,
  data,
  onDataChange,
}: {
  mode: AdmissionMode;
  data: RequiredDocItem[];
  onDataChange?: (data: RequiredDocItem[]) => void;
}) {
  const columns = [
    { key: 'name', title: '文件名称', dataIndex: 'name' },
    {
      key: 'upload',
      title: '文件上传',
      dataIndex: 'upload',
    },
  ];

  return (
    <>
      <Typography.Title level={5} style={{ marginBottom: 16 }}>所需要件上传</Typography.Title>
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        bordered
        size="small"
        locale={{ emptyText: '暂无数据' }}
        rowKey="key"
      />
      <Button
        type="primary"
        danger
        block
        style={{ marginTop: 12 }}
        disabled={mode === 'readonly'}
      >
        添加
      </Button>
    </>
  );
}

/* ========== 5. MDGCards ========== */

export function MDGCards({ mode, form }: { mode: AdmissionMode; form?: FormInstance }) {
  const { token: t } = theme.useToken();
  const ro = { background: t.colorBgLayout };
  const roProps = mode === 'readonly' ? { readOnly: true, style: ro } : {};

  const val = (key: string) => mode === 'new' ? '' : (D as any)[key];

  return (
    <>
      {/* Header */}
      <Space split={<span style={{ color: t.colorBorder }}>|</span>} style={{ marginBottom: 16 }}>
        <span>供应商名称: {mode === 'new' ? '—' : D.mdgSupplierName}</span>
        <span>供应商编码: —</span>
        <span>供应商状态: —</span>
      </Space>

      {/* Card: 申请信息 */}
      <Card size="small" variant="outlined" title={<Space><span>👥</span><span>申请信息</span></Space>}>
        <Row gutter={16}>
          <Col span={12}>
            {mode === 'editable' ? (
              <Form.Item label="申请人（员工编号）" name="mdgApplicant" required>
                <Input />
              </Form.Item>
            ) : (
              <Form.Item label="申请人（员工编号）" required>
                <Input defaultValue={mode === 'new' ? '80021903' : D.mdgApplicant} {...roProps} />
              </Form.Item>
            )}
          </Col>
          <Col span={12}>
            {mode === 'editable' ? (
              <Form.Item label="申请原因" name="mdgApplyReason" required>
                <Input placeholder="请输入申请原因" />
              </Form.Item>
            ) : (
              <Form.Item label="申请原因" required>
                <Input defaultValue={val('mdgApplyReason')} {...roProps} placeholder="请输入申请原因" />
              </Form.Item>
            )}
          </Col>
        </Row>
      </Card>

      {/* Card: 基础信息 */}
      <Card size="small" variant="outlined" style={{ marginTop: 16 }} title={<Space><span>📋</span><span>基础信息</span></Space>}>
        <Row gutter={16}>
          <Col span={24}>
            {mode === 'editable' ? (
              <Form.Item label="供应商名称" name="mdgSupplierName">
                <Input />
              </Form.Item>
            ) : (
              <Form.Item label="供应商名称">
                <Input defaultValue={val('mdgSupplierName')} {...roProps} />
              </Form.Item>
            )}
          </Col>
          <Col span={12}>
            {mode === 'editable' ? (
              <Form.Item label="证件类型" name="mdgDocType">
                <Select options={CERT_TYPE_OPTIONS} />
              </Form.Item>
            ) : (
              <Form.Item label="证件类型">
                <Select defaultValue={val('mdgDocType')} disabled options={CERT_TYPE_OPTIONS} style={ro} />
              </Form.Item>
            )}
          </Col>
          <Col span={12}>
            {mode === 'editable' ? (
              <Form.Item label="国家" name="mdgCountry">
                <Select options={COUNTRY_OPTIONS} />
              </Form.Item>
            ) : (
              <Form.Item label="国家">
                <Select defaultValue={val('mdgCountry')} disabled options={COUNTRY_OPTIONS} style={ro} />
              </Form.Item>
            )}
          </Col>
          <Col span={12}>
            {mode === 'editable' ? (
              <Form.Item label="城市" name="mdgCity">
                <Input />
              </Form.Item>
            ) : (
              <Form.Item label="城市">
                <Input defaultValue={val('mdgCity')} {...roProps} />
              </Form.Item>
            )}
          </Col>
          <Col span={12}>
            {mode === 'editable' ? (
              <Form.Item label="邮编" name="mdgZipCode">
                <Input />
              </Form.Item>
            ) : (
              <Form.Item label="邮编">
                <Input defaultValue={val('mdgZipCode')} {...roProps} />
              </Form.Item>
            )}
          </Col>
          <Col span={12}>
            {mode === 'editable' ? (
              <Form.Item label="注册资本" name="mdgRegisteredCapital">
                <Input suffix="万" />
              </Form.Item>
            ) : (
              <Form.Item label="注册资本">
                <Input defaultValue={val('mdgRegisteredCapital')} {...roProps} />
              </Form.Item>
            )}
          </Col>
          <Col span={12}>
            {mode === 'editable' ? (
              <Form.Item label="成立日期" name="mdgEstablishedDate">
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            ) : (
              <Form.Item label="成立日期">
                <Input defaultValue={val('mdgEstablishedDate')} {...roProps} />
              </Form.Item>
            )}
          </Col>
          <Col span={12}>
            {mode === 'editable' ? (
              <Form.Item label="省/直辖市" name="mdgProvince">
                <Select placeholder="请选择" options={PROVINCE_OPTIONS} />
              </Form.Item>
            ) : (
              <Form.Item label="省/直辖市">
                <Select defaultValue={val('mdgProvince')} disabled options={PROVINCE_OPTIONS} style={ro} />
              </Form.Item>
            )}
          </Col>
          <Col span={12}>
            {mode === 'editable' ? (
              <Form.Item label="注册地址" name="mdgRegisteredAddress">
                <Input />
              </Form.Item>
            ) : (
              <Form.Item label="注册地址">
                <Input defaultValue={val('mdgRegisteredAddress')} {...roProps} />
              </Form.Item>
            )}
          </Col>
          <Col span={12}>
            {mode === 'editable' ? (
              <Form.Item label="法定代表人姓名" name="mdgLegalPerson">
                <Input />
              </Form.Item>
            ) : (
              <Form.Item label="法定代表人姓名">
                <Input defaultValue={val('mdgLegalPerson')} {...roProps} />
              </Form.Item>
            )}
          </Col>
          <Col span={12}>
            {mode === 'editable' ? (
              <Form.Item label="币种" name="mdgCurrency">
                <Select options={CURRENCY_OPTIONS} />
              </Form.Item>
            ) : (
              <Form.Item label="币种">
                <Select defaultValue={val('mdgCurrency')} disabled options={CURRENCY_OPTIONS} style={ro} />
              </Form.Item>
            )}
          </Col>
          <Col span={12}>
            {mode === 'editable' ? (
              <Form.Item label="联系电话" name="mdgPhone">
                <Input />
              </Form.Item>
            ) : (
              <Form.Item label="联系电话">
                <Input defaultValue={val('mdgPhone')} {...roProps} />
              </Form.Item>
            )}
          </Col>
        </Row>
      </Card>

      {/* Card: MDG信息 */}
      <Card size="small" variant="outlined" style={{ marginTop: 16 }} title={<Space><span>ⓘ</span><span>MDG信息</span></Space>}>
        <Row gutter={16}>
          <Col span={12}>
            {mode === 'editable' ? (
              <Form.Item label="单位分类（供应商账户）" name="mdgUnitClassification" required>
                <Input />
              </Form.Item>
            ) : (
              <Form.Item label="单位分类（供应商账户）" required>
                <Input defaultValue={val('mdgUnitClassification')} {...roProps} />
              </Form.Item>
            )}
          </Col>
          <Col span={12}>
            {mode === 'editable' ? (
              <Form.Item label="单位简称（供应商简称）" name="mdgUnitShortName" required>
                <Input />
              </Form.Item>
            ) : (
              <Form.Item label="单位简称（供应商简称）" required>
                <Input defaultValue={val('mdgUnitShortName')} {...roProps} />
              </Form.Item>
            )}
          </Col>
          <Col span={12}>
            {mode === 'editable' ? (
              <Form.Item label="企业规模" name="mdgCompanyScale" required>
                <Select placeholder="请选择" options={ENTERPRISE_SCALE_OPTIONS} />
              </Form.Item>
            ) : (
              <Form.Item label="企业规模" required>
                <Select defaultValue={val('mdgCompanyScale')} disabled options={ENTERPRISE_SCALE_OPTIONS} style={ro} />
              </Form.Item>
            )}
          </Col>
          <Col span={12}>
            {mode === 'editable' ? (
              <Form.Item label="备注" name="mdgRemark">
                <Input placeholder="请输入备注" />
              </Form.Item>
            ) : (
              <Form.Item label="备注">
                <Input defaultValue={val('mdgRemark')} {...roProps} />
              </Form.Item>
            )}
          </Col>
          <Col span={12}>
            {mode === 'editable' ? (
              <Form.Item label="公司代码" name="mdgCompanyCode" required>
                <Select placeholder="请选择" options={MDG_COMPANY_CODE_OPTIONS} />
              </Form.Item>
            ) : (
              <Form.Item label="公司代码" required>
                <Select defaultValue={val('mdgCompanyCode')} disabled options={MDG_COMPANY_CODE_OPTIONS} style={ro} />
              </Form.Item>
            )}
          </Col>
          <Col span={12}>
            {mode === 'editable' ? (
              <Form.Item label="关联人士香港联交所" name="mdgRelatedPersonHk">
                <Select placeholder="请选择" options={MDG_HK_EXCHANGE_OPTIONS} />
              </Form.Item>
            ) : (
              <Form.Item label="关联人士香港联交所">
                <Select defaultValue={val('mdgRelatedPersonHk')} disabled options={MDG_HK_EXCHANGE_OPTIONS} style={ro} />
              </Form.Item>
            )}
          </Col>
          <Col span={12}>
            {mode === 'editable' ? (
              <Form.Item label="所属集团类型" name="mdgGroupType">
                <Select options={MDG_GROUP_TYPE_OPTIONS} />
              </Form.Item>
            ) : (
              <Form.Item label="所属集团类型">
                <Select defaultValue={val('mdgGroupType')} disabled options={MDG_GROUP_TYPE_OPTIONS} style={ro} />
              </Form.Item>
            )}
          </Col>
          <Col span={12}>
            {mode === 'editable' ? (
              <Form.Item label="注册地区" name="mdgRegisterRegion" required>
                <Select defaultValue="中国" options={COUNTRY_OPTIONS} />
              </Form.Item>
            ) : (
              <Form.Item label="注册地区" required>
                <Select defaultValue={val('mdgRegisterRegion')} disabled options={COUNTRY_OPTIONS} style={ro} />
              </Form.Item>
            )}
          </Col>
          <Col span={12}>
            {mode === 'editable' ? (
              <Form.Item label="所属行业" name="mdgIndustry" required>
                <Select placeholder="请选择" options={MDG_INDUSTRY_OPTIONS} />
              </Form.Item>
            ) : (
              <Form.Item label="所属行业" required>
                <Select defaultValue={val('mdgIndustry')} disabled options={MDG_INDUSTRY_OPTIONS} style={ro} />
              </Form.Item>
            )}
          </Col>
          <Col span={12}>
            {mode === 'editable' ? (
              <Form.Item label="客户资料附件" name="mdgCustomerDoc">
                <Select defaultValue="无" options={MDG_CUSTOMER_DOC_OPTIONS} />
              </Form.Item>
            ) : (
              <Form.Item label="客户资料附件">
                <Select defaultValue={val('mdgCustomerDoc')} disabled options={MDG_CUSTOMER_DOC_OPTIONS} style={ro} />
              </Form.Item>
            )}
          </Col>
          <Col span={12}>
            {mode === 'editable' ? (
              <Form.Item label="经营状况" name="mdgBusinessStatus" required>
                <Select placeholder="请选择" options={MDG_OPERATE_STATUS_OPTIONS} />
              </Form.Item>
            ) : (
              <Form.Item label="经营状况" required>
                <Select defaultValue={val('mdgBusinessStatus')} disabled options={MDG_OPERATE_STATUS_OPTIONS} style={ro} />
              </Form.Item>
            )}
          </Col>
          <Col span={12}>
            {mode === 'editable' ? (
              <Form.Item label="公司曾用名" name="mdgFormerName">
                <Input placeholder="请输入公司曾用名" />
              </Form.Item>
            ) : (
              <Form.Item label="公司曾用名">
                <Input defaultValue={val('mdgFormerName')} {...roProps} />
              </Form.Item>
            )}
          </Col>
          <Col span={12}>
            {mode === 'editable' ? (
              <Form.Item label="贸易伙伴" name="mdgTradePartner" required>
                <Select options={MDG_TRADE_PARTNER_OPTIONS} />
              </Form.Item>
            ) : (
              <Form.Item label="贸易伙伴" required>
                <Select defaultValue={val('mdgTradePartner')} disabled options={MDG_TRADE_PARTNER_OPTIONS} style={ro} />
              </Form.Item>
            )}
          </Col>
        </Row>
        <Typography.Text type="secondary" style={{ fontSize: 12 }}>按照当前MDG程序规范将伙伴放认选择（外部）</Typography.Text>
      </Card>
    </>
  );
}
