/**
 * @name 专业类型维护（新建/编辑）
 * 区块：基本信息 / 注册字段配置 / 资质附件配置 / 审核成员 / 关联服务品类
 */
import React from 'react';
import { useState, useEffect } from 'react';
import { Typography, Input, Button, Table, Card, Space, Row, Col, Tag, Checkbox, Select, message, Divider } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

/* ─── 集成系统模拟数据（从集成系统配置页面获取） ─── */
const integrationSystems = [
  { id: '1', name: '钻井工程资质管理系统', code: 'ZJGC' },
  { id: '2', name: '物化探服务管理系统', code: 'WHT-FW' },
  { id: '3', name: '管道工程安全监管平台', code: 'GD-GC' },
];

const integrationOptions = integrationSystems.map(s => ({
  label: `${s.name}（${s.code}）`,
  value: s.id,
}));

/* ─── 树形数据 ─── */
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

/* ─── 预填数据（模拟从列表进入编辑） ─── */
const mockData: Record<number, { name: string; description: string; instructions: string; fields: FieldItem[]; quals: QualItem[]; members: MemberItem[]; catKeys: string[]; integrationSystemIds: string[] }> = {
  1: {
    name: '法律专业',
    description: '涵盖企业法律顾问、合同审查、知识产权、劳动法务等法律相关服务领域。',
    instructions: '请上传以下材料：\n1. 企业营业执照副本（彩色扫描件）\n2. 律师事务所执业许可证\n3. 主要执业律师资格证书（不少于3人）\n4. 近三年同类项目服务合同（至少3份）',
    fields: [
      { id: 1, name: '律师事务所名称', type: '文本', required: true },
      { id: 2, name: '执业律师人数', type: '数字', required: true },
      { id: 3, name: '成立年限', type: '数字', required: false },
      { id: 4, name: '擅长领域', type: '下拉', required: true },
    ],
    quals: [
      { id: 1, name: '律师事务所执业许可证', required: true, desc: '有效期内的执业许可证扫描件' },
      { id: 2, name: '律师资格证书', required: true, desc: '不少于3名执业律师' },
      { id: 3, name: '企业营业执照副本', required: true, desc: '彩色扫描件' },
    ],
    members: [
      { id: 1, name: '王建国', empNo: 'T0345123', dept: '专业管理部' },
      { id: 2, name: '李明', empNo: 'T0345124', dept: '专业管理部' },
    ],
    catKeys: ['gc-zj'],
    integrationSystemIds: [],
  },
  2: {
    name: '钻井工程专业',
    description: '涵盖定向井、固井、钻井液等钻井相关技术服务领域的专业审核。',
    instructions: '请上传以下材料：\n1. 企业营业执照副本（彩色扫描件）\n2. 钻井工程技术服务资质证书\n3. 安全生产许可证（有效期内）\n4. 主要钻井设备清单及检验报告\n5. 近三年同类项目业绩证明（至少3份）',
    fields: [
      { id: 1, name: '钻井设备数量', type: '数字', required: true },
      { id: 2, name: '年钻井能力（米）', type: '数字', required: true },
      { id: 3, name: '安全资质等级', type: '下拉', required: true },
      { id: 4, name: '作业区域', type: '文本', required: false },
      { id: 5, name: '特种作业证编号', type: '文本', required: true },
      { id: 6, name: '设备检验有效期', type: '日期', required: true },
    ],
    quals: [
      { id: 1, name: '钻井工程技术服务资质证书', required: true, desc: '有效期内资质证书' },
      { id: 2, name: '安全生产许可证', required: true, desc: '有效期内' },
      { id: 3, name: '企业营业执照副本', required: true, desc: '彩色扫描件' },
      { id: 4, name: '钻井设备清单及检验报告', required: true, desc: '主要设备' },
      { id: 5, name: '近三年同类项目业绩证明', required: true, desc: '至少3份合同' },
    ],
    members: [
      { id: 1, name: '张伟', empNo: 'T0345125', dept: '钻井技术部' },
      { id: 2, name: '刘强', empNo: 'T0345126', dept: '钻井技术部' },
      { id: 3, name: '陈刚', empNo: 'T0345127', dept: 'HSE管理部' },
      { id: 4, name: '赵明', empNo: 'T0345128', dept: '钻井技术部' },
      { id: 5, name: '周涛', empNo: 'T0345129', dept: '质量管理部' },
    ],
    catKeys: ['gc-zj', 'gc-cy', 'gc-yc'],
    integrationSystemIds: ['1', '2'],
  },
};

/* ─── 类型 ─── */
interface FieldItem { id: number; name: string; type: string; required: boolean; }
interface QualItem { id: number; name: string; required: boolean; desc: string; }
interface MemberItem { id: number; name: string; empNo: string; dept: string; }

const fieldTypeOptions = [
  { value: '文本', label: '文本' },
  { value: '数字', label: '数字' },
  { value: '日期', label: '日期' },
  { value: '下拉', label: '下拉' },
  { value: '文件', label: '文件' },
];

/* ─── 树节点组件 ─── */
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

/* ─── 主页面 ─── */
export default function ConfigDirEdit() {
  const hash = window.location.hash;
  const editSeq = hash.includes('seq=') ? new URLSearchParams(hash.split('?')[1]).get('seq') : null;
  const isEdit = !!editSeq;

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [instructions, setInstructions] = useState('');

  const [fields, setFields] = useState<FieldItem[]>([]);
  const [quals, setQuals] = useState<QualItem[]>([]);
  const [members, setMembers] = useState<MemberItem[]>([]);
  const [catKeys, setCatKeys] = useState<string[]>([]);
  const [integrationSystemIds, setIntegrationSystemIds] = useState<string[]>([]);

  const [newFieldName, setNewFieldName] = useState('');
  const [newFieldType, setNewFieldType] = useState('文本');
  const [newFieldRequired, setNewFieldRequired] = useState(true);

  const [newQualName, setNewQualName] = useState('');
  const [newQualRequired, setNewQualRequired] = useState(true);
  const [newQualDesc, setNewQualDesc] = useState('');

  const [newMemberName, setNewMemberName] = useState('');
  const [newMemberEmpNo, setNewMemberEmpNo] = useState('');
  const [newMemberDept, setNewMemberDept] = useState('');

  useEffect(() => {
    if (isEdit && mockData[Number(editSeq)]) {
      const d = mockData[Number(editSeq)];
      setName(d.name);
      setDescription(d.description);
      setInstructions(d.instructions);
      setFields(d.fields);
      setQuals(d.quals);
      setMembers(d.members);
      setCatKeys(d.catKeys);
      setIntegrationSystemIds(d.integrationSystemIds);
    }
  }, [editSeq, isEdit]);

  const handleToggleCat = (key: string) => {
    setCatKeys(prev => prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]);
  };

  const addField = () => {
    if (!newFieldName) return;
    setFields([...fields, { id: Date.now(), name: newFieldName, type: newFieldType, required: newFieldRequired }]);
    setNewFieldName(''); setNewFieldType('文本'); setNewFieldRequired(true);
  };
  const removeField = (id: number) => setFields(fields.filter(f => f.id !== id));

  const addQual = () => {
    if (!newQualName) return;
    setQuals([...quals, { id: Date.now(), name: newQualName, required: newQualRequired, desc: newQualDesc }]);
    setNewQualName(''); setNewQualRequired(true); setNewQualDesc('');
  };
  const removeQual = (id: number) => setQuals(quals.filter(q => q.id !== id));

  const addMember = () => {
    if (!newMemberName || !newMemberEmpNo) return;
    setMembers([...members, { id: Date.now(), name: newMemberName, empNo: newMemberEmpNo, dept: newMemberDept }]);
    setNewMemberName(''); setNewMemberEmpNo(''); setNewMemberDept('');
  };
  const removeMember = (id: number) => setMembers(members.filter(m => m.id !== id));

  const handleSave = () => {
    if (!name) { message.warning('请输入专业类型名称'); return; }
    message.success(isEdit ? '修改已保存' : '新建成功');
    window.location.hash = '#/admin/config-dir';
  };

  return (
    <div style={{ minHeight: 'calc(100vh - 56px - 48px)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <Typography.Title level={4} style={{ margin: 0 }}>{isEdit ? '编辑' : '新建'}专业类型</Typography.Title>
        <Button onClick={() => window.location.hash = '#/admin/config-dir'}>返回列表</Button>
      </div>

      {/* 区块1: 基本信息 */}
      <Card size="small" variant="outlined" style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
          <div style={{ width: 4, height: 16, borderRadius: 4, background: '#ff4d4f' }} />
          <Typography.Text strong style={{ fontSize: 14 }}>基本信息</Typography.Text>
        </div>
        <Row gutter={24}>
          <Col span={12}>
            <div style={{ marginBottom: 16 }}>
              <Space size={8} style={{ marginBottom: 8 }}><Typography.Text style={{ color: '#ff4d4f' }}>*</Typography.Text><Typography.Text>专业类型名称</Typography.Text></Space>
              <Input placeholder="请输入专业类型名称" value={name} onChange={e => setName(e.target.value)} />
            </div>
          </Col>
          <Col span={12}>
            <div style={{ marginBottom: 16 }}>
              <Space size={8} style={{ marginBottom: 8 }}><Typography.Text>描述</Typography.Text></Space>
              <Input.TextArea rows={3} placeholder="请输入专业类型描述，说明该专业的服务范围" value={description} onChange={e => setDescription(e.target.value)} />
            </div>
          </Col>
        </Row>
        <div>
          <Space size={8} style={{ marginBottom: 8 }}><Typography.Text>填报须知</Typography.Text></Space>
          <Input.TextArea rows={4} placeholder="服务商选择该专业品类后，注册时将展示此内容" value={instructions} onChange={e => setInstructions(e.target.value)} />
        </div>
      </Card>

      {/* 区块2: 注册字段配置 */}
      <Card size="small" variant="outlined" style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 4, height: 16, borderRadius: 4, background: '#ff4d4f' }} />
            <Typography.Text strong style={{ fontSize: 14 }}>注册字段配置</Typography.Text>
            <Typography.Text type="secondary" style={{ fontSize: 12 }}>服务商注册时选择该专业品类后需填写的字段</Typography.Text>
          </div>
        </div>
        <Table
          columns={[
            { key: 'name', title: '字段名称', dataIndex: 'name', width: 200 },
            { key: 'type', title: '字段类型', dataIndex: 'type', width: 120, align: 'center' as const },
            { key: 'required', title: '是否必填', dataIndex: 'required', width: 100, align: 'center' as const, render: (val: boolean) => <Tag color={val ? 'red' : 'default'}>{val ? '必填' : '选填'}</Tag> },
            { key: 'action', title: '操作', width: 80, align: 'center' as const, render: (_: unknown, record: FieldItem) => <Typography.Link style={{ color: '#ff4d4f' }} onClick={() => removeField(record.id)}>删除</Typography.Link> },
          ]}
          dataSource={fields} rowKey="id" bordered size="middle" pagination={false} locale={{ emptyText: '暂未配置注册字段' }}
        />
        <Row gutter={12} style={{ marginTop: 12 }} align="middle">
          <Col flex="auto">
            <Space size={8}>
              <Input placeholder="字段名称" style={{ width: 180 }} value={newFieldName} onChange={e => setNewFieldName(e.target.value)} />
              <Select style={{ width: 100 }} value={newFieldType} onChange={setNewFieldType} options={fieldTypeOptions} />
              <Checkbox checked={newFieldRequired} onChange={e => setNewFieldRequired(e.target.checked)}>必填</Checkbox>
            </Space>
          </Col>
          <Col><Button type="dashed" icon={<PlusOutlined />} onClick={addField}>添加字段</Button></Col>
        </Row>
      </Card>

      {/* 区块3: 资质附件配置 */}
      <Card size="small" variant="outlined" style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 4, height: 16, borderRadius: 4, background: '#ff4d4f' }} />
            <Typography.Text strong style={{ fontSize: 14 }}>资质附件配置</Typography.Text>
            <Typography.Text type="secondary" style={{ fontSize: 12 }}>服务商注册时选择该专业品类后需上传的资质文件</Typography.Text>
          </div>
        </div>
        <Table
          columns={[
            { key: 'name', title: '附件名称', dataIndex: 'name', width: 240 },
            { key: 'required', title: '是否必填', dataIndex: 'required', width: 100, align: 'center' as const, render: (val: boolean) => <Tag color={val ? 'red' : 'default'}>{val ? '必填' : '选填'}</Tag> },
            { key: 'desc', title: '说明', dataIndex: 'desc', ellipsis: true },
            { key: 'action', title: '操作', width: 80, align: 'center' as const, render: (_: unknown, record: QualItem) => <Typography.Link style={{ color: '#ff4d4f' }} onClick={() => removeQual(record.id)}>删除</Typography.Link> },
          ]}
          dataSource={quals} rowKey="id" bordered size="middle" pagination={false} locale={{ emptyText: '暂未配置资质附件' }}
        />
        <Row gutter={12} style={{ marginTop: 12 }} align="middle">
          <Col flex="auto">
            <Space size={8}>
              <Input placeholder="附件名称" style={{ width: 200 }} value={newQualName} onChange={e => setNewQualName(e.target.value)} />
              <Checkbox checked={newQualRequired} onChange={e => setNewQualRequired(e.target.checked)}>必填</Checkbox>
              <Input placeholder="说明（选填）" style={{ width: 200 }} value={newQualDesc} onChange={e => setNewQualDesc(e.target.value)} />
            </Space>
          </Col>
          <Col><Button type="dashed" icon={<PlusOutlined />} onClick={addQual}>添加附件</Button></Col>
        </Row>
      </Card>

      {/* 区块4: 审核成员 */}
      <Card size="small" variant="outlined" style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 4, height: 16, borderRadius: 4, background: '#ff4d4f' }} />
            <Typography.Text strong style={{ fontSize: 14 }}>审核成员</Typography.Text>
          </div>
        </div>
        <Table
          columns={[
            { key: 'name', title: '姓名', dataIndex: 'name', width: 120 },
            { key: 'empNo', title: '员工编号', dataIndex: 'empNo', width: 140 },
            { key: 'dept', title: '部门', dataIndex: 'dept' },
            { key: 'action', title: '操作', width: 80, align: 'center' as const, render: (_: unknown, record: MemberItem) => <Typography.Link style={{ color: '#ff4d4f' }} onClick={() => removeMember(record.id)}>移除</Typography.Link> },
          ]}
          dataSource={members} rowKey="id" bordered size="middle" pagination={false} locale={{ emptyText: '暂未配置审核成员' }}
        />
        <Row gutter={12} style={{ marginTop: 12 }} align="middle">
          <Col flex="auto">
            <Space size={8}>
              <Input placeholder="姓名" style={{ width: 100 }} value={newMemberName} onChange={e => setNewMemberName(e.target.value)} />
              <Input placeholder="员工编号" style={{ width: 130 }} value={newMemberEmpNo} onChange={e => setNewMemberEmpNo(e.target.value)} />
              <Input placeholder="部门" style={{ width: 140 }} value={newMemberDept} onChange={e => setNewMemberDept(e.target.value)} />
            </Space>
          </Col>
          <Col><Button type="dashed" icon={<PlusOutlined />} onClick={addMember}>添加成员</Button></Col>
        </Row>
      </Card>

      {/* 区块5: 关联服务品类 */}
      <Card size="small" variant="outlined" style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 4, height: 16, borderRadius: 4, background: '#ff4d4f' }} />
            <Typography.Text strong style={{ fontSize: 14 }}>关联服务品类</Typography.Text>
            <Typography.Text type="secondary" style={{ fontSize: 12 }}>勾选后该品类即为专业品类，一个品类只能关联一个专业类型</Typography.Text>
          </div>
          {catKeys.length > 0 && <Typography.Text type="secondary" style={{ fontSize: 12 }}>已选择 {catKeys.length} 个品类</Typography.Text>}
        </div>
        <div style={{ border: '1px solid #f0f0f0', borderRadius: 4, padding: 8, maxHeight: 320, overflow: 'auto' }}>
          {treeData.map((node, i) => (
            <TreeNodeView key={i} node={node} defaultExpanded selectedKeys={catKeys} onToggle={handleToggleCat} />
          ))}
        </div>
      </Card>

      {/* 区块6: 集成系统配置 */}
      <Card size="small" variant="outlined" style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 4, height: 16, borderRadius: 4, background: '#ff4d4f' }} />
            <Typography.Text strong style={{ fontSize: 14 }}>集成系统配置</Typography.Text>
            <Typography.Text type="secondary" style={{ fontSize: 12 }}>该专业类型关联的集成系统，服务商注册审核通过后将自动推送数据至对应系统</Typography.Text>
          </div>
        </div>
        <Select
          mode="multiple"
          value={integrationSystemIds}
          onChange={setIntegrationSystemIds}
          options={integrationOptions}
          placeholder="请选择关联的集成系统（可多选）"
          style={{ width: '100%' }}
          maxTagCount="responsive"
        />
        {integrationSystemIds.length > 0 && (
          <div style={{ marginTop: 8, fontSize: 12, color: '#666' }}>
            已选择 {integrationSystemIds.length} 个集成系统
          </div>
        )}
      </Card>

      <Divider />
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
        <Button onClick={() => window.location.hash = '#/admin/config-dir'}>取消</Button>
        <Button type="primary" danger onClick={handleSave}>保存</Button>
      </div>
    </div>
  );
}
