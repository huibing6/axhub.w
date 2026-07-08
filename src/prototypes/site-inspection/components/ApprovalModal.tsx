import React, { useState } from 'react';
import { Modal, Descriptions, Tag, Input, Button, Space, message } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';

const { TextArea } = Input;

interface InspectionRecord {
  id: string;
  name: string;
  type: 'site' | 'video';
  status: 'pending' | 'approved' | 'rejected';
  creator: string;
  approver: string;
  createTime: string;
  inspectDate: string;
  address: string;
  manager: string;
  contact: string;
  description: string;
  approvalRecords: ApprovalRecord[];
}

interface ApprovalRecord {
  id: number;
  approver: string;
  decision: 'approved' | 'rejected';
  comment: string;
  time: string;
}

interface ApprovalModalProps {
  open: boolean;
  record: InspectionRecord | null;
  onClose: () => void;
  onSuccess: (record: InspectionRecord, decision: 'approved' | 'rejected') => void;
}

const typeLabels: Record<string, string> = {
  site: '现场考察',
  video: '视频考察'
};

const ApprovalModal: React.FC<ApprovalModalProps> = ({ open, record, onClose, onSuccess }) => {
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (!record) return null;

  const handleApprove = (decision: 'approved' | 'rejected') => {
    if (decision === 'rejected' && !comment.trim()) {
      message.warning('拒绝时请填写审批意见');
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      onSuccess(record, decision);
      setSubmitting(false);
      setComment('');
    }, 500);
  };

  return (
    <Modal
      title="审批"
      open={open}
      onCancel={() => {
        if (!submitting) {
          setComment('');
          onClose();
        }
      }}
      footer={null}
      width={600}
    >
      <Descriptions column={2} bordered size="small" style={{ marginTop: 16 }}>
        <Descriptions.Item label="编号">{record.id}</Descriptions.Item>
        <Descriptions.Item label="类型">
          <Tag>{typeLabels[record.type]}</Tag>
        </Descriptions.Item>
        <Descriptions.Item label="考察名称" span={2}>{record.name}</Descriptions.Item>
        <Descriptions.Item label="创建人">{record.creator}</Descriptions.Item>
        <Descriptions.Item label="创建时间">{record.createTime}</Descriptions.Item>
        <Descriptions.Item label="负责人">{record.manager}</Descriptions.Item>
        <Descriptions.Item label="联系方式">{record.contact}</Descriptions.Item>
        <Descriptions.Item label="考察日期">{record.inspectDate}</Descriptions.Item>
        <Descriptions.Item label="考察地点">{record.address}</Descriptions.Item>
      </Descriptions>

      <div style={{ marginTop: 20 }}>
        <div style={{ marginBottom: 8, fontWeight: 500 }}>审批意见</div>
        <TextArea
          rows={4}
          placeholder="请输入审批意见（拒绝时必填）"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </div>

      <div style={{ marginTop: 20, textAlign: 'right' }}>
        <Space>
          <Button onClick={() => { setComment(''); onClose(); }} disabled={submitting}>
            取消
          </Button>
          <Button
            type="primary"
            danger
            icon={<CloseOutlined />}
            loading={submitting}
            onClick={() => handleApprove('rejected')}
          >
            拒绝
          </Button>
          <Button
            type="primary"
            icon={<CheckOutlined />}
            loading={submitting}
            onClick={() => handleApprove('approved')}
          >
            通过
          </Button>
        </Space>
      </div>
    </Modal>
  );
};

export default ApprovalModal;
