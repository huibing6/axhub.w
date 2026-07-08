/**
 * @name 流程查询
 */
import { useState } from 'react';
import { Typography, Input, Select, Button, Table, Card, Row, Col, Tabs, Space } from 'antd';
import PortalLayout from '../../common/portal-layout';
import { adminGroups } from '../../common/menu-data';

const spData = [
  { seq: 1, code: '1000020022', name: '中海油能源发展股份有限公司', mgmtType: '所属企业管理', unit: '长庆油田', spStatus: '正常', flow: '注册流程', flowStatus: '待提交', submitter: '阿三', submitTime: '2025-12-19 09:15', flowUnit: '', creditCode: '91420000706802345X' },
  { seq: 2, code: '1000020022', name: '杰瑞石油装备技术有限公司', mgmtType: '总部管理', unit: '', spStatus: '暂停', flow: '准入流程', flowStatus: '待复核', submitter: '', submitTime: '2025-12-17 15:03', flowUnit: '', creditCode: '91420000706802345X' },
  { seq: 3, code: '1000020022', name: '中海油能源发展股份有限公司', mgmtType: '所属企业管理', unit: '', spStatus: '取消', flow: '服务商信息变更流程', flowStatus: '已拒绝', submitter: '', submitTime: '2025-12-19 09:15', flowUnit: '', creditCode: '91420000706802345X' },
  { seq: 4, code: '1000020022', name: '杰瑞石油装备技术有限公司', mgmtType: '总部管理', unit: '', spStatus: '', flow: '资质变更流程', flowStatus: '', submitter: '', submitTime: '2025-12-17 15:03', flowUnit: '', creditCode: '91420000706802345X' },
  { seq: 5, code: '1000020022', name: '中海油能源发展股份有限公司', mgmtType: '', unit: '', spStatus: '', flow: '冻结流程', flowStatus: '', submitter: '', submitTime: '2025-12-19 09:15', flowUnit: '', creditCode: '91420000706802345X' },
  { seq: 6, code: '', name: '杰瑞石油装备技术有限公司', mgmtType: '', unit: '', spStatus: '', flow: '解冻流程', flowStatus: '', submitter: '', submitTime: '', flowUnit: '', creditCode: '91420000706802345X' },
];

const catData = [
  { seq: 1, code: '1000020022', name: '中海油能源发展股份有限公司', catCode: 'S100010', catName: '租赁服务', dirType: '通用', dirLevel: '一级', dirStatus: '正常', spStatus: '正常', catStatus: '正常', flow: '产品信息变更', flowStatus: '待提交', flowUnit: '长庆油田', creditCode: '91420000706802345X', startTime: '2025-12-19 09:15' },
  { seq: 2, code: '1000020022', name: '杰瑞石油装备技术有限公司', catCode: 'S100010', catName: '租赁服务', dirType: '专业', dirLevel: '二级', dirStatus: '暂停', spStatus: '冻结', catStatus: '冻结', flow: '', flowStatus: '待复核', flowUnit: '', creditCode: '91420000706802345X', startTime: '2025-12-17 15:03' },
  { seq: 3, code: '1000020022', name: '中海油能源发展股份有限公司', catCode: 'S100010', catName: '租赁服务', dirType: '通用', dirLevel: '一级', dirStatus: '', spStatus: '取消', catStatus: '', flow: '', flowStatus: '已拒绝', flowUnit: '', creditCode: '91420000706802345X', startTime: '2025-12-19 09:15' },
  { seq: 4, code: '1000020022', name: '杰瑞石油装备技术有限公司', catCode: 'S100010', catName: '租赁服务', dirType: '专业', dirLevel: '二级', dirStatus: '', spStatus: '', catStatus: '', flow: '', flowStatus: '', flowUnit: '', creditCode: '91420000706802345X', startTime: '2025-12-17 15:03' },
  { seq: 5, code: '1000020022', name: '中海油能源发展股份有限公司', catCode: 'S100010', catName: '租赁服务', dirType: '', dirLevel: '', dirStatus: '', spStatus: '', catStatus: '', flow: '', flowStatus: '', flowUnit: '', creditCode: '91420000706802345X', startTime: '2025-12-19 09:15' },
  { seq: 6, code: '', name: '杰瑞石油装备技术有限公司', catCode: '', catName: '', dirType: '', dirLevel: '', dirStatus: '', spStatus: '', catStatus: '', flow: '', flowStatus: '', flowUnit: '', creditCode: '91420000706802345X', startTime: '2025-12-17 15:03' },
];

export default function ProcessQuery() {
  const [activeTab, setActiveTab] = useState('sp');
  const [searchName, setSearchName] = useState('');
  const [searchMgmtType, setSearchMgmtType] = useState<string | undefined>(undefined);
  const [searchFlowStatus, setSearchFlowStatus] = useState<string | undefined>(undefined);
  const [searchSubmitter, setSearchSubmitter] = useState('');

  const currentData = activeTab === 'sp' ? spData : catData;
  const filteredData = currentData.filter(d => {
    if (searchName && !d.name.includes(searchName)) return false;
    return true;
  });

  const handleReset = () => {
    setSearchName('');
    setSearchMgmtType(undefined);
    setSearchFlowStatus(undefined);
    setSearchSubmitter('');
  };

  const spColumns = [
    { key: 'seq', title: '序号', width: 60, align: 'center' as const, dataIndex: 'seq' },
    { key: 'code', title: '服务商编码', dataIndex: 'code', width: 120 },
    { key: 'name', title: '服务商名称', dataIndex: 'name', ellipsis: true },
    { key: 'mgmtType', title: '服务商管理类型', dataIndex: 'mgmtType', width: 140 },
    { key: 'unit', title: '管理单位', dataIndex: 'unit', width: 100 },
    { key: 'spStatus', title: '服务商状态', dataIndex: 'spStatus', width: 100, align: 'center' as const },
    { key: 'flow', title: '流程', dataIndex: 'flow', width: 160, ellipsis: true },
    { key: 'flowStatus', title: '流程状态', dataIndex: 'flowStatus', width: 100, align: 'center' as const },
    { key: 'submitter', title: '提交人', dataIndex: 'submitter', width: 80 },
    { key: 'submitTime', title: '提交时间', dataIndex: 'submitTime', width: 140 },
    { key: 'flowUnit', title: '流程发起单位', dataIndex: 'flowUnit', width: 120 },
    { key: 'creditCode', title: '统一社会信用代码', dataIndex: 'creditCode', width: 180 },
    {
      key: 'action', title: '操作', width: 80, align: 'center' as const,
      render: () => <Typography.Link style={{ color: '#1677ff' }}>查看</Typography.Link>,
    },
  ];

  const catColumns = [
    { key: 'seq', title: '序号', width: 60, align: 'center' as const, dataIndex: 'seq' },
    { key: 'code', title: '服务商编码', dataIndex: 'code', width: 120 },
    { key: 'name', title: '服务商名称', dataIndex: 'name', ellipsis: true },
    { key: 'catCode', title: '服务分类码', dataIndex: 'catCode', width: 110 },
    { key: 'catName', title: '服务分类名称', dataIndex: 'catName', width: 120 },
    { key: 'dirType', title: '目录类型', dataIndex: 'dirType', width: 90, align: 'center' as const },
    { key: 'dirLevel', title: '目录级别', dataIndex: 'dirLevel', width: 90, align: 'center' as const },
    { key: 'dirStatus', title: '目录状态', dataIndex: 'dirStatus', width: 90, align: 'center' as const },
    { key: 'spStatus', title: '服务商状态', dataIndex: 'spStatus', width: 100, align: 'center' as const },
    { key: 'catStatus', title: '服务品类状态', dataIndex: 'catStatus', width: 110, align: 'center' as const },
    { key: 'flow', title: '流程', dataIndex: 'flow', width: 140, ellipsis: true },
    { key: 'flowStatus', title: '流程状态', dataIndex: 'flowStatus', width: 100, align: 'center' as const },
    { key: 'flowUnit', title: '流程发起单位', dataIndex: 'flowUnit', width: 120 },
    { key: 'startTime', title: '发起时间', dataIndex: 'startTime', width: 140 },
    { key: 'creditCode', title: '统一社会信用代码', dataIndex: 'creditCode', width: 180 },
    {
      key: 'action', title: '操作', width: 80, align: 'center' as const,
      render: () => <Typography.Link style={{ color: '#1677ff' }}>查看</Typography.Link>,
    },
  ];

  const currentColumns = activeTab === 'sp' ? spColumns : catColumns;

  return (
    <PortalLayout groups={adminGroups} activePath="/admin/process-query" portalType="admin">
      <Typography.Title level={4}>流程查询</Typography.Title>

      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        items={[
          { key: 'sp', label: <span style={{ color: activeTab === 'sp' ? '#ff4d4f' : undefined }}>服务商流程查询</span> },
          { key: 'cat', label: <span style={{ color: activeTab === 'cat' ? '#ff4d4f' : undefined }}>服务品类流程查询</span> },
        ]}
      />

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
                value={searchFlowStatus}
                onChange={setSearchFlowStatus}
                options={[
                  { value: '待提交', label: '待提交' },
                  { value: '待复核', label: '待复核' },
                  { value: '已拒绝', label: '已拒绝' },
                  { value: '已通过', label: '已通过' },
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
        columns={currentColumns}
        dataSource={filteredData}
        rowKey="seq"
        pagination={{ pageSize: 10, showSizeChanger: true, showTotal: (t) => `共 ${t} 条` }}
        bordered
        size="middle"
        scroll={{ x: 1600 }}
      />
    </PortalLayout>
  );
}
