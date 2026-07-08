/**
 * @name 专业服务品类配置
 */
import { useState } from 'react';
import { Typography, Input, Button, Table, Tabs, Card, Space, Row, Col, Tag, Switch, Select, Modal, Checkbox } from 'antd';
import PortalLayout from '../../common/portal-layout';
import { adminGroups } from '../../common/menu-data';

interface TreeNode {
  label: string;
  key: string;
  children?: TreeNode[];
  tag?: string;
  isLeaf?: boolean;
}

const treeData: TreeNode[] = [
  {
    label: '工程技术服务', key: 'gc',
    children: [
      { label: '钻井工程', key: 'gc-zj', tag: '专业' },
      { label: '采油工程', key: 'gc-cy', tag: '专业' },
      { label: '油田技术服务', key: 'gc-yc', tag: '专业' },
    ],
  },
  {
    label: '地面建设服务', key: 'dm',
    children: [
      { label: '交通工程', key: 'dm-jt' },
      {
        label: '管道工程', key: 'dm-gd',
        children: [
          { label: '管道安装', key: 'dm-gd-az', isLeaf: true },
          { label: '管道防腐', key: 'dm-gd-ff', isLeaf: true },
        ],
      },
      { label: '电力工程', key: 'dm-dl' },
    ],
  },
  { label: '物业安保服务', key: 'wy' },
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
          <span style={{ transform: expanded ? 'rotate(90deg)' : 'none', display: 'inline-block', transition: 'transform 0.2s', color: '#bfbfbf', width: 12, height: 12, fontSize: 10 }}>▶</span>
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
          { key: 'action', title: '操作', width: 80, render: (_: unknown, __: unknown, index: number) => <Typography.Link style={{ color: '#1677ff' }} onClick={() => onRemove(index)}>移除</Typography.Link> },
        ]}
        dataSource={members.map((m, i) => ({ ...m, _key: i }))}
        rowKey="_key"
        bordered
        size="middle"
        pagination={false}
      />
    </div>
  );
}

export default function DirConfig() {
  const [isProDir, setIsProDir] = useState(true);
  const [activeTab, setActiveTab] = useState('type');
  const [allExpanded, setAllExpanded] = useState(true);
  const [typeData, setTypeData] = useState<ProTypeItem[]>(initialTypeData);

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
      onOk: () => {
        setTypeData(prev => prev.filter(d => d.seq !== record.seq));
      },
    });
  };

  return (
    <PortalLayout groups={adminGroups} activePath="/admin/dir-config" portalType="admin">
      <div style={{ marginBottom: 8 }}>
        <Typography.Title level={4} style={{ margin: 0 }}>专业目录配置与审核小组管理</Typography.Title>
        <Typography.Text type="secondary">配置服务目录的专业属性，管理审核小组成员与角色分配</Typography.Text>
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
              <Input placeholder="搜索目录名称.." />
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
            <Tabs
              activeKey={activeTab}
              onChange={setActiveTab}
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
                          <Col span={12}>
                            <Space size={8} style={{ width: '100%' }}>
                              <Typography.Text style={{ width: 96, textAlign: 'right', fontSize: 14 }}>目录名称</Typography.Text>
                              <Input value="钻井工程" readOnly style={{ background: '#f5f5f5', flex: 1 }} />
                            </Space>
                          </Col>
                          <Col span={12}>
                            <Space size={8} style={{ width: '100%' }}>
                              <Typography.Text style={{ width: 96, textAlign: 'right', fontSize: 14 }}>目录编码</Typography.Text>
                              <Input value="GC-ZJ-001" readOnly style={{ background: '#f5f5f5', flex: 1 }} />
                            </Space>
                          </Col>
                          <Col span={12}>
                            <Space size={8} style={{ width: '100%' }}>
                              <Typography.Text style={{ width: 96, textAlign: 'right', fontSize: 14 }}>上级目录</Typography.Text>
                              <Input value="工程技术服务" readOnly style={{ background: '#f5f5f5', flex: 1 }} />
                            </Space>
                          </Col>
                          <Col span={12}>
                            <Space size={8} style={{ width: '100%' }}>
                              <Typography.Text style={{ width: 96, textAlign: 'right', fontSize: 14 }}>目录级别</Typography.Text>
                              <Input value="2级" readOnly style={{ background: '#f5f5f5', flex: 1 }} />
                            </Space>
                          </Col>
                        </Row>
                      </div>
                      <div style={{ marginBottom: 20 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                          <div style={{ width: 4, height: 16, borderRadius: 4, background: '#ff4d4f' }} />
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
                        <Typography.Text style={{ color: '#1677ff', fontSize: 12 }}>标记为专业目录后，该目录将进入专业审核流程，需要指定对应的审核小组</Typography.Text>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 12, borderTop: '1px solid #f0f0f0' }}>
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
                {
                  key: 'type',
                  label: <span style={{ color: activeTab === 'type' ? '#ff4d4f' : undefined }}>专业类型设置</span>,
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
                            render: (val: number, record: ProTypeItem) => val > 0 ? <Typography.Link style={{ color: '#1677ff' }} onClick={() => handleOpenCatModal(record)}>{val}</Typography.Link> : <Typography.Link style={{ color: '#1677ff' }} onClick={() => handleOpenCatModal(record)}>{val}</Typography.Link>,
                          },
                          {
                            key: 'memberCount', title: '审核成员', dataIndex: 'memberCount', width: 100, align: 'center' as const,
                            render: (val: number, record: ProTypeItem) => val > 0 ? <Typography.Link style={{ color: '#1677ff' }} onClick={() => handleOpenMemberModal(record)}>{val}</Typography.Link> : <Typography.Link style={{ color: '#1677ff' }} onClick={() => handleOpenMemberModal(record)}>{val}</Typography.Link>,
                          },
                          { key: 'status', title: '状态', dataIndex: 'status', width: 80, align: 'center' as const, render: (val: string) => <Tag color={val === '启用' ? 'success' : 'default'}>{val}</Tag> },
                          {
                            key: 'action', title: '操作', width: 320,
                            render: (_: unknown, record: ProTypeItem) => (
                              <Space size={4} wrap>
                                <Typography.Link style={{ color: '#1677ff' }} onClick={() => handleToggleStatus(record)}>{record.status === '启用' ? '停用' : '启用'}</Typography.Link>
                                <Typography.Text type="secondary">,</Typography.Text>
                                <Typography.Link style={{ color: '#1677ff' }} onClick={() => handleOpenAssocModal(record)}>关联品类</Typography.Link>
                                <Typography.Text type="secondary">,</Typography.Text>
                                <Typography.Link style={{ color: '#1677ff' }} onClick={() => handleOpenAssocModal(record)}>编辑关联品类</Typography.Link>
                                <Typography.Text type="secondary">,</Typography.Text>
                                <Typography.Link style={{ color: '#1677ff' }} onClick={() => handleOpenEditMemberModal(record)}>编辑审核成员</Typography.Link>
                                <Typography.Text type="secondary">,</Typography.Text>
                                <Typography.Link style={{ color: '#ff4d4f' }} onClick={() => handleDelete(record)}>删除</Typography.Link>
                              </Space>
                            ),
                          },
                        ]}
                        dataSource={typeData}
                        rowKey="seq"
                        bordered
                        size="middle"
                        pagination={false}
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

      {/* 专业服务品类数量弹框 */}
      <Modal title="专业服务品类数量" open={catModalOpen} onCancel={() => setCatModalOpen(false)} footer={null} width={500}>
        <Table
          columns={[
            { key: 'label', title: '服务品类名称', dataIndex: 'label' },
            { key: 'code', title: '服务品类编码', dataIndex: 'code' },
            { key: 'action', title: '操作', width: 80, render: () => <Typography.Link style={{ color: '#1677ff' }}>移除</Typography.Link> },
          ]}
          dataSource={catModalData}
          rowKey="key"
          bordered
          size="middle"
          pagination={false}
        />
      </Modal>

      {/* 审核成员弹框 */}
      <Modal title="审核成员" open={memberModalOpen} onCancel={() => setMemberModalOpen(false)} footer={null} width={500}>
        <Table
          columns={[
            { key: 'name', title: '姓名', dataIndex: 'name' },
            { key: 'empNo', title: '员工编号', dataIndex: 'empNo' },
            { key: 'dept', title: '部门', dataIndex: 'dept' },
            { key: 'action', title: '操作', width: 80, render: () => <Typography.Link style={{ color: '#1677ff' }}>移除</Typography.Link> },
          ]}
          dataSource={memberModalData.map((m, i) => ({ ...m, _key: i }))}
          rowKey="_key"
          bordered
          size="middle"
          pagination={false}
        />
      </Modal>

      {/* 创建专业类型弹框 */}
      <Modal title="创建专业类型" open={createModalOpen} onCancel={() => setCreateModalOpen(false)} onOk={handleCreate} okText="确认" cancelText="取消" width={700}>
        <div style={{ marginBottom: 16 }}>
          <Space size={8} style={{ marginBottom: 12 }}>
            <Typography.Text style={{ color: '#ff4d4f' }}>*</Typography.Text>
            <Typography.Text>专业类型名称</Typography.Text>
          </Space>
          <Input placeholder="请输入专业类型名称" value={createName} onChange={e => setCreateName(e.target.value)} />
        </div>
        <div style={{ marginBottom: 16 }}>
          <Space size={8} style={{ marginBottom: 12 }}>
            <Typography.Text style={{ color: '#ff4d4f' }}>*</Typography.Text>
            <Typography.Text>关联服务品类</Typography.Text>
          </Space>
          <CategoryTreeSelector selectedKeys={createSelectedCats} onSelect={setCreateSelectedCats} />
          {createSelectedCats.length > 0 && (
            <div style={{ marginTop: 8 }}>
              <Typography.Text type="secondary" style={{ fontSize: 12 }}>已选择 {createSelectedCats.length} 个品类</Typography.Text>
            </div>
          )}
        </div>
        <div>
          <Space size={8} style={{ marginBottom: 12 }}>
            <Typography.Text style={{ color: '#ff4d4f' }}>*</Typography.Text>
            <Typography.Text>审核成员</Typography.Text>
          </Space>
          <MemberSelector members={createMembers} onAdd={m => setCreateMembers([...createMembers, m])} onRemove={idx => setCreateMembers(createMembers.filter((_, i) => i !== idx))} />
        </div>
      </Modal>

      {/* 关联品类弹框 */}
      <Modal title="关联服务品类" open={assocModalOpen} onCancel={() => setAssocModalOpen(false)} onOk={handleAssocConfirm} okText="确认" cancelText="取消" width={600}>
        <CategoryTreeSelector selectedKeys={assocSelectedCats} onSelect={setAssocSelectedCats} />
        {assocSelectedCats.length > 0 && (
          <div style={{ marginTop: 8 }}>
            <Typography.Text type="secondary" style={{ fontSize: 12 }}>已选择 {assocSelectedCats.length} 个品类</Typography.Text>
          </div>
        )}
      </Modal>

      {/* 编辑审核成员弹框 */}
      <Modal title="编辑审核成员" open={editMemberModalOpen} onCancel={() => setEditMemberModalOpen(false)} onOk={handleEditMemberConfirm} okText="确认" cancelText="取消" width={600}>
        <MemberSelector members={editMembers} onAdd={m => setEditMembers([...editMembers, m])} onRemove={idx => setEditMembers(editMembers.filter((_, i) => i !== idx))} />
      </Modal>
    </PortalLayout>
  );
}
