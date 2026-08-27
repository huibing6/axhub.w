/**
 * @name 云梦泽服务商工作台2.0
 * 中国石油旗下能源与化工产业智慧电商服务平台 - 服务商自助服务与管理模块2.0
 *
 * 服务商端：工作台 + 注册管理 + 准入自助 + 信息查询
 * 管理端：工作台 + 注册审核 + 准入管理 + 信息变更 + 处置管理 + MDG + 查询 + 配置
 * 使用 YMZEC 主题系统 (colorPrimary: #ff4d4f)
 */
import './style.css';
import React from 'react';
import { useState, useMemo, useEffect, lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { ConfigProvider, Layout, theme, Typography, Segmented } from 'antd';
import PortalLayout from './common/portal-layout';
import { spGroups, adminGroups } from './common/menu-data';
import flowchartPng from './assets/服务商管理流程图V2.0.png';

/* ─── 服务商端页面（懒加载） ─── */
const SpWorkspace = lazy(() => import('./sp-portal/workspace'));
const SpRegister = lazy(() => import('./sp-portal/register'));
const SpRegisterChange = lazy(() => import('./sp-portal/register-change'));
const Admission = lazy(() => import('./sp-portal/admission'));
const ProgressQuery = lazy(() => import('./sp-portal/progress-query'));
const FreezeQuery = lazy(() => import('./sp-portal/freeze-query'));
const InfoQuery = lazy(() => import('./sp-portal/info-query'));
const SpServiceMaintain = lazy(() => import('./sp-portal/service-maintain'));
const SpServiceMaintainAdd = lazy(() => import('./sp-portal/service-maintain-add'));
const SpServiceMaintainEdit = lazy(() => import('./sp-portal/service-maintain-edit'));

/* ─── 管理端页面（懒加载） ─── */
const AdminWorkspace = lazy(() => import('./admin-portal/workspace'));
const RegReview = lazy(() => import('./admin-portal/reg-review'));
const RegDetail = lazy(() => import('./admin-portal/reg-detail'));
const DeptReview = lazy(() => import('./admin-portal/dept-review'));
const DeptDetail = lazy(() => import('./admin-portal/dept-detail'));
const RegQuery = lazy(() => import('./admin-portal/reg-query'));
const PendingList = lazy(() => import('./admin-portal/pending-list'));
const PendingDetail = lazy(() => import('./admin-portal/pending-detail'));
const PendingNotify = lazy(() => import('./admin-portal/pending-notify'));
const PendingMdg = lazy(() => import('./admin-portal/pending-mdg'));
const PendingMdgNotify = lazy(() => import('./admin-portal/pending-mdg-notify'));
const InfoEntry = lazy(() => import('./admin-portal/info-entry'));
const InfoEdit = lazy(() => import('./admin-portal/info-edit'));
const InfoEditDetail = lazy(() => import('./admin-portal/info-edit-detail'));
const AdmissionReview = lazy(() => import('./admin-portal/admission-review'));
const AdmissionReviewDetail = lazy(() => import('./admin-portal/admission-review-detail'));
const AdmissionQuery = lazy(() => import('./admin-portal/admission-query'));
const MaintEdit = lazy(() => import('./admin-portal/maint-edit'));
const MaintReview = lazy(() => import('./admin-portal/maint-review'));
const MaintEditCreate = lazy(() => import('./admin-portal/maint-edit-create'));
const MaintReviewDetail = lazy(() => import('./admin-portal/maint-review-detail'));
const MaintQuery = lazy(() => import('./admin-portal/maint-query'));
const ChangeDetail = lazy(() => import('./admin-portal/change-detail'));
const PendingMdgList = lazy(() => import('./admin-portal/pending-mdg-list'));
const FreezeApply = lazy(() => import('./admin-portal/freeze-apply'));
const FreezeApplyCreate = lazy(() => import('./admin-portal/freeze-apply-create'));
const CategoryFreezeCreate = lazy(() => import('./admin-portal/category-freeze-create'));
const UnfreezeApply = lazy(() => import('./admin-portal/unfreeze-apply'));
const UnfreezeApplyCreate = lazy(() => import('./admin-portal/unfreeze-apply-create'));
const CategoryUnfreezeCreate = lazy(() => import('./admin-portal/category-unfreeze-create'));
const FreezeQueryAdmin = lazy(() => import('./admin-portal/freeze-query'));
const ReviewAdmin = lazy(() => import('./admin-portal/review'));
const MdgQuery = lazy(() => import('./admin-portal/mdg-query'));
const SpQueryQualified = lazy(() => import('./admin-portal/sp-query-qualified'));
const SpQueryQualifiedDetail = lazy(() => import('./admin-portal/sp-query-qualified-detail'));
const SpQueryFormal = lazy(() => import('./admin-portal/sp-query-formal'));
const SpQueryFormalDetail = lazy(() => import('./admin-portal/sp-query-formal-detail'));
const SpQueryProcess = lazy(() => import('./admin-portal/sp-query-process'));
const SpQueryProcessDetail = lazy(() => import('./admin-portal/sp-query-process-detail'));
const ConfigDir = lazy(() => import('./admin-portal/config-dir'));
const ConfigDirEdit = lazy(() => import('./admin-portal/config-dir-edit'));
const ConfigFreeze = lazy(() => import('./admin-portal/config-freeze'));
const ConfigNotice = lazy(() => import('./admin-portal/config-notice'));
const ConfigNoticeEdit = lazy(() => import('./admin-portal/config-notice-edit'));
const SupplementFill = lazy(() => import('./sp-portal/supplement-fill'));
const SystemNotice = lazy(() => import('./admin-portal/system-notice'));
const SystemNoticeEdit = lazy(() => import('./admin-portal/system-notice-edit'));
const ConfigThirdparty = lazy(() => import('./admin-portal/config-thirdparty'));
const ConfigThirdpartyEdit = lazy(() => import('./admin-portal/config-thirdparty-edit'));
const ConfigTag = lazy(() => import('./admin-portal/config-tag'));
const ConfigTagEdit = lazy(() => import('./admin-portal/config-tag-edit'));

/* ─── 路由映射 ─── */
const spPageMap: Record<string, React.LazyExoticComponent<any>> = {
  '/sp/workspace': SpWorkspace,
  '/sp/register': SpRegister,
  '/sp/register-change': SpRegisterChange,
  '/sp/admission': Admission,
  '/sp/progress-query': ProgressQuery,
  '/sp/freeze-query': FreezeQuery,
  '/sp/info-query': InfoQuery,
  '/sp/service-maintain': SpServiceMaintain,
  '/sp/service-maintain/add': SpServiceMaintainAdd,
  '/sp/service-maintain/edit': SpServiceMaintainEdit,
  '/sp/supplement-fill': SupplementFill,
};

const adminPageMap: Record<string, React.LazyExoticComponent<any>> = {
  '/admin': AdminWorkspace,
  '/admin/reg-review': RegReview,
  '/admin/reg-detail': RegDetail,
  '/admin/dept-review': DeptReview,
  '/admin/dept-detail': DeptDetail,
  '/admin/reg-query': RegQuery,
  '/admin/pending-list': PendingList,
  '/admin/pending-detail': PendingDetail,
  '/admin/pending-notify': PendingNotify,
  '/admin/pending-mdg': PendingMdg,
  '/admin/pending-mdg-notify': PendingMdgNotify,
  '/admin/info-entry': InfoEntry,
  '/admin/info-edit': InfoEdit,
  '/admin/info-edit-detail': InfoEditDetail,
  '/admin/admission-review': AdmissionReview,
  '/admin/admission-review-detail': AdmissionReviewDetail,
  '/admin/admission-query': AdmissionQuery,
  '/admin/maint-edit': MaintEdit,
  '/admin/maint-edit-create': MaintEditCreate,
  '/admin/maint-review': MaintReview,
  '/admin/maint-review-detail': MaintReviewDetail,
  '/admin/maint-query': MaintQuery,
  '/admin/change-detail': ChangeDetail,
  '/admin/pending-mdg-list': PendingMdgList,
  '/admin/freeze-apply': FreezeApply,
  '/admin/freeze-apply-create': FreezeApplyCreate,
  '/admin/category-freeze-create': CategoryFreezeCreate,
  '/admin/unfreeze-apply': UnfreezeApply,
  '/admin/unfreeze-apply-create': UnfreezeApplyCreate,
  '/admin/category-unfreeze-create': CategoryUnfreezeCreate,
  '/admin/freeze-query': FreezeQueryAdmin,
  '/admin/review': ReviewAdmin,
  '/admin/mdg-query': MdgQuery,
  '/admin/sp-query-qualified': SpQueryQualified,
  '/admin/sp-query-qualified-detail': SpQueryQualifiedDetail,
  '/admin/sp-query-formal': SpQueryFormal,
  '/admin/sp-query-formal-detail': SpQueryFormalDetail,
  '/admin/sp-query-process': SpQueryProcess,
  '/admin/sp-query-process-detail': SpQueryProcessDetail,
  '/admin/config-dir': ConfigDir,
  '/admin/config-dir-edit': ConfigDirEdit,
  '/admin/config-freeze': ConfigFreeze,
  '/admin/config-notice': ConfigNotice,
  '/admin/config-notice-edit': ConfigNoticeEdit,
  '/admin/system-notice': SystemNotice,
  '/admin/system-notice-edit': SystemNoticeEdit,
  '/admin/config-thirdparty': ConfigThirdparty,
  '/admin/config-thirdparty-edit': ConfigThirdpartyEdit,
  '/admin/config-tag': ConfigTag,
  '/admin/config-tag-edit': ConfigTagEdit,
};

const { Text } = Typography;

function App() {
  const [portal, setPortal] = useState<'sp' | 'admin' | 'flowchart'>(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.slice(1);
      if (hash === '/flowchart') return 'flowchart';
      if (hash.startsWith('/admin')) return 'admin';
    }
    return 'sp';
  });
  const [selectedKey, setSelectedKey] = useState(() => {
    if (typeof window !== 'undefined') return window.location.hash.slice(1) || '';
    return '';
  });

  useEffect(() => {
    const onHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (hash === '/flowchart') {
        setPortal('flowchart');
      } else if (hash.startsWith('/admin')) {
        setPortal('admin');
      } else {
        setPortal('sp');
      }
      setSelectedKey(hash);
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const handlePortalChange = (val: string) => {
    const next = val as 'sp' | 'admin' | 'flowchart';
    setPortal(next);
    if (next === 'flowchart') {
      setSelectedKey('/flowchart');
      window.location.hash = '#/flowchart';
    } else {
      const defaultKey = next === 'sp' ? '/sp/workspace' : '/admin';
      setSelectedKey(defaultKey);
      window.location.hash = '#' + defaultKey;
    }
  };

  const handleMenuSelect = (key: string) => {
    setSelectedKey(key);
    window.location.hash = '#' + key;
  };

  const pageMap = portal === 'sp' ? spPageMap : adminPageMap;
  const groups = portal === 'sp' ? spGroups : portal === 'admin' ? adminGroups : [];
  const routeKey = selectedKey.split('?')[0];
  const PageComponent = portal === 'flowchart' ? null : (pageMap[routeKey] || null);

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
      <PortalLayout
        title={portal === 'flowchart' ? '服务商管理流程图' : portal === 'sp' ? '服务商工作台2.0' : '服务商管理工作台2.0'}
        groups={groups}
        selectedKey={selectedKey}
        onMenuSelect={handleMenuSelect}
      >
        {/* 端切换 */}
        <div style={{ marginBottom: 16 }}>
          <Segmented
            value={portal}
            onChange={handlePortalChange}
            options={[
              { label: '服务商端', value: 'sp' },
              { label: '管理端', value: 'admin' },
              { label: '流程图', value: 'flowchart' },
            ]}
          />
        </div>

        {portal === 'flowchart' ? (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
            minHeight: 'calc(100vh - 56px)',
            padding: 24,
            background: '#fff',
            overflow: 'auto',
          }}>
            <img
              src={flowchartPng}
              alt="服务商管理流程图"
              style={{ maxWidth: '100%', height: 'auto', cursor: 'zoom-in', borderRadius: 4 }}
              onClick={() => window.open(flowchartPng, '_blank')}
            />
          </div>
        ) : PageComponent ? (
          <Suspense fallback={
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 200 }}>
              <Text type="secondary">加载中...</Text>
            </div>
          }>
            <PageComponent />
          </Suspense>
        ) : (
          <div style={{
            background: '#fff',
            borderRadius: 4,
            border: '1px solid #f0f0f0',
            padding: 48,
            textAlign: 'center',
          }}>
            <div style={{ fontSize: 48, marginBottom: 24, color: 'rgba(0,0,0,0.25)' }}>☰</div>
            <div style={{ fontSize: 24, fontWeight: 600, marginBottom: 8 }}>
              {portal === 'sp' ? '服务商工作台2.0' : '服务商管理工作台2.0'}
            </div>
            <Text type="secondary" style={{ fontSize: 16 }}>请从左侧菜单选择一个页面开始浏览</Text>
          </div>
        )}
      </PortalLayout>
    </ConfigProvider>
  );
}

export default App;

if (typeof window !== 'undefined') {
  const root = createRoot(document.getElementById('root')!);
  root.render(<App />);
}
