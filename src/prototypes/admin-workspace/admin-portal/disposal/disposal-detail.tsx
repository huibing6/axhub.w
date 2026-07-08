/**
 * @name 处置详情
 */
import { useState } from 'react';
import { theme, Typography, Card, Space, Button, Table, Descriptions, Tag, message, Modal } from 'antd';
import PortalLayout from '../../common/portal-layout';
import { adminGroups } from '../../common/menu-data';
import { StatusTimeline, FilePreview } from '../../common/components';

const { Text } = Typography;

/* ─── 模拟数据 ─── */
const disposalInfo = {
  type: '冻结',
  freezeReason: '服务商存在重大安全隐患',
  freezeType: '主动冻结',
  applicant: '李明',
  submitTime: '2026-06-25 09:30',
  status: '待审批',
  disposalNo: 'DPS-20260625-001',
};

const companyInfo = {
  companyName: '湖北江汉石油机械制造有限公司',
  creditCode: '91420000706802345X',
  managementUnit: '江汉油田管理处',
};

const freezeDetails = {
  freezeTime: '2026-06-25 10:00',
  freezeDuration: '6个月',
  expectedUnfreezeTime: '2026-12-25 10:00',
  attachedFiles: [
    { name: '安全隐患整改通知书.pdf', size: '1.5 MB', uploadTime: '2026-06-25 09:45' },
    { name: '现场检查记录表.pdf', size: '856 KB', uploadTime: '2026-06-25 09:45' },
  ],
};

const timelineItems = [
  { status: '已提交', time: '2026-06-25 09:30', operator: '李明', opinion: '提交冻结申请' },
  { status: '部门审核', time: '2026-06-25 14:15', operator: '王部长', opinion: '材料齐全，同意冻结' },
  { status: '待审批', time: '2026-06-26 09:00', operator: '系统自动' },
];

const approvalRecords = [
  { key: '1', step: '部门审核', operator: '王部长', time: '2026-06-25 14:15', opinion: '材料齐全，同意冻结申请', result: '通过' },
  { key: '2', step: '提交申请', operator: '李明', time: '2026-06-25 09:30', opinion: '提交冻结申请', result: '提交' },
];

const approvalColumns = [
  { key: 'step', title: '审批环节', width: 120, dataIndex: 'step' },
  { key: 'operator', title: '审批人', width: 100, dataIndex: 'operator' },
  { key: 'time', title: '审批时间', width: 180, dataIndex: 'time' },
  { key: 'opinion', title: '审批意见', dataIndex: 'opinion', ellipsis: true },
  {
    key: 'result', title: '审批结果', width: 100, dataIndex: 'result',
    render: (v: string) => <Text type={v === '通过' ? 'success' : 'secondary'}>{v}</Text>,
  },
];

export default function DisposalDetail() {
  const { token: t } = theme.useToken();
  const [approveOpen, setApproveOpen] = useState(false);
  const [rejectOpen, setRejectOpen] = useState(false);

  return (
    <PortalLayout groups={adminGroups} activePath="/admin/disposal-review" portalType="admin">
      <Typography.Link onClick={() => window.history.back()} style={{ marginBottom: 8, display: 'block' }}>← 返回</Typography.Link>
      <Typography.Title level={4}>处置详情</Typography.Title>

      {/* 处置信息 */}
      <Card size="small" variant="outlined" title="处置信息" style={{ marginBottom: 16 }}>
        <Descriptions column={3} bordered size="small">
          <Descriptions.Item label="处置编号">{disposalInfo.disposalNo}</Descriptions.Item>
          <Descriptions.Item label="处置类型">
            <Tag color={disposalInfo.type === '冻结' ? 'warning' : 'success'}>{disposalInfo.type}</Tag>
          </Descriptions.Item>
          <Descriptions.Item label="冻结类型">{disposalInfo.freezeType}</Descriptions.Item>
          <Descriptions.Item label="冻结原因" span={2}>{disposalInfo.freezeReason}</Descriptions.Item>
          <Descriptions.Item label="申请人">{disposalInfo.applicant}</Descriptions.Item>
          <Descriptions.Item label="提交时间">{disposalInfo.submitTime}</Descriptions.Item>
          <Descriptions.Item label="当前状态">
            <Text type="warning">{disposalInfo.status}</Text>
          </Descriptions.Item>
        </Descriptions>
      </Card>

      {/* 服务商信息 */}
      <Card size="small" variant="outlined" title="服务商信息" style={{ marginBottom: 16 }}>
        <Descriptions column={3} bordered size="small">
          <Descriptions.Item label="服务商名称">{companyInfo.companyName}</Descriptions.Item>
          <Descriptions.Item label="统一社会信用代码">{companyInfo.creditCode}</Descriptions.Item>
          <Descriptions.Item label="管理单位">{companyInfo.managementUnit}</Descriptions.Item>
        </Descriptions>
      </Card>

      {/* 冻结详情 */}
      <Card size="small" variant="outlined" title="冻结详情" style={{ marginBottom: 16 }}>
        <Descriptions column={3} bordered size="small">
          <Descriptions.Item label="冻结时间">{freezeDetails.freezeTime}</Descriptions.Item>
          <Descriptions.Item label="冻结时长">{freezeDetails.freezeDuration}</Descriptions.Item>
          <Descriptions.Item label="预计解冻时间">{freezeDetails.expectedUnfreezeTime}</Descriptions.Item>
        </Descriptions>
        <div style={{ marginTop: 16 }}>
          <Typography.Text strong style={{ fontSize: 14, marginBottom: 8, display: 'block' }}>附件材料</Typography.Text>
          <FilePreview files={freezeDetails.attachedFiles} onDownload={(file) => console.log('下载文件:', file.name)} />
        </div>
      </Card>

      {/* 审批状态时间线 */}
      <Card size="small" variant="outlined" title="审批状态时间线" style={{ marginBottom: 16 }}>
        <StatusTimeline items={timelineItems} />
      </Card>

      {/* 审批记录 */}
      <Card size="small" variant="outlined" title="审批记录" style={{ marginBottom: 16 }}>
        <Table
          columns={approvalColumns}
          dataSource={approvalRecords}
          rowKey="key"
          pagination={false}
          bordered
          size="small"
        />
      </Card>

      {/* 操作按钮 */}
      <Space size={12}>
        <Button type="primary" onClick={() => setApproveOpen(true)}>审批通过</Button>
        <Button danger onClick={() => setRejectOpen(true)}>审批驳回</Button>
      </Space>

      {/* 审批通过弹窗 */}
      <Modal
        title="确认审批通过"
        open={approveOpen}
        onOk={() => { message.success('审批已通过'); setApproveOpen(false); }}
        onCancel={() => setApproveOpen(false)}
        okText="确认"
        cancelText="取消"
      >
        确认该处置申请审批通过？
      </Modal>

      {/* 审批驳回弹窗 */}
      <Modal
        title="确认审批驳回"
        open={rejectOpen}
        onOk={() => { message.success('已驳回'); setRejectOpen(false); }}
        onCancel={() => setRejectOpen(false)}
        okText="确认驳回"
        cancelText="取消"
        okButtonProps={{ danger: true }}
      >
        确认将该处置申请驳回？
      </Modal>
    </PortalLayout>
  );
}
