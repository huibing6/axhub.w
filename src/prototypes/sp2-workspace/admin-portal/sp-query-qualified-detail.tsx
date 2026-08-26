/**
 * @name 合格服务商详情（只读）
 * 内容结构对齐 reg-detail.tsx，去掉审批意见Tab
 */
import React from 'react';
import { useState } from 'react';
import { Typography, Card, Space, Button, Table, Tabs, Tag, Input, Select, DatePicker, Checkbox, Radio } from 'antd';
import { calculateServiceTags } from '../common/tag-utils';

const serviceDirColumns = [
  { key: 'code', title: '服务类目编码', width: 130, dataIndex: 'code' },
  { key: 'name', title: '服务类目名称', dataIndex: 'name' },
  { key: 'type', title: '目录类型', width: 100, align: 'center' as const, dataIndex: 'type', render: (v: string) => <Tag color={v === '专业' ? 'blue' : 'default'}>{v}</Tag> },
  { key: 'level', title: '目录等级', width: 90, align: 'center' as const, dataIndex: 'level' },
];

const serviceDirData = [
  { code: '502010', name: '工程技术服务 / 生产及维修服务', type: '专业', level: '一级' },
  { code: '601010', name: '办公服务 / 物业管理', type: '通用', level: '二级' },
];

const qualColumns = [
  { key: 'type', title: '文件类型', width: 200, dataIndex: 'type' },
  { key: 'name', title: '文件名称', dataIndex: 'name' },
  { key: 'status', title: '备注', width: 90, align: 'center' as const, dataIndex: 'status', render: (v: string) => <Tag color={v === '已上传' ? 'success' : 'default'}>{v}</Tag> },
  { key: 'validTime', title: '有效时间', width: 220, dataIndex: 'validTime' },
  { key: 'action', title: '操作', width: 100, align: 'center' as const, render: () => <Typography.Link style={{ color: '#ff4d4f', fontSize: 13 }}>预览</Typography.Link> },
];

const qualData = [
  { type: '营业执照', name: '—', status: '已上传', validTime: '2020-01-01 至 2030-12-31' },
  { type: '专业资质证书', name: '—', status: '已上传', validTime: '2022-06-01 至 2027-05-31' },
  { type: '财务审计报告/银行资信证明', name: '—', status: '已上传', validTime: '2024年度' },
  { type: '质量/安全/环保资质认证', name: '—', status: '已上传', validTime: '永久有效' },
  { type: '无重大违法违规记录承诺', name: '—', status: '已上传', validTime: '永久有效' },
  { type: '信用中国查询（法人及无黑名单）', name: '—', status: '已上传', validTime: '2025-12-01 至 2026-11-30' },
];

const SectionTitle = ({ title }: { title: string }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12, paddingBottom: 8, borderBottom: '1px solid #f0f0f0' }}>
    <span style={{ fontSize: 14, fontWeight: 600, color: 'rgba(0,0,0,0.88)' }}>{title}</span>
  </div>
);

const FormField = ({ label, children, span }: { label: string; children: React.ReactNode; span?: number }) => (
  <div style={{ gridColumn: span ? `span ${span}` : undefined }}>
    <div style={{ marginBottom: 4 }}><Typography.Text style={{ fontSize: 13 }}>{label}</Typography.Text></div>
    {children}
  </div>
);

const ReadonlyInput = ({ value }: { value: string }) => <Input value={value} disabled />;

export default function SpQueryQualifiedDetail() {
  const [activeTab, setActiveTab] = useState('basic');

  /* 根据状态+品类自动计算标签 */
  const spStatus = 'qualified';
  const categoryCodes = ['S0201000'];
  const autoTags = calculateServiceTags(spStatus, categoryCodes);

  const tabItems = [
    {
      key: 'basic',
      label: '基本信息',
      children: (
        <Space direction="vertical" style={{ width: '100%' }} size={20}>
          <div>
            <SectionTitle title="基础信息" />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px 24px' }}>
              <FormField label="服务商名称"><ReadonlyInput value="中国石油集团东方地球物理勘探有限责任公司" /></FormField>
              <FormField label="注册资本"><ReadonlyInput value="5000" /></FormField>
              <FormField label="统一社会信用代码"><ReadonlyInput value="91110000100012345X" /></FormField>
              <FormField label="成立日期"><ReadonlyInput value="2000-01-01" /></FormField>
            </div>
          </div>
          <div>
            <SectionTitle title="管理信息" />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px 24px' }}>
              <FormField label="是否内部服务商"><ReadonlyInput value="内部服务商" /></FormField>
              <FormField label="授权关系证明"><ReadonlyInput value="长庆油田" /></FormField>
            </div>
          </div>
          <div>
            <SectionTitle title="联系人信息" />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px 24px' }}>
              <FormField label="联系人姓名"><ReadonlyInput value="李明" /></FormField>
              <FormField label="联系人手机"><ReadonlyInput value="139****5678" /></FormField>
              <FormField label="联系人固定电话"><ReadonlyInput value="010-88888888" /></FormField>
              <FormField label="联系人邮箱"><ReadonlyInput value="liming@example.com" /></FormField>
            </div>
          </div>
          <div>
            <SectionTitle title="公司情况" />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px 24px' }}>
              <FormField label="法定代表人姓名"><ReadonlyInput value="张伟" /></FormField>
              <FormField label="币种"><ReadonlyInput value="人民币（CNY）" /></FormField>
              <FormField label="企业规模"><ReadonlyInput value="大型" /></FormField>
              <FormField label="开户银行"><ReadonlyInput value="中国工商银行" /></FormField>
              <FormField label="银行所在地区"><ReadonlyInput value="北京" /></FormField>
              <FormField label="公司网址"><ReadonlyInput value="https://www.bgp.com.cn" /></FormField>
              <FormField label="注册资本"><ReadonlyInput value="5000万元" /></FormField>
              <FormField label="成立日期"><ReadonlyInput value="2000-01-01" /></FormField>
              <FormField label="银行账号"><ReadonlyInput value="0200****1234" /></FormField>
              <FormField label="开户银行账号"><ReadonlyInput value="0200****1234" /></FormField>
              <FormField label="公司电话"><ReadonlyInput value="010-88888888" /></FormField>
            </div>
          </div>
          <div>
            <SectionTitle title="税籍信息" />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px 24px' }}>
              <FormField label="国家"><ReadonlyInput value="中国" /></FormField>
              <FormField label="省/直辖市"><ReadonlyInput value="北京市" /></FormField>
              <FormField label="城市"><ReadonlyInput value="北京市" /></FormField>
              <FormField label="通讯地址"><ReadonlyInput value="北京市朝阳区太阳宫" /></FormField>
              <FormField label="注册地址"><ReadonlyInput value="北京市朝阳区太阳宫" /></FormField>
              <FormField label="邮编"><ReadonlyInput value="100028" /></FormField>
              <FormField label="经营范围" span={2}><Input.TextArea rows={3} value="地球物理勘探、石油天然气开发技术服务" disabled /></FormField>
            </div>
          </div>
          <div>
            <SectionTitle title="人员情况" />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px 24px' }}>
              <FormField label="服务队伍人数"><ReadonlyInput value="5000" /></FormField>
              <FormField label="技术人员数量"><ReadonlyInput value="3200" /></FormField>
              <FormField label="人员资质情况" span={2}><Input.TextArea rows={2} value="拥有高级工程师200余人，注册石油工程师50人" disabled /></FormField>
            </div>
          </div>
          <div>
            <SectionTitle title="经营情况" />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px 24px' }}>
              <FormField label="近三年营业收入（万元）"><Input.TextArea rows={2} value="2022年120000万/2023年150000万/2024年180000万" disabled /></FormField>
              <FormField label="近三年平均利润（万元）"><Input.TextArea rows={2} value="2022年12000万/2023年15000万/2024年20000万" disabled /></FormField>
              <FormField label="主要业务范围" span={2}><Input.TextArea rows={2} value="物探采集、资料处理、综合研究、油藏地球物理" disabled /></FormField>
            </div>
          </div>
          <div>
            <SectionTitle title="服务业绩" />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '12px 24px' }}>
              <FormField label="主要项目业绩"><Input.TextArea rows={3} value="长庆油田三维地震勘探项目、塔里木盆地深层地震攻关项目等" disabled /></FormField>
              <FormField label="与中国石油合作历史"><Input.TextArea rows={2} value="与中国石油合作超过20年，承担多个重大勘探项目" disabled /></FormField>
            </div>
          </div>
          <div>
            <SectionTitle title="QHSE管理" />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px 24px' }}>
              <FormField label="质量管理体系认证"><ReadonlyInput value="ISO 9001" /></FormField>
              <FormField label="HSE管理体系"><ReadonlyInput value="ISO 45001" /></FormField>
              <FormField label="安全生产记录" span={2}><Input.TextArea rows={2} value="近五年无重大安全事故，年均安全培训覆盖100%" disabled /></FormField>
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
          <Table columns={serviceDirColumns} dataSource={serviceDirData} rowKey="code" pagination={false} bordered size="middle" />
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <Typography.Text strong style={{ fontSize: 14, color: '#ff4d4f' }}>专业目录资格审查</Typography.Text>
              <Typography.Text type="secondary" style={{ fontSize: 12 }}>工程技术类服务 / 生产及维修服务 (502010)</Typography.Text>
            </div>
            <SectionTitle title="资质信用" />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px 24px' }}>
              <FormField label="资质等级"><Typography.Text>一级</Typography.Text></FormField>
              <FormField label="资质证书编号"><Typography.Text>D113045678</Typography.Text></FormField>
              <FormField label="信用评级"><Typography.Text>AAA</Typography.Text></FormField>
              <FormField label="资质证明文件"><Typography.Link style={{ color: '#ff4d4f' }}>查看文件</Typography.Link></FormField>
            </div>
          </div>
          <div>
            <SectionTitle title="服务能力" />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '12px 24px' }}>
              <FormField label="主要设备/装备情况">
                <Typography.Text type="secondary" style={{ fontSize: 13 }}>拥有国际先进的地震采集系统12套、可控震源车48台、高性能计算集群（峰值算力2.8PFLOPS）。</Typography.Text>
              </FormField>
              <FormField label="技术优势及特色">
                <Typography.Text type="secondary" style={{ fontSize: 13 }}>具备宽方位、高密度、全波场三维地震勘探技术能力，拥有12项核心专利技术。</Typography.Text>
              </FormField>
            </div>
          </div>
        </Space>
      ),
    },
    {
      key: 'qualification',
      label: '资质信息',
      children: <Table columns={qualColumns} dataSource={qualData} rowKey="type" pagination={false} bordered size="middle" />,
    },
  ];

  return (
    <div>
      <Card size="small" variant="outlined" style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Space direction="vertical" size={4}>
            <Typography.Link onClick={() => window.location.hash = '#/admin/sp-query-qualified'} style={{ color: '#ff4d4f', fontSize: 13, display: 'block', marginBottom: 4 }}>← 返回列表</Typography.Link>
            <Space size={16} align="center">
              <Typography.Text type="secondary" style={{ fontSize: 12 }}>合格服务商查询</Typography.Text>
              <Typography.Text type="secondary" style={{ fontSize: 12 }}>&gt;</Typography.Text>
              <Typography.Text type="secondary" style={{ fontSize: 12 }}>服务商详情</Typography.Text>
            </Space>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
              <Typography.Title level={4} style={{ margin: 0 }}>中国石油集团东方地球物理勘探有限责任公司</Typography.Title>
              {autoTags.map(tag => (
                <Tag key={tag.name} color={tag.color} style={{ fontSize: 12, margin: 0 }}>{tag.name}</Tag>
              ))}
            </div>
            <Space size={16} style={{ marginTop: 4 }}>
              <Typography.Text type="secondary" style={{ fontSize: 12 }}>统一社会信用代码 91110000100012345X</Typography.Text>
              <Typography.Text type="secondary" style={{ fontSize: 12 }}>注册时间: 2025-12-20 14:32:18</Typography.Text>
            </Space>
          </Space>
          <Tag color="success" style={{ fontSize: 13, padding: '4px 12px' }}>合格</Tag>
        </div>
      </Card>
      <Card size="small" variant="outlined">
        <Tabs activeKey={activeTab} onChange={setActiveTab} items={tabItems} />
      </Card>
    </div>
  );
}
