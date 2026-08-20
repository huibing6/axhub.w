/** @name 要件配置 */
import { useState } from 'react';
import { Typography, Input, Select, Button, Table, Card, Row, Col, Checkbox, Space } from 'antd';

const allDocData = [
  { seq: 1, type: '服务商新增准入', noApproval: false },
  { seq: 2, type: '公开招标采购项目中标', noApproval: false },
  { seq: 3, type: '服务商更名', noApproval: false },
  { seq: 4, type: '所属企业评审增项', noApproval: false },
  { seq: 5, type: '服务商更名审核', noApproval: false },
];

function DocConfigTab() {
  const [selectedType, setSelectedType] = useState<string | undefined>(undefined);
  const [data, setData] = useState(allDocData);

  const handleReset = () => { setSelectedType(undefined); setData(allDocData); };
  const handleToggle = (seq: number) => { setData(prev => prev.map(d => d.seq === seq ? { ...d, noApproval: !d.noApproval } : d)); };

  const filteredData = selectedType ? data.filter(d => d.type === selectedType) : data;

  return (
    <div>
      <Card size="small" variant="outlined" style={{ marginBottom: 16 }}>
        <Row gutter={24} align="middle">
          <Col>
            <Space size={8}>
              <Typography.Text style={{ whiteSpace: 'nowrap' }}>工作单类型：</Typography.Text>
              <Select style={{ width: 200 }} placeholder="请选择" allowClear value={selectedType} onChange={setSelectedType} options={allDocData.map(d => ({ value: d.type, label: d.type }))} />
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
          { key: 'noApproval', title: '不审批走备案', dataIndex: 'noApproval', width: 150, align: 'center' as const, render: (val: boolean, record) => <Checkbox checked={val} onChange={() => handleToggle(record.seq)} /> },
          { key: 'action', title: '操作', width: 100, render: () => <Typography.Link style={{ color: '#ff4d4f' }}>设置</Typography.Link> },
        ]}
        dataSource={filteredData} rowKey="seq" bordered size="middle" pagination={false}
      />
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 16, marginTop: 16, borderTop: '1px solid #f0f0f0' }}>
        <Typography.Text type="secondary" style={{ fontSize: 12 }}>上次保存：2025-06-20 15:30</Typography.Text>
        <Space size={12}>
          <Button>取消</Button>
          <Button type="primary" danger>保存配置</Button>
        </Space>
      </div>
    </div>
  );
}

export default DocConfigTab;
