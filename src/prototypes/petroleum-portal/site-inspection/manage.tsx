/**
 * @name 现场考察管理-服务商端
 */
import { useState } from 'react';
import { theme, Table, Button, Typography, Space, Row, Col, Input, Select, Card, message, Form, Drawer, Upload, DatePicker } from 'antd';
import { UploadOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import PortalLayout from '../common/portal-layout';
import { inspectionGroups } from '../common/menu-data';
import { useFilterData } from '../common/hooks';

const { Text } = Typography;
const { TextArea } = Input;

const columns = [
  { key: 'index', title: '序号', width: 80, align: 'center' as const, dataIndex: 'index' },
  { key: 'code', title: '考察方案编号', dataIndex: 'code' },
  { key: 'name', title: '考察方案名称', dataIndex: 'name' },
  { key: 'type', title: '考察类型', dataIndex: 'type' },
  { key: 'status', title: '状态', dataIndex: 'status' },
];

const data = [
  { index: 1, code: '12343', name: '市政绿化服务考察', type: '实地考察', status: '草稿' },
  { index: 2, code: '12343', name: '租赁服务实地考察', type: '视频考察', status: '审批中' },
  { index: 3, code: '12343', name: '市政绿化服务考察', type: '实地考察', status: '审批拒绝' },
  { index: 4, code: '12343', name: '租赁服务实地考察', type: '视频考察', status: '审批通过' },
  { index: 5, code: '12343', name: '市政绿化服务考察', type: '实地考察', status: '' },
  { index: 6, code: '12343', name: '租赁服务实地考察', type: '视频考察', status: '' },
];

interface TargetItem {
  spCode: string;
  spName: string;
  svcCode: string;
  svcName: string;
  svcLevel: string;
  svcType: string;
  situation: string;
  score: string;
  result: string;
}

function TargetSection({ index, value, onChange, onRemove }: {
  index: number;
  value: TargetItem;
  onChange: (val: TargetItem) => void;
  onRemove: () => void;
}) {
  const { token: t } = theme.useToken();
  const update = (field: keyof TargetItem, val: string) => {
    onChange({ ...value, [field]: val });
  };

  return (
    <div style={{ borderTop: index > 0 ? `1px solid ${t.colorBorderSecondary}` : 'none', paddingTop: index > 0 ? 16 : 0, marginTop: index > 0 ? 16 : 0 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <Typography.Text strong style={{ fontSize: 14 }}>考察对象 {index > 0 ? index + 1 : ''}</Typography.Text>
        {index > 0 && (
          <Button type="link" size="small" icon={<DeleteOutlined />} onClick={onRemove} danger>删除</Button>
        )}
      </div>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="服务商编码" style={{ marginBottom: 12 }}>
            <Input value={value.spCode} onChange={e => update('spCode', e.target.value)} placeholder="请输入服务商编码" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="服务商名称" style={{ marginBottom: 12 }}>
            <Input value={value.spName} onChange={e => update('spName', e.target.value)} placeholder="请输入服务商名称" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="服务品类编码" style={{ marginBottom: 12 }}>
            <Input value={value.svcCode} onChange={e => update('svcCode', e.target.value)} placeholder="请输入服务品类编码" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="服务品类名称" style={{ marginBottom: 12 }}>
            <Input value={value.svcName} onChange={e => update('svcName', e.target.value)} placeholder="请输入服务品类名称" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="服务品类级别" style={{ marginBottom: 12 }}>
            <Input value={value.svcLevel} onChange={e => update('svcLevel', e.target.value)} placeholder="请输入服务品类级别" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="服务品类类型" style={{ marginBottom: 12 }}>
            <Input value={value.svcType} onChange={e => update('svcType', e.target.value)} placeholder="请输入服务品类类型" />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item label="服务情况" style={{ marginBottom: 12 }}>
        <TextArea rows={3} value={value.situation} onChange={e => update('situation', e.target.value)} placeholder="企业概况、经营情况、服务质量、ESG等情况说明" />
      </Form.Item>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="考察得分" style={{ marginBottom: 12 }}>
            <Input value={value.score} onChange={e => update('score', e.target.value)} placeholder="请输入考察得分" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="考察结果" style={{ marginBottom: 12 }}>
            <Select value={value.result || undefined} onChange={val => update('result', val)} placeholder="请选择考察结果">
              <Select.Option value="通过">通过</Select.Option>
              <Select.Option value="不通过">不通过</Select.Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Form.Item label="附件" style={{ marginBottom: 0 }}>
        <Upload>
          <Button type="link" size="small" icon={<UploadOutlined />}>上传文件</Button>
        </Upload>
      </Form.Item>
    </div>
  );
}

const defaultTarget: TargetItem = { spCode: '', spName: '', svcCode: '', svcName: '', svcLevel: '', svcType: '', situation: '', score: '', result: '' };

export default function SiteInspectionManage() {
  const { token: t } = theme.useToken();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [form] = Form.useForm();
  const [targets, setTargets] = useState<TargetItem[]>([{ ...defaultTarget }]);
  const [searchCode, setSearchCode] = useState('');
  const [searchName, setSearchName] = useState('');
  const [searchType, setSearchType] = useState('全部');
  const [searchStatus, setSearchStatus] = useState('');

  const { filteredData, setFilter } = useFilterData(data, [
    { key: 'code', label: '考察方案编号' },
    { key: 'name', label: '考察方案名称' },
    { key: 'type', label: '考察类型' },
    { key: 'status', label: '状态' },
  ]);

  const handleSearch = () => {
    setFilter('code', searchCode);
    setFilter('name', searchName);
    setFilter('type', searchType);
    setFilter('status', searchStatus);
  };

  const openDrawer = () => {
    setTargets([{ ...defaultTarget }]);
    setDrawerOpen(true);
  };

  const handleSave = () => {
    form.validateFields().then(() => {
      message.success('考察结果已保存');
    }).catch(() => {});
  };

  const handleSubmitReview = () => {
    form.validateFields().then(() => {
      message.success('考察结果已提交审核');
      setDrawerOpen(false);
      form.resetFields();
      setTargets([{ ...defaultTarget }]);
    }).catch(() => {});
  };

  const addTarget = () => {
    setTargets(prev => [...prev, { ...defaultTarget }]);
  };

  const removeTarget = (idx: number) => {
    setTargets(prev => prev.filter((_, i) => i !== idx));
  };

  const updateTarget = (idx: number, val: TargetItem) => {
    setTargets(prev => prev.map((t, i) => i === idx ? val : t));
  };

  return (
    <PortalLayout groups={inspectionGroups} activePath="/inspection/manage" portalType="inspection">
      <Typography.Title level={4} style={{ marginTop: 0 }}>现场考察管理</Typography.Title>

      <Card size="small" style={{ marginBottom: 16 }} variant="outlined">
        <Space direction="vertical" style={{ width: '100%' }} size={12}>
          <Row gutter={16}>
            <Col span={8}>
              <Space size={8}>
                <Text>考察方案编号</Text>
                <Input placeholder="请输入考察方案编号" style={{ width: 200 }} value={searchCode} onChange={e => setSearchCode(e.target.value)} />
              </Space>
            </Col>
            <Col span={8}>
              <Space size={8}>
                <Text>考察方案名称</Text>
                <Input placeholder="请输入考察方案名称" style={{ width: 200 }} value={searchName} onChange={e => setSearchName(e.target.value)} />
              </Space>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={8}>
              <Space size={8}>
                <Text>考察类型</Text>
                <Select style={{ width: 200 }} value={searchType} onChange={setSearchType} options={['全部', '实地考察', '视频考察'].map(v => ({ value: v, label: v }))} />
              </Space>
            </Col>
            <Col span={8}>
              <Space size={8}>
                <Text>状态</Text>
                <Input placeholder="请输入状态" style={{ width: 200 }} value={searchStatus} onChange={e => setSearchStatus(e.target.value)} />
              </Space>
            </Col>
          </Row>
          <Space>
            <Button type="primary" onClick={handleSearch}>查询</Button>
          </Space>
        </Space>
      </Card>

      <Space style={{ marginBottom: 16 }}>
        <Button type="primary" onClick={openDrawer}>录入考察结果</Button>
      </Space>

      <Table columns={columns} dataSource={filteredData.map((d, i) => ({ ...d, _key: i }))} rowKey="_key" pagination={{ pageSize: 10, showSizeChanger: true, showTotal: (t: number) => `共 ${t} 条` }} bordered size="middle" />

      <Drawer
        title="录入考察结果"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        width={960}
        destroyOnClose
        footer={
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
            <Button onClick={() => setDrawerOpen(false)}>取消</Button>
            <Button onClick={handleSave}>保存</Button>
            <Button type="primary" onClick={handleSubmitReview}>提交审核</Button>
          </div>
        }
      >
        <Form form={form} layout="vertical">
          <Typography.Text strong style={{ fontSize: 14, display: 'block', marginBottom: 16 }}>考察方案</Typography.Text>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="考察方案名称" name="planName" rules={[{ required: true, message: '请输入考察方案名称' }]}>
                <Input placeholder="请输入考察方案名称" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="考察类型" name="planType" rules={[{ required: true, message: '请选择考察类型' }]}>
                <Select placeholder="请选择考察类型">
                  <Select.Option value="实地考察">实地考察</Select.Option>
                  <Select.Option value="视频考察">视频考察</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="考察日期" name="planDate" rules={[{ required: true, message: '请选择考察日期' }]}>
                <DatePicker style={{ width: '100%' }} placeholder="请选择考察日期" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="联系人" name="contactPerson">
                <Input placeholder="请输入联系人" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="联系方式" name="contactInfo">
                <Input placeholder="请输入联系方式" />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item label="考察内容" name="planContent">
            <TextArea rows={4} placeholder="请输入考察内容" />
          </Form.Item>
          <Form.Item label="附件" name="planAttach">
            <Upload>
              <Button type="link" icon={<UploadOutlined />}>上传文件</Button>
            </Upload>
          </Form.Item>

          {targets.map((target, idx) => (
            <TargetSection
              key={idx}
              index={idx}
              value={target}
              onChange={val => updateTarget(idx, val)}
              onRemove={() => removeTarget(idx)}
            />
          ))}

          <div style={{ textAlign: 'center', marginTop: 16 }}>
            <Button type="dashed" block icon={<PlusOutlined />} onClick={addTarget}>添加考察对象</Button>
          </div>
        </Form>
      </Drawer>
    </PortalLayout>
  );
}
