/**
 * @name 关键人员审批
 */
import { useState } from 'react';
import { theme, Table, Typography, Row, Col, Input, Button } from 'antd';
import { useFilterData } from '../common/hooks';

const { Text } = Typography;

const columns = [
  { key: 'index', title: '序号', width: 80, align: 'center' as const, dataIndex: 'index' },
  { key: 'name', title: '姓名', dataIndex: 'name' },
  { key: 'idCard', title: '身份证号', dataIndex: 'idCard' },
  { key: 'phone', title: '手机号', dataIndex: 'phone' },
  { key: 'status', title: '状态', dataIndex: 'status', width: 120 },
  { key: 'createTime', title: '创建时间', dataIndex: 'createTime', width: 140 },
  {
    key: 'action',
    title: '操作',
    width: 140,
    render: (_: unknown, record: Record<string, unknown>) => (
      <span>
        <Typography.Link style={{ color: '#1677ff', marginRight: 4 }}>查看</Typography.Link>
        <Text style={{ margin: '0 2px' }}>、</Text>
        <Typography.Link style={{ color: '#1677ff' }} onClick={() => { record; }}>审批</Typography.Link>
      </span>
    ),
  },
];

const data = [
  { index: 1, name: '张三', idCard: '11012**********1234', phone: '13141234432', status: '待审批', createTime: '2026-06-24' },
  { index: 2, name: '王建国', idCard: '11012**********1234', phone: '13141234432', status: '待审批', createTime: '2026-06-24' },
  { index: 3, name: '张明远', idCard: '11012**********1234', phone: '13141234432', status: '待审批', createTime: '2026-06-24' },
  { index: 4, name: '张三', idCard: '11012**********1234', phone: '13141234432', status: '', createTime: '2026-06-24' },
  { index: 5, name: '王建国', idCard: '11012**********1234', phone: '13141234432', status: '', createTime: '2026-06-24' },
  { index: 6, name: '张明远', idCard: '11012**********1234', phone: '13141234432', status: '', createTime: '2026-06-24' },
];

export default function KeyPersonnelApprove() {
  const [searchName, setSearchName] = useState('');
  const [searchIdCard, setSearchIdCard] = useState('');

  const { filteredData, setFilter } = useFilterData(data, [
    { key: 'name', label: '姓名' },
    { key: 'idCard', label: '身份证号' },
  ]);

  const handleSearch = () => {
    setFilter('name', searchName);
    setFilter('idCard', searchIdCard);
  };

  return (
    <div>
      <Typography.Title level={4} style={{ marginTop: 0 }}>关键人员审批</Typography.Title>

      <div style={{ marginBottom: 16 }}>
        <Row gutter={24}>
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
      </div>

      <div style={{ marginBottom: 16 }}>
        <Button type="primary" danger onClick={() => {}}>批量审批</Button>
      </div>

      <Table
        columns={columns}
        dataSource={filteredData.map((d, i) => ({ ...d, _key: i }))}
        rowKey="_key"
        pagination={{ pageSize: 10, showSizeChanger: true, showTotal: (t: number) => `共 ${t} 条` }}
        bordered
        size="middle"
      />
    </div>
  );
}
