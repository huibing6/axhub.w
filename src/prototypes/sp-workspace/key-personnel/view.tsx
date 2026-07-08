/**
 * @name 关键人员查看
 */
import { useState } from 'react';
import { Table, Typography, Row, Col, Input, Select, Button, Card, Form, Radio, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useFilterData } from '../common/hooks';

const detailData: Record<string, Record<string, string>> = {
  '张三': { gender: '男', birthday: '1990-01-15', email: 'zhangsan@example.com', certName: '安全生产许可证', certNo: 'CERT-2024-001', certExpire: '2027-12-31', certFile: '资质证书.pdf' },
  '王建国': { gender: '男', birthday: '1985-06-20', email: 'wangjg@example.com', certName: '特种作业操作证', certNo: 'CERT-2024-002', certExpire: '2026-08-15', certFile: '特种作业证.pdf' },
  '张明远': { gender: '男', birthday: '1988-03-10', email: 'zhangmy@example.com', certName: '职业资格证书', certNo: 'CERT-2024-003', certExpire: '2028-05-20', certFile: '职业资格证.pdf' },
};

const data = [
  { index: 1, name: '张三', idCard: '11012**********1234', phone: '13141234432', status: '待提交', createTime: '2026-06-24' },
  { index: 2, name: '王建国', idCard: '11012**********1234', phone: '13141234432', status: '待审批', createTime: '2026-06-24' },
  { index: 3, name: '张明远', idCard: '11012**********1234', phone: '13141234432', status: '已拒绝', createTime: '2026-06-24' },
  { index: 4, name: '张三', idCard: '11012**********1234', phone: '13141234432', status: '已完成', createTime: '2026-06-24' },
  { index: 5, name: '王建国', idCard: '11012**********1234', phone: '13141234432', status: '', createTime: '2026-06-24' },
  { index: 6, name: '张明远', idCard: '11012**********1234', phone: '13141234432', status: '', createTime: '2026-06-24' },
];

export default function KeyPersonnelView() {
  const [view, setView] = useState<'list' | 'detail'>('list');
  const [currentRecord, setCurrentRecord] = useState<typeof data[0] | null>(null);
  const [searchName, setSearchName] = useState('');
  const [searchIdCard, setSearchIdCard] = useState('');
  const [searchStatus, setSearchStatus] = useState<string | undefined>(undefined);

  const { filteredData, setFilter } = useFilterData(data, [
    { key: 'name', label: '姓名' },
    { key: 'idCard', label: '身份证号' },
    { key: 'status', label: '状态' },
  ]);

  const handleSearch = () => {
    setFilter('name', searchName);
    setFilter('idCard', searchIdCard);
    setFilter('status', searchStatus || '');
  };

  const handleReset = () => {
    setSearchName('');
    setSearchIdCard('');
    setSearchStatus(undefined);
    setFilter('name', '');
    setFilter('idCard', '');
    setFilter('status', '');
  };

  const handleView = (record: typeof data[0]) => {
    setCurrentRecord(record);
    setView('detail');
  };

  if (view === 'detail' && currentRecord) {
    const detail = detailData[currentRecord.name] || {};
    return (
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
          <Typography.Title level={4} style={{ margin: 0 }}>关键人员查看</Typography.Title>
          <Typography.Text type="secondary" style={{ fontSize: 14 }}>查看关键人员详细信息</Typography.Text>
        </div>

        <Card variant="outlined" size="small" style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 16 }}>关键人员信息</div>
          <Form layout="vertical">
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item label="姓名">
                  <Input value={currentRecord.name} disabled />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="性别">
                  <Radio.Group value={detail.gender} disabled>
                    <Radio value="男">男</Radio>
                    <Radio value="女">女</Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item label="出生日期">
                  <Input value={detail.birthday} disabled />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="身份证号">
                  <Input value={currentRecord.idCard} disabled />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item label="联系电话">
                  <Input value={currentRecord.phone} disabled />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="电子邮箱">
                  <Input value={detail.email} disabled />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>

        <Card variant="outlined" size="small" style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 16 }}>资质信息</div>
          <Form layout="vertical">
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item label="证书名称">
                  <Input value={detail.certName} disabled />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="证书编号">
                  <Input value={detail.certNo} disabled />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item label="有效期至">
                  <Input value={detail.certExpire} disabled />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="证书文件">
                  <Upload>
                    <Button icon={<UploadOutlined />} disabled>{detail.certFile}</Button>
                  </Upload>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 16 }}>
          <Button onClick={() => setView('list')}>返回</Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Typography.Title level={4} style={{ marginTop: 0 }}>关键人员查看</Typography.Title>

      <div style={{ marginBottom: 16 }}>
        <Row gutter={24} style={{ marginBottom: 12 }}>
          <Col>
            <span style={{ marginRight: 8 }}>姓名：</span>
            <Input
              placeholder="请输入姓名"
              style={{ width: 240 }}
              value={searchName}
              onChange={e => setSearchName(e.target.value)}
              onPressEnter={handleSearch}
            />
          </Col>
          <Col>
            <span style={{ marginRight: 8 }}>身份证号</span>
            <Input
              placeholder="请输入身份证号"
              style={{ width: 240 }}
              value={searchIdCard}
              onChange={e => setSearchIdCard(e.target.value)}
              onPressEnter={handleSearch}
            />
          </Col>
        </Row>
        <Row gutter={24} style={{ marginBottom: 12 }}>
          <Col>
            <span style={{ marginRight: 8 }}>状态：</span>
            <Select
              style={{ width: 240 }}
              placeholder="全部"
              allowClear
              value={searchStatus}
              onChange={v => setSearchStatus(v)}
              options={[
                { value: '待提交', label: '待提交' },
                { value: '待审批', label: '待审批' },
                { value: '已拒绝', label: '已拒绝' },
                { value: '已完成', label: '已完成' },
              ]}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Button type="primary" onClick={handleSearch} style={{ marginRight: 8 }}>查询</Button>
            <Button onClick={handleReset}>重置</Button>
          </Col>
        </Row>
      </div>

      <Table
        columns={[
          { key: 'index', title: '序号', width: 80, align: 'center' as const, dataIndex: 'index' },
          { key: 'name', title: '姓名', dataIndex: 'name' },
          { key: 'idCard', title: '身份证号', dataIndex: 'idCard' },
          { key: 'phone', title: '手机号', dataIndex: 'phone' },
          { key: 'status', title: '状态', dataIndex: 'status', width: 120 },
          { key: 'createTime', title: '创建时间', dataIndex: 'createTime', width: 140 },
          {
            key: 'action',
            title: '操作',
            width: 100,
            render: (_: unknown, record: typeof data[0]) => (
              <Typography.Link style={{ color: '#1677ff' }} onClick={() => handleView(record)}>查看</Typography.Link>
            ),
          },
        ]}
        dataSource={filteredData.map((d, i) => ({ ...d, _key: i }))}
        rowKey="_key"
        pagination={{ pageSize: 10, showSizeChanger: true, showTotal: (t: number) => `共 ${t} 条` }}
        bordered
        size="middle"
      />
    </div>
  );
}
