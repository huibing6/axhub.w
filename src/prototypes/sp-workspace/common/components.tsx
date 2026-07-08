/**
 * @name CommonComponents
 * 公共UI组件集 - 基于 Ant Design 原生组件 (YMZEC 主题)
 */
import React from 'react';
import { Table, Steps, Card, Tabs as AntTabs, Typography, Space, theme, Tag, Modal, Input, Form, message, Button as AntButton } from 'antd';

/* ─── DataTable ─── */
interface Column { key: string; title: string; width?: number; align?: 'left' | 'center' | 'right'; }
export function DataTable({
  columns, data, pagination, rowSelection, onRow, loading,
}: {
  columns: Column[];
  data: Record<string, React.ReactNode>[];
  pagination?: any;
  rowSelection?: any;
  onRow?: (record: any) => any;
  loading?: boolean;
}) {
  const { token: t } = theme.useToken();
  const antColumns = columns.map(col => ({
    key: col.key,
    title: col.title,
    dataIndex: col.key,
    width: col.width,
    align: col.align || 'left',
    ellipsis: true,
  }));
  return (
    <Table
      columns={antColumns}
      dataSource={data.map((item, idx) => ({ ...item, _key: idx }))}
      rowKey="_key"
      pagination={pagination === undefined ? { pageSize: 10, showSizeChanger: true, showTotal: (t: number) => `共 ${t} 条` } : pagination}
      size="middle"
      bordered
      loading={loading}
      rowSelection={rowSelection}
      onRow={onRow}
      style={{ background: t.colorBgContainer, borderRadius: t.borderRadius }}
    />
  );
}

/* ─── StepWizard ─── */
export function StepWizard({ steps, current }: { steps: string[]; current: number }) {
  const items = steps.map((step, i) => ({ title: step }));
  return (
    <div style={{ marginBottom: 24 }}>
      <Steps current={current} items={items} size="small" />
    </div>
  );
}

/* ─── CardSection ─── */
export function CardSection({ title, icon, children, extra }: { title: string; icon?: string; children: React.ReactNode; extra?: React.ReactNode }) {
  return (
    <Card
      title={
        <Space size={8}>
          {icon && <span>{icon}</span>}
          <span style={{ fontSize: 14, fontWeight: 600 }}>{title}</span>
        </Space>
      }
      extra={extra}
      size="small"
      style={{ marginBottom: 16 }}
      variant="outlined"
    >
      {children}
    </Card>
  );
}

/* ─── SearchFilter ─── */
interface FilterField { key: string; label: string; type?: 'input' | 'select'; options?: string[]; placeholder?: string; }
export function SearchFilter({
  fields, values, onChange, onSearch, extra, loading,
}: {
  fields: FilterField[];
  values: Record<string, string>;
  onChange: (key: string, value: string) => void;
  onSearch?: () => void;
  extra?: React.ReactNode;
  loading?: boolean;
}) {
  return (
    <Card size="small" style={{ marginBottom: 16 }} variant="outlined">
      <Space direction="vertical" style={{ width: '100%' }} size={12}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 12 }}>
          {fields.map((f) => (
            <Space key={f.key} size={8}>
              <Typography.Text style={{ whiteSpace: 'nowrap', fontSize: 14 }}>{f.label}</Typography.Text>
              {f.type === 'select' ? (
                <select
                  value={values[f.key] || '全部'}
                  onChange={e => onChange(f.key, e.target.value)}
                  style={{
                    flex: 1, height: 32, border: '1px solid #d9d9d9', borderRadius: 4,
                    padding: '0 8px', fontSize: 14, outline: 'none', background: '#fff', color: 'rgba(0,0,0,0.88)',
                    width: 200,
                  }}
                >
                  {(f.options || []).map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              ) : (
                <input
                  value={values[f.key] || ''}
                  onChange={e => onChange(f.key, e.target.value)}
                  placeholder={f.placeholder}
                  style={{
                    flex: 1, height: 32, border: '1px solid #d9d9d9', borderRadius: 4,
                    padding: '0 8px', fontSize: 14, outline: 'none', color: 'rgba(0,0,0,0.88)', width: 200,
                  }}
                />
              )}
            </Space>
          ))}
        </div>
        <Space size={12}>
          <AntButton type="primary" onClick={onSearch} loading={loading}>查询</AntButton>
          {extra}
        </Space>
      </Space>
    </Card>
  );
}

/* ─── FormField ─── */
export function FormField({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 12 }}>
      <label style={{ whiteSpace: 'nowrap', width: 120, textAlign: 'right', fontSize: 14, color: 'rgba(0,0,0,0.88)', lineHeight: '32px' }}>
        {required && <span style={{ color: '#ff4d4f', marginRight: 4 }}>*</span>}{label}
      </label>
      <div style={{ flex: 1 }}>{children}</div>
    </div>
  );
}

/* ─── PageHeader ─── */
export function PageHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <Typography.Title level={4} style={{ margin: 0 }}>{title}</Typography.Title>
      {subtitle && <Typography.Text type="secondary">{subtitle}</Typography.Text>}
    </div>
  );
}

/* ─── ActionModal ─── */
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

/* ─── ReviewModal (审核/审批弹窗) ─── */
export function ReviewModal({
  open, title, onOk, onCancel, confirmLoading,
}: {
  open: boolean;
  title: string;
  onOk: (opinion: string, approved: boolean) => void;
  onCancel: () => void;
  confirmLoading?: boolean;
}) {
  const [opinion, setOpinion] = React.useState('');

  return (
    <Modal
      open={open}
      title={title}
      onCancel={onCancel}
      footer={null}
      destroyOnClose
    >
      <Form layout="vertical">
        <Form.Item label="审核意见" required>
          <Input.TextArea rows={4} value={opinion} onChange={e => setOpinion(e.target.value)} placeholder="请输入审核意见" />
        </Form.Item>
        <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
          <AntButton onClick={onCancel}>取消</AntButton>
          <AntButton onClick={() => { onOk(opinion, false); }} loading={confirmLoading}>驳回</AntButton>
          <AntButton type="primary" onClick={() => { onOk(opinion, true); }} loading={confirmLoading}>通过</AntButton>
        </Space>
      </Form>
    </Modal>
  );
}

/* ─── ShowConfirm ─── */
export function showConfirm(title: string, content: string, onOk: () => void) {
  Modal.confirm({
    title,
    content,
    okText: '确认',
    cancelText: '取消',
    onOk,
  });
}

/* ─── StatusTag ─── */
export function StatusTag({ status }: { status: string }) {
  const colorMap: Record<string, string> = {
    '待提交': 'default', '待复核': 'processing', '待审批': 'processing',
    '待审核': 'processing', '复核通过': 'success', '已完成': 'success',
    '已审批': 'success', '同步完成': 'success',
    '已拒绝': 'error', '复核退回': 'error', '已退回': 'error', '已驳回': 'error',
    '已终止': 'warning', '已冻结': 'warning',
    '同步验证驳回': 'error',
    '正常': 'success',
  };
  return <Tag color={colorMap[status] || 'default'}>{status}</Tag>;
}

/* ─── StatusTimeline (审批状态时间线) ─── */
interface TimelineItem {
  status: string;
  time: string;
  operator?: string;
  opinion?: string;
}
export function StatusTimeline({ items }: { items: TimelineItem[] }) {
  const { token: t } = theme.useToken();
  const getStatusColor = (status: string): string => {
    if (['已完成', '已审批', '复核通过', '通过'].includes(status)) return '#52c41a';
    if (['已拒绝', '已退回', '已驳回', '驳回'].includes(status)) return '#ff4d4f';
    if (['待审核', '待复核', '待审批', '处理中'].includes(status)) return '#1890ff';
    return '#d9d9d9';
  };

  return (
    <div style={{ padding: '16px 0' }}>
      {items.map((item, idx) => (
        <div key={idx} style={{ display: 'flex', gap: 12, marginBottom: idx < items.length - 1 ? 24 : 0 }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{
              width: 10, height: 10, borderRadius: '50%',
              background: getStatusColor(item.status),
              border: `2px solid ${getStatusColor(item.status)}`,
              flexShrink: 0,
            }} />
            {idx < items.length - 1 && (
              <div style={{ width: 2, flex: 1, background: '#f0f0f0', marginTop: 4 }} />
            )}
          </div>
          <div style={{ flex: 1, paddingBottom: 4 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
              <Typography.Text strong style={{ fontSize: 14 }}>{item.status}</Typography.Text>
              <Typography.Text type="secondary" style={{ fontSize: 12 }}>{item.time}</Typography.Text>
            </div>
            {item.operator && (
              <Typography.Text type="secondary" style={{ fontSize: 12 }}>操作人：{item.operator}</Typography.Text>
            )}
            {item.opinion && (
              <div style={{ marginTop: 4, padding: '8px 12px', background: t.colorBgLayout, borderRadius: 4, fontSize: 13 }}>
                <Typography.Text type="secondary">意见：{item.opinion}</Typography.Text>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── DetailPanel (嵌入式详情面板) ─── */
interface DetailField {
  label: string;
  value: React.ReactNode;
  span?: number;
}
export function DetailPanel({
  title, fields, onClose, extra,
}: {
  title: string;
  fields: DetailField[];
  onClose?: () => void;
  extra?: React.ReactNode;
}) {
  const { token: t } = theme.useToken();
  return (
    <Card
      title={title}
      extra={extra || (onClose && <AntButton onClick={onClose}>关闭</AntButton>)}
      size="small"
      style={{ marginBottom: 16, border: `1px solid ${t.colorPrimaryBg}` }}
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '12px 24px' }}>
        {fields.map((field, idx) => (
          <div key={idx}>
            <Typography.Text type="secondary" style={{ fontSize: 12 }}>{field.label}</Typography.Text>
            <div style={{ fontSize: 14, marginTop: 2 }}>{field.value || '-'}</div>
          </div>
        ))}
      </div>
    </Card>
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

/* ─── FilePreview (文件预览组件) ─── */
interface FileInfo {
  name: string;
  url?: string;
  size?: string;
  uploadTime?: string;
}
export function FilePreview({ files, onDownload }: { files: FileInfo[]; onDownload?: (file: FileInfo) => void }) {
  const { token: t } = theme.useToken();
  if (!files || files.length === 0) {
    return <Typography.Text type="secondary">暂无文件</Typography.Text>;
  }
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {files.map((file, idx) => (
        <div key={idx} style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '8px 12px', background: t.colorBgLayout, borderRadius: 4,
          border: `1px solid ${t.colorBorderSecondary}`,
        }}>
          <Space size={12}>
            <span style={{ fontSize: 16 }}>📄</span>
            <div>
              <Typography.Text style={{ fontSize: 13 }}>{file.name}</Typography.Text>
              {file.size && <Typography.Text type="secondary" style={{ fontSize: 12, marginLeft: 8 }}>{file.size}</Typography.Text>}
            </div>
          </Space>
          <Space size={8}>
            {file.uploadTime && <Typography.Text type="secondary" style={{ fontSize: 12 }}>{file.uploadTime}</Typography.Text>}
            <AntButton type="link" size="small" onClick={() => onDownload?.(file)}>下载</AntButton>
          </Space>
        </div>
      ))}
    </div>
  );
}
