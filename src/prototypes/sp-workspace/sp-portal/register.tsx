/**
 * @name 注册服务商
 */
import { useState, useCallback } from 'react';
import {
  theme, Steps, Card, Form, Input, Select, Radio, Row, Col, Typography,
  message, Button as AntButton, Space, Upload, DatePicker, Checkbox, Divider, Modal, Table,
} from 'antd';
import { UploadOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import type { UploadFile } from 'antd';

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

/* ─── 步骤 1：基本信息 ─── */
function StepBasicInfo({ form }: { form: any }) {
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  return (
    <>
      {/* 基础信息 */}
      <Card variant="outlined" size="small" style={{ marginBottom: 16 }}>
        <SectionTitle icon="📋" title="基础信息" />
        <Form layout="vertical" form={form}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="服务商名称" name="companyName">
                <Input placeholder="请输入服务商全称" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="注册资本" name="registeredCapital">
                <Input suffix={<Typography.Text type="secondary">单位：万元</Typography.Text>} placeholder="请输入注册资本" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="统一社会信用代码" name="creditCode">
                <Input placeholder="18位统一社会信用代码" maxLength={18} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="成立日期" name="establishDate">
                <DatePicker style={{ width: '100%' }} placeholder="请选择日期" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>

      {/* 管理信息 */}
      <Card variant="outlined" size="small" style={{ marginBottom: 16 }}>
        <SectionTitle icon="🏢" title="管理信息" />
        <Form layout="vertical" form={form}>
          <Form.Item label="是否内部服务商" name="isInternal">
            <Radio.Group>
              <Radio value="external">外部服务商</Radio>
              <Radio value="internal">中国石油集团全资或控股子公司</Radio>
            </Radio.Group>
          </Form.Item>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="权属关系证明" name="ownershipProof">
                <Upload
                  fileList={fileList}
                  onChange={({ fileList }) => setFileList(fileList)}
                  beforeUpload={() => false}
                >
                  <AntButton icon={<UploadOutlined />}>上传文件</AntButton>
                </Upload>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="内部组织" name="internalOrg">
                <Select placeholder="请选择内部组织">
                  <Select.Option value="cnpc">中国石油集团</Select.Option>
                  <Select.Option value="sub">子公司</Select.Option>
                  <Select.Option value="branch">分公司</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>

      {/* 联系人信息 */}
      <Card variant="outlined" size="small" style={{ marginBottom: 16 }}>
        <SectionTitle icon="👤" title="联系人信息" />
        <Form layout="vertical" form={form}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="联系人姓名" name="contactName">
                <Input placeholder="请输入联系人姓名" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="联系人手机号" name="contactPhone">
                <Input placeholder="请输入11位手机号" maxLength={11} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="联系人固定电话" name="contactTel">
                <Input placeholder="区号-号码，如 010-88888888" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="联系人邮箱" name="contactEmail">
                <Input placeholder="请输入邮箱地址" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>

      {/* 公司情况 */}
      <Card variant="outlined" size="small" style={{ marginBottom: 16 }}>
        <SectionTitle icon="🏛️" title="公司情况" />
        <Form layout="vertical" form={form}>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item label="法定代表人姓名" name="legalPerson">
                <Input placeholder="请输入法定代表人姓名" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="币种" name="currency" initialValue="CNY">
                <Select>
                  <Select.Option value="CNY">人民币（CNY）</Select.Option>
                  <Select.Option value="USD">美元（USD）</Select.Option>
                  <Select.Option value="EUR">欧元（EUR）</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="企业规模" name="companyScale">
                <Select placeholder="请选择">
                  <Select.Option value="large">大型企业</Select.Option>
                  <Select.Option value="medium">中型企业</Select.Option>
                  <Select.Option value="small">小型企业</Select.Option>
                  <Select.Option value="micro">微型企业</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="开户银行" name="bankName">
                <Input placeholder="请输入开户银行名称" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="银行信用等级" name="bankCredit">
                <Select placeholder="请选择">
                  <Select.Option value="aaa">AAA</Select.Option>
                  <Select.Option value="aa">AA</Select.Option>
                  <Select.Option value="a">A</Select.Option>
                  <Select.Option value="bbb">BBB</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="公司网址" name="website">
                <Input placeholder="https://" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="注册资本" name="regCapital">
                <Input suffix={<Typography.Text type="secondary">单位：万元</Typography.Text>} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="成立日期" name="regDate">
                <DatePicker style={{ width: '100%' }} placeholder="请选择日期" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="银行账号" name="bankAccount">
                <Input placeholder="请输入银行账号" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="开户银行账号" name="bankAccNo">
                <Input placeholder="请输入开户银行账号" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="公司电话" name="companyTel">
                <Input placeholder="区号-号码" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>

      {/* 详细信息 */}
      <Card variant="outlined" size="small" style={{ marginBottom: 16 }}>
        <SectionTitle icon="📍" title="详细信息" />
        <Form layout="vertical" form={form}>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item label="国家" name="country" initialValue="中国">
                <Select>
                  <Select.Option value="中国">中国</Select.Option>
                  <Select.Option value="美国">美国</Select.Option>
                  <Select.Option value="日本">日本</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="省/直辖市" name="province">
                <Select placeholder="请选择">
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
                <Input placeholder="请输入城市" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="通讯地址" name="mailAddress">
                <Input placeholder="请输入详细通讯地址" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="注册地址" name="regAddress">
                <Input placeholder="请输入企业注册地址" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="邮编" name="zipCode">
                <Input placeholder="6位邮政编码" maxLength={6} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="经营范围" name="businessScope">
                <Input.TextArea rows={3} placeholder="请输入营业执照上的经营范围内内容" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>

      {/* 人员情况 */}
      <Card variant="outlined" size="small" style={{ marginBottom: 16 }}>
        <SectionTitle icon="👥" title="人员情况" tag="必填" />
        <Form layout="vertical" form={form}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="服务队伍人数" name="serviceTeamSize">
                <Input placeholder="请输入服务队伍总人数" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="技术人员数量" name="techStaffCount">
                <Input placeholder="请输入技术人员数量" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="人员资质情况" name="staffQualification">
                <Input.TextArea rows={3} placeholder="请描述主要人员的资质证书、执业资格等情况" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>

      {/* 经营情况 */}
      <Card variant="outlined" size="small" style={{ marginBottom: 16 }}>
        <SectionTitle icon="📊" title="经营情况" tag="必填" />
        <Form layout="vertical" form={form}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="近三年营业收入（万元）" name="revenue">
                <Input.TextArea rows={2} placeholder="如：2022年200万元；2023年500万元；2024年800万元" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="近三年净利润（万元）" name="profit">
                <Input.TextArea rows={2} placeholder="如：2022年20万元；2023年80万元；2024年100万元" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="主要业务范围" name="mainBusiness">
                <Input.TextArea rows={3} placeholder="请描述主营业务范围及核心竞争优势" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>

      {/* 服务业绩 */}
      <Card variant="outlined" size="small" style={{ marginBottom: 16 }}>
        <SectionTitle icon="🏆" title="服务业绩" tag="必填" />
        <Form layout="vertical" form={form}>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item label="主要项目业绩" name="projectExperience">
                <Input.TextArea rows={4} placeholder="请列举近三年的主要服务项目名称、甲方单位、项目金额等" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="与中国石油合作经历" name="cnpcExperience">
                <Input.TextArea rows={3} placeholder="请描述与中国石油集团及其下属单位的合作历史" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>

      {/* QHSE管理 */}
      <Card variant="outlined" size="small" style={{ marginBottom: 16 }}>
        <SectionTitle icon="🛡️" title="QHSE管理" tag="必填" />
        <Form layout="vertical" form={form}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="质量管理体系认证" name="qualityCert">
                <Select placeholder="请选择">
                  <Select.Option value="iso9001">ISO 9001</Select.Option>
                  <Select.Option value="other">其他</Select.Option>
                  <Select.Option value="none">无</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="HSE管理体系" name="hseSystem">
                <Select placeholder="请选择">
                  <Select.Option value="iso14001">ISO 14001</Select.Option>
                  <Select.Option value="ohsas18001">OHSAS 18001</Select.Option>
                  <Select.Option value="other">其他</Select.Option>
                  <Select.Option value="none">无</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="安全生产记录" name="safetyRecord">
                <Input.TextArea rows={3} placeholder="请描述近三年安全生产情况，是否有重大安全事故" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="needOnsiteAudit" valuePropName="checked">
                <Checkbox>需要现场审核（根据服务类别及风险评估结果，必要时安排现场审核）</Checkbox>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>

      {/* ESG管理 */}
      <Card variant="outlined" size="small" style={{ marginBottom: 16 }}>
        <SectionTitle icon="🌱" title="ESG管理" tag="选填" />
        <Form layout="vertical" form={form}>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item label="环境管理措施" name="envMeasures">
                <Input.TextArea rows={3} placeholder="请描述企业在环境保护方面采取的主要措施" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="社会责任" name="socialResponsibility">
                <Input.TextArea rows={3} placeholder="请描述企业在社会责任方面的主要实践" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="公司治理" name="corporateGovernance">
                <Input.TextArea rows={3} placeholder="请描述企业治理结构和合规管理制度" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
    </>
  );
}

/* ─── 步骤 2：服务目录 ─── */
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
  {
    key: 'S01', title: '咨询服务', code: 'S01', level: '一级',
    children: [
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
    ],
  },
  {
    key: 'S02', title: '物化探服务', code: 'S02', level: '一级',
    children: [
      { key: 'S0201', title: '地震勘探', code: 'S0201', level: '二级', children: [
        { key: 'S0201000', title: '物化探服务', code: 'S0201000', level: '三级' },
        { key: 'S0201001', title: '二维地震采集服务', code: 'S0201001', level: '三级' },
        { key: 'S0201002', title: '三维地震采集服务', code: 'S0201002', level: '三级' },
      ]},
      { key: 'S0202', title: '地震资料处理', code: 'S0202', level: '二级', children: [
        { key: 'S0202001', title: '二维地震资料处理服务', code: 'S0202001', level: '三级' },
        { key: 'S0202002', title: '三维地震资料处理服务', code: 'S0202002', level: '三级' },
      ]},
    ],
  },
  {
    key: 'S03', title: '工序外协加工服务', code: 'S03', level: '一级',
    children: [
      { key: 'S0301', title: '加工服务', code: 'S0301', level: '二级', children: [
        { key: 'S0301000', title: '工序外协加工服务', code: 'S0301000', level: '三级' },
        { key: 'S0301001', title: '装配服务', code: 'S0301001', level: '三级' },
        { key: 'S0301002', title: '手工组装服务', code: 'S0301002', level: '三级' },
      ]},
    ],
  },
  {
    key: 'S05', title: '科技项目服务', code: 'S05', level: '一级',
    children: [
      { key: 'S0501', title: '科技服务', code: 'S0501', level: '二级', children: [
        { key: 'S0501000', title: '科技项目服务', code: 'S0501000', level: '三级' },
        { key: 'S0501001', title: '委托技术开发服务', code: 'S0501001', level: '三级' },
        { key: 'S0501002', title: '委托研发服务', code: 'S0501002', level: '三级' },
      ]},
    ],
  },
];

const generalTree: TreeNode[] = [
  {
    key: 'S04', title: '仓储服务', code: 'S04', level: '一级',
    children: [
      { key: 'S0401', title: '仓储服务', code: 'S0401', level: '二级', children: [
        { key: 'S0401000', title: '仓储服务', code: 'S0401000', level: '三级' },
        { key: 'S0401001', title: '仓储包装服务', code: 'S0401001', level: '三级' },
        { key: 'S0401002', title: '封装服务', code: 'S0401002', level: '三级' },
      ]},
    ],
  },
  {
    key: 'S06', title: '软件开发服务', code: 'S06', level: '一级',
    children: [
      { key: 'S0601', title: '软件开发', code: 'S0601', level: '二级', children: [
        { key: 'S0601000', title: '软件开发服务', code: 'S0601000', level: '三级' },
        { key: 'S0601001', title: '基础软件开发服务', code: 'S0601001', level: '三级' },
        { key: 'S0601002', title: '操作系统开发服务', code: 'S0601002', level: '三级' },
      ]},
    ],
  },
  {
    key: 'S07', title: '银行服务', code: 'S07', level: '一级',
    children: [
      { key: 'S0701', title: '银行服务', code: 'S0701', level: '二级', children: [
        { key: 'S0701000', title: '银行服务', code: 'S0701000', level: '三级' },
        { key: 'S0701001', title: '银行托管服务', code: 'S0701001', level: '三级' },
        { key: 'S0701002', title: '银行结算服务', code: 'S0701002', level: '三级' },
      ]},
    ],
  },
  {
    key: 'S10', title: '租赁服务', code: 'S10', level: '一级',
    children: [
      { key: 'S1001', title: '租赁服务', code: 'S1001', level: '二级', children: [
        { key: 'S1001000', title: '租赁服务', code: 'S1001000', level: '三级' },
        { key: 'S1001001', title: '油气水井设施租赁服务', code: 'S1001001', level: '三级' },
        { key: 'S1001002', title: '油气水集输处理设施租赁服务', code: 'S1001002', level: '三级' },
      ]},
    ],
  },
];

function TreeNodeItem({ node, checkedKeys, onCheck, expandedKeys, onToggle }: {
  node: TreeNode;
  checkedKeys: Set<string>;
  onCheck: (key: string) => void;
  expandedKeys: Set<string>;
  onToggle: (key: string) => void;
}) {
  const hasChildren = node.children && node.children.length > 0;
  const isExpanded = expandedKeys.has(node.key);
  const isChecked = checkedKeys.has(node.key);

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 0', cursor: 'pointer' }}
        onClick={() => hasChildren ? onToggle(node.key) : onCheck(node.key)}>
        {hasChildren ? (
          <span style={{ fontSize: 10, color: '#999', width: 12, textAlign: 'center' }}>{isExpanded ? '▼' : '▶'}</span>
        ) : (
          <span style={{ width: 12 }} />
        )}
        <input
          type="checkbox"
          checked={isChecked}
          onChange={() => onCheck(node.key)}
          onClick={(e) => e.stopPropagation()}
          style={{ accentColor: '#ff4d4f' }}
        />
        <span style={{ fontSize: 13 }}>{node.title}</span>
        <span style={{ flex: 1 }} />
        <span style={{ fontSize: 12, color: '#999' }}>{node.level}</span>
        <span style={{ fontSize: 12, color: '#999', marginLeft: 8 }}>({node.code})</span>
      </div>
      {hasChildren && isExpanded && (
        <div style={{ paddingLeft: 24 }}>
          {node.children!.map(child => (
            <TreeNodeItem key={child.key} node={child} checkedKeys={checkedKeys} onCheck={onCheck} expandedKeys={expandedKeys} onToggle={onToggle} />
          ))}
        </div>
      )}
    </div>
  );
}

function ServiceCatalogModal({ open, onClose, onConfirm }: {
  open: boolean;
  onClose: () => void;
  onConfirm: (items: { code: string; name: string; type: '专业' | '通用'; level: string }[]) => void;
}) {
  const [activeTab, setActiveTab] = useState<'professional' | 'general'>('professional');
  const [checkedKeys, setCheckedKeys] = useState<Set<string>>(new Set());
  const [expandedKeys, setExpandedKeys] = useState<Set<string>>(new Set(['S01', 'S0101']));
  const [searchValue, setSearchValue] = useState('');

  const tree = activeTab === 'professional' ? professionalTree : generalTree;

  const handleCheck = (key: string) => {
    setCheckedKeys(prev => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const handleToggle = (key: string) => {
    setExpandedKeys(prev => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const handleConfirm = () => {
    const findNode = (nodes: TreeNode[]): { code: string; name: string; type: '专业' | '通用'; level: string }[] => {
      const result: { code: string; name: string; type: '专业' | '通用'; level: string }[] = [];
      for (const node of nodes) {
        if (checkedKeys.has(node.key)) {
          result.push({
            code: node.code,
            name: node.title,
            type: activeTab === 'professional' ? '专业' : '通用',
            level: node.level,
          });
        }
        if (node.children) {
          result.push(...findNode(node.children));
        }
      }
      return result;
    };
    onConfirm(findNode(tree));
    setCheckedKeys(new Set());
    onClose();
  };

  const checkedCount = checkedKeys.size;

  return (
    <Modal
      title="选择服务目录"
      open={open}
      onCancel={onClose}
      width={640}
      footer={
        <Space>
          <AntButton onClick={onClose}>取消</AntButton>
          <AntButton type="primary" danger onClick={handleConfirm}>确认选择</AntButton>
        </Space>
      }
    >
      <div style={{ display: 'flex', gap: 0, borderBottom: '1px solid #f0f0f0', marginBottom: 16 }}>
        <div
          onClick={() => setActiveTab('professional')}
          style={{
            padding: '10px 16px', cursor: 'pointer', fontSize: 14,
            borderBottom: activeTab === 'professional' ? '2px solid #ff4d4f' : '2px solid transparent',
            color: activeTab === 'professional' ? '#ff4d4f' : '#666',
            fontWeight: activeTab === 'professional' ? 600 : 400,
          }}
        >
          专业目录 <span style={{ fontSize: 11, background: '#fff1f0', color: '#ff4d4f', padding: '0 4px', borderRadius: 3, marginLeft: 4 }}>需审查</span>
        </div>
        <div
          onClick={() => setActiveTab('general')}
          style={{
            padding: '10px 16px', cursor: 'pointer', fontSize: 14,
            borderBottom: activeTab === 'general' ? '2px solid #ff4d4f' : '2px solid transparent',
            color: activeTab === 'general' ? '#ff4d4f' : '#666',
            fontWeight: activeTab === 'general' ? 600 : 400,
          }}
        >
          通用目录
        </div>
      </div>

      <div style={{ marginBottom: 12 }}>
        <Typography.Text strong style={{ fontSize: 13 }}>
          {activeTab === 'professional' ? '📁 专业目录分类' : '📁 通用目录分类'}
        </Typography.Text>
        {activeTab === 'professional' && (
          <Typography.Text style={{ fontSize: 12, color: '#ff4d4f', marginLeft: 8 }}>需资格审查</Typography.Text>
        )}
      </div>

      <Input
        placeholder="输入关键字进行过滤"
        prefix="🔍"
        allowClear
        value={searchValue}
        onChange={e => setSearchValue(e.target.value)}
        style={{ marginBottom: 12 }}
      />

      <div style={{ fontSize: 12, color: '#999', marginBottom: 8 }}>已选中 {checkedCount}</div>

      <div style={{ maxHeight: 400, overflowY: 'auto', border: '1px solid #f0f0f0', borderRadius: 4, padding: '0 12px' }}>
        {tree.map(node => (
          <TreeNodeItem key={node.key} node={node} checkedKeys={checkedKeys} onCheck={handleCheck} expandedKeys={expandedKeys} onToggle={handleToggle} />
        ))}
      </div>
    </Modal>
  );
}

function StepServiceCatalog() {
  const [services, setServices] = useState<ServiceItem[]>([
    { id: 1, code: 'S0101000', name: '咨询服务', type: '专业', level: '一级', expanded: false },
    { id: 2, code: 'S0401000', name: '仓储服务', type: '通用', level: '二级', expanded: false },
  ]);
  const [modalOpen, setModalOpen] = useState(false);

  const removeService = (id: number) => {
    setServices(prev => prev.filter(s => s.id !== id));
  };

  const toggleExpand = (id: number) => {
    setServices(prev => prev.map(s => s.id === id ? { ...s, expanded: !s.expanded } : s));
  };

  const handleAddServices = (items: { code: string; name: string; type: '专业' | '通用'; level: string }[]) => {
    const newServices = items.map(item => ({
      id: Date.now() + Math.random(),
      code: item.code + '0',
      name: item.name,
      type: item.type,
      level: item.level,
      expanded: false,
    }));
    setServices(prev => [...prev, ...newServices]);
  };

  return (
    <>
      {/* 提示横幅 */}
      <div style={{
        background: '#fffbe6', border: '1px solid #ffe58f', borderRadius: 4,
        padding: '10px 16px', marginBottom: 16, fontSize: 13, color: '#ad6800',
        display: 'flex', alignItems: 'center', gap: 8,
      }}>
        <span style={{ fontSize: 16 }}>⚠️</span>
        选择专业目录下需要进行专业资格审查，请按要求填写服务品类的资质信用、服务能力
      </div>

      {/* 已添加的服务目录 */}
      <Card
        variant="outlined"
        size="small"
        title={<span style={{ fontSize: 14 }}>☑ 已添加的服务目录</span>}
        extra={
          <AntButton type="primary" danger icon={<PlusOutlined />} onClick={() => setModalOpen(true)}>
            添加服务品类
          </AntButton>
        }
        style={{ marginBottom: 16 }}
      >
        <Table
          rowSelection={{ type: 'checkbox' }}
          columns={[
            { title: '服务品类码', dataIndex: 'code', key: 'code', width: 130 },
            { title: '服务品类名称', dataIndex: 'name', key: 'name' },
            {
              title: '品类类型', dataIndex: 'type', key: 'type', width: 100, align: 'center',
              render: (text: string) => (
                <span style={{
                  display: 'inline-block', padding: '0 8px', borderRadius: 4, fontSize: 12,
                  background: text === '专业' ? '#fff1f0' : '#e6f7ff',
                  color: text === '专业' ? '#ff4d4f' : '#1890ff',
                  border: `1px solid ${text === '专业' ? '#ffa39e' : '#91d5ff'}`,
                }}>
                  {text}
                </span>
              ),
            },
            { title: '品类等级', dataIndex: 'level', key: 'level', width: 90, align: 'center' },
            {
              title: '操作', key: 'action', width: 130, align: 'center',
              render: (_: unknown, record: ServiceItem) => (
                <Space size={8}>
                  <Typography.Link style={{ fontSize: 13 }} onClick={() => toggleExpand(record.id)}>
                    {record.expanded ? '合并' : '编辑'}
                  </Typography.Link>
                  <Typography.Link style={{ fontSize: 13, color: '#ff4d4f' }} onClick={() => removeService(record.id)}>
                    删除
                  </Typography.Link>
                </Space>
              ),
            },
          ]}
          dataSource={services}
          rowKey="id"
          pagination={false}
          bordered
          size="middle"
        />
      </Card>

      {/* 展开的资质信用和服务能力 */}
      {services.filter(s => s.expanded).map(svc => (
        <div key={svc.id} style={{ marginBottom: 16 }}>
          {/* 资质信用 */}
          <Card variant="outlined" size="small" style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <Typography.Text strong style={{ fontSize: 14 }}>资质信用</Typography.Text>
              <span style={{
                background: '#fff1f0', color: '#ff4d4f', fontSize: 11, padding: '0 6px',
                borderRadius: 3, border: '1px solid #ffa39e',
              }}>
                必填
              </span>
            </div>
            <Row gutter={24}>
              <Col span={12}>
                <div style={{ marginBottom: 16 }}>
                  <Typography.Text style={{ fontSize: 13, display: 'block', marginBottom: 6 }}>
                    资质等级 <span style={{ color: '#ff4d4f' }}>*</span>
                  </Typography.Text>
                  <Select placeholder="请选择资质等级" style={{ width: '100%' }}>
                    <Select.Option value="a">甲级</Select.Option>
                    <Select.Option value="b">乙级</Select.Option>
                    <Select.Option value="c">丙级</Select.Option>
                  </Select>
                </div>
              </Col>
              <Col span={12}>
                <div style={{ marginBottom: 16 }}>
                  <Typography.Text style={{ fontSize: 13, display: 'block', marginBottom: 6 }}>
                    资质证书编号 <span style={{ color: '#ff4d4f' }}>*</span>
                  </Typography.Text>
                  <Input placeholder="请输入资质证书编号" />
                </div>
              </Col>
              <Col span={12}>
                <div style={{ marginBottom: 16 }}>
                  <Typography.Text style={{ fontSize: 13, display: 'block', marginBottom: 6 }}>信用评级</Typography.Text>
                  <Select placeholder="请选择信用评级" style={{ width: '100%' }}>
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
                  <Upload beforeUpload={() => false}>
                    <AntButton icon={<UploadOutlined />}>上传文件</AntButton>
                  </Upload>
                </div>
              </Col>
            </Row>
          </Card>

          {/* 服务能力 */}
          <Card variant="outlined" size="small">
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <Typography.Text strong style={{ fontSize: 14 }}>服务能力</Typography.Text>
              <span style={{
                background: '#fff1f0', color: '#ff4d4f', fontSize: 11, padding: '0 6px',
                borderRadius: 3, border: '1px solid #ffa39e',
              }}>
                必填
              </span>
            </div>
            <div style={{ marginBottom: 16 }}>
              <Typography.Text style={{ fontSize: 13, display: 'block', marginBottom: 6 }}>
                主要设备/装备情况 <span style={{ color: '#ff4d4f' }}>*</span>
              </Typography.Text>
              <Input.TextArea rows={3} placeholder="请描述拥有的主要设备、仪器等硬件条件" />
            </div>
            <div>
              <Typography.Text style={{ fontSize: 13, display: 'block', marginBottom: 6 }}>
                技术优势及特色 <span style={{ color: '#ff4d4f' }}>*</span>
              </Typography.Text>
              <Input.TextArea rows={3} placeholder="请描述核心技术能力、专利技术、工艺特色等" />
            </div>
          </Card>
        </div>
      ))}

      <ServiceCatalogModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleAddServices}
      />
    </>
  );
}

/* ─── 步骤 3：资质信息 ─── */
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

function StepQualification() {
  const [files, setFiles] = useState<FileRow[]>([
    { id: 1, type: '营业执照', required: true, permanent: false },
    { id: 2, type: '专业资质证书', required: true, permanent: false },
    { id: 3, type: '财务审计报告／银行资信证明', required: true, permanent: false },
    { id: 4, type: 'QHSE/ESG 无重大事故事件承诺', required: true, permanent: false },
    { id: 5, type: '无重大违法违规承诺', required: true, permanent: false },
    { id: 6, type: '信用信息合规（4大平台无黑名单）', required: true, permanent: false },
    { id: 7, type: 'ISO 9001 质量管理体系认证证书', required: false, fileName: 'ISO9001_cert.pdf', remark: '自定义附件', startDate: '2024-01-01', endDate: '2027-01-01', permanent: false, custom: true },
  ]);

  const updateFile = (id: number, patch: Partial<FileRow>) => {
    setFiles(prev => prev.map(f => f.id === id ? { ...f, ...patch } : f));
  };

  const removeFile = (id: number) => {
    setFiles(prev => prev.filter(f => f.id !== id));
  };

  const addCustomFile = () => {
    setFiles(prev => [...prev, {
      id: Date.now(),
      type: '',
      required: false,
      permanent: false,
      custom: true,
    }]);
  };

  const columns = [
    {
      title: '文件类型',
      dataIndex: 'type',
      key: 'type',
      width: 240,
      render: (text: string, record: FileRow) => (
        <Typography.Text style={{ fontSize: 13 }}>
          {record.required && <span style={{ color: '#ff4d4f', marginRight: 4 }}>*</span>}
          {record.custom ? (
            <Input
              size="small"
              value={text}
              onChange={e => updateFile(record.id, { type: e.target.value })}
              placeholder="请输入文件类型"
              style={{ width: 200 }}
            />
          ) : (
            text
          )}
        </Typography.Text>
      ),
    },
    {
      title: '文件上传',
      dataIndex: 'fileName',
      key: 'fileName',
      width: 220,
      render: (text: string, record: FileRow) => {
        if (text) {
          return (
            <div>
              <Typography.Text style={{ fontSize: 13 }}>{text}</Typography.Text>
              <div style={{ marginTop: 4 }}>
                <Typography.Link style={{ fontSize: 12 }}>预览</Typography.Link>
                <Typography.Link style={{ fontSize: 12, marginLeft: 8 }}>替换</Typography.Link>
                <Typography.Link style={{ fontSize: 12, marginLeft: 8, color: '#ff4d4f' }} onClick={() => updateFile(record.id, { fileName: undefined })}>删除</Typography.Link>
              </div>
            </div>
          );
        }
        return (
          <Upload beforeUpload={() => false} showUploadList={false}>
            <AntButton icon={<UploadOutlined />} size="small">上传文件</AntButton>
          </Upload>
        );
      },
    },
    {
      title: '备注',
      dataIndex: 'remark',
      key: 'remark',
      width: 160,
      render: (text: string, record: FileRow) => (
        <Input
          size="small"
          value={text || ''}
          onChange={e => updateFile(record.id, { remark: e.target.value })}
          placeholder="备注"
        />
      ),
    },
    {
      title: '有效时间',
      key: 'validTime',
      width: 300,
      render: (_: unknown, record: FileRow) => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, flexWrap: 'wrap' }}>
            <Input
              size="small"
              value={record.startDate || ''}
              onChange={e => updateFile(record.id, { startDate: e.target.value })}
              placeholder="年/月/日"
              style={{ width: 110 }}
              disabled={record.permanent}
            />
            <Typography.Text type="secondary" style={{ fontSize: 12 }}>至</Typography.Text>
            <Input
              size="small"
              value={record.endDate || ''}
              onChange={e => updateFile(record.id, { endDate: e.target.value })}
              placeholder="年/月/日"
              style={{ width: 110 }}
              disabled={record.permanent}
            />
          </div>
          <label style={{ fontSize: 12, display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={record.permanent}
              onChange={e => updateFile(record.id, { permanent: e.target.checked, startDate: '', endDate: '' })}
              style={{ accentColor: '#ff4d4f' }}
            />
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
      <Table
        columns={columns}
        dataSource={files}
        rowKey="id"
        pagination={false}
        bordered
        size="middle"
      />
      <div style={{ marginTop: 12 }}>
        <AntButton type="dashed" icon={<PlusOutlined />} onClick={addCustomFile}>
          添加自定义附件
        </AntButton>
      </div>
    </Card>
  );
}

/* ─── 步骤 4：审批中 ─── */
function StepApproval() {
  return (
    <Card variant="outlined" size="small" style={{ marginBottom: 16, textAlign: 'center', padding: '60px 0' }}>
      <div style={{ fontSize: 48, marginBottom: 16 }}>⏳</div>
      <Typography.Title level={4} style={{ marginBottom: 8 }}>审批中</Typography.Title>
      <Typography.Text type="secondary" style={{ display: 'block', marginBottom: 24 }}>
        您的服务商注册申请已提交，正在等待审核。审核结果将通过站内消息和邮件通知您。
      </Typography.Text>
      <Space size={16}>
        <AntButton onClick={() => message.info('已跳转到进度查询')}>查看审批进度</AntButton>
        <AntButton type="primary" onClick={() => message.info('已跳转到工作台')}>返回工作台</AntButton>
      </Space>
    </Card>
  );
}

/* ─── 主页面 ─── */
export default function SpRegister() {
  const { token: t } = theme.useToken();
  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const steps = [
    { title: '基本信息' },
    { title: '服务目录' },
    { title: '资质信息' },
    { title: '审批中' },
  ];

  const handleSaveDraft = useCallback(() => {
    const values = form.getFieldsValue();
    localStorage.setItem('sp-register-draft', JSON.stringify(values));
    message.success('草稿已保存');
  }, [form]);

  const handleNext = useCallback(async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 400));
    message.success('保存成功');
    setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
    setLoading(false);
  }, [currentStep, steps.length]);

  const handlePrev = useCallback(() => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  }, []);

  const handleSubmit = useCallback(async () => {
    try {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      message.success('注册服务商申请已提交');
      setCurrentStep(3);
    } catch {
      message.error('提交失败，请重试');
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <div>
      <Typography.Title level={4} style={{ marginTop: 0, marginBottom: 4 }}>注册服务商</Typography.Title>
      <Typography.Text type="secondary" style={{ display: 'block', marginBottom: 20 }}>
        完善服务商信息、选择服务目录并上传资质材料。所有带 * 的为必填项。
      </Typography.Text>

      <Steps current={currentStep} items={steps} size="small" style={{ marginBottom: 24 }} />

      {currentStep === 0 && <StepBasicInfo form={form} />}
      {currentStep === 1 && <StepServiceCatalog />}
      {currentStep === 2 && <StepQualification />}
      {currentStep === 3 && <StepApproval />}

      {currentStep < 3 && (
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 24, gap: 12 }}>
          <AntButton onClick={handleSaveDraft}>保存草稿</AntButton>
          {currentStep > 0 && <AntButton onClick={handlePrev}>上一步</AntButton>}
          {currentStep < 2 ? (
            <AntButton type="primary" loading={loading} onClick={handleNext}>下一步</AntButton>
          ) : (
            <AntButton type="primary" loading={loading} onClick={handleSubmit}>提交</AntButton>
          )}
        </div>
      )}
    </div>
  );
}
