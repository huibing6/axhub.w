/**
 * @name 云梦泽服务商工作台
 * 中国石油旗下能源与化工产业智慧电商服务平台 - 服务商自助服务模块
 *
 * 统一侧边菜单：服务商注册管理 + 服务商管理自助服务 + 服务商管理信息查询 + 关键人员管理 + 现场考察
 * 使用 YMZEC 主题系统 (colorPrimary: #ff4d4f)
 */
import { useState, useMemo, useEffect, lazy, Suspense } from 'react';
import { ConfigProvider, Layout, theme, Typography } from 'antd';
import SideMenu from '../../components/side-menu';
import { spGroups } from './common/menu-data';

const SpWorkspace = lazy(() => import('./sp-portal/workspace'));
const SpRegister = lazy(() => import('./sp-portal/register'));
const SpRegisterChange = lazy(() => import('./sp-portal/register-change'));
const SpAdmission = lazy(() => import('./sp-portal/admission'));
const SpInfoMaintain = lazy(() => import('./sp-portal/info-maintain'));
const SpQualMaintain = lazy(() => import('./sp-portal/qual-maintain'));
const SpServiceMaintain = lazy(() => import('./sp-portal/service-maintain'));
const SpServiceMaintainAdd = lazy(() => import('./sp-portal/service-maintain-add'));
const SpServiceMaintainEdit = lazy(() => import('./sp-portal/service-maintain-edit'));
const SpInfoQuery = lazy(() => import('./sp-portal/info-query'));
const SpProgressQuery = lazy(() => import('./sp-portal/progress-query'));
const SpFreezeQuery = lazy(() => import('./sp-portal/freeze-query'));
const SpRegisterDetail = lazy(() => import('./sp-portal/register-detail'));
const SpAdmissionDetail = lazy(() => import('./sp-portal/admission-detail'));
const SpDraftList = lazy(() => import('./sp-portal/draft-list'));

const PersonnelAdd = lazy(() => import('./key-personnel/add'));
const PersonnelApprove = lazy(() => import('./key-personnel/approve'));
const PersonnelView = lazy(() => import('./key-personnel/view'));

const InspectionManage = lazy(() => import('./site-inspection/manage'));

const pageMap: Record<string, React.LazyExoticComponent<any>> = {
  '/sp/workspace': SpWorkspace,
  '/sp/register': SpRegister,
  '/sp/register-change': SpRegisterChange,
  '/sp/admission': SpAdmission,
  '/sp/info-maintain': SpInfoMaintain,
  '/sp/qual-maintain': SpQualMaintain,
  '/sp/service-maintain': SpServiceMaintain,
  '/sp/service-maintain/add': SpServiceMaintainAdd,
  '/sp/service-maintain/edit': SpServiceMaintainEdit,
  '/sp/info-query': SpInfoQuery,
  '/sp/progress-query': SpProgressQuery,
  '/sp/freeze-query': SpFreezeQuery,
  '/sp/register-detail': SpRegisterDetail,
  '/sp/admission-detail': SpAdmissionDetail,
  '/sp/draft-list': SpDraftList,
  '/personnel/add': PersonnelAdd,
  '/personnel/approve': PersonnelApprove,
  '/personnel/view': PersonnelView,
  '/inspection/manage': InspectionManage,
};

interface MenuItem { label: string; path?: string; children?: MenuItem[]; }
interface MenuGroup { title: string; items: MenuItem[]; }

const allGroups: MenuGroup[] = spGroups;

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
    const hash = typeof window !== 'undefined' ? window.location.hash.slice(1) : '';
    return hash && pageMap[hash] ? hash : '';
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const onHashChange = () => {
      const hash = window.location.hash.slice(1);
      setSelectedKey(hash && pageMap[hash] ? hash : '');
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const menuItems = useMemo(() => toSideMenuItems(allGroups), []);
  const PageComponent = selectedKey ? pageMap[selectedKey] : null;

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
            src="assets/logo.jpg"
            alt="云梦泽"
            style={{ height: 32, width: 'auto' }}
          />
        </div>
        <span className="ml-4" style={{ fontSize: 14, fontWeight: 600, color: t.colorText }}>服务商工作台</span>
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
          {PageComponent ? (
            <Suspense fallback={
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 200 }}>
                <Text type="secondary">加载中...</Text>
              </div>
            }>
              <PageComponent />
            </Suspense>
          ) : (
            <div style={{
              background: t.colorBgContainer,
              borderRadius: t.borderRadius,
              border: `1px solid ${t.colorBorderSecondary}`,
              padding: 48,
              textAlign: 'center',
            }}>
              <div style={{ fontSize: 48, marginBottom: 24, color: t.colorTextQuaternary }}>☰</div>
              <div style={{ fontSize: 24, fontWeight: 600, color: t.colorText, marginBottom: 8 }}>
                云梦泽服务商工作台
              </div>
              <Text type="secondary" style={{ fontSize: 16 }}>请从左侧菜单选择一个页面开始浏览</Text>
            </div>
          )}
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
