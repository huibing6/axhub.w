/**
 * @name 维护编辑表单（4页签）
 */
import { useState, useEffect } from 'react';
import {
  theme, Typography, Card, Space, Button, Tabs, Form, message,
} from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import PortalLayout from '../../common/portal-layout';
import { adminGroups } from '../../common/menu-data';
import { BasicInfoCards, QualificationTable, RequiredDocsTable, MDGCards } from '../../common/admission-shared';
import { QUALIFICATION_DOCS, RequiredDocItem } from '../../common/admission-types';

const INITIAL_REQUIRED_DOCS: RequiredDocItem[] = [
  { key: '1', name: '', upload: '' },
];

export default function MaintEditFormPage() {
  const { token: t } = theme.useToken();
  const [activeTab, setActiveTab] = useState('basic');
  const [form] = Form.useForm();
  const [qualDocs, setQualDocs] = useState(QUALIFICATION_DOCS);
  const [requiredDocs, setRequiredDocs] = useState(INITIAL_REQUIRED_DOCS);

  useEffect(() => {
    form.setFieldsValue({
      source: '公开招标采购中标',
      category: '新增准入服务商',
      bidProject: '2026年度江汉油田钻采设备维保服务项目',
      bidNumber: 'ZB-2026-JH-0318',
      spName: '湖北江汉石油机械制造有限公司',
      creditCode: '91420000706802345X',
      establishDate: '2005-03-15',
      regCapital: '5,000万元',
      isInternal: 'internal',
      internalOrg: '中国石油天然气集团有限公司',
      adminUnit: '中国石油天然气集团有限公司',
      contactName: '张明远',
      contactPhone: '138-0726-8856',
      contactEmail: 'zhangmingyuan@jhhx.com',
      contactAddr: '湖北省潜江市江汉油田矿区路18号',
      legalPerson: '王建华',
      currency: 'CNY',
      scale: '中型',
      bank: '中国工商银行潜江支行',
      bankCredit: 'AAA',
      website: 'https://www.jhhxjx.com',
      regCapital2: '5000',
      establishDate2: '2005/03/15',
      bankAccount: '6228480322888666',
      bankAccountNo: '4200-1286-5678-0001',
      companyPhone: '0728-6234567',
      country: '中国',
      province: '湖北省',
      city: '潜江市',
      detailAddr: '湖北省潜江市江汉油田矿区路18号',
      regAddr: '湖北省潜江市江汉油田矿区路18号',
      zip: '433100',
      businessScope: '石油天然气钻采设备制造与维修；石油化工机械设备及配件制造与销售；油气田地面工程设备安装与调试；机械设备租赁及技术服务；压力管道安装及维修（凭资质经营）。',
      teamSize: '186',
      techCount: '89',
      qualification: '拥有高级工程师12人，中级工程师35人，持证特种作业人员56人',
      revenue3y: '2022年8500万/2023年9200万/2024年10500万',
      profit3y: '2022年850万/2023年920万/2024年1050万',
      mainBiz: '石油钻采设备维保、租赁及技术服务',
      projectExp: '2024年江汉油田钻采设备维保项目（1200万）；2023年长城钻探设备租赁项目（800万）',
      cnpcExp: '自2008年起与中国石油江汉油田分公司建立合作关系，累计服务15年',
      qhseCert: 'ISO9001',
      hseSystem: 'SY/T6276',
      safetyRecord: '近三年无重大安全生产事故',
      envManage: '通过ISO14001环境管理体系认证',
      socialResp: '连续5年参加潜江市扶贫帮困活动，累计捐赠30万元',
      governance: '建立了完善的法人治理结构和合规管理制度',
      mdgUnitClass: '',
      mdgUnitShort: '',
      mdgScale: '微型',
      mdgRemark: '',
      mdgCompanyCode: '长庆油田分公司成本控制范围',
      mdgHkExchange: '',
      mdgGroupType: '外部单位>其他外部单位>国有',
      mdgRegRegion: '中国',
      mdgIndustry: '农、林、牧、渔业',
      mdgCustomerDoc: '无',
      mdgOperateStatus: '存续（在营、开业、在册）',
      mdgFormerName: '',
      mdgTradePartner: '外部',
      mdgApplicant: '80021903',
      mdgApplyReason: '',
      mdgSpName: '石油外部一般往来单位22',
    });
  }, [form]);

  const handleBack = () => {
    window.location.hash = '#/admin/select-sp';
  };

  const handleSubmit = () => {
    message.success('维护信息已提交');
    window.location.hash = '#/admin/select-sp';
  };

  const handleSave = () => {
    message.success('已保存');
  };

  const tabItems = [
    { key: 'basic', label: '基本信息', children: <BasicInfoCards mode="editable" form={form} /> },
    { key: 'qualification', label: '资质信息', children: <QualificationTable mode="editable" data={qualDocs} onDataChange={setQualDocs} /> },
    { key: 'required', label: '要件信息', children: <RequiredDocsTable mode="editable" data={requiredDocs} onDataChange={setRequiredDocs} /> },
    { key: 'mdg', label: 'MDG信息', children: <MDGCards mode="editable" form={form} /> },
  ];

  return (
    <PortalLayout groups={adminGroups} activePath="/admin/maint-edit" portalType="admin">
      <Space style={{ marginBottom: 16 }}>
        <Button type="link" icon={<ArrowLeftOutlined />} onClick={handleBack} style={{ paddingLeft: 0 }}>返回列表</Button>
        <Typography.Text type="secondary">{'>'}</Typography.Text>
        <Typography.Text>维护编辑</Typography.Text>
      </Space>
      <Typography.Title level={4} style={{ margin: '0 0 16px' }}>服务商信息编辑</Typography.Title>
      <Form form={form} layout="vertical">
        <Tabs activeKey={activeTab} onChange={setActiveTab} items={tabItems} />
      </Form>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 16 }}>
        <Button onClick={handleBack}>取消</Button>
        <Button onClick={handleSave}>保存</Button>
        <Button type="primary" danger onClick={handleSubmit}>提交</Button>
      </div>
    </PortalLayout>
  );
}
