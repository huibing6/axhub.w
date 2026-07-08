import React from 'react';
import { Modal, Descriptions, Tag, Timeline, Typography } from 'antd';
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  ClockCircleOutlined
} from '@ant-design/icons';

const { Text } = Typography;

interface ApprovalRecord {
  id: number;
  approver: string;
  decision: 'approved' | 'rejected';
  comment: string;
  time: string;
}

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

interface InspectionModalProps {
  open: boolean;
  record: InspectionRecord | null;
  onClose: () => void;
}

const typeLabels: Record<string, string> = {
  site: '现场考察',
  video: '视频考察'
};

const statusLabels: Record<string, { text: string; color: string }> = {
  pending: { text: '待审批', color: 'processing' },
  approved: { text: '审批通过', color: 'success' },
  rejected: { text: '审批拒绝', color: 'error' }
};

const InspectionModal: React.FC<InspectionModalProps> = ({ open, record, onClose }) => {
  if (!record) return null;

  const statusInfo = statusLabels[record.status];

  return (
    <Modal
      title="考察详情"
      open={open}
      onCancel={onClose}
      footer={null}
      width={700}
    >
      <Descriptions column={2} bordered size="small" style={{ marginTop: 16 }}>
        <Descriptions.Item label="编号">{record.id}</Descriptions.Item>
        <Descriptions.Item label="状态">
          <Tag color={statusInfo.color}>{statusInfo.text}</Tag>
        </Descriptions.Item>
        <Descriptions.Item label="考察名称" span={2}>{record.name}</Descriptions.Item>
        <Descriptions.Item label="类型">
          <Tag>{typeLabels[record.type]}</Tag>
        </Descriptions.Item>
        <Descriptions.Item label="考察日期">{record.inspectDate}</Descriptions.Item>
        <Descriptions.Item label="考察地点" span={2}>{record.address}</Descriptions.Item>
        <Descriptions.Item label="负责人">{record.manager}</Descriptions.Item>
        <Descriptions.Item label="联系方式">{record.contact}</Descriptions.Item>
        <Descriptions.Item label="创建人">{record.creator}</Descriptions.Item>
        <Descriptions.Item label="创建时间">{record.createTime}</Descriptions.Item>
        {record.approver && (
          <Descriptions.Item label="审批人" span={2}>{record.approver}</Descriptions.Item>
        )}
        <Descriptions.Item label="考察描述" span={2}>{record.description || '暂无描述'}</Descriptions.Item>
      </Descriptions>

      {record.approvalRecords.length > 0 && (
        <div style={{ marginTop: 24 }}>
          <Text strong style={{ fontSize: 16 }}>审批记录</Text>
          <Timeline
            style={{ marginTop: 12 }}
            items={record.approvalRecords.map((r) => ({
              color: r.decision === 'approved' ? 'green' : r.decision === 'rejected' ? 'red' : 'orange',
              dot: r.decision === 'approved'
                ? <CheckCircleOutlined style={{ color: '#52c41a' }} />
                : r.decision === 'rejected'
                  ? <CloseCircleOutlined style={{ color: '#ff4d4f' }} />
                  : <ClockCircleOutlined style={{ color: '#faad14' }} />,
              children: (
                <>
                  <div><Text strong>{r.approver}</Text>
                    <Tag color={r.decision === 'approved' ? 'success' : 'error'} style={{ marginLeft: 8 }}>
                      {r.decision === 'approved' ? '通过' : '拒绝'}
                    </Tag>
                  </div>
                  <div><Text type="secondary">{r.comment}</Text></div>
                  <div><Text type="secondary" style={{ fontSize: 12 }}>{r.time}</Text></div>
                </>
              )
            }))}
          />
        </div>
      )}
    </Modal>
  );
};

export default InspectionModal;
