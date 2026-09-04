/**
 * @name 参数配置
 */
import React from 'react';
import { useState } from 'react';
import { theme, Typography, Input, Button, Table, Tabs, Card, Space, Row, Col, Tag, Switch, Select, Modal, Checkbox, message, Form } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { categoryQualConfig, type QualAttachItem } from '../common/qualification-config';

/* ================================================================
   Tab 1: 专业服务品类配置
   ================================================================ */

interface TreeNode {
  label: string;
  key: string;
  code?: string;
  children?: TreeNode[];
  tag?: string;
  isLeaf?: boolean;
}

const treeData: TreeNode[] = [
  {
    label: '工程技术服务', key: 'gc',
    children: [
      { label: '钻井工程', key: 'gc-zj', code: 'S0101000', tag: '专业' },
      { label: '采油工程', key: 'gc-cy', code: 'S0102000', tag: '专业' },
      { label: '油田技术服务', key: 'gc-yc', code: 'S0201000', tag: '专业' },
    ],
  },
  {
    label: '地面建设服务', key: 'dm',
    children: [
      { label: '交通工程', key: 'dm-jt', code: 'S0401000' },
      {
        label: '管道工程', key: 'dm-gd',
        children: [
          { label: '管道安装', key: 'dm-gd-az', code: 'S0301000', isLeaf: true },
          { label: '管道防腐', key: 'dm-gd-ff', code: 'S0501000', isLeaf: true },
        ],
      },
      { label: '电力工程', key: 'dm-dl', code: 'S0301000' },
    ],
  },
  { label: '物业安保服务', key: 'wy', code: 'S0401000' },
];

interface CategoryItem {
  key: string;
  label: string;
  code: string;
  checked?: boolean;
}

interface MemberItem {
  name: string;
  empNo: string;
  dept: string;
}

interface ProTypeItem {
  seq: number;
  name: string;
  createTime: string;
  catCount: number;
  memberCount: number;
  status: string;
  categories: CategoryItem[];
  members: MemberItem[];
}

const initialTypeData: ProTypeItem[] = [
  { seq: 1, name: '法律专业', createTime: '2020-06-22', catCount: 26, memberCount: 2, status: '启用', categories: [], members: [] },
  { seq: 2, name: '钻井工程专业', createTime: '2020-06-22', catCount: 26, memberCount: 5, status: '启用', categories: [], members: [] },
  { seq: 3, name: '钻井工程专业', createTime: '2020-06-22', catCount: 0, memberCount: 0, status: '停用', categories: [], members: [] },
];

function TreeNodeView({ node, level = 0, defaultExpanded, selectable = false, selectedKeys = [], onSelect }: {
  node: TreeNode; level?: number; defaultExpanded: boolean; selectable?: boolean; selectedKeys?: string[]; onSelect?: (key: string) => void;
}) {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const hasChildren = node.children && node.children.length > 0;
  const isSelected = selectedKeys.includes(node.key);

  return (
    <div>
      <div
        style={{
          display: 'flex', alignItems: 'center', gap: 4, padding: '4px 8px', cursor: 'pointer',
          borderRadius: 4, paddingLeft: level * 16, background: isSelected ? '#fff1f0' : undefined,
        }}
        onClick={(e) => {
          e.stopPropagation();
          if (hasChildren) setExpanded(!expanded);
          if (selectable && onSelect) onSelect(node.key);
        }}
      >
        {hasChildren ? (
          <span style={{ transform: expanded ? 'rotate(90deg)' : 'none', display: 'inline-block', transition: 'transform 0.2s', color: '#bfbfbf', width: 12, height: 12, fontSize: 10 }}>&#9654;</span>
        ) : (
          <span style={{ width: 12, height: 12, display: 'inline-block' }} />
        )}
        {selectable ? (
          <Checkbox checked={isSelected} />
        ) : (
          <input type="checkbox" style={{ width: 14, height: 14 }} />
        )}
        <Typography.Text style={{ fontSize: 14 }}>{node.label}</Typography.Text>
        {node.tag && (
          <Tag color="#ff4d4f" style={{ fontSize: 12, margin: 0, marginLeft: 4 }}>{node.tag}</Tag>
        )}
      </div>
      {expanded && hasChildren && (
        <div>
          {node.children!.map((child, i) => (
            <TreeNodeView key={i} node={child} level={level + 1} defaultExpanded={defaultExpanded} selectable={selectable} selectedKeys={selectedKeys} onSelect={onSelect} />
          ))}
        </div>
      )}
    </div>
  );
}

function CategoryTreeSelector({ selectedKeys, onSelect }: { selectedKeys: string[]; onSelect: (keys: string[]) => void }) {
  const [allExpanded, setAllExpanded] = useState(true);

  const handleSelect = (key: string) => {
    if (selectedKeys.includes(key)) {
      onSelect(selectedKeys.filter(k => k !== key));
    } else {
      onSelect([...selectedKeys, key]);
    }
  };

  return (
    <div style={{ border: '1px solid #f0f0f0', borderRadius: 4, padding: 8, maxHeight: 300, overflow: 'auto' }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 8 }}>
        <Space size={8}>
          <Typography.Link style={{ fontSize: 12 }} onClick={() => setAllExpanded(true)}>全部展开</Typography.Link>
          <Typography.Text type="secondary" style={{ fontSize: 12, cursor: 'pointer' }} onClick={() => setAllExpanded(false)}>全部收起</Typography.Text>
        </Space>
      </div>
      {treeData.map((node, i) => (
        <TreeNodeView key={`${i}-${allExpanded}`} node={node} level={0} defaultExpanded={allExpanded} selectable selectedKeys={selectedKeys} onSelect={handleSelect} />
      ))}
    </div>
  );
}

function MemberSelector({ members, onAdd, onRemove }: { members: MemberItem[]; onAdd: (m: MemberItem) => void; onRemove: (idx: number) => void }) {
  const [name, setName] = useState('');
  const [empNo, setEmpNo] = useState('');
  const [dept, setDept] = useState('');

  const handleAdd = () => {
    if (name && empNo) {
      onAdd({ name, empNo, dept });
      setName('');
      setEmpNo('');
      setDept('');
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        <Input placeholder="姓名" value={name} onChange={e => setName(e.target.value)} style={{ width: 120 }} />
        <Input placeholder="员工编号" value={empNo} onChange={e => setEmpNo(e.target.value)} style={{ width: 120 }} />
        <Input placeholder="部门" value={dept} onChange={e => setDept(e.target.value)} style={{ width: 120 }} />
        <Button type="link" onClick={handleAdd}>添加</Button>
      </div>
      <Table
        columns={[
          { key: 'name', title: '姓名', dataIndex: 'name' },
          { key: 'empNo', title: '员工编号', dataIndex: 'empNo' },
          { key: 'dept', title: '部门', dataIndex: 'dept' },
          { key: 'action', title: '操作', width: 80, render: (_: unknown, __: unknown, index: number) => <Typography.Link style={{ color: '#ff4d4f' }} onClick={() => onRemove(index)}>移除</Typography.Link> },
        ]}
        dataSource={members.map((m, i) => ({ ...m, _key: i }))}
        rowKey="_key" bordered size="middle" pagination={false}
      />
    </div>
  );
}

function DirConfigTab() {
  const [isProDir, setIsProDir] = useState(true);
  const [subTab, setSubTab] = useState('type');
  const [allExpanded, setAllExpanded] = useState(true);
  const [typeData, setTypeData] = useState<ProTypeItem[]>(initialTypeData);

  const [selectedKey, setSelectedKey] = useState<string>('gc-zj');
  const findNode = (nodes: TreeNode[], key: string): TreeNode | undefined => {
    for (const n of nodes) {
      if (n.key === key) return n;
      if (n.children) {
        const found = findNode(n.children, key);
        if (found) return found;
      }
    }
    return undefined;
  };
  const selectedNode = findNode(treeData, selectedKey);
  const selectedCode = selectedNode?.code || '';
  const [qualAttachMap, setQualAttachMap] = useState<Record<string, QualAttachItem[]>>(() =>
    Object.fromEntries(Object.entries(categoryQualConfig).map(([k, v]) => [k, v.map(i => ({ ...i }))]))
  );
  const qualAttach = qualAttachMap[selectedCode] || [];

  const updateQualAttach = (items: QualAttachItem[]) => {
    setQualAttachMap(prev => ({ ...prev, [selectedCode]: items }));
  };
  const addQualAttach = () => {
    updateQualAttach([...qualAttach, { name: '', required: true, desc: '' }]);
  };
  const patchQualAttach = (idx: number, patch: Partial<QualAttachItem>) => {
    updateQualAttach(qualAttach.map((it, i) => i === idx ? { ...it, ...patch } : it));
  };
  const removeQualAttach = (idx: number) => {
    updateQualAttach(qualAttach.filter((_, i) => i !== idx));
  };

  const [catModalOpen, setCatModalOpen] = useState(false);
  const [catModalData, setCatModalData] = useState<CategoryItem[]>([]);
  const [memberModalOpen, setMemberModalOpen] = useState(false);
  const [memberModalData, setMemberModalData] = useState<MemberItem[]>([]);
  const [createModalOpen, setCreateModalOpen] = useState(false);

  const [createName, setCreateName] = useState('');
  const [createSelectedCats, setCreateSelectedCats] = useState<string[]>([]);
  const [createMembers, setCreateMembers] = useState<MemberItem[]>([]);

  const [assocModalOpen, setAssocModalOpen] = useState(false);
  const [assocSelectedCats, setAssocSelectedCats] = useState<string[]>([]);
  const [assocTargetSeq, setAssocTargetSeq] = useState<number>(0);

  const [editMemberModalOpen, setEditMemberModalOpen] = useState(false);
  const [editMembers, setEditMembers] = useState<MemberItem[]>([]);
  const [editTargetSeq, setEditTargetSeq] = useState<number>(0);

  const handleOpenCatModal = (record: ProTypeItem) => {
    const cats: CategoryItem[] = [
      { key: 'gc-zj', label: '钻井工程', code: 'S100010' },
      { key: 'gc-cy', label: '采油工程', code: 'S100011' },
      { key: 'gc-yc', label: '油田技术服务', code: 'S100012' },
    ].slice(0, record.catCount > 0 ? Math.min(record.catCount, 3) : 0);
    setCatModalData(cats);
    setCatModalOpen(true);
  };

  const handleOpenMemberModal = (record: ProTypeItem) => {
    const members: MemberItem[] = [
      { name: '王建国', empNo: 'T0345123', dept: '专业管理部' },
      { name: '李明', empNo: 'T0345124', dept: '专业管理部' },
    ].slice(0, record.memberCount > 0 ? Math.min(record.memberCount, 2) : 0);
    setMemberModalData(members);
    setMemberModalOpen(true);
  };

  const handleCreate = () => {
    if (!createName) return;
    const newType: ProTypeItem = {
      seq: typeData.length + 1,
      name: createName,
      createTime: new Date().toISOString().slice(0, 10),
      catCount: createSelectedCats.length,
      memberCount: createMembers.length,
      status: '启用',
      categories: [],
      members: [...createMembers],
    };
    setTypeData([...typeData, newType]);
    setCreateName('');
    setCreateSelectedCats([]);
    setCreateMembers([]);
    setCreateModalOpen(false);
  };

  const handleOpenAssocModal = (record: ProTypeItem) => {
    setAssocTargetSeq(record.seq);
    setAssocSelectedCats([]);
    setAssocModalOpen(true);
  };

  const handleAssocConfirm = () => {
    setTypeData(prev => prev.map(d =>
      d.seq === assocTargetSeq ? { ...d, catCount: d.catCount + assocSelectedCats.length } : d
    ));
    setAssocModalOpen(false);
  };

  const handleOpenEditMemberModal = (record: ProTypeItem) => {
    setEditTargetSeq(record.seq);
    setEditMembers([...record.members]);
    setEditMemberModalOpen(true);
  };

  const handleEditMemberConfirm = () => {
    setTypeData(prev => prev.map(d =>
      d.seq === editTargetSeq ? { ...d, memberCount: editMembers.length, members: [...editMembers] } : d
    ));
    setEditMemberModalOpen(false);
  };

  const handleToggleStatus = (record: ProTypeItem) => {
    setTypeData(prev => prev.map(d =>
      d.seq === record.seq ? { ...d, status: d.status === '启用' ? '停用' : '启用' } : d
    ));
  };

  const handleDelete = (record: ProTypeItem) => {
    Modal.confirm({
      title: '确认删除',
      content: `确定要删除专业类型"${record.name}"吗？`,
      okText: '确定',
      cancelText: '取消',
      onOk: () => { setTypeData(prev => prev.filter(d => d.seq !== record.seq)); },
    });
  };

  return (
    <div>
      <Row gutter={16}>
        <Col span={6}>
          <Card size="small" variant="outlined" style={{ height: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <Typography.Text strong style={{ fontSize: 14 }}>服务品类</Typography.Text>
              <Space size={8}>
                <Typography.Link style={{ fontSize: 12 }} onClick={() => setAllExpanded(true)}>全部展开</Typography.Link>
                <Typography.Text type="secondary" style={{ fontSize: 12, cursor: 'pointer' }} onClick={() => setAllExpanded(false)}>全部收起</Typography.Text>
              </Space>
            </div>
            <div style={{ marginBottom: 12 }}>
              <Input placeholder="搜索目录名称.." />
            </div>
            <div>
              {treeData.map((node, i) => (
                <TreeNodeView key={`${i}-${allExpanded}`} node={node} level={0} defaultExpanded={allExpanded} selectable selectedKeys={[selectedKey]} onSelect={(key) => { setSelectedKey(key); const n = findNode(treeData, key); setIsProDir(!!(n && (n.tag === '专业' || (n.children && n.children.some(c => c.tag === '专业'))))); }} />
              ))}
            </div>
            <div style={{ marginTop: 16 }}>
              <Typography.Text type="secondary" style={{ fontSize: 12 }}>共 18 个目录，其中 4 个已标记为专业品类</Typography.Text>
            </div>
          </Card>
        </Col>
        <Col span={18}>
          <Card size="small" variant="outlined">
            <Tabs
              activeKey={subTab}
              onChange={setSubTab}
              items={[
                {
                  key: 'category',
                  label: '目录品类设置',
                  children: (
                    <div>
                      <div style={{ marginBottom: 20 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                          <div style={{ width: 4, height: 16, borderRadius: 4, background: '#ff4d4f' }} />
                          <Typography.Text strong style={{ fontSize: 14 }}>基本信息</Typography.Text>
                        </div>
                        <Row gutter={16}>
                          <Col span={12}><Space size={8} style={{ width: '100%' }}><Typography.Text style={{ width: 96, textAlign: 'right', fontSize: 14 }}>目录名称</Typography.Text><Input value={selectedNode?.label || ''} readOnly style={{ background: '#f5f5f5', flex: 1 }} /></Space></Col>
                          <Col span={12}><Space size={8} style={{ width: '100%' }}><Typography.Text style={{ width: 96, textAlign: 'right', fontSize: 14 }}>目录编码</Typography.Text><Input value={selectedNode?.code || '-'} readOnly style={{ background: '#f5f5f5', flex: 1 }} /></Space></Col>
                          <Col span={12}><Space size={8} style={{ width: '100%' }}><Typography.Text style={{ width: 96, textAlign: 'right', fontSize: 14 }}>上级目录</Typography.Text><Input value="工程技术服务" readOnly style={{ background: '#f5f5f5', flex: 1 }} /></Space></Col>
                          <Col span={12}><Space size={8} style={{ width: '100%' }}><Typography.Text style={{ width: 96, textAlign: 'right', fontSize: 14 }}>目录级别</Typography.Text><Input value="2级" readOnly style={{ background: '#f5f5f5', flex: 1 }} /></Space></Col>
                        </Row>
                      </div>
                      <div style={{ marginBottom: 20 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                          <div style={{ width: 4, height: 16, borderRadius: 4, background: '#ff4d4f' }} />
                          <Typography.Text strong style={{ fontSize: 14 }}>专业品类配置</Typography.Text>
                        </div>
                        <Space size={12} style={{ marginBottom: 16 }}>
                          <Typography.Text style={{ fontSize: 14 }}>是否标记为专业品类</Typography.Text>
                          <Switch checked={isProDir} onChange={setIsProDir} />
                        </Space>
                        <Row gutter={16}>
                          <Col span={24}>
                            <Space size={8} style={{ width: '100%' }}>
                              <Typography.Text style={{ width: 112, textAlign: 'right', fontSize: 14 }}>
                                <Typography.Text style={{ color: '#ff4d4f' }}>*</Typography.Text>选择专业类型
                              </Typography.Text>
                              <Select style={{ flex: 1 }} placeholder="请选择专业类型" defaultValue="钻井工程专业"
                                options={typeData.filter(d => d.status === '启用').map(d => ({ value: d.name, label: d.name }))} />
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
                        <Typography.Text style={{ color: '#ff4d4f', fontSize: 12 }}>标记为专业品类后，该目录将进入专业审核流程，需要指定对应的审核小组</Typography.Text>
                      </div>

                      {/* 资质附件配置 */}
                      <div style={{ marginBottom: 20 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                          <div style={{ width: 4, height: 16, borderRadius: 4, background: '#ff4d4f' }} />
                          <Typography.Text strong style={{ fontSize: 14 }}>资质附件配置</Typography.Text>
                          <Typography.Text type="secondary" style={{ fontSize: 12 }}>服务商在该目录下选择服务品类后，需按此清单上传资质附件</Typography.Text>
                        </div>
                        {isProDir ? (
                          <div>
                            <Table
                              columns={[
                                {
                                  key: 'name', title: <span><span style={{ color: '#ff4d4f' }}>*</span> 文件名称</span>, width: 260,
                                  render: (_: unknown, __: unknown, idx: number) => (
                                    <Input size="small" placeholder="请输入资质文件名称" value={qualAttach[idx]?.name || ''} onChange={e => patchQualAttach(idx, { name: e.target.value })} />
                                  ),
                                },
                                {
                                  key: 'required', title: '是否必填', width: 100, align: 'center' as const,
                                  render: (_: unknown, __: unknown, idx: number) => (
                                    <Checkbox checked={!!qualAttach[idx]?.required} onChange={e => patchQualAttach(idx, { required: e.target.checked })} />
                                  ),
                                },
                                {
                                  key: 'desc', title: '说明', width: 300,
                                  render: (_: unknown, __: unknown, idx: number) => (
                                    <Input size="small" placeholder="填写该附件的用途说明" value={qualAttach[idx]?.desc || ''} onChange={e => patchQualAttach(idx, { desc: e.target.value })} />
                                  ),
                                },
                                {
                                  key: 'action', title: '操作', width: 80, align: 'center' as const,
                                  render: (_: unknown, __: unknown, idx: number) => <Typography.Link style={{ color: '#ff4d4f' }} onClick={() => removeQualAttach(idx)}>删除</Typography.Link>,
                                },
                              ]}
                              dataSource={qualAttach.map((it, i) => ({ ...it, _key: i }))}
                              rowKey="_key" bordered size="middle" pagination={false} locale={{ emptyText: '暂未配置资质附件' }}
                            />
                            <div style={{ marginTop: 12 }}>
                              <Button type="dashed" icon={<PlusOutlined />} onClick={addQualAttach}>添加资质附件</Button>
                            </div>
                          </div>
                        ) : (
                          <Typography.Text type="secondary" style={{ fontSize: 13 }}>通用品类无需上传资质附件，如需服务商上传请先标记为专业品类。</Typography.Text>
                        )}
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 12, borderTop: '1px solid #f0f0f0' }}>
                        <Typography.Text type="secondary" style={{ fontSize: 12 }}>上次保存：2025-06-20 15:30</Typography.Text>
                        <Space size={12}>
                          <Button>取消</Button>
                          <Button>预览配置</Button>
                          <Button type="primary" danger onClick={() => message.success(`已保存「${selectedNode?.label || ''}」的目录及资质附件配置`)}>保存配置</Button>
                        </Space>
                      </div>
                    </div>
                  ),
                },
                {
                  key: 'type',
                  label: <span style={{ color: subTab === 'type' ? '#ff4d4f' : undefined }}>专业类型设置</span>,
                  children: (
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                        <div style={{ width: 4, height: 16, borderRadius: 4, background: '#ff4d4f' }} />
                        <Typography.Text strong style={{ fontSize: 14 }}>已创建专业类型</Typography.Text>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
                        <Button type="primary" danger onClick={() => setCreateModalOpen(true)}>+ 创建</Button>
                      </div>
                      <Table
                        columns={[
                          { key: 'name', title: '专业类型名称', dataIndex: 'name', width: 150 },
                          { key: 'createTime', title: '创建时间', dataIndex: 'createTime', width: 120 },
                          {
                            key: 'catCount', title: '专业服务品类数量', dataIndex: 'catCount', width: 140, align: 'center' as const,
                            render: (val: number, record: ProTypeItem) => <Typography.Link style={{ color: '#ff4d4f' }} onClick={() => handleOpenCatModal(record)}>{val}</Typography.Link>,
                          },
                          {
                            key: 'memberCount', title: '审核成员', dataIndex: 'memberCount', width: 100, align: 'center' as const,
                            render: (val: number, record: ProTypeItem) => <Typography.Link style={{ color: '#ff4d4f' }} onClick={() => handleOpenMemberModal(record)}>{val}</Typography.Link>,
                          },
                          { key: 'status', title: '状态', dataIndex: 'status', width: 80, align: 'center' as const, render: (val: string) => <Tag color={val === '启用' ? 'success' : 'default'}>{val}</Tag> },
                          {
                            key: 'action', title: '操作', width: 320,
                            render: (_: unknown, record: ProTypeItem) => (
                              <Space size={4} wrap>
                                <Typography.Link style={{ color: '#ff4d4f' }} onClick={() => handleToggleStatus(record)}>{record.status === '启用' ? '停用' : '启用'}</Typography.Link>
                                <Typography.Text type="secondary">,</Typography.Text>
                                <Typography.Link style={{ color: '#ff4d4f' }} onClick={() => handleOpenAssocModal(record)}>关联品类</Typography.Link>
                                <Typography.Text type="secondary">,</Typography.Text>
                                <Typography.Link style={{ color: '#ff4d4f' }} onClick={() => handleOpenAssocModal(record)}>编辑关联品类</Typography.Link>
                                <Typography.Text type="secondary">,</Typography.Text>
                                <Typography.Link style={{ color: '#ff4d4f' }} onClick={() => handleOpenEditMemberModal(record)}>编辑审核成员</Typography.Link>
                                <Typography.Text type="secondary">,</Typography.Text>
                                <Typography.Link style={{ color: '#ff4d4f' }} onClick={() => handleDelete(record)}>删除</Typography.Link>
                              </Space>
                            ),
                          },
                        ]}
                        dataSource={typeData} rowKey="seq" bordered size="middle" pagination={false}
                      />
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 16, marginTop: 16, borderTop: '1px solid #f0f0f0' }}>
                        <Typography.Text type="secondary" style={{ fontSize: 12 }}>上次保存：2025-06-20 15:30</Typography.Text>
                        <Space size={12}>
                          <Button>取消</Button>
                          <Button>预览配置</Button>
                          <Button type="primary" danger>保存配置</Button>
                        </Space>
                      </div>
                    </div>
                  ),
                },
              ]}
            />
          </Card>
        </Col>
      </Row>

      <Modal title="专业服务品类数量" open={catModalOpen} onCancel={() => setCatModalOpen(false)} footer={null} width={500}>
        <Table
          columns={[
            { key: 'label', title: '服务品类名称', dataIndex: 'label' },
            { key: 'code', title: '服务品类编码', dataIndex: 'code' },
            { key: 'action', title: '操作', width: 80, render: () => <Typography.Link style={{ color: '#ff4d4f' }}>移除</Typography.Link> },
          ]}
          dataSource={catModalData} rowKey="key" bordered size="middle" pagination={false}
        />
      </Modal>

      <Modal title="审核成员" open={memberModalOpen} onCancel={() => setMemberModalOpen(false)} footer={null} width={500}>
        <Table
          columns={[
            { key: 'name', title: '姓名', dataIndex: 'name' },
            { key: 'empNo', title: '员工编号', dataIndex: 'empNo' },
            { key: 'dept', title: '部门', dataIndex: 'dept' },
            { key: 'action', title: '操作', width: 80, render: () => <Typography.Link style={{ color: '#ff4d4f' }}>移除</Typography.Link> },
          ]}
          dataSource={memberModalData.map((m, i) => ({ ...m, _key: i }))} rowKey="_key" bordered size="middle" pagination={false}
        />
      </Modal>

      <Modal title="创建专业类型" open={createModalOpen} onCancel={() => setCreateModalOpen(false)} onOk={handleCreate} okText="确认" cancelText="取消" width={700}>
        <div style={{ marginBottom: 16 }}>
          <Space size={8} style={{ marginBottom: 12 }}><Typography.Text style={{ color: '#ff4d4f' }}>*</Typography.Text><Typography.Text>专业类型名称</Typography.Text></Space>
          <Input placeholder="请输入专业类型名称" value={createName} onChange={e => setCreateName(e.target.value)} />
        </div>
        <div style={{ marginBottom: 16 }}>
          <Space size={8} style={{ marginBottom: 12 }}><Typography.Text style={{ color: '#ff4d4f' }}>*</Typography.Text><Typography.Text>关联服务品类</Typography.Text></Space>
          <CategoryTreeSelector selectedKeys={createSelectedCats} onSelect={setCreateSelectedCats} />
          {createSelectedCats.length > 0 && <div style={{ marginTop: 8 }}><Typography.Text type="secondary" style={{ fontSize: 12 }}>已选择 {createSelectedCats.length} 个品类</Typography.Text></div>}
        </div>
        <div>
          <Space size={8} style={{ marginBottom: 12 }}><Typography.Text style={{ color: '#ff4d4f' }}>*</Typography.Text><Typography.Text>审核成员</Typography.Text></Space>
          <MemberSelector members={createMembers} onAdd={m => setCreateMembers([...createMembers, m])} onRemove={idx => setCreateMembers(createMembers.filter((_, i) => i !== idx))} />
        </div>
      </Modal>

      <Modal title="关联服务品类" open={assocModalOpen} onCancel={() => setAssocModalOpen(false)} onOk={handleAssocConfirm} okText="确认" cancelText="取消" width={600}>
        <CategoryTreeSelector selectedKeys={assocSelectedCats} onSelect={setAssocSelectedCats} />
        {assocSelectedCats.length > 0 && <div style={{ marginTop: 8 }}><Typography.Text type="secondary" style={{ fontSize: 12 }}>已选择 {assocSelectedCats.length} 个品类</Typography.Text></div>}
      </Modal>

      <Modal title="编辑审核成员" open={editMemberModalOpen} onCancel={() => setEditMemberModalOpen(false)} onOk={handleEditMemberConfirm} okText="确认" cancelText="取消" width={600}>
        <MemberSelector members={editMembers} onAdd={m => setEditMembers([...editMembers, m])} onRemove={idx => setEditMembers(editMembers.filter((_, i) => i !== idx))} />
      </Modal>
    </div>
  );
}

/* ================================================================
   Tab 2: 要件配置
   ================================================================ */
const allDocData = [
  { seq: 1, type: '服务商新增', noApproval: false },
  { seq: 2, type: '公开招标采购项目中标', noApproval: false },
  { seq: 3, type: '服务商更名', noApproval: false },
  { seq: 4, type: '所属企业评审增项', noApproval: false },
  { seq: 5, type: '服务商更名审核', noApproval: false },
];

function DocConfigTab() {
  const [selectedType, setSelectedType] = useState<string | undefined>(undefined);
  const [data, setData] = useState(allDocData);

  const handleReset = () => { setSelectedType(undefined); setData(allDocData); };
  const handleToggle = (seq: number) => { setData(prev => prev.map(d => d.seq === seq ? { ...d, noApproval: !d.noApproval } : d)); };

  const filteredData = selectedType ? data.filter(d => d.type === selectedType) : data;

  return (
    <div>
      <Card size="small" variant="outlined" style={{ marginBottom: 16 }}>
        <Row gutter={24} align="middle">
          <Col>
            <Space size={8}>
              <Typography.Text style={{ whiteSpace: 'nowrap' }}>工作单类型：</Typography.Text>
              <Select style={{ width: 200 }} placeholder="请选择" allowClear value={selectedType} onChange={setSelectedType} options={allDocData.map(d => ({ value: d.type, label: d.type }))} />
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
          { key: 'type', title: '工作单类型', dataIndex: 'type', width: 300 },
          { key: 'noApproval', title: '不审批走备案', dataIndex: 'noApproval', width: 150, align: 'center' as const, render: (val: boolean, record) => <Checkbox checked={val} onChange={() => handleToggle(record.seq)} /> },
          { key: 'action', title: '操作', width: 100, render: () => <Typography.Link style={{ color: '#ff4d4f' }}>设置</Typography.Link> },
        ]}
        dataSource={filteredData} rowKey="seq" bordered size="middle" pagination={false}
      />
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 16, marginTop: 16, borderTop: '1px solid #f0f0f0' }}>
        <Typography.Text type="secondary" style={{ fontSize: 12 }}>上次保存：2025-06-20 15:30</Typography.Text>
        <Space size={12}>
          <Button>取消</Button>
          <Button type="primary" danger>保存配置</Button>
        </Space>
      </div>
    </div>
  );
}

/* ================================================================
   Tab 3: 冻结资质文件设定
   ================================================================ */
const freezeTabItems = [
  { key: 'supplier', label: '供应商资质类型冻结参数设置' },
  { key: 'region', label: '地区公司资质自动冻结设定' },
];

const leftColumns = [
  { name: '企业营业执照', checked: true },
  { name: '组织机构代码证', checked: false },
  { name: '税务登记证', checked: false },
  { name: '代理授权证书', checked: false },
  { name: '银行开户证明', checked: false },
  { name: '银行资信证明', checked: false },
  { name: '获奖证书', checked: false },
  { name: '质量管理体系认证证书', checked: true },
  { name: '权威机构颁发的证书', checked: false },
];

const rightColumns = [
  { name: '近三年销售业绩清单', checked: false },
  { name: '相关生产许可证(如需)', checked: false },
  { name: '检验报告/出厂合格证(如需)', checked: false },
  { name: '变更核准通知书', checked: false },
  { name: '安全管理体系认证证书', checked: true },
  { name: '环保管理体系认证证书', checked: true },
    { name: '供应商承诺书', checked: false },
  { name: '统一社会信用代码证', checked: true },
  { name: '其它材料', checked: false },
];

function FreezeDocTab() {
  const [activeTab, setActiveTab] = useState('supplier');
  const [leftChecked, setLeftChecked] = useState<Record<number, boolean>>(
    Object.fromEntries(leftColumns.map((c, i) => [i, c.checked]))
  );
  const [rightChecked, setRightChecked] = useState<Record<number, boolean>>(
    Object.fromEntries(rightColumns.map((c, i) => [i, c.checked]))
  );
  const { token: t } = theme.useToken();

  return (
    <div>
      <Card size="small" variant="outlined">
        <Tabs activeKey={activeTab} onChange={setActiveTab} items={freezeTabItems} />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, marginTop: 16 }}>
          <div>
            <table style={{ width: '100%', fontSize: 14, borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: t.colorBgLayout }}>
                  <th style={{ padding: '10px 16px', fontWeight: 'bold', textAlign: 'left', borderBottom: '1px solid ' + t.colorBorderSecondary }}>供应商资质类型名称</th>
                  <th style={{ padding: '10px 16px', fontWeight: 'bold', textAlign: 'center', borderBottom: '1px solid ' + t.colorBorderSecondary }}>是否自动冻结</th>
                </tr>
              </thead>
              <tbody>
                {leftColumns.map((col, i) => (
                  <tr key={i} style={{ background: i % 2 === 0 ? '#FAFAFA' : 'transparent' }}>
                    <td style={{ padding: '10px 16px', borderBottom: '1px solid ' + t.colorBorderSecondary }}>{col.name}</td>
                    <td style={{ padding: '10px 16px', textAlign: 'center', borderBottom: '1px solid ' + t.colorBorderSecondary }}>
                      <Checkbox checked={!!leftChecked[i]} onChange={() => setLeftChecked(prev => ({ ...prev, [i]: !prev[i] }))} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <table style={{ width: '100%', fontSize: 14, borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: t.colorBgLayout }}>
                  <th style={{ padding: '10px 16px', fontWeight: 'bold', textAlign: 'left', borderBottom: '1px solid ' + t.colorBorderSecondary }}>供应商资质类型名称</th>
                  <th style={{ padding: '10px 16px', fontWeight: 'bold', textAlign: 'center', borderBottom: '1px solid ' + t.colorBorderSecondary }}>是否自动冻结</th>
                </tr>
              </thead>
              <tbody>
                {rightColumns.map((col, i) => (
                  <tr key={i} style={{ background: i % 2 === 0 ? '#FAFAFA' : 'transparent' }}>
                    <td style={{ padding: '10px 16px', borderBottom: '1px solid ' + t.colorBorderSecondary }}>{col.name}</td>
                    <td style={{ padding: '10px 16px', textAlign: 'center', borderBottom: '1px solid ' + t.colorBorderSecondary }}>
                      <Checkbox checked={!!rightChecked[i]} onChange={() => setRightChecked(prev => ({ ...prev, [i]: !prev[i] }))} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Card>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 16, marginTop: 16, borderTop: '1px solid #f0f0f0' }}>
        <Typography.Text type="secondary" style={{ fontSize: 12 }}>上次保存：2025-06-20 15:30</Typography.Text>
        <Space size={12}>
          <Button>取消</Button>
          <Button type="primary" danger onClick={() => Modal.confirm({ title: '确认保存', content: '确定要保存当前配置吗？', okText: '确定', cancelText: '取消', onOk: () => message.success('冻结资质文件设定已保存') })}>保存配置</Button>
        </Space>
      </div>
    </div>
  );
}

/* ================================================================
    Tab 4: 通知配置（新增）
   ================================================================ */
const unitOptions = [
  { value: '长庆油田分公司', label: '长庆油田分公司' },
  { value: '西南油气田分公司', label: '西南油气田分公司' },
  { value: '大庆油田有限责任公司', label: '大庆油田有限责任公司' },
];

interface NoticeTemplate {
  seq: number;
  name: string;
  unit: string;
  category: string;
  items: string[];
}

const initialNoticeData: NoticeTemplate[] = [
  { seq: 1, name: '注册补充资料通知', unit: '长庆油田分公司', category: '注册流程', items: ['营业执照', '法人身份证', '银行开户证明'] },
  { seq: 2, name: '补充资料通知', unit: '西南油气田分公司', category: '流程', items: ['资质证书', '业绩证明', '安全生产许可证'] },
  { seq: 3, name: '变更补充资料通知', unit: '大庆油田有限责任公司', category: '变更流程', items: ['变更说明函', '新营业执照'] },
];

function NoticeConfigTab() {
  const [data, setData] = useState<NoticeTemplate[]>(initialNoticeData);
  const [editOpen, setEditOpen] = useState(false);
  const [editRecord, setEditRecord] = useState<NoticeTemplate | null>(null);
  const [editName, setEditName] = useState('');
  const [editUnit, setEditUnit] = useState('');
  const [editCategory, setEditCategory] = useState('');
  const [editItems, setEditItems] = useState<string[]>([]);
  const [newItem, setNewItem] = useState('');
  const [filterUnit, setFilterUnit] = useState<string | undefined>(undefined);

  const filteredData = filterUnit ? data.filter(d => d.unit === filterUnit) : data;

  const handleReset = () => { setFilterUnit(undefined); };

  const handleAdd = () => {
    setEditRecord(null);
    setEditName('');
    setEditUnit('');
    setEditCategory('');
    setEditItems([]);
    setEditOpen(true);
  };

  const handleEdit = (record: NoticeTemplate) => {
    setEditRecord(record);
    setEditName(record.name);
    setEditUnit(record.unit);
    setEditCategory(record.category);
    setEditItems([...record.items]);
    setEditOpen(true);
  };

  const handleSave = () => {
    if (!editName || !editUnit || !editCategory) return;
    if (editRecord) {
      setData(prev => prev.map(d => d.seq === editRecord.seq ? { ...d, name: editName, unit: editUnit, category: editCategory, items: [...editItems] } : d));
    } else {
      const newRecord: NoticeTemplate = {
        seq: data.length + 1,
        name: editName,
        unit: editUnit,
        category: editCategory,
        items: [...editItems],
      };
      setData([...data, newRecord]);
    }
    setEditOpen(false);
  };

  const handleDelete = (seq: number) => {
    Modal.confirm({
      title: '确认删除',
      content: '确定要删除该通知模板吗？',
      okText: '确定',
      cancelText: '取消',
      onOk: () => { setData(prev => prev.filter(d => d.seq !== seq)); },
    });
  };

  const handleAddItem = () => {
    if (newItem && !editItems.includes(newItem)) {
      setEditItems([...editItems, newItem]);
      setNewItem('');
    }
  };

  return (
    <div>
      <Card size="small" variant="outlined" style={{ marginBottom: 16 }}>
        <Row gutter={24} align="middle">
          <Col>
            <Space size={8}>
              <Typography.Text style={{ whiteSpace: 'nowrap' }}>使用单位：</Typography.Text>
              <Select style={{ width: 200 }} placeholder="请选择" allowClear value={filterUnit} onChange={setFilterUnit} options={unitOptions} />
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
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
        <Button type="primary" danger onClick={handleAdd}>+ 新增模板</Button>
      </div>
      <Table
        columns={[
          { key: 'seq', title: '序号', width: 60, align: 'center' as const, dataIndex: 'seq' },
          { key: 'unit', title: '使用单位', dataIndex: 'unit', width: 170 },
          { key: 'name', title: '模板名称', dataIndex: 'name' },
          { key: 'category', title: '适用品类', dataIndex: 'category', width: 140 },
          { key: 'items', title: '资料项列表', dataIndex: 'items', render: (val: string[]) => val.join('、') },
          {
            key: 'action', title: '操作', width: 140,
            render: (_: unknown, record: NoticeTemplate) => (
              <Space size={8}>
                <Typography.Link style={{ color: '#ff4d4f' }} onClick={() => handleEdit(record)}>编辑</Typography.Link>
                <Typography.Link style={{ color: '#ff4d4f' }} onClick={() => handleDelete(record.seq)}>删除</Typography.Link>
              </Space>
            ),
          },
        ]}
        dataSource={filteredData} rowKey="seq" bordered size="middle" pagination={false}
      />
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 16, marginTop: 16, borderTop: '1px solid #f0f0f0' }}>
        <Typography.Text type="secondary" style={{ fontSize: 12 }}>上次保存：2025-06-20 15:30</Typography.Text>
        <Space size={12}>
          <Button>取消</Button>
          <Button type="primary" danger onClick={() => message.success('通知配置已保存')}>保存配置</Button>
        </Space>
      </div>

      <Modal
        title={editRecord ? '编辑通知模板' : '新增通知模板'}
        open={editOpen}
        onCancel={() => setEditOpen(false)}
        onOk={handleSave}
        okText="确认"
        cancelText="取消"
        width={600}
      >
        <Form layout="vertical" style={{ marginTop: 16 }}>
          <Form.Item label="使用单位" required>
            <Select placeholder="请选择使用单位" value={editUnit} onChange={setEditUnit} options={unitOptions} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item label="模板名称" required>
            <Input placeholder="请输入模板名称" value={editName} onChange={e => setEditName(e.target.value)} />
          </Form.Item>
          <Form.Item label="适用品类" required>
            <Select placeholder="请选择品类" value={editCategory} onChange={setEditCategory} options={[{ value: '注册流程', label: '注册流程' }, { value: '流程', label: '流程' }, { value: '变更流程', label: '变更流程' }, { value: '冻结流程', label: '冻结流程' }]} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item label="资料项列表">
            <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
              <Input placeholder="输入资料项名称" value={newItem} onChange={e => setNewItem(e.target.value)} style={{ flex: 1 }} />
              <Button type="link" onClick={handleAddItem}>添加</Button>
            </div>
            {editItems.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {editItems.map((item, idx) => (
                  <Tag key={idx} closable onClose={() => setEditItems(editItems.filter((_, i) => i !== idx))} style={{ padding: '2px 8px' }}>{item}</Tag>
                ))}
              </div>
            )}
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

/* ================================================================
   主页面：4 Tabs
   ================================================================ */
export default function Config() {
  const [activeTab, setActiveTab] = useState('dir');

  return (
    <div>
      <Typography.Title level={4} style={{ marginTop: 0, marginBottom: 16 }}>参数配置</Typography.Title>
      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        items={[
          { key: 'dir', label: '专业服务品类配置', children: <DirConfigTab /> },
          { key: 'doc', label: '要件配置', children: <DocConfigTab /> },
          { key: 'freeze', label: '冻结资质文件设定', children: <FreezeDocTab /> },
          { key: 'notice', label: '通知配置', children: <NoticeConfigTab /> },
        ]}
      />
    </div>
  );
}
