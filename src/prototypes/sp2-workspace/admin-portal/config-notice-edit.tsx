/**
 * @name 通知模板维护（新建/编辑）
 * 区块：基本信息 / 分组表单配置 / 文件描述 / 资质附件
 */
import React from 'react';
import { useState, useEffect } from 'react';
import { Typography, Input, Button, Table, Card, Space, Row, Col, Select, Tag, message, Divider } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

/* ─── 类型 ─── */
interface FieldItem { id: number; label: string; type: 'input' | 'textarea'; placeholder: string; span: number; }
interface SectionItem { id: number; icon: string; title: string; required: boolean; fields: FieldItem[]; }
interface SimpleItem { id: number; label: string; required: boolean; placeholder?: string; }
interface NoticeTemplate {
  seq: number; name: string; unit: string; category: string;
  sections: SectionItem[]; fileDescItems: SimpleItem[]; qualAttachItems: SimpleItem[];
}

/* ─── 预填数据 ─── */
const mockData: Record<number, NoticeTemplate> = {
  1: {
    seq: 1, name: '注册补充资料通知', unit: '长庆油田分公司', category: '注册流程',
    sections: [
      { id: 1, icon: '👥', title: '人员情况', required: true, fields: [
        { id: 1, label: '服务队伍人数', type: 'input', placeholder: '请输入服务队伍总人数', span: 12 },
        { id: 2, label: '技术人员数量', type: 'input', placeholder: '请输入技术人员数量', span: 12 },
        { id: 3, label: '人员资质情况', type: 'textarea', placeholder: '请描述主要人员的资质证书、执业资格等情况', span: 24 },
      ]},
      { id: 2, icon: '📊', title: '经营情况', required: true, fields: [
        { id: 4, label: '近三年营业收入（万元）', type: 'textarea', placeholder: '如：2022年200万元；2023年500万元；2024年800万元', span: 12 },
        { id: 5, label: '近三年净利润（万元）', type: 'textarea', placeholder: '如：2022年20万元；2023年80万元；2024年100万元', span: 12 },
        { id: 6, label: '主要业务范围', type: 'textarea', placeholder: '请描述主营业务范围及核心竞争优势', span: 24 },
      ]},
      { id: 3, icon: '🏆', title: '服务业绩', required: true, fields: [
        { id: 7, label: '主要项目业绩', type: 'textarea', placeholder: '请列举近三年的主要服务项目名称、甲方单位、项目金额等', span: 24 },
      ]},
    ],
    fileDescItems: [{ id: 1, label: '变更说明函', required: true, placeholder: '请输入变更说明' }],
    qualAttachItems: [{ id: 1, label: '营业执照扫描件', required: true }, { id: 2, label: '法人身份证扫描件', required: true }],
  },
};

export default function ConfigNoticeEdit() {
  const hash = window.location.hash;
  const editSeq = hash.includes('seq=') ? new URLSearchParams(hash.split('?')[1]).get('seq') : null;
  const isEdit = !!editSeq;

  const [name, setName] = useState('');
  const [unit, setUnit] = useState('');
  const [category, setCategory] = useState('');
  const [sections, setSections] = useState<SectionItem[]>([]);
  const [fileDescItems, setFileDescItems] = useState<SimpleItem[]>([]);
  const [qualAttachItems, setQualAttachItems] = useState<SimpleItem[]>([]);

  const [newSectionTitle, setNewSectionTitle] = useState('');
  const [newSectionIcon, setNewSectionIcon] = useState('📋');

  const [newFileDescLabel, setNewFileDescLabel] = useState('');
  const [newFileDescRequired, setNewFileDescRequired] = useState(true);

  const [newQualLabel, setNewQualLabel] = useState('');
  const [newQualRequired, setNewQualRequired] = useState(true);

  useEffect(() => {
    if (isEdit && mockData[Number(editSeq)]) {
      const d = mockData[Number(editSeq)];
      setName(d.name); setUnit(d.unit); setCategory(d.category);
      setSections(d.sections); setFileDescItems(d.fileDescItems); setQualAttachItems(d.qualAttachItems);
    }
  }, [editSeq, isEdit]);

  /* 分组操作 */
  const addSection = () => {
    if (!newSectionTitle) return;
    setSections([...sections, { id: Date.now(), icon: newSectionIcon, title: newSectionTitle, required: true, fields: [] }]);
    setNewSectionTitle(''); setNewSectionIcon('📋');
  };
  const removeSection = (id: number) => setSections(sections.filter(s => s.id !== id));

  const addField = (sectionId: number) => {
    const s = sections.find(s => s.id === sectionId);
    if (!s) return;
    const newField: FieldItem = { id: Date.now(), label: '新字段', type: 'input', placeholder: '', span: 24 };
    setSections(sections.map(s => s.id === sectionId ? { ...s, fields: [...s.fields, newField] } : s));
  };
  const removeField = (sectionId: number, fieldId: number) => {
    setSections(sections.map(s => s.id === sectionId ? { ...s, fields: s.fields.filter(f => f.id !== fieldId) } : s));
  };
  const updateField = (sectionId: number, fieldId: number, patch: Partial<FieldItem>) => {
    setSections(sections.map(s => s.id === sectionId ? { ...s, fields: s.fields.map(f => f.id === fieldId ? { ...f, ...patch } : f) } : s));
  };

  /* 文件描述 */
  const addFileDesc = () => {
    if (!newFileDescLabel) return;
    setFileDescItems([...fileDescItems, { id: Date.now(), label: newFileDescLabel, required: newFileDescRequired }]);
    setNewFileDescLabel(''); setNewFileDescRequired(true);
  };
  const removeFileDesc = (id: number) => setFileDescItems(fileDescItems.filter(f => f.id !== id));

  /* 资质附件 */
  const addQual = () => {
    if (!newQualLabel) return;
    setQualAttachItems([...qualAttachItems, { id: Date.now(), label: newQualLabel, required: newQualRequired }]);
    setNewQualLabel(''); setNewQualRequired(true);
  };
  const removeQual = (id: number) => setQualAttachItems(qualAttachItems.filter(f => f.id !== id));

  const handleSave = () => {
    if (!name) { message.warning('请输入模板名称'); return; }
    message.success(isEdit ? '修改已保存' : '新建成功');
    window.location.hash = '#/admin/config-notice';
  };

  return (
    <div style={{ minHeight: 'calc(100vh - 56px - 48px)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <Typography.Title level={4} style={{ margin: 0 }}>{isEdit ? '编辑' : '新建'}通知模板</Typography.Title>
        <Button onClick={() => window.location.hash = '#/admin/config-notice'}>返回列表</Button>
      </div>

      {/* 基本信息 */}
      <Card size="small" variant="outlined" style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
          <div style={{ width: 4, height: 16, borderRadius: 4, background: '#ff4d4f' }} />
          <Typography.Text strong style={{ fontSize: 14 }}>基本信息</Typography.Text>
        </div>
        <Row gutter={24}>
          <Col span={8}>
            <div style={{ marginBottom: 16 }}>
              <Space size={8} style={{ marginBottom: 8 }}><span style={{ color: '#ff4d4f' }}>*</span><span>模板名称</span></Space>
              <Input placeholder="请输入模板名称" value={name} onChange={e => setName(e.target.value)} />
            </div>
          </Col>
          <Col span={8}>
            <div style={{ marginBottom: 16 }}>
              <Space size={8} style={{ marginBottom: 8 }}><span style={{ color: '#ff4d4f' }}>*</span><span>使用单位</span></Space>
              <Select placeholder="请选择使用单位" value={unit || undefined} onChange={setUnit} style={{ width: '100%' }}
                options={[
                  { value: '长庆油田分公司', label: '长庆油田分公司' },
                  { value: '西南油气田分公司', label: '西南油气田分公司' },
                  { value: '大庆油田有限责任公司', label: '大庆油田有限责任公司' },
                ]} />
            </div>
          </Col>
          <Col span={8}>
            <div style={{ marginBottom: 16 }}>
              <Space size={8} style={{ marginBottom: 8 }}><span style={{ color: '#ff4d4f' }}>*</span><span>适用流程</span></Space>
              <Select placeholder="请选择流程" value={category || undefined} onChange={setCategory} style={{ width: '100%' }}
                options={[
                  { value: '注册流程', label: '注册流程' },
                  { value: '流程', label: '流程' },
                  { value: '变更流程', label: '变更流程' },
                  { value: '冻结流程', label: '冻结流程' },
                ]} />
            </div>
          </Col>
        </Row>
      </Card>

      {/* 分组表单配置 */}
      {sections.map(section => (
        <Card key={section.id} size="small" variant="outlined" style={{ marginBottom: 16 }}
          title={<span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            <span>{section.icon}</span>
            <Typography.Text strong>{section.title}</Typography.Text>
            {section.required && <Tag color="error" style={{ fontSize: 11 }}>必填</Tag>}
            <Typography.Link style={{ fontSize: 12, color: '#ff4d4f', marginLeft: 8 }} onClick={() => removeSection(section.id)}>删除分组</Typography.Link>
          </span>}
        >
          <Table
            columns={[
              { key: 'label', title: '字段标签', dataIndex: 'label', render: (val: string, _: unknown, idx: number) => (
                <Input size="small" value={val} onChange={e => {
                  const field = section.fields[idx];
                  if (field) updateField(section.id, field.id, { label: e.target.value });
                }} />
              )},
              { key: 'type', title: '类型', dataIndex: 'type', width: 100, align: 'center' as const, render: (val: string, _: unknown, idx: number) => (
                <Select size="small" value={val} style={{ width: 80 }} onChange={v => {
                  const field = section.fields[idx];
                  if (field) updateField(section.id, field.id, { type: v });
                }} options={[{ value: 'input', label: '输入框' }, { value: 'textarea', label: '文本域' }]} />
              )},
              { key: 'span', title: '布局', dataIndex: 'span', width: 80, align: 'center' as const, render: (val: number, _: unknown, idx: number) => (
                <Select size="small" value={val} style={{ width: 70 }} onChange={v => {
                  const field = section.fields[idx];
                  if (field) updateField(section.id, field.id, { span: v });
                }} options={[{ value: 12, label: '半行' }, { value: 24, label: '整行' }]} />
              )},
              { key: 'action', title: '操作', width: 60, align: 'center' as const, render: (_: unknown, __: unknown, idx: number) => {
                const field = section.fields[idx];
                return field ? <Typography.Link style={{ color: '#ff4d4f' }} onClick={() => removeField(section.id, field.id)}>删除</Typography.Link> : null;
              }},
            ]}
            dataSource={section.fields} rowKey="id" bordered size="small" pagination={false}
          />
          <div style={{ marginTop: 8 }}>
            <Button type="dashed" icon={<PlusOutlined />} size="small" onClick={() => addField(section.id)}>添加字段</Button>
          </div>
        </Card>
      ))}

      <Card size="small" variant="outlined" style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Input size="small" prefix={<span>图标</span>} value={newSectionIcon} onChange={e => setNewSectionIcon(e.target.value)} style={{ width: 60 }} />
          <Input size="small" placeholder="分组名称" value={newSectionTitle} onChange={e => setNewSectionTitle(e.target.value)} style={{ width: 180 }} />
          <Button type="dashed" icon={<PlusOutlined />} size="small" onClick={addSection}>添加分组</Button>
        </div>
      </Card>

      {/* 文件描述 */}
      <Card size="small" variant="outlined" style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
          <div style={{ width: 4, height: 16, borderRadius: 4, background: '#ff4d4f' }} />
          <Typography.Text strong style={{ fontSize: 14 }}>文件描述</Typography.Text>
        </div>
        <Table
          columns={[
            { key: 'label', title: '描述项', dataIndex: 'label' },
            { key: 'required', title: '是否必填', dataIndex: 'required', width: 100, align: 'center' as const, render: (val: boolean) => <Tag color={val ? 'red' : 'default'}>{val ? '必填' : '选填'}</Tag> },
            { key: 'action', title: '操作', width: 80, align: 'center' as const, render: (_: unknown, record: SimpleItem) => <Typography.Link style={{ color: '#ff4d4f' }} onClick={() => removeFileDesc(record.id)}>删除</Typography.Link> },
          ]}
          dataSource={fileDescItems} rowKey="id" bordered size="middle" pagination={false} locale={{ emptyText: '暂未配置' }}
        />
        <Row gutter={12} style={{ marginTop: 12 }} align="middle">
          <Col flex="auto">
            <Space size={8}>
              <Input placeholder="描述项" style={{ width: 240 }} value={newFileDescLabel} onChange={e => setNewFileDescLabel(e.target.value)} />
              <Space size={4}><span>必填</span><input type="checkbox" checked={newFileDescRequired} onChange={e => setNewFileDescRequired(e.target.checked)} /></Space>
            </Space>
          </Col>
          <Col><Button type="dashed" icon={<PlusOutlined />} onClick={addFileDesc}>添加描述</Button></Col>
        </Row>
      </Card>

      {/* 资质附件 */}
      <Card size="small" variant="outlined" style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
          <div style={{ width: 4, height: 16, borderRadius: 4, background: '#ff4d4f' }} />
          <Typography.Text strong style={{ fontSize: 14 }}>资质附件</Typography.Text>
        </div>
        <Table
          columns={[
            { key: 'label', title: '附件名称', dataIndex: 'label' },
            { key: 'required', title: '是否必填', dataIndex: 'required', width: 100, align: 'center' as const, render: (val: boolean) => <Tag color={val ? 'red' : 'default'}>{val ? '必填' : '选填'}</Tag> },
            { key: 'action', title: '操作', width: 80, align: 'center' as const, render: (_: unknown, record: SimpleItem) => <Typography.Link style={{ color: '#ff4d4f' }} onClick={() => removeQual(record.id)}>删除</Typography.Link> },
          ]}
          dataSource={qualAttachItems} rowKey="id" bordered size="middle" pagination={false} locale={{ emptyText: '暂未配置' }}
        />
        <Row gutter={12} style={{ marginTop: 12 }} align="middle">
          <Col flex="auto">
            <Space size={8}>
              <Input placeholder="附件名称" style={{ width: 240 }} value={newQualLabel} onChange={e => setNewQualLabel(e.target.value)} />
              <Space size={4}><span>必填</span><input type="checkbox" checked={newQualRequired} onChange={e => setNewQualRequired(e.target.checked)} /></Space>
            </Space>
          </Col>
          <Col><Button type="dashed" icon={<PlusOutlined />} onClick={addQual}>添加附件</Button></Col>
        </Row>
      </Card>

      <Divider />
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
        <Button onClick={() => window.location.hash = '#/admin/config-notice'}>取消</Button>
        <Button type="primary" danger onClick={handleSave}>保存</Button>
      </div>
    </div>
  );
}
