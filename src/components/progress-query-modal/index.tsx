import { Modal, Table, Typography, Button } from 'antd';

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

const columns = [
  { key: 'step', title: '步骤', dataIndex: 'step', width: 80 },
  {
    key: 'unit', title: '受理单位', dataIndex: 'unit', width: 120,
    render: (v: string) => <Typography.Text style={{ color: '#ff4d4f' }}>{v}</Typography.Text>,
  },
  { key: 'status', title: '状态', dataIndex: 'status', width: 90 },
  { key: 'handler', title: '受理人', dataIndex: 'handler', width: 100 },
  { key: 'submitTime', title: '受理时间', dataIndex: 'submitTime', width: 170 },
  { key: 'finishTime', title: '完成时间', dataIndex: 'finishTime', width: 170 },
  { key: 'approved', title: '审批是否通过', dataIndex: 'approved', width: 120 },
  { key: 'opinion', title: '处理意见', dataIndex: 'opinion', ellipsis: true },
];

export default function ProgressQueryModal({ open, title = '进度流程查询', data, onClose }: Props) {
  return (
    <Modal
      open={open}
      title={title}
      onCancel={onClose}
      width={960}
      footer={
        <Button type="primary" danger onClick={onClose}>关闭</Button>
      }
      destroyOnClose
    >
      <Table
        columns={columns}
        dataSource={data.map((item, i) => ({ ...item, _key: i }))}
        rowKey="_key"
        pagination={false}
        bordered
        size="middle"
        style={{ marginTop: 16 }}
      />
    </Modal>
  );
}
