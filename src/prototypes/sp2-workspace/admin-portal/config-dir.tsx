/**
 * @name 专业类型管理（列表页）
 */
import React from 'react';
import { useState } from 'react';
import { Typography, Button, Table, Tag, Card, Row, Col, Space, Select, Input, Modal, Checkbox, message } from 'antd';

interface TreeNode {
  label: string;
  key: string;
  code?: string;
  children?: TreeNode[];
}

const treeData: TreeNode[] = [
  {
    label: '工程技术服务', key: 'gc',
    children: [
      { label: '钻井工程', key: 'gc-zj', code: 'S0101000' },
      { label: '采油工程', key: 'gc-cy', code: 'S0102000' },
      { label: '油田技术服务', key: 'gc-yc', code: 'S0201000' },
    ],
  },
  {
    label: '地面建设服务', key: 'dm',
    children: [
      { label: '交通工程', key: 'dm-jt', code: 'S0401000' },
      {
        label: '管道工程', key: 'dm-gd',
        children: [
          { label: '管道安装', key: 'dm-gd-az', code: 'S0301000' },
          { label: '管道防腐', key: 'dm-gd-ff', code: 'S0501000' },
        ],
      },
      { label: '电力工程', key: 'dm-dl', code: 'S0301000' },
    ],
  },
  { label: '物业安保服务', key: 'wy', code: 'S0401000' },
];

function TreeNodeView({ node, level = 0, defaultExpanded, selectedKeys, onToggle }: {
  node: TreeNode; level?: number; defaultExpanded: boolean; selectedKeys: string[]; onToggle: (key: string) => void;
}) {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const hasChildren = node.children && node.children.length > 0;
  const isChecked = selectedKeys.includes(node.key);

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
        <Checkbox checked={isChecked} onClick={(e) => { e.stopPropagation(); onToggle(node.key); }} />
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

interface ProTypeItem {
  seq: number;
  name: string;
  createTime: string;
  catCount: number;
  memberCount: number;
  fieldCount: number;
  qualCount: number;
  status: string;
  description: string;
  instructions: string;
  catKeys: string[];
}

const initialData: ProTypeItem[] = [
  { seq: 1, name: '法律专业', createTime: '2020-06-22', catCount: 2, memberCount: 2, fieldCount: 4, qualCount: 3, status: '启用', description: '涵盖企业法律顾问、合同审查、知识产权、劳动法务等法律相关服务领域。', instructions: '', catKeys: ['gc-zj'] },
  { seq: 2, name: '钻井工程专业', createTime: '2020-06-22', catCount: 3, memberCount: 5, fieldCount: 6, qualCount: 5, status: '启用', description: '涵盖定向井、固井、钻井液等钻井相关技术服务领域的专业审核。', instructions: '', catKeys: ['gc-zj', 'gc-cy', 'gc-yc'] },
  { seq: 3, name: '检测检验专业', createTime: '2020-06-22', catCount: 0, memberCount: 0, fieldCount: 0, qualCount: 0, status: '停用', description: '涵盖产品检测、设备检验、质量认证等检测检验服务领域。', instructions: '', catKeys: [] },
];

export default function ConfigDir() {
  const [data, setData] = useState<ProTypeItem[]>(initialData);
  const [searchName, setSearchName] = useState('');
  const [searchStatus, setSearchStatus] = useState<string | undefined>(undefined);
  const [assocOpen, setAssocOpen] = useState(false);
  const [assocTarget, setAssocTarget] = useState<ProTypeItem | null>(null);
  const [assocKeys, setAssocKeys] = useState<string[]>([]);

  const filteredData = data.filter(d => {
    if (searchName && !d.name.includes(searchName)) return false;
    if (searchStatus && d.status !== searchStatus) return false;
    return true;
  });

  const handleReset = () => { setSearchName(''); setSearchStatus(undefined); };

  const handleToggleStatus = (record: ProTypeItem) => {
    setData(prev => prev.map(d => d.seq === record.seq ? { ...d, status: d.status === '启用' ? '停用' : '启用' } : d));
    message.success(`已${record.status === '启用' ? '停用' : '启用'}「${record.name}」`);
  };

  const handleDelete = (record: ProTypeItem) => {
    Modal.confirm({
      title: '确认删除',
      content: `确定要删除专业类型「${record.name}」吗？删除后不可恢复。`,
      okText: '确定',
      cancelText: '取消',
      okButtonProps: { danger: true },
      onOk: () => { setData(prev => prev.filter(d => d.seq !== record.seq)); message.success('已删除'); },
    });
  };

  const handleOpenAssoc = (record: ProTypeItem) => {
    setAssocTarget(record);
    setAssocKeys([...record.catKeys]);
    setAssocOpen(true);
  };

  const handleAssocToggle = (key: string) => {
    setAssocKeys(prev => prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]);
  };

  const handleAssocSave = () => {
    if (!assocTarget) return;
    setData(prev => prev.map(d => d.seq === assocTarget.seq ? { ...d, catKeys: [...assocKeys], catCount: assocKeys.length } : d));
    setAssocOpen(false);
    message.success(`已更新「${assocTarget.name}」的关联品类`);
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <Typography.Title level={4} style={{ margin: 0 }}>专业品类配置</Typography.Title>
        <Button type="primary" danger onClick={() => window.location.hash = '#/admin/config-dir-edit'}>+ 新建</Button>
      </div>

      <Card size="small" variant="outlined" style={{ marginBottom: 16 }}>
        <Row gutter={24} align="middle">
          <Col>
            <Space size={8}>
              <Typography.Text style={{ whiteSpace: 'nowrap' }}>专业名称</Typography.Text>
              <Input placeholder="请输入专业名称" style={{ width: 200 }} value={searchName} onChange={e => setSearchName(e.target.value)} />
            </Space>
          </Col>
          <Col>
            <Space size={8}>
              <Typography.Text style={{ whiteSpace: 'nowrap' }}>状态</Typography.Text>
              <Select style={{ width: 120 }} placeholder="全部" allowClear value={searchStatus} onChange={setSearchStatus} options={[{ value: '启用', label: '启用' }, { value: '停用', label: '停用' }]} />
            </Space>
          </Col>
          <Col>
            <Space size={8}>
              <Button type="primary" danger>查询</Button>
              <Button onClick={handleReset}>重置</Button>
            </Space>
          </Col>
        </Row>
      </Card>

      <Table
        columns={[
          { key: 'seq', title: '序号', width: 60, align: 'center' as const, dataIndex: 'seq' },
          { key: 'name', title: '专业类型名称', dataIndex: 'name', width: 140 },
          { key: 'description', title: '描述', dataIndex: 'description', ellipsis: true },
          { key: 'catCount', title: '关联品类', dataIndex: 'catCount', width: 90, align: 'center' as const, render: (val: number, record: ProTypeItem) => <Typography.Link style={{ color: '#ff4d4f' }} onClick={() => handleOpenAssoc(record)}>{val}</Typography.Link> },
          { key: 'memberCount', title: '审核成员', dataIndex: 'memberCount', width: 90, align: 'center' as const },
          { key: 'createTime', title: '创建时间', dataIndex: 'createTime', width: 120 },
          { key: 'status', title: '状态', dataIndex: 'status', width: 80, align: 'center' as const, render: (val: string) => <Tag color={val === '启用' ? 'success' : 'default'}>{val}</Tag> },
          {
            key: 'action', title: '操作', width: 220, align: 'center' as const,
            render: (_: unknown, record: ProTypeItem) => (
              <Space size={4}>
                <Typography.Link style={{ color: '#ff4d4f' }} onClick={() => window.location.hash = `#/admin/config-dir-edit?seq=${record.seq}`}>编辑</Typography.Link>
                <Typography.Text type="secondary">|</Typography.Text>
                <Typography.Link style={{ color: record.status === '启用' ? '#faad14' : '#52c41a' }} onClick={() => handleToggleStatus(record)}>{record.status === '启用' ? '停用' : '启用'}</Typography.Link>
                <Typography.Text type="secondary">|</Typography.Text>
                <Typography.Link style={{ color: '#ff4d4f' }} onClick={() => handleDelete(record)}>删除</Typography.Link>
              </Space>
            ),
          },
        ]}
        dataSource={filteredData} rowKey="seq" bordered size="middle"
        pagination={{ pageSize: 10, showTotal: (t) => `共 ${t} 条` }}
      />

      <Modal
        title={`关联服务品类 - ${assocTarget?.name || ''}`}
        open={assocOpen}
        onCancel={() => setAssocOpen(false)}
        onOk={handleAssocSave}
        okText="保存"
        cancelText="取消"
        width={500}
      >
        <Typography.Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 8 }}>勾选后该品类即为专业品类，一个品类只能关联一个专业类型</Typography.Text>
        {assocKeys.length > 0 && <Typography.Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 8 }}>已选择 {assocKeys.length} 个品类</Typography.Text>}
        <div style={{ border: '1px solid #f0f0f0', borderRadius: 4, padding: 8, maxHeight: 360, overflow: 'auto' }}>
          {treeData.map((node, i) => (
            <TreeNodeView key={i} node={node} defaultExpanded selectedKeys={assocKeys} onToggle={handleAssocToggle} />
          ))}
        </div>
      </Modal>
    </div>
  );
}
