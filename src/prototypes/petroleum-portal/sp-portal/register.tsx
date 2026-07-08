/**
 * @name 注册服务商
 */
import { useState, useCallback } from 'react';
import PortalLayout from '../common/portal-layout';
import { spGroups } from '../common/menu-data';
import {
  theme, Steps, Card, Form, Input, Select, Radio, Row, Col, Typography,
  message, Button as AntButton, Space, Upload, DatePicker, Checkbox, Divider,
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
              <Form.Item label="服务商名称" name="companyName" rules={[{ required: true, message: '请输入服务商全称' }]}>
                <Input placeholder="请输入服务商全称" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="注册资本" name="registeredCapital" rules={[{ required: true, message: '请输入注册资本' }]}>
                <Input suffix={<Typography.Text type="secondary">单位：万元</Typography.Text>} placeholder="请输入注册资本" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="统一社会信用代码" name="creditCode" rules={[{ required: true, message: '请输入18位统一社会信用代码' }]}>
                <Input placeholder="18位统一社会信用代码" maxLength={18} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="成立日期" name="establishDate" rules={[{ required: true, message: '请选择成立日期' }]}>
                <DatePicker style={{ width: '100%' }} placeholder="年/月/日" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>

      {/* 管理信息 */}
      <Card variant="outlined" size="small" style={{ marginBottom: 16 }}>
        <SectionTitle icon="🏢" title="管理信息" />
        <Form layout="vertical" form={form}>
          <Form.Item label="是否内部服务商" name="isInternal" rules={[{ required: true }]}>
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
              <Form.Item label="联系人姓名" name="contactName" rules={[{ required: true, message: '请输入联系人姓名' }]}>
                <Input placeholder="请输入联系人姓名" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="联系人手机号" name="contactPhone" rules={[{ required: true, message: '请输入11位手机号' }]}>
                <Input placeholder="请输入11位手机号" maxLength={11} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="联系人固定电话" name="contactTel">
                <Input placeholder="区号-号码，如 010-88888888" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="联系人邮箱" name="contactEmail" rules={[{ required: true, type: 'email', message: '请输入邮箱地址' }]}>
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
              <Form.Item label="法定代表人姓名" name="legalPerson" rules={[{ required: true, message: '请输入法定代表人姓名' }]}>
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
              <Form.Item label="企业规模" name="companyScale" rules={[{ required: true, message: '请选择企业规模' }]}>
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
              <Form.Item label="银行信用等级" name="bankCredit" rules={[{ required: true, message: '请选择银行信用等级' }]}>
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
              <Form.Item label="注册资本" name="regCapital" rules={[{ required: true, message: '请输入注册资本' }]}>
                <Input suffix={<Typography.Text type="secondary">单位：万元</Typography.Text>} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="成立日期" name="regDate" rules={[{ required: true, message: '请选择成立日期' }]}>
                <DatePicker style={{ width: '100%' }} placeholder="年/月/日" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="银行账号" name="bankAccount" rules={[{ required: true, message: '请输入银行账号' }]}>
                <Input placeholder="请输入银行账号" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="开户银行账号" name="bankAccNo" rules={[{ required: true, message: '请输入开户银行账号' }]}>
                <Input placeholder="请输入开户银行账号" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="公司电话" name="companyTel" rules={[{ required: true, message: '请输入公司电话' }]}>
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
              <Form.Item label="国家" name="country" initialValue="中国" rules={[{ required: true, message: '请选择国家' }]}>
                <Select>
                  <Select.Option value="中国">中国</Select.Option>
                  <Select.Option value="美国">美国</Select.Option>
                  <Select.Option value="日本">日本</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="省/直辖市" name="province" rules={[{ required: true, message: '请选择省/直辖市' }]}>
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
              <Form.Item label="通讯地址" name="mailAddress" rules={[{ required: true, message: '请输入通讯地址' }]}>
                <Input placeholder="请输入详细通讯地址" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="注册地址" name="regAddress" rules={[{ required: true, message: '请输入注册地址' }]}>
                <Input placeholder="请输入企业注册地址" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="邮编" name="zipCode" rules={[{ required: true, message: '请输入邮政编码' }]}>
                <Input placeholder="6位邮政编码" maxLength={6} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="经营范围" name="businessScope" rules={[{ required: true, message: '请输入经营范围' }]}>
                <Input.TextArea rows={3} placeholder="请输入营业执照上的经营范围内容" />
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
              <Form.Item label="服务队伍人数" name="serviceTeamSize" rules={[{ required: true, message: '请输入服务队伍总人数' }]}>
                <Input placeholder="请输入服务队伍总人数" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="技术人员数量" name="techStaffCount" rules={[{ required: true, message: '请输入技术人员数量' }]}>
                <Input placeholder="请输入技术人员数量" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="人员资质情况" name="staffQualification" rules={[{ required: true, message: '请输入人员资质情况' }]}>
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
              <Form.Item label="近三年营业收入（万元）" name="revenue" rules={[{ required: true, message: '请输入近三年营业收入' }]}>
                <Input.TextArea rows={2} placeholder="如：2022年1200万/2023年1500万/2024年1800万" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="近三年净利润（万元）" name="profit">
                <Input.TextArea rows={2} placeholder="如：2022年120万/2023年180万/2024年200万" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="主要业务范围" name="mainBusiness" rules={[{ required: true, message: '请输入主要业务范围' }]}>
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
              <Form.Item label="主要项目业绩" name="projectExperience" rules={[{ required: true, message: '请输入主要项目业绩' }]}>
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
              <Form.Item label="质量管理体系认证" name="qualityCert" rules={[{ required: true, message: '请选择质量管理体系认证' }]}>
                <Select placeholder="请选择">
                  <Select.Option value="iso9001">ISO 9001</Select.Option>
                  <Select.Option value="other">其他</Select.Option>
                  <Select.Option value="none">无</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="HSE管理体系" name="hseSystem" rules={[{ required: true, message: '请选择HSE管理体系' }]}>
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
function StepServiceCatalog({ form }: { form: any }) {
  const [services, setServices] = useState([{ id: 1, category: '', name: '', desc: '' }]);

  const addService = () => {
    setServices(prev => [...prev, { id: Date.now(), category: '', name: '', desc: '' }]);
  };

  const removeService = (id: number) => {
    if (services.length <= 1) return;
    setServices(prev => prev.filter(s => s.id !== id));
  };

  return (
    <Card variant="outlined" size="small" style={{ marginBottom: 16 }}>
      <SectionTitle icon="📂" title="服务目录" />
      {services.map((svc, idx) => (
        <div key={svc.id} style={{ marginBottom: 16, padding: 12, background: '#fafafa', borderRadius: 6, position: 'relative' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <Typography.Text strong>服务品类 {idx + 1}</Typography.Text>
            {services.length > 1 && (
              <AntButton type="text" icon={<DeleteOutlined />} danger onClick={() => removeService(svc.id)} />
            )}
          </div>
          <Form layout="vertical" form={form}>
            <Row gutter={16}>
              <Col span={8}>
                <Form.Item label="服务品类" required>
                  <Select placeholder="请选择服务品类">
                    <Select.Option value="engineering">工程服务</Select.Option>
                    <Select.Option value="equipment">设备维保</Select.Option>
                    <Select.Option value="it">信息技术</Select.Option>
                    <Select.Option value="consulting">咨询服务</Select.Option>
                    <Select.Option value="logistics">物流服务</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="服务品类名称" required>
                  <Input placeholder="请输入服务品类名称" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="服务品类码">
                  <Input placeholder="系统自动生成" disabled />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label="服务描述">
                  <Input.TextArea rows={2} placeholder="请输入服务描述" />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
      ))}
      <AntButton type="dashed" icon={<PlusOutlined />} onClick={addService} style={{ width: '100%' }}>
        添加服务品类
      </AntButton>
    </Card>
  );
}

/* ─── 步骤 3：资质信息 ─── */
function StepQualification({ form }: { form: any }) {
  const [certList, setCertList] = useState<UploadFile[]>([]);
  const [licenseList, setLicenseList] = useState<UploadFile[]>([]);

  return (
    <>
      <Card variant="outlined" size="small" style={{ marginBottom: 16 }}>
        <SectionTitle icon="📜" title="资质证书" tag="必填" />
        <Form layout="vertical" form={form}>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item label="上传资质证书" name="qualCerts" rules={[{ required: true, message: '请上传资质证书' }]}>
                <Upload
                  fileList={certList}
                  onChange={({ fileList }) => setCertList(fileList)}
                  beforeUpload={() => false}
                  multiple
                >
                  <AntButton icon={<UploadOutlined />}>选择文件</AntButton>
                </Upload>
                <Typography.Text type="secondary" style={{ fontSize: 12 }}>
                  支持 PDF、JPG、PNG 格式，单个文件不超过 10MB
                </Typography.Text>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>

      <Card variant="outlined" size="small" style={{ marginBottom: 16 }}>
        <SectionTitle icon="📄" title="营业执照" tag="必填" />
        <Form layout="vertical" form={form}>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item label="上传营业执照" name="businessLicense" rules={[{ required: true, message: '请上传营业执照' }]}>
                <Upload
                  fileList={licenseList}
                  onChange={({ fileList }) => setLicenseList(fileList)}
                  beforeUpload={() => false}
                >
                  <AntButton icon={<UploadOutlined />}>选择文件</AntButton>
                </Upload>
                <Typography.Text type="secondary" style={{ fontSize: 12 }}>
                  支持 PDF、JPG、PNG 格式，单个文件不超过 10MB
                </Typography.Text>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>

      <Card variant="outlined" size="small" style={{ marginBottom: 16 }}>
        <SectionTitle icon="📝" title="其他材料" tag="选填" />
        <Form layout="vertical" form={form}>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item label="补充材料" name="otherDocs">
                <Upload beforeUpload={() => false} multiple>
                  <AntButton icon={<UploadOutlined />}>选择文件</AntButton>
                </Upload>
                <Typography.Text type="secondary" style={{ fontSize: 12 }}>
                  如有其他相关资质文件，可在此上传
                </Typography.Text>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
    </>
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
    try {
      if (currentStep === 0) {
        // 基本信息验证
        await form.validateFields(['companyName', 'creditCode', 'establishDate']);
      }
      setLoading(true);
      // 模拟保存
      await new Promise(resolve => setTimeout(resolve, 600));
      message.success('保存成功');
      setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
    } catch (err) {
      message.warning('请填写必填项');
    } finally {
      setLoading(false);
    }
  }, [currentStep, form, steps.length]);

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
    <PortalLayout groups={spGroups} activePath="/sp/register" portalType="sp">
      <Typography.Title level={4} style={{ marginTop: 0, marginBottom: 4 }}>注册服务商</Typography.Title>
      <Typography.Text type="secondary" style={{ display: 'block', marginBottom: 20 }}>
        完善服务商信息、选择服务目录并上传资质材料。所有带 * 的为必填项。
      </Typography.Text>

      <Steps current={currentStep} items={steps} size="small" style={{ marginBottom: 24 }} />

      {currentStep === 0 && <StepBasicInfo form={form} />}
      {currentStep === 1 && <StepServiceCatalog form={form} />}
      {currentStep === 2 && <StepQualification form={form} />}
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
    </PortalLayout>
  );
}
