/**
 * @name 正式服务商详情（只读）
 * 内容结构对齐 reg-detail.tsx，增加要件信息、MDG信息和使用单位Tab
 */
import React from 'react';
import { useState } from 'react';
import { Typography, Card, Space, Button, Table, Tabs, Tag, Input, Modal, message } from 'antd';
import { calculateServiceTags, ServiceCategory } from '../common/tag-utils';
import { PlusOutlined } from '@ant-design/icons';

const serviceDirColumns = [
  { key: 'code', title: '服务类目编码', width: 130, dataIndex: 'code' },
  { key: 'name', title: '服务类目名称', dataIndex: 'name' },
  { key: 'type', title: '目录类型', width: 100, align: 'center' as const, dataIndex: 'type', render: (v: string) => <Tag color={v === '专业' ? 'blue' : 'default'}>{v}</Tag> },
  { key: 'status', title: '状态', width: 100, align: 'center' as const, dataIndex: 'status', render: (v: string) => <Tag color={v === '正常' ? 'success' : v === '暂停' ? 'warning' : 'default'}>{v}</Tag> },
  { key: 'certType', title: '认证标签', width: 100, align: 'center' as const, dataIndex: 'certType', render: (v: string) => v ? <Tag color={v === '专业认证' ? 'red' : 'blue'} style={{ fontSize: 11, padding: '0 4px', lineHeight: '18px' }}>{v}</Tag> : '—' },
];

const serviceDirData = [
  { code: '502010', name: '工程技术服务 / 生产及维修服务', type: '专业', status: '正常', certType: '专业认证' },
  { code: '601010', name: '办公服务 / 物业管理', type: '通用', status: '正常', certType: '通用认证' },
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

const reqData = [
  { seq: 1, docName: '营业执照副本', docType: '基础要件', status: '已上传' },
  { seq: 2, docName: '资质证书原件扫描', docType: '资质要件', status: '已上传' },
  { seq: 3, docName: '银行开户许可证', docType: '基础要件', status: '已上传' },
  { seq: 4, docName: '安全生产许可证', docType: '资质要件', status: '已上传' },
];

const mdgData = [
  { seq: 1, mdgCode: 'MDG001', mdgName: '供应商基本信息', status: '已同步', syncTime: '2025-12-21 10:00' },
  { seq: 2, mdgCode: 'MDG002', mdgName: '供应商资质信息', status: '已同步', syncTime: '2025-12-21 10:05' },
  { seq: 3, mdgCode: 'MDG003', mdgName: '供应商银行信息', status: '已同步', syncTime: '2025-12-21 10:05' },
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

const currentUnit = '大庆油田';

interface UseUnitRecord {
  unit: string;
  addTime: string;
  addUser: string;
}

interface OpLog {
  type: '添加' | '移除';
  unit: string;
  operator: string;
  time: string;
  remark: string;
}

export default function SpQueryFormalDetail() {
  const [activeTab, setActiveTab] = useState('basic');
  const [useUnits, setUseUnits] = useState<UseUnitRecord[]>([
    { unit: '长庆油田', addTime: '2025-12-20 10:00', addUser: '张三' },
    { unit: '大庆油田', addTime: '2025-12-25 14:30', addUser: '李四' },
    { unit: '西南油气田', addTime: '2026-01-05 09:15', addUser: '王五' },
  ]);
  const [opLogs, setOpLogs] = useState<OpLog[]>([
    { type: '添加', unit: '长庆油田', operator: '张三', time: '2025-12-20 10:00', remark: '长庆油田添加为使用单位' },
    { type: '添加', unit: '大庆油田', operator: '李四', time: '2025-12-25 14:30', remark: '大庆油田添加为使用单位' },
    { type: '添加', unit: '西南油气田', operator: '王五', time: '2026-01-05 09:15', remark: '西南油气田添加为使用单位' },
  ]);

  const isCurrentUnitInUse = useUnits.some(u => u.unit === currentUnit);

  const handleAddUseUnit = () => {
    const now = new Date().toLocaleString('zh-CN', { hour12: false });
    setUseUnits(prev => [...prev, { unit: currentUnit, addTime: now, addUser: '当前用户' }]);
    setOpLogs(prev => [...prev, { type: '添加', unit: currentUnit, operator: '当前用户', time: now, remark: `${currentUnit}添加为使用单位` }]);
    message.success(`已将「${currentUnit}」添加为使用单位`);
  };

  const handleRemoveUseUnit = () => {
    Modal.confirm({
      title: '确认移除',
      content: `确定不再将「${currentUnit}」作为该服务商的使用单位？`,
      okText: '确认移除',
      okType: 'danger',
      onOk: () => {
        const now = new Date().toLocaleString('zh-CN', { hour12: false });
        setUseUnits(prev => prev.filter(u => u.unit !== currentUnit));
        setOpLogs(prev => [...prev, { type: '移除', unit: currentUnit, operator: '当前用户', time: now, remark: `${currentUnit}移除使用单位` }]);
        message.success(`已移除「${currentUnit}」使用关系`);
      },
    });
  };

  /* 根据状态+品类自动计算标签 */
  const spStatus = 'formal';
  const categoryCodes = ['502010', '601010'];
  const categories: ServiceCategory[] = [
    { code: '502010', name: '工程技术服务', type: '专业', certified: true },
    { code: '601010', name: '办公服务', type: '通用', certified: true },
  ];
  const autoTags = calculateServiceTags(spStatus, categoryCodes, categories);

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
              <FormField label="服务商编码"><ReadonlyInput value="1000020022" /></FormField>
              <FormField label="服务商状态"><ReadonlyInput value="正常" /></FormField>
              <FormField label="方式"><ReadonlyInput value="公开招标采购中标" /></FormField>
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
    {
      key: 'req',
      label: '要件信息',
      children: (
        <Table
          columns={[
            { key: 'seq', title: '序号', width: 60, align: 'center' as const, dataIndex: 'seq' },
            { key: 'docName', title: '要件名称', dataIndex: 'docName' },
            { key: 'docType', title: '要件类型', dataIndex: 'docType', width: 120 },
            { key: 'status', title: '状态', dataIndex: 'status', width: 100, render: (val: string) => <Tag color="success">{val}</Tag> },
          ]}
          dataSource={reqData} rowKey="seq" pagination={false} bordered size="middle"
        />
      ),
    },
    {
      key: 'mdg',
      label: 'MDG信息',
      children: (
        <Table
          columns={[
            { key: 'seq', title: '序号', width: 60, align: 'center' as const, dataIndex: 'seq' },
            { key: 'mdgCode', title: 'MDG编码', dataIndex: 'mdgCode', width: 120 },
            { key: 'mdgName', title: 'MDG名称', dataIndex: 'mdgName' },
            { key: 'status', title: '同步状态', dataIndex: 'status', width: 100, render: (val: string) => <Tag color="success">{val}</Tag> },
            { key: 'syncTime', title: '同步时间', dataIndex: 'syncTime', width: 180 },
          ]}
          dataSource={mdgData} rowKey="seq" pagination={false} bordered size="middle"
        />
      ),
    },
    {
      key: 'useUnit',
      label: '使用单位',
      children: (
        <Space direction="vertical" style={{ width: '100%' }} size={20}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <SectionTitle title="使用单位列表" />
              {!isCurrentUnitInUse && (
                <Button type="primary" size="small" icon={<PlusOutlined />} onClick={handleAddUseUnit}>
                  添加为使用单位
                </Button>
              )}
              {isCurrentUnitInUse && (
                <Button danger size="small" onClick={handleRemoveUseUnit}>
                  移除当前单位
                </Button>
              )}
            </div>
            <Table
              columns={[
                { key: 'unit', title: '使用单位', dataIndex: 'unit', render: (val: string) => <Tag color={val === currentUnit ? 'blue' : 'default'}>{val}</Tag> },
                { key: 'addTime', title: '添加时间', dataIndex: 'addTime', width: 180 },
                { key: 'addUser', title: '添加人', dataIndex: 'addUser', width: 100 },
              ]}
              dataSource={useUnits}
              rowKey="unit"
              pagination={false}
              bordered
              size="middle"
            />
          </div>
          <div>
            <SectionTitle title="操作记录" />
            <Table
              columns={[
                { key: 'type', title: '操作类型', dataIndex: 'type', width: 80, render: (val: string) => <Tag color={val === '添加' ? 'success' : 'error'}>{val}</Tag> },
                { key: 'unit', title: '使用单位', dataIndex: 'unit', width: 120 },
                { key: 'operator', title: '操作人', dataIndex: 'operator', width: 100 },
                { key: 'time', title: '操作时间', dataIndex: 'time', width: 180 },
                { key: 'remark', title: '备注', dataIndex: 'remark' },
              ]}
              dataSource={opLogs}
              rowKey={(_, i) => String(i)}
              pagination={false}
              bordered
              size="small"
            />
          </div>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Card size="small" variant="outlined" style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Space direction="vertical" size={4}>
            <Typography.Link onClick={() => window.location.hash = '#/admin/sp-query-formal'} style={{ color: '#ff4d4f', fontSize: 13, display: 'block', marginBottom: 4 }}>← 返回列表</Typography.Link>
            <Space size={16} align="center">
              <Typography.Text type="secondary" style={{ fontSize: 12 }}>正式服务商查询</Typography.Text>
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
              <Typography.Text type="secondary" style={{ fontSize: 12 }}>服务商编码: 1000020022</Typography.Text>
              <Typography.Text type="secondary" style={{ fontSize: 12 }}>时间: 2025-12-20 14:32:18</Typography.Text>
            </Space>
          </Space>
          <Tag color="success" style={{ fontSize: 13, padding: '4px 12px' }}>正常</Tag>
        </div>
      </Card>
      <Card size="small" variant="outlined">
        <Tabs activeKey={activeTab} onChange={setActiveTab} items={tabItems} />
      </Card>
    </div>
  );
}
