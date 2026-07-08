export type AdmissionMode = 'new' | 'readonly' | 'editable';

export interface ServiceTableItem {
  key: string;
  code: string;
  name: string;
  type: string;
  typeColor: string;
  level: string;
  action: string;
}

export interface QualDocItem {
  key: string;
  type: string;
  required: boolean;
  fileName?: string;
  uploaded?: boolean;
  remark?: string;
  validityStart?: string;
  validityEnd?: string;
}

export interface RequiredDocItem {
  key: string;
  name: string;
  upload: string;
}

export const SERVICE_TABLE_DATA: ServiceTableItem[] = [
  { key: '1', code: '502010', name: '工程技术服务／生产及维修服务', type: '专业', typeColor: 'blue', level: '一级', action: '展开' },
  { key: '2', code: '502030', name: '工程技术服务／设备维保服务', type: '专业', typeColor: 'blue', level: '一级', action: '合并' },
  { key: '3', code: '601010', name: '办公服务／物业管理', type: '通用', typeColor: 'green', level: '二级', action: '—' },
];

export const QUALIFICATION_DOCS: QualDocItem[] = [
  { key: '1', type: '营业执照', required: true, fileName: '营业执照.pdf', uploaded: true, remark: '', validityStart: '2023-06-01', validityEnd: '2028-06-01' },
  { key: '2', type: '专业资质证书', required: true, fileName: '专业资质证书.pdf', uploaded: true, remark: '', validityStart: '2024-03-01', validityEnd: '2027-03-01' },
  { key: '3', type: '无重大违法违规承诺', required: true, fileName: '无违规承诺.pdf', uploaded: true, remark: '', validityStart: '2025-01-01', validityEnd: '2026-12-31' },
  { key: '4', type: '信用信息合规（4大平台无黑名单）', required: true, fileName: '信用合规报告.pdf', uploaded: true, remark: '', validityStart: '2025-06-01', validityEnd: '2026-06-01' },
  { key: '5', type: '服务商准入承诺书', required: true, fileName: '准入承诺书.pdf', uploaded: true, remark: '', validityStart: '2025-01-01', validityEnd: '2027-12-31' },
  { key: '6', type: '中标通知书', required: true, fileName: '中标通知书.pdf', uploaded: true, remark: '', validityStart: '2026-01-01', validityEnd: '2026-12-31' },
  { key: '7', type: 'ISO 9001 质量管理体系认证证书', required: false, fileName: 'ISO9001_cert.pdf', uploaded: true, remark: '自定义附件', validityStart: '2024-01-01', validityEnd: '2027-01-01' },
];

export const PROVINCE_OPTIONS = [
  '北京市', '天津市', '河北省', '山西省', '内蒙古自治区', '辽宁省', '吉林省', '黑龙江省',
  '上海市', '江苏省', '浙江省', '安徽省', '福建省', '江西省', '山东省', '河南省', '湖北省',
  '湖南省', '广东省', '广西壮族自治区', '海南省', '重庆市', '四川省', '贵州省', '云南省',
  '西藏自治区', '陕西省', '甘肃省', '青海省', '宁夏回族自治区', '新疆维吾尔自治区',
].map(p => ({ label: p, value: p }));

export const QUAL_LEVEL_OPTIONS = [
  { label: '一级', value: '一级' },
  { label: '二级', value: '二级' },
  { label: '三级', value: '三级' },
];

export const CREDIT_RATING_OPTIONS = [
  { label: 'AAA', value: 'AAA' },
  { label: 'AA', value: 'AA' },
  { label: 'A', value: 'A' },
  { label: 'BBB', value: 'BBB' },
  { label: 'BB', value: 'BB' },
  { label: 'B', value: 'B' },
];

export const ENTERPRISE_SCALE_OPTIONS = [
  { label: '大型', value: '大型' },
  { label: '中型', value: '中型' },
  { label: '小型', value: '小型' },
  { label: '微型', value: '微型' },
];

export const CURRENCY_OPTIONS = [
  { label: '人民币（CNY）', value: 'CNY' },
  { label: '美元（USD）', value: 'USD' },
];

export const COUNTRY_OPTIONS = [
  { label: '中国', value: '中国' },
  { label: '美国', value: '美国' },
  { label: '其他', value: '其他' },
];

export const MGMT_TYPE_OPTIONS = [
  { label: '所属企业管理', value: '所属企业管理' },
  { label: '总部管理', value: '总部管理' },
];

export const QHSE_CERT_OPTIONS = [
  { label: 'ISO9001', value: 'ISO9001' },
  { label: 'ISO14001', value: 'ISO14001' },
  { label: 'IATF16949', value: 'IATF16949' },
  { label: '其他', value: '其他' },
];

export const HSE_SYSTEM_OPTIONS = [
  { label: 'SY/T6276', value: 'SY/T6276' },
  { label: 'ISO45001', value: 'ISO45001' },
  { label: '其他', value: '其他' },
];

export const INTERNAL_ORG_OPTIONS = [
  { label: '中国石油天然气集团有限公司', value: '中国石油天然气集团有限公司' },
  { label: '中国石油化工集团有限公司', value: '中国石油化工集团有限公司' },
  { label: '中国海洋石油集团有限公司', value: '中国海洋石油集团有限公司' },
];

export const CERT_TYPE_OPTIONS = [
  { label: '02 三证合一', value: '02 三证合一' },
  { label: '01 营业执照', value: '01 营业执照' },
];

export const BANK_CREDIT_OPTIONS = [
  { label: 'AAA', value: 'AAA' },
  { label: 'AA', value: 'AA' },
  { label: 'A', value: 'A' },
  { label: 'BBB', value: 'BBB' },
];

export const MDG_COMPANY_CODE_OPTIONS = [
  { label: '长庆油田分公司成本控制范围', value: '长庆油田分公司成本控制范围' },
  { label: '其他', value: '其他' },
];

export const MDG_HK_EXCHANGE_OPTIONS = [
  { label: '请选择', value: '' },
  { label: '是', value: '是' },
  { label: '否', value: '否' },
];

export const MDG_GROUP_TYPE_OPTIONS = [
  { label: '外部单位>其他外部单位>国有', value: '外部单位>其他外部单位>国有' },
  { label: '外部单位>其他外部单位>民营', value: '外部单位>其他外部单位>民营' },
];

export const MDG_INDUSTRY_OPTIONS = [
  { label: '农、林、牧、渔业', value: '农、林、牧、渔业' },
  { label: '采矿业', value: '采矿业' },
  { label: '制造业', value: '制造业' },
  { label: '建筑业', value: '建筑业' },
];

export const MDG_OPERATE_STATUS_OPTIONS = [
  { label: '存续（在营、开业、在册）', value: '存续（在营、开业、在册）' },
  { label: '注销', value: '注销' },
  { label: '吊销', value: '吊销' },
];

export const MDG_TRADE_PARTNER_OPTIONS = [
  { label: '外部', value: '外部' },
  { label: '内部', value: '内部' },
];

export const MDG_CUSTOMER_DOC_OPTIONS = [
  { label: '无', value: '无' },
  { label: '有', value: '有' },
];
