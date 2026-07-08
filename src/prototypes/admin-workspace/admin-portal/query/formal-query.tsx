/**
 * @name 正式服务商查询
 */
import { useState } from 'react';
import { Typography, Input, Select, Button, Table, Card, Row, Col, Tabs, Form, Tag, Space } from 'antd';
import PortalLayout from '../../common/portal-layout';
import { adminGroups } from '../../common/menu-data';

const data = [
  { seq: 1, code: '1000020022', name: '中海油能源发展股份有限公司', mgmtType: '所属企业管理', unit: '长庆油田', status: '正常', admitType: '公开招标采购中标', creditCode: '91420000706802345X', regTime: '2025-12-19 09:15', admitTime: '2025-12-19 09:15' },
  { seq: 2, code: '1000020022', name: '杰瑞石油装备技术有限公司', mgmtType: '总部管理', unit: '', status: '暂停', admitType: '其他公开方式', creditCode: '91420000706802345X', regTime: '2025-12-17 15:03', admitTime: '2025-12-17 15:03' },
  { seq: 3, code: '1000020022', name: '中海油能源发展股份有限公司', mgmtType: '所属企业管理', unit: '', status: '取消', admitType: '', creditCode: '91420000706802345X', regTime: '2025-12-19 09:15', admitTime: '2025-12-19 09:15' },
  { seq: 4, code: '1000020022', name: '杰瑞石油装备技术有限公司', mgmtType: '总部管理', unit: '', status: '', admitType: '', creditCode: '91420000706802345X', regTime: '2025-12-17 15:03', admitTime: '2025-12-17 15:03' },
  { seq: 5, code: '1000020022', name: '中海油能源发展股份有限公司', mgmtType: '', unit: '', status: '', admitType: '', creditCode: '91420000706802345X', regTime: '2025-12-19 09:15', admitTime: '2025-12-19 09:15' },
  { seq: 6, code: '', name: '杰瑞石油装备技术有限公司', mgmtType: '', unit: '', status: '', admitType: '', creditCode: '91420000706802345X', regTime: '2025-12-17 15:03', admitTime: '2025-12-17 15:03' },
];

const statusColors: Record<string, string> = {
  '正常': 'success',
  '暂停': 'warning',
  '取消': 'default',
};

const basicInfoData = {
  code: '1000020022',
  name: '中海油能源发展股份有限公司',
  creditCode: '91420000706802345X',
  mgmtType: '所属企业管理',
  unit: '长庆油田',
  status: '正常',
  admitType: '公开招标采购中标',
  legalPerson: '张三',
  regAddress: '北京市朝阳区',
  contactPerson: '李四',
  contactPhone: '13800138000',
};

const categoryData = [
  { seq: 1, code: 'SV001', name: '市政绿化服务', level: '一级', type: '通用' },
  { seq: 2, code: 'SV002', name: '租赁服务', level: '二级', type: '通用' },
];

const qualData = [
  { seq: 1, certName: '安全生产许可证', certNo: 'CERT-2024-001', expireDate: '2027-12-31' },
  { seq: 2, certName: '特种作业操作证', certNo: 'CERT-2024-002', expireDate: '2026-08-15' },
];

const reqData = [
  { seq: 1, docName: '营业执照', docType: '基础要件', status: '已上传' },
  { seq: 2, docName: '资质证书', docType: '资质要件', status: '已上传' },
];

const mdgData = [
  { seq: 1, mdgCode: 'MDG001', mdgName: '供应商基本信息', status: '已同步' },
  { seq: 2, mdgCode: 'MDG002', mdgName: '供应商资质信息', status: '已同步' },
];

export default function FormalQuery() {
  const [view, setView] = useState<'list' | 'detail'>('list');
  const [activeTab, setActiveTab] = useState('basic');
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

  if (view === 'detail') {
    return (
      <PortalLayout groups={adminGroups} activePath="/admin/formal-query" portalType="admin">
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
          <Typography.Title level={4} style={{ margin: 0 }}>正式服务商查看</Typography.Title>
        </div>

        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          items={[
            {
              key: 'basic',
              label: '基础信息',
              children: (
                <Card variant="outlined" size="small">
                  <Form layout="vertical">
                    <Row gutter={24}>
                      <Col span={12}>
                        <Form.Item label="服务商编码">
                          <Input value={basicInfoData.code} disabled />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item label="服务商名称">
                          <Input value={basicInfoData.name} disabled />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row gutter={24}>
                      <Col span={12}>
                        <Form.Item label="统一社会信用代码">
                          <Input value={basicInfoData.creditCode} disabled />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item label="服务商管理类型">
                          <Input value={basicInfoData.mgmtType} disabled />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row gutter={24}>
                      <Col span={12}>
                        <Form.Item label="管理单位">
                          <Input value={basicInfoData.unit} disabled />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item label="状态">
                          <Input value={basicInfoData.status} disabled />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row gutter={24}>
                      <Col span={12}>
                        <Form.Item label="准入类型">
                          <Input value={basicInfoData.admitType} disabled />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item label="法定代表人">
                          <Input value={basicInfoData.legalPerson} disabled />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row gutter={24}>
                      <Col span={12}>
                        <Form.Item label="注册地址">
                          <Input value={basicInfoData.regAddress} disabled />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item label="联系人">
                          <Input value={basicInfoData.contactPerson} disabled />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row gutter={24}>
                      <Col span={12}>
                        <Form.Item label="联系电话">
                          <Input value={basicInfoData.contactPhone} disabled />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Form>
                </Card>
              ),
            },
            {
              key: 'category',
              label: '服务品类',
              children: (
                <Table
                  columns={[
                    { key: 'seq', title: '序号', width: 60, align: 'center' as const, dataIndex: 'seq' },
                    { key: 'code', title: '服务品类编码', dataIndex: 'code' },
                    { key: 'name', title: '服务品类名称', dataIndex: 'name' },
                    { key: 'level', title: '服务品类级别', dataIndex: 'level' },
                    { key: 'type', title: '服务品类类型', dataIndex: 'type' },
                  ]}
                  dataSource={categoryData}
                  rowKey="seq"
                  bordered
                  size="middle"
                  pagination={false}
                />
              ),
            },
            {
              key: 'qual',
              label: '资质信息',
              children: (
                <Table
                  columns={[
                    { key: 'seq', title: '序号', width: 60, align: 'center' as const, dataIndex: 'seq' },
                    { key: 'certName', title: '证书名称', dataIndex: 'certName' },
                    { key: 'certNo', title: '证书编号', dataIndex: 'certNo' },
                    { key: 'expireDate', title: '有效期至', dataIndex: 'expireDate' },
                    { key: 'file', title: '证书文件', render: () => <Typography.Link style={{ color: '#1677ff' }}>查看</Typography.Link> },
                  ]}
                  dataSource={qualData}
                  rowKey="seq"
                  bordered
                  size="middle"
                  pagination={false}
                />
              ),
            },
            {
              key: 'req',
              label: '要件信息',
              children: (
                <Table
                  columns={[
                    { key: 'seq', title: '序号', width: 60, align: 'center' as const, dataIndex: 'seq' },
                    { key: 'docName', title: '要件名称', dataIndex: 'docName' },
                    { key: 'docType', title: '要件类型', dataIndex: 'docType' },
                    { key: 'status', title: '状态', dataIndex: 'status' },
                  ]}
                  dataSource={reqData}
                  rowKey="seq"
                  bordered
                  size="middle"
                  pagination={false}
                />
              ),
            },
            {
              key: 'mdg',
              label: 'MDG信息',
              children: (
                <Table
                  columns={[
                    { key: 'seq', title: '序号', width: 60, align: 'center' as const, dataIndex: 'seq' },
                    { key: 'mdgCode', title: 'MDG编码', dataIndex: 'mdgCode' },
                    { key: 'mdgName', title: 'MDG名称', dataIndex: 'mdgName' },
                    { key: 'status', title: '同步状态', dataIndex: 'status' },
                  ]}
                  dataSource={mdgData}
                  rowKey="seq"
                  bordered
                  size="middle"
                  pagination={false}
                />
              ),
            },
          ]}
        />

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 16 }}>
          <Button onClick={() => setView('list')}>返回</Button>
        </div>
      </PortalLayout>
    );
  }

  return (
    <PortalLayout groups={adminGroups} activePath="/admin/formal-query" portalType="admin">
      <Typography.Title level={4}>正式服务商查询</Typography.Title>

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
          { key: 'mgmtType', title: '服务商管理类型', dataIndex: 'mgmtType', width: 140 },
          { key: 'unit', title: '管理单位', dataIndex: 'unit', width: 100 },
          {
            key: 'status',
            title: '状态',
            dataIndex: 'status',
            width: 80,
            align: 'center' as const,
            render: (val: string) => val ? <Tag color={statusColors[val] || 'default'}>{val}</Tag> : '',
          },
          { key: 'admitType', title: '准入类型', dataIndex: 'admitType', width: 160 },
          { key: 'creditCode', title: '统一社会信用代码', dataIndex: 'creditCode', width: 180 },
          { key: 'regTime', title: '注册时间', dataIndex: 'regTime', width: 160 },
          { key: 'admitTime', title: '准入时间', dataIndex: 'admitTime', width: 160 },
          {
            key: 'action',
            title: '操作',
            width: 100,
            align: 'center' as const,
            render: () => (
              <Typography.Link style={{ color: '#1677ff' }} onClick={() => setView('detail')}>详细信息</Typography.Link>
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
