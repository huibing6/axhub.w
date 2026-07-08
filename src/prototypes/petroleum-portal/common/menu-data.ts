/**
 * @name MenuData
 * 各门户侧边栏菜单配置
 */

export interface MenuItem { label: string; path?: string; children?: MenuItem[]; }
export interface MenuGroup { title: string; items: MenuItem[]; }

/* ─── 服务商端 ─── */
export const spGroups: MenuGroup[] = [
  {
    title: '自助注册服务商',
    items: [
      { label: '服务商工作台', path: '/sp/workspace' },
      { label: '注册服务商', path: '/sp/register' },
      { label: '注册服务商信息变更', path: '/sp/register-change' },
    ],
  },
  {
    title: '服务商管理自助服务',
    items: [
      { label: '正式准入申请', path: '/sp/admission' },
      { label: '信息维护', path: '/sp/info-maintain' },
      { label: '资质维护', path: '/sp/qual-maintain' },
      { label: '服务维护', path: '/sp/service-maintain' },
    ],
  },
  {
    title: '服务商管理信息查询',
    items: [
      { label: '信息查询', path: '/sp/info-query' },
      { label: '进度查询', path: '/sp/progress-query' },
      { label: '冻结解冻查询', path: '/sp/freeze-query' },
    ],
  },
];

/* ─── 管理单位端 ─── */
export const adminGroups: MenuGroup[] = [
  {
    title: '服务商注册审核',
    items: [
      { label: '服务商注册审核', path: '/admin/reg-review' },
      { label: '服务商注册查看', path: '/admin/reg-view' },
      { label: '注册服务商变更审核', path: '/admin/reg-change-review' },
      { label: '注册服务商变更查看', path: '/admin/reg-change-view' },
    ],
  },
  {
    title: '准入办理',
    items: [
      { label: '信息录入', path: '/admin/info-entry' },
      { label: '信息编辑', path: '/admin/info-edit' },
      { label: '信息复核', path: '/admin/info-review' },
      { label: '信息查询', path: '/admin/info-query' },
    ],
  },
  {
    title: '信息变更',
    items: [
      { label: '维护编辑', path: '/admin/maint-edit' },
      { label: '维护复核', path: '/admin/maint-review' },
      { label: '维护查询', path: '/admin/maint-query' },
    ],
  },
  {
    title: '处置管理',
    items: [
      { label: '冻结申请', path: '/admin/freeze-apply' },
      { label: '解冻申请', path: '/admin/unfreeze-apply' },
      { label: '冻结解冻查询', path: '/admin/freeze-query' },
      { label: '复核', path: '/admin/review' },
    ],
  },
  {
    title: 'MDG信息查询',
    items: [{ label: 'MDG信息查询', path: '/admin/mdg-query' }],
  },
  {
    title: '管理目录',
    items: [{ label: '服务管理目录', path: '/admin/service-dir' }],
  },
  {
    title: '服务商信息查询',
    items: [
      { label: '注册服务商查询', path: '/admin/reg-query' },
      { label: '正式服务商查询', path: '/admin/formal-query' },
      { label: '准入服务分类查询', path: '/admin/category-query' },
      { label: '流程查询', path: '/admin/process-query' },
    ],
  },
  {
    title: '基础设置',
    items: [
      { label: '专业服务目录配置', path: '/admin/dir-config' },
      { label: '要件配置', path: '/admin/doc-config' },
      { label: '冻结资质文件设定', path: '/admin/freeze-doc' },
    ],
  },
];

/* ─── 关键人员管理 ─── */
export const personnelGroups: MenuGroup[] = [
  {
    title: '关键人员管理',
    items: [
      { label: '关键人员新增', path: '/personnel/add' },
      { label: '关键人员审批', path: '/personnel/approve' },
      { label: '关键人员查看', path: '/personnel/view' },
    ],
  },
];

/* ─── 现场考察 ─── */
export const inspectionGroups: MenuGroup[] = [
  {
    title: '服务商现场考察',
    items: [
      { label: '现场考察管理', path: '/inspection/manage' },
      { label: '现场考察管理', path: '/inspection/manage-admin' },
      { label: '现场考察审核', path: '/inspection/review' },
    ],
  },
];
