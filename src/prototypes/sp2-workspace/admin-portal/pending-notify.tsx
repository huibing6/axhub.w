/**
 * @name 发送补充资料通知
 * 从待配码库进入，选择模板后展开内容，可自定义编辑通知
 */
import React from 'react';
import { useState } from 'react';
import { Typography, Input, Button, Card, Space, Row, Col, Select, Tag, message, Divider, Upload } from 'antd';
import { UploadOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';

/* ─── 类型（与 config-notice-edit 对齐） ─── */
interface FieldItem { id: number; label: string; type: 'input' | 'textarea'; placeholder: string; span: number; }
interface SectionItem { id: number; icon: string; title: string; required: boolean; fields: FieldItem[]; }
interface SimpleItem { id: number; label: string; required: boolean; placeholder?: string; }
interface NoticeTemplate {
  seq: number; name: string; unit: string; category: string;
  sections: SectionItem[]; fileDescItems: SimpleItem[]; qualAttachItems: SimpleItem[];
}

/* ─── 模拟模板数据 ─── */
const templateOptions = [
  { label: '注册补充资料通知', value: '1' },
  { label: '补充资料通知', value: '2' },
  { label: '变更补充资料通知', value: '3' },
];

const mockTemplates: Record<string, NoticeTemplate> = {
  '1': {
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
  '2': {
    seq: 2, name: '补充资料通知', unit: '西南油气田分公司', category: '流程',
    sections: [
      { id: 1, icon: '📋', title: '基本信息补充', required: true, fields: [
        { id: 1, label: '企业简介', type: 'textarea', placeholder: '请简要介绍企业背景、主营业务', span: 24 },
        { id: 2, label: '组织架构', type: 'textarea', placeholder: '请描述公司组织架构', span: 24 },
      ]},
      { id: 2, icon: '🔧', title: '设备能力', required: true, fields: [
        { id: 3, label: '主要设备清单', type: 'textarea', placeholder: '请列举主要设备名称、型号、数量', span: 24 },
      ]},
    ],
    fileDescItems: [{ id: 1, label: '申请表', required: true }],
    qualAttachItems: [{ id: 1, label: '资质证书', required: true }, { id: 2, label: '安全生产许可证', required: false }],
  },
  '3': {
    seq: 3, name: '变更补充资料通知', unit: '大庆油田有限责任公司', category: '变更流程',
    sections: [
      { id: 1, icon: '📝', title: '变更说明', required: true, fields: [
        { id: 1, label: '变更原因', type: 'textarea', placeholder: '请详细说明变更原因', span: 24 },
        { id: 2, label: '变更内容', type: 'textarea', placeholder: '请描述具体变更内容', span: 24 },
      ]},
    ],
    fileDescItems: [{ id: 1, label: '变更说明函', required: true }],
    qualAttachItems: [{ id: 1, label: '变更后的资质证书', required: true }],
  },
};

/* ─── 模拟服务商数据 ─── */
const mockSpData: Record<string, { name: string; code: string }> = {
  '91440300MA5F1234AB': { name: '中海油能源发展股份有限公司', code: '91440300MA5F1234AB' },
  '913706005971234523': { name: '杰瑞石油装备技术有限公司', code: '913706005971234523' },
};

export default function PendingNotify() {
  const hash = window.location.hash;
  const params = new URLSearchParams(hash.split('?')[1] || '');
  const spCode = params.get('code') || '';
  const spInfo = mockSpData[spCode] || { name: '未知服务商', code: spCode };

  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [notifyTitle, setNotifyTitle] = useState('');
  const [notifyBody, setNotifyBody] = useState('');
  const [sections, setSections] = useState<SectionItem[]>([]);
  const [fileDescItems, setFileDescItems] = useState<SimpleItem[]>([]);
  const [qualAttachItems, setQualAttachItems] = useState<SimpleItem[]>([]);
  const [fileList, setFileList] = useState<any[]>([]);

  const handleSelectTemplate = (val: string) => {
    setSelectedTemplate(val);
    const tmpl = mockTemplates[val];
    if (!tmpl) return;
    setNotifyTitle(tmpl.name);
    setNotifyBody(`尊敬的服务商：\n\n根据您的申请，需要补充以下资料，请在规定时间内完成提交。\n\n使用单位：${tmpl.unit}\n`);
    setSections(JSON.parse(JSON.stringify(tmpl.sections)));
    setFileDescItems(JSON.parse(JSON.stringify(tmpl.fileDescItems)));
    setQualAttachItems(JSON.parse(JSON.stringify(tmpl.qualAttachItems)));
  };

  const removeSection = (id: number) => setSections(sections.filter(s => s.id !== id));
  const removeField = (sectionId: number, fieldId: number) => {
    setSections(sections.map(s => s.id === sectionId ? { ...s, fields: s.fields.filter(f => f.id !== fieldId) } : s));
  };
  const addField = (sectionId: number) => {
    setSections(sections.map(s => s.id === sectionId ? { ...s, fields: [...s.fields, { id: Date.now(), label: '新字段', type: 'input', placeholder: '', span: 24 }] } : s));
  };
  const updateFieldLabel = (sectionId: number, fieldId: number, label: string) => {
    setSections(sections.map(s => s.id === sectionId ? { ...s, fields: s.fields.map(f => f.id === fieldId ? { ...f, label } : f) } : s));
  };

  const removeFileDesc = (id: number) => setFileDescItems(fileDescItems.filter(f => f.id !== id));
  const addFileDesc = () => setFileDescItems([...fileDescItems, { id: Date.now(), label: '新描述项', required: true }]);

  const removeQual = (id: number) => setQualAttachItems(qualAttachItems.filter(f => f.id !== id));
  const addQual = () => setQualAttachItems([...qualAttachItems, { id: Date.now(), label: '新附件项', required: true }]);

  const handleSend = () => {
    if (!selectedTemplate) { message.warning('请选择通知模板'); return; }
    if (!notifyTitle.trim()) { message.warning('请输入通知标题'); return; }
    message.success('通知已发送');
    window.location.hash = '#/admin/pending-list';
  };

  return (
    <div>
      <Typography.Link onClick={() => window.location.hash = '#/admin/pending-list'} style={{ color: '#ff4d4f', fontSize: 13, display: 'block', marginBottom: 12 }}>
        ← 返回待配码库
      </Typography.Link>

      <Card size="small" variant="outlined" style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
          <div style={{ width: 4, height: 16, borderRadius: 4, background: '#ff4d4f' }} />
          <Typography.Text strong style={{ fontSize: 14 }}>服务商信息</Typography.Text>
        </div>
        <Row gutter={24}>
          <Col span={12}><Typography.Text type="secondary" style={{ fontSize: 12 }}>服务商名称：</Typography.Text><Typography.Text style={{ fontSize: 14 }}>{spInfo.name}</Typography.Text></Col>
          <Col span={12}><Typography.Text type="secondary" style={{ fontSize: 12 }}>统一社会信用代码：</Typography.Text><Typography.Text style={{ fontSize: 14 }}>{spInfo.code}</Typography.Text></Col>
        </Row>
      </Card>

      <Card size="small" variant="outlined" style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
          <div style={{ width: 4, height: 16, borderRadius: 4, background: '#ff4d4f' }} />
          <Typography.Text strong style={{ fontSize: 14 }}>选择通知模板</Typography.Text>
        </div>
        <Select placeholder="请选择预置模板" style={{ width: 320 }} value={selectedTemplate || undefined} onChange={handleSelectTemplate} options={templateOptions} />
      </Card>

      {selectedTemplate && (
        <>
          <Card size="small" variant="outlined" style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <div style={{ width: 4, height: 16, borderRadius: 4, background: '#ff4d4f' }} />
              <Typography.Text strong style={{ fontSize: 14 }}>通知标题</Typography.Text>
            </div>
            <Input placeholder="请输入通知标题" value={notifyTitle} onChange={e => setNotifyTitle(e.target.value)} />
          </Card>

          <Card size="small" variant="outlined" style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <div style={{ width: 4, height: 16, borderRadius: 4, background: '#ff4d4f' }} />
              <Typography.Text strong style={{ fontSize: 14 }}>通知正文</Typography.Text>
            </div>
            <Input.TextArea rows={6} placeholder="请输入通知正文" value={notifyBody} onChange={e => setNotifyBody(e.target.value)} />
          </Card>

          {sections.map(section => (
            <Card
              key={section.id}
              size="small"
              variant="outlined"
              style={{ marginBottom: 16 }}
              title={
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                  <span>{section.icon}</span>
                  <Typography.Text strong>{section.title}</Typography.Text>
                  {section.required && <Tag color="error" style={{ fontSize: 11 }}>必填</Tag>}
                </span>
              }
              extra={
                <Typography.Link style={{ fontSize: 13, color: '#ff4d4f' }} onClick={() => removeSection(section.id)}>
                  <DeleteOutlined /> 删除分组
                </Typography.Link>
              }
            >
              {section.fields.map(field => (
                <div key={field.id} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12, padding: '8px 12px', background: '#fafafa', borderRadius: 4 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                      <Input size="small" value={field.label} onChange={e => updateFieldLabel(section.id, field.id, e.target.value)} style={{ width: 200 }} />
                      <Tag size="small" color={field.type === 'input' ? 'blue' : 'green'}>{field.type === 'input' ? '输入框' : '文本域'}</Tag>
                    </div>
                    <Typography.Text type="secondary" style={{ fontSize: 12 }}>占位提示：{field.placeholder || '（无）'}</Typography.Text>
                  </div>
                  <Button size="small" danger icon={<DeleteOutlined />} onClick={() => removeField(section.id, field.id)}>删除</Button>
                </div>
              ))}
              <Button type="dashed" icon={<PlusOutlined />} size="small" onClick={() => addField(section.id)}>添加字段</Button>
            </Card>
          ))}

          <Card size="small" variant="outlined" style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <div style={{ width: 4, height: 16, borderRadius: 4, background: '#ff4d4f' }} />
              <Typography.Text strong style={{ fontSize: 14 }}>文件描述</Typography.Text>
            </div>
            {fileDescItems.map(item => (
              <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                <Input size="small" value={item.label} onChange={e => setFileDescItems(fileDescItems.map(f => f.id === item.id ? { ...f, label: e.target.value } : f))} style={{ width: 300 }} />
                <Tag color={item.required ? 'red' : 'default'}>{item.required ? '必填' : '选填'}</Tag>
                <Button size="small" danger icon={<DeleteOutlined />} onClick={() => removeFileDesc(item.id)} />
              </div>
            ))}
            <Button type="dashed" icon={<PlusOutlined />} size="small" onClick={addFileDesc}>添加描述</Button>
          </Card>

          <Card size="small" variant="outlined" style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <div style={{ width: 4, height: 16, borderRadius: 4, background: '#ff4d4f' }} />
              <Typography.Text strong style={{ fontSize: 14 }}>资质附件</Typography.Text>
            </div>
            {qualAttachItems.map(item => (
              <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                <Input size="small" value={item.label} onChange={e => setQualAttachItems(qualAttachItems.map(f => f.id === item.id ? { ...f, label: e.target.value } : f))} style={{ width: 300 }} />
                <Tag color={item.required ? 'red' : 'default'}>{item.required ? '必填' : '选填'}</Tag>
                <Button size="small" danger icon={<DeleteOutlined />} onClick={() => removeQual(item.id)} />
              </div>
            ))}
            <Button type="dashed" icon={<PlusOutlined />} size="small" onClick={addQual}>添加附件</Button>
          </Card>

          <Card size="small" variant="outlined" style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <div style={{ width: 4, height: 16, borderRadius: 4, background: '#ff4d4f' }} />
              <Typography.Text strong style={{ fontSize: 14 }}>附件上传</Typography.Text>
              <Typography.Text type="secondary" style={{ fontSize: 12 }}>（可选，支持上传通知附带文件）</Typography.Text>
            </div>
            <Upload fileList={fileList} onChange={({ fileList: fl }) => setFileList(fl)} beforeUpload={() => false}>
              <Button icon={<UploadOutlined />}>选择文件</Button>
            </Upload>
          </Card>
        </>
      )}

      <Divider />
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, paddingBottom: 24 }}>
        <Button onClick={() => window.location.hash = '#/admin/pending-list'}>取消</Button>
        <Button type="primary" danger onClick={handleSend}>发送通知</Button>
      </div>
    </div>
  );
}
