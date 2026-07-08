/**
 * @name 注册服务商信息维护
 */
import { useState } from 'react';
import { ConfirmDialog } from '../common/components';
import {
  theme, Tabs, Card, Form, Input, Select, Button as AntButton, Radio, Row, Col,
  Typography, Upload, Space, Table, DatePicker, Checkbox, message, Modal,
} from 'antd';
import { UploadOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';

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

/* ─── 基本信息变更 Tab ─── */
function BasicInfoTab() {
  const [form] = Form.useForm();

  const handleSubmit = () => {
    setConfirmTarget('basic');
    setConfirmOpen(true);
  };

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmTarget, setConfirmTarget] = useState('');
  const [submitting, setSubmitting] = useState(false);

  return (
    <>
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
                <DatePicker style={{ width: '100%' }} placeholder="年/月/日" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>

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
                <Upload beforeUpload={() => false}>
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
              <Form.Item label="银行账号" name="bankAccount">
                <Input placeholder="请输入银行账号" />
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
                <Input.TextArea rows={3} placeholder="请输入营业执照上的经营范围内容" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 24, gap: 12 }}>
        <AntButton onClick={() => message.info('已取消')}>取消</AntButton>
        <AntButton onClick={() => message.success('草稿已保存')}>保存</AntButton>
        <AntButton type="primary" onClick={handleSubmit}>提交</AntButton>
      </div>

      <ConfirmDialog
        open={confirmOpen}
        title="确认提交基本信息变更"
        content="提交后将进入审批流程，是否确认提交？"
        onOk={() => {
          setSubmitting(true);
          setTimeout(() => { setSubmitting(false); setConfirmOpen(false); message.success('基本信息变更已提交'); }, 800);
        }}
        onCancel={() => setConfirmOpen(false)}
        confirmLoading={submitting}
      />
    </>
  );
}

/* ─── 资质文件变更 Tab ─── */
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

function QualificationTab() {
  const [files, setFiles] = useState<FileRow[]>([
    { id: 1, type: '营业执照', required: true, permanent: false },
    { id: 2, type: '专业资质证书', required: true, permanent: false },
    { id: 3, type: '财务审计报告／银行资信证明', required: true, permanent: false },
    { id: 4, type: 'QHSE/ESG 无重大事故事件承诺', required: true, permanent: false },
    { id: 5, type: '无重大违法违规承诺', required: true, permanent: false },
    { id: 6, type: '信用信息合规（4大平台无黑名单）', required: true, permanent: false },
    { id: 7, type: 'ISO 9001 质量管理体系认证证书', required: false, fileName: 'ISO9001_cert.pdf', remark: '自定义附件', startDate: '2024-01-01', endDate: '2027-01-01', permanent: false, custom: true },
  ]);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const updateFile = (id: number, patch: Partial<FileRow>) => {
    setFiles(prev => prev.map(f => f.id === id ? { ...f, ...patch } : f));
  };

  const removeFile = (id: number) => {
    setFiles(prev => prev.filter(f => f.id !== id));
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
            <Input size="small" value={text} onChange={e => updateFile(record.id, { type: e.target.value })} placeholder="请输入文件类型" style={{ width: 200 }} />
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
                <Typography.Link style={{ fontSize: 12, marginLeft: 8 }}>替换</Typography.Link>
                <Typography.Link style={{ fontSize: 12, marginLeft: 8, color: '#ff4d4f' }} onClick={() => updateFile(record.id, { fileName: undefined })}>删除</Typography.Link>
              </div>
            </div>
          );
        }
        return <Upload beforeUpload={() => false} showUploadList={false}><AntButton icon={<UploadOutlined />} size="small">上传文件</AntButton></Upload>;
      },
    },
    {
      title: '备注', dataIndex: 'remark', key: 'remark', width: 160,
      render: (text: string, record: FileRow) => (
        <Input size="small" value={text || ''} onChange={e => updateFile(record.id, { remark: e.target.value })} placeholder="备注" />
      ),
    },
    {
      title: '有效时间', key: 'validTime', width: 300,
      render: (_: unknown, record: FileRow) => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <Input size="small" value={record.startDate || ''} onChange={e => updateFile(record.id, { startDate: e.target.value })} placeholder="年/月/日" style={{ width: 110 }} disabled={record.permanent} />
            <Typography.Text type="secondary" style={{ fontSize: 12 }}>至</Typography.Text>
            <Input size="small" value={record.endDate || ''} onChange={e => updateFile(record.id, { endDate: e.target.value })} placeholder="年/月/日" style={{ width: 110 }} disabled={record.permanent} />
          </div>
          <label style={{ fontSize: 12, display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer' }}>
            <input type="checkbox" checked={record.permanent} onChange={e => updateFile(record.id, { permanent: e.target.checked, startDate: '', endDate: '' })} style={{ accentColor: '#ff4d4f' }} />
            永久有效
          </label>
        </div>
      ),
    },
  ];

  return (
    <>
      <Card variant="outlined" size="small" style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
          <span style={{ fontSize: 16 }}>📋</span>
          <Typography.Text strong style={{ fontSize: 14 }}>资质文件上传</Typography.Text>
        </div>
        <Table columns={columns} dataSource={files} rowKey="id" pagination={false} bordered size="middle" />
        <div style={{ marginTop: 12 }}>
          <AntButton type="dashed" icon={<PlusOutlined />} onClick={addCustomFile}>添加自定义附件</AntButton>
        </div>
      </Card>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 24, gap: 12 }}>
        <AntButton onClick={() => message.info('已取消')}>取消</AntButton>
        <AntButton onClick={() => message.success('草稿已保存')}>保存</AntButton>
        <AntButton type="primary" onClick={() => setConfirmOpen(true)}>提交</AntButton>
      </div>

      <ConfirmDialog
        open={confirmOpen}
        title="确认提交资质文件变更"
        content="提交后将进入审批流程，是否确认提交？"
        onOk={() => {
          setSubmitting(true);
          setTimeout(() => { setSubmitting(false); setConfirmOpen(false); message.success('资质文件变更已提交'); }, 800);
        }}
        onCancel={() => setConfirmOpen(false)}
        confirmLoading={submitting}
      />
    </>
  );
}

/* ─── 服务品类信息变更 Tab ─── */
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
  { key: '502', title: '工程技术服务', code: '502', level: '一级', children: [
    { key: '503', title: '生产及维修服务', code: '503', level: '二级' },
    { key: '504', title: '软件服务', code: '504', level: '二级' },
    { key: '505', title: '科研服务', code: '505', level: '二级' },
    { key: '506', title: '信息技术服务', code: '506', level: '二级' },
  ]},
  { key: '510', title: '其他服务', code: '510', level: '一级', children: [
    { key: '511', title: '其他专业服务', code: '511', level: '二级' },
  ]},
];

const generalTree: TreeNode[] = [
  { key: '601', title: '办公服务', code: '601', level: '一级', children: [
    { key: '602', title: '物业管理', code: '602', level: '二级' },
    { key: '603', title: '保洁服务', code: '603', level: '二级' },
  ]},
  { key: '605', title: '物流服务', code: '605', level: '一级', children: [
    { key: '606', title: '普通货运', code: '606', level: '二级' },
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
  const [expandedKeys, setExpandedKeys] = useState<Set<string>>(new Set(['502']));
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
      <div style={{ display: 'flex', borderBottom: '1px solid #f0f0f0', marginBottom: 16 }}>
        {(['professional', 'general'] as const).map(tab => (
          <div key={tab} onClick={() => setActiveTab(tab)} style={{
            padding: '10px 16px', cursor: 'pointer', fontSize: 14,
            borderBottom: activeTab === tab ? '2px solid #ff4d4f' : '2px solid transparent',
            color: activeTab === tab ? '#ff4d4f' : '#666', fontWeight: activeTab === tab ? 600 : 400,
          }}>
            {tab === 'professional' ? '专业目录' : '通用目录'}
            {tab === 'professional' && <span style={{ fontSize: 11, background: '#fff1f0', color: '#ff4d4f', padding: '0 4px', borderRadius: 3, marginLeft: 4 }}>需审查</span>}
          </div>
        ))}
      </div>
      <Input placeholder="输入关键字进行过滤" prefix="🔍" allowClear style={{ marginBottom: 12 }} />
      <div style={{ fontSize: 12, color: '#999', marginBottom: 8 }}>已选中 {checkedKeys.size}</div>
      <div style={{ maxHeight: 400, overflowY: 'auto', border: '1px solid #f0f0f0', borderRadius: 4, padding: '0 12px' }}>
        {tree.map(n => <TreeNodeItem key={n.key} node={n} checkedKeys={checkedKeys} onCheck={handleCheck} expandedKeys={expandedKeys} onToggle={handleToggle} />)}
      </div>
    </Modal>
  );
}

function ServiceCatalogTab() {
  const [services, setServices] = useState<ServiceItem[]>([
    { id: 1, code: '502010', name: '工程技术服务 / 生产及维修服务', type: '专业', level: '一级', expanded: false },
    { id: 2, code: '601010', name: '办公服务 / 物业管理', type: '通用', level: '二级', expanded: false },
  ]);
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const removeService = (id: number) => setServices(prev => prev.filter(s => s.id !== id));
  const toggleExpand = (id: number) => setServices(prev => prev.map(s => s.id === id ? { ...s, expanded: !s.expanded } : s));
  const handleAddServices = (items: { code: string; name: string; type: '专业' | '通用'; level: string }[]) => {
    setServices(prev => [...prev, ...items.map(item => ({
      id: Date.now() + Math.random(), code: item.code + '0', name: item.name, type: item.type, level: item.level, expanded: false,
    }))]);
  };

  return (
    <>
      <div style={{ background: '#fffbe6', border: '1px solid #ffe58f', borderRadius: 4, padding: '10px 16px', marginBottom: 16, fontSize: 13, color: '#ad6800', display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 16 }}>⚠️</span>
        选择专业目录下需要进行专业资格审查，请按要求填写服务品类的资质信用、服务能力
      </div>

      <Card variant="outlined" size="small" title={<span style={{ fontSize: 14 }}>☑ 已添加的服务目录</span>}
        extra={<AntButton type="primary" danger icon={<PlusOutlined />} onClick={() => setModalOpen(true)}>添加服务品类</AntButton>}
        style={{ marginBottom: 16 }}>
        <Table
          rowSelection={{ type: 'checkbox' }}
          columns={[
            { title: '服务品类码', dataIndex: 'code', key: 'code', width: 130 },
            { title: '服务品类名称', dataIndex: 'name', key: 'name' },
            { title: '品类类型', dataIndex: 'type', key: 'type', width: 100, align: 'center',
              render: (text: string) => <span style={{ display: 'inline-block', padding: '0 8px', borderRadius: 4, fontSize: 12, background: text === '专业' ? '#fff1f0' : '#e6f7ff', color: text === '专业' ? '#ff4d4f' : '#1890ff', border: `1px solid ${text === '专业' ? '#ffa39e' : '#91d5ff'}` }}>{text}</span> },
            { title: '品类等级', dataIndex: 'level', key: 'level', width: 90, align: 'center' },
            { title: '操作', key: 'action', width: 130, align: 'center',
              render: (_: unknown, record: ServiceItem) => (
                <Space size={8}>
                  <Typography.Link style={{ fontSize: 13 }} onClick={() => toggleExpand(record.id)}>{record.expanded ? '合并' : '编辑'}</Typography.Link>
                  <Typography.Link style={{ fontSize: 13, color: '#ff4d4f' }} onClick={() => removeService(record.id)}>删除</Typography.Link>
                </Space>
              ),
            },
          ]}
          dataSource={services} rowKey="id" pagination={false} bordered size="middle"
        />
      </Card>

      {services.filter(s => s.expanded).map(svc => (
        <div key={svc.id} style={{ marginBottom: 16 }}>
          <Card variant="outlined" size="small" style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <Typography.Text strong style={{ fontSize: 14 }}>资质信用</Typography.Text>
              <span style={{ background: '#fff1f0', color: '#ff4d4f', fontSize: 11, padding: '0 6px', borderRadius: 3, border: '1px solid #ffa39e' }}>必填</span>
            </div>
            <Row gutter={24}>
              <Col span={12}>
                <div style={{ marginBottom: 16 }}>
                  <Typography.Text style={{ fontSize: 13, display: 'block', marginBottom: 6 }}>资质等级 <span style={{ color: '#ff4d4f' }}>*</span></Typography.Text>
                  <Select placeholder="请选择资质等级" style={{ width: '100%' }}><Select.Option value="a">甲级</Select.Option><Select.Option value="b">乙级</Select.Option><Select.Option value="c">丙级</Select.Option></Select>
                </div>
              </Col>
              <Col span={12}>
                <div style={{ marginBottom: 16 }}>
                  <Typography.Text style={{ fontSize: 13, display: 'block', marginBottom: 6 }}>资质证书编号 <span style={{ color: '#ff4d4f' }}>*</span></Typography.Text>
                  <Input placeholder="请输入资质证书编号" />
                </div>
              </Col>
              <Col span={12}>
                <div style={{ marginBottom: 16 }}>
                  <Typography.Text style={{ fontSize: 13, display: 'block', marginBottom: 6 }}>信用评级</Typography.Text>
                  <Select placeholder="请选择信用评级" style={{ width: '100%' }}><Select.Option value="aaa">AAA</Select.Option><Select.Option value="aa">AA</Select.Option><Select.Option value="a">A</Select.Option></Select>
                </div>
              </Col>
              <Col span={12}>
                <div style={{ marginBottom: 16 }}>
                  <Typography.Text style={{ fontSize: 13, display: 'block', marginBottom: 6 }}>资质证明文件</Typography.Text>
                  <Upload beforeUpload={() => false}><AntButton icon={<UploadOutlined />}>上传文件</AntButton></Upload>
                </div>
              </Col>
            </Row>
          </Card>
          <Card variant="outlined" size="small">
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <Typography.Text strong style={{ fontSize: 14 }}>服务能力</Typography.Text>
              <span style={{ background: '#fff1f0', color: '#ff4d4f', fontSize: 11, padding: '0 6px', borderRadius: 3, border: '1px solid #ffa39e' }}>必填</span>
            </div>
            <div style={{ marginBottom: 16 }}>
              <Typography.Text style={{ fontSize: 13, display: 'block', marginBottom: 6 }}>主要设备/装备情况 <span style={{ color: '#ff4d4f' }}>*</span></Typography.Text>
              <Input.TextArea rows={3} placeholder="请描述拥有的主要设备、仪器等硬件条件" />
            </div>
            <div>
              <Typography.Text style={{ fontSize: 13, display: 'block', marginBottom: 6 }}>技术优势及特色 <span style={{ color: '#ff4d4f' }}>*</span></Typography.Text>
              <Input.TextArea rows={3} placeholder="请描述核心技术能力、专利技术、工艺特色等" />
            </div>
          </Card>
        </div>
      ))}

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 24, gap: 12 }}>
        <AntButton onClick={() => message.info('已取消')}>取消</AntButton>
        <AntButton onClick={() => message.success('草稿已保存')}>保存</AntButton>
        <AntButton type="primary" onClick={() => setConfirmOpen(true)}>提交</AntButton>
      </div>

      <ServiceCatalogModal open={modalOpen} onClose={() => setModalOpen(false)} onConfirm={handleAddServices} />
      <ConfirmDialog
        open={confirmOpen}
        title="确认提交服务品类变更"
        content="提交后将进入审批流程，是否确认提交？"
        onOk={() => { setSubmitting(true); setTimeout(() => { setSubmitting(false); setConfirmOpen(false); message.success('服务品类变更已提交'); }, 800); }}
        onCancel={() => setConfirmOpen(false)}
        confirmLoading={submitting}
      />
    </>
  );
}

/* ─── 主页面 ─── */
export default function SpRegisterChange() {
  const [activeTab, setActiveTab] = useState('basic');

  return (
    <div>
      <Space size={16} style={{ marginBottom: 16 }}>
        <Typography.Title level={4} style={{ margin: 0 }}>注册服务商信息维护</Typography.Title>
        <Typography.Text type="secondary">服务商名称：中海油能源发展股份有限公司</Typography.Text>
        <Typography.Text type="secondary">服务商编码：100001231</Typography.Text>
      </Space>

      <Tabs
        items={[
          { key: 'basic', label: '基本信息变更' },
          { key: 'qual', label: '资质文件变更' },
          { key: 'service', label: '服务品类信息变更' },
        ]}
        activeKey={activeTab}
        onChange={setActiveTab}
        style={{ marginBottom: 16 }}
      />

      {activeTab === 'basic' && <BasicInfoTab />}
      {activeTab === 'qual' && <QualificationTab />}
      {activeTab === 'service' && <ServiceCatalogTab />}
    </div>
  );
}
