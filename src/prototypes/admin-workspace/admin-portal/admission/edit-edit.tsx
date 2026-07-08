/**
 * @name 信息编辑
 */
import { useState, useEffect } from 'react';
import { theme, Typography, Card, Space, Button, Tabs, Form, Row, message } from 'antd';
import PortalLayout from '../../common/portal-layout';
import { adminGroups } from '../../common/menu-data';
import {
  BasicInfoCards, ServiceCategoryCards, QualificationTable,
  RequiredDocsTable, MDGCards,
} from '../../common/admission-shared';
import {
  AdmissionMode, QUALIFICATION_DOCS, RequiredDocItem,
} from '../../common/admission-types';

const INITIAL_REQUIRED_DOCS: RequiredDocItem[] = [{ key: '1', name: '', upload: '' }];

export default function EditEditPage() {
  const { token: t } = theme.useToken();
  const [activeTab, setActiveTab] = useState('basic');
  const [form] = Form.useForm();
  const [qualDocs, setQualDocs] = useState(QUALIFICATION_DOCS);
  const [requiredDocs, setRequiredDocs] = useState<RequiredDocItem[]>(INITIAL_REQUIRED_DOCS);

  useEffect(() => {
    form.setFieldsValue({
      admissionSource: '公开招标采购中标',
      admissionCategory: '新增准入服务商',
      bidProject: '2026年度江汉油田钻采设备维保服务项目',
      bidNumber: 'ZB-2026-JH-0318',
      companyName: '湖北江汉石油机械制造有限公司',
      creditCode: '91420000706802345X',
      establishedDate: '2005-03-15',
      registeredCapital: '5,000万元',
      isInternal: 'external',
      internalOrg: undefined,
      managementUnit: '中国石油天然气集团有限公司',
      contactName: '张明远',
      contactPhone: '138-0726-8856',
      contactEmail: 'zhangmy@jhpme.com',
      contactAddress: '湖北省潜江市广华街道江汉路128号',
      legalPerson: '李建国',
      currency: 'CNY',
      companyScale: 'medium',
      bankName: '中国工商银行潜江广华支行',
      bankCreditLevel: 'AA',
      companyWebsite: 'www.jhpme.com',
      registeredCapital2: '5,000万元',
      establishedDate2: '2005-03-15',
      bankAccount: '3202 0568 0910 0012 345',
      bankAccount2: '3202 0568 0910 0012 345',
      companyPhone: '0728-6518888',
      country: '中国',
      province: '湖北省',
      city: '潜江市',
      communicationAddress: '湖北省潜江市广华街道江汉路128号',
      registeredAddress: '湖北省潜江市广华管理区江汉路128号',
      zipCode: '433124',
      businessScope: '石油钻采设备及配件的研发、制造、销售、维修；油田技术服务；机械设备租赁；货物及技术进出口业务（依法须经批准的项目，经相关部门批准后方可开展经营活动）',
      serviceTeamSize: '126',
      techStaffSize: '58',
      personnelQualification: '现有高级工程师12人，中级工程师26人，持有特种作业操作证人员18人，注册安全工程师3人，质量管理体系内审员5人。',
      recentRevenue: '2022年1,200万/2023年1,500万/2024年1,800万',
      recentProfit: '2022年120万/2023年180万/2024年200万',
      mainBusinessScope: '石油钻采设备制造与维修、油田井下作业服务、油田化学品销售、油田地面工程技术服务。核心竞争优势：20年石油装备研发制造经验，拥有12项发明专利，与江汉油田保持长期合作关系。',
      projectPerformance: '1. 江汉油田钻采设备年度维保服务（2023-2025），甲方：江汉油田分公司，合同金额1,200万元；2. 长庆油田抽油机维修项目（2024），甲方：长庆油田分公司，合同金额580万元；3. 华北油田井口装置供货项目（2024），甲方：华北油田分公司，合同金额320万元。',
      cnpcCooperation: '自2008年起与中国石油江汉油田分公司建立合作关系，累计服务15年。2018年获评江汉油田优秀供应商，2022年获评战略合作伙伴。与中国石油长城钻探公司、西部钻探公司均有设备供货合作。',
      qualityCert: 'ISO9001',
      hseCert: 'SY/T6276',
      safetyRecord: '近三年无重大安全生产事故。2023年通过HSE管理体系复审，2024年获评潜江市安全生产先进单位。定期开展安全培训和应急演练，年均培训覆盖率100%。',
      needSiteAudit: false,
      envMeasures: '已建立ISO14001环境管理体系，生产废水达标排放，固体废弃物分类处理。2024年投入200万元用于车间VOCs治理改造，万元产值能耗较上年降低8%。',
      socialResponsibility: '连续5年参加潜江市扶贫帮困活动，累计捐赠30万元。定期组织员工参加无偿献血和社区志愿服务，2024年获评潜江市爱心企业。',
      corporateGovernance: '设立了董事会、监事会和经营管理层，建立了完善的内部控制体系和风险管理制度。设有合规管理部，定期开展内部审计和合规检查。',
      qualLevel: '甲级',
      qualCertNumber: 'ZY-2024-HB-0056',
      creditRating: 'A',
      equipmentDetail: '拥有各类石油钻采设备维修工位6个，配备数控车床、数控铣床、大型焊接设备等主要生产设备32台/套，检测设备18台/套，年产值能力8,000万元。',
      techAdvantage: '拥有专利技术12项（其中发明专利3项），在深井钻采设备维修、高温高压井口装置检测等方面具有技术优势。与长江大学联合建立产学研基地，具备新产品研发能力。',
      mdgApplicant: '80021903',
      mdgApplyReason: '公开招标中标，需办理准入手续',
      mdgSupplierName: '石油外部一般往来单位22',
      mdgDocType: '02',
      mdgCountry: '中国',
      mdgCity: '潜江市',
      mdgZipCode: '433124',
      mdgRegisteredCapital: '5,000万',
      mdgEstablishedDate: '2005-03-15',
      mdgProvince: '湖北省',
      mdgRegisteredAddress: '湖北省潜江市广华管理区江汉路128号',
      mdgLegalPerson: '李建国',
      mdgCurrency: 'CNY',
      mdgPhone: '0728-6518888',
      mdgUnitClassification: '石油外部一般往来单位',
      mdgUnitShortName: '江汉石油机械',
      mdgCompanyScale: 'medium',
      mdgRemark: '',
      mdgCompanyCode: 'cq',
      mdgRelatedPersonHk: undefined,
      mdgGroupType: 'external_other',
      mdgRegisterRegion: '中国',
      mdgIndustry: 'manufacture',
      mdgCustomerDoc: 'none',
      mdgBusinessStatus: 'active',
      mdgFormerName: '',
      mdgTradePartner: 'external',
    });
  }, [form]);

  const handleBack = () => { window.location.hash = '#/admin/info-edit'; };

  const handleSubmit = () => {
    form.validateFields().then(() => {
      message.success('提交成功！');
      setTimeout(() => handleBack(), 1000);
    }).catch(() => { message.error('请检查必填项'); });
  };

  const handleSave = () => { message.success('保存成功！'); };

  const tabItems = [
    { key: 'basic', label: '基本信息', children: <BasicInfoCards mode="editable" form={form} /> },
    { key: 'category', label: '服务品类', children: <ServiceCategoryCards mode="editable" form={form} /> },
    { key: 'qualification', label: '资质信息', children: <QualificationTable mode="editable" data={qualDocs} onDataChange={setQualDocs} /> },
    { key: 'required', label: '要件信息', children: <RequiredDocsTable mode="editable" data={requiredDocs} onDataChange={setRequiredDocs} /> },
    { key: 'mdg', label: 'MDG信息', children: <MDGCards mode="editable" form={form} /> },
  ];

  return (
    <PortalLayout groups={adminGroups} activePath="/admin/info-edit" portalType="admin">
      <Card variant="outlined" size="small">
        <Space direction="vertical" style={{ width: '100%' }} size={16}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <Typography.Text style={{ color: '#ff4d4f', fontSize: 13 }}>注册服务商审核</Typography.Text>
              <Typography.Title level={4} style={{ margin: '4px 0 0' }}>服务商信息编辑</Typography.Title>
            </div>
            <Button type="link" onClick={handleBack} style={{ padding: 0 }}>← 返回列表</Button>
          </div>
          <Form form={form} layout="vertical">
            <Tabs activeKey={activeTab} onChange={setActiveTab} items={tabItems} />
          </Form>
          <Row justify="end" style={{ borderTop: `1px solid ${t.colorBorderSecondary}`, paddingTop: 16, marginTop: 8 }}>
            <Space>
              <Button type="primary" danger onClick={handleSubmit}>提交</Button>
              <Button type="primary" onClick={handleSave}>保存</Button>
              <Button onClick={handleBack}>取消</Button>
            </Space>
          </Row>
        </Space>
      </Card>
    </PortalLayout>
  );
}
