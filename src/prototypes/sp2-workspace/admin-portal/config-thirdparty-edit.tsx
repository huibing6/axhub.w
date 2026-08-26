/**
 * @name 集成系统配置（编辑页）
 * 管理端 - 参数配置 - 集成系统配置 - 新建/编辑
 */
import React from 'react';
import { useState, useEffect } from 'react';
import { Typography, Input, Button, Card, Space, Checkbox, message, Divider } from 'antd';
import { categoryTreeData } from '../common/qualification-config';
import type { CategoryTreeNode } from '../common/qualification-config';

const mockData: Record<string, {
  name: string; code: string; apiUrl: string; status: string;
  description: string; categoryCodes: string[];
}> = {
  '1': {
    name: '钻井工程资质管理系统', code: 'ZJGC',
    apiUrl: 'https://zjgc.example.com/api/push', status: 'active',
    description: '钻井工程类服务商资质专业化管理平台，接收基础信息与资质数据进行专业化管理。',
    categoryCodes: ['S0101000', 'S0102000'],
  },
  '2': {
    name: '物化探服务管理系统', code: 'WHT-FW',
    apiUrl: 'https://wht.example.com/api/provider', status: 'active',
    description: '物化探类服务商专业化管理平台，含设备台账与作业资质管理。',
    categoryCodes: ['S0201000'],
  },
};

/* ─── 树节点组件 ─── */
function TreeNodeView({ node, level = 0, defaultExpanded, selectedKeys, onToggle }: {
  node: CategoryTreeNode; level?: number; defaultExpanded: boolean; selectedKeys: string[]; onToggle: (key: string) => void;
}) {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const hasChildren = node.children && node.children.length > 0;
  const isChecked = node.code ? selectedKeys.includes(node.code) : false;

  return (
    <div>
      <div
        style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '4px 8px', cursor: 'pointer', borderRadius: 4, paddingLeft: level * 20 }}
        onClick={(e) => { e.stopPropagation(); if (hasChildren) setExpanded(!expanded); }}
      >
        {hasChildren ? (
          <span style={{ transform: expanded ? 'rotate(90deg)' : 'none', display: 'inline-block', transition: 'transform 0.2s', color: '#bfbfbf', width: 12, height: 12, fontSize: 10 }}>&#9654;</span>
        ) : (
          <span style={{ width: 12 }} />
        )}
        {node.code && <Checkbox checked={isChecked} onClick={(e) => { e.stopPropagation(); onToggle(node.code!); }} />}
        <Typography.Text style={{ fontSize: 14 }}>{node.label}</Typography.Text>
        {node.code && <Typography.Text type="secondary" style={{ fontSize: 12 }}>({node.code})</Typography.Text>}
      </div>
      {expanded && hasChildren && (
        <div>
          {node.children!.map((child, i) => (
            <TreeNodeView key={i} node={child} level={level + 1} defaultExpanded={defaultExpanded} selectedKeys={selectedKeys} onToggle={onToggle} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function ConfigThirdpartyEdit() {
  const hash = window.location.hash;
  const params = hash.includes('?') ? new URLSearchParams(hash.split('?')[1]) : null;
  const editId = params?.get('id');
  const isEdit = !!editId;

  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [apiUrl, setApiUrl] = useState('');
  const [description, setDescription] = useState('');
  const [categoryCodes, setCategoryCodes] = useState<string[]>([]);

  useEffect(() => {
    if (isEdit && editId && mockData[editId]) {
      const d = mockData[editId];
      setName(d.name);
      setCode(d.code);
      setApiUrl(d.apiUrl);
      setDescription(d.description);
      setCategoryCodes(d.categoryCodes);
    }
  }, [editId, isEdit]);

  const handleToggleCat = (key: string) => {
    setCategoryCodes(prev => prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]);
  };

  const handleSave = () => {
    if (!name || !code || !apiUrl) {
      message.warning('请填写系统名称、系统编码和接口地址');
      return;
    }
    message.success(isEdit ? '集成系统配置已更新' : '集成系统配置已创建');
    window.location.hash = '#/admin/config-thirdparty';
  };

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
        <Button onClick={() => window.location.hash = '#/admin/config-thirdparty'}>← 返回列表</Button>
        <Typography.Title level={4} style={{ margin: 0 }}>
          {isEdit ? '编辑集成系统' : '新建集成系统'}
        </Typography.Title>
      </div>

      <Card variant="outlined" size="small" title="基本信息" style={{ marginBottom: 16 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
          <div>
            <Typography.Text style={{ fontSize: 13, display: 'block', marginBottom: 6 }}>
              系统名称 <span style={{ color: '#ff4d4f' }}>*</span>
            </Typography.Text>
            <Input
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="请输入集成系统名称"
            />
          </div>
          <div>
            <Typography.Text style={{ fontSize: 13, display: 'block', marginBottom: 6 }}>
              系统编码 <span style={{ color: '#ff4d4f' }}>*</span>
            </Typography.Text>
            <Input
              value={code}
              onChange={e => setCode(e.target.value)}
              placeholder="请输入系统编码（英文大写）"
              disabled={isEdit}
            />
          </div>
        </div>
        <div style={{ marginTop: 16 }}>
          <Typography.Text style={{ fontSize: 13, display: 'block', marginBottom: 6 }}>
            接口地址 <span style={{ color: '#ff4d4f' }}>*</span>
          </Typography.Text>
          <Input
            value={apiUrl}
            onChange={e => setApiUrl(e.target.value)}
            placeholder="https://example.com/api/push"
          />
        </div>
        <div style={{ marginTop: 16 }}>
          <Typography.Text style={{ fontSize: 13, display: 'block', marginBottom: 6 }}>说明</Typography.Text>
          <Input.TextArea
            value={description}
            onChange={e => setDescription(e.target.value)}
            rows={3}
            placeholder="请输入集成系统说明"
          />
        </div>
      </Card>

      <Card variant="outlined" size="small" title="关联服务品类" style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <Typography.Text type="secondary" style={{ fontSize: 13 }}>
            选择该集成系统关联的服务品类。服务商注册时选择以下品类并通过中油物采审核后，将自动推送基础信息与品类数据至本系统接口。
          </Typography.Text>
          {categoryCodes.length > 0 && <Typography.Text type="secondary" style={{ fontSize: 12 }}>已选择 {categoryCodes.length} 个品类</Typography.Text>}
        </div>
        <div style={{ border: '1px solid #f0f0f0', borderRadius: 4, padding: 8, maxHeight: 320, overflow: 'auto' }}>
          {categoryTreeData.map((node, i) => (
            <TreeNodeView key={i} node={node} defaultExpanded selectedKeys={categoryCodes} onToggle={handleToggleCat} />
          ))}
        </div>
      </Card>

      <Divider />

      <Space>
        <Button type="primary" danger onClick={handleSave}>
          {isEdit ? '保存修改' : '创建集成系统'}
        </Button>
        <Button onClick={() => window.location.hash = '#/admin/config-thirdparty'}>取消</Button>
      </Space>
    </>
  );
}
