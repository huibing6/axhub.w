/**
 * @name 管理工作台
 * 服务商管理工作台2.0 - 首页仪表盘
 * 布局：第一行4卡片 → 第二行待办表格 → 第三行统计+标签 → 第四行公告+手册
 */
import React from 'react';
import { useState } from 'react';
import { theme, Card, Table, Tag, Typography, Row, Col, Space, Button, Badge, List } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined, MinusOutlined, RightOutlined, FileTextOutlined } from '@ant-design/icons';
import { systemNoticeData } from '../common/qualification-config';

const { Text } = Typography;

/* ─── Mock 数据 ─── */
const statCards = [
  { title: '注册审核', count: 8, unit: '件', color: '#ff4d4f', icon: '📋' },
  { title: '待配码', count: 12, unit: '件', color: '#faad14', icon: '🔢' },
  { title: '信息变更', count: 3, unit: '件', color: '#722ed1', icon: '📝' },
  { title: '我单位使用的服务商', count: 12, unit: '家', color: '#1677ff', icon: '🏢' },
];

const todoItems = [
  { key: 1, urgency: '紧急', type: '注册审核', company: '中盛建设集团股份有限公司', time: '2026-06-03 14:30', route: '/admin/reg-review' },
  { key: 2, urgency: '紧急', type: '待配码', company: '华油技术服务有限公司', time: '2026-06-03 10:15', route: '/admin/pending-list' },
  { key: 3, urgency: '一般', type: '信息变更', company: '远东能源工程技术有限公司', time: '2026-06-02 16:00', route: '/admin/maint-review' },
  { key: 4, urgency: '一般', type: '待配码', company: '天诚油田设备制造有限公司', time: '2026-06-02 11:20', route: '/admin/pending-list' },
  { key: 5, urgency: '一般', type: '注册审核', company: '博瑞达石化装备有限公司', time: '2026-06-01 09:45', route: '/admin/reg-review' },
  { key: 6, urgency: '较低', type: '信息变更', company: '恒通管道工程有限公司', time: '2026-06-01 08:30', route: '/admin/maint-review' },
];

const announcements = [
  { title: '集团公司2026-2027年度绿化服务集中采购调整公告', time: '2小时前', hot: true },
  { title: '集团公司2026-2027年度绿化服务集中采购调整公告', time: '5小时前', hot: true },
  { title: '集团公司2026-2027年度绿化服务集中采购调整公告', time: '昨天 16:30', hot: false },
  { title: '集团公司2026-2027年度绿化服务集中采购调整公告', time: '昨天 14:20', hot: true },
  { title: '关于系统服务商管理系统部分区域机构上线通知', time: '2天前', hot: false },
];

const trendData = [
  { month: '1月', value: 42 },
  { month: '2月', value: 38 },
  { month: '3月', value: 55 },
  { month: '4月', value: 48 },
  { month: '5月', value: 62 },
  { month: '6月', value: 71 },
];

const tagDistribution = [
  { label: '正式', count: 856, color: '#52c41a' },
  { label: '意向', count: 312, color: '#ff4d4f' },
  { label: '暂停', count: 89, color: '#faad14' },
  { label: '取消', count: 29, color: '#ff4d4f' },
];

const manuals = systemNoticeData
  .filter(n => n.type === '操作手册' && n.status === '已发布')
  .map(n => ({ title: n.title, time: n.createTime }));

/* ─── SVG 折线图 ─── */
function TrendChart({ data }: { data: { month: string; value: number }[] }) {
  const { token: t } = theme.useToken();
  const w = 280, h = 100, pad = { top: 10, right: 10, bottom: 24, left: 10 };
  const cw = w - pad.left - pad.right;
  const ch = h - pad.top - pad.bottom;
  const max = Math.max(...data.map(d => d.value));
  const min = Math.min(...data.map(d => d.value));
  const range = max - min || 1;

  const points = data.map((d, i) => {
    const x = pad.left + (i / (data.length - 1)) * cw;
    const y = pad.top + ch - ((d.value - min) / range) * ch;
    return { x, y, ...d };
  });

  return (
    <svg width={w} height={h} style={{ display: 'block' }}>
      {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => (
        <line key={i} x1={pad.left} y1={pad.top + ch * (1 - ratio)} x2={w - pad.right} y2={pad.top + ch * (1 - ratio)} stroke="#f0f0f0" strokeWidth={1} />
      ))}
      <polyline points={points.map(p => `${p.x},${p.y}`).join(' ')} fill="none" stroke="#ff4d4f" strokeWidth={2} strokeLinejoin="round" />
      {points.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={3} fill="#ff4d4f" stroke="#fff" strokeWidth={1.5} />
      ))}
      {points.map((p, i) => (
        <text key={i} x={p.x} y={h - 4} textAnchor="middle" fill={t.colorTextTertiary} fontSize={11}>{p.month}</text>
      ))}
    </svg>
  );
}

/* ─── SVG 环形图 ─── */
function DonutChart({ data, total }: { data: { label: string; count: number; color: string }[]; total: number }) {
  const { token: t } = theme.useToken();
  const size = 120, cx = size / 2, cy = size / 2, r = 42, stroke = 16;
  const circumference = 2 * Math.PI * r;
  let accumulated = 0;

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
      <div style={{ position: 'relative', width: size, height: size }}>
        <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
          {data.map((d, i) => {
            const pct = d.count / total;
            const dashLen = circumference * pct;
            const dashOff = circumference * accumulated;
            accumulated += pct;
            return <circle key={i} cx={cx} cy={cy} r={r} fill="none" stroke={d.color} strokeWidth={stroke} strokeDasharray={`${dashLen} ${circumference - dashLen}`} strokeDashoffset={-dashOff} />;
          })}
        </svg>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: 18, fontWeight: 700, color: t.colorText, lineHeight: 1 }}>{total.toLocaleString()}</Text>
          <Text type="secondary" style={{ fontSize: 10 }}>服务商总数</Text>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flex: 1 }}>
        {data.map((d, i) => {
          const pct = Math.round((d.count / total) * 100);
          return (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 8, height: 8, borderRadius: 2, background: d.color, flexShrink: 0 }} />
              <Text style={{ fontSize: 12, flex: 1 }}>{d.label}</Text>
              <Text style={{ fontSize: 12, fontWeight: 600 }}>{d.count}</Text>
              <Text type="secondary" style={{ fontSize: 11, width: 32, textAlign: 'right' }}>{pct}%</Text>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─── 主页面 ─── */
export default function AdminWorkspace() {
  const { token: t } = theme.useToken();

  const urgencyColor: Record<string, string> = { '紧急': 'error', '一般': 'warning', '较低': 'default' };

  const todoColumns = [
    { title: '紧急程度', dataIndex: 'urgency', key: 'urgency', width: 90, render: (text: string) => <Tag color={urgencyColor[text] || 'default'}>{text}</Tag> },
    { title: '事项类型', dataIndex: 'type', key: 'type', width: 100, render: (text: string) => <Tag color="processing">{text}</Tag> },
    { title: '服务商名称', dataIndex: 'company', key: 'company' },
    { title: '提交时间', dataIndex: 'time', key: 'time', width: 150 },
    { title: '操作', key: 'action', width: 80, render: (_: any, record: any) => <Button type="link" size="small" style={{ color: '#ff4d4f' }} onClick={() => { window.location.hash = '#' + record.route; }}>审核</Button> },
  ];

  const totalProviders = tagDistribution.reduce((sum, d) => sum + d.count, 0);

  const routeMap: Record<string, string> = {
    '注册审核': '/admin/reg-review',
    '待配码': '/admin/pending-list',
    '信息变更': '/admin/maint-review',
    '我单位使用的服务商': '/admin/sp-query-formal',
  };

  return (
    <>
      {/* 第一行：统计卡片 */}
      <Row gutter={16} style={{ marginBottom: 16 }}>
        {statCards.map((card, i) => (
          <Col span={6} key={i}>
            <Card
              variant="outlined" size="small" hoverable
              onClick={() => { window.location.hash = '#' + (routeMap[card.title] || '/admin/workspace'); }}
              style={{ cursor: 'pointer' }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <div>
                  <Text type="secondary" style={{ fontSize: 13 }}>{card.title}</Text>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginTop: 4 }}>
                    <span style={{ fontSize: 28, fontWeight: 700, color: t.colorText, lineHeight: 1 }}>{card.count}</span>
                    <Text type="secondary" style={{ fontSize: 13 }}>{card.unit}</Text>
                  </div>
                </div>
                <div style={{ width: 40, height: 40, borderRadius: 8, background: `${card.color}10`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>
                  {card.icon}
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      {/* 第二行：待办事项 */}
      <Card title="待办事项" variant="outlined" size="small" style={{ marginBottom: 16 }}
        extra={<Button type="link" size="small" onClick={() => { window.location.hash = '#/admin/reg-query'; }}>查看全部 <RightOutlined /></Button>}
      >
        <Table columns={todoColumns} dataSource={todoItems} pagination={false} size="small" bordered />
      </Card>

      {/* 第三行：数据统计 + 标签分布 */}
      <Row gutter={16} style={{ marginBottom: 16 }}>
        <Col span={12}>
          <Card title="数据统计" variant="outlined" size="small" style={{ height: '100%' }}>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <div style={{ textAlign: 'center', padding: '8px 0' }}>
                  <Text style={{ fontSize: 24, fontWeight: 700, color: t.colorText, display: 'block' }}>1,286</Text>
                  <Text type="secondary" style={{ fontSize: 12 }}>服务商总数</Text>
                </div>
              </Col>
              <Col span={12}>
                <div style={{ textAlign: 'center', padding: '8px 0' }}>
                  <Text style={{ fontSize: 24, fontWeight: 700, color: '#ff4d4f', display: 'block' }}>23</Text>
                  <Text type="secondary" style={{ fontSize: 12 }}>本月新增</Text>
                </div>
              </Col>
              <Col span={12}>
                <div style={{ textAlign: 'center', padding: '8px 0' }}>
                  <Text style={{ fontSize: 24, fontWeight: 700, color: t.colorText, display: 'block' }}>856</Text>
                  <Text type="secondary" style={{ fontSize: 12 }}>正式服务商</Text>
                </div>
              </Col>
              <Col span={12}>
                <div style={{ textAlign: 'center', padding: '8px 0' }}>
                  <Text style={{ fontSize: 24, fontWeight: 700, color: t.colorText, display: 'block' }}>312</Text>
                  <Text type="secondary" style={{ fontSize: 12 }}>意向服务商</Text>
                </div>
              </Col>
            </Row>
            <div style={{ marginTop: 12, display: 'flex', justifyContent: 'center' }}>
              <TrendChart data={trendData} />
            </div>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="标签分布" variant="outlined" size="small" style={{ height: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <DonutChart data={tagDistribution} total={totalProviders} />
            </div>
          </Card>
        </Col>
      </Row>

      {/* 第四行：公告通知 + 操作手册 */}
      <Row gutter={16} style={{ marginBottom: 0 }}>
        <Col span={12}>
          <Card title="公告通知" variant="outlined" size="small" style={{ height: '100%' }}
            extra={<Button type="link" size="small">更多 <RightOutlined /></Button>}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {announcements.map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '10px 0', borderBottom: i < announcements.length - 1 ? `1px solid ${t.colorBorderSecondary}` : 'none' }}>
                  <Badge status={item.hot ? 'error' : 'default'} style={{ marginTop: 6 }} />
                  <div style={{ flex: 1 }}>
                    <Text style={{ fontSize: 13 }}>{item.title}</Text>
                    <div><Text type="secondary" style={{ fontSize: 12 }}>{item.time}</Text></div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="操作手册" variant="outlined" size="small" style={{ height: '100%' }}
            extra={<Button type="link" size="small">更多 <RightOutlined /></Button>}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {manuals.length === 0 && <Text type="secondary" style={{ fontSize: 13, padding: '10px 0' }}>暂无操作手册</Text>}
              {manuals.map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 0', borderBottom: i < manuals.length - 1 ? `1px solid ${t.colorBorderSecondary}` : 'none' }}>
                  <div style={{ width: 32, height: 32, borderRadius: 6, background: '#f0f5ff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <FileTextOutlined style={{ color: '#1677ff', fontSize: 16 }} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <Text style={{ fontSize: 13, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'block' }}>{item.title}</Text>
                    <Text type="secondary" style={{ fontSize: 11 }}>{item.time}</Text>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </Col>
      </Row>
    </>
  );
}
