/**
 * @name 冻结申请
 */
import { useState } from 'react';
import { theme, Typography, Card, Space, Input, Button, Table, Select, Modal, Form, DatePicker, message } from 'antd';
import PortalLayout from '../../common/portal-layout';
import { adminGroups } from '../../common/menu-data';

const rawData = [
  { idx: 1, code: 'SP100001', name: '中海油能源发展股份有限公司', mgmt: '所属企业管理', status: '正常' },
  { idx: 2, code: 'SP100002', name: '杰瑞石油装备技术有限公司', mgmt: '总部管理', status: '正常' },
  { idx: 3, code: 'SP100003', name: '中海油能源发展股份有限公司', mgmt: '所属企业管理', status: '正常' },
  { idx: 4, code: 'SP100004', name: '杰瑞石油装备技术有限公司', mgmt: '总部管理', status: '正常' },
  { idx: 5, code: 'SP100005', name: '中海油能源发展股份有限公司', mgmt: '所属企业管理', status: '正常' },
  { idx: 6, code: 'SP100006', name: '杰瑞石油装备技术有限公司', mgmt: '总部管理', status: '正常' },
];

const mgmtOptions = ['所属企业管理', '总部管理'];

export default function FreezeApplyPage() {
  const { token: t } = theme.useToken();
  const [codeFilter, setCodeFilter] = useState('');
  const [nameFilter, setNameFilter] = useState('');
  const [mgmtFilter, setMgmtFilter] = useState('');
  const [freezeModalOpen, setFreezeModalOpen] = useState(false);
  const [freezeTarget, setFreezeTarget] = useState<any>(null);
  const [freezeType, setFreezeType] = useState('');
  const [freezeReason, setFreezeReason] = useState('');

  const filteredData = rawData.filter(item => {
    if (codeFilter && !item.code.toLowerCase().includes(codeFilter.toLowerCase())) return false;
    if (nameFilter && !item.name.toLowerCase().includes(nameFilter.toLowerCase())) return false;
    if (mgmtFilter && mgmtFilter !== '全部' && item.mgmt !== mgmtFilter) return false;
    return true;
  });

  const handleFreezeApply = (record: any) => {
    setFreezeTarget(record);
    setFreezeType('');
    setFreezeReason('');
    setFreezeModalOpen(true);
  };

  const handleFreezeSubmit = () => {
    if (!freezeType) {
      message.warning('请选择冻结类型');
      return;
    }
    if (!freezeReason) {
      message.warning('请填写冻结原因');
      return;
    }
    message.success('冻结申请已提交');
    setFreezeModalOpen(false);
  };

  const columns = [
    { key: 'idx', title: '序号', width: 60, align: 'center' as const, dataIndex: 'idx' },
    { key: 'code', title: '服务商编码', width: 140, dataIndex: 'code', ellipsis: true },
    { key: 'name', title: '服务商名称', width: 260, dataIndex: 'name', ellipsis: true },
    { key: 'mgmt', title: '管理单位', width: 140, dataIndex: 'mgmt', ellipsis: true },
    { key: 'status', title: '状态', width: 100, dataIndex: 'status', ellipsis: true },
    { key: 'action', title: '操作', width: 100, align: 'center' as const, render: (_: any, record: any) => <Button type="link" onClick={() => handleFreezeApply(record)}>申请冻结</Button> },
  ];

  return (
    <PortalLayout groups={adminGroups} activePath="/admin/freeze-apply" portalType="admin">
      <Card variant="outlined" size="small">
        <Space direction="vertical" style={{ width: '100%' }} size={16}>
          <Typography.Title level={4} style={{ margin: 0 }}>冻结申请</Typography.Title>
          <Card size="small" variant="outlined" style={{ marginBottom: 0 }}>
            <Space direction="vertical" style={{ width: '100%' }} size={12}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 12 }}>
                <Space size={8}>
                  <Typography.Text style={{ whiteSpace: 'nowrap' }}>服务商编码</Typography.Text>
                  <Input placeholder="请输入服务商编码" style={{ width: 200 }} value={codeFilter} onChange={e => setCodeFilter(e.target.value)} />
                </Space>
                <Space size={8}>
                  <Typography.Text style={{ whiteSpace: 'nowrap' }}>服务商名称</Typography.Text>
                  <Input placeholder="请输入服务商名称" style={{ width: 200 }} value={nameFilter} onChange={e => setNameFilter(e.target.value)} />
                </Space>
                <Space size={8}>
                  <Typography.Text style={{ whiteSpace: 'nowrap' }}>管理单位</Typography.Text>
                  <Select style={{ width: 200 }} value={mgmtFilter || '全部'} onChange={setMgmtFilter}>
                    <Select.Option value="全部">全部</Select.Option>
                    {mgmtOptions.map(o => <Select.Option key={o} value={o}>{o}</Select.Option>)}
                  </Select>
                </Space>
              </div>
            </Space>
          </Card>
          <Table
            columns={columns}
            dataSource={filteredData.map((d, i) => ({ ...d, _key: i }))}
            rowKey="_key"
            pagination={{ pageSize: 10, showSizeChanger: true, showTotal: (t: number) => `共 ${t} 条` }}
            bordered
            size="middle"
          />
        </Space>
      </Card>
      <Modal
        open={freezeModalOpen}
        title="申请冻结"
        onCancel={() => setFreezeModalOpen(false)}
        onOk={handleFreezeSubmit}
        destroyOnClose
      >
        <Space direction="vertical" style={{ width: '100%' }} size={12}>
          {freezeTarget && (
            <Typography.Text strong>
              服务商：{freezeTarget.name}（{freezeTarget.code}）
            </Typography.Text>
          )}
          <Form.Item label="冻结类型" required>
            <Select style={{ width: '100%' }} value={freezeType || undefined} onChange={setFreezeType} placeholder="请选择冻结类型">
              <Select.Option value="交易冻结">交易冻结</Select.Option>
              <Select.Option value="全面冻结">全面冻结</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="冻结原因" required>
            <Input.TextArea rows={3} value={freezeReason} onChange={e => setFreezeReason(e.target.value)} placeholder="请输入冻结原因" />
          </Form.Item>
          <Form.Item label="预计解冻日期">
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item label="附件上传">
            <Input placeholder="请选择文件" />
          </Form.Item>
        </Space>
      </Modal>
    </PortalLayout>
  );
}
