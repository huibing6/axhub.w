/**
 * @name 资质维护
 */
import { useState } from 'react';
import { ConfirmDialog } from '../common/components';
import {
  theme, Card, Form, Input, Typography, message, Button as AntButton, Upload, Checkbox, DatePicker,
} from 'antd';
import { UploadOutlined, PlusOutlined } from '@ant-design/icons';

function SectionTitle({ icon, title }: { icon: string; title: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
      <span style={{ fontSize: 16 }}>{icon}</span>
      <Typography.Text strong style={{ fontSize: 14 }}>{title}</Typography.Text>
    </div>
  );
}

export default function SpQualMaintain() {
  const [form] = Form.useForm();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const requiredDocTypes = [
    '营业执照',
    '专业资质证书',
    '无重大违法违规承诺',
    '信用信息合规（4大平台无黑名单）',
    '服务商准入承诺书',
    '中标通知书',
  ];

  const handleSaveDraft = () => {
    message.success('草稿已保存');
  };

  const handleSubmitReview = () => {
    setConfirmOpen(true);
  };

  return (
    <div>
      <Typography.Title level={4} style={{ marginTop: 0, marginBottom: 20 }}>资质维护</Typography.Title>

      {/* 资质文件上传 */}
      <Card variant="outlined" size="small" style={{ marginBottom: 16 }}>
        <SectionTitle icon="📄" title="资质文件上传" />
        <div style={{ border: '1px solid #f0f0f0', borderRadius: 8, overflow: 'hidden' }}>
          {/* 表头 */}
          <div style={{
            display: 'grid', gridTemplateColumns: '200px 1fr 160px 300px',
            background: '#fafafa', padding: '12px 16px', borderBottom: '1px solid #f0f0f0',
            fontWeight: 500, fontSize: 13,
          }}>
            <span>文件类型</span>
            <span>文件上传</span>
            <span>备注</span>
            <span>有效时间</span>
          </div>

          {/* 必填文件行 */}
          {requiredDocTypes.map((docType) => (
            <div key={docType} style={{
              display: 'grid', gridTemplateColumns: '200px 1fr 160px 300px',
              padding: '12px 16px', borderBottom: '1px solid #f0f0f0',
              alignItems: 'center', gap: 12,
            }}>
              <span style={{ fontSize: 13 }}>
                <span style={{ color: '#ff4d4f', marginRight: 4 }}>*</span>
                {docType}
              </span>
              <div>
                <Upload customRequest={() => message.info('文件上传功能待对接')}>
                  <AntButton icon={<UploadOutlined />}>上传文件</AntButton>
                </Upload>
              </div>
              <Input placeholder="备注" size="small" />
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                <DatePicker placeholder="年/月/日" size="small" style={{ width: 110 }} />
                <Typography.Text type="secondary">至</Typography.Text>
                <DatePicker placeholder="年/月/日" size="small" style={{ width: 110 }} />
                <Checkbox>永久有效</Checkbox>
              </div>
            </div>
          ))}

          {/* 自定义附件行（已上传） */}
          <div style={{
            display: 'grid', gridTemplateColumns: '200px 1fr 160px 300px',
            padding: '12px 16px', borderBottom: '1px solid #f0f0f0',
            alignItems: 'center', gap: 12,
          }}>
            <span style={{ fontSize: 13 }}>ISO 9001 质量管理体系认证证书</span>
            <div>
              <Typography.Text style={{ fontSize: 13 }}>ISO9001_cert.pdf</Typography.Text>
              <div style={{ marginTop: 4 }}>
                <Typography.Link style={{ fontSize: 12 }}>预览</Typography.Link>
                <Typography.Link style={{ fontSize: 12, marginLeft: 8 }}>替换</Typography.Link>
                <Typography.Link style={{ fontSize: 12, marginLeft: 8, color: '#ff4d4f' }}>删除</Typography.Link>
              </div>
            </div>
            <Input defaultValue="自定义附件" size="small" />
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <DatePicker size="small" style={{ width: 110 }} placeholder="年/月/日" />
              <Typography.Text type="secondary">至</Typography.Text>
              <DatePicker size="small" style={{ width: 110 }} placeholder="年/月/日" />
            </div>
          </div>
        </div>

        {/* 添加自定义附件 */}
        <div style={{ marginTop: 12 }}>
          <AntButton type="link" icon={<PlusOutlined />} style={{ padding: 0 }}>添加自定义附件</AntButton>
        </div>
      </Card>

      {/* 底部操作栏 */}
      <div style={{
        display: 'flex',
        justifyContent: 'flex-end',
        gap: 12,
        padding: '16px 0',
        borderTop: '1px solid #f0f0f0',
        marginTop: 16,
      }}>
        <AntButton>上一步</AntButton>
        <AntButton onClick={handleSaveDraft}>保存草稿</AntButton>
        <AntButton type="primary" danger onClick={handleSubmitReview}>提交审核</AntButton>
      </div>

      <ConfirmDialog
        open={confirmOpen}
        title="确认提交资质维护"
        content="提交后将进入审批流程，是否确认提交？"
        onOk={() => {
          setSubmitting(true);
          setTimeout(() => {
            setSubmitting(false);
            setConfirmOpen(false);
            message.success('资质维护已提交审核');
          }, 800);
        }}
        onCancel={() => setConfirmOpen(false)}
        confirmLoading={submitting}
      />
    </div>
  );
}
