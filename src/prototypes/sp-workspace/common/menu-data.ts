/**
 * @name MenuData
 * 云梦泽服务商工作台 - 侧边栏菜单配置
 */

export interface MenuItem { label: string; path?: string; children?: MenuItem[]; }
export interface MenuGroup { title: string; items: MenuItem[]; }

/* ─── 服务商端（含关键人员管理 + 现场考察） ─── */
export const spGroups: MenuGroup[] = [
  {
    title: '服务商注册管理',
    items: [
      { label: '服务商工作台', path: '/sp/workspace' },
      { label: '注册服务商', path: '/sp/register' },
      { label: '注册服务商信息维护', path: '/sp/register-change' },
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
  {
    title: '关键人员管理',
    items: [
      { label: '关键人员新增', path: '/personnel/add' },
      { label: '关键人员审批', path: '/personnel/approve' },
      { label: '关键人员查看', path: '/personnel/view' },
    ],
  },
  {
    title: '服务商现场考察',
    items: [
      { label: '现场考察管理', path: '/inspection/manage' },
    ],
  },
];

/* ─── 关键人员管理（独立使用时） ─── */
export const personnelGroups: MenuGroup[] = spGroups.filter(g => g.title === '关键人员管理');

/* ─── 现场考察（独立使用时） ─── */
export const inspectionGroups: MenuGroup[] = spGroups.filter(g => g.title === '服务商现场考察');
