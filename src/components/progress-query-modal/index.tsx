import { Modal, Timeline, Tag, Typography, Space } from 'antd';

interface StepItem {
  step: string;
  unit: string;
  status: string;
  handler: string;
  submitTime: string;
  finishTime: string;
  approved: string;
  opinion: string;
}

interface Props {
  open: boolean;
  title?: string;
  data: StepItem[];
  onClose: () => void;
}

const statusColor: Record<string, string> = {
  '已通过': 'success',
  '已驳回': 'error',
  '已提交': 'processing',
  '已配码': 'success',
  '审核中': 'processing',
};

export default function ProgressQueryModal({ open, title = '进度流程查询', data, onClose }: Props) {
  return (
    <Modal
      open={open}
      title={title}
      onCancel={onClose}
      footer={null}
      width={680}
      destroyOnClose
    >
      <Timeline
        style={{ marginTop: 24 }}
        items={data.map((item) => ({
          color: item.approved === '驳回' ? 'red' : item.approved === '通过' ? 'green' : 'blue',
          children: (
            <div key={item.step + item.unit}>
              <Space style={{ marginBottom: 4 }}>
                <Typography.Text strong>{item.step} - {item.unit}</Typography.Text>
                <Tag color={statusColor[item.status] || 'default'}>{item.status}</Tag>
              </Space>
              <div style={{ fontSize: 13, color: '#666', lineHeight: 2 }}>
                <div>审核人：{item.handler}</div>
                <div>提交时间：{item.submitTime}</div>
                <div>完成时间：{item.finishTime}</div>
                {item.approved !== '—' && <div>审核结论：<Tag color={item.approved === '通过' ? 'green' : 'red'}>{item.approved}</Tag></div>}
                {item.opinion !== '—' && <div>审核意见：{item.opinion}</div>}
              </div>
            </div>
          ),
        }))}
      />
    </Modal>
  );
}
