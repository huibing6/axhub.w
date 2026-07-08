/**
 * @name 服务商注册审核详情
 */
import { useState } from 'react';
import { theme, Typography, Card, Space, Button, Descriptions, Table, Tabs, Tag, Form, Input, Radio, Select, DatePicker, Checkbox, message } from 'antd';
import PortalLayout from '../../common/portal-layout';
import { adminGroups } from '../../common/menu-data';
import { ReviewModal } from '../../common/components';

const serviceDirColumns = [
  { key: 'code', title: '服务类目编码', width: 130, dataIndex: 'code' },
  { key: 'name', title: '服务类目名称', dataIndex: 'name' },
  { key: 'type', title: '目录类型', width: 100, align: 'center' as const, dataIndex: 'type', render: (v: string) => <Tag color={v === '专业' ? 'blue' : 'default'}>{v}</Tag> },
  { key: 'level', title: '目录等级', width: 90, align: 'center' as const, dataIndex: 'level' },
  { key: 'action', title: '全部合并', width: 100, align: 'center' as const, render: () => <Typography.Link style={{ color: '#1677ff', fontSize: 13 }}>展开</Typography.Link> },
];

const serviceDirData = [
  { code: '502010', name: '工程技术服务 / 生产及维修服务', type: '专业', level: '一级' },
  { code: '601010', name: '办公服务 / 物业管理', type: '通用', level: '二级' },
];

const qualColumns = [
  { key: 'type', title: '文件类型', width: 200, dataIndex: 'type' },
  { key: 'name', title: '文件名称', dataIndex: 'name' },
  {
    key: 'status', title: '备注', width: 90, align: 'center' as const, dataIndex: 'status',
    render: (v: string) => <Tag color={v === '已上传' ? 'success' : 'default'}>{v}</Tag>,
  },
  { key: 'validTime', title: '有效时间', width: 220, dataIndex: 'validTime' },
  { key: 'action', title: '操作', width: 100, align: 'center' as const, render: () => <Typography.Link style={{ color: '#1677ff', fontSize: 13 }}>预览</Typography.Link> },
];

const qualData = [
  { type: '营业执照', name: '—', status: '已上传', validTime: '2020-01-01 至 2030-12-31' },
  { type: '专业资质证书', name: '—', status: '已上传', validTime: '2022-06-01 至 2027-05-31' },
  { type: '财务审计报告/银行资信证明', name: '—', status: '已上传', validTime: '2024年度' },
  { type: '质量/安全/环保资质认证', name: '—', status: '已上传', validTime: '永久有效' },
  { type: '无重大违法违规记录承诺', name: '—', status: '已上传', validTime: '永久有效' },
  { type: '信用中国查询（法人及无黑名单）', name: '—', status: '已上传', validTime: '2025-12-01 至 2026-11-30' },
];

const approvalSteps = [
  { step: '第1步', time: '2025-01-13 15:01:10', operator: '提交', status: '提交' },
  { step: '第2步', time: '2025-01-13 15:01:10', operator: '【主建圆/申请主管】', status: '待审批' },
];

const SectionTitle = ({ title, required }: { title: string; required?: boolean }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12, paddingBottom: 8, borderBottom: '1px solid #f0f0f0' }}>
    <span style={{ fontSize: 14, fontWeight: 600, color: 'rgba(0,0,0,0.88)' }}>{title}</span>
    {required && <Tag color="error" style={{ fontSize: 11, lineHeight: '18px', padding: '0 4px' }}>必填</Tag>}
  </div>
);

const FormField = ({ label, required, children, span }: { label: string; required?: boolean; children: React.ReactNode; span?: number }) => (
  <div style={{ gridColumn: span ? `span ${span}` : undefined }}>
    <div style={{ marginBottom: 4 }}>
      <Typography.Text style={{ fontSize: 13 }}>{label}</Typography.Text>
      {required && <Typography.Text type="danger" style={{ marginLeft: 2 }}>*</Typography.Text>}
    </div>
    {children}
  </div>
);

export default function RegDetailPage() {
  const { token: t } = theme.useToken();
  const [reviewOpen, setReviewOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('basic');

  const handleReviewOk = (_opinion: string, approved: boolean) => {
    message.success(approved ? '审核通过' : '已驳回');
    setReviewOpen(false);
  };

  const tabItems = [
    {
      key: 'basic',
      label: '基本信息',
      children: (
        <Space direction="vertical" style={{ width: '100%' }} size={20}>
          {/* 基础信息 */}
          <div>
            <SectionTitle title="基础信息" />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px 24px' }}>
              <FormField label="服务商名称" required>
                <Input placeholder="请输入服务商名称" />
              </FormField>
              <FormField label="注册资本" required>
                <Input placeholder="单位：万元" />
              </FormField>
              <FormField label="统一社会信用代码" required>
                <Input placeholder="18位统一社会信用代码" />
              </FormField>
              <FormField label="成立日期" required>
                <DatePicker style={{ width: '100%' }} placeholder="年/月/日" />
              </FormField>
            </div>
          </div>

          {/* 管理信息 */}
          <div>
            <SectionTitle title="管理信息" />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px 24px' }}>
              <FormField label="是否内部服务商" required>
                <Radio.Group>
                  <Radio value="yes">内部服务商</Radio>
                  <Radio value="no">中国石油集团全资或控股子公司</Radio>
                </Radio.Group>
              </FormField>
              <FormField label="授权关系证明">
                <Select placeholder="请选择内部组织">
                  <Select.Option value="1">长庆油田</Select.Option>
                  <Select.Option value="2">大庆油田</Select.Option>
                </Select>
              </FormField>
            </div>
            <div style={{ marginTop: 8 }}>
              <Checkbox>上传文件</Checkbox>
            </div>
          </div>

          {/* 联系人信息 */}
          <div>
            <SectionTitle title="联系人信息" />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px 24px' }}>
              <FormField label="联系人姓名" required>
                <Input placeholder="请输入联系人姓名" />
              </FormField>
              <FormField label="联系人手机" required>
                <Input placeholder="请输入11位手机号" />
              </FormField>
              <FormField label="联系人固定电话">
                <Input placeholder="区号-号码 如 010-88888888" />
              </FormField>
              <FormField label="联系人邮箱" required>
                <Input placeholder="请输入邮箱地址" />
              </FormField>
            </div>
          </div>

          {/* 公司情况 */}
          <div>
            <SectionTitle title="公司情况" />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px 24px' }}>
              <FormField label="法定代表人姓名" required>
                <Input placeholder="请输入法定代表人姓名" />
              </FormField>
              <FormField label="币种">
                <Select defaultValue="人民币（CNY）">
                  <Select.Option value="CNY">人民币（CNY）</Select.Option>
                  <Select.Option value="USD">美元（USD）</Select.Option>
                </Select>
              </FormField>
              <FormField label="企业规模">
                <Select placeholder="请选择">
                  <Select.Option value="large">大型</Select.Option>
                  <Select.Option value="medium">中型</Select.Option>
                  <Select.Option value="small">小型</Select.Option>
                </Select>
              </FormField>
              <FormField label="开户银行">
                <Input placeholder="请输入开户银行名称" />
              </FormField>
              <FormField label="银行所在地区" required>
                <Select placeholder="请选择">
                  <Select.Option value="beijing">北京</Select.Option>
                  <Select.Option value="shanghai">上海</Select.Option>
                </Select>
              </FormField>
              <FormField label="公司网址">
                <Input placeholder="https://" />
              </FormField>
              <FormField label="注册资本" required>
                <Input placeholder="单位：万元" />
              </FormField>
              <FormField label="成立日期" required>
                <DatePicker style={{ width: '100%' }} placeholder="年/月/日" />
              </FormField>
              <FormField label="银行账号" required>
                <Input placeholder="请输入银行账号" />
              </FormField>
              <FormField label="开户银行账号" required>
                <Input placeholder="请输入开户银行账号" />
              </FormField>
              <FormField label="公司电话">
                <Input placeholder="区号-号码" />
              </FormField>
            </div>
          </div>

          {/* 税籍信息 */}
          <div>
            <SectionTitle title="税籍信息" />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px 24px' }}>
              <FormField label="国家" required>
                <Select defaultValue="中国">
                  <Select.Option value="中国">中国</Select.Option>
                </Select>
              </FormField>
              <FormField label="省/直辖市" required>
                <Select placeholder="请选择">
                  <Select.Option value="beijing">北京市</Select.Option>
                  <Select.Option value="guangdong">广东省</Select.Option>
                </Select>
              </FormField>
              <FormField label="城市">
                <Input placeholder="请输入城市" />
              </FormField>
              <FormField label="通讯地址" required>
                <Input placeholder="请输入详细通讯地址" />
              </FormField>
              <FormField label="注册地址" required>
                <Input placeholder="请输入企业注册地址" />
              </FormField>
              <FormField label="邮编" required>
                <Input placeholder="6位邮政编码" />
              </FormField>
              <FormField label="经营范围" required span={2}>
                <Input.TextArea rows={3} placeholder="请输入营业执照上的经营范围内容" />
              </FormField>
            </div>
          </div>

          {/* 人员情况 */}
          <div>
            <SectionTitle title="人员情况" required />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px 24px' }}>
              <FormField label="服务队伍人数" required>
                <Input placeholder="请输入服务队伍总人数" />
              </FormField>
              <FormField label="技术人员数量" required>
                <Input placeholder="请输入技术人员数量" />
              </FormField>
              <FormField label="人员资质情况" required span={2}>
                <Input.TextArea rows={2} placeholder="请描述主要人员的资质证书、执业资格等情况" />
              </FormField>
            </div>
          </div>

          {/* 经营情况 */}
          <div>
            <SectionTitle title="经营情况" required />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px 24px' }}>
              <FormField label="近三年营业收入（万元）" required>
                <Input.TextArea rows={2} placeholder="如：2022年1200万/2023年1500万/2024年1800万" />
              </FormField>
              <FormField label="近三年平均利润（万元）" required>
                <Input.TextArea rows={2} placeholder="如：2022年120万/2023年150万/2024年200万" />
              </FormField>
              <FormField label="主要业务范围" required span={2}>
                <Input.TextArea rows={2} placeholder="请描述主营业务范围及核心竞争优势" />
              </FormField>
            </div>
          </div>

          {/* 服务业绩 */}
          <div>
            <SectionTitle title="服务业绩" required />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '12px 24px' }}>
              <FormField label="主要项目业绩" required>
                <Input.TextArea rows={3} placeholder="请列举近三年的主要服务项目名称、甲方单位、项目金额等" />
              </FormField>
              <FormField label="与中国石油合作历史">
                <Input.TextArea rows={2} placeholder="请描述与中国石油及其下属单位的合作历史" />
              </FormField>
            </div>
          </div>

          {/* QHSE管理 */}
          <div>
            <SectionTitle title="QHSE管理" required />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px 24px' }}>
              <FormField label="质量管理体系认证" required>
                <Select placeholder="请选择">
                  <Select.Option value="iso9001">ISO 9001</Select.Option>
                  <Select.Option value="other">其他</Select.Option>
                </Select>
              </FormField>
              <FormField label="HSE管理体系" required>
                <Select placeholder="请选择">
                  <Select.Option value="ohsas18001">OHSAS 18001</Select.Option>
                  <Select.Option value="iso45001">ISO 45001</Select.Option>
                </Select>
              </FormField>
              <FormField label="安全生产记录" required span={2}>
                <Input.TextArea rows={2} placeholder="请描述近三年安全生产情况，是否有重大安全事故" />
              </FormField>
            </div>
            <div style={{ marginTop: 8 }}>
              <Checkbox>需要现场审核（根据服务类别及风险评估结果，必要时安排现场审核）</Checkbox>
            </div>
          </div>

          {/* ESG管理 */}
          <div>
            <SectionTitle title="ESG管理" />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '12px 24px' }}>
              <FormField label="环境管理措施">
                <Input.TextArea rows={2} placeholder="请描述企业在环境保护方面采取的主要措施" />
              </FormField>
              <FormField label="社会责任">
                <Input.TextArea rows={2} placeholder="请描述企业在社会责任方面的主要实践" />
              </FormField>
              <FormField label="公司治理">
                <Input.TextArea rows={2} placeholder="请描述企业治理结构和合规管理制度" />
              </FormField>
            </div>
          </div>
        </Space>
      ),
    },
    {
      key: 'service',
      label: '服务品类',
      children: (
        <Space direction="vertical" style={{ width: '100%' }} size={20}>
          <div>
            <Table
              columns={serviceDirColumns}
              dataSource={serviceDirData}
              rowKey="code"
              pagination={false}
              bordered
              size="middle"
            />
          </div>

          {/* 专业目录资格审查 */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <Typography.Text strong style={{ fontSize: 14, color: '#ff4d4f' }}>专业目录资格审查</Typography.Text>
              <Typography.Text type="secondary" style={{ fontSize: 12 }}>工程技术类服务 / 生产及维修服务 (502010)</Typography.Text>
            </div>
            <SectionTitle title="资质信用" />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px 24px' }}>
              <FormField label="资质等级">
                <Typography.Text>一级</Typography.Text>
              </FormField>
              <FormField label="资质证书编号">
                <Typography.Text>D113045678</Typography.Text>
              </FormField>
              <FormField label="信用评级">
                <Typography.Text>AAA</Typography.Text>
              </FormField>
              <FormField label="资质证明文件">
                <Typography.Link style={{ color: '#1677ff' }}>查看文件</Typography.Link>
              </FormField>
            </div>
          </div>

          {/* 服务能力 */}
          <div>
            <SectionTitle title="服务能力" />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '12px 24px' }}>
              <FormField label="主要设备/装备情况">
                <Typography.Text type="secondary" style={{ fontSize: 13 }}>
                  拥有国际先进的地震采集系统12套、可控震源车48台、高性能计算集群（峰值算力2.8PFLOPS）、自主研发的GeoEast地震数据处理解释一体化平台，以及多套深层次/深层钻探配套装备。
                </Typography.Text>
              </FormField>
              <FormField label="技术优势及特色">
                <Typography.Text type="secondary" style={{ fontSize: 13 }}>
                  具备宽方位、高密度、全波场三维地震勘探技术能力，拥有12项核心专利技术，自主研发的GeoEast处理解释平台已在国内20余个油气田推广应用，处理效率较同类产品提升40%。
                </Typography.Text>
              </FormField>
            </div>
          </div>
        </Space>
      ),
    },
    {
      key: 'qualification',
      label: '资质信息',
      children: (
        <Table
          columns={qualColumns}
          dataSource={qualData}
          rowKey="type"
          pagination={false}
          bordered
          size="middle"
        />
      ),
    },
    {
      key: 'approval',
      label: '审批意见',
      children: (
        <Space direction="vertical" style={{ width: '100%' }} size={24}>
          {/* 审批流程 */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <span style={{ width: 3, height: 14, background: '#1677ff', borderRadius: 2, display: 'inline-block' }} />
              <Typography.Text strong style={{ fontSize: 14 }}>审批流程</Typography.Text>
            </div>
            <div style={{ padding: '12px 16px', background: '#fafafa', borderRadius: 6 }}>
              {approvalSteps.map((step, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '6px 0', borderBottom: idx < approvalSteps.length - 1 ? '1px solid #f0f0f0' : undefined }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: idx === 0 ? '#52c41a' : '#faad14', flexShrink: 0 }} />
                  <Typography.Text style={{ fontSize: 13, color: 'rgba(0,0,0,0.65)', minWidth: 50 }}>{step.time}</Typography.Text>
                  <Typography.Text style={{ fontSize: 13 }}>{step.operator} <Tag color={idx === 0 ? 'success' : 'processing'} style={{ marginLeft: 4 }}>{step.status}</Tag></Typography.Text>
                </div>
              ))}
            </div>
          </div>

          {/* 审批意见 */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <span style={{ width: 3, height: 14, background: '#1677ff', borderRadius: 2, display: 'inline-block' }} />
              <Typography.Text strong style={{ fontSize: 14 }}>审批意见</Typography.Text>
            </div>
            <Form layout="vertical">
              <Form.Item label="审批结果" required>
                <Radio.Group>
                  <Radio value="pass">通过</Radio>
                  <Radio value="reject">驳回</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item label="审批意见" required>
                <Input.TextArea rows={4} placeholder="请输入审批意见" />
              </Form.Item>
            </Form>
          </div>

          <div style={{ textAlign: 'right' }}>
            <Space size={12}>
              <Button type="primary" danger onClick={() => { message.success('审批已提交'); }}>确定</Button>
              <Button onClick={() => setActiveTab('basic')}>取消</Button>
            </Space>
          </div>
        </Space>
      ),
    },
  ];

  return (
    <PortalLayout groups={adminGroups} activePath="/admin/reg-review" portalType="admin">
      {/* 页面头部 */}
      <Card size="small" variant="outlined" style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Space direction="vertical" size={4}>
            <Typography.Link onClick={() => window.history.back()} style={{ color: '#1677ff', fontSize: 13, display: 'block', marginBottom: 4 }}>← 返回列表</Typography.Link>
            <Space size={16} align="center">
              <Typography.Text type="secondary" style={{ fontSize: 12 }}>注册审核管理</Typography.Text>
              <Typography.Text type="secondary" style={{ fontSize: 12 }}>&gt;</Typography.Text>
              <Typography.Text type="secondary" style={{ fontSize: 12 }}>审核详情</Typography.Text>
            </Space>
            <Typography.Title level={4} style={{ margin: '4px 0 0 0' }}>中国石油集团东方地球物理勘探有限责任公司</Typography.Title>
            <Space size={16} style={{ marginTop: 4 }}>
              <Typography.Text type="secondary" style={{ fontSize: 12 }}>统一社会信用代码 91110000100012345X</Typography.Text>
              <Typography.Text type="secondary" style={{ fontSize: 12 }}>提交时间: 2025-12-20 14:32:18</Typography.Text>
              <Typography.Text type="secondary" style={{ fontSize: 12 }}>联系人: 李明</Typography.Text>
              <Typography.Text type="secondary" style={{ fontSize: 12 }}>联系电话: 139****5678</Typography.Text>
            </Space>
          </Space>
          <Tag color="processing" style={{ fontSize: 13, padding: '4px 12px' }}>审核中</Tag>
        </div>
      </Card>

      {/* Tabs */}
      <Card size="small" variant="outlined">
        <Tabs activeKey={activeTab} onChange={setActiveTab} items={tabItems} />
      </Card>

      <ReviewModal
        open={reviewOpen}
        title="审核注册申请"
        onOk={handleReviewOk}
        onCancel={() => setReviewOpen(false)}
      />
    </PortalLayout>
  );
}
