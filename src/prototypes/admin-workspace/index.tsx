/**
 * @name 服务商管理工作台
 * 中国石油旗下能源与化工产业智慧电商服务平台 - 服务商管理模块
 *
 * 首页为空白页，侧边菜单项可点击跳转到对应子页面
 * 使用 YMZEC 主题系统 (colorPrimary: #ff4d4f)
 */
import { useState, useMemo, useEffect, lazy, Suspense } from 'react';
import { ConfigProvider, Layout, theme, Typography } from 'antd';
import SideMenu from '../../components/side-menu';
import { adminGroups } from './common/menu-data';

const AdminRegReview = lazy(() => import('./admin-portal/reg-audit/review'));
const AdminRegView = lazy(() => import('./admin-portal/reg-audit/view'));
const AdminRegChangeReview = lazy(() => import('./admin-portal/reg-audit/change-review'));
const AdminRegChangeView = lazy(() => import('./admin-portal/reg-audit/change-view'));
const AdminInfoEntry = lazy(() => import('./admin-portal/admission/entry'));
const AdminInfoEdit = lazy(() => import('./admin-portal/admission/edit'));
const AdminInfoEditDetail = lazy(() => import('./admin-portal/admission/edit-detail'));
const AdminInfoEditForm = lazy(() => import('./admin-portal/admission/edit-edit'));
const AdminReviewDetail = lazy(() => import('./admin-portal/admission/review-detail'));
const AdminInfoReview = lazy(() => import('./admin-portal/admission/review'));
const AdminInfoQuery = lazy(() => import('./admin-portal/admission/query'));
const AdminMaintEdit = lazy(() => import('./admin-portal/info-change/maint-edit'));
const AdminSelectSP = lazy(() => import('./admin-portal/info-change/select-sp'));
const AdminMaintEditForm = lazy(() => import('./admin-portal/info-change/maint-edit-form'));
const AdminMaintCategoryForm = lazy(() => import('./admin-portal/info-change/maint-category-form'));
const AdminMaintReview = lazy(() => import('./admin-portal/info-change/maint-review'));
const AdminMaintReviewDetail = lazy(() => import('./admin-portal/info-change/maint-review-detail'));
const AdminMaintCatalogReviewDetail = lazy(() => import('./admin-portal/info-change/maint-catalog-review-detail'));
const AdminMaintQuery = lazy(() => import('./admin-portal/info-change/maint-query'));
const AdminServiceDirMaint = lazy(() => import('./admin-portal/info-change/service-dir-maint'));
const AdminAddCategoryForm = lazy(() => import('./admin-portal/info-change/add-category-form'));
const AdminInspectionManage = lazy(() => import('./admin-portal/inspection/inspection-manage'));
const AdminInspectionAudit = lazy(() => import('./admin-portal/inspection/inspection-audit'));
const AdminInspectionInput = lazy(() => import('./admin-portal/inspection/inspection-input'));
const AdminProcessTrack = lazy(() => import('./admin-portal/process-track/process-track'));
const AdminProcessTrackDetail = lazy(() => import('./admin-portal/process-track/process-track-detail'));
const AdminFreezeApply = lazy(() => import('./admin-portal/disposal/freeze-apply'));
const AdminFreezeApplyCreate = lazy(() => import('./admin-portal/disposal/freeze-apply-create'));
const AdminUnfreezeApply = lazy(() => import('./admin-portal/disposal/unfreeze-apply'));
const AdminFreezeQuery = lazy(() => import('./admin-portal/disposal/freeze-query'));
const AdminReview = lazy(() => import('./admin-portal/disposal/review'));
const AdminMdgQuery = lazy(() => import('./admin-portal/query/mdg-query'));
const AdminMdgEdit = lazy(() => import('./admin-portal/query/mdg-edit'));
const AdminServiceDir = lazy(() => import('./admin-portal/query/service-dir'));
const AdminRegQuery = lazy(() => import('./admin-portal/query/reg-query'));
const AdminFormalQuery = lazy(() => import('./admin-portal/query/formal-query'));
const AdminCategoryQuery = lazy(() => import('./admin-portal/query/category-query'));
const AdminProcessQuery = lazy(() => import('./admin-portal/query/process-query'));
const AdminDirConfig = lazy(() => import('./admin-portal/config/dir-config'));
const AdminDocConfig = lazy(() => import('./admin-portal/config/doc-config'));
const AdminFreezeDoc = lazy(() => import('./admin-portal/config/freeze-doc'));
const AdminRegDetail = lazy(() => import('./admin-portal/reg-audit/reg-detail'));
const AdminAdmissionDetail = lazy(() => import('./admin-portal/admission/admission-detail'));
const AdminChangeDetail = lazy(() => import('./admin-portal/info-change/change-detail'));
const AdminDisposalDetail = lazy(() => import('./admin-portal/disposal/disposal-detail'));
const AdminWorkspace = lazy(() => import('./admin-portal/workspace'));
const AdminBidDirAudit = lazy(() => import('./admin-portal/query/bid-dir-audit'));
const AdminBidDirView = lazy(() => import('./admin-portal/query/bid-dir-view'));

const pageMap: Record<string, React.LazyExoticComponent<any>> = {
  '/admin/reg-review': AdminRegReview,
  '/admin/reg-view': AdminRegView,
  '/admin/reg-change-review': AdminRegChangeReview,
  '/admin/reg-change-view': AdminRegChangeView,
  '/admin/info-entry': AdminInfoEntry,
  '/admin/info-edit': AdminInfoEdit,
  '/admin/info-edit-detail': AdminInfoEditDetail,
  '/admin/info-edit-form': AdminInfoEditForm,
  '/admin/review-detail': AdminReviewDetail,
  '/admin/info-review': AdminInfoReview,
  '/admin/info-query': AdminInfoQuery,
  '/admin/maint-edit': AdminMaintEdit,
  '/admin/select-sp': AdminSelectSP,
  '/admin/maint-edit-form': AdminMaintEditForm,
  '/admin/maint-category-form': AdminMaintCategoryForm,
  '/admin/maint-review': AdminMaintReview,
  '/admin/maint-review-detail': AdminMaintReviewDetail,
  '/admin/maint-catalog-review-detail': AdminMaintCatalogReviewDetail,
  '/admin/maint-query': AdminMaintQuery,
  '/admin/service-dir-maint': AdminServiceDirMaint,
  '/admin/add-category-form': AdminAddCategoryForm,
  '/admin/inspection-manage': AdminInspectionManage,
  '/admin/inspection-audit': AdminInspectionAudit,
  '/admin/inspection-input': AdminInspectionInput,
  '/admin/process-track': AdminProcessTrack,
  '/admin/process-track-detail': AdminProcessTrackDetail,
  '/admin/freeze-apply': AdminFreezeApply,
  '/admin/freeze-apply-create': AdminFreezeApplyCreate,
  '/admin/unfreeze-apply': AdminUnfreezeApply,
  '/admin/freeze-query': AdminFreezeQuery,
  '/admin/review': AdminReview,
  '/admin/mdg-query': AdminMdgQuery,
  '/admin/mdg-edit': AdminMdgEdit,
  '/admin/service-dir': AdminServiceDir,
  '/admin/reg-query': AdminRegQuery,
  '/admin/formal-query': AdminFormalQuery,
  '/admin/category-query': AdminCategoryQuery,
  '/admin/process-query': AdminProcessQuery,
  '/admin/dir-config': AdminDirConfig,
  '/admin/doc-config': AdminDocConfig,
  '/admin/freeze-doc': AdminFreezeDoc,
  '/admin/reg-detail': AdminRegDetail,
  '/admin/admission-detail': AdminAdmissionDetail,
  '/admin/change-detail': AdminChangeDetail,
  '/admin/disposal-detail': AdminDisposalDetail,
  '/admin/workspace': AdminWorkspace,
  '/admin/bid-dir-audit': AdminBidDirAudit,
  '/admin/bid-dir-view': AdminBidDirView,
};

interface MenuItem { label: string; path?: string; children?: MenuItem[]; }
interface MenuGroup { title: string; items: MenuItem[]; }

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
  const [selectedKey, setSelectedKey] = useState(() => {
    const raw = typeof window !== 'undefined' ? window.location.hash.slice(1) : '';
    const hash = raw.split('?')[0];
    if (hash && pageMap[hash]) return hash;
    return '/admin/workspace';
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const onHashChange = () => {
      const raw = window.location.hash.slice(1);
      const hash = raw.split('?')[0];
      setSelectedKey(hash && pageMap[hash] ? hash : '/admin/workspace');
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const menuItems = useMemo(() => toSideMenuItems(adminGroups), []);

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
          <img
            src="/prototypes/assets/logo.jpg"
            alt="云梦泽"
            style={{ height: 32, width: 'auto' }}
          />
        </div>
        <span className="ml-4" style={{ fontSize: 14, fontWeight: 600, color: t.colorText }}>服务商管理工作台</span>
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
            <div style={{ fontSize: 48, marginBottom: 24, color: t.colorTextQuaternary }}>⚙</div>
            <div style={{ fontSize: 24, fontWeight: 600, color: t.colorText, marginBottom: 8 }}>
              服务商管理工作台
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
          Button: { borderRadius: 4 },
          Card: { borderRadius: 4 },
          Input: { borderRadius: 4 },
          Select: { borderRadius: 4 },
          Table: { borderRadius: 4, headerBg: '#fafafa' },
          Menu: { borderRadius: 4 },
          Layout: { headerBg: '#ffffff', headerHeight: 56 },
          Tag: { borderRadius: 4 },
          Steps: { colorPrimary: '#ff4d4f' },
        },
      }}
    >
      <HomePage />
    </ConfigProvider>
  );
}
