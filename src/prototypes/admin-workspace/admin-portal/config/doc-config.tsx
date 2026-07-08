/**
 * @name 要件配置
 */
import { useState } from 'react';
import { Typography, Select, Button, Table, Card, Row, Col, Space, Checkbox } from 'antd';
import PortalLayout from '../../common/portal-layout';
import { adminGroups } from '../../common/menu-data';

const allData = [
  { seq: 1, type: '服务商新增准入', noApproval: false },
  { seq: 2, type: '公开招标采购项目中标', noApproval: false },
  { seq: 3, type: '服务商更名', noApproval: false },
  { seq: 4, type: '所属企业评审增项', noApproval: false },
  { seq: 5, type: '服务商更名审核', noApproval: false },
];

export default function DocConfig() {
  const [selectedType, setSelectedType] = useState<string | undefined>(undefined);
  const [data, setData] = useState(allData);

  const handleReset = () => {
    setSelectedType(undefined);
    setData(allData);
  };

  const handleToggle = (seq: number) => {
    setData(prev => prev.map(d => d.seq === seq ? { ...d, noApproval: !d.noApproval } : d));
  };

  const filteredData = selectedType ? data.filter(d => d.type === selectedType) : data;

  return (
    <PortalLayout groups={adminGroups} activePath="/admin/doc-config" portalType="admin">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <Typography.Title level={4} style={{ margin: 0 }}>要件配置</Typography.Title>
      </div>

      <Card size="small" variant="outlined" style={{ marginBottom: 16 }}>
        <Row gutter={24} align="middle">
          <Col>
            <Space size={8}>
              <Typography.Text style={{ whiteSpace: 'nowrap' }}>工作单类型：</Typography.Text>
              <Select
                style={{ width: 200 }}
                placeholder="请选择"
                allowClear
                value={selectedType}
                onChange={setSelectedType}
                options={allData.map(d => ({ value: d.type, label: d.type }))}
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
          { key: 'type', title: '工作单类型', dataIndex: 'type', width: 300 },
          {
            key: 'noApproval',
            title: '不审批走备案',
            dataIndex: 'noApproval',
            width: 150,
            align: 'center' as const,
            render: (val: boolean, record) => (
              <Checkbox checked={val} onChange={() => handleToggle(record.seq)} />
            ),
          },
          {
            key: 'action',
            title: '操作',
            width: 100,
            render: () => <Typography.Link style={{ color: '#1677ff' }}>设置</Typography.Link>,
          },
        ]}
        dataSource={filteredData}
        rowKey="seq"
        bordered
        size="middle"
        pagination={false}
      />
    </PortalLayout>
  );
}
