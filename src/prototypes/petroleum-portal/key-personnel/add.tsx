/**
 * @name 关键人员新增
 */
import { useState } from 'react';
import { theme, Table, Button, Typography, Space, Row, Col, Input, Card, message, Modal, Form } from 'antd';
import PortalLayout from '../common/portal-layout';
import { personnelGroups } from '../common/menu-data';
import { useFilterData } from '../common/hooks';

const { Text } = Typography;

const columns = [
  { key: 'index', title: '序号', width: 80, align: 'center' as const, dataIndex: 'index' },
  { key: 'name', title: '姓名', dataIndex: 'name' },
  { key: 'idCard', title: '身份证号', dataIndex: 'idCard' },
  { key: 'phone', title: '手机号', dataIndex: 'phone' },
  { key: 'status', title: '状态', dataIndex: 'status' },
];

const data = [
  { index: 1, name: '张三', idCard: '11012**********1234', phone: '13141234432', status: '待提交' },
  { index: 2, name: '王建国', idCard: '11012**********1234', phone: '13141234432', status: '' },
  { index: 3, name: '张明远', idCard: '11012**********1234', phone: '13141234432', status: '待提交' },
  { index: 4, name: '张三', idCard: '11012**********1234', phone: '13141234432', status: '' },
  { index: 5, name: '王建国', idCard: '11012**********1234', phone: '13141234432', status: '' },
  { index: 6, name: '张明远', idCard: '11012**********1234', phone: '13141234432', status: '' },
];

export default function KeyPersonnelAdd() {
  const { token: t } = theme.useToken();
  const [modalOpen, setModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [searchName, setSearchName] = useState('');
  const [searchIdCard, setSearchIdCard] = useState('');

  const { filteredData, setFilter } = useFilterData(data, [
    { key: 'name', label: '姓名' },
    { key: 'idCard', label: '身份证号' },
    { key: 'phone', label: '手机号' },
    { key: 'position', label: '岗位' },
  ]);

  const handleSearch = () => {
    setFilter('name', searchName);
    setFilter('idCard', searchIdCard);
  };

  const handleAdd = () => {
    form.validateFields().then(() => {
      message.success('关键人员已添加');
      setModalOpen(false);
      form.resetFields();
    }).catch(() => {});
  };

  const handleBatchDelete = () => {
    if (selectedRowKeys.length === 0) {
      message.warning('请先选择要删除的人员');
      return;
    }
    Modal.confirm({
      title: '确认删除',
      content: `确定要删除选中的 ${selectedRowKeys.length} 个人员吗？`,
      onOk: () => {
        message.success('已删除选中人员');
        setSelectedRowKeys([]);
      },
    });
  };

  return (
    <PortalLayout groups={personnelGroups} activePath="/personnel/add" portalType="personnel">
      <Typography.Title level={4} style={{ marginTop: 0 }}>关键人员新增</Typography.Title>

      <Card size="small" style={{ marginBottom: 16 }} variant="outlined">
        <Space direction="vertical" style={{ width: '100%' }} size={12}>
          <Row gutter={16}>
            <Col span={8}>
              <Space size={8}>
                <Text>姓名：</Text>
                <Input placeholder="请输入姓名" style={{ width: 200 }} value={searchName} onChange={e => setSearchName(e.target.value)} />
              </Space>
            </Col>
            <Col span={8}>
              <Space size={8}>
                <Text>身份证号</Text>
                <Input placeholder="请输入身份证号" style={{ width: 200 }} value={searchIdCard} onChange={e => setSearchIdCard(e.target.value)} />
              </Space>
            </Col>
          </Row>
          <Space>
            <Button type="primary" onClick={handleSearch}>查询</Button>
          </Space>
        </Space>
      </Card>

      <Space style={{ marginBottom: 16 }}>
        <Button type="primary" onClick={() => setModalOpen(true)}>新增关键人员</Button>
        <Button onClick={handleBatchDelete}>批量删除</Button>
      </Space>

      <Table
        columns={columns}
        dataSource={filteredData.map((d, i) => ({ ...d, _key: i }))}
        rowKey="_key"
        pagination={{ pageSize: 10, showSizeChanger: true, showTotal: (t: number) => `共 ${t} 条` }}
        bordered
        size="middle"
        rowSelection={{ selectedRowKeys, onChange: setSelectedRowKeys }}
      />

      <Modal
        title="新增关键人员"
        open={modalOpen}
        onOk={handleAdd}
        onCancel={() => { setModalOpen(false); form.resetFields(); }}
        destroyOnClose
      >
        <Form form={form} layout="vertical">
          <Form.Item label="姓名" name="name" rules={[{ required: true, message: '请输入姓名' }]}>
            <Input placeholder="请输入姓名" />
          </Form.Item>
          <Form.Item label="身份证号" name="idCard">
            <Input placeholder="请输入身份证号" />
          </Form.Item>
          <Form.Item label="手机号" name="phone">
            <Input placeholder="请输入手机号" />
          </Form.Item>
          <Form.Item label="岗位" name="position">
            <Input placeholder="请输入岗位" />
          </Form.Item>
        </Form>
      </Modal>
    </PortalLayout>
  );
}
