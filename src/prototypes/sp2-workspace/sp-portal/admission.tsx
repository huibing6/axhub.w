/**
 * @name 服务商准入资料
 * 两级结构：补充资料通知列表（各使用单位发送）→ 详情4Tab（回显注册资料+按该使用单位模板补充）。
 */
import React from 'react';
import { useState } from 'react';
import {
  theme, Tabs, Card, Form, Input, Select, Radio, Row, Col, Typography,
  message, Button as AntButton, Space, Upload, DatePicker, Checkbox, Table, Modal, Tag, Empty,
} from 'antd';
import { UploadOutlined, PlusOutlined, ArrowLeftOutlined, FileTextOutlined } from '@ant-design/icons';
import { QualAttachCard } from '../common/components';
import { getCategoryInstructions } from '../common/qualification-config';

/* ─── 子组件：卡片分区标题 ─── */
function SectionTitle({ icon, title, tag }: { icon: string; title: string; tag?: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
      <span style={{ fontSize: 16 }}>{icon}</span>
      <Typography.Text strong style={{ fontSize: 14 }}>{title}</Typography.Text>
      {tag && (
        <span style={{
          background: '#fff1f0', color: '#ff4d4f', fontSize: 12, padding: '0 6px',
          borderRadius: 4, border: '1px solid #ffa39e',
        }}>
          {tag}
        </span>
      )}
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   通知列表数据（各使用单位发送的补充资料通知）
   ════════════════════════════════════════════════════════════════ */
export interface AdmissionNotice {
  id: number;
  unitName: string;
  templateName: string;
  itemCount: number;
  noticeTime: string;
  deadline: string;
  status: 'pending' | 'submitted' | 'confirmed';
  mdgStatus: 'none' | 'inprogress' | 'coded';
  mdgCode?: string;
  items: { name: string; description: string; type: 'upload' | 'text' }[];
}

const noticeList: AdmissionNotice[] = [
  {
    id: 1,
    unitName: '长庆油田分公司',
    templateName: '注册补充资料通知',
    itemCount: 3,
    noticeTime: '2026-06-11 09:30',
    deadline: '2026-06-20 18:00',
    status: 'pending',
    mdgStatus: 'none',
    items: [
      { name: '营业执照副本扫描件', description: '请上传最新营业执照副本的彩色扫描件（加盖公章）', type: 'upload' },
      { name: '法定代表人身份证明', description: '请上传法定代表人身份证正反面扫描件', type: 'upload' },
      { name: '银行开户证明', description: '请上传基本存款账户开户许可证或开户证明', type: 'upload' },
    ],
  },
  {
    id: 2,
    unitName: '西南油气田分公司',
    templateName: '准入补充资料通知',
    itemCount: 2,
    noticeTime: '2026-06-12 10:15',
    deadline: '2026-06-22 18:00',
    status: 'submitted',
    mdgStatus: 'inprogress',
    items: [
      { name: '近三年业绩证明', description: '请填写近三年主要服务项目业绩清单及合同金额', type: 'text' },
      { name: '安全生产许可证', description: '请上传有效期内的安全生产许可证扫描件', type: 'upload' },
    ],
  },
  {
    id: 3,
    unitName: '大庆油田有限责任公司',
    templateName: '注册补充资料通知',
    itemCount: 1,
    noticeTime: '2026-06-09 14:00',
    deadline: '2026-06-18 18:00',
    status: 'confirmed',
    mdgStatus: 'coded',
    mdgCode: 'M20260612001',
    items: [
      { name: '质量管理体系认证证书', description: '请上传 ISO 9001 质量管理体系认证证书扫描件', type: 'upload' },
    ],
  },
];

/* ════════════════════════════════════════════════════════════════
   Tab 1：基本信息（readonly 时回显注册提交的资料）
   ════════════════════════════════════════════════════════════════ */
const registeredBasic = {
  companyName: '中海油能源发展股份有限公司',
  registeredCapital: '50,000',
  creditCode: '91110000100012345X',
  establishDate: '2008-06-18',
  isInternal: 'external',
  ownershipProof: '权属关系证明.pdf',
  internalOrg: '',
  contactName: '李明',
  contactPhone: '13912345678',
  contactTel: '010-88888888',
  contactEmail: 'liming@cnocc.com',
  legalPerson: '张伟',
  currency: 'CNY',
  companyScale: 'large',
  bankName: '中国工商银行北京分行',
  bankCredit: 'aaa',
  website: 'https://www.cnocc.com',
  bankAccount: '0200003109001234567',
  country: '中国',
  province: '北京',
  city: '北京',
  mailAddress: '北京市东城区朝阳门北大街25号',
  regAddress: '北京市东城区朝阳门北大街25号',
  zipCode: '100010',
  businessScope: '油气勘探开发技术服务；石油化工产品生产与销售；能源装备制造与维修',
  serviceTeamSize: '3200',
  techStaffCount: '860',
  staffQualification: '拥有高级工程师120人、注册安全工程师45人，持证焊工200余人',
  revenue: '2023年120亿；2024年135亿；2025年150亿',
  profit: '2023年8亿；2024年9.5亿；2025年11亿',
  mainBusiness: '海洋石油勘探开发技术服务、能源装备制造、工程技术服务',
  projectExperience: '渤海油田开发技术服务项目、南海深水油气田项目、LNG装备制造项目等',
  cnpcExperience: '与中国石油下属长庆、大庆、西南油气田等多家单位长期合作',
  qualityCert: 'iso9001',
  hseSystem: 'iso14001',
  safetyRecord: '近三年无重大安全事故',
  needOnsiteAudit: true,
  envMeasures: '通过ISO14001环境管理体系认证，海上作业执行海洋环保标准',
  socialResponsibility: '积极参与绿色能源开发，履行社会责任',
  corporateGovernance: '建立了完善的法人治理结构和合规管理制度',
};

function BasicInfoTab({ readonly = false }: { readonly?: boolean }) {
  const ro = readonly ? { disabled: true } : {};
  const initial = readonly ? registeredBasic : undefined;

  return (
    <>
      <Card variant="outlined" size="small" style={{ marginBottom: 16 }}>
        <SectionTitle icon="📋" title="基础信息" />
        <Form layout="vertical" initialValues={initial}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="服务商名称" name="companyName">
                <Input placeholder="请输入服务商全称" {...ro} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="注册资本" name="registeredCapital">
                <Input suffix={<Typography.Text type="secondary">单位：万元</Typography.Text>} placeholder="请输入注册资本" {...ro} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="统一社会信用代码" name="creditCode">
                <Input placeholder="18位统一社会信用代码" maxLength={18} {...ro} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="成立日期" name="establishDate">
                {readonly ? (
                  <Input placeholder="请选择日期" {...ro} />
                ) : (
                  <DatePicker style={{ width: '100%' }} placeholder="请选择日期" />
                )}
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>

      <Card variant="outlined" size="small" style={{ marginBottom: 16 }}>
        <SectionTitle icon="🏢" title="管理信息" />
        <Form layout="vertical" initialValues={initial}>
          <Form.Item label="是否内部服务商" name="isInternal">
            <Radio.Group {...ro}>
              <Radio value="external">外部服务商</Radio>
              <Radio value="internal">中国石油集团全资或控股子公司</Radio>
            </Radio.Group>
          </Form.Item>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="权属关系证明" name="ownershipProof">
                {readonly ? (
                  <Input value="权属关系证明.pdf" disabled />
                ) : (
                  <Upload beforeUpload={() => false}>
                    <AntButton icon={<UploadOutlined />}>上传文件</AntButton>
                  </Upload>
                )}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="内部组织" name="internalOrg">
                <Select placeholder="请选择内部组织" {...ro}>
                  <Select.Option value="cnpc">中国石油集团</Select.Option>
                  <Select.Option value="sub">子公司</Select.Option>
                  <Select.Option value="branch">分公司</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>

      <Card variant="outlined" size="small" style={{ marginBottom: 16 }}>
        <SectionTitle icon="👤" title="联系人信息" />
        <Form layout="vertical" initialValues={initial}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="联系人姓名" name="contactName">
                <Input placeholder="请输入联系人姓名" {...ro} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="联系人手机号" name="contactPhone">
                <Input placeholder="请输入11位手机号" maxLength={11} {...ro} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="联系人固定电话" name="contactTel">
                <Input placeholder="区号-号码，如 010-88888888" {...ro} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="联系人邮箱" name="contactEmail">
                <Input placeholder="请输入邮箱地址" {...ro} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>

      <Card variant="outlined" size="small" style={{ marginBottom: 16 }}>
        <SectionTitle icon="🏛️" title="公司情况" />
        <Form layout="vertical" initialValues={initial}>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item label="法定代表人姓名" name="legalPerson">
                <Input placeholder="请输入法定代表人姓名" {...ro} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="币种" name="currency">
                <Select {...ro}>
                  <Select.Option value="CNY">人民币（CNY）</Select.Option>
                  <Select.Option value="USD">美元（USD）</Select.Option>
                  <Select.Option value="EUR">欧元（EUR）</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="企业规模" name="companyScale">
                <Select placeholder="请选择" {...ro}>
                  <Select.Option value="large">大型企业</Select.Option>
                  <Select.Option value="medium">中型企业</Select.Option>
                  <Select.Option value="small">小型企业</Select.Option>
                  <Select.Option value="micro">微型企业</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="开户银行" name="bankName">
                <Input placeholder="请输入开户银行名称" {...ro} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="银行信用等级" name="bankCredit">
                <Select placeholder="请选择" {...ro}>
                  <Select.Option value="aaa">AAA</Select.Option>
                  <Select.Option value="aa">AA</Select.Option>
                  <Select.Option value="a">A</Select.Option>
                  <Select.Option value="bbb">BBB</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="公司网址" name="website">
                <Input placeholder="https://" {...ro} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="银行账号" name="bankAccount">
                <Input placeholder="请输入银行账号" {...ro} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="公司电话" name="companyTel">
                <Input placeholder="区号-号码" {...ro} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>

      <Card variant="outlined" size="small" style={{ marginBottom: 16 }}>
        <SectionTitle icon="📍" title="详细信息" />
        <Form layout="vertical" initialValues={initial}>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item label="国家" name="country">
                <Select {...ro}>
                  <Select.Option value="中国">中国</Select.Option>
                  <Select.Option value="美国">美国</Select.Option>
                  <Select.Option value="日本">日本</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="省/直辖市" name="province">
                <Select placeholder="请选择" {...ro}>
                  <Select.Option value="北京">北京</Select.Option>
                  <Select.Option value="上海">上海</Select.Option>
                  <Select.Option value="广东">广东</Select.Option>
                  <Select.Option value="浙江">浙江</Select.Option>
                  <Select.Option value="江苏">江苏</Select.Option>
                  <Select.Option value="四川">四川</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="城市" name="city">
                <Input placeholder="请输入城市" {...ro} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="通讯地址" name="mailAddress">
                <Input placeholder="请输入详细通讯地址" {...ro} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="注册地址" name="regAddress">
                <Input placeholder="请输入企业注册地址" {...ro} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="邮编" name="zipCode">
                <Input placeholder="6位邮政编码" maxLength={6} {...ro} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="经营范围" name="businessScope">
                <Input.TextArea rows={3} placeholder="请输入营业执照上的经营范围内内容" {...ro} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>

      <Card variant="outlined" size="small" style={{ marginBottom: 16 }}>
        <SectionTitle icon="👥" title="人员情况" tag="必填" />
        <Form layout="vertical" initialValues={initial}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="服务队伍人数" name="serviceTeamSize">
                <Input placeholder="请输入服务队伍总人数" {...ro} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="技术人员数量" name="techStaffCount">
                <Input placeholder="请输入技术人员数量" {...ro} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="人员资质情况" name="staffQualification">
                <Input.TextArea rows={3} placeholder="请描述主要人员的资质证书、执业资格等情况" {...ro} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>

      <Card variant="outlined" size="small" style={{ marginBottom: 16 }}>
        <SectionTitle icon="📊" title="经营情况" tag="必填" />
        <Form layout="vertical" initialValues={initial}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="近三年营业收入（万元）" name="revenue">
                <Input.TextArea rows={2} placeholder="如：2022年200万元；2023年500万元；2024年800万元" {...ro} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="近三年净利润（万元）" name="profit">
                <Input.TextArea rows={2} placeholder="如：2022年20万元；2023年80万元；2024年100万元" {...ro} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="主要业务范围" name="mainBusiness">
                <Input.TextArea rows={3} placeholder="请描述主营业务范围及核心竞争优势" {...ro} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>

      <Card variant="outlined" size="small" style={{ marginBottom: 16 }}>
        <SectionTitle icon="🏆" title="服务业绩" tag="必填" />
        <Form layout="vertical" initialValues={initial}>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item label="主要项目业绩" name="projectExperience">
                <Input.TextArea rows={4} placeholder="请列举近三年的主要服务项目名称、甲方单位、项目金额等" {...ro} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="与中国石油合作经历" name="cnpcExperience">
                <Input.TextArea rows={3} placeholder="请描述与中国石油集团及其下属单位的合作历史" {...ro} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>

      <Card variant="outlined" size="small" style={{ marginBottom: 16 }}>
        <SectionTitle icon="🛡️" title="QHSE管理" tag="必填" />
        <Form layout="vertical" initialValues={initial}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="质量管理体系认证" name="qualityCert">
                <Select placeholder="请选择" {...ro}>
                  <Select.Option value="iso9001">ISO 9001</Select.Option>
                  <Select.Option value="other">其他</Select.Option>
                  <Select.Option value="none">无</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="HSE管理体系" name="hseSystem">
                <Select placeholder="请选择" {...ro}>
                  <Select.Option value="iso14001">ISO 14001</Select.Option>
                  <Select.Option value="ohsas18001">OHSAS 18001</Select.Option>
                  <Select.Option value="other">其他</Select.Option>
                  <Select.Option value="none">无</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="安全生产记录" name="safetyRecord">
                <Input.TextArea rows={3} placeholder="请描述近三年安全生产情况，是否有重大安全事故" {...ro} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="needOnsiteAudit" valuePropName="checked">
                <Checkbox {...ro}>需要现场审核（根据服务类别及风险评估结果，必要时安排现场审核）</Checkbox>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>

      <Card variant="outlined" size="small" style={{ marginBottom: 16 }}>
        <SectionTitle icon="🌱" title="ESG管理" tag="选填" />
        <Form layout="vertical" initialValues={initial}>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item label="环境管理措施" name="envMeasures">
                <Input.TextArea rows={3} placeholder="请描述企业在环境保护方面采取的主要措施" {...ro} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="社会责任" name="socialResponsibility">
                <Input.TextArea rows={3} placeholder="请描述企业在社会责任方面的主要实践" {...ro} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="公司治理" name="corporateGovernance">
                <Input.TextArea rows={3} placeholder="请描述企业治理结构和合规管理制度" {...ro} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
    </>
  );
}

/* ════════════════════════════════════════════════════════════════
   Tab 2：服务目录（readonly 时回显注册已选品类及已填信息）
   ════════════════════════════════════════════════════════════════ */
interface ServiceItem {
  id: number;
  code: string;
  name: string;
  type: '专业' | '通用';
  level: string;
  expanded: boolean;
}

interface TreeNode {
  key: string;
  title: string;
  code: string;
  level: string;
  children?: TreeNode[];
}

const professionalTree: TreeNode[] = [
  { key: 'S01', title: '咨询服务', code: 'S01', level: '一级', children: [
    { key: 'S0101', title: '咨询服务', code: 'S0101', level: '二级', children: [
      { key: 'S0101000', title: '咨询', code: 'S0101000', level: '三级' },
    ]},
    { key: 'S0102', title: '勘查服务', code: 'S0102', level: '二级', children: [
      { key: 'S0102000', title: '勘查', code: 'S0102000', level: '三级' },
      { key: 'S0102001', title: '劳务勘查', code: 'S0102001', level: '三级' },
      { key: 'S0102002', title: '专业勘查', code: 'S0102002', level: '三级' },
    ]},
    { key: 'S0103', title: '设计服务', code: 'S0103', level: '二级', children: [
      { key: 'S0103000', title: '设计', code: 'S0103000', level: '三级' },
      { key: 'S0103001', title: '行业设计', code: 'S0103001', level: '三级' },
      { key: 'S0103002', title: '专业设计', code: 'S0103002', level: '三级' },
    ]},
  ]},
  { key: 'S02', title: '物化探服务', code: 'S02', level: '一级', children: [
    { key: 'S0201', title: '地震勘探', code: 'S0201', level: '二级', children: [
      { key: 'S0201000', title: '物化探服务', code: 'S0201000', level: '三级' },
      { key: 'S0201001', title: '二维地震采集服务', code: 'S0201001', level: '三级' },
      { key: 'S0201002', title: '三维地震采集服务', code: 'S0201002', level: '三级' },
    ]},
    { key: 'S0202', title: '地震资料处理', code: 'S0202', level: '二级', children: [
      { key: 'S0202001', title: '二维地震资料处理服务', code: 'S0202001', level: '三级' },
      { key: 'S0202002', title: '三维地震资料处理服务', code: 'S0202002', level: '三级' },
    ]},
  ]},
  { key: 'S03', title: '工序外协加工服务', code: 'S03', level: '一级', children: [
    { key: 'S0301', title: '加工服务', code: 'S0301', level: '二级', children: [
      { key: 'S0301000', title: '工序外协加工服务', code: 'S0301000', level: '三级' },
      { key: 'S0301001', title: '装配服务', code: 'S0301001', level: '三级' },
      { key: 'S0301002', title: '手工组装服务', code: 'S0301002', level: '三级' },
    ]},
  ]},
  { key: 'S05', title: '科技项目服务', code: 'S05', level: '一级', children: [
    { key: 'S0501', title: '科技服务', code: 'S0501', level: '二级', children: [
      { key: 'S0501000', title: '科技项目服务', code: 'S0501000', level: '三级' },
      { key: 'S0501001', title: '委托技术开发服务', code: 'S0501001', level: '三级' },
      { key: 'S0501002', title: '委托研发服务', code: 'S0501002', level: '三级' },
    ]},
  ]},
];

const generalTree: TreeNode[] = [
  { key: 'S04', title: '仓储服务', code: 'S04', level: '一级', children: [
    { key: 'S0401', title: '仓储服务', code: 'S0401', level: '二级', children: [
      { key: 'S0401000', title: '仓储服务', code: 'S0401000', level: '三级' },
      { key: 'S0401001', title: '仓储包装服务', code: 'S0401001', level: '三级' },
      { key: 'S0401002', title: '封装服务', code: 'S0401002', level: '三级' },
    ]},
  ]},
  { key: 'S06', title: '软件开发服务', code: 'S06', level: '一级', children: [
    { key: 'S0601', title: '软件开发', code: 'S0601', level: '二级', children: [
      { key: 'S0601000', title: '软件开发服务', code: 'S0601000', level: '三级' },
      { key: 'S0601001', title: '基础软件开发服务', code: 'S0601001', level: '三级' },
      { key: 'S0601002', title: '操作系统开发服务', code: 'S0601002', level: '三级' },
    ]},
  ]},
  { key: 'S07', title: '银行服务', code: 'S07', level: '一级', children: [
    { key: 'S0701', title: '银行服务', code: 'S0701', level: '二级', children: [
      { key: 'S0701000', title: '银行服务', code: 'S0701000', level: '三级' },
      { key: 'S0701001', title: '银行托管服务', code: 'S0701001', level: '三级' },
      { key: 'S0701002', title: '银行结算服务', code: 'S0701002', level: '三级' },
    ]},
  ]},
  { key: 'S10', title: '租赁服务', code: 'S10', level: '一级', children: [
    { key: 'S1001', title: '租赁服务', code: 'S1001', level: '二级', children: [
      { key: 'S1001000', title: '租赁服务', code: 'S1001000', level: '三级' },
      { key: 'S1001001', title: '油气水井设施租赁服务', code: 'S1001001', level: '三级' },
      { key: 'S1001002', title: '油气水集输处理设施租赁服务', code: 'S1001002', level: '三级' },
    ]},
  ]},
];

function TreeNodeItem({ node, checkedKeys, onCheck, expandedKeys, onToggle }: {
  node: TreeNode; checkedKeys: Set<string>; onCheck: (k: string) => void;
  expandedKeys: Set<string>; onToggle: (k: string) => void;
}) {
  const hasChildren = node.children && node.children.length > 0;
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 0', cursor: 'pointer' }}
        onClick={() => hasChildren ? onToggle(node.key) : onCheck(node.key)}>
        {hasChildren ? <span style={{ fontSize: 10, color: '#999', width: 12, textAlign: 'center' }}>{expandedKeys.has(node.key) ? '▼' : '▶'}</span> : <span style={{ width: 12 }} />}
        <input type="checkbox" checked={checkedKeys.has(node.key)} onChange={() => onCheck(node.key)} onClick={e => e.stopPropagation()} style={{ accentColor: '#ff4d4f' }} />
        <span style={{ fontSize: 13 }}>{node.title}</span>
        <span style={{ flex: 1 }} />
        <span style={{ fontSize: 12, color: '#999' }}>{node.level}</span>
        <span style={{ fontSize: 12, color: '#999', marginLeft: 8 }}>({node.code})</span>
      </div>
      {hasChildren && expandedKeys.has(node.key) && (
        <div style={{ paddingLeft: 24 }}>
          {node.children!.map(c => <TreeNodeItem key={c.key} node={c} checkedKeys={checkedKeys} onCheck={onCheck} expandedKeys={expandedKeys} onToggle={onToggle} />)}
        </div>
      )}
    </div>
  );
}

function ServiceCatalogModal({ open, onClose, onConfirm }: {
  open: boolean; onClose: () => void;
  onConfirm: (items: { code: string; name: string; type: '专业' | '通用'; level: string }[]) => void;
}) {
  const [activeTab, setActiveTab] = useState<'professional' | 'general'>('professional');
  const [checkedKeys, setCheckedKeys] = useState<Set<string>>(new Set());
  const [expandedKeys, setExpandedKeys] = useState<Set<string>>(new Set(['S01', 'S0101']));
  const [searchValue, setSearchValue] = useState('');
  const tree = activeTab === 'professional' ? professionalTree : generalTree;

  const handleCheck = (key: string) => {
    setCheckedKeys(prev => { const n = new Set(prev); if (n.has(key)) n.delete(key); else n.add(key); return n; });
  };
  const handleToggle = (key: string) => {
    setExpandedKeys(prev => { const n = new Set(prev); if (n.has(key)) n.delete(key); else n.add(key); return n; });
  };
  const handleConfirm = () => {
    const find = (nodes: TreeNode[]): { code: string; name: string; type: '专业' | '通用'; level: string }[] => {
      const r: { code: string; name: string; type: '专业' | '通用'; level: string }[] = [];
      for (const n of nodes) {
        if (checkedKeys.has(n.key)) r.push({ code: n.code, name: n.title, type: activeTab === 'professional' ? '专业' : '通用', level: n.level });
        if (n.children) r.push(...find(n.children));
      }
      return r;
    };
    onConfirm(find(tree));
    setCheckedKeys(new Set());
    onClose();
  };

  return (
    <Modal title="选择服务目录" open={open} onCancel={onClose} width={640} footer={
      <Space><AntButton onClick={onClose}>取消</AntButton><AntButton type="primary" danger onClick={handleConfirm}>确认选择</AntButton></Space>
    }>
      <div style={{ display: 'flex', gap: 0, borderBottom: '1px solid #f0f0f0', marginBottom: 16 }}>
        <div onClick={() => setActiveTab('professional')} style={{
          padding: '10px 16px', cursor: 'pointer', fontSize: 14,
          borderBottom: activeTab === 'professional' ? '2px solid #ff4d4f' : '2px solid transparent',
          color: activeTab === 'professional' ? '#ff4d4f' : '#666', fontWeight: activeTab === 'professional' ? 600 : 400,
        }}>
          专业目录 <span style={{ fontSize: 11, background: '#fff1f0', color: '#ff4d4f', padding: '0 4px', borderRadius: 3, marginLeft: 4 }}>需审查</span>
        </div>
        <div onClick={() => setActiveTab('general')} style={{
          padding: '10px 16px', cursor: 'pointer', fontSize: 14,
          borderBottom: activeTab === 'general' ? '2px solid #ff4d4f' : '2px solid transparent',
          color: activeTab === 'general' ? '#ff4d4f' : '#666', fontWeight: activeTab === 'general' ? 600 : 400,
        }}>
          通用目录
        </div>
      </div>
      <div style={{ marginBottom: 12 }}>
        <Typography.Text strong style={{ fontSize: 13 }}>
          {activeTab === 'professional' ? '📁 专业目录分类' : '📁 通用目录分类'}
        </Typography.Text>
        {activeTab === 'professional' && <Typography.Text style={{ fontSize: 12, color: '#ff4d4f', marginLeft: 8 }}>需资格审查</Typography.Text>}
      </div>
      <Input placeholder="输入关键字进行过滤" prefix="🔍" allowClear value={searchValue} onChange={e => setSearchValue(e.target.value)} style={{ marginBottom: 12 }} />
      <div style={{ fontSize: 12, color: '#999', marginBottom: 8 }}>已选中 {checkedKeys.size}</div>
      <div style={{ maxHeight: 400, overflowY: 'auto', border: '1px solid #f0f0f0', borderRadius: 4, padding: '0 12px' }}>
        {tree.map(n => <TreeNodeItem key={n.key} node={n} checkedKeys={checkedKeys} onCheck={handleCheck} expandedKeys={expandedKeys} onToggle={handleToggle} />)}
      </div>
    </Modal>
  );
}

/* 注册时已提交的服务品类及填写内容（回显用） */
const registeredServices = [
  { id: 1, code: 'S0101000', name: '咨询服务', type: '专业' as const, level: '一级', expanded: false,
    qualLevel: '甲级', qualCertNo: 'GC-S0101000-2024-001', creditRating: 'AAA', qualFile: '咨询服务资质证书.pdf',
    qualAttach: { '咨询服务资质证书': '咨询资质证书_扫描件.pdf', '专业人员执业资格证明': '执业资格证明_合集.pdf' },
    equipment: '拥有行业咨询专家团队及专业分析软件平台，配备技术工作站50台套',
    advantage: '具有中国工程咨询甲级资信，核心团队长期服务油气行业',
  },
  { id: 2, code: 'S0401000', name: '仓储服务', type: '通用' as const, level: '二级', expanded: false,
    qualLevel: '', qualCertNo: '', creditRating: '', qualFile: '',
    qualAttach: {},
    equipment: '',
    advantage: '',
  },
];

function ServiceCatalogTab({ readonly = false }: { readonly?: boolean }) {
  const [services, setServices] = useState<ServiceItem[]>(
    readonly
      ? registeredServices.map(s => ({ id: s.id, code: s.code, name: s.name, type: s.type, level: s.level, expanded: false }))
      : [
          { id: 1, code: 'S0101000', name: '咨询服务', type: '专业', level: '一级', expanded: false },
          { id: 2, code: 'S0401000', name: '仓储服务', type: '通用', level: '二级', expanded: false },
        ]
  );
  const [modalOpen, setModalOpen] = useState(false);

  const removeService = (id: number) => setServices(prev => prev.filter(s => s.id !== id));
  const toggleExpand = (id: number) => setServices(prev => prev.map(s => s.id === id ? { ...s, expanded: !s.expanded } : s));
  const handleAddServices = (items: { code: string; name: string; type: '专业' | '通用'; level: string }[]) => {
    setServices(prev => [...prev, ...items.map(item => ({
      id: Date.now() + Math.random(), code: item.code + '0', name: item.name, type: item.type, level: item.level, expanded: false,
    }))]);
  };

  return (
    <>
      {!readonly && (
        <div style={{ background: '#fffbe6', border: '1px solid #ffe58f', borderRadius: 4, padding: '10px 16px', marginBottom: 16, fontSize: 13, color: '#ad6800', display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 16 }}>⚠️</span>
          选择专业目录下需要进行专业资格审查，请按要求填写服务品类的资质信用、服务能力
        </div>
      )}

      <Card variant="outlined" size="small" title={<span style={{ fontSize: 14 }}>☑ 已添加的服务目录</span>}
        extra={!readonly ? <AntButton type="primary" danger icon={<PlusOutlined />} onClick={() => setModalOpen(true)}>添加服务品类</AntButton> : null}
        style={{ marginBottom: 16 }}>
        <Table
          rowSelection={readonly ? undefined : { type: 'checkbox' }}
          columns={[
            { title: '服务品类码', dataIndex: 'code', key: 'code', width: 130 },
            { title: '服务品类名称', dataIndex: 'name', key: 'name' },
            { title: '品类类型', dataIndex: 'type', key: 'type', width: 100, align: 'center',
              render: (text: string) => <span style={{ display: 'inline-block', padding: '0 8px', borderRadius: 4, fontSize: 12, background: text === '专业' ? '#fff1f0' : '#e6f7ff', color: text === '专业' ? '#ff4d4f' : '#ff4d4f', border: `1px solid ${text === '专业' ? '#ffa39e' : '#91d5ff'}` }}>{text}</span> },
            { title: '品类等级', dataIndex: 'level', key: 'level', width: 90, align: 'center' },
            { title: '操作', key: 'action', width: 130, align: 'center',
              render: (_: unknown, record: ServiceItem) => (
                <Space size={8}>
                  <Typography.Link style={{ fontSize: 13 }} onClick={() => toggleExpand(record.id)}>{record.expanded ? '合并' : readonly ? '查看' : '编辑'}</Typography.Link>
                  {!readonly && <Typography.Link style={{ fontSize: 13, color: '#ff4d4f' }} onClick={() => removeService(record.id)}>删除</Typography.Link>}
                </Space>
              ),
            },
          ]}
          dataSource={services} rowKey="id" pagination={false} bordered size="middle"
        />
      </Card>

      {services.filter(s => s.expanded).map(svc => {
        const reg = registeredServices.find(r => r.id === svc.id);
        const ro = readonly || !reg;
        return (
          <div key={svc.id} style={{ marginBottom: 16 }}>
            <Card variant="outlined" size="small" style={{ marginBottom: 16 }}>
              {getCategoryInstructions(svc.code) && (
                <div style={{ marginBottom: 16 }}>
                  <div style={{ background: '#fffbe6', border: '1px solid #ffe58f', borderRadius: 4, padding: '12px 16px' }}>
                    <Typography.Text strong style={{ fontSize: 13, display: 'block', marginBottom: 8, color: '#ad6800' }}>📋 填报须知</Typography.Text>
                    <Typography.Text style={{ fontSize: 13, whiteSpace: 'pre-wrap', lineHeight: 1.8 }}>
                      {getCategoryInstructions(svc.code)}
                    </Typography.Text>
                  </div>
                </div>
              )}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                <Typography.Text strong style={{ fontSize: 14 }}>资质信用</Typography.Text>
                <span style={{ background: '#fff1f0', color: '#ff4d4f', fontSize: 11, padding: '0 6px', borderRadius: 3, border: '1px solid #ffa39e' }}>必填</span>
              </div>
              <Row gutter={24}>
                <Col span={12}>
                  <div style={{ marginBottom: 16 }}>
                    <Typography.Text style={{ fontSize: 13, display: 'block', marginBottom: 6 }}>资质等级 <span style={{ color: '#ff4d4f' }}>*</span></Typography.Text>
                    <Select placeholder="请选择资质等级" style={{ width: '100%' }} disabled={readonly} value={reg?.qualLevel || undefined}>
                      <Select.Option value="a">甲级</Select.Option>
                      <Select.Option value="b">乙级</Select.Option>
                      <Select.Option value="c">丙级</Select.Option>
                    </Select>
                  </div>
                </Col>
                <Col span={12}>
                  <div style={{ marginBottom: 16 }}>
                    <Typography.Text style={{ fontSize: 13, display: 'block', marginBottom: 6 }}>资质证书编号 <span style={{ color: '#ff4d4f' }}>*</span></Typography.Text>
                    <Input placeholder="请输入资质证书编号" disabled={readonly} defaultValue={reg?.qualCertNo} />
                  </div>
                </Col>
                <Col span={12}>
                  <div style={{ marginBottom: 16 }}>
                    <Typography.Text style={{ fontSize: 13, display: 'block', marginBottom: 6 }}>信用评级</Typography.Text>
                    <Select placeholder="请选择信用评级" style={{ width: '100%' }} disabled={readonly} value={reg?.creditRating || undefined}>
                      <Select.Option value="aaa">AAA</Select.Option>
                      <Select.Option value="aa">AA</Select.Option>
                      <Select.Option value="a">A</Select.Option>
                      <Select.Option value="bbb">BBB</Select.Option>
                    </Select>
                  </div>
                </Col>
                <Col span={12}>
                  <div style={{ marginBottom: 16 }}>
                    <Typography.Text style={{ fontSize: 13, display: 'block', marginBottom: 6 }}>资质证明文件</Typography.Text>
                    {readonly && reg?.qualFile ? (
                      <Space><span style={{ fontSize: 14 }}>📄</span><Typography.Text style={{ fontSize: 13 }}>{reg.qualFile}</Typography.Text></Space>
                    ) : (
                      <Upload beforeUpload={() => false} disabled={readonly}><AntButton icon={<UploadOutlined />} disabled={readonly}>上传文件</AntButton></Upload>
                    )}
                  </div>
                </Col>
              </Row>
            </Card>

            {ro && reg ? (
              <Card variant="outlined" size="small" style={{ marginBottom: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                  <Typography.Text strong style={{ fontSize: 14 }}>资质附件</Typography.Text>
                  <span style={{ background: '#e6f7ff', color: '#1677ff', fontSize: 11, padding: '0 6px', borderRadius: 3, border: '1px solid #91d5ff' }}>按专业目录配置</span>
                </div>
                {Object.keys(reg.qualAttach).length === 0 ? (
                  <Typography.Text type="secondary" style={{ fontSize: 13 }}>该品类（{svc.name}）为通用目录，无需上传资质附件。</Typography.Text>
                ) : (
                  Object.entries(reg.qualAttach).map(([name, file]) => (
                    <div key={name} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 0', borderBottom: '1px solid #f5f5f5' }}>
                      <Typography.Text style={{ fontSize: 13, width: 260 }}>{name}</Typography.Text>
                      <span style={{ fontSize: 14 }}>📄</span>
                      <Typography.Text style={{ fontSize: 13 }}>{file}</Typography.Text>
                      <Typography.Link style={{ fontSize: 12 }}>预览</Typography.Link>
                    </div>
                  ))
                )}
              </Card>
            ) : (
              <QualAttachCard categoryCode={svc.code} categoryName={svc.name} />
            )}

            <Card variant="outlined" size="small">
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                <Typography.Text strong style={{ fontSize: 14 }}>服务能力</Typography.Text>
                <span style={{ background: '#fff1f0', color: '#ff4d4f', fontSize: 11, padding: '0 6px', borderRadius: 3, border: '1px solid #ffa39e' }}>必填</span>
              </div>
              <div style={{ marginBottom: 16 }}>
                <Typography.Text style={{ fontSize: 13, display: 'block', marginBottom: 6 }}>主要设备/装备情况 <span style={{ color: '#ff4d4f' }}>*</span></Typography.Text>
                <Input.TextArea rows={3} placeholder="请描述拥有的主要设备、仪器等硬件条件" disabled={readonly} defaultValue={reg?.equipment} />
              </div>
              <div>
                <Typography.Text style={{ fontSize: 13, display: 'block', marginBottom: 6 }}>技术优势及特色 <span style={{ color: '#ff4d4f' }}>*</span></Typography.Text>
                <Input.TextArea rows={3} placeholder="请描述核心技术能力、专利技术、工艺特色等" disabled={readonly} defaultValue={reg?.advantage} />
              </div>
            </Card>
          </div>
        );
      })}

      <ServiceCatalogModal open={modalOpen} onClose={() => setModalOpen(false)} onConfirm={handleAddServices} />
    </>
  );
}

/* ════════════════════════════════════════════════════════════════
   Tab 3：资质信息（readonly 时回显已上传文件）
   ════════════════════════════════════════════════════════════════ */
interface FileRow {
  id: number;
  type: string;
  required: boolean;
  fileName?: string;
  remark?: string;
  startDate?: string;
  endDate?: string;
  permanent: boolean;
  custom?: boolean;
}

function QualificationTab({ readonly = false }: { readonly?: boolean }) {
  const [files, setFiles] = useState<FileRow[]>([
    { id: 1, type: '营业执照', required: true, permanent: false, fileName: readonly ? '营业执照_扫描件.pdf' : undefined },
    { id: 2, type: '专业资质证书', required: true, permanent: false, fileName: readonly ? '专业资质证书.pdf' : undefined },
    { id: 3, type: '财务审计报告／银行资信证明', required: true, permanent: false, fileName: readonly ? '2025年审计报告.pdf' : undefined },
    { id: 4, type: 'QHSE/ESG 无重大事故事件承诺', required: true, permanent: false },
    { id: 5, type: '无重大违法违规承诺', required: true, permanent: false },
    { id: 6, type: '信用信息合规（4大平台无黑名单）', required: true, permanent: false },
    { id: 7, type: 'ISO 9001 质量管理体系认证证书', required: false, fileName: readonly ? 'ISO9001_cert.pdf' : undefined, remark: readonly ? '' : '自定义附件', startDate: '2024-01-01', endDate: '2027-01-01', permanent: false, custom: true },
  ]);

  const updateFile = (id: number, patch: Partial<FileRow>) => {
    setFiles(prev => prev.map(f => f.id === id ? { ...f, ...patch } : f));
  };

  const addCustomFile = () => {
    setFiles(prev => [...prev, { id: Date.now(), type: '', required: false, permanent: false, custom: true }]);
  };

  const columns = [
    {
      title: '文件类型', dataIndex: 'type', key: 'type', width: 240,
      render: (text: string, record: FileRow) => (
        <Typography.Text style={{ fontSize: 13 }}>
          {record.required && <span style={{ color: '#ff4d4f', marginRight: 4 }}>*</span>}
          {record.custom ? (
            <Input size="small" value={text} onChange={e => updateFile(record.id, { type: e.target.value })} placeholder="请输入文件类型" style={{ width: 200 }} disabled={readonly} />
          ) : text}
        </Typography.Text>
      ),
    },
    {
      title: '文件上传', dataIndex: 'fileName', key: 'fileName', width: 220,
      render: (text: string, record: FileRow) => {
        if (text) {
          return (
            <div>
              <Typography.Text style={{ fontSize: 13 }}>{text}</Typography.Text>
              <div style={{ marginTop: 4 }}>
                <Typography.Link style={{ fontSize: 12 }}>预览</Typography.Link>
                {!readonly && (
                  <>
                    <Typography.Link style={{ fontSize: 12, marginLeft: 8 }}>替换</Typography.Link>
                    <Typography.Link style={{ fontSize: 12, marginLeft: 8, color: '#ff4d4f' }} onClick={() => updateFile(record.id, { fileName: undefined })}>删除</Typography.Link>
                  </>
                )}
              </div>
            </div>
          );
        }
        return <Upload beforeUpload={() => false} showUploadList={false} disabled={readonly}><AntButton icon={<UploadOutlined />} size="small" disabled={readonly}>上传文件</AntButton></Upload>;
      },
    },
    {
      title: '备注', dataIndex: 'remark', key: 'remark', width: 160,
      render: (text: string, record: FileRow) => (
        <Input size="small" value={text || ''} onChange={e => updateFile(record.id, { remark: e.target.value })} placeholder="备注" disabled={readonly} />
      ),
    },
    {
      title: '有效时间', key: 'validTime', width: 300,
      render: (_: unknown, record: FileRow) => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, flexWrap: 'wrap' }}>
            <Input size="small" value={record.startDate || ''} onChange={e => updateFile(record.id, { startDate: e.target.value })} placeholder="年/月/日" style={{ width: 110 }} disabled={readonly || record.permanent} />
            <Typography.Text type="secondary" style={{ fontSize: 12 }}>至</Typography.Text>
            <Input size="small" value={record.endDate || ''} onChange={e => updateFile(record.id, { endDate: e.target.value })} placeholder="年/月/日" style={{ width: 110 }} disabled={readonly || record.permanent} />
          </div>
          <label style={{ fontSize: 12, display: 'flex', alignItems: 'center', gap: 4, cursor: readonly ? 'default' : 'pointer' }}>
            <input type="checkbox" checked={record.permanent} onChange={e => updateFile(record.id, { permanent: e.target.checked, startDate: '', endDate: '' })} style={{ accentColor: '#ff4d4f' }} disabled={readonly} />
            永久有效
          </label>
        </div>
      ),
    },
  ];

  return (
    <Card variant="outlined" size="small" style={{ marginBottom: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
        <span style={{ fontSize: 16 }}>📋</span>
        <Typography.Text strong style={{ fontSize: 14 }}>资质文件上传</Typography.Text>
      </div>
      <Table columns={columns} dataSource={files} rowKey="id" pagination={false} bordered size="middle" />
      {!readonly && (
        <div style={{ marginTop: 12 }}>
          <AntButton type="dashed" icon={<PlusOutlined />} onClick={addCustomFile}>添加自定义附件</AntButton>
        </div>
      )}
    </Card>
  );
}

/* ════════════════════════════════════════════════════════════════
   Tab 4：补充资料填写（按使用单位通知模板渲染）
   ════════════════════════════════════════════════════════════════ */
interface SupplementItem {
  id: number;
  name: string;
  description: string;
  type: 'upload' | 'text';
  status: 'pending' | 'done';
  fileName?: string;
  content?: string;
}

function SupplementTab({ notice, readonly = false }: { notice: AdmissionNotice; readonly?: boolean }) {
  const [items, setItems] = useState<SupplementItem[]>(() =>
    notice.items.map((item, idx) => ({
      id: idx + 1,
      name: item.name,
      description: item.description,
      type: item.type,
      status: (notice.status === 'confirmed' || notice.status === 'submitted') ? 'done' as const : 'pending' as const,
      fileName: notice.status !== 'pending' && item.type === 'upload' ? `${item.name}_已上传.pdf` : undefined,
      content: notice.status !== 'pending' && item.type === 'text' ? '已填写补充内容，详见提交记录。' : undefined,
    }))
  );

  const updateItem = (id: number, patch: Partial<SupplementItem>) => {
    setItems(prev => prev.map(item => item.id === id ? { ...item, ...patch } : item));
  };

  return (
    <>
      <div style={{ background: '#e6f7ff', border: '1px solid #91d5ff', borderRadius: 4, padding: '10px 16px', marginBottom: 16, fontSize: 13, color: '#0050b3', display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 16 }}>ℹ️</span>
        以下为 {notice.unitName} 发送的「{notice.templateName}」配置的补充资料内容，请按要求完成补充资料的填写或上传。
      </div>

      {items.map(item => (
        <Card key={item.id} variant="outlined" size="small" style={{ marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Typography.Text strong style={{ fontSize: 14 }}>{item.name}</Typography.Text>
              <Tag color={item.status === 'done' ? 'success' : 'warning'}>
                {item.status === 'done' ? '已补充' : '待补充'}
              </Tag>
            </div>
            <Typography.Text type="secondary" style={{ fontSize: 12 }}>类型：{item.type === 'upload' ? '文件上传' : '文本填写'}</Typography.Text>
          </div>
          <Typography.Text type="secondary" style={{ display: 'block', marginBottom: 12, fontSize: 13 }}>
            {item.description}
          </Typography.Text>

          {item.type === 'upload' ? (
            <div>
              {item.fileName ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 14 }}>📄</span>
                  <Typography.Text style={{ fontSize: 13 }}>{item.fileName}</Typography.Text>
                  {!readonly && (
                    <>
                      <Typography.Link style={{ fontSize: 12 }} onClick={() => updateItem(item.id, { fileName: undefined, status: 'pending' })}>替换</Typography.Link>
                      <Typography.Link style={{ fontSize: 12, color: '#ff4d4f' }} onClick={() => updateItem(item.id, { fileName: undefined, status: 'pending' })}>删除</Typography.Link>
                    </>
                  )}
                </div>
              ) : (
                <Upload beforeUpload={() => false} disabled={readonly} onChange={() => updateItem(item.id, { fileName: '已上传文件.pdf', status: 'done' })}>
                  <AntButton icon={<UploadOutlined />} size="small" disabled={readonly}>上传文件</AntButton>
                </Upload>
              )}
            </div>
          ) : (
            <Input.TextArea
              rows={3}
              value={item.content || ''}
              onChange={e => updateItem(item.id, { content: e.target.value, status: e.target.value ? 'done' : 'pending' })}
              placeholder="请输入补充资料内容"
              disabled={readonly}
            />
          )}
        </Card>
      ))}
    </>
  );
}

/* ════════════════════════════════════════════════════════════════
   第一级：补充资料通知列表
   ════════════════════════════════════════════════════════════════ */
const STATUS_TAG: Record<string, { color: string; label: string }> = {
  pending: { color: 'warning', label: '待补充' },
  submitted: { color: 'processing', label: '已提交' },
  confirmed: { color: 'success', label: '已确认' },
};

const MDG_TAG: Record<string, { color: string; label: string }> = {
  none: { color: 'default', label: '未推送' },
  inprogress: { color: 'processing', label: 'MDG推送中' },
  coded: { color: 'success', label: '已配码' },
};

function NoticeList({ onEnter }: { onEnter: (notice: AdmissionNotice) => void }) {
  const { token: t } = theme.useToken();
  const inProgressCount = noticeList.filter(n => n.mdgStatus === 'inprogress').length;

  return (
    <>
      {/* 概览卡 */}
      <Card variant="outlined" size="small" style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap' }}>
          <div>
            <Typography.Text type="secondary" style={{ fontSize: 12, display: 'block' }}>服务商名称</Typography.Text>
            <Typography.Text style={{ fontSize: 14 }}>中海油能源发展股份有限公司</Typography.Text>
          </div>
          <div>
            <Typography.Text type="secondary" style={{ fontSize: 12, display: 'block' }}>服务商编码</Typography.Text>
            <Typography.Text style={{ fontSize: 14 }}>100001231</Typography.Text>
          </div>
          <div>
            <Typography.Text type="secondary" style={{ fontSize: 12, display: 'block' }}>准入状态</Typography.Text>
            <Tag color="processing" style={{ marginTop: 2 }}>注册成功，待配码</Tag>
          </div>
          <div>
            <Typography.Text type="secondary" style={{ fontSize: 12, display: 'block' }}>配码状态</Typography.Text>
            {inProgressCount > 0 ? (
              <Tag color="processing" style={{ marginTop: 2 }}>MDG推送中（{inProgressCount} 家在途）</Tag>
            ) : (
              <Tag color="warning" style={{ marginTop: 2 }}>未配码，暂不可交易</Tag>
            )}
          </div>
        </div>
        <div style={{ marginTop: 12, padding: '8px 12px', borderRadius: 4, background: '#fffbe6', border: '1px solid #ffe58f', fontSize: 13, color: '#ad6800' }}>
          ⚠️ 补充资料通知由各使用单位分别发送，各使用单位要求可能不同；未配码的服务商暂不可交易，配码后方可使用。
        </div>
      </Card>

      {/* 通知列表 */}
      <Card variant="outlined" size="small" title={<span style={{ fontSize: 14 }}>📬 补充资料通知列表</span>}>
        <Table
          columns={[
            { title: '序号', dataIndex: 'id', key: 'id', width: 60, align: 'center' },
            { title: '使用单位', dataIndex: 'unitName', key: 'unitName', width: 180 },
            { title: '通知模板', dataIndex: 'templateName', key: 'templateName', width: 180 },
            { title: '资料项数', dataIndex: 'itemCount', key: 'itemCount', width: 90, align: 'center', render: (v: number) => `${v} 项` },
            { title: '通知时间', dataIndex: 'noticeTime', key: 'noticeTime', width: 150 },
            { title: '截止时间', dataIndex: 'deadline', key: 'deadline', width: 150 },
            {
              title: '补充状态', dataIndex: 'status', key: 'status', width: 90, align: 'center',
              render: (v: string) => <Tag color={STATUS_TAG[v].color}>{STATUS_TAG[v].label}</Tag>,
            },
            {
              title: 'MDG状态', dataIndex: 'mdgStatus', key: 'mdgStatus', width: 110, align: 'center',
              render: (v: string, record: AdmissionNotice) => (
                <Tag color={MDG_TAG[v].color}>
                  {MDG_TAG[v].label}{v === 'coded' && record.mdgCode ? `（${record.mdgCode}）` : ''}
                </Tag>
              ),
            },
            {
              title: '操作', key: 'action', width: 120, align: 'center',
              render: (_: unknown, record: AdmissionNotice) => (
                <Space size={8}>
                  <Typography.Link style={{ fontSize: 13, color: '#ff4d4f' }} onClick={() => onEnter(record)}>
                    {record.status === 'pending' ? '补充' : '查看'}
                  </Typography.Link>
                </Space>
              ),
            },
          ]}
          dataSource={noticeList}
          rowKey="id"
          pagination={false}
          bordered
          size="middle"
          locale={{ emptyText: <Empty description="当前暂无使用单位发来补充资料通知" /> }}
        />
      </Card>
    </>
  );
}

/* ════════════════════════════════════════════════════════════════
   主页面：列表 → 详情
   ════════════════════════════════════════════════════════════════ */
export default function Admission() {
  const { token: t } = theme.useToken();
  const [currentNotice, setCurrentNotice] = useState<AdmissionNotice | null>(null);
  const [activeTab, setActiveTab] = useState('basic');
  const [submitting, setSubmitting] = useState(false);

  const readonly = currentNotice ? currentNotice.status !== 'pending' : false;

  const handleBack = () => {
    setCurrentNotice(null);
    setActiveTab('basic');
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    message.success(`补充资料已提交至${currentNotice?.unitName}`);
    setSubmitting(false);
    handleBack();
  };

  /* ─── 详情视图 ─── */
  if (currentNotice) {
    return (
      <div>
        <Typography.Link onClick={handleBack} style={{ color: '#ff4d4f', fontSize: 13, display: 'block', marginBottom: 8 }}>
          ← 返回通知列表
        </Typography.Link>
        <Typography.Title level={4} style={{ marginTop: 0, marginBottom: 4 }}>服务商准入资料</Typography.Title>
        <Typography.Text type="secondary" style={{ display: 'block', marginBottom: 16 }}>
          来自 {currentNotice.unitName} 的补充资料通知：{currentNotice.templateName}（通知时间 {currentNotice.noticeTime}，截止 {currentNotice.deadline}）
        </Typography.Text>

        <Card variant="outlined" size="small" style={{ marginBottom: 16 }}>
          <Space size={32} wrap>
            <Space size={8}>
              <FileTextOutlined style={{ color: '#ff4d4f' }} />
              <Typography.Text strong style={{ fontSize: 14 }}>{currentNotice.unitName}</Typography.Text>
            </Space>
            <Typography.Text type="secondary" style={{ fontSize: 13 }}>通知模板：{currentNotice.templateName}</Typography.Text>
            <Typography.Text type="secondary" style={{ fontSize: 13 }}>资料项数：{currentNotice.itemCount} 项</Typography.Text>
            <Typography.Text type="secondary" style={{ fontSize: 13 }}>截止时间：{currentNotice.deadline}</Typography.Text>
            <Tag color={STATUS_TAG[currentNotice.status].color}>{STATUS_TAG[currentNotice.status].label}</Tag>
          </Space>
        </Card>

        <Tabs
          items={[
            { key: 'basic', label: '基本信息' },
            { key: 'catalog', label: '服务目录' },
            { key: 'qual', label: '资质信息' },
            { key: 'supplement', label: '补充资料填写' },
          ]}
          activeKey={activeTab}
          onChange={setActiveTab}
          style={{ marginBottom: 16 }}
        />

        {activeTab === 'basic' && <BasicInfoTab readonly />}
        {activeTab === 'catalog' && <ServiceCatalogTab readonly />}
        {activeTab === 'qual' && <QualificationTab readonly />}
        {activeTab === 'supplement' && <SupplementTab notice={currentNotice} readonly={readonly} />}

        {currentNotice.status === 'pending' && (
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 24, gap: 12 }}>
            <AntButton onClick={handleBack}>取消</AntButton>
            <AntButton type="primary" loading={submitting} onClick={handleSubmit}>提交补充资料</AntButton>
          </div>
        )}
        {currentNotice.status !== 'pending' && (
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 24 }}>
            <AntButton type="primary" onClick={handleBack}>返回列表</AntButton>
          </div>
        )}
      </div>
    );
  }

  /* ─── 列表视图 ─── */
  return (
    <div>
      <Typography.Title level={4} style={{ marginTop: 0, marginBottom: 4 }}>服务商准入资料</Typography.Title>
      <Typography.Text type="secondary" style={{ display: 'block', marginBottom: 20 }}>
        查看各使用单位发送的补充资料通知，点击"补充"进入填写；各使用单位要求可能不同，请分别按通知要求完成。
      </Typography.Text>

      <NoticeList onEnter={setCurrentNotice} />
    </div>
  );
}
