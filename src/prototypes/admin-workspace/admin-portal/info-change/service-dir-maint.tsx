/**
 * @name 服务品类维护
 */
import { useState, useMemo } from 'react';
import { theme, Typography, Card, Space, Input, Button, Tree, Tag, Descriptions, Empty, message, Modal } from 'antd';
import { FolderOutlined, FolderOpenOutlined, FileOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import PortalLayout from '../../common/portal-layout';
import { adminGroups } from '../../common/menu-data';

/* ─── 类型定义 ─── */
interface CategoryNode {
  key: string;
  title: string;
  code: string;
  level: string;
  dirType: string;
  adminUnit: string;
  source: string;
  bidFile: string;
  bidFileName: string;
  children?: CategoryNode[];
}

/* ─── 模拟数据 ─── */
const treeData: CategoryNode[] = [
  {
    key: '1',
    title: '租赁服务',
    code: 'S1001000',
    level: '一级',
    dirType: '专业',
    adminUnit: '长庆油田',
    source: '公开招标采购中标',
    bidFile: '中标通知文件.pdf',
    bidFileName: '中标通知文件.pdf',
    children: [
      {
        key: '1-1',
        title: '租赁服务 - 通用',
        code: 'S1001001',
        level: '二级',
        dirType: '通用',
        adminUnit: '长庆油田',
        source: '其他公开方式',
        bidFile: '',
        bidFileName: '',
      },
      {
        key: '1-2',
        title: '租赁服务 - 专业',
        code: 'S1001002',
        level: '二级',
        dirType: '专业',
        adminUnit: '',
        source: '公开招标采购中标',
        bidFile: '中标通知文件.pdf',
        bidFileName: '中标通知文件.pdf',
      },
    ],
  },
  {
    key: '2',
    title: '运输服务',
    code: 'S1002000',
    level: '一级',
    dirType: '通用',
    adminUnit: '',
    source: '其他公开方式',
    bidFile: '',
    bidFileName: '',
    children: [
      {
        key: '2-1',
        title: '运输服务 - 专业',
        code: 'S1002001',
        level: '二级',
        dirType: '专业',
        adminUnit: '',
        source: '公开招标采购中标',
        bidFile: '中标通知文件.pdf',
        bidFileName: '中标通知文件.pdf',
      },
    ],
  },
];

/* ─── 递归搜索匹配 ─── */
function filterTree(nodes: CategoryNode[], keyword: string): CategoryNode[] {
  if (!keyword) return nodes;
  return nodes
    .map(node => {
      const matchedSelf = node.title.includes(keyword) || node.code.includes(keyword);
      const filteredChildren = node.children ? filterTree(node.children, keyword) : [];
      if (matchedSelf || filteredChildren.length > 0) {
        return { ...node, children: filteredChildren.length > 0 ? filteredChildren : node.children };
      }
      return null;
    })
    .filter(Boolean) as CategoryNode[];
}

/* ─── 展平树获取所有 key ─── */
function getAllKeys(nodes: CategoryNode[]): string[] {
  const keys: string[] = [];
  nodes.forEach(n => {
    keys.push(n.key);
    if (n.children) keys.push(...getAllKeys(n.children));
  });
  return keys;
}

/* ─── 查找节点 ─── */
function findNode(nodes: CategoryNode[], key: string): CategoryNode | null {
  for (const n of nodes) {
    if (n.key === key) return n;
    if (n.children) {
      const found = findNode(n.children, key);
      if (found) return found;
    }
  }
  return null;
}

export default function ServiceDirMaintPage() {
  const { token: t } = theme.useToken();
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [expandedKeys, setExpandedKeys] = useState<string[]>(['1', '2']);

  const filteredData = useMemo(() => filterTree(treeData, searchKeyword), [searchKeyword]);
  const selectedNode = useMemo(() => selectedKeys[0] ? findNode(treeData, selectedKeys[0]) : null, [selectedKeys]);

  const handleExpandAll = () => {
    setExpandedKeys(getAllKeys(treeData));
  };

  const handleCollapseAll = () => {
    setExpandedKeys([]);
  };

  const handleDelete = () => {
    if (!selectedNode) return;
    Modal.confirm({
      title: '确认删除',
      content: `确定要删除服务品类「${selectedNode.title}」吗？`,
      okText: '确认',
      cancelText: '取消',
      okButtonProps: { danger: true },
      onOk: () => message.success('已删除'),
    });
  };

  const handleBatchDelete = () => {
    Modal.confirm({
      title: '批量删除',
      content: '确定要删除选中的服务品类吗？',
      okText: '确认',
      cancelText: '取消',
      okButtonProps: { danger: true },
      onOk: () => message.success('已批量删除'),
    });
  };

  /* ─── 渲染 Tree 节点标题 ─── */
  const renderTreeTitle = (node: CategoryNode) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '2px 0' }}>
      <span style={{ fontSize: 13 }}>{node.title}</span>
      <Tag color={node.level === '一级' ? 'blue' : 'default'} style={{ fontSize: 11, lineHeight: '16px', padding: '0 4px', margin: 0 }}>
        {node.level}
      </Tag>
      <Tag color={node.dirType === '专业' ? 'orange' : 'default'} style={{ fontSize: 11, lineHeight: '16px', padding: '0 4px', margin: 0 }}>
        {node.dirType}
      </Tag>
    </div>
  );

  /* ─── 转换数据为 Tree 组件格式 ─── */
  const convertToTreeData = (nodes: CategoryNode[]): any[] =>
    nodes.map(n => ({
      key: n.key,
      title: renderTreeTitle(n),
      icon: n.children && n.children.length > 0 ? (expandedKeys.includes(n.key) ? <FolderOpenOutlined /> : <FolderOutlined />) : <FileOutlined />,
      children: n.children ? convertToTreeData(n.children) : [],
    }));

  return (
    <PortalLayout groups={adminGroups} activePath="/admin/maint-edit" portalType="admin">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <div>
          <Typography.Text style={{ color: '#ff4d4f', display: 'block', marginBottom: 4 }}>已准入服务品类</Typography.Text>
          <Typography.Title level={4} style={{ margin: 0 }}>服务品类维护</Typography.Title>
        </div>
        <Space>
          <Button type="primary" danger icon={<PlusOutlined />} onClick={() => window.location.hash = '#/admin/add-category-form'}>
            添加服务品类
          </Button>
          <Button type="primary" danger icon={<DeleteOutlined />} onClick={handleBatchDelete}>
            批量删除
          </Button>
        </Space>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '360px 1fr', gap: 16, minHeight: 500 }}>
        {/* 左侧：Tree 导航 */}
        <Card
          size="small"
          title={
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>服务品类目录</span>
              <Space size={4}>
                <Button type="link" size="small" onClick={handleExpandAll} style={{ padding: 0, fontSize: 12 }}>展开全部</Button>
                <Typography.Text type="secondary" style={{ fontSize: 12 }}>/</Typography.Text>
                <Button type="link" size="small" onClick={handleCollapseAll} style={{ padding: 0, fontSize: 12 }}>收起全部</Button>
              </Space>
            </div>
          }
          style={{ height: '100%' }}
        >
          <Input
            placeholder="搜索品类名称/编码"
            value={searchKeyword}
            onChange={e => setSearchKeyword(e.target.value)}
            allowClear
            style={{ marginBottom: 12 }}
          />
          <Tree
            treeData={convertToTreeData(filteredData)}
            expandedKeys={expandedKeys}
            onExpand={keys => setExpandedKeys(keys as string[])}
            selectedKeys={selectedKeys}
            onSelect={keys => setSelectedKeys(keys as string[])}
            blockNode
            showIcon
            style={{ background: 'transparent' }}
          />
        </Card>

        {/* 右侧：详情面板 */}
        <Card size="small" title={selectedNode ? '品类详情' : '请选择服务品类'} style={{ height: '100%' }}>
          {selectedNode ? (
            <div>
              <Descriptions column={2} bordered size="small" style={{ marginBottom: 16 }}>
                <Descriptions.Item label="品类编码">{selectedNode.code}</Descriptions.Item>
                <Descriptions.Item label="品类名称">{selectedNode.title}</Descriptions.Item>
                <Descriptions.Item label="级别">
                  <Tag color={selectedNode.level === '一级' ? 'blue' : 'default'}>{selectedNode.level}</Tag>
                </Descriptions.Item>
                <Descriptions.Item label="目录类型">
                  <Tag color={selectedNode.dirType === '专业' ? 'orange' : 'default'}>{selectedNode.dirType}</Tag>
                </Descriptions.Item>
                <Descriptions.Item label="管理单位">{selectedNode.adminUnit || '—'}</Descriptions.Item>
                <Descriptions.Item label="准入来源">{selectedNode.source || '—'}</Descriptions.Item>
                <Descriptions.Item label="中标通知书" span={2}>
                  {selectedNode.bidFile ? (
                    <Typography.Link style={{ color: '#1677ff' }}>{selectedNode.bidFileName}</Typography.Link>
                  ) : '—'}
                </Descriptions.Item>
              </Descriptions>

              {selectedNode.children && selectedNode.children.length > 0 && (
                <div style={{ marginBottom: 16 }}>
                  <Typography.Text strong style={{ display: 'block', marginBottom: 8 }}>子品类 ({selectedNode.children.length})</Typography.Text>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {selectedNode.children.map(child => (
                      <Card
                        key={child.key}
                        size="small"
                        hoverable
                        style={{ width: 200, cursor: 'pointer' }}
                        onClick={() => setSelectedKeys([child.key])}
                      >
                        <Typography.Text strong style={{ fontSize: 13, display: 'block', marginBottom: 4 }}>{child.title}</Typography.Text>
                        <Space size={4}>
                          <Tag color={child.level === '一级' ? 'blue' : 'default'} style={{ fontSize: 11 }}>{child.level}</Tag>
                          <Tag color={child.dirType === '专业' ? 'orange' : 'default'} style={{ fontSize: 11 }}>{child.dirType}</Tag>
                        </Space>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              <Space>
                <Button type="primary" danger icon={<DeleteOutlined />} onClick={handleDelete}>
                  删除此品类
                </Button>
              </Space>
            </div>
          ) : (
            <Empty description="请在左侧目录中选择一个服务品类查看详情" style={{ marginTop: 80 }} />
          )}
        </Card>
      </div>
    </PortalLayout>
  );
}
