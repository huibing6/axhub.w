/**
 * @name PortalLayout
 * 服务商2.0 - 统一门户布局（顶栏+侧边菜单+内容区）
 */
import React from 'react';
import { useState, useEffect, useMemo } from 'react';
import { Layout, theme } from 'antd';
import SideMenu from '../../../components/side-menu';
import type { MenuGroup } from './menu-data';

const { Header, Content } = Layout;

interface PortalLayoutProps {
  title: string;
  groups: MenuGroup[];
  logo?: string;
  children: React.ReactNode;
  selectedKey?: string;
  onMenuSelect?: (key: string) => void;
}

export default function PortalLayout({ title, groups, logo = '/prototypes/assets/logo.jpg', children, selectedKey: controlledKey, onMenuSelect }: PortalLayoutProps) {
  const { token: t } = theme.useToken();
  const [internalKey, setInternalKey] = useState('');

  const selectedKey = controlledKey ?? internalKey;

  useEffect(() => {
    if (controlledKey !== undefined) return;
    const hash = window.location.hash.slice(1);
    if (hash) setInternalKey(hash);
    const onHashChange = () => {
      const h = window.location.hash.slice(1);
      setInternalKey(h);
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, [controlledKey]);

  const menuItems = useMemo(() => {
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
        return { key: item.path || `item-${gi}-${ii}`, label: item.label };
      }),
    }));
  }, [groups]);

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
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, lineHeight: 'normal' }}>
          <img src={logo} alt="云梦泽" style={{ height: 32, width: 'auto' }} />
        </div>
        <span style={{ marginLeft: 16, fontSize: 14, fontWeight: 600, color: t.colorText }}>{title}</span>
      </Header>
      <Layout>
        <SideMenu
          title=""
          width={240}
          collapsible={false}
          items={menuItems}
          defaultSelectedKey=""
          onMenuSelect={(key: string) => {
            setInternalKey(key);
            onMenuSelect?.(key);
            window.location.hash = '#' + key;
          }}
        />
        <Content style={{
          padding: 24,
          minHeight: 'calc(100vh - 56px)',
          background: t.colorBgLayout,
        }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}
