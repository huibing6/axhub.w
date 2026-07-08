/**
 * @name 全流程跟踪
 */
import { useState, useMemo } from 'react';
import { theme, Typography, Card, Space, Input, Button, Select, Tag, Tooltip } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import PortalLayout from '../../common/portal-layout';
import { adminGroups } from '../../common/menu-data';
import { useFilterData } from '../../common/hooks';
import { EnhancedTable } from '../../common/enhanced-table';

/* ─── 迷你环形图组件 ─── */
function MiniDonut({ segments, size = 64 }: { segments: { value: number; color: string }[]; size?: number }) {
  const total = segments.reduce((s, seg) => s + seg.value, 0);
  const r = (size - 8) / 2;
  const cx = size / 2;
  const cy = size / 2;
  const circumference = 2 * Math.PI * r;
  let offset = 0;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {segments.map((seg, i) => {
        const pct = total > 0 ? seg.value / total : 0;
        const dash = pct * circumference;
        const dashOffset = -offset;
        offset += dash;
        return (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke={seg.color}
            strokeWidth={6}
            strokeDasharray={`${dash} ${circumference - dash}`}
            strokeDashoffset={dashOffset}
            strokeLinecap="round"
          />
        );
      })}
      <text x={cx} y={cy} textAnchor="middle" dominantBaseline="central" fill="#262626" fontSize={14} fontWeight={600}>
        {total}
      </text>
    </svg>
  );
}

const rawData = [
  { idx: 1, code: '1000020022', name: '中海油能源发展股份有限公司', mgmtType: '所属企业管理', currentStage: '准入后管理', flowStatus: '已入库', createTime: '2025-01-15' },
  { idx: 2, code: '1000020022', name: '杰瑞石油装备技术有限公司', mgmtType: '总部管理', currentStage: '正式准入', flowStatus: '审核中', createTime: '2025-03-20' },
  { idx: 3, code: '1000020022', name: '中海油能源发展股份有限公司', mgmtType: '所属企业管理', currentStage: '帐号与资质注册', flowStatus: '注册中', createTime: '2025-06-01' },
  { idx: 4, code: '1000020022', name: '杰瑞石油装备技术有限公司', mgmtType: '总部管理', currentStage: '正式准入', flowStatus: '待提交', createTime: '2025-06-10' },
  { idx: 5, code: '1000020022', name: '中海油能源发展股份有限公司', mgmtType: '所属企业管理', currentStage: '准入后管理', flowStatus: '已入库', createTime: '2025-06-15' },
  { idx: 6, code: '1000020022', name: '杰瑞石油装备技术有限公司', mgmtType: '总部管理', currentStage: '帐号与资质注册', flowStatus: '已拒绝', createTime: '2025-06-20' },
];

const stageOptions = [
  { value: '帐号与资质注册', label: '帐号与资质注册' },
  { value: '正式准入', label: '正式准入' },
  { value: '准入后管理', label: '准入后管理' },
];

const statusColors: Record<string, string> = {
  '已入库': 'success',
  '审核中': 'processing',
  '注册中': 'warning',
  '待提交': 'default',
  '已拒绝': 'error',
};

const kpiData = [
  { title: '服务商总数', value: 1286, change: 12, isUp: true, sub: '较上月', donut: [{ value: 23, color: '#faad14' }, { value: 15, color: '#1677ff' }, { value: 856, color: '#52c41a' }, { value: 392, color: '#d9d9d9' }] },
  { title: '注册中', value: 23, pending: 5, color: '#faad14', donut: [{ value: 5, color: '#ff7a45' }, { value: 18, color: '#faad14' }] },
  { title: '准入中', value: 15, pending: 3, color: '#1677ff', donut: [{ value: 3, color: '#ff4d4f' }, { value: 12, color: '#1677ff' }] },
  { title: '已入库', value: 856, normal: 800, color: '#52c41a', donut: [{ value: 800, color: '#52c41a' }, { value: 56, color: '#faad14' }] },
];

export default function ProcessTrackPage() {
  const { token: t } = theme.useToken();
  const [nameFilter, setNameFilter] = useState('');
  const [stageFilter, setStageFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const { setFilter, filteredData, clearFilters } = useFilterData(rawData, [
    { key: 'name', label: '服务商名称' },
    { key: 'currentStage', label: '当前阶段' },
    { key: 'flowStatus', label: '流程状态' },
  ]);

  const handleSearch = () => {
    setFilter('name', nameFilter);
    setFilter('currentStage', stageFilter);
    setFilter('flowStatus', statusFilter);
  };

  const handleReset = () => {
    setNameFilter('');
    setStageFilter('');
    setStatusFilter('');
    clearFilters();
  };

  const columns = [
    { key: 'idx', title: '序号', width: 60, align: 'center' as const, dataIndex: 'idx' },
    { key: 'code', title: '服务商编码', width: 120, dataIndex: 'code', ellipsis: true },
    { key: 'name', title: '服务商名称', width: 220, dataIndex: 'name', ellipsis: true },
    { key: 'mgmtType', title: '管理类型', width: 110, dataIndex: 'mgmtType', ellipsis: true },
    { key: 'currentStage', title: '当前阶段', width: 130, dataIndex: 'currentStage', ellipsis: true },
    {
      key: 'flowStatus', title: '流程状态', width: 100, align: 'center' as const, dataIndex: 'flowStatus',
      render: (val: string) => <Tag color={statusColors[val] || 'default'}>{val}</Tag>,
    },
    { key: 'createTime', title: '创建时间', width: 110, dataIndex: 'createTime' },
    {
      key: 'action', title: '操作', width: 80, align: 'center' as const,
      render: () => (
        <Button type="link" size="small" style={{ color: '#1677ff', padding: 0 }} onClick={() => window.location.hash = '#/admin/process-track-detail'}>详情</Button>
      ),
    },
  ];

  return (
    <PortalLayout groups={adminGroups} activePath="/admin/process-track" portalType="admin">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        {kpiData.map((kpi, i) => (
          <Card key={i} size="small" style={{ borderLeft: `4px solid ${kpi.color || t.colorPrimary}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ flex: 1 }}>
                <Typography.Text type="secondary" style={{ fontSize: 13 }}>{kpi.title}</Typography.Text>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 4 }}>
                  <Typography.Text style={{ fontSize: 28, fontWeight: 600 }}>{kpi.value.toLocaleString()}</Typography.Text>
                  {kpi.change !== undefined && (
                    <Typography.Text style={{ fontSize: 12, color: kpi.isUp ? '#ff4d4f' : '#52c41a' }}>
                      {kpi.isUp ? <ArrowUpOutlined /> : <ArrowDownOutlined />} {kpi.isUp ? '+' : ''}{kpi.change}%
                    </Typography.Text>
                  )}
                </div>
                <Typography.Text type="secondary" style={{ fontSize: 12 }}>
                  {kpi.pending !== undefined && `待处理 ${kpi.pending}`}
                  {kpi.pending === undefined && kpi.normal !== undefined && `正常 ${kpi.normal}`}
                  {kpi.change !== undefined && ' 较上月'}
                </Typography.Text>
              </div>
              {kpi.donut && (
                <Tooltip title={kpi.donut.map((s, j) => `${['待处理', '处理中', '正常', '其他'][j]}: ${s.value}`).join(' / ')}>
                  <MiniDonut segments={kpi.donut} />
                </Tooltip>
              )}
            </div>
          </Card>
        ))}
      </div>
      <Card size="small" variant="outlined" style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'end', flexWrap: 'wrap' }}>
          <div>
            <Typography.Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 4 }}>服务商名称/编码</Typography.Text>
            <Input placeholder="请输入" style={{ width: 200 }} value={nameFilter} onChange={e => setNameFilter(e.target.value)} />
          </div>
          <div>
            <Typography.Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 4 }}>当前阶段</Typography.Text>
            <Select placeholder="请选择" style={{ width: 160 }} allowClear value={stageFilter || undefined} onChange={val => setStageFilter(val || '')} options={stageOptions} />
          </div>
          <div>
            <Typography.Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 4 }}>流程状态</Typography.Text>
            <Select placeholder="请选择" style={{ width: 130 }} allowClear value={statusFilter || undefined} onChange={val => setStatusFilter(val || '')} options={[
              { value: '已入库', label: '已入库' },
              { value: '审核中', label: '审核中' },
              { value: '注册中', label: '注册中' },
              { value: '待提交', label: '待提交' },
              { value: '已拒绝', label: '已拒绝' },
            ]} />
          </div>
          <Space>
            <Button type="primary" danger onClick={handleSearch}>查询</Button>
            <Button onClick={handleReset}>重置</Button>
          </Space>
        </div>
      </Card>
      <EnhancedTable
        columns={columns}
        dataSource={filteredData.map((d, i) => ({ ...d, _key: i }))}
        rowKey="_key"
        pagination={{ pageSize: 10, showSizeChanger: true, showTotal: (total) => `共 ${total} 条` }}
        style={{ background: '#fff' }}
        cardTitleField="name"
        cardDescField="mgmtType"
      />
    </PortalLayout>
  );
}
