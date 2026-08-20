/**
 * @name 注册进度看板
 * 服务商单人视角：展示本人注册申请的审核进度。
 * 多专业品类并行审核、互不排斥：任一品类通过即服务商注册成功，
 * 其余品类继续各自审批，通过后补充纳入；注册成功后进入 MDG 配码环节。
 */
import { useState } from 'react';
import { theme, Card, Typography, Space, Select, Row, Col, Tag, Button, message } from 'antd';
import {
  CheckCircleFilled, ClockCircleFilled, CloseCircleFilled, LoadingOutlined,
  DownOutlined, FileTextOutlined,
} from '@ant-design/icons';

type DeptStatus = 'pending' | 'reviewing' | 'approved' | 'rejected';
type MdgStage = 'none' | 'coding' | 'coded';

interface DeptReview {
  categoryCode: string;
  categoryName: string;
  deptName: string;
  status: DeptStatus;
  time?: string;
  approver?: string;
  opinion?: string;
}

interface ProgressRecord {
  id: number;
  spName: string;
  spCode: string;
  submitTime: string;
  totalStatus: 'reviewing' | 'registered' | 'approved' | 'rejected';
  wzReview: {
    status: 'completed' | 'current' | 'pending';
    time?: string;
    approver?: string;
    opinion?: string;
  };
  deptReviews: DeptReview[];
  mdgStage: MdgStage;
  mdgCode?: string;
  onlyGeneral?: boolean;
}

const mockRecords: ProgressRecord[] = [
  {
    /* 核心场景：任一品类通过 → 注册成功，其余品类继续审批，MDG 配码中 */
    id: 1,
    spName: '中海油能源发展股份有限公司',
    spCode: '100001231',
    submitTime: '2026-06-10 14:30',
    totalStatus: 'registered',
    wzReview: {
      status: 'completed',
      time: '2026-06-11 09:00',
      approver: '王芳',
      opinion: '基础信息符合要求，转专业部门审核',
    },
    deptReviews: [
      {
        categoryCode: 'S0101000',
        categoryName: '咨询服务',
        deptName: '咨询资质审核部',
        status: 'approved',
        time: '2026-06-12 10:20',
        approver: '赵强',
        opinion: '资质证书齐全有效，审核通过',
      },
      {
        categoryCode: 'S0201000',
        categoryName: '物化探服务',
        deptName: '物化探技术审核部',
        status: 'reviewing',
        time: '2026-06-12 10:25',
        approver: '孙丽',
      },
    ],
    mdgStage: 'coding',
  },
  {
    /* 进行中：无一品类通过 */
    id: 2,
    spName: '杰瑞石油装备技术有限公司',
    spCode: '100001245',
    submitTime: '2026-06-15 10:15',
    totalStatus: 'reviewing',
    wzReview: {
      status: 'completed',
      time: '2026-06-16 14:20',
      approver: '陈静',
      opinion: '基础信息符合要求，转专业部门审核',
    },
    deptReviews: [
      {
        categoryCode: 'S0301000',
        categoryName: '工序外协加工服务',
        deptName: '装备制造审核部',
        status: 'reviewing',
        time: '2026-06-16 15:00',
        approver: '周敏',
      },
      {
        categoryCode: 'S0501000',
        categoryName: '科技项目服务',
        deptName: '科技服务审核部',
        status: 'pending',
      },
    ],
    mdgStage: 'none',
  },
  {
    /* 全部通过：MDG 已生效，完整链路 */
    id: 3,
    spName: '大庆油田工程建设有限公司',
    spCode: '100001256',
    submitTime: '2026-06-05 08:45',
    totalStatus: 'approved',
    wzReview: {
      status: 'completed',
      time: '2026-06-06 10:30',
      approver: '王芳',
      opinion: '审核通过，同意注册',
    },
    deptReviews: [
      {
        categoryCode: 'S0102000',
        categoryName: '勘查服务',
        deptName: '勘查资质审核部',
        status: 'approved',
        time: '2026-06-07 09:00',
        approver: '郑华',
        opinion: '勘查资质有效，通过',
      },
      {
        categoryCode: 'S0501000',
        categoryName: '科技项目服务',
        deptName: '科技服务审核部',
        status: 'approved',
        time: '2026-06-07 16:40',
        approver: '吴磊',
        opinion: '研发能力符合要求，通过',
      },
    ],
    mdgStage: 'coded',
    mdgCode: 'M20260607001',
  },
  {
    /* 全部驳回：补正后重新提交 */
    id: 4,
    spName: '胜利油田装备制造有限公司',
    spCode: '100001267',
    submitTime: '2026-05-28 09:00',
    totalStatus: 'rejected',
    wzReview: {
      status: 'completed',
      time: '2026-05-29 11:00',
      approver: '陈静',
      opinion: '基础信息符合要求，转专业部门审核',
    },
    deptReviews: [
      {
        categoryCode: 'S0101000',
        categoryName: '咨询服务',
        deptName: '咨询资质审核部',
        status: 'rejected',
        time: '2026-05-30 16:10',
        approver: '赵强',
        opinion: '咨询服务资质证书已过期，请补充后重新提交',
      },
      {
        categoryCode: 'S0201000',
        categoryName: '物化探服务',
        deptName: '物化探技术审核部',
        status: 'rejected',
        time: '2026-05-31 10:20',
        approver: '孙丽',
        opinion: '缺少安全生产许可证，请补充后重新提交',
      },
    ],
    mdgStage: 'none',
  },
  {
    /* 仅通用品类：无需专业审核 */
    id: 5,
    spName: '中原油田工程建设有限公司',
    spCode: '100001278',
    submitTime: '2026-06-02 09:00',
    totalStatus: 'approved',
    wzReview: {
      status: 'completed',
      time: '2026-06-03 10:30',
      approver: '王芳',
      opinion: '审核通过，同意注册',
    },
    deptReviews: [],
    mdgStage: 'coded',
    mdgCode: 'M20260603002',
    onlyGeneral: true,
  },
];

const DEPT_STATUS: Record<DeptStatus, { color: string; label: string; icon: React.ReactNode }> = {
  pending: { color: '#faad14', label: '待审核', icon: <ClockCircleFilled style={{ color: '#faad14', fontSize: 16 }} /> },
  reviewing: { color: '#1677ff', label: '审核中', icon: <LoadingOutlined style={{ color: '#1677ff', fontSize: 16 }} /> },
  approved: { color: '#52c41a', label: '已通过', icon: <CheckCircleFilled style={{ color: '#52c41a', fontSize: 16 }} /> },
  rejected: { color: '#ff4d4f', label: '已驳回', icon: <CloseCircleFilled style={{ color: '#ff4d4f', fontSize: 16 }} /> },
};

const TOTAL_STATUS_TAG: Record<ProgressRecord['totalStatus'], { color: string; label: string }> = {
  reviewing: { color: 'warning', label: '审核中' },
  registered: { color: 'processing', label: '注册成功' },
  approved: { color: 'success', label: '已生效' },
  rejected: { color: 'error', label: '已驳回' },
};

/* ─── 主线节点 ─── */
function MainNode({ label, status, time, approver, opinion, isLast, children }: {
  label: string;
  status: 'completed' | 'current' | 'pending' | 'skipped';
  time?: string;
  approver?: string;
  opinion?: string;
  isLast: boolean;
  children?: React.ReactNode;
}) {
  const { token: t } = theme.useToken();
  const styles: Record<string, { dot: string; text: string }> = {
    completed: { dot: '#52c41a', text: '#52c41a' },
    current: { dot: '#ff4d4f', text: '#ff4d4f' },
    pending: { dot: '#d9d9d9', text: '#999' },
    skipped: { dot: '#f0f0f0', text: '#ccc' },
  };
  const style = styles[status] || styles.pending;

  return (
    <div>
      <div style={{ display: 'flex', gap: 12 }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{
            width: 14, height: 14, borderRadius: '50%',
            background: status === 'skipped' ? '#f0f0f0' : style.dot,
            border: status === 'skipped' ? '2px dashed #d9d9d9' : `2px solid ${style.dot}`,
            flexShrink: 0,
          }} />
          {!isLast && <div style={{ width: 2, flex: 1, background: '#f0f0f0', marginTop: 4 }} />}
        </div>
        <div style={{ flex: 1, paddingBottom: 4 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <Typography.Text strong style={{ fontSize: 14, color: status === 'skipped' ? '#ccc' : style.text }}>
              {label}
            </Typography.Text>
            {status === 'current' && <Tag color="processing" style={{ margin: 0 }}>当前节点</Tag>}
            {status === 'completed' && <Tag color="success" style={{ margin: 0 }}>已完成</Tag>}
            {status === 'skipped' && <Tag style={{ margin: 0 }}>无需处理</Tag>}
          </div>
          {time && (
            <Typography.Text type="secondary" style={{ fontSize: 12, display: 'block' }}>
              {time}
            </Typography.Text>
          )}
          {approver && (
            <Typography.Text type="secondary" style={{ fontSize: 12 }}>
              操作人：{approver}
            </Typography.Text>
          )}
          {opinion && (
            <div style={{
              marginTop: 6, padding: '8px 12px',
              background: t.colorBgLayout, borderRadius: 4,
              fontSize: 13, border: `1px solid ${t.colorBorderSecondary}`,
            }}>
              <Typography.Text type="secondary">审核意见：{opinion}</Typography.Text>
            </div>
          )}
        </div>
      </div>
      {children}
    </div>
  );
}

/* ─── 专业部门审核并行分支节点 ─── */
function DeptBranch({ review, isLast }: { review: DeptReview; isLast: boolean }) {
  const { token: t } = theme.useToken();
  const [expanded, setExpanded] = useState(!!review.opinion);
  const cfg = DEPT_STATUS[review.status];

  return (
    <div style={{ display: 'flex', gap: 12, paddingLeft: 26 }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{
          width: 12, height: 12, borderRadius: '50%',
          background: review.status === 'pending' ? '#fff' : cfg.color,
          border: `2px solid ${cfg.color}`, flexShrink: 0,
        }} />
        {!isLast && <div style={{ width: 2, flex: 1, background: '#f0f0f0', marginTop: 4 }} />}
      </div>
      <div style={{ flex: 1, paddingBottom: isLast ? 4 : 12 }}>
        <div style={{
          border: `1px solid ${review.status === 'rejected' ? '#ffa39e' : t.colorBorderSecondary}`,
          background: review.status === 'rejected' ? '#fff2f0' : t.colorBgContainer,
          borderRadius: 6, padding: '10px 14px',
        }}>
          <div
            style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', cursor: 'pointer' }}
            onClick={() => setExpanded(!expanded)}
          >
            {cfg.icon}
            <Typography.Text strong style={{ fontSize: 13 }}>{review.categoryName}</Typography.Text>
            <Tag style={{ margin: 0 }}>{review.categoryCode}</Tag>
            <Tag color="blue" style={{ margin: 0 }}>审核部门：{review.deptName}</Tag>
            <span style={{ flex: 1 }} />
            <Tag
              color={review.status === 'approved' ? 'success' : review.status === 'rejected' ? 'error' : review.status === 'reviewing' ? 'processing' : 'warning'}
              style={{ margin: 0 }}
            >
              {cfg.label}
            </Tag>
            <DownOutlined style={{
              fontSize: 10, color: '#999',
              transform: expanded ? 'rotate(180deg)' : 'none',
              transition: 'transform 0.2s',
            }} />
          </div>
          {expanded && (
            <div style={{ marginTop: 10, paddingLeft: 24 }}>
              {review.time && (
                <Typography.Text type="secondary" style={{ fontSize: 12, display: 'block' }}>
                  审核时间：{review.time}
                </Typography.Text>
              )}
              {review.approver && (
                <Typography.Text type="secondary" style={{ fontSize: 12, display: 'block', marginTop: 2 }}>
                  审核人：{review.approver}
                </Typography.Text>
              )}
              {review.opinion ? (
                <div style={{
                  marginTop: 6, padding: '8px 12px',
                  background: '#fff', borderRadius: 4, fontSize: 13,
                  border: `1px solid ${t.colorBorderSecondary}`,
                }}>
                  <Typography.Text type="secondary">审核意见：{review.opinion}</Typography.Text>
                </div>
              ) : review.status === 'pending' ? (
                <Typography.Text type="secondary" style={{ fontSize: 12, display: 'block', marginTop: 4 }}>
                  该部门尚未开始审核，请耐心等待。
                </Typography.Text>
              ) : (
                <Typography.Text type="secondary" style={{ fontSize: 12, display: 'block', marginTop: 4 }}>
                  该部门正在审核中，结果将及时通知您。
                </Typography.Text>
              )}
              {review.status === 'rejected' && (
                <Button
                  size="small"
                  type="primary"
                  danger
                  style={{ marginTop: 10 }}
                  onClick={() => message.info('已跳转到补正处理')}
                >
                  查看意见并补充材料
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── 单条申请的进度时间线 ─── */
function ProgressTimeline({ record }: { record: ProgressRecord }) {
  const hasDeptStage = record.deptReviews.length > 0;
  const anyApproved = record.deptReviews.some(r => r.status === 'approved');
  const allApproved = hasDeptStage && record.deptReviews.every(r => r.status === 'approved');
  const anyRejected = record.deptReviews.some(r => r.status === 'rejected');
  const allRejected = hasDeptStage && record.deptReviews.every(r => r.status === 'rejected');
  const stillReviewing = record.deptReviews.some(r => r.status === 'reviewing' || r.status === 'pending');

  const deptStageStatus = record.onlyGeneral
    ? 'skipped'
    : allRejected
      ? 'current'
      : anyApproved || allApproved
        ? 'completed'
        : 'current';

  /* MDG 环节状态（注册成功后才激活） */
  const registered = record.totalStatus === 'registered' || record.totalStatus === 'approved';
  const mdgNodes = [
    { label: '进入待配码库（使用单位启用）', status: registered && record.mdgStage !== 'none' ? 'completed' : 'pending', time: registered && record.mdgStage !== 'none' ? record.submitTime : undefined, approver: registered ? '系统自动' : undefined },
    { label: '补充MDG信息获取编码', status: registered ? (record.mdgStage === 'coding' ? 'current' : record.mdgStage === 'coded' ? 'completed' : 'pending') : 'pending', approver: record.mdgStage === 'coding' ? '使用单位' : record.mdgStage === 'coded' ? '使用单位' : undefined },
    { label: '正式生效', status: record.mdgStage === 'coded' ? 'completed' : 'pending', time: record.mdgStage === 'coded' ? record.mdgCode : undefined, approver: record.mdgStage === 'coded' ? '系统自动完成' : undefined },
  ];

  return (
    <div style={{ padding: '8px 0' }}>
      <MainNode label="提交申请" status="completed" time={record.submitTime} isLast={false} />

      <MainNode
        label="中油物采审核"
        status={record.wzReview.status}
        time={record.wzReview.time}
        approver={record.wzReview.approver}
        opinion={record.wzReview.opinion}
        isLast={false}
      >
        {hasDeptStage && (
          <div style={{ paddingTop: 12 }}>
            {record.deptReviews.map((review, idx) => (
              <DeptBranch key={review.categoryCode} review={review} isLast={idx === record.deptReviews.length - 1} />
            ))}
            <div style={{ height: 12, marginLeft: 26 }}>
              <div style={{ width: 2, height: 12, background: '#f0f0f0' }} />
            </div>
          </div>
        )}
      </MainNode>

      <MainNode label="专业部门审核" status={deptStageStatus} isLast={false}>
        {record.onlyGeneral && (
          <Typography.Text type="secondary" style={{ fontSize: 12, display: 'block', paddingBottom: 8 }}>
            本次申请仅选择通用品类，无需专业部门审核，由中油物采统一审核。
          </Typography.Text>
        )}
        {allRejected && (
          <div style={{
            marginBottom: 12, marginLeft: 26, padding: '8px 12px', borderRadius: 4,
            background: '#fff2f0', border: '1px solid #ffa39e', fontSize: 13,
          }}>
            <Typography.Text style={{ color: '#ff4d4f' }}>
              所有专业品类的审核均被驳回，请查看上方分支详情并补充材料后重新提交。
            </Typography.Text>
          </div>
        )}
        {anyApproved && stillReviewing && (
          <div style={{
            marginBottom: 12, marginLeft: 26, padding: '8px 12px', borderRadius: 4,
            background: '#e6f4ff', border: '1px solid #91caff', fontSize: 13,
          }}>
            <Typography.Text style={{ color: '#1677ff' }}>
              已有品类通过审核，服务商注册成功；其余品类仍在独立审批中，通过后将自动补充至服务商名下，无需等待。
            </Typography.Text>
          </div>
        )}
        {!anyApproved && !allRejected && hasDeptStage && (
          <div style={{
            marginBottom: 12, marginLeft: 26, padding: '8px 12px', borderRadius: 4,
            background: '#fffbe6', border: '1px solid #ffe58f', fontSize: 13,
          }}>
            <Typography.Text style={{ color: '#ad6800' }}>
              多个专业部门并行审核中，各品类互不排斥，任一品类通过即注册成功，其余品类继续审批。
            </Typography.Text>
          </div>
        )}
      </MainNode>

      <MainNode
        label="审核完成"
        status={registered ? 'completed' : allRejected ? 'pending' : 'pending'}
        time={registered ? record.wzReview.time : undefined}
        approver={registered ? '任一品类通过，注册成功' : undefined}
        isLast={false}
      />

      {mdgNodes.map((node, idx) => (
        <MainNode
          key={node.label}
          label={node.label}
          status={node.status as 'completed' | 'current' | 'pending'}
          time={node.time}
          approver={node.approver}
          isLast={idx === mdgNodes.length - 1}
        />
      ))}
    </div>
  );
}

/* ─── 主页面 ─── */
export default function RegisterProgress() {
  const [selectedId, setSelectedId] = useState<number>(mockRecords[0].id);
  const record = mockRecords.find(r => r.id === selectedId) || mockRecords[0];
  const totalTag = TOTAL_STATUS_TAG[record.totalStatus];
  const proCount = record.deptReviews.length;
  const approvedCount = record.deptReviews.filter(r => r.status === 'approved').length;

  return (
    <div>
      <Typography.Title level={4} style={{ marginTop: 0, marginBottom: 4 }}>注册进度看板</Typography.Title>
      <Typography.Text type="secondary" style={{ display: 'block', marginBottom: 20 }}>
        查看本人注册申请的审核进度。所选专业品类并行流转至对应专业部门审核，互不排斥：任一品类通过即注册成功，其余品类继续审批。
      </Typography.Text>

      {/* 历史申请切换 + 概览 */}
      <Card variant="outlined" size="small" style={{ marginBottom: 16 }}>
        <Row gutter={[24, 16]} align="middle">
          <Col flex="auto">
            <Space size={8} wrap>
              <FileTextOutlined style={{ fontSize: 16, color: '#ff4d4f' }} />
              <Typography.Text strong style={{ fontSize: 14 }}>我的注册申请</Typography.Text>
              <Select
                value={selectedId}
                onChange={setSelectedId}
                style={{ width: 340 }}
                options={mockRecords.map(r => ({
                  value: r.id,
                  label: `${r.spName}（${r.submitTime.slice(0, 10)}）`,
                }))}
              />
            </Space>
          </Col>
        </Row>
        <div style={{
          display: 'flex', gap: 40, flexWrap: 'wrap',
          marginTop: 16, paddingTop: 16, borderTop: '1px solid #f5f5f5',
        }}>
          <div>
            <Typography.Text type="secondary" style={{ fontSize: 12, display: 'block' }}>服务商名称</Typography.Text>
            <Typography.Text style={{ fontSize: 14 }}>{record.spName}</Typography.Text>
          </div>
          <div>
            <Typography.Text type="secondary" style={{ fontSize: 12, display: 'block' }}>服务商编码</Typography.Text>
            <Typography.Text style={{ fontSize: 14 }}>{record.spCode}</Typography.Text>
          </div>
          <div>
            <Typography.Text type="secondary" style={{ fontSize: 12, display: 'block' }}>提交时间</Typography.Text>
            <Typography.Text style={{ fontSize: 14 }}>{record.submitTime}</Typography.Text>
          </div>
          <div>
            <Typography.Text type="secondary" style={{ fontSize: 12, display: 'block' }}>服务品类</Typography.Text>
            <Typography.Text style={{ fontSize: 14 }}>
              {proCount > 0 ? `${proCount} 个专业品类` : '仅通用品类'}
              {proCount > 0 && approvedCount > 0 && (
                <Tag color="success" style={{ marginLeft: 8 }}>{approvedCount} 个已通过</Tag>
              )}
            </Typography.Text>
          </div>
          <div>
            <Typography.Text type="secondary" style={{ fontSize: 12, display: 'block' }}>审核状态</Typography.Text>
            <Tag color={totalTag.color} style={{ marginTop: 2 }}>{totalTag.label}</Tag>
          </div>
          {record.mdgCode && (
            <div>
              <Typography.Text type="secondary" style={{ fontSize: 12, display: 'block' }}>MDG编码</Typography.Text>
              <Typography.Text style={{ fontSize: 14, color: '#ff4d4f' }}>{record.mdgCode}</Typography.Text>
            </div>
          )}
        </div>
      </Card>

      {/* 审核进度时间线（含并行部门分支 + MDG后续节点） */}
      <Card variant="outlined" size="small" title={<span style={{ fontSize: 14 }}>审核进度时间线</span>}>
        <ProgressTimeline record={record} />
      </Card>
    </div>
  );
}
