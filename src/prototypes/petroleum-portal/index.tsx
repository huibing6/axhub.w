/**
 * @name 云梦泽服务商管理门户
 * 中国石油旗下能源与化工产业智慧电商服务平台 - 服务商管理模块
 *
 * 首页为空白页，侧边菜单项可点击跳转到对应子页面
 * 使用 YMZEC 主题系统重构 (colorPrimary: #ff4d4f)
 */
import { useState, useMemo, useEffect, lazy, Suspense } from 'react';
import { ConfigProvider, Layout, theme, Button, Typography } from 'antd';
import SideMenu from '../../components/side-menu';
import { spGroups, adminGroups, personnelGroups, inspectionGroups } from './common/menu-data';

const SpWorkspace = lazy(() => import('./sp-portal/workspace'));
const SpRegister = lazy(() => import('./sp-portal/register'));
const SpRegisterChange = lazy(() => import('./sp-portal/register-change'));
const SpAdmission = lazy(() => import('./sp-portal/admission'));
const SpInfoMaintain = lazy(() => import('./sp-portal/info-maintain'));
const SpQualMaintain = lazy(() => import('./sp-portal/qual-maintain'));
const SpServiceMaintain = lazy(() => import('./sp-portal/service-maintain'));
const SpInfoQuery = lazy(() => import('./sp-portal/info-query'));
const SpProgressQuery = lazy(() => import('./sp-portal/progress-query'));
const SpFreezeQuery = lazy(() => import('./sp-portal/freeze-query'));

const AdminRegReview = lazy(() => import('./admin-portal/reg-audit/review'));
const AdminRegView = lazy(() => import('./admin-portal/reg-audit/view'));
const AdminRegChangeReview = lazy(() => import('./admin-portal/reg-audit/change-review'));
const AdminRegChangeView = lazy(() => import('./admin-portal/reg-audit/change-view'));
const AdminInfoEntry = lazy(() => import('./admin-portal/admission/entry'));
const AdminInfoEdit = lazy(() => import('./admin-portal/admission/edit'));
const AdminInfoReview = lazy(() => import('./admin-portal/admission/review'));
const AdminInfoQuery = lazy(() => import('./admin-portal/admission/query'));
const AdminMaintEdit = lazy(() => import('./admin-portal/info-change/maint-edit'));
const AdminMaintReview = lazy(() => import('./admin-portal/info-change/maint-review'));
const AdminMaintQuery = lazy(() => import('./admin-portal/info-change/maint-query'));
const AdminFreezeApply = lazy(() => import('./admin-portal/disposal/freeze-apply'));
const AdminUnfreezeApply = lazy(() => import('./admin-portal/disposal/unfreeze-apply'));
const AdminFreezeQuery = lazy(() => import('./admin-portal/disposal/freeze-query'));
const AdminReview = lazy(() => import('./admin-portal/disposal/review'));
const AdminMdgQuery = lazy(() => import('./admin-portal/query/mdg-query'));
const AdminServiceDir = lazy(() => import('./admin-portal/query/service-dir'));
const AdminRegQuery = lazy(() => import('./admin-portal/query/reg-query'));
const AdminFormalQuery = lazy(() => import('./admin-portal/query/formal-query'));
const AdminCategoryQuery = lazy(() => import('./admin-portal/query/category-query'));
const AdminProcessQuery = lazy(() => import('./admin-portal/query/process-query'));
const AdminDirConfig = lazy(() => import('./admin-portal/config/dir-config'));
const AdminDocConfig = lazy(() => import('./admin-portal/config/doc-config'));
const AdminFreezeDoc = lazy(() => import('./admin-portal/config/freeze-doc'));

const PersonnelAdd = lazy(() => import('./key-personnel/add'));
const PersonnelApprove = lazy(() => import('./key-personnel/approve'));
const PersonnelView = lazy(() => import('./key-personnel/view'));

const InspectionManage = lazy(() => import('./site-inspection/manage'));
const InspectionManageAdmin = lazy(() => import('./site-inspection/manage-admin'));
const InspectionReview = lazy(() => import('./site-inspection/review'));

const pageMap: Record<string, React.LazyExoticComponent<any>> = {
  '/sp/workspace': SpWorkspace,
  '/sp/register': SpRegister,
  '/sp/register-change': SpRegisterChange,
  '/sp/admission': SpAdmission,
  '/sp/info-maintain': SpInfoMaintain,
  '/sp/qual-maintain': SpQualMaintain,
  '/sp/service-maintain': SpServiceMaintain,
  '/sp/info-query': SpInfoQuery,
  '/sp/progress-query': SpProgressQuery,
  '/sp/freeze-query': SpFreezeQuery,
  '/admin/reg-review': AdminRegReview,
  '/admin/reg-view': AdminRegView,
  '/admin/reg-change-review': AdminRegChangeReview,
  '/admin/reg-change-view': AdminRegChangeView,
  '/admin/info-entry': AdminInfoEntry,
  '/admin/info-edit': AdminInfoEdit,
  '/admin/info-review': AdminInfoReview,
  '/admin/info-query': AdminInfoQuery,
  '/admin/maint-edit': AdminMaintEdit,
  '/admin/maint-review': AdminMaintReview,
  '/admin/maint-query': AdminMaintQuery,
  '/admin/freeze-apply': AdminFreezeApply,
  '/admin/unfreeze-apply': AdminUnfreezeApply,
  '/admin/freeze-query': AdminFreezeQuery,
  '/admin/review': AdminReview,
  '/admin/mdg-query': AdminMdgQuery,
  '/admin/service-dir': AdminServiceDir,
  '/admin/reg-query': AdminRegQuery,
  '/admin/formal-query': AdminFormalQuery,
  '/admin/category-query': AdminCategoryQuery,
  '/admin/process-query': AdminProcessQuery,
  '/admin/dir-config': AdminDirConfig,
  '/admin/doc-config': AdminDocConfig,
  '/admin/freeze-doc': AdminFreezeDoc,
  '/personnel/add': PersonnelAdd,
  '/personnel/approve': PersonnelApprove,
  '/personnel/view': PersonnelView,
  '/inspection/manage': InspectionManage,
  '/inspection/manage-admin': InspectionManageAdmin,
  '/inspection/review': InspectionReview,
};

type Portal = 'sp' | 'admin' | 'personnel' | 'inspection';

interface MenuItem { label: string; path?: string; children?: MenuItem[]; }
interface MenuGroup { title: string; items: MenuItem[]; }

const portals: { key: Portal; label: string; groups: MenuGroup[] }[] = [
  { key: 'sp', label: '服务商工作台', groups: spGroups },
  { key: 'admin', label: '服务商管理端', groups: adminGroups },
  { key: 'personnel', label: '关键人员管理', groups: personnelGroups },
  { key: 'inspection', label: '现场考察', groups: inspectionGroups },
];

function getCurrentSubPath(): string {
  if (typeof window === 'undefined') return '';
  const parts = window.location.pathname.split('/').filter(Boolean);
  if (parts[0] !== 'prototypes' || parts.length < 2) return '';
  return parts.slice(2).join('/');
}

function resolvePortalFromPath(): Portal {
  const path = getCurrentSubPath();
  if (path === 'admin') return 'admin';
  if (path === 'personnel') return 'personnel';
  if (path === 'inspection') return 'inspection';
  return 'sp';
}

function syncLocationForPortal(portal: Portal) {
  if (typeof window === 'undefined') return;
  const parts = window.location.pathname.split('/').filter(Boolean).slice(0, 2);
  if (parts.length < 2) return;
  const subPath = portal === 'sp' ? '' : portal;
  const next = `/${parts.join('/')}${subPath ? `/${subPath}` : ''}`;
  const url = `${next}${window.location.search}${window.location.hash}`;
  if (`${window.location.pathname}${window.location.search}${window.location.hash}` !== url) {
    window.history.replaceState(window.history.state, '', url);
  }
}

function toSideMenuItems(groups: MenuGroup[]): any[] {
  return groups.map((group, gi) => ({
    key: `group-${gi}`,
    label: group.title,
    icon: 'shop',
    children: group.items.map((item, ii) => {
      if (item.children && item.children.length > 0) {
        return {
          key: item.path || `item-${gi}-${ii}`,
          label: item.label,
          children: item.children.map((child, ci) => ({
            key: child.path || `child-${gi}-${ii}-${ci}`,
            label: child.label,
          })),
        };
      }
      return {
        key: item.path || `item-${gi}-${ii}`,
        label: item.label,
      };
    }),
  }));
}

const { Header, Content } = Layout;
const { Text } = Typography;

function HomePage() {
  const { token: t } = theme.useToken();
  const [portal, setPortal] = useState<Portal>(() => resolvePortalFromPath());
  const [selectedKey, setSelectedKey] = useState(() => {
    const hash = typeof window !== 'undefined' ? window.location.hash.slice(1) : '';
    return hash && pageMap[hash] ? hash : '';
  });

  useEffect(() => {
    syncLocationForPortal(portal);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handlePop = () => setPortal(resolvePortalFromPath());
    window.addEventListener('popstate', handlePop);
    return () => window.removeEventListener('popstate', handlePop);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const onHashChange = () => {
      const hash = window.location.hash.slice(1);
      setSelectedKey(hash && pageMap[hash] ? hash : '');
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const handlePortalChange = (next: Portal) => {
    syncLocationForPortal(next);
    setPortal(next);
    window.location.hash = '';
    setSelectedKey('');
  };

  const current = portals.find(p => p.key === portal)!;
  const menuItems = useMemo(() => toSideMenuItems(current.groups), [current]);

  const PageComponent = selectedKey ? pageMap[selectedKey] : null;

  if (PageComponent) {
    return (
      <Suspense fallback={
        <Layout className="min-h-screen" style={{ background: t.colorBgLayout }}>
          <Content className="flex items-center justify-center">
            <Text type="secondary">加载中...</Text>
          </Content>
        </Layout>
      }>
        <PageComponent />
      </Suspense>
    );
  }

  return (
    <Layout className="min-h-screen" style={{ background: t.colorBgLayout }}>
      <Header style={{
        background: t.colorBgContainer,
        height: 56,
        lineHeight: '56px',
        borderBottom: `1px solid ${t.colorBorderSecondary}`,
        display: 'flex',
        alignItems: 'center',
        padding: '0 24px',
      }}>
        <div className="flex items-center gap-3" style={{ lineHeight: 'normal' }}>
          <div style={{
            width: 32, height: 32, borderRadius: '50%',
            background: t.colorPrimary,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{ color: '#fff', fontSize: 12, fontWeight: 700 }}>雪</span>
          </div>
          <span style={{ fontSize: 14, fontWeight: 700, color: t.colorText }}>云梦泽</span>
        </div>
        <nav className="flex items-center gap-2 ml-8" style={{ lineHeight: 'normal' }}>
          {portals.map(p => (
            <Button
              key={p.key}
              type={portal === p.key ? 'primary' : 'text'}
              size="small"
              onClick={() => handlePortalChange(p.key)}
            >
              {p.label}
            </Button>
          ))}
        </nav>
      </Header>

      <Layout>
        <SideMenu
          title=""
          width={240}
          collapsible={false}
          items={menuItems}
          defaultSelectedKey=""
          onMenuSelect={(key: string) => {
            setSelectedKey(key);
            window.location.hash = '#' + key;
          }}
        />

        <Content style={{
          padding: 24,
          minHeight: 'calc(100vh - 56px)',
          background: t.colorBgLayout,
        }}>
          <div style={{
            background: t.colorBgContainer,
            borderRadius: t.borderRadius,
            border: `1px solid ${t.colorBorderSecondary}`,
            padding: 48,
            textAlign: 'center',
          }}>
            <div style={{ fontSize: 48, marginBottom: 24, color: t.colorTextQuaternary }}>☰</div>
            <div style={{ fontSize: 24, fontWeight: 600, color: t.colorText, marginBottom: 8 }}>
              云梦泽服务商管理门户
            </div>
            <Text type="secondary" style={{ fontSize: 16 }}>请从左侧菜单选择一个页面开始浏览</Text>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#ff4d4f',
          colorSuccess: '#52c41a',
          colorWarning: '#faad14',
          colorError: '#ff4d4f',
          colorInfo: '#ff4d4f',
          colorBgLayout: '#f5f5f5',
          colorBgContainer: '#ffffff',
          colorBorderSecondary: '#f0f0f0',
          colorText: 'rgba(0,0,0,0.85)',
          colorTextSecondary: 'rgba(0,0,0,0.65)',
          colorTextTertiary: 'rgba(0,0,0,0.45)',
          colorTextQuaternary: 'rgba(0,0,0,0.25)',
          borderRadius: 4,
          fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', 'PingFang SC', 'Microsoft YaHei', sans-serif",
        },
        components: {
          Button: {
            borderRadius: 4,
          },
          Card: {
            borderRadius: 4,
          },
          Input: {
            borderRadius: 4,
          },
          Select: {
            borderRadius: 4,
          },
          Table: {
            borderRadius: 4,
            headerBg: '#fafafa',
          },
          Menu: {
            borderRadius: 4,
          },
          Layout: {
            headerBg: '#ffffff',
            headerHeight: 56,
          },
          Tag: {
            borderRadius: 4,
          },
          Steps: {
            colorPrimary: '#ff4d4f',
          },
        },
      }}
    >
      <HomePage />
    </ConfigProvider>
  );
}
