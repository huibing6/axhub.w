/**
 * @name MenuData
 * 云梦泽服务商工作台2.0 - 侧边栏菜单配置
 */

export interface MenuItem { label: string; path?: string; children?: MenuItem[]; }
export interface MenuGroup { title: string; items: MenuItem[]; }

/* ─── 服务商端 ─── */
export const spGroups: MenuGroup[] = [
  {
    title: '服务商注册管理',
    items: [
      { label: '服务商工作台', path: '/sp/workspace' },
      { label: '注册服务商', path: '/sp/register' },
      { label: '注册服务商信息维护', path: '/sp/register-change' },
      { label: '注册进度看板', path: '/sp/register-progress' },
    ],
  },
  {
    title: '服务商管理自助服务',
    items: [
      { label: '服务商准入资料', path: '/sp/admission' },
      { label: '服务品类维护', path: '/sp/service-maintain' },
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

/* ─── 管理端 ─── */
export const adminGroups: MenuGroup[] = [
  {
    title: '注册管理',
    items: [
      { label: '注册审核', path: '/admin/reg-review' },
      { label: '专业部门审核', path: '/admin/dept-review' },
      { label: '注册信息查询', path: '/admin/reg-query' },
    ],
  },
  {
    title: '准入管理',
    items: [
      { label: '待配码库', path: '/admin/pending-list' },
      { label: '信息录入', path: '/admin/info-entry' },
      { label: '信息编辑', path: '/admin/info-edit' },
      { label: '信息复核', path: '/admin/admission-review' },
      { label: '信息查询', path: '/admin/admission-query' },
    ],
  },
  {
    title: '信息变更',
    items: [
      { label: '待更新MDG', path: '/admin/pending-mdg-list' },
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
    items: [
      { label: 'MDG信息查询', path: '/admin/mdg-query' },
    ],
  },
  {
    title: '服务商信息查询',
    items: [
      { label: '合格服务商查询', path: '/admin/sp-query-qualified' },
      { label: '正式服务商查询', path: '/admin/sp-query-formal' },
      { label: '流程查询', path: '/admin/sp-query-process' },
    ],
  },
  {
    title: '参数配置',
    items: [
      { label: '专业服务目录配置', path: '/admin/config-dir' },
      { label: '要件配置', path: '/admin/config-doc' },
      { label: '冻结资质文件设定', path: '/admin/config-freeze' },
      { label: '准入通知配置', path: '/admin/config-notice' },
      { label: '系统通知配置', path: '/admin/system-notice' },
    ],
  },
];