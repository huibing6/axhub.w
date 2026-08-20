/**
 * 专业目录资质附件配置（共享数据）
 * 管理端在"参数配置 → 专业服务目录配置 → 目录品类设置"中维护，
 * 服务商端注册/准入的服务目录编辑区按服务品类编码读取并展示上传。
 */
export interface QualAttachItem {
  name: string;
  required: boolean;
  desc?: string;
}

/**
 * 按服务品类编码配置的资质附件清单。
 * 未配置的品类（通用目录）视为无需资质附件。
 */
export const categoryQualConfig: Record<string, QualAttachItem[]> = {
  'S0101000': [
    { name: '咨询服务资质证书', required: true, desc: '咨询类企业应具备的行业资质证书' },
    { name: '专业人员执业资格证明', required: true, desc: '主要咨询人员的执业资格证书' },
    { name: '质量管理体系认证证书', required: false, desc: 'ISO 9001 等质量管理体系认证' },
  ],
  'S0102000': [
    { name: '勘查资质证书', required: true, desc: '对应级别的勘查类资质证书' },
    { name: '安全生产许可证', required: true, desc: '有效期内的安全生产许可证明' },
    { name: '主要设备检测报告', required: false, desc: '勘查设备的检验检测合格报告' },
  ],
  'S0301000': [
    { name: '生产许可证', required: true, desc: '相关生产加工环节的生产许可证' },
    { name: '特种设备制造许可', required: false, desc: '涉及特种设备制造时提供' },
    { name: '产品质量检测报告', required: false, desc: '主要产品的质量检验报告' },
  ],
  'S0201000': [
    { name: '物化探专业资质证书', required: true, desc: '地震勘探类专业资质证书' },
    { name: '安全生产许可证', required: true, desc: '有效期内的安全生产许可证明' },
  ],
  'S0501000': [
    { name: '科技服务资质证书', required: true, desc: '科技项目服务类资质证书' },
    { name: '研发团队人员资质证明', required: false, desc: '主要研发人员的技术职称证明' },
  ],
};

/** 获取某服务品类需上传的资质附件清单（无配置返回空数组） */
export function getQualAttachList(categoryCode: string): QualAttachItem[] {
  const list = categoryQualConfig[categoryCode];
  if (list) return list;
  const stripped = categoryCode.replace(/0+$/, '');
  return categoryQualConfig[stripped] || [];
}

/* ─────────────────────────────────────────────
   填报须知配置（按品类编码）
   ───────────────────────────────────────────── */

/**
 * 按服务品类编码配置的填报须知/字段说明。
 * 服务商选择该品类后，展示具体的填写要求。
 */
export const categoryInstructions: Record<string, string> = {
  'S0101000': `请上传以下材料：
1. 企业营业执照副本（彩色扫描件）
2. 咨询服务资质证书
3. 主要咨询人员执业资格证明（不少于3人）
4. 近三年同类项目业绩合同（至少3份）
5. 质量管理体系认证证书（如有）`,
  'S0102000': `请上传以下材料：
1. 企业营业执照副本（彩色扫描件）
2. 勘查资质证书（对应级别）
3. 安全生产许可证（有效期内）
4. 主要勘查设备清单及检验报告
5. 近三年同类项目业绩证明（至少2份）`,
  'S0301000': `请上传以下材料：
1. 企业营业执照副本（彩色扫描件）
2. 生产许可证
3. 产品质量检测报告
4. 特种设备制造许可证（如涉及）
5. 近三年同类项目业绩合同（至少2份）`,
  'S0201000': `请上传以下材料：
1. 企业营业执照副本（彩色扫描件）
2. 物化探专业资质证书
3. 安全生产许可证（有效期内）
4. 主要物探设备清单
5. 近三年同类项目业绩证明`,
  'S0501000': `请上传以下材料：
1. 企业营业执照副本（彩色扫描件）
2. 科技服务资质证书
3. 研发团队人员资质证明（如有）
4. 近三年科技项目成果证明
5. 质量管理体系认证证书（如有）`,
};

/** 获取某服务品类的填报须知（无配置返回空字符串） */
export function getCategoryInstructions(categoryCode: string): string {
  const instructions = categoryInstructions[categoryCode];
  if (instructions) return instructions;
  const stripped = categoryCode.replace(/0+$/, '');
  return categoryInstructions[stripped] || '';
}

/* ─────────────────────────────────────────────
   系统通知配置（管理端维护，服务商端展示）
   ───────────────────────────────────────────── */

export interface SystemNotice {
  seq: number;
  type: '系统通知' | '操作手册';
  title: string;
  content: string;
  attachments: { name: string; url: string }[];
  createTime: string;
  status: '已发布' | '草稿';
}

/**
 * 系统通知数据（由管理端参数配置维护）
 * 系统通知 → 展示在工作台右侧通知列表
 * 操作手册 → 展示在工作台左侧操作手册区域
 */
export const systemNoticeData: SystemNotice[] = [
  {
    seq: 1, type: '系统通知', title: '2026年度服务商考评将于6月15日启动',
    content: '各位服务商：\n\n2026年度服务商综合考核将于2026年7月1日正式开始，请各服务商提前准备以下材料：\n\n1. 年度服务报告\n2. 客户满意度调查表\n3. 资质证书更新文件\n4. 安全生产记录\n\n请在2026年6月30日前完成材料准备。',
    attachments: [], createTime: '2026-06-01 10:00', status: '已发布',
  },
  {
    seq: 2, type: '系统通知', title: '服务商注册标签新增ESG管理材料要求',
    content: '各相关部门、服务商：\n\n根据最新政策要求，服务商注册管理规定已完成修订，新增ESG管理材料要求。新规定自2026年7月1日起施行。',
    attachments: [], createTime: '2026-05-28 14:30', status: '已发布',
  },
  {
    seq: 3, type: '系统通知', title: '服务商管理平台操作培训（第三期）报名开始',
    content: '各服务商：\n\n服务商管理平台操作培训（第三期）现已开放报名，请未完成培训的服务商尽快报名参加。',
    attachments: [], createTime: '2026-05-25 09:00', status: '已发布',
  },
  {
    seq: 4, type: '系统通知', title: '系统将于6月3日凌晨2:00-4:00进行维护升级',
    content: '各位用户：\n\n系统将于2026年6月3日（周三）02:00-04:00进行维护升级，届时系统将暂停服务。请提前做好相关工作安排。',
    attachments: [], createTime: '2026-05-22 16:00', status: '已发布',
  },
  {
    seq: 5, type: '操作手册', title: '服务商注册操作手册',
    content: '本手册详细介绍了服务商注册的完整流程，包括：\n\n1. 账号注册与登录\n2. 基础信息填写\n3. 服务品类选择\n4. 资质文件上传\n5. 提交审核',
    attachments: [{ name: '服务商注册操作手册0618V.pdf', url: '#' }], createTime: '2026-05-20 09:00', status: '已发布',
  },
  {
    seq: 6, type: '操作手册', title: '服务商准入操作手册',
    content: '本手册详细介绍了服务商准入的完整流程，包括：\n\n1. 准入通知查看\n2. 补充资料填写\n3. 资质文件上传\n4. 进度查询',
    attachments: [{ name: '服务商正式准入操作手册0618V.pdf', url: '#' }], createTime: '2026-05-18 16:00', status: '已发布',
  },
  {
    seq: 7, type: '操作手册', title: '服务商日常管理操作手册',
    content: '本手册详细介绍了服务商日常管理功能，包括：\n\n1. 服务品类维护\n2. 信息变更申请\n3. 冻结解冻查询\n4. 进度查询',
    attachments: [{ name: '服务商日常管理操作手册0618V.pdf', url: '#' }], createTime: '2026-05-15 10:00', status: '已发布',
  },
];

/** 获取已发布的系统通知列表 */
export function getPublishedNotifications(): SystemNotice[] {
  return systemNoticeData.filter(n => n.type === '系统通知' && n.status === '已发布');
}

/** 获取已发布的操作手册列表 */
export function getPublishedManuals(): SystemNotice[] {
  return systemNoticeData.filter(n => n.type === '操作手册' && n.status === '已发布');
}
