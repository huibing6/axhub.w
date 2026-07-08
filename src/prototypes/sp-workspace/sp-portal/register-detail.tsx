/**
 * @name 注册申请详情
 */
import { StatusTimeline, FilePreview } from '../common/components';
import { theme, Card, Table, Typography, Button as AntButton, Descriptions, Space, Tag } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

/* ─── 模拟数据 ─── */
const companyInfo = {
  companyName: '湖北江汉石油机械制造有限公司',
  creditCode: '91420000706802345X',
  establishDate: '2005-03-15',
  registeredCapital: '5,000 万元',
  legalPerson: '张伟',
  companyScale: '中型企业',
  address: '湖北省武汉市东湖高新区光谷大道77号',
  contactName: '李明',
  contactPhone: '13800138000',
  contactEmail: 'liming@example.com',
  businessScope: '石油钻采设备制造、维修、销售；石油工程技术咨询服务',
};

const serviceCategories = [
  { key: 1, code: 'S1001000', name: '租赁服务', level: '一级', type: '专业', unit: '长庆油田' },
  { key: 2, code: 'S1002000', name: '设备维保服务', level: '二级', type: '通用', unit: '长庆油田' },
  { key: 3, code: 'S1003000', name: '信息技术服务', level: '三级', type: '专业', unit: '西南油气田' },
];

const qualificationFiles = [
  { name: '营业执照.pdf', size: '2.3 MB', uploadTime: '2026-06-20' },
  { name: '质量管理体系认证证书.pdf', size: '1.8 MB', uploadTime: '2026-06-20' },
  { name: 'HSE管理体系认证证书.pdf', size: '2.1 MB', uploadTime: '2026-06-20' },
  { name: '近三年财务审计报告.pdf', size: '5.6 MB', uploadTime: '2026-06-20' },
];

const timelineItems = [
  { status: '待提交', time: '2026-06-20 09:00', operator: '系统' },
  { status: '已提交', time: '2026-06-20 10:30', operator: '李明' },
  { status: '部门审核', time: '2026-06-21 14:20', operator: '王部长', opinion: '材料齐全，符合要求' },
  { status: '资质审查', time: '2026-06-22 09:15', operator: '赵主管', opinion: '资质证书有效，予以通过' },
  { status: '终审通过', time: '2026-06-23 16:40', operator: '刘总', opinion: '同意准入，纳入服务商库' },
];

const approvalRecords = [
  { key: 1, step: '部门审核', approver: '王部长', department: '采购部', opinion: '材料齐全，符合要求', result: '通过', time: '2026-06-21 14:20' },
  { key: 2, step: '资质审查', approver: '赵主管', department: '资质管理部', opinion: '资质证书有效，予以通过', result: '通过', time: '2026-06-22 09:15' },
  { key: 3, step: '终审', approver: '刘总', department: '管理层', opinion: '同意准入，纳入服务商库', result: '通过', time: '2026-06-23 16:40' },
];

const serviceColumns = [
  { title: '服务分类编码', dataIndex: 'code', key: 'code' },
  { title: '服务分类名称', dataIndex: 'name', key: 'name' },
  { title: '级别', dataIndex: 'level', key: 'level' },
  { title: '目录类型', dataIndex: 'type', key: 'type' },
  { title: '管理单位', dataIndex: 'unit', key: 'unit' },
];

const approvalColumns = [
  { title: '审批环节', dataIndex: 'step', key: 'step' },
  { title: '审批人', dataIndex: 'approver', key: 'approver' },
  { title: '所属部门', dataIndex: 'department', key: 'department' },
  { title: '审批意见', dataIndex: 'opinion', key: 'opinion', width: 300 },
  { title: '审批结果', dataIndex: 'result', key: 'result', render: (text: string) => <Tag color="success">{text}</Tag> },
  { title: '审批时间', dataIndex: 'time', key: 'time' },
];

/* ─── 主页面 ─── */
export default function RegisterDetail() {
  const { token: t } = theme.useToken();

  return (
    <div>
      <Space align="center" style={{ marginBottom: 16 }}>
        <AntButton icon={<ArrowLeftOutlined />} onClick={() => window.history.back()}>返回</AntButton>
        <Title level={4} style={{ margin: 0 }}>注册申请详情</Title>
      </Space>

      {/* 企业基本信息 */}
      <Card title="企业基本信息" variant="outlined" size="small" style={{ marginBottom: 16 }}>
        <Descriptions column={3} bordered size="small">
          <Descriptions.Item label="企业名称">{companyInfo.companyName}</Descriptions.Item>
          <Descriptions.Item label="统一社会信用代码">{companyInfo.creditCode}</Descriptions.Item>
          <Descriptions.Item label="成立日期">{companyInfo.establishDate}</Descriptions.Item>
          <Descriptions.Item label="注册资本">{companyInfo.registeredCapital}</Descriptions.Item>
          <Descriptions.Item label="法定代表人">{companyInfo.legalPerson}</Descriptions.Item>
          <Descriptions.Item label="企业规模">{companyInfo.companyScale}</Descriptions.Item>
          <Descriptions.Item label="注册地址" span={2}>{companyInfo.address}</Descriptions.Item>
          <Descriptions.Item label="经营范围" span={3}>{companyInfo.businessScope}</Descriptions.Item>
          <Descriptions.Item label="联系人">{companyInfo.contactName}</Descriptions.Item>
          <Descriptions.Item label="联系电话">{companyInfo.contactPhone}</Descriptions.Item>
          <Descriptions.Item label="联系邮箱">{companyInfo.contactEmail}</Descriptions.Item>
        </Descriptions>
      </Card>

      {/* 服务品类信息 */}
      <Card title="服务品类信息" variant="outlined" size="small" style={{ marginBottom: 16 }}>
        <Table columns={serviceColumns} dataSource={serviceCategories} pagination={false} bordered size="middle" />
      </Card>

      {/* 资质文件 */}
      <Card title="资质文件" variant="outlined" size="small" style={{ marginBottom: 16 }}>
        <FilePreview files={qualificationFiles} onDownload={(file) => console.log('下载文件:', file.name)} />
      </Card>

      {/* 审批状态时间线 */}
      <Card title="审批状态时间线" variant="outlined" size="small" style={{ marginBottom: 16 }}>
        <StatusTimeline items={timelineItems} />
      </Card>

      {/* 审批记录 */}
      <Card title="审批记录" variant="outlined" size="small" style={{ marginBottom: 16 }}>
        <Table columns={approvalColumns} dataSource={approvalRecords} pagination={false} bordered size="middle" />
      </Card>
    </div>
  );
}