/**
 * @name 现场考察管理-管理端
 */
import { useState } from 'react';
import { theme, Table, Button, Typography, Space, Row, Col, Input, Select, Card, message } from 'antd';
import PortalLayout from '../common/portal-layout';
import { inspectionGroups } from '../common/menu-data';
import { useFilterData } from '../common/hooks';

const { Text } = Typography;

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

export default function SiteInspectionManageAdmin() {
  const { token: t } = theme.useToken();
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

  return (
    <PortalLayout groups={inspectionGroups} activePath="/inspection/manage-admin" portalType="inspection">
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

      <Table columns={columns} dataSource={filteredData.map((d, i) => ({ ...d, _key: i }))} rowKey="_key" pagination={{ pageSize: 10, showSizeChanger: true, showTotal: (t: number) => `共 ${t} 条` }} bordered size="middle" />
    </PortalLayout>
  );
}
