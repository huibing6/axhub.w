/**
 * @name 冻结申请
 */
import { useState } from 'react';
import { theme, Typography, Card, Space, Input, Select, Button, Table, Form, Row, Col, Modal, message } from 'antd';
import PortalLayout from '../../common/portal-layout';
import { adminGroups } from '../../common/menu-data';
import { useFilterData } from '../../common/hooks';

const filterFields = [
  { key: 'code', label: '服务商编码', placeholder: '请输入' },
  { key: 'name', label: '服务商名称', placeholder: '请输入' },
  { key: 'adminUnit', label: '管理单位', type: 'select' as const, options: ['全部', '长庆油田分公司', '大庆油田分公司'] },
  { key: 'mgmtType', label: '服务商管理类型', type: 'select' as const, options: ['全部', '所属企业管理', '总部管理'] },
];

const columns = [
  { key: 'index', title: '序号', width: 60, align: 'center' as const, dataIndex: 'index' },
  { key: 'code', title: '服务商编码', width: 120, dataIndex: 'code', ellipsis: true },
  { key: 'name', title: '服务商名称', width: 200, dataIndex: 'name', ellipsis: true },
  { key: 'mgmtType', title: '服务商管理类型', width: 120, dataIndex: 'mgmtType', ellipsis: true },
  { key: 'adminUnit', title: '管理单位', width: 140, dataIndex: 'adminUnit', ellipsis: true },
  { key: 'status', title: '状态', width: 100, dataIndex: 'status', ellipsis: true },
  { key: 'action', title: '操作', width: 100, align: 'center' as const, dataIndex: 'action' },
];

const tableData = [
  { index: '1', code: '1000020022', name: '中海油能源发展股份有限公司', mgmtType: '所属企业管理', adminUnit: '长庆油田分公司', status: '正常', action: null },
  { index: '2', code: '1000020022', name: '杰瑞石油装备技术有限公司', mgmtType: '总部管理', adminUnit: '长庆油田分公司', status: '正常', action: null },
  { index: '3', code: '1000020022', name: '中海油能源发展股份有限公司', mgmtType: '所属企业管理', adminUnit: '长庆油田分公司', status: '已冻结', action: null },
  { index: '4', code: '1000020022', name: '杰瑞石油装备技术有限公司', mgmtType: '总部管理', adminUnit: '长庆油田分公司', status: '正常', action: null },
];

export default function FreezeApply() {
  const { token: t } = theme.useToken();
  const [searchValues, setSearchValues] = useState<Record<string, string>>({});
  const [freezeModalOpen, setFreezeModalOpen] = useState(false);
  const [freezeType, setFreezeType] = useState('请选择');
  const [freezeReason, setFreezeReason] = useState('');
  const { setFilter, filteredData } = useFilterData(tableData, filterFields);

  const processedData = filteredData.map(d => ({
    ...d,
    action: d.status === '已冻结' ? <Typography.Text type="secondary">已冻结</Typography.Text> : <Button type="link" size="small" style={{ color: '#1677ff' }} onClick={() => setFreezeModalOpen(true)}>申请冻结</Button>,
  }));

  return (
    <PortalLayout groups={adminGroups} activePath="/admin/freeze-apply" portalType="admin">
      <Typography.Text type="secondary" style={{ display: 'block', marginBottom: 8 }}>
        <Typography.Text style={{ color: t.colorPrimary }}>注册服务商审核</Typography.Text>
      </Typography.Text>
      <Typography.Title level={4}>冻结申请</Typography.Title>
      <Card size="small" variant="outlined" style={{ marginBottom: 16 }}>
        <Space direction="vertical" style={{ width: '100%' }} size={12}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 12 }}>
            {filterFields.map((f, i) => (
              <Space key={i} size={8}>
                <Typography.Text style={{ whiteSpace: 'nowrap' }}>{f.label}</Typography.Text>
                {f.type === 'select' ? (
                  <Select value={searchValues[f.key] || '全部'} onChange={v => setSearchValues(prev => ({ ...prev, [f.key]: v }))} style={{ width: 200 }}>
                    {f.options.map(o => <Select.Option key={o} value={o}>{o}</Select.Option>)}
                  </Select>
                ) : (
                  <Input placeholder={f.placeholder} style={{ width: 200 }} value={searchValues[f.key] || ''} onChange={e => setSearchValues(prev => ({ ...prev, [f.key]: e.target.value }))} />
                )}
              </Space>
            ))}
          </div>
          <Button type="primary" onClick={() => { Object.entries(searchValues).forEach(([k, v]) => setFilter(k, v)); }}>查询</Button>
        </Space>
      </Card>
      <Card size="small" variant="outlined" title="冻结申请信息">
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="服务商编码" required validateStatus="error" help="请输入服务商编码">
              <Input placeholder="请输入服务商编码" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="服务商名称">
              <Input readOnly />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="冻结类型" required>
              <Select defaultValue="请选择" style={{ width: '100%' }}>
                <Select.Option value="请选择">请选择</Select.Option>
                <Select.Option value="资质过期冻结">资质过期冻结</Select.Option>
                <Select.Option value="违规冻结">违规冻结</Select.Option>
                <Select.Option value="其他冻结">其他冻结</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="冻结原因" required>
              <Input placeholder="请输入冻结原因" />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item label="附件上传">
          <div
            style={{ border: '2px dashed ' + t.colorBorderSecondary, borderRadius: 8, padding: 24, textAlign: 'center', color: t.colorTextQuaternary, cursor: 'pointer' }}
            onClick={() => message.success('附件上传成功')}
          >
            点击或拖拽文件到此区域上传
          </div>
        </Form.Item>
      </Card>
      <Row justify="center" style={{ marginTop: 16 }}>
        <Space size={16}>
          <Button type="primary" onClick={() => { message.success('冻结申请已提交'); }}>提交</Button>
          <Button>取消</Button>
        </Space>
      </Row>
      <Modal open={freezeModalOpen} title="冻结申请" onCancel={() => setFreezeModalOpen(false)} footer={null} destroyOnClose>
        <Form layout="vertical">
          <Form.Item label="冻结类型" required>
            <Select value={freezeType} onChange={setFreezeType} style={{ width: '100%' }}>
              <Select.Option value="请选择">请选择</Select.Option>
              <Select.Option value="资质过期冻结">资质过期冻结</Select.Option>
              <Select.Option value="违规冻结">违规冻结</Select.Option>
              <Select.Option value="其他冻结">其他冻结</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="冻结原因" required>
            <Input placeholder="请输入冻结原因" value={freezeReason} onChange={e => setFreezeReason(e.target.value)} />
          </Form.Item>
          <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
            <Button onClick={() => setFreezeModalOpen(false)}>取消</Button>
            <Button type="primary" onClick={() => { message.success('冻结申请已提交'); setFreezeModalOpen(false); }}>提交</Button>
          </Space>
        </Form>
      </Modal>
    </PortalLayout>
  );
}
