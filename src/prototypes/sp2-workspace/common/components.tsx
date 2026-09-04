/**
 * @name CommonComponents
 * 服务商2.0 - 公共组件
 */
import React from 'react';
import { useState } from 'react';
import { theme, Card, Typography, Tag, Space, Button, Modal, message, Upload, Input } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import type { UploadFile } from 'antd';
import { getQualAttachList } from './qualification-config';

/* ─── 卡片分区标题 ─── */
export function SectionTitle({ icon, title, tag }: { icon: string; title: string; tag?: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
      <span style={{ fontSize: 16 }}>{icon}</span>
      <Typography.Text strong style={{ fontSize: 14 }}>{title}</Typography.Text>
      {tag && (
        <span style={{
          background: '#fff1f0', color: '#ff4d4f', fontSize: 12, padding: '0 6px',
          borderRadius: 4, border: '1px solid #ffa39e',
        }}>
          {tag}
        </span>
      )}
    </div>
  );
}

/* ─── 状态标签 ─── */
const STATUS_MAP: Record<string, { color: string; label: string }> = {
  pending: { color: 'orange', label: '待审核' },
  reviewing: { color: 'blue', label: '审核中' },
  approved: { color: 'green', label: '已通过' },
  rejected: { color: 'red', label: '已驳回' },
  correction: { color: 'gold', label: '补正中' },
  active: { color: 'green', label: '已生效' },
  frozen: { color: 'default', label: '已冻结' },
  coding: { color: 'blue', label: '配码中' },
};

export function StatusTag({ status }: { status: string }) {
  const s = STATUS_MAP[status] || { color: 'default', label: status };
  return <Tag color={s.color}>{s.label}</Tag>;
}

/* ─── 空状态占位 ─── */
export function EmptyPlaceholder({ icon = '📄', text = '暂无数据' }: { icon?: string; text?: string }) {
  const { token: t } = theme.useToken();
  return (
    <div style={{
      background: t.colorBgContainer,
      borderRadius: t.borderRadius,
      border: `1px solid ${t.colorBorderSecondary}`,
      padding: 48,
      textAlign: 'center',
    }}>
      <div style={{ fontSize: 48, marginBottom: 16, color: t.colorTextQuaternary }}>{icon}</div>
      <Typography.Text type="secondary" style={{ fontSize: 14 }}>{text}</Typography.Text>
    </div>
  );
}

/* ─── 确认操作弹窗 ─── */
export function ConfirmAction({ title, content, onOk }: { title: string; content: string; onOk: () => void }) {
  Modal.confirm({
    title,
    content,
    okText: '确认',
    cancelText: '取消',
    okButtonProps: { danger: true },
    onOk() {
      message.success('操作成功');
      onOk();
    },
  });
}

/* ─── 资质附件（按专业品类配置，品类编辑区使用） ─── */
interface AttachFileState {
  fileName: string;
  startDate: string;
  endDate: string;
  permanent: boolean;
}

export function QualAttachCard({ categoryCode, categoryName }: { categoryCode: string; categoryName: string }) {
  const items = getQualAttachList(categoryCode);
  const [fileStates, setFileStates] = useState<Record<string, AttachFileState>>({});

  const updateFile = (name: string, patch: Partial<AttachFileState>) => {
    setFileStates(prev => ({ ...prev, [name]: { ...prev[name], fileName: '', startDate: '', endDate: '', permanent: false, ...prev[name], ...patch } }));
  };

  const removeFile = (name: string) => {
    setFileStates(prev => ({ ...prev, [name]: { fileName: '', startDate: '', endDate: '', permanent: false } }));
  };

  if (items.length === 0) {
    return (
      <Card variant="outlined" size="small" style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
          <Typography.Text strong style={{ fontSize: 14 }}>资质附件</Typography.Text>
          <span style={{ background: '#e6f7ff', color: '#1677ff', fontSize: 11, padding: '0 6px', borderRadius: 3, border: '1px solid #91d5ff' }}>
            按专业品类配置
          </span>
        </div>
        <Typography.Text type="secondary" style={{ fontSize: 13 }}>
          该品类（{categoryName}）为通用品类，无需上传资质附件。
        </Typography.Text>
      </Card>
    );
  }

  return (
    <Card variant="outlined" size="small" style={{ marginBottom: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
        <Typography.Text strong style={{ fontSize: 14 }}>资质附件</Typography.Text>
        <span style={{ background: '#e6f7ff', color: '#1677ff', fontSize: 11, padding: '0 6px', borderRadius: 3, border: '1px solid #91d5ff' }}>
          按专业品类配置
        </span>
        <Typography.Text type="secondary" style={{ fontSize: 12 }}>根据管理端为该专业品类配置的清单上传</Typography.Text>
      </div>
      {items.map((item, idx) => {
        const state = fileStates[item.name];
        const fileName = state?.fileName;
        return (
          <div key={idx} style={{ padding: '10px 0', borderBottom: idx < items.length - 1 ? '1px solid #f5f5f5' : 'none' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 260, fontSize: 13 }}>
                {item.required && <span style={{ color: '#ff4d4f', marginRight: 4 }}>*</span>}
                {item.name}
                {item.desc && (
                  <div style={{ fontSize: 12, color: '#999', marginTop: 2 }}>{item.desc}</div>
                )}
              </div>
              {fileName ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1 }}>
                  <Typography.Text style={{ fontSize: 13 }}>{fileName}</Typography.Text>
                  <Typography.Link style={{ fontSize: 12 }}>预览</Typography.Link>
                  <Typography.Link style={{ fontSize: 12, marginLeft: 8 }} onClick={() => removeFile(item.name)}>替换</Typography.Link>
                  <Typography.Link style={{ fontSize: 12, marginLeft: 8, color: '#ff4d4f' }} onClick={() => removeFile(item.name)}>删除</Typography.Link>
                </div>
              ) : (
                <Upload
                  showUploadList={false}
                  beforeUpload={(file) => {
                    updateFile(item.name, { fileName: file.name });
                    return false;
                  }}
                >
                  <Button size="small" icon={<UploadOutlined />}>上传文件</Button>
                </Upload>
              )}
            </div>
            {/* 有效期填写：仅在 hasValidityPeriod 且已上传文件后显示 */}
            {item.hasValidityPeriod && fileName && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8, paddingLeft: 272 }}>
                <Typography.Text style={{ fontSize: 12, color: '#666', whiteSpace: 'nowrap' }}>有效期：</Typography.Text>
                <Input
                  size="small"
                  value={state?.startDate || ''}
                  onChange={e => updateFile(item.name, { startDate: e.target.value })}
                  placeholder="年/月/日"
                  style={{ width: 110 }}
                  disabled={state?.permanent}
                />
                <Typography.Text type="secondary" style={{ fontSize: 12 }}>至</Typography.Text>
                <Input
                  size="small"
                  value={state?.endDate || ''}
                  onChange={e => updateFile(item.name, { endDate: e.target.value })}
                  placeholder="年/月/日"
                  style={{ width: 110 }}
                  disabled={state?.permanent}
                />
                <label style={{ fontSize: 12, display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={state?.permanent || false}
                    onChange={e => updateFile(item.name, { permanent: e.target.checked, startDate: '', endDate: '' })}
                    style={{ accentColor: '#ff4d4f' }}
                  />
                  永久有效
                </label>
              </div>
            )}
          </div>
        );
      })}
    </Card>
  );
}

/* ─── ActionModal (操作弹窗，children 自定义内容) ─── */
export function ActionModal({
  open, title, onOk, onCancel, confirmLoading, children,
}: {
  open: boolean;
  title: string;
  onOk: () => void;
  onCancel: () => void;
  confirmLoading?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <Modal
      open={open}
      title={title}
      onOk={onOk}
      onCancel={onCancel}
      confirmLoading={confirmLoading}
      destroyOnClose
    >
      {children}
    </Modal>
  );
}

/* ─── ConfirmDialog (操作确认弹窗) ─── */
export function ConfirmDialog({
  open, title, content, onOk, onCancel, confirmLoading, danger,
}: {
  open: boolean;
  title: string;
  content: string;
  onOk: () => void;
  onCancel: () => void;
  confirmLoading?: boolean;
  danger?: boolean;
}) {
  return (
    <Modal
      open={open}
      title={title}
      onOk={onOk}
      onCancel={onCancel}
      confirmLoading={confirmLoading}
      okButtonProps={danger ? { danger: true } : undefined}
      okText="确认"
      cancelText="取消"
      destroyOnClose
    >
      <Typography.Text>{content}</Typography.Text>
    </Modal>
  );
}

/* ─── ReviewModal (审核操作弹窗，含意见填写) ─── */
export function ReviewModal({
  open, title, onOk, onCancel, content, confirmLoading,
}: {
  open: boolean;
  title: string;
  onOk: () => void;
  onCancel: () => void;
  content?: React.ReactNode;
  confirmLoading?: boolean;
}) {
  const [opinion, setOpinion] = useState('');
  return (
    <Modal
      open={open}
      title={title}
      onOk={onOk}
      onCancel={onCancel}
      confirmLoading={confirmLoading}
      okText="通过"
      cancelText="取消"
      destroyOnClose
    >
      <div style={{ marginBottom: 12 }}>
        <Typography.Text style={{ fontSize: 13 }}>
          {content || '请确认审核结果，通过后将进入下一环节。'}
        </Typography.Text>
      </div>
      <div>
        <Typography.Text style={{ fontSize: 13, display: 'block', marginBottom: 6 }}>
          审核意见 <span style={{ color: '#ff4d4f' }}>*</span>
        </Typography.Text>
        <Input.TextArea
          rows={3}
          value={opinion}
          onChange={e => setOpinion(e.target.value)}
          placeholder="请填写审核意见"
        />
      </div>
    </Modal>
  );
}
