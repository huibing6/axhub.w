/**
 * @name 全流程跟踪详情
 */
import { useState } from 'react';
import { theme, Typography, Card, Space, Button, Tag, Drawer, Descriptions, message } from 'antd';
import { ArrowLeftOutlined, CheckCircleFilled, ClockCircleFilled, CloseCircleFilled, MinusCircleFilled, RightOutlined, CopyOutlined, ExpandOutlined, CompressOutlined } from '@ant-design/icons';
import PortalLayout from '../../common/portal-layout';
import { adminGroups } from '../../common/menu-data';

interface TimelineNode {
  id: string;
  title: string;
  operator: string;
  time: string;
  status: 'done' | 'active' | 'pending' | 'rejected';
  detail?: string;
}

interface Phase {
  key: string;
  title: string;
  status: 'done' | 'active' | 'pending';
  time: string;
  nodes: TimelineNode[];
}

interface PostCategory {
  key: string;
  title: string;
  count: number;
  latestTime: string;
  latestStatus: 'done' | 'active' | 'pending' | 'rejected';
  latestDetail: string;
  records: TimelineNode[];
}

const phases: Phase[] = [
  {
    key: 'register',
    title: '帐号与资质注册',
    status: 'done',
    time: '2025-01-15',
    nodes: [
      { id: '1', title: '注册个人账号', operator: '张明远', time: '2025-01-10 09:00', status: 'done', detail: '服务商完成个人账号注册' },
      { id: '2', title: '个人实名认证', operator: '系统自动', time: '2025-01-10 09:01', status: 'done', detail: '实名认证通过' },
      { id: '3', title: '注册服务商', operator: '张明远', time: '2025-01-11 14:30', status: 'done', detail: '提交服务商注册信息' },
      { id: '4', title: '所属企业审核', operator: '李建国', time: '2025-01-12 10:15', status: 'done', detail: '审核通过，同意注册' },
      { id: '5', title: '管理小组审核', operator: '王主管', time: '2025-01-13 16:45', status: 'done', detail: '审核通过，同意注册' },
      { id: '6', title: '获得意向商标签', operator: '系统自动', time: '2025-01-14 08:00', status: 'done', detail: '已获得意向服务商标签' },
      { id: '7', title: '招标采购-中标', operator: '采购部', time: '2025-01-15 11:30', status: 'done', detail: '中标项目：2025年度钻采设备维保' },
      { id: '8', title: '是否中选', operator: '系统自动', time: '2025-01-15 11:31', status: 'done', detail: '中选，进入正式准入流程' },
    ],
  },
  {
    key: 'admission',
    title: '正式准入',
    status: 'done',
    time: '2025-03-20',
    nodes: [
      { id: '9', title: '提交正式准入申请', operator: '张明远', time: '2025-03-10 09:00', status: 'done', detail: '提交准入申请材料' },
      { id: '10', title: '二级审核（所属企业）', operator: '李建国', time: '2025-03-12 14:20', status: 'done', detail: '审核通过' },
      { id: '11', title: '一级审核（管理小组）', operator: '王主管', time: '2025-03-15 10:30', status: 'done', detail: '审核通过' },
      { id: '12', title: '工程物装部审批', operator: '赵部长', time: '2025-03-18 16:00', status: 'done', detail: '审批通过' },
      { id: '13', title: '推送MDG申请编码', operator: '系统自动', time: '2025-03-19 08:00', status: 'done', detail: 'MDG编码：MDG20250319001' },
      { id: '14', title: 'MDG服务商审核', operator: 'MDG系统', time: '2025-03-20 11:00', status: 'done', detail: 'MDG审核通过' },
      { id: '15', title: '服务商正式入库', operator: '系统自动', time: '2025-03-20 11:01', status: 'done', detail: '已正式入库，服务商编码：1000020022' },
    ],
  },
  {
    key: 'daily',
    title: '日常管理',
    status: 'active',
    time: '至今',
    nodes: [],
  },
];

const postCategories: PostCategory[] = [
  {
    key: 'basic-change',
    title: '基础信息变更',
    count: 3,
    latestTime: '2025-10-20 14:30',
    latestStatus: 'active',
    latestDetail: '变更注册地址',
    records: [
      { id: 'p1', title: '变更注册地址', operator: '张明远', time: '2025-10-20 14:30', status: 'active', detail: '变更注册地址，审批中' },
      { id: 'p2', title: '变更联系电话', operator: '李四', time: '2025-08-15 10:20', status: 'done', detail: '变更联系电话，已完成' },
      { id: 'p3', title: '变更法定代表人', operator: '张明远', time: '2025-06-10 09:15', status: 'done', detail: '变更法定代表人，已完成' },
    ],
  },
  {
    key: 'category-change',
    title: '服务品类变更',
    count: 1,
    latestTime: '2025-07-01 11:00',
    latestStatus: 'done',
    latestDetail: '新增服务品类',
    records: [
      { id: 'p4', title: '新增服务品类', operator: '王五', time: '2025-07-01 11:00', status: 'done', detail: '新增租赁服务品类，已完成' },
    ],
  },
  {
    key: 'disposal',
    title: '处置管理',
    count: 2,
    latestTime: '2025-06-01 16:00',
    latestStatus: 'done',
    latestDetail: '解除冻结',
    records: [
      { id: 'p5', title: '解除冻结', operator: '管理员', time: '2025-06-01 16:00', status: 'done', detail: '解除冻结，恢复正常状态' },
      { id: 'p6', title: '冻结处理', operator: '管理员', time: '2025-05-01 09:00', status: 'done', detail: '因资质过期冻结' },
    ],
  },
];

const statusIcon = (status: string) => {
  switch (status) {
    case 'done': return <CheckCircleFilled style={{ color: '#52c41a', fontSize: 16 }} />;
    case 'active': return <ClockCircleFilled style={{ color: '#1677ff', fontSize: 16 }} />;
    case 'pending': return <MinusCircleFilled style={{ color: '#d9d9d9', fontSize: 16 }} />;
    case 'rejected': return <CloseCircleFilled style={{ color: '#ff4d4f', fontSize: 16 }} />;
    default: return null;
  }
};

const phaseStatusStyle = (status: string) => {
  switch (status) {
    case 'done': return { bg: '#f6ffed', border: '#b7eb8f', color: '#52c41a', icon: '✓' };
    case 'active': return { bg: '#e6f7ff', border: '#91d5ff', color: '#1677ff', icon: '●' };
    case 'pending': return { bg: '#f5f5f5', border: '#d9d9d9', color: '#8c8c8c', icon: '○' };
    default: return { bg: '#fff2f0', border: '#ffccc7', color: '#ff4d4f', icon: '✗' };
  }
};

const statusTag = (status: string) => {
  switch (status) {
    case 'done': return <Tag color="success">已完成</Tag>;
    case 'active': return <Tag color="processing">进行中</Tag>;
    case 'pending': return <Tag>待处理</Tag>;
    case 'rejected': return <Tag color="error">已拒绝</Tag>;
    default: return null;
  }
};

export default function ProcessTrackDetailPage() {
  const { token: t } = theme.useToken();
  const [expandedPhase, setExpandedPhase] = useState<string>('');
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedNode, setSelectedNode] = useState<TimelineNode | null>(null);
  const [allExpanded, setAllExpanded] = useState(false);

  const handleBack = () => {
    window.location.hash = '#/admin/process-track';
  };

  const handleNodeClick = (node: TimelineNode) => {
    setSelectedNode(node);
    setDrawerOpen(true);
  };

  const toggleCategory = (key: string) => {
    setExpandedCategories(prev =>
      prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
    );
  };

  const toggleAllCategories = () => {
    if (allExpanded) {
      setExpandedCategories([]);
    } else {
      setExpandedCategories(postCategories.map(c => c.key));
    }
    setAllExpanded(!allExpanded);
  };

  const handleCopyDetail = () => {
    if (!selectedNode) return;
    const text = `步骤: ${selectedNode.title}\n状态: ${selectedNode.status === 'done' ? '已完成' : selectedNode.status === 'active' ? '进行中' : selectedNode.status === 'rejected' ? '已拒绝' : '待处理'}\n操作人: ${selectedNode.operator}\n时间: ${selectedNode.time}\n详情: ${selectedNode.detail || '—'}`;
    navigator.clipboard.writeText(text).then(() => {
      message.success('已复制到剪贴板');
    }).catch(() => {
      message.error('复制失败');
    });
  };

  return (
    <PortalLayout groups={adminGroups} activePath="/admin/process-track" portalType="admin">
      <Button type="link" icon={<ArrowLeftOutlined />} onClick={handleBack} style={{ paddingLeft: 0, marginBottom: 16 }}>返回列表</Button>

      {/* 服务商信息卡片 */}
      <Card size="small" style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)', marginBottom: 24, borderRadius: 8 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <Typography.Title level={4} style={{ color: '#fff', margin: 0 }}>湖北江汉石油机械制造有限公司</Typography.Title>
            <Space style={{ marginTop: 8 }} size={24}>
              <Typography.Text style={{ color: 'rgba(255,255,255,0.65)' }}>编码：1000020022</Typography.Text>
              <Typography.Text style={{ color: 'rgba(255,255,255,0.65)' }}>管理类型：总部管理</Typography.Text>
            </Space>
          </div>
          <Tag color="success" style={{ fontSize: 14, padding: '4px 16px' }}>● 已入库</Tag>
        </div>
      </Card>

      {/* 三阶段进度条 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 24 }}>
        {phases.map((phase) => {
          const style = phaseStatusStyle(phase.status);
          return (
            <Card
              key={phase.key}
              size="small"
              hoverable
              onClick={() => setExpandedPhase(expandedPhase === phase.key ? '' : phase.key)}
              style={{
                border: `2px solid ${style.border}`,
                background: style.bg,
                cursor: 'pointer',
                boxShadow: expandedPhase === phase.key ? `0 4px 12px ${style.border}` : 'none',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <Typography.Text style={{ color: style.color, fontWeight: 600, fontSize: 15 }}>{phase.title}</Typography.Text>
                  <div style={{ marginTop: 4 }}>
                    <Typography.Text type="secondary" style={{ fontSize: 12 }}>{phase.time}</Typography.Text>
                  </div>
                </div>
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: style.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 600, fontSize: 14 }}>
                  {style.icon}
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* 阶段详情：时间轴或日常管理 */}
      {phases.map((phase) => (
        expandedPhase === phase.key && (
          <Card key={phase.key} size="small" title={phase.title} style={{ marginBottom: 16 }}>
            {phase.key === 'daily' ? (
              /* 日常管理：分类展开模式 */
              <>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 12 }}>
                  <Button
                    type="link"
                    size="small"
                    icon={allExpanded ? <CompressOutlined /> : <ExpandOutlined />}
                    onClick={toggleAllCategories}
                    style={{ padding: 0, color: '#1677ff' }}
                  >
                    {allExpanded ? '收起全部' : '展开全部'}
                  </Button>
                </div>
                {postCategories.map((category) => {
                  const isExpanded = expandedCategories.includes(category.key);
                  return (
                    <div key={category.key} style={{ marginBottom: 16 }}>
                      {/* 类别标题行 */}
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: '10px 12px',
                          background: '#fafafa',
                          borderRadius: 6,
                          cursor: 'pointer',
                          border: `1px solid ${category.latestStatus === 'active' ? '#91d5ff' : '#f0f0f0'}`,
                        }}
                        onClick={() => toggleCategory(category.key)}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <RightOutlined
                            style={{
                              fontSize: 12,
                              color: '#8c8c8c',
                              transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
                              transition: 'transform 0.2s',
                            }}
                          />
                          <Typography.Text strong>{category.title}</Typography.Text>
                          <Typography.Text type="secondary" style={{ fontSize: 12 }}>（{category.count}次）</Typography.Text>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                          {statusTag(category.latestStatus)}
                          <Typography.Text type="secondary" style={{ fontSize: 12 }}>{category.latestTime}</Typography.Text>
                          <Typography.Text type="secondary" style={{ fontSize: 12 }}>{category.latestDetail}</Typography.Text>
                        </div>
                      </div>

                      {/* 展开后的记录列表 */}
                      {isExpanded && (
                        <div style={{ marginTop: 8, paddingLeft: 20 }}>
                          {category.records.map((record, index) => (
                            <div key={record.id} style={{ position: 'relative', paddingBottom: index < category.records.length - 1 ? 16 : 0 }}>
                              {index < category.records.length - 1 && (
                                <div style={{ position: 'absolute', left: 7, top: 20, bottom: 0, width: 2, background: record.status === 'done' ? '#b7eb8f' : '#f0f0f0' }} />
                              )}
                              <div style={{ position: 'absolute', left: 0, top: 2 }}>
                                {statusIcon(record.status)}
                              </div>
                              <div
                                style={{
                                  marginLeft: 28,
                                  padding: '8px 12px',
                                  background: record.status === 'active' ? '#e6f7ff' : '#fff',
                                  borderRadius: 6,
                                  cursor: 'pointer',
                                  border: `1px solid ${record.status === 'active' ? '#91d5ff' : '#f0f0f0'}`,
                                }}
                                onClick={() => handleNodeClick(record)}
                              >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                  <Typography.Text strong={record.status === 'active'}>{record.title}</Typography.Text>
                                  <Typography.Text type="secondary" style={{ fontSize: 12 }}>{record.time}</Typography.Text>
                                </div>
                                <Typography.Text type="secondary" style={{ fontSize: 12 }}>{record.operator}</Typography.Text>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </>
            ) : (
              /* 帐号与资质注册 / 正式准入：时间轴模式 */
              <div style={{ position: 'relative', paddingLeft: 24 }}>
                {phase.nodes.map((node, index) => (
                  <div key={node.id} style={{ position: 'relative', paddingBottom: index < phase.nodes.length - 1 ? 24 : 0 }}>
                    {index < phase.nodes.length - 1 && (
                      <div style={{ position: 'absolute', left: 7, top: 20, bottom: 0, width: 2, background: node.status === 'done' ? '#b7eb8f' : '#f0f0f0' }} />
                    )}
                    <div style={{ position: 'absolute', left: 0, top: 2 }}>
                      {statusIcon(node.status)}
                    </div>
                    <div
                      style={{
                        marginLeft: 28,
                        padding: '8px 12px',
                        background: node.status === 'active' ? '#e6f7ff' : '#fafafa',
                        borderRadius: 6,
                        cursor: 'pointer',
                        border: `1px solid ${node.status === 'active' ? '#91d5ff' : '#f0f0f0'}`,
                      }}
                      onClick={() => handleNodeClick(node)}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography.Text strong>{node.title}</Typography.Text>
                        <Typography.Text type="secondary" style={{ fontSize: 12 }}>{node.time}</Typography.Text>
                      </div>
                      <Typography.Text type="secondary" style={{ fontSize: 12 }}>{node.operator}</Typography.Text>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        )
      ))}

      {/* 详情抽屉 */}
      <Drawer
        title={
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>节点详情</span>
            <Button type="link" size="small" icon={<CopyOutlined />} onClick={handleCopyDetail} style={{ padding: 0, color: '#1677ff' }}>
              复制详情
            </Button>
          </div>
        }
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        width={400}
      >
        {selectedNode && (
          <Descriptions column={1} bordered size="small">
            <Descriptions.Item label="步骤名称">{selectedNode.title}</Descriptions.Item>
            <Descriptions.Item label="状态">
              {statusTag(selectedNode.status)}
            </Descriptions.Item>
            <Descriptions.Item label="操作人">{selectedNode.operator}</Descriptions.Item>
            <Descriptions.Item label="操作时间">{selectedNode.time}</Descriptions.Item>
            <Descriptions.Item label="详情">{selectedNode.detail || '—'}</Descriptions.Item>
          </Descriptions>
        )}
      </Drawer>
    </PortalLayout>
  );
}
