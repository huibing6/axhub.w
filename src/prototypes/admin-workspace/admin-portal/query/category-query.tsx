/**
 * @name 准入服务品类查询
 */
import { useState } from 'react';
import { Typography, Input, Select, Button, Table, Card, Row, Col, Space } from 'antd';
import PortalLayout from '../../common/portal-layout';
import { adminGroups } from '../../common/menu-data';

const data = [
  { seq: 1, code: '1000020022', name: '中海油能源发展股份有限公司', catCode: 'S100010', catName: '租赁服务', dirType: '通用', dirLevel: '一级', dirStatus: '正常', spStatus: '正常', mgmtUnit: '91420000706802345X', admitTime: '2025-12-19 09:15' },
  { seq: 2, code: '1000020022', name: '杰瑞石油装备技术有限公司', catCode: 'S100010', catName: '租赁服务', dirType: '专业', dirLevel: '二级', dirStatus: '暂停', spStatus: '冻结', mgmtUnit: '91420000706802345X', admitTime: '2025-12-17 15:03' },
  { seq: 3, code: '1000020022', name: '中海油能源发展股份有限公司', catCode: 'S100010', catName: '租赁服务', dirType: '通用', dirLevel: '一级', dirStatus: '', spStatus: '取消', mgmtUnit: '91420000706802345X', admitTime: '2025-12-19 09:15' },
  { seq: 4, code: '1000020022', name: '杰瑞石油装备技术有限公司', catCode: 'S100010', catName: '租赁服务', dirType: '专业', dirLevel: '二级', dirStatus: '', spStatus: '', mgmtUnit: '91420000706802345X', admitTime: '2025-12-17 15:03' },
  { seq: 5, code: '1000020022', name: '中海油能源发展股份有限公司', catCode: 'S100010', catName: '租赁服务', dirType: '', dirLevel: '', dirStatus: '', spStatus: '', mgmtUnit: '91420000706802345X', admitTime: '2025-12-19 09:15' },
  { seq: 6, code: '', name: '杰瑞石油装备技术有限公司', catCode: '', catName: '', dirType: '', dirLevel: '', dirStatus: '', spStatus: '', mgmtUnit: '91420000706802345X', admitTime: '2025-12-17 15:03' },
];

export default function CategoryQuery() {
  const [searchName, setSearchName] = useState('');
  const [searchMgmtType, setSearchMgmtType] = useState<string | undefined>(undefined);
  const [searchStatus, setSearchStatus] = useState<string | undefined>(undefined);
  const [searchSubmitter, setSearchSubmitter] = useState('');

  const filteredData = data.filter(d => {
    if (searchName && !d.name.includes(searchName)) return false;
    return true;
  });

  const handleReset = () => {
    setSearchName('');
    setSearchMgmtType(undefined);
    setSearchStatus(undefined);
    setSearchSubmitter('');
  };

  return (
    <PortalLayout groups={adminGroups} activePath="/admin/category-query" portalType="admin">
      <Typography.Title level={4}>准入服务分类查询</Typography.Title>

      <Card size="small" variant="outlined" style={{ marginBottom: 16 }}>
        <Row gutter={24} style={{ marginBottom: 12 }}>
          <Col>
            <Space size={8}>
              <Typography.Text style={{ whiteSpace: 'nowrap' }}>服务商名称</Typography.Text>
              <Input
                placeholder="请输入服务商名称"
                style={{ width: 200 }}
                value={searchName}
                onChange={e => setSearchName(e.target.value)}
              />
            </Space>
          </Col>
          <Col>
            <Space size={8}>
              <Typography.Text style={{ whiteSpace: 'nowrap' }}>服务商管理类型</Typography.Text>
              <Select
                style={{ width: 200 }}
                placeholder="全部"
                allowClear
                value={searchMgmtType}
                onChange={setSearchMgmtType}
                options={[
                  { value: '所属企业管理', label: '所属企业管理' },
                  { value: '总部管理', label: '总部管理' },
                ]}
              />
            </Space>
          </Col>
          <Col>
            <Space size={8}>
              <Typography.Text style={{ whiteSpace: 'nowrap' }}>流程状态</Typography.Text>
              <Select
                style={{ width: 200 }}
                placeholder="全部"
                allowClear
                value={searchStatus}
                onChange={setSearchStatus}
                options={[
                  { value: '正常', label: '正常' },
                  { value: '暂停', label: '暂停' },
                  { value: '取消', label: '取消' },
                ]}
              />
            </Space>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col>
            <Space size={8}>
              <Typography.Text style={{ whiteSpace: 'nowrap' }}>提交人</Typography.Text>
              <Input
                placeholder="请输入提交人"
                style={{ width: 200 }}
                value={searchSubmitter}
                onChange={e => setSearchSubmitter(e.target.value)}
              />
            </Space>
          </Col>
          <Col>
            <Space size={8}>
              <Button type="primary" danger>查询</Button>
              <Button onClick={handleReset}>重置</Button>
            </Space>
          </Col>
        </Row>
      </Card>

      <Table
        columns={[
          { key: 'seq', title: '序号', width: 60, align: 'center' as const, dataIndex: 'seq' },
          { key: 'code', title: '服务商编码', dataIndex: 'code', width: 120 },
          { key: 'name', title: '服务商名称', dataIndex: 'name', ellipsis: true },
          { key: 'catCode', title: '服务分类码', dataIndex: 'catCode', width: 110 },
          { key: 'catName', title: '服务分类名称', dataIndex: 'catName', width: 120 },
          { key: 'dirType', title: '目录类型', dataIndex: 'dirType', width: 90, align: 'center' as const },
          { key: 'dirLevel', title: '目录级别', dataIndex: 'dirLevel', width: 90, align: 'center' as const },
          { key: 'dirStatus', title: '目录状态', dataIndex: 'dirStatus', width: 90, align: 'center' as const },
          { key: 'spStatus', title: '服务商状态', dataIndex: 'spStatus', width: 100, align: 'center' as const },
          { key: 'mgmtUnit', title: '服务商管理单位', dataIndex: 'mgmtUnit', width: 160 },
          { key: 'admitTime', title: '准入时间', dataIndex: 'admitTime', width: 140 },
          {
            key: 'action',
            title: '操作',
            width: 100,
            align: 'center' as const,
            render: () => (
              <Typography.Link style={{ color: '#1677ff' }}>详细信息</Typography.Link>
            ),
          },
        ]}
        dataSource={filteredData}
        rowKey="seq"
        pagination={{ pageSize: 10, showSizeChanger: true, showTotal: (t) => `共 ${t} 条` }}
        bordered
        size="middle"
        scroll={{ x: 1400 }}
      />
    </PortalLayout>
  );
}
