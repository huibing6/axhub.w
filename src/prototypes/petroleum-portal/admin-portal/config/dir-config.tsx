/**
 * @name 专业服务目录配置
 */
import { useState } from 'react';
import { theme, Typography, Card, Space, Input, Button, Row, Col, Switch, Tabs, message } from 'antd';
import PortalLayout from '../../common/portal-layout';
import { adminGroups } from '../../common/menu-data';

interface TreeNode {
  label: string;
  children?: TreeNode[];
  tag?: string;
}

const treeData: TreeNode[] = [
  {
    label: '工程技术服务',
    children: [
      { label: '钻井工程', tag: '专业' },
      { label: '采油工程', tag: '专业' },
      { label: '试油技术服务', tag: '专业' },
    ],
  },
  {
    label: '地面建设服务',
    children: [
      {
        label: '管道工程',
        children: [
          { label: '管道安装' },
          { label: '管道防腐' },
        ],
      },
      { label: '电力工程' },
    ],
  },
  { label: '物流运输服务' },
];

function TreeNodeView({ node, level = 0, defaultExpanded }: { node: TreeNode; level?: number; defaultExpanded: boolean }) {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const { token: t } = theme.useToken();
  const hasChildren = node.children && node.children.length > 0;

  return (
    <div>
      <div
        style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '4px 8px', cursor: 'pointer', borderRadius: 4, paddingLeft: level * 16 }}
        onClick={() => hasChildren && setExpanded(!expanded)}
      >
        {hasChildren ? (
          <span style={{ transform: expanded ? 'rotate(90deg)' : 'none', display: 'inline-block', transition: 'transform 0.2s', color: t.colorTextQuaternary, width: 12, height: 12 }}>▶</span>
        ) : (
          <span style={{ width: 12, height: 12, display: 'inline-block' }} />
        )}
        <input type="checkbox" style={{ width: 14, height: 14 }} />
        <Typography.Text style={{ fontSize: 14 }}>{node.label}</Typography.Text>
        {node.tag && (
          <Typography.Text style={{ fontSize: 12, background: t.colorPrimary, color: '#fff', padding: '1px 6px', borderRadius: 4, marginLeft: 4 }}>{node.tag}</Typography.Text>
        )}
      </div>
      {expanded && hasChildren && (
        <div>
          {node.children!.map((child, i) => (
            <TreeNodeView key={i} node={child} level={level + 1} defaultExpanded={defaultExpanded} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function DirConfig() {
  const [isProDir, setIsProDir] = useState(true);
  const [activeTab, setActiveTab] = useState('category');
  const [allExpanded, setAllExpanded] = useState(true);
  const { token: t } = theme.useToken();

  return (
    <PortalLayout groups={adminGroups} activePath="/admin/dir-config" portalType="admin">
      <div style={{ marginBottom: 8 }}>
        <Typography.Title level={4} style={{ margin: 0 }}>专业目录配置与审核小组管理</Typography.Title>
        <Typography.Text type="secondary">配置服务目录的专业属性、管理审核小组成员与角色分配</Typography.Text>
      </div>
      <Row gutter={16}>
        <Col span={6}>
          <Card size="small" variant="outlined" style={{ height: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <Typography.Text strong style={{ fontSize: 14 }}>服务目录</Typography.Text>
              <Space size={8}>
                <Typography.Link style={{ fontSize: 12 }} onClick={() => setAllExpanded(true)}>全部展开</Typography.Link>
                <Typography.Text type="secondary" style={{ fontSize: 12, cursor: 'pointer' }} onClick={() => setAllExpanded(false)}>全部收起</Typography.Text>
              </Space>
            </div>
            <div style={{ marginBottom: 12 }}>
              <Input placeholder="搜索目录名称.." onInput={() => message.info('搜索目录...')} />
            </div>
            <div>
              {treeData.map((node, i) => (
                <TreeNodeView key={`${i}-${allExpanded}`} node={node} level={0} defaultExpanded={allExpanded} />
              ))}
            </div>
            <div style={{ marginTop: 16 }}>
              <Typography.Text type="secondary" style={{ fontSize: 12 }}>共 18 个目录，其中 4 个已标记为专业目录</Typography.Text>
            </div>
          </Card>
        </Col>
        <Col span={18}>
          <Card size="small" variant="outlined">
            <div style={{ display: 'flex', gap: 24, borderBottom: '1px solid ' + t.colorBorderSecondary, marginBottom: 20 }}>
              <div
                style={{ paddingBottom: 8, cursor: 'pointer', borderBottom: activeTab === 'category' ? '2px solid ' + t.colorPrimary : '2px solid transparent', color: activeTab === 'category' ? t.colorPrimary : t.colorText, fontWeight: activeTab === 'category' ? 'bold' : 'normal', fontSize: 14 }}
                onClick={() => setActiveTab('category')}
              >
                目录品类设置
              </div>
              <div
                style={{ paddingBottom: 8, cursor: 'pointer', borderBottom: activeTab === 'type' ? '2px solid ' + t.colorPrimary : '2px solid transparent', color: activeTab === 'type' ? t.colorPrimary : t.colorText, fontWeight: activeTab === 'type' ? 'bold' : 'normal', fontSize: 14 }}
                onClick={() => setActiveTab('type')}
              >
                专业类型设置
              </div>
            </div>

            <div style={{ marginBottom: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                <div style={{ width: 4, height: 16, borderRadius: 4, background: t.colorPrimary }} />
                <Typography.Text strong style={{ fontSize: 14 }}>基本信息</Typography.Text>
              </div>
              <Row gutter={16}>
                <Col span={12}>
                  <Space size={8} style={{ width: '100%' }}>
                    <Typography.Text style={{ width: 96, textAlign: 'right', fontSize: 14 }}>目录名称</Typography.Text>
                    <Input value="钻井工程" readOnly style={{ background: t.colorBgLayout, flex: 1 }} />
                  </Space>
                </Col>
                <Col span={12}>
                  <Space size={8} style={{ width: '100%' }}>
                    <Typography.Text style={{ width: 96, textAlign: 'right', fontSize: 14 }}>目录编码</Typography.Text>
                    <Input value="GC-ZJ-001" readOnly style={{ background: t.colorBgLayout, flex: 1 }} />
                  </Space>
                </Col>
                <Col span={12}>
                  <Space size={8} style={{ width: '100%' }}>
                    <Typography.Text style={{ width: 96, textAlign: 'right', fontSize: 14 }}>上级目录</Typography.Text>
                    <Input value="工程技术服务" readOnly style={{ background: t.colorBgLayout, flex: 1 }} />
                  </Space>
                </Col>
                <Col span={12}>
                  <Space size={8} style={{ width: '100%' }}>
                    <Typography.Text style={{ width: 96, textAlign: 'right', fontSize: 14 }}>目录级别</Typography.Text>
                    <Input value="2级" readOnly style={{ background: t.colorBgLayout, flex: 1 }} />
                  </Space>
                </Col>
              </Row>
            </div>

            <div style={{ marginBottom: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                <div style={{ width: 4, height: 16, borderRadius: 4, background: t.colorPrimary }} />
                <Typography.Text strong style={{ fontSize: 14 }}>专业目录配置</Typography.Text>
              </div>
              <Space size={12} style={{ marginBottom: 16 }}>
                <Typography.Text style={{ fontSize: 14 }}>是否标记为专业目录</Typography.Text>
                <Switch checked={isProDir} onChange={setIsProDir} />
              </Space>
              <Row gutter={16}>
                <Col span={24}>
                  <Space size={8} style={{ width: '100%' }}>
                    <Typography.Text style={{ width: 112, textAlign: 'right', fontSize: 14 }}>
                      <Typography.Text style={{ color: t.colorPrimary }}>*</Typography.Text>专业类型名称
                    </Typography.Text>
                    <Input value="钻井工程专业" readOnly style={{ flex: 1 }} />
                  </Space>
                </Col>
              </Row>
              <Row gutter={16} style={{ marginTop: 16 }}>
                <Col span={24}>
                  <Space size={8} style={{ width: '100%' }} align="start">
                    <Typography.Text style={{ width: 112, textAlign: 'right', fontSize: 14, marginTop: 4 }}>专业类型描述</Typography.Text>
                    <Input.TextArea rows={3} readOnly value="涵盖定向井、固井、钻井液等钻井相关技术服务领域的专业审核" style={{ flex: 1, resize: 'none' }} />
                  </Space>
                </Col>
              </Row>
            </div>

            <div style={{ borderRadius: 8, padding: 12, marginBottom: 20, background: '#E3F2FD', display: 'flex', alignItems: 'flex-start', gap: 8 }}>
              <Typography.Text style={{ color: t.colorInfo, fontSize: 12 }}>标记为专业目录后，该目录将进入专业审核流程，需要指定对应的审核小组</Typography.Text>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 12, borderTop: '1px solid ' + t.colorBorderSecondary }}>
              <Typography.Text type="secondary" style={{ fontSize: 12 }}>上次保存：2025-06-20 15:30</Typography.Text>
              <Space size={12}>
                <Button onClick={() => message.info('已取消')}>取消</Button>
                <Button onClick={() => message.info('预览功能待实现')}>预览配置</Button>
                <Button type="primary" onClick={() => message.success('配置已保存')}>保存配置</Button>
              </Space>
            </div>
          </Card>
        </Col>
      </Row>
    </PortalLayout>
  );
}
