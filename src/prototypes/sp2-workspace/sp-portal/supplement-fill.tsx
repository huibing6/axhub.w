/**
 * @name 服务商补充资料填写
 * 按模板配置渲染分组表单：人员情况 / 经营情况 / 服务业绩 等
 */
import React from 'react';
import { useState } from 'react';
import { Typography, Input, Button, Card, Row, Col, Upload, Tag, message, Divider, Space } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import type { UploadFile } from 'antd';

/* ─── 字段类型 ─── */
interface FieldItem {
  id: number;
  label: string;
  type: 'input' | 'textarea';
  placeholder?: string;
  required?: boolean;
  span?: number; // 12 = 半行, 24 = 整行
}

interface SectionItem {
  id: number;
  icon: string;
  title: string;
  required?: boolean;
  fields: FieldItem[];
}

/* ─── 模板数据（按图片示例） ─── */
interface TemplateData {
  seq: number;
  name: string;
  unit: string;
  category: string;
  sections: SectionItem[];
  fileDescItems: { id: number; label: string; placeholder?: string; required: boolean }[];
  qualAttachItems: { id: number; label: string; required: boolean }[];
}

const templateMap: Record<number, TemplateData> = {
  1: {
    seq: 1, name: '注册补充资料通知', unit: '长庆油田分公司', category: '注册流程',
    sections: [
      {
        id: 1, icon: '👥', title: '人员情况', required: true,
        fields: [
          { id: 1, label: '服务队伍人数', type: 'input', placeholder: '请输入服务队伍总人数', span: 12 },
          { id: 2, label: '技术人员数量', type: 'input', placeholder: '请输入技术人员数量', span: 12 },
          { id: 3, label: '人员资质情况', type: 'textarea', placeholder: '请描述主要人员的资质证书、执业资格等情况', span: 24 },
        ],
      },
      {
        id: 2, icon: '📊', title: '经营情况', required: true,
        fields: [
          { id: 4, label: '近三年营业收入（万元）', type: 'textarea', placeholder: '如：2022年200万元；2023年500万元；2024年800万元', span: 12 },
          { id: 5, label: '近三年净利润（万元）', type: 'textarea', placeholder: '如：2022年20万元；2023年80万元；2024年100万元', span: 12 },
          { id: 6, label: '主要业务范围', type: 'textarea', placeholder: '请描述主营业务范围及核心竞争优势', span: 24 },
        ],
      },
      {
        id: 3, icon: '🏆', title: '服务业绩', required: true,
        fields: [
          { id: 7, label: '主要项目业绩', type: 'textarea', placeholder: '请列举近三年的主要服务项目名称、甲方单位、项目金额等', span: 24 },
        ],
      },
    ],
    fileDescItems: [
      { id: 1, label: '变更说明函', placeholder: '请输入变更说明', required: true },
    ],
    qualAttachItems: [
      { id: 1, label: '营业执照扫描件', required: true },
      { id: 2, label: '法人身份证扫描件', required: true },
    ],
  },
  2: {
    seq: 2, name: '准入补充资料通知', unit: '西南油气田分公司', category: '准入流程',
    sections: [
      {
        id: 1, icon: '👥', title: '人员情况', required: true,
        fields: [
          { id: 1, label: '服务队伍人数', type: 'input', placeholder: '请输入服务队伍总人数', span: 12 },
          { id: 2, label: '技术人员数量', type: 'input', placeholder: '请输入技术人员数量', span: 12 },
          { id: 3, label: '人员资质情况', type: 'textarea', placeholder: '请描述主要人员的资质证书、执业资格等情况', span: 24 },
        ],
      },
      {
        id: 2, icon: '📊', title: '经营情况', required: true,
        fields: [
          { id: 4, label: '近三年营业收入（万元）', type: 'textarea', placeholder: '如：2022年200万元；2023年500万元；2024年800万元', span: 12 },
          { id: 5, label: '近三年净利润（万元）', type: 'textarea', placeholder: '如：2022年20万元；2023年80万元；2024年100万元', span: 12 },
          { id: 6, label: '主要业务范围', type: 'textarea', placeholder: '请描述主营业务范围及核心竞争优势', span: 24 },
        ],
      },
    ],
    fileDescItems: [
      { id: 1, label: '安全生产许可证说明', placeholder: '请输入说明', required: true },
    ],
    qualAttachItems: [
      { id: 1, label: '安全生产许可证扫描件', required: true },
      { id: 2, label: '业绩证明扫描件', required: false },
    ],
  },
  3: {
    seq: 3, name: '变更补充资料通知', unit: '大庆油田有限责任公司', category: '变更流程',
    sections: [
      {
        id: 1, icon: '👥', title: '人员情况', required: true,
        fields: [
          { id: 1, label: '服务队伍人数', type: 'input', placeholder: '请输入服务队伍总人数', span: 12 },
          { id: 2, label: '技术人员数量', type: 'input', placeholder: '请输入技术人员数量', span: 12 },
        ],
      },
    ],
    fileDescItems: [],
    qualAttachItems: [
      { id: 1, label: '新营业执照扫描件', required: true },
    ],
  },
};

export default function SupplementFill() {
  const hash = window.location.hash;
  const seqParam = hash.includes('seq=') ? new URLSearchParams(hash.split('?')[1]).get('seq') : '1';
  const template = templateMap[Number(seqParam)] || templateMap[1];

  const [fieldValues, setFieldValues] = useState<Record<number, string>>({});
  const [fileDescValues, setFileDescValues] = useState<Record<number, string>>({});
  const [qualFiles, setQualFiles] = useState<Record<number, UploadFile[]>>({});

  const handleFieldChange = (id: number, val: string) => setFieldValues(prev => ({ ...prev, [id]: val }));
  const handleFileDescChange = (id: number, val: string) => setFileDescValues(prev => ({ ...prev, [id]: val }));
  const handleQualChange = (id: number, files: UploadFile[]) => setQualFiles(prev => ({ ...prev, [id]: files }));

  const handleSubmit = () => {
    message.success('补充资料已提交');
    window.location.hash = '#/sp/workspace';
  };

  return (
    <div style={{ minHeight: 'calc(100vh - 56px - 48px)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <Typography.Title level={4} style={{ margin: 0 }}>补充资料填写 — {template.name}</Typography.Title>
        <Button onClick={() => window.location.hash = '#/sp/workspace'}>返回工作台</Button>
      </div>

      <Card size="small" variant="outlined" style={{ marginBottom: 16 }}>
        <Row gutter={24}>
          <Col span={8}><span style={{ color: '#999' }}>发送单位：</span><span>{template.unit}</span></Col>
          <Col span={8}><span style={{ color: '#999' }}>适用流程：</span><span>{template.category}</span></Col>
        </Row>
      </Card>

      {/* 分组表单区域 */}
      {template.sections.map(section => (
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
        >
          <Row gutter={24}>
            {section.fields.map(field => (
              <Col key={field.id} span={field.span || 24}>
                <div style={{ marginBottom: 16 }}>
                  <Typography.Text style={{ display: 'block', marginBottom: 8, fontSize: 14 }}>{field.label}</Typography.Text>
                  {field.type === 'input' ? (
                    <Input
                      placeholder={field.placeholder}
                      value={fieldValues[field.id] || ''}
                      onChange={e => handleFieldChange(field.id, e.target.value)}
                    />
                  ) : (
                    <Input.TextArea
                      rows={4}
                      placeholder={field.placeholder}
                      value={fieldValues[field.id] || ''}
                      onChange={e => handleFieldChange(field.id, e.target.value)}
                    />
                  )}
                </div>
              </Col>
            ))}
          </Row>
        </Card>
      ))}

      {/* 文件描述 */}
      {template.fileDescItems.length > 0 && (
        <Card size="small" variant="outlined" style={{ marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <div style={{ width: 4, height: 16, borderRadius: 4, background: '#ff4d4f' }} />
            <Typography.Text strong style={{ fontSize: 14 }}>文件描述</Typography.Text>
          </div>
          {template.fileDescItems.map(item => (
            <div key={item.id} style={{ marginBottom: 16 }}>
              <Space size={4} style={{ marginBottom: 8 }}>
                {item.required && <span style={{ color: '#ff4d4f' }}>*</span>}
                <Typography.Text>{item.label}</Typography.Text>
              </Space>
              <Input.TextArea
                rows={3}
                placeholder={item.placeholder || `请输入${item.label}`}
                value={fileDescValues[item.id] || ''}
                onChange={e => handleFileDescChange(item.id, e.target.value)}
              />
            </div>
          ))}
        </Card>
      )}

      {/* 资质附件 */}
      {template.qualAttachItems.length > 0 && (
        <Card size="small" variant="outlined" style={{ marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <div style={{ width: 4, height: 16, borderRadius: 4, background: '#ff4d4f' }} />
            <Typography.Text strong style={{ fontSize: 14 }}>资质附件</Typography.Text>
            <Typography.Text type="secondary" style={{ fontSize: 12 }}>支持上传多个文件</Typography.Text>
          </div>
          {template.qualAttachItems.map(item => {
            const files = qualFiles[item.id] || [];
            return (
              <div key={item.id} style={{ marginBottom: 16 }}>
                <Space size={4} style={{ marginBottom: 8 }}>
                  {item.required && <span style={{ color: '#ff4d4f' }}>*</span>}
                  <Typography.Text>{item.label}</Typography.Text>
                  {item.required && <Tag color="error" style={{ fontSize: 11 }}>必传</Tag>}
                </Space>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 8 }}>
                  {files.map((f, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '4px 8px', border: '1px solid #f0f0f0', borderRadius: 4, background: '#fafafa' }}>
                      <Typography.Text style={{ fontSize: 12 }}>{f.name}</Typography.Text>
                      <Typography.Link style={{ fontSize: 12, color: '#ff4d4f' }} onClick={() => {
                        handleQualChange(item.id, files.filter((_, i) => i !== idx));
                      }}>删除</Typography.Link>
                    </div>
                  ))}
                </div>
                <Upload
                  multiple
                  beforeUpload={() => false}
                  fileList={[]}
                  onChange={({ fileList }) => {
                    const newFiles = [...files, ...fileList.filter(f => !files.some(ef => ef.uid === f.uid))];
                    handleQualChange(item.id, newFiles);
                  }}
                >
                  <Button icon={<UploadOutlined />} size="small">上传文件</Button>
                </Upload>
              </div>
            );
          })}
        </Card>
      )}

      <Divider />
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
        <Button onClick={() => window.location.hash = '#/sp/workspace'}>取消</Button>
        <Button type="primary" danger onClick={handleSubmit}>提交</Button>
      </div>
    </div>
  );
}
