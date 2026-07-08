/**
 * @name 正式准入详情
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

const admissionInfo = {
  source: '公开招标采购中标',
  category: '新增准入服务商',
  projectName: '2026年度江汉油田钻采设备维保服务项目',
  bidNo: 'ZB-2026-JH-0318',
  submitTime: '2026-06-29 14:30',
  status: '待审核',
};

const serviceCategories = [
  { key: 1, code: 'S1001000', name: '租赁服务', level: '一级', type: '专业', unit: '长庆油田' },
  { key: 2, code: 'S1002000', name: '设备维保服务', level: '二级', type: '通用', unit: '长庆油田' },
];

const qualificationFiles = [
  { name: '营业执照.pdf', size: '2.3 MB', uploadTime: '2026-06-20' },
  { name: '安全生产许可证.pdf', size: '1.5 MB', uploadTime: '2026-06-20' },
  { name: '质量管理体系认证证书.pdf', size: '1.8 MB', uploadTime: '2026-06-20' },
  { name: '无重大违法违规承诺书.pdf', size: '0.5 MB', uploadTime: '2026-06-20' },
];

const timelineItems = [
  { status: '待提交', time: '2026-06-29 10:00', operator: '系统' },
  { status: '已提交', time: '2026-06-29 14:30', operator: '李明' },
  { status: '待审核', time: '2026-06-29 14:30', operator: '系统' },
];

const serviceColumns = [
  { title: '服务分类编码', dataIndex: 'code', key: 'code' },
  { title: '服务分类名称', dataIndex: 'name', key: 'name' },
  { title: '级别', dataIndex: 'level', key: 'level' },
  { title: '目录类型', dataIndex: 'type', key: 'type' },
  { title: '管理单位', dataIndex: 'unit', key: 'unit' },
];

/* ─── 主页面 ─── */
export default function AdmissionDetail() {
  const { token: t } = theme.useToken();

  return (
    <div>
      <Space align="center" style={{ marginBottom: 16 }}>
        <AntButton icon={<ArrowLeftOutlined />} onClick={() => window.history.back()}>返回</AntButton>
        <Title level={4} style={{ margin: 0 }}>正式准入详情</Title>
        <Tag color="processing">{admissionInfo.status}</Tag>
      </Space>

      {/* 准入信息 */}
      <Card title="准入信息" variant="outlined" size="small" style={{ marginBottom: 16 }}>
        <Descriptions column={3} bordered size="small">
          <Descriptions.Item label="准入来源">{admissionInfo.source}</Descriptions.Item>
          <Descriptions.Item label="准入类别">{admissionInfo.category}</Descriptions.Item>
          <Descriptions.Item label="提交时间">{admissionInfo.submitTime}</Descriptions.Item>
          <Descriptions.Item label="中标项目" span={2}>{admissionInfo.projectName}</Descriptions.Item>
          <Descriptions.Item label="中标编号">{admissionInfo.bidNo}</Descriptions.Item>
        </Descriptions>
      </Card>

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
    </div>
  );
}
