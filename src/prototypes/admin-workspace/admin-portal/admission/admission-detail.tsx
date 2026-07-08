/**
 * @name 准入详情
 */
import { theme, Typography, Card, Space, Button, Table, Descriptions, Tag } from 'antd';
import PortalLayout from '../../common/portal-layout';
import { adminGroups } from '../../common/menu-data';
import { StatusTimeline, FilePreview } from '../../common/components';

/* ─── 模拟数据 ─── */
const admissionInfo = {
  source: '公开招标采购中标',
  bidProject: '2026年度江汉油田钻采设备维保服务项目',
  bidNumber: 'ZB-2026-HB-0042',
};

const companyInfo = {
  companyName: '湖北江汉石油机械制造有限公司',
  creditCode: '91420000706802345X',
  managementType: '所属企业管理',
  contactName: '李明',
  contactPhone: '13800138000',
  contactEmail: 'liming@example.com',
  registeredCapital: '5,000 万元',
  address: '湖北省武汉市东湖高新区光谷大道77号',
};

const serviceCategories = [
  { key: 1, code: 'S1001000', name: '租赁服务', level: '一级', type: '专业' },
  { key: 2, code: 'S1002000', name: '设备维保服务', level: '二级', type: '通用' },
  { key: 3, code: 'S1003000', name: '信息技术服务', level: '三级', type: '专业' },
];

const qualificationFiles = [
  { name: '营业执照.pdf', size: '2.3 MB', uploadTime: '2026-06-20' },
  { name: '质量管理体系认证证书.pdf', size: '1.8 MB', uploadTime: '2026-06-20' },
  { name: 'HSE管理体系认证证书.pdf', size: '2.1 MB', uploadTime: '2026-06-20' },
];

const timelineItems = [
  { status: '待提交', time: '2026-06-20 09:00', operator: '系统' },
  { status: '已提交', time: '2026-06-20 10:30', operator: '李明' },
  { status: '部门审核', time: '2026-06-21 14:20', operator: '王部长', opinion: '材料齐全，符合要求' },
  { status: '待复核', time: '2026-06-22 09:15', operator: '赵主管' },
];

const serviceColumns = [
  { key: 'idx', title: '序号', width: 60, align: 'center' as const, dataIndex: 'idx' },
  { key: 'code', title: '服务品类编码', width: 140, dataIndex: 'code', ellipsis: true },
  { key: 'name', title: '服务品类名称', width: 200, dataIndex: 'name', ellipsis: true },
  { key: 'level', title: '级别', width: 100, dataIndex: 'level', ellipsis: true },
  { key: 'type', title: '目录类型', width: 100, dataIndex: 'type', ellipsis: true },
];

export default function AdmissionDetailPage() {
  const { token: t } = theme.useToken();

  const handleApprove = () => {
    console.log('复核通过');
  };

  const handleReject = () => {
    console.log('复核退回');
  };

  return (
    <PortalLayout groups={adminGroups} activePath="/admin/admission-review" portalType="admin">
      <Space align="center" style={{ marginBottom: 16 }}>
        <Button onClick={() => window.history.back()}>← 返回</Button>
        <Typography.Title level={4} style={{ margin: 0 }}>准入详情</Typography.Title>
      </Space>

      {/* 准入信息 */}
      <Card size="small" variant="outlined" title={<Space><span>📋</span><span>准入信息</span></Space>} style={{ marginBottom: 16 }}>
        <Descriptions column={3} bordered size="small">
          <Descriptions.Item label="准入来源">{admissionInfo.source}</Descriptions.Item>
          <Descriptions.Item label="中标项目" span={2}>{admissionInfo.bidProject}</Descriptions.Item>
          <Descriptions.Item label="中标编号">{admissionInfo.bidNumber}</Descriptions.Item>
        </Descriptions>
      </Card>

      {/* 基础信息 */}
      <Card size="small" variant="outlined" title={<Space><span>📄</span><span>基础信息</span></Space>} style={{ marginBottom: 16 }}>
        <Descriptions column={3} bordered size="small">
          <Descriptions.Item label="服务商名称">{companyInfo.companyName}</Descriptions.Item>
          <Descriptions.Item label="统一社会信用代码">{companyInfo.creditCode}</Descriptions.Item>
          <Descriptions.Item label="服务商管理类型">{companyInfo.managementType}</Descriptions.Item>
          <Descriptions.Item label="联系人">{companyInfo.contactName}</Descriptions.Item>
          <Descriptions.Item label="联系电话">{companyInfo.contactPhone}</Descriptions.Item>
          <Descriptions.Item label="联系邮箱">{companyInfo.contactEmail}</Descriptions.Item>
          <Descriptions.Item label="注册资本">{companyInfo.registeredCapital}</Descriptions.Item>
          <Descriptions.Item label="注册地址" span={2}>{companyInfo.address}</Descriptions.Item>
        </Descriptions>
      </Card>

      {/* 服务品类 */}
      <Card size="small" variant="outlined" title={<Space><span>📦</span><span>服务品类</span></Space>} style={{ marginBottom: 16 }}>
        <Table
          columns={serviceColumns}
          dataSource={serviceCategories.map((d, i) => ({ ...d, idx: i + 1 }))}
          rowKey="key"
          pagination={false}
          bordered
          size="small"
        />
      </Card>

      {/* 资质文件 */}
      <Card size="small" variant="outlined" title={<Space><span>📎</span><span>资质文件</span></Space>} style={{ marginBottom: 16 }}>
        <FilePreview files={qualificationFiles} onDownload={(file) => console.log('下载文件:', file.name)} />
      </Card>

      {/* 审批状态时间线 */}
      <Card size="small" variant="outlined" title={<Space><span>📅</span><span>审批状态时间线</span></Space>} style={{ marginBottom: 16 }}>
        <StatusTimeline items={timelineItems} />
      </Card>

      {/* 操作按钮 */}
      <Space size={12}>
        <Button type="primary" onClick={handleApprove}>复核通过</Button>
        <Button danger onClick={handleReject}>复核退回</Button>
      </Space>
    </PortalLayout>
  );
}
