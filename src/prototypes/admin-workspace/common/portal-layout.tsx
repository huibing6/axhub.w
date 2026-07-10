/**
 * @name PortalLayout
 * 门户共享布局 - Header + SideMenu + Content
 * 使用 Ant Design theme tokens
 */
import { useMemo } from 'react';
import { Layout, theme, Button, Typography, Space } from 'antd';

interface MenuItem { label: string; path?: string; children?: MenuItem[]; icon?: string; }
interface MenuGroup { title: string; items: MenuItem[]; }

function toSideMenuItems(groups: MenuGroup[]): any[] {
  return groups.map((group, gi) => ({
    key: `group-${gi}`,
    label: group.title,
    type: 'group',
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

const { Header, Content, Sider } = Layout;
const { Text } = Typography;

export default function PortalLayout({
  children,
  groups,
  activePath,
  portalType = 'sp',
}: {
  children: React.ReactNode;
  groups: MenuGroup[];
  activePath: string;
  portalType?: 'sp' | 'admin' | 'personnel' | 'inspection';
}) {
  const { token: t } = theme.useToken();

  const menuItems = useMemo(() => toSideMenuItems(groups), [groups]);

  const handleMenuSelect = (key: string) => {
    window.location.hash = '#' + key;
  };

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
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}>
        <Space size={12}>
          <img
            src="assets/logo.jpg"
            alt="云梦泽"
            style={{ height: 32, width: 'auto' }}
          />
        </Space>
        <nav style={{ marginLeft: 32, display: 'flex', alignItems: 'center', gap: 8, lineHeight: 'normal' }}>
          <Button type={portalType === 'sp' ? 'primary' : 'text'} size="small"
            onClick={() => window.location.hash = '#/sp/workspace'}
          >
            服务商工作台
          </Button>
          <Button
            type={portalType === 'admin' ? 'primary' : 'text'}
            size="small"
            onClick={() => window.location.hash = '#/admin/reg-review'}
          >
            服务商管理端
          </Button>
        </nav>
      </Header>

      <Layout>
        <Sider
          width={240}
          style={{
            background: t.colorBgContainer,
            borderRight: `1px solid ${t.colorBorderSecondary}`,
            overflow: 'auto',
            height: 'calc(100vh - 56px)',
            position: 'sticky',
            top: 56,
            left: 0,
          }}
        >
          <div style={{ padding: 16 }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8,
              background: t.colorBgLayout, borderRadius: 4, padding: '4px 12px',
            }}>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: t.colorTextQuaternary, width: 14, height: 14 }}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              <input placeholder="输入查询内容" style={{
                border: 'none', background: 'transparent', fontSize: 12, outline: 'none', flex: 1,
                color: t.colorText,
              }} />
            </div>
          </div>
          <div style={{ padding: '0 8px' }}>
            {menuItems.map((group: any) => (
              <div key={group.key} style={{ marginBottom: 8 }}>
                <div style={{
                  fontSize: 12, fontWeight: 600, color: t.colorTextSecondary,
                  padding: '8px 12px 4px', textTransform: 'uppercase', letterSpacing: '0.5px',
                }}>
                  {group.label}
                </div>
                {group.children?.map((item: any) => (
                  <div key={item.key}>
                    <div
                      onClick={() => handleMenuSelect(item.key)}
                      style={{
                        padding: '6px 12px', borderRadius: 4, cursor: 'pointer', fontSize: 14,
                        color: activePath === item.key || window.location.hash === '#' + item.key ? t.colorPrimary : t.colorText,
                        background: activePath === item.key || window.location.hash === '#' + item.key ? t.colorPrimaryBg : 'transparent',
                        fontWeight: activePath === item.key || window.location.hash === '#' + item.key ? 600 : 400,
                        transition: 'all 0.2s',
                      }}
                      onMouseEnter={(e) => {
                        if (activePath !== item.key && window.location.hash !== '#' + item.key) {
                          e.currentTarget.style.background = t.colorFillTertiary;
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (activePath !== item.key && window.location.hash !== '#' + item.key) {
                          e.currentTarget.style.background = 'transparent';
                        }
                      }}
                    >
                      {item.label}
                    </div>
                    {item.children?.map((child: any) => (
                      <div
                        key={child.key}
                        onClick={() => handleMenuSelect(child.key)}
                        style={{
                          padding: '4px 12px 4px 28px', borderRadius: 4, cursor: 'pointer', fontSize: 13,
                          color: activePath === child.key || window.location.hash === '#' + child.key ? t.colorPrimary : t.colorTextSecondary,
                          background: activePath === child.key || window.location.hash === '#' + child.key ? t.colorPrimaryBg : 'transparent',
                          fontWeight: activePath === child.key || window.location.hash === '#' + child.key ? 500 : 400,
                          transition: 'all 0.2s',
                        }}
                      >
                        {child.label}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </Sider>

        <Content style={{
          padding: 24,
          minHeight: 'calc(100vh - 56px)',
          background: t.colorBgLayout,
          overflow: 'auto',
        }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}
