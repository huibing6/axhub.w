/**
 * @name 服务目录选择（共享数据与组件）
 * 服务商2.0 - 服务品类目录树与目录选择弹框
 * 服务商可自由选择专业目录与通用目录下的任意品类（无范围限制），
 * 与注册服务商/信息维护/准入资料中的"选择服务目录"交互一致。
 */
import { useState } from 'react';
import { Modal, Input, Space, Typography, Button as AntButton } from 'antd';

export interface ServiceTreeNode {
  key: string;
  title: string;
  code: string;
  level: string;
  children?: ServiceTreeNode[];
}

export interface SelectedService {
  code: string;
  name: string;
  type: '专业' | '通用';
  level: string;
}

/* ─── 专业目录（需专业资格审查） ─── */
export const professionalTree: ServiceTreeNode[] = [
  {
    key: 'S01', title: '咨询服务', code: 'S01', level: '一级',
    children: [
      { key: 'S0101', title: '咨询服务', code: 'S0101', level: '二级', children: [
        { key: 'S0101000', title: '咨询', code: 'S0101000', level: '三级' },
      ]},
      { key: 'S0102', title: '勘查服务', code: 'S0102', level: '二级', children: [
        { key: 'S0102000', title: '勘查', code: 'S0102000', level: '三级' },
        { key: 'S0102001', title: '劳务勘查', code: 'S0102001', level: '三级' },
        { key: 'S0102002', title: '专业勘查', code: 'S0102002', level: '三级' },
      ]},
      { key: 'S0103', title: '设计服务', code: 'S0103', level: '二级', children: [
        { key: 'S0103000', title: '设计', code: 'S0103000', level: '三级' },
        { key: 'S0103001', title: '行业设计', code: 'S0103001', level: '三级' },
        { key: 'S0103002', title: '专业设计', code: 'S0103002', level: '三级' },
      ]},
    ],
  },
  {
    key: 'S02', title: '物化探服务', code: 'S02', level: '一级',
    children: [
      { key: 'S0201', title: '地震勘探', code: 'S0201', level: '二级', children: [
        { key: 'S0201000', title: '物化探服务', code: 'S0201000', level: '三级' },
        { key: 'S0201001', title: '二维地震采集服务', code: 'S0201001', level: '三级' },
        { key: 'S0201002', title: '三维地震采集服务', code: 'S0201002', level: '三级' },
      ]},
      { key: 'S0202', title: '地震资料处理', code: 'S0202', level: '二级', children: [
        { key: 'S0202001', title: '二维地震资料处理服务', code: 'S0202001', level: '三级' },
        { key: 'S0202002', title: '三维地震资料处理服务', code: 'S0202002', level: '三级' },
      ]},
    ],
  },
  {
    key: 'S03', title: '工序外协加工服务', code: 'S03', level: '一级',
    children: [
      { key: 'S0301', title: '加工服务', code: 'S0301', level: '二级', children: [
        { key: 'S0301000', title: '工序外协加工服务', code: 'S0301000', level: '三级' },
        { key: 'S0301001', title: '装配服务', code: 'S0301001', level: '三级' },
        { key: 'S0301002', title: '手工组装服务', code: 'S0301002', level: '三级' },
      ]},
    ],
  },
  {
    key: 'S05', title: '科技项目服务', code: 'S05', level: '一级',
    children: [
      { key: 'S0501', title: '科技服务', code: 'S0501', level: '二级', children: [
        { key: 'S0501000', title: '科技项目服务', code: 'S0501000', level: '三级' },
        { key: 'S0501001', title: '委托技术开发服务', code: 'S0501001', level: '三级' },
        { key: 'S0501002', title: '委托研发服务', code: 'S0501002', level: '三级' },
      ]},
    ],
  },
];

/* ─── 通用目录（无需专业审查） ─── */
export const generalTree: ServiceTreeNode[] = [
  {
    key: 'S04', title: '仓储服务', code: 'S04', level: '一级',
    children: [
      { key: 'S0401', title: '仓储服务', code: 'S0401', level: '二级', children: [
        { key: 'S0401000', title: '仓储服务', code: 'S0401000', level: '三级' },
        { key: 'S0401001', title: '仓储包装服务', code: 'S0401001', level: '三级' },
        { key: 'S0401002', title: '封装服务', code: 'S0401002', level: '三级' },
      ]},
    ],
  },
  {
    key: 'S06', title: '软件开发服务', code: 'S06', level: '一级',
    children: [
      { key: 'S0601', title: '软件开发', code: 'S0601', level: '二级', children: [
        { key: 'S0601000', title: '软件开发服务', code: 'S0601000', level: '三级' },
        { key: 'S0601001', title: '基础软件开发服务', code: 'S0601001', level: '三级' },
        { key: 'S0601002', title: '操作系统开发服务', code: 'S0601002', level: '三级' },
      ]},
    ],
  },
  {
    key: 'S07', title: '银行服务', code: 'S07', level: '一级',
    children: [
      { key: 'S0701', title: '银行服务', code: 'S0701', level: '二级', children: [
        { key: 'S0701000', title: '银行服务', code: 'S0701000', level: '三级' },
        { key: 'S0701001', title: '银行托管服务', code: 'S0701001', level: '三级' },
        { key: 'S0701002', title: '银行结算服务', code: 'S0701002', level: '三级' },
      ]},
    ],
  },
  {
    key: 'S10', title: '租赁服务', code: 'S10', level: '一级',
    children: [
      { key: 'S1001', title: '租赁服务', code: 'S1001', level: '二级', children: [
        { key: 'S1001000', title: '租赁服务', code: 'S1001000', level: '三级' },
        { key: 'S1001001', title: '油气水井设施租赁服务', code: 'S1001001', level: '三级' },
        { key: 'S1001002', title: '油气水集输处理设施租赁服务', code: 'S1001002', level: '三级' },
      ]},
    ],
  },
];

function TreeNodeItem({ node, checkedKeys, onCheck, expandedKeys, onToggle }: {
  node: ServiceTreeNode;
  checkedKeys: Set<string>;
  onCheck: (key: string) => void;
  expandedKeys: Set<string>;
  onToggle: (key: string) => void;
}) {
  const hasChildren = node.children && node.children.length > 0;
  const isExpanded = expandedKeys.has(node.key);
  const isChecked = checkedKeys.has(node.key);

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 0', cursor: 'pointer' }}
        onClick={() => hasChildren ? onToggle(node.key) : onCheck(node.key)}>
        {hasChildren ? (
          <span style={{ fontSize: 10, color: '#999', width: 12, textAlign: 'center' }}>{isExpanded ? '▼' : '▶'}</span>
        ) : (
          <span style={{ width: 12 }} />
        )}
        <input
          type="checkbox"
          checked={isChecked}
          onChange={() => onCheck(node.key)}
          onClick={(e) => e.stopPropagation()}
          style={{ accentColor: '#ff4d4f' }}
        />
        <span style={{ fontSize: 13 }}>{node.title}</span>
        <span style={{ flex: 1 }} />
        <span style={{ fontSize: 12, color: '#999' }}>{node.level}</span>
        <span style={{ fontSize: 12, color: '#999', marginLeft: 8 }}>({node.code})</span>
      </div>
      {hasChildren && isExpanded && (
        <div style={{ paddingLeft: 24 }}>
          {node.children!.map(child => (
            <TreeNodeItem key={child.key} node={child} checkedKeys={checkedKeys} onCheck={onCheck} expandedKeys={expandedKeys} onToggle={onToggle} />
          ))}
        </div>
      )}
    </div>
  );
}

function filterTree(nodes: ServiceTreeNode[], keyword: string): ServiceTreeNode[] {
  if (!keyword) return nodes;
  const out: ServiceTreeNode[] = [];
  for (const node of nodes) {
    const selfMatch = node.title.includes(keyword) || node.code.includes(keyword);
    const kids = node.children ? filterTree(node.children, keyword) : undefined;
    if (selfMatch || (kids && kids.length > 0)) {
      out.push({ ...node, children: selfMatch ? node.children : kids });
    }
  }
  return out;
}

/** 选择服务目录弹框：专业/通用双 Tab 树形多选，任意多级选择 */
export function ServiceCatalogModal({ open, onClose, onConfirm }: {
  open: boolean;
  onClose: () => void;
  onConfirm: (items: SelectedService[]) => void;
}) {
  const [activeTab, setActiveTab] = useState<'professional' | 'general'>('professional');
  const [checkedKeys, setCheckedKeys] = useState<Set<string>>(new Set());
  const [expandedKeys, setExpandedKeys] = useState<Set<string>>(new Set(['S01', 'S0101']));
  const [searchValue, setSearchValue] = useState('');

  const tree = activeTab === 'professional' ? professionalTree : generalTree;
  const visibleTree = filterTree(tree, searchValue.trim());

  const handleCheck = (key: string) => {
    setCheckedKeys(prev => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const handleToggle = (key: string) => {
    setExpandedKeys(prev => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const handleConfirm = () => {
    const findNode = (nodes: ServiceTreeNode[]): SelectedService[] => {
      const result: SelectedService[] = [];
      for (const node of nodes) {
        if (checkedKeys.has(node.key)) {
          result.push({
            code: node.code,
            name: node.title,
            type: activeTab === 'professional' ? '专业' : '通用',
            level: node.level,
          });
        }
        if (node.children) {
          result.push(...findNode(node.children));
        }
      }
      return result;
    };
    onConfirm(findNode(tree));
    setCheckedKeys(new Set());
    onClose();
  };

  return (
    <Modal
      title="选择服务目录"
      open={open}
      onCancel={onClose}
      width={640}
      footer={
        <Space>
          <AntButton onClick={onClose}>取消</AntButton>
          <AntButton type="primary" danger onClick={handleConfirm}>确认选择</AntButton>
        </Space>
      }
    >
      <div style={{ display: 'flex', gap: 0, borderBottom: '1px solid #f0f0f0', marginBottom: 16 }}>
        <div
          onClick={() => setActiveTab('professional')}
          style={{
            padding: '10px 16px', cursor: 'pointer', fontSize: 14,
            borderBottom: activeTab === 'professional' ? '2px solid #ff4d4f' : '2px solid transparent',
            color: activeTab === 'professional' ? '#ff4d4f' : '#666',
            fontWeight: activeTab === 'professional' ? 600 : 400,
          }}
        >
          专业目录 <span style={{ fontSize: 11, background: '#fff1f0', color: '#ff4d4f', padding: '0 4px', borderRadius: 3, marginLeft: 4 }}>需审查</span>
        </div>
        <div
          onClick={() => setActiveTab('general')}
          style={{
            padding: '10px 16px', cursor: 'pointer', fontSize: 14,
            borderBottom: activeTab === 'general' ? '2px solid #ff4d4f' : '2px solid transparent',
            color: activeTab === 'general' ? '#ff4d4f' : '#666',
            fontWeight: activeTab === 'general' ? 600 : 400,
          }}
        >
          通用目录
        </div>
      </div>

      <div style={{ marginBottom: 12 }}>
        <Typography.Text strong style={{ fontSize: 13 }}>
          {activeTab === 'professional' ? '📁 专业目录分类' : '📁 通用目录分类'}
        </Typography.Text>
        {activeTab === 'professional' && (
          <Typography.Text style={{ fontSize: 12, color: '#ff4d4f', marginLeft: 8 }}>需资格审查</Typography.Text>
        )}
      </div>

      <Input
        placeholder="输入关键字进行过滤"
        prefix="🔍"
        allowClear
        value={searchValue}
        onChange={e => setSearchValue(e.target.value)}
        style={{ marginBottom: 12 }}
      />

      <div style={{ fontSize: 12, color: '#999', marginBottom: 8 }}>已选中 {checkedKeys.size}</div>

      <div style={{ maxHeight: 400, overflowY: 'auto', border: '1px solid #f0f0f0', borderRadius: 4, padding: '0 12px' }}>
        {visibleTree.length === 0 ? (
          <div style={{ padding: 24, textAlign: 'center', color: '#999', fontSize: 13 }}>无匹配的目录分类</div>
        ) : (
          visibleTree.map(node => (
            <TreeNodeItem key={node.key} node={node} checkedKeys={checkedKeys} onCheck={handleCheck} expandedKeys={expandedKeys} onToggle={handleToggle} />
          ))
        )}
      </div>
    </Modal>
  );
}