/**
 * @name 现场考察管理
 * @mode axure
 *
 * 参考资料：
 * - /rules/development-guide.md
 * - /rules/axure-api-guide.md
 * - /src/themes/antd-new/designToken.json (Ant Design 主题)
 */

import './style.css';
import React, { useState, useCallback, useImperativeHandle, forwardRef, useMemo } from 'react';
import {
  Layout,
  Card,
  Table,
  Tag,
  Button,
  Space,
  Input,
  Select,
  Typography,
  Tabs,
  message
} from 'antd';
import {
  SearchOutlined,
  EyeOutlined,
  CheckCircleOutlined,
  SafetyCertificateOutlined,
  TeamOutlined,
  SettingOutlined,
  ClockCircleOutlined
} from '@ant-design/icons';

import type {
  KeyDesc,
  DataDesc,
  ConfigItem,
  Action,
  EventItem,
  AxureProps,
  AxureHandle
} from '../../common/axure-types';

import SideMenu from '../../components/side-menu';
import InspectionModal from './components/InspectionModal';
import ApprovalModal from './components/ApprovalModal';

const { Title, Text } = Typography;

type InspectionType = 'site' | 'video';
type InspectionStatus = 'pending' | 'approved' | 'rejected';

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
  type: InspectionType;
  status: InspectionStatus;
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

const typeLabels: Record<InspectionType, string> = {
  site: '现场考察',
  video: '视频考察'
};

const statusLabels: Record<InspectionStatus, { text: string; color: string }> = {
  pending: { text: '待审批', color: 'processing' },
  approved: { text: '审批通过', color: 'success' },
  rejected: { text: '审批拒绝', color: 'error' }
};

const tabItems = [
  { key: 'pending', label: '待审批' },
  { key: 'approved', label: '审批通过' },
  { key: 'rejected', label: '审批拒绝' }
];

const defaultInspections: InspectionRecord[] = [
  { id: 'SC-2024-001', name: '供应商生产车间考察', type: 'site', status: 'pending', creator: '张三', approver: '', createTime: '2024-06-01', inspectDate: '2024-06-10', address: '深圳市南山区科技园A栋', manager: '李经理', contact: '13800138001', description: '对候选供应商的生产车间进行实地考察，评估其生产能力与质量管理水平。', approvalRecords: [] },
  { id: 'SC-2024-002', name: '远程资质核验', type: 'video', status: 'pending', creator: '李四', approver: '', createTime: '2024-06-03', inspectDate: '2024-06-12', address: '视频会议', manager: '王主管', contact: '13800138002', description: '通过视频方式对新供应商的资质文件进行远程核验。', approvalRecords: [] },
  { id: 'SC-2024-003', name: '物流仓储基地考察', type: 'site', status: 'pending', creator: '王五', approver: '', createTime: '2024-06-05', inspectDate: '2024-06-15', address: '广州市白云区物流园C区', manager: '赵经理', contact: '13800138003', description: '考察物流供应商的仓储设施和配送能力。', approvalRecords: [] },
  { id: 'SC-2024-004', name: 'ISO体系认证审核', type: 'video', status: 'approved', creator: '赵六', approver: '刘总', createTime: '2024-05-20', inspectDate: '2024-05-28', address: '线上会议', manager: '陈主任', contact: '13800138004', description: '通过视频会议审核供应商的ISO9001质量管理体系认证材料。', approvalRecords: [{ id: 1, approver: '刘总', decision: 'approved', comment: '材料齐全，符合要求，予以通过。', time: '2024-05-30 10:30' }] },
  { id: 'SC-2024-005', name: '原材料供应商实地走访', type: 'site', status: 'approved', creator: '孙七', approver: '刘总', createTime: '2024-05-15', inspectDate: '2024-05-22', address: '佛山市顺德区工业园', manager: '周主管', contact: '13800138005', description: '走访原材料供应商的生产线，确认其生产能力和原材料质量。', approvalRecords: [{ id: 2, approver: '刘总', decision: 'approved', comment: '现场考察通过，建议与其建立合作关系。', time: '2024-05-24 14:20' }] },
  { id: 'SC-2024-006', name: '软件服务商技术评估', type: 'video', status: 'approved', creator: '周八', approver: '刘总', createTime: '2024-05-10', inspectDate: '2024-05-18', address: '线上演示', manager: '吴总监', contact: '13800138006', description: '对候选软件服务商进行技术方案评估和团队能力考察。', approvalRecords: [{ id: 3, approver: '刘总', decision: 'approved', comment: '技术方案可行，团队经验丰富。', time: '2024-05-20 09:15' }] },
  { id: 'SC-2024-007', name: '环保检测机构核查', type: 'site', status: 'rejected', creator: '吴九', approver: '刘总', createTime: '2024-04-25', inspectDate: '2024-05-05', address: '东莞市松山湖检测中心', manager: '郑经理', contact: '13800138007', description: '核查第三方环保检测机构的资质和实验室条件。', approvalRecords: [{ id: 4, approver: '刘总', decision: 'rejected', comment: '实验室设备不满足要求，部分资质已过期。', time: '2024-05-08 16:00' }] },
  { id: 'SC-2024-008', name: '安全防护用品供应商评估', type: 'video', status: 'rejected', creator: '郑十', approver: '刘总', createTime: '2024-04-20', inspectDate: '2024-04-28', address: '线上会议', manager: '冯主管', contact: '13800138008', description: '评估安全防护用品供应商的产品质量标准和供货能力。', approvalRecords: [{ id: 5, approver: '刘总', decision: 'rejected', comment: '产品标准不达标，暂不考虑合作。', time: '2024-04-30 11:00' }] }
];

const menuItems = [
  { key: 'dashboard', label: '仪表盘', icon: 'dashboard' },
  { key: 'inspection', label: '现场考察管理', icon: 'shop' },
  { key: 'vendors', label: '服务商管理', icon: 'user' },
  { key: 'settings', label: '系统设置', icon: 'setting' }
];

const INITIAL_STATUS_FILTER = 'all';

const SiteInspection = forwardRef<AxureHandle, AxureProps & { mode?: string }>((props, ref) => {
  const [activeTab, setActiveTab] = useState<InspectionStatus>('pending');
  const [searchText, setSearchText] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>(INITIAL_STATUS_FILTER);
  const [inspections, setInspections] = useState<InspectionRecord[]>(defaultInspections);
  const [viewRecord, setViewRecord] = useState<InspectionRecord | null>(null);
  const [approvalRecord, setApprovalRecord] = useState<InspectionRecord | null>(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [approvalModalOpen, setApprovalModalOpen] = useState(false);

  const filteredInspections = useMemo(() => {
    let list = inspections.filter((item) => item.status === activeTab);

    if (searchText) {
      const q = searchText.toLowerCase();
      list = list.filter((item) =>
        item.id.toLowerCase().includes(q) ||
        item.name.toLowerCase().includes(q)
      );
    }

    if (typeFilter !== 'all') {
      list = list.filter((item) => item.type === typeFilter);
    }

    if (statusFilter !== INITIAL_STATUS_FILTER) {
      list = list.filter((item) => item.status === statusFilter);
    }

    return list;
  }, [inspections, activeTab, searchText, typeFilter, statusFilter]);

  const handleTabChange = useCallback((key: string) => {
    setActiveTab(key as InspectionStatus);
    setStatusFilter(INITIAL_STATUS_FILTER);
  }, []);

  const handleView = useCallback((record: InspectionRecord) => {
    setViewRecord(record);
    setViewModalOpen(true);
    props.onEvent?.('onViewClick', JSON.stringify(record));
  }, [props]);

  const handleApprove = useCallback((record: InspectionRecord) => {
    setApprovalRecord(record);
    setApprovalModalOpen(true);
    props.onEvent?.('onApproveClick', JSON.stringify(record));
  }, [props]);

  const handleApprovalSuccess = useCallback((record: InspectionRecord, decision: 'approved' | 'rejected') => {
    const newStatus = decision === 'approved' ? 'approved' : 'rejected';
    const approvalRecordEntry: ApprovalRecord = {
      id: Date.now(),
      approver: '刘总',
      decision,
      comment: decision === 'approved' ? '审批通过，同意该项考察。' : '审批拒绝。',
      time: new Date().toISOString().slice(0, 16).replace('T', ' ')
    };

    setInspections((prev) =>
      prev.map((item) => {
        if (item.id === record.id) {
          return {
            ...item,
            status: newStatus,
            approver: '刘总',
            approvalRecords: [...item.approvalRecords, approvalRecordEntry]
          };
        }
        return item;
      })
    );

    setApprovalModalOpen(false);
    setApprovalRecord(null);
    setActiveTab(newStatus);
    message.success(decision === 'approved' ? '审批已通过' : '已拒绝');
    props.onEvent?.('onApproveSubmit', JSON.stringify({ id: record.id, decision }));
  }, [props]);

  const columns = [
    {
      title: '编号',
      dataIndex: 'id',
      key: 'id',
      width: 130
    },
    {
      title: '考察名称',
      dataIndex: 'name',
      key: 'name',
      width: 200,
      ellipsis: true
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      width: 100,
      render: (type: InspectionType) => <Tag>{typeLabels[type]}</Tag>
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status: InspectionStatus) => {
        const { text, color } = statusLabels[status];
        return <Tag color={color}>{text}</Tag>;
      }
    },
    {
      title: '创建人',
      dataIndex: 'creator',
      key: 'creator',
      width: 100
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      width: 120
    },
    {
      title: '操作',
      key: 'action',
      width: 160,
      render: (_: unknown, record: InspectionRecord) => (
        <Space size="small">
          <Button type="link" size="small" icon={<EyeOutlined />} onClick={() => handleView(record)}>
            查看
          </Button>
          {record.status === 'pending' && (
            <Button
              type="link"
              size="small"
              icon={<CheckCircleOutlined />}
              onClick={() => handleApprove(record)}
            >
              审批
            </Button>
          )}
        </Space>
      )
    }
  ];

  useImperativeHandle(ref, () => ({
    getVar: (varName: string) => {
      const vars: Record<string, unknown> = {
        selected_inspection: viewRecord,
        active_tab: activeTab
      };
      return vars[varName];
    },
    fireAction: (actionName: string) => {
      if (actionName === 'refreshData') {
        setInspections([...defaultInspections]);
      }
    },
    eventList: [{ name: 'onViewClick', desc: '点击查看时触发' }, { name: 'onApproveClick', desc: '点击审批时触发' }, { name: 'onApproveSubmit', desc: '提交审批时触发' }],
    actionList: [{ name: 'refreshData', desc: '刷新数据' }],
    varList: [{ name: 'selected_inspection', desc: '当前选中的考察记录' }, { name: 'active_tab', desc: '当前选中的Tab' }],
    configList: [{ type: 'input' as const, attributeId: 'title', displayName: '页面标题', info: '显示在页面顶部的标题', initialValue: '现场考察管理' }],
    dataList: [{ name: 'inspections', desc: '考察记录列表', keys: [{ name: 'id', desc: '编号' }, { name: 'name', desc: '考察名称' }, { name: 'type', desc: '类型' }, { name: 'status', desc: '状态' }, { name: 'creator', desc: '创建人' }, { name: 'createTime', desc: '创建时间' }] }]
  }), [viewRecord, activeTab]);

  return (
    <Layout className="site-inspection">
      <SideMenu
        title="管理系统"
        items={menuItems}
        defaultSelectedKey="inspection"
        onMenuSelect={() => {}}
      />
      <Layout>
        <Layout.Content className="site-inspection__content">
          <div className="site-inspection__header">
            <div className="site-inspection__header-top">
              <Title level={4} className="site-inspection__title">现场考察管理</Title>
              <Space wrap>
                <Input
                  placeholder="搜索编号/名称"
                  prefix={<SearchOutlined />}
                  allowClear
                  style={{ width: 220 }}
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
                <Select
                  value={typeFilter}
                  onChange={setTypeFilter}
                  style={{ width: 130 }}
                  options={[
                    { value: 'all', label: '全部类型' },
                    { value: 'site', label: '现场考察' },
                    { value: 'video', label: '视频考察' }
                  ]}
                />
                <Select
                  value={statusFilter}
                  onChange={setStatusFilter}
                  style={{ width: 130 }}
                  options={[
                    { value: 'all', label: '全部状态' },
                    { value: 'pending', label: '待审批' },
                    { value: 'approved', label: '审批通过' },
                    { value: 'rejected', label: '审批拒绝' }
                  ]}
                />
              </Space>
            </div>
          </div>

          <Card className="site-inspection__table-card">
            <Tabs
              activeKey={activeTab}
              onChange={handleTabChange}
              items={tabItems.map((tab) => ({
                ...tab,
                children: (
                  <Table
                    dataSource={filteredInspections}
                    columns={columns}
                    rowKey="id"
                    pagination={{ pageSize: 10, showSizeChanger: true, showTotal: (total) => `共 ${total} 条` }}
                    size="middle"
                    scroll={{ x: 900 }}
                    style={{ marginTop: 16 }}
                  />
                )
              }))}
            />
          </Card>

          <InspectionModal
            open={viewModalOpen}
            record={viewRecord}
            onClose={() => {
              setViewModalOpen(false);
              setViewRecord(null);
            }}
          />

          <ApprovalModal
            open={approvalModalOpen}
            record={approvalRecord}
            onClose={() => {
              setApprovalModalOpen(false);
              setApprovalRecord(null);
            }}
            onSuccess={handleApprovalSuccess}
          />
        </Layout.Content>
      </Layout>
    </Layout>
  );
});

export default SiteInspection;
