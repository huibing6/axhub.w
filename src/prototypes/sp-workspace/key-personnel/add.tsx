/**
 * @name 关键人员新增
 */
import { useState } from 'react';
import { theme, Table, Button, Typography, Space, Row, Col, Input, Card, message, Modal, Form, Radio, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useFilterData } from '../common/hooks';

const { Text } = Typography;

const listData = [
  { index: 1, name: '张三', idCard: '11012**********1234', phone: '13141234432', status: '待提交', createTime: '2026-06-24' },
  { index: 2, name: '王建国', idCard: '11012**********1234', phone: '13141234432', status: '待提交', createTime: '2026-06-24' },
  { index: 3, name: '张明远', idCard: '11012**********1234', phone: '13141234432', status: '待提交', createTime: '2026-06-24' },
  { index: 4, name: '张三', idCard: '11012**********1234', phone: '13141234432', status: '', createTime: '2026-06-24' },
  { index: 5, name: '王建国', idCard: '11012**********1234', phone: '13141234432', status: '', createTime: '2026-06-24' },
  { index: 6, name: '张明远', idCard: '11012**********1234', phone: '13141234432', status: '', createTime: '2026-06-24' },
];

export default function KeyPersonnelAdd() {
  const { token: t } = theme.useToken();
  const [view, setView] = useState<'list' | 'form'>('list');
  const [form] = Form.useForm();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [searchName, setSearchName] = useState('');
  const [searchIdCard, setSearchIdCard] = useState('');

  const { filteredData, setFilter } = useFilterData(listData, [
    { key: 'name', label: '姓名' },
    { key: 'idCard', label: '身份证号' },
  ]);

  const handleSearch = () => {
    setFilter('name', searchName);
    setFilter('idCard', searchIdCard);
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

  const handleSave = () => {
    message.success('保存成功');
  };

  const handleSubmit = () => {
    form.validateFields().then(() => {
      message.success('提交成功');
      setView('list');
      form.resetFields();
    }).catch(() => {});
  };

  if (view === 'form') {
    return (
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
          <Typography.Title level={4} style={{ margin: 0 }}>关键人员新增</Typography.Title>
          <Typography.Text type="secondary" style={{ fontSize: 14 }}>新增关键人员</Typography.Text>
        </div>

        <Card variant="outlined" size="small" style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 16 }}>关键人员信息</div>
          <Form form={form} layout="vertical">
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item label="姓名" name="name">
                  <Input placeholder="请输入姓名" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="性别" name="gender" required>
                  <Radio.Group>
                    <Radio value="男">男</Radio>
                    <Radio value="女">女</Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item label="出生日期" name="birthday">
                  <Input placeholder="请输入出生日期" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="身份证号" name="idCard">
                  <Input placeholder="请输入身份证号" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item label="联系电话" name="phone">
                  <Input placeholder="请输入联系电话" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="电子邮箱" name="email" required>
                  <Input placeholder="请输入电子邮箱" />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>

        <Card variant="outlined" size="small" style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 16 }}>资质信息</div>
          <Form form={form} layout="vertical">
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item label="证书名称" name="certName">
                  <Input placeholder="请输入证书名称" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="证书编号" name="certNo" required>
                  <Input placeholder="请输入证书编号" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item label="有效期至" name="certExpire">
                  <Input placeholder="请输入有效期至" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="证书文件" name="certFile">
                  <Upload>
                    <Button type="primary" size="small" icon={<UploadOutlined />}>立即上传</Button>
                  </Upload>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 16 }}>
          <Button onClick={() => { setView('list'); form.resetFields(); }}>取消</Button>
          <Button onClick={handleSave}>保存</Button>
          <Button type="primary" danger onClick={handleSubmit}>提交</Button>
        </div>
      </div>
    );
  }

  return (
    <div>
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
        <Button type="primary" danger onClick={() => setView('form')}>新增关键人员</Button>
        <Button type="primary" danger onClick={handleBatchDelete}>批量删除</Button>
      </Space>

      <Table
        columns={[
          { key: 'index', title: '序号', width: 80, align: 'center' as const, dataIndex: 'index' },
          { key: 'name', title: '姓名', dataIndex: 'name' },
          { key: 'idCard', title: '身份证号', dataIndex: 'idCard' },
          { key: 'phone', title: '手机号', dataIndex: 'phone' },
          { key: 'status', title: '状态', dataIndex: 'status' },
          { key: 'createTime', title: '创建时间', dataIndex: 'createTime' },
          {
            key: 'action', title: '操作', width: 120, align: 'center' as const,
            render: () => (
              <Space size={4}>
                <Typography.Link>编辑</Typography.Link>
                <Typography.Text type="secondary">,</Typography.Text>
                <Typography.Link style={{ color: '#ff4d4f' }}>删除</Typography.Link>
              </Space>
            ),
          },
        ]}
        dataSource={filteredData.map((d, i) => ({ ...d, _key: i }))}
        rowKey="_key"
        pagination={{ pageSize: 10, showSizeChanger: true, showTotal: (t: number) => `共 ${t} 条` }}
        bordered
        size="middle"
        rowSelection={{ selectedRowKeys, onChange: setSelectedRowKeys }}
      />
    </div>
  );
}
