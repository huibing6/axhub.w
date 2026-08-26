/**
 * @name 合格服务商查询
 */
import React from 'react';
import { useState } from 'react';
import { Typography, Input, Select, Button, Table, Card, Row, Col, Space, Tag, Tooltip, message } from 'antd';

const currentUnit = '大庆油田';

const regData = [
  { seq: 1, name: '中海油能源发展股份有限公司', creditCode: '91420000706802345X', regTime: '2025-12-19 09:15', useUnits: ['长庆油田', '西南油气田'] },
  { seq: 2, name: '杰瑞石油装备技术有限公司', creditCode: '91420000706802345X', regTime: '2025-12-17 15:03', useUnits: [] },
  { seq: 3, name: '宝鸡石油钢管有限责任公司', creditCode: '91420000706802345X', regTime: '2025-12-19 09:15', useUnits: ['长庆油田', '大庆油田'] },
  { seq: 4, name: '山东科瑞机械制造有限公司', creditCode: '91420000706802345X', regTime: '2025-12-17 15:03', useUnits: ['大庆油田'] },
  { seq: 5, name: '天津渤海石油装备制造有限公司', creditCode: '91420000706802345X', regTime: '2025-12-19 09:15', useUnits: [] },
  { seq: 6, name: '四川宏华石油设备有限公司', creditCode: '91420000706802345X', regTime: '2025-12-17 15:03', useUnits: ['西南油气田', '塔里木油田', '大庆油田'] },
];

const UseUnitTags = ({ units }: { units: string[] }) => {
  if (units.length === 0) return <Typography.Text type="secondary">—</Typography.Text>;
  const show = units.slice(0, 2);
  const more = units.slice(2);
  return (
    <Space size={4} wrap>
      {show.map(u => (
        <Tag key={u} color={u === currentUnit ? 'blue' : 'default'} style={{ margin: 0 }}>{u}</Tag>
      ))}
      {more.length > 0 && (
        <Tooltip title={more.join('、')}>
          <Tag style={{ margin: 0, cursor: 'pointer' }}>+{more.length}</Tag>
        </Tooltip>
      )}
    </Space>
  );
};

export default function SpQueryQualified() {
  const [searchName, setSearchName] = useState('');
  const [searchUseUnit, setSearchUseUnit] = useState<string | undefined>(undefined);
  const [data] = useState(regData);

  const filteredData = data.filter(d => {
    if (searchName && !d.name.includes(searchName)) return false;
    if (searchUseUnit && !d.useUnits.includes(searchUseUnit)) return false;
    return true;
  });

  const handleReset = () => {
    setSearchName('');
    setSearchUseUnit(undefined);
  };

  const unitOptions = Array.from(new Set(data.flatMap(d => d.useUnits))).map(u => ({ label: u, value: u }));

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <Typography.Title level={4} style={{ margin: 0 }}>合格服务商查询</Typography.Title>
        <Button type="primary" danger>导出</Button>
      </div>
      <Card size="small" variant="outlined" style={{ marginBottom: 16 }}>
        <Row gutter={24} style={{ marginBottom: 12 }}>
          <Col><Space size={8}><Typography.Text style={{ whiteSpace: 'nowrap' }}>服务商名称</Typography.Text><Input placeholder="请输入服务商名称" style={{ width: 200 }} value={searchName} onChange={e => setSearchName(e.target.value)} /></Space></Col>
          <Col><Space size={8}><Typography.Text style={{ whiteSpace: 'nowrap' }}>使用单位</Typography.Text><Select style={{ width: 200 }} placeholder="全部" allowClear value={searchUseUnit} onChange={setSearchUseUnit} options={unitOptions} /></Space></Col>
        </Row>
        <Row gutter={24}>
          <Col><Space size={8}><Button type="primary" danger>查询</Button><Button onClick={handleReset}>重置</Button></Space></Col>
        </Row>
      </Card>
      <Table
        columns={[
          { key: 'seq', title: '序号', width: 60, align: 'center' as const, dataIndex: 'seq' },
          { key: 'name', title: '服务商名称', dataIndex: 'name', ellipsis: true },
          { key: 'creditCode', title: '统一社会信用代码', dataIndex: 'creditCode', ellipsis: true },
          { key: 'useUnits', title: '使用单位', dataIndex: 'useUnits', width: 200, render: (units: string[]) => <UseUnitTags units={units} /> },
          { key: 'regTime', title: '注册时间', dataIndex: 'regTime', width: 180 },
          { key: 'action', title: '操作', width: 100, align: 'center' as const, render: () => <Typography.Link style={{ color: '#ff4d4f' }} onClick={() => window.location.hash = '#/admin/sp-query-qualified-detail'}>查看</Typography.Link> },
        ]}
        dataSource={filteredData} rowKey="seq" pagination={{ pageSize: 10, showSizeChanger: true, showTotal: (t) => `共 ${t} 条` }} bordered size="middle"
      />
    </div>
  );
}
