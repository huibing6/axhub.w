/**
 * @name 关键人员查看
 */
import { useState } from 'react';
import { theme, Table, Typography, Space, Row, Col, Input, Select, Card, Button, message } from 'antd';
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
  { index: 2, name: '王建国', idCard: '11012**********1234', phone: '13141234432', status: '待审批' },
  { index: 3, name: '张明远', idCard: '11012**********1234', phone: '13141234432', status: '已拒绝' },
  { index: 4, name: '张三', idCard: '11012**********1234', phone: '13141234432', status: '已完成' },
  { index: 5, name: '王建国', idCard: '11012**********1234', phone: '13141234432', status: '' },
  { index: 6, name: '张明远', idCard: '11012**********1234', phone: '13141234432', status: '' },
];

export default function KeyPersonnelView() {
  const { token: t } = theme.useToken();
  const [searchName, setSearchName] = useState('');
  const [searchIdCard, setSearchIdCard] = useState('');
  const [searchStatus, setSearchStatus] = useState('全部');

  const { filteredData, setFilter } = useFilterData(data, [
    { key: 'name', label: '姓名' },
    { key: 'idCard', label: '身份证号' },
    { key: 'status', label: '状态' },
  ]);

  const handleSearch = () => {
    setFilter('name', searchName);
    setFilter('idCard', searchIdCard);
    setFilter('status', searchStatus);
  };

  return (
    <PortalLayout groups={personnelGroups} activePath="/personnel/view" portalType="personnel">
      <Typography.Title level={4} style={{ marginTop: 0 }}>关键人员审批</Typography.Title>

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
            <Col span={8}>
              <Space size={8}>
                <Text>状态：</Text>
                <Select style={{ width: 200 }} value={searchStatus} onChange={setSearchStatus} options={['全部', '待提交', '待审批', '已拒绝', '已完成'].map(v => ({ value: v, label: v }))} />
              </Space>
            </Col>
          </Row>
          <Space>
            <Button type="primary" onClick={handleSearch}>查询</Button>
          </Space>
        </Space>
      </Card>

      <Table columns={columns} dataSource={filteredData.map((d, i) => ({ ...d, _key: i }))} rowKey="_key" pagination={{ pageSize: 10, showSizeChanger: true, showTotal: (t: number) => `共 ${t} 条` }} bordered size="middle" />
    </PortalLayout>
  );
}
